const ts=require(process.env.TYPESCRIPT_PATH||'typescript'),fs=require('fs');fs.mkdirSync('preview',{recursive:true});
fs.writeFileSync('preview/domain.cjs',ts.transpileModule(fs.readFileSync('src/lib/domain.ts','utf8'),{compilerOptions:{target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.CommonJS}}).outputText);
