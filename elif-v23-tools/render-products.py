"""Render owned procedural model only, never use competitor photographs."""
from pathlib import Path
from playwright.sync_api import sync_playwright
from PIL import Image
import os, json, io, base64, hashlib
root=Path('elif-tasarim/source-v12');out=root/'public/assets';out.mkdir(exist_ok=True)
BASE=os.environ.get('MODEL_BASE','http://127.0.0.1:8000/elif-tasarim/').rstrip('/')+'/'
choices=[('odak',dict(width=160,depth=75,height=80,angle=0,material='mese')),('akis',dict(width=180,depth=80,height=80,angle=90,material='ceviz')),('hareket',dict(width=200,depth=85,height=110,angle=180,material='koyu')),('detay',dict(width=180,depth=80,height=90,angle=90,material='ceviz',drawers=True,door=True)),('atolye',dict(width=180,depth=80,height=80,angle=90,material='ceviz',room='atelier',shelves='both',lighting='evening'))]
records=[]
with sync_playwright() as p:
 b=p.chromium.launch(headless=True,args=['--no-sandbox','--disable-dev-shm-usage','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'])
 page=b.new_page(viewport={'width':1600,'height':1000},device_scale_factor=1,reduced_motion='reduce')
 page.goto(BASE+'tasarim-masasi/',wait_until='domcontentloaded',timeout=60000)
 page.wait_for_selector('[data-three-status="ready"]',timeout=60000)
 page.locator('.v8-canvas-host').scroll_into_view_if_needed();page.wait_for_timeout(2000)
 for name,config in choices:
  options=dict(room='product',shelves='none',lighting='day',drawers=False,door=False,**{})
  options.update(config)
  page.evaluate("opts=>{const e=document.querySelector('.v8-canvas-host').__elif3D; e.update({...e.inspect().config,...opts});e.quality('detail');e.setView('perspective')}",options)
  page.wait_for_timeout(500)
  state=page.evaluate("document.querySelector('.v8-canvas-host').__elif3D.inspect()")
  assert state['revision']=='185' and all(state['config'].get(k)==v for k,v in config.items()),state
  data=page.evaluate("document.querySelector('.v8-canvas-host').__elif3D.snapshot(1920,1280)")
  assert data.startswith('data:image/png;base64,')
  im=Image.open(io.BytesIO(base64.b64decode(data.split(',')[1]))).convert('RGB')
  # Card-only renders are smaller, the hero and editorial images stay full-size.
  if name in ['odak','akis']:im=im.resize((1200,800),Image.Resampling.LANCZOS)
  target=out/('devir-'+name+'-v23.webp');im.save(target,'WEBP',quality=88,method=6)
  records.append({'file':target.name,'width':im.width,'height':im.height,'sha256':hashlib.sha256(target.read_bytes()).hexdigest(),'source':'local original Three.js r185 procedural model','configuration':state['config'],'geometry':state['geometry'],'notProductionCAD':True})
  print('RENDER',target.name,im.size,flush=True)
 b.close()
docs=root/'docs/v23';docs.mkdir(parents=True,exist_ok=True);(docs/'model-render-provenance.json').write_text(json.dumps(records,ensure_ascii=False,indent=2))
