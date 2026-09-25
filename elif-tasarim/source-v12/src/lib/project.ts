import {normalizeReference} from './model-request';
import {defaultStudio,normalizeStudio,studioSummary,studioRequestMaterial,type StudioConfig} from './desk-v8';
export const business=Object.freeze({name:'Elif Tasarım',contact:'Yunus Usta',digits:'905308797169',telephone:'+905308797169',display:'+90 530 879 71 69',city:'İstanbul',verifiedBy:'Kullanıcı düzeltmesi, 25 Eylül 2026'});
export function whatsappUrl(text='Merhaba Yunus Usta. Elif Tasarım üzerinden yazıyorum, projem hakkında görüşmek istiyorum.'):string{return 'https://wa.me/'+business.digits+'?text='+encodeURIComponent(text)}
export type SourceRef={id:string;kind:'work'|'concept'|'reference'|'studio'|'idea';title:string;url:string;image?:string};
export type ProjectDraft={draftId:string;revision:number;sourceRef:SourceRef|null;systemPrefill:string;customerNote:string;studioConfig:StudioConfig|null;studioNotice:string;systemDetails:string;category:string;url:string;note:string;dimensions:string;district:string;timing:string;interpretation:string;width:string;depth:string;height:string;unit:'cm'|'mm';unknown:boolean;material:string;finish:string;details:string;readiness:string;selections:string[]};
export function emptyProject():ProjectDraft{return {draftId:'local-project',revision:0,sourceRef:null,systemPrefill:'',customerNote:'',studioConfig:null,studioNotice:'',systemDetails:'',category:'ozel-tasarim',url:'',note:'',dimensions:'',district:'',timing:'Birlikte planlayalım',interpretation:'Alanıma göre birlikte yorumlayalım',width:'',depth:'',height:'',unit:'cm',unknown:true,material:'Birlikte değerlendirelim',finish:'Birlikte değerlendirelim',details:'',readiness:'Fikir topluyorum',selections:[]}}
export function convertMeasure(value:string,from:'cm'|'mm',to:'cm'|'mm'):string|null{if(!value.trim())return '';if(!/^\d+(?:[.,]\d+)?$/.test(value.trim()))return null;const n=Number(value.replace(',','.'));if(!Number.isFinite(n)||n<=0)return null;return String(Math.round(n*(from===to?1:from==='cm'?10:0.1)*10000)/10000)}
function numericText(v:ProjectDraft):string{return [v.width,v.depth,v.height].every(n=>!!convertMeasure(n,v.unit,'mm'))?[v.width,v.depth,v.height].join(' × ')+' '+v.unit:''}
export function measurementText(v:ProjectDraft):string{return (!v.unknown?numericText(v):v.dimensions)||'Birlikte belirlenecek'}
const clone=(v:ProjectDraft):ProjectDraft=>({...v,selections:[...v.selections],sourceRef:v.sourceRef?{...v.sourceRef}:null,studioConfig:v.studioConfig?{...v.studioConfig}:null});
/** Private draft is memory-only. The selected source and author text are never interchangeable. */
export function createProjectStore(){
 let value=emptyProject(),activeKey='',studioEntry='';const legacySeeds=new Set<string>();
 const get=()=>clone(value);
 const synchronizeStudio=()=>{
  if(value.sourceRef?.kind!=='studio'||!value.studioConfig)return;
  const nums=[value.width,value.depth,value.height].map(n=>Number(convertMeasure(n,value.unit,'cm'))),ranges=[[120,220],[65,95],[80,125]];
  if(!value.unknown&&nums.every((n,i)=>Number.isInteger(n)&&n>=ranges[i][0]&&n<=ranges[i][1])){
   const material=value.material.includes('Meşe')?'mese':value.material.includes('Ceviz')?'ceviz':value.material==='Ahşap / ahşap kaplama görünümü'?'koyu':value.studioConfig.material;
   value.studioConfig=normalizeStudio({...value.studioConfig,width:nums[0],depth:nums[1],height:nums[2],material});value.studioNotice='';value.systemDetails=studioSummary(value.studioConfig);
  }else if(!value.unknown){value.studioNotice='Formdaki ölçüler 3D modelin görsel aralığı dışında veya ondalıklı. Formdaki değerler korunuyor. Sahne son gösterilebilir ölçüdedir, imalat sınırı değildir.';}
 };
 const patch=(input:Partial<ProjectDraft>)=>{
  const next={...input};
  if('note' in next)next.customerNote=next.note||'';else if('customerNote' in next)next.note=next.customerNote||'';
  if('dimensions' in next&&value.unknown&&next.dimensions!==value.dimensions&&!('width' in next)){next.width='';next.depth='';next.height='';}
  if('unknown' in next&&next.unknown!==value.unknown){const text=numericText({...value,...next});if(text)next.dimensions=text;}
  value={...value,...next,selections:next.selections?[...next.selections]:value.selections,revision:value.revision+1};
  if(['width','depth','height','unit','material'].some(k=>k in next)){
   if(!value.unknown&&numericText(value))value.dimensions=numericText(value);
   synchronizeStudio();
  }
  return get();
 };
 const adoptReference=(key:string,seed:Partial<ProjectDraft>)=>{
  if(activeKey===key)return get();activeKey=key;
  const external=normalizeReference(seed.url||'')||'';
  value={...value,category:seed.category||'ozel-tasarim',url:external,sourceRef:seed.sourceRef?{...seed.sourceRef}:{id:key,kind:external?'reference':'idea',title:seed.systemPrefill||seed.note||'Seçilen model',url:external},systemPrefill:seed.systemPrefill||seed.note||'',systemDetails:'',revision:value.revision+1};
  return get();
 };
 const getStudio=()=>({... (value.studioConfig||defaultStudio)});
 const setStudio=(config:StudioConfig)=>{const c=normalizeStudio(config),previous=value.studioConfig;value={...value,studioConfig:c,revision:value.revision+1};if(value.sourceRef?.kind==='studio'&&!value.studioNotice){value={...value,width:String(c.width),depth:String(c.depth),height:String(c.height),unit:'cm',dimensions:`${c.width} × ${c.depth} × ${c.height} cm`,systemDetails:studioSummary(c),material:previous?.material!==c.material?studioRequestMaterial(c.material):value.material};}return getStudio()};
 const handoffStudio=(config:StudioConfig)=>{
  const c=normalizeStudio(config);activeKey='studio:devir-01';
  value={...value,sourceRef:{id:'devir-01',kind:'studio',title:'Devir 01. Yükseklik ayarlı çalışma masası',url:'',image:'devir-poster.webp'},systemPrefill:'Devir 01 çekmeceli, döner yan tablalı çalışma masası konseptini alanıma göre değerlendirmek istiyorum.',url:'',category:'ozel-tasarim',studioConfig:c,studioNotice:'',width:String(c.width),depth:String(c.depth),height:String(c.height),unit:'cm',unknown:false,dimensions:`${c.width} × ${c.depth} × ${c.height} cm`,material:studioRequestMaterial(c.material),finish:c.material==='mese'?'Açık ton ve mat görünüm':c.material==='koyu'?'Koyu ton ve ahşap dokusu':'Birlikte değerlendirelim',systemDetails:studioSummary(c),revision:value.revision+1};return get();
 };
 return {get,patch,adoptReference,getStudio,setStudio,handoffStudio,openStudio:(key:string,config:StudioConfig)=>{if(key&&studioEntry!==key){studioEntry=key;setStudio(config)}return getStudio()},
  seed:(key:string,seed:Partial<ProjectDraft>,replace=false)=>{if(legacySeeds.has(key))return;legacySeeds.add(key);if(replace){patch(seed);return}const update:Partial<ProjectDraft>={};for(const [k,v]of Object.entries(seed)){const n=k as keyof ProjectDraft;if(v!==undefined&&v!==''&&(!(value as any)[n]||(n==='category'&&value.category==='ozel-tasarim')))(update as any)[n]=v;}patch(update);},
  clearSource:()=>{activeKey='';value={...value,sourceRef:null,systemPrefill:'',url:'',systemDetails:'',revision:value.revision+1};return get()},
  clear:()=>{value=emptyProject();activeKey='';studioEntry='';legacySeeds.clear()}
 };
}
export const projectStore=createProjectStore();
export function projectRows(v:ProjectDraft,files:string[],selectionLabels:string[]=[]):{label:string;value:string}[]{return [
 {label:'İhtiyaç',value:v.category},{label:'Seçilen model',value:v.sourceRef?.title||'Kendi fikrim'},
 {label:'Kaynak türü',value:v.sourceRef?({work:'Atölye arşivi',concept:'Konsept model',reference:'Dış ilham kaynağı',studio:'Devir 01 konsept stüdyosu',idea:'Fikir'}[v.sourceRef.kind]):'Yazılı fikir / fotoğraf'},
 {label:'Kaynak bağlantısı',value:normalizeReference(v.url)||v.sourceRef?.url||'Dış kaynak bağlantısı yok'},
 {label:'Modelden gelen açıklama',value:v.systemPrefill||'Belirtilmedi'},
 {label:'Kendi notum',value:v.customerNote||v.note||'Ek kişisel not yok'},
 {label:'Yaklaşık ölçü',value:measurementText(v)},{label:'Ölçü durumu',value:v.unknown?'Yaklaşık veya görüşmede belirlenecek':'Müşteri tarafından girilen ölçü, imalat onayı değil'},
 {label:'Bölge',value:v.district||'Görüşmede paylaşacağım'},{label:'Malzeme',value:v.material},{label:'Yüzey',value:v.finish},
 {label:'Kullanım ayrıntıları',value:v.details||'Birlikte değerlendirelim'},
 ...(v.systemDetails?[{label:'Konsept konfigürasyonu',value:v.systemDetails}]:[]),
 ...(v.studioNotice?[{label:'Form ve 3D uyumu',value:v.studioNotice}]:[]),
 {label:'Zaman',value:v.timing},{label:'Aşama',value:v.readiness},{label:'Yaklaşım',value:v.interpretation},
 {label:'Ek ilham seçimlerim',value:selectionLabels.length?selectionLabels.join('\n'):'Ek seçim yok'},
 {label:'Görseller',value:files.length?files.join(', ')+' (bu bağlantıda ekli değil, ayrıca paylaşacağım)':'Görsel eklenmedi'}];}
export function projectText(v:ProjectDraft,files:string[],selectionLabels:string[]=[]):string{return ['Merhaba Yunus Usta, Elif Tasarım üzerinden yazıyorum.','Proje fikrimi birlikte değerlendirmek istiyorum.','',...projectRows(v,files,selectionLabels).map(x=>x.label+', '+x.value),'','Ölçü, donanım ve uygulanabilirlik görüşmede netleşsin. Bu mesaj kesin sipariş veya üretim onayı değildir.'].join('\n')}
export function whatsappMessage(text:string){const url=whatsappUrl(text),needsAttachment=url.length>7000;const sentText=needsAttachment?'Merhaba Yunus Usta. Elif Tasarım’da ayrıntılı bir proje özeti hazırladım. Bağlantıya sığmayan özeti metin veya proje dosyası olarak ayrıca paylaşacağım. Projemi birlikte değerlendirmek istiyorum.':text;return {url:needsAttachment?whatsappUrl(sentText):url,needsAttachment,fullText:text,sentText};}
export function contextMessage(path:string,title?:string,site='https://onourimpram.github.io/elif-tasarim'):string{const route=path.split(/[?#]/)[0];if(!/^\/[a-z0-9/-]*$/.test(route)||route==='/')return 'Merhaba Yunus Usta. Elif Tasarım üzerinden yazıyorum, projem hakkında görüşmek istiyorum.';return 'Merhaba Yunus Usta. '+(title||'İncelediğim çalışma')+' hakkında görüşmek istiyorum.\n'+site.replace(/\/$/,'')+route.replace(/\/$/,'')+'/';}
export type Attachment={id:string;name:string;file:File;preview:string;sourceBytes:number};
let items:Attachment[]=[];
export const attachmentStore={get:()=>[...items],add:(a:Attachment[])=>{items=[...items,...a]},remove:(id:string)=>{items.filter(x=>x.id===id).forEach(x=>URL.revokeObjectURL(x.preview));items=items.filter(x=>x.id!==id)},clear:()=>{items.forEach(x=>URL.revokeObjectURL(x.preview));items=[]}};
export function hasPrivateDraft(){const d=projectStore.get();return Boolean(d.note||d.url||d.dimensions||d.district||d.details||attachmentStore.get().length)}
export function firstInvalidMeasure(v:Pick<ProjectDraft,'width'|'depth'|'height'|'unit'|'unknown'>):'width'|'depth'|'height'|null{if(v.unknown)return null;for(const key of ['width','depth','height']as const){const n=convertMeasure(v[key],v.unit,'mm');if(!n||Number(n)>20000)return key}return null}
