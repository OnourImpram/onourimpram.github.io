const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
test('project narratives speak to the workshop visitor rather than referring to an assistant user',()=>{
 const source=fs.readFileSync('src/lib/portfolio.ts','utf8');
 assert.doesNotMatch(source,/Kullanıcının/);
 assert.match(source,/ilan filigranı korunmuştur/);
});
