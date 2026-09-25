/** Merge static geometry per material inside a parent, retaining named source meshes for inspection.
 * Moving desk groups and independently switchable bookcases are never merged together.
 */
import * as THREE from './vendor/three.module.min.js';
export function batchStatic(parent,exclude=new Set()){
 parent.updateWorldMatrix(true,true);const inverse=parent.matrixWorld.clone().invert(),buckets=new Map();
 function visit(node){if(node!==parent&&exclude.has(node))return;if(node.isMesh&&!node.isInstancedMesh&&!Array.isArray(node.material)&&node.visible){
  const key=node.material.uuid+':'+Number(node.castShadow)+':'+Number(node.receiveShadow);if(!buckets.has(key))buckets.set(key,{material:node.material,cast:node.castShadow,receive:node.receiveShadow,nodes:[]});buckets.get(key).nodes.push(node);
 }for(const c of node.children)visit(c);}visit(parent);const output=[];
 for(const bucket of buckets.values()){
  if(bucket.nodes.length<2)continue;
  const geometries=bucket.nodes.map(node=>{const g=node.geometry.index?node.geometry.toNonIndexed():node.geometry.clone();g.applyMatrix4(inverse.clone().multiply(node.matrixWorld));return g;});
  const total=geometries.reduce((n,g)=>n+g.attributes.position.count,0),position=new Float32Array(total*3),normal=new Float32Array(total*3),uv=new Float32Array(total*2);let offset=0;
  for(const g of geometries){const p=g.attributes.position,n=g.attributes.normal,u=g.attributes.uv;position.set(p.array,offset*3);if(n)normal.set(n.array,offset*3);if(u)uv.set(u.array,offset*2);offset+=p.count;g.dispose();}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(position,3));g.setAttribute('normal',new THREE.BufferAttribute(normal,3));g.setAttribute('uv',new THREE.BufferAttribute(uv,2));g.computeBoundingBox();g.computeBoundingSphere();
  const mesh=new THREE.Mesh(g,bucket.material);mesh.name='static-batch-'+output.length;mesh.castShadow=bucket.cast;mesh.receiveShadow=bucket.receive;parent.add(mesh);bucket.nodes.forEach(n=>{n.visible=false;n.userData.batched=true;});output.push(mesh);
 }return output;
}
