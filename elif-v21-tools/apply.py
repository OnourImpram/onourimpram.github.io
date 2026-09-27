"""Apply a reviewed, hash-checked UTF-8 delta inside the Elif source tree only."""
from pathlib import Path
import base64,hashlib,json,lzma
ROOT=Path('elif-tasarim/source-v12').resolve()
expected='278fecf5a996927df347d555f10c6c296a839ea74231b4d2cf3e0b3a754b4caa'
encoded=''.join(Path(f'elif-v21-tools/delta.{i}').read_text().strip() for i in range(1,5))
raw=lzma.decompress(base64.b64decode(encoded,validate=True))
assert hashlib.sha256(raw).hexdigest()==expected,'Transfer checksum does not match reviewed delta'
items=json.loads(raw);assert isinstance(items,list) and len(items)==38
planned=[];seen=set()
for item in items:
    name=item['path'];relative=Path(name)
    assert not relative.is_absolute() and '..' not in relative.parts and name not in seen
    seen.add(name)
    target=ROOT/relative
    assert target.resolve().is_relative_to(ROOT) and not target.is_symlink()
    if item['old'] is None:
        assert not target.exists(),name
        content=item['content']
    else:
        original=target.read_bytes()
        assert hashlib.sha256(original).hexdigest()==item['old'],('Base changed',name)
        content=original.decode('utf-8');last=0
        for edit in item['edits']:
            assert isinstance(edit['start'],int) and isinstance(edit['end'],int)
            assert last<=edit['start']<=edit['end']<=len(content),name
            last=edit['end']
        for edit in reversed(item['edits']):
            content=content[:edit['start']]+edit['text']+content[edit['end']:]
    data=content.encode('utf-8')
    assert hashlib.sha256(data).hexdigest()==item['new'],('Result checksum',name)
    planned.append((target,data))
# All old and new content has passed validation. No source is changed before this point.
for target,data in planned:
    target.parent.mkdir(parents=True,exist_ok=True);target.write_bytes(data)
print('Applied verified report delta',len(planned),'files. Publication has not been changed.')
