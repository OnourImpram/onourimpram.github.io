"""V10 negative regression contract. Tested on unmodified V9 first. No messages sent."""
from pathlib import Path
from playwright.sync_api import sync_playwright
import os,json,math
ROOT=Path(__file__).resolve().parents[2];OUT=ROOT/'evidence/v10'/os.environ.get('RUN_TAG','regressions');OUT.mkdir(parents=True,exist_ok=True)
report={'checks':[],'errors':[],'base':os.environ.get('BASE_URL','offline')}
def record(name,ok,detail=None):
 report['checks'].append({'name':name,'pass':bool(ok),'detail':detail});print(('PASS ' if ok else 'FAIL ')+name,flush=True);(OUT/'results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
print('starting driver',flush=True)
with sync_playwright() as p:
 b=p.chromium.launch(executable_path=os.environ.get('CHROME','/usr/bin/chromium'),headless=False,args=['--no-sandbox','--disable-dev-shm-usage','--use-angle=swiftshader','--enable-unsafe-swiftshader'])
 print('browser started',flush=True)
 page=b.new_page(viewport={'width':1440,'height':1060},device_scale_factor=1);page.set_default_timeout(12000);page.set_default_navigation_timeout(60000)
 page.emulate_media(reduced_motion='reduce');page.on('pageerror',lambda e:report['errors'].append(str(e)))
 print('loading preview',flush=True)
 if os.environ.get('BASE_URL'):page.goto(os.environ['BASE_URL'],wait_until='networkidle')
 else:page.set_content((ROOT/'preview/Elif_Tasarim.html').read_text(),wait_until='domcontentloaded')
 print('preview loaded',flush=True)
 def nav(r):page.evaluate('(r)=>{location.hash="#"+r}',r);page.wait_for_timeout(220)
 def ready():page.wait_for_selector('[data-three-status="ready"]',timeout=40000)
 def inspect():return page.evaluate("document.querySelector('.v8-canvas-host').__elif3D.inspect()")
 def case(name,fn):
  try:fn()
  except Exception as e:record(name,False,str(e)[:900])
 def door():
  nav('/tasarim-masasi');ready();page.get_by_role('button',name='Yalnız masa',exact=True).click();page.get_by_role('button',name='Dolabı aç',exact=True).click();page.wait_for_timeout(250)
  state=inspect();angle=state['geometry']['doorAngle'];z=.40*math.sin(angle)
  record('Cabinet door swings outward, not through storage cavity',z>0.15,{'angle':angle,'freeEdgeDepthFromHinge':z});page.locator('.v8-showroom').screenshot(path=str(OUT/'door.png'))
 case('Door probe',door)
 def share():
  page.get_by_role('button',name='Akşam',exact=True).click();page.get_by_role('button',name='Tasarım bağlantısı',exact=True).click();url=page.get_by_label('Paylaşılabilir 3D tasarım bağlantısı').input_value();record('Share URL retains chosen evening illumination','isik=evening' in url,url)
 case('Share probe',share)
 def view():
  page.get_by_role('button',name='Mekân içinde',exact=True).click();page.get_by_role('button',name='Üstten',exact=True).click();page.get_by_role('button',name='Yalnız masa',exact=True).click();page.wait_for_timeout(200)
  top=page.get_by_role('button',name='Üstten',exact=True).get_attribute('aria-pressed');record('Room change keeps camera preset and pressed button consistent',top=='false',{'topPressed':top,'camera':inspect()['camera']})
 case('Camera probe',view)
 def spin():
  page.emulate_media(reduced_motion='no-preference');page.get_by_role('button',name='Yavaşça döndür',exact=True).click();page.wait_for_timeout(300);page.get_by_role('button',name='Görünümü sıfırla',exact=True).click();page.locator('.v8-canvas-host').scroll_into_view_if_needed();page.wait_for_timeout(300);a=inspect()['camera'];page.wait_for_timeout(500);c=inspect()['camera'];drift=sum((x-y)**2 for x,y in zip(a,c))**.5
  record('Reset view stops turntable rather than drifting again',drift<.004 and page.get_by_role('button',name='Yavaşça döndür',exact=True).count()==1,{'drift':drift});page.emulate_media(reduced_motion='reduce')
 case('Turntable probe',spin)
 def export_failure():
  page.locator('.v8-canvas-host').scroll_into_view_if_needed()
  result=page.evaluate("""()=>{const host=document.querySelector('.v8-canvas-host'),e=host.__elif3D,c=host.querySelector('canvas');const before={w:c.width,h:c.height,camera:e.inspect().camera};const original=c.toDataURL;let rejected=false;c.toDataURL=()=>{throw Error('Controlled encoding failure')};try{e.snapshot(801,599)}catch{rejected=true}finally{c.toDataURL=original}return {before,after:{w:c.width,h:c.height,camera:e.inspect().camera},rejected}}""")
  record('Failed image export restores renderer size and camera',result['rejected'] and result['before']==result['after'],result)
 case('Export failure probe',export_failure)

 def material():
  page.get_by_role('button',name='Açık meşe tonu',exact=True).click();page.get_by_role('button',name='Bu tasarımı Yusuf Usta ile konuş',exact=True).click();page.get_by_role('button',name='Devam et',exact=True).click();value=page.locator('label').filter(has_text='Malzeme yaklaşımı').locator('select').input_value();record('Studio finish is a visible selected option in request form','meşe' in value.lower(),{'selectValue':value});values=page.locator('main select').evaluate_all('(xs)=>xs.map(x=>({value:x.value,index:x.selectedIndex}))');record('All request dropdowns have meaningful selected values',all(x['index']>=0 and x['value'] for x in values),values)
 case('Material probe',material)
 def error():
  page.locator('#model-width').fill('123');page.locator('#model-depth').fill('61');page.locator('#model-height').fill('0');page.get_by_role('button',name='Devam et',exact=True).click();focus=page.evaluate('document.activeElement.id');record('Dimension validation identifies the actual invalid field',focus=='model-height' and page.locator('#model-height').get_attribute('aria-invalid')=='true',{'focus':focus})
 case('Field probe',error)
 def reference():
  nav('/projeler');nav('/modelini-getir?kategori=mutfak&ref=https%3A%2F%2Fpin.it%2FauditA');page.locator('#model-note').fill('Bana ait bir fikir ve korunacak açıklama.');nav('/projeler');nav('/modelini-getir?kategori=tv-unitesi&ref=https%3A%2F%2Fpin.it%2FauditB');url=page.locator('#model-url').input_value();note=page.locator('#model-note').input_value();page.get_by_role('button',name='Devam et',exact=True).click();cat=page.get_by_label('Model kategorisi').input_value();record('New model updates category and link without erasing private note',cat=='tv-unitesi' and 'auditB' in url and 'korunacak' in note,{'category':cat,'url':url,'note':note})
 case('New reference probe',reference)
 def search():
  nav('/arama?q=kahve');page.get_by_role('button',name='Sitede ara',exact=True).click();page.get_by_role('searchbox',name='Arama kelimesi').fill('mutfak');page.get_by_role('link',name='Tüm sonuçları gör',exact=True).click();value=page.get_by_role('searchbox',name='Tüm sitede ara').input_value();record('Repeated search on same route refreshes query and results',value=='mutfak',{'visibleQuery':value,'url':page.url})
 case('Search probe',search)
 def metadata():
  nav('/proje/isikli-tv-unitesi')
  one=page.evaluate("({og:document.querySelector('meta[property=\"og:image\"]').content,url:document.querySelector('meta[property=\"og:url\"]').content,schema:JSON.parse(document.querySelector('script[type=\"application/ld+json\"]').textContent).url})")
  record('SPA metadata follows the current project without a stale preview image','r22-full.webp' in one['og'] and '/proje/isikli-tv-unitesi/' in one['url'] and one['schema']==one['url'],one)
 case('Metadata navigation probe',metadata)
 def tabs():
  nav('/tasarim-masasi');ready();page.get_by_role('tab',name='Masa',exact=True).focus();page.keyboard.press('ArrowRight');page.wait_for_timeout(100)
  selected=page.get_by_role('tab',name='Ölçü',exact=True);record('Studio tabs support keyboard navigation and one active tab stop',selected.get_attribute('aria-selected')=='true' and selected.get_attribute('tabindex')=='0' and page.evaluate("document.activeElement.textContent")=='Ölçü')
  link=page.get_by_role('link',name='Form doldurmadan WhatsApp’ta sor');url=link.get_attribute('href');record('Direct studio question retains correct WhatsApp recipient and concept scope','wa.me/905308797169?' in url and 'Konsept' in __import__('urllib.parse',fromlist=['unquote']).unquote(url),url)
 case('Keyboard and direct contact probe',tabs)
 def retry():
  page.get_by_role('button',name='Akşam',exact=True).click();page.get_by_role('button',name='Koyu ahşap',exact=True).click();before=inspect()['config'];page.evaluate("document.querySelector('.v8-canvas-host canvas').dispatchEvent(new Event('webglcontextlost',{cancelable:true}))");page.wait_for_selector('[data-three-status=lost]');page.get_by_role('button',name='3D görünümü yeniden dene').click(timeout=60000);ready();after=inspect();record('WebGL fallback can rebuild without losing chosen configuration',before==after['config'] and after['theme']=='evening',{'before':before,'after':after['config'],'canvases':page.locator('.v8-canvas-host canvas').count()})
 case('Retry probe',retry)

 record('No uncaught runtime exception during negative probes',not report['errors'],report['errors']);report['browser']=b.version;b.close();(OUT/'results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
 if any(not c['pass'] for c in report['checks']):raise SystemExit(1)
