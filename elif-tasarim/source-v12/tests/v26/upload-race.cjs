const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),ts=require('typescript');
function harness(){
 class Component{constructor(p){this.props=p}setState(p,cb){Object.assign(this.state,typeof p==='function'?p(this.state):p);cb?.()}}
 const react={Component,Fragment:'fragment',createElement:(type,props,...children)=>({type,props:{...props,children}})};
 let files=[],pending=[],revoked=[],zips=[],downloads=[];const draft={unknown:true,category:'sehpa',url:'',note:'',sourceRef:null};
 const projectStore={get:()=>({...draft}),clear(){},adoptReference(){},patch:p=>({...draft,...p})};
 const attachmentStore={get:()=>files,add:a=>files.push(...a),clear:()=>{files=[]}};
 const code=ts.transpileModule(fs.readFileSync('src/pages/BringModel.tsx','utf8'),{compilerOptions:{jsx:ts.JsxEmit.React,jsxFactory:'createElement',jsxFragmentFactory:'Fragment',target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.CommonJS}}).outputText;
 const mod={exports:{}};
 new Function('module','exports','require','window','URL',code)(mod,mod.exports,id=>id==='react'?react:id.endsWith('/project')?{projectStore,attachmentStore,business:{},whatsappMessage:()=>({}),projectText:()=>''}:id.endsWith('/upload')?{prepareImage:()=>new Promise(r=>pending.push(r))}:id.endsWith('/zip')?{localZip:()=>new Promise(r=>zips.push(r)),saveBlob:(...v)=>downloads.push(v)}:id.endsWith('/source-context')?{sourceContext:()=>null}:id.endsWith('/selections')?{selectedEntries:()=>[],selectionSummary:()=>''}:id.endsWith('/portfolio')?{workCategories:[],categoryName:x=>x}:id.endsWith('/draft-session')?{draftSession:{disable:()=>true}}:new Proxy({},{get:(_,key)=>function(){}}),{confirm:()=>true},{revokeObjectURL:u=>revoked.push(u)});
 const c=new mod.exports.BringModel({favorites:[],navigate(){}});
 function nodes(n){return !n||typeof n!=='object'?[]:Array.isArray(n)?n.flatMap(nodes):[n,...nodes(n.props?.children)]}
 return {c,files:()=>files,pending,revoked,zips,downloads,nodes:()=>nodes(c.render())};
}
for(const action of ['reset','restore','unmount'])test('pending photo is discarded after '+action,async()=>{
 const h=harness(),job=h.c.add([{size:12}]);
 if(action==='reset')h.nodes().find(n=>n.props?.className==='text-link v11-new-project').props.onClick();
 if(action==='restore')h.nodes().find(n=>n.props?.onRestore).props.onRestore();
 if(action==='unmount')h.c.componentWillUnmount();
 h.pending[0]({id:'old',preview:'blob:old',sourceBytes:12});await job;
 assert.deepEqual(h.files(),[]);assert.deepEqual(h.revoked,['blob:old']);
 if(action!=='unmount')assert.equal(h.c.state.loading,false);
});
test('an obsolete upload cannot unlock or overwrite a newer upload',async()=>{
 const h=harness(),old=h.c.add([{size:12}]);h.nodes().find(n=>n.props?.onRestore).props.onRestore();
 const current=h.c.add([{size:20}]);assert.equal(h.pending.length,2);
 h.pending[0]({id:'old',preview:'blob:old',sourceBytes:12});await old;assert.equal(h.c.state.loading,true);
 h.pending[1]({id:'new',preview:'blob:new',sourceBytes:20});await current;
 assert.equal(h.files().length,1);assert.equal(h.files()[0].id,'new');assert.equal(h.c.state.loading,false);
});

for(const action of ['reset','restore','unmount'])test('canceled draft export cannot download or update replacement after '+action,async()=>{
 const h=harness(),job=h.c.exportBundle();
 if(action==='reset')h.nodes().find(n=>n.props?.className==='text-link v11-new-project').props.onClick();
 if(action==='restore')h.nodes().find(n=>n.props?.onRestore).props.onRestore();
 if(action==='unmount')h.c.componentWillUnmount();
 h.zips[0](new Blob(['old private draft']));await job;
 assert.equal(h.downloads.length,0);assert.equal(h.c.state.message,'');
 if(action!=='unmount')assert.equal(h.c.state.sharing,false);
});
