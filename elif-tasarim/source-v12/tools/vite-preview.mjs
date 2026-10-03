// Serve the existing build for inspection. Production still uses build-v25.cjs.
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {defineConfig} from 'vite';
const manifest=JSON.parse(readFileSync('dist/release-v25.json','utf8'));
export default defineConfig({
 root:resolve('.'),build:{outDir:'dist'},base:(manifest.basePath||'')+'/',appType:'mpa',
 server:{host:'0.0.0.0',allowedHosts:['terminal.local'],fs:{strict:true,allow:[resolve('dist')]}},
 plugins:[{name:'local-responsive-review',configurePreviewServer(server){server.middlewares.use((req,res,next)=>{
  if(req.url?.split('?')[0]===(manifest.basePath||'')+'/__qa/'){
   res.setHeader('Content-Type','text/html; charset=utf-8');
   res.setHeader('Cache-Control','no-store');
   res.end(readFileSync('tests/v26/responsive.html','utf8'));return;
  }
  next();
 })}}]
});
