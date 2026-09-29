const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
test('V23 Devir uses real product visuals for all three starts',()=>{
 const s=fs.readFileSync('src/pages/Devir.tsx','utf8');
 for(const x of ['devir-top.webp','devir-detail.webp','devir-standing.webp'])assert.match(s,new RegExp(x.replace('.','\\.')));
 assert.doesNotMatch(s,/v20-start-swatch/);
 assert.match(s,/ÜRÜNÜ DEĞİL, KULLANIMI DÜŞÜNELİM/);
 assert.match(s,/GERÇEK İŞ\. AYRI ETİKET\. AYNI USTALIK\./);
});
test('V23 image components never fail as silent blank photo states',()=>{
 const ui=fs.readFileSync('src/components/ui.tsx','utf8');
 const p=fs.readFileSync('src/components/PortfolioUI.tsx','utf8');
 assert.match(ui,/classList\.add\('image-missing'\)/);
 assert.match(p,/classList\.add\('image-missing'\)/);
});
test('V23 build and package identities are coherent',()=>{
 const pkg=JSON.parse(fs.readFileSync('package.json','utf8'));
 const build=fs.readFileSync('tools/build-v23.cjs','utf8');
 assert.equal(pkg.version,'0.23.0');
 assert.equal(pkg.scripts.build,'node tools/build-v23.cjs');
 assert.match(build,/v23-premium-finish/);
 assert.match(build,/release-v23\.json/);
 assert.match(build,/src\/v23\.css/);
});
