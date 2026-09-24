import os,json,hashlib,time,sys
from pathlib import Path
from playwright.sync_api import sync_playwright
BASE=os.environ.get('BASE_URL','http://127.0.0.1:8080/elif-tasarim/').rstrip('/')+'/'
ROOT=Path('elif-tasarim'); OUT=Path(os.environ.get('EVIDENCE_DIR','elif-v7-release/evidence')); OUT.mkdir(parents=True,exist_ok=True)
M=json.loads((ROOT/'release-v7.json').read_text()); rows=[];errors=[];external=[];checks=[]
def sha(data):return hashlib.sha256(data).hexdigest()
def check(value,message):
 if not value:raise AssertionError(message)
def record(name,fn):
 try:
  detail=fn();checks.append({'name':name,'passed':True,'details':detail});print('PASS',name,flush=True)
 except Exception as e:
  checks.append({'name':name,'passed':False,'error':str(e)[:1600]});print('FAIL',name,str(e)[:300],flush=True)
with sync_playwright() as pw:
 browser=pw.chromium.launch(headless=True)
 context=browser.new_context(viewport={'width':1440,'height':1000},accept_downloads=True)
 context.set_default_timeout(10000)
 def opened(route='/',width=1440):
  p=context.new_page();p.set_viewport_size({'width':width,'height':1000 if width>800 else 844})
  p.on('pageerror',lambda e:errors.append(str(e)))
  p.on('request',lambda r:external.append(r.url) if r.url.startswith('http') and not r.url.startswith(BASE) else None)
  p.on('dialog',lambda d:d.dismiss())
  url=BASE+(route.lstrip('/') if route.startswith('/#') else (route.strip('/')+'/' if route!='/' else ''))
  response=p.goto(url,wait_until='load',timeout=35000)
  check(response.status==200,'Page HTTP '+str(response.status)+' '+url)
  p.wait_for_selector('html[data-app-ready="true"]',state='attached')
  p.wait_for_selector('main h1')
  return p
 def integrity():
  for name,meta in M['files'].items():
   # Infrastructure dotfiles need not be publicly served by Pages.
   if name.startswith('.'):continue
   r=context.request.get(BASE+name,timeout=30000)
   data=r.body();ok=r.status==200 and len(data)==meta['bytes'] and sha(data)==meta['sha256']
   rows.append({'path':name,'status':r.status,'bytes':len(data),'sha256':sha(data),'matches':ok})
   check(ok,'Published file differs '+name)
  r=context.request.get(BASE+'release-v7.json');check(r.status==200 and r.body()==(ROOT/'release-v7.json').read_bytes(),'Manifest mismatch')
  return {'public_files_matched':len(rows),'manifest_matched':True}
 record('All publicly served V7 files match the approved release',integrity)
 def pages():
  matrix=[]
  for width in [390,1440]:
   for route in M['routes']:
    p=opened(route,width);p.wait_for_timeout(50)
    count=p.locator('main h1').count();scroll=p.evaluate('document.documentElement.scrollWidth')
    bad=p.evaluate('Array.from(document.images).filter(i=>i.complete && i.naturalWidth===0 && i.currentSrc).map(i=>i.currentSrc)')
    check(count==1,'H1 '+route);check(scroll<=width+2,'Overflow '+route+' '+str(scroll));check(not bad,'Broken image '+route)
    matrix.append({'route':route,'width':width,'h1':count,'scrollWidth':scroll,'brokenImages':bad});p.close()
  (OUT/'routes.json').write_text(json.dumps(matrix,ensure_ascii=False,indent=2));return len(matrix)
 record('43 direct page routes at mobile and desktop widths',pages)
 def contact():
  p=opened('/iletisim');check(p.locator('a[href="tel:+905308797169"]').count()>0,'Telephone missing')
  links=p.locator('main a[href^="https://wa.me/"]').all();check(bool(links),'WhatsApp missing')
  check(all('/905308797169?' in a.get_attribute('href') for a in links),'Wrong WhatsApp recipient')
  p.screenshot(path=str(OUT/'contact.png'));p.close();return 'Recipient checked. No message sent.'
 record('Phone and WhatsApp point to Yusuf Usta',contact)
 def search():
  p=opened();p.get_by_role('button',name='Sitede ara',exact=True).click();p.get_by_role('searchbox',name='Arama kelimesi').fill('kahve')
  p.get_by_role('link',name='Tüm sonuçları gör',exact=True).click();p.wait_for_selector('.v7-search-page')
  check(p.get_by_role('searchbox',name='Tüm sitede ara').input_value()=='kahve','Query lost')
  check(p.locator('.v7-result-grid article').count()>2,'Results missing');check('/arama' in p.url,'Wrong destination');p.close()
 record('Search preserves query and stays in the real portfolio',search)
 def draft():
  p=opened('/modelini-getir');p.locator('#model-note').fill('Yayın testi. Son yazılan proje fikri.')
  p.get_by_role('button',name='Devam et',exact=True).click();p.locator('#model-dimensions').fill('123 × 61 cm');p.locator('#model-district').fill('İstanbul, Kadıköy')
  p.get_by_role('link',name='Özel ölçü stüdyosunu aç').click();p.wait_for_selector('#model-note')
  check(p.locator('#model-note').input_value()=='Yayın testi. Son yazılan proje fikri.','Draft note lost')
  p.get_by_role('button',name='Devam et',exact=True).click();check(p.locator('#model-dimensions').input_value()=='123 × 61 cm','Dimensions lost');check(p.locator('#model-district').input_value()=='İstanbul, Kadıköy','District lost')
  p.go_back();p.wait_for_selector('#model-note');check(p.locator('#model-note').input_value()=='Yayın testi. Son yazılan proje fikri.','Back lost draft');check('Kad' not in p.url,'Private text in URL');p.close()
 record('Shared draft survives form changes and browser back',draft)
 def handoff():
  p=opened('/teklif-al');p.locator('#model-note').fill('Masa için yayın doğrulama denemesi.')
  p.get_by_role('button',name='Devam et',exact=True).click();p.get_by_role('button',name='Devam et',exact=True).click()
  a=p.get_by_role('link',name='Yusuf Usta’ya WhatsApp’ta yaz');check(a.get_attribute('href').startswith('https://wa.me/905308797169?'),'Summary recipient missing')
  check('başarıyla gönderildi' not in p.locator('body').inner_text(),'False delivery claim');p.close();return 'URL only checked, WhatsApp not opened.'
 record('Prepared summary addresses correct recipient without claiming delivery',handoff)
 def mobile():
  p=opened('/',390);p.get_by_role('button',name='Menüyü aç',exact=True).click();p.keyboard.press('Escape');check(p.evaluate('document.activeElement.getAttribute("aria-label")')=='Menüyü aç','Menu focus not restored')
  p.screenshot(path=str(OUT/'mobile.png'));p.evaluate('window.scrollTo(0,900)');p.wait_for_selector('.v7-mobile-contact',state='visible');check(p.locator('.v7-mobile-contact a[href="tel:+905308797169"]').count()==1,'Mobile call target');p.close()
 record('Mobile menu focus and fixed real contact controls',mobile)
 def privacy():
  p=opened('/ilham-modelleri');check(p.locator('.v7-pin-disclosure').count()>0,'Missing external-service notice');check(p.locator('iframe').count()==0,'Pinterest loaded without activation');p.close()
  p=opened('/gizlilik');t=p.locator('main').inner_text();check('WhatsApp' in t and 'Pinterest' in t,'Privacy text incomplete');p.close()
 record('External-service information is visible before widget activation',privacy)
 def oldlinks():
  p=opened('/#/sepet');p.wait_for_selector('#model-note');p.close()
  p=opened('/#/urunler');p.wait_for_selector('.categories-index');p.close()
 record('Old hash links no longer expose demo commerce',oldlinks)
 def screenshots():
  p=opened();p.screenshot(path=str(OUT/'desktop.png'));p.screenshot(path=str(OUT/'home-full.jpg'),full_page=True,type='jpeg',quality=86);p.close()
 record('Screenshots captured from actual HTTP site',screenshots)
 version=browser.version;browser.close()
checks.append({'name':'No JavaScript runtime errors','passed':not errors,'details':errors})
checks.append({'name':'No unrequested external services or messages','passed':not external,'details':external[:20]})
report={'base_url':BASE,'release':M['release'],'browser':version,'files':rows,'checks':checks,'message_sent':False,'preview_noindex':True}
(OUT/'report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
print(json.dumps({'base_url':BASE,'passed':sum(x['passed'] for x in checks),'failed':sum(not x['passed'] for x in checks),'matched_files':len(rows)},ensure_ascii=False),flush=True)
sys.exit(0 if all(x['passed'] for x in checks) else 1)
