# Elif Tasarım V10. Test, reklam incelemesi ve canlı teslim

25 Eylül 2026.

## Sonuç

V10, V9 kaynakları üzerinde hata üretimi ve düzeltme çalışmasının ardından hazırlanmış ve mevcut GitHub Pages önizlemesine yayımlanmıştır. Onaylı ahşap amblem, Zamana değer katan mobilyalar başlığı, Yusuf Usta'nın arşivi ve çift taraflı kitaplıklı gerçek Three.js stüdyosu korunur.

Adres. https://onourimpram.github.io/elif-tasarim/

3D stüdyo. https://onourimpram.github.io/elif-tasarim/tasarim-masasi/

Yayın commit'i. `cb8cf2af5f7044327dc4744014bc26baa53853a4`.
Test edilmiş dal çıktısı. `10088689b385c1989ca632c2249af8a64af91d16`.
Yayından önce main üzerinde V8 bulunuyordu. V9 bu görevden önce yayımlanmış değildi. Bu görevde V9'un iyileştirmeleri ve V10 düzeltmeleri birlikte yayımlandı.

Temiz derleme ve HTTP testi. https://github.com/OnourImpram/onourimpram.github.io/actions/runs/36093282762
Canlı dosya ve tarayıcı doğrulaması. https://github.com/OnourImpram/onourimpram.github.io/actions/runs/36093897753

Yalnız elif-tasarim alt ağacı değiştirildi. Kişisel kök index.html dosyasının blob'u `501229ef0c1d25dbc4554e27ca089b03e590c7e0` olarak korundu. Force push kullanılmadı.

## Bulgular

Ayrıntılı BULGU_VE_DUZELTME_KAYDI.md dosyasında 12 hata kaydı ve ilave iyileştirmeler bulunur. Bunların tamamı güvenlik açığı değildir.

Dolap kapağının içeri dönmesi, kitaplık gizlenince ışığının açık kalması, akşam görünümünün paylaşımda kaybolması, kamera düğmelerinin yanlış seçili görünmesi, sıfırlamanın dönüş durumunu bırakması ve başarısız görüntü dışa aktarımında canvas boyutunun değişmiş kalması giderildi.

Meşe tonunun form seçeneğiyle uyuşmaması ve select seçeneklerinin boş DOM değeri vermesi iki ayrı kök neden olarak düzeltildi. Hatalı yükseklik artık en alanına değil yükseklik alanına bağlanır. Yeni model seçimi kategori ve referansı güncellerken özel açıklamayı korur. Aynı sayfada ikinci arama sorgusu sonuçlarla birlikte güncellenir. Paylaşım metadata'sı ilgili proje fotoğrafını ve temiz sayfa adresini kullanır.

Kontrollü WebGL kayıp durumunda seçenekleri koruyan yeniden başlatma, klavye ile sekme kontrolü, güncel saklama açıklaması ve stüdyodan form doldurmadan soru yolu da eklendi.

## Reklam gözüyle yapılan değişiklikler

Mutfak, kahve köşesi ve TV ünitesi başlıkları müşterinin ne yaptırabileceğini daha açık anlatır. Reklam için önerilen kategori, gerçek fotoğraf ve doğru kategoriyle başlayan görüşme aynı bağlamı korur. Model formunda müşteri ne olacağını görür. Fikri hazırlamak, WhatsApp'ta kullanıcı tarafından göndermek ve uygulanabilirliği ustayla görüşmek ayrı aşamalardır.

Form doldurmadan WhatsApp'ta soru bağlantısı Devir 01 seçenekleriyle doğru numaraya açılır. Numara kullanıcı tarafından verilmiştir, +90 530 879 71 69. Linke basılması gerçek mesaj teslimi olarak sunulmaz. Raf, lamba ve oda düzeni masa fiyatına veya imalat kapsamına dahilmiş gibi yazılmaz.

Google Ads'in resmi sayfa deneyimi belgeleri kullanışlı bilgi, reklam beklentisiyle uyum ve kolay gezinmeyi vurgular. Bunlar incelemenin dış kaynaklı çerçevesidir. Elif'in dönüşüm verisi ölçülmedi. Reklam bütçesi harcanmadı, kampanya açılmadı, Google politika onayı alınmadı. Belgeler docs/v10/REKLAM_INCELEMESI.md içinde listelidir.

## Doğrulanmış test sonuçları

| Test | Sonuç | Yorum |
| --- | --- | --- |
| Başlangıç V9 birim grubu | 83 geçti | Yeni negatif senaryoların gerekli olduğu görüldü. |
| V10 birim ve derleme grubu | 90 geçti | Aynı grup yerelde ve temiz GitHub Actions ortamında geçti. |
| Çekirdek strict TypeScript | Geçti | Yeni/ilgili çekirdek modüller. Bütün JSX ağacının semantik denetimi değildir. |
| Korunan 3D ve kullanıcı işlevleri | 32 geçti | Yerel Chromium, çevrimdışı set_content. |
| Yeni negatif senaryoların HTTP karşılığı | 15 geçti | Önce CI HTTP adresinde, sonra gerçek Pages adresinde. |
| Yerel rota ve ekran matrisi | 258 birleşim geçti | 43 rota ve altı genişlik. 258 bağımsız işlev değildir. |
| Canlı doğrudan sayfa matrisi | 86 birleşim geçti | 43 gerçek URL, 390 ve 1440 piksel. HTTP 200, H1, taşma ve yüklenmiş görseller. |
| Kontrollü iki kat metin | 3 ekran geçti | Ana sayfa, model formu, 3D stüdyo. Resmi WCAG sertifikası değil. |
| Canlı dosya bütünlüğü | 172 dosya ve manifest eşleşti | .nojekyll yalnız build kontrol dosyası, HTTP dosyası diye sayılmadı. |
| Normal hareket | Geçti | Tabla yaklaşık 113 cm'ye hareket ederken alçak yan yüzey 69,5 cm konumunu korudu. Fiziksel masa testi değildir. |

Gruplarda ortak özellikler var. Aynı testin iki ortamda çalışması, iki farklı özellik bulunmuş gibi sayılmaz. 15 canlı kaydın biri uygulama hata kontrolüdür. Test edilen akışlarda yakalanmamış JavaScript hatası görülmedi.

Yeni tarayıcı karşılaştırmaları, önce değişmemiş V9 üzerinde başarısızlık üretip ardından V10 üzerinde başarıyı gösterir. İlk prob hataları ve bekleme süresi değişiklikleri çalışma kaydında korunur. Sahne yeniden başlatma eyleminin yazılımsal grafik ortamında uzun sürmesi için yalnız bu test eyleminin bütçesi 60 saniyeye çıkarılmıştır.

## Yayın kimliği

Release. `v10-refined-atelier`. Paket sürümü `0.10.0`.

Manifest SHA256. `c5c2af348bc1957040b3a94644cd3a84e3686e331cf839a737bd284a8c51c61a`.

Manifest 173 dosya girdisi taşır. 172'si canlı HTTP dosyası olarak eşleştirildi, .nojekyll build dosyası olarak ayrıldı. Manifest kendisi de beklenen dosyayla birebir eşleşti.

JavaScript 306845 bayt. CSS 213005 bayt. Bunlar sıkıştırılmamış dosya büyüklükleri, hız puanı veya tüm görsel yükünün toplamı değildir.

## Çalıştırma

Node.js 22 üzerinde kaynak klasöründe npm ci --ignore-scripts, npm run build, npm test ve npm run serve kullanılır. Tek etkin build tools/build-v10.cjs'dir. dist dosyaları aynı build'den çıkar. Kaynak ve yayın farklı tarihsel modül eklerinden üretilmez. npm run verify:dist yerel manifest eşleşmesini kontrol eder.

Three.js 0.185.1 ve TypeScript 5.8.3 korunur. Sistem yazı tipleri kullanılır. Font dosyası teslim edilmez. Bu teslim Next.js üretim uygulamasına geçiş olarak adlandırılmaz.

## Ortam ve kalan sınırlar

Canlı tarayıcı Chromium 140.0.7339.16, Playwright 1.55.0, Xvfb ve yazılımsal WebGL kullanır. Yerel sürüm Chromium 144.0.7559.96. Gerçek telefon, Safari, Firefox ve donanımsal mobil GPU testi yapılmadı. WebGL kaybı kontrollü olay ile üretildi. Gerçek ekran kartı arızaları veya bütün düşük bellek durumları doğrulanmadı.

Testler WhatsApp bağlantısının alıcısını ve metnini doğruladı. Gerçek mesaj gönderilmedi. Atölyenin mesajı aldığını teyit eden insan testi ayrı kalır. Yerel fotoğraf/özet dışa aktarımı otomatik sunucu talep kaydı değildir.

Tam mekanik çarpışma çözümü, motor, yük kapasitesi, garanti, elektrik güvenliği veya üretim ölçüsü onayı yoktur. Görsel konfigürasyon, imal edilebilirlik garantisi değildir. Fotoğrafların kullanım hakları işletme teyidine dayanır, bağımsız inceleme yapılmadı.

GitHub Pages noindex önizlemesi korunur. Ticari barındırma, gerçek alan adı, onaylı ziyaret adresi/hizmet kapsamı ve gerekli ticari koşullar ayrı hazırlanmalıdır. Canlı ödeme, sipariş sunucusu, fatura, kargo ve otomatik veri toplama eklenmedi. _headers dosyasının byte eşleşmesi, GitHub Pages'in oradaki başlıkları uyguladığı anlamına gelmez. Canlı CSP/TLS sertifikasyonu veya Web Vitals saha skoru verilmez.

## Teslim

Çalışan V10 adresi. Çevrimdışı HTML. Düzenlenebilir kaynak ve testler. Yayın dosyaları. 12 bulgulu düzeltme kaydı. Reklam incelemesi. Kırmızı testler, yerel kabul ve canlı doğrulama kanıtları. Canlı siteden alınan masaüstü, mobil, kategori ve 3D ekranları.
