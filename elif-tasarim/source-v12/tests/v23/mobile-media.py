"""Read-only mobile image and route sweep. Never sends forms or messages."""
from pathlib import Path
from playwright.sync_api import sync_playwright
import json,os,traceback
ROOT=Path.cwd()
BASE=os.environ['BASE_URL'].rstrip('/')+'/'
OUT=Path(os.environ.get('EVIDENCE_DIR','evidence/v23/mobile'));OUT.mkdir(parents=True,exist_ok=True)
manifest=json.loads((ROOT/'dist/release-v23.json').read_text())
report={'base':BASE,'viewport':{'width':390,'height':844},'routes':[],'errors':[],'limits':['Isolated Chromium mobile viewport, not a physical device','No message or form submitted']}
def save(): (OUT/'results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
with sync_playwright() as p:
 b=p.chromium.launch(headless=True,args=['--no-sandbox','--disable-dev-shm-usage','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'])
 context=b.new_context(viewport=report['viewport'],reduced_motion='reduce')
 page=context.new_page();page.on('pageerror',lambda e:report['errors'].append(str(e)))
 try:
  for route in manifest['routes']:
   page.goto(BASE+route.strip('/')+('/' if route.strip('/') else ''),wait_until='domcontentloaded',timeout=60000)
   page.wait_for_selector('html[data-app-ready="true"]',timeout=20000)
   images=page.locator('main img')
   # Hydration can replace image elements while scrolling. Traverse the page, then
   # inspect the current DOM rather than holding stale element handles.
   height=page.evaluate('document.body.scrollHeight')
   for y in range(0,min(20000,height)+1,560):
    page.evaluate('(y)=>scrollTo(0,y)',y)
    page.wait_for_timeout(70)
   page.evaluate('scrollTo(0,document.body.scrollHeight)')
   page.wait_for_timeout(120)
   page.wait_for_function("""()=>[...document.querySelectorAll('main img')].filter(i=>{const r=i.getBoundingClientRect();return r.width>0&&r.height>0}).every(i=>i.complete&&i.naturalWidth>0)""",timeout=20000)
   appearances=page.evaluate("""()=>[...document.querySelectorAll('main img')].map((x,i)=>{let opacity=1,hidden=false;for(let el=x;el;el=el.parentElement){const c=getComputedStyle(el);opacity*=Number(c.opacity);if(c.visibility==='hidden'||c.display==='none'){hidden=true;break}}const r=x.getBoundingClientRect();return {i,src:x.currentSrc||x.src,boxVisible:r.width>0&&r.height>0,hidden,opacity,complete:x.complete,naturalWidth:x.naturalWidth}})""")
   for appearance in appearances:
    if appearance['boxVisible'] and not appearance['hidden']:
     assert appearance['opacity']>0.01 and appearance['complete'] and appearance['naturalWidth']>0,(route,appearance)
   assert not page.locator('.image-unavailable').count(),route
   text=page.locator('main').inner_text().strip()
   assert text,route
   for invalid in ['[object Object]','undefined','Lorem ipsum']:
    assert invalid not in text,(route,invalid)
   assert page.evaluate('document.documentElement.scrollWidth<=innerWidth+1'),route
   report['routes'].append({'route':route,'images':images.count(),'pass':True});save()
   if route in ['/devir-01','/iletisim']:
    page.evaluate('scrollTo(0,0)');page.screenshot(path=str(OUT/(route.strip('/')+'-390.png')),full_page=True)
  assert not report['errors'],report['errors'];report['pass']=True;save();print('MOBILE MEDIA PASS',len(report['routes']))
 except Exception:
  report['failure']=traceback.format_exc();save()
  try:page.screenshot(path=str(OUT/'failure.png'),full_page=True)
  except Exception:pass
  raise
 finally:b.close()
