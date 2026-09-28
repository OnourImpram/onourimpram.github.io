from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,unquote
import json
root=Path('elif-tasarim/source-v12/dist');bad=[];count=0
class Check(HTMLParser):
 def __init__(self,path):super().__init__();self.path=path;self.ids=set();self.fragments=[]
 def handle_starttag(self,tag,attrs):
  global count
  a=dict(attrs)
  if a.get('id'):self.ids.add(a['id'])
  candidates=[]
  if tag in ['img','script','source'] and a.get('src'):candidates.append(a['src'])
  if tag=='img' and a.get('srcset'):candidates.extend(x.strip().split()[0] for x in a['srcset'].split(',') if x.strip())
  if tag in ['a','link'] and a.get('href'):candidates.append(a['href'])
  for url in candidates:
   if url.startswith('#') and len(url)>1:self.fragments.append(url[1:]);continue
   p=urlsplit(url)
   if p.scheme or p.netloc or not p.path.startswith('/elif-tasarim/'):continue
   target=root/unquote(p.path[len('/elif-tasarim/'):]);count+=1
   if not target.is_file() and not (target/'index.html').is_file():bad.append({'page':str(self.path.relative_to(root)),'missing':url})
for path in root.rglob('*.html'):
 check=Check(path);check.feed(path.read_text())
 for fragment in check.fragments:
  if fragment not in check.ids:bad.append({'page':str(path.relative_to(root)),'missingFragment':fragment})
print(json.dumps({'checkedLocalReferences':count,'issues':bad},ensure_ascii=False,indent=2));assert not bad
