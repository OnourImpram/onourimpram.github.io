"""Small public-only runtime sample. No form submission, account access, asset reuse or private API probing."""
import json
from pathlib import Path
from datetime import datetime,timezone
from urllib.parse import urlparse
from playwright.sync_api import sync_playwright
OUT=Path('elif-lab/evidence-v4');OUT.mkdir(parents=True,exist_ok=True)
SITES=[('vornom','https://www.vornom.com.tr/'),('devol','https://www.devolkitchens.co.uk/'),('plainenglish','https://www.plainenglishdesign.co.uk/'),('sebastiancox','https://www.sebastiancox.co.uk/')]
MEASURE='''()=>{const keys=['fontFamily','fontSize','lineHeight','letterSpacing','color','backgroundColor','display','gap','maxWidth','padding','transitionDuration'];return {title:document.title,viewport:innerWidth,height:innerHeight,elements:[...document.querySelectorAll('h1,h2,header,nav,main,button')].filter(e=>e.getBoundingClientRect().width>0).slice(0,24).map(e=>{const c=getComputedStyle(e),r=e.getBoundingClientRect();return {tag:e.tagName,rect:{x:r.x,y:r.y,width:r.width,height:r.height},style:Object.fromEntries(keys.map(k=>[k,c[k]]))}}),navigation:[...document.querySelectorAll('header a,nav a')].map(a=>({text:(a.textContent||'').trim().slice(0,60),path:new URL(a.href).pathname})).slice(0,35)}}'''
records=[]
with sync_playwright() as p:
 browser=p.chromium.launch(headless=True)
 for name,url in SITES:
  rec={'id':name,'url':url,'time':datetime.now(timezone.utc).isoformat(),'status':'UNKNOWN','measurements':[],'backend':'UNKNOWN'}
  context=browser.new_context(reduced_motion='reduce');page=context.new_page()
  try:
   response=page.goto(url,wait_until='domcontentloaded',timeout=30000);page.wait_for_timeout(900)
   rec['http_status']=response.status if response else None
   if not response or response.status>=400:raise ValueError('HTTP access or service error')
   if any(t in page.title().lower() for t in ['just a moment','captcha','access denied']):raise ValueError('Access challenge, no bypass attempted')
   for width in [390,1440]:
    page.set_viewport_size({'width':width,'height':844 if width==390 else 1000});page.wait_for_timeout(500)
    rec['measurements'].append(page.evaluate(MEASURE));page.screenshot(path=str(OUT/f'{name}-{width}.png'),timeout=15000)
   rec['status']='OBSERVED'
  except Exception as e:rec['status']='PARTIAL' if rec['measurements'] else 'BLOCKED';rec['reason']=str(e)[:250]
  finally:context.close()
  rec['limits']=['Homepage sample, not a complete crawl','No backend source or complete API contract inferred','No private data, response bodies or competitor assets republished']
  records.append(rec)
 browser.close()
(OUT/'reference-measurements.json').write_text(json.dumps(records,ensure_ascii=False,indent=2))
print(json.dumps([{'id':r['id'],'status':r['status'],'samples':len(r['measurements']),'reason':r.get('reason')} for r in records]))
