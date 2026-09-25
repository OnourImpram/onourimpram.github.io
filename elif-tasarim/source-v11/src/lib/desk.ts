export type Desk = {width:number;depth:number;height:number;material:'ceviz'|'mese'|'kestane';base:'wood'|'metal'|'adjustable';view:'perspective'|'top'}
export const defaultDesk:Desk={width:160,depth:80,height:75,material:'ceviz',base:'metal',view:'perspective'}
export const deskMaterials={ceviz:{name:'Ceviz',image:'wood-walnut.webp',color:'#755039'},mese:{name:'Meşe',image:'wood-oak.webp',color:'#bca077'},kestane:{name:'Kestane',image:'wood-chestnut.webp',color:'#967452'}}
export const deskBases={wood:'Ahşap ayak',metal:'Metal taşıyıcı',adjustable:'Yükseklik ayarlı'}
const inRange=(raw:string|null,min:number,max:number,fallback:number)=>{if(raw===null||!/^\d+(?:[.,]\d+)?$/.test(raw.trim()))return fallback;const n=Number(raw.replace(',','.'));return Number.isFinite(n)&&n>=min&&n<=max?Math.round(n):fallback}
export function deskFromParams(p:URLSearchParams):Desk{return {width:inRange(p.get('en'),100,240,160),depth:inRange(p.get('derinlik'),50,100,80),height:inRange(p.get('yukseklik'),60,125,75),material:(['ceviz','mese','kestane'].includes(p.get('malzeme')||'')?p.get('malzeme'):'ceviz') as Desk['material'],base:(['wood','metal','adjustable'].includes(p.get('ayak')||'')?p.get('ayak'):'metal') as Desk['base'],view:'perspective'}}
export function deskQuery(d:Desk){return new URLSearchParams({en:String(d.width),derinlik:String(d.depth),yukseklik:String(d.height),malzeme:d.material,ayak:d.base}).toString()}
export function deskSummary(d:Desk){return ['ELİF TASARIM / TASARIM MASASI','Sipariş değildir. Üretilebilirlik, mekanizma ve son ölçüler atölye onayına bağlıdır.','Bu özet atölyeye gönderilmedi.','',`Ölçü fikri: ${d.width} × ${d.depth} × ${d.height} cm`,`Malzeme fikri: ${deskMaterials[d.material].name}`,`Taşıyıcı fikri: ${deskBases[d.base]}`,'Malzeme görüntüsü temsilidir. Masif veya kaplama tercihi, yüzey işlemi ve taşıma kapasitesi ayrıca değerlendirilir.'].join('\n')}
export type Point=[number,number]
export function tableGeometry(d:Desk){
 const scale=1.55,cx=370,cy=334;
 const project=(x:number,y:number,z:number):Point=>[cx+(x-y)*scale,cy+(x+y)*scale*.37-z*scale];
 const w=d.width/2,dep=d.depth/2,h=d.height;
 return {top:[project(-w,-dep,h),project(w,-dep,h),project(w,dep,h),project(-w,dep,h)],project,w,dep,h};
}
