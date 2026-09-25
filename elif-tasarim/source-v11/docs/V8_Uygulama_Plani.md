# Elif Tasarım V8. Hareketli çalışma masası

## Amaç
Onaylı V7 vitrininin görünümünü koruyarak ana sayfadaki şematik masa ve Tasarım Masası sayfasına gerçek Three.js sahnesi eklemek. Referans fotoğraflar tasarım girdisidir, rakip fotoğrafları ve ürün garantileri yayıma taşınmaz. Önizleme GitHub Pages üzerinde aynı alt dizinde kalır. İşletme telefonu +90 530 879 71 69 korunur.

## Tasarım kararı
Devir 01 adlı editoryal konsept. Yükselen çekmeceli ana tabla. Ahşap kılıflı sol taşıyıcı. Sağda sabit dolap ve çekmece. Bu merkez etrafında dönebilen alçak yan tabla ve uç destek. Ceviz, açık meşe, koyu ahşap seçenekleri. Referansın biçim ilkeleri, Elif için özgün parametrik geometriyle yorumlanır.

## Sınırlar
80 ile 125 cm yükseklik, 120 ile 220 cm en ve 65 ile 95 cm derinlik bu görsel modelin arayüz aralıklarıdır. Ürün teknik şartnamesi, ergonomi önerisi, yük hesabı, çarpışma sertifikası veya motor doğrulaması değildir. Yan tabla 0 ile 360 derece gösterilir. Bu bir imalat onayı değildir. Gerçek uygulama arşivi korunur. Kart etiketleri Konsept model veya Konsept modeller olur. AI kaynak bilgisi iç envanterde kalır, konsept hiçbir yerde teslim edilmiş iş diye sunulmaz.

## İş paketleri
1. Parametre ve paylaşım sözleşmesi. Girdi sınırları, eski URL uyarlaması, seri ölçü değişimleri, özel notların URL'ye taşınmaması. Önce başarısız birim testi, sonra uygulama.
2. Three.js 0.185.1 sahnesi. PBR malzemeler, özgün ahşap doku, yumuşak gölge, OrbitControls, yükselen üst takım, dönen yan modül, açılan çekmece ve kapak. Görünürlük dışında durma, bağlam kaybı ve WebGL desteği yokluğunda açık yedek görünüm.
3. Ana sayfa ve Tasarım Masası arayüzü. Ölçü ve malzeme kontrolleri, kamera açıları, yakınlaştırma, PNG çıktı, paylaşılabilir bağlantı ve mevcut özel üretim taslağına aktarım.
4. Görsel kalitesi. Mevcut küçük konsept varlıkları daha büyük kullanılabilir kaynaklarla değiştirme. Atölye fotoğraflarının ayrıntısını uydurmama. 3D modelin yüksek çözünürlüklü gerçek render'ını yedek resim olarak kullanma.
5. Doğrulama. Birim testleri, gerçek WebGL render, mekanik parça dönüşümleri, piksel değişimi, mobil menü, klavye, reduced motion, bağlam kaybı, eski V7 iletişim/arama/taslak regresyonu, dosya bütünlüğü.
6. Yayın. Ayrı dalda HTTP kontrolü. Yalnız elif-tasarim alt ağacının sürümlü aktarımı. Kök index.html korunur. Canlı URL, Three.js kaynakları ve müşteri akışları yeniden denetlenir.

## Kabul
Bir resim animasyonuna Three.js denmez. Sayfada WebGL2 canvas, Three.js revision ve hareket eden gerçek mesh grupları kanıtlanır. Fotoğrafın tek görünümünden görünmeyen donanım çıkarılmış sayılmaz. Gönderim kanalı WhatsApp'tır, sunucuya teslim ve ödeme eklenmiş sayılmaz.

## Gerçek WebGL testinden gelen düzeltme
İlk GitHub Actions koşumu gerçek Three.js 185 geometrisini, 117 çizim çağrısını ve 60796 üçgeni doğruladı. Yükseklik testi, 1500 milisaniye sabit beklemeden sonra 115 cm yerine 114,29 cm ara animasyon karesi okudu. Sonuç yanlış hedef değil, yazılımsal GPU koşumunda henüz bitmemiş geçişti. Test artık gerçek geometrinin hedefe yakınsamasını bekler. Animasyonun zaman adımı da yavaş karelerde gerçek geçen zamanı dikkate alır. Test toleransı gevşetilmedi. Sabit taban ve yan tabla yüksekliği ayrıca denetlenir.
