const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),ts=require('typescript');
function load(file){const cache={};function req(f){f=path.resolve(f);if(cache[f])return cache[f].exports;const m={exports:{}};cache[f]=m;new Function('module','exports','require',ts.transpileModule(fs.readFileSync(f,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText)(m,m.exports,id=>id.startsWith('.')?req(path.resolve(path.dirname(f),id)+'.ts'):require(id));return m.exports;}return req(file)}
const supplied='3T8k8Pwyv 2lc0S9lQO 41JsOJFNf 46g1kWzDY 5Wc0LnUYw 1CZAqZl4m 601hk2fV2 80Ac59zMm mcIHdiZgI 3fg3tRGhV 2UTN7Jm1P 7jlvhY3if TpIJNC2gw 6OmBhyFBu 4EvTLig9u tMopkttll 2TH1Ug3IX 2lVJ2LCpT'.split(' ');
test('every supplied master selection has a sourced image and transfers its identity into the brief',()=>{
 const p=load('src/lib/portfolio.ts'),pins=load('src/lib/pinterest.ts'),ctx=load('src/lib/source-context.ts');
 for(const id of supplied){const entry=p.pinterestReferences.find(p=>p.id===id);assert.ok(entry,id);assert.equal(entry.group,'atelier');assert.match(pins.pinLookup[id].image||'',/^https:\/\/i\.pinimg\.com\//,id);assert.match(pins.pinLookup[id].canonical,/^https:\/\/[^/]*pinterest\.com\/pin\/\d+\//);const query=p.modelHref(pins.pinReferenceUrl(id),entry.category).split('?')[1];assert.equal(ctx.sourceContext(query).seed.sourceRef.id,'pin:'+id)}
});
test('published inspiration puts concepts before automatically visible master Pinterest images',()=>{
 const html=fs.readFileSync('dist/ilham-modelleri/index.html','utf8');
 assert.ok(html.indexOf('id="konsept-seckisi"')<html.indexOf('id="pinterest-seckileri"'));
 assert.doesNotMatch(html,/görsellerini yükle|Seçkinin görsellerini yükle/);
 assert.doesNotMatch(html,/<iframe|pinit\.js/);
 for(const id of supplied){const card=html.match(new RegExp('data-pin="'+id+'"[^]*?</article>'));assert.ok(card,id);assert.match(card[0],/<img[^>]+src="https:\/\/i\.pinimg\.com\//);}
});
