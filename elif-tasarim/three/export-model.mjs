/** Pinned official Three.js exporters. Only the original desk geometry is exported, never staging furniture. */
import {GLTFExporter} from './vendor/GLTFExporter.js';
import {USDZExporter} from './vendor/USDZExporter.js';
export async function writeModel(model,format){
 if(format==='glb'){
  const data=await new GLTFExporter().parseAsync(model,{binary:true,onlyVisible:true,maxTextureSize:1024});
  if(!(data instanceof ArrayBuffer))throw Error('Binary GLB was not produced');
  return new Blob([data],{type:'model/gltf-binary'});
 }
 if(format==='usdz'){
  const data=await new USDZExporter().parseAsync(model,{maxTextureSize:1024,includeAnchoringProperties:true});
  return new Blob([data],{type:'model/vnd.usdz+zip'});
 }
 throw Error('Unsupported export format');
}
