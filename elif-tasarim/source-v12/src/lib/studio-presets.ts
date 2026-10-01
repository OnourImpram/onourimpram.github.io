import {defaultStudio,studioQuery,type StudioConfig} from './desk-v8';
/** These are visual starting configurations, never production-approved specifications. */
export const studioPresets = [
 {id:'odak',title:'Odak',subtitle:'Toplu bir çalışma düzeni.',finish:'Doğal meşe görünümü',width:160,depth:75,height:80,angle:0,material:'mese' as const,image:'devir-odak-v23.webp'},
 {id:'akis',title:'Akış',subtitle:'İki yüzey, tek çalışma düzeni.',finish:'Ceviz görünümü',width:180,depth:80,height:80,angle:90,material:'ceviz' as const,image:'devir-akis-v23.webp'},
 {id:'hareket',title:'Hareket',subtitle:'Ayakta kullanım için bir başlangıç.',finish:'Koyu ahşap görünümü',width:200,depth:85,height:110,angle:180,material:'koyu' as const,image:'devir-hareket-v23.webp'}
] as const;
export function presetHref(p:typeof studioPresets[number]):string {
 const config:StudioConfig={...defaultStudio,width:p.width,depth:p.depth,height:p.height,material:p.material,angle:p.angle};
 return '/tasarim-masasi?'+studioQuery(config);
}
