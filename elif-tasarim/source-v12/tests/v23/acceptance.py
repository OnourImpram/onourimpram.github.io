"""V23 premium-finish checks on real HTTP. No external message is sent."""
from pathlib import Path
from playwright.sync_api import sync_playwright
import os,json,traceback
R=Path(__file__).resolve().parents[2]
BASE=os.environ.get('BASE_URL','http://127.0.0.1:8000/elif-tasarim/').rstrip('/')+'/'
O=Path(os.environ.get('EVIDENCE_DIR',str(R/'evidence/v23/acceptance')));O.mkdir(parents=True,exist_ok=True)
report={'base':BASE,'checks':[],'limits':['Synthetic Chromium browser','Software WebGL where applicable','No external message sent','No physical product validation']}
def rec(name,detail=None):
 report['checks'].append({'name':name,'pass':True,'detail':detail});(O/'results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));print('PASS',name,flush=True)
with sync_playwright() as p:
 exe=os.environ.get('CHROMIUM_PATH','/usr/bin/chromium')
 b=p.chromium.launch(executable_path=exe if Path(exe).exists() else None,headless=True,args=['--no-sandbox','--disable-dev-shm-usage','--use-gl=angle','--use-angle=swiftshader'])
 page=b.new_page(viewport={'width':1440,'height':1000});page.set_default_timeout(20000);errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
 try:
  page.goto(BASE+'devir-01/',wait_until='domcontentloaded',timeout=60000);page.wait_for_selector('#app .v23-devir')
  assert page.locator('.preview-bar').inner_text().startswith('V23')
  hero=page.locator('.v23-product-visual img');hero.scroll_into_view_if_needed();page.wait_for_function("()=>document.querySelector('.v23-product-visual img')?.naturalWidth>0")
  box=hero.bounding_box();assert box and box['height']>280 and box['width']>500,box
  rec('01. Devir hero is a filled product visual, not an empty tall frame',box)
  cards=page.locator('.v23-start-grid>a');assert cards.count()==3
  for i in range(3):
   img=cards.nth(i).locator('img');img.scroll_into_view_if_needed();page.wait_for_function("(i)=>document.querySelectorAll('.v23-start-grid>a img')[i]?.naturalWidth>0",arg=i)
   assert cards.nth(i).locator('.v23-start-image').is_visible()
   href=cards.nth(i).get_attribute('href');assert '/tasarim-masasi/' in href and '?' in href,href
  assert page.locator('.v20-start-swatch').count()==0
  rec('02. All three starting concepts show a real product image and link to the configured 3D studio')
  assert page.locator('#devir-kullanim .v23-value-cards article').count()==3
  assert page.locator('.v23-proof-bridge').is_visible()
  rec('03. Product page explains use cases and clearly separates concept from real workshop work')
  page.screenshot(path=str(O/'devir-desktop.png'),full_page=True)

  page.set_viewport_size({'width':390,'height':844});page.reload(wait_until='domcontentloaded');page.wait_for_selector('#app .v23-devir')
  page.evaluate("()=>{[...document.querySelectorAll('img')].forEach(i=>i.loading='eager')}")
  page.wait_for_timeout(300)
  assert page.evaluate('document.documentElement.scrollWidth<=innerWidth+1')
  page.screenshot(path=str(O/'devir-mobile.png'),full_page=True)
  rec('04. Devir premium-finish page does not overflow at 390px')

  page.evaluate("()=>{[...document.body.querySelectorAll('*')].map(e=>[e,parseFloat(getComputedStyle(e).fontSize)]).forEach(([e,s])=>{if(Number.isFinite(s))e.style.fontSize=s*2+'px'})}")
  page.wait_for_timeout(150)
  assert page.evaluate('document.documentElement.scrollWidth<=innerWidth+1')
  rec('05. Devir reflows at controlled 200 percent text enlargement')

  manifest=json.loads((R/'dist/release-v23.json').read_text())
  audit=[]
  for route in manifest['routes']:
   url=BASE+(route.strip('/')+'/' if route!='/' else '')
   page.goto(url,wait_until='domcontentloaded',timeout=60000);page.wait_for_selector('#app main')
   page.evaluate("()=>{[...document.images].forEach(i=>i.loading='eager')}")
   page.evaluate("async()=>{await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})))}")
   d=page.evaluate("""()=>({text:(document.querySelector('main')?.innerText||'').trim().length,h1:document.querySelectorAll('main h1').length,broken:[...document.images].filter(i=>i.complete&&!i.naturalWidth&&i.getAttribute('src')).map(i=>i.getAttribute('src')),missing:document.querySelectorAll('.image-missing').length})""")
   ok=d['text']>=20 and d['h1']==1 and not d['broken'] and d['missing']==0
   audit.append({'route':route,**d,'pass':ok})
  (O/'route-content-audit.json').write_text(json.dumps(audit,ensure_ascii=False,indent=2))
  bad=[x for x in audit if not x['pass']];assert not bad,bad[:5]
  rec('06. Every published route has non-empty primary content, one page heading and no broken image',{'routes':len(audit)})
  assert not errors,errors;rec('07. No uncaught JavaScript error occurred in V23 audit')
 except Exception:
  report['failure']=traceback.format_exc();report['errors']=errors;(O/'results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));page.screenshot(path=str(O/'failure.png'),full_page=True);raise
 finally:b.close()
