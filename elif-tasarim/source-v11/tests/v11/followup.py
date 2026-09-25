"""Independent navigation/context, keyboard and idle probes. No message delivery claim."""
from pathlib import Path
from playwright.sync_api import sync_playwright
import os,json
R=Path(__file__).resolve().parents[2];BASE=os.environ.get('BASE_URL','');OUT=Path(os.environ.get('EVIDENCE_DIR',str(R/'evidence/v11/followup')));OUT.mkdir(parents=True,exist_ok=True);rows=[]
def record(name,detail=None):rows.append({'name':name,'pass':True,'detail':detail});print('PASS',name,flush=True);(OUT/'results.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2))
with sync_playwright() as p:
 exe=os.environ.get('CHROMIUM_PATH','/usr/bin/chromium');b=p.chromium.launch(executable_path=exe if Path(exe).exists() else None,headless=False,args=['--no-sandbox','--disable-dev-shm-usage','--use-angle=swiftshader','--enable-unsafe-swiftshader']);ctx=b.new_context(viewport={'width':1440,'height':1000});page=ctx.new_page();page.set_default_timeout(20000);page.emulate_media(reduced_motion='reduce')
 def load(page,route='/'):
  if BASE:page.goto(BASE+(route.split('?')[0].strip('/')+'/' if route.split('?')[0]!='/' else '')+('?' + route.split('?',1)[1] if '?' in route else ''),wait_until='domcontentloaded',timeout=60000)
  else:page.set_content((R/'preview/Elif_Tasarim.html').read_text(),timeout=60000);page.evaluate('(r)=>location.hash="#"+r',route)
  page.wait_for_timeout(150)
 def nav(route):page.evaluate('(r)=>location.hash="#"+r',route);page.wait_for_timeout(150)
 try:
  load(page,'/modelini-getir');page.locator('#model-note').fill('Sadece benim özel notum');nav('/tasarim-masasi');page.wait_for_selector('[data-three-status=ready]',timeout=60000)
  page.get_by_role('tab',name='Masa',exact=True).focus();page.keyboard.press('ArrowRight');assert page.get_by_role('tab',name='Ölçü',exact=True).get_attribute('aria-selected')=='true';page.keyboard.press('End');assert page.get_by_role('tab',name='Mekân',exact=True).get_attribute('aria-selected')=='true'
  page.get_by_role('slider',name='Raf ışığı',exact=True).focus();page.keyboard.press('ArrowLeft');page.wait_for_timeout(120);assert page.evaluate("document.querySelector('.v8-canvas-host').__elif3D.inspect().config.shelfLight") == 64
  page.get_by_role('tab',name='Masa',exact=True).click();page.get_by_role('slider',name='Çalışma yüksekliği',exact=True).focus();page.keyboard.press('ArrowRight');page.wait_for_timeout(150);assert page.evaluate("document.querySelector('.v8-canvas-host').__elif3D.inspect().config.height")==81
  record('C04. Keyboard tabs, shelf light and height change real state')
  host=page.locator('.v8-canvas-host canvas');host.focus();initial=page.evaluate("document.querySelector('.v8-canvas-host').__elif3D.inspect().camera");page.keyboard.press('ArrowLeft');page.wait_for_timeout(150);after=page.evaluate("document.querySelector('.v8-canvas-host').__elif3D.inspect().camera");assert initial!=after;record('C04. Keyboard camera changes viewpoint')
  samples=[]
  for attempt in range(12):
   page.wait_for_timeout(1000);samples.append(page.evaluate("document.querySelector('.v8-canvas-host').__elif3D.inspect().frameCount"))
   if len(samples)>=3 and samples[-1]==samples[-2]==samples[-3]:break
  a=samples[-1];page.wait_for_timeout(1600);z=page.evaluate("document.querySelector('.v8-canvas-host').__elif3D.inspect().frameCount");assert a==z,(samples,z);record('C07. Settled reduced-motion scene does not continuously render',{'settlingFrames':samples,'before':a,'after':z})
  page.get_by_role('button',name='Tasarım bağlantısı',exact=True).click();url=page.get_by_label('Paylaşılabilir 3D tasarım bağlantısı',exact=True).input_value();assert 'Sadece' not in url
  second=b.new_context(viewport={'width':1280,'height':900});new=second.new_page();new.emulate_media(reduced_motion='reduce');load(new,'/tasarim-masasi?'+url.split('?')[1]);new.wait_for_selector('[data-three-status=ready]',timeout=60000);c=new.evaluate("document.querySelector('.v8-canvas-host').__elif3D.inspect().config");assert c['height']==81 and c['shelfLight']==64;new.get_by_role('button',name='Bu tasarımı Yunus Usta ile konuş',exact=True).click();assert new.locator('#model-note').input_value()=='';record('A09. Fresh isolated browser context restores public configuration, not private notes');second.close()
  nav('/projeler?q=mutfak');cards=page.locator('.work-card');assert cards.count()>=2;cards.last.scroll_into_view_if_needed();page.wait_for_timeout(150);before=page.evaluate('scrollY');cards.last.locator('a').first.click();page.go_back();page.wait_for_timeout(450);after=page.evaluate('scrollY');assert abs(after-before)<35;assert 'q=mutfak' in page.url;record('B05. Filter query and previous list scroll survive actual Back',{'before':before,'after':after})
  nav('/modelini-getir');before=page.locator('#model-note').input_value();page.locator('#model-note').focus();page.set_viewport_size({'width':844,'height':390});page.wait_for_timeout(100);page.set_viewport_size({'width':390,'height':844});page.wait_for_timeout(100);assert page.locator('#model-note').input_value()==before;assert page.evaluate('document.documentElement.scrollWidth<=innerWidth+1');record('C03. Viewport orientation changes preserve the focused draft. Real virtual keyboard is untested')
 finally:b.close()
