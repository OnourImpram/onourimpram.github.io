"""Actual HTTP and rendered media tests. No client messages are submitted."""
from pathlib import Path
from playwright.sync_api import sync_playwright
from urllib.parse import urlparse,parse_qs
import os,json,traceback
ROOT=Path(__file__).resolve().parents[2]
BASE=os.environ.get('BASE_URL','http://127.0.0.1:8000/elif-tasarim/').rstrip('/')+'/'
OUT=Path(os.environ.get('EVIDENCE_DIR',str(ROOT/'evidence/v23/visibility')));OUT.mkdir(parents=True,exist_ok=True)
report={'base':BASE,'checks':[],'routes':[],'limitations':['Isolated Chromium browser, software WebGL','No physical phone or message delivery test','Deliberate request failures are scoped to test contexts']}
def save(): (OUT/'results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
def passed(name,detail=None):report['checks'].append({'name':name,'pass':True,'detail':detail});save();print('PASS',name,flush=True)
with sync_playwright() as p:
 b=p.chromium.launch(headless=True,args=['--no-sandbox','--disable-dev-shm-usage','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'])
 ctx=b.new_context(viewport={'width':1440,'height':1000},reduced_motion='reduce');page=ctx.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
 def visit(path):
  page.goto(BASE+path.lstrip('/'),wait_until='domcontentloaded',timeout=60000);page.wait_for_selector('html[data-app-ready="true"]')
 def devir_ready():
  page.wait_for_function("()=>document.querySelectorAll('.v20-devir img').length===6&&[...document.querySelectorAll('.v20-devir img')].every(i=>i.complete&&i.naturalWidth>0)",timeout=12000)
 try:
  visit('devir-01/');devir_ready();assert page.locator('.image-unavailable').count()==0
  r=page.locator('.v20-product-visual .photo').bounding_box();assert abs(r['width']/r['height']-1.5)<.02
  page.screenshot(path=str(OUT/'devir-desktop.png'),full_page=True)
  passed('01. Direct Devir has all six actual images, with no lazy-scroll dependency or portrait letterboxing')
  expected=[('odak',160,75,80,'mese',0),('akis',180,80,80,'ceviz',90),('hareket',200,85,110,'koyu',180)]
  cards=page.locator('.v20-start-grid>a')
  for index,(name,w,d,h,m,a) in enumerate(expected):
   card=cards.nth(index);assert 'devir-'+name+'-v23.webp' in card.locator('img').get_attribute('src')
   q=parse_qs(urlparse(card.get_attribute('href')).query)
   assert q['en']==[str(w)] and q['derinlik']==[str(d)] and q['yukseklik']==[str(h)]
  passed('02. Every starting card has a distinct actual render and matching dimension link')
  page.locator('#devir-baslangic').screenshot(path=str(OUT/'starting-cards.png'))
  cards.nth(0).click();page.wait_for_selector('[data-three-status="ready"]',timeout=60000)
  config=page.evaluate("document.querySelector('.v8-canvas-host').__elif3D.inspect().config")
  assert config['width']==160 and config['depth']==75 and config['height']==80 and config['material']=='mese' and config['angle']==0
  page.go_back(wait_until='domcontentloaded');devir_ready();passed('03. Product choice reaches matching real geometry and back navigation restores the product')
  visit('iletisim/');page.get_by_role('navigation',name='Ana gezinme').get_by_role('link',name='Devir 01',exact=True).click();devir_ready();passed('04. In-site menu navigation preserves visible Devir content')
  visit('devir-01/#devir-baslangic');devir_ready();page.wait_for_timeout(300)
  assert page.evaluate("location.hash==='#devir-baslangic'")
  target=page.locator('#devir-baslangic').bounding_box();assert target and 0<=target['y']<250,target
  passed('05. Direct section link remains on its actual section after hydration')
  for width in [320,390,768,1440]:
   page.set_viewport_size({'width':width,'height':844 if width<800 else 1000});page.evaluate('scrollTo(0,0)');page.wait_for_timeout(150);devir_ready()
   assert page.evaluate('document.documentElement.scrollWidth<=innerWidth+1')
   if width==390:
    photo=page.locator('.v20-room-editorial .photo').bounding_box();copy=page.locator('.v20-room-editorial>div').bounding_box();assert copy['y']>=photo['y']+photo['height']-1
    page.screenshot(path=str(OUT/'devir-mobile.png'),full_page=True)
  passed('06. Four widths have visible media and mobile editorial text no longer covers the room')
  page.close();ctx.close()
  ctx=b.new_context(viewport={'width':1280,'height':900});ctx.route('**/config.*.js',lambda route:route.abort());page=ctx.new_page();visit('devir-01/');devir_ready()
  assert page.locator('.missing-page').count()==0 and 'DEVİR' in page.locator('main h1').inner_text()
  assert page.evaluate("window.__ELIF_BASE__==='/elif-tasarim'&&!window.__ELIF_ASSETS__")
  page.screenshot(path=str(OUT/'registry-blocked-recovered.png'),full_page=True);passed('07. Blocked registry script recovers the correct route and subpath media, not a false 404')
  page.close();ctx.close()
  attempts=[];ctx=b.new_context(viewport={'width':1280,'height':900})
  def transient(route):
   attempts.append(route.request.url)
   if 'elif-image-retry=1' not in route.request.url:route.abort()
   else:route.continue_()
  ctx.route('**/assets/devir-hareket-v23.webp*',transient);page=ctx.new_page();visit('devir-01/');devir_ready()
  assert any('elif-image-retry=1' in u for u in attempts) and len(attempts)<=4,attempts
  assert page.locator('.image-unavailable').count()==0;passed('08. Transient image failure retries once and recovers actual content',attempts)
  page.close();ctx.close()
  attempts=[];ctx=b.new_context(viewport={'width':390,'height':844})
  def fail(route):attempts.append(route.request.url);route.abort()
  ctx.route('**/assets/devir-hareket-v23.webp*',fail);page=ctx.new_page();visit('devir-01/')
  page.wait_for_function("()=>document.querySelectorAll('.v20-devir .image-unavailable').length===2",timeout=12000);page.wait_for_timeout(300)
  assert len(attempts)<=4,attempts
  assert 'Görsel yüklenemedi' in page.locator('.v20-product-visual').inner_text()
  assert page.get_by_role('link',name='Kendi Devir’inizi tasarlayın',exact=False).is_visible()
  assert page.locator('.image-unavailable button').count()==0
  page.screenshot(path=str(OUT/'image-failure-explicit-state.png'),full_page=True);passed('09. Persistent image failure is explicit, bounded and does not remove product actions',attempts)
  page.close();ctx.close()
  ctx=b.new_context(java_script_enabled=False,viewport={'width':390,'height':844});page=ctx.new_page();page.goto(BASE+'devir-01/',wait_until='domcontentloaded');devir_ready()
  assert page.locator('main h1').count()==1 and page.locator('a[href^="mailto:"]').count()>0
  page.screenshot(path=str(OUT/'devir-no-javascript.png'),full_page=True);passed('10. Product content, all media and contact links work without JavaScript')
  page.close();ctx.close()
  ctx=b.new_context(viewport={'width':1440,'height':1000},reduced_motion='reduce');page=ctx.new_page();page.on('pageerror',lambda e:errors.append(str(e)))
  manifest=json.loads((ROOT/'dist/release-v22.json').read_text())
  for route in manifest['routes']:
   visit(route.strip('/')+('/' if route.strip('/') else ''))
   for y in range(0,min(18000,page.evaluate('document.body.scrollHeight')),650):page.evaluate('(y)=>scrollTo(0,y)',y);page.wait_for_timeout(70)
   page.wait_for_function("()=>[...document.querySelectorAll('main img')].filter(i=>i.getBoundingClientRect().width>0&&i.getBoundingClientRect().height>0).every(i=>i.complete&&i.naturalWidth>0)",timeout=12000)
   assert page.locator('main').inner_text().strip(),route
   assert page.locator('.image-unavailable').count()==0,route
   assert page.evaluate('document.documentElement.scrollWidth<=innerWidth+1'),route
   report['routes'].append({'route':route,'mainCharacters':len(page.locator('main').inner_text()),'loadedImages':page.locator('main img').count(),'pass':True});save()
  assert not errors,errors;passed('11. Every canonical route has visible content and decoded media after normal scrolling',{'routes':len(report['routes']),'uncaughtErrors':errors})
 except Exception:
  report['failure']=traceback.format_exc();save()
  try:page.screenshot(path=str(OUT/'failure.png'),full_page=True)
  except Exception:pass
  raise
 finally:b.close()
