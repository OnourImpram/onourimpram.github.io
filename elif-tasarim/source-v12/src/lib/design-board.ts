import {defaultStudio,normalizeStudio,studioQuery,type StudioConfig} from './desk-v8';
export type SavedDesign={id:string;config:StudioConfig;preview:string|null};
export function parseWholeNumber(raw:string,min:number,max:number):number|null{const s=raw.trim();if(!/^\d+$/.test(s))return null;const n=Number(s);return Number.isSafeInteger(n)&&n>=min&&n<=max?n:null;}
function verifiedConfig(value:unknown):StudioConfig{
 if(!value||typeof value!=='object'||Array.isArray(value))throw Error('Geçerli bir masa seçeneği bekleniyor.');
 const x=value as Record<string,unknown>,keys=Object.keys(defaultStudio);
 if(Object.keys(x).length!==keys.length||Object.keys(x).some(k=>!keys.includes(k)))throw Error('Dosyada beklenmeyen ya da eksik alan var.');
 const normalized=normalizeStudio(x as Partial<StudioConfig>);
 if(keys.some(k=>x[k]!==normalized[k as keyof StudioConfig]))throw Error('Masa seçenekleri desteklenen aralığın dışında.');
 return normalized;
}
/** Public concept options only. Ephemeral in this tab. Never store customer notes or photos. */
export class DesignBoard{
 private entries:SavedDesign[]=[];private serial=0;
 list():SavedDesign[]{return this.entries.map(x=>({...x,config:{...x.config}}));}
 add(raw:StudioConfig,preview:string|null=null):{status:'added'|'duplicate'|'full';id:string}{
  const config=normalizeStudio(raw),key=studioQuery(config),old=this.entries.find(x=>studioQuery(x.config)===key);
  const safePreview=preview&&/^data:image\/png;base64,[a-zA-Z0-9+/=]+$/.test(preview)&&preview.length<4500000?preview:null;
  if(old){if(safePreview)old.preview=safePreview;return {status:'duplicate',id:old.id};}
  if(this.entries.length>=3)return {status:'full',id:''};
  const id='devir-'+(++this.serial);this.entries.push({id,config,preview:safePreview});return {status:'added',id};
 }
 remove(id:string):void{this.entries=this.entries.filter(x=>x.id!==id);}
 serialize():string{return JSON.stringify({kind:'elif.design-board',version:1,options:this.entries.map(x=>({...x.config}))},null,2);}
 import(text:string):number{
  if(text.length>16384)throw Error('Dosya 16 KB sınırını aşıyor.');let parsed:any;
  try{parsed=JSON.parse(text);}catch{throw Error('Dosya okunabilir bir JSON kaydı değil.');}
  if(!parsed||parsed.kind!=='elif.design-board'||parsed.version!==1||!Array.isArray(parsed.options)||parsed.options.length<1||parsed.options.length>3)throw Error('Bu dosya Elif tasarım karşılaştırması biçiminde değil.');
  const configs=parsed.options.map(verifiedConfig);this.entries=[];configs.forEach((s:StudioConfig)=>this.add(s));return this.entries.length;
 }
}
export const designBoard=new DesignBoard();
