import {projectStore,type ProjectDraft} from './project';
import {createDraftBackup,type BackupRead} from './draft-recovery';
let enabled=false,message='';const listeners=new Set<()=>void>();
const notify=()=>listeners.forEach(fn=>fn());
function disk(){try{return createDraftBackup(typeof window!=='undefined'?window.localStorage:null)}catch{return createDraftBackup(null)}}
projectStore.subscribe(draft=>{if(!enabled)return;const result=disk().save(draft);if(!result.ok){enabled=false;message=result.error||'Cihaz kaydı yapılamadı.';}else message='Metin, model ve ölçüler bu cihazda kaydedildi. Fotoğraflar dahil değil.';notify()});
export const draftSession={
 status:():{enabled:boolean;message:string;record:BackupRead}=>({enabled,message,record:disk().read()}),
 subscribe(fn:()=>void){listeners.add(fn);return ()=>listeners.delete(fn)},
 enable(){const r=disk().save(projectStore.get());enabled=r.ok;message=r.ok?'Yedi günlük cihaz kurtarması açık. Sonraki metin ve ölçü değişiklikleri kaydedilir.':r.error||'Kaydedilemedi.';notify();return r.ok},
 disable(){enabled=false;const ok=disk().erase();message=ok?'Cihazdaki kurtarma kaydı silindi. Açık sekmedeki fikriniz korunuyor.':'Depolamaya erişilemedi. Tarayıcı site verilerini kullanarak kaydı temizleyin.';notify();return ok},
 restore(draft:ProjectDraft){const d=projectStore.restore(draft);notify();return d;},
};
