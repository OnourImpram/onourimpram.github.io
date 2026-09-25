from pathlib import Path
import json
from playwright.sync_api import sync_playwright
r=Path(__file__).resolve().parents[2]
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox','--disable-dev-shm-usage'])
 page=b.new_page();page.set_content((r/'preview/Elif_Tasarim.html').read_text(),wait_until='domcontentloaded',timeout=60000)
 page.evaluate('location.hash="#/modelini-getir?en=180&derinlik=80&yukseklik=90&malzeme=mese"');page.wait_for_timeout(200)
 page.get_by_role('button',name='Devam et',exact=True).click()
 data=page.locator('select').evaluate_all('(xs)=>xs.map(x=>({label:x.parentElement.textContent,value:x.value,index:x.selectedIndex,html:x.outerHTML}))')
 print(json.dumps(data,ensure_ascii=False,indent=2));(r/'evidence/v10/select-details.json').write_text(json.dumps(data,ensure_ascii=False,indent=2))
 page.get_by_role('button',name='Devam et',exact=True).click()
 print('MESSAGE',page.locator('main a[href^="https://wa.me/"]').get_attribute('href'))
 b.close()
