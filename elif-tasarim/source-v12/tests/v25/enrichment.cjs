const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),ts=require('typescript');
function load(file){const cache={};function req(f){f=path.resolve(f);if(cache[f])return cache[f].exports;const m={exports:{}};cache[f]=m;new Function('module','exports','require',ts.transpileModule(fs.readFileSync(f,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText)(m,m.exports,id=>id.startsWith('.')?req(path.resolve(path.dirname(f),id)+'.ts'):require(id));return m.exports;}return req(file)}
const read=f=>fs.readFileSync(f,'utf8');
test('photo stage is explicit and independent of project grouping',()=>{
 const p=load('src/lib/portfolio.ts');assert.equal(typeof p.workPhotoEvidence,'function');
 const w=p.works.find(w=>w.id==='ahsap-bahce-kamelyasi');assert.equal(w.status,'work');
 for(let i=0;i<w.images.length;i++){const photo=p.workPhotoEvidence(w,i);assert.equal(photo.kind,'process');assert.equal(photo.source,'workshop-archive');assert.ok(photo.caption.length>12)}
 assert.equal(p.workPhotoEvidence(p.works[0]).kind,'work');assert.equal(p.workPhotoEvidence(w,99).image,w.images[0]);
});
test('cards, detail and search share the same photo evidence rather than hardcoded exceptions',()=>{
 const a=read('src/components/PortfolioUI.tsx'),b=read('src/pages/Portfolio.tsx'),s=read('src/lib/selections.ts');
 assert.doesNotMatch(a,/w.id==='ahsap-bahce-kamelyasi'/);assert.match(a,/workPhotoEvidence\(w/);assert.match(b,/workPhotoEvidence\(w/);assert.match(s,/photoKind:workPhotoEvidence\(w\).kind/);
});
test('featured card title is the specific application, not a repeated category',()=>{
 const s=read('src/components/PortfolioUI.tsx');assert.match(s,/featured\?w.subtitle:w.title/);assert.doesNotMatch(s,/featured\?categoryName/);
});
test('process detail and empty project filter offer context-specific navigation',()=>{
 const s=read('src/pages/Portfolio.tsx');assert.match(s,/workDisplayStage\(w\)==='process'\?'\/projeler\?durum=process'/);assert.match(s,/Bu alanın ilham modellerini inceleyin/);assert.match(s,/'\/ilham-modelleri\?alan='.*s.category/);
});
test('three added service guides contain different decisions, preparations and valid evidence',()=>{
 const p=load('src/lib/portfolio.ts'),d=load('src/lib/service-content.ts').serviceContent;
 for(const key of ['gardrop','vestiyer','sehpa']){assert.ok(d[key],key);assert.equal(d[key].sections.length,3);assert.ok(d[key].preparation.length>=3);assert.ok(d[key].note)}
 for(const [key,v] of Object.entries(d)){assert.ok(!(v.project&&v.concept),key);if(v.project)assert.ok(p.works.some(w=>w.id===v.project),key);if(v.concept)assert.ok(p.concepts.some(w=>w.id===v.concept),key)}
 assert.equal(d.sehpa.project,undefined);assert.equal(d.sehpa.concept,'oval-orta-sehpa');assert.match(d.gardrop.sections.flat().join(' '),/askı/i);
});
test('a service concept cannot be labelled as a real workshop application',()=>{
 const s=read('src/components/ServiceGuide.tsx');assert.match(s,/x.concept/);assert.match(s,/KONSEPTTEN BİR FİKİR/);assert.doesNotMatch(s,/works.find\(.*!;/);
});
test('Pinterest catalogue retains earlier models and adds all eighteen master selections',()=>{
 const p=load('src/lib/portfolio.ts');assert.equal(typeof p.visiblePinterestReferences,'function');
 assert.equal(p.visiblePinterestReferences('atelier').length,4);assert.equal(p.visiblePinterestReferences('atelier',true).length,18);assert.equal(p.visiblePinterestReferences('shared').length,4);assert.equal(p.visiblePinterestReferences('invalid').length,0);assert.equal(p.visiblePinterestReferences('curated').length,4);assert.equal(p.visiblePinterestReferences('curated',true).length,6);assert.equal(p.pinterestReferences.length,28);
});
test('Pinterest automatic image disclosure and saved target navigation remain available',()=>{
 const p=read('src/pages/Portfolio.tsx'),c=read('src/components/PinterestPreview.tsx');
 assert.match(p,/pin-expanded-list/);assert.match(p,/pinterest-disclosure/);assert.match(p,/expanded:.*pin/);assert.match(c,/disclosureId/);assert.match(c,/aria-describedby/);assert.match(c,/sandbox="allow-scripts allow-popups"/);
});
test('material support is a question library, explicitly not physical samples or inventory',()=>{
 const s=read('src/pages/V7Pages.tsx');assert.match(s,/Numune kataloğu değil/);assert.match(s,/Malzeme görüşmesine hazırlan/);assert.match(s,/malzeme-karari/);
});
test('atelier and family narrative have separate roles without generated claims',()=>{
 const s=read('src/pages/Portfolio.tsx');assert.match(s,/data-atelier-view/);assert.match(s,/Uygulama fotoğrafları/);assert.match(s,/Atölye sürecini inceleyin/);
});
test('source form clarifies the existing fast route without adding required fields',()=>{
 const s=read('src/pages/BringModel.tsx');assert.match(s,/Bir fotoğraf, bağlantı veya birkaç cümle yeterli/);assert.match(s,/neyi değiştirmek/);assert.match(s,/Ayrıntı eklemeden özeti gör/);
});
test('search and saved results preserve kind=work identities but render the photo-specific stage',()=>{
 const s=read('src/pages/V7Pages.tsx');assert.equal((s.match(/<SourceTag kind=\{x.photoKind\|\|x.kind\}/g)||[]).length,2);
 const p=load('src/lib/selections.ts');const record=p.selectionEntries.find(x=>x.id==='work:ahsap-bahce-kamelyasi');assert.equal(record.kind,'work');assert.equal(record.photoKind,'process');
});

test('enrichment keeps 51 routes, nine overview ideas, 26 archive photos and all 8 beds',()=>{
 const p=load('src/lib/portfolio.ts'),m=JSON.parse(read('dist/release-v25.json'));assert.equal(m.routes.length,51);assert.equal(m.indexable,false);assert.equal(p.inspirationConcepts().length,9);assert.equal(p.works.length,20);assert.equal(new Set(p.works.flatMap(w=>w.images)).size,26);assert.equal(p.concepts.filter(x=>x.category==='baza-yatak').length,8);
});
