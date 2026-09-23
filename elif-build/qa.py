"""Deterministic, no-purchase acceptance checks for the actual Pages preview."""
from pathlib import Path
from playwright.sync_api import sync_playwright, expect
import json, os, sys
OUT=Path('elif-build/evidence');OUT.mkdir(parents=True,exist_ok=True)
BASE=os.environ.get('PREVIEW_URL','http://127.0.0.1:8080/elif-tasarim/')
LOCAL=os.environ.get('PREVIEW_FILE')
ROUTES=['/','/urunler','/tasarim-masasi','/atolyemiz','/ozel-uretim','/malzemeler','/mekan-fikirleri','/rehber','/teklif-al','/sikca-sorulan-sorular','/iletisim','/sepet','/odeme','/calisma-dosyam','/gizlilik','/atolye-demolari']
ROUTES += ['/urun/'+x for x in ['vera-yemek-masasi','kavis-sandalye','denge-konsol','rota-calisma-masasi']]
ROUTES += ['/mekan-fikirleri/'+x for x in ['bir-masanin-etrafinda','kendinize-ait-bir-kose','sakin-bir-ritim']]
ROUTES += ['/rehber/'+x for x in ['olcu-alma','malzeme-secimi','bakim']]
results=[];errors=[];external=[]
with sync_playwright() as pw:
 options={'headless':True}
 if LOCAL:options.update(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 browser=pw.chromium.launch(**options)
 def fresh(route='/',width=1440):
  page=browser.new_page(viewport={'width':width,'height':900 if width>500 else 844},reduced_motion='reduce')
  page.set_default_timeout(4000)
  page.on('pageerror',lambda e:errors.append(str(e)))
  page.on('request',lambda r:external.append(r.url) if r.url.startswith('http') and not r.url.startswith(BASE) else None)
  if LOCAL:page.set_content(Path(LOCAL).read_text(),wait_until='load')
  else:page.goto(BASE,wait_until='load')
  page.evaluate('(r)=>location.hash="#"+r',route);page.wait_for_timeout(180)
  return page
 def check(name,fn):
  try:fn();results.append({'name':name,'pass':True})
  except Exception as e:results.append({'name':name,'pass':False,'error':str(e)[:500]})
 def matrix():
  for width in [360,390,768,1440]:
   page=fresh(width=width)
   for route in ROUTES:
    page.evaluate('(r)=>location.hash="#"+r',route);page.wait_for_timeout(90)
    outcome=page.evaluate('''()=>({overflow:document.documentElement.scrollWidth>innerWidth+1,main:!!document.querySelector('main'),h1:!!document.querySelector('h1'),badImages:[...document.images].filter(i=>i.complete&&!i.naturalWidth).length})''')
    assert outcome['main'] and outcome['h1'],(width,route,outcome)
    assert not outcome['overflow'],(width,route,outcome)
    assert not outcome['badImages'],(width,route,outcome)
   page.close()
 check('26 routes at four widths, no overflow or broken loaded images',matrix)
 def compare():
  page=fresh('/urunler')
  for name in ['Vera','Kavis','Denge','Rota']:page.get_by_role('button',name=name+' karşılaştırma listesine ekle',exact=True).click()
  assert page.locator('.comparison-thumbs button').count()==3
  page.get_by_role('button',name='Seçilenleri karşılaştır',exact=True).click()
  assert page.get_by_role('dialog').get_by_role('heading',name='Yan yana düşünelim.').is_visible()
  expect(page.get_by_role('row')).to_have_count(7)
  page.screenshot(path=str(OUT/'compare.png'))
  page.keyboard.press('Escape');assert page.locator('dialog[open]').count()==0;page.close()
 check('Comparison caps at three, table opens and Escape closes',compare)
 def quick():
  page=fresh('/urunler');page.get_by_role('button',name='Vera hızlı bakış').click()
  assert page.get_by_role('dialog').get_by_role('link',name='Parçayı incele').is_visible()
  page.get_by_role('dialog').get_by_role('link',name='Parçayı incele').click()
  assert page.get_by_role('heading',name='Vera',exact=True).is_visible();page.close()
 check('Quick view navigates to its own product',quick)
 def search():
  page=fresh('/urunler');page.get_by_role('searchbox',name='Koleksiyonda ara').fill('ÇALIŞMA')
  expect(page.locator('.catalog-item')).to_have_count(1)
  page.get_by_role('searchbox',name='Koleksiyonda ara').fill('olmayanparca')
  assert page.get_by_role('button',name='Filtreleri temizle').is_visible()
  page.get_by_role('button',name='Filtreleri temizle').click();expect(page.locator('.catalog-item')).to_have_count(4);page.close()
 check('Turkish search and empty-state recovery',search)
 def desk():
  page=fresh('/tasarim-masasi');before=page.get_by_test_id('desk-top').get_attribute('points')
  page.get_by_role('slider',name='Masa en',exact=True).fill('205')
  assert page.get_by_test_id('desk-top').get_attribute('points')!=before
  page.get_by_role('button',name='Meşe malzeme fikri').click()
  page.get_by_role('combobox',name='Taşıyıcı yaklaşımı').select_option('adjustable')
  page.screenshot(path=str(OUT/'desk.png'))
  with page.expect_download() as info:page.get_by_role('button',name='Tasarım özetini indir').click()
  data=Path(info.value.path()).read_text();assert '205' in data and 'Sipariş değildir' in data
  page.get_by_role('link',name='Bu fikirle devam et').click()
  assert page.locator('.desk-prefill').is_visible()
  page.get_by_role('button',name='Devam et',exact=True).click()
  page.locator('#q-width').wait_for();values=[page.locator('#q-'+k).input_value() for k in ['width','depth','height']]
  assert '205' in values,values
  page.screenshot(path=str(OUT/'quote-prefilled.png'));page.close()
 check('Desk changes geometry, exports summary and carries dimensions into quote',desk)
 def invalid():
  page=fresh('/tasarim-masasi?en=NaN&derinlik=999999&malzeme=%3Cscript%3E')
  assert page.get_by_role('slider',name='Masa en',exact=True).input_value()=='160'
  assert page.get_by_role('slider',name='Masa derinlik',exact=True).input_value()=='80'
  assert page.get_by_role('button',name='Ceviz malzeme fikri').get_attribute('aria-pressed')=='true';page.close()
 check('Invalid design parameters fall back safely',invalid)
 def top():
  page=fresh('/tasarim-masasi');page.get_by_role('button',name='Üstten',exact=True).click()
  assert page.get_by_role('button',name='Üstten',exact=True).get_attribute('aria-pressed')=='true'
  assert page.locator('svg.table-drawing').is_visible();page.close()
 check('Top drawing is available without animation',top)
 def mobile():
  page=fresh(width=390);page.screenshot(path=str(OUT/'mobile-first.png'))
  page.get_by_role('button',name='Menüyü aç').click();dialog=page.get_by_role('dialog')
  assert dialog.is_visible()
  for i in range(14):
   page.keyboard.press('Tab');assert page.evaluate('document.activeElement.closest("dialog")!==null')
  dialog.get_by_role('link',name='Tasarım Masası').click()
  assert page.get_by_role('slider',name='Masa en',exact=True).is_visible();page.close()
 check('Mobile menu focus and design desk navigation',mobile)
 def screenshots():
  page=fresh();page.screenshot(path=str(OUT/'desktop-first.png'));page.screenshot(path=str(OUT/'home-full.png'),full_page=True)
  assert 'Zamana değer' in page.locator('h1').inner_text();page.close()
 check('Approved headline and screenshots',screenshots)
 check('No JavaScript runtime errors',lambda: (_ for _ in ()).throw(AssertionError(errors)) if errors else None)
 check('No external tracking or form requests in preview',lambda: (_ for _ in ()).throw(AssertionError(external[:5])) if external else None)
 browser.close()
report={'tests':results,'passed':sum(x['pass'] for x in results),'failed':sum(not x['pass'] for x in results),'route_viewport_combinations':len(ROUTES)*4,'engine':'Chromium','mode':'set_content local' if LOCAL else 'HTTP served Pages draft','runtime_errors':errors,'external_requests':external}
(OUT/'qa.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));print(json.dumps(report,ensure_ascii=False,indent=2))
if report['failed']:sys.exit(1)
