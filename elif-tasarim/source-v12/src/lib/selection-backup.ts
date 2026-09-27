import {selectionEntries} from './selections';
/** A portable list of public catalog identifiers. Never a private project backup. */
export const MAX_SELECTION_FILE_BYTES=65536;
function validate(ids:unknown):string[]{
 if(!Array.isArray(ids)||ids.length>24||ids.some(id=>typeof id!=='string'||!selectionEntries.some(entry=>entry.id===id)))throw Error('Dosyada geçersiz veya bu katalogda bulunmayan bir model var. İlham dosyanız değiştirilmedi.');
 return [...new Set(ids)] as string[];
}
export function encodeSelections(ids:string[]):string{return JSON.stringify({format:'elif-inspiration',version:1,ids:validate(ids)},null,2)}
export function decodeSelections(text:string):string[]{
 if(new TextEncoder().encode(text).length>MAX_SELECTION_FILE_BYTES)throw Error('Dosya en fazla 64 KB olabilir.');
 let data:any;try{data=JSON.parse(text)}catch{throw Error('Geçerli bir Elif ilham dosyası seçin.')}
 if(!data||data.format!=='elif-inspiration'||data.version!==1)throw Error('Bu dosya Elif ilham dosyası biçiminde değil. Proje taslağı ve 3D karşılaştırma dosyaları farklıdır.');
 return validate(data.ids);
}
export function combineSelections(current:string[],incoming:string[]):string[]{const ids=[...new Set([...validate(current),...validate(incoming)])];if(ids.length>24)throw Error('Birleşen liste 24 modeli aşıyor. Önce mevcut seçkiden birkaç model çıkarın.');return ids}
