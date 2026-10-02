"""V25 integration, visual proportions and responsive regression checks.
Runs on HTTP in CI. OFFLINE=1 uses the self-contained local preview.
Only synthetic selections and drafts. Never sends a message or places an order.
"""
from pathlib import Path
import json,os,traceback
from playwright.sync_api import sync_playwright
R=Path(__file__).resolve().parents[2]
BASE=os.environ.get('BASE_URL','http://127.0.0.1:8000/elif-tasarim/').rstrip('/')+'/'
OFFLINE=os.environ.get('OFFLINE')=='1'
O=Path(os.environ.get('EVIDENCE_DIR',str(R/'evidence/v25')));O.mkdir(parents=True,exist_ok=True)
report={'mode':'offline preview' if OFFLINE else 'HTTP','base':None if OFFLINE else BASE,'checks':[],'matrix':[],'errors':[], 'limitations':['Chromium viewport simulation, not physical-device certification','Images are concepts, not validated furniture engineering','No messages, calls, payments or orders sent']}
html=(R/'preview/Elif_Tasarim.html').read_text() if OFFLINE else ''
def save(): (O/'results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
def ok(name):report['checks'].append({'name':name,'pass':True});save();print('PASS',name,flush=True)
with sync_playwright() as pw:
 exe=os.environ.get('CHROMIUM_PATH','')
 b=pw.chromium.launch(executable_path=exe or None,headless=True,args=['--no-sandbox','--disable-dev-shm-usage','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'])
 ctx=b.new_context(viewport={'width':1440,'height':1000},reduced_motion='reduce');p=ctx.new_page();p.set_default_timeout(15000);p.on('pageerror',lambda e:report['errors'].append(str(e)))
 def visit(route):
  if OFFLINE:
   p.evaluate('history.replaceState(null,"","#")')
   p.set_content(html.replace('window.__ELIF_INITIAL__="/"','window.__ELIF_INITIAL__='+json.dumps('/'+route.strip('/'))),wait_until='domcontentloaded',timeout=60000)
  else:p.goto(BASE+route.lstrip('/'),wait_until='domcontentloaded',timeout=60000)
  p.wait_for_selector('html[data-app-ready=true]')
 def decode():p.evaluate("async()=>{document.querySelectorAll('img').forEach(i=>i.loading='eager');await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})))}")
 def shot(name):decode();p.screenshot(path=str(O/name),full_page=True)
 try:
  visit('kategoriler/baza-yatak/');assert p.locator('[data-bed]').count()==8
  assert p.locator('h1').count()==1 and 'size ait bir yer' in p.locator('h1').inner_text()
  assert p.locator('meta[name=elif-release]').get_attribute('content')=='v25.2-evidence-and-discovery'
  assert p.locator('meta[name=robots]').get_attribute('content')=='noindex,nofollow'
  assert 'yapay zekâ' in p.locator('.bed-hero-disclosure').inner_text()
  ok('01. Eight approved concepts have one dedicated V25 route and truthful metadata')
  filters=p.get_by_role('group',name='Baza tasarım türü')
  for name,count in [('Ahşap ağırlıklı',4),('Döşemeli yorumlar',4),('Tüm modeller',8)]:
   filters.get_by_role('button',name=name,exact=True).click();assert p.locator('[data-bed]').count()==count
  ok('02. All, wood and upholstery filters produce exactly 8, 4 and 4 models')
  for card in p.locator('[data-bed]').all():
   img=card.locator('.bed-zoom>img');closed=img.get_attribute('src')
   card.get_by_role('button',name='Depolama görünümü',exact=True).click();assert img.get_attribute('src')!=closed
   assert card.get_by_role('button',name='Depolama görünümü',exact=True).get_attribute('aria-pressed')=='true'
   card.get_by_role('button',name='Kapalı görünüm',exact=True).click();assert img.get_attribute('src')==closed
   bounds=img.bounding_box();assert abs(bounds['width']/bounds['height']-1.5)<0.01,bounds
   assert img.evaluate('e=>getComputedStyle(e).objectFit')=='contain'
  ok('03. All 16 views switch correctly and all 8 product frames retain true 3:2 proportions')
  card=p.locator('[data-bed=ceviz-yalin]');trigger=card.locator('.bed-zoom');trigger.click();dialog=p.get_by_role('dialog');assert dialog.is_visible()
  assert 'Konsept model' in dialog.inner_text();dialog.get_by_role('button',name='Depolama görünümü',exact=True).focus();p.keyboard.press('ArrowRight')
  assert dialog.get_by_role('button',name='Depolama görünümü',exact=True).get_attribute('aria-pressed')=='true'
  p.screenshot(path=str(O/'bed-gallery.png'));p.keyboard.press('Escape');assert p.get_by_role('dialog').count()==0
  assert trigger.evaluate('e=>e===document.activeElement')
  ok('04. Gallery opens, arrow-key switching works and Escape restores focus to its trigger')
  card.get_by_role('button',name='İlham dosyama ekle. Ceviz Yalın',exact=True).click();assert card.locator('.bed-save').get_attribute('aria-pressed')=='true'
  card.get_by_role('link',name='Bu modeli konuşalım',exact=True).click();p.wait_for_selector('#model-note')
  assert 'Ceviz' in p.locator('main').inner_text()
  p.get_by_role('button',name='Ayrıntı eklemeden özeti gör',exact=True).click();p.wait_for_selector('#project-message-preview')
  message=p.locator('#project-message-preview').inner_text();assert 'Ceviz' in message and 'concept:ceviz-yalin' in message
  assert p.locator('a[data-whatsapp-message]').count()==1
  p.screenshot(path=str(O/'bed-model-handoff.png'),full_page=True)
  ok('05. Saved model and inquiry retain the exact concept identity through the summary, without sending')
  visit('kategoriler/baza-yatak/');p.set_viewport_size({'width':1440,'height':1000});shot('collection-desktop.png')
  for width in [320,390,768,1024,1440]:
   p.set_viewport_size({'width':width,'height':900});decode()
   assert p.evaluate('document.documentElement.scrollWidth<=innerWidth+1'),width
   for img in p.locator('.bed-zoom>img,.bed-hero-visual>img').all():
    box=img.bounding_box();assert abs(box['width']/box['height']-1.5)<0.015,(width,box)
   if width==390:shot('collection-mobile.png')
  ok('06. New collection fits five viewports from 320 to 1440 pixels without distorted images')
  p.set_viewport_size({'width':390,'height':844})
  p.evaluate("()=>{const a=[...document.body.querySelectorAll('*')].map(e=>[e,parseFloat(getComputedStyle(e).fontSize)]);for(const[e,s]of a)if(Number.isFinite(s))e.style.fontSize=2*s+'px'}")
  assert p.evaluate('document.documentElement.scrollWidth<=innerWidth+1');shot('collection-text-200.png')
  ok('07. 200 percent text-size stress keeps the new collection within the mobile viewport')
  if not OFFLINE:
   nojs=b.new_context(java_script_enabled=False,viewport={'width':390,'height':844});q=nojs.new_page();q.goto(BASE+'kategoriler/baza-yatak/',wait_until='networkidle');assert q.locator('[data-bed]').count()==8
   assert q.locator('.bed-direct-views a').count()==16;assert q.locator('h1').count()==1
   q.screenshot(path=str(O/'collection-no-js.png'),full_page=True);nojs.close()
   ok('08. JavaScript-disabled collection exposes all eight concepts and sixteen full-view links')
  visit('');p.set_viewport_size({'width':1440,'height':1000});assert p.locator('.bed-home-teaser').count()==0
  assert p.locator('.home-inspiration [data-concept]').count()==3
  assert len(set(p.locator('.home-inspiration [data-concept]').evaluate_all("es=>es.map(e=>e.dataset.category)")))==3
  ys=p.locator('.v9-category-ribbon>a').evaluate_all('es=>es.map(e=>Math.round(e.getBoundingClientRect().top))');assert len(ys)==9 and len(set(ys))==1,ys
  assert p.locator('.home-works').evaluate('e=>e.compareDocumentPosition(document.querySelector(".home-inspiration"))&Node.DOCUMENT_POSITION_FOLLOWING')
  assert p.get_by_role('navigation',name='Ana gezinme').get_by_role('link',name='3D Stüdyo',exact=True).count()==1
  shot('home-desktop.png');p.set_viewport_size({'width':390,'height':844});shot('home-mobile.png')
  ok('09. Real work remains first on the homepage, followed by diverse inspiration and one 3D studio')
  routes=json.loads((R/'dist/release-v25.json').read_text())['routes']
  for width in [320,390,768,1440]:
   p.set_viewport_size({'width':width,'height':900})
   for route in routes:
    if OFFLINE:
     p.evaluate('(r)=>{location.hash="#"+r}',route);p.wait_for_timeout(90)
    else:
     p.goto(BASE+('' if route=='/' else route.strip('/')+'/'),wait_until='domcontentloaded',timeout=60000);p.wait_for_selector('html[data-app-ready=true]')
    d=p.evaluate("()=>({h1:document.querySelectorAll('main h1').length,scroll:document.documentElement.scrollWidth,width:innerWidth})")
    assert d['h1']==1 and d['scroll']<=width+1,(route,width,d)
    report['matrix'].append({'route':route,'viewport':width,'pass':True})
   print('MATRIX',width,len(report['matrix']),flush=True);save()
  ok('10. All 51 routes retain one primary heading and no horizontal overflow across 204 page-viewports')
  assert not report['errors'],report['errors'];ok('11. No uncaught application errors during the V25 regression checks')
 except Exception:
  report['failure']=traceback.format_exc();save();p.screenshot(path=str(O/'failure.png'),full_page=True);raise
 finally:b.close();save()
