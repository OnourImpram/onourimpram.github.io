const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),ts=require('typescript');
function runLocation(hash,found){
 const source=ts.createSourceFile('App.tsx',fs.readFileSync('src/App.tsx','utf8'),ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
 const klass=source.statements.find(n=>ts.isClassDeclaration(n));
 const method=klass.members.find(n=>n.name?.getText(source)==='onLocation');
 const body=method.initializer.body.getText(source);
 const win={location:{hash}},history={state:found?{elifEntry:2}:null,replaceState(){}};
 const target={entry:1,entries:new Map(found?[[2,{path:'/devir-01',y:found}]]:[]),restoring:null,currentLocation:()=>'/devir-01',setState(){},afterRoute(){}};
 const invoke=new Function('window','history','return function()'+body)(win,history);
 invoke.call(target);return target.restoring;
}
test('new native section navigation must not schedule a top-of-page restore',()=>assert.equal(runLocation('#devir-baslangic',null),null));
test('ordinary route navigation still starts at top',()=>assert.equal(runLocation('',null),0));
test('saved history location takes precedence over a previous section hash',()=>assert.equal(runLocation('#devir-baslangic',287),287));
