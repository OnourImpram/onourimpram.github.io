import {createElement,Fragment,Component} from 'react';
import {image,Icon,ButtonLink,TextLink,Eyebrow,type PageProps} from '../components/ui';
import {downloadText} from '../lib/domain';
import {defaultDesk,deskFromParams,deskQuery,deskSummary,deskMaterials,deskBases,tableGeometry,type Desk,type Point} from '../lib/desk';
const poly=(pts:Point[])=>pts.map(p=>p.join(',')).join(' ');
export function TableDrawing({desk,id='desk',compact=false}:{desk:Desk;id?:string;compact?:boolean}){
 const {project:p,w,dep,h,top}=tableGeometry(desk),mat=deskMaterials[desk.material];
 const box=(x:number,y:number,z:number,dx:number,dy:number,dz:number,key:string)=> <g key={key}><polygon points={poly([p(x,y,z),p(x+dx,y,z),p(x+dx,y,z+dz),p(x,y,z+dz)])} fill={desk.base==='wood'?'#77543c':'#48473f'}/><polygon points={poly([p(x+dx,y,z),p(x+dx,y+dy,z),p(x+dx,y+dy,z+dz),p(x+dx,y,z+dz)])} fill={desk.base==='wood'?'#4a3020':'#2e302c'}/><polygon points={poly([p(x,y,z+dz),p(x+dx,y,z+dz),p(x+dx,y+dy,z+dz),p(x,y+dy,z+dz)])} fill={desk.base==='wood'?'#9a7152':'#68695d'}/></g>;
 const topW=desk.width*2,topD=desk.depth*2;
 return <svg className={'table-drawing '+(compact?'compact':'')} viewBox="0 0 740 470" role="img" aria-label={`Temsili masa çizimi, ${desk.width} santimetre en, ${desk.depth} santimetre derinlik, ${desk.height} santimetre yükseklik`} data-width={desk.width} data-depth={desk.depth} data-height={desk.height}>
 <defs><pattern id={id+'grain'} patternUnits="userSpaceOnUse" width="320" height="320"><image href={image(mat.image)} width="320" height="320" preserveAspectRatio="xMidYMid slice"/></pattern><pattern id={id+'grid'} width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0V24" fill="none" stroke="#81745f" stroke-width=".35" opacity=".25"/></pattern><radialGradient id={id+'shadow'}><stop offset="0" stop-color="#655541" stop-opacity=".19"/><stop offset="1" stop-color="#655541" stop-opacity="0"/></radialGradient></defs>
 <rect width="740" height="470" fill={`url(#${id}grid)`}/>
 {desk.view==='top'?<g><rect x={370-topW/2} y={235-topD/2} width={topW} height={topD} rx="8" fill={`url(#${id}grain)`} stroke="#594533" stroke-width="2"/><path d={`M${370-topW/2} ${255+topD/2}H${370+topW/2}`} stroke="#76654f" stroke-dasharray="3 4"/><text x="370" y={278+topD/2} text-anchor="middle" fill="#554735" font-size="15">{desk.width} cm</text><text x={395+topW/2} y="238" fill="#554735" font-size="15">{desk.depth} cm</text></g>:<g>
 <ellipse cx="370" cy="360" rx="300" ry="80" fill={`url(#${id}shadow)`}/>
 {desk.base==='wood'?[[-w+14,-dep+8],[w-22,-dep+8],[-w+14,dep-16],[w-22,dep-16]].map(([x,y],i)=>box(x,y,0,8,8,h-4,'leg'+i)):[-w+20,w-27].map((x,i)=><g key={i}>{box(x,-dep+4,0,9,dep*2-8,3,'foot'+i)}{box(x, -4,3,9,8,h-7,'post'+i)}{desk.base==='adjustable'&&box(x-.6,-4.6,h*.46,10.2,9.2,3,'collar'+i)}{box(x,-dep+4,h-8,9,dep*2-8,4,'arm'+i)}</g>)}
 <polygon points={poly([p(-w,dep,h-4),p(w,dep,h-4),p(w,dep,h),p(-w,dep,h)])} fill="#654329"/><polygon points={poly([p(w,-dep,h-4),p(w,dep,h-4),p(w,dep,h),p(w,-dep,h)])} fill="#4b3222"/>
 <polygon data-testid="desk-top" points={poly(top)} fill={`url(#${id}grain)`} stroke="#62472f" stroke-width="1"/>
 <polygon points={poly(top)} fill={mat.color} opacity=".13"/>
 {!compact&&<g fill="#6c5b46" stroke="#8d7a61" stroke-width=".7"><path d={`M${p(-w,dep+20,h-12).join(' ')}L${p(w,dep+20,h-12).join(' ')}`} stroke-dasharray="3 4"/><text x={p(0,dep+20,h-12)[0]} y={p(0,dep+20,h-12)[1]+23} font-size="15" text-anchor="middle" stroke="none">{desk.width} cm</text><path d={`M${p(w+25,dep,h).join(' ')}L${p(w+25,-dep,h).join(' ')}`} stroke-dasharray="3 4"/><text x={p(w+25,0,h)[0]+17} y={p(w+25,0,h)[1]+5} font-size="15" stroke="none">{desk.depth} cm</text><path d={`M${p(-w-22,-dep,0).join(' ')}L${p(-w-22,-dep,h).join(' ')}`} stroke-dasharray="3 4"/><text x={p(-w-22,-dep,h/2)[0]-10} y={p(-w-22,-dep,h/2)[1]} font-size="15" text-anchor="end" stroke="none">{desk.height} cm</text></g>}
 </g>}
 </svg>
}
export class DesignDesk extends Component<PageProps & {query?:string},{desk:Desk;sharing:boolean}>{
 constructor(props:PageProps&{query?:string}){super(props);this.state={desk:deskFromParams(new URLSearchParams(props.query||'')),sharing:false}}
 change=(key:keyof Desk,value:any)=>this.setState(s=>({desk:{...s.desk,[key]:value}}));
 commitNumber=(key:'width'|'depth'|'height',raw:string)=>{
  const ranges={width:[100,240],depth:[50,100],height:[60,125]};const [min,max]=ranges[key];const n=Number(raw.trim());
  if(!/^\d+$/.test(raw.trim())||!Number.isSafeInteger(n)||n<min||n>max){this.props.notify(`Ölçü ${min} ile ${max} cm arasında tam sayı olmalı.`);return false;}
  this.change(key,n);return true;
 };
 shareURL=()=>{
  const base=typeof location!=='undefined'&&/^https?:$/.test(location.protocol)?location.href.split('#')[0]:'https://onourimpram.github.io/elif-tasarim/';
  return base+'#/tasarim-masasi?'+deskQuery(this.state.desk);
 };
 render(){const d=this.state.desk,a=this.props;return <>
 <section className="desk-intro wrap"><Eyebrow>ELİF / DİJİTAL TASARIM MASASI</Eyebrow><div><h1>Önce bir fikir.<br/><em>Sonra sizin parçanız.</em></h1><p>Ölçüyü değiştirin. Dokuyu seçin. Mekânınıza nasıl bir parça yakışacağını birlikte düşünmeye başlayalım.</p></div></section>
 <section className="desk-layout wrap" aria-label="Tasarım masası"><div className="desk-paper"><div className="desk-paper-top"><span>ÇALIŞMA NO. 01 / MASA</span><div role="group" aria-label="Çizim görünümü"><button aria-pressed={d.view==='perspective'} onClick={()=>this.change('view','perspective')}>Perspektif</button><button aria-pressed={d.view==='top'} onClick={()=>this.change('view','top')}>Üstten</button></div></div><TableDrawing desk={d}/><div className="desk-paper-bottom"><span>ET / TASARIM ÇALIŞMASI</span><span>Şematik çizim. Teknik üretim projesi değildir.</span></div><div className="desk-live" aria-live="polite">{deskMaterials[d.material].name} <i/> {d.width} × {d.depth} × {d.height} cm <i/> {deskBases[d.base]}</div></div>
 <div className="desk-controls"><Eyebrow>01 / ÖLÇÜYLE BAŞLAYALIM</Eyebrow><h2>Size ne kadar<br/><em>yer açalım?</em></h2>
 {([['width','En',100,240],['depth','Derinlik',50,100],['height','Yükseklik',60,125]] as const).map(([key,label,min,max])=><div className="desk-slider" key={key}><span>{label}<span className="v5-desk-number"><input key={key+':'+d[key]} type="number" inputMode="numeric" min={min} max={max} step={1} defaultValue={d[key]} aria-label={'Masa '+({width:'eni',depth:'derinliği',height:'yüksekliği'}[key])+', santimetre'} onBlur={e=>{if(!this.commitNumber(key,e.currentTarget.value))e.currentTarget.value=String(d[key]);}} onKeyDown={e=>{if(e.key==='Enter'){e.preventDefault();e.currentTarget.blur();}}}/><small>cm</small></span></span><input aria-label={'Masa '+label.toLocaleLowerCase('tr')} type="range" min={min} max={max} step="1" value={d[key]} onInput={e=>this.change(key,Number(e.currentTarget.value))}/><span className="slider-bounds"><small>{min} cm</small><small>{max} cm</small></span></div>)}
 <div className="desk-choice"><span className="field-label">02 / MALZEME FİKRİ</span><div className="desk-swatches">{Object.entries(deskMaterials).map(([id,m])=><button key={id} aria-pressed={d.material===id} aria-label={m.name+' malzeme fikri'} onClick={()=>this.change('material',id)}><span style={{backgroundImage:`url(${image(m.image)})`}}/>{m.name}</button>)}</div></div>
 <label className="desk-choice"><span className="field-label">03 / TAŞIYICI YAKLAŞIMI</span><select aria-label="Taşıyıcı yaklaşımı" value={d.base} onChange={e=>this.change('base',e.currentTarget.value)}>{Object.entries(deskBases).map(([k,v])=><option key={k} value={k}>{v}</option>)}</select></label>
 <ButtonLink to={'/teklif-al?urun=rota-calisma-masasi&'+deskQuery(d)} navigate={a.navigate}>Bu fikirle devam et</ButtonLink><button className="text-link desk-download" onClick={()=>downloadText('elif-tasarim-fikrim.txt',deskSummary(d))}>Tasarım özetini indir <Icon name="download"/></button>
 <button className="text-link desk-download" type="button" aria-expanded={this.state.sharing} onClick={()=>this.setState({sharing:!this.state.sharing})}>Tasarım bağlantısını göster <Icon name="diagonal"/></button>
 {this.state.sharing&&<div className="v5-share-box"><label>Paylaşılabilir tasarım bağlantısı<input type="text" readOnly value={this.shareURL()} aria-label="Paylaşılabilir tasarım bağlantısı" onFocus={e=>e.currentTarget.select()}/></label><button type="button" onClick={async()=>{try{await navigator.clipboard.writeText(this.shareURL());a.notify('Tasarım bağlantısı kopyalandı.');}catch{a.notify('Bağlantı alanını seçip kopyalayabilirsiniz.');}}}>Bağlantıyı kopyala <Icon size={16}/></button><p>Yalnız ölçü ve malzeme fikrini paylaşır. Kişisel bilgi veya sipariş içermez.</p></div>}
 </div></section><div className="wrap desk-disclaimer"><Icon name="info"/><p>Bu çalışma bir görsel fikir aracıdır. Seçenekler üretilebilirlik veya fiyat onayı değildir. Özellikle yükseklik mekanizması, tabla ağırlığı ve montaj uyumu atölye tarafından doğrulanmalıdır. Malzemeler temsili numunelerdir. Bilgi gönderilmez.</p></div>
 </>}
}
