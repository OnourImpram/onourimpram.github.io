from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]
def load_runtime(page):
    base=ROOT/'public/three'
    sources={n:(base/'vendor'/n).read_text() for n in ['three.core.min.js','three.module.min.js','OrbitControls.js','RoundedBoxGeometry.js','RoomEnvironment.js']}
    sources['desk-scene.mjs']=(base/'desk-scene.mjs').read_text()
    page.evaluate('''async (sources)=>{const urls={}; for(const name of Object.keys(sources)){let code=sources[name];for(const [n,url] of Object.entries(urls)){code=code.split('./vendor/'+n).join(url).split('./'+n).join(url);}urls[name]=URL.createObjectURL(new Blob([code],{type:'text/javascript'}));} await import(urls['desk-scene.mjs']);window.__moduleURLs=urls;}''',sources)
if __name__=='__main__':
 from playwright.sync_api import sync_playwright
 with sync_playwright() as p:
  b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader'])
  page=b.new_page(viewport={'width':1100,'height':750});errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
  page.set_content('<style>body{margin:0}#stage{position:relative;width:1100px;height:750px}canvas{width:100%;height:100%}.v8-dimension{position:absolute;transform:translate(-50%,-50%);font:14px Arial;background:#f7f4edbb;padding:4px;color:#564330}</style><div id="stage"></div>')
  load_runtime(page)
  page.evaluate("window.scene=ElifDesk3D.createDeskScene(document.getElementById('stage'),{width:180,depth:80,height:80,angle:90})")
  page.wait_for_timeout(1200)
  print(page.evaluate('scene.inspect()'));print(errors)
  page.screenshot(path=str(ROOT/'evidence/v8/scene-first.png'))
  b.close()
