import {measurementText,type ProjectDraft} from './project';
export type ReadinessItem={id:string;title:string;detail:string;ready:boolean};
export function projectReadiness(draft:ProjectDraft,photoCount:number):ReadinessItem[]{
 const measurement=measurementText(draft),hasMeasure=measurement!=='Birlikte belirlenecek';
 const hasModel=!!draft.sourceRef||!!draft.customerNote.trim()||!!draft.note.trim();
 return [
  {id:'model',title:hasModel?'Model veya fikir hazır':'Fikrinizi görüşmede açabiliriz',detail:draft.sourceRef?.title||'Kendi proje fikriniz',ready:hasModel},
  {id:'measure',title:hasMeasure?'Ölçü bilgisi özette':'Ölçü görüşmede netleşecek',detail:hasMeasure?measurement:'Kesin ölçü bilmeden başlayabilirsiniz.',ready:hasMeasure},
  {id:'photos',title:photoCount>0?photoCount+' görsel hazır':'Görsel eklenmedi',detail:photoCount>0?'Görüşmeye ayrıca ekleyin veya ZIP dosyasını paylaşın.':'Görsel eklemek isteğe bağlıdır.',ready:photoCount>0},
  {id:'summary',title:'Özet hazır',detail:'Kontrol edip seçtiğiniz uygulamada siz gönderirsiniz.',ready:true}
 ];
}
