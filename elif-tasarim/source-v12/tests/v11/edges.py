from pathlib import Path
from playwright.sync_api import sync_playwright
import json,os
R=Path(__file__).resolve().parents[2];out=R/'evidence/v11/edges';out.mkdir(parents=True,exist_ok=True)
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox']);pg=b.new_page(viewport={'width':390,'height':844});pg.set_content((R/'preview/Elif_Tasarim.html').read_text(),timeout=60000)
 pg.evaluate("location.hash='#/modelini-getir'");pg.locator('#model-url').fill('https://example.com/reference');pg.get_by_role('button',name='Ayrıntı eklemeden özeti gör',exact=True).click();text=pg.locator('#project-message-preview').inner_text();a='Kaynak türü, Dış ilham kaynağı' in text
 pg.get_by_role('button',name='Bilgileri düzenle',exact=True).click();pg.get_by_role('button',name='Geri',exact=True).click();pg.locator('#model-note').fill('Uzun Türkçe not. '+'İğşçüö'*240);pg.get_by_role('button',name='Ayrıntı eklemeden özeti gör',exact=True).click();wide=pg.evaluate('document.documentElement.scrollWidth');pg.screenshot(path=str(out/'long-message.png'));result={'manual_source_kind':a,'long_width':wide,'viewport':390,'pass':a and wide<=391};(out/'result.json').write_text(json.dumps(result));print(result);b.close()
