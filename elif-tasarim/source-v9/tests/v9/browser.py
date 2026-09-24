"""V9 actual HTTP and WebGL acceptance. No outbound customer messages."""
from pathlib import Path
import os,json,base64,hashlib,time
from playwright.sync_api import sync_playwright
from PIL import Image
ROOT=Path(__file__).resolve().parents[2]
BASE=os.getenv('BASE_URL','http://127.0.0.1:8080/elif-tasarim/').rstrip('/')+'/'
OUT=ROOT/'evidence/v9/browser';OUT.mkdir(parents=True,exist_ok=True)
report={'base':BASE,'checks':[],'limitations':['Chromium software WebGL','No real-device GPU benchmark','No real messages or physical engineering test']}
def record(name,ok,data=None):
 report['checks'].append({'name':name,'pass':bool(ok),'details':data});(OUT/'results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));print(('PASS ' if ok else 'FAIL ')+name,flush=True);assert ok,name
with sync_playwright() as p:
 browser=p.chromium.launch(headless=True,args=['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader'])
 page=browser.new_page(viewport={'width':1600,'height':1080},device_scale_factor=1)
 errors=[];outbound=[]
 page.on('pageerror',lambda e:errors.append(str(e)))
 page.on('request',lambda r:outbound.append(r.url) if r.url.startswith(('http:','https:')) and not r.url.startswith(BASE) else None)
 def state():return page.evaluate("document.querySelector('.v8-canvas-host').__elif3D.inspect()")
 def slider(label,value):
  page.get_by_role('slider',name=label,exact=True).evaluate('(e,v)=>{e.value=v;e.dispatchEvent(new Event("input",{bubbles:true}))}',str(value))
  if label=='Çalışma yüksekliği':page.wait_for_function('Math.abs(document.querySelector(".v8-canvas-host").__elif3D.inspect().geometry.mainTopY-'+str(value/100)+')<.003',timeout=25000)
  else:page.wait_for_timeout(650)
 def capture(name,poster=False):
  data=page.evaluate('document.querySelector(".v8-canvas-host").__elif3D.snapshot(1920,1280)')
  dest=OUT/(name+'.png');dest.write_bytes(base64.b64decode(data.split(',')[1]));im=Image.open(dest)
  if poster and os.getenv('WRITE_POSTERS')=='1':im.convert('RGB').save(ROOT/'public/assets'/('devir-studio-v9.webp'),quality=94,method=6)
  return hashlib.sha256(dest.read_bytes()).hexdigest()
 try:
  page.goto(BASE,wait_until='networkidle');record('V9 identity',page.locator('meta[name="elif-release"]').get_attribute('content')=='v9-atelier-bilateral')
  record('Approved headline and authentic six work cards','Zamana değer' in page.locator('h1').inner_text() and page.locator('.home-works .work-grid>*').count()==6)
  record('Eight category discovery links',page.locator('.v9-category-card').count()==8)
  record('WebGL is lazy on homepage',page.locator('.v8-canvas-host canvas').count()==0)
  page.screenshot(path=str(OUT/'home-desktop.png'));page.screenshot(path=str(OUT/'home-full.jpg'),full_page=True,type='jpeg',quality=88)
  page.goto(BASE+'tasarim-masasi/',wait_until='networkidle');page.wait_for_selector('[data-three-status="ready"]',timeout=45000);page.wait_for_timeout(1500)
  s=state();record('Actual Three.js geometry and bilateral shelf towers',s['engine']=='Three.js' and len(s['atelier']['bookcases'])==2 and s['atelier']['bookcases'][0]['x']<0<s['atelier']['bookcases'][1]['x'] and all(x['shelves']==4 and x['visible'] for x in s['atelier']['bookcases']),s)
  record('Static room rendering stays below draw-call budget',s['drawCalls']<450,{'drawCalls':s['drawCalls'],'triangles':s['triangles'],'ceiling':450})
  record('Desk remains framed with room visible',all(abs(v)<=1.02 for v in s['framing'].values()),s['framing'])
  page.screenshot(path=str(OUT/'studio-desktop.png'));page.locator('.v8-showroom').screenshot(path=str(OUT/'showroom.png'))
  day=capture('atelier-day',True)
  page.get_by_role('tab',name='Mekânı düzenle',exact=True).click()
  page.get_by_role('button',name='Raf aydınlatması',exact=True).click();record('Shelf illumination is switchable',not state()['atelier']['lights'])
  page.get_by_role('button',name='Raf aydınlatması',exact=True).click()
  page.get_by_role('button',name='Çift taraflı raflar',exact=True).click();s=state();record('Hidden shelves never leave floating books',not s['atelier']['shelves'] and not s['atelier']['shelfPropsVisible'])
  page.get_by_role('button',name='Çift taraflı raflar',exact=True).click()
  page.get_by_role('button',name='Yalın ürün',exact=True).click();record('Product mode hides complete room, not desk',not state()['atelier']['visible'] and state()['triangles']>1000)
  capture('product-mode')
  page.get_by_role('button',name='Mekân içinde',exact=True).click()
  page.get_by_role('button',name='Yaşam ayrıntıları',exact=True).click();record('Styling hides independently',not state()['deskStyling'] and not state()['atelier']['props']);page.get_by_role('button',name='Yaşam ayrıntıları',exact=True).click()
  for label,kind in [('Açık meşe tonu','mese'),('Koyu ahşap','koyu'),('Ceviz tonu','ceviz')]:
   page.get_by_role('button',name=label,exact=True).click();page.wait_for_timeout(250);record('Desk and shelving material '+kind,state()['material']==kind and state()['atelier']['material']==kind)
  page.get_by_role('button',name='Akşam',exact=True).click();page.wait_for_timeout(450);evening=capture('atelier-evening');record('Evening setting changes render',day!=evening and state()['atelier']['theme']=='evening')
  page.get_by_role('button',name='Gün ışığı',exact=True).click()
  page.get_by_role('tab',name='Hareketi keşfet',exact=True).click()
  slider('Çalışma yüksekliği',113);s=state();record('Upper lifts independently of base and shelves',abs(s['geometry']['mainTopY']-1.13)<.004 and s['geometry']['fixedPanelY']==.305 and s['geometry']['returnTopY']==.695,s['geometry'])
  slider('Yan tabla açısı',180);page.wait_for_function('Math.abs(document.querySelector(".v8-canvas-host").__elif3D.inspect().geometry.wingAngle-Math.PI)<.01')
  page.get_by_role('button',name='Çekmeceleri aç',exact=True).click();page.get_by_role('button',name='Dolabı aç',exact=True).click();page.wait_for_function('document.querySelector(".v8-canvas-host").__elif3D.inspect().geometry.doorAngle < -1.5')
  record('Articulated parts retained',state()['geometry']['mainDrawerZ']>.55 and state()['geometry']['doorAngle']<-1.5)
  capture('atelier-standing-open')
  page.get_by_role('button',name='Bu tasarımı Yusuf Usta ile konuş',exact=True).click();page.wait_for_timeout(300)
  page.get_by_role('button',name='Devam et',exact=True).first.click();page.get_by_role('button',name='Devam et',exact=True).first.click()
  record('Configuration arrives in existing model summary','113' in page.locator('body').inner_text())
  links=page.locator('a[href^="https://wa.me/"]').evaluate_all('(els)=>els.map(e=>e.href)');record('Correct Yusuf Usta recipient',bool(links) and all('wa.me/905308797169' in x for x in links))
  page.goto(BASE+'tasarim-masasi/',wait_until='networkidle');page.wait_for_selector('[data-three-status="ready"]')
  for view in ['Önden','Soldan','Sağdan','Üstten','Perspektif']:
   page.get_by_role('button',name=view,exact=True).click();page.wait_for_timeout(400);record('Camera preset '+view,all(isinstance(n,(int,float)) for n in state()['camera']))
  record('No public shell overflow desktop',page.evaluate('document.documentElement.scrollWidth<=innerWidth+1'))
  for w in [360,390,768,1024,1440,1920]:
   page.set_viewport_size({'width':w,'height':950});page.wait_for_timeout(300);record('Studio reflow '+str(w),page.evaluate('document.documentElement.scrollWidth<=innerWidth+1'))
  page.set_viewport_size({'width':390,'height':844});page.evaluate('scrollTo(0,0)');page.wait_for_timeout(400);page.screenshot(path=str(OUT/'studio-mobile.png'));page.locator('.v8-showroom').screenshot(path=str(OUT/'studio-mobile-full.png'))
  page.goto(BASE,wait_until='networkidle');record('Home mobile has no overflow',page.evaluate('document.documentElement.scrollWidth<=innerWidth+1'));page.screenshot(path=str(OUT/'home-mobile.png'))
  page.get_by_role('button',name='3D deneyimi başlat',exact=True).click();page.wait_for_selector('[data-three-status="ready"]',timeout=45000);record('Home starts same bilateral scene',len(state()['atelier']['bookcases'])==2)
  page.goto(BASE+'iletisim/',wait_until='networkidle');record('Scene disposed after navigation',page.locator('.v8-canvas-host canvas').count()==0)
  record('No JavaScript exceptions',not errors,errors);record('No unexpected remote requests',not outbound,outbound[:10])
 except Exception as exc:
  report['failure']=str(exc);page.screenshot(path=str(OUT/'failure.png'));raise
 finally:
  report['browser']=browser.version;(OUT/'results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));browser.close()
