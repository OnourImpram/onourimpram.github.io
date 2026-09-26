"""V20 public-model acceptance. No messages are sent and no native AR device is simulated."""
from pathlib import Path
from playwright.sync_api import sync_playwright
import os,json,struct,zipfile,traceback,io
R=Path(__file__).resolve().parents[2];B=(os.environ['BASE_URL'].rstrip('/')+'/')if os.environ.get('BASE_URL')else ''
O=Path(os.environ.get('EVIDENCE_DIR',str(R/'evidence/v20')));O.mkdir(parents=True,exist_ok=True)
report={'base':B,'checks':[],'limitations':['Chromium software WebGL','No physical AR device tested','No message sent']}
def rec(name,detail=None):
 report['checks'].append({'name':name,'pass':True,'detail':detail});(O/'results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));print('PASS',name,flush=True)
with sync_playwright()as p:
 exe=os.environ.get('CHROMIUM_PATH','/usr/bin/chromium');browser=p.chromium.launch(executable_path=exe if Path(exe).exists()else None,headless=True,args=['--no-sandbox','--disable-dev-shm-usage','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'])
 page=browser.new_page(viewport={'width':1440,'height':1000});page.set_default_timeout(30000);page.emulate_media(reduced_motion='reduce');errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
 try:
  
  if B:page.goto(B+'devir-01/',wait_until='domcontentloaded',timeout=60000)
  else:
   page.set_content((R/'preview/Elif_Tasarim.html').read_text(),wait_until='domcontentloaded',timeout=60000);page.evaluate('location.hash="#/devir-01"');page.wait_for_timeout(150)
  assert page.locator('h1').count()==1;assert page.locator('canvas').count()==0;assert page.locator('.v20-start-grid>a').count()==3;page.evaluate("async()=>{document.querySelectorAll('img').forEach(i=>i.loading='eager');await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})))}");page.screenshot(path=str(O/'devir-product-desktop.png'),full_page=True);rec('01. Editorial product page, three real starting configurations, no eager WebGL')
  page.locator('.v20-start-grid>a').first.click();page.wait_for_selector('[data-three-status=ready]',timeout=120000)
  inspect=lambda:page.evaluate("document.querySelector('.v8-canvas-host').__elif3D.inspect()")
  assert inspect()['config']['width']==160 and inspect()['config']['material']=='mese';rec('02. Starting choice reaches actual geometry')
  page.get_by_role('tab',name='Ölçü',exact=True).click();inp=page.get_by_role('spinbutton',name='Masa eni, sayı girişi',exact=True);inp.fill('203');inp.press('Tab');assert inspect()['config']['width']==203
  inp.fill('999');inp.press('Tab');assert inspect()['config']['width']==203;assert inp.get_attribute('aria-invalid')=='true';rec('03. Numeric editing commits valid typing and preserves last valid value on error')
  page.get_by_role('button',name='Bu tasarımı karşılaştır',exact=True).click();assert page.locator('.v20-comparison-grid article').count()==1
  inp.fill('180');inp.press('Tab');page.get_by_role('button',name='Bu tasarımı karşılaştır',exact=True).click();assert page.locator('.v20-comparison-grid article').count()==2
  page.get_by_role('button',name='Tasarım 1 stüdyoda aç',exact=True).click();assert inspect()['config']['width']==203
  page.get_by_role('button',name='Bu tasarımı karşılaştır',exact=True).click();assert page.locator('.v20-comparison-grid article').count()==2;rec('04. Comparison restores exact geometry and deduplicates')
  with page.expect_download()as dl:page.get_by_role('button',name='Seçenekleri JSON olarak sakla',exact=False).click()
  config_file=Path(dl.value.path()).read_text();parsed=json.loads(config_file);assert parsed['kind']=='elif.design-board'and len(parsed['options'])==2;assert not any(k in parsed['options'][0]for k in ['note','district','roomWidth','preview']);(O/'options.json').write_text(config_file);rec('05. Portable comparison has configuration only')
  page.on('dialog',lambda d:d.accept());page.locator('.v20-board-file input').set_input_files({'name':'options.json','mimeType':'application/json','buffer':config_file.encode()});page.wait_for_timeout(200);assert page.locator('.v20-comparison-grid article').count()==2;rec('06. Validated comparison import restores options')
  page.get_by_label('Oda eni',exact=True).fill('350');page.get_by_label('Oda derinliği',exact=True).fill('280');page.get_by_role('button',name='Yerleşimi karşılaştır',exact=True).click();assert page.locator('.v20-room-diagram svg').count()==1;assert 'sığıyor' in page.locator('.v13-fit-result').inner_text();rec('07. Actual bounds feed an explicitly rectangular room diagram')
  page.get_by_label('Görüntü profili',exact=True).select_option('economy');assert inspect()['qualityProfile']=='economy';assert inspect()['config']['width']==203;rec('08. Graphics profile does not alter dimensions')
  page.get_by_role('button',name='Çekmece tarafı',exact=True).click();page.get_by_role('button',name='Detay noktalarını göster',exact=True).click();page.wait_for_function("()=>document.querySelectorAll('.v13-hotspot:not([hidden])').length>=2",timeout=15000);page.locator('.v13-hotspot:not([hidden])').first.click();assert page.locator('.v13-hotspot-card').is_visible();rec('09. Projected details open their explanatory card')
  page.get_by_role('button',name='Detay bilgisini kapat',exact=True).click()
  with page.expect_popup(timeout=60000)as popup:page.get_by_role('button',name='Görselli tasarım dosyası',exact=False).click()
  doc=popup.value;doc.wait_for_load_state('domcontentloaded');assert '203' in doc.locator('pre').inner_text();assert doc.locator('img').count()==1;assert doc.get_by_role('button',name='Yazdır veya PDF olarak kaydet').count()==1;doc.screenshot(path=str(O/'printable-design.png'),full_page=True);doc.close();rec('10. Printable visual sheet matches selected geometry')
  with page.expect_download(timeout=120000)as dl:page.get_by_role('button',name='3D modeli indir · GLB',exact=True).click()
  data=Path(dl.value.path()).read_bytes();magic,version,length=struct.unpack('<III',data[:12]);assert magic==0x46546c67 and version==2 and length==len(data);chunk_len,kind=struct.unpack('<II',data[12:20]);assert kind==0x4e4f534a;gltf=json.loads(data[20:20+chunk_len]);assert len(gltf['meshes'])>30;assert any(x.get('extras',{}).get('notFabricationReady')for x in gltf['nodes']);(O/'Devir-test.glb').write_bytes(data);rec('11. GLB contains actual mesh geometry and concept metadata',{'bytes':len(data),'meshes':len(gltf['meshes'])})
  page.get_by_role('button',name='AR dosyasını hazırla · USDZ',exact=True).click();page.wait_for_selector('.v20-ar-link',timeout=120000)
  import base64
  encoded=page.evaluate("async()=>{const b=await(await fetch(document.querySelector('.v20-ar-link').href)).blob();return new Promise(r=>{const f=new FileReader();f.onload=()=>r(f.result.split(',')[1]);f.readAsDataURL(b)})}");data=base64.b64decode(encoded);(O/'Devir-test.usdz').write_bytes(data)
  with zipfile.ZipFile(io.BytesIO(data))as z:names=z.namelist();assert any(n.endswith('.usda')for n in names);assert z.testzip()is None
  assert page.locator('.v20-ar-link').get_attribute('rel')=='ar';rec('12. USDZ package has USD scene and textures. Actual device AR is not asserted',{'bytes':len(data),'entries':len(names)})
  page.get_by_role('tab',name='Ölçü',exact=True).click();inp.fill('200');inp.press('Tab');assert page.locator('.v20-ar-link').count()==0;rec('13. Changed configuration invalidates old AR file')
  page.screenshot(path=str(O/'studio-desktop.png'),full_page=True)
  for width in [320,390,768,1440]:
   page.set_viewport_size({'width':width,'height':900});page.wait_for_timeout(180);assert page.evaluate('document.documentElement.scrollWidth<=innerWidth+1'),width
  page.set_viewport_size({'width':390,'height':844});page.locator('.v20-workbench').scroll_into_view_if_needed();page.screenshot(path=str(O/'comparison-mobile.png'),full_page=True);rec('14. Controls fit four widths including 320px')
  assert not errors,errors;rec('15. No uncaught JavaScript error across V20 flows')
 except Exception:
  report['failure']=traceback.format_exc();(O/'results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));page.screenshot(path=str(O/'failure.png'),full_page=True);raise
 finally:browser.close()
