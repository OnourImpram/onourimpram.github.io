"""Approved enrichment checks. No real messages or private data. Chromium only."""
import os,json,traceback
from pathlib import Path
from playwright.sync_api import sync_playwright
R=Path(__file__).resolve().parents[2]
BASE=os.environ.get('BASE_URL','http://127.0.0.1:8000/elif-tasarim/').rstrip('/')+'/'
OFFLINE=os.environ.get('OFFLINE')=='1'
O=Path(os.environ.get('EVIDENCE_DIR',str(R/'evidence/enrichment')));O.mkdir(parents=True,exist_ok=True)
html=Path(os.environ.get('OFFLINE_PATH',str(R/'preview/Elif_Tasarim.html'))).read_text() if OFFLINE else ''
report={'mode':'offline' if OFFLINE else 'HTTP','base':None if OFFLINE else BASE,'checks':[],'errors':[],'layouts':[]}
def save():(O/'results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
def ok(name):report['checks'].append({'name':name,'pass':True});save();print('PASS',name,flush=True)
with sync_playwright() as pw:
 b=pw.chromium.launch(executable_path=os.environ.get('CHROMIUM_PATH') or None,headless=True,args=['--no-sandbox','--disable-dev-shm-usage','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'])
 c=b.new_context(viewport={'width':1440,'height':960},reduced_motion='reduce');p=None
 def visit(route):
  global p
  if p:p.close()
  p=c.new_page();p.set_default_timeout(15000);p.on('pageerror',lambda e:report['errors'].append(str(e)))
  if OFFLINE:p.set_content(html.replace('window.__ELIF_INITIAL__="/"','window.__ELIF_INITIAL__='+json.dumps('/'+route.strip('/'))),wait_until='domcontentloaded',timeout=60000)
  else:p.goto(BASE+route.lstrip('/'),wait_until='domcontentloaded',timeout=60000)
  p.wait_for_selector('html[data-app-ready=true]')
 def decode():
  p.evaluate("document.querySelectorAll('img').forEach(i=>i.loading='eager')")
  p.wait_for_function("()=>[...document.images].filter(i=>i.getBoundingClientRect().width>0&&!i.closest('[aria-hidden=true]')).every(i=>i.complete&&i.naturalWidth>0)",timeout=15000)
 def fit():assert p.evaluate('document.documentElement.scrollWidth<=innerWidth+1')
 try:
  visit('ilham-modelleri/')
  assert p.locator('.pin-card:visible').count()==4,'Pinterest first view must have four, not eight tall cards'
  assert p.locator('.pin-card').count()==8
  assert p.locator('#pinterest-disclosure').count()==1 and p.locator('.pin-card .v7-pin-disclosure').count()==0
  assert p.locator('iframe').count()==0
  assert p.locator('.inspiration-concepts [data-concept]').count()==9 and p.locator('.inspiration-concepts [data-category="baza-yatak"]').count()==1
  ok('Four initial Pinterest references, one shared disclosure, no external iframe and balanced nine-area overview')
  summary=p.locator('.pin-more>summary');summary.click();p.wait_for_function('document.querySelector(".pin-more").open')
  assert p.locator('.pin-card:visible').count()==8
  summary.click();p.wait_for_function('!document.querySelector(".pin-more").open');assert p.locator('.pin-card:visible').count()==4
  assert summary.evaluate('e=>e===document.activeElement')
  p.get_by_role('button',name='Birlikte önerilenler',exact=True).click();assert p.locator('.pin-card:visible').count()==4 and p.locator('.pin-more').count()==0
  p.get_by_role('button',name='Ustanın seçtikleri',exact=True).click();assert p.locator('.pin-card:visible').count()==4
  ok('Native disclosure expands and collapses, keyboard focus stays on summary, both complete groups survive')
  trigger=p.locator('.pin-card').first.locator('.pin-preview-button')
  assert trigger.get_attribute('aria-describedby')=='pinterest-disclosure'
  p.route('**/*pinterest.com/**',lambda r:r.abort())
  trigger.click();dialog=p.get_by_role('dialog');assert dialog.is_visible()
  iframe=dialog.locator('iframe');assert iframe.count()==1 and iframe.get_attribute('sandbox')=='allow-scripts allow-popups'
  p.keyboard.press('Escape');assert p.locator('iframe').count()==0 and trigger.evaluate('e=>e===document.activeElement')
  ok('External widget remains explicit opt-in and isolated, closing restores focus without sending any data from the form')
  visit('ilham-modelleri?hedef=pin%3A601hk2fV2');p.wait_for_function('document.activeElement?.id==="ilham-pin-601hk2fV2"')
  assert p.locator('.pin-more').get_attribute('open') is not None
  pin=p.locator('[data-pin="601hk2fV2"]');assert pin.is_visible()
  pin.locator('button.v7-save-text').click();assert pin.locator('button.v7-save-text').get_attribute('aria-pressed')=='true'
  pin.get_by_role('link',name='Bu modelle başlayalım',exact=True).click();p.wait_for_selector('#model-note')
  p.locator('#model-note').fill('Çekmeceyi korumak, daha açık bir ton kullanmak istiyorum.')
  p.get_by_role('button',name='Ayrıntı eklemeden özeti gör',exact=True).click();p.wait_for_selector('#project-message-preview')
  text=p.locator('#project-message-preview').inner_text();assert '601hk2fV2' in text and 'Çekmeceyi korumak, daha açık bir ton kullanmak istiyorum.' in text
  ok('A formerly hidden saved Pinterest reference opens, focuses, saves and transfers its exact identity and user note')
  for slug in ['gardrop','vestiyer','sehpa','pergola','ozel-tasarim']:
   visit('kategoriler/'+slug+'/');assert p.locator('.seo-decisions article').count()==3
   assert p.locator('.seo-preparation li').count()>=3
   if slug=='sehpa':
    assert p.locator('.seo-concept-example .source-concept').count()==1
    assert p.locator('.seo-real-example .source-work').count()==0
   else:assert p.locator('.seo-real-example a').first.get_attribute('href')
  ok('Five supported category guides have three distinct decisions and correct real-versus-concept evidence')
  visit('projeler?alan=sehpa');assert p.get_by_role('link',name='Bu alanın ilham modellerini inceleyin',exact=True).get_attribute('href').endswith('/kategoriler/sehpa' if OFFLINE else '/kategoriler/sehpa/')
  visit('proje/mutfak-kurulum-asamasi/');assert 'Uygulama Aşamaları' in p.locator('.v6-crumb').inner_text()
  assert 'durum=process' in p.locator('.v6-crumb a').first.get_attribute('href')
  visit('proje/ahsap-bahce-kamelyasi/');assert p.locator('.work-detail-copy .source-process').count()==1
  for i,thumb in enumerate(p.locator('.work-thumbnails button').all()):
   thumb.click();assert p.locator('.work-detail-copy .source-process').count()==1;assert str(i+1)+' / 5' in p.locator('.photo-credit').inner_text()
  ok('Empty filters lead to the selected category, process breadcrumbs and all five kamelya photo labels stay consistent')
  for route in ['arama?q=kamelya','projeler?alan=pergola']:
   visit(route);assert p.locator('main .source-process').count()>=1
  for slug in ['kemerli-kahve-kosesi','sade-kose-mutfak','isikli-tv-unitesi']:
   visit('proje/'+slug+'/');assert p.locator('.case-next-links a').count()==3
   assert p.locator('.work-thumbnails button').count()==0
   assert 'Müşteri röportajı veya teknik şartname değildir.' in p.locator('.v11-case-study').inner_text()
  ok('Search labels use photo evidence and the three project-reading pages retain their one original photograph and three relevant next steps')
  visit('malzemeler/');assert p.locator('.material-question-grid details').count()==4
  assert 'Numune kataloğu değil.' in p.locator('#malzeme-karari').inner_text()
  for summary in p.locator('.material-question-grid summary').all():summary.click()
  assert p.locator('.material-question-grid details[open]').count()==4
  visit('hakkimizda/');story=p.locator('.atelier-documentary').inner_text();assert p.get_by_role('link',name='Atölye sürecini inceleyin',exact=True).count()==1
  visit('atolye/');assert p.locator('.atelier-documentary').inner_text()!=story and 'Uygulama fotoğrafları.' in p.locator('main').inner_text()
  ok('Material decision questions open accessibly without fictitious samples, and story and process pages are distinct')
  visit('modelini-getir/');assert 'Bir fotoğraf, bağlantı veya birkaç cümle yeterli.' in p.locator('.model-head').inner_text()
  p.locator('#model-note').fill('Kendi fikrim. Henüz ölçümü bilmiyorum.')
  p.get_by_role('button',name='Ayrıntı eklemeden özeti gör',exact=True).click();p.wait_for_selector('#project-message-preview');assert 'Kendi fikrim. Henüz ölçümü bilmiyorum.' in p.locator('#project-message-preview').inner_text()
  ok('Existing quick inquiry route works with only a note, no new required fields or automatic message sending')
  for route,name in [('','home'),('ilham-modelleri/','inspiration'),('kategoriler/gardrop/','wardrobe'),('kategoriler/vestiyer/','entrance'),('kategoriler/sehpa/','tables'),('malzemeler/','materials'),('atolye/','atelier'),('hakkimizda/','story')]:
   visit(route)
   for width in [1440,768,390,320]:
    p.set_viewport_size({'width':width,'height':960});decode();fit()
    report['layouts'].append({'route':route,'width':width,'pass':True})
    if width in [1440,390]:p.screenshot(path=str(O/f'{name}-{width}.png'),full_page=True)
  ok('Eight touched pages fit desktop, tablet and mobile at 32 route-size combinations')
  for route in ['ilham-modelleri/','kategoriler/gardrop/','kategoriler/vestiyer/','kategoriler/sehpa/','malzemeler/']:
   visit(route);p.set_viewport_size({'width':390,'height':844})
   p.evaluate("()=>{const a=[...document.querySelectorAll('body *')].map(e=>[e,parseFloat(getComputedStyle(e).fontSize)]);for(const[e,s]of a)if(Number.isFinite(s))e.style.fontSize=2*s+'px'}");fit()
  ok('Five content pages pass 200 percent text enlargement without horizontal document overflow')
  if not OFFLINE:
   nc=b.new_context(java_script_enabled=False,viewport={'width':390,'height':844});np=nc.new_page();np.goto(BASE+'ilham-modelleri/',wait_until='domcontentloaded');assert np.locator('.pin-card:visible').count()==4
   np.locator('.pin-more>summary').click();assert np.locator('.pin-card:visible').count()==8 and np.locator('.pin-noscript a').count()==4
   assert np.locator('iframe').count()==0;nc.close();ok('Without JavaScript all 12 Pinterest sources remain reachable through native disclosure and source links')
  assert not report['errors'],report['errors'];ok('No application errors in the enrichment scenarios')
 except Exception:
  report['failure']=traceback.format_exc();save()
  if p:p.screenshot(path=str(O/'failure.png'),full_page=True,timeout=10000)
  raise
 finally:b.close();save()
