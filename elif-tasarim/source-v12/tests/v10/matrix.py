from pathlib import Path
from playwright.sync_api import sync_playwright
import json
R=Path(__file__).resolve().parents[2];O=R/'evidence/v10';rows=[];errors=[]
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',headless=False,args=['--no-sandbox','--disable-dev-shm-usage','--use-angle=swiftshader','--enable-unsafe-swiftshader'])
 page=b.new_page();page.on('pageerror',lambda e:errors.append(str(e)));page.emulate_media(reduced_motion='reduce');page.set_content((R/'preview/Elif_Tasarim.html').read_text(),wait_until='domcontentloaded',timeout=60000)
 routes=json.loads((R/'dist/release-v10.json').read_text())['routes']
 for w in [360,390,768,1024,1440,1920]:
  page.set_viewport_size({'width':w,'height':1000})
  for route in routes:
   page.evaluate('(r)=>location.hash="#"+r',route);page.wait_for_timeout(85)
   d=page.evaluate('''()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,h1:document.querySelectorAll('h1').length,broken:[...document.images].filter(i=>i.complete&&!i.naturalWidth&&i.getAttribute('src')).length})''')
   row={'route':route,'viewport':w,**d};row['pass']=d['scroll']<=w+1 and d['h1']==1 and d['broken']==0;rows.append(row)
  print(w,'completed',len(rows),'failures',sum(not r['pass'] for r in rows),flush=True)
 # Controlled text-resize stress probe. Original font sizes are frozen before any mutation.
 stress=[]
 for route in ['/','/modelini-getir','/tasarim-masasi']:
  page.set_content((R/'preview/Elif_Tasarim.html').read_text(),wait_until='domcontentloaded',timeout=60000);page.set_viewport_size({'width':390,'height':844});page.evaluate('(r)=>location.hash="#"+r',route);page.wait_for_timeout(200)
  page.evaluate('''()=>{const pairs=[...document.body.querySelectorAll('*')].map(e=>[e,parseFloat(getComputedStyle(e).fontSize)]);pairs.forEach(([e,s])=>{if(Number.isFinite(s))e.style.fontSize=(s*2)+'px'});}''');page.wait_for_timeout(100)
  d=page.evaluate('''()=>({width:innerWidth,scroll:document.documentElement.scrollWidth})''');stress.append({'route':route,**d,'pass':d['scroll']<=391})
 report={'matrix':rows,'textStress':stress,'errors':errors,'runtime':'offline Chromium, Xvfb software WebGL','note':'Text probe is not a WCAG certification. Routes are not a live HTTP test.'}
 (O/'matrix.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));print('FINAL',len(rows),'matrix failures',sum(not r['pass']for r in rows),'text',stress,'errors',errors,flush=True)
 b.close()
 assert all(r['pass'] for r in rows);assert all(r['pass']for r in stress);assert not errors
