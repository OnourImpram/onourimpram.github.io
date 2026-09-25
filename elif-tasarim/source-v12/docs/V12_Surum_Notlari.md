# Elif Tasarım V12 C+. Nihai değişiklik günlüğü

25 Eylül 2026.

## Yayın kimliği

Ürün sürümü `v12-cplus-360`, paket sürümü `0.12.0`.

Uygulama yayın commit'i `14238da625f315a3f7176e0ca297c7a6631d5e5f`.

Ana site, https://onourimpram.github.io/elif-tasarim/

Üç boyutlu stüdyo, https://onourimpram.github.io/elif-tasarim/tasarim-masasi/

Bu kayıt, daha önce uygulanıp ana dala alınmış V12 C+ değişikliklerini belgeler. Son tamamlama oturumunda aynı uygulama yeniden yazılmadı. Mevcut yayın, temiz kaynaklardan yeniden üretildi ve canlı adres üzerinde tekrar sınandı. Son doğrulama kaydı, https://github.com/OnourImpram/onourimpram.github.io/actions/runs/36134854408

## 1. Masanın kullanım yönü

Üst tablanın altındaki üç ince çekmece, alt dolabın çekmecesi ve yükseklik kumandası sandalyenin bulunduğu kullanım yönüne bakar. Düzeltme, bütün odayı veya kamerayı rastgele 180 derece çevirmek yerine ilgili masa parçalarının yerel yönünü düzeltir.

Dolap kapağı gövdenin içine değil kullanıcı tarafına açılır. Çekmeceler kullanıcı yönüne doğru dışarı kayar. Ana tabla yükseldiğinde üst çekmeceler onunla birlikte hareket eder. Alt dolap ve alçak yan çalışma yüzeyi yerini korur.

Genel oda görünümünde masanın kapalı arka yüzünü görmek tek başına ters model anlamına gelmez. Kullanım yönü, sandalyenin ve çekmecelerin birbirine göre konumuyla tanımlanır. Çekmece tarafı ve Arka görünümleri bu iki yönü açıkça ayırır.

## 2. Gerçek tam tur inceleme

Yatay kamera yörüngesi hem mekân hem yalnız ürün görünümünde tam tur serbesttir. Fareyle sürükleme ve klavye oklarıyla modelin çevresinde 360 derecenin ötesine geçilebilir. Bu, yalnız fotoğrafı döndürme efekti değildir.

Dikey açı, yakınlık ve zemin ilişkisine yönelik sınırlar korunur. Tam yatay tur, zeminin altına sınırsız uçuş veya her doğrultuda sınırsız kamera hareketi iddiası değildir.

Masa kullanıcının oturduğu taraftan incelenirken görüşü kapatabilecek oda elemanları geçici olarak saklanır. Kitaplık ve raf aydınlatması tercihleri bu sırada silinmez. Genel görünüme dönüldüğünde son seçilen sol, sağ veya çift taraflı raf düzeni ve ışık seviyesi geri gelir.

## 3. Kamera ve etkileşim

Genel, Çekmece tarafı, Arka, Soldan, Sağdan ve Üstten olmak üzere altı kamera girişi bulunur. Kamera konumu ile arayüzün seçili düğmesi eşleşir. Yakınlaştırma, uzaklaştırma ve sıfırlama korunur.

Fare tekerleği normal sayfa kaydırmasını engellemez. Model yakınlığı ayrı araçlarla ve desteklenen dokunma hareketleriyle değiştirilebilir. İki parmakla yakınlaştırma tarayıcıda dokunma girdisiyle sınanır, fiziksel telefonda yapılmış test olarak sayılmaz.

Otomatik dönüş elle kamera hareketiyle durur. Azaltılmış hareket tercihi dikkate alınır. Ana sayfada kullanıcı başlatmadan Three.js sahnesi açılmaz.

## 4. Korunan V11 işlevleri

Masa ölçüleri ve yüzey tercihleri proje taslağına taşınır. Formdan stüdyoya dönüşte son masa konfigürasyonu korunur. Tam ekranda kamera ve temel ölçü kontrolleri kullanılabilir.

Etkin model, sistem açıklaması ve müşterinin kişisel notu birbirinden ayrılmıştır. Tam mesaj önizlemesi, dosya dışa aktarımı, bağlamlı arama, model geçişleri ve kişisel notların herkese açık tasarım bağlantısına konmaması önceki sürümün kazanımlarıdır. Bu belgede bunlar V12'de sıfırdan eklenmiş özellikler gibi sayılmaz.

İşletme adı ve görüşme metinlerinde Yunus Usta kullanılır. Telefon ve WhatsApp alıcısı kullanıcı tarafından sağlanan `+90 530 879 71 69`, makine biçimi `905308797169` olarak korunur. Doğrulama sırasında gerçek mesaj gönderilmez.

Onaylı amblem, Zamana değer katan mobilyalar başlığı, gerçek atölye portföyü ve çift taraflı raflar korunur. Gerçek iş, montaj, konsept model ve dış referans ayrımı devam eder.

## 5. Teknik teslim ve önbellek

Tek etkin derleme `tools/build-v12.cjs` dosyasıdır. Kaynak dizini `elif-tasarim/source-v12` olur. README içindeki eski kaynak dizini atfı son belgeleme turunda `source-v12` olarak güncellendi.

Değişen sahne ve oda modüllerinin yükleme adresleri `v12-cplus-360` sürüm parametresi taşır. Böylece yeni uygulamayla eski sahne dosyasının önbellekten karışması önlenmeye çalışılır. Çevrimdışı önizleme aynı modüllerin yerel karşılıklarını kullanır.

Node.js 22 ortamında `npm ci --ignore-scripts`, `npm run build`, `npm test`, `npm run typecheck:core` ve `npm run verify:dist` komutları kullanılır. Three.js 0.185.1, TypeScript 5.8.3 ve mevcut yerel Preact çalışma zamanı korunur. Bu teslim Next.js uygulamasına geçiş olarak adlandırılmaz. Font dosyası dağıtılmaz.

## 6. Son doğrulama

Temiz Node.js 22 derlemesi, yeniden oluşturulan manifestle yayımlanmış manifesti birebir eşleştirdi. 116 birim, geometri ve derleme testi geçti. İlgili çekirdek modüllerin strict TypeScript denetimi ve yerel yayın bütünlüğü denetimi başarılı oldu.

Canlı GitHub Pages adresi üzerinde V12 C+ için 20 kontrol grubu ve korunan müşteri karar akışları için 25 kontrol grubu geçti. Gruplarda ortak özellikler bulunduğundan bunlar 45 farklı özellik iddiası değildir. İlk grup gerçek fare hareketi ve klavye girdisiyle tam yatay turu, çekmecelerin kullanıcı yönünü, geçici oda gizlemeyi, otomatik dönüşü, iki parmak girdisini ve görüntü dışa aktarımını kapsar. İkinci grup model geçişi, özel notların korunması, ölçü birimleri, mesaj eşleşmesi, arama, mobil ve tam ekran kullanımı ile hata toparlanmasını kapsar.

Manifestteki 172 public HTTP dosyası boyut ve SHA256 bakımından eşleşti. `.nojekyll` girdisi build dosyası olarak ayrı tutuldu. Manifestin kendisi de eşleşti. 43 doğrudan HTML adresi ve bilinmeyen adres için 404 yanıtı kontrol edildi. Bu turda önceki 301 ekran birleşimi testi yeniden çalıştırılmış gibi sayılmadı.

Test edilen akışlarda yakalanmamış JavaScript hatası görülmedi. Ana sayfada kullanıcı başlatmadan 3D motoru açılmadı. Görüntü dışa aktarımında gerçek sahneden 1920 × 1280 piksel PNG oluşturuldu. Yeni rapordaki ekranlar canlı siteden alınmıştır, görsel üretim maketi değildir.

Son çalışma `36134854408`, `final-verification` işi başarılı. Tarayıcı sürümü 153.0.8010.52. Çalışma sırasında gerçek WhatsApp mesajı gönderilmedi.

## 7. Yayın kapsamı ve sınırlar

Kişisel ana sayfanın `index.html` kimliği `501229ef0c1d25dbc4554e27ca089b03e590c7e0` olarak korunur. Ürün yalnız `elif-tasarim/` altında yayımlanır. Kayıt belgesi ve test iş akışı dışındaki ürün kodu, bu son belgeleme oturumunda yeniden değiştirilmez.

Bu bir portföy ve konsept stüdyosudur. Noindex önizleme politikası korunur. Otomatik sipariş kaydı, ödeme, kargo veya fatura servisi yoktur. WhatsApp'ın açılması gönderim veya teslim kanıtı değildir.

Yükseklik aralığı, yan tabla hareketi, raflar ve geometrik yerleşim ölçüleri imalat projesi, motor uygunluk raporu, gerçek çarpışma çözümü, elektrik güvenliği veya taşıma kapasitesi onayı değildir. Bunlar Yunus Usta ve seçilecek fiziksel mekanizmayla ayrıca doğrulanmalıdır.

Tarayıcı testleri Chromium ve yazılımsal WebGL ortamını kapsar. Bütün iPhone ve Android cihazları, Safari ve Firefox, gerçek GPU performansı, pil tüketimi, ısınma, saha Web Vitals değerleri veya erişilebilirlik sertifikası kapsamda değildir.
