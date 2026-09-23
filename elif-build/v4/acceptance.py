from pathlib import Path
import os,json
from playwright.sync_api import sync_playwright,expect
BASE=os.environ.get('PREVIEW_URL')
HTML=Path(os.environ.get('PREVIEW_FILE','preview/Elif_Tasarim.html'))
OUT=Path(os.environ.get('EVIDENCE_DIR','docs/v4/evidence'));OUT.mkdir(parents=True,exist_ok=True)
results=[];errors=[]
with sync_playwright() as pw:
    opts={'headless':True}
    if not BASE:opts.update(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
    browser=pw.chromium.launch(**opts)
    page=browser.new_page(viewport={'width':1440,'height':1000},reduced_motion='reduce')
    page.set_default_timeout(2500)
    page.on('pageerror',lambda e:errors.append(str(e)))
    if BASE:page.goto(BASE,wait_until='load')
    else:page.set_content(HTML.read_text(),wait_until='load')
    def check(name,fn):
        try:fn();results.append({'name':name,'pass':True});print('PASS',name,flush=True)
        except Exception as e:results.append({'name':name,'pass':False,'error':str(e)[:350]});print('FAIL',name,str(e)[:160],flush=True)
    def headline():
        expect(page.locator('main .v4-home')).to_be_visible()
        assert ' '.join(page.locator('main h1').inner_text().split()).casefold()=='zamana değer katan mobilyalar.'
    check('Approved slogan and new editorial surface',headline)
    if os.environ.get('RED_ONLY'):
        (OUT/'red.json').write_text(json.dumps(results,indent=2));browser.close();raise SystemExit(0 if all(x['pass'] for x in results) else 1)
    def scenes():
        before=page.locator('[data-hero-image]').get_attribute('src')
        page.get_by_role('button',name='Çalışma sahnesi',exact=True).click()
        assert page.locator('[data-hero-image]').get_attribute('src')!=before
        expect(page.get_by_role('button',name='Çalışma sahnesi',exact=True)).to_have_attribute('aria-pressed','true')
        page.get_by_role('button',name='Yemek sahnesi',exact=True).click()
    check('Hero scene buttons change image without autoplay',scenes)
    def craft():
        page.get_by_role('button',name='02 Birleşim detayını keşfet',exact=True).click()
        expect(page.locator('#craft-detail h3')).to_have_text('Bir arada, sağlam.')
        page.get_by_role('button',name='03 Yüzey detayını keşfet',exact=True).focus();page.keyboard.press('Enter')
        expect(page.locator('#craft-detail h3')).to_have_text('Dokunduğunuz son katman.')
    check('Craft details respond to pointer and keyboard',craft)
    def material():
        page.get_by_role('tab',name='Meşe numunesi',exact=True).click()
        expect(page.locator('#v4-material-panel h3')).to_have_text('Meşe')
        page.keyboard.press('ArrowRight')
        expect(page.get_by_role('tab',name='Kestane numunesi')).to_have_attribute('aria-selected','true')
    check('Material tabs and arrow navigation are synchronized',material)
    def brief():
        page.get_by_role('slider',name='Başlangıç masa eni').fill('205')
        page.get_by_role('button',name='Başlangıç malzemesi Meşe',exact=True).click()
        href=page.get_by_role('link',name='Tasarım masasında devam et',exact=True).get_attribute('href')
        assert 'en=205' in href and 'malzeme=mese' in href,href
    check('Dimension and material carry into existing design desk route',brief)
    def process():
        page.get_by_role('tab',name='03 Atölyede şekillenir',exact=True).click()
        expect(page.locator('#v4-process-panel h3')).to_have_text('Atölyede şekillenir.')
    check('Process chapters reveal their own content',process)
    def matrix():
        for width in [360,390,768,1024,1440,1920]:
            page.set_viewport_size({'width':width,'height':900 if width>600 else 844})
            assert page.evaluate('document.documentElement.scrollWidth<=innerWidth+1'),width
            assert page.locator('main h1').count()==1
            assert not page.locator('main img').evaluate_all('(els)=>els.some(e=>e.complete&&!e.naturalWidth)')
    check('Homepage at six widths without overflow or broken images',matrix)
    def mobile():
        page.set_viewport_size({'width':390,'height':844});page.evaluate('scrollTo(0,0)')
        assert page.locator('.v4-hero-actions').bounding_box()['y']<650
        page.get_by_role('button',name='Menüyü aç',exact=True).click()
        for _ in range(14):
            page.keyboard.press('Tab');assert page.evaluate('!!document.activeElement.closest("dialog")')
        page.keyboard.press('Escape');assert page.locator('dialog[open]').count()==0
    check('Mobile first action visible and menu traps focus',mobile)
    def reduced():
        page.emulate_media(reduced_motion='reduce')
        duration=page.locator('[data-hero-image]').evaluate('(e)=>getComputedStyle(e).animationDuration')
        assert duration in ('0s','1e-05s','0.00001s','0.01ms'),duration
    check('Reduced motion disables hero animation',reduced)
    def captures():
        page.set_viewport_size({'width':1440,'height':1000});page.evaluate('scrollTo(0,0)');page.wait_for_timeout(200)
        page.screenshot(path=str(OUT/'desktop.png'),timeout=20000);page.screenshot(path=str(OUT/'home-full.jpg'),full_page=True,type='jpeg',quality=85,timeout=20000)
        page.set_viewport_size({'width':390,'height':844});page.screenshot(path=str(OUT/'mobile.png'),timeout=20000)
    check('Desktop and mobile captures saved',captures)
    check('No runtime errors',lambda: (_ for _ in ()).throw(AssertionError(errors)) if errors else None)
    browser.close()
report={'tests':results,'passed':sum(x['pass'] for x in results),'failed':sum(not x['pass'] for x in results),'errors':errors,'mode':'HTTP' if BASE else 'local set_content'}
(OUT/'v4-qa.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));print(json.dumps(report,ensure_ascii=False))
raise SystemExit(1 if report['failed'] else 0)
