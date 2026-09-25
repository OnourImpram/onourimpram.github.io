import test from 'node:test';
import assert from 'node:assert/strict';
import { createAtelierRoom } from '../../public/three/atelier-room.mjs';

test('both real shelving groups have four load-bearing shelf levels',()=>{
 const a=createAtelierRoom(); assert.equal(a.root.name,'elif-v9-atelier');
 assert.equal(a.left.name,'sol-rafli-kitaplik'); assert.equal(a.right.name,'sag-rafli-kitaplik');
 for(const side of ['sol','sag']) for(let i=0;i<4;i++) assert.ok(a.root.getObjectByName(`${side}-raf-${i}`).isMesh);
 assert.equal(a.stats().shelves,8); assert.equal(a.stats().visibleBookcases,2); a.dispose();
});
test('shelf visibility is independent and product mode hides the room',()=>{
 const a=createAtelierRoom(); a.setShelves('left');assert.equal(a.left.visible,true);assert.equal(a.right.visible,false);
 a.setShelves('right');assert.equal(a.left.visible,false);assert.equal(a.right.visible,true);
 a.setShelves('none');assert.equal(a.stats().visibleBookcases,0);
 a.setShelves('both');a.setVisible(false);assert.equal(a.root.visible,false);a.setVisible(true);assert.equal(a.stats().visibleBookcases,2);a.dispose();
});
test('shelf light clamps inputs without nonfinite scene properties',()=>{
 const a=createAtelierRoom(); a.setLight(999);assert.equal(a.stats().shelfLight,100);
 a.setLight(-99);assert.equal(a.stats().shelfLight,0);a.setLight(NaN);assert.equal(a.stats().shelfLight,65);
 a.root.traverse(o=>{for(const v of o.position.toArray())assert.ok(Number.isFinite(v))});a.dispose();
});
test('decor is actual geometry and cleanup is idempotent',()=>{
 const a=createAtelierRoom();assert.ok(a.root.getObjectByName('calisma-koltugu'));assert.ok(a.root.getObjectByName('sol-bitki'));assert.ok(a.stats().meshes>70);a.dispose();a.dispose();assert.equal(a.stats().disposed,true);
});
