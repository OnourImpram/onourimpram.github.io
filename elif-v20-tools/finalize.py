from pathlib import Path
root=Path('elif-tasarim/source-v12')
def replace(path,old,new):
    p=root/path;text=p.read_text();assert text.count(old)==1,(path,old);p.write_text(text.replace(old,new))
# Export probe proved the USDZ bytes complete. Rendering its success fragment lacked an import.
replace('src/components/DesignWorkbench.tsx',"import {createElement,Component} from 'react';","import {createElement,Fragment,Component} from 'react';")
replace('src/pages/Devir.tsx','Sonsözü sizin.','Son söz sizin.')
replace('public/three/desk-scene.mjs','renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.8));','renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.4));')
replace('src/components/DesignWorkbench.tsx','componentDidUpdate(previous:Props){if(studioQuery(previous.config)',"componentDidUpdate(previous:Props){if(!previous.ready&&this.props.ready)this.props.getEngine()?.quality(this.state.quality);if(studioQuery(previous.config)")
replace('tests/v20/acceptance.py',"page.screenshot(path=str(O/'devir-product-desktop.png'),full_page=True);", "page.evaluate(\"async()=>{document.querySelectorAll('img').forEach(i=>i.loading='eager');await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})))}\");page.screenshot(path=str(O/'devir-product-desktop.png'),full_page=True);")
# Chromium native scroll alignment produced a 0.40625 CSS-pixel fractional edge.
# Keep the simultaneous scene/control assertion and allow only one CSS pixel, as in horizontal tests.
replace('tests/v11/acceptance.py',"canvas['y']+canvas['height']<=h and slider['y']+slider['height']<=h,", "canvas['y']+canvas['height']<=h+1 and slider['y']+slider['height']<=h+1,")
p=root/'tests/v20/fragments.cjs';assert not p.exists()
p.write_text("const{test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),ts=require('typescript');\ntest('USDZ success fragments have a runtime binding',()=>{const source=fs.readFileSync('src/components/DesignWorkbench.tsx','utf8');assert.match(source,/import \\{[^}]*Fragment[^}]*\\} from 'react'/);const output=ts.transpileModule(source,{compilerOptions:{jsx:ts.JsxEmit.React,jsxFactory:'createElement',jsxFragmentFactory:'Fragment',module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;assert.match(output,/react_1.Fragment/);});\n")
p=root/'docs/V20_Teslim_Kapsami.md';p.write_text(p.read_text()+'''\n## Son doğrulamada giderilen hata\n\nUSDZ dışa aktarıcısı gerçek dosyayı üretirken, başarı bağlantısının JSX parçasında eksik Fragment içe aktarımı arayüzü güncelleyemiyordu. Dışa aktarım izinde dosyanın tamamlandığı, ardından yerel dar kapsamlı arayüz testinde Fragment is not defined hatası ayrı ayrı yeniden üretildi. İçe aktarım düzeltildi. Gerçek dosya üretimi ve görünür bağlantı birlikte kabul koşuludur.\n\nGrafik profilinin başlangıç piksel oranı Dengeli seçeneğiyle eşitlendi. Sayısal ölçüler ve ürün geometrisi bundan etkilenmez.\n\nMobil aynı ekranda sahne ve sürgü kontrolünde Chromium kaydırması 0,40625 CSS piksel kesirli kenar üretti. Tam görünürlük koşulu korunarak yatay kontrollerde olduğu gibi bir CSS piksel yuvarlama toleransı kullanılır. Bu değişiklik gerçek bir kontrolün ekran dışında kalmasını geçerli saymaz.\n''')
print('Applied final, root-cause-based fixes')
