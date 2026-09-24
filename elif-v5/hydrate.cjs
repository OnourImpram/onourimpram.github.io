'use strict';
// Reproducible V5 preview build. Refuses any base or transfer checksum mismatch.
const fs=require('fs'),path=require('path'),zlib=require('zlib'),crypto=require('crypto'),ts=require('typescript');
const root=process.cwd(),dir=path.join(root,'elif-v5');
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const baseFile=path.join(root,'elif-tasarim/index.html');
let html=fs.readFileSync(baseFile,'utf8');
if(sha(Buffer.from(html))!=='d41471bfb19ba705d1fcb909039bdc422f1ecc23b519f93b9f2fd57c6de6207b')throw Error('Unexpected V4 base. Stop and reconcile.');
const parts=['00.b64','01.b64','02.b64','03.b64','04.b64'].map((f,i)=>{
 let s=fs.readFileSync(path.join(dir,'payload',f),'utf8');
 // Explicit relay repairs. The concatenated canonical payload must still match its original hash.
 if(i===0)s=s.replace('OLqbRSkaRXSp7CGx','OLqbRSkaRX02ZXSp7CGx');
 if(i===1)s=s.replace('HwixBnx8G','HwixBn8G');
 return s;
});
const encoded=parts.join('');
if(sha(Buffer.from(encoded))!=='5f69e29d0d54a17aa6792d469abbdd6c2b23f3d7a18705c2a954f0af7bc9c5cd')throw Error('Payload checksum mismatch.');
const payload=JSON.parse(zlib.gunzipSync(Buffer.from(encoded,'base64')));
const sourceNames=['src/App.tsx','src/components/ui.tsx','src/lib/domain.ts','src/lib/desk.ts','src/pages/Catalog.tsx','src/pages/DesignDesk.tsx','src/pages/Quote.tsx'];
const testNames=['tests/domain.test.cjs','tests/v4/acceptance.py','tests/v5/final_qa.py'];
if(JSON.stringify(Object.keys(payload.sources).sort())!==JSON.stringify(sourceNames.sort()))throw Error('Unexpected source list');
if(JSON.stringify(Object.keys(payload.tests).sort())!==JSON.stringify(testNames.sort()))throw Error('Unexpected test list');
const options={target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.React,jsxFactory:'createElement',jsxFragmentFactory:'Fragment',esModuleInterop:true};
function compile(name,text){const out=ts.transpileModule(text,{fileName:name,reportDiagnostics:true,compilerOptions:options});if((out.diagnostics||[]).some(d=>d.category===ts.DiagnosticCategory.Error))throw Error('Syntax diagnostic '+name);return out.outputText;}
function write(file,text){fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,text);}
const modules={};
for(const name of sourceNames){modules[name.replace(/\.tsx?$/,'')]=compile(name,payload.sources[name]);write(path.join(root,'elif-tasarim/source',name),payload.sources[name]);}
const anchor='const cache={};';if(html.split(anchor).length!==2)throw Error('Unknown module boundary');
const overrides='Object.assign(modules,{'+Object.entries(modules).map(([id,code])=>JSON.stringify(id)+':function(module,exports,require){\n'+code+'\n}').join(',')+'}); ';
html=html.replace(anchor,overrides.replace(/<\/script/gi,'<\\/script')+anchor);
if(html.split('</style>').length!==2)throw Error('Unexpected stylesheet boundary');
html=html.replace('</style>',payload.css+'\n</style>');
html=html.replace(/<meta name="elif-release"[^>]*>/,'<meta name="elif-release" content="v5-final-preview">');
html=html.replace(/<noscript>[\s\S]*?<\/noscript>/,'<noscript><div class="no-script"><h1>Elif Tasarım</h1><p>Zamana değer katan mobilyalar.</p><p>Bu tasarım önizlemesi JavaScript gerektirir. Canlı satış veya form gönderimi yapılmaz.</p></div></noscript>');
write(baseFile,html);write(path.join(root,'elif-tasarim/source/v5.css'),payload.css);
for(const name of testNames)write(path.join(dir,name),payload.tests[name]);
write(path.join(dir,'preview/domain.cjs'),modules['src/lib/domain']);
write(path.join(root,'elif-tasarim/verification/v5/build.json'),JSON.stringify({version:'v5-final-preview',baseSha256:'d41471bfb19ba705d1fcb909039bdc422f1ecc23b519f93b9f2fd57c6de6207b',payloadSha256:sha(Buffer.from(encoded)),htmlSha256:sha(Buffer.from(html)),bytes:Buffer.byteLength(html),changedModules:sourceNames,compiler:ts.version,runtime:'Bundled Preact preview. Not a Next.js production build.',liveCommerce:false},null,2));
console.log('V5 built',Buffer.byteLength(html),sha(Buffer.from(html)));
