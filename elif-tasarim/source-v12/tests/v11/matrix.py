"""Page structure and controlled text stress. No certification or field performance claim."""
from pathlib import Path
from playwright.sync_api import sync_playwright
import json,os
R=Path(__file__).resolve().parents[2];BASE=os.environ.get('BASE_URL','');OUT=Path(os.environ.get('EVIDENCE_DIR',str(R/'evidence/v11/matrix')));OUT.mkdir(parents=True,exist_ok=True);rows=[];errors=[];stress=[]
routes=json.loads((R/'dist/release-v20.json').read_text())['routes'];html=(R/'preview/Elif_Tasarim.html').read_text()
with sync_playwright() as p:
 exe=os.environ.get('CHROMIUM_PATH','/usr/bin/chromium');b=p.chromium.launch(executable_path=exe if Path(exe).exists() else None,headless=False,args=['--no-sandbox','--disable-dev-shm-usage','--use-angle=swiftshader','--enable-unsafe-swiftshader'])
 page=b.new_page();page.on('pageerror',lambda e:errors.append(str(e)));page.emulate_media(reduced_motion='reduce')
 if BASE:page.goto(BASE,wait_until='domcontentloaded',timeout=60000)
 else:page.set_content(html,wait_until='domcontentloaded',timeout=60000)
 for w in [320,360,390,768,1024,1440,1920]:
  page.set_viewport_size({'width':w,'height':1000})
  for route in routes:
   page.evaluate('(r)=>location.hash="#"+r',route);page.wait_for_timeout(70)
   d=page.evaluate("""()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,h1:document.querySelectorAll('h1').length,broken:[...document.images].filter(i=>i.complete&&!i.naturalWidth&&i.getAttribute('src')).map(x=>x.getAttribute('src').slice(0,100))})""")
   row={'route':route,'viewport':w,**d};row['pass']=d['scroll']<=w+1 and d['h1']==1 and not d['broken'];rows.append(row)
  print(w,len(rows),sum(not x['pass'] for x in rows),flush=True)
 page.close()
 for route in ['/','/modelini-getir','/tasarim-masasi']:
  page=b.new_page(viewport={'width':390,'height':844});page.on('pageerror',lambda e:errors.append(str(e)));page.emulate_media(reduced_motion='reduce')
  if BASE:page.goto(BASE+(route.strip('/')+'/' if route!='/' else ''),wait_until='domcontentloaded',timeout=60000)
  else:page.set_content(html,timeout=60000);page.evaluate('(r)=>location.hash="#"+r',route)
  page.wait_for_timeout(200)
  if route=='/tasarim-masasi':page.wait_for_selector('[data-three-status=ready]',timeout=60000)
  page.evaluate("""()=>{const xs=[...document.body.querySelectorAll('*')].map(e=>[e,parseFloat(getComputedStyle(e).fontSize)]);for(const[e,s]of xs)if(Number.isFinite(s))e.style.fontSize=(s*2)+'px'}""");page.wait_for_timeout(150)
  x=page.evaluate('({width:innerWidth,scroll:document.documentElement.scrollWidth})');stress.append({'route':route,**x,'pass':x['scroll']<=391});page.screenshot(path=str(OUT/('stress-'+(route.strip('/')or'home')+'.png')));page.close()
 report={'matrix':rows,'textStress':stress,'errors':errors,'base':BASE or'inline offline','browser':b.version,'note':'A viewport is not a separate functional test. Text-size probing is not WCAG certification.'};(OUT/'matrix.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));b.close();print('FINAL',len(rows),sum(not x['pass']for x in rows),stress,errors,flush=True)
 assert all(x['pass'] for x in rows);assert all(x['pass'] for x in stress);assert not errors
