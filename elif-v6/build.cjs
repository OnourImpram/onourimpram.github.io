// V6 reconstruction. Only checksum-verified source data is compiled.
const fs=require('fs'),path=require('path'),zlib=require('zlib'),crypto=require('crypto'),cp=require('child_process'),ts=require('typescript');
const shas=['7924024b7d1d4f20ed7cdcde85142398f0a3fb0c','4dfa49c701abc13fed2b160df2ea7c3565597663','ba9cda28f2a7ed0c94e82b6034a25729a43a17eb','af7a05d734a8ba34c5b4acf03d29fb596337ce63','c6238b7234c1d5d615064278ec2193edac4076fc'];
const repairs={"0":[[1272,1273,"e"],[1526,1527,"z"],[1650,1651,"0"],[1669,1671,"O"],[2287,2287,"U"],[2288,2289,""],[2290,2291,"w"],[2611,2612,""],[2955,2957,""],[2998,2999,"Q"],[3419,3420,"6a"],[3421,3422,"e"],[4377,4378,"i"],[11949,11951,"3"]],"1":[[15106,15107,"m"]],"2":[],"3":[],"4":[]};
const sum=b=>crypto.createHash('sha256').update(b).digest('hex');
(async()=>{
 let parts=[];
 for(let i=0;i<shas.length;i++){
  const r=await fetch('https://api.github.com/repos/OnourImpram/onourimpram.github.io/git/blobs/'+shas[i],{headers:{Authorization:'Bearer '+process.env.GH_TOKEN,Accept:'application/vnd.github+json'}});if(!r.ok)throw Error('Transfer read '+r.status);
  const json=await r.json(),raw=Buffer.from(json.content,'base64');let s=i===0?raw.toString('base64'):raw.toString('ascii');
  for(const [start,end,text] of [...repairs[i]].reverse())s=s.slice(0,start)+text+s.slice(end);
  parts.push(s);
 }
 const compressed=Buffer.from(parts.join(''),'base64');
 if(sum(compressed)!=='dc0bfacf13d4d1c94a381c8d3b275454711ce17c78e0cd1e56b88183c0e41911')throw Error('V6 source checksum mismatch. Nothing executed.');
 fs.mkdirSync('elif-v6',{recursive:true});fs.writeFileSync('elif-v6/payload.gz',compressed);
 const spec=JSON.parse(zlib.gunzipSync(compressed));
 const base=cp.execFileSync('git',['show','8763fa15bfe1f3e97fb933cf35d7d2e1a3cb2745:elif-tasarim/index.html'],{maxBuffer:10000000});
 if(sum(base)!=='24989a4c23450f9f92ba00fd284571bff1a5dce03f3d45b58877ad2cf6083966')throw Error('V5 baseline changed');
 const html=base.toString('utf8'),scripts=[...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map(m=>m[1]),styles=[...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map(m=>m[1]);
 if(scripts.length!==3||styles.length!==1)throw Error('Unknown baseline boundaries');
 const definitions=[];
 for(const [name,source] of Object.entries(spec.sources)){
  if(!/^src\/[a-zA-Z0-9_./-]+\.tsx?$/.test(name)||name.includes('..'))throw Error('Invalid source path');
  const r=ts.transpileModule(source,{fileName:name,reportDiagnostics:true,compilerOptions:{target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.React,jsxFactory:'createElement',jsxFragmentFactory:'Fragment',esModuleInterop:true}});
  if((r.diagnostics||[]).some(d=>d.category===ts.DiagnosticCategory.Error))throw Error('TypeScript syntax '+name);
  definitions.push(JSON.stringify(name.replace(/\.tsx?$/,''))+':function(module,exports,require){\n'+r.outputText+'\n}');
  const dest=path.join('elif-tasarim/source',name);fs.mkdirSync(path.dirname(dest),{recursive:true});fs.writeFileSync(dest,source);
 }
 const marker=' const cache={};';if(scripts[1].split(marker).length!==2)throw Error('Module boundary mismatch');
 let app=scripts[1].replace(marker,'Object.assign(modules,{'+definitions.join(',')+'});'+marker)+'\n'+scripts[2];
 const dest='elif-tasarim';fs.mkdirSync(dest,{recursive:true});
 const assets=Object.fromEntries(fs.readdirSync(dest+'/assets').filter(x=>/\.(webp|png|jpg)$/.test(x)).map(x=>[x,'assets/'+x]));
 const css=styles[0]+'\n'+spec.css;
 const index='<!doctype html><html lang="tr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><meta name="elif-release" content="v6-atelier-portfolio"><title>Elif Tasarım | Zamana değer katan mobilyalar</title><meta name="description" content="Elif Tasarım. Yusuf Usta’nın atölyesinden işler, özel ölçü ve ilham modelleri. Kendi modelinizi getirin, birlikte üretelim."><meta name="theme-color" content="#654a32"><link rel="icon" href="assets/favicon.png"><link rel="stylesheet" href="styles.css"><meta name="referrer" content="strict-origin-when-cross-origin"></head><body><div id="app"></div><noscript><h1>Elif Tasarım</h1><p>Bu tasarım önizlemesi JavaScript gerektirir. Canlı satış ve otomatik form gönderimi yoktur.</p></noscript><script>window.__ELIF_PREVIEW__=true;window.__ELIF_ASSETS__='+JSON.stringify(assets)+';</script><script src="app.js"></script></body></html>';
 fs.writeFileSync(dest+'/app.js',app);fs.writeFileSync(dest+'/styles.css',css);fs.writeFileSync(dest+'/index.html',index);fs.writeFileSync(dest+'/source/v6.css',spec.css);
 for(const [name,text] of Object.entries(spec.tests)){if(!/^tests\/v6\/[a-zA-Z0-9_.-]+$/.test(name))throw Error('Invalid test path');const d=path.join('elif-v6',name);fs.mkdirSync(path.dirname(d),{recursive:true});fs.writeFileSync(d,text);}
 fs.writeFileSync('elif-v6/tests/v6/fixture.png',Buffer.from('89504e470d0a1a0a0000000d49484452000000080000000808020000004b6d29dc0000001449444154789c636c8a3262c00698b08a0e5a0900d82c011ebad642be0000000049454e44ae426082','hex'));
 const manifest={release:'v6-atelier-portfolio',source_sha256:sum(compressed),baseline_sha256:sum(base),files:Object.fromEntries(['index.html','app.js','styles.css'].map(n=>[n,{sha256:sum(fs.readFileSync(dest+'/'+n)),bytes:fs.statSync(dest+'/'+n).size}]))};
 fs.writeFileSync(dest+'/release-v6.json',JSON.stringify(manifest,null,2));
 fs.writeFileSync(dest+'/README.md','# Elif Tasarım V6\n\nPortfolio and design preview. Original workshop photographs, clearly labeled AI concepts and opt-in external Pinterest references. No live payment or automatic form submission. React-compatible TypeScript sources and MIT Preact preview runtime. This is not a verified Next.js production build.\n');
 console.log(JSON.stringify(manifest));
})().catch(e=>{console.error(e);process.exit(1)});
