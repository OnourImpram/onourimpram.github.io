"""Actual hero discoverability. No form submissions or 3D changes."""
from pathlib import Path
from playwright.sync_api import sync_playwright
import os,json,time,traceback
BASE=os.environ.get('BASE_URL','http://127.0.0.1:8000/elif-tasarim/').rstrip('/')+'/'
OUT=Path(os.environ.get('EVIDENCE_DIR','evidence/hero/browser'));OUT.mkdir(parents=True,exist_ok=True)
report={'base':BASE,'checks':[],'timings':[],'limits':['Chromium, controlled desktop/mobile-sized browsers','Times measured after first two images are decoded, not field loading guarantees','No external communication sent']}
def record(name):
 report['checks'].append({'name':name,'pass':True});(OUT/'results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));print('PASS',name,flush=True)
with sync_playwright() as pw:
 b=pw.chromium.launch(headless=True,args=['--no-sandbox','--disable-dev-shm-usage'])
 c=b.new_context(viewport={'width':1440,'height':1000},reduced_motion='reduce');p=c.new_page();p.set_default_timeout(16000);errors=[];p.on('pageerror',lambda e:errors.append(str(e)))
 def fresh():
  p.emulate_media(reduced_motion='reduce');p.goto(BASE,wait_until='domcontentloaded',timeout=60000);p.wait_for_selector('html[data-app-ready=true]');p.wait_for_function('()=>document.querySelectorAll(".v232-scene img").length===2&&[...document.querySelectorAll(".v232-scene img")].every(i=>i.complete&&i.naturalWidth>0)')
 def active():return int(p.locator('.v232-scene.is-active').get_attribute('data-slide'))
 def choose(i):
  p.locator('.v6-scene-controls button').nth(i).click();p.wait_for_function('(i)=>Number(document.querySelector(".v232-scene.is-active").dataset.slide)===i',arg=i)
 try:
  fresh();assert p.locator('.v232-scene').count()==5
  assert p.locator('.v232-scene img[fetchpriority=high]').count()==1
  p.mouse.move(900,350);start=time.monotonic();p.emulate_media(reduced_motion='no-preference')
  p.wait_for_function('()=>document.querySelector(".v232-scene.is-active").dataset.slide==="1"',timeout=3300)
  elapsed=time.monotonic()-start;assert 1.9<=elapsed<=3.3,elapsed;report['timings'].append({'first_seconds':round(elapsed,3)})
  # Pointer stays over the background the entire time, not artificially parked outside the page.
  for want in [2,3,4,0]:
   start=time.monotonic();p.wait_for_function('(i)=>Number(document.querySelector(".v232-scene.is-active").dataset.slide)===i',arg=want,timeout=4600);elapsed=time.monotonic()-start;assert 2.8<=elapsed<=4.6,elapsed;report['timings'].append({'slide':want,'seconds':round(elapsed,3)})
  record('01. First change around 2.2 seconds and full 3.2-second cycle work with the pointer resting on the decorative background')
  p.get_by_role('button',name='Otomatik geçişi durdur',exact=True).click();current=active();p.mouse.move(900,350);p.locator('.v232-pause').evaluate('e=>e.blur()');p.wait_for_timeout(3600);assert active()==current
  p.get_by_role('button',name='Otomatik geçişi başlat',exact=True).click();p.wait_for_function('(i)=>Number(document.querySelector(".v232-scene.is-active").dataset.slide)!==i',arg=current,timeout=4200)
  current=active();p.mouse.move(900,350);p.wait_for_function('(i)=>Number(document.querySelector(".v232-scene.is-active").dataset.slide)!==i',arg=current,timeout=4200)
  record('02. Pause holds and explicit Play keeps running with retained focus and after leaving the controls')
  # Browsing explicitly stops auto-motion, while named arrows and 01-05 work.
  choose(0);p.get_by_role('button',name='Önceki görsel',exact=True).click();p.wait_for_function('()=>document.querySelector(".v232-scene.is-active").dataset.slide==="4"')
  p.get_by_role('button',name='Sonraki görsel',exact=True).click();p.wait_for_function('()=>document.querySelector(".v232-scene.is-active").dataset.slide==="0"')
  assert p.get_by_role('button',name='Otomatik geçişi başlat',exact=True).is_visible()
  for i in range(5):choose(i)
  assert '05 / 05' in p.locator('.v234-current-scene').inner_text()
  record('03. Named previous/next arrows wrap correctly; all numbered choices work and manual viewing is stable')
  p.locator('.v6-hero').screenshot(path=str(OUT/'hero-desktop.png'))
  fresh();p.get_by_role('button',name='Sonraki görsel',exact=True).focus();p.emulate_media(reduced_motion='no-preference');p.wait_for_timeout(3600);assert active()==0
  p.get_by_role('button',name='Sonraki görsel',exact=True).press('Enter');p.wait_for_function('()=>document.querySelector(".v232-scene.is-active").dataset.slide==="1"');assert p.get_by_role('button',name='Sonraki görsel',exact=True).evaluate('e=>e===document.activeElement')
  record('04. Keyboard focus pauses automatic movement and Enter changes slides without losing focus')
  fresh();p.mouse.move(900,350);p.wait_for_timeout(3600);assert active()==0
  choose(3);assert active()==3
  record('05. Reduced-motion preference remains respected; manual selection is still available')
  fresh();p.emulate_media(reduced_motion='no-preference');p.locator('.v6-hero-actions').hover();p.wait_for_timeout(3600);assert active()==0
  p.mouse.move(900,350);p.evaluate('scrollTo(0,document.querySelector(".v6-hero").getBoundingClientRect().height+350)');p.wait_for_timeout(3700);assert active()==0
  record('06. Reading/clicking the CTA and leaving the hero viewport suspend the timer')
  fresh();choose(0)
  p.locator('[data-slide="1"] img').evaluate('i=>i.decode=()=>new Promise(resolve=>window.__finishManual=resolve)')
  p.get_by_role('button',name='Sonraki görsel',exact=True).click();p.wait_for_function('()=>typeof window.__finishManual==="function"');p.mouse.move(900,350);p.wait_for_timeout(200);assert active()==0
  p.evaluate('window.__finishManual()');p.wait_for_function('()=>document.querySelector(".v232-scene.is-active").dataset.slide==="1"')
  record('07. Manual image request survives pointer departure, without exposing an undecoded image')
  fresh();p.locator('[data-slide="1"] img').evaluate('i=>i.decode=()=>new Promise(()=>{})');p.get_by_role('button',name='Sonraki görsel',exact=True).click();p.wait_for_function('()=>document.querySelector(".v234-loading")?.textContent.includes("açılamadı")',timeout=6500);assert active()==0
  choose(2);assert active()==2
  record('08. A hung decode has a deadline, retains the last image and leaves other choices usable')
  for width in [320,390,768,1440]:
   p.set_viewport_size({'width':width,'height':844 if width<800 else 1000});fresh();choose(0)
   assert p.evaluate('document.documentElement.scrollWidth<=innerWidth+1'),width
   controls=p.locator('.v234-controls');assert controls.is_visible()
   for button in controls.locator('button').all():
    box=button.bounding_box();assert box['height']>=43.5 and box['width']>=43.5,(width,box)
   actions=p.locator('.v6-hero-actions').bounding_box();box=controls.bounding_box();assert actions['y']+actions['height']<=box['y']+1,(width,actions,box)
   p.locator('.v6-hero').screenshot(path=str(OUT/('hero-'+str(width)+'.png')))
  record('09. Four widths keep 44px controls, readable five-image cue and non-overlapping calls to action')
  assert not errors,errors;record('10. No uncaught script errors in the examined paths')
 except Exception:
  report['failure']=traceback.format_exc();report['errors']=errors;(OUT/'results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));p.screenshot(path=str(OUT/'failure.png'),full_page=True);raise
 finally:b.close()
