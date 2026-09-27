from pathlib import Path
root=Path('elif-tasarim/source-v12')
p=root/'src/v22.css'
s=p.read_text()
rule='\n/* A repeated contact-facts address must wrap too, including 200% text resize. */\na[href^="mailto:"]{overflow-wrap:anywhere;white-space:normal}\n/* Long Turkish headings may wrap, without shrinking or hiding enlarged text. */\n.v6-page-head h1{overflow-wrap:anywhere;min-width:0}\n'
assert rule not in s
p.write_text(s+rule)
p=root/'docs/v22/FINAL_UX_REVIEW.md'
s=p.read_text().replace('Yerel yönetimli fare olayları ile standart HTTP tarayıcı olayları farklı davranabildiğinden yayın kapısı GitHub Actions içindeki gerçek HTTP Chromium kontrolleridir.','Yayın kapısı GitHub Actions içindeki gerçek HTTP Chromium kontrolleridir. Sabit genel iletişim öğeleri kaldırıldıktan sonra yerel gerçek fare tıklamasıyla da son özet adımı açıldı.')
s+='\n## Son ölçülmüş yeniden akış düzeltmesi\n\nİlk HTTP çalışması yeni e-posta, kopyalama reddi, son iletişim adımı ve ilham dosyası işlemlerini geçti. Metinler iki kat büyütülünce iletişim bilgisinin ikinci gösterimindeki e-posta satırı 390 piksel ekranda 559 piksele taştı. DOM incelemesi, sınıfsız ikinci mailto bağlantısını saptadı. Tüm e-posta bağlantılarının sözcük kırılması sağlandı. Kolay iletişim ve ilham dosyası sayfalarında büyütülmüş uzun Türkçe başlıkların min-content genişliği 432 ve 500 piksel oldu. Başlıkların gerektiğinde kırılmasıyla üç sayfa da yerel yeniden üretimde 390 piksele döndü. Metin küçültülmedi, overflow hidden kullanılmadı, test toleransı artırılmadı. Tam HTTP kontrolleri aynı koşullarla yeniden çalıştırılır.\n'
p.write_text(s)
print('Applied measured email and heading reflow fixes without relaxing the browser assertions')
