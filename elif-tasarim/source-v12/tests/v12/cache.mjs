import {test} from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
test('Changed scene and room have versioned browser URLs while offline dependency IDs remain local',()=>{
 assert.match(fs.readFileSync('src/components/DeskExperience.tsx','utf8'),/desk-scene\.mjs\?v=v20-master-atelier/);
 assert.match(fs.readFileSync('public/three/desk-scene.mjs','utf8'),/atelier-room\.mjs\?v=v20-master-atelier/);
 assert.ok(fs.readFileSync('tools/build-v20.cjs','utf8').includes("m[1].split('?')[0]"));
});
