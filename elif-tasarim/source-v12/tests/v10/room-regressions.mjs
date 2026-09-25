import test from 'node:test';
import assert from 'node:assert/strict';
import {createAtelierRoom} from '../../public/three/atelier-room.mjs';
test('hidden bookcases do not leave point lights behind',()=>{
 const room=createAtelierRoom();room.setShelves('none');const lights=[];room.root.traverse(o=>{if(o.isPointLight)lights.push(o)});
 assert.equal(lights.filter(o=>o.visible&&o.intensity>0).length,0);room.dispose();
});
