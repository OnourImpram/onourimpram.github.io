/** Elif Tasarım V9. Original parametric concept geometry, not a CAD reconstruction.
 * Three.js 0.185.1. Engine/addon license is retained in vendor/THREE_LICENSE.txt.
 * All units below are metres. UI dimensions are conceptual, not load ratings.
 */
import * as THREE from './vendor/three.module.min.js';
import {createAtelierRoom} from './atelier-room.mjs';
import {OrbitControls} from './vendor/OrbitControls.js';
import {RoundedBoxGeometry} from './vendor/RoundedBoxGeometry.js';
import {RoomEnvironment} from './vendor/RoomEnvironment.js';

const finite=(v,f)=>Number.isFinite(Number(v))?Number(v):f;
const bounded=(v,a,b,f)=>Math.max(a,Math.min(b,finite(v,f)));
function normalized(s={}){return {width:bounded(s.width,120,220,180),depth:bounded(s.depth,65,95,80),height:bounded(s.height,80,125,80),angle:bounded(s.angle,0,360,90),material:['ceviz','mese','koyu'].includes(s.material)?s.material:'ceviz',drawers:!!s.drawers,door:!!s.door};}
function seeded(seed){return ()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return ((t^t>>>14)>>>0)/4294967296}}
function woodTexture(kind){
 const colors={ceviz:[82,52,32],mese:[150,117,77],koyu:[35,31,27]};
 const base=colors[kind],w=2048,h=512,canvas=document.createElement('canvas');canvas.width=w;canvas.height=h;
 const ctx=canvas.getContext('2d'),data=ctx.createImageData(w,h),rng=seeded(7123),arr=data.data;
 for(let y=0;y<h;y++)for(let x=0;x<w;x++){
  const nx=x/w,ny=y/h,warp=12*Math.sin(nx*7+ny*3)+5*Math.sin(nx*17-ny*6);
  const knot=Math.exp(-Math.pow((nx-.70)*4,2)-Math.pow((ny-.30)*8,2));
  const f=(y+warp+28*knot*Math.sin(nx*9))*.82;
  const grain=.021*Math.sin(f)+.013*Math.sin(f*2.17)+.008*Math.sin(f*6.3);
  const broad=.022*Math.sin(ny*24+nx*1.5+warp*.10)+.032*Math.sin(ny*97+warp*.10);
  const board=Math.floor(y/128),edge=y%128<1?-.05:0;
  const light=1+grain+broad+(rng()-.5)*.055+(board-1.5)*.018+edge;
  const i=(y*w+x)*4;arr[i]=base[0]*light;arr[i+1]=base[1]*light;arr[i+2]=base[2]*light;arr[i+3]=255;
 }
 ctx.putImageData(data,0,0);const tex=new THREE.CanvasTexture(canvas);tex.colorSpace=THREE.SRGBColorSpace;tex.wrapS=tex.wrapT=THREE.RepeatWrapping;tex.anisotropy=8;return tex;
}
function softShadowTexture(){const c=document.createElement('canvas');c.width=c.height=128;const x=c.getContext('2d'),g=x.createRadialGradient(64,64,2,64,64,64);g.addColorStop(0,'rgba(58,42,30,.30)');g.addColorStop(.55,'rgba(58,42,30,.14)');g.addColorStop(1,'rgba(58,42,30,0)');x.fillStyle=g;x.fillRect(0,0,128,128);return new THREE.CanvasTexture(c)}
function shapeRect(w,d,r=.025,cx=0,cz=0){const s=new THREE.Shape(),x=cx-w/2,z=cz-d/2;s.moveTo(x+r,z);s.lineTo(x+w-r,z);s.quadraticCurveTo(x+w,z,x+w,z+r);s.lineTo(x+w,z+d-r);s.quadraticCurveTo(x+w,z+d,x+w-r,z+d);s.lineTo(x+r,z+d);s.quadraticCurveTo(x,z+d,x,z+d-r);s.lineTo(x,z+r);s.quadraticCurveTo(x,z,x+r,z);return s;}

export function createDeskScene(host,initial={},hooks={}){
 if(!host||!host.isConnected)throw Error('3D stage is unavailable');
 let dead=false,visible=true,anim=null,frameCount=0,last=0,needs=true,autoRotate=false,theme='day',dimensionVisible=false,automaticFrame=true,roomFraming=true,orbitDirection=1;
 let atmosphere={mode:'atelier',shelves:true,lights:true,props:true};let atelier,deskStyling;
 let target=normalized(initial),current={height:target.height,angle:target.angle,drawer:target.drawers?1:0,door:target.door?1:0};
 const scene=new THREE.Scene();scene.background=new THREE.Color('#eee7dc');scene.fog=new THREE.Fog('#eee7dc',10,25);
 const camera=new THREE.PerspectiveCamera(35,1,.05,35);camera.position.set(2.45,1.85,3.1);
 const renderer=new THREE.WebGLRenderer({antialias:true,alpha:false,powerPreference:'high-performance',preserveDrawingBuffer:true});
 renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.8));renderer.setSize(Math.max(host.clientWidth,1),Math.max(host.clientHeight,1),false);
 renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.0;
 renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
 const canvas=renderer.domElement;canvas.setAttribute('aria-label','Çift raflı Elif stüdyosu. Devir 01. Yükseklik ayarlı, çekmeceli ve döner yan tablalı üç boyutlu konsept masa');canvas.setAttribute('role','img');canvas.tabIndex=0;canvas.dataset.engine='Three.js '+THREE.REVISION;host.appendChild(canvas);
 const controls=new OrbitControls(camera,canvas);controls.target.set(.10,.64,.22);controls.enableDamping=true;controls.dampingFactor=.09;controls.enablePan=false;controls.enableZoom=false;controls.minDistance=2;controls.maxDistance=7;controls.minPolarAngle=.15;controls.maxPolarAngle=Math.PI/2-.07;controls.rotateSpeed=.6;controls.touches.ONE=THREE.TOUCH.ROTATE;controls.touches.TWO=THREE.TOUCH.DOLLY_PAN;
 // Wheel remains ordinary page scrolling, including on mobile.
 canvas.style.touchAction='pan-y';controls.addEventListener('change',invalidate);controls.addEventListener('start',()=>{automaticFrame=false});
 const pmrem=new THREE.PMREMGenerator(renderer),envScene=new RoomEnvironment(),env=pmrem.fromScene(envScene,.04);scene.environment=env.texture;scene.environmentIntensity=.55;envScene.dispose();pmrem.dispose();
 const ambient=new THREE.HemisphereLight(0xfff5e5,0x8a8071,1.10);scene.add(ambient);
 const sun=new THREE.DirectionalLight(0xffe8c3,2.75);sun.position.set(-3.8,5.8,3.6);sun.castShadow=true;sun.shadow.mapSize.set(host.clientWidth<650?1024:2048,host.clientWidth<650?1024:2048);sun.shadow.camera.left=-3.4;sun.shadow.camera.right=3.4;sun.shadow.camera.top=3.4;sun.shadow.camera.bottom=-3.4;sun.shadow.camera.near=.5;sun.shadow.camera.far=16;sun.shadow.normalBias=.018;sun.shadow.bias=-.0001;sun.shadow.radius=3;sun.target.position.set(0,.3,0);scene.add(sun,sun.target);
 const fill=new THREE.DirectionalLight(0xe7eef4,1);fill.position.set(4,3,-2);scene.add(fill);
 const woods=Object.fromEntries(['ceviz','mese','koyu'].map(k=>{const map=woodTexture(k);return[k,new THREE.MeshPhysicalMaterial({map,bumpMap:map,bumpScale:.00065,roughness:.41,metalness:0,clearcoat:.22,clearcoatRoughness:.45,envMapIntensity:.55})]}));
 const dark=new THREE.MeshStandardMaterial({color:0x282926,roughness:.37,metalness:.52});
 const brass=new THREE.MeshStandardMaterial({color:0xba9053,roughness:.28,metalness:.80});
 const inside=new THREE.MeshStandardMaterial({color:0x56473a,roughness:.94});
 const rubber=new THREE.MeshStandardMaterial({color:0x242621,roughness:.88});
 const floorMat=new THREE.MeshStandardMaterial({color:0xe6dfd3,roughness:.87});
 const floor=new THREE.Mesh(new THREE.PlaneGeometry(100,100),floorMat);floor.rotation.x=-Math.PI/2;floor.receiveShadow=true;floor.position.y=-.012;scene.add(floor);
 const shadowTex=softShadowTexture(),contact=new THREE.Mesh(new THREE.PlaneGeometry(3.2,2.5),new THREE.MeshBasicMaterial({map:shadowTex,transparent:true,depthWrite:false}));contact.rotation.x=-Math.PI/2;contact.position.set(.15,-.007,.15);scene.add(contact);
 const ringPoints=Array.from({length:161},(_,i)=>{const a=i/160*Math.PI*2;return new THREE.Vector3(Math.cos(a)*1.67,.001,Math.sin(a)*1.45+.10)});
 const ring=new THREE.Line(new THREE.BufferGeometry().setFromPoints(ringPoints),new THREE.LineBasicMaterial({color:0xcabdab,transparent:true,opacity:.4}));scene.add(ring);
 let model,upper,wing,mainDrawers=[],cabinetDrawer,door,posts=[],W=0,D=0,woodMeshes=[];
 const allMaterials=[...Object.values(woods),dark,brass,inside,rubber];
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
  const cw=.49,cd=Math.max(.51,D-.14),cy=.33;
  box(.026,.626,cd,[right-cw/2+.013,cy,0],model);
  box(.026,.626,cd,[right+cw/2-.013,cy,0],model);
  box(cw,.026,cd,[right,.64,0],model);
  box(cw,.032,cd,[right,.04,0],model);
  box(cw,.024,cd,[right,.448,0],model);
  box(cw,.58,.023,[right,.33,-cd/2+.011],model);
  box(cw-.05,.017,cd-.04,[right,.225,0],model);
  cabinetDrawer=new THREE.Group();cabinetDrawer.position.set(right,.53,cd/2);model.add(cabinetDrawer);cabinetDrawer.name='dolap-cekmece';
  box(cw-.047,.026,cd-.06,[0,-.065,-cd/2+.035],cabinetDrawer,inside,.005);
  box(cw-.038,.142,.027,[0,0,0],cabinetDrawer,woods[target.material],.008);
  box(.014,.075,cd-.07,[-cw/2+.033,-.032,-cd/2+.04],cabinetDrawer,woods[target.material],.004);
  box(.014,.075,cd-.07,[cw/2-.033,-.032,-cd/2+.04],cabinetDrawer,woods[target.material],.004);
  knob(0,.009,.021,cabinetDrawer);
  door=new THREE.Group();door.position.set(right+cw/2-.03,.24,cd/2+.003);door.name='dolap-kapak';model.add(door);
  box(cw-.058,.382,.023,[-cw/2+.029,0,0],door,woods[target.material],.008);
  knob(-cw+.105,.12,.021,door);
  // Telescoping posts. Both raise the same upper assembly and never move the cabinet.
  for(const x of [left,right]){
   const sleeve=box(.089,.155,.089,[x,.625,0],model,dark,.006);
   const post=box(.068,1,.068,[x,1,0],model,dark,.005,'teleskopik-kolon');posts.push(post);
   box(.101,.013,.101,[x,.59,0],model,rubber,.003);
  }
  upper=new THREE.Group();upper.name='yukselen-cekmece-tabla';model.add(upper);
  box(W,.032,D,[0,-.016,0],upper,woods[target.material],.020,'ana-tabla');
  box(W-.06,.026,.045,[0,-.09,-D/2+.045],upper,dark,.004,'taşıyıcı-travers');
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
  deskStyling=new THREE.Group();deskStyling.name='desk-styling';upper.add(deskStyling);
  const laptop=box(.29,.013,.205,[.12,.012,-D*.15],deskStyling,dark,.009,'closed-laptop');
  box(.15,.025,.10,[-W*.12,.026,-D*.21],deskStyling,inside,.004,'notebook');
  const lampX=-W*.31,lampZ=-D*.21;
  const base=mesh(new THREE.CylinderGeometry(.068,.071,.016,32),brass,deskStyling,[lampX,.016,lampZ]);
  mesh(new THREE.CylinderGeometry(.006,.010,.19,20),brass,deskStyling,[lampX,.118,lampZ]);
  const shade=mesh(new THREE.SphereGeometry(.103,32,16,0,Math.PI*2,0,Math.PI/2),brass,deskStyling,[lampX,.235,lampZ]);
  mesh(new THREE.CylinderGeometry(.033,.030,.072,24),inside,deskStyling,[W*.28,.047,-D*.18]);
  deskStyling.visible=atmosphere.props;
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
  const box3=new THREE.Box3().setFromObject(model);box3.max.y=Math.max(box3.max.y,1.28);
  if(atmosphere.mode==='atelier'&&roomFraming){box3.expandByPoint(new THREE.Vector3(-1.85,0,-1.32));box3.expandByPoint(new THREE.Vector3(1.85,2.24,-1.32));}
  const center=box3.getCenter(new THREE.Vector3()),dir=camera.position.clone().sub(controls.target).normalize();
  const right=new THREE.Vector3().crossVectors(camera.up,dir);if(right.lengthSq()<.000001)right.set(1,0,0);right.normalize();
  const up=new THREE.Vector3().crossVectors(dir,right).normalize(),tv=Math.tan(THREE.MathUtils.degToRad(camera.fov)/2),th=tv*camera.aspect;
  let distance=2.0;
  for(const x of [box3.min.x,box3.max.x])for(const y of [box3.min.y,box3.max.y])for(const z of [box3.min.z,box3.max.z]){
   const v=new THREE.Vector3(x,y,z).sub(center),front=v.dot(dir);
   distance=Math.max(distance,front+Math.abs(v.dot(right))/th,front+Math.abs(v.dot(up))/tv);
  }
  controls.target.copy(center);camera.position.copy(center).addScaledVector(dir,distance*1.10);controls.update();
 }
 function screenBounds(){model.updateMatrixWorld(true);camera.updateMatrixWorld(true);const b=new THREE.Box3().setFromObject(model),out={minX:Infinity,maxX:-Infinity,minY:Infinity,maxY:-Infinity};for(const x of [b.min.x,b.max.x])for(const y of [b.min.y,b.max.y])for(const z of [b.min.z,b.max.z]){const p=new THREE.Vector3(x,y,z).project(camera);out.minX=Math.min(out.minX,p.x);out.maxX=Math.max(out.maxX,p.x);out.minY=Math.min(out.minY,p.y);out.maxY=Math.max(out.maxY,p.y);}return out;}
 function projectLabels(){const H=current.height/100,positions=[[0,H+.20,-D/2-.06],[W/2+.18,H+.11,0],[-W/2-.18,H/2,0]];dgroup.visible=dimensionVisible;labels.forEach((el,i)=>{const v=new THREE.Vector3(...positions[i]).project(camera);el.style.display=dimensionVisible&&v.z<1?'block':'none';el.style.left=(v.x*.5+.5)*100+'%';el.style.top=(-v.y*.5+.5)*100+'%';})}
 function apply(){if(!upper)return;const h=current.height/100;upper.position.y=h;for(const post of posts){const len=Math.max(.05,h-.59);post.scale.y=len;post.position.y=.55+len/2;}wing.rotation.y=current.angle*Math.PI/180;mainDrawers.forEach((g,i)=>g.position.z=D/2-.012+current.drawer*(i===1?.30:.15));cabinetDrawer.position.z=Math.max(.51,D-.14)/2+current.drawer*.23;door.rotation.y=-current.door*Math.PI*.54;updateDimensions();frameModel();}
 function render(){if(dead||!visible||document.hidden)return;controls.update();projectLabels();renderer.render(scene,camera);frameCount++;}
 function tick(t){anim=null;if(dead||!visible||document.hidden)return;const dt=Math.min(.5,Math.max(.001,(t-last)/1000||.016));last=t;const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches,alpha=reduced?1:1-Math.exp(-dt*9);
  const targets={height:target.height,angle:target.angle,drawer:target.drawers?1:0,door:target.door?1:0};let moving=false;for(const key of Object.keys(targets)){const diff=targets[key]-current[key];if(Math.abs(diff)>.001){current[key]+=diff*alpha;moving=true}else current[key]=targets[key]}
  if(moving)apply();if(autoRotate&&!reduced){const off=camera.position.clone().sub(controls.target);if(atmosphere.mode==='atelier'&&Math.abs(Math.atan2(off.x,off.z))>1.02)orbitDirection=Math.atan2(off.x,off.z)>0?-1:1;off.applyAxisAngle(new THREE.Vector3(0,1,0),dt*.16*orbitDirection);camera.position.copy(controls.target).add(off);moving=true}
  needs=false;render();if((moving||needs)&&!anim)anim=requestAnimationFrame(tick);
 }
 function invalidate(){needs=true;if(!dead&&visible&&!document.hidden&&!anim)anim=requestAnimationFrame(tick)}
 function resize(){if(dead)return;const w=Math.max(host.clientWidth,1),h=Math.max(host.clientHeight,1);camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h,false);frameModel();invalidate()}
 const ro=new ResizeObserver(resize);ro.observe(host);
 const io=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible){last=performance.now();invalidate()}else if(anim){cancelAnimationFrame(anim);anim=null}},{threshold:.01});io.observe(host);
 const onVisibility=()=>{if(document.hidden&&anim){cancelAnimationFrame(anim);anim=null}else invalidate()};document.addEventListener('visibilitychange',onVisibility);
 const onLost=e=>{e.preventDefault();if(anim)cancelAnimationFrame(anim);anim=null;hooks.status?.('lost');};canvas.addEventListener('webglcontextlost',onLost);
 const onRestored=()=>{hooks.status?.('ready');invalidate()};canvas.addEventListener('webglcontextrestored',onRestored);
 function view(name='perspective'){automaticFrame=name!=='detail';roomFraming=!['detail','top'].includes(name);
  controls.target.set(.08,.64,.15);
  const wide=W>2?1.10:1;
  if(name==='top'){camera.position.set(.08,4.8*wide,.151);controls.target.y=.3;}
  else if(name==='front')camera.position.set(.1,1.25,4.1*wide);
  else if(name==='detail'){camera.position.set(1.5,1.3,1.9);controls.target.set(W/2-.24,.55,.15);}
  else if(name==='left')camera.position.set(-2.45*wide,1.65,3.3*wide);
  else if(name==='right')camera.position.set(2.45*wide,1.65,3.3*wide);
  else camera.position.set(atmosphere.mode==='atelier'?.55:2.45*wide,atmosphere.mode==='atelier'?1.13:1.85*wide,3.8*wide);
  frameModel();controls.update();invalidate();
 }
 const onKey=e=>{if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','+','-','0'].includes(e.key)){e.preventDefault();if(e.key==='0')view();else if(e.key==='+'||e.key==='-')zoom(e.key==='+'?.90:1.10);else{const offset=camera.position.clone().sub(controls.target);if(e.key==='ArrowLeft'||e.key==='ArrowRight')offset.applyAxisAngle(new THREE.Vector3(0,1,0),e.key==='ArrowLeft'?.16:-.16);else offset.y=Math.min(5,Math.max(.3,offset.y+(e.key==='ArrowUp'?.15:-.15)));camera.position.copy(controls.target).add(offset);controls.update();invalidate()}}};canvas.addEventListener('keydown',onKey);
 function zoom(f){automaticFrame=false;const v=camera.position.clone().sub(controls.target);const len=THREE.MathUtils.clamp(v.length()*f,2,7);v.setLength(len);camera.position.copy(controls.target).add(v);invalidate()}
 atelier=createAtelierRoom(scene,woods,brass,invalidate);controls.minAzimuthAngle=-1.35;controls.maxAzimuthAngle=1.35;
 build();ring.visible=false;resize();view();render();hooks.status?.('ready');
 const api={
  update(next){if(!anim)last=performance.now();const old=target;target=normalized(next);if(old.width!==target.width||old.depth!==target.depth)build();else if(old.material!==target.material)woodMeshes.forEach(m=>m.material=woods[target.material]);atelier.setMaterial(target.material);invalidate()},
  setView:view,zoom,
  environment(next){atmosphere={...atmosphere,...next};controls.minAzimuthAngle=atmosphere.mode==='atelier'?-1.35:-Infinity;controls.maxAzimuthAngle=atmosphere.mode==='atelier'?1.35:Infinity;atelier.update(atmosphere);if(deskStyling)deskStyling.visible=atmosphere.props;ring.visible=atmosphere.mode==='product';view();invalidate();},
  dimensions(show){dimensionVisible=!!show;invalidate()},
  rotate(on){automaticFrame=false;autoRotate=!!on;invalidate()},
  light(mode){theme=mode;atelier.light(mode);const dusk=mode==='evening';scene.background.set(dusk?'#e0d1bd':'#eee7dc');scene.fog.color.copy(scene.background);floorMat.color.set(dusk?'#d9cbb4':'#e6dfd3');sun.color.set(dusk?0xffd497:0xffe8c3);sun.intensity=dusk?1.6:2.75;ambient.intensity=dusk?.72:1.10;renderer.toneMappingExposure=dusk?.96:1.0;invalidate()},
  snapshot(width=1920,height=1280){if(dead)throw Error('Scene disposed');const w=host.clientWidth,h=host.clientHeight,ratio=renderer.getPixelRatio();renderer.setPixelRatio(1);renderer.setSize(width,height,false);camera.aspect=width/height;camera.updateProjectionMatrix();renderer.render(scene,camera);const data=canvas.toDataURL('image/png');renderer.setPixelRatio(ratio);renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();invalidate();return data},
  inspect(){return {atelier:atelier.inspect(),deskStyling:!!deskStyling?.visible,engine:'Three.js',revision:THREE.REVISION,frameCount,visible,drawCalls:renderer.info.render.calls,triangles:renderer.info.render.triangles,config:{...target},geometry:{mainTopY:upper.position.y,fixedPanelY:model.getObjectByName('sol-ahsap-tasiyici').position.y,returnTopY:wing.position.y,wingAngle:wing.rotation.y,cabinetDrawerZ:cabinetDrawer.position.z,mainDrawerZ:mainDrawers[1].position.z,doorAngle:door.rotation.y},camera:camera.position.toArray(),material:target.material,theme,dimensions:dimensionVisible,contextLost:renderer.getContext().isContextLost(),gpuTextures:renderer.info.memory.textures,framing:screenBounds()}},
  dispose(){if(dead)return;dead=true;if(anim)cancelAnimationFrame(anim);ro.disconnect();io.disconnect();document.removeEventListener('visibilitychange',onVisibility);canvas.removeEventListener('keydown',onKey);canvas.removeEventListener('webglcontextlost',onLost);canvas.removeEventListener('webglcontextrestored',onRestored);controls.dispose();atelier.dispose();disposeModel();scene.traverse(o=>o.geometry?.dispose());for(const mat of allMaterials){mat.map?.dispose();mat.dispose()}floorMat.dispose();shadowTex.dispose();contact.material.dispose();ring.material.dispose();dmat.dispose();env.dispose();renderer.dispose();labels.forEach(el=>el.remove());canvas.remove();host.__elif3D=null;}
 };
 host.__elif3D=api;return api;
}
window.ElifDesk3D={createDeskScene,revision:THREE.REVISION};
