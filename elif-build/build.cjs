// Rebuild the draft from verified existing assets, preserving all v3 commerce/quote modules.
const fs=require('fs'),path=require('path'),zlib=require('zlib'),crypto=require('crypto'),ts=require('typescript');
const root=process.cwd(),dir=path.join(root,'elif-build');
const manifest=JSON.parse(fs.readFileSync(path.join(dir,'manifest.json'),'utf8'));
const bytes=Buffer.concat(manifest.parts.map(p=>fs.readFileSync(path.join(dir,'base',p.file))));
if(crypto.createHash('sha256').update(bytes).digest('hex')!==manifest.gzipSha256)throw Error('Base transfer checksum mismatch');
let html=zlib.gunzipSync(bytes).toString('utf8');
const overrides=Buffer.concat(manifest.overrideParts.map(f=>fs.readFileSync(path.join(dir,'overrides',f))));
if(crypto.createHash('sha256').update(overrides).digest('hex')!==manifest.overrideSha256)throw Error('Override checksum mismatch');
const spec=JSON.parse(zlib.gunzipSync(overrides));
for(const file of ['src/App.tsx','src/pages/Catalog.tsx']) {
 const old="p.material).includes"; if(!spec.sources[file].includes(old)) throw Error('Search boundary changed');
 spec.sources[file]=spec.sources[file].replace(old,"p.material+' '+p.id+' '+p.category).includes");
}
const baseCss=spec.css;
spec.sources['src/pages/Home.tsx']=fs.readFileSync(path.join(dir,'v4','Home.tsx'),'utf8');
const v4css=[0,1,2].map(i=>fs.readFileSync(path.join(dir,'v4','css-'+i+'.part'),'utf8')).join('');
if(crypto.createHash('sha256').update(v4css).digest('hex')!=='68a6b40717ab18ad2909f6e6556a4828f503c4ec92f20aeed0587769e8ef3c13')throw Error('V4 CSS integrity mismatch');
spec.css=baseCss+'\n'+v4css;
const modules={};
for(const [file,source] of Object.entries(spec.sources)){
 const result=ts.transpileModule(source,{fileName:file,reportDiagnostics:true,compilerOptions:{target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.React,jsxFactory:'createElement',jsxFragmentFactory:'Fragment',esModuleInterop:true}});
 if((result.diagnostics||[]).some(d=>d.category===ts.DiagnosticCategory.Error))throw Error('TypeScript syntax error '+file);
 modules[file.replace(/\.tsx?$/,'')]=result.outputText;
}
const marker='}; const cache={};';if(html.split(marker).length!==2)throw Error('Unknown preview module boundary');
const replacement='};Object.assign(modules,{'+Object.entries(modules).map(([id,code])=>JSON.stringify(id)+':function(module,exports,require){\n'+code+'\n}').join(',')+'}); const cache={};';
html=html.replace(marker,replacement).replace('</style>',spec.css+'</style>');
html=html.replace('</head>','<meta name="elif-release" content="v4-atelier-editorial"></head>');
html=html.replace('</body>','<script>'+fs.readFileSync(path.join(dir,'polish.js'),'utf8')+'</script></body>');
const dest=path.join(root,'elif-tasarim');fs.mkdirSync(dest,{recursive:true});fs.writeFileSync(path.join(dest,'index.html'),html);
fs.writeFileSync(path.join(dest,'README.md'),'# Elif Tasarım\n\nV4 interactive atelier preview. Public draft only. No live payments, customer authentication or form delivery. All catalog visuals and prices are concepts.\n\nThe original React-compatible sources are compiled with the MIT Preact preview runtime. This is not a verified Next.js production build.\n\nV3 comparison, configurable design desk, quote prefill, catalog and cart preserved. V4 adds an original editorial homepage, keyboard-operable material and process tabs, craftsmanship detail exploration, manual hero scenes and a dimension-aware entry to the design desk.\n');
for(const [file,source] of Object.entries(spec.sources)){const target=path.join(dest,'source',file);fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,source)}
fs.writeFileSync(path.join(dest,'source','v3.css'),baseCss);
fs.writeFileSync(path.join(dest,'source','v4.css'),v4css);
const result={status:'built',release:'v4-atelier-editorial',bytes:Buffer.byteLength(html),modules:Object.keys(modules),sha256:crypto.createHash('sha256').update(html).digest('hex')};
fs.mkdirSync(path.join(dest,'verification'),{recursive:true});fs.writeFileSync(path.join(dest,'verification','build.json'),JSON.stringify(result,null,2));console.log(JSON.stringify(result));
