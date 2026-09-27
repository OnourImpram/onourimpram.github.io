"""V22 customer handoff on real HTTP. Synthetic browser context, no external message sent."""
from pathlib import Path
from playwright.sync_api import sync_playwright
from urllib.parse import urlparse,parse_qs
import os,json,traceback
R=Path(__file__).resolve().parents[2]
BASE=os.environ.get('BASE_URL','http://127.0.0.1:8000/elif-tasarim/').rstrip('/')+'/'
O=Path(os.environ.get('EVIDENCE_DIR',str(R/'evidence/v22/acceptance')));O.mkdir(parents=True,exist_ok=True)
EMAIL='iletisim.eliftasarimatolyesi@gmail.com'
report={'base':BASE,'checks':[],'limits':['Synthetic Chromium browser','No email, phone call or message sent','Clipboard permission behavior is deliberately simulated in an isolated test','No real-device or full WCAG certification']}
def rec(name,details=None):
 report['checks'].append({'name':name,'pass':True,'details':details});(O/'results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));print('PASS '+name,flush=True)
with sync_playwright() as p:
 exe=os.environ.get('CHROMIUM_PATH','/usr/bin/chromium');b=p.chromium.launch(executable_path=exe if Path(exe).exists() else None,headless=True,args=['--no-sandbox','--disable-dev-shm-usage','--use-gl=angle','--use-angle=swiftshader'])
 ctx=b.new_context(viewport={'width':1440,'height':1000});page=ctx.new_page();page.set_default_timeout(15000);errors=[];external=[]
 page.on('pageerror',lambda e:errors.append(str(e)))
 page.on('request',lambda r:external.append(r.url) if r.url.startswith(('http:','https:')) and not r.url.startswith(BASE) else None)
 def visit(route):
  page.goto(BASE+route.strip('/')+'/',wait_until='domcontentloaded',timeout=60000);page.wait_for_selector('#app .preview-bar')
 def nav(route):
  page.evaluate('(r)=>location.hash="#"+r',route);page.wait_for_timeout(180)
 def capture(name,full=True):
  page.evaluate("async()=>{document.querySelectorAll('img').forEach(i=>i.loading='eager');await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})))}")
  page.screenshot(path=str(O/name),full_page=full)
 try:
  visit('iletisim')
  assert page.locator('.preview-bar').inner_text().startswith('V22')
  email=page.locator('.v7-contact-main a.v22-visible-email');assert email.inner_text()==EMAIL and email.get_attribute('href')=='mailto:'+EMAIL
  assert page.locator('.v22-footer-email').inner_text()==EMAIL
  schema=json.loads(page.locator('script[type="application/ld+json"]').text_content());assert schema['publisher']['email']==EMAIL and schema['publisher']['@type']=='Organization' and 'address' not in schema['publisher']
  capture('contact-desktop.png');rec('01. Exact supplied email is visible, linked and included in truthful structured data')
  for width in [320,390]:
   page.set_viewport_size({'width':width,'height':844});assert page.evaluate('document.documentElement.scrollWidth<=innerWidth+1')
   capture('contact-'+str(width)+'.png')
  rec('02. Long email remains reachable without horizontal overflow at 320 and 390 pixels')
  visit('modelini-getir');page.locator('#model-note').fill('Ceviz renkli, üç çekmeceli bir çalışma masası istiyorum.')
  page.get_by_role('button',name='Ayrıntı eklemeden özeti gör',exact=True).click();page.wait_for_selector('.v22-handoff')
  summary=page.locator('#project-message-preview').inner_text()
  href=page.locator('.v21-contact-alternatives a.button[href^="mailto:"]').get_attribute('href');mail=urlparse(href)
  assert mail.path==EMAIL and parse_qs(mail.query)['body'][0]==summary
  assert page.get_by_role('button',name='Tam özeti kopyala',exact=True).is_visible()
  assert page.locator('.v7-mobile-contact').count()==0 and page.locator('.v5-backtop').count()==0
  page.locator('.v22-handoff').scroll_into_view_if_needed();capture('handoff-mobile.png',False)
  rec('03. Complete short summary is passed to the correct email recipient; no duplicate generic floating CTA covers it')
  page.evaluate("Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async text=>{window.__copiedSummary=text}}})")
  page.get_by_role('button',name='Tam özeti kopyala',exact=True).click();page.wait_for_function('()=>!!window.__copiedSummary');assert page.evaluate('window.__copiedSummary')==summary
  assert 'Kopyalandı' in page.locator('.v22-copy-status').inner_text()
  rec('04. Explicit summary copy passes exact Turkish text, never a false success before resolution')
  page.evaluate("Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async()=>{throw new DOMException('test denied','NotAllowedError')}}})")
  page.get_by_role('button',name='Tam özeti kopyala',exact=True).click();page.wait_for_selector('#v22-summary-copy')
  assert page.locator('#v22-summary-copy').input_value()==summary
  assert page.locator('#v22-summary-copy').get_attribute('readonly') is not None
  assert page.evaluate('document.activeElement.id')=='v22-summary-copy'
  box=page.locator('#v22-summary-copy').bounding_box();assert 120<=box['height']<=360
  page.locator('#v22-summary-copy').scroll_into_view_if_needed();capture('clipboard-fallback-mobile.png',False)
  rec('05. Denied clipboard permission offers selected read-only text and existing file fallback')
  page.locator('[data-whatsapp-message]').evaluate("e=>e.addEventListener('click',ev=>ev.preventDefault(),{capture:true,once:true})")
  page.locator('[data-whatsapp-message]').click();page.wait_for_selector('.v22-next-action')
  message=page.locator('.v22-next-action').inner_text();assert 'Gönder düğmesine basın' in message and 'doğrulamaz' in message and 'Talebiniz alındı' not in message
  assert page.locator('#project-message-preview').inner_text()==summary
  rec('06. Channel choice shows actionable final steps, never a fabricated delivery receipt')
  page.get_by_role('button',name='Modeli ve notumu düzenle',exact=True).click();page.locator('#model-note').fill('Yeni model için daha açık bir meşe yüzey düşünüyorum.')
  page.get_by_role('button',name='Ayrıntı eklemeden özeti gör',exact=True).click();page.wait_for_selector('.v22-handoff');assert page.locator('.v22-next-action').count()==0 and page.locator('#v22-summary-copy').count()==0
  assert 'daha açık bir meşe' in page.locator('#project-message-preview').inner_text()
  rec('07. Edited idea does not inherit a previous copy or channel-choice status')
  page.get_by_role('button',name='Modeli ve notumu düzenle',exact=True).click();page.locator('#model-note').fill(('Özel ölçü ve farklı çekmece. '*55)[:1500]);page.get_by_role('button',name='Ayrıntı eklemeden özeti gör',exact=True).click();page.wait_for_selector('.v22-handoff')
  full=page.locator('#project-message-preview').inner_text();href=page.locator('.v21-contact-alternatives a.button[href^="mailto:"]').get_attribute('href')
  assert len(href)<5000 and urlparse(href).path==EMAIL and 'ayrıntılı proje özeti' in parse_qs(urlparse(href).query)['body'][0]
  assert len(full)>1500 and page.locator('.v21-email-note').is_visible()
  rec('08. Long email uses a disclosed short introduction while full project summary remains intact')
  visit('projeler');page.locator('.v7-save-text').first.click();nav('/calisma-dosyam')
  with page.expect_download() as dl:page.get_by_role('button',name='İlham dosyamı indir',exact=True).click()
  data=json.loads(Path(dl.value.path()).read_text());assert sorted(data)==['format','ids','version'] and len(data['ids'])==1
  (O/'public-inspiration.json').write_text(json.dumps(data,ensure_ascii=False))
  nav('/projeler');page.locator('.v7-save-text').nth(1).click();nav('/calisma-dosyam');assert page.locator('.v7-result-grid article').count()==2
  payload=json.dumps(data).encode();file={'name':'inspiration.json','mimeType':'application/json','buffer':payload}
  page.get_by_label('Elif ilham dosyasını aç',exact=True).set_input_files(file);page.wait_for_selector('.v22-import-choice');assert page.locator('.v7-result-grid article').count()==2
  page.once('dialog',lambda d:d.dismiss());page.get_by_role('button',name='Mevcut seçkiyi değiştir',exact=True).click();assert page.locator('.v7-result-grid article').count()==2
  page.get_by_role('button',name='Mevcut seçimlerimle birleştir',exact=True).click();page.wait_for_function("()=>!document.querySelector('.v22-import-choice')");assert page.locator('.v7-result-grid article').count()==2
  page.get_by_label('Elif ilham dosyasını aç',exact=True).set_input_files(file);page.wait_for_selector('.v22-import-choice');page.once('dialog',lambda d:d.accept());page.get_by_role('button',name='Mevcut seçkiyi değiştir',exact=True).click();page.wait_for_function("()=>document.querySelectorAll('.v7-result-grid article').length===1")
  page.get_by_label('Elif ilham dosyasını aç',exact=True).set_input_files({'name':'invalid.json','mimeType':'application/json','buffer':b'{"format":"wrong"}'})
  page.wait_for_function("()=>document.querySelector('.v22-transfer-status')?.textContent.includes('biçiminde değil')");assert page.locator('.v7-result-grid article').count()==1
  capture('inspiration-mobile.png');rec('09. Public inspiration export, merge, explicit replacement, cancel and invalid import preserve correct choices')
  for route in ['iletisim','kolay-iletisim','calisma-dosyam']:
   visit(route);page.set_viewport_size({'width':390,'height':844})
   page.evaluate("()=>{[...document.querySelectorAll('h1,h2,h3,p,label,button,a,small,summary,span,li')].map(e=>[e,parseFloat(getComputedStyle(e).fontSize)]).forEach(([e,size])=>e.style.fontSize=size*2+'px')}")
   assert page.evaluate('document.documentElement.scrollWidth<=innerWidth+1'),(route,page.evaluate('document.documentElement.scrollWidth'))
  rec('10. Contact, no-form fallback and inspiration controls reflow at 200 percent text size')
  plain=b.new_context(java_script_enabled=False,viewport={'width':390,'height':844});q=plain.new_page();q.goto(BASE+'kolay-iletisim/',wait_until='domcontentloaded',timeout=60000)
  assert q.locator('#static-content .v22-basic-contact').is_visible() and EMAIL in q.locator('body').inner_text()
  assert q.locator('#static-content a[href^="mailto:'+EMAIL+'"]').count()>0 and q.locator('#static-content a[href="tel:+905308797169"]').count()>0
  assert q.locator('#static-content .v22-contact-template pre').is_visible()
  assert q.evaluate('document.documentElement.scrollWidth<=innerWidth+1')
  q.screenshot(path=str(O/'no-javascript-mobile.png'),full_page=True);plain.close()
  rec('11. Real HTML fallback exposes recipient, telephone and starter template with JavaScript disabled')
  assert not errors,errors;assert not external,external;rec('12. No uncaught errors and no unsolicited external communication in the tested V22 flows')
 except Exception:
  report['failure']=traceback.format_exc();report['errors']=errors;(O/'results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));page.screenshot(path=str(O/'failure.png'),full_page=True);raise
 finally:b.close()
