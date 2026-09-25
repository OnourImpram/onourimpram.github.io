"""Offline responsive regression, same browser engine as browser.py; not a live HTTP test."""
import json,time,traceback
from pathlib import Path
from playwright.sync_api import sync_playwright
R=Path(__file__).resolve().parents[2]
O=R/'evidence/v7';O.mkdir(exist_ok=True,parents=True)
html=(R/'preview/Elif_Tasarim.html').read_text()
routes=json.loads((R/'dist/release-v7.json').read_text())['routes']
widths=[360,390,768,1024,1440,1920]
results=[];errors=[]
start=time.time()
try:
 with sync_playwright() as p:
  b=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox'])
  page=b.new_page();page.on('pageerror',lambda e:errors.append(str(e)))
  page.set_content(html,wait_until='load',timeout=40000)
  page.wait_for_selector('main h1',timeout=10000)
  for width in widths:
   page.set_viewport_size({'width':width,'height':900})
   for route in routes:
    page.evaluate('(r)=>{location.hash="#"+r}',route)
    page.wait_for_timeout(55)
    m=page.evaluate('''()=>({headings:document.querySelectorAll('main h1').length,width:innerWidth,scrollWidth:document.documentElement.scrollWidth,title:document.querySelector('main h1')?.textContent,broken:[...document.querySelectorAll('main img')].filter(i=>i.complete&&i.naturalWidth===0).map(i=>i.alt)})''')
    ok=m['headings']==1 and m['scrollWidth']<=width+1 and not m['broken']
    results.append({'route':route,'viewport':width,'passed':ok,**m})
    if not ok:print('FAIL',route,width,m,flush=True)
   print('Completed',width,'px,',len(results),'combinations',flush=True)
  version=b.version;b.close()
except Exception as e:
 errors.append(str(e));traceback.print_exc();version='incomplete'
report={'mode':'Offline set_content, not HTTP or public deployment','browser':version,'routes':len(routes),'widths':widths,'expected':len(routes)*len(widths),'tested':len(results),'passed':sum(x['passed'] for x in results),'failures':[x for x in results if not x['passed']],'runtimeErrors':errors,'seconds':round(time.time()-start,2),'results':results}
(O/'matrix.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
print(json.dumps({k:v for k,v in report.items() if k!='results'},ensure_ascii=False,indent=2),flush=True)
raise SystemExit(0 if len(results)==len(routes)*len(widths) and all(x['passed'] for x in results) and not errors else 1)
