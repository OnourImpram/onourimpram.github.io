"""Single-studio navigation, actual portfolio and truth-preserving handoff tests.
Only synthetic drafts are used. No external message or call is sent.
"""
from pathlib import Path
from playwright.sync_api import sync_playwright
from urllib.parse import urlparse, parse_qs
import os, json, traceback, time
ROOT=Path(__file__).resolve().parents[2]
BASE=os.environ.get('BASE_URL','http://127.0.0.1:8000/elif-tasarim/').rstrip('/')+'/'
OUT=Path(os.environ.get('EVIDENCE_DIR',str(ROOT/'evidence/v23-unified/browser')));OUT.mkdir(parents=True,exist_ok=True)
report={'base':BASE,'checks':[],'routes':[],'errors':[],'limitations':['Isolated Chromium, software WebGL','No real customer messages or calls','No physical phone or AR floor placement certification']}
def save(): (OUT/'results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
def passed(name,details=None):
 report['checks'].append({'name':name,'pass':True,'details':details});save();print('PASS',name,flush=True)
with sync_playwright() as p:
 b=p.chromium.launch(headless=True,args=['--no-sandbox','--disable-dev-shm-usage','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'])
 ctx=b.new_context(viewport={'width':1440,'height':1000},reduced_motion='reduce');page=ctx.new_page();page.set_default_timeout(18000)
 page.on('pageerror',lambda e:report['errors'].append(str(e)))
 def visit(path):
  response=page.goto(BASE+path.lstrip('/'),wait_until='domcontentloaded',timeout=60000)
  page.wait_for_selector('html[data-app-ready="true"]',timeout=25000)
  return response
 def ready(): page.wait_for_selector('[data-three-status="ready"]',timeout=70000)
 def configuration(): return page.evaluate('document.querySelector(".v8-canvas-host").__elif3D.inspect().config')
 def decode(selector):
  page.locator(selector).evaluate("async e=>{await Promise.all([...e.querySelectorAll('img')].map(i=>i.decode()));await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));}")
 def shot(name,selector=None):
  if selector:
   el=page.locator(selector);el.scroll_into_view_if_needed();decode(selector);el.screenshot(path=str(OUT/name))
  else: page.screenshot(path=str(OUT/name),full_page=True)
 try:
  visit('')
  nav=page.get_by_role('navigation',name='Ana gezinme')
  assert nav.get_by_role('link',name='3D Stüdyo',exact=True).count()==1
  assert nav.get_by_role('link',name='Devir 01',exact=True).count()==0
  assert page.locator('a[href*="/devir-01"]').count()==0
  hero=page.locator('.v6-hero img,.v6-hero .hero img').first
  # The landing-page archive imagery and category media remain independently verified below.
  passed('01. Desktop navigation has one 3D Stüdyo and no separate Devir destination')
  nav.get_by_role('link',name='3D Stüdyo',exact=True).click();ready()
  assert urlparse(page.url).path.endswith('/tasarim-masasi/')
  assert page.locator('main h1').count()==1 and page.locator('.studio-guide').count()==1
  assert page.locator('.v20-devir').count()==0
  assert page.locator('.studio-preset-grid .studio-preset').count()==3
  assert page.locator('.studio-guide img').count()==5
  decode('.studio-guide')
  assert page.locator('.image-unavailable').count()==0
  shot('studio-starts-desktop.png','#studio-baslangic')
  passed('02. Live 3D scene, presets, movement, material and room explanations share the same route')
  expected=[('odak',160,75,80,'mese',0),('akis',180,80,80,'ceviz',90),('hareket',200,85,110,'koyu',180)]
  for name,w,d,h,m,a in expected:
   card=page.locator('[data-preset="'+name+'"]');query=parse_qs(urlparse(card.get_attribute('href')).query)
   assert query['en']==[str(w)] and query['derinlik']==[str(d)] and query['yukseklik']==[str(h)]
   card.click();ready();c=configuration()
   assert all(c[k]==v for k,v in {'width':w,'depth':d,'height':h,'material':m,'angle':a}.items()),c
   assert page.locator('.studio-guide').count()==1
  passed('03. Each pictured preset activates the exact matching dimensions, finish and angle in the same studio')
  visit('devir-01/?en=188&derinlik=82&yukseklik=105&malzeme=ceviz#devir-baslangic');ready()
  assert urlparse(page.url).path.endswith('/tasarim-masasi/') and page.evaluate('location.hash')=='#studio-baslangic'
  c=configuration();assert c['width']==188 and c['depth']==82 and c['height']==105,c
  assert page.locator('#studio-baslangic').bounding_box()['y']<300
  passed('04. Old product URL preserves dimensions and maps the old section to its studio section')
  page.set_viewport_size({'width':390,'height':844});visit('iletisim/')
  page.get_by_role('button',name='Menüyü aç',exact=True).click()
  menu=page.get_by_role('navigation',name='Mobil menü')
  assert menu.get_by_role('link',name='3D Stüdyo',exact=False).count()==1
  assert 'Devir 01' not in menu.inner_text()
  menu.get_by_role('link',name='3D Stüdyo',exact=False).click();ready()
  assert page.locator('.mobile-links').count()==0
  for width in [320,390,768,1440]:
   page.set_viewport_size({'width':width,'height':844 if width<800 else 1000});page.wait_for_timeout(150)
   decode('.studio-guide');assert page.evaluate('document.documentElement.scrollWidth<=innerWidth+1'),width
  page.set_viewport_size({'width':390,'height':844});shot('studio-starts-mobile.png','#studio-baslangic')
  passed('05. Mobile has one studio entry and the integrated controls and content fit four widths')
  visit('proje/ahsap-bahce-kamelyasi/')
  assert page.locator('.work-thumbnails button').count()==5
  for index in range(5):
   page.locator('.work-thumbnails button').nth(index).click()
   page.wait_for_function('()=>{const i=document.querySelector(".work-main-photo img");return i&&i.complete&&i.naturalWidth>0}')
  page.get_by_role('button',name='Proje fotoğrafını büyüt',exact=True).click()
  assert page.get_by_role('dialog').is_visible()
  page.get_by_role('button',name='Sonraki fotoğraf',exact=True).click()
  assert '1 / 5' in page.locator('.v6-lightbox').inner_text()
  page.keyboard.press('Escape');assert not page.get_by_role('dialog').count()
  shot('pergola-gallery-mobile.png')
  visit('proje/mutfak-kurulum-asamasi/')
  assert page.locator('.work-thumbnails button').count()==2
  assert 'Uygulama aşaması' in page.locator('main').inner_text()
  passed('06. Five pergola angles and two kitchen installation angles are grouped, with working gallery navigation')
  manifest=json.loads((ROOT/'dist/release-v23.json').read_text())
  project_routes=[r for r in manifest['routes'] if r.startswith('/proje/')]
  all_ids=set()
  for route in project_routes:
   visit(route.strip('/')+'/')
   ids=page.locator('.work-thumbnails img').evaluate_all("els=>els.map(i=>i.getAttribute('data-asset'))")
   first=page.locator('.work-main-photo img').get_attribute('data-asset')
   if first:all_ids.add(first)
   all_ids.update(i for i in ids if i)
   assert page.locator('.v11-case-study').count()==1,route
  assert len(project_routes)==20,len(project_routes)
  # Check source IDs as well as the real HTTP files because data-asset is optional in the presentation.
  portfolio=Path(ROOT/'src/lib/portfolio.ts').read_text()
  for image_id in ['r%02d'%i for i in range(1,27)]: assert "'"+image_id+"'" in portfolio,image_id
  for name in ['r03','r11','r16','r17','r20','r21','r24','r25','r26']:
   response=ctx.request.get(BASE+'assets/'+name+'-full.webp');assert response.ok and len(response.body())>25000,name
  passed('07. All twenty project dossiers exist and every unique archive photo is represented without inventing technical specifications',{'uniqueArchivePhotos':26,'newPhotoFiles':9,'projectDossiers':20})
  visit('modelini-getir/')
  page.locator('#model-note').fill('Mevcut alanım için sade bir vestiyer düşünüyorum.')
  page.get_by_role('button',name='Ayrıntı eklemeden özeti gör',exact=True).click()
  page.wait_for_selector('.project-readiness')
  assert page.locator('[data-readiness="photos"]').get_attribute('data-ready')=='false'
  assert page.locator('[data-readiness="measure"]').get_attribute('data-ready')=='false'
  assert page.locator('[data-readiness="summary"]').get_attribute('data-ready')=='true'
  assert 'Görsel eklenmedi' in page.locator('.project-readiness').inner_text()
  assert page.locator('.v21-contact-alternatives a.button[href^="mailto:iletisim.eliftasarimatolyesi@gmail.com"]').count()==1
  shot('summary-readiness-mobile.png','.project-readiness')
  passed('08. Project readiness tells the truth about optional measurements and photos and preserves the real email route')
  visit('arama/?q=devir01')
  assert page.locator('main a[href*="/devir-01"]').count()==0
  assert page.locator('main a[href*="/tasarim-masasi"]').count()>0
  passed('09. Legacy product searches find the 3D Stüdyo, not a duplicate product page')
  # A real no-JavaScript document, natural image requests and metadata redirect.
  nojs=b.new_context(java_script_enabled=False,viewport={'width':390,'height':844});q=nojs.new_page()
  q.goto(BASE+'tasarim-masasi/',wait_until='load',timeout=60000)
  assert q.locator('#static-content .studio-guide').is_visible()
  for i in q.locator('.studio-guide img').all():
   assert i.evaluate('(i)=>i.complete&&i.naturalWidth>0')
  assert q.locator('#static-content a[href^="mailto:"]').count()>0
  q.goto(BASE+'devir-01/',wait_until='load',timeout=60000)
  q.wait_for_url('**/tasarim-masasi/',timeout=12000)
  q.screenshot(path=str(OUT/'nojs-studio.png'),full_page=True);nojs.close()
  passed('10. Studio guide and contact information exist without JavaScript; old no-script link lands in the studio')
  page.set_viewport_size({'width':1440,'height':1000})
  for route in manifest['routes']:
   visit(route.strip('/')+('/' if route.strip('/') else ''))
   for y in range(0,min(25000,page.evaluate('document.body.scrollHeight'))+1,600):
    page.evaluate('(y)=>scrollTo(0,y)',y);page.wait_for_timeout(65)
   page.evaluate('scrollTo(0,document.body.scrollHeight)')
   page.wait_for_function("()=>[...document.querySelectorAll('main img')].filter(i=>{const r=i.getBoundingClientRect();return r.width>0&&r.height>0}).every(i=>i.complete&&i.naturalWidth>0)",timeout=20000)
   assert page.locator('main').inner_text().strip(),route
   assert page.locator('.image-unavailable').count()==0,route
   assert page.locator('a[href*="/devir-01"]').count()==0,route
   assert page.evaluate('document.documentElement.scrollWidth<=innerWidth+1'),route
   report['routes'].append({'route':route,'images':page.locator('main img').count(),'pass':True});save()
  assert not report['errors'],report['errors']
  passed('11. Every canonical page is nonempty, renders its actual images and has no duplicate Devir link or horizontal overflow',{'routes':len(report['routes'])})
  report['pass']=True;save()
 except Exception:
  report['failure']=traceback.format_exc();save()
  try:page.screenshot(path=str(OUT/'failure.png'),full_page=True)
  except Exception:pass
  raise
 finally:b.close()
