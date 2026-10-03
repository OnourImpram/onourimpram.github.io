const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),ts=require('typescript');
function load(file){const cache={};function req(f){f=path.resolve(f);if(cache[f])return cache[f].exports;const m={exports:{}};cache[f]=m;new Function('module','exports','require',ts.transpileModule(fs.readFileSync(f,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText)(m,m.exports,id=>id.startsWith('.')?req(path.resolve(path.dirname(f),id)+'.ts'):require(id));return m.exports;}return req(file)}
test('all16 user-confirmed works have local photos, completed labels and their own project pages',()=>{
 const {completedWorkAdditions}=load('src/lib/completed-work-additions.ts'),p=load('src/lib/portfolio.ts'),s=load('src/lib/selections.ts'),c=load('src/lib/source-context.ts'),m=load('src/lib/image-manifest.ts').imageManifest;
 assert.equal(completedWorkAdditions.length,16);assert.equal(p.works.length,36);assert.equal(completedWorkAdditions.flatMap(w=>w.images).length,17);
 for(const w of completedWorkAdditions){const id='work:'+w.id;assert.equal(p.workDisplayStage(w),'work');assert.ok(s.searchEntries(w.title).some(x=>x.id===id&&x.kind==='work'));assert.deepEqual(s.validSelectionIds(['ig:'+w.id,id]),[id]);const context=c.sourceContext(p.modelHref('',w.category,w.subtitle+' benzeri bir çalışma istiyorum.').split('?')[1]);assert.equal(context.seed.sourceRef.id,id);assert.equal(context.seed.sourceRef.kind,'work');assert.match(context.seed.sourceRef.url,new RegExp('/proje/'+w.id+'/$'));assert.equal(context.seed.url,'');assert.equal(c.sourceContext('kaynak=ig:'+w.id).seed.sourceRef.id,id);
  for(const image of w.images){assert.equal(m[image].kind,'work');for(const v of m[image].variants)assert.equal(fs.statSync('public/assets/'+v.file).size,v.bytes);}
  const html=fs.readFileSync('dist/proje/'+w.id+'/index.html','utf8');assert.match(html,/Atölye arşivi/);assert.doesNotMatch(html,/Instagram|instagram\.com|Instagram seçkisi/);
 }
});
test('finished works appear in the completed gallery and homepage, never below Pinterest',()=>{
 const {completedWorkAdditions}=load('src/lib/completed-work-additions.ts'),projects=fs.readFileSync('dist/projeler/index.html','utf8'),home=fs.readFileSync('dist/index.html','utf8'),inspiration=fs.readFileSync('dist/ilham-modelleri/index.html','utf8');
 for(const w of completedWorkAdditions){assert.ok(projects.includes('data-work="'+w.id+'"'));assert.ok(!inspiration.includes('data-work="'+w.id+'"'));}
 assert.equal((home.match(/data-work=/g)||[]).length,9);for(const w of completedWorkAdditions.slice(0,3))assert.ok(home.includes('data-work="'+w.id+'"'));
 for(const html of [projects,home,inspiration])assert.doesNotMatch(html,/Instagram|instagram\.com|data-instagram|id="instagram-seckisi"/);
});
test('old saved selections and project drafts migrate into completed works without losing notes',()=>{
 const {completedWorkAdditions}=load('src/lib/completed-work-additions.ts'),{sourceContext}=load('src/lib/source-context.ts'),{emptyProject}=load('src/lib/project.ts'),r=load('src/lib/draft-recovery.ts'),saved=load('src/lib/selection-backup.ts');
 const memory=new Map(),backup=r.createDraftBackup({getItem:k=>memory.get(k)||null,setItem:(k,v)=>memory.set(k,v),removeItem:k=>memory.delete(k)});
 for(const w of completedWorkAdditions){const draft={...emptyProject(),...sourceContext('kaynak=ig:'+w.id).seed,customerNote:'Askı alanını artırmak istiyorum.'},decoded=r.decodeDraft(r.encodeDraft(draft));assert.equal(decoded.sourceRef.image,w.images[0]);assert.equal(decoded.customerNote,draft.customerNote);assert.equal(backup.save(draft,1000).ok,true);assert.deepEqual(backup.read(1001).draft,decoded);assert.deepEqual(saved.decodeSelections(JSON.stringify({format:'elif-inspiration',version:1,ids:['ig:'+w.id]})),['work:'+w.id]);
  const legacy={...draft,url:'https://www.instagram.com/trabzon6161341/',sourceRef:{...draft.sourceRef,id:'ig:'+w.id,kind:'reference',url:'https://www.instagram.com/trabzon6161341/'}};const recovered=r.decodeDraft(r.encodeDraft(legacy));assert.equal(recovered.sourceRef.kind,'work');assert.equal(recovered.sourceRef.id,'work:'+w.id);assert.equal(recovered.url,'');assert.equal(recovered.customerNote,draft.customerNote);
 }
 const draft={...emptyProject(),...sourceContext('kaynak=ig:'+completedWorkAdditions[0].id).seed};for(const image of ['../private','https://example.com/image','asset/file','a.webp?query','<img>'])assert.throws(()=>r.encodeDraft({...draft,sourceRef:{...draft.sourceRef,image}}),/görsel/);
});
