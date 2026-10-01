"""Real browser verification. No external messages; simulated device, software WebGL."""
from pathlib import Path
from playwright.sync_api import sync_playwright
import os,json,traceback
BASE=os.environ.get('BASE_URL','http://127.0.0.1:8000/elif-tasarim/').rstrip('/')+'/'
O=Path(os.environ.get('EVIDENCE_DIR','evidence/interaction/browser'));O.mkdir(parents=True,exist_ok=True)
report={'base':BASE,'checks':[],'limits':['Chromium, software WebGL','Mobile-sized touch simulation, not a physical handset','Existing drawers operate as one group. The cabinet door is separate.']}
def record(name):
 report['checks'].append({'name':name,'pass':True});(O/'results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));print('PASS',name,flush=True)
with sync_playwright() as pw:
 b=pw.chromium.launch(headless=True,args=['--no-sandbox','--disable-dev-shm-usage','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'])
 c=b.new_context(viewport={'width':1440,'height':1000});p=c.new_page();p.set_default_timeout(20000);errors=[];p.on('pageerror',lambda e:errors.append(str(e)))
 def goto(route):
  p.goto(BASE+route,wait_until='domcontentloaded',timeout=60000);p.wait_for_selector('html[data-app-ready=true]')
 def active():return int(p.locator('.v232-scene.is-active').get_attribute('data-slide'))
 def inspect():return p.evaluate('document.querySelector(".v8-canvas-host").__elif3D.inspect()')
 def point(id):return p.evaluate('(id)=>document.querySelector(".v8-canvas-host").__elif3D.interactionPoints().find(x=>x.id===id)',id)
 def click_part(id):
  p.locator('.v8-canvas-host canvas').scroll_into_view_if_needed();p.wait_for_timeout(180);xy=point(id);p.mouse.click(xy['x'],xy['y'])
 try:
  goto('');assert p.locator('.v232-scene').count()==5
  p.wait_for_function('()=>[...document.querySelectorAll(".v232-scene img")].every(i=>i.complete&&i.naturalWidth>0)')
  p.mouse.move(0,0);seen=[active()]
  for i in range(5):
   previous=active();p.wait_for_function('(i)=>Number(document.querySelector(".v232-scene.is-active").dataset.slide)!==i',arg=previous,timeout=9000);seen.append(active())
  assert seen==[0,1,2,3,4,0],seen;record('01. All five loaded images advance in order and wrap to the first')
  p.get_by_role('button',name='Otomatik geçişi durdur',exact=True).click();fixed=active();p.mouse.move(0,0);p.locator('.v232-pause').evaluate('e=>e.blur()');p.wait_for_timeout(5400);assert active()==fixed
  for i in range(5):
   p.locator('.v6-scene-controls button').nth(i).click();p.wait_for_function('(i)=>Number(document.querySelector(".v232-scene.is-active").dataset.slide)===i',arg=i);assert active()==i;p.wait_for_timeout(1100);p.locator('.v6-hero').screenshot(path=str(O/f'hero-{i+1}.png'))
  record('02. Pause holds the image and every manual scene control works')
  for w in [320,390,768]:
   p.set_viewport_size({'width':w,'height':844});assert p.evaluate('document.documentElement.scrollWidth<=innerWidth+1'),w
  p.screenshot(path=str(O/'hero-mobile.png'));record('03. Five controls and pause fit small and tablet viewports')
  p.emulate_media(reduced_motion='reduce');goto('');p.mouse.move(0,0);current=active();p.wait_for_timeout(5500);assert active()==current;record('04. Reduced-motion preference disables automatic slideshow motion')
  p.set_viewport_size({'width':1440,'height':1000});goto('tasarim-masasi/?en=180&derinlik=80&yukseklik=95&donus=90&malzeme=ceviz&mekan=product');p.wait_for_selector('[data-three-status=ready]',timeout=120000)
  p.get_by_role('button',name='Çekmece tarafı',exact=True).click();click_part('drawer-1')
  p.wait_for_function('()=>document.querySelector(".v8-canvas-host").__elif3D.inspect().config.drawers===true')
  assert p.get_by_role('button',name='Çekmeceleri kapat',exact=True).get_attribute('aria-pressed')=='true'
  p.get_by_role('button',name='Tasarım bağlantısı',exact=False).click();assert 'cekmece=1' in p.get_by_label('Paylaşılabilir 3D tasarım bağlantısı',exact=True).input_value()
  record('05. Actual drawer click opens storage and synchronizes UI and share configuration')
  click_part('drawer-1');p.wait_for_function('()=>!document.querySelector(".v8-canvas-host").__elif3D.inspect().config.drawers')
  click_part('door');p.wait_for_function('()=>document.querySelector(".v8-canvas-host").__elif3D.inspect().config.door')
  assert p.get_by_role('button',name='Dolabı kapat',exact=True).get_attribute('aria-pressed')=='true'
  p.locator('.v8-canvas-host').screenshot(path=str(O/'door-open.png'));click_part('door');p.wait_for_function('()=>!document.querySelector(".v8-canvas-host").__elif3D.inspect().config.door')
  record('06. Second click closes storage; the cabinet door opens independently')
  p.get_by_role('button',name='Çekmece tarafı',exact=True).click();p.locator('.v8-canvas-host canvas').scroll_into_view_if_needed();xy=point('drawer-1');before=inspect()['config'];p.mouse.move(xy['x'],xy['y']);p.mouse.down();p.mouse.move(xy['x']+80,xy['y'],steps=8);p.mouse.move(xy['x'],xy['y'],steps=8);p.mouse.up();assert inspect()['config']['drawers']==before['drawers']
  record('07. Orbit drag and out-and-back movement cannot trigger storage opening')
  p.get_by_role('button',name='Çekmece tarafı',exact=True).click();click_part('door');p.wait_for_function('()=>document.querySelector(".v8-canvas-host").__elif3D.inspect().config.door')
  p.get_by_label('Hızlı çalışma yüksekliği',exact=True).evaluate('(e)=>{e.value="110";e.dispatchEvent(new Event("input",{bubbles:true}))}');p.wait_for_timeout(180);assert inspect()['config']['door'] and inspect()['config']['height']==110
  record('08. Parameter updates preserve the directly opened cabinet state')
  touch=b.new_context(viewport={'width':390,'height':844},has_touch=True,is_mobile=True,reduced_motion='reduce');q=touch.new_page();q.goto(BASE+'tasarim-masasi/?mekan=product&en=180',wait_until='domcontentloaded',timeout=60000)
  q.wait_for_selector('[data-three-status=ready]',timeout=120000);q.get_by_role('button',name='Çekmece tarafı',exact=True).click();q.locator('.v8-canvas-host canvas').scroll_into_view_if_needed();q.wait_for_timeout(300)
  xy=q.evaluate('document.querySelector(".v8-canvas-host").__elif3D.interactionPoints().find(x=>x.id==="door")');q.touchscreen.tap(xy['x'],xy['y']);q.wait_for_function('()=>document.querySelector(".v8-canvas-host").__elif3D.inspect().config.door');q.locator('.v8-canvas-host').screenshot(path=str(O/'touch-open.png'));touch.close()
  record('09. Actual touchscreen event in the mobile-sized browser opens the cabinet')
  assert not errors,errors;record('10. No uncaught script errors in the new customer interactions')
 except Exception:
  report['failure']=traceback.format_exc();report['errors']=errors;(O/'results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));p.screenshot(path=str(O/'failure.png'),full_page=True);raise
 finally:b.close()
