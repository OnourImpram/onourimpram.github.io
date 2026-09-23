// Rebuild the public draft from verified existing transfer parts and original source overrides.
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
const modules={};
for(const [file,source] of Object.entries(spec.sources)){
 const result=ts.transpileModule(source,{fileName:file,reportDiagnostics:true,compilerOptions:{target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.React,jsxFactory:'createElement',jsxFragmentFactory:'Fragment',esModuleInterop:true}});
 if((result.diagnostics||[]).some(d=>d.category===ts.DiagnosticCategory.Error))throw Error('TypeScript syntax error '+file);
 modules[file.replace(/\.tsx?$/,'')]=result.outputText;
}
const marker='}; const cache={};';if(html.split(marker).length!==2)throw Error('Unknown preview module boundary');
const replacement='};Object.assign(modules,{'+Object.entries(modules).map(([id,code])=>JSON.stringify(id)+':function(module,exports,require){\n'+code+'\n}').join(',')+'}); const cache={};';
html=html.replace(marker,replacement).replace('</style>',spec.css+'</style>');
html=html.replace('</head>','<meta name="elif-release" content="v3-reference-synthesis"></head>');
html=html.replace('</body>','<script>'+fs.readFileSync(path.join(dir,'polish.js'),'utf8')+'</script></body>');
const dest=path.join(root,'elif-tasarim');fs.mkdirSync(dest,{recursive:true});fs.writeFileSync(path.join(dest,'index.html'),html);
fs.writeFileSync(path.join(dest,'README.md'),'# Elif Tasarım\n\nOriginal interactive design preview. No live payments or form delivery. All catalog visuals and prices are concepts.\n\nReact-compatible component sources, compiled with the MIT Preact preview runtime. Not a verified Next.js production build.\n');
for(const [file,source] of Object.entries(spec.sources)){const target=path.join(dest,'source',file);fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,source)}
fs.writeFileSync(path.join(dest,'source','v3.css'),spec.css);
console.log(JSON.stringify({status:'built',bytes:Buffer.byteLength(html),modules:Object.keys(modules),sha256:crypto.createHash('sha256').update(html).digest('hex')}));
