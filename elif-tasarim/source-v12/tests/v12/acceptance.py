"""C+ regression checks against real rendered geometry. No message is sent."""
from pathlib import Path
from playwright.sync_api import sync_playwright
import os, math, json, base64, io, traceback
from PIL import Image
R=Path(__file__).resolve().parents[2]
BASE=os.environ.get('BASE_URL','')
O=Path(os.environ.get('EVIDENCE_DIR',str(R/'evidence/v12/acceptance')));O.mkdir(parents=True,exist_ok=True)
report={'base':BASE or 'inline offline V12','checks':[],'limits':['Chromium software WebGL, not a physical mobile GPU','No message sent','Visual concept, not fabrication or safety validation']}
def rec(name,data=None):
 report['checks'].append({'name':name,'pass':True,'detail':data});(O/'results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));print('PASS',name,flush=True)
with sync_playwright() as p:
 exe=os.environ.get('CHROMIUM_PATH','/usr/bin/chromium');b=p.chromium.launch(executable_path=exe if Path(exe).exists() else None,headless=False,args=['--no-sandbox','--disable-dev-shm-usage','--use-gl=angle','--use-angle=swiftshader'])
 report['browser']=b.version;errors=[]
 def newpage(mobile=False):
  context=b.new_context(viewport={'width':390 if mobile else 1440,'height':844 if mobile else 1000},has_touch=mobile,is_mobile=mobile)
  page=context.new_page();page.set_default_timeout(20000);page.emulate_media(reduced_motion='reduce');page.on('pageerror',lambda e:errors.append(str(e)))
  if BASE:page.goto(BASE,wait_until='domcontentloaded',timeout=60000)
  else:page.set_content((R/'preview/Elif_Tasarim.html').read_text(),wait_until='domcontentloaded',timeout=60000)
  return page
 page=newpage();api="document.querySelector('.v8-canvas-host').__elif3D"
 def call(expr):return page.evaluate(api+expr)
 def nav(path):page.evaluate('(p)=>location.hash="#"+p',path);page.wait_for_timeout(150)
 def ready():page.wait_for_selector('[data-three-status="ready"]',timeout=60000)
 def state():return call('.inspect()')
 def update(patch):page.evaluate('(p)=>{const a=document.querySelector(".v8-canvas-host").__elif3D;a.update({...a.inspect().config,...p})}',patch);page.wait_for_timeout(150)
 def preset(name):page.get_by_role('button',name=name,exact=True).click();page.wait_for_timeout(220)
 try:
  assert page.locator('canvas').count()==0;assert page.locator('.preview-bar').inner_text().startswith('V13');assert 'Yusuf' not in page.locator('body').inner_text();rec('01. V13, Yunus and no eager homepage WebGL')
  nav('/tasarim-masasi');ready();s=state();assert s['engine']=='Three.js' and s['orbit']['fullHorizontal'];rec('02. Real Three.js and unbounded horizontal OrbitControls',s['orbit'])
  update({'drawers':False,'door':False,'height':80});closed=state();update({'drawers':True,'door':True});opened=state()
  for key in ['mainDrawerWorld','cabinetDrawerWorld']:
   assert opened['orientation'][key][2]<closed['orientation'][key][2]-.1,(key,closed,opened)
  assert opened['orientation']['drawerNormal'][2]<-.999;assert opened['orientation']['controllerWorld'][2]<0;assert opened['orientation']['chairWorld'][2]<0
  rec('03. Drawers and height control face the actual chair side',{'closed':closed['orientation'],'open':opened['orientation']})
  assert opened['orientation']['doorFreeEdge'][2]<closed['orientation']['doorFreeEdge'][2]-.2;rec('04. Cabinet door opens outward toward the user, not into the carcass')
  update({'height':113});raised=state();assert abs(raised['geometry']['mainTopY']-1.13)<.001;assert raised['geometry']['returnTopY']==closed['geometry']['returnTopY'];rec('05. Correct orientation survives lift, lower return stays fixed')
  update({'height':80,'drawers':False,'door':False})
  preset('Çekmece tarafı');front=state();assert front['camera'][2]<0;assert front['orbit']['cutaway'];assert call('.roomStats()')['visibleBookcases']==0
  page.locator('.v8-showroom').screenshot(path=str(O/'user-side.png'));rec('06. User-side preset has unobstructed access and temporary room cutaway')
  preset('Arka');back=state();assert back['camera'][2]>0;assert not back['orbit']['cutaway'];assert call('.roomStats()')['visibleBookcases']==2
  delta=abs(math.atan2(math.sin(front['orbit']['azimuth']-back['orbit']['azimuth']),math.cos(front['orbit']['azimuth']-back['orbit']['azimuth'])));assert delta>3.0;rec('07. Front and back are opposite real viewpoints',{'radians_apart':delta})
  for name in ['Soldan','Sağdan','Üstten','Genel']:
   preset(name);s=state();f=s['framing'];assert all(abs(f[k])<1.04 for k in ['minX','maxX','minY','maxY']),(name,f)
   page.locator('.v8-showroom').screenshot(path=str(O/({'Soldan':'left','Sağdan':'right','Üstten':'top','Genel':'atelier'}[name]+'.png')))
  rec('08. Six meaningful presets fit the complete desk geometry')
  update({'shelves':'left','shelfLight':77});preset('Çekmece tarafı');assert call('.roomStats()')['selection']=='left';assert call('.roomStats()')['activeShelfLights']==0
  preset('Genel');stats=call('.roomStats()');assert stats['selection']=='left' and stats['visibleBookcases']==1 and stats['shelfLight']==77;rec('09. Cutaway preserves and restores selected shelf and light settings',stats)
  update({'shelves':'both'});preset('Genel');canvas=page.locator('.v8-canvas-host canvas');canvas.focus();angles=[]
  for i in range(45):
   page.keyboard.press('ArrowRight');page.wait_for_timeout(22);angles.append(state()['orbit']['azimuth'])
  total=sum(math.atan2(math.sin(b-a),math.cos(b-a)) for a,b in zip(angles,angles[1:]));assert abs(total)>math.tau;assert min(angles)<-2.5 and max(angles)>2.5
  rec('10. Real keyboard orbit passes all quadrants and more than a complete turn',{'travelRadians':total,'samples':angles})
  preset('Genel');canvas.scroll_into_view_if_needed();bb=canvas.bounding_box();angles=[state()['orbit']['azimuth']]
  for i in range(5):
   x=bb['x']+bb['width']*.65;y=bb['y']+bb['height']*.52
   page.mouse.move(x,y);page.mouse.down();page.mouse.move(x-bb['width']*.30,y,steps=3);page.mouse.up();page.wait_for_timeout(200);print('DRAG',i,flush=True);angles.append(state()['orbit']['azimuth'])
  total=sum(math.atan2(math.sin(b-a),math.cos(b-a))for a,b in zip(angles,angles[1:]));assert abs(total)>math.tau,(total,angles)
  rec('11. Actual mouse drags rotate through more than 360 degrees in room mode',{'travelRadians':total,'samples':angles})
  preset('Çekmece tarafı');dist=state()['orbit']['distance'];page.get_by_role('button',name='Yakınlaştır',exact=True).click();assert state()['orbit']['distance']<dist;page.get_by_role('button',name='Görünümü sıfırla',exact=True).click();assert state()['view']=='perspective' and not state()['rotating'];rec('12. Zoom and reset restore a coherent camera state')
  canvas.scroll_into_view_if_needed();bb=canvas.bounding_box();before=page.evaluate('scrollY');page.mouse.move(bb['x']+bb['width']*.6,bb['y']+bb['height']*.6);page.mouse.wheel(0,300);page.wait_for_timeout(250);after=page.evaluate('scrollY');assert after>before+30;(O/'scroll.json').write_text(json.dumps({'before':before,'after':after}));rec('13. Ordinary mouse wheel still scrolls the page')
  page.emulate_media(reduced_motion='no-preference');preset('Genel');canvas.scroll_into_view_if_needed()
  page.wait_for_function('()=>document.querySelector(".v8-canvas-host").__elif3D.inspect().visible',timeout=12000)
  before_auto=state();a=before_auto['orbit']['azimuth'];call('.rotate(true)')
  # Wait for measured movement rather than assuming software-GPU frame throughput.
  try:
   page.wait_for_function('(a)=>{const s=document.querySelector(".v8-canvas-host").__elif3D.inspect();return s.rotating && Math.abs(Math.atan2(Math.sin(s.orbit.azimuth-a),Math.cos(s.orbit.azimuth-a)))>.08}',arg=a,timeout=15000,polling=150)
  finally:
   d=state();(O/'automatic-motion.json').write_text(json.dumps({'before':before_auto,'after':d},indent=2))
  assert d['rotating'] and abs(math.atan2(math.sin(d['orbit']['azimuth']-a),math.cos(d['orbit']['azimuth']-a)))>.08
  canvas.focus();page.keyboard.press('ArrowLeft');assert not state()['rotating'];page.emulate_media(reduced_motion='reduce');call('.rotate(true)');assert not state()['rotating'];rec('14. Automatic turn animates, manual control stops it, reduced motion is respected',{'frames':d['frameCount']-before_auto['frameCount'],'travelRadians':d['orbit']['azimuth']-a})
  page.get_by_role('tab',name='Ölçü',exact=True).click()
  for label,value in [('Masa eni',203),('Masa derinliği',83)]:page.get_by_role('slider',name=label,exact=True).evaluate('(e,v)=>{e.value=String(v);e.dispatchEvent(new Event("input",{bubbles:true}))}',value)
  page.get_by_role('tab',name='Masa',exact=True).click();page.get_by_role('slider',name='Çalışma yüksekliği',exact=True).evaluate('(e)=>{e.value="113";e.dispatchEvent(new Event("input",{bubbles:true}))}')
  page.get_by_role('button',name='Çekmeceleri aç',exact=True).click();page.get_by_role('button',name='Dolabı aç',exact=True).click();preset('Çekmece tarafı');page.locator('.v8-showroom').screenshot(path=str(O/'raised-open.png'))
  data=call('.snapshot(1920,1280)');im=Image.open(io.BytesIO(base64.b64decode(data.split(',')[1])));assert im.size==(1920,1280);im.save(O/'snapshot.png');rec('15. Actual corrected scene exports a 1920 by 1280 image')
  page.get_by_role('button',name='Bu tasarımı Yunus Usta ile konuş',exact=True).click();page.get_by_role('button',name='Ayrıntı eklemeden özeti gör',exact=True).click();text=page.locator('#project-message-preview').inner_text();assert '203' in text and '113' in text and 'Yunus' in text
  nav('/tasarim-masasi');ready();assert state()['config']['width']==203;rec('16. V11 configuration-to-project continuity is preserved')
  preset('Genel');page.get_by_role('button',name='Stüdyoyu kontrollerle tam ekran aç',exact=True).click();assert page.evaluate('!!document.fullscreenElement');page.get_by_role('button',name='Çekmece tarafı',exact=True).click();assert state()['camera'][2]<0;assert page.get_by_role('slider',name='Çalışma yüksekliği',exact=True).is_visible();page.get_by_role('button',name='Tam ekrandan çık',exact=True).click();rec('17. 360 presets and height remain usable in full-screen configuration')
  page.close();page=newpage(True);nav('/tasarim-masasi');ready();page.locator('.v8-canvas-host canvas').scroll_into_view_if_needed();bb=page.locator('.v8-canvas-host canvas').bounding_box();cdp=page.context.new_cdp_session(page);x=bb['x']+bb['width']/2;y=bb['y']+bb['height']*.43;before=state()['orbit']['distance']
  def pts(d):return [{'x':x-d,'y':y,'id':0},{'x':x+d,'y':y,'id':1}]
  cdp.send('Input.dispatchTouchEvent',{'type':'touchStart','touchPoints':pts(35)})
  for d in range(40,86,5):cdp.send('Input.dispatchTouchEvent',{'type':'touchMove','touchPoints':pts(d)});page.wait_for_timeout(35)
  cdp.send('Input.dispatchTouchEvent',{'type':'touchEnd','touchPoints':[]});page.wait_for_timeout(220);after=state()['orbit']['distance'];assert after<before-.1,(before,after);rec('18. Real two-finger touch pinch zooms the model',{'before':before,'after':after})
  for width in [320,360,390,768,1440]:
   page.set_viewport_size({'width':width,'height':844 if width<768 else 1000});page.wait_for_timeout(180);preset('Genel');assert page.evaluate('document.documentElement.scrollWidth<=innerWidth+1');assert page.get_by_role('button',name='Arka',exact=True).is_visible()
   if width==390:page.screenshot(path=str(O/'mobile-390.png'),full_page=True)
  rec('19. Camera options remain reachable without horizontal overflow at five widths')
  assert not errors,errors;rec('20. No uncaught JavaScript error in tested flows');b.close()
 except Exception:
  report['failure']=traceback.format_exc();(O/'results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));page.screenshot(path=str(O/'failure.png'),full_page=True);b.close();raise
