const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),ts=require('typescript');
function load(file){const cache={};function req(f){f=path.resolve(f);if(cache[f])return cache[f].exports;const m={exports:{}};cache[f]=m;new Function('module','exports','require',ts.transpileModule(fs.readFileSync(f,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText)(m,m.exports,id=>id.startsWith('.')?req(path.resolve(path.dirname(f),id)+'.ts'):require(id));return m.exports;}return req(file)}
const originalIds=['oval-orta-sehpa','kahve-ritueli','sakin-antre','yasam-duvari','evin-kalbi','duzenli-bir-alan','bahcede-zaman','bir-masanin-etrafinda'];
test('general inspiration leads with all original room ideas, and at most one bed representative',()=>{
 const p=load('src/lib/portfolio.ts');assert.equal(typeof p.inspirationConcepts,'function','Explicit editorial selection is missing');
 const overview=p.inspirationConcepts('all');assert.equal(overview.length,9);assert.deepEqual(overview.slice(0,8).map(x=>x.id),originalIds);assert.equal(new Set(overview.map(x=>x.category)).size,9);assert.equal(overview.filter(x=>x.category==='baza-yatak').length,1);
});
test('category filtering preserves every approved bed and other original concept',()=>{
 const p=load('src/lib/portfolio.ts');assert.equal(typeof p.inspirationConcepts,'function');
 assert.equal(p.concepts.length,16);assert.equal(p.inspirationConcepts('baza-yatak').length,8);assert.equal(p.inspirationConcepts('sehpa')[0].id,'oval-orta-sehpa');assert.equal(p.inspirationConcepts('unknown').length,0);
});
test('category order retains established production areas rather than promoting the newest addition',()=>{
 const p=load('src/lib/portfolio.ts');assert.deepEqual(p.workCategories.map(x=>x.id),['mutfak','tv-unitesi','vestiyer','gardrop','kahve-kosesi','sehpa','pergola','ozel-tasarim','baza-yatak']);
});
test('homepage has diverse inspiration after the atelier story and no dedicated bed campaign',()=>{
 const s=fs.readFileSync('src/pages/Home.tsx','utf8');assert.doesNotMatch(s,/BedTeaser|bed-home-teaser/);assert.match(s,/home-inspiration/);assert.ok(s.indexOf('home-yunus')<s.indexOf('home-inspiration'));assert.match(s,/homeConcepts/);
 const p=load('src/lib/portfolio.ts');assert.deepEqual(p.homeConcepts.map(x=>x.id),originalIds.slice(0,3));assert.equal(new Set(p.homeConcepts.map(x=>x.category)).size,3);
});
test('general concept cards cannot expand into full bed product cards',()=>{
 const s=fs.readFileSync('src/pages/Portfolio.tsx','utf8');const card=s.slice(s.indexOf('export class ConceptCard'),s.indexOf('export function Categories'));assert.doesNotMatch(card,/<BedCard/);assert.match(card,/concept-card/);assert.match(s,/pinterest-seckileri/);
});
test('static inspiration overview is balanced, all original room ideas remain visible',()=>{
 const s=fs.readFileSync('dist/ilham-modelleri/index.html','utf8');assert.equal((s.match(/class="concept-card(?: concept-card-bed)?"/g)||[]).length,9);assert.equal((s.match(/data-bed=/g)||[]).length,0);
 for(const id of originalIds)assert.ok(s.includes('id="ilham-concept-'+id+'"'),id);
 assert.ok(s.indexOf('ilham-concept-oval-orta-sehpa')<s.indexOf('ilham-concept-ceviz-yalin'));assert.match(s,/href="#pinterest-seckileri"/);
});
test('dedicated bed gallery and real archive are unaffected by the overview repair',()=>{
 const p=load('src/lib/portfolio.ts'),b=load('src/lib/beds.ts');assert.equal(p.works.length,20);assert.equal(new Set(p.works.flatMap(x=>x.images)).size,26);assert.equal(b.beds.length,8);
 const s=fs.readFileSync('dist/kategoriler/baza-yatak/index.html','utf8');assert.equal((s.match(/data-bed=/g)||[]).length,8);assert.equal((s.match(/class="bed-direct-views"/g)||[]).length,8);
});
