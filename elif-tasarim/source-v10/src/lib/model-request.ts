/** User supplied references are strings only. Never fetched from the preview. */
export function normalizeReference(raw:string):string|null {
 const value=String(raw||'').trim();
 if(!value || value.length>2000 || /[\u0000-\u0020\\]/.test(value)) return null;
 try{
  const u=new URL(value),host=u.hostname.toLowerCase().replace(/\.$/,'');
  if(u.protocol!=='https:' || u.username || u.password || !host.includes('.'))return null;
  if(host==='localhost'||host.endsWith('.localhost')||host.endsWith('.local')||host.endsWith('.internal')||host.includes(':')||/^\d+\./.test(host))return null;
  return u.href;
 }catch{return null}
}
export type ModelRequest={category:string;url:string;note:string;dimensions:string;district:string;timing:string;interpretation:string};
export function modelInputError(v:{url:string;note:string;files:unknown[]}):string|null {
 if(v.url.trim()&&!normalizeReference(v.url))return 'Geçerli bir HTTPS model bağlantısı ekleyin. Özel ağ adresleri kabul edilmez.';
 if(!v.url.trim()&&v.note.trim().length<5&&!v.files.length)return 'Bir model bağlantısı, en az bir görsel veya en az 5 karakterlik bir açıklama ekleyin.';
 return null;
}
export function modelSummary(v:ModelRequest,files:string[]):string {
 return ['ELİF TASARIM / KENDİ MODELİM','Bu özet atölyeye gönderilmedi. Kesin teklif veya sipariş değildir.','',
 'İhtiyaç, '+(v.category||'Birlikte karar verelim'),
 'Model bağlantısı, '+(normalizeReference(v.url)||'Eklenmedi'),
 'Model / proje notu, '+(v.note.trim()||'Görseller üzerinden değerlendirelim'),
 'Yaklaşık ölçü, '+(v.dimensions.trim()||'Birlikte ölçelim'),
 'Uygulama bölgesi, '+(v.district.trim()||'Görüşmede paylaşılacak'),
 'Zaman beklentisi, '+(v.timing.trim()||'Birlikte planlayalım'),
 'Tasarım yaklaşımı, '+v.interpretation,
 'Görseller, '+(files.join(', ')||'Eklenmedi'),'','Görsel dosyaları bu metne eklenmez. Görüşmede ayrıca paylaşın.',
 'Ölçü, malzeme, üretilebilirlik ve tasarımın uygunluğu atölyede değerlendirilir.'].join('\n');
}
