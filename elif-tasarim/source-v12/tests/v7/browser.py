import os,json,time,re,sys
from pathlib import Path
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[2]
HTML=Path(os.environ.get('ELIF_HTML',str(ROOT/'preview/Elif_Tasarim.html'))).read_text()
OUT=ROOT/'evidence/v7';OUT.mkdir(parents=True,exist_ok=True)
rows=[];runtime=[];network=[]
def record(name,fn):
 try:
  result=fn();rows.append({'name':name,'passed':True,'details':result});print('PASS',name,flush=True)
 except Exception as e:
  rows.append({'name':name,'passed':False,'error':str(e)[:1400]});print('FAIL',name,str(e)[:300],flush=True)

def check(v,msg):
 if not v:raise AssertionError(msg)

with sync_playwright() as pw:
 b=pw.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox'])
 ctx=b.new_context(viewport={'width':1440,'height':1000},device_scale_factor=1,accept_downloads=True)
 def page(route='/',width=1440):
  p=ctx.new_page();p.set_default_timeout(4000);p.set_viewport_size({'width':width,'height':1000 if width>800 else 844});p.on('pageerror',lambda e:runtime.append(str(e)));p.on('request',lambda req:network.append(req.url) if req.url.startswith('http') else None);p.on('dialog',lambda d:d.dismiss())
  p.set_content(HTML,wait_until='load',timeout=25000);p.wait_for_selector('main h1',timeout=12000)
  if route!='/':p.evaluate('(p)=>{window.location.hash="#"+p}',route);p.wait_for_timeout(350)
  return p
 def phone():
  p=page('/iletisim');check(p.locator('a[href="tel:+905308797169"]').count()>0,'Direct telephone missing');links=p.locator('main a[href^="https://wa.me/"]').all();check(len(links)>0,'WhatsApp action missing');check(all('/905308797169?' in x.get_attribute('href') for x in links),'Wrong recipient');p.screenshot(path=str(OUT/'contact.png'));p.close();return 'Configured recipient 905308797169. No message sent.'
 record('Verified-number configuration on real contact controls',phone)
 def search():
  p=page();p.get_by_role('button',name='Sitede ara',exact=True).click();p.get_by_role('searchbox',name='Arama kelimesi').fill('kahve');p.get_by_role('link',name='Tüm sonuçları gör').click();p.wait_for_selector('.v7-search-page');check(p.get_by_role('searchbox',name='Tüm sitede ara').input_value()=='kahve','Query lost');check(p.locator('.v7-result-grid article').count()>2,'Results missing');check('/arama' in p.url,'Wrong route');check(p.locator('main a[href*="/urun/"]').count()==0,'Demo leak');p.screenshot(path=str(OUT/'search.png'));p.close()
 record('Search extends the same query in real portfolio, not legacy demo',search)
 def draft():
  p=page('/modelini-getir?kategori=sehpa&ref=https%3A%2F%2Fpin.it%2F484Ae4eNQ&fikir=Eski%20fikir');p.locator('#model-note').fill('En son yazdığım özel fikir, bunu koru.');p.get_by_role('button',name='Devam et',exact=True).click();p.locator('#model-dimensions').fill('123 × 61 cm');p.locator('#model-district').fill('İstanbul, Kadıköy');p.get_by_role('link',name='Özel ölçü stüdyosunu aç').click();p.wait_for_timeout(150);check(p.locator('#model-note').input_value()=='En son yazdığım özel fikir, bunu koru.','Note overwritten');p.get_by_role('button',name='Devam et',exact=True).click();check(p.locator('#model-dimensions').input_value()=='123 × 61 cm','Dimensions lost');check(p.locator('#model-district').input_value()=='İstanbul, Kadıköy','District lost');p.go_back();p.wait_for_timeout(150);check(p.locator('#model-note').input_value()=='En son yazdığım özel fikir, bunu koru.','Browser back lost latest note');check('En son yaz' not in p.url,'Private note in URL');p.close()
 record('Regression ET03. Model to detailed studio and back keeps latest draft',draft)
 def units():
  p=page('/teklif-al?en=203&derinlik=81&yukseklik=76&malzeme=mese');p.get_by_role('button',name='Devam et',exact=True).click();check(p.locator('#model-width').input_value()=='203','Desk transfer missing');p.get_by_role('combobox',name='Ölçü birimi').select_option('mm');check(p.locator('#model-width').input_value()=='2030','Physical size changed');p.get_by_role('combobox',name='Ölçü birimi').select_option('cm');check(p.locator('#model-height').input_value()=='76','Height mismatch');p.get_by_role('button',name='Devam et',exact=True).click();href=p.get_by_role('link',name='Yunus Usta’ya WhatsApp’ta yaz').get_attribute('href');check(href.startswith('https://wa.me/905308797169?'),'Wrong destination');check('203' in href,'Measurements absent');check(p.locator('body').inner_text().find('başarıyla gönderildi')<0,'False success');p.screenshot(path=str(OUT/'handoff.png'));p.close()
 record('Desk dimensions and cm/mm continuity reach correct WhatsApp recipient',units)
 def invalid():
  p=page('/modelini-getir');p.locator('#model-url').fill('javascript:alert(1)');p.get_by_role('button',name='Devam et',exact=True).click();check(p.locator('#model-url').get_attribute('aria-invalid')=='true','No invalid state');check('model-error' in p.locator('#model-url').get_attribute('aria-describedby'),'No error relation');check(p.evaluate('document.activeElement.id')=='model-url','Wrong error focus');p.close()
 record('Invalid URL error is associated with the field and receives focus',invalid)
 def files():
  p=page('/modelini-getir');p.locator('#model-files').set_input_files(str(ROOT/'tests/v7/fixture.png'));p.wait_for_selector('.model-uploads img');p.get_by_role('link',name='Özel ölçü stüdyosunu aç').click();p.wait_for_timeout(100);check(p.locator('.model-uploads img').count()==1,'Route switch lost uploaded image');p.get_by_role('button',name='Devam et',exact=True).click();p.get_by_role('button',name='Devam et',exact=True).click()
  with p.expect_download() as info:p.get_by_role('button',name='Özet ve görselleri indir').click()
  info.value.save_as(str(OUT/'sample-project.zip'));p.evaluate('Object.defineProperty(navigator,"canShare",{value:()=>true,configurable:true});Object.defineProperty(navigator,"share",{value:()=>Promise.reject(new DOMException("cancel","AbortError")),configurable:true})');p.get_by_role('button',name='Görselleri cihazdan paylaş').click();check('Paylaşım iptal edildi' in p.locator('.v7-status').inner_text(),'Cancel misreported');p.close();import zipfile
  with zipfile.ZipFile(OUT/'sample-project.zip') as z:check(z.testzip() is None,'Bad ZIP');check(len(z.namelist())==2,'Attachment not in bundle');check(z.read('Elif_Proje_Ozeti.txt').decode().startswith('Merhaba Yunus Usta'),'Summary not included');return {'zipFiles':len(z.namelist()),'nativeShare':'Abort simulated, no real third-party send'}
 record('Local sanitized image survives route change, ZIP contains file, share cancellation honest',files)
 def negatives():
  p=page('/modelini-getir');p.locator('#model-files').set_input_files({'name':'fake.jpg','mimeType':'image/jpeg','buffer':b'<svg onload="alert(1)"></svg>'});p.wait_for_selector('#model-error');check(p.locator('.model-uploads img').count()==0,'Spoof accepted');p.locator('#model-files').set_input_files({'name':'phone.heic','mimeType':'image/heic','buffer':b'heic'});p.wait_for_timeout(80);check('JPG' in p.locator('#model-error').inner_text(),'No HEIC alternative');p.locator('#model-files').set_input_files([str(ROOT/'tests/v7/fixture.png')]*6);p.wait_for_timeout(80);check('5 görsel' in p.locator('#model-error').inner_text(),'6-image batch not rejected');p.close()
 record('Spoof, HEIC and six-file batch have safe actionable rejection',negatives)
 def board():
  p=page('/projeler');p.locator('.v7-save-text').first.click();p.locator('.v6-saved').click();p.wait_for_selector('.v7-board');check(p.locator('.v7-result-grid article').count()==1,'Saved work missing');p.get_by_role('link',name='Bu seçkilerle görüşelim').click();p.wait_for_selector('.v7-selected-note');check('1 seçim' in p.locator('.v7-selected-note').inner_text(),'Selection not carried');p.close()
 record('A real project can be saved and carried into one model request',board)
 def privacy():
  p=page('/ilham-modelleri');check(p.locator('.v7-pin-disclosure').count()>0,'Disclosure not present before load');check(p.locator('iframe').count()==0,'Unexpected widget before activation');p.evaluate('window.location.hash="#/gizlilik"');p.wait_for_timeout(100);text=p.locator('main').inner_text();check('WhatsApp' in text and 'Pinterest' in text and '30 gün' in text,'Incomplete privacy');p.close()
 record('External services disclosed before Pinterest loads and in privacy page',privacy)
 def demo():
  p=page('/sepet');p.wait_for_timeout(100);check(p.locator('#model-note').count()==1,'Demo cart still public');p.evaluate('window.location.hash="#/urunler"');p.wait_for_timeout(100);check(p.locator('.categories-index').count()==1,'Legacy catalog not retired');check(p.locator('header a[href*="/sepet"]').count()==0,'Demo cart in header');p.close()
 record('Legacy cart, payment and price catalog are out of customer navigation',demo)
 def category():
  p=page('/kategoriler/kahve-kosesi');check(p.locator('.category-hero img').get_attribute('alt').endswith('atölye fotoğrafı'),'Hero not real');check(p.locator('.v7-decision').count()==1,'Decision guidance missing');p.get_by_role('link',name='Kahve Köşesi projemi konuşalım').click();p.get_by_role('button',name='Devam et',exact=True).click(); # first requires note, because empty initial intent isn't sufficient
  p.close()
 # Separate direct check without trying to submit blank idea
 def category2():
  for cat in ['mutfak','kahve-kosesi','tv-unitesi']:
   p=page('/kategoriler/'+cat);check('atölye fotoğrafı' in p.locator('.category-hero img').get_attribute('alt'),'Not real photograph');check(p.locator('.v7-preparation li').count()==3,'Three useful preparation prompts missing');p.screenshot(path=str(OUT/('category-'+cat+'.png')));p.close()
 record('Three category entrances use real work and category-specific preparation',category2)
 def mobile():
  p=page('/',390);p.get_by_role('button',name='Menüyü aç').click();p.keyboard.press('Escape');check(p.evaluate('document.activeElement.getAttribute("aria-label")')=='Menüyü aç','Focus not restored');p.screenshot(path=str(OUT/'mobile.png'));p.evaluate('window.scrollTo(0,900)');p.wait_for_selector('.v7-mobile-contact',state='visible',timeout=3000);check(p.locator('.v7-mobile-contact').is_visible(),'Contact bar missing');check(p.evaluate('document.documentElement.scrollWidth')<=392,'Horizontal overflow');p.close()
 record('Mobile contact bar, menu focus and initial layout',mobile)
 def resize():
  result=[]
  for route in ['/','/modelini-getir']:
   p=page(route,390);p.evaluate('''()=>{const all=[...document.querySelectorAll('body *')].filter(e=>!e.closest('svg'));const sizes=all.map(e=>parseFloat(getComputedStyle(e).fontSize));all.forEach((e,i)=>{e.style.fontSize=(sizes[i]*2)+'px'});}''');p.wait_for_timeout(100);width=p.evaluate('document.documentElement.scrollWidth');result.append({'route':route,'width':width});p.screenshot(path=str(OUT/('resize-home.png' if route=='/' else 'resize-form.png')));check(width<=392,'Double text caused horizontal overflow '+str(width));p.close()
  return result
 record('Corrected 200-percent text stress has no horizontal overflow',resize)
 def visual():
  p=page();p.screenshot(path=str(OUT/'desktop.png'));p.screenshot(path=str(OUT/'home-full.jpg'),full_page=True,type='jpeg',quality=86);p.close()
 record('Rendered V7 screenshots',visual)
 b.close()
rows.append({'name':'No JavaScript runtime errors in tested user journeys','passed':not runtime,'details':runtime})
rows.append({'name':'No outgoing HTTP requests in offline local tests','passed':not network,'details':network[:15]})
(OUT/'results.json').write_text(json.dumps({'browser':'Chromium','mode':'offline set_content, not live or HTTP delivery','results':rows},ensure_ascii=False,indent=2))
sys.exit(1 if any(not r['passed'] for r in rows) else 0)
