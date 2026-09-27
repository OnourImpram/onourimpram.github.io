const{test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
test('V22 privacy disclosure describes the configured email recipient, not the obsolete empty-recipient flow',()=>{
 const html=fs.readFileSync('dist/gizlilik/index.html','utf8');
 assert.ok(!html.includes('İşletme e-postası doğrulanmadığı için alıcı boş bırakılır'),'Privacy page incorrectly says the recipient is empty');
 assert.ok(html.includes('Alıcı alanı, iletisim.eliftasarimatolyesi@gmail.com adresiyle hazırlanır.'),'Privacy page must accurately name the configured recipient');
 assert.ok(html.includes('Bu site e-posta veya SMS teslimini doğrulamaz.'),'Delivery boundary must remain explicit');
});
