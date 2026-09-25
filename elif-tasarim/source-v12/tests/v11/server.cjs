const {test}=require('node:test');
const assert=require('node:assert/strict');
const http=require('node:http');
const {spawn}=require('node:child_process');
const path=require('node:path');
const root=path.resolve(__dirname,'../..');
test('V11 preview server reads the current manifest and serves the real base path',async()=>{
 const probe=http.createServer();await new Promise(r=>probe.listen(0,'127.0.0.1',r));const port=probe.address().port;await new Promise(r=>probe.close(r));
 const child=spawn(process.execPath,['tools/serve-static.cjs','dist',String(port)],{cwd:root,stdio:['ignore','pipe','pipe']});
 try {
  await new Promise((resolve,reject)=>{const t=setTimeout(()=>reject(Error('preview startup timeout')),5000);child.once('error',reject);child.stdout.once('data',()=>{clearTimeout(t);resolve()});});
  const r=await fetch(`http://127.0.0.1:${port}/elif-tasarim/`);assert.equal(r.status,200);assert.match(await r.text(),/v13-final-atelier/);
  const contact=await fetch(`http://127.0.0.1:${port}/elif-tasarim/iletisim/`);assert.equal(contact.status,200);assert.match(await contact.text(),/Yunus/);
  const wrong=await fetch(`http://127.0.0.1:${port}/elsewhere/`);assert.equal(wrong.status,404);
 } finally {child.kill();}
});
