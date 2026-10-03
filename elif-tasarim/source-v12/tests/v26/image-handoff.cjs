const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),ts=require('typescript');
function load(){
 class Component{constructor(props){this.props=props;this.state={}}setState(patch){Object.assign(this.state,patch)}}
 const module={exports:{}};
 const code=ts.transpileModule(fs.readFileSync('src/components/ResilientImage.tsx','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020,jsx:ts.JsxEmit.React,jsxFactory:'createElement'}}).outputText;
 vm.runInNewContext('(function(module,exports,require){'+code+'})') (module,module.exports,()=>({Component,createElement:(type,props,...children)=>({type,props:{...props,children}})}));
 return module.exports;
}
const img=(src,complete,width)=>({complete,naturalWidth:width,getAttribute:key=>key==='src'?src:null});
test('a failed static image starts at its single fallback request after client mount',()=>{
 const {ResilientImage,rememberStaticImageFailures}=load();
 rememberStaticImageFailures({querySelectorAll:()=>[img('/poster.webp',true,0)]});
 const c=new ResilientImage({src:'/poster.webp',alt:'Studio model'});
 assert.equal(c.render().props.src,'/poster.webp?elif-image-retry=1');
 c.onError();assert.equal(c.render().props.className,'image-unavailable ');
 c.onError();assert.equal(c.state.failed,true);
});
test('loaded, still pending and source-less static images do not consume the retry',()=>{
 const {ResilientImage,rememberStaticImageFailures}=load();
 rememberStaticImageFailures({querySelectorAll:()=>[img('/ready.webp',true,600),img('/pending.webp',false,0),img('',true,0)]});
 for(const src of ['/ready.webp','/pending.webp','/fresh.webp']){
  const c=new ResilientImage({src,alt:'Model'});assert.equal(c.render().props.src,src);c.onError();assert.equal(c.render().props.src,src+'?elif-image-retry=1');
 }
 rememberStaticImageFailures(null);
});
test('a failed responsive static image uses its fallback and source changes recover normally',()=>{
 const {ResilientImage,rememberStaticImageFailures}=load();
 rememberStaticImageFailures({querySelectorAll:()=>[img('/small.webp',true,0)]});
 const c=new ResilientImage({src:'/small.webp',fallbackSrc:'/large.webp',srcSet:'/small.webp 320w, /large.webp 800w',alt:'Model'});
 assert.equal(c.render().props.src,'/large.webp?elif-image-retry=1');assert.equal(c.render().props.srcSet,undefined);
 c.onError();const prev=c.props;c.props={src:'/next.webp',alt:'Next'};c.componentDidUpdate(prev);assert.equal(c.render().props.src,'/next.webp');assert.equal(c.state.failed,false);
});
