from pathlib import Path
from playwright.sync_api import sync_playwright
import os,json,traceback
BASE=os.environ.get('BASE_URL','http://127.0.0.1:8000/elif-tasarim/').rstrip('/')+'/'
ROOT=Path(__file__).resolve().parents[2];OUT=Path(os.environ.get('EVIDENCE_DIR','evidence/seo/browser'));OUT.mkdir(parents=True,exist_ok=True)
report={'base':BASE,'checks':[],'limits':['Chromium software rendering','No ranking, conversion or field performance measurement','No actual message, account or payment action']}
def rec(name):
 report['checks'].append({'name':name,'pass':True});(OUT/'results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));print('PASS',name,flush=True)
with sync_playwright() as pw:
 b=pw.chromium.launch(headless=True,args=['--no-sandbox','--disable-dev-shm-usage','--use-gl=angle','--use-angle=swiftshader']);c=b.new_context(viewport={'width':1440,'height':1000},reduced_motion='reduce');p=c.new_page();p.set_default_timeout(18000);errors=[];p.on('pageerror',lambda e:errors.append(str(e)))
 def go(route):
  p.goto(BASE+route.strip('/')+'/' if route!='/' else BASE,wait_until='domcontentloaded',timeout=60000);p.wait_for_selector('html[data-app-ready=true]')
 def head():return p.evaluate('''()=>({title:document.title,description:document.querySelector('meta[name=description]').content,robots:document.querySelector('meta[name=robots]').content,canonical:document.querySelector('link[rel=canonical]').href,og:document.querySelector('meta[property="og:site_name"]').content,schema:JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent)})''')
 try:
  go('/');assert p.locator('.v232-scene').count()==5;assert p.locator('.v232-scene img[fetchpriority=high]').count()==1;assert p.locator('.v232-scene img').count()==2
  assert 'İstanbul Özel Ölçü Mobilya Atölyesi' in p.title();assert p.locator('h1').inner_text().startswith('Zamana değer');assert p.locator('nav[aria-label="Ana gezinme"] a',has_text='Devir 01').count()==0
  p.wait_for_function('document.querySelector(".v232-scene.is-active img").naturalWidth>0');rec('01. Only visible hero is high priority, one neighbor prepares, five controls and brand preserved')
  for i in [4,2,1,3,0]:
   p.locator('.v6-scene-controls button').nth(i).click();p.wait_for_function('(i)=>Number(document.querySelector(".v232-scene.is-active").dataset.slide)===i',arg=i)
   assert p.locator('.v232-scene.is-active img').evaluate('e=>e.complete&&e.naturalWidth>0');assert p.locator('.v232-scene.is-active img').get_attribute('alt').endswith(('Konsept model.','konsepti.'))
  rec('02. Every manual slide shows a decoded image and informative alt text')
  blocked=b.new_context(viewport={'width':390,'height':844},reduced_motion='reduce');q=blocked.new_page();q.route('**/*concept-tv*',lambda route:route.abort());q.goto(BASE,wait_until='domcontentloaded',timeout=60000);q.wait_for_selector('html[data-app-ready=true]');q.locator('.v6-scene-controls button').nth(4).click();q.wait_for_timeout(800);assert q.locator('.v232-scene.is-active').get_attribute('data-slide')=='0';assert q.locator('.v232-scene.is-active img').evaluate('e=>e.naturalWidth>0');blocked.close();rec('03. Failed next-frame request cannot replace the last good image with a blank slide')
  for route in ['/kategoriler/kahve-kosesi','/kategoriler/mutfak','/kategoriler/tv-unitesi']:
   go(route);assert p.locator('.seo-decisions article').count()==4;assert p.locator('.seo-real-example img').count()==1;assert p.locator('.seo-preparation li').count()==4
   p.locator('.seo-service-guide').scroll_into_view_if_needed();p.evaluate('''async()=>{document.querySelectorAll('img').forEach(i=>i.loading='eager');await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})))}''');p.locator('.seo-service-guide').screenshot(path=str(OUT/(route.split('/')[-1]+'-desktop.png')))
   p.locator('.seo-preparation a.button').click();p.wait_for_selector('#model-note');assert p.locator('.seo-form-hint').count()==1;assert head()['robots']=='noindex,nofollow'
   assert p.locator('#model-note').input_value()=='';assert not p.locator('#model-note').get_attribute('required');p.locator('.seo-form-hint summary').click();assert p.locator('.seo-form-hint li').count()==4
  rec('04. Three service pages have distinct decisions, owned project evidence and matching optional preparation, no mandatory extra form')
  routes=['/','/kategoriler/kahve-kosesi','/kategoriler/mutfak','/kategoriler/tv-unitesi','/rehber/bakim','/modelini-getir','/tasarim-masasi']
  for route in routes:
   go(route);h=head();assert h['robots']=='noindex,nofollow' and h['og']=='Elif Tasarım';assert h['canonical']==BASE+('' if route=='/' else route.strip('/')+'/');assert h['schema']['name']==h['title'];assert h['schema']['description']==h['description']
  rec('05. Initial routes and hydrated metadata share title, description, canonical, organization and preview robots')
  go('/');p.evaluate('document.documentElement.dataset.indexable="true"');p.evaluate('location.hash="#/kategoriler/mutfak"');p.wait_for_function('document.querySelector("meta[name=robots]").content==="index,follow"');p.evaluate('location.hash="#/modelini-getir"');p.wait_for_function('document.querySelector("meta[name=robots]").content==="noindex,nofollow"');p.evaluate('document.documentElement.dataset.indexable="false"');rec('06. Explicit future index mode still excludes the private project flow after client navigation')
  p.set_viewport_size({'width':390,'height':844})
  for route in ['/kategoriler/kahve-kosesi','/kategoriler/mutfak','/kategoriler/tv-unitesi']:
   go(route);assert p.evaluate('document.documentElement.scrollWidth<=innerWidth+1');p.locator('.seo-service-guide').scroll_into_view_if_needed();p.screenshot(path=str(OUT/(route.split('/')[-1]+'-mobile.png')),full_page=True)
   p.evaluate('''()=>[...document.querySelectorAll('main h1,main h2,main h3,main p,main a,main li,main small')].map(e=>[e,parseFloat(getComputedStyle(e).fontSize)]).forEach(([e,s])=>e.style.fontSize=s*2+'px')''');assert p.evaluate('document.documentElement.scrollWidth<=innerWidth+1'),route
  rec('07. Service guidance is readable at mobile width and double text size without hiding overflow')
  nojs=b.new_context(java_script_enabled=False,viewport={'width':390,'height':844});n=nojs.new_page();n.goto(BASE+'kategoriler/kahve-kosesi/',wait_until='domcontentloaded',timeout=60000);assert n.locator('#static-content .seo-decisions article').count()==4;assert n.locator('meta[property="og:site_name"]').get_attribute('content')=='Elif Tasarım';assert n.locator('meta[name=robots]').get_attribute('content')=='noindex,nofollow';nojs.close();rec('08. Useful category content and head metadata exist in the first HTML without JavaScript')
  assert not errors,errors;rec('09. No uncaught error in SEO, carousel readiness or preparation flows')
 except Exception:
  report['failure']=traceback.format_exc();report['errors']=errors;(OUT/'results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));p.screenshot(path=str(OUT/'failure.png'),full_page=True);raise
 finally:b.close()
