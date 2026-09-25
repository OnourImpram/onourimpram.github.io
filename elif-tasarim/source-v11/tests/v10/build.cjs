const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),cp=require('node:child_process'),crypto=require('node:crypto');
test('V11 has one active reproducible build and pinned engine/compiler',()=>{
 const p=JSON.parse(fs.readFileSync('package.json'));assert.equal(p.version,'0.11.0');assert.equal(p.scripts.build,'node tools/build-v11.cjs');assert.equal(p.devDependencies.typescript,'5.8.3');
 const v=JSON.parse(fs.readFileSync('public/three/vendor/package.json'));assert.equal(v.version,'0.185.1');
});
test('clean V11 builds reproduce every publication byte and include local room/engine',()=>{
 cp.execFileSync(process.execPath,['tools/build-v11.cjs']);const a=fs.readFileSync('dist/release-v11.json','utf8'),m=JSON.parse(a);
 assert.equal(m.release,'v11-coherent-project');assert.equal(m.routes.length,43);assert.equal(m.indexable,false);
 for(const n of ['three/atelier-room.mjs','three/desk-scene.mjs','three/vendor/three.module.min.js','three/vendor/THREE_LICENSE.txt'])assert.ok(m.files[n],n);
 cp.execFileSync(process.execPath,['tools/build-v11.cjs']);assert.equal(fs.readFileSync('dist/release-v11.json','utf8'),a);
 for(const [n,v]of Object.entries(m.files)){const b=fs.readFileSync('dist/'+n);assert.equal(b.length,v.bytes);assert.equal(crypto.createHash('sha256').update(b).digest('hex'),v.sha256,n)}
});
test('offline preview includes lazy native ESM without third-party CDN or customer data',()=>{
 const html=fs.readFileSync('preview/Elif_Tasarim.html','utf8');assert.ok(html.includes('__ELIF_LOAD_3D__'));assert.ok(html.includes('sol-rafli-kitaplik'));assert.ok(html.includes('V11 / TASARIM'));assert.ok(!html.includes('V8 / TASARIM'));assert.ok(!/<script[^>]+src=["']https:\/\/(?:unpkg|cdn)/i.test(html));
});
test('preview declares concept limitations and fixed business contact',()=>{
 const html=fs.readFileSync('dist/tasarim-masasi/index.html','utf8');assert.ok(html.includes('Konsept model'));assert.ok(html.includes('905308797169'));assert.ok(html.includes('noindex,nofollow'));assert.ok(html.includes('Raflar ve aksesuarlar'));
});
test('no distributed font file exists in publication',()=>{
 const m=JSON.parse(fs.readFileSync('dist/release-v11.json'));assert.ok(!Object.keys(m.files).some(x=>/\.(woff2?|ttf|otf)$/i.test(x)));
});
