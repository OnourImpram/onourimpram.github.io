"""Render the repository's own corrected concept scene. No external page is opened."""
from pathlib import Path
from playwright.sync_api import sync_playwright
from PIL import Image
import base64,io,json
ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'evidence/v12/posters'
OUT.mkdir(parents=True,exist_ok=True)
SHOTS=[('devir-poster.webp','product','perspective',80,'day'),('devir-standing.webp','product','perspective',113,'day'),('devir-detail.webp','product','detail',80,'day'),('devir-top.webp','product','top',80,'day'),('atelier-poster-v9.webp','atelier','perspective',80,'day'),('atelier-evening-v9.webp','atelier','perspective',80,'evening')]
with sync_playwright() as p:
 browser=p.chromium.launch(headless=False,chromium_sandbox=True)
 page=browser.new_page(viewport={'width':1440,'height':1000})
 page.emulate_media(reduced_motion='reduce')
 page.set_content((ROOT/'preview/Elif_Tasarim.html').read_text(),wait_until='domcontentloaded',timeout=60000)
 page.evaluate('location.hash="#/tasarim-masasi"')
 page.wait_for_selector('[data-three-status="ready"]',timeout=60000)
 api="document.querySelector('.v8-canvas-host').__elif3D"
 records=[]
 for filename,room,view,height,light in SHOTS:
  page.evaluate('(c)=>{const a=document.querySelector(".v8-canvas-host").__elif3D;a.update({...a.inspect().config,...c})}',{'width':180,'depth':80,'height':height,'angle':90,'room':room,'material':'ceviz','lighting':light,'drawers':False,'door':False})
  page.evaluate(api+'.setView('+json.dumps(view)+')')
  page.wait_for_timeout(450)
  data=page.evaluate(api+'.snapshot(1920,1280)')
  assert data.startswith('data:image/png;base64,')
  image=Image.open(io.BytesIO(base64.b64decode(data.split(',')[1])))
  assert image.size==(1920,1280)
  image.save(ROOT/'public/assets'/filename,'WEBP',quality=93,method=6)
  image.save(OUT/(filename+'.png'))
  records.append({'file':filename,'width':1920,'height':1280,'source':'actual corrected Three.js geometry','view':view,'room':room,'height_cm':height})
 (ROOT/'public/assets/office-v8.webp').write_bytes((ROOT/'public/assets/devir-poster.webp').read_bytes())
 (OUT/'manifest.json').write_text(json.dumps(records,indent=2))
 browser.close()
