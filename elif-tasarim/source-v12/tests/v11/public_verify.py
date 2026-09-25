"""Read-only public byte integrity, HTTP routes and SEO snapshot verifier."""
from pathlib import Path
from urllib.request import urlopen,Request
from urllib.error import HTTPError
from concurrent.futures import ThreadPoolExecutor
import json,os,hashlib,re,time
R=Path(__file__).resolve().parents[2];B=os.environ['BASE_URL'].rstrip('/')+'/';O=Path(os.environ.get('EVIDENCE_DIR',str(R/'evidence/v11/public')));O.mkdir(parents=True,exist_ok=True)
m=json.loads((R/'dist/release-v12.json').read_text());expected=(R/'dist/release-v12.json').read_bytes()
def get(path):
 with urlopen(Request(B+path,headers={'User-Agent':'Elif-Release-Verification/11'}),timeout=45) as r:return r.read()
for n in range(36):
 try:
  if get('release-v12.json')==expected:break
 except Exception:pass
 time.sleep(10)
else:raise SystemExit('Expected V11 manifest did not appear. No success claimed.')
def verify(item):
 name,entry=item
 if name=='.nojekyll':return {'path':name,'build_only':True}
 data=get(name);return {'path':name,'bytes':len(data),'pass':hashlib.sha256(data).hexdigest()==entry['sha256']and len(data)==entry['bytes']}
with ThreadPoolExecutor(max_workers=4)as pool:results=list(pool.map(verify,m['files'].items()))
(O/'integrity.json').write_text(json.dumps(results,indent=2));assert all(x.get('pass',x.get('build_only',False))for x in results)
pages=[];descs=[]
for path in m['routes']:
 data=get(path.strip('/')+'/' if path!='/' else '').decode();description=re.search(r'<meta name="description" content="([^"]+)"',data).group(1);descs.append(description)
 pages.append({'path':path,'v11':'v12-cplus-360'in data,'noindex':'noindex,nofollow'in data,'legacyName':bool(re.search('Yusuf',data)),'description':description})
assert all(x['v11']and x['noindex']and not x['legacyName']for x in pages);assert len(set(descs))==len(descs)
missing=None
try:get('v11-this-page-does-not-exist/')
except HTTPError as e:missing=e.code
assert missing==404,missing
(O/'pages.json').write_text(json.dumps({'pages':pages,'missing_status':missing,'manifest_matches':True},ensure_ascii=False,indent=2));print('VERIFIED',len(results),'manifest entries',len(pages),'HTTP routes. Unknown route 404.',flush=True)
