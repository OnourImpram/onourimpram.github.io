"""Prepare an isolated source tree from the checked-out V11 source.
No network downloads, credentials, Git writes or executable archives are used.
"""
from pathlib import Path
import hashlib,json,shutil,sys
TOOLS=Path(__file__).resolve().parent
REPO=TOOLS.parent
DATA=json.loads((TOOLS/'source-changes.json').read_text())
assert DATA['baseline']=='3ad138d2c2cb63350591644500c31f8b71f64016'
assert DATA['sourcePath']=='elif-tasarim/source-v11'
BASE=REPO/DATA['sourcePath']
DEST=Path(sys.argv[1]).resolve()
assert DEST!=BASE.resolve() and not DEST.exists(), 'An unused isolated destination is required'
def safe(path):
 p=Path(path)
 assert not p.is_absolute() and '..' not in p.parts and p.suffix in {'.md','.json','.mjs','.cjs','.py','.tsx','.ts','.css'}
 return p
def digest(s): return hashlib.sha256(s.encode('utf-8')).hexdigest()
outputs=[]
for record in DATA['changes']:
 target=safe(record['path']); original=BASE/safe(record.get('copyFrom',record['path']))
 text=original.read_text() if original.exists() else ''
 assert digest(text)==record['before'], 'Unexpected baseline '+str(target)
 if 'content' in record:
  assert text==''
  text=record['content']
 else:
  edits=record['edits'];previous=-1
  for start,end,replacement in edits:
   assert isinstance(start,int) and isinstance(end,int) and previous<=start<=end<=len(text)
   previous=end
  for start,end,replacement in reversed(edits): text=text[:start]+replacement+text[end:]
 assert digest(text)==record['after'], 'Unexpected result '+str(target)
 outputs.append((target,text))
shutil.copytree(BASE,DEST,ignore=shutil.ignore_patterns('node_modules','dist','preview','evidence','__pycache__','.git'))
for target,text in outputs:
 p=DEST/target;p.parent.mkdir(parents=True,exist_ok=True);p.write_text(text)
for name in ['acceptance.py','render-posters.py']:
 p=DEST/'tests/v12'/name;p.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(TOOLS/name,p)
print('Verified and applied',len(outputs),'source changes in',DEST)
