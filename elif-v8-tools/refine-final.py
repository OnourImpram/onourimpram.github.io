from pathlib import Path
import sys
r=Path(sys.argv[1])
replacements={'Yapay zekâ ile hazırlanmış temsili mobilya sahnesi.':'Konsept mobilya sahnesi.','yapay zekâ ile üretilmiş temsili tasarım':'konsept model','Yapay zekâ ile hazırlanmış tasarım fikirleri.':'Konsept modeller ve tasarım fikirleri.','Temsili tasarım görseli':'Konsept model'}
for p in (r/'src').rglob('*.tsx'):
 s=p.read_text()
 for a,b in replacements.items():s=s.replace(a,b)
 p.write_text(s)
p=r/'public/three/desk-scene.mjs';s=p.read_text()
s=s.replace("theme='day',dimensionVisible=false;", "theme='day',dimensionVisible=false,automaticFrame=true;")
s=s.replace("controls.addEventListener('change',invalidate);", "controls.addEventListener('change',invalidate);controls.addEventListener('start',()=>{automaticFrame=false});")
marker=" function projectLabels()"
helper=''' function frameModel(){
  if(!model||!automaticFrame)return;
  model.updateMatrixWorld(true);
  const box3=new THREE.Box3().setFromObject(model);box3.max.y=Math.max(box3.max.y,1.28);
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
'''
assert marker in s;s=s.replace(marker,helper+marker)
s=s.replace("door.rotation.y=-current.door*Math.PI*.54;updateDimensions();}", "door.rotation.y=-current.door*Math.PI*.54;updateDimensions();frameModel();}")
s=s.replace("renderer.setSize(w,h,false);invalidate()}", "renderer.setSize(w,h,false);frameModel();invalidate()}")
s=s.replace("function view(name='perspective'){", "function view(name='perspective'){automaticFrame=name!=='detail';")
s=s.replace("  controls.update();invalidate();\n }", "  frameModel();controls.update();invalidate();\n }")
s=s.replace("function zoom(f){", "function zoom(f){automaticFrame=false;")
s=s.replace("rotate(on){autoRotate=!!on;", "rotate(on){automaticFrame=false;autoRotate=!!on;")
s=s.replace("gpuTextures:renderer.info.memory.textures", "gpuTextures:renderer.info.memory.textures,framing:screenBounds()")
p.write_text(s)
p=r/'tests/v8/browser.py';s=p.read_text();needle="first=page.locator('.v8-canvas-wrap').screenshot"
s=s.replace(needle,"check('Default camera contains the entire desk geometry',all(abs(v)<=1.001 for v in s['framing'].values()),s['framing'])\n "+needle)
p.write_text(s)
