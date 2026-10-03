const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),ts=require('typescript');

// Exercise actual component handlers with isolated globals; no browser or network is required.
function harness({base='/elif-tasarim',pathname='/elif-tasarim/',search='',blocked=false,storageUnavailable=false}={}){
 const data=new Map(),scripts=[],messages=[],locations=[];
 const storage=new Proxy({getItem:key=>data.get(key)??null,setItem:(key,value)=>{if(blocked)throw Error('Storage blocked');data.set(key,value)},removeItem:key=>{if(blocked)throw Error('Storage blocked');data.delete(key)}},{ownKeys:()=>[...data.keys()],getOwnPropertyDescriptor:()=>({enumerable:true,configurable:true})});
 class Component{constructor(props){this.props=props;this.state={}}setState(update,done){Object.assign(this.state,typeof update==='function'?update(this.state,this.props):update);done?.()}}
 const react={Component,Fragment:'fragment',createElement:(type,props,...children)=>({type,props:{...props,children:children.length===1?children[0]:children}})};
 const window={__ELIF_BASE__:base,__ELIF_SITE_URL__:'https://example.com'+base,location:{pathname,search,hash:''},confirm:()=>true};
 const context=vm.createContext({window,URL,URLSearchParams,TextEncoder,TextDecoder,Blob,setTimeout,clearTimeout,history:{state:{},replaceState:(_state,_title,url)=>locations.push(url)},console:{error:()=>{},log:()=>{}},document:{documentElement:{dataset:{}},createElement:()=>({remove(){this.removed=true}}),head:{appendChild:script=>scripts.push(script)}}});
 Object.defineProperty(window,'localStorage',{get(){if(storageUnavailable)throw Error('Storage unavailable');return storage}});
 Object.defineProperty(context,'localStorage',{get(){if(storageUnavailable)throw Error('Storage unavailable');return storage}});
 const cache=new Map();function load(file){const resolved=path.resolve(file);if(cache.has(resolved))return cache.get(resolved).exports;const module={exports:{}};cache.set(resolved,module);const output=ts.transpileModule(fs.readFileSync(resolved,'utf8'),{fileName:resolved,compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020,jsx:ts.JsxEmit.React,jsxFactory:'createElement',jsxFragmentFactory:'Fragment',esModuleInterop:true}}).outputText;const fn=vm.runInContext('(function(module,exports,require){'+output+'\n})',context);fn(module,module.exports,id=>{if(id==='react')return react;const dest=path.resolve(path.dirname(resolved),id);return load(['.ts','.tsx'].map(ext=>dest+ext).find(fs.existsSync))});return module.exports}
 const App=load('src/App.tsx').default,app=new App({initialPath:'/'});app.navigate=to=>app.setState({path:to});app.notify=message=>{messages.push(message);app.setState({toast:message})};
 return {app,load,data,scripts,window,messages,locations};
}
function text(node){if(Array.isArray(node))return node.map(text).join(' ');if(!node||typeof node!=='object')return node||'';return text(node.props?.children)}
function find(node,predicate){if(Array.isArray(node)){for(const item of node){const found=find(item,predicate);if(found)return found}}else if(node&&typeof node==='object'){if(predicate(node))return node;return find(node.props?.children,predicate)}}
const clearButton=app=>{app.state.info=true;return find(app.render(),node=>node.type==='button'&&text(node).includes('Taslağı ve cihaz kayıtlarını sil'))};
const board=app=>{app.state.path='/calisma-dosyam';return find(app.renderPage(),node=>node.type?.name==='SavedBoard')};

test('mounted and root locations retain a leading route slash and respect mount boundaries',()=>{
 for(const [base,pathname,search,expected]of [['/elif-tasarim','/elif-tasarim','','/'],['/elif-tasarim','/elif-tasarim/','?utm_source=test','/?utm_source=test'],['','/','?q=masa','/?q=masa'],['/elif-tasarim','/elif-tasarim/rehber/bakim/','','/rehber/bakim'],['/elif-tasarim','/elif-tasarim-other/','','/elif-tasarim-other']])assert.equal(harness({base,pathname,search}).app.currentLocation(),expected);
});
test('only the guide index and exact known guide routes render Journal',()=>{
 const {app}=harness();for(const route of ['/rehber','/rehber/bakim']){app.state.path=route;assert.equal(app.renderPage().type.name,'Journal')}
 for(const route of ['/rehber/missing','/rehber/bakim/extra']){app.state.path=route;assert.equal(app.renderPage().props.className,'wrap empty-state missing-page')}
});
test('device clearing removes private and public records while preserving unrelated storage',()=>{
 const {app,load,data,messages}=harness();data.set('elif-v21:project-recovery','private draft');data.set('elif-v7:selections','public selections');data.set('other-site','keep');load('src/lib/project.ts').projectStore.patch({note:'Private note'});clearButton(app).props.onClick();assert.equal(data.has('elif-v21:project-recovery'),false);assert.equal(data.has('elif-v7:selections'),false);assert.equal(data.get('other-site'),'keep');assert.equal(load('src/lib/project.ts').projectStore.get().note,'');assert.equal(app.state.info,false);assert.match(messages.at(-1),/kayıtlar temizlendi/);
});
test('failed device deletion clears memory but keeps a persistent truthful failure and recovery guidance',()=>{
 const {app,load,data,messages}=harness({blocked:true});data.set('elif-v21:project-recovery','private draft');load('src/lib/project.ts').projectStore.patch({note:'Private note'});clearButton(app).props.onClick();assert.equal(data.get('elif-v21:project-recovery'),'private draft');assert.equal(load('src/lib/project.ts').projectStore.get().note,'');assert.equal(app.state.info,true);assert.match(text(app.render()),/silinemedi/);assert.match(text(app.render()),/site verileri/);assert.doesNotMatch(messages.at(-1),/bu cihazdaki kayıtlar temizlendi/);
});
test('unavailable storage never produces a complete device-deletion success',()=>{
 const {app,messages}=harness({storageUnavailable:true});clearButton(app).props.onClick();assert.equal(app.state.info,true);assert.match(text(app.render()),/site verileri/);assert.doesNotMatch(messages.at(-1),/bu cihazdaki kayıtlar temizlendi/);
});
test('failed selection opt-out stops new saves but explains that the old device record remains',()=>{
 const {app,data}=harness({blocked:true});data.set('elif-v7:selections','previous selections');app.state.remember=true;board(app).props.setRemember(false);assert.equal(app.state.remember,false);assert.equal(data.get('elif-v7:selections'),'previous selections');assert.match(text(app.renderPage()),/silinemedi/);assert.match(text(app.renderPage()),/site verileri/);
});
test('successful selection opt-out removes the previous device record',()=>{
 const {app,data}=harness();data.set('elif-v7:selections','previous selections');app.state.remember=true;board(app).props.setRemember(false);assert.equal(app.state.remember,false);assert.equal(data.has('elif-v7:selections'),false);assert.doesNotMatch(text(app.renderPage()),/silinemedi/);
});
function studio(h){const {DeskExperience}=h.load('src/components/DeskExperience.tsx');const desk=new DeskExperience({compact:true,navigate:()=>{},notify:()=>{}});desk.host={};return desk}
function ready(h,script){h.window.ElifDesk3D={createDeskScene:()=>({light(){},dimensions(){},hotspots(){}})};script.onload()}
test('3D runtime honors both empty and subpath deployment bases',async()=>{
 for(const base of ['','/elif-tasarim']){const h=harness({base}),desk=studio(h),pending=desk.start();assert.equal(h.scripts[0].src,base+'/three/desk-scene.mjs?v=v23.2-interactive');ready(h,h.scripts[0]);await pending;assert.equal(desk.state.status,'ready')}
});
test('3D retry creates a new script after either load failure branch',async()=>{
 for(const event of ['onload','onerror']){const h=harness(),desk=studio(h);const first=desk.start();h.scripts[0][event]();await first;assert.equal(desk.state.status,'unavailable');assert.equal(h.scripts[0].removed,true);const retry=desk.start();assert.equal(h.scripts.length,2);ready(h,h.scripts[1]);await retry;assert.equal(desk.state.status,'ready')}
});
test('the fallback identifies the static poster and does not imply it previews changed options',()=>{
 const h=harness(),desk=studio(h);for(const status of ['poster','loading','unavailable','lost']){desk.state.status=status;const rendered=text(desk.render());assert.match(rendered,/Sabit tanıtım görseli/);assert.match(rendered,/ölçü ve malzeme seçimleriniz bu görsele yansımaz/);assert.doesNotMatch(rendered,/Three\.js \/ WebGL/)}
});


test('changing portfolio stage clears only an unavailable category and keeps valid category choices',()=>{
 const h=harness(),{Projects}=h.load('src/pages/Portfolio.tsx');
 const coffee=new Projects({...h.app.actions(),query:'alan=kahve-kosesi'});coffee.update('stage','process');
 assert.equal(coffee.state.category,'all');assert.equal(coffee.state.stage,'process');assert.equal(h.locations.at(-1),'/elif-tasarim/projeler/?durum=process');
 const kitchen=new Projects({...h.app.actions(),query:'alan=mutfak'});kitchen.update('stage','process');
 assert.equal(kitchen.state.category,'mutfak');assert.match(h.locations.at(-1),/alan=mutfak/);kitchen.update('stage','work');assert.equal(kitchen.state.category,'mutfak');
 const pergola=new Projects({...h.app.actions(),query:'alan=pergola&durum=process'});pergola.update('stage','work');assert.equal(pergola.state.category,'all');
});
test('a completed work can be saved and removed directly from its detail page',()=>{
 const h=harness(),{WorkDetail}=h.load('src/pages/Portfolio.tsx'),work=h.load('src/lib/portfolio.ts').works.find(w=>w.id==='cam-vitrin-kahve');
 const button=()=>find(new WorkDetail({...h.app.actions(),work}).render(),node=>node.type==='button'&&node.props.className==='v7-save-text');
 assert.equal(button().props['aria-pressed'],false);button().props.onClick();assert.ok(h.app.state.favorites.includes('work:cam-vitrin-kahve'));assert.equal(button().props['aria-pressed'],true);
 button().props.onClick();assert.equal(h.app.state.favorites.includes('work:cam-vitrin-kahve'),false);
});
test('table project guidance follows seating and surface needs rather than cabinet storage questions',()=>{
 const h=harness(),{WorkDetail}=h.load('src/pages/Portfolio.tsx'),work=h.load('src/lib/portfolio.ts').works.find(w=>w.id==='yuvarlak-zigon');
 const study=find(new WorkDetail({...h.app.actions(),work}).render(),node=>node.type?.name==='ProjectStudy'),copy=text(study.type(study.props));
 assert.match(copy,/Koltuk düzenini/);assert.match(copy,/Tek yüzey veya ayrı kullanılan parçalar/);assert.doesNotMatch(copy,/Açık raf, kapalı depolama ve yüzey seçimi için öncelikleriniz/);
});

test('header search submits the trimmed query as an encoded results route',()=>{
 const {app}=harness();app.state.search=true;app.state.searchQuery='  kahve & dolap  ';
 const form=find(app.render(),node=>node.type==='form'&&node.props.role==='search');assert.ok(form,'Header search needs a submit action for Enter and mobile Search');
 let prevented=false;form.props.onSubmit({preventDefault(){prevented=true}});
 assert.equal(prevented,true);assert.equal(app.state.path,'/arama?q=kahve%20%26%20dolap');
});

function dialogKey(dialog,key){let prevented=false,stopped=false;dialog.render().props.onKeyDown({key,preventDefault(){prevented=true},stopPropagation(){stopped=true}});return {prevented,stopped}}
test('work gallery arrows work at the dialog root and Escape still closes it',()=>{
 const h=harness(),{WorkDetail}=h.load('src/pages/Portfolio.tsx'),{Dialog}=h.load('src/components/ui.tsx'),work=h.load('src/lib/portfolio.ts').works.find(w=>w.id==='vitrinli-servis-unitesi');
 const detail=new WorkDetail({...h.app.actions(),work});detail.state.zoom=true;
 const dialog=()=>new Dialog(find(detail.render(),node=>node.type===Dialog).props);
 assert.equal(dialogKey(dialog(),'ArrowRight').prevented,true);assert.equal(detail.state.photo,1);
 assert.equal(dialogKey(dialog(),'ArrowRight').prevented,true);assert.equal(detail.state.photo,0);
 assert.equal(dialogKey(dialog(),'ArrowLeft').prevented,true);assert.equal(detail.state.photo,1);
 assert.equal(dialogKey(dialog(),'Tab').prevented,false);assert.equal(detail.state.photo,1);
 assert.deepEqual(dialogKey(dialog(),'Escape'),{prevented:true,stopped:true});assert.equal(detail.state.zoom,false);
});
test('bed gallery arrows switch views from the dialog root without changing other dialogs',()=>{
 const h=harness(),{BedCard}=h.load('src/pages/BedCollection.tsx'),{Dialog}=h.load('src/components/ui.tsx'),bed=h.load('src/lib/beds.ts').beds[0];
 const card=new BedCard({bed,navigate:()=>{}});card.state.zoom=true;
 const dialog=()=>new Dialog(find(card.render(),node=>node.type===Dialog).props);
 assert.equal(dialogKey(dialog(),'ArrowRight').prevented,true);assert.equal(card.state.open,true);
 assert.equal(dialogKey(dialog(),'ArrowLeft').prevented,true);assert.equal(card.state.open,false);
 assert.equal(dialogKey(new Dialog({title:'Bilgi',children:null,onClose:()=>{}}),'ArrowRight').prevented,false);
});
test('completed category and related-work lists exclude process-only archive photos',()=>{
 const h=harness(),{Categories,WorkDetail}=h.load('src/pages/Portfolio.tsx'),works=h.load('src/lib/portfolio.ts').works,process=works.find(w=>w.id==='ahsap-bahce-kamelyasi');
 const containsProcess=tree=>!!find(tree,node=>node.type?.name==='WorkCard'&&node.props.work.id==='ahsap-bahce-kamelyasi');
 assert.equal(containsProcess(Categories({...h.app.actions(),slug:'pergola'})),false);
 assert.equal(containsProcess(new WorkDetail({...h.app.actions(),work:{...process,id:'another-pergola'}}).render()),false);
 assert.ok(find(Categories({...h.app.actions(),slug:'mutfak'}),node=>node.type?.name==='WorkCard'&&node.props.work.id==='sade-kose-mutfak'));
 assert.equal(process.status,'work','The archive status itself must remain unchanged');
});
test('bed inquiry retains its concept source when a work has a matching subtitle',()=>{
 const h=harness(),{BedCard}=h.load('src/pages/BedCollection.tsx'),bed=h.load('src/lib/beds.ts').beds[0],works=h.load('src/lib/portfolio.ts').works;
 works.push({...works[0],id:'matching-subtitle',subtitle:bed.subtitle});
 const inquiry=find(new BedCard({bed,navigate:()=>{}}).render(),node=>node.type?.name==='TextLink'&&text(node)==='Bu modeli konuşalım');
 assert.equal(new URLSearchParams(inquiry.props.to.split('?')[1]).get('kaynak'),'concept:'+bed.id);
});
