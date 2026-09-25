# Elif Tasarım V7. Test ve teslim raporu

24 Eylül 2026.

## Sonuç ve yayın durumu

V7 kaynakları ve yerel çalışan önizleme hazırlandı. Kullanıcının verdiği Yusuf Usta iş telefonu +90 530 879 71 69 olarak bütün ilgili doğrudan telefon ve WhatsApp eylemlerine işlendi. Bu numaranın kaynağı kullanıcı beyanıdır. Bağımsız operatör doğrulaması veya gerçek WhatsApp mesajı gönderimi yapılmadı.

**Canlı GitHub Pages adresi bu oturumda güncellenmedi.** Bağlantı okuma sunuyor, yazma veya yayın eylemi sunmuyor. Okunan `main` commit'i `69417f27e6a7d04a237adb2e095ef8f72d21a92a`, V6'dır. Bu teslim yeni bir canlı yayın veya canlı adres üzerinde tamamlanmış test olarak sunulmaz.

## Uygulanan en önemli değişiklikler

Kısa model ve ayrıntılı stüdyo ortak bellek taslağı kullanıyor. Son yazılan not, 123 × 61 cm örneği, ilçe, referans ve hazırlanmış fotoğraflar dahili geçişte korunuyor. Masa ölçüleri doğru cm/mm dönüşümüyle aktarılıyor. İlk bağlantının varsayılan notu kullanıcının son metnini ezmiyor.

Birleşik arama aynı sorguyla gerçek çalışma, konsept ve Pinterest sonuçlarına devam ediyor. Fiyatlı eski demo katalog, sepet, ödeme ve atölye paneli aktif müşteri yollarından çıkarıldı. Doğrudan eski adresler uygun yeni sayfaya yönleniyor.

İlham dosyası gerçek iş, konsept ve Pinterest kaydını bir araya getiriyor. Tercihe bağlı kayıt yalnız herkese açık kimlikleri 30 gün saklıyor. Pinterest kaynak adresi özet içinde korunuyor. Kullanıcının kişisel not ve ev fotoğrafları bu kayda veya analitiğe eklenmiyor.

WhatsApp doğrudan `905308797169` alıcısına özetle açılıyor. Fotoğrafın linke gömülmediği açık. Yerel ZIP gerçek JPEG dosyalarını ve özet metnini birlikte taşıyor. Destekleyen cihazda dosya paylaşım penceresi var. İptal, açılış ve gönderim birbirine karıştırılmıyor. Site mesajı teslim aldığını veya sipariş oluşturduğunu söylemiyor.

Mutfak, kahve köşesi ve TV kategorilerine gerçek görselli giriş ve hazırlık soruları eklendi. Proje kapsamı, fiyatı etkileyen unsurlar ve malzeme seçenekleri daha açık anlatılıyor. Gerçek iş, montaj, AI konsepti ve Pinterest kaynağı ayrı kalıyor.

Gizlilik açıklaması dış servis ve yerel saklama davranışını kapsıyor. Pinterest açıklaması ilk tıklamadan önce görünür. Form hatası alanla ilişkilendirilir ve odağı alır. Dosya boyutu/başlığı/piksel denetimi decode öncesine alındı. En fazla 5 dosya, 10 MB/dosya, 25 MB toplam kaynak, 20 MP sınırı var. Fotoğraf paylaşım kopyası en fazla 2000 px JPEG'e yeniden kodlanır. HEIC için otomatik dönüştürme iddiası yerine açık JPG/ekran görüntüsü alternatifi sunulur.

## Derleme

Tek etkin build `tools/build-v7.cjs`. Kaynaklardan 25 erişilebilir modül derlenir. Eski yayın HTML'ine tarihsel modül ekleme yapılmaz. 43 ayrı HTML sayfası gerçek içerikle önceden oluşturulur. Normal yayın çıktısında gerçek adresler, çevrimdışı tek dosyada hash yolları vardır. Eski hash bağlantıları korunur.

Her sayfada başlık, açıklama, canonical, Open Graph ve WebPage JSON-LD bulunur. Fiyat, yıldız, adres veya çalışma saati uyduran şema yoktur. Önizleme noindex kalır. Ticari indeksleme, onaylı GitHub dışı adres ve açık işletme içerik onayı olmadan açılamaz. 404 ve robots dosyaları üretilir, gerçek sunucu davranışı test edilmiş değildir.

JS dosyası 283659 bayt, CSS 184477 bayt. V6 JavaScript'i 594784 bayttı. Yeni JS yaklaşık yüzde 52.3 daha küçük. CSS dosyası V6'daki 169915 bayttan büyümüştür. Bunlar sıkıştırılmamış dosya boyutlarıdır, gerçek yükleme hızı veya Lighthouse sonucu değildir.

Manifestte 152 dosyanın SHA256 ve boyutu kayıtlıdır. Manifest dosyası ayrıca vardır. Aynı kaynak build'i iki kez çalıştırılarak birebir eşleşme kontrol edildi. Yayına uygulanabilir dosyalar, test edilen bu build'den alınır.

TypeScript 5.8.3 tam sürümle sabit. Yerel MIT Preact runtime korunuyor. Sistem fontları kullanılır, font dosyası paylaşılmadı. Npm önbelleği/ağ bulunmadığı için lockfile oluşturma girişimi ENOTCACHED ile sonuçlandı. Lockfile veya bağımlılık güvenlik denetimi tamamlandı denmiyor. Bu, doğrulanmış Next.js üretim projesi değildir.

## Gerçek test sonuçları

| Kontrol | Sonuç | Anlamı |
| --- | --- | --- |
| Birim ve derleme testleri | 67 geçti, 0 başarısız | 42 eski alan regresyonu, 18 V7 çekirdek sözleşmesi, 5 build kontrolü, 2 yerel mount eşlemesi |
| Strict TypeScript çekirdek kontrolü | Başarılı | Yeni proje, yükleme, ZIP ve seçim modülleri. Bütün React/JSX projesinin tam semantik denetimi değildir. |
| Tarayıcı davranışları | 14 geçti | Numara, arama, taslak, ölçü, hatalar, dosya, seçki, gizlilik, demo ayrımı, kategori, mobil, metin büyütme, ekran kaydı |
| Tarayıcı hata/ağ kontrolleri | 2 geçti | Test edilen çevrimdışı akışlarda JS hatası veya HTTP çıkışı görülmedi. |
| Rota ve ekran matrisi | 258/258 | 43 rota, 360/390/768/1024/1440/1920 CSS piksel |
| Manifest bütünlüğü | 152/152 dosya | Yerel SHA256 ve bayt eşleşmesi. Canlı sunucu ile eşleştirme değil. |
| Yerel ZIP | CRC ve içerik geçti | Sentetik PNG'den yeniden kodlanan JPEG ile özet gerçekten ZIP içinde. |

Tarayıcı Chromium 144.0.7559.96. Playwright ve sistem Chromium kullanıldı. Görsellerin bulunduğu çevrimdışı HTML `page.set_content` ile işlendi. Ortamın engellediği HTTP/file gezintisi aşılmadı. Yerel sunucu yalnız yol eşleme ve sözdizimi seviyesinde kontrol edildi. Gerçek yayın, sunucu 200/404 yanıtı, TLS, CSP, gerçek WhatsApp gönderimi, Safari/Firefox, iPhone/Android veya saha LCP/INP/CLS ölçümü yapılmadı.

Yüzde 200 metin testi, önce bütün hesaplanmış yazı boyutlarını kaydedip sonra iki katına çıkaran kontrollü stres probudur. Ana sayfa ve formda taşma olmadı. Resmî WCAG sertifikası veya bütün ekran okuyucular için tam test değildir. Native paylaşım iptal yolu testte simüle edildi, gerçek WhatsApp teslimi sayılmaz.

## Kanıt dizinleri

`evidence/all-unit-tests.txt`, `typecheck-v7.txt`, `integrity.txt`, `browser-final.txt`, `matrix-final.txt`. `evidence/v7/results.json` 16 kaydın ayrıntısı. `evidence/v7/matrix.json` 258 birleşim. `evidence/v7/` ekranlar ve sentetik örnek proje ZIP'i. Kırmızı test çıktıları davranışların önce eksik olduğunu kaydeder.

## Teslim dosyaları

Kurulumsuz V7 HTML. Kaynaklar, seçilmiş görseller ve dokümanlar. GitHub önizlemesindeki yalnız `elif-tasarim/` alt dizinine uygulanabilir yayın ZIP'i. Test çıktıları ve ekranlar. 26 audit kaydının durum matrisi. Veri/ölçüm sözleşmesi ve görsel izin teyit listesi.

## Tamamlanmış sayılmayan işler

V7'nin canlı yayına aktarımı, ticari barındırma, gerçek alan adı, yeni açık adres/hizmet saatleri, bağımsız görsel hakları, sunucu kayıt ve dosya güvenliği, gerçek cihaz kontrolleri, analitik, ödeme, kargo ve fatura entegrasyonları açık. Atölyeye ulaşan örnek WhatsApp mesajını Yusuf Usta'nın teyit etmesi de ayrı işlemdir. Bu paket onları yapılmış gibi göstermez.

## Sonuç

V7, V6'daki doğrulanmış veri kaybı ve yanlış arama geçişini giderir, kullanıcı tarafından sağlanan gerçek iletişimi ekler ve müşterinin fikrini daha açık bir biçimde ustayla paylaşmasına yardımcı olur. Hazırlanmış dosyalar ile canlı yayındaki sürüm ayrı tutulur. Tasarım temeli korunmuştur, yeni AI varyasyonları üretilmemiştir.
