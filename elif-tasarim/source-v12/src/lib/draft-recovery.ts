import {emptyProject,type ProjectDraft,type SourceRef} from './project';
import {normalizeReference} from './model-request';
import {normalizeStudio,type StudioConfig} from './desk-v8';
import {workCategories} from './portfolio';
export const BACKUP_KEY='elif-v21:project-recovery';
export const BACKUP_TTL_MS=7*24*60*60*1000;
export const MAX_BACKUP_BYTES=96*1024;
type StorageLike={getItem:(key:string)=>string|null;setItem:(key:string,value:string)=>void;removeItem:(key:string)=>void};
export type BackupRead={kind:'empty'|'ready'|'expired'|'invalid'|'unavailable';draft?:ProjectDraft;savedAt?:number;expiresAt?:number};
const limits:Record<string,number>={systemPrefill:2500,customerNote:1600,studioNotice:1200,systemDetails:5000,category:60,url:2000,note:1600,dimensions:160,district:100,timing:160,interpretation:200,width:10,depth:10,height:10,material:200,finish:200,details:1200,readiness:200};
function object(x:unknown):x is Record<string,any>{return !!x&&typeof x==='object'&&!Array.isArray(x)}
function text(x:unknown,max:number):string{if(typeof x!=='string'||x.length>max||/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(x))throw Error('Taslak alanı geçersiz veya çok uzun.');return x;}
function safeDraft(raw:unknown):ProjectDraft{
 if(!object(raw))throw Error('Proje verisi bulunamadı.');
 const d=emptyProject();for(const [key,max]of Object.entries(limits)){if(key in raw)(d as any)[key]=text(raw[key],max);}
 if(!workCategories.some(c=>c.id===d.category))throw Error('Bilinmeyen proje kategorisi.');
 if(raw.unit!=='cm'&&raw.unit!=='mm')throw Error('Ölçü birimi geçersiz.');d.unit=raw.unit;
 if(typeof raw.unknown!=='boolean')throw Error('Ölçü durumu geçersiz.');d.unknown=raw.unknown;
 if(d.url&&!normalizeReference(d.url))throw Error('Taslakta güvenli olmayan model bağlantısı var.');
 d.url=normalizeReference(d.url)||'';d.customerNote=d.note=d.customerNote||d.note;
 if(raw.sourceRef!==null&&raw.sourceRef!==undefined){const x=raw.sourceRef;if(!object(x)||!['work','concept','reference','studio','idea'].includes(x.kind))throw Error('Model kaynağı geçersiz.');const url=text(x.url,2000);if(url&&!normalizeReference(url))throw Error('Model kaynağı bağlantısı geçersiz.');const ref:SourceRef={id:text(x.id,150),kind:x.kind,title:text(x.title,300),url:normalizeReference(url)||''};if(x.image!==undefined){const image=text(x.image,120);if(!/^[a-zA-Z0-9][a-zA-Z0-9_-]*(?:\.webp)?$/.test(image))throw Error('Model görsel anahtarı geçersiz.');ref.image=image;}d.sourceRef=ref;}
 if(raw.studioConfig!==null&&raw.studioConfig!==undefined){if(!object(raw.studioConfig))throw Error('3D seçenekleri geçersiz.');const normalized=normalizeStudio(raw.studioConfig as StudioConfig);for(const key of Object.keys(normalized)){if(raw.studioConfig[key]!==normalized[key as keyof StudioConfig])throw Error('3D seçenekleri desteklenen aralığın dışında.');}d.studioConfig=normalized;}
 // Public favourites and photos have their own explicit flows, never import arbitrary blobs.
 d.selections=[];return d;
}
export function encodeDraft(draft:ProjectDraft,now=Date.now()):string{const out=JSON.stringify({format:'elif-project-draft',version:1,savedAt:now,project:safeDraft(draft)},null,2);if(new TextEncoder().encode(out).length>MAX_BACKUP_BYTES)throw Error('Taslak dosyası fazla büyük.');return out;}
export function decodeDraft(input:string):ProjectDraft{if(typeof input!=='string'||new TextEncoder().encode(input).length>MAX_BACKUP_BYTES)throw Error('En fazla 96 KB taslak dosyası açılabilir.');let r:any;try{r=JSON.parse(input)}catch{throw Error('Dosya geçerli JSON değil.');}if(!object(r)||r.format!=='elif-project-draft'||r.version!==1)throw Error('Bu dosya Elif proje taslağı biçiminde değil.');return safeDraft(r.project);}
export function createDraftBackup(storage:StorageLike|null){return {
 save(draft:ProjectDraft,now=Date.now()):{ok:boolean;error?:string}{try{if(!storage)throw Error('Cihaz depolaması kullanılamıyor.');storage.setItem(BACKUP_KEY,JSON.stringify({savedAt:now,expiresAt:now+BACKUP_TTL_MS,file:encodeDraft(draft,now)}));return {ok:true}}catch{return {ok:false,error:'Cihaz kaydı yapılamadı. Taslağınız açık sekmede duruyor. Taslak dosyasını indirin.'}}},
 read(now=Date.now()):BackupRead{try{if(!storage)return {kind:'unavailable'};const text=storage.getItem(BACKUP_KEY);if(!text)return {kind:'empty'};if(text.length>MAX_BACKUP_BYTES*2)return {kind:'invalid'};let r:any;try{r=JSON.parse(text)}catch{return {kind:'invalid'}}if(!object(r)||!Number.isFinite(r.savedAt)||!Number.isFinite(r.expiresAt)||r.expiresAt-r.savedAt!==BACKUP_TTL_MS||r.savedAt>now+300000)return {kind:'invalid'};if(r.expiresAt<=now){storage.removeItem(BACKUP_KEY);return {kind:'expired'}}try{return {kind:'ready',draft:decodeDraft(r.file),savedAt:r.savedAt,expiresAt:r.expiresAt}}catch{return {kind:'invalid'}}}catch{return {kind:'unavailable'}}},
 erase():boolean{try{if(!storage)return false;storage.removeItem(BACKUP_KEY);return true}catch{return false}}
};}
