"""V13 final decision-support browser checks. No message is sent."""
from pathlib import Path
from playwright.sync_api import sync_playwright
import os,json,traceback
R=Path(__file__).resolve().parents[2]
BASE=os.environ.get('BASE_URL','').rstrip('/')+'/' if os.environ.get('BASE_URL') else ''
OUT=Path(os.environ.get('EVIDENCE_DIR',str(R/'evidence/v13/acceptance')));OUT.mkdir(parents=True,exist_ok=True)
report={'base':BASE or 'local mounted V13','checks':[],'limits':['Chromium software WebGL','No WhatsApp message sent','Room fit is visual planning, not engineering']}
def rec(name,detail=None):
 report['checks'].append({'name':name,'pass':True,'detail':detail});(OUT/'results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));print('PASS',name,flush=True)
with sync_playwright() as p:
 exe=os.environ.get('CHROMIUM_PATH','/usr/bin/chromium');b=p.chromium.launch(executable_path=exe if Path(exe).exists() else None,headless=True,args=['--no-sandbox','--disable-dev-shm-usage','--use-gl=angle','--use-angle=swiftshader'])
 page=b.new_page(viewport={'width':1440,'height':1000});errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
 try:
  if BASE:
   page.goto(BASE+'tasarim-masasi/',wait_until='domcontentloaded',timeout=60000)
  else:
   page.set_content((R/'preview/Elif_Tasarim.html').read_text(),wait_until='domcontentloaded',timeout=60000);page.evaluate('()=>location.hash="#/tasarim-masasi"')
  page.wait_for_selector('[data-three-status="ready"]',timeout=60000)
  assert page.locator('.preview-bar').inner_text().startswith('V13 FINAL');rec('01. V13 release identity is visible')
  page.get_by_role('button',name='Detay noktalarını göster',exact=True).click()
  page.wait_for_function("()=>[...document.querySelectorAll('.v13-hotspot')].filter(x=>!x.hidden&&getComputedStyle(x).display!=='none').length>=2",timeout=8000)
  visible=page.locator('.v13-hotspot:visible').count();assert visible>=2,visible;rec('02. Projected 3D detail hotspots are visible',{'visible':visible})
  page.locator('.v13-hotspot:visible').first.click();page.wait_for_selector('.v13-hotspot-card');assert page.locator('.v13-hotspot-card').is_visible();rec('03. Hotspot opens a decision-oriented detail card')
  page.get_by_label('Oda eni').fill('320');page.get_by_label('Oda derinliği').fill('260');page.get_by_role('button',name='Yerleşimi karşılaştır',exact=True).click();page.wait_for_selector('.v13-fit-result');txt=page.locator('.v13-fit-result').inner_text();assert 'sığıyor' in txt;rec('04. Room fit helper reports a fitting visual layout',txt)
  page.get_by_label('Oda eni').fill('120');page.get_by_label('Oda derinliği').fill('100');page.get_by_role('button',name='Yerleşimi karşılaştır',exact=True).click();page.wait_for_timeout(120);txt=page.locator('.v13-fit-result').inner_text();assert 'aşıyor' in txt and 'ek alan gerekir' in txt;rec('05. Room fit helper reports a shortfall without negative-clearance wording',txt)
  assert page.locator('.v13-devir-guide').is_visible();assert 'motor' in page.locator('.v13-devir-guide').inner_text().lower();rec('06. Devir decision guide preserves engineering caveats')
  page.set_viewport_size({'width':390,'height':844});page.wait_for_timeout(160);assert page.evaluate('document.documentElement.scrollWidth<=innerWidth+1');page.screenshot(path=str(OUT/'mobile-390.png'),full_page=True);rec('07. New final controls do not introduce horizontal overflow at 390px')
  assert not errors,errors;rec('08. No uncaught JavaScript errors in V13 checks')
 except Exception:
  report['failure']=traceback.format_exc();(OUT/'results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));page.screenshot(path=str(OUT/'failure.png'),full_page=True);raise
 finally:b.close()
