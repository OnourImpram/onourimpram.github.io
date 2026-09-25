"""Offline V10 browser tests. Same system Chromium, native WebGL through Xvfb.
No HTTP navigation, external widgets, messages or publication actions.
Run: xvfb-run -a python tests/v9/browser.py
"""
from pathlib import Path
from playwright.sync_api import sync_playwright
from PIL import Image
import json,base64,hashlib,math,os,io
ROOT=Path(__file__).resolve().parents[2];OUT=ROOT/'evidence/v10/acceptance';OUT.mkdir(parents=True,exist_ok=True)
HTML=(ROOT/'preview/Elif_Tasarim.html').read_text();report={'environment':'system Chromium, headed Xvfb, SwiftShader, inline native ESM, offline set_content','checks':[],'limitations':['Not a live HTTP or publication test','Not a physical desk certification','Not real device or WhatsApp delivery testing','Fullscreen behavior is recorded only for this managed Chromium session']}
def check(name,condition,detail=None):
 report['checks'].append({'name':name,'pass':bool(condition),'detail':detail});(OUT/'results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));print(('PASS ' if condition else 'FAIL ')+name,flush=True);assert condition,name
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',headless=False,args=['--no-sandbox','--disable-dev-shm-usage','--use-angle=swiftshader','--enable-unsafe-swiftshader'])
 report['browser']=b.version
 page=b.new_page(viewport={'width':1440,'height':1080},device_scale_factor=1);page.set_default_navigation_timeout(60000)
 page.emulate_media(reduced_motion='reduce')
 errors=[];requests=[];page.on('pageerror',lambda e:errors.append(str(e)));page.on('request',lambda q:requests.append(q.url) if q.url.startswith(('http:','https:')) else None)
 page.set_content(HTML,wait_until='domcontentloaded',timeout=60000);page.wait_for_timeout(250)
 def nav(r):
  page.evaluate('(r)=>location.hash="#"+r',r);page.wait_for_timeout(150)
 def ready():page.wait_for_selector('[data-three-status="ready"]',timeout=35000)
 def inspect():return page.evaluate("document.querySelector('.v8-canvas-host').__elif3D.inspect()")
 def room():return page.evaluate("document.querySelector('.v8-canvas-host').__elif3D.roomStats()")
 def slide(name,value):
  page.get_by_role('slider',name=name,exact=True).evaluate('(el,v)=>{el.value=v;el.dispatchEvent(new Event("input",{bubbles:true}))}',str(value));page.wait_for_timeout(180)
 def snap(name,width=1920,height=1280):
  data=page.evaluate('''([w,h])=>document.querySelector('.v8-canvas-host').__elif3D.snapshot(w,h)''',[width,height]);raw=base64.b64decode(data.split(',')[1]);(OUT/(name+'.png')).write_bytes(raw)
  return raw
 check('V10 identity, approved headline and eight category entrances',page.locator('.preview-bar').inner_text().startswith('V10') and 'Zamana değer' in page.locator('h1').inner_text() and page.locator('.v9-category-ribbon>a').count()==8)
 check('Home does not create WebGL engine before explicit start',not page.evaluate('!!window.ElifDesk3D') and page.locator('canvas').count()==0)
 page.get_by_role('button',name='3D deneyimi başlat',exact=True).click();ready();s=inspect()
 check('Homepage creates real Three.js canvas and distinct double bookcases',s['engine']=='Three.js' and s['revision']=='185' and s['triangles']>10000 and room()['visibleBookcases']==2,{'room':room(),'drawCalls':s['drawCalls'],'triangles':s['triangles']})
 page.evaluate("window.__oldRoom=document.querySelector('.v8-canvas-host').__elif3D");nav('/tasarim-masasi');ready()
 check('Leaving the compact scene disposes its room before full scene starts',page.evaluate('window.__oldRoom.roomStats().disposed') and page.locator('.v8-canvas-host canvas').count()==1)
 page.wait_for_timeout(750);initial=snap('atelier-day');page.screenshot(path=str(OUT/'desktop-studio.png'))
 check('Default framing keeps the whole desk inside viewport',all(abs(v)<1.001 for v in inspect()['framing'].values()),inspect()['framing'])
 page.get_by_role('tab',name='Mekân',exact=True).click()
 for label,expected in [('Sol raf',1),('Sağ raf',1),('Rafsız',0),('Çift taraflı',2)]:
  page.get_by_role('button',name=label,exact=True).click();page.wait_for_timeout(100);check(label+' changes actual bookcase visibility',room()['visibleBookcases']==expected,room())
 slide('Raf ışığı',22);check('Shelf illumination is adjustable and bounded',room()['shelfLight']==22)
 page.get_by_role('button',name='Akşam',exact=True).click();page.wait_for_timeout(350);evening=snap('atelier-evening');check('Lighting produces a different actual render',hashlib.sha256(initial).hexdigest()!=hashlib.sha256(evening).hexdigest() and inspect()['theme']=='evening')
 page.get_by_role('button',name='Üstten',exact=True).click();check('Top camera hides architectural backdrop',not room()['visible'])
 slide('Raf ışığı',70);check('A lighting change does not reintroduce room into top view',not room()['visible'])
 page.get_by_role('button',name='Önden',exact=True).click();check('Front view restores the two-sided room',room()['visible'] and room()['visibleBookcases']==2)
 page.get_by_role('button',name='Yalnız masa',exact=True).click();page.wait_for_timeout(250);check('Product-only mode removes the whole room',not room()['visible'] and inspect()['config']['room']=='product')
 page.get_by_role('tab',name='Masa',exact=True).click();slide('Çalışma yüksekliği',113)
 page.wait_for_function("Math.abs(document.querySelector('.v8-canvas-host').__elif3D.inspect().geometry.mainTopY-1.13)<.002")
 check('Rising tabletop leaves lower cabinet and return stationary',abs(inspect()['geometry']['mainTopY']-1.13)<.003 and inspect()['geometry']['returnTopY']==.695,inspect()['geometry'])
 slide('Yan tabla açısı',180);page.wait_for_function("Math.abs(document.querySelector('.v8-canvas-host').__elif3D.inspect().geometry.wingAngle-Math.PI)<.01")
 page.get_by_role('button',name='Çekmeceleri aç',exact=True).click();page.get_by_role('button',name='Dolabı aç',exact=True).click();page.wait_for_function("document.querySelector('.v8-canvas-host').__elif3D.inspect().geometry.doorAngle> 1.5")
 check('Return, drawers and cabinet door remain articulated geometry',inspect()['geometry']['mainDrawerZ']>.55 and inspect()['geometry']['doorAngle']>1.5)
 page.get_by_role('button',name='Açık meşe tonu',exact=True).click();check('Material selection updates concept finish',inspect()['material']=='mese')
 page.get_by_role('tab',name='Ölçü',exact=True).click();slide('Masa eni',203);slide('Masa derinliği',83);page.wait_for_timeout(300)
 check('Parametric rebuild preserves open drawer and door state',inspect()['config']['width']==203 and inspect()['config']['depth']==83 and inspect()['config']['drawers'] and inspect()['config']['door'])
 page.get_by_role('button',name='Ölçü çizgilerini göster',exact=True).click();check('Measurement guides remain optional',inspect()['dimensions'])
 png=snap('product-open');check('Snapshot is a real 1920 by 1280 PNG',Image.open(io.BytesIO(png)).size==(1920,1280))
 page.get_by_role('button',name='Mekân içinde',exact=True).click();page.get_by_role('button',name='Tasarım bağlantısı',exact=True).click()
 url=page.get_by_label('Paylaşılabilir 3D tasarım bağlantısı').input_value()
 check('Share URL includes shelf options and dimension configuration, not personal content','en=203' in url and 'raf=both' in url and 'rafisigi=70' in url and 'mekan=atelier' in url,url)
 page.get_by_role('button',name='Bu tasarımı Yusuf Usta ile konuş',exact=True).click();page.get_by_role('button',name='Devam et',exact=True).click()
 check('Desk dimensions and new shelf summary reach the same customer draft',page.locator('#model-width').input_value()=='203' and page.locator('#model-height').input_value()=='113' and 'Kitaplık' in page.locator('textarea').last.input_value())
 page.get_by_role('button',name='Devam et',exact=True).click();links=page.locator('a[href^="https://wa.me/"]').evaluate_all('(xs)=>xs.map(x=>x.href)');check('Business handoff retains the exact supplied phone',bool(links) and all('wa.me/905308797169' in h for h in links))
 nav('/tasarim-masasi');ready();page.get_by_role('button',name='Stüdyoyu tam ekran aç',exact=True).click();page.wait_for_timeout(250)
 full=page.evaluate('!!document.fullscreenElement')
 check('Fullscreen request either succeeds or reports its fallback',full or page.locator('.toast').count()>0,{'fullscreenElement':full,'errors':errors})
 if full:page.evaluate('document.exitFullscreen()');page.wait_for_timeout(150)
 page.emulate_media(reduced_motion='reduce');slide('Çalışma yüksekliği',120);page.wait_for_function("Math.abs(document.querySelector('.v8-canvas-host').__elif3D.inspect().geometry.mainTopY-1.2)<.003");check('Reduced motion applies dimensions without prolonged interpolation',abs(inspect()['geometry']['mainTopY']-1.2)<.003)
 page.emulate_media(reduced_motion='no-preference');nav('/');page.get_by_role('button',name='Sitede ara',exact=True).click();page.get_by_role('searchbox',name='Arama kelimesi').fill('kahve');page.get_by_role('link',name='Tüm sonuçları gör').click();check('Search preserves the query and real portfolio path','/arama?q=kahve' in page.url and 'kahve' in page.locator('main').inner_text().lower())
 nav('/tasarim-masasi');ready();page.set_viewport_size({'width':390,'height':844});page.wait_for_timeout(400);check('Mobile studio avoids horizontal page overflow',page.evaluate('document.documentElement.scrollWidth<=innerWidth+1'))
 page.screenshot(path=str(OUT/'mobile-studio.png'));page.locator('.v8-showroom').screenshot(path=str(OUT/'mobile-viewer.png'))
 page.set_viewport_size({'width':1440,'height':1080});page.wait_for_timeout(350);nav('/');page.screenshot(path=str(OUT/'desktop-home.png'));page.screenshot(path=str(OUT/'home-full.jpg'),full_page=True,type='jpeg',quality=88)
 page.set_viewport_size({'width':390,'height':844});page.wait_for_timeout(250);page.screenshot(path=str(OUT/'mobile-home.png'))
 page.get_by_role('button',name='Menüyü aç',exact=True).click();page.keyboard.press('Escape');check('Mobile menu closes and returns keyboard focus',page.evaluate('document.activeElement.getAttribute("aria-label")==="Menüyü aç"'))
 nav('/tasarim-masasi');ready();page.evaluate("document.querySelector('.v8-canvas-host canvas').dispatchEvent(new Event('webglcontextlost',{cancelable:true}))");page.wait_for_timeout(150);check('WebGL context loss shows explicit fallback',page.locator('[data-three-status]').get_attribute('data-three-status')=='lost' and 'bağlantısı kesildi' in page.locator('.v8-poster').inner_text())
 check('No uncaught application errors',not errors,errors);check('No external HTTP request was made in the offline flows',not requests,requests)
 report['completed']=True;(OUT/'results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));b.close()
