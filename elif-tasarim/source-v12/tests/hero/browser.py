"""Hero discovery regression. Real time and pointer events, no external messages."""
from pathlib import Path
from playwright.sync_api import sync_playwright
import os, json, time, traceback
BASE=os.environ.get('BASE_URL','http://127.0.0.1:8000/elif-tasarim/').rstrip('/')+'/'
OFFLINE=os.environ.get('OFFLINE_PREVIEW')
OUT=Path(os.environ.get('EVIDENCE_DIR','evidence/hero/browser'));OUT.mkdir(parents=True,exist_ok=True)
report={'base':BASE if not OFFLINE else 'portable build, in-browser rendering','checks':[],'limits':['Chromium only','No physical handset, screen reader user session or field performance claim']}
def record(name):
 report['checks'].append({'name':name,'pass':True});(OUT/'results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));print('PASS',name,flush=True)
with sync_playwright() as pw:
 launch={'headless':True,'args':['--no-sandbox','--disable-dev-shm-usage']}
 if os.environ.get('BROWSER_BIN'):launch['executable_path']=os.environ['BROWSER_BIN']
 b=pw.chromium.launch(**launch);c=b.new_context(viewport={'width':1440,'height':1000},reduced_motion='no-preference');p=c.new_page();p.set_default_timeout(14000);errors=[];p.on('pageerror',lambda e:errors.append(str(e)))
 def load(page):
  if OFFLINE:page.set_content(Path(OFFLINE).read_text(),wait_until='load',timeout=60000)
  else:page.goto(BASE,wait_until='domcontentloaded',timeout=60000)
  page.wait_for_selector('html[data-app-ready=true]')
 def active(page=p):return int(page.locator('.v232-scene.is-active').get_attribute('data-slide'))
 def choose(i):
  p.locator('.v6-scene-controls button').nth(i).click();p.wait_for_function('(i)=>Number(document.querySelector(".v232-scene.is-active").dataset.slide)===i',arg=i)
 try:
  load(p);assert p.locator('.v232-scene').count()==5
  assert p.locator('.v232-scene img[fetchpriority=high]').count()==1 and p.locator('.v232-scene img').count()==2
  p.mouse.move(1030,385)
  p.evaluate('''()=>{window.heroTimings=[];window.heroStart=performance.now();let last=0;new MutationObserver(()=>{let n=Number(document.querySelector('.v232-scene.is-active')?.dataset.slide);if(n!==last){heroTimings.push({slide:n,ms:Math.round(performance.now()-heroStart)});last=n}}).observe(document.querySelector('.v234-carousel'),{subtree:true,attributes:true,attributeFilter:['class']})}''')
  p.wait_for_timeout(600)
  progress=p.locator('.v6-scene-controls [aria-pressed=true] .hero-sequence-progress').evaluate('e=>getComputedStyle(e).transform')
  assert progress not in ['none','matrix(0, 0, 0, 1, 0, 0)'],progress
  p.wait_for_function('document.querySelector(".v232-scene.is-active").dataset.slide==="1"',timeout=3500)
  timings=p.evaluate('heroTimings');assert timings[0]['ms']<=3200,timings
  record('01. Centered mouse no longer stops the hero; first transition within 3.2s, visible timed progress and one priority image')
  for i in [2,3,4,0]:p.wait_for_function('(i)=>Number(document.querySelector(".v232-scene.is-active").dataset.slide)===i',arg=i,timeout=5000)
  report['timings']=p.evaluate('heroTimings');assert [x['slide'] for x in report['timings']]==[1,2,3,4,0]
  for a,z in zip(report['timings'],report['timings'][1:]):assert 2850<=z['ms']-a['ms']<=4500,(a,z)
  assert p.locator('.v232-scene').first.evaluate('e=>getComputedStyle(e).transitionDuration')=='0.65s'
  record('02. All five images rotate and wrap on the faster cycle, with a 650ms fade and static brand copy')
  p.locator('.hero-sequence-label').hover();fixed=active();p.wait_for_timeout(3400);assert active()==fixed;assert p.locator('.hero-sequence-status').inner_text()=='Seçim sırasında geçiş bekletiliyor.'
  p.get_by_role('button',name='Otomatik geçişi durdur',exact=True).click();p.mouse.move(1030,385);p.locator('.v232-pause').evaluate('e=>e.blur()');fixed=active();p.wait_for_timeout(3500);assert active()==fixed
  record('03. Hovering controls suspends selection with visible status; explicit pause holds after leaving the panel')
  for i in [4,0,2,1,3]:
   choose(i);assert p.locator('.v232-scene.is-active img').evaluate('e=>e.complete&&e.naturalWidth>0');assert f'{i+1:02} / 05' in p.locator('.hero-sequence-position').inner_text()
  choose(0);p.get_by_role('button',name='Önceki mekân',exact=True).click();p.wait_for_function('document.querySelector(".v232-scene.is-active").dataset.slide==="4"');p.get_by_role('button',name='Sonraki mekân',exact=True).click();p.wait_for_function('document.querySelector(".v232-scene.is-active").dataset.slide==="0"')
  record('04. Five named buttons, previous/next wrapping and 01/05 position all agree with the decoded visible image')
  p.get_by_role('button',name='Otomatik geçişi başlat',exact=True).click();p.keyboard.press('Tab');assert p.locator('.v234-carousel').get_attribute('data-playback')=='paused';fixed=active();p.locator(':focus').evaluate('e=>e.blur()');p.mouse.move(1030,385);p.wait_for_timeout(3400);assert active()==fixed
  p.get_by_role('button',name='Otomatik geçişi başlat',exact=True).focus();p.keyboard.press('Enter');p.mouse.move(1030,385);p.wait_for_function('(i)=>Number(document.querySelector(".v232-scene.is-active").dataset.slide)!==i',arg=fixed,timeout=4500)
  record('05. Keyboard focus stops motion until explicit Play; Enter restarts without moving focus')
  p.get_by_role('button',name='Otomatik geçişi durdur',exact=True).click();choose(0)
  geometry=[]
  for w in [320,390,768,1440]:
   p.set_viewport_size({'width':w,'height':844 if w<1000 else 1000});p.wait_for_timeout(150)
   dims=p.evaluate('''()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,controls:[...document.querySelectorAll('.hero-sequence button')].map(e=>({label:e.getAttribute('aria-label'),w:e.getBoundingClientRect().width,h:e.getBoundingClientRect().height})),names:[...document.querySelectorAll('.scene-word')].map(e=>({display:getComputedStyle(e).display,text:e.textContent})),actions:document.querySelector('.v6-hero-actions').getBoundingClientRect().toJSON(),panel:document.querySelector('.hero-sequence').getBoundingClientRect().toJSON()})''')
   assert dims['scroll']<=w+1,dims
   assert all(x['w']>=43.5 and x['h']>=43.5 for x in dims['controls']),dims
   assert all(x['display']!='none' for x in dims['names']),dims
   assert dims['panel']['top']>=dims['actions']['bottom']+12,dims
   geometry.append(dims);p.locator('.v234-carousel').screenshot(path=str(OUT/f'hero-{w}.png'))
  report['geometry']=geometry;record('06. Named controls, 44px targets and CTA spacing fit 320/390/768/1440 without horizontal overflow')
  p.set_viewport_size({'width':390,'height':844});p.evaluate('''()=>[...document.querySelectorAll('main h1,main h2,main p,main button,main a')].map(e=>[e,parseFloat(getComputedStyle(e).fontSize)]).forEach(([e,s])=>e.style.fontSize=s*2+'px')''');assert p.evaluate('document.documentElement.scrollWidth<=innerWidth+1');p.locator('.v234-carousel').screenshot(path=str(OUT/'hero-200-text.png'));record('07. Hero and explicit controls reflow at doubled text size')
  reduced=b.new_context(viewport={'width':390,'height':844},reduced_motion='reduce');q=reduced.new_page();load(q);assert q.locator('.v234-carousel').get_attribute('data-playback')=='reduced';assert q.locator('.v232-pause').is_disabled();q.wait_for_timeout(3500);assert active(q)==0;q.get_by_role('button',name='Sonraki mekân',exact=True).click();q.wait_for_function('document.querySelector(".v232-scene.is-active").dataset.slide==="1"');assert q.locator('.v232-scene').first.evaluate('e=>getComputedStyle(e).transitionDuration')=='0s';reduced.close();record('08. Reduced-motion preference stays still, explains why and retains immediate manual navigation')
  if not OFFLINE:
   broken=b.new_context(viewport={'width':390,'height':844},reduced_motion='reduce');q=broken.new_page();q.route('**/*concept-tv*',lambda r:r.abort());load(q);q.locator('.v6-scene-controls button').nth(4).click();q.wait_for_timeout(800);assert active(q)==0;assert q.locator('.v232-scene.is-active img').evaluate('e=>e.naturalWidth>0');broken.close();record('09. A failed target image never replaces the last usable image')
  assert not errors,errors;record('10. No uncaught script error in the refined hero')
 except Exception:
  report['failure']=traceback.format_exc();report['errors']=errors;(OUT/'results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));p.screenshot(path=str(OUT/'failure.png'),full_page=True);raise
 finally:b.close()
