"""Read-only V8 deployment verification. Never sends a message or payment."""
import os,json,hashlib,urllib.request,concurrent.futures,time
from pathlib import Path
from playwright.sync_api import sync_playwright
BASE=os.environ.get('BASE_URL','https://onourimpram.github.io/elif-tasarim/')
ROOT=Path(os.environ.get('EXPECTED_DIR','elif-tasarim'))
OUT=Path('elif-v8-live-evidence');OUT.mkdir(exist_ok=True)
expected=json.loads((ROOT/'release-v8.json').read_text())
report={'base':BASE,'release':expected['release'],'checks':[],'files':[]}
def get(path):
 req=urllib.request.Request(BASE+path,headers={'User-Agent':'Elif-V8-Release-Verification/1.0','Cache-Control':'no-cache'})
 with urllib.request.urlopen(req,timeout=40) as r:return r.read(),r.status,r.headers.get('Content-Type','')
def check(name,ok,details=None):
 report['checks'].append({'name':name,'pass':bool(ok),'details':details})
 (OUT/'verification.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));assert ok,name
 print('PASS',name,flush=True)
for attempt in range(20):
 try:
  b,_,_=get('release-v8.json')
  if json.loads(b)==expected:break
 except Exception:pass
 time.sleep(10)
else:raise RuntimeError('Exact V8 manifest not available')
def one(kv):
 p,v=kv;b,status,mime=get(p);ok=status==200 and len(b)==v['bytes'] and hashlib.sha256(b).hexdigest()==v['sha256'];return {'path':p,'match':ok,'bytes':len(b),'status':status,'mime':mime}
with concurrent.futures.ThreadPoolExecutor(max_workers=5) as ex:report['files']=list(ex.map(one,((k,v) for k,v in expected['files'].items() if k!='.nojekyll')))
report['build_only_files']=['.nojekyll']
check('Every publicly served V8 asset and route matches the tested build',all(x['match'] for x in report['files']),len(report['files']))
check('Three.js module is served with JavaScript MIME',all('javascript' in x['mime'] for x in report['files'] if x['path'].endswith('.mjs')))
with sync_playwright() as p:
 browser=p.chromium.launch(args=['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader'])
 page=browser.new_page(viewport={'width':1440,'height':1050})
 errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
 page.goto(BASE,wait_until='networkidle');check('Approved homepage slogan and V8 marker','Zamana değer' in page.locator('h1').inner_text() and page.locator('meta[name="elif-release"]').get_attribute('content')=='v8-three-atelier')
 page.screenshot(path=str(OUT/'home-desktop.png'))
 check('3D runtime is not loaded before homepage activation',page.locator('.v8-canvas-host canvas').count()==0)
 page.get_by_role('button',name='3D deneyimi başlat',exact=True).click();page.wait_for_selector('[data-three-status="ready"]',timeout=60000)
 check('Homepage renders actual Three.js canvas',page.locator('.v8-canvas-host canvas[data-engine="Three.js 185"]').count()==1)
 page.locator('.v8-home-studio').screenshot(path=str(OUT/'home-studio.png'))
 page.goto(BASE+'tasarim-masasi/',wait_until='networkidle');page.wait_for_selector('[data-three-status="ready"]',timeout=60000)
 def state():return page.evaluate("document.querySelector('.v8-canvas-host').__elif3D.inspect()")
 s=state();check('Published desk has real WebGL geometry',s['revision']=='185' and s['triangles']>2000,s)
 check('Default camera contains the complete desk',all(abs(v)<=1.001 for v in s['framing'].values()),s['framing'])
 page.screenshot(path=str(OUT/'studio-desktop.png'))
 page.get_by_role('slider',name='Çalışma yüksekliği',exact=True).evaluate('(e)=>{e.value=113;e.dispatchEvent(new Event("input",{bubbles:true}))}')
 page.wait_for_function("Math.abs(document.querySelector('.v8-canvas-host').__elif3D.inspect().geometry.mainTopY-1.13)<.003",timeout=30000)
 s=state();check('Height movement preserves fixed support and return height',s['geometry']['fixedPanelY']==.305 and s['geometry']['returnTopY']==.695,s['geometry'])
 page.get_by_role('slider',name='Yan tabla açısı',exact=True).evaluate('(e)=>{e.value=180;e.dispatchEvent(new Event("input",{bubbles:true}))}')
 page.wait_for_function("Math.abs(document.querySelector('.v8-canvas-host').__elif3D.inspect().geometry.wingAngle-Math.PI)<.006",timeout=30000)
 page.get_by_role('button',name='Çekmeceleri aç',exact=True).click();page.get_by_role('button',name='Dolabı aç',exact=True).click()
 page.wait_for_function("document.querySelector('.v8-canvas-host').__elif3D.inspect().geometry.doorAngle < -1.5",timeout=30000)
 s=state();check('Return, drawers and door move as separate meshes',s['geometry']['mainDrawerZ']>.55 and s['geometry']['doorAngle']<-1.5,s['geometry'])
 page.get_by_role('button',name='Koyu ahşap',exact=True).click();check('Material option changes model',state()['material']=='koyu')
 page.get_by_role('button',name='Bu tasarımı Yusuf Usta ile konuş',exact=True).click()
 check('Existing private project flow receives the 3D concept','modelini-getir' in page.url)
 page.get_by_role('button',name='Devam et',exact=True).first.click();page.get_by_role('button',name='Devam et',exact=True).first.click()
 check('Height value survives 3D-to-model handoff','113' in page.locator('body').inner_text())
 links=page.locator('a[href^="https://wa.me/"]').evaluate_all('(xs)=>xs.map(x=>x.href)')
 check('Direct WhatsApp recipient remains Yusuf Usta',bool(links) and all('wa.me/905308797169' in x for x in links))
 matrix=[]
 for width in [390,1440]:
  page.set_viewport_size({'width':width,'height':950})
  for route in expected['routes']:
   url=BASE+(route.strip('/')+'/' if route!='/' else '')
   response=page.goto(url,wait_until='domcontentloaded');page.wait_for_selector('#app h1',timeout=20000);page.wait_for_timeout(60)
   ok=response.status==200 and page.locator('#app h1').count()==1 and page.evaluate('document.documentElement.scrollWidth<=innerWidth+1')
   matrix.append({'route':route,'width':width,'pass':ok})
 (OUT/'route-matrix.json').write_text(json.dumps(matrix,ensure_ascii=False,indent=2))
 check('Generated routes render without horizontal overflow on mobile and desktop',all(x['pass'] for x in matrix),len(matrix))
 page.set_viewport_size({'width':390,'height':844});page.goto(BASE+'tasarim-masasi/',wait_until='networkidle');page.wait_for_selector('[data-three-status="ready"]',timeout=60000);page.screenshot(path=str(OUT/'studio-mobile.png'))
 page.goto(BASE,wait_until='networkidle');page.screenshot(path=str(OUT/'home-mobile.png'))
 check('No application runtime exceptions in tested public flows',not errors,errors)
 report['browser']=browser.version;browser.close()
report['limitations']=['No physical hardware, electrical or structural certification','No real WhatsApp message sent','Chromium software WebGL, not Safari or real phone hardware','No full e-commerce backend']
(OUT/'verification.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
