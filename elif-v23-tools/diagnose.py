"""Read-only live audit. Never submits messages or mutates the published site."""
from pathlib import Path
import json, os, traceback
from playwright.sync_api import sync_playwright
BASE='https://onourimpram.github.io/elif-tasarim/'
OUT=Path('v23-diagnosis');OUT.mkdir(exist_ok=True)
manifest=json.loads(Path('elif-tasarim/release-v22.json').read_text())
report={'base':BASE,'routes':[],'primary':[],'errors':[]}
inspect_js="""()=>({url:location.href,title:document.title,h1:document.querySelector('main h1')?.innerText,mainLength:document.querySelector('main')?.innerText.length,scrollWidth:document.documentElement.scrollWidth,innerWidth,images:[...document.querySelectorAll('main img')].map(x=>{const s=getComputedStyle(x),r=x.getBoundingClientRect();return{alt:x.alt,src:x.currentSrc||x.src,complete:x.complete,naturalWidth:x.naturalWidth,naturalHeight:x.naturalHeight,width:r.width,height:r.height,opacity:s.opacity,visibility:s.visibility,display:s.display}})})"""
def inspect(page,path,mode):
    errors=[];failed=[]
    page.on('pageerror',lambda e:errors.append(str(e)))
    page.on('response',lambda r: failed.append({'url':r.url,'status':r.status}) if r.status>=400 and r.url.startswith(BASE) else None)
    response=page.goto(BASE+path.strip('/')+('/' if path.strip('/') else ''),wait_until='domcontentloaded',timeout=45000)
    page.wait_for_timeout(400)
    for y in range(0,min(18000,page.evaluate('document.body.scrollHeight')),600):
        page.evaluate('(y)=>scrollTo(0,y)',y);page.wait_for_timeout(80)
    page.wait_for_timeout(500)
    result=page.evaluate(inspect_js);result.update(path=path,mode=mode,status=response.status if response else None,errors=errors,failed=failed)
    result['broken']=[x for x in result['images'] if not x['naturalWidth'] or x['width']<1 or x['height']<1]
    page.evaluate('scrollTo(0,0)');page.wait_for_timeout(120)
    return result
with sync_playwright() as p:
    b=p.chromium.launch(headless=True,args=['--no-sandbox','--disable-dev-shm-usage','--use-angle=swiftshader','--enable-unsafe-swiftshader'])
    for w in [1440,390]:
        page=b.new_page(viewport={'width':w,'height':1000 if w==1440 else 844})
        for path in ['/devir-01','/tasarim-masasi','/projeler','/rehber','/ilham-modelleri']:
            try:
                result=inspect(page,path,'direct-'+str(w));report['primary'].append(result)
                page.screenshot(path=str(OUT/(path.strip('/')+'-'+str(w)+'.png')),full_page=True)
                print(json.dumps({'path':path,'width':w,'broken':result['broken'],'errors':result['errors'],'failed':result['failed'],'mainLength':result['mainLength']},ensure_ascii=False),flush=True)
            except Exception:report['errors'].append({'path':path,'width':w,'trace':traceback.format_exc()})
        page.close()
    page=b.new_page(viewport={'width':1440,'height':1000})
    for path in manifest['routes']:
        try:
            result=inspect(page,path,'route-scan');report['routes'].append(result)
            if result['broken'] or result['errors']:print('ROUTE ISSUE',path,json.dumps(result,ensure_ascii=False),flush=True)
        except Exception:report['errors'].append({'path':path,'trace':traceback.format_exc()})
    page.goto(BASE,wait_until='domcontentloaded');page.wait_for_timeout(300)
    page.get_by_role('navigation',name='Ana gezinme').get_by_role('link',name='Devir 01',exact=True).click();page.wait_for_timeout(350)
    report['fromMenu']=page.evaluate(inspect_js)
    for section in ['.v20-product-hero','.v20-room-editorial','.v20-detail-editorial']:
        loc=page.locator(section);loc.scroll_into_view_if_needed();page.wait_for_timeout(400);loc.screenshot(path=str(OUT/(section[1:]+'.png')))
    page.close()
    page=b.new_page(java_script_enabled=False,viewport={'width':1440,'height':1000})
    report['noJS']=inspect(page,'/devir-01','no-js')
    page.screenshot(path=str(OUT/'devir-no-js.png'),full_page=True)
    page.close();b.close()
(OUT/'report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
print('SUMMARY',json.dumps({'routes':len(report['routes']),'primary':len(report['primary']),'errors':report['errors'],'brokenRoutes':[x['path']for x in report['routes']if x['broken']],'blankRoutes':[x['path']for x in report['routes']if not x['mainLength']]},ensure_ascii=False),flush=True)
