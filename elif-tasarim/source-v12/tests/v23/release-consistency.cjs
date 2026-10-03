const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
test('active V23 package and generated publication manifest have the same version',()=>{
 const pkg=JSON.parse(fs.readFileSync('package.json','utf8'));
 const manifest=JSON.parse(fs.readFileSync('dist/release-v23.json','utf8'));
 assert.equal(manifest.version,pkg.version);
 assert.equal(manifest.release,'v28-completed-works');
});
