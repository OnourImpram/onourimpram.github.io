# Elif Tasarım V10

V9'un çift kitaplıklı Three.js stüdyosunu ve gerçek çalışma arşivini koruyan hata düzeltme ve müşteri deneyimi sürümü. Slogan ve Yusuf Usta'nın kullanıcı tarafından sağlanan +90 530 879 71 69 numarası korunur.

## Çalıştırma
Node.js 22 ve Python 3 kullanılır. TypeScript 5.8.3 ve paketle gelen Three.js 0.185.1 sabittir. Bu, en yeni sürüme geçildiği veya Next.js üretim altyapısı olduğu iddiası değildir. Önizleme mevcut yerel MIT Preact runtime'ını kullanır.

```bash
npm ci --ignore-scripts
npm run build
npm test
npm run typecheck:core
npm run verify:dist
npm run serve
```

Tek etkin build, tools/build-v10.cjs. dist içinde 43 gerçek HTML sayfası, yerel görseller ve Three.js modülleri vardır. preview/Elif_Tasarim.html taşınabilir, daha büyük tek dosyalı önizlemedir. release-v10.json boyut ve SHA256 kayıtlarını taşır. Yayın dosyaları ile hazır olması, canlı adreste doğrulandığı anlamına gelmez. Canlı durumu ayrıca teslim raporunda kaydedilir.

## Düzeltilen davranışlar
Dolap kapağının menteşe yönü. Gizlenen kitaplığın ışığı. Görünüm sıfırlama ve seçili kamera düğmesi. Akşam ışığının seçenek bağlantısında korunması. Başarısız görüntü kaydında renderer ve kamera durumunun geri alınması. Malzemenin form seçenekleriyle eşleşmesi ve tüm seçim alanlarının gerçek değerlere sahip olması. Hatanın doğru ölçü alanına bağlanması. Yeni modelin kategori ve bağlantısının alınması, özel not ve ölçülerin korunması. Aynı sayfadaki ikinci aramanın güncellenmesi. Sayfaya uygun paylaşım fotoğrafı ve metadata.

Masa, Ölçü ve Mekân sekmeleri klavyeyle değiştirilebilir. WebGL görünümü kesildiğinde konfigürasyonu koruyarak yeniden başlatma yolu bulunur. Stüdyodan form doldurmadan, konsept özetiyle Yusuf Usta'ya WhatsApp sorusu hazırlanabilir.

## Testler
Unit, geometri ve build sözleşmeleri npm test ile çalışır. Yeni olumsuz ve olumlu tarayıcı testleri tests/v10/regressions.py, önceki geniş kapsamın devamı tests/v10/acceptance.py, ekran ve metin matrisi tests/v10/matrix.py içindedir. Yerelde grafik ekranı gerektiren Chromium için xvfb-run -a kullanılabilir. BASE_URL verildiğinde regresyon grubu gerçek HTTP adresine uygulanır. CHROME değişkeni tarayıcı yolunu değiştirebilir. Hiçbir test gerçek WhatsApp mesajı göndermez.

## Sınırlar
Konsept model mekanizma, fiziksel çarpışma, taşıma kapasitesi veya elektrik güvenliği onayı değildir. Kitaplıklar ve dekor masa ölçüsüne veya teklifine otomatik dahil değildir. Gerçek işler, montaj fotoğrafları ve konseptler ayrı kalır. Fiyat, müşteri puanı, garanti, adres ve çalışma saati uydurulmaz.

GitHub Pages kopyası noindex tasarım önizlemesidir. Gerçek ticari barındırma ve işletme alan adı ayrıca doğrulanmalıdır. Otomatik talep sunucusu, ödeme, fatura ve kargo yoktur. Mesajı kullanıcı WhatsApp'ta gönderir. Özel müşteri dosyaları GitHub'a veya analitiğe kaydedilmez. Yayın işlemi yalnız elif-tasarim/ alt dizinini değiştirmeli, kişisel ana sayfayı korumalıdır.

## Lisans
Three.js lisansı public/three/vendor/THREE_LICENSE.txt, Preact lisansı tools/PREACT_LICENSE.txt. Font dosyası dağıtılmaz. Yeni masa fotoğrafı veya yeni gerçek çalışma iddiası oluşturulmadı. Stüdyo görüntüleri çalışan modelin ekranlarıdır.
