/** Original V9 atelier furniture, in metres. Display furniture is not a fabrication plan. */
import * as THREE from './vendor/three.module.min.js';
import {RoundedBoxGeometry} from './vendor/RoundedBoxGeometry.js';
import {batchStatic} from './batch-static.mjs';

export function createAtelierRoom(options={}) {
 const root=new THREE.Group();root.name='elif-v9-atelier';
 const owned=new Set(), shared=new Set(Object.values(options.woods||{}));
 const mat=(p)=>{const m=new THREE.MeshStandardMaterial(p);owned.add(m);return m};
 const oak=options.woods?.ceviz||mat({color:'#72503b',roughness:.48});
 const trim=mat({color:'#44362a',roughness:.5});
 const stone=mat({color:'#d6cbb8',roughness:.96,map:options.plaster||null,bumpMap:options.plaster||null,bumpScale:.003});
 const brass=options.brass||mat({color:'#b39565',metalness:.7,roughness:.33});
 const parchment=mat({color:'#c9b99b',roughness:.98});
 const dark=mat({color:'#403f35',roughness:.98});
 const clay=mat({color:'#b4a088',roughness:.94});
 const ceramic=mat({color:'#d8ccba',roughness:.56});
 const rugMat=mat({color:'#bbae96',roughness:1,map:options.linen||null,bumpMap:options.linen||null,bumpScale:.003});
 const lamps=mat({color:'#ffdfad',emissive:'#ffbc65',emissiveIntensity:.8,roughness:.4});
 const lightwash=new THREE.MeshBasicMaterial({color:'#ffcd8a',transparent:true,opacity:.10,depthWrite:false});owned.add(lightwash);
 const books=[parchment,dark,clay,ceramic,mat({color:'#8d7c65',roughness:.95}),mat({color:'#676e5d',roughness:.98})];
 let disposed=false,selection='both',power=65;
 const mesh=(geo,m,parent,pos,name)=>{const o=new THREE.Mesh(geo,m);o.position.set(...pos);o.castShadow=true;o.receiveShadow=true;if(name)o.name=name;parent.add(o);return o};
 function box(w,h,d,pos,parent,m=oak,name='',r=.008){const g=new RoundedBoxGeometry(w,h,d,2,Math.min(r,w/4,h/4,d/4));if(m===oak&&h>Math.max(w,d)*.7){const uv=g.attributes.uv;for(let i=0;i<uv.count;i++){const u=uv.getX(i);uv.setXY(i,uv.getY(i),u)}uv.needsUpdate=true;}return mesh(g,m,parent,pos,name)}
 function cylinder(r1,r2,h,pos,parent,m=brass,name=''){return mesh(new THREE.CylinderGeometry(r1,r2,h,20),m,parent,pos,name)}
 function vase(x,y,z,parent,scale=1,m=ceramic){
  const points=[[.040,0],[.062,.02],[.080,.07],[.073,.13],[.042,.18],[.030,.21],[.030,.23]].map(([a,b])=>new THREE.Vector2(a*scale,b*scale));
  return mesh(new THREE.LatheGeometry(points,24),m,parent,[x,y,z],'seramik-vazo');
 }
 function book(x,y,z,parent,i,flat=false){
  const h=.19+(i%4)*.025,w=.024+(i%3)*.007;
  const b=new THREE.Group();b.position.set(x,y,z);parent.add(b);
  box(w,h,.15,[0,h/2,0],b,books[i%books.length],'kitap',.002);
  box(w*.8,.002,.002,[0,h*.75,.076],b,brass,'',.0004);
  box(w*.8,.002,.002,[0,.025,.076],b,parchment,'',.0004);
  if(flat){b.rotation.z=Math.PI/2;b.position.y+=w/2;b.position.x+=h/2}return b;
 }
 function plant(x,y,z,parent,name,scale=1){
  const g=new THREE.Group();g.name=name;g.position.set(x,y,z);g.scale.setScalar(scale);parent.add(g);
  vase(0,0,0,g,1.1,clay);
  const stemMat=mat({color:'#5d5140',roughness:1}),leafMat=mat({color:'#5b634b',roughness:.86,side:THREE.DoubleSide});
  const leaf=new THREE.Shape();leaf.moveTo(0,0);leaf.quadraticCurveTo(.06,.037,.0,.15);leaf.quadraticCurveTo(-.038,.065,0,0);
  const geo=new THREE.ShapeGeometry(leaf,5),leaves=new THREE.InstancedMesh(geo,leafMat,48);leaves.castShadow=true;g.add(leaves);
  const dummy=new THREE.Object3D();let index=0;
  for(let b=0;b<6;b++){
   const angle=b*2.399,dx=Math.sin(angle)*(.16+(b%2)*.10),dz=Math.cos(angle)*.15;
   const curve=new THREE.QuadraticBezierCurve3(new THREE.Vector3(0,.20,0),new THREE.Vector3(dx*.6,.43,dz*.5),new THREE.Vector3(dx,.58+(b%3)*.09,dz));
   mesh(new THREE.TubeGeometry(curve,10,.003,4,false),stemMat,g,[0,0,0]);
   for(let j=0;j<8;j++){const p=curve.getPoint(.18+j*.10);dummy.position.copy(p);dummy.rotation.set(.25*Math.sin(j),angle+(j%2?1:-1),j%2?.8:-.8);dummy.scale.setScalar(.58+(j%3)*.12);dummy.updateMatrix();leaves.setMatrixAt(index++,dummy.matrix)}
  }
  leaves.instanceMatrix.needsUpdate=true;return g;
 }
 // Architectural background. The two libraries are separately selectable, not a painted backdrop.
 const wall=box(12,6,.045,[0,2.6,-1.52],root,stone,'tas-duvar',.003);
 for(const sign of [-1,1])box(.025,2.9,.025,[sign*.62,1.49,-1.485],root,trim,'ince-duvar-detayi',.002);
 // Central wall typography uses an optional local canvas texture, never a bundled font file.
 if(options.brand){const m=new THREE.MeshBasicMaterial({map:options.brand,transparent:true,depthWrite:false});owned.add(m);mesh(new THREE.PlaneGeometry(.67,.51),m,root,[0,1.81,-1.483],'elif-duvar-imzasi')}
 const left=new THREE.Group(),right=new THREE.Group();left.name='sol-rafli-kitaplik';right.name='sag-rafli-kitaplik';root.add(left,right);
 function library(group,side,x,seed){
  const w=1.05,d=.37,z=-1.20;group.position.set(x,0,z);
  box(w,.045,d,[0,.044,0],group,trim,'kitaplik-baza');
  box(w,.58,d,[0,.32,0],group,oak,'alt-dolap');
  for(let i=0;i<20;i++)box(.009,.49,.006,[-w/2+.034+i*(w-.07)/19,.32,d/2+.006],group,trim,'kapak-cita',.001);
  for(const sign of [-1,1])box(.037,2.47,d,[sign*(w/2-.0185),1.275,0],group,oak,'kitaplik-yanlik');
  box(w,2.46,.018,[0,1.27,-d/2+.009],group,oak,'kitaplik-arkalik');
  box(w,.035,d,[0,2.505,0],group,oak,'kitaplik-ust');
  for(let level=0;level<4;level++){
   const yy=.64+level*.46;
   box(w-.038,.028,d,[0,yy,0],group,oak,`${side}-raf-${level}`);
   box(w-.10,.005,.016,[0,yy+.423,d/2-.034],group,lamps,`${side}-raf-isigi-${level}`,0.001);
   const wash=mesh(new THREE.PlaneGeometry(w-.10,.34),lightwash,group,[0,yy+.21,-d/2+.022]);wash.castShadow=false;
   const start=(level+seed)%2===0?-.40:.08;
   for(let i=0;i<5;i++)book(start+i*.049,yy+.015,.015,group,i+level+seed);
   if(level%2===0){vase(start<0?.30:-.25,yy+.015,.02,group,.9,level===0?clay:ceramic);}
   else {book(start<0?.24:-.38,yy+.015,.025,group,3+seed,true);book(start<0?.24:-.38,yy+.056,.025,group,2+seed,true);cylinder(.045,.055,.07,[start<0?.31:-.31,yy+.125,.02],group,ceramic);}
  }
 }
 library(left,'sol',-1.31,1);library(right,'sag',1.31,4);
 const localLights=[-1.31,1.31].map(x=>{const l=new THREE.PointLight(0xffd3a0,.32,2,2);l.position.set(x,1.65,-.84);root.add(l);return l});
 plant(-1.59,1.575,-1.06,root,'sol-bitki',.67);
 plant(1.51,.655,-1.03,root,'sag-bitki',.68);
 // Travertine floor panel and fine woven rug under the desk.
 const rug=box(3.30,.012,2.30,[.05,-.001,.22],root,rugMat,'dokuma-hali',.06);rug.castShadow=false;
 for(const sign of [-1,1])box(3.23,.001,.012,[.05,.005,.22+sign*1.08],root,parchment,'hali-kenari',.001);
 // Suspended brass luminaire, independently dimmable with the shelf lighting.
 box(1.85,.034,.060,[0,2.60,-.24],root,brass,'pirinc-sarkit');
 box(1.78,.005,.041,[0,2.581,-.24],root,lamps,'sarkit-isigi',.001);
 for(const sign of [-1,1])cylinder(.002,.002,.45,[sign*.68,2.84,-.24],root,trim);
 // Upholstered chair behind the desk. Staging, not an implied sales inclusion.
 const chair=new THREE.Group();chair.name='calisma-koltugu';chair.position.set(-.10,0,-.61);root.add(chair);
 const leather=mat({color:'#5a4031',roughness:.67}),chairMetal=mat({color:'#332d27',metalness:.75,roughness:.37});
 cylinder(.03,.035,.35,[0,.26,0],chair,chairMetal);
 for(let i=0;i<5;i++){const a=i/5*Math.PI*2,g=new THREE.Group();g.rotation.y=a;chair.add(g);box(.04,.025,.31,[0,.09,.13],g,chairMetal);const wheel=cylinder(.029,.029,.029,[0,.058,.28],g,chairMetal);wheel.rotation.z=Math.PI/2}
 box(.50,.09,.48,[0,.49,0],chair,leather,'koltuk-oturum',.035);
 const back=box(.51,.52,.09,[0,.77,-.205],chair,leather,'koltuk-sirt',.04);back.rotation.x=-.07;
 for(const sign of [-1,1]){box(.027,.20,.025,[sign*.28,.51,0],chair,chairMetal);box(.065,.037,.32,[sign*.28,.63,0],chair,leather)}
 for(let i=0;i<4;i++)cylinder(.006,.006,.003,[(i%2?1:-1)*.13,.67+Math.floor(i/2)*.19,-.151],chair,brass).rotation.x=Math.PI/2;
 function setShelves(v){selection=['both','left','right','none'].includes(v)?v:'both';left.visible=selection==='both'||selection==='left';right.visible=selection==='both'||selection==='right';const lp=root.getObjectByName('sol-bitki'),rp=root.getObjectByName('sag-bitki');lp.visible=left.visible;rp.visible=right.visible;localLights[0].visible=left.visible;localLights[1].visible=right.visible;}
 function setLight(v){power=Number.isFinite(v)?Math.max(0,Math.min(100,v)):65;lamps.emissiveIntensity=power/100*2.3;lightwash.opacity=power/100*.16;localLights.forEach(l=>l.intensity=power/100*.5);}
 function stats(){let meshes=0;root.traverse(o=>{if(o.isMesh)meshes++});return {shelves:8,visibleBookcases:Number(left.visible)+Number(right.visible),selection,shelfLight:power,activeShelfLights:localLights.filter(l=>l.visible&&l.intensity>0&&root.visible).length,meshes,disposed,visible:root.visible}}
 function dispose(){if(disposed)return;disposed=true;const gs=new Set();root.traverse(o=>{if(o.geometry)gs.add(o.geometry)});gs.forEach(g=>g.dispose());owned.forEach(m=>{if(!shared.has(m))m.dispose()});root.removeFromParent()}
 if(options.batch!==false){batchStatic(left);batchStatic(right);batchStatic(root,new Set([left,right,root.getObjectByName('sol-bitki'),root.getObjectByName('sag-bitki')]));}
 setShelves('both');setLight(65);
 return {root,left,right,wall,setShelves,setLight,setVisible:v=>root.visible=!!v,stats,dispose};
}
