import {works,concepts,pinterestReferences,workCategories,categoryName} from './portfolio';
import {pinLookup} from './pinterest';
import {normalizeReference} from './model-request';
import type {ProjectDraft} from './project';
/** Only known source identifiers resolve to a card. Free text remains untrusted text. */
export function sourceContext(query:string):{key:string;seed:Partial<ProjectDraft>}|null{
 const site=(typeof window!=='undefined'&&(window as any).__ELIF_SITE_URL__||'https://onourimpram.github.io/elif-tasarim').replace(/\/$/,''),q=new URLSearchParams(query),id=q.get('kaynak')||'',category=workCategories.some(c=>c.id===q.get('kategori'))?q.get('kategori')!:'ozel-tasarim';
 const w=works.find(w=>id==='work:'+w.id),c=concepts.find(c=>id==='concept:'+c.id),p=pinterestReferences.find(p=>id==='pin:'+p.id);
 if(w)return {key:id,seed:{category:w.category,url:'',systemPrefill:w.subtitle+' benzeri bir çalışmayı alanıma göre değerlendirmek istiyorum.',sourceRef:{id,kind:'work',title:w.subtitle,url:site+'/proje/'+w.id+'/',image:w.images[0]}}};
 if(c)return {key:id,seed:{category:c.category,url:'',systemPrefill:c.subtitle+' fikrinden başlayarak kendi modelimi konuşmak istiyorum.',sourceRef:{id,kind:'concept',title:c.subtitle,url:site+'/ilham-modelleri/',image:c.image}}};
 if(p){const url='https://pin.it/'+p.id;return {key:id,seed:{category:p.category,url,systemPrefill:'Bu dış kaynak modelinden ilhamla bir çalışma istiyorum.',sourceRef:{id,kind:'reference',title:pinLookup[p.id]?.label||p.title,url}}};}
 if(!q.has('ref')&&!q.has('fikir')&&!q.has('kategori'))return null;
 const url=normalizeReference(q.get('ref')||'')||'',note=(q.get('fikir')||'').slice(0,1600);
 return {key:new URLSearchParams({category,url,note}).toString(),seed:{category,url,systemPrefill:note,sourceRef:{id:'input',kind:url?'reference':'idea',title:url?'Paylaştığınız model':categoryName(category)+' fikri',url}}};
}
