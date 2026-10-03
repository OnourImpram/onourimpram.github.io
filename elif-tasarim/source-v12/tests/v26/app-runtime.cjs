const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),ts=require('typescript');

// Exercise actual component handlers with isolated globals; no browser or network is required.
function harness({base='/elif-tasarim',pathname='/elif-tasarim/',search='',blocked=false,storageUnavailable=false}={}){
 const data=new Map(),scripts=[],messages=[];
 const storage=new Proxy({getItem:key=>data.get(key)??null,setItem:(key,value)=>{if(blocked)throw Error('Storage blocked');data.set(key,value)},removeItem:key=>{if(blocked)throw Error('Storage blocked');data.delete(key)}},{ownKeys:()=>[...data.keys()],getOwnPropertyDescriptor:()=>({enumerable:true,configurable:true})});
 class Component{constructor(props){this.props=props;this.state={}}setState(update,done){Object.assign(this.state,typeof update==='function'?update(this.state,this.props):update);done?.()}}
 const react={Component,Fragment:'fragment',createElement:(type,props,...children)=>({type,props:{...props,children:children.length===1?children[0]:children}})};
 const window={__ELIF_BASE__:base,__ELIF_SITE_URL__:'https://example.com'+base,location:{pathname,search,hash:''},confirm:()=>true};
 const context=vm.createContext({window,URL,URLSearchParams,TextEncoder,TextDecoder,Blob,setTimeout,clearTimeout,console:{error:()=>{},log:()=>{}},document:{documentElement:{dataset:{}},createElement:()=>({remove(){this.removed=true}}),head:{appendChild:script=>scripts.push(script)}}});
 Object.defineProperty(window,'localStorage',{get(){if(storageUnavailable)throw Error('Storage unavailable');return storage}});
 Object.defineProperty(context,'localStorage',{get(){if(storageUnavailable)throw Error('Storage unavailable');return storage}});
 const cache=new Map();function load(file){const resolved=path.resolve(file);if(cache.has(resolved))return cache.get(resolved).exports;const module={exports:{}};cache.set(resolved,module);const output=ts.transpileModule(fs.readFileSync(resolved,'utf8'),{fileName:resolved,compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020,jsx:ts.JsxEmit.React,jsxFactory:'createElement',jsxFragmentFactory:'Fragment',esModuleInterop:true}}).outputText;const fn=vm.runInContext('(function(module,exports,require){'+output+'\n})',context);fn(module,module.exports,id=>{if(id==='react')return react;const dest=path.resolve(path.dirname(resolved),id);return load(['.ts','.tsx'].map(ext=>dest+ext).find(fs.existsSync))});return module.exports}
 const App=load('src/App.tsx').default,app=new App({initialPath:'/'});app.navigate=to=>app.setState({path:to});app.notify=message=>{messages.push(message);app.setState({toast:message})};
 return {app,load,data,scripts,window,messages};
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
