import {works,concepts,pinterestReferences,categoryName} from './portfolio';
import {pinLookup} from './pinterest';
import {searchKey} from './domain';
export type Selection={id:string;title:string;category:string;image?:string;kind:'work'|'concept'|'reference';path:string};
const target=(id:string)=>'/ilham-modelleri?hedef='+encodeURIComponent(id);
export const selectionEntries:Selection[]=[...works.map(w=>({id:'work:'+w.id,title:w.subtitle,category:w.category,image:w.images[0],kind:'work' as const,path:'/proje/'+w.id})),...concepts.map(c=>({id:'concept:'+c.id,title:c.subtitle,category:c.category,image:c.image,kind:'concept' as const,path:target('concept:'+c.id)})),...pinterestReferences.map(p=>({id:'pin:'+p.id,title:pinLookup[p.id]?.label||p.title,category:p.category,kind:'reference' as const,path:target('pin:'+p.id)}))];
export type SearchEntry=Omit<Selection,'kind'>&{kind:Selection['kind']|'page';keywords?:string};
const pages:SearchEntry[]=[
 {id:'page:beds',title:'Baza ve yatak modelleri',category:'baza-yatak',image:'bed-ceviz-yalin-closed',kind:'page',path:'/kategoriler/baza-yatak',keywords:'ahşap ceviz meşe döşemeli yatak odası depolama sandıklı baza'},
 {id:'page:basic-contact',title:'Kolay iletişim. Form olmadan başlayın',category:'ozel-tasarim',kind:'page',path:'/kolay-iletisim',keywords:'e-posta mail email telefon SMS WhatsApp iletişim'},
 {id:'page:service',title:'Hizmet ve teklif rehberi',category:'ozel-tasarim',kind:'page',path:'/hizmet-ve-teklif',keywords:'bütçe fiyat nakliye montaj keşif garanti kapora ödeme hizmet bölgesi'},
 {id:'page:faq',title:'Sıkça sorulan sorular',category:'ozel-tasarim',kind:'page',path:'/sikca-sorulan-sorular',keywords:'soru cevap teslim süre ücret iptal saklama kurtarma taslak SMS e-posta'},
 {id:'page:devir',title:'3D Stüdyo. Yükseklik ayarlı çalışma masası',category:'ozel-tasarim',image:'devir-poster.webp',kind:'page',path:'/tasarim-masasi',keywords:'Devir 01 devir01 3D üç boyutlu üçboyutlu three.js stüdyo çalışma masası yukseklik ayarli ofis masa çekmece'},
 {id:'page:bespoke',title:'Özel üretim. Nasıl ilerliyoruz?',category:'ozel-tasarim',kind:'page',path:'/ozel-uretim',keywords:'süreç özel ölçü teklif montaj keşif'},
 {id:'page:materials',title:'Malzeme ve yüzey seçenekleri',category:'ozel-tasarim',kind:'page',path:'/malzemeler',keywords:'ahşap masif lake kaplama malzeme meşe ceviz'},
 {id:'page:care',title:'Mobilya bakımını birlikte netleştirelim',category:'ozel-tasarim',kind:'page',path:'/rehber/bakim',keywords:'temizlik bakım yağ leke'},
 {id:'page:measure',title:'Yaklaşık ölçüyle nasıl başlanır?',category:'ozel-tasarim',kind:'page',path:'/rehber/olcu-alma',keywords:'ölçü almak metrekare metre derinlik'}
];
export const searchTerms=(s:string)=>searchKey(s).replace(/gardrop/g,'gardirop').replace(/\s+/g,' ').trim();
export function searchEntries(query:string):SearchEntry[]{const terms=searchTerms(query).split(' ').filter(Boolean);return [...pages,...selectionEntries].filter(x=>{const text=searchTerms(x.title+' '+categoryName(x.category)+' '+('keywords' in x?x.keywords||'':''));return terms.every(t=>text.includes(t))})}
export function validSelectionIds(value:unknown):string[]{return Array.isArray(value)?[...new Set(value.filter((id):id is string=>typeof id==='string'&&selectionEntries.some(x=>x.id===id)))].slice(0,24):[]}
export function selectedEntries(ids:string[]):Selection[]{return validSelectionIds(ids).map(id=>selectionEntries.find(x=>x.id===id)!)}
export function selectionSummary(ids:string[]):string[]{return selectedEntries(ids).map(x=>x.title+' ['+x.id+']'+(x.kind==='reference'?'\nKaynak, '+(pinLookup[x.id.slice(4)]?.canonical||'https://pin.it/'+x.id.slice(4)):''))}
export function inspirationTarget(id:string|null):Selection|null{return id?selectionEntries.find(x=>x.id===id&&['concept','reference'].includes(x.kind))||null:null}
export function targetElementId(id:string):string{return 'ilham-'+id.replace(/[^a-zA-Z0-9_-]/g,'-')}
