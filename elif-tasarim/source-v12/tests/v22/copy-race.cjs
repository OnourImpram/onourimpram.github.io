const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),ts=require('typescript');
test('copy status cannot remain pending or become stale when text changes',async()=>{
 class Component{constructor(p){this.props=p}setState(p,cb){Object.assign(this.state,p);cb?.()}}
 const code=ts.transpileModule(fs.readFileSync('src/components/TextCopy.tsx','utf8'),{compilerOptions:{jsx:ts.JsxEmit.React,jsxFactory:'createElement',target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.CommonJS}}).outputText;
 const mod={exports:{}};new Function('module','exports','require',code)(mod,mod.exports,id=>id==='react'?{Component,createElement(){}}:{Icon(){}});
 let done;const old=Object.getOwnPropertyDescriptor(global,'navigator');Object.defineProperty(global,'navigator',{configurable:true,value:{clipboard:{writeText:()=>new Promise(r=>{done=r})}}});
 try{const c=new mod.exports.TextCopy({id:'test',text:'old'});const pending=c.copy();assert.equal(c.state.busy,true);const before=c.props;c.props={...before,text:'new'};c.componentDidUpdate(before);assert.equal(c.state.busy,false);done();await pending;assert.equal(c.state.status,'');assert.equal(c.state.busy,false)}finally{if(old)Object.defineProperty(global,'navigator',old);else delete global.navigator;}
});
