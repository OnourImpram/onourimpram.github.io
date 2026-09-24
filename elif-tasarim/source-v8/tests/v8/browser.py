"""Real HTTP/WebGL checks. No messages are sent and no external widgets activated."""
from pathlib import Path
import os, json, time, base64, urllib.request, hashlib
from playwright.sync_api import sync_playwright
from PIL import Image
ROOT=Path(__file__).resolve().parents[2]
BASE=os.environ.get('BASE_URL','http://127.0.0.1:8080/elif-tasarim/')
OUT=ROOT/'evidence/v8/browser';OUT.mkdir(parents=True,exist_ok=True)
report={'base':BASE,'checks':[],'limitations':['No hardware or load certification','No real WhatsApp delivery','Chromium software WebGL, not a real phone']}
def check(name,condition,details=None):
 report['checks'].append({'name':name,'pass':bool(condition),'details':details})
 (OUT/'results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
 assert condition,name
 print('PASS',name,flush=True)
with sync_playwright() as p:
 browser=p.chromium.launch(headless=True,args=['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader'])
 page=browser.new_page(viewport={'width':1440,'height':1000},device_scale_factor=1)
 errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
 page.goto(BASE+'tasarim-masasi/',wait_until='networkidle');page.wait_for_selector('[data-three-status="ready"]',timeout=45000)
 def inspect():return page.evaluate("document.querySelector('.v8-canvas-host').__elif3D.inspect()")
 def snap(name):
  data=page.evaluate("document.querySelector('.v8-canvas-host').__elif3D.snapshot(1920,1280)")
  (OUT/(name+'.png')).write_bytes(base64.b64decode(data.split(',')[1]))
  if os.environ.get('WRITE_POSTERS')=='1':
   dest=ROOT/'public/assets'/(name+'.webp');Image.open(OUT/(name+'.png')).convert('RGB').save(dest,quality=93,method=6)
 def slide(label,value):
  page.get_by_role('slider',name=label,exact=True).evaluate('(e,v)=>{e.value=v;e.dispatchEvent(new Event("input",{bubbles:true}))}',str(value));page.wait_for_timeout(150)
  if label=='Çalışma yüksekliği': page.wait_for_function("Math.abs(document.querySelector('.v8-canvas-host').__elif3D.inspect().geometry.mainTopY - "+str(value/100)+")<.002",timeout=30000)
  elif label=='Yan tabla açısı': page.wait_for_function("Math.abs(document.querySelector('.v8-canvas-host').__elif3D.inspect().geometry.wingAngle - "+str(value*3.141592653589793/180)+")<.005",timeout=30000)
 s=inspect();check('Real Three.js WebGL geometry renders',s['engine']=='Three.js' and s['revision']=='185' and s['triangles']>2000 and s['drawCalls']>20,s)
 first=page.locator('.v8-canvas-wrap').screenshot(path=str(OUT/'scene-initial.png'))
 snap('devir-poster')
 slide('Çalışma yüksekliği',115);s=inspect();check('Main desk rises while base remains fixed',abs(s['geometry']['mainTopY']-1.15)<.004 and s['geometry']['fixedPanelY']==.305 and s['geometry']['returnTopY']==.695,s['geometry'])
 snap('devir-standing')
 slide('Yan tabla açısı',180);s=inspect();check('Return rotates as independent 3D group',abs(s['geometry']['wingAngle']-3.14159265)<.02,s['geometry'])
 slide('Yan tabla açısı',360);check('Side return supports full conceptual rotation',abs(inspect()['geometry']['wingAngle']-6.2831853)<.02)
 page.get_by_role('button',name='Çekmeceleri aç',exact=True).click();page.get_by_role('button',name='Dolabı aç',exact=True).click();page.wait_for_function("document.querySelector('.v8-canvas-host').__elif3D.inspect().geometry.doorAngle < -1.5",timeout=30000);s=inspect();check('Drawers and cabinet door are moving meshes',s['geometry']['mainDrawerZ']>.55 and s['geometry']['doorAngle']<-1,s['geometry'])
 slide('Yan tabla açısı',90)
 page.evaluate("document.querySelector('.v8-canvas-host').__elif3D.setView('detail')");page.wait_for_timeout(1000);snap('devir-detail')
 page.get_by_role('button',name='Üstten',exact=True).click();page.wait_for_timeout(1000);snap('devir-top')
 page.get_by_role('button',name='Koyu ahşap',exact=True).click();page.wait_for_timeout(800);check('Wood selection updates physical materials',inspect()['material']=='koyu')
 page.get_by_role('tab',name='Ölçünü belirle',exact=True).click();slide('Masa eni',203);slide('Masa derinliği',83);check('Parametric main top updates dimensions',inspect()['config']['width']==203 and inspect()['config']['depth']==83)
 page.get_by_role('button',name='Ölçü çizgilerini göster',exact=True).click();check('Three-dimensional dimension overlay is optional',inspect()['dimensions'])
 page.get_by_role('button',name='Perspektif',exact=True).click();page.wait_for_timeout(700)
 second=page.locator('.v8-canvas-wrap').screenshot(path=str(OUT/'scene-modified.png'));check('Geometry controls produce different rendered pixels',hashlib.sha256(first).hexdigest()!=hashlib.sha256(second).hexdigest())
 page.get_by_role('button',name='Tasarım bağlantısı',exact=True).click();url=page.get_by_label('Paylaşılabilir 3D tasarım bağlantısı',exact=True).input_value();check('Share URL carries options only', 'en=203' in url and 'donus=90' in url and 'private' not in url,url)
 page.get_by_role('button',name='Bu tasarımı Yusuf Usta ile konuş',exact=True).click();page.wait_for_timeout(500)
 check('3D handoff opens existing customer flow','modelini-getir' in page.url)
 # Summary and the recipient must derive from actual form state, not a fake send endpoint.
 page.get_by_role('button',name='Devam et',exact=True).first.click();page.wait_for_timeout(150)
 page.get_by_role('button',name='Devam et',exact=True).first.click();page.wait_for_timeout(150)
 text=page.locator('body').inner_text();check('3D dimensions and cabinet concept survive handoff','203' in text and ('83' in text or 'DEVİR' in text))
 anchors=page.locator('a[href^="https://wa.me/"]').evaluate_all('(xs)=>xs.map(x=>x.href)');check('Correct business phone remains in WhatsApp links',bool(anchors) and all('wa.me/905308797169' in h for h in anchors),anchors[:1])
 page.goto(BASE,wait_until='networkidle');check('Home keeps approved headline','Zamana değer' in page.locator('h1').inner_text())
 check('Homepage Three runtime is lazy',page.locator('.v8-canvas-host canvas').count()==0)
 page.get_by_role('button',name='3D deneyimi başlat',exact=True).click();page.wait_for_selector('[data-three-status="ready"]',timeout=45000);check('Homepage replaces old SVG with real Three canvas',page.locator('.v8-canvas-host canvas').count()==1)
 page.locator('.v8-home-studio').screenshot(path=str(OUT/'desktop-studio.png'))
 page.screenshot(path=str(OUT/'desktop.png'),full_page=False)
 check('No AI wording in visible concept labels',page.locator('.source-concept').evaluate_all('(xs)=>xs.every(x=>x.innerText==="Konsept model")'))
 for width in [360,390,768,1024,1440,1920]:
  page.set_viewport_size({'width':width,'height':900});page.wait_for_timeout(200)
  check('Home has no overflow at '+str(width),page.evaluate('document.documentElement.scrollWidth<=innerWidth+1'))
 page.set_viewport_size({'width':390,'height':844});page.locator('.v8-home-studio').screenshot(path=str(OUT/'mobile-studio.png'))
 page.evaluate('window.scrollTo(0,0)');page.wait_for_timeout(300);page.screenshot(path=str(OUT/'mobile.png'))
 page.goto(BASE+'tasarim-masasi/',wait_until='networkidle');page.wait_for_selector('[data-three-status="ready"]',timeout=45000)
 page.evaluate("document.querySelector('.v8-canvas-host canvas').focus()");before=inspect()['camera'];page.keyboard.press('ArrowLeft');page.wait_for_timeout(400);check('Canvas can rotate from keyboard',before!=inspect()['camera'])
 page.evaluate("document.querySelector('.v8-canvas-host canvas').dispatchEvent(new Event('webglcontextlost',{cancelable:true}))");check('Context loss shows an honest fallback',page.locator('[data-three-status="lost"]').count()==1)
 # Distinct test context for the reduced-motion setting.
 rm=browser.new_context(viewport={'width':1100,'height':900},reduced_motion='reduce');r=rm.new_page();r.goto(BASE+'tasarim-masasi/',wait_until='networkidle');r.wait_for_selector('[data-three-status="ready"]',timeout=45000);r.get_by_role('slider',name='Çalışma yüksekliği',exact=True).evaluate('(e)=>{e.value=100;e.dispatchEvent(new Event("input",{bubbles:true}))}');r.wait_for_timeout(300);rv=r.evaluate("document.querySelector('.v8-canvas-host').__elif3D.inspect()");check('Reduced motion applies geometry without transition',abs(rv['geometry']['mainTopY']-1)<.003);rm.close()
 check('No application runtime exceptions',not errors,errors)
 report['browser']=browser.version
 (OUT/'results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
 browser.close()
