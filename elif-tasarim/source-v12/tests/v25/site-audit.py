"""Static V25 routes, first-response metadata, source classification and assets."""
from pathlib import Path
from bs4 import BeautifulSoup
from urllib.parse import urlsplit,unquote
import json,hashlib,collections,os
R=Path(__file__).resolve().parents[2];D=R/'dist';M=json.loads((D/'release-v25.json').read_text());base=M['basePath'];rows=[];errors=[];checked=set()
for route in M['routes']:
 path=D/route.lstrip('/')/'index.html';s=BeautifulSoup(path.read_text(),'html.parser');h=s.select('main h1');assert len(h)==1,(route,'h1',len(h))
 assert s.select_one('meta[name=elif-release]')['content']==M['release']
 assert s.select_one('meta[name=robots]')['content']=='noindex,nofollow'
 canonical=M['siteUrl'].rstrip('/')+('/' if route=='/' else route+'/');assert s.select_one('link[rel=canonical]')['href']==canonical
 schema=json.loads(s.select_one('script[type="application/ld+json"]').string);assert schema['name']==s.title.string
 ids=[e['id'] for e in s.select('[id]')];dup=[x for x,n in collections.Counter(ids).items() if n>1];assert not dup,(route,dup)
 images=s.select('img');assert all(i.has_attr('alt') for i in images),(route,'missing alt')
 for e in s.select('[src],a[href],link[href]'):
  url=e.get('src',e.get('href',''));u=urlsplit(url)
  if u.scheme or u.netloc:continue
  if u.path.startswith(base+'/'):
   rel=unquote(u.path[len(base)+1:]);target=D/rel
   if u.path.endswith('/'):target=target/'index.html'
   if not target.is_file():errors.append({'route':route,'missing':url})
   checked.add(rel)
  if not u.path and u.fragment and not u.fragment.startswith('/') and u.fragment not in ids:errors.append({'route':route,'missing_anchor':url})
 for a in s.select('a[target=_blank]'):
  assert 'noopener' in a.get('rel',[]),(route,'unsafe target',a.get('href'))
 rows.append({'route':route,'images':len(images),'pass':True})
for path,f in M['files'].items():
 p=D/path;assert p.stat().st_size==f['bytes'] and hashlib.sha256(p.read_bytes()).hexdigest()==f['sha256'],path
assert not errors,errors
out=Path(os.environ.get('EVIDENCE_DIR',R/'evidence/v25-static'));out.mkdir(parents=True,exist_ok=True)
report={'routes':rows,'routeCount':len(rows),'assetAndFileReferences':len(checked),'manifestFiles':len(M['files']),'errors':errors,'pass':True}
(out/'results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));print('STATIC AUDIT PASS',len(rows),'routes,',len(checked),'references,',len(M['files']),'verified files')
