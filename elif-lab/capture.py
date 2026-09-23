"""Public read-only browser study. Never submit forms or bypass access controls."""
from pathlib import Path
from urllib.parse import urlparse, urljoin, parse_qsl, urlencode
from urllib.request import Request, urlopen
from urllib.robotparser import RobotFileParser
from datetime import datetime, timezone
import json
from playwright.sync_api import sync_playwright
ROOT=Path('elif-lab/evidence'); ROOT.mkdir(parents=True,exist_ok=True)
SITES=[('vornom','https://www.vornom.com.tr/'),('devol','https://www.devolkitchens.co.uk/'),('plainenglish','https://www.plainenglishdesign.co.uk/'),('sebastiancox','https://www.sebastiancox.co.uk/')]
REPOS=['dickwu/apple-design-skill','nexu-io/open-design','bergside/awesome-design-skills','pbakaus/impeccable','Leonxlnx/taste-skill','img2threejs/img2threejs','brijr/iris','nextlevelbuilder/ui-ux-pro-max-skill','maiconlara/design-system-extraction','cth9191/site-clone','dafangtoubushuai/frontend-site-cloner','alufers/mitmproxy2swagger','ChromeDevTools/chrome-devtools-mcp','microsoft/playwright-mcp','firecrawl/open-lovable','browserbase/stagehand','unclecode/crawl4ai','braxtonROSE4/clone-any-website','anthropics/skills']
def dump(path,value):
 path.parent.mkdir(parents=True,exist_ok=True)
 path.write_text(json.dumps(value,ensure_ascii=False,indent=2))
def scrub(url):
 p=urlparse(url)
 return p._replace(query=urlencode([(k,'REDACTED') for k,v in parse_qsl(p.query)]),fragment='').geturl()
def schema(x,depth=0):
 if depth>5: return {}
 if isinstance(x,dict): return {'type':'object','properties':{k:schema(v,depth+1) for k,v in list(x.items())[:40]}}
 if isinstance(x,list): return {'type':'array','items':schema(x[0],depth+1) if x else {}}
 return {'type':'boolean' if isinstance(x,bool) else 'number' if isinstance(x,(float,int)) else 'null' if x is None else 'string'}
def get_json(url):
 with urlopen(Request(url,headers={'User-Agent':'ElifReferenceResearch/1.0'}),timeout=12) as r: return json.load(r)
reports=[]
for repo in REPOS:
 out={'repository':repo,'status':'UNKNOWN'}
 try:
  meta=get_json('https://api.github.com/repos/'+repo)
  out.update(status='OBSERVED',branch=meta['default_branch'],license=(meta.get('license') or {}).get('spdx_id'))
  out['commit']=get_json('https://api.github.com/repos/'+repo+'/commits/'+out['branch'])['sha']
  for path in ['README.md','SKILL.md','skills/frontend-design/SKILL.md','skills/taste-skill/SKILL.md']:
   try:
    with urlopen('https://raw.githubusercontent.com/'+repo+'/'+out['commit']+'/'+path,timeout=8) as r: data=r.read(100000)
    target=ROOT/'tool-sources'/repo.replace('/','__')/path
    target.parent.mkdir(parents=True,exist_ok=True);target.write_bytes(data)
   except Exception: pass
 except Exception as e: out.update(status='BLOCKED',reason=str(e)[:180])
 reports.append(out)
dump(ROOT/'tools.json',reports)
MEASURE="""()=>{
const props=['fontFamily','fontSize','fontWeight','lineHeight','letterSpacing','color','backgroundColor','borderRadius','boxShadow','display','gridTemplateColumns','gap','padding','maxWidth','transitionDuration','animationName'];
const read=el=>{const s=getComputedStyle(el),r=el.getBoundingClientRect();return {tag:el.tagName,selector:el.id?'#'+el.id:el.tagName.toLowerCase()+'.'+String(el.className||'').split(' ').slice(0,2).join('.'),rect:{x:r.x,y:r.y,width:r.width,height:r.height},computed:Object.fromEntries(props.map(k=>[k,s[k]]))}};
const variables={},root=getComputedStyle(document.documentElement);
for(let i=0;i<root.length;i++){const k=root[i];if(k.startsWith('--'))variables[k]=root.getPropertyValue(k).trim()}
let storage={status:'BLOCKED'};try{storage={local_keys:Object.keys(localStorage),session_keys:Object.keys(sessionStorage)}}catch{}
return {viewport:{width:innerWidth,height:innerHeight},title:document.title,url:location.href,overflow:document.documentElement.scrollWidth>innerWidth,elements:[...document.querySelectorAll('h1,h2,header,nav,main,button,a[class],section')].filter(e=>e.getBoundingClientRect().width>0).slice(0,70).map(read),variables,images:[...document.images].slice(0,30).map(i=>({width:i.naturalWidth,height:i.naturalHeight,loading:i.loading})),scripts:[...document.scripts].filter(s=>s.src).map(s=>s.src),storage,motion_preference:matchMedia('(prefers-reduced-motion: reduce)').matches};
}"""
summaries=[]
with sync_playwright() as p:
 browser=p.chromium.launch(headless=True)
 for name,url in SITES:
  folder=ROOT/name;folder.mkdir(exist_ok=True)
  record={'source':url,'status':'UNKNOWN','observed_at':datetime.now(timezone.utc).isoformat(),'pages':[],'backend_source':'UNKNOWN'}
  robots=RobotFileParser();checked=False
  try:
   with urlopen(Request(urljoin(url,'robots.txt'),headers={'User-Agent':'ElifReferenceResearch/1.0'}),timeout=10) as r: text=r.read().decode('utf-8','replace')
   robots.parse(text.splitlines());checked=True
   record['robots']={'status':'OBSERVED','home_allowed':robots.can_fetch('ElifReferenceResearch',url)}
  except Exception as e: record['robots']={'status':'UNKNOWN','reason':str(e)[:100]}
  if checked and not robots.can_fetch('ElifReferenceResearch',url):
   record.update(status='BLOCKED',reason='robots.txt disallows homepage');dump(folder/'manifest.json',record);summaries.append(record);continue
  ctx=browser.new_context(viewport={'width':1440,'height':1000},device_scale_factor=1,reduced_motion='reduce',locale='en-GB')
  page=ctx.new_page();resources=[];apis=[];errors=[]
  def on_response(r):
   try:
    request=r.request;ctype=r.headers.get('content-type','')
    resources.append({'url':scrub(r.url),'method':request.method,'status':r.status,'type':request.resource_type,'mime':ctype.split(';')[0]})
    if request.resource_type in ['fetch','xhr'] and 'application/json' in ctype and urlparse(r.url).hostname==urlparse(url).hostname and int(r.headers.get('content-length','0') or 0)<400000:
     apis.append({'url':scrub(r.url),'method':request.method,'status':'OBSERVED','response_schema':schema(r.json()),'coverage':'single response, incomplete contract'})
   except Exception: pass
  page.on('response',on_response);page.on('pageerror',lambda e:errors.append(str(e)[:180]))
  try:
   response=page.goto(url,wait_until='domcontentloaded',timeout=40000);page.wait_for_timeout(1800)
   if response and response.status in [401,403,429,503]: raise RuntimeError('Access/service response '+str(response.status))
   title=page.title()
   if any(s in title.lower() for s in ['just a moment','access denied','captcha']): raise RuntimeError('Access challenge, no bypass attempted')
   links=page.locator('a[href]').evaluate_all('(xs)=>xs.map(a=>({href:a.href,text:(a.textContent||"").trim().slice(0,80)}))')
   allowed={x['href'].split('#')[0]:x for x in links if urlparse(x['href']).hostname==urlparse(page.url).hostname and x['href'].startswith('http') and not any(s in x['href'].lower() for s in ['cart','checkout','login','account','logout','contact'])}
   dump(folder/'pages.json',{'status':'OBSERVED','links':list(allowed.values())[:120],'scope':'homepage links only'})
   targets=[page.url]
   for words in [('collection','product','kitchen','furniture'),('story','about','journal','workshop')]:
    matches=[u for u in allowed if u.rstrip('/')!=page.url.rstrip('/') and any(k in u.lower() for k in words) and (not checked or robots.can_fetch('ElifReferenceResearch',u))]
    if matches:targets.append(matches[0])
   for idx,target in enumerate(targets):
    for width in ([390,768,1440] if idx==0 else [1440]):
     page.set_viewport_size({'width':width,'height':844 if width<500 else 1000})
     if idx>0:page.goto(target,wait_until='domcontentloaded',timeout=25000)
     page.evaluate('scrollTo(0,0)');page.wait_for_timeout(700)
     metrics=page.evaluate(MEASURE);metrics['status']='OBSERVED'
     dump(folder/f'page-{idx}-{width}.json',metrics)
     page.screenshot(path=str(folder/f'page-{idx}-{width}.png'))
     record['pages'].append({'url':scrub(target),'width':width,'metrics':f'page-{idx}-{width}.json'})
     if idx==0 and width==1440:
      page.evaluate('scrollTo(0,Math.min(850,document.body.scrollHeight-innerHeight))');page.wait_for_timeout(500);page.screenshot(path=str(folder/'home-scrolled.png'))
   record.update(status='OBSERVED',title=title,errors=errors[:12])
  except Exception as e:record.update(status='PARTIAL' if record['pages'] else 'BLOCKED',reason=str(e)[:350])
  finally:
   ctx.close()
   record['limitations']=['No forms, login, payment or CAPTCHA interaction','No backend source visibility','Cookie values and response bodies not retained']
   dump(folder/'network.json',resources[:600]);dump(folder/'api-observations.json',apis[:30])
   entries=[{'request':{'method':r['method'],'url':r['url'],'headers':[],'cookies':[],'queryString':[]},'response':{'status':r['status'],'headers':[],'cookies':[],'content':{'mimeType':r['mime'],'text':''}},'comment':'Sanitized metadata, no payload retained'} for r in resources[:600]]
   dump(folder/'network.har',{'log':{'version':'1.2','creator':{'name':'ElifReference','version':'1.1'},'entries':entries}})
   dump(folder/'manifest.json',record);summaries.append(record)
 browser.close()
dump(ROOT/'summary.json',summaries)
print('REFERENCE_RESULT '+json.dumps([{'source':s['source'],'status':s['status'],'pages':len(s['pages']),'reason':s.get('reason')} for s in summaries]))
print('TOOL_RESULT '+json.dumps(reports))
