const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const css=()=>fs.readFileSync('src/v21.css','utf8');
function luminance(hex){return hex.replace('#','').match(/../g).map(h=>parseInt(h,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((sum,v,i)=>sum+v*[.2126,.7152,.0722][i],0)}
function contrast(a,b){const aa=luminance(a),bb=luminance(b);return (Math.max(aa,bb)+.05)/(Math.min(aa,bb)+.05)}
test('V21 measured helper text and contact link have explicit readable colors',()=>{
 const text=css();for(const rule of ['.eyebrow{color:#6b543c}', '.work-caption p{color:#6e5c48}', '.v6-final-cta .text-link{color:#543f2c}', '.model-form .field-hint{color:#6b543c}'])assert.ok(text.includes(rule),rule);
 assert.ok(contrast('#6b543c','#e8decf')>=4.5);assert.ok(contrast('#6e5c48','#f6f2e9')>=4.5);assert.ok(contrast('#543f2c','#e8decf')>=4.5);
});
test('V21 visible labels remain in accessible control names',()=>{
 const app=fs.readFileSync('src/App.tsx','utf8'),home=fs.readFileSync('src/pages/Home.tsx','utf8'),cards=fs.readFileSync('src/components/PortfolioUI.tsx','utf8');
 assert.ok(!app.includes('aria-label="Elif Tasarım ana sayfa"'));
 assert.ok(home.includes("aria-label={String(i+1).padStart(2,'0')+' '+sc.label+' sahnesi'}"));
 assert.ok(!home.includes('aria-label="Devir 01. Çift raflı 3D tasarım stüdyosunu aç"'));
 assert.ok(cards.includes("'İlham dosyanızda. Kaydı kaldır. ':'İlham dosyama ekle. '"));
});
