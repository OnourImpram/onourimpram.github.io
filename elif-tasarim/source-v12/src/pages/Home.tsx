import {createElement,Fragment,Component} from 'react';
import {Link,Icon,ButtonLink,TextLink,Eyebrow,Accordion,Photo,type PageProps} from '../components/ui';
import {VImage,WorkCard,SourceTag,ModelCallout} from '../components/PortfolioUI';
import {works,featuredWorks,workCategories,concepts} from '../lib/portfolio';
import {ConceptCard} from './Portfolio';
import {categorySupport} from './V7Pages';
import {defaultDesk,deskQuery,type Desk} from '../lib/desk';
const scenes=[
 {image:'concept-hero',alt:"Ahşap görünümlü oval yemek masası, sandalyeler ve aydınlatmalı mutfak. Konsept model.",caption:'Yaşamın etrafında toplandığı yer.',label:'Yemek',kind:'concept'},
 {image:'concept-gardrop',alt:"Cam kapaklı gardıroplar, aydınlatılmış raflar ve orta depolama adası. Giyinme odası konsepti.",caption:'Her ayrıntıya yer açan bir düzen.',label:'Giyinme',kind:'concept'},
 {image:'concept-kahve',alt:"Cam yan vitrinler, kemerli raflar ve çekmeceli kahve dolabı. Konsept model.",caption:'Günün en sevdiğiniz köşesi.',label:'Kahve',kind:'concept'},
 {image:'concept-sehpa',alt:"Oval orta sehpa ve iç içe zigonlar bulunan oturma alanı. Konsept model.",caption:'Bir arada, doğal ve yalın.',label:'Salon',kind:'concept'},
 {image:'concept-tv',alt:"Dikey çizgili TV paneli, açık raflar ve kapalı alt depolama. Konsept model.",caption:'Mekânınıza göre düşünülmüş.',label:'TV',kind:'concept'}
];
type HeroMode='running'|'hover'|'focus'|'paused'|'reduced'|'hidden'|'offscreen'|'loading'|'idle';
export class Home extends Component<PageProps,{scene:number;desk:Desk;chapter:number;paused:boolean;requested:number[];mode:HeroMode;duration:number;cycle:number;announcement:string;notice:string}>{
 state={scene:0,desk:{...defaultDesk},chapter:0,paused:false,requested:[0,1],mode:'idle' as HeroMode,duration:2200,cycle:0,announcement:'',notice:''};
 private alive=false;private serial=0;private timer:number|undefined;private hero:HTMLElement|null=null;private observer:IntersectionObserver|null=null;private visible=true;private hover=false;private focus=false;private motion:MediaQueryList|null=null;private hasAdvanced=false;
 componentDidMount(){
  this.alive=true;this.motion=matchMedia('(prefers-reduced-motion: reduce)');
  this.motion.addEventListener('change',this.reschedule);document.addEventListener('visibilitychange',this.reschedule);
  if(this.hero){this.observer=new IntersectionObserver(es=>{const visible=es[0].isIntersecting;if(visible!==this.visible){this.visible=visible;this.reschedule()}});this.observer.observe(this.hero)}
  this.reschedule();
 }
 componentWillUnmount(){this.alive=false;this.serial++;window.clearTimeout(this.timer);this.observer?.disconnect();this.motion?.removeEventListener('change',this.reschedule);document.removeEventListener('visibilitychange',this.reschedule)}
 reschedule=()=>{
  const ticket=++this.serial;window.clearTimeout(this.timer);this.timer=undefined;
  const mode:HeroMode=this.motion?.matches?'reduced':this.state.paused?'paused':document.hidden?'hidden':!this.visible?'offscreen':this.focus?'focus':this.hover?'hover':'running';
  const duration=this.hasAdvanced?3200:2200;
  this.setState(s=>({mode,duration,cycle:s.cycle+1}),()=>{
   if(!this.alive||mode!=='running'||ticket!==this.serial)return;
   this.timer=window.setTimeout(()=>{this.timer=undefined;if(ticket===this.serial)this.setScene((this.state.scene+1)%scenes.length,false)},duration);
  });
 };
 warm=(scene:number)=>{const next=(scene+1)%scenes.length;if(!this.state.requested.includes(next))this.setState(s=>({requested:[...s.requested,next]}))};
 setScene=(scene:number,manual=true):Promise<void>=>{
  const token=++this.serial;window.clearTimeout(this.timer);this.timer=undefined;
  return new Promise(resolve=>this.setState(s=>({requested:s.requested.includes(scene)?s.requested:[...s.requested,scene],mode:'loading',notice:''}),async()=>{
   let timeout:number|undefined;
   try{
    const img=this.hero?.querySelector('[data-slide="'+scene+'"] img') as HTMLImageElement|null;
    if(!img)throw Error('image-unavailable');
    await Promise.race([img.decode(),new Promise((_,reject)=>{timeout=window.setTimeout(()=>reject(Error('image-timeout')),8000)})]);
    if(!img.naturalWidth)throw Error('image-empty');
    if(this.alive&&token===this.serial){this.hasAdvanced=true;this.setState({scene,announcement:manual?scenes[scene].label+' sahnesi, '+(scene+1)+' / 5.':''},()=>{this.warm(scene);this.reschedule()})}
   }catch{
    if(this.alive&&token===this.serial)this.setState({paused:true,notice:'Bu görsel yüklenemedi. Başka bir mekân seçebilirsiniz.',announcement:manual?'Görsel yüklenemedi. Önceki görsel korunuyor.':''},this.reschedule);
   }finally{window.clearTimeout(timeout);resolve()}
  }));
 };
 onHeroFocus=(e:any)=>{this.focus=true;if(e.target?.matches?.(':focus-visible'))this.setState({paused:true},this.reschedule);else this.reschedule()};
 onHeroBlur=(e:any)=>{if(!e.currentTarget.contains(e.relatedTarget as Node)){this.focus=false;this.reschedule()}};
 togglePlayback=()=>{
  if(this.motion?.matches)return;
  if(this.state.paused){this.focus=false;this.hover=false;this.setState({paused:false,notice:''},this.reschedule)}
  else this.setState({paused:true},this.reschedule);
 };
 statusText(){
  if(this.state.notice)return this.state.notice;
  if(this.state.mode==='reduced')return 'Hareket azaltma açık. Oklarla keşfedin.';
  if(this.state.mode==='loading')return 'Sıradaki görsel hazırlanıyor…';
  if(this.state.mode==='paused')return 'Duraklatıldı. Oklarla keşfedin.';
  if(this.state.mode==='hover'||this.state.mode==='focus')return 'Seçim sırasında geçiş bekletiliyor.';
  return 'Otomatik seçki · Oklarla da gezebilirsiniz.';
 }
 render(){const a=this.props,s=this.state,scene=scenes[s.scene];return <div className="v6-home">
 <section className="v6-hero v232-carousel v234-carousel" ref={el=>this.hero=el} aria-label="Elif Tasarım açılış seçkisi" aria-roledescription="slayt gösterisi" data-playback={s.mode} onFocusCapture={this.onHeroFocus} onBlurCapture={this.onHeroBlur}>
  {scenes.map((sc,i)=><div className={'v6-hero-scene v232-scene'+(i===s.scene?' is-active':'')} key={sc.image} aria-hidden={i!==s.scene} data-slide={i}>{s.requested.includes(i)&&<VImage asset={sc.image} alt={sc.alt} eager priority={i===0?'high':'low'} full sizes="100vw"/>}</div>)}
  <div className="v6-hero-shade"/>
  <div className="wrap v6-hero-inner"><Eyebrow>İSTANBUL / EL YAPIMI MOBİLYA ATÖLYESİ</Eyebrow><h1>Zamana değer<br/>{" "}<em>katan mobilyalar.</em></h1><p>İstanbul’daki aile atölyemizden, yaşam alanınıza.<br/>Ölçünüze ve ihtiyacınıza göre, doğrudan ustasıyla.</p><div className="v6-hero-actions"><ButtonLink to="/projeler" navigate={a.navigate}>Bitirdiğimiz işleri keşfedin</ButtonLink><TextLink to="/modelini-getir" navigate={a.navigate} light>Kendi modelinizi getirin</TextLink></div></div>
  <div className="wrap v6-hero-bottom">
   <div className="hero-sequence" onMouseEnter={()=>{this.hover=true;this.reschedule()}} onMouseLeave={()=>{this.hover=false;this.reschedule()}}>
    <div className="hero-sequence-head"><div><span className="hero-sequence-label">BEŞ MEKÂNLIK KONSEPT SEÇKİSİ</span><span className="hero-sequence-position">{scene.label}<small>{String(s.scene+1).padStart(2,'0')} / 05</small></span></div>
     <div className="hero-sequence-actions">
      <button type="button" className="v232-pause" aria-label={s.paused?'Otomatik geçişi başlat':'Otomatik geçişi durdur'} aria-pressed={s.paused} disabled={s.mode==='reduced'} title={s.mode==='reduced'?'Sisteminizin hareket azaltma tercihi açık':undefined} onClick={this.togglePlayback}>{s.mode==='reduced'?'Sabit':s.paused?'Oynat':'Duraklat'}</button>
      <button type="button" className="hero-sequence-arrow" aria-label="Önceki mekân" onClick={()=>this.setScene((s.scene+4)%5)}><Icon name="arrow"/></button>
      <button type="button" className="hero-sequence-arrow" aria-label="Sonraki mekân" onClick={()=>this.setScene((s.scene+1)%5)}><Icon name="arrow"/></button>
     </div>
    </div>
    <div className="v6-scene-controls" role="group" aria-label="Açılış sahneleri">{scenes.map((sc,i)=><button type="button" key={sc.image} onClick={()=>this.setScene(i)} aria-pressed={s.scene===i} aria-label={String(i+1).padStart(2,'0')+' '+sc.label+' sahnesi'}><span className="hero-sequence-choice"><span>{String(i+1).padStart(2,'0')}</span><span className="scene-word">{sc.label}</span></span><i aria-hidden="true"><span key={s.cycle+'-'+i} className="hero-sequence-progress" style={{animationDuration:s.duration+'ms'}}/></i></button>)}</div>
    <p className="hero-sequence-status"><span aria-hidden="true"/>{this.statusText()}</p>
   </div>
   <span className="v6-hero-caption">{scene.caption}</span><button className="hero-down" aria-label="Bitirdiğimiz işlere kaydır" onClick={()=>document.getElementById('bitirdigimiz-isler')?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant' as ScrollBehavior:'smooth'})}><Icon name="down"/></button>
  </div>
  <span className="hero-source">KONSEPT MODEL</span><span className="sr-only" role="status" aria-live="polite" aria-atomic="true">{s.announcement}</span>
 </section>
 <section id="bitirdigimiz-isler" className="wrap v6-section home-works"><div className="v6-heading"><div><Eyebrow>01 / ATÖLYEDEN YAŞAMA</Eyebrow><h2>Bitirdiğimiz işlerden<br/><em>seçkiler.</em></h2></div><div><p>Gerçek mekânlar, gerçek çalışmalar.<br/>Yunus Usta'nın paylaştığı uygulama arşivinden.</p><TextLink to="/projeler" navigate={a.navigate}>Tüm çalışmalar</TextLink></div></div><div className="work-grid">{featuredWorks.map((id,i)=><WorkCard key={id} work={works.find(w=>w.id===id)!} actions={a} featured index={i}/>)}</div></section>
 <nav className="wrap v9-category-ribbon" aria-label="Yaşam alanına göre keşfet">{workCategories.map(c=><Link key={c.id} to={'/kategoriler/'+c.id} navigate={a.navigate}><div><VImage asset={categorySupport[c.id]?.asset||c.image} alt={c.name+(categorySupport[c.id]?' atölye arşivi':' konsept seçkisi')} sizes="180px"/><span>{categorySupport[c.id]?'Atölye arşivi':'Konsept'}</span></div><strong>{c.name}</strong><Icon name="diagonal" size={15}/></Link>)}</nav>
 <section className="home-yunus"><div className="home-yunus-image"><VImage asset="work-joinery" alt="Ahşap kamelya çalışmasından gerçek çatı ve birleşim ayrıntıları" sizes="(max-width: 800px) 100vw, 60vw"/><span>UYGULAMA ARŞİVİNDEN BİR AYRINTI</span></div><div className="home-yunus-copy"><Eyebrow>YUNUS USTA'NIN ELİNDEN ÇIKANLAR</Eyebrow><h2>Bir meslekten fazlası.<br/><em>Bir aile mirası.</em></h2><p>Babasından öğrendiği marangozluk, Yunus Usta'nın elinde bugünün yaşam alanlarına uyarlanıyor. Her iş, bir ihtiyacı dinlemekle başlıyor.</p><p>Ölçüyü birlikte düşünmek, malzemeyi doğru seçmek ve atölyedeki emeği yerinde uygulamayla tamamlamak. Bizim için işin özü bu.</p><TextLink to="/hakkimizda" navigate={a.navigate} light>Hikâyemizi keşfedin</TextLink><div className="yunus-notes"><span>Aile atölyesi</span><span>Ölçüye özel</span><span>Üretim & uygulama</span></div></div></section>
 <section className="v6-process"><div className="wrap"><div className="v6-heading"><div><Eyebrow>03 / FİKİRDEN UYGULAMAYA</Eyebrow><h2>Birlikte <em>nasıl ilerleriz?</em></h2></div><p>Acele bir seçim değil, iyi düşünülmüş bir parça. Her aşamada ihtiyacınızı ve kullanımınızı merkeze alırız.</p></div><div className="process-steps">{[['Fikrinizi dinleriz.','Bir Pinterest bağlantısı, fotoğraf veya kendi çiziminiz. Önce nasıl kullanacağınızı konuşuruz.'],['Ölçüyü netleştiririz.','Malzeme, renk, donanım ve alanın ölçülerini birlikte değerlendiririz. Teklif bu ayrıntılarla şekillenir.'],['Atölyede şekillenir.','Üzerinde anlaşılan tasarım, ölçü ve malzemeyle üretim planlanır.'],['Yerini bulur.','Teslim ve gerekiyorsa yerinde uygulama, projenin koşullarına göre birlikte düzenlenir.']].map(([title,text],i)=><article key={title}><span className="process-number">0{i+1}</span><h3>{title}</h3><p>{text}</p></article>)}<TextLink to="/hizmet-ve-teklif" navigate={a.navigate}>Teklif kapsamını birlikte netleştirelim</TextLink></div></div></section>
 <section className="wrap v11-studio-invitation" id="uc-boyutlu-studyo"><div><Eyebrow>3D STÜDYO / ÖLÇÜNÜZE GÖRE</Eyebrow><h2>Bir masa.<br/><em>Size göre yeni bir düzen.</em></h2><p>Yüksekliği ve ölçüleri değiştirin. Çekmeceleri, döner yan yüzeyi ve çift taraflı kitaplıklarla çalışma alanınızı keşfedin.</p><ButtonLink to="/tasarim-masasi" navigate={a.navigate}>3D stüdyoyu keşfet</ButtonLink><small>Görsel bir konsepttir. İmalat ve mekanizma uygunluğu atölye görüşmesinde netleşir.</small></div><Link className="v11-studio-poster" to="/tasarim-masasi" navigate={a.navigate}><Photo name="devir-atolye-v23.webp" alt="Çalışma masası modelinin iki kitaplıklı çalışma ortamı, gerçek Three.js sahnesinden konsept görünümü" ratio="3/2"/><span className="v11-poster-action"><Icon name="grid"/>Keşfet. Döndür. Birlikte düşün.</span><SourceTag kind="concept"/></Link></section>
 <section className="v6-final-cta"><div className="wrap"><Eyebrow>SİZİN FİKRİNİZ. BİZİM USTALIĞIMIZ.</Eyebrow><h2>Aklınızdaki modeli gönderin.<br/><em>Birlikte yorumlayalım.</em></h2><ButtonLink to="/modelini-getir" navigate={a.navigate}>Fikrimi paylaşayım</ButtonLink><p>Bir fotoğraf, bir bağlantı ya da yalnızca bir fikir.</p><TextLink to="/iletisim" navigate={a.navigate} light>Doğrudan Yunus Usta ile görüşün</TextLink></div></section>
 </div>}
}
