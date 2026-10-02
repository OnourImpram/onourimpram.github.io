"""Regression checks for the user-requested hierarchy repair, not merely route counts.
OFFLINE=1 renders the packaged local preview. CI checks HTTP and the real publication.
All input is synthetic. External contact links are never followed.
"""
from pathlib import Path
from playwright.sync_api import sync_playwright
import json,os,traceback
R=Path(__file__).resolve().parents[2]
O=Path(os.environ.get('EVIDENCE_DIR',str(R/'evidence/balance')));O.mkdir(parents=True,exist_ok=True)
OFFLINE=os.environ.get('OFFLINE')=='1';BASE=os.environ.get('BASE_URL','http://127.0.0.1:8000/elif-tasarim/').rstrip('/')+'/'
report={'mode':'offline' if OFFLINE else 'HTTP','checks':[],'screens':[],'errors':[],'externalMessagesSent':0}
original=['oval-orta-sehpa','kahve-ritueli','sakin-antre','yasam-duvari','evin-kalbi','duzenli-bir-alan','bahcede-zaman','bir-masanin-etrafinda']
html=(R/'preview/Elif_Tasarim.html').read_text() if OFFLINE else ''
def save(): (O/'results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
def ok(name):report['checks'].append({'name':name,'pass':True});save();print('PASS',name,flush=True)
with sync_playwright() as pw:
 b=pw.chromium.launch(executable_path=os.environ.get('CHROMIUM_PATH') or None,headless=True,args=['--no-sandbox','--disable-dev-shm-usage'])
 ctx=b.new_context(viewport={'width':1440,'height':960},reduced_motion='reduce');p=ctx.new_page();p.set_default_timeout(12000)
 p.on('pageerror',lambda e:report['errors'].append(str(e)))
 def visit(route):
  if OFFLINE:
   p.evaluate('history.replaceState(null,"","#")')
   p.set_content(html.replace('window.__ELIF_INITIAL__="/"','window.__ELIF_INITIAL__='+json.dumps('/'+route.strip('/'))),wait_until='domcontentloaded',timeout=45000)
  else:p.goto(BASE+route.lstrip('/'),wait_until='domcontentloaded',timeout=60000)
  p.wait_for_selector('html[data-app-ready=true]')
 def decode():p.evaluate("async()=>{document.querySelectorAll('img').forEach(i=>i.loading='eager');await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})))}")
 def shot(name):
  decode();p.evaluate('window.scrollTo(0,0)');p.wait_for_timeout(100)
  p.screenshot(path=str(O/name),full_page=True)
  report['screens'].append({'name':name,'width':p.viewport_size['width'],'height':p.evaluate('document.documentElement.scrollHeight')});save()
 def nooverflow():assert p.evaluate('document.documentElement.scrollWidth<=innerWidth+1')
 def cards():return p.locator('.inspiration-concepts [data-concept]')
 try:
  visit('');assert p.locator('.bed-home-teaser').count()==0
  assert p.locator('.home-works .work-card').count()==6
  assert p.locator('.home-inspiration [data-concept]').evaluate_all('es=>es.map(e=>e.dataset.concept)')==original[:3]
  assert p.locator('.home-yunus').evaluate('e=>e.compareDocumentPosition(document.querySelector(".home-inspiration"))&Node.DOCUMENT_POSITION_FOLLOWING')
  assert p.locator('.home-inspiration').evaluate('e=>e.compareDocumentPosition(document.querySelector(".v6-process"))&Node.DOCUMENT_POSITION_FOLLOWING')
  assert p.locator('.v9-category-ribbon>a').first.inner_text().endswith('Mutfak')
  ok('Home restores three diverse concepts after the family atelier, without a bed-only campaign')
  for width in [1440,1024,768,390,320]:
   p.set_viewport_size({'width':width,'height':960});decode();nooverflow()
   for card in p.locator('.home-inspiration [data-concept]').all():assert card.is_visible()
   assert p.locator('.home-inspiration [data-category="baza-yatak"]').count()==0
   if width in [1440,768,390]:shot('home-'+str(width)+'.png')
  ok('All three home ideas stay visible at five sizes, including the former tablet hidden-card breakpoint')
  visit('ilham-modelleri/');p.set_viewport_size({'width':1440,'height':960})
  assert cards().count()==9 and cards().evaluate_all('es=>es.map(e=>e.dataset.concept)')[:8]==original
  assert p.locator('.inspiration-concepts [data-category="baza-yatak"]').count()==1
  assert p.locator('.inspiration-concepts .bed-card,.inspiration-concepts .bed-view-controls,.inspiration-concepts .bed-details').count()==0
  ok('Overview includes eight original room ideas and one equally sized bed representative, never eight large bed cards')
  for width in [1440,1024,768,390,320]:
   p.set_viewport_size({'width':width,'height':960});decode();nooverflow()
   for c in cards().all():assert c.is_visible()
   if width in [1440,768,390]:shot('inspiration-'+str(width)+'.png')
  ok('Balanced overview remains visible and contained across desktop, tablet and mobile')
  p.set_viewport_size({'width':1440,'height':960});filters=p.get_by_role('group',name='İlham kategorisi')
  filters.get_by_role('button',name='Baza ve Yatak',exact=True).click();assert cards().count()==8;assert p.locator('.inspiration-concepts [data-bed]').count()==0
  assert p.locator('.inspiration-category-link a').get_attribute('href').startswith('#/kategoriler/baza-yatak' if OFFLINE else '/elif-tasarim/kategoriler/baza-yatak')
  filters.get_by_role('button',name='Kahve Köşesi',exact=True).click();assert cards().count()==1 and cards().first.get_attribute('data-concept')=='kahve-ritueli'
  filters.get_by_role('button',name='Tüm alanlar',exact=True).click();assert cards().count()==9
  ok('Category filters reveal all variants without sacrificing the multi-category overview')
  p.locator('[data-concept=ceviz-yalin] .concept-image').click();p.wait_for_selector('[data-bed=ceviz-yalin]')
  p.wait_for_function('document.activeElement?.id==="ilham-concept-ceviz-yalin"');assert p.locator('[data-bed]').count()==8
  assert p.locator('[data-bed=ceviz-yalin]').bounding_box()['y']<180
  card=p.locator('[data-bed=ceviz-yalin]');card.get_by_role('button',name='Depolama görünümü',exact=True).click();assert 'Depolama görünümü' in card.locator('img').get_attribute('alt')
  card.locator('.bed-zoom').click();assert p.get_by_role('dialog').is_visible();p.keyboard.press('Escape');assert card.locator('.bed-zoom').evaluate('e=>e===document.activeElement')
  ok('Compact bed tile reaches the exact detailed model, retaining open views, zoom and keyboard focus')
  visit('ilham-modelleri?hedef=concept%3Akum-dokusu');p.wait_for_function('document.activeElement?.id==="ilham-concept-kum-dokusu"')
  assert cards().count()==8 and p.get_by_role('button',name='Baza ve Yatak',exact=True).get_attribute('aria-pressed')=='true'
  ok('Legacy saved deep links reveal the correct bed category and focus the requested variant')
  visit('ilham-modelleri/');card=p.locator('[data-concept=oval-orta-sehpa]');card.locator('button.v7-save-text').click();assert card.locator('button.v7-save-text').get_attribute('aria-pressed')=='true'
  card.get_by_role('link',name='Bu fikirle başlayalım',exact=True).click();p.wait_for_selector('#model-note');assert 'Oval orta sehpa' in p.locator('main').inner_text()
  p.get_by_role('button',name='Ayrıntı eklemeden özeti gör',exact=True).click();p.wait_for_selector('#project-message-preview');assert 'concept:oval-orta-sehpa' in p.locator('#project-message-preview').inner_text()
  ok('Original non-bed ideas still save and retain their precise identity in the project summary')
  visit('ilham-modelleri/');jump=p.get_by_role('navigation',name='İlham seçkileri').get_by_role('link',name='Pinterest seçkileri',exact=True)
  assert jump.get_attribute('href')=='#pinterest-seckileri';jump.click();p.wait_for_timeout(150);assert p.locator('#pinterest-seckileri').bounding_box()['y']<200
  assert p.locator('.pin-card').count()==8
  p.get_by_role('button',name='Birlikte önerilenler',exact=True).click();assert p.locator('.pin-card').count()==4
  ok('Both original Pinterest groups remain intact and are directly reachable from the page introduction')
  visit('kategoriler/');assert p.locator('.category-grid>.category-tile').count()==9;assert p.locator('.category-grid>.category-inspiration').count()==0
  assert p.locator('.category-grid>.category-tile').first.get_attribute('href').endswith('/mutfak' if OFFLINE else '/mutfak/')
  assert 'baza-yatak' in p.locator('.category-grid>.category-tile').last.get_attribute('href')
  assert p.locator('.category-index-more a').count()==1;shot('categories-desktop.png')
  ok('Production categories have nine balanced tiles and no orphan full-size tenth promotion')
  for route in ['', 'ilham-modelleri/', 'kategoriler/']:
   visit(route);p.set_viewport_size({'width':390,'height':844})
   p.evaluate("()=>{const all=[...document.body.querySelectorAll('*')].map(e=>[e,parseFloat(getComputedStyle(e).fontSize)]);for(const[e,s]of all)if(Number.isFinite(s))e.style.fontSize=2*s+'px'}")
   nooverflow()
  ok('Home, inspiration and category index pass the 200 percent text-size check on mobile')
  if not OFFLINE:
   qctx=b.new_context(java_script_enabled=False,viewport={'width':390,'height':844});q=qctx.new_page();q.goto(BASE+'ilham-modelleri/',wait_until='domcontentloaded');assert q.locator('[data-concept]').count()==9;assert q.locator('#pinterest-seckileri').count()==1;qctx.close();ok('Server-rendered overview preserves category breadth even when JavaScript is unavailable')
  assert not report['errors'],report['errors'];ok('No application errors during visual-balance and interaction checks')
 except Exception:
  report['failure']=traceback.format_exc();save();p.screenshot(path=str(O/'failure.png'),full_page=True);raise
 finally:b.close();save()
