const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),ts=require('typescript');
function load(file){const cache={};function req(f){f=path.resolve(f);if(cache[f])return cache[f].exports;const m={exports:{}};cache[f]=m;new Function('module','exports','require',ts.transpileModule(fs.readFileSync(f,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText)(m,m.exports,id=>id.startsWith('.')?req(path.resolve(path.dirname(f),id)+'.ts'):require(id));return m.exports;}return req(file)}
test('Instagram selections retain local photos and their source through save, search, and project handoff',()=>{
 const {instagramModels}=load('src/lib/instagram.ts'),s=load('src/lib/selections.ts'),c=load('src/lib/source-context.ts'),{modelHref}=load('src/lib/portfolio.ts'),m=load('src/lib/image-manifest.ts').imageManifest;
 assert.equal(instagramModels.length,16);assert.equal(new Set(instagramModels.map(x=>x.id)).size,16);
 for(const item of instagramModels){const id='ig:'+item.id;assert.deepEqual(s.validSelectionIds([id]),[id]);assert.ok(s.searchEntries(item.title).some(x=>x.id===id));assert.ok(s.selectionSummary([id])[0].includes(item.photos[0].url));assert.equal(s.inspirationTarget(id).image,item.photos[0].asset);const context=c.sourceContext(modelHref(item.photos[0].url,item.category,'',id).split('?')[1]);assert.equal(context.seed.sourceRef.id,id);assert.equal(context.seed.sourceRef.url,item.photos[0].url);assert.equal(context.seed.sourceRef.image,item.photos[0].asset);
  for(const photo of item.photos){assert.match(photo.url,/^https:\/\/www\.instagram\.com\/trabzon6161341\/p\//);assert.equal(m[photo.asset].kind,'reference');for(const variant of m[photo.asset].variants){assert.equal(fs.statSync('public/assets/'+variant.file).size,variant.bytes);assert.ok(variant.bytes<250000);}}
 }
 assert.equal(instagramModels.filter(x=>x.photos.length===2).length,1);
});
test('Instagram cards render below Pinterest without third-party embeds or an image loading gate',()=>{
 const html=fs.readFileSync('dist/ilham-modelleri/index.html','utf8');assert.ok(html.indexOf('id="instagram-seckisi"')>html.indexOf('id="pinterest-seckileri"'));assert.equal((html.match(/data-instagram=/g)||[]).length,16);assert.doesNotMatch(html,/<iframe|instagram\.com\/embed|Görselleri yükle/);for(const card of html.matchAll(/data-instagram="[^"]+"[^]*?<\/article>/g))assert.match(card[0],/<img[^>]+src="\/elif-tasarim\/assets\/ig-/);
});
test('Instagram project notes survive file recovery and opted-in device backup, while unsafe image paths stay rejected',()=>{
 const {instagramModels}=load('src/lib/instagram.ts'),{sourceContext}=load('src/lib/source-context.ts'),{emptyProject}=load('src/lib/project.ts'),r=load('src/lib/draft-recovery.ts');
 const memory=new Map(),backup=r.createDraftBackup({getItem:k=>memory.get(k)||null,setItem:(k,v)=>memory.set(k,v),removeItem:k=>memory.delete(k)});
 for(const m of instagramModels){const draft={...emptyProject(),...sourceContext('kaynak=ig:'+m.id).seed,customerNote:'Askı alanını artırmak istiyorum.'},decoded=r.decodeDraft(r.encodeDraft(draft));assert.equal(decoded.sourceRef.image,m.photos[0].asset);assert.equal(decoded.customerNote,draft.customerNote);assert.equal(backup.save(draft,1000).ok,true);assert.deepEqual(backup.read(1001).draft,decoded);}
 const draft={...emptyProject(),...sourceContext('kaynak=ig:'+instagramModels[0].id).seed};for(const image of ['../private','https://example.com/image','asset/file','a.webp?query','<img>'])assert.throws(()=>r.encodeDraft({...draft,sourceRef:{...draft.sourceRef,image}}),/görsel/);
 assert.equal(sourceContext('kaynak=ig:constructor'),null);
});
