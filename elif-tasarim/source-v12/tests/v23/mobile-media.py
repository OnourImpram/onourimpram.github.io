"""Read-only mobile image and route sweep. Never sends forms or messages."""
from pathlib import Path
from playwright.sync_api import sync_playwright
import json,os,traceback
ROOT=Path.cwd()
BASE=os.environ['BASE_URL'].rstrip('/')+'/'
OUT=Path(os.environ.get('EVIDENCE_DIR','evidence/v23/mobile'));OUT.mkdir(parents=True,exist_ok=True)
manifest=json.loads((ROOT/'dist/release-v22.json').read_text())
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
   for i in range(images.count()):
    image=images.nth(i)
    if image.is_visible():
     image.scroll_into_view_if_needed(timeout=8000)
     page.wait_for_function('(i)=>{const x=document.querySelectorAll("main img")[i];return !!x&&x.complete&&x.naturalWidth>0}',arg=i,timeout=20000)
     appearance=image.evaluate('''x=>{let opacity=1;for(let el=x;el;el=el.parentElement){const c=getComputedStyle(el);opacity*=Number(c.opacity);if(c.visibility==='hidden'||c.display==='none')return {visible:false,opacity};}const r=x.getBoundingClientRect();return {visible:r.width>0&&r.height>0,opacity};}''')
     assert appearance['visible'] and appearance['opacity']>0.01,(route,i,appearance)
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
