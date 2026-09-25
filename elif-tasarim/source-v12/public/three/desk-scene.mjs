/** Elif Tasarım V13 Final. Original parametric concept geometry, not a CAD reconstruction.
 * Three.js 0.185.1. Engine/addon license is retained in vendor/THREE_LICENSE.txt.
 * All units below are metres. UI dimensions are conceptual, not load ratings.
 */
import * as THREE from './vendor/three.module.min.js';
import {OrbitControls} from './vendor/OrbitControls.js';
import {RoundedBoxGeometry} from './vendor/RoundedBoxGeometry.js';
import {RoomEnvironment} from './vendor/RoomEnvironment.js';
import {createAtelierRoom} from './atelier-room.mjs?v=v13-final-atelier';

const finite=(v,f)=>Number.isFinite(Number(v))?Number(v):f;
const bounded=(v,a,b,f)=>Math.max(a,Math.min(b,finite(v,f)));
function normalized(s={}){return {width:bounded(s.width,120,220,180),depth:bounded(s.depth,65,95,80),height:bounded(s.height,80,125,80),angle:bounded(s.angle,0,360,90),material:['ceviz','mese','koyu'].includes(s.material)?s.material:'ceviz',drawers:!!s.drawers,door:!!s.door,shelves:['both','left','right','none'].includes(s.shelves)?s.shelves:'both',room:s.room==='product'?'product':'atelier',shelfLight:bounded(s.shelfLight,0,100,65),lighting:s.lighting==='evening'?'evening':'day'};}
function seeded(seed){return ()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return ((t^t>>>14)>>>0)/4294967296}}
function woodTexture(kind){
 const colors={ceviz:[81,48,27],mese:[153,120,77],koyu:[34,30,25]};
 const base=colors[kind],w=2048,h=512,canvas=document.createElement('canvas');canvas.width=w;canvas.height=h;
 const ctx=canvas.getContext('2d'),data=ctx.createImageData(w,h),rng=seeded(7123),arr=data.data;
 for(let y=0;y<h;y++)for(let x=0;x<w;x++){
  const nx=x/w,ny=y/h,warp=12*Math.sin(nx*7+ny*3)+5*Math.sin(nx*17-ny*6);
  const knot=Math.exp(-Math.pow((nx-.70)*4,2)-Math.pow((ny-.30)*8,2));
  const f=(y+warp+28*knot*Math.sin(nx*9))*.82;
  const grain=.055*Math.sin(f)+.027*Math.sin(f*2.17)+.015*Math.sin(f*6.3);
  const broad=.08*Math.sin(ny*42+nx*2.1+warp*.07)+.055*Math.sin(ny*87+warp*.11);
  const board=Math.floor(y/128),edge=y%128<1?-.05:0;
  const light=1+grain+broad+(rng()-.5)*.055+(board-1.5)*.018+edge;
  const i=(y*w+x)*4;arr[i]=base[0]*light;arr[i+1]=base[1]*light;arr[i+2]=base[2]*light;arr[i+3]=255;
 }
 ctx.putImageData(data,0,0);const tex=new THREE.CanvasTexture(canvas);tex.colorSpace=THREE.SRGBColorSpace;tex.wrapS=tex.wrapT=THREE.RepeatWrapping;tex.anisotropy=8;return tex;
}
function softShadowTexture(){const c=document.createElement('canvas');c.width=c.height=128;const x=c.getContext('2d'),g=x.createRadialGradient(64,64,2,64,64,64);g.addColorStop(0,'rgba(58,42,30,.30)');g.addColorStop(.55,'rgba(58,42,30,.14)');g.addColorStop(1,'rgba(58,42,30,0)');x.fillStyle=g;x.fillRect(0,0,128,128);return new THREE.CanvasTexture(c)}
function shapeRect(w,d,r=.025,cx=0,cz=0){const s=new THREE.Shape(),x=cx-w/2,z=cz-d/2;s.moveTo(x+r,z);s.lineTo(x+w-r,z);s.quadraticCurveTo(x+w,z,x+w,z+r);s.lineTo(x+w,z+d-r);s.quadraticCurveTo(x+w,z+d,x+w-r,z+d);s.lineTo(x+r,z+d);s.quadraticCurveTo(x,z+d,x,z+d-r);s.lineTo(x,z+r);s.quadraticCurveTo(x,z,x+r,z);return s;}

function surfaceTexture(kind){
 const c=document.createElement('canvas');c.width=c.height=512;const ctx=c.getContext('2d'),image=ctx.createImageData(512,512),rng=seeded(9021);
 for(let y=0;y<512;y++)for(let x=0;x<512;x++){let n=(rng()-.5)*12;if(kind==='linen')n+=((x%4<2?1:-1)+(y%4<2?1:-1))*9;else n+=5*Math.sin(x*.07+y*.011)+3*Math.sin(y*.13);const i=(y*512+x)*4;image.data[i]=224+n;image.data[i+1]=219+n;image.data[i+2]=210+n;image.data[i+3]=255}ctx.putImageData(image,0,0);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(kind==='linen'?10:3,kind==='linen'?8:3);t.anisotropy=4;return t;
}
function brandTexture(){const c=document.createElement('canvas');c.width=768;c.height=512;const x=c.getContext('2d');x.clearRect(0,0,768,512);x.fillStyle='#76583d';x.textAlign='center';x.font='64px Georgia';x.fillText('E L İ F',384,220);x.font='34px Georgia';x.fillText('T A S A R I M',384,281);x.strokeStyle='#9e8360';x.lineWidth=2;x.beginPath();x.moveTo(325,140);x.lineTo(443,140);x.stroke();return new THREE.CanvasTexture(c);}

export function createDeskScene(host,initial={},hooks={}){
 if(!host||!host.isConnected)throw Error('3D stage is unavailable');
 let dead=false,lost=false,visible=true,anim=null,frameCount=0,last=0,needs=true,autoRotate=false,theme='day',dimensionVisible=false,automaticFrame=true,viewName='perspective';
 let target=normalized(initial),current={height:target.height,angle:target.angle,drawer:target.drawers?1:0,door:target.door?1:0};
 const scene=new THREE.Scene();scene.background=new THREE.Color('#eee7dc');scene.fog=new THREE.Fog('#eee7dc',10,25);
 const camera=new THREE.PerspectiveCamera(38,1,.05,35);camera.position.set(2.45,1.85,3.1);
 const renderer=new THREE.WebGLRenderer({antialias:true,alpha:false,powerPreference:'high-performance',preserveDrawingBuffer:true});
 renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.8));renderer.setSize(Math.max(host.clientWidth,1),Math.max(host.clientHeight,1),false);
 renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=.96;
 renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFShadowMap;
 const canvas=renderer.domElement;canvas.setAttribute('aria-label','Devir 01. Yükseklik ayarlı, çekmeceli ve döner yan tablalı üç boyutlu konsept masa');canvas.setAttribute('role','img');canvas.tabIndex=0;canvas.dataset.engine='Three.js '+THREE.REVISION;host.appendChild(canvas);
 let hotspotVisible=false;const hotspotDefs=[['lift','yükseklik-kumandası','Yükseklik kumandası'],['drawers','tabla-cekmece-1','Üst çekmece grubu'],['return','doner-yan-tabla','Döner yan çalışma yüzeyi'],['storage','kullanici-dolabi','Sabit depolama gövdesi']];const hotspotEls=hotspotDefs.map(([id,targetName,label],index)=>{const el=document.createElement('button');el.type='button';el.className='v13-hotspot';el.textContent=String(index+1);el.setAttribute('aria-label',label);el.dataset.hotspot=id;el.hidden=true;el.addEventListener('click',e=>{e.stopPropagation();hooks.hotspot?.(id)});host.appendChild(el);return {id,targetName,label,el}});
 const controls=new OrbitControls(camera,canvas);controls.target.set(.10,.64,.22);controls.enableDamping=!matchMedia('(prefers-reduced-motion: reduce)').matches;controls.dampingFactor=.09;controls.enablePan=false;controls.enableZoom=true;controls.zoomSpeed=.8;controls.minDistance=2;controls.maxDistance=14;controls.minPolarAngle=.025;controls.maxPolarAngle=Math.PI/2-.07;controls.rotateSpeed=.6;controls.touches.ONE=THREE.TOUCH.ROTATE;controls.touches.TWO=THREE.TOUCH.DOLLY_PAN;
 // Wheel remains ordinary page scrolling, including on mobile.
 canvas.style.touchAction='none';
 // Touch pinch and middle-button dolly work. Ordinary wheel remains page scroll.
 const onPageWheel=e=>e.stopImmediatePropagation();canvas.addEventListener('wheel',onPageWheel,{capture:true,passive:true});
 controls.addEventListener('change',invalidate);
 controls.addEventListener('start',()=>{automaticFrame=false;autoRotate=false;viewName='custom';hooks.motion?.(false);hooks.camera?.('custom')});
 const pmrem=new THREE.PMREMGenerator(renderer),envScene=new RoomEnvironment(),env=pmrem.fromScene(envScene,.04);scene.environment=env.texture;scene.environmentIntensity=.55;envScene.dispose();pmrem.dispose();
 const ambient=new THREE.HemisphereLight(0xfff5e5,0x8a8071,.82);scene.add(ambient);
 const sun=new THREE.DirectionalLight(0xffe8c3,2.7);sun.position.set(-3.8,5.8,3.6);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);sun.shadow.camera.left=-3.4;sun.shadow.camera.right=3.4;sun.shadow.camera.top=3.4;sun.shadow.camera.bottom=-3.4;sun.shadow.camera.near=.5;sun.shadow.camera.far=16;sun.shadow.normalBias=.018;sun.shadow.bias=-.0001;sun.shadow.radius=3;sun.target.position.set(0,.3,0);scene.add(sun,sun.target);
 const fill=new THREE.DirectionalLight(0xe7eef4,.65);fill.position.set(4,3,-2);scene.add(fill);
 const woods=Object.fromEntries(['ceviz','mese','koyu'].map(k=>{const map=woodTexture(k);return[k,new THREE.MeshPhysicalMaterial({map,bumpMap:map,bumpScale:.00012,roughness:.38,metalness:0,clearcoat:.22,clearcoatRoughness:.45,envMapIntensity:.55})]}));
 // Texture refinement from the user's existing concept artwork. Procedural wood remains the loading fallback.
 for(const [key,material] of Object.entries(woods)){
  const name='grain-v9-'+key+'.webp',uri=window.__ELIF_ASSETS__?.[name]||new URL('../assets/'+name,import.meta.url).href;
  new THREE.TextureLoader().load(uri,texture=>{if(dead){texture.dispose();return}texture.colorSpace=THREE.SRGBColorSpace;texture.wrapS=texture.wrapT=THREE.RepeatWrapping;texture.anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());const previous=material.map;material.map=texture;material.bumpMap=texture;material.needsUpdate=true;previous?.dispose();invalidate();},undefined,()=>{});
 }
 const dark=new THREE.MeshStandardMaterial({color:0x282926,roughness:.37,metalness:.52});
 const brass=new THREE.MeshStandardMaterial({color:0xba9053,roughness:.28,metalness:.80});
 const inside=new THREE.MeshStandardMaterial({color:0x56473a,roughness:.94});
 const rubber=new THREE.MeshStandardMaterial({color:0x242621,roughness:.88});
 const floorMat=new THREE.MeshStandardMaterial({color:0xe6dfd3,roughness:.87});
 const floor=new THREE.Mesh(new THREE.PlaneGeometry(100,100),floorMat);floor.rotation.x=-Math.PI/2;floor.receiveShadow=true;floor.position.y=-.012;scene.add(floor);
 const shadowTex=softShadowTexture(),contact=new THREE.Mesh(new THREE.PlaneGeometry(3.2,2.5),new THREE.MeshBasicMaterial({map:shadowTex,transparent:true,depthWrite:false}));contact.rotation.x=-Math.PI/2;contact.position.set(.15,-.007,.15);scene.add(contact);
 const ringPoints=Array.from({length:161},(_,i)=>{const a=i/160*Math.PI*2;return new THREE.Vector3(Math.cos(a)*1.67,.001,Math.sin(a)*1.45+.10)});
 const ring=new THREE.Line(new THREE.BufferGeometry().setFromPoints(ringPoints),new THREE.LineBasicMaterial({color:0xcabdab,transparent:true,opacity:.4}));scene.add(ring);
 let model,upper,wing,storage,mainDrawers=[],cabinetDrawer,door,posts=[],W=0,D=0,woodMeshes=[];
 const plaster=surfaceTexture('plaster'),linen=surfaceTexture('linen'),brand=brandTexture();
 const room=createAtelierRoom({woods,brass,plaster,linen,brand});scene.add(room.root);
 function syncRoom(){room.setVisible(target.room==='atelier'&&viewName!=='top');room.setShelves(target.shelves);room.setLight(target.shelfLight);ring.visible=target.room==='product';contact.position.y=target.room==='atelier'?.008:-.007;controls.minAzimuthAngle=-Infinity;controls.maxAzimuthAngle=Infinity;}
 // The user sits at negative Z. Hide staging only when it obstructs that viewing hemisphere.
 function syncOcclusion(){room.setVisible(target.room==='atelier'&&viewName!=='top');room.setCutaway(camera.position.z<.35);}
 const workpad=new THREE.MeshStandardMaterial({color:0x51443a,roughness:.94});
 const allMaterials=[...Object.values(woods),dark,brass,inside,rubber,workpad];
 function mesh(geo,mat,parent,pos=[0,0,0],name=''){const m=new THREE.Mesh(geo,mat);m.position.set(...pos);m.castShadow=true;m.receiveShadow=true;if(name)m.name=name;(parent||model).add(m);if(mat===woods[target.material])woodMeshes.push(m);return m;}
 function box(w,h,d,pos,parent,mat=woods[target.material],radius=.012,name=''){const g=new RoundedBoxGeometry(w,h,d,3,Math.min(radius,w/3,h/3,d/3));if(mat===woods[target.material]&&h>Math.max(w,d)*.7){const uv=g.attributes.uv;for(let i=0;i<uv.count;i++){const u=uv.getX(i);uv.setXY(i,uv.getY(i),u)}uv.needsUpdate=true;}return mesh(g,mat,parent,pos,name)}
 function knob(x,y,z,parent){const stem=mesh(new THREE.CylinderGeometry(.003,.003,.012,12),brass,parent,[x,y,z]);stem.rotation.x=Math.PI/2;const cap=mesh(new THREE.CylinderGeometry(.009,.009,.004,24),brass,parent,[x,y,z+.008]);cap.rotation.x=Math.PI/2;}
 function disposeModel(){if(!model)return;model.traverse(o=>{if(o.geometry)o.geometry.dispose()});scene.remove(model);}
 function build(){
  disposeModel();woodMeshes=[];mainDrawers=[];posts=[];model=new THREE.Group();model.name='Elif Devir 01 Concept';scene.add(model);W=target.width/100;D=target.depth/100;
  const left=-W/2+.085,right=W/2-.255;
  // Fixed panel encloses the lift mechanism. Its base remains on the floor.
  box(.16,.575,D-.06,[left,.305,-.02],model,woods[target.material],.032,'sol-ahsap-tasiyici');
  box(.165,.018,D-.025,[left,.018,-.02],model,rubber,.009);
  // Right storage carcass with an honest, visible cavity, drawer and lower door.
  storage=new THREE.Group();storage.name='kullanici-dolabi';storage.position.x=right;storage.rotation.y=Math.PI;model.add(storage);
  const cw=.49,cd=Math.max(.51,D-.14),cy=.33;
  box(.026,.626,cd,[-cw/2+.013,cy,0],storage);
  box(.026,.626,cd,[+cw/2-.013,cy,0],storage);
  box(cw,.026,cd,[0,.64,0],storage);
  box(cw,.032,cd,[0,.04,0],storage);
  box(cw,.024,cd,[0,.448,0],storage);
  box(cw,.58,.023,[0,.33,-cd/2+.011],storage);
  box(cw-.05,.017,cd-.04,[0,.225,0],storage);
  cabinetDrawer=new THREE.Group();cabinetDrawer.position.set(0,.53,cd/2);storage.add(cabinetDrawer);cabinetDrawer.name='dolap-cekmece';
  box(cw-.047,.026,cd-.06,[0,-.065,-cd/2+.035],cabinetDrawer,inside,.005);
  box(cw-.038,.142,.027,[0,0,0],cabinetDrawer,woods[target.material],.008);
  box(.014,.075,cd-.07,[-cw/2+.033,-.032,-cd/2+.04],cabinetDrawer,woods[target.material],.004);
  box(.014,.075,cd-.07,[cw/2-.033,-.032,-cd/2+.04],cabinetDrawer,woods[target.material],.004);
  knob(0,.009,.021,cabinetDrawer);
  door=new THREE.Group();door.position.set(cw/2-.03,.24,cd/2+.003);door.name='dolap-kapak';storage.add(door);
  box(cw-.058,.382,.023,[-cw/2+.029,0,0],door,woods[target.material],.008);
  knob(-cw+.105,.12,.021,door);
  // Telescoping posts. Both raise the same upper assembly and never move the cabinet.
  for(const x of [left,right]){
   const sleeve=box(.089,.155,.089,[x,.625,0],model,dark,.006);
   const post=box(.068,1,.068,[x,1,0],model,dark,.005,'teleskopik-kolon');posts.push(post);
   box(.101,.013,.101,[x,.59,0],model,rubber,.003);
  }
  upper=new THREE.Group();upper.name='yukselen-cekmece-tabla';upper.rotation.y=Math.PI;model.add(upper);
  box(W,.032,D,[0,-.016,0],upper,woods[target.material],.020,'ana-tabla');
  box(W-.06,.026,.045,[0,-.09,-D/2+.045],upper,dark,.004,'taşıyıcı-travers');
  box(W-.064,.063,.022,[0,-.065,-D/2+.020],upper,woods[target.material],.005,'ziyaretci-tarafi-onluk');
  // Three real sliding tray meshes under the moving tabletop.
  const fractions=[.25,.50,.25];let start=-W/2+.022;
  for(let i=0;i<3;i++){
   const dw=(W-.064)*fractions[i]-.010,g=new THREE.Group();g.position.set(start+dw/2,-.062,D/2-.012);upper.add(g);g.name='tabla-cekmece-'+i;
   box(dw,.060,.024,[0,0,0],g,woods[target.material],.005);
   box(dw-.025,.011,D*.51,[0,-.031,-D*.255],g,inside,.003);
   for(const sign of [-1,1])box(.009,.044,D*.51,[sign*(dw/2-.012),-.004,-D*.255],g,woods[target.material],.002);
   box(dw-.025,.044,.01,[0,-.004,-D*.51],g,woods[target.material],.002);
   if(i===1){knob(0,0,.018,g);box(.008,.027,D*.46,[dw*.16,-.013,-D*.25],g,woods[target.material],.001)}
   mainDrawers.push(g);start+=dw+.016;
  }
  box(.115,.027,.047,[W/2-.13,-.103,D/2-.048],upper,dark,.008,'yükseklik-kumandası');
  for(let i=0;i<3;i++)box(.009,.0015,.012,[W/2-.16+i*.027,-.088,D/2-.043],upper,brass,.001);
  const slot=mesh(new THREE.CylinderGeometry(.027,.027,.002,32),dark,upper,[W/2-.17,.001,-D/2+.095]);
  mesh(new THREE.CylinderGeometry(.017,.017,.003,32),rubber,upper,[W/2-.17,.003,-D/2+.095]);
  // Lower independently rotating return. A real hole leaves clearance around the post.
  wing=new THREE.Group();wing.name='doner-yan-tabla';wing.position.set(right,.695,0);model.add(wing);
  const length=Math.min(1.28,W-.40),wd=.54,cx=-length/2+.19;
  const shape=shapeRect(length,wd,.035,cx,0),hole=new THREE.Path();hole.absarc(0,0,.063,0,Math.PI*2,true);shape.holes.push(hole);
  const geo=new THREE.ExtrudeGeometry(shape,{depth:.030,bevelEnabled:true,bevelSize:.005,bevelThickness:.003,bevelSegments:3,steps:1,curveSegments:20});geo.rotateX(-Math.PI/2);
  // Local UVs in metres make the grain continuous rather than camera-facing.
  const uv=geo.attributes.uv,pos=geo.attributes.position;for(let i=0;i<uv.count;i++)uv.setXY(i,(pos.getX(i)-cx)/length+.5,pos.getZ(i)/wd+.5);uv.needsUpdate=true;
  mesh(geo,woods[target.material],wing,[0,-.027,0],'yan-tabla');
  const collar=mesh(new THREE.TorusGeometry(.070,.006,12,48),dark,model,[right,.696,0]);collar.rotation.x=Math.PI/2;
  const endx=-length+.215;
  box(.055,.650,wd-.035,[endx,-.351,0],wing,woods[target.material],.017,'hareketli-uc-panel');
  for(const z of [-wd*.34,wd*.34]){const wheel=mesh(new THREE.CylinderGeometry(.013,.013,.018,14),rubber,wing,[endx,-.672,z]);wheel.rotation.z=Math.PI/2;box(.031,.019,.023,[endx,-.654,z],wing,dark,.003)}
  box(Math.min(.57,W*.37),.004,D*.35,[-.10,.003,.04],upper,workpad,.01,'masa-sumeni');
  box(.30,.009,.21,[-.10,.012,-.015],upper,dark,.012,'kapali-notebook');
  const notebook=box(.115,.018,.16,[-W*.28,.010,.04],upper,inside,.006,'not-defteri');
  // Turned lamp base and hemispherical shade, attached to the rising surface.
  const lx=-W*.34,lz=-D*.27;
  mesh(new THREE.CylinderGeometry(.065,.068,.015,32),brass,upper,[lx,.008,lz],'lamba-tabani');
  mesh(new THREE.CylinderGeometry(.008,.010,.22,16),brass,upper,[lx,.122,lz],'lamba-govdesi');
  mesh(new THREE.SphereGeometry(.105,32,16,0,Math.PI*2,0,Math.PI/2),brass,upper,[lx,.24,lz],'lamba-basligi');
  apply();updateDimensions();
 }
 const dgroup=new THREE.Group();dgroup.name='olcu-cizgileri';scene.add(dgroup);
 const dmat=new THREE.LineBasicMaterial({color:0x705d47,transparent:true,opacity:.60});
 const labelNames=['En','Derinlik','Yükseklik'];const labels=labelNames.map(name=>{const el=document.createElement('span');el.className='v8-dimension';el.setAttribute('aria-hidden','true');host.appendChild(el);return el});
 function line(a,b){const geo=new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(...a),new THREE.Vector3(...b)]);const l=new THREE.Line(geo,dmat);dgroup.add(l)}
 function updateDimensions(){while(dgroup.children.length){const ch=dgroup.children.pop();ch.geometry?.dispose()}const H=current.height/100;line([-W/2,H+.14,-D/2-.06],[W/2,H+.14,-D/2-.06]);for(const x of [-W/2,W/2])line([x,H+.10,-D/2-.06],[x,H+.18,-D/2-.06]);line([W/2+.13,H+.07,-D/2],[W/2+.13,H+.07,D/2]);line([-W/2-.15,.01,0],[-W/2-.15,H,0]);labels[0].textContent=target.width+' cm';labels[1].textContent=target.depth+' cm';labels[2].textContent=Math.round(current.height)+' cm';}
 function frameModel(){
  if(!model||!automaticFrame)return;
  model.updateMatrixWorld(true);
  const modelBox=new THREE.Box3().setFromObject(model);modelBox.max.y=Math.max(modelBox.max.y,1.28);
  const isRoom=target.room==='atelier'&&viewName!=='top'&&camera.position.z>=.35;
  const boxes=[modelBox];
  if(isRoom){
   boxes.push(new THREE.Box3(new THREE.Vector3(-1.85,.02,-1.42),new THREE.Vector3(-.77,2.02,-.99)));
   boxes.push(new THREE.Box3(new THREE.Vector3(.77,.02,-1.42),new THREE.Vector3(1.85,2.02,-.99)));
  }
  const center=isRoom?new THREE.Vector3(0,.97,.05):modelBox.getCenter(new THREE.Vector3());
  const dir=camera.position.clone().sub(controls.target).normalize();
  const right=new THREE.Vector3().crossVectors(camera.up,dir);if(right.lengthSq()<.000001)right.set(1,0,0);right.normalize();
  const up=new THREE.Vector3().crossVectors(dir,right).normalize(),tv=Math.tan(THREE.MathUtils.degToRad(camera.fov)/2),th=tv*camera.aspect;
  let distance=2.0;
  for(const box3 of boxes)for(const x of [box3.min.x,box3.max.x])for(const y of [box3.min.y,box3.max.y])for(const z of [box3.min.z,box3.max.z]){
   const v=new THREE.Vector3(x,y,z).sub(center),front=v.dot(dir);
   distance=Math.max(distance,front+Math.abs(v.dot(right))/th,front+Math.abs(v.dot(up))/tv);
  }
  controls.target.copy(center);camera.position.copy(center).addScaledVector(dir,distance*(isRoom?1.055:1.10));controls.update();
 }
 function screenBounds(){model.updateMatrixWorld(true);camera.updateMatrixWorld(true);const b=new THREE.Box3().setFromObject(model),out={minX:Infinity,maxX:-Infinity,minY:Infinity,maxY:-Infinity};for(const x of [b.min.x,b.max.x])for(const y of [b.min.y,b.max.y])for(const z of [b.min.z,b.max.z]){const p=new THREE.Vector3(x,y,z).project(camera);out.minX=Math.min(out.minX,p.x);out.maxX=Math.max(out.maxX,p.x);out.minY=Math.min(out.minY,p.y);out.maxY=Math.max(out.maxY,p.y);}return out;}
 function projectLabels(){const H=current.height/100,positions=[[0,H+.20,-D/2-.06],[W/2+.18,H+.11,0],[-W/2-.18,H/2,0]];dgroup.visible=dimensionVisible;labels.forEach((el,i)=>{const v=new THREE.Vector3(...positions[i]).project(camera);el.style.display=dimensionVisible&&v.z<1?'block':'none';el.style.left=(v.x*.5+.5)*100+'%';el.style.top=(-v.y*.5+.5)*100+'%';})}
 function projectHotspots(){for(const item of hotspotEls){const obj=model?.getObjectByName(item.targetName);if(!hotspotVisible||!obj){item.el.hidden=true;continue}const world=obj.getWorldPosition(new THREE.Vector3()),v=world.clone().project(camera),visiblePoint=v.z>-1&&v.z<1&&Math.abs(v.x)<1.08&&Math.abs(v.y)<1.08;item.el.hidden=!visiblePoint;if(visiblePoint){item.el.style.left=(v.x*.5+.5)*100+'%';item.el.style.top=(-v.y*.5+.5)*100+'%';}}}
 function apply(){if(!upper)return;const h=current.height/100;upper.position.y=h;for(const post of posts){const len=Math.max(.05,h-.59);post.scale.y=len;post.position.y=.55+len/2;}wing.rotation.y=current.angle*Math.PI/180;mainDrawers.forEach((g,i)=>g.position.z=D/2-.012+current.drawer*(i===1?.30:.15));cabinetDrawer.position.z=Math.max(.51,D-.14)/2+current.drawer*.23;door.rotation.y=current.door*Math.PI*.54;updateDimensions();frameModel();}
 function settle(){current.height=target.height;current.angle=target.angle;current.drawer=target.drawers?1:0;current.door=target.door?1:0;apply();}
 function render(){if(dead||lost||!visible||document.hidden)return;controls.update();syncOcclusion();projectLabels();renderer.render(scene,camera);projectHotspots();frameCount++;}
 function tick(t){anim=null;if(dead||lost||!visible||document.hidden)return;const dt=Math.min(.5,Math.max(.001,(t-last)/1000||.016));last=t;const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches,alpha=reduced?1:1-Math.exp(-dt*9);
  const targets={height:target.height,angle:target.angle,drawer:target.drawers?1:0,door:target.door?1:0};let moving=false;for(const key of Object.keys(targets)){const diff=targets[key]-current[key];if(Math.abs(diff)>.001){current[key]+=diff*alpha;moving=true}else current[key]=targets[key]}
  if(moving)apply();if(autoRotate&&!reduced){const off=camera.position.clone().sub(controls.target);off.applyAxisAngle(new THREE.Vector3(0,1,0),dt*.16);camera.position.copy(controls.target).add(off);moving=true}
  needs=false;render();if((moving||needs)&&!anim)anim=requestAnimationFrame(tick);
 }
 function invalidate(){needs=true;if(!dead&&!lost&&visible&&!document.hidden&&!anim)anim=requestAnimationFrame(tick)}
 function resize(){if(dead)return;const w=Math.max(host.clientWidth,1),h=Math.max(host.clientHeight,1);camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h,false);frameModel();invalidate()}
 const ro=new ResizeObserver(resize);ro.observe(host);
 const io=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible){last=performance.now();invalidate()}else if(anim){cancelAnimationFrame(anim);anim=null}},{threshold:.01});io.observe(host);
 const onVisibility=()=>{if(document.hidden&&anim){cancelAnimationFrame(anim);anim=null}else invalidate()};document.addEventListener('visibilitychange',onVisibility);
 const onLost=e=>{e.preventDefault();lost=true;if(anim)cancelAnimationFrame(anim);anim=null;hooks.status?.('lost');};canvas.addEventListener('webglcontextlost',onLost);
 const onRestored=()=>{lost=false;settle();hooks.status?.('ready');invalidate()};canvas.addEventListener('webglcontextrestored',onRestored);
 // Drain old orbit inertia before applying an exact preset, rather than fighting stale deltas.
 function finishOrbit(){const damping=controls.enableDamping;controls.enableDamping=false;controls.update();controls.enableDamping=damping;}
 function stopMotion(){autoRotate=false;hooks.motion?.(false);}
 function view(name='perspective'){
  const allowed=['perspective','front','back','left','right','top','detail'];if(!allowed.includes(name))name='perspective';
  stopMotion();finishOrbit();viewName=name;hooks.camera?.(name);automaticFrame=name!=='detail';
  controls.target.set(.08,.64,.15);const wide=W>2?1.10:1;
  if(name==='top'){camera.position.set(.08,4.8*wide,.151);controls.target.y=.3;}
  else if(name==='front')camera.position.set(.1,1.45,-4.3*wide);
  else if(name==='back')camera.position.set(.1,1.45,4.3*wide);
  else if(name==='left')camera.position.set(-4.3*wide,1.75,.15);
  else if(name==='right')camera.position.set(4.3*wide,1.75,.15);
  else if(name==='detail'){camera.position.set(1.6,1.1,-1.7);controls.target.set(W/2-.24,.55,-.15);}
  else camera.position.set(target.room==='atelier'?.7:2.45*wide,target.room==='atelier'?1.72:1.85*wide,target.room==='atelier'?4.7:-3.1*wide);
  syncOcclusion();frameModel();controls.update();syncOcclusion();invalidate();
 }
 const onKey=e=>{if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','+','-','0'].includes(e.key)){
  e.preventDefault();if(e.key==='0'){view();return}if(e.key==='+'||e.key==='-'){zoom(e.key==='+'?.90:1.10);return}
  stopMotion();finishOrbit();automaticFrame=false;viewName='custom';hooks.camera?.('custom');
  const spherical=new THREE.Spherical().setFromVector3(camera.position.clone().sub(controls.target));
  if(e.key==='ArrowLeft'||e.key==='ArrowRight')spherical.theta+=e.key==='ArrowLeft'?.16:-.16;
  else spherical.phi=THREE.MathUtils.clamp(spherical.phi+(e.key==='ArrowUp'?-.10:.10),controls.minPolarAngle,controls.maxPolarAngle);
  camera.position.copy(controls.target).add(new THREE.Vector3().setFromSpherical(spherical));controls.update();syncOcclusion();invalidate();
 }};canvas.addEventListener('keydown',onKey);
 function zoom(f){stopMotion();finishOrbit();automaticFrame=false;const v=camera.position.clone().sub(controls.target);v.setLength(THREE.MathUtils.clamp(v.length()*f,controls.minDistance,controls.maxDistance));camera.position.copy(controls.target).add(v);controls.update();syncOcclusion();invalidate()}
function applyLight(mode){theme=mode==='evening'?'evening':'day';target.lighting=theme;const dusk=theme==='evening';scene.background.set(dusk?'#e0d1bd':'#eee7dc');scene.fog.color.copy(scene.background);floorMat.color.set(dusk?'#d9cbb4':'#e6dfd3');sun.color.set(dusk?0xffd497:0xffe8c3);sun.intensity=dusk?1.6:2.7;ambient.intensity=dusk?.60:.82;renderer.toneMappingExposure=dusk?.92:.96;invalidate()}
 syncRoom();build();applyLight(target.lighting);resize();view();render();hooks.status?.('ready');
 const api={
  update(next){if(!anim)last=performance.now();const old=target;target=normalized(next);applyLight(target.lighting);syncRoom();if(old.room!==target.room){automaticFrame=true;view('perspective')}if(old.width!==target.width||old.depth!==target.depth)build();else if(old.material!==target.material)woodMeshes.forEach(m=>m.material=woods[target.material]);if(!visible||document.hidden||matchMedia('(prefers-reduced-motion: reduce)').matches)settle();invalidate()},
  footprint(){settle();model.updateMatrixWorld(true);const box=new THREE.Box3().setFromObject(model);return {width:Math.ceil((box.max.x-box.min.x)*100),depth:Math.ceil((box.max.z-box.min.z)*100)}},
  roomStats:()=>room.stats(),setView:view,zoom,
  dimensions(show){dimensionVisible=!!show;invalidate()},
  hotspots(show){hotspotVisible=!!show;if(!hotspotVisible)hotspotEls.forEach(x=>x.el.hidden=true);invalidate()},
  rotate(on){automaticFrame=false;autoRotate=!!on&&!matchMedia('(prefers-reduced-motion: reduce)').matches;hooks.motion?.(autoRotate);invalidate()},
  light:applyLight,
  snapshot(width=1920,height=1280){
   if(dead||lost||renderer.getContext().isContextLost())throw Error('3D view is unavailable');
   if(!Number.isInteger(width)||!Number.isInteger(height)||width<64||height<64||width>4096||height>4096||width*height>12582912)throw Error('Unsupported export dimensions');
   const size=renderer.getSize(new THREE.Vector2()),ratio=renderer.getPixelRatio(),position=camera.position.clone(),rotation=camera.quaternion.clone(),aim=controls.target.clone(),aspect=camera.aspect,wasAutomatic=automaticFrame;
   try{settle();renderer.setPixelRatio(1);renderer.setSize(width,height,false);camera.aspect=width/height;camera.updateProjectionMatrix();frameModel();syncOcclusion();renderer.render(scene,camera);return canvas.toDataURL('image/png')}
   finally{renderer.setPixelRatio(ratio);renderer.setSize(size.x,size.y,false);camera.aspect=aspect;camera.position.copy(position);camera.quaternion.copy(rotation);controls.target.copy(aim);automaticFrame=wasAutomatic;camera.updateProjectionMatrix();syncOcclusion();projectLabels();invalidate()}
  },
  inspect(){model.updateMatrixWorld(true);room.root.updateMatrixWorld(true);
   const wp=o=>o.getWorldPosition(new THREE.Vector3()).toArray();
   const drawerNormal=new THREE.Vector3(0,0,1).applyQuaternion(mainDrawers[1].getWorldQuaternion(new THREE.Quaternion()));
   return {orientation:{userSide:'negative-z',drawerNormal:drawerNormal.toArray(),mainDrawerWorld:wp(mainDrawers[1]),cabinetDrawerWorld:wp(cabinetDrawer),chairWorld:wp(room.chair),controllerWorld:wp(model.getObjectByName('yükseklik-kumandası')),doorFreeEdge:new THREE.Vector3(-.432,0,0).applyMatrix4(door.matrixWorld).toArray()},orbit:{azimuth:controls.getAzimuthalAngle(),polar:controls.getPolarAngle(),distance:controls.getDistance(),fullHorizontal:!Number.isFinite(controls.minAzimuthAngle)&&!Number.isFinite(controls.maxAzimuthAngle),zoomEnabled:controls.enableZoom,cutaway:room.stats().cutaway,target:controls.target.toArray()},engine:'Three.js',revision:THREE.REVISION,frameCount,visible,drawCalls:renderer.info.render.calls,triangles:renderer.info.render.triangles,config:{...target},geometry:{mainTopY:upper.position.y,fixedPanelY:model.getObjectByName('sol-ahsap-tasiyici').position.y,returnTopY:wing.position.y,wingAngle:wing.rotation.y,cabinetDrawerZ:cabinetDrawer.position.z,mainDrawerZ:mainDrawers[1].position.z,doorAngle:door.rotation.y},camera:camera.position.toArray(),view:viewName,rotating:autoRotate,material:target.material,theme,dimensions:dimensionVisible,contextLost:renderer.getContext().isContextLost(),gpuTextures:renderer.info.memory.textures,framing:screenBounds()}},
  dispose(){if(dead)return;dead=true;if(anim)cancelAnimationFrame(anim);ro.disconnect();io.disconnect();document.removeEventListener('visibilitychange',onVisibility);canvas.removeEventListener('keydown',onKey);canvas.removeEventListener('wheel',onPageWheel,true);canvas.removeEventListener('webglcontextlost',onLost);canvas.removeEventListener('webglcontextrestored',onRestored);controls.dispose();room.dispose();plaster.dispose();linen.dispose();brand.dispose();disposeModel();scene.traverse(o=>o.geometry?.dispose());for(const mat of allMaterials){mat.map?.dispose();mat.dispose()}floorMat.dispose();shadowTex.dispose();contact.material.dispose();ring.material.dispose();dmat.dispose();env.dispose();renderer.dispose();labels.forEach(el=>el.remove());hotspotEls.forEach(x=>x.el.remove());canvas.remove();host.__elif3D=null;}
 };
 host.__elif3D=api;return api;
}
window.ElifDesk3D={createDeskScene,revision:THREE.REVISION};
