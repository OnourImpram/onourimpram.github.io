"""Capture the actual V9 Three.js scene. These files are concept renders, not workshop photographs."""
from pathlib import Path
from playwright.sync_api import sync_playwright
from PIL import Image
import base64,json,io
R=Path(__file__).resolve().parents[2];O=R/'evidence/v9/posters';O.mkdir(parents=True,exist_ok=True)
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',headless=False,args=['--no-sandbox','--disable-dev-shm-usage','--use-angle=swiftshader','--enable-unsafe-swiftshader'])
 page=b.new_page(viewport={'width':1440,'height':1080});page.emulate_media(reduced_motion='reduce')
 page.set_content((R/'preview/Elif_Tasarim.html').read_text(),wait_until='load');page.evaluate('location.hash="#/tasarim-masasi"');page.wait_for_selector('[data-three-status="ready"]',timeout=35000);page.wait_for_timeout(500)
 def config(**kw):page.evaluate('''patch=>{const a=document.querySelector('.v8-canvas-host').__elif3D;a.update({...a.inspect().config,...patch})}''',kw)
 def view(name):page.evaluate("(v)=>document.querySelector('.v8-canvas-host').__elif3D.setView(v)",name)
 def save(name):
  raw=base64.b64decode(page.evaluate("document.querySelector('.v8-canvas-host').__elif3D.snapshot(1920,1280)").split(',')[1]);(O/(name+'.png')).write_bytes(raw);Image.open(io.BytesIO(raw)).convert('RGB').save(R/'public/assets'/(name+'.webp'),quality=93,method=6);print(name,flush=True)
 save('atelier-poster-v9')
 page.evaluate("document.querySelector('.v8-canvas-host').__elif3D.light('evening')");config(shelfLight=100);save('atelier-evening-v9')
 page.evaluate("document.querySelector('.v8-canvas-host').__elif3D.light('day')");config(room='product',shelfLight=65);view('perspective');save('devir-poster');save('office-v8')
 config(height=115);save('devir-standing')
 config(drawers=True,door=True,angle=90);view('detail');save('devir-detail');save('joinery-v8')
 view('top');save('devir-top')
 (O/'source.json').write_text(json.dumps({'type':'actual Three.js concept render','dimensions':[1920,1280],'real_workshop_photograph':False,'renderer':page.evaluate("document.querySelector('.v8-canvas-host').__elif3D.inspect()")},indent=2));b.close()
