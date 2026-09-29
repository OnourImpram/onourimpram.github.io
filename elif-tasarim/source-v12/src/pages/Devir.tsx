import {createElement,Fragment} from 'react';
import {Link,ButtonLink,TextLink,Eyebrow,Icon,Photo,type PageProps} from '../components/ui';
import {studioQuery,defaultStudio} from '../lib/desk-v8';
import {whatsappUrl} from '../lib/project';

const configurations=[
 {title:'Odak',subtitle:'Kompakt bir başlangıç.',use:'Tek yüzeyde odaklı çalışma',width:160,depth:75,height:80,angle:0,material:'mese' as const,materialLabel:'Açık meşe görünümü',image:'devir-top.webp',alt:'Devir 01 konseptinin üstten görünümü'},
 {title:'Akış',subtitle:'İki yüzey, tek çalışma düzeni.',use:'L düzene yaklaşan geniş yüzey',width:180,depth:80,height:80,angle:90,material:'ceviz' as const,materialLabel:'Ceviz görünümü',image:'devir-detail.webp',alt:'Devir 01 konseptinin depolama ve birleşim ayrıntısı'},
 {title:'Hareket',subtitle:'Ayakta çalışmaya bir bakış.',use:'Yükseltilmiş çalışma konumu',width:200,depth:85,height:110,angle:180,material:'koyu' as const,materialLabel:'Koyu ahşap görünümü',image:'devir-standing.webp',alt:'Yükseltilmiş Devir 01 konsept masa görünümü'}
];

export function Devir(a:PageProps){return <div className="v20-devir v23-devir">
 <section className="v20-product-hero wrap">
  <div className="v20-product-copy">
   <Eyebrow>ELİF TASARIM / KONSEPT SERİSİ 01</Eyebrow>
   <h1>DEVİR<span>Çalışma biçiminize<br/><em>yer açın.</em></span></h1>
   <p>Biraz yükselir. Yön değiştirir. Günlük eşyalarınıza yer açar. Devir, çalışma alanını sabit bir kalıp yerine sizinle birlikte düşünmek için tasarlandı.</p>
   <div className="v23-hero-actions"><ButtonLink to="/tasarim-masasi" navigate={a.navigate}>360° stüdyoda tasarlayın <Icon name="diagonal" size={17}/></ButtonLink><TextLink to="/modelini-getir" navigate={a.navigate}>Alanınızı ve ihtiyacınızı anlatın</TextLink></div>
   <small>Yükseklik ayarlı masa konsepti. Henüz onaylanmış ürün şartnamesi, motor kapasitesi veya üretim teklifi değildir.</small>
  </div>
  <div className="v20-product-visual v23-product-visual">
   <Photo name="devir-poster.webp" alt="Devir 01 konsept masanın ürün görünümü, Three.js modelinden render" ratio="16/10" eager/>
   <span className="v20-product-stamp">01<br/><small>KONSEPT MODEL</small></span>
   <span className="v20-material-caption">DOKU. HAREKET. İŞLEV.</span>
  </div>
 </section>

 <nav className="v20-product-nav wrap" aria-label="Devir bölüm kısayolları">
  <a href="#devir-yaklasim" onClick={e=>{e.preventDefault();document.getElementById('devir-yaklasim')?.scrollIntoView({behavior:'auto'});}}>Tasarım fikri</a>
  <a href="#devir-kullanim" onClick={e=>{e.preventDefault();document.getElementById('devir-kullanim')?.scrollIntoView({behavior:'auto'});}}>Nasıl kullanılır?</a>
  <a href="#devir-baslangic" onClick={e=>{e.preventDefault();document.getElementById('devir-baslangic')?.scrollIntoView({behavior:'auto'});}}>Üç başlangıç</a>
  <a href="#devir-detay" onClick={e=>{e.preventDefault();document.getElementById('devir-detay')?.scrollIntoView({behavior:'auto'});}}>Ayrıntılar</a>
  <Link to="/tasarim-masasi" navigate={a.navigate}>3D stüdyo <Icon size={16}/></Link>
 </nav>

 <section className="wrap v20-product-story" id="devir-yaklasim">
  <Eyebrow>TEK MASA. BİRDEN FAZLA HÂL.</Eyebrow>
  <h2>Gününüz değişir.<br/><em>Çalışma alanınız da değişebilir.</em></h2>
  <div><p>Ana tabla ile yükselen çekmeceler, yerini koruyan alt depolama ve bağımsız yan çalışma yüzeyi. Her parça, başka bir kullanım ihtimalini birlikte düşünmek için.</p><p>Stüdyoda renk ve ölçü seçmek, üretim kararı vermek değildir. İhtiyacınızı daha açık anlatmanın bir yoludur. Sonra Yunus Usta ile malzemeyi, mekanizmayı ve uygulamayı netleştirirsiniz.</p></div>
 </section>

 <section className="wrap v23-value-grid" id="devir-kullanim" aria-labelledby="devir-kullanim-title">
  <div className="v23-value-heading"><Eyebrow>ÜRÜNÜ DEĞİL, KULLANIMI DÜŞÜNELİM</Eyebrow><h2 id="devir-kullanim-title">Üç hareket.<br/><em>Üç farklı ihtiyaç.</em></h2><p>Devir’in değeri yalnız biçiminde değil. Gün içinde çalışma şekliniz değişirken masanın hangi problemi çözmesini istediğinizde.</p></div>
  <div className="v23-value-cards">
   <article><span>01</span><h3>Yükselir.</h3><p>Oturma ve ayakta çalışma konumlarını aynı yüzey üzerinde görsel olarak karşılaştırın. Gerçek motor ve ergonomik aralık üretim öncesi doğrulanır.</p></article>
   <article><span>02</span><h3>Döner.</h3><p>Yan yüzeyi düz, L veya daha açık bir düzene yaklaştırın. Dönüş alanı ve mekanik sınırlar gerçek mekâna göre birlikte değerlendirilir.</p></article>
   <article><span>03</span><h3>Toparlar.</h3><p>Üst çekmeceler ve sabit dolapla günlük ekipmanı masanın üzerinde bırakmadan yakınınızda tutacak bir düzen oluşturun.</p></article>
  </div>
 </section>

 <section className="v20-room-editorial">
  <Photo name="atelier-evening-v9.webp" alt="İki kitaplıklı çalışma alanında Devir konsepti" ratio="16/9"/>
  <div><Eyebrow>MEKÂNI BİRLİKTE HAYAL EDELİM</Eyebrow><h2>Yalnız masa değil.<br/><em>Size ait bir çalışma köşesi.</em></h2><p>Stüdyodaki kitaplıklar ve ışık, yerleşimi düşünmek içindir. Masa teklifine kendiliğinden dahil değildir.</p><TextLink to="/tasarim-masasi" navigate={a.navigate} light>Mekânı üç boyutta inceleyin</TextLink></div>
 </section>

 <section className="wrap v20-config-starts v23-config-starts" id="devir-baslangic">
  <div className="v20-section-heading"><div><Eyebrow>NEREDEN BAŞLAYALIM?</Eyebrow><h2>Üç fikir.<br/><em>Son söz sizin.</em></h2></div><p>Hazır ürün paketi değil, değiştirilebilir görsel başlangıçlar. Her kartta masayı görür, ardından aynı fikri 3D stüdyoda kendi ihtiyacınıza göre düzenlersiniz.</p></div>
  <div className="v20-start-grid v23-start-grid">{configurations.map((c,i)=><Link to={'/tasarim-masasi?'+studioQuery({...defaultStudio,...c})} navigate={a.navigate} key={c.title} aria-label={c.title+' başlangıcını 3D stüdyoda aç'}>
   <div className="v23-start-image"><Photo name={c.image} alt={c.alt} ratio="4/3" caption={false}/><span className="v20-start-num">0{i+1}</span><span className={'v23-material-chip '+c.material}><i/>{c.materialLabel}</span></div>
   <div className="v23-start-copy"><h3>{c.title}</h3><p>{c.subtitle}</p><strong>{c.use}</strong><small>{c.width} × {c.depth} cm ana tabla.<br/>{c.height} cm çalışma yüksekliği.</small><span className="text-link">Bu fikirle başla <Icon/></span></div>
  </Link>)}</div>
 </section>

 <section className="wrap v20-detail-editorial" id="devir-detay">
  <Photo name="devir-detail.webp" alt="Devir modelinin depolama ve birleşim ayrıntısı" ratio="1"/>
  <div><Eyebrow>İYİ DÜŞÜNÜLMÜŞ BİR GÜNLÜK HAYAT</Eyebrow><h2>Ayrıntılar,<br/><em>kullanırken anlam kazanır.</em></h2><dl>{[['Yükselen yüzey','Oturma ve ayakta çalışma konumlarını görsel olarak değerlendirin.'],['Üç ince çekmece','Günlük küçük ekipmanlarınız için entegre depolama fikri.'],['Döner yan tabla','L veya açık yerleşimi kendi alanınıza göre karşılaştırın.'],['Sabit alt dolap','Dosya ve aksesuarlar için düzenlenebilir bir alt hacim.']].map(([title,desc])=><div key={title}><dt>{title}</dt><dd>{desc}</dd></div>)}</dl><TextLink to="/tasarim-masasi" navigate={a.navigate}>3D detay noktalarını keşfedin</TextLink></div>
 </section>

 <section className="wrap v23-proof-bridge">
  <div><Eyebrow>GERÇEK İŞ. AYRI ETİKET. AYNI USTALIK.</Eyebrow><h2>Konsepti gerçek atölye işiyle<br/><em>karıştırmıyoruz.</em></h2><p>Devir 01 görsel bir konsepttir. Elif Tasarım’ın bitirdiği işler ise ayrı kaynak etiketiyle çalışma arşivinde bulunur. Yeni bir proje görüşmesinde konseptten ilham alır, gerçek malzeme ve üretim kararlarını ayrıca veririz.</p></div>
  <div><ButtonLink to="/projeler" navigate={a.navigate}>Gerçek çalışmaları görün</ButtonLink><TextLink to="/hizmet-ve-teklif" navigate={a.navigate}>Teklif kapsamını öğrenin</TextLink></div>
 </section>

 <section className="wrap v20-product-close">
  <Eyebrow>FİKİRDEN GERÇEK MOBİLYAYA</Eyebrow><h2>Şimdi sizin alanınızı<br/><em>konuşalım.</em></h2><p>Yaklaşık ölçünüz, ekipmanınız ve günlük çalışma biçiminiz. Başlamak için bu kadarı yeterli.</p><div><ButtonLink to="/tasarim-masasi" navigate={a.navigate}>3D’de tasarla ve paylaş</ButtonLink><a className="text-link" href={whatsappUrl('Merhaba Yunus Usta, Devir 01 çalışma masası konseptini kendi alanım için değerlendirmek istiyorum.')} rel="noopener noreferrer" target="_blank">Doğrudan Yunus Usta’ya sor <Icon name="diagonal" size={17}/></a></div><small>Motor, güvenli hareket sınırları, gerçek yüzey numunesi, son ölçü, kapsam ve fiyat üretim öncesi ayrıca onaylanır. Görseller konsepttir.</small>
 </section>
 </div>}
