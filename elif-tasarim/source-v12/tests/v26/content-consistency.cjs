const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),ts=require('typescript');

function harness(){
 const frames=[],document={activeElement:null,querySelector:()=>null};
 class Component{constructor(props){this.props=props;this.state={}}setState(update,done){Object.assign(this.state,typeof update==='function'?update(this.state,this.props):update);done?.()}}
 const react={Component,Fragment:'fragment',createElement:(type,props,...children)=>({type,props:{...props,children:children.length===1?children[0]:children}})};
 const context=vm.createContext({window:{__ELIF_BASE__:'/elif-tasarim'},document,URL,URLSearchParams,TextEncoder,TextDecoder,Blob,setTimeout,clearTimeout,requestAnimationFrame:fn=>frames.push(fn),console});
 const cache=new Map();function load(file){const resolved=path.resolve(file);if(cache.has(resolved))return cache.get(resolved).exports;const module={exports:{}};cache.set(resolved,module);const output=ts.transpileModule(fs.readFileSync(resolved,'utf8'),{fileName:resolved,compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020,jsx:ts.JsxEmit.React,jsxFactory:'createElement',jsxFragmentFactory:'Fragment',esModuleInterop:true}}).outputText;vm.runInContext('(function(module,exports,require){'+output+'\n})',context)(module,module.exports,id=>{if(id==='react')return react;const base=path.resolve(path.dirname(resolved),id);return load(['.ts','.tsx'].map(ext=>base+ext).find(fs.existsSync))});return module.exports}
 return {load,document,flush:()=>{while(frames.length)frames.shift()()}};
}
function nodes(node,predicate){if(Array.isArray(node))return node.flatMap(item=>nodes(item,predicate));if(!node||typeof node!=='object')return [];return [...(predicate(node)?[node]:[]),...nodes(node.props?.children,predicate)]}
function text(node){if(Array.isArray(node))return node.map(text).join(' ');if(!node||typeof node!=='object')return node||'';return text(node.props?.children)}

test('service proof counts finished photographs, excluding process-only archive records',()=>{
 const h=harness(),{ServiceGuide}=h.load('src/pages/ServiceGuide.tsx');
 assert.match(text(ServiceGuide({navigate:()=>{}})).replace(/\s+/g,' '),/32 tamamlanmış çalışma kaydı, 8 kullanım kategorisinde/);
});

test('home concept cards can add and remove the same selection used by the inspiration board',()=>{
 const h=harness(),{Home}=h.load('src/pages/Home.tsx'),favorites=[];
 const actions={navigate:()=>{},favorites,favorite:id=>{const i=favorites.indexOf(id);if(i<0)favorites.push(id);else favorites.splice(i,1)}};
 const home=new Home(actions),cards=()=>nodes(home.render(),n=>n.type?.name==='ConceptCard');
 assert.equal(cards().length,3);
 for(const card of cards()){
  const instance=new card.type(card.props),save=()=>nodes(instance.render(),n=>n.type==='button'&&n.props.className==='v7-save-text')[0];
  assert.ok(save(),'Homepage concept exposes the existing save action');assert.equal(save().props['aria-pressed'],false);
  save().props.onClick();assert.deepEqual(favorites,['concept:'+card.props.c.id]);assert.equal(save().props['aria-pressed'],true);
  save().props.onClick();assert.deepEqual(favorites,[]);
 }
});

for(const [label,start,remove,want] of [
 ['next item',['work:kemerli-ayna-antre','work:cam-vitrin-kahve','work:yuvarlak-zigon'],1,'work:yuvarlak-zigon'],
 ['previous item',['work:kemerli-ayna-antre','work:cam-vitrin-kahve'],1,'work:kemerli-ayna-antre'],
 ['empty board action',['work:kemerli-ayna-antre'],0,'browse']
])test('removing a focused board selection moves focus to the '+label,()=>{
 const h=harness(),{SavedBoard}=h.load('src/pages/V7Pages.tsx'),body={id:'body'};let favorites=[...start],rendered,buttons=[],browse;
 const actions={navigate:()=>{},remember:false,setRemember:()=>{},replaceFavorites:()=>{},get favorites(){return favorites},favorite:id=>{favorites=favorites.filter(x=>x!==id);h.document.activeElement=body;mount()}};
 function mount(){rendered=SavedBoard(actions);buttons=nodes(rendered,n=>n.type==='button'&&n.props['aria-label']?.endsWith('seçimini kaldır')).map(node=>({node,focus(){h.document.activeElement=this}}));browse=nodes(rendered,n=>n.type?.name==='ButtonLink'&&n.props.to==='/projeler').map(node=>({node,id:'browse',focus(){h.document.activeElement=this}}))[0];}
 h.document.querySelector=selector=>{const id=selector.match(/data-board-remove="([^"]+)"/)?.[1];return id?buttons.find(b=>b.node.props['data-board-remove']===id):selector.includes('board-empty-actions')?browse:null};
 mount();const button=buttons[remove];h.document.activeElement=button;button.node.props.onClick({currentTarget:button});h.flush();
 assert.equal(h.document.activeElement?.id||h.document.activeElement?.node.props['data-board-remove'],want);
 assert.equal(favorites.includes(start[remove]),false);
});
