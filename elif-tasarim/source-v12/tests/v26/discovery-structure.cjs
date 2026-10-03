const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),ts=require('typescript');
function load(file){const cache={};function req(f){f=path.resolve(f);if(cache[f])return cache[f].exports;const m={exports:{}};cache[f]=m;new Function('module','exports','require',ts.transpileModule(fs.readFileSync(f,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText)(m,m.exports,id=>id.startsWith('.')?req(path.resolve(path.dirname(f),id)+'.ts'):require(id));return m.exports;}return req(file)}
test('discovery has two main destinations and a distinct own-model action',()=>{
 const p=load('src/lib/portfolio.ts'),paths=p.mainNavigation.map(x=>x[0]);
 assert.deepEqual(paths.slice(0,2),['/projeler','/ilham-modelleri']);assert.equal(paths.includes('/kategoriler'),false);assert.ok(paths.includes('/modelini-getir'));
});
test('a project with only installation photographs stays outside the completed selection',()=>{
 const p=load('src/lib/portfolio.ts'),work=p.works.find(w=>w.id==='ahsap-bahce-kamelyasi');
 assert.equal(work.status,'work','Preserve the original archive record');assert.equal(p.workDisplayStage(work),'process');
 assert.equal(p.workDisplayStage(p.works[0]),'work');assert.equal(p.workDisplayStage(p.works.find(w=>w.id==='mutfak-kurulum-asamasi')),'process');
 assert.ok(p.featuredWorks.every(id=>p.workDisplayStage(p.works.find(w=>w.id===id))==='work'));
 assert.equal(p.works.length,36);assert.equal(new Set(p.works.flatMap(w=>w.images)).size,43);
});
test('curated canonical Pinterest sources survive selection and project handoff',()=>{
 const p=load('src/lib/portfolio.ts'),pins=load('src/lib/pinterest.ts'),ctx=load('src/lib/source-context.ts'),selections=load('src/lib/selections.ts');
 const curated=p.pinterestReferences.filter(p=>p.group==='curated');assert.ok(curated.length>=4);
 for(const pin of curated){
  const url=pins.pinReferenceUrl(pin.id);assert.match(url,/^https:\/\/(?:[a-z]+\.)?pinterest\.com\/pin\//);
  const route=p.modelHref(url,pin.category),query=route.split('?')[1],draft=ctx.sourceContext(query).seed;
  assert.equal(draft.sourceRef.id,'pin:'+pin.id);assert.equal(draft.url,url);assert.equal(draft.category,pin.category);
  assert.ok(selections.selectionSummary(['pin:'+pin.id])[0].includes(pins.pinLookup[pin.id].canonical));
 }
 assert.equal(pins.pinReferenceUrl('3T8k8Pwyv'),'https://pin.it/3T8k8Pwyv');
});
