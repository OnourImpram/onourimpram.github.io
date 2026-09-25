from pathlib import Path
from playwright.sync_api import sync_playwright
import json,os
R=Path(__file__).resolve().parents[2];out=R/'evidence/v11/smoke';out.mkdir(parents=True,exist_ok=True)
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',headless=False,args=['--no-sandbox','--disable-dev-shm-usage','--use-angle=swiftshader','--enable-unsafe-swiftshader'])
 page=b.new_page(viewport={'width':1440,'height':1000});page.set_default_timeout(15000);page.emulate_media(reduced_motion='reduce');errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
 page.set_content((R/'preview/Elif_Tasarim.html').read_text(),timeout=60000);page.wait_for_timeout(250)
 page.screenshot(path=str(out/'home.png'));print(page.locator('.preview-bar').inner_text(),flush=True)
 page.evaluate("location.hash='#/tasarim-masasi'");page.wait_for_selector('[data-three-status=ready]',timeout=60000)
 page.screenshot(path=str(out/'studio.png'));print('studio ready',flush=True)
 for w,h in [(390,844),(320,568)]:
  page.set_viewport_size({'width':w,'height':h});page.wait_for_timeout(250);page.evaluate('scrollTo(0,0)');page.wait_for_timeout(100)
  page.screenshot(path=str(out/f'mobile-{w}.png'));print(w,page.get_by_role('slider',name='Çalışma yüksekliği',exact=True).bounding_box(),page.locator('.v8-canvas-wrap').bounding_box(),flush=True)
 page.evaluate("location.hash='#/modelini-getir'");page.wait_for_timeout(250);page.screenshot(path=str(out/'form.png'))
 print('ERRORS',errors,flush=True);(out/'errors.json').write_text(json.dumps(errors));b.close()
