import {works,concepts,pinterestReferences,categoryName} from './portfolio';
import {pinLookup} from './pinterest';
export type Selection={id:string;title:string;category:string;image?:string;kind:'work'|'concept'|'reference';path:string};
export const selectionEntries:Selection[]=[...works.map(w=>({id:'work:'+w.id,title:w.subtitle,category:w.category,image:w.images[0],kind:'work' as const,path:'/proje/'+w.id})),...concepts.map(c=>({id:'concept:'+c.id,title:c.subtitle,category:c.category,image:c.image,kind:'concept' as const,path:'/ilham-modelleri'})),...pinterestReferences.map(p=>({id:'pin:'+p.id,title:pinLookup[p.id]?.label||p.title,category:p.category,kind:'reference' as const,path:'/ilham-modelleri'}))];
export function validSelectionIds(value:unknown):string[]{return Array.isArray(value)?[...new Set(value.filter((id):id is string=>typeof id==='string'&&selectionEntries.some(x=>x.id===id)))].slice(0,24):[]}
export function selectedEntries(ids:string[]):Selection[]{const good=validSelectionIds(ids);return good.map(id=>selectionEntries.find(x=>x.id===id)!)}
export function selectionSummary(ids:string[]):string[]{return selectedEntries(ids).map(x=>x.title+' ['+x.id+']'+(x.kind==='reference'?'\nKaynak, '+(pinLookup[x.id.slice(4)]?.canonical||'https://pin.it/'+x.id.slice(4)):''))}
