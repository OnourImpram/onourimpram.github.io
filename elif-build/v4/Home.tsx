import { createElement, Fragment, Component } from 'react';
import { TableDrawing } from './DesignDesk';
import { products, materials, journal, faqs } from '../lib/data';
import { image, Icon, Link, TextLink, ButtonLink, Eyebrow, Photo, ProductCard, Accordion, type PageProps } from '../components/ui';

const scenes = [
  { image: 'dining.webp', title: 'Bir masanın etrafında.', label: 'Yemek sahnesi', type: 'BİRLİKTE GEÇEN ZAMAN', path: '/mekan-fikirleri/bir-masanin-etrafinda' },
  { image: 'office.webp', title: 'Kendinize ait bir köşe.', label: 'Çalışma sahnesi', type: 'KENDİNİZE AYIRDIĞINIZ ZAMAN', path: '/mekan-fikirleri/kendinize-ait-bir-kose' },
  { image: 'sideboard.webp', title: 'Gündeliğin içindeki ritim.', label: 'Yaşam sahnesi', type: 'YAŞAMIN KÜÇÜK AYRINTILARI', path: '/mekan-fikirleri/sakin-bir-ritim' }
];
const details = [
  { label:'01 Form detayını keşfet', title:'Bir çizginin kararı.', text:'Bir kenarın dönüşü, parçanın mekânda bıraktığı boşluk. Tasarım, yalnız görüneni değil kullanımını da düşünmekle başlar.', image:'chair.webp', tag:'01 / FORM', x:27, y:26 },
  { label:'02 Birleşim detayını keşfet', title:'Bir arada, sağlam.', text:'Birleşim yöntemi, malzeme ve kullanım ihtiyacına göre seçilir. Görüntünün ardındaki yapıyı da atölyeyle birlikte konuşuruz.', image:'joinery.webp', tag:'02 / BİRLEŞİM', x:52, y:51 },
  { label:'03 Yüzey detayını keşfet', title:'Dokunduğunuz son katman.', text:'Doku, renk ve yüzey işlemi ayrı kararlardır. Son görünümü bir ekran görüntüsüyle değil, mümkün olduğunda gerçek bir numuneyle netleştiririz.', image:'wood-walnut.webp', tag:'03 / YÜZEY', x:76, y:73 }
];
const steps = [
  { label:'01 Bir fikirle başlar', title:'Bir fikirle başlar.', text:'Ölçünüz, bir referansınız ya da yalnızca bir ihtiyacınız olabilir. Önce parçanın hayatınızda nasıl bir yer bulacağını konuşuruz.', image:'sketch.webp' },
  { label:'02 Birlikte netleşir', title:'Birlikte netleşir.', text:'Ölçü, malzeme, iş kapsamı ve teslim yaklaşımı birlikte belirlenir. Teklif ve çizim onaylanmadan üretim kararı verilmez.', image:'joinery.webp' },
  { label:'03 Atölyede şekillenir', title:'Atölyede şekillenir.', text:'Onaylanan tasarım, atölyedeki çalışmanın rehberi olur. Üretim ayrıntıları ve süreç, işin gerçek kapsamına göre takip edilir.', image:'craft.webp' },
  { label:'04 Yaşamınıza katılır', title:'Yaşamınıza katılır.', text:'Teslim ve gerekiyorsa montaj birlikte planlanır. Parçanın gerçek malzemesine uygun bakım bilgileri de bu yolculuğun parçasıdır.', image:'dining.webp' }
];

export class Home extends Component<PageProps, { scene:number; detail:number; material:number; step:number; width:number; briefMaterial:number }> {
  state = { scene:0, detail:1, material:0, step:0, width:180, briefMaterial:0 };
  private root: HTMLElement | null = null;
  private observer: IntersectionObserver | null = null;
  componentDidMount() {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting){e.target.classList.add('is-visible'); this.observer?.unobserve(e.target);} }), {threshold:.07});
      this.root?.querySelectorAll('[data-reveal]').forEach(el => {el.classList.add('reveal-ready');this.observer?.observe(el);});
    }
  }
  componentWillUnmount(){this.observer?.disconnect();}
  nextTab(e:any, current:number, count:number, kind:'material'|'step') {
    if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;
    e.preventDefault();
    const next=e.key==='Home'?0:e.key==='End'?count-1:(current+(e.key==='ArrowRight'?1:count-1))%count;
    this.setState({[kind]:next} as any,()=>document.getElementById('v4-'+kind+'-'+next)?.focus());
  }
  render(){
    const a=this.props,s=this.state,scene=scenes[s.scene],detail=details[s.detail],mat=materials[s.material],step=steps[s.step],briefMat=materials[s.briefMaterial];
    const deskPath='/tasarim-masasi?'+new URLSearchParams({en:String(s.width),derinlik:'80',yukseklik:'75',malzeme:briefMat.id,ayak:'adjustable'}).toString();
    return <div className="v4-home" ref={(el)=>{this.root=el;}}>
      <section className="v4-hero hero-editorial" aria-roledescription="Sahne seçimi">
        <div className="v4-hero-photo" key={scene.image}><img data-hero-image src={image(scene.image)} alt={scene.title+' Temsili mobilya ve mekân konsepti.'} fetchPriority="high" decoding="async"/></div>
        <div className="v4-hero-veil"/>
        <div className="v4-hero-body wrap">
          <Eyebrow>İSTANBUL / EL YAPIMI MOBİLYA ATÖLYESİ</Eyebrow>
          <h1><span>Zamana</span>{' '}<span>değer katan</span>{' '}<em>mobilyalar.</em></h1>
          <p>Birlikte geçirilen anlar, kendinize ayırdığınız bir köşe.<br className="desktop-only"/> Yaşamınıza eşlik eden parçalar, kendi atölyemizden.</p>
          <div className="v4-hero-actions"><ButtonLink to="/urunler" navigate={a.navigate}>Koleksiyonu keşfet</ButtonLink><TextLink to="/teklif-al" navigate={a.navigate}>Özel üretim talebi</TextLink></div>
        </div>
        <div className="v4-hero-bottom wrap">
          <div className="v4-scene-controls" aria-label="Mekân sahneleri">{scenes.map((item,i)=><button key={item.image} aria-label={item.label} aria-pressed={s.scene===i} onClick={()=>this.setState({scene:i})}><span>0{i+1}</span><i/></button>)}</div>
          <Link to={scene.path} navigate={a.navigate} className="v4-scene-caption"><span>{scene.type}</span><strong>{scene.title}</strong><Icon name="diagonal"/></Link>
          <button className="v4-down" aria-label="Atölyeyi keşfetmeye devam et" onClick={()=>document.getElementById('v4-intro')?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant' as ScrollBehavior:'smooth'})}><Icon name="down"/></button>
        </div>
        <span className="v4-image-note">Temsili tasarım görselleri</span>
      </section>

      <section className="v4-values" id="v4-intro" aria-label="Atölyenin yaklaşımı"><div className="wrap">{[
        ['leaf','Kendi atölyemizde','Hazır alıp satmak yerine üretiriz.'],['hand','El işçiliği','Ayrıntıları birlikte düşünürüz.'],['ruler','Ölçünüze özel','Mekânınızdan yola çıkarız.'],['clock','Aileden gelen ustalık','Bildiğimiz işi özenle sürdürürüz.']
      ].map(([icon,title,desc])=><div className="v4-value" key={title}><Icon name={icon} size={27}/><h2>{title}</h2><p>{desc}</p></div>)}</div></section>

      <section className="v4-intro wrap" data-reveal><span className="v4-index">ELİF TASARIM<br/>BİR YAŞAMA BİÇİMİ</span><div><h2>Bir mobilyadan fazlası.<br/><em>Hayatın içinde bir yer.</em></h2><p>Uzayan bir sofrayı, sakin bir sabahı, size ait bir çalışma köşesini düşünün. Biz o yaşamın içinde yerini bulacak parçayı, ihtiyacınızdan başlayarak tasarlamak istiyoruz.</p></div><span className="v4-intro-mark" aria-hidden="true"><img src={image('elif-amblem.png')} alt=""/></span></section>

      <section className="v4-heritage" data-reveal>
        <div className="v4-heritage-photo"><img src={image('craft.webp')} alt="Marangozluk çalışmasını anlatan temsili rende ve el görseli" loading="lazy"/><span>USTALIĞIN İZİNDE / TEMSİLİ GÖRSEL</span><div className="v4-photo-seal" aria-hidden="true">EL EMEĞİ<br/><i>bir iz bırakır.</i></div></div>
        <div className="v4-heritage-copy"><Eyebrow>01 / ATÖLYENİN HİKÂYESİ</Eyebrow><h2>Bir meslekten<br/>fazlası.<br/><em>Bir aile mirası.</em></h2><p>Babadan öğrenilen marangozluk bilgisi, yeni kuşağın tasarım anlayışıyla buluşuyor. Elif Tasarım, kendi ürünlerini kendi atölyesinde üreten bir aile işletmesi.</p><p>Her yeni işte aynı niyet var. İhtiyacı iyi anlamak, malzemeye dikkat etmek ve yapılan işin arkasında durmak.</p><TextLink to="/atolyemiz" navigate={a.navigate}>Hikâyemize yakından bakın</TextLink></div>
        <div className="v4-heritage-side"><img src={image('chair.webp')} alt="Kavisli sandalye formu, tasarım konsepti" loading="lazy"/><span>AZ PARÇA.<br/>ÇOK KARAKTER.</span></div>
      </section>

      <section className="v4-rooms wrap" id="koleksiyon" data-reveal><div className="v4-heading"><div><Eyebrow>02 / KOLEKSİYON</Eyebrow><h2>Yaşamın her alanı için.</h2></div><div><p>Bir araya gelmek, dinlenmek, üretmek.<br/>Mekânınızın ritminden başlayan fikirler.</p><TextLink to="/urunler" navigate={a.navigate}>Tüm parçalar</TextLink></div></div>
        <div className="v4-room-grid">{[
          ['yemek','dining.webp','Bir araya gelmek.','Yemek alanı'],['oturma','lounge.webp','Kendinize yer açmak.','Oturma alanı'],['depolama','sideboard.webp','Sadeleşmek.','Depolama'],['calisma','office.webp','Kendi ritmini bulmak.','Çalışma alanı']
        ].map(([id,img,title,category],i)=><Link key={id} to={'/urunler?alan='+id} navigate={a.navigate} className={'v4-room room-'+i}><img src={image(img)} alt={category+', temsili mekân fikri'} loading="lazy"/><div><span>0{i+1} / {category}</span><h3>{title}</h3><Icon name="diagonal" size={24}/></div></Link>)}</div><p className="v4-small-note">Bu seçki, gerçek ürün kataloğu değil tasarım yönünü gösteren konseptlerden oluşur.</p>
      </section>

      <section className="v4-craft" data-reveal><div className="wrap v4-craft-grid"><div className="v4-craft-copy"><Eyebrow>03 / İNCE İŞÇİLİK</Eyebrow><h2>Asıl fark,<br/><em>ayrıntıda saklı.</em></h2><p>Güzel bir mobilya uzaktan fark edilir.<br/>Özenle düşünülmüş bir mobilya, yakından da anlatacak bir şey bulur.</p><div id="craft-detail" className="v4-detail-copy" aria-live="polite"><span>{detail.tag}</span><h3>{detail.title}</h3><p>{detail.text}</p></div><div className="v4-detail-selector" aria-label="İşçilik ayrıntıları">{details.map((d,i)=><button key={d.label} aria-label={d.label} aria-pressed={s.detail===i} onClick={()=>this.setState({detail:i})}><span>0{i+1}</span>{['Form','Birleşim','Yüzey'][i]}</button>)}</div></div><div className="v4-craft-art"><img src={image(detail.image)} alt={detail.title+' Temsili ayrıntı çalışması.'} loading="lazy"/><div className="v4-craft-frame" aria-hidden="true"/><div className="v4-craft-tag"><span>YAKINDAN BAKIN</span><strong>{detail.tag}</strong></div><span className="v4-craft-caption">Malzeme ve yöntem, gerçek iş için atölyede teyit edilir.</span></div></div></section>

      <section className="v4-selection wrap" data-reveal><div className="v4-heading"><div><Eyebrow>04 / ATÖLYE SEÇKİSİ</Eyebrow><h2>Yalın çizgiler.<br/><em>Kendine has parçalar.</em></h2></div><TextLink to="/urunler" navigate={a.navigate}>İnceleyin ve karşılaştırın</TextLink></div><div className="v4-product-grid">{products.map(p=><ProductCard key={p.id} product={p} actions={a}/>)}</div></section>

      <section className="v4-materials" data-reveal><div className="wrap v4-material-grid"><div className="v4-sample-art"><div className="v4-sample-board" key={mat.id}><img src={image(mat.image)} alt={mat.name+' için temsili doku numunesi'} loading="lazy"/><div className="v4-sample-label"><span>ELİF / MALZEME ARŞİVİ</span><strong>{mat.name}</strong><span>0{s.material+1} / NUMUNE FİKRİ</span></div></div><span className="v4-sample-measure">BİR DOKU, BİNLERCE AYRINTI.</span></div><div className="v4-material-copy"><Eyebrow>05 / MALZEMENİN DİLİ</Eyebrow><h2>Her damar,<br/><em>başka bir hikâye.</em></h2><p>Renk ilk izlenimi verir. Doku, yüzey ve kullanım biçimi kararı tamamlar.</p><div className="v4-material-tabs" role="tablist" aria-label="Ahşap numune fikirleri">{materials.map((m,i)=><button key={m.id} id={'v4-material-'+i} role="tab" aria-label={m.name+' numunesi'} aria-selected={s.material===i} aria-controls="v4-material-panel" tabIndex={s.material===i?0:-1} onKeyDown={e=>this.nextTab(e,i,materials.length,'material')} onClick={()=>this.setState({material:i})}><span style={{backgroundImage:`url(${image(m.image)})`}}/>{m.name}</button>)}</div><div id="v4-material-panel" role="tabpanel" aria-labelledby={'v4-material-'+s.material}><h3>{mat.name}</h3><p>{mat.latin} {mat.desc}</p></div><TextLink to="/malzemeler" navigate={a.navigate}>Malzemeleri daha yakından tanıyın</TextLink><p className="v4-small-note">Görünümler temsilidir. Tür, masif veya kaplama tercihi ve yüzey işlemi ayrı ayrı netleştirilir.</p></div></div></section>

      <section className="v4-bespoke wrap" data-reveal><div className="v4-bespoke-copy"><Eyebrow>06 / SİZİN ÖLÇÜNÜZDE</Eyebrow><h2>Hayalinizin<br/><em>ilk çizgisi.</em></h2><p>Bir masayla başlayalım. Enini değiştirin, bir malzeme fikri seçin. Sonra tasarım masasında derinliği, yüksekliği ve taşıyıcıyı birlikte düşünün.</p><label className="v4-brief-range"><span>Masa eni <output>{s.width}<small> cm</small></output></span><input aria-label="Başlangıç masa eni" type="range" min="100" max="240" step="5" value={s.width} onInput={e=>this.setState({width:Number(e.currentTarget.value)})}/><span className="v4-range-hints"><small>100 cm</small><small>240 cm</small></span></label><div className="v4-brief-materials" aria-label="Başlangıç malzeme fikri">{materials.map((m,i)=><button key={m.id} aria-label={'Başlangıç malzemesi '+m.name} aria-pressed={s.briefMaterial===i} onClick={()=>this.setState({briefMaterial:i})}><span style={{backgroundImage:`url(${image(m.image)})`}}/>{m.name}</button>)}</div><ButtonLink to={deskPath} navigate={a.navigate}>Tasarım masasında devam et</ButtonLink><p className="v4-small-note">Bu bir tasarım eskizidir. Fiyat, taşıma kapasitesi veya üretilebilirlik onayı değildir.</p></div><div className="v4-draft"><div className="v4-draft-top"><span>ELİF TASARIM / ÇALIŞMA NO. 01</span><span>ÖLÇÜ FİKRİ</span></div><TableDrawing id="home-preview" desk={{width:s.width,depth:80,height:75,material:briefMat.id as 'ceviz'|'mese'|'kestane',base:'adjustable',view:'perspective'}}/><div className="v4-draft-bottom"><strong>{briefMat.name} görünümü</strong><span>Yükseklik ayarlı çalışma fikri</span></div></div></section>

      <section className="v4-process" data-reveal><div className="wrap"><div className="v4-heading"><div><Eyebrow>07 / BİRLİKTE ÜRETMEK</Eyebrow><h2>Sizin fikriniz.<br/><em>Bizim ustalığımız.</em></h2></div><p>İlk konuşmadan yaşam alanınıza.<br/>Her aşamada aynı özen.</p></div><div className="v4-process-grid"><div className="v4-process-nav" role="tablist" aria-label="Üretim yolculuğu">{steps.map((st,i)=><button key={st.label} id={'v4-step-'+i} role="tab" aria-label={st.label} aria-selected={s.step===i} aria-controls="v4-process-panel" tabIndex={s.step===i?0:-1} onKeyDown={e=>this.nextTab(e,i,steps.length,'step')} onClick={()=>this.setState({step:i})}><span>0{i+1}</span><strong>{st.title}</strong><Icon name="arrow"/></button>)}</div><div id="v4-process-panel" role="tabpanel" aria-labelledby={'v4-step-'+s.step}><img src={image(step.image)} alt={step.title+' Temsili süreç görseli.'} loading="lazy"/><div><span>0{s.step+1} / YOLCULUK</span><h3>{step.title}</h3><p>{step.text}</p></div></div></div></div></section>

      <section className="v4-journal wrap" data-reveal><div className="v4-heading"><div><Eyebrow>08 / ATÖLYE NOTLARI</Eyebrow><h2>Biraz bilgi.<br/><em>Daha doğru bir başlangıç.</em></h2></div><TextLink to="/rehber" navigate={a.navigate}>Tüm notlar</TextLink></div><div className="v4-journal-grid">{journal.map((j,i)=><Link key={j.id} to={'/rehber/'+j.id} navigate={a.navigate}><Photo name={j.image} alt={j.title+' için temsili görsel'} ratio="1.5" caption={false}/><div><span>{j.subtitle}</span><h3>{j.title}</h3><p>{j.intro}</p><strong>Notu okuyun <Icon name="arrow" size={18}/></strong></div></Link>)}</div></section>
      <section className="v4-faq wrap" data-reveal><div><Eyebrow>BAŞLAMADAN ÖNCE</Eyebrow><h2>Aklınızdaki<br/><em>sorular.</em></h2><TextLink to="/sikca-sorulan-sorular" navigate={a.navigate}>Tüm sorular</TextLink></div><Accordion items={faqs.slice(0,3) as [string,string][]}/></section>
      <section className="v4-closing"><div className="v4-closing-grain" style={{backgroundImage:`url(${image('wood-walnut.webp')})`}}/><div className="wrap"><Eyebrow>GÜZEL BİR ŞEY, BİR KONUŞMAYLA BAŞLAR.</Eyebrow><h2>Birlikte, size ait<br/><em>bir şey üretelim.</em></h2><ButtonLink to="/teklif-al" navigate={a.navigate}>Projenizi konuşalım</ButtonLink><span>Bir ölçü, bir fotoğraf ya da yalnızca bir fikir.</span></div><div className="v4-closing-signature">ELİF TASARIM / İSTANBUL</div></section>
    </div>;
  }
}
