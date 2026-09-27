"""Apply narrow readability fixes from the actual V21 Lighthouse diagnostics."""
from pathlib import Path
R=Path('elif-tasarim/source-v12')
def edit(path,old,new):
    p=R/path;s=p.read_text();assert s.count(old)==1,(path,old);p.write_text(s.replace(old,new))
edit('src/App.tsx','className="brand" aria-label="Elif Tasarım ana sayfa"','className="brand" title="Ana sayfa"')
edit('src/pages/Home.tsx',"aria-label={sc.label+' sahnesi'}","aria-label={String(i+1).padStart(2,'0')+' '+sc.label+' sahnesi'}")
edit('src/pages/Home.tsx',' aria-label="Devir 01. Çift raflı 3D tasarım stüdyosunu aç"','')
edit('src/components/PortfolioUI.tsx',"aria-label={w.subtitle+(a.favorites.includes('work:'+w.id)?' kaydını kaldır':' çalışmasını kaydet')}","aria-label={(a.favorites.includes('work:'+w.id)?'İlham dosyanızda. Kaydı kaldır. ':'İlham dosyama ekle. ')+w.subtitle}")
edit('src/pages/Portfolio.tsx',"aria-label={(pinLookup[p.id]?.label||p.title)+' modelini kaydet'}","aria-label={(a.favorites.includes('pin:'+p.id)?'İlham dosyanızda. Kaydı kaldır. ':'İlham dosyama ekle. ')+(pinLookup[p.id]?.label||p.title)}")
p=R/'src/v21.css';s=p.read_text();assert 'Measured Lighthouse text contrast' not in s
p.write_text(s+'''
/* Measured Lighthouse text contrast. Preserve layout, photography and the approved palette. */
.eyebrow{color:#6b543c}
.work-caption p{color:#6e5c48}
.v6-process .v6-heading>p{color:#6b5943}
.process-number{color:#806143}
.v11-studio-invitation>div>small,.v6-final-cta p,.v8-primary-action>span,.v8-detail-grid article>span{color:#6b5943}
.v6-final-cta .text-link{color:#543f2c}
.model-stepper button>span,.model-dropzone span,.or-divider>span{color:#6b543c}
.model-form .field-hint{color:#6b543c}
''')
p=R/'tests/v21/readability.cjs';assert not p.exists()
p.write_text('''const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const css=()=>fs.readFileSync('src/v21.css','utf8');
function luminance(hex){return hex.replace('#','').match(/../g).map(h=>parseInt(h,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((sum,v,i)=>sum+v*[.2126,.7152,.0722][i],0)}
function contrast(a,b){const aa=luminance(a),bb=luminance(b);return (Math.max(aa,bb)+.05)/(Math.min(aa,bb)+.05)}
test('V21 measured helper text and contact link have explicit readable colors',()=>{
 const text=css();for(const rule of ['.eyebrow{color:#6b543c}', '.work-caption p{color:#6e5c48}', '.v6-final-cta .text-link{color:#543f2c}', '.model-form .field-hint{color:#6b543c}'])assert.ok(text.includes(rule),rule);
 assert.ok(contrast('#6b543c','#e8decf')>=4.5);assert.ok(contrast('#6e5c48','#f6f2e9')>=4.5);assert.ok(contrast('#543f2c','#e8decf')>=4.5);
});
test('V21 visible labels remain in accessible control names',()=>{
 const app=fs.readFileSync('src/App.tsx','utf8'),home=fs.readFileSync('src/pages/Home.tsx','utf8'),cards=fs.readFileSync('src/components/PortfolioUI.tsx','utf8');
 assert.ok(!app.includes('aria-label="Elif Tasarım ana sayfa"'));
 assert.ok(home.includes("aria-label={String(i+1).padStart(2,'0')+' '+sc.label+' sahnesi'}"));
 assert.ok(!home.includes('aria-label="Devir 01. Çift raflı 3D tasarım stüdyosunu aç"'));
 assert.ok(cards.includes("'İlham dosyanızda. Kaydı kaldır. ':'İlham dosyama ekle. '"));
});
''')
p=R/'docs/v21/READABILITY_AUDIT.md';assert not p.exists()
p.write_text('''# V21. Ölçülen okunabilirlik ve laboratuvar notu

İlk tam V21 kontrolü başarılı olduktan sonra Lighthouse 13.4.1 tanı dosyaları ayrıca incelendi. Ana sayfa, model formu ve stüdyo için erişilebilirlik puanları sırasıyla 96, 96 ve 97 idi. Yardımcı metinlerde 4,5 oranının altındaki renk çiftleri, ana sayfanın son iletişim bağlantısında 1,19 oranı ve görünen etiket ile erişilebilir ad arasında uyuşmazlıklar raporlandı.

Bunun üzerine iki hedefli yerel sözleşme testi yazıldı ve mevcut sürümde başarısız oldukları görüldü. Renkler sıcak ahşap paleti içinde koyulaştırıldı. Yazı küçültülmedi, içerik gizlenmedi. Üst marka bağlantısı ile stüdyo görsel bağlantısı doğal görünen metinlerinden erişilebilir ad alır. Açılış sahnesi sayısı ve ilham kayıt düğmesinin görünen sözcükleri erişilebilir adda korunur. Yeni tam tarayıcı ve Lighthouse sonuçları bu değişikliklerden sonra yeniden alınır.

Altbilgideki büyük marka tekrarı dekoratif tasarım öğesi olarak korunur. Bu inceleme bütün metinlerin, bütün durumların veya bütün WCAG ölçütlerinin sertifikasyonu değildir.

İlk laboratuvar performans puanları ana sayfada 66, formda 68 ve stüdyoda 27 idi. Stüdyonun yazılımsal WebGL, emüle mobil CPU ve ağ ortamındaki sonucu özellikle iyileştirme alanıdır. Bu değerler gerçek telefon FPS veya alan verisi değildir. Basit renk düzeltmesinden hız artışı iddia edilmez. SEO puanında bilinçli noindex önizleme engeli vardır. Gerçek cihaz performansı ve ticari indekslemeyi açmak ayrı yayın koşullarıdır.
''')
print('Applied measured readable-text and visible-label fixes, with two regression contracts.')
