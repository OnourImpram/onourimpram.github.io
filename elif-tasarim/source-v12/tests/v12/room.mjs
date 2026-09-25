import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createAtelierRoom} from '../../public/three/atelier-room.mjs';
test('Cutaway does not overwrite selected shelf or lighting preferences',()=>{
 const room=createAtelierRoom();room.setShelves('left');room.setLight(77);
 assert.equal(typeof room.setCutaway,'function');room.setCutaway(true);
 let s=room.stats();assert.equal(s.visibleBookcases,0);assert.equal(s.activeShelfLights,0);assert.equal(s.selection,'left');assert.equal(s.shelfLight,77);assert.equal(s.architectureVisible,false);
 room.setShelves('right');room.setCutaway(false);s=room.stats();assert.equal(s.visibleBookcases,1);assert.equal(s.selection,'right');assert.equal(s.architectureVisible,true);assert.equal(s.chairVisible,true);room.dispose();
});
