/** Original V9 set. Furniture, shelf lighting and staging are real meshes.
 * The room is a concept setting, not an included product or an as-built project.
 */
import * as THREE from './vendor/three.module.min.js';
import {RoundedBoxGeometry} from './vendor/RoundedBoxGeometry.js';
export const shelfLayout=Object.freeze([
 {id:'left',x:-1.51,width:.79,depth:.34,levels:[.76,1.16,1.56,1.96]},
 {id:'right',x:1.51,width:.79,depth:.34,levels:[.76,1.16,1.56,1.96]}
]);
export function normalizeAtmosphere(o={}){return {mode:o.mode==='product'?'product':'atelier',shelves:o.shelves!==false,lights:o.lights!==false,props:o.props!==false};}
const random=(seed)=>()=>{seed=Math.imul(1664525,seed)+1013904223|0;return(seed>>>0)/4294967296;};
/** Batch opaque, static room parts without crossing visibility boundaries.
 * Individual display shelves and instanced foliage remain inspectable.
 */
export function mergeStaticByMaterial(group,woodMaterial,woodParts,geometries){
 group.updateWorldMatrix(true,true);
 const inverse=group.matrixWorld.clone().invert(),buckets=new Map();
 group.traverse(o=>{
  if(!o.isMesh||o.isInstancedMesh||o.userData.displayShelf||Array.isArray(o.material)||o.material.transparent||!o.geometry.attributes.position)return;
  let items=buckets.get(o.material);if(!items)buckets.set(o.material,items=[]);items.push(o);
 });
 for(const [material,items] of buckets){
  if(items.length<2)continue;
  const converted=items.map(o=>{const g=o.geometry.index?o.geometry.toNonIndexed():o.geometry.clone();g.applyMatrix4(new THREE.Matrix4().multiplyMatrices(inverse,o.matrixWorld));return g;});
  const joined=new THREE.BufferGeometry();
  for(const name of ['position','normal','uv']){
   if(!converted.every(g=>g.attributes[name]))continue;
   const size=converted[0].attributes[name].itemSize,total=converted.reduce((n,g)=>n+g.attributes[name].count*size,0),data=new Float32Array(total);let offset=0;
   for(const g of converted){const a=g.attributes[name];for(let i=0;i<a.count;i++)for(let c=0;c<size;c++)data[offset++]=a.getComponent(i,c);}
   joined.setAttribute(name,new THREE.BufferAttribute(data,size));
  }
  joined.computeBoundingSphere();joined.computeBoundingBox();geometries.push(joined);
  const batch=new THREE.Mesh(joined,material);batch.name='static-batch-'+material.id;batch.castShadow=items.some(o=>o.castShadow);batch.receiveShadow=items.some(o=>o.receiveShadow);
  for(const item of items){item.parent.remove(item);const i=woodParts.indexOf(item);if(i>=0)woodParts.splice(i,1);}
  group.add(batch);if(material===woodMaterial)woodParts.push(batch);converted.forEach(g=>g.dispose());
 }
}
export function createAtelierRoom(scene,woods,brass,invalidate){
 const root=new THREE.Group();root.name='Elif-Atelier-V9';scene.add(root);
 const cases=new THREE.Group(),props=new THREE.Group(),lumens=new THREE.Group(),shelfProps=new THREE.Group();root.add(cases,props,lumens);props.add(shelfProps);
 const mats=[],textures=[],geometries=[],woodParts=[],lights=[],caseGroups=[];let opts=normalizeAtmosphere(),theme='day',material='ceviz';
 const mat=(x)=>{const m=new THREE.MeshStandardMaterial(x);mats.push(m);return m;};
 function texCanvas(w,h,paint){const c=document.createElement('canvas');c.width=w;c.height=h;paint(c.getContext('2d'),w,h);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=4;textures.push(t);return t;}
 const plasterMap=texCanvas(512,512,(ctx,w,h)=>{const im=ctx.createImageData(w,h),r=random(62);for(let i=0;i<w*h;i++){const n=(r()-.5)*12;im.data.set([216+n,205+n,187+n,255],i*4);}ctx.putImageData(im,0,0);});
 plasterMap.wrapS=plasterMap.wrapT=THREE.RepeatWrapping;plasterMap.repeat.set(3,2);
 const plaster=mat({map:plasterMap,roughness:.96}),stone=mat({color:'#d3c3ac',roughness:.85}),dark=mat({color:'#37352e',roughness:.55,metalness:.25}),ceramic=mat({color:'#c3b49a',roughness:.86}),olive=mat({color:'#4c5740',roughness:.9}),stemMat=mat({color:'#59503b',roughness:.97});
 const bookMats=['#c9b89c','#ece0ca','#94866d','#6d715d','#bfa187'].map(c=>mat({color:c,roughness:.94}));
 const pageMat=mat({color:'#dfd6c3',roughness:1});
 const led=mat({color:'#ffeed1',emissive:'#ffd998',emissiveIntensity:.8,roughness:.4});
 function mesh(geo,m,parent,pos,name){geometries.push(geo);const o=new THREE.Mesh(geo,m);o.position.set(...pos);o.castShadow=true;o.receiveShadow=true;if(name)o.name=name;parent.add(o);if(m===woods[material])woodParts.push(o);return o;}
 function box(w,h,d,pos,parent=root,m=woods[material],name=''){return mesh(new RoundedBoxGeometry(w,h,d,2,Math.min(.008,w/4,h/4,d/4)),m,parent,pos,name);}
 function cylinder(r1,r2,h,pos,parent,m=ceramic){return mesh(new THREE.CylinderGeometry(r1,r2,h,24),m,parent,pos,'');}
 function book(x,y,z,w,h,color,group,tilt=0){const b=new THREE.Group();b.position.set(x,y+h/2,z);b.rotation.z=tilt;group.add(b);box(w,h,.18,[0,0,0],b,bookMats[color%bookMats.length]);box(w-.008,h-.016,.168,[0,0,.007],b,pageMat);box(w,h,.009,[0,0,.095],b,bookMats[color%bookMats.length]);for(const dy of [-h*.29,h*.28])box(w*.65,.004,.003,[0,dy,.102],b,brass);return b;}
 function vase(x,y,z,scale,group){const v=new THREE.Group();group.add(v);v.position.set(x,y,z);const pts=[[.021,0],[.046,.014],[.059,.072],[.048,.118],[.024,.145],[.022,.181],[.027,.191]].map(([r,h])=>new THREE.Vector2(r*scale,h*scale));mesh(new THREE.LatheGeometry(pts,24),ceramic,v,[0,0,0]);return v;}
 function branch(x,y,z,scale,parent){const r=random(Math.round((x+4)*1000));const group=new THREE.Group();group.position.set(x,y,z);parent.add(group);
  const leafGeo=new THREE.SphereGeometry(.011*scale,6,4);geometries.push(leafGeo);const leaves=new THREE.InstancedMesh(leafGeo,olive,60);leaves.castShadow=true;leaves.receiveShadow=true;group.add(leaves);let index=0;const dummy=new THREE.Object3D();
  for(let k=0;k<5;k++){const end=new THREE.Vector3((r()-.5)*.26*scale,(.2+r()*.16)*scale,(r()-.5)*.19*scale),start=new THREE.Vector3(0,0,0),v=end.clone().sub(start);const c=cylinder(.0015*scale,.002*scale,v.length(),v.clone().multiplyScalar(.5).toArray(),group,stemMat);c.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),v.normalize());
   for(let j=2;j<8;j++){const t=j/8,at=end.clone().multiplyScalar(t);for(const s of [-1,1]){dummy.position.set(at.x+s*.020*scale,at.y,at.z);dummy.scale.set(.40,1.8,.85);dummy.rotation.z=s*.9;dummy.updateMatrix();leaves.setMatrixAt(index++,dummy.matrix);}}
  }leaves.instanceMatrix.needsUpdate=true;return group;
 }
 // Backdrop is deliberately open at the sides so orbiting cannot enter a closed box.
 box(4.7,2.75,.065,[0,1.365,-1.42],root,plaster,'plaster-backdrop');
 box(1.84,2.4,.034,[0,1.26,-1.36],root,stone,'central-stone-panel');
 for(const x of [-.91,.91])box(.005,2.38,.012,[x,1.26,-1.335],root,brass);
 const sign=texCanvas(768,300,(ctx,w,h)=>{ctx.clearRect(0,0,w,h);ctx.fillStyle='#76604a';ctx.textAlign='center';ctx.font='48px Georgia';ctx.fillText('E L İ F',w/2,115);ctx.font='25px Georgia';ctx.fillText('T A S A R I M',w/2,171);ctx.font='13px sans-serif';ctx.fillText('Ö L Ç Ü N Ü Z E   G Ö R E   B İ R   Y A Ş A M',w/2,220);});
 const signMat=new THREE.MeshBasicMaterial({map:sign,transparent:true,depthWrite:false});mats.push(signMat);mesh(new THREE.PlaneGeometry(1.08,.42),signMat,root,[0,1.65,-1.334],'atelier-wordmark');
 // Eight independently modelled shelf boards. Books and ceramics are styling only.
 for(const def of shelfLayout){const g=new THREE.Group();g.name=def.id+'-bookcase';g.position.set(def.x,0,-1.12);cases.add(g);caseGroups.push(g);const w=def.width,d=def.depth;
  box(w,2.35,.028,[0,1.195,-d/2],g,woods[material]);
  for(const side of [-1,1])box(.032,2.35,d,[side*(w/2-.016),1.195,0],g,woods[material]);
  for(const y of [.08,.61,2.38])box(w,.035,d,[0,y,0],g,woods[material]);
  for(const y of def.levels){const shelf=box(w-.048,.024,d-.016,[0,y,0],g,woods[material],def.id+'-shelf-'+y);shelf.userData.displayShelf=true;
   const bar=box(w-.09,.006,.013,[def.x,y+.355,-.968],lumens,led,def.id+'-shelf-light');bar.castShadow=false;
   // Warm gradient wash under each strip, not a costly point-light per cubby.
   const glowTex=texCanvas(32,64,(ctx,W,H)=>{const gradient=ctx.createLinearGradient(0,0,0,H);gradient.addColorStop(0,'rgba(255,211,134,.32)');gradient.addColorStop(1,'rgba(255,211,134,0)');ctx.fillStyle=gradient;ctx.fillRect(0,0,W,H);});
   const gm=new THREE.MeshBasicMaterial({map:glowTex,transparent:true,depthWrite:false,side:THREE.DoubleSide});mats.push(gm);const wash=mesh(new THREE.PlaneGeometry(w-.065,.28),gm,lumens,[def.x,y+.205,-1.267]);wash.castShadow=false;
  }
  for(const side of [-1,1]){box((w-.058)/2,.484,.025,[side*w*.245,.34,d/2],g,woods[material]);for(let i=0;i<10;i++)box(.006,.454,.010,[side*w*.245+(i-4.5)*.031,.34,d/2+.014],g,woods[material]);box(.011,.07,.015,[side*.030,.43,d/2+.027],g,brass);}
  const deco=new THREE.Group();deco.position.copy(g.position);deco.name=def.id+'-shelf-styling';shelfProps.add(deco);const side=def.id==='left'?-1:1;
  for(let k=0;k<5;k++)book(-.26+k*.066,.777,.035,.042,.22+(k%3)*.035,k,deco,k===4?.13:0);
  const vs=vase(.18,1.178,.02,1.2,deco);branch(.18,1.385,.02,.85,deco);
  for(let k=0;k<3;k++){const b=book(0,1.58+k*.045,.02,.04,.25,2+k,deco);b.rotation.z=Math.PI/2;b.position.x=-.1;b.position.y=1.607+k*.045;}
  vase(.17,1.577,.04,.8,deco);vase(-.15,1.978,.045,1.15,deco);
  for(let k=0;k<3;k++)book(.10+k*.061,1.977,.03,.045,.22+k*.028,k+1,deco,.04);
 }
 // Linen rug. Its weave is procedural, not a photograph pasted behind the product.
 const rugTex=texCanvas(512,512,(ctx,w,h)=>{const im=ctx.createImageData(w,h),r=random(19);for(let y=0;y<h;y++)for(let x=0;x<w;x++){const weave=((x%4<2)===(y%4<2)?7:-5)+(r()-.5)*13;im.data.set([177+weave,161+weave,137+weave,255],(y*w+x)*4);}ctx.putImageData(im,0,0);});rugTex.wrapS=rugTex.wrapT=THREE.RepeatWrapping;rugTex.repeat.set(7,6);const rugMat=mat({map:rugTex,bumpMap:rugTex,bumpScale:.0016,roughness:1});box(3.35,.013,2.55,[.08,.001,.28],root,rugMat,'woven-rug');
 // Low leather task chair anchors the desk to an inhabitable space.
 const leather=mat({color:'#503b2c',roughness:.66}),chair=new THREE.Group();chair.position.set(.0,0,-.73);chair.rotation.y=-.10;chair.name='studio-chair';props.add(chair);
 box(.48,.06,.45,[0,.47,0],chair,leather,'chair-seat');const back=box(.49,.46,.055,[0,.74,-.20],chair,leather,'chair-back');back.rotation.x=-.10;
 cylinder(.025,.033,.33,[0,.27,0],chair,dark);
 for(let k=0;k<5;k++){const a=k*Math.PI*2/5,arm=box(.028,.025,.32,[Math.sin(a)*.14,.09,Math.cos(a)*.14],chair,dark);arm.rotation.y=a;const wheel=cylinder(.027,.027,.029,[Math.sin(a)*.28,.04,Math.cos(a)*.28],chair,dark);wheel.rotation.x=Math.PI/2;}
 for(const side of [-1,1]){box(.032,.14,.032,[side*.27,.54,0],chair,dark);box(.045,.031,.29,[side*.27,.61,-.015],chair,leather);}
 for(const side of [-1,1]){const seam=box(.005,.38,.003,[side*.165,.74,-.166],chair,leather);seam.rotation.x=-.10;}
 box(4.7,.11,.045,[0,.055,-1.369],root,stone,'skirting');
 // Plant and large ceramic vessel beside the left cabinet, outside desk movement.
 vase(-2.05,.003,-.75,2.45,props);branch(-2.05,.39,-.75,2.35,props);
 const pend=new THREE.Group();root.add(pend);for(const x of [-.68,.68])cylinder(.002,.002,.64,[x,2.54,-.5],pend,dark);box(1.65,.033,.06,[0,2.21,-.5],pend,brass,'pendant');box(1.59,.004,.04,[0,2.19,-.5],lumens,led);
 // A separate warm light, kept non-shadow-casting for predictable mobile cost.
 const warm=new THREE.PointLight(0xffc883,1.0,4,2);warm.position.set(0,1.95,-.85);lumens.add(warm);lights.push(warm);
 // Soft diagonal window mullion shadows on plaster, independent of source photos.
 const shadeMat=new THREE.MeshBasicMaterial({color:0x67503a,transparent:true,opacity:.055,depthWrite:false});mats.push(shadeMat);
 for(let i=0;i<5;i++){const stripe=mesh(new THREE.PlaneGeometry(.020,2.8),shadeMat,root,[-.7+i*.36,1.35,-1.317]);stripe.rotation.z=-.37;stripe.castShadow=false;}
 for(const group of [...caseGroups,shelfProps,...props.children.filter(g=>g!==shelfProps)])mergeStaticByMaterial(group,woods[material],woodParts,geometries);
 function apply(){root.visible=opts.mode==='atelier';cases.visible=opts.shelves;props.visible=opts.props;shelfProps.visible=opts.shelves;lumens.visible=opts.lights&&opts.shelves;invalidate?.();}
 const api={
  update(next){opts=normalizeAtmosphere({...opts,...next});apply();},
  setMaterial(kind){material=woods[kind]?kind:'ceviz';woodParts.forEach(o=>o.material=woods[material]);invalidate?.();},
  light(mode){theme=mode;led.emissiveIntensity=mode==='evening'?2.0:.8;warm.intensity=mode==='evening'?2.5:1.0;invalidate?.();},
  inspect(){return {mode:opts.mode,visible:root.visible,shelves:opts.shelves,lights:opts.lights,props:opts.props,theme,shelfPropsVisible:root.visible&&props.visible&&shelfProps.visible,bookcases:caseGroups.map(g=>({id:g.name,x:g.position.x,visible:root.visible&&cases.visible,shelves:g.children.filter(c=>c.userData.displayShelf).length})),geometries:geometries.length,material};},
  dispose(){scene.remove(root);new Set(geometries).forEach(g=>g.dispose());new Set(textures).forEach(t=>t.dispose());new Set(mats).forEach(m=>m.dispose());root.clear();}
 };apply();return api;
}
