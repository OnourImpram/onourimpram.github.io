from pathlib import Path
from playwright.sync_api import sync_playwright
import json,hashlib
R=Path(__file__).resolve().parents[2];html=(R/'preview/Elif_Tasarim.html').read_text();d={'html_sha256':hashlib.sha256(html.encode()).hexdigest(),'manifest_sha256':hashlib.sha256((R/'dist/release-v9.json').read_bytes()).hexdigest(),'published':False}
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',headless=False,args=['--no-sandbox','--disable-dev-shm-usage','--use-angle=swiftshader','--enable-unsafe-swiftshader'])
 page=b.new_page(viewport={'width':1440,'height':1080});page.emulate_media(reduced_motion='no-preference');errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
 page.set_content(html,wait_until='load');page.evaluate('location.hash="#/tasarim-masasi"');page.wait_for_selector('[data-three-status="ready"]',timeout=35000)
 d['before']=page.evaluate("document.querySelector('.v8-canvas-host').__elif3D.inspect().geometry")
 page.evaluate("{const a=document.querySelector('.v8-canvas-host').__elif3D;a.update({...a.inspect().config,height:113,angle:180,drawers:true,door:true});}")
 page.wait_for_function("document.querySelector('.v8-canvas-host').__elif3D.inspect().geometry.mainTopY>1.128",timeout=15000)
 d['after']=page.evaluate("document.querySelector('.v8-canvas-host').__elif3D.inspect()");d['room']=page.evaluate("document.querySelector('.v8-canvas-host').__elif3D.roomStats()");d['errors']=errors
 assert d['after']['geometry']['mainTopY']>1.128 and d['before']['mainTopY']==.8 and d['room']['visibleBookcases']==2 and not errors
 d['normal_motion_pass']=True;d['browser']=b.version;(R/'evidence/v9/final-smoke.json').write_text(json.dumps(d,ensure_ascii=False,indent=2));b.close()
print('Verified final HTML, native Three.js and normal-motion transition.')
