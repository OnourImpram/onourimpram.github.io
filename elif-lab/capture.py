"""Public, read-only reference observations. Never submit forms or bypass access controls."""
from pathlib import Path
from urllib.parse import urlparse, urljoin, parse_qsl, urlencode
from urllib.request import Request, urlopen
from urllib.robotparser import RobotFileParser
from datetime import datetime, timezone
from collections import Counter
import json, hashlib, subprocess, sys
from playwright.sync_api import sync_playwright
ROOT=Path('elif-lab/evidence'); ROOT.mkdir(parents=True,exist_ok=True)
SITES=[('vornom','https://www.vornom.com.tr/'),('devol','https://www.devolkitchens.co.uk/'),('plainenglish','https://www.plainenglishdesign.co.uk/'),('sebastiancox','https://www.sebastiancox.co.uk/')]
REPOS=['dickwu/apple-design-skill','nexu-io/open-design','bergside/awesome-design-skills','pbakaus/impeccable','Leonxlnx/taste-skill','img2threejs/img2threejs','brijr/iris','nextlevelbuilder/ui-ux-pro-max-skill','maiconlara/design-system-extraction','cth9191/site-clone','dafangtoubushuai/frontend-site-cloner','alufers/mitmproxy2swagger','ChromeDevTools/chrome-devtools-mcp','microsoft/playwright-mcp','firecrawl/open-lovable','browserbase/stagehand','unclecode/crawl4ai','braxtonROSE4/clone-any-website','anthropics/skills']
def dump(p,x):
 p.parent.mkdir(parents=True,exist_ok=True);p.write_text(json.dumps(x,ensure_ascii=False,indent=2))
def scrub(url):
 p=urlparse(url); return p._replace(query=urlencode([(k,'REDACTED') for k,v in parse_qsl(p.query)]),fragment='').geturl()
def shape(x,depth=0):
 if depth>5:return {'type':'unknown'}
 if isinstance(x,dict):return {'type':'object','properties':{k:shape(v,depth+1) for k,v in list(x.items())[:50]}}
 if isinstance(x,list):return {'type':'array','items':shape(x[0],depth+1) if x else {}}
 return {'type':'boolean' if isinstance(x,bool) else 'number' if isinstance(x,(float,int)) else 'null' if x is None else 'string'}
# Fetch documentation, never execute upstream installer scripts or remote page instructions.
repo_reports=[]
for repo in REPOS:
 out={'repository':repo,'status':'UNKNOWN'}
 try:
  req=Request('https://api.github.com/repos/'+repo,headers={'User-Agent':'ElifReferenceResearch/1.0'})
  with urlopen(req,timeout=15) as r: meta=json.load(r)
  branch=meta['default_branch']; out.update(status='OBSERVED',branch=branch,license=(meta.get('license') or {}).get('spdx_id'))
  with urlopen(Request('https://api.github.com/repos/'+repo+'/commits/'+branch,headers={'User-Agent':'ElifReferenceResearch/1.0'}),timeout=15) as r:out['commit']=json.load(r)['sha']
  for path in ['README.md','SKILL.md','skills/frontend-design/SKILL.md','skills/taste-skill/SKILL.md']:
   try:
    with urlopen('https://raw.githubusercontent.com/'+repo+'/'+out['commit']+'/'+path,timeout=10) as r: data=r.read(100000)
    target=ROOT/'tool-sources'/repo.replace('/','__')/path;target.parent.mkdir(parents=True,exist_ok=True);target.write_bytes(data)
   except Exception: pass
 except Exception as e:out.update(status='BLOCKED',reason=str(e)[:200])
 repo_reports.append(out)
dump(ROOT/'tools.json',repo_reports)
with sync_playwright() as p:
 browser=p.chromium.launch(headless=True)
 summaries=[]
 for name,url in SITES:
  folder=ROOT/name;folder.mkdir(exist_ok=True)
  record={'source':url,'status':'UNKNOWN','observed_at':datetime.now(timezone.utc).isoformat(),'pages':[],'backend_source':'UNKNOWN'}
  rp=RobotFileParser(); robots_ok=True
  try:
   with urlopen(Request(urljoin(url,'robots.txt'),headers={'User-Agent':'ElifReferenceResearch/1.0'}),timeout=15) as r: rob=r.read().decode('utf-8','replace')
   rp.parse(rob.splitlines()); robots_ok=rp.can_fetch('ElifReferenceResearch',url)
   record['robots']={'status':'OBSERVED','home_allowed':robots_ok}
  except Exception as e: record['robots']={'status':'UNKNOWN','reason':str(e)[:160]}
  if not robots_ok:
   record.update(status='BLOCKED',reason='robots.txt disallows the requested home page');dump(folder/'manifest.json',record);summaries.append(record);continue
  ctx=browser.new_context(viewport={'width':1440,'height':1000},device_scale_factor=1,reduced_motion='reduce',locale='en-GB')
  page=ctx.new_page(); resources=[];apis=[];errors=[]
  def response(r):
   try:
    req=r.request;ctype=r.headers.get('content-type','')
    resources.append({'url':scrub(r.url),'method':req.method,'status':r.status,'type':req.resource_type,'mime':ctype.split(';')[0]})
    if req.resource_type in ['fetch','xhr'] and 'application/json' in ctype and urlparse(r.url).hostname in [urlparse(url).hostname,urlparse(url).hostname.removeprefix('www.')]:
     if int(r.headers.get('content-length','0') or 0)<500000:
      apis.append({'url':scrub(r.url),'method':req.method,'status':'OBSERVED','response_schema':shape(r.json()),'coverage':'single public response, not a complete contract'})
   except Exception:pass
  page.on('response',response);page.on('pageerror',lambda e:errors.append(str(e)[:250]))
  try:
   first=page.goto(url,wait_until='domcontentloaded',timeout=45000);page.wait_for_timeout(2000)
   if first and first.status in [401,403,429,503]:raise RuntimeError('Access challenge or service response '+str(first.status))
   title=page.title()
   if any(t in title.lower() for t in ['just a moment','access denied','captcha']):raise RuntimeError('Access challenge; no bypass attempted')
   links=page.locator('a[href]').evaluate_all('(xs)=>xs.map(a=>({href:a.href,text:(a.textContent||" ").trim().slice(0,90)}))')
   same=[x for x in links if urlparse(x['href']).hostname in [urlparse(page.url).hostname] and not any(v in x['href'].lower() for v in ['cart','checkout','login','account','logout','contact','mailto:','tel:'])]
   unique={x['href'].split('#')[0]:x for x in same if x['href'].startswith('http')}
   dump(folder/'pages.json',{'status':'OBSERVED','links':list(unique.values())[:120],'scope':'links observed on homepage only'})
   choices=[]
   for keywords in [('collection','product','kitchen','furniture'),('story','about','journal','workshop')]:
    candidates=[u for u in unique if u.rstrip('/')!=page.url.rstrip('/') and any(k in u.lower() for k in keywords) and (not record.get('robots',{}).get('status')=='OBSERVED' or rp.can_fetch('ElifReferenceResearch',u))]
    if candidates:choices.append(candidates[0])
   for idx,target in enumerate([page.url]+choices[:2]):
    for w in ([390,768,1440] if idx==0 else [1440]):
     page.set_viewport_size({'width':w,'height':1000 if w>500 else 844})
     if idx>0: page.goto(target,wait_until='domcontentloaded',timeout=30000)
     page.wait_for_timeout(700)
     metrics=page.evaluate('''()=>{const fields=['fontFamily','fontSize','fontWeight','lineHeight','letterSpacing','color','backgroundColor','borderRadius','boxShadow','display','gridTemplateColumns','gap','padding','maxWidth','transitionDuration','animationName'];const read=(el)=>{const s=getComputedStyle(el),r=el.getBoundingClientRect();return{tag:el.tagName,selector:el.id?'#'+el.id:el.tagName.toLowerCase()+'.'+String(el.className||'').split(' ').slice(0,2).join('.'),rect:{x:r.x,y:r.y,width:r.width,height:r.height},computed:Object.fromEntries(fields.map(k=>[k,s[k]]))}};const vars={};const root=getComputedStyle(document.documentElement);for(let i=0;i<root.length;i++){let k=root[i];if(k.startsWith('--'))vars[k]=root.getPropertyValue(k).trim()}return{viewport:{width:innerWidth,height:innerHeight},title:document.title,url:location.href,overflow:document.documentElement.scrollWidth>innerWidth,elements:[...document.querySelectorAll('h1,h2,header,nav,main,button,a[class],section')].filter(e=>e.getBoundingClientRect().width>0).slice(0,70).map(read),variables:vars,images:[...document.images].slice(0,30).map(i=>({width:i.naturalWidth,height:i.naturalHeight,loading:i.loading})),scripts:[...document.scripts].filter(s=>s.src).map(s=>s.src),storage:{local_keys:Object.keys(localStorage),session_keys:Object.keys(sessionStorage)},performance:performance.getEntriesByType('navigation').map(n=>({duration:n.duration,domContentLoaded:n.domContentLoadedEventEnd})),motion_preference:matchMedia('(prefers-reduced-motion: reduce)').matches}}''')
     metrics['status']='OBSERVED';dump(folder/f'page-{idx}-{w}.json',metrics)
     page.screenshot(path=str(folder/f'page-{idx}-{w}.png'),full_page=False)
     if idx==0 and w==1440:
      page.evaluate('window.scrollTo(0,Math.min(900,document.body.scrollHeight-innerHeight))');page.wait_for_timeout(700);page.screenshot(path=str(folder/'home-scrolled.png'))
     record['pages'].append({'url':scrub(target),'width':w,'metrics':f'page-{idx}-{w}.json'})
   record.update(status='OBSERVED',title=title,errors=errors[:15],limitations=['No form submission, login, checkout, consent acceptance or access-control bypass','Computed CSS is measured only for captured states','Backend source code is not observable','Session values and response bodies are not retained'])
   dump(folder/'network.json',resources[:600]);dump(folder/'api-observations.json',apis[:30])
   dump(folder/'network.har',{'log':{'version':'1.2','creator':{'name':'ElifReference','version':'1.0'},'entries':[{'request':{'method:r['method'],'url':r['url'],'headers':[],'cookies':[],'queryString':[]},'response':{'status':r['status'],'headers':[],'cookies':[],'content':{'mimeType':r['mime'],'text':''}},'comment':'Sanitized observed metadata only, no payloads'} for r in resources[:600]]}})
  except Exception as e:record.update(status='BLOCKED',reason=str(e)[:450])
  finally:ctx.close();dump(folder/'manifest.json',record);summaries.append(record)
 browser.close()
dump(ROOT/'summary.json',summaries)
print('REFERENCE_RESULT '+json.dumps([{'source':s['source'],'status':s['status'],'pages':len(s['pages']),'reason':s.get('reason')} for s in summaries]))
print('TOOL_RESULT '+json.dumps(repo_reports))
