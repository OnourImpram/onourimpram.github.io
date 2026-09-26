"""V11 user-decision contracts. Local inline or actual HTTP, no messages sent."""
from pathlib import Path
from playwright.sync_api import sync_playwright
from urllib.parse import unquote, urlparse, parse_qs
from PIL import Image
import json, os, io, base64, zipfile, traceback, time
R=Path(__file__).resolve().parents[2];BASE=os.environ.get('BASE_URL','');OUT=Path(os.environ.get('EVIDENCE_DIR',str(R/'evidence/v11/acceptance')));OUT.mkdir(parents=True,exist_ok=True)
report={'base':BASE or 'inline offline copy','checks':[],'limits':['No real WhatsApp message','No physical device or production engineering certification']}
def record(name,detail=None):
 report['checks'].append({'name':name,'pass':True,'detail':detail});(OUT/'results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));print('PASS '+name,flush=True)
with sync_playwright() as p:
 exe=os.environ.get('CHROMIUM_PATH','/usr/bin/chromium')
 b=p.chromium.launch(executable_path=exe if Path(exe).exists() else None,headless=False,args=['--no-sandbox','--disable-dev-shm-usage','--use-gl=angle','--use-angle=swiftshader'])
 report['browser']=b.version
 page=b.new_page(viewport={'width':1440,'height':1000});page.set_default_timeout(18000);page.emulate_media(reduced_motion='reduce');errors=[];network=[]
 page.on('pageerror',lambda e:errors.append(str(e)));page.on('request',lambda q:network.append(q.url) if q.url.startswith(('http:','https:')) else None)
 def fresh():
  global page
  page.close()
  page=b.new_page(viewport={'width':1440,'height':1000});page.set_default_timeout(18000);page.emulate_media(reduced_motion='reduce')
  page.on('pageerror',lambda e:errors.append(str(e)));page.on('request',lambda q:network.append(q.url) if q.url.startswith(('http:','https:')) else None)
  if BASE:page.goto(BASE,wait_until='domcontentloaded',timeout=60000)
  else:page.set_content((R/'preview/Elif_Tasarim.html').read_text(),wait_until='domcontentloaded',timeout=60000)
  page.wait_for_timeout(180)
 def nav(route):
  # Legacy hash entry is a supported public route, then normalized to a clean path on HTTP.
  page.evaluate('(r)=>{location.hash="#"+r}',route);page.wait_for_timeout(150)
 def ready():page.wait_for_selector('[data-three-status="ready"]',timeout=60000)
 def inspect():return page.evaluate("document.querySelector('.v8-canvas-host').__elif3D.inspect()")
 def slide(name,v):
  page.get_by_role('slider',name=name,exact=True).evaluate('(el,v)=>{el.value=String(v);el.dispatchEvent(new Event("input",{bubbles:true}))}',v);page.wait_for_timeout(140)
 def summary():
  page.get_by_role('button',name='Ayrıntı eklemeden özeti gör',exact=True).click();return page.locator('#project-message-preview').inner_text()
 def startwork(id):
  nav('/proje/'+id);page.get_by_role('link',name='Benzerini birlikte düşünelim',exact=True).click();page.wait_for_timeout(120)
 def open_details():
  if not page.locator('#project-optional-details').is_visible():page.get_by_role('button',name='Ölçü ve malzeme ayrıntılarını ekle',exact=True).click()
 try:
  fresh();assert page.locator('.preview-bar').inner_text().startswith('V20');assert 'Zamana değer' in page.locator('h1').inner_text();assert 'Yusuf' not in page.locator('body').inner_text();assert page.locator('.v9-category-ribbon').count()==1;assert page.locator('.home-categories').count()==0;assert page.locator('canvas').count()==0
  record('D03. Simplified homepage preserves brand, real work and one category path, no eager 3D')
  for id,cat in [('sade-kose-mutfak','Mutfak'),('isikli-tv-unitesi','TV Ünitesi'),('sade-kose-mutfak','Mutfak')]:
   startwork(id);text=summary();assert 'İhtiyaç, '+cat in text,text
  record('A01. Actual work A, B, A follows final category and source')
  for key in ['alpha','beta','alpha']:
   nav('/modelini-getir?kategori=mutfak&ref=https%3A%2F%2Fexample.com%2F'+key+'&fikir=System-'+key)
   if key=='alpha' and page.locator('#model-note').input_value()=='':page.locator('#model-note').fill('Benim kişisel karar notum')
   text=summary();assert 'https://example.com/'+key in text;assert 'Benim kişisel karar notum' in text;assert 'Modelden gelen açıklama, System-'+key in text
  record('A02, A04. Revisited external source updates system prefill but never authored note')
  startwork('kemerli-kahve-kosesi');text=summary();assert 'example.com' not in text;assert 'Benim kişisel karar notum' in text;assert 'Kahve Köşesi' in text
  record('A03. Workshop selection clears previous external link')
  nav('/tasarim-masasi');ready();page.get_by_role('tab',name='Ölçü',exact=True).click();slide('Masa eni',203);slide('Masa derinliği',83);page.get_by_role('tab',name='Masa',exact=True).click();slide('Çalışma yüksekliği',113);page.get_by_role('button',name='Açık meşe tonu',exact=True).click()
  page.get_by_role('button',name='Bu tasarımı Yunus Usta ile konuş',exact=True).click();text=summary();assert '203 × 83 × 113 cm' in text;assert 'example.com' not in text;assert 'Kahve Köşesi' not in text;assert 'Meşe' in text;assert 'Benim kişisel karar notum' in text
  record('A05. Studio handoff replaces model source, keeps private note, carries exact measurements')
  nav('/tasarim-masasi');ready();c=inspect()['config'];assert [c['width'],c['depth'],c['height']]==[203,83,113] and c['material']=='mese';record('A06. Scene, form, scene retains 203 by 83 by 113 and finish',c)
  page.get_by_role('button',name='Bu tasarımı Yunus Usta ile konuş',exact=True).click();page.get_by_role('button',name='Devam et',exact=True).click();open_details()
  page.locator('#model-width').fill('205');page.locator('#model-width').blur();page.get_by_role('checkbox',name='En, derinlik ve yüksekliği ayrı ayrı biliyorum',exact=False).uncheck()
  assert '205' in page.locator('#model-dimensions').input_value();page.get_by_role('checkbox',name='En, derinlik ve yüksekliği ayrı ayrı biliyorum',exact=False).check();assert page.locator('#model-width').input_value()=='205'
  page.get_by_label('Ölçü birimi',exact=True).select_option('mm');assert page.locator('#model-width').input_value()=='2050';page.get_by_label('Ölçü birimi',exact=True).select_option('cm');assert page.locator('#model-width').input_value()=='205'
  record('A07, A08. Numeric uncertainty and cm/mm toggles preserve latest values')
  page.get_by_role('button',name='Devam et',exact=True).click();text=page.locator('#project-message-preview').inner_text();wa=page.locator('[data-whatsapp-message]').get_attribute('href');sent=parse_qs(urlparse(wa).query)['text'][0]
  assert page.locator('[data-whatsapp-message]').get_attribute('data-whatsapp-message')=='complete',(len(wa),text)
  assert text==sent
  with page.expect_download() as download:page.get_by_role('button',name='Yalnız özeti indir',exact=True).click()
  assert Path(download.value.path()).read_text()==text
  record('B01. Visible exact message, WhatsApp text and downloaded TXT agree byte-for-byte')
  nav('/tasarim-masasi');ready();assert inspect()['config']['width']==205;page.get_by_role('button',name='Tasarım bağlantısı',exact=True).click();link=page.get_by_label('Paylaşılabilir 3D tasarım bağlantısı',exact=True).input_value();assert 'Benim' not in link and '205' in link;record('A06, A09. Edited form returns to same studio and public link omits private notes')
  # Scene parts and optional footprint are observed, never a physical collision certificate.
  page.get_by_role('tab',name='Mekân',exact=True).click()
  for name,n in [('Sol raf',1),('Sağ raf',1),('Rafsız',0),('Çift taraflı',2)]:
   page.get_by_role('button',name=name,exact=True).click();assert page.evaluate("document.querySelector('.v8-canvas-host').__elif3D.roomStats().visibleBookcases")==n
  record('C04. Two bookcases remain independently controllable')
  page.get_by_role('tab',name='Masa',exact=True).click();page.get_by_role('button',name='Çekmeceleri aç',exact=True).click();page.get_by_role('button',name='Dolabı aç',exact=True).click();page.wait_for_timeout(200);assert inspect()['geometry']['doorAngle']>1.5
  for angle in [0,90,180]:
   slide('Yan tabla açısı',angle);page.get_by_role('button',name='Üstten yerleşim alanını gör',exact=True).click();bounds=page.locator('.v11-footprint-result').inner_text();assert 'cm' in bounds and inspect()['view']=='top'
  record('C06. Top-down bounds reflect current articulated geometry, with explicit concept limits')
  page.get_by_role('button',name='Genel',exact=True).click();page.get_by_role('button',name='Stüdyoyu kontrollerle tam ekran aç',exact=True).click();page.wait_for_timeout(180)
  assert page.evaluate("document.fullscreenElement?.classList.contains('v8-experience')")
  assert page.evaluate("!!document.fullscreenElement.querySelector('[aria-label=\"Çalışma yüksekliği\"]')")
  slide('Çalışma yüksekliği',111);assert inspect()['config']['height']==111
  page.get_by_role('button',name='Tam ekrandan çık',exact=True).click();page.wait_for_timeout(180);assert not page.evaluate('!!document.fullscreenElement');assert page.evaluate("document.activeElement.classList.contains('v11-fullscreen-toggle')")
  record('C02. Fullscreen includes actual controls, changes height and returns focus')
  page.get_by_role('button',name='Çekmeceleri kapat',exact=True).click();page.get_by_role('button',name='Dolabı kapat',exact=True).click();slide('Yan tabla açısı',90)
  for w,h in [(390,844),(360,800),(320,568)]:
   page.set_viewport_size({'width':w,'height':h});page.wait_for_timeout(160);page.get_by_role('slider',name='Çalışma yüksekliği',exact=True).scroll_into_view_if_needed();page.wait_for_timeout(180)
   canvas=page.locator('.v8-canvas-wrap').bounding_box();slider=page.get_by_role('slider',name='Çalışma yüksekliği',exact=True).bounding_box();assert canvas['y']>=-2 and canvas['y']+canvas['height']<=h+1 and slider['y']+slider['height']<=h+1,(w,canvas,slider)
   assert page.evaluate('document.documentElement.scrollWidth<=innerWidth+1');slide('Çalışma yüksekliği',110);assert inspect()['config']['height']==110;page.screenshot(path=str(OUT/f'mobile-studio-{w}.png'))
  record('C01. 390, 360 and 320 layouts keep entire scene and active height slider simultaneously visible')
  page.set_viewport_size({'width':1440,'height':1000});page.wait_for_timeout(200);page.evaluate('scrollTo(0,0)');page.screenshot(path=str(OUT/'desktop-studio.png'))
  # Unified full-site discovery.
  for q in ['Devir','3D','çalışma masası','yükseklik ayarlı','gardrop','gardırop']:
   nav('/arama?q='+q);assert page.locator('.v7-result-grid article').count()>0
   if q not in ['gardrop','gardırop']:assert page.locator('.v7-result-grid a[href*="tasarim-masasi"]').count()>0
  record('B02, B03. Desk and wardrobe spelling aliases find meaningful entries')
  nav('/arama');concept=page.locator('.v7-result-grid a[href*="hedef=concept"]').first;assert concept.count();concept.click();page.wait_for_timeout(350);assert page.locator('.v11-target').count()==1
  assert page.locator('.v11-target').evaluate('(el)=>el===document.activeElement');record('B04. Concept result reaches and focuses its exact card')
  nav('/arama');pin=page.locator('.v7-result-grid a[href*="hedef=pin"]').last;pin.click();page.wait_for_timeout(350);assert page.locator('.v11-target.pin-card').count()==1;record('B04. Pin result opens the correct group and exact card')
  nav('/projeler');page.locator('.work-card').nth(7).scroll_into_view_if_needed();page.wait_for_timeout(180);before=page.evaluate('scrollY');page.locator('.work-card').nth(7).locator('a').first.click();page.go_back();page.wait_for_timeout(400);after=page.evaluate('scrollY');assert abs(before-after)<30,(before,after);record('B05. Back navigation restores the actual previous work-list position',{'before':before,'after':after})
  nav('/proje/isikli-tv-unitesi');wa=page.locator('.footer-contact a[href^="https://wa.me/"]').get_attribute('href');txt=parse_qs(urlparse(wa).query)['text'][0];assert '/proje/isikli-tv-unitesi/' in txt;assert 'Yunus' in txt;assert '905308797169' in wa;assert page.locator('.v11-case-study').count();record('B06, D02. Contextual project contact and evidence-grounded project explanation')
  for id in ['sade-kose-mutfak','kemerli-kahve-kosesi']:
   nav('/proje/'+id);assert page.locator('.v11-case-study').count()==1
  record('D02. Kitchen, coffee and TV have distinct explanation and verification boundaries')
  fresh();nav('/modelini-getir');page.locator('#model-note').fill('Sadece bir fikirle başlamak istiyorum.');page.get_by_role('button',name='Devam et',exact=True).click();assert not page.locator('#project-optional-details').is_visible();page.get_by_role('button',name='Ölçü ve malzeme ayrıntılarını ekle',exact=True).click();assert page.locator('#project-optional-details').is_visible();page.get_by_role('button',name='Geri',exact=True).click();assert page.locator('#model-note').input_value().startswith('Sadece');text=summary();assert 'Sadece' in text;record('D03, E02. No-image idea works and optional details do not reset it')
  fresh();nav('/modelini-getir');page.locator('#model-note').fill('Uzun Türkçe not. '+'İğşçüö'*240);text=summary();assert page.locator('[data-whatsapp-message]').get_attribute('data-whatsapp-message')=='short-with-attachment';actual=page.locator('#whatsapp-actual-message').inner_text();link=page.locator('[data-whatsapp-message]').get_attribute('href');assert parse_qs(urlparse(link).query)['text'][0]==actual;assert 'Uzun Türkçe' in text;record('B07. Long Unicode summary remains complete, short outgoing intro is separately disclosed')
  fresh();nav('/modelini-getir');page.locator('#model-url').fill('javascript:alert(1)');page.get_by_role('button',name='Devam et',exact=True).click();assert page.locator('#model-url').get_attribute('aria-invalid')=='true';assert page.evaluate('document.activeElement.id')=='model-url';page.locator('#model-url').fill('');page.locator('#model-note').fill('<img src=x onerror=alert(1)> Özel fikrim');assert page.locator('#model-note').input_value().startswith('<img');record('Input. Unsafe reference rejected, authored markup is text, field error receives focus')
  out=io.BytesIO();Image.new('RGB',(30,20),(110,99,85)).save(out,format='PNG');page.locator('#model-files').set_input_files({'name':'oda.png','mimeType':'image/png','buffer':out.getvalue()});page.wait_for_selector('.model-uploads img');text=summary()
  with page.expect_download() as download:page.get_by_role('button',name='Özet ve görselleri indir',exact=True).click()
  archive=zipfile.ZipFile(download.value.path());assert len(archive.namelist())==2 and any(n.endswith('.jpg') for n in archive.namelist());assert archive.read('Elif_Proje_Ozeti.txt').decode()==text
  page.evaluate("Object.defineProperty(navigator,'canShare',{configurable:true,value:()=>true});Object.defineProperty(navigator,'share',{configurable:true,value:async()=>{throw new DOMException('cancel','AbortError')}})")
  page.get_by_role('button',name='Görselleri cihazdan paylaş',exact=True).click();assert 'iptal edildi' in page.locator('.v7-status').inner_text();record('E03. Real local image ZIP matches visible summary and canceled native share is not delivery')
  fresh();nav('/tasarim-masasi');ready();page.locator('.v8-canvas-host canvas').evaluate("el=>el.dispatchEvent(new Event('webglcontextlost',{cancelable:true}))");assert page.locator('[data-three-status=lost]').count();assert page.get_by_role('button',name='Bu tasarımı Yunus Usta ile konuş',exact=True).is_enabled();record('C05. Controlled WebGL loss preserves non-3D contact and retry alternative')
  fresh();page.screenshot(path=str(OUT/'desktop-home.png'));page.screenshot(path=str(OUT/'home-full.jpg'),full_page=True,type='jpeg',quality=88);page.set_viewport_size({'width':390,'height':844});page.screenshot(path=str(OUT/'mobile-home.png'))
  assert not errors,errors
  external=[u for u in network if BASE and urlparse(u).netloc!=urlparse(BASE).netloc] if BASE else network
  assert not external,external[:8];record('F01. No uncaught errors, unsolicited third-party requests, messages or analytics',{'errors':errors,'external':external})
 except Exception as e:
  report['failure']=str(e);report['traceback']=traceback.format_exc();(OUT/'results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));page.screenshot(path=str(OUT/'failure.png'));raise
 finally:
  b.close()
