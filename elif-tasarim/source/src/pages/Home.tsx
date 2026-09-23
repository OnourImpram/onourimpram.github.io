import { createElement, Fragment, Component } from 'react';
import { TableDrawing } from './DesignDesk';
import { defaultDesk } from '../lib/desk';
import { products, materials, ideas, journal, faqs } from '../lib/data';
import { image, Icon, Link, TextLink, ButtonLink, Eyebrow, Photo, SectionHead, ProductCard, Callout, Accordion, type PageProps } from '../components/ui';
export class MaterialPreview extends Component<{
    actions: PageProps;
}, {
    selected: number;
}> {
    state = { selected: 0 };
    render() { const m = materials[this.state.selected]; return <section className="material-section"><div className="wrap material-grid"><div><Eyebrow>04 / MALZEMENİN DİLİ</Eyebrow><h2>Her damar,<br /><em>başka bir hikâye.</em></h2><p>Bir yüzeyin rengi kadar dokusu, bir parçanın görünüşü kadar kullanımı. Doğru malzemeyi birlikte düşünelim.</p><div className="material-tabs" role="tablist" aria-label="Malzeme fikirleri">{materials.map((mat, i) => <button key={mat.id} id={'material-tab-' + mat.id} role="tab" aria-selected={i === this.state.selected} aria-controls="material-content" tabIndex={i === this.state.selected ? 0 : -1} onKeyDown={e => { if (['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(e.key)) {
        e.preventDefault();
        const next = e.key === 'Home' ? 0 : e.key === 'End' ? materials.length - 1 : (i + (e.key === 'ArrowRight' ? 1 : materials.length - 1)) % materials.length;
        this.setState({ selected: next }, () => document.getElementById('material-tab-' + materials[next].id)?.focus());
    } }} onClick={() => this.setState({ selected: i })} className={i === this.state.selected ? 'active' : ''}><span style={{ background: mat.color }}/>{mat.name}</button>)}</div><div id="material-content" role="tabpanel" aria-labelledby={'material-tab-' + m.id}><h3>{m.latin}</h3><p className="small">{m.desc}</p></div><TextLink to="/malzemeler" navigate={this.props.actions.navigate}>Malzeme kütüphanesi</TextLink></div><figure className="material-study"><img src={image(m.image)} alt={m.name + ' dokusu, temsili numune'} loading="lazy"/><div className="material-label"><span>NUMUNE ÇALIŞMASI / 0{this.state.selected + 1}</span><strong>{m.name}</strong><span>Tonlar temsili. Kesin seçim gerçek numuneyle.</span></div><span className="vertical-label">DOĞADAN İLHAM ALAN YÜZEYLER</span></figure></div></section>; }
}
const scenes = [
 {image:'dining.webp',label:'Bir masanın etrafında',eyebrow:'YAŞAMIN İÇİNDEN / 01',link:'/urunler?alan=yemek'},
 {image:'office.webp',label:'Size ait bir çalışma alanı',eyebrow:'KENDİ RİTMİNİZDE / 02',link:'/tasarim-masasi'},
 {image:'craft.webp',label:'Ustalığın izinde',eyebrow:'ATÖLYENİN İÇİNDEN / 03',link:'/atolyemiz'}
];
class EditorialHero extends Component<{actions:PageProps},{scene:number}> {
 state={scene:0};
 render(){const s=scenes[this.state.scene],a=this.props.actions; return <section className="hero-editorial" aria-label="Elif Tasarım açılışı">
 <div className="hero-scene" key={s.image}><img src={image(s.image)} alt={s.label+' için temsili tasarım görseli'} fetchPriority="high"/></div>
 <div className="hero-shade"/><div className="hero-editorial-inner wrap">
 <div className="hero-copy"><Eyebrow>İSTANBUL / EL YAPIMI MOBİLYA ATÖLYESİ</Eyebrow><h1>Zamana değer<br/>{" "}katan <em>mobilyalar.</em></h1><p>Birlikte geçirilen anlar, kendinize ayırdığınız bir köşe.<br className="desktop-only"/> Yaşamınıza yer açan parçalar, kendi atölyemizden.</p><div className="hero-actions"><ButtonLink to="/urunler" navigate={a.navigate}>Koleksiyonu keşfet</ButtonLink><TextLink to="/teklif-al" navigate={a.navigate} light>Ölçünüze özel</TextLink></div></div>
 <div className="hero-scene-bottom"><div className="scene-tabs" role="group" aria-label="Açılış görseli">{scenes.map((x,i)=><button key={x.image} aria-pressed={i===this.state.scene} aria-label={x.label} onClick={()=>this.setState({scene:i})}><span>0{i+1}</span><i/></button>)}</div><Link to={s.link} navigate={a.navigate} className="scene-caption"><span>{s.eyebrow}</span><strong>{s.label}</strong><Icon name="diagonal"/></Link><a href="#koleksiyon" className="hero-scroll" aria-label="Koleksiyona kaydır" onClick={e=>{e.preventDefault();document.getElementById('koleksiyon')?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})}}><Icon name="down"/></a></div>
 </div><span className="hero-concept-label">Görseller tasarım konseptidir.</span></section> }
}
export function Home(a: PageProps) {
    return <>
 <EditorialHero actions={a}/>
 <section className="atelier-manifesto wrap"><span className="manifesto-index">ELİF / ATÖLYE NOTU 01</span><p>Bir mobilya yalnız bir yere konmaz.<br/><em>Bir yaşama katılır.</em></p><div><span>El işçiliği.</span><span>Ölçünüze özel.</span><span>Doğrudan atölyeden.</span></div></section>
 <section id="koleksiyon" className="wrap section collection-section"><SectionHead number="01" title={<>Az parça.<br /><em>Çok karakter.</em></>} sub="Evinizin ritmine eşlik edecek bir tasarım seçkisi." to="/urunler" navigate={a.navigate}/><div className="featured-products">{[products[0], products[2], products[3]].map(p => <ProductCard key={p.id} product={p} actions={a}/>)}</div><p className="catalog-note">Bu seçki bir tasarım önizlemesidir. Ürün adları ve görseller gerçek katalog yerine geçmez.</p></section>
 <section className="room-discovery wrap section"><SectionHead number="02" title={<>Yaşamın her alanına,<br/><em>kendine ait bir parça.</em></>} sub="Mekândan başlayın. İhtiyacınızı birlikte şekillendirelim." to="/urunler" navigate={a.navigate}/><div className="room-grid">{[
 ['yemek','dining.webp','Bir araya gelmek','Yemek alanı'],['oturma','lounge.webp','Biraz yavaşlamak','Yaşam alanı'],['calisma','office.webp','Kendi ritminizde','Çalışma alanı'],['depolama','sideboard.webp','Her şeye bir yer','Depolama']
 ].map(([id,img,title,label])=><Link key={id} to={'/urunler?alan='+id} navigate={a.navigate} className="room-card"><img src={image(img)} alt={label+' için temsili mekân görseli'} loading="lazy"/><div><span>{label}</span><h3>{title}</h3><Icon name="diagonal"/></div></Link>)}</div></section>
 <section className="story-section"><div className="wrap story-grid"><div className="story-picture"><Photo name="craft.webp" alt="Ahşap işçiliğini anlatan temsili el ve rende görseli"/><div className="story-foot"><span>İŞİN ÖZÜ</span><span>Bir şeyi iyi yapma isteği.</span></div></div><div className="story-copy"><Eyebrow>03 / ATÖLYEMİZDEN</Eyebrow><h2>Bir meslekten<br />fazlası.<br /><em>Bir aile mirası.</em></h2><p>Babadan öğrenilen marangozluk bilgisi, bugün başka yaşam alanlarında yeni karşılıklar buluyor.</p><p>Elif Tasarım’da ürünlerimizi kendi atölyemizde üretiyoruz. Hazır olanı sunmak yerine, neye ihtiyaç duyduğunuzu dinleyerek başlıyoruz.</p><TextLink to="/atolyemiz" navigate={a.navigate} light>Hikâyemizi keşfet</TextLink><div className="story-signature"><img src={image('elif-amblem-light.png')} alt=""/><span>ELİF TASARIM<br /><small>EL YAPIMI MOBİLYA ATÖLYESİ</small></span></div></div></div></section>
 <MaterialPreview actions={a}/>
 <section className="desk-feature wrap"><div><Eyebrow>YENİ / TASARIM MASASI</Eyebrow><h2>Fikrinize<br/><em>bir ölçü verin.</em></h2><p>Eni, derinliği, ahşabın tonu. Çalışma masanızın ilk fikrini ekranda deneyin, ölçü tercihlerinizi özel üretim talebine taşıyın.</p><ButtonLink to="/tasarim-masasi" navigate={a.navigate}>Tasarım masasına geç</ButtonLink><span className="desk-feature-note">Şematik fikir çalışması. Üretim çizimi veya fiyat teklifi değildir.</span></div><Link to="/tasarim-masasi" navigate={a.navigate} className="desk-feature-drawing" aria-label="Masanızın ölçülerini deneyin"><div className="drawing-title">ELİF / ÖLÇÜ VE MALZEME ÇALIŞMASI <Icon name="ruler"/></div><TableDrawing desk={defaultDesk} id="home-desk" compact/><div className="drawing-bottom"><span>160 × 80 × 75 cm</span><span>ŞİMDİ SİZİN ÖLÇÜNÜZ <Icon name="diagonal"/></span></div></Link></section>
 <section className="wrap section inspiration-section"><SectionHead number="05" title={<>Birlikte yaşamak için<br /><em>düşünülen mekânlar.</em></>} to="/mekan-fikirleri" navigate={a.navigate}/><div className="ideas-grid">{ideas.slice(0, 2).map((p, i) => <Link key={p.id} to={'/mekan-fikirleri/' + p.id} navigate={a.navigate} className={'idea-card idea-' + i}><Photo name={p.image} alt={p.name + ' — temsili mekân konsepti'} ratio={i ? '4/5' : '5/4'}/><div className="idea-caption"><div><span className="label">{p.type} / MEKÂN FİKRİ</span><h3>{p.name}</h3></div><Icon name="diagonal" size={26}/></div></Link>)}</div></section>
 <section className="detail-strip"><Photo name="joinery.webp" alt="Temsili ahşap birleşim detayı"/><div><Eyebrow>GÖRÜNENİN ARDINDAKİ EMEK</Eyebrow><h2>Asıl fark,<br /><em>ayrıntıda.</em></h2><p>Bir kenarın dönüşünde, bir birleşimin çizgisinde, elinizin değdiği yüzeyde.</p><TextLink to="/ozel-uretim" navigate={a.navigate}>Nasıl çalışıyoruz?</TextLink></div></section>
 <section className="wrap section journal-section"><SectionHead number="06" title={<>Atölye <em>notları.</em></>} to="/rehber" navigate={a.navigate}/><div className="journal-grid">{journal.map(p => <Link key={p.id} to={'/rehber/' + p.id} navigate={a.navigate} className="journal-card"><Photo name={p.image} alt={p.title + ' için temsili görsel'} ratio="8/5" caption={false}/><span className="label">{p.subtitle}</span><h3>{p.title}</h3><span className="read-more">Notu oku <Icon size={18}/></span></Link>)}</div></section>
 <section className="wrap faq-section"><div><Eyebrow>MERAK EDİLENLER</Eyebrow><h2>Başlamadan<br /><em>önce.</em></h2><TextLink to="/sikca-sorulan-sorular" navigate={a.navigate}>Tüm sorular</TextLink></div><Accordion items={faqs.slice(0, 3) as [
        string,
        string
    ][]}/></section>
 <Callout navigate={a.navigate}/>
 </>;
}
