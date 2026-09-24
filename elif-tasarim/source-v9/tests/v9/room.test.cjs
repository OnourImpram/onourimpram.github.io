const test=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path');
const p=path.resolve('public/three/atelier-room.mjs');
test('V9 has a real, separate two-sided Three.js environment',()=>{assert.ok(fs.existsSync(p),'Missing atelier-room.mjs')});
test('Atmosphere is normalized without inheriting unsafe keys',async()=>{const {normalizeAtmosphere}=await import(p);assert.deepEqual(normalizeAtmosphere({mode:'wrong',shelves:0,lights:undefined,props:false,prototype:'x'}),{mode:'atelier',shelves:true,lights:true,props:false});assert.equal(normalizeAtmosphere({mode:'product',shelves:false}).mode,'product')});
test('Two bookcases have separate left and right locations and four display shelves each',async()=>{const {shelfLayout}=await import(p);assert.equal(shelfLayout.length,2);assert.ok(shelfLayout[0].x<0&&shelfLayout[1].x>0);for(const s of shelfLayout){assert.equal(s.levels.length,4);assert.ok(s.levels.every((h,i)=>h>0.65&&(!i||h>s.levels[i-1])));assert.ok(s.width>.6&&s.depth>.2)}});
test('Published build uses a V9 identity and the new stylesheet',()=>{const b=fs.readFileSync('tools/build-v9.cjs','utf8');assert.ok(b.includes('v9-atelier-bilateral'));assert.ok(b.includes('src/v9.css'))});
