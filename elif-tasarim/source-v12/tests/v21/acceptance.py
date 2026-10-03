"""Report-driven V21 HTTP tests. Own transient browser profile, no external messages."""
from pathlib import Path
from playwright.sync_api import sync_playwright
from urllib.parse import urlparse,parse_qs
import os,json,traceback
ROOT=Path(__file__).resolve().parents[2]
BASE=os.environ.get('BASE_URL','http://127.0.0.1:8000/elif-tasarim/').rstrip('/')+'/'
OUT=Path(os.environ.get('EVIDENCE_DIR',str(ROOT/'evidence/v21/acceptance')));OUT.mkdir(parents=True,exist_ok=True)
KEY='elif-v21:project-recovery'
report={'base':BASE,'checks':[],'limits':['Chromium only','No real message, email or SMS sent','Isolated synthetic browser data','No real device, screen reader or performance certification']}
def rec(name,detail=None):
 report['checks'].append({'name':name,'pass':True,'detail':detail});(OUT/'results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));print('PASS '+name,flush=True)
with sync_playwright() as pw:
 exe=os.environ.get('CHROMIUM_PATH','/usr/bin/chromium')
 browser=pw.chromium.launch(executable_path=exe if Path(exe).exists() else None,headless=True,args=['--no-sandbox','--disable-dev-shm-usage','--use-gl=angle','--use-angle=swiftshader'])
 ctx=browser.new_context(viewport={'width':1440,'height':1000});page=ctx.new_page();page.set_default_timeout(15000);errors=[];remote=[]
 page.on('pageerror',lambda e:errors.append(str(e)))
 page.on('request',lambda r:remote.append(r.url) if r.url.startswith(('https:','http:')) and not r.url.startswith(BASE) else None)
 def go(path):
  page.evaluate('(p)=>{location.hash="#"+p}',path);page.wait_for_timeout(180)
 def panel():
  if not page.locator('.v21-recovery').evaluate('(e)=>e.open'):page.locator('.v21-recovery summary').click()
 def read():return page.evaluate('(key)=>localStorage.getItem(key)',KEY)
 def yes(dialog):dialog.accept()
 def no(dialog):dialog.dismiss()
 try:
  page.goto(BASE+'hizmet-ve-teklif/',wait_until='domcontentloaded',timeout=60000)
  assert page.locator('.preview-bar').inner_text().startswith('V26')
  assert page.locator('.v21-scope-grid article').count()==6
  assert page.locator('meta[name=robots]').get_attribute('content')=='noindex,nofollow'
  terms=page.locator('.v21-guide-terms').inner_text()
  assert 'Ücretsiz keşif, kesin fiyat veya garanti süresi vaat edilmez.' in terms
  assert 'Keşif gerekliliği ve varsa ücreti.' in terms
  schema=page.locator('script[type="application/ld+json"]').text_content();assert 'Organization' in schema and 'aggregateRating' not in schema
  page.evaluate("async()=>{document.querySelectorAll('img').forEach(i=>i.loading='eager');await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})))}")
  page.screenshot(path=str(OUT/'service-guide-desktop.png'),full_page=True)
  rec('01. Six scope decisions, truthful Organization data and preview indexing retained')
  go('/sikca-sorulan-sorular');assert page.locator('.accordion details').count()>=14
  page.get_by_text('WhatsApp kullanmadan görüşebilir miyim?',exact=True).click() if page.get_by_text('WhatsApp kullanmadan görüşebilir miyim?',exact=True).count() else None
  rec('02. Existing FAQ expanded rather than duplicated')
  go('/modelini-getir');panel();assert read() is None
  consent=page.locator('.v21-save-consent input')
  assert not consent.is_checked()
  page.locator('#model-note').fill('Kurtarma kontrolü. Mutfak için üç çekmece istiyorum.')
  assert read() is None
  rect=consent.bounding_box();copy=page.locator('.v21-save-consent>span').bounding_box()
  assert rect['width']<=24 and copy['width']>200 and page.locator('.v21-recovery').bounding_box()['height']<800,(rect,copy)
  page.screenshot(path=str(OUT/'recovery-desktop.png'),full_page=True)
  rec('03. Typing does not persist a draft before explicit consent, checkbox has bounded layout')
  consent.check();page.wait_for_function('(k)=>localStorage.getItem(k)!==null',arg=KEY)
  page.locator('#model-note').fill('Kurtarma kontrolü. Bu not kayıt izninden sonra değişti.')
  page.wait_for_function('(k)=>localStorage.getItem(k).includes("sonra değişti")',arg=KEY)
  record=json.loads(read());draft=json.loads(record['file'])
  assert record['expiresAt']-record['savedAt']==7*86400000
  assert 'photos' not in draft['project'] and not draft['project']['selections']
  assert draft['project']['customerNote'].endswith('sonra değişti.')
  rec('04. Opted-in updates save bounded text/model metadata for seven days without photos')
  page.reload(wait_until='domcontentloaded');page.wait_for_selector('#model-note')
  assert page.locator('#model-note').input_value()==''
  assert page.get_by_role('button',name='Kayıtlı taslağı geri getir',exact=True).is_visible()
  page.once('dialog',no);page.get_by_role('button',name='Kayıtlı taslağı geri getir',exact=True).click();assert page.locator('#model-note').input_value()==''
  page.once('dialog',yes);page.get_by_role('button',name='Kayıtlı taslağı geri getir',exact=True).click()
  assert page.locator('#model-note').input_value().endswith('sonra değişti.')
  rec('05. Reload offers recovery, never silently replaces current work, cancel preserves it')
  with page.expect_download() as wait:page.get_by_role('button',name='Taslak dosyasını indir',exact=False).click()
  payload=Path(wait.value.path()).read_bytes();(OUT/'synthetic-project-draft.json').write_bytes(payload)
  assert json.loads(payload)['project']['customerNote'].endswith('sonra değişti.')
  page.locator('#model-note').fill('Bu yeni metin iptal edilen içe aktarımda korunmalı.')
  panel();page.once('dialog',no);page.get_by_label('Elif proje taslağı dosyasını aç',exact=True).set_input_files({'name':'saved.json','mimeType':'application/json','buffer':payload});page.wait_for_timeout(120)
  assert 'iptal edilen' in page.locator('#model-note').input_value()
  page.once('dialog',yes);page.get_by_label('Elif proje taslağı dosyasını aç',exact=True).set_input_files({'name':'saved.json','mimeType':'application/json','buffer':payload});page.wait_for_timeout(120)
  assert page.locator('#model-note').input_value().endswith('sonra değişti.')
  rec('06. Private JSON export and explicit replacement import round-trip, cancel never mutates')
  value=page.locator('#model-note').input_value();page.get_by_label('Elif proje taslağı dosyasını aç',exact=True).set_input_files({'name':'bad.json','mimeType':'application/json','buffer':b'{"format":"wrong"}'})
  page.wait_for_timeout(120);assert page.locator('#model-note').input_value()==value;assert 'biçiminde değil' in page.locator('.v21-recovery-status').inner_text()
  rec('07. Invalid import shows an actionable error and does not erase the open idea')
  panel();page.get_by_role('button',name='Cihazdaki kaydı sil',exact=True).click();assert read() is None;assert page.locator('#model-note').input_value()==value
  rec('08. Delete removes only the recovery record, not current typed work')
  page.get_by_role('button',name='Ayrıntı eklemeden özeti gör',exact=True).click();page.wait_for_selector('.v21-contact-alternatives')
  summary=page.locator('#project-message-preview').inner_text();email=page.locator('.v21-contact-alternatives a.button[href^="mailto:"]').get_attribute('href')
  assert email.startswith('mailto:iletisim.eliftasarimatolyesi@gmail.com?subject=');body=parse_qs(urlparse(email).query)['body'][0]
  assert body==summary or 'ayrıntılı proje özeti' in body
  assert page.locator('.v21-contact-alternatives a[href^="sms:"]').get_attribute('href')=='sms:+905308797169'
  assert page.locator('.v21-contact-alternatives a[href^="tel:"]').get_attribute('href')=='tel:+905308797169'
  assert 'iletisim.eliftasarimatolyesi@gmail.com' in page.locator('.v21-contact-alternatives').inner_text()
  rec('09. Phone and SMS use the supplied number, email uses the user-supplied recipient, no message sent')
  page.screenshot(path=str(OUT/'contact-alternatives.png'),full_page=True)
  go('/iletisim');assert page.locator('a[href="sms:+905308797169"]').count()>0;assert page.locator('.v21-contact-facts').count()==1
  assert 'henüz' in page.locator('.v21-contact-facts').inner_text()
  rec('10. Contact page exposes verified alternatives and marks unconfirmed office details')
  go('/arama?q=bütçe');assert page.locator('.v7-result-grid a[href*="hizmet-ve-teklif"]').count()>0
  go('/gizlilik');text=page.locator('main').inner_text() if page.locator('main').count() else page.locator('body').inner_text();assert 'yedi' in text.lower() and 'şifreli' in text.lower()
  rec('11. Guide is searchable and privacy copy distinguishes consented storage from the default')
  page.set_viewport_size({'width':390,'height':844})
  for route in ['/hizmet-ve-teklif','/iletisim','/modelini-getir']:
   go(route)
   if route=='/modelini-getir':panel()
   assert page.evaluate('document.documentElement.scrollWidth<=innerWidth+1'),route
   if route=='/modelini-getir':
    r=page.locator('.v21-save-consent input').bounding_box();txt=page.locator('.v21-save-consent>span').bounding_box();assert r['width']<=24 and txt['width']>150
   page.screenshot(path=str(OUT/(route.strip('/')+'-390.png')),full_page=True)
   page.evaluate('''()=>{[...document.querySelectorAll('h1,h2,h3,h4,p,label,button,a,small,summary,span,li')].map(e=>[e,parseFloat(getComputedStyle(e).fontSize)]).forEach(([e,size])=>{e.style.fontSize=size*2+'px';})}''')
   assert page.evaluate('document.documentElement.scrollWidth<=innerWidth+1'),('text resize',route,page.evaluate('document.documentElement.scrollWidth'))
   page.reload(wait_until='domcontentloaded');page.wait_for_timeout(150)
  rec('12. New pages and expanded recovery work at 390px, including enlarged text, no hidden overflow')
  assert not errors,errors
  # Website resources only. No analytics, messages or third-party requests are initiated by these flows.
  assert not remote,remote
  rec('13. No uncaught script errors or unsolicited remote communication in recovery/contact flows')
 except Exception:
  report['failure']=traceback.format_exc();(OUT/'results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));page.screenshot(path=str(OUT/'failure.png'),full_page=True);raise
 finally:
  ctx.close();browser.close()
