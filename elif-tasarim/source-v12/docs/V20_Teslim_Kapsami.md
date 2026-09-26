# Elif Tasarım V20. Atölye sürümü

## Amaç

Onaylanmış marka kimliği, gerçek çalışma arşivi, konsept ayrımı ve Yunus Usta iletişimi korunarak ürün keşfi, üç boyutlu değerlendirme ve proje görüşmesi tek deneyimde birleştirilir. Bu sürüm yalnızca bir numara değişikliği değildir.

## Yeni teslim kapsamı

Devir 01 için ayrı editoryal ürün sayfası ve üç değiştirilebilir başlangıç konfigürasyonu. Oda, depolama, çalışma yüksekliği ve yan yüzey hikâyesi. Ana sayfa, arama, menü ve altbilgiden erişim.

Üç seçeneğe kadar görselli karşılaştırma. Aynı konfigürasyonun tekrarlı kaydı önlenir. Seçenekler tek dokunuşla aynı stüdyoya döner. JSON dışa aktarımı ve doğrulanan içe aktarım vardır. Dosyada yalnız açık model seçenekleri bulunur. Adres, kişisel not, fotoğraf ve oda ölçüsü yoktur.

Sayısal ölçü alanları yazarken ara değerleri engellemez. Tamamlanan giriş doğrulanır, hatalı giriş önceki doğru değeri değiştirmez. Kamera, masa ve formun mevcut tutarlılığı korunur.

Oda eni ve derinliğiyle masanın mevcut konumundaki dış sınırını karşılaştıran yardımcı ve üstten dikdörtgen şema. Yuvarlama küçük taşmayı sığıyor sonucuna çeviremez. Sandalye, kapı, duvar, raf ve güvenli mekanik hareket değerlendirmesi değildir.

Dört gerçek üç boyutlu parçaya bağlı detay noktası. Çift kitaplık ve mevcut 360 derece kontrol korunur. Grafik profili piksel oranı ve gölge haritasını değiştirir. Masa ölçüsünü değiştirmez.

Seçili konfigürasyondan görselli yazdırma sayfası. PDF kaydı tarayıcının yazdırma menüsüyle yapılır. Otomatik bir talep kaydı veya gönderim değildir.

Gerçek masa geometrisinden GLB ve USDZ dışa aktarımı. Three.js r185 resmi GLTFExporter ve USDZExporter kaynakları, lisansları ve köken kaydıyla yereldir. Dışa aktarım modülleri yalnız istendiğinde yüklenir. Dosyada dekoratif oda, kitaplık ve sandalye yoktur. Ölçü birimi metredir. Bunlar teknik CAD, kesim listesi veya onaylı üretim dosyası değildir.

USDZ bağlantısı AR uyumlu Apple görüntüleyiciye sunulur. Diğer cihazlarda dosya kullanılabilir. Fiziksel telefon üzerinde AR yerleştirme, ölçek ve zemin algılaması bu teslimde doğrulanmış olarak sunulmaz. Ayar değişince eski USDZ bağlantısı geçersizleştirilir.

## Korunan sınırlar

Yunus Usta. +90 530 879 71 69. Kişisel ana sayfa değiştirilmez. Sadece elif-tasarim yayın alanı güncellenir. Noindex önizleme davranışı korunur. Müşteri verisi otomatik bir sunucuya veya Git deposuna yazılmaz.

Fiyat, garanti, motor kapasitesi, atölyenin kesin adresi, müşteri yorumu ve malzeme markası uydurulmaz. Ödeme, CRM, CMS ve kalıcı müşteri paneli bu sürümle devreye alınmamıştır. Gerçek numune ve atölye fotoğrafları işletme girdisidir.

## Derleme ve doğrulama

Etkin paket 0.20.0. npm run build komutu tools/build-v20.cjs dosyasını çalıştırır. Tarihsel kaynak klasörü source-v12 olabilir, bu klasör adını sürüm kimliği sanmayın. Aktif manifest release-v20.json, kimlik v20-master-atelier.

npm test, npm run typecheck:core, npm run verify:dist ve tests/v20/acceptance.py çalıştırılmalıdır. Önceki karar akışları ile 360 derece kontrolleri tekrar doğrulanır. Ekran matrisi test sayısıyla aynı ölçüm değildir. Canlı dosya bütünlüğü, sürüm manifesti ve doğru URL'ler yayımdan sonra ayrıca kontrol edilir.

Yerel ortamın yönetimli tarayıcısı HTTP gezinmesini ve yazılımsal WebGL bağlamını engelleyebilir. Bu bir ürün başarısı olarak gizlenmez. GitHub Actions üzerinde gerçek HTTP önizlemesi ve Chromium ile doğrulama yapılır. Gerçek telefon, Safari ve Firefox kapsamı ayrıca belirtilir.

## Geri alma

Önceki canlı sürüm V12 C+ idi. Yeni yayın git commit'i yalnız elif-tasarim ağacını günceller. Sorunda ana sayfa ve başka projelere dokunmadan önceki elif-tasarim ağacına dönülebilir. Force push kullanılmaz.

## Son doğrulamada giderilen hata

USDZ dışa aktarıcısı gerçek dosyayı üretirken, başarı bağlantısının JSX parçasında eksik Fragment içe aktarımı arayüzü güncelleyemiyordu. Dışa aktarım izinde dosyanın tamamlandığı, ardından yerel dar kapsamlı arayüz testinde Fragment is not defined hatası ayrı ayrı yeniden üretildi. İçe aktarım düzeltildi. Gerçek dosya üretimi ve görünür bağlantı birlikte kabul koşuludur.

Grafik profilinin başlangıç piksel oranı Dengeli seçeneğiyle eşitlendi. Sayısal ölçüler ve ürün geometrisi bundan etkilenmez.

Mobil aynı ekranda sahne ve sürgü kontrolünde Chromium kaydırması 0,40625 CSS piksel kesirli kenar üretti. Tam görünürlük koşulu korunarak yatay kontrollerde olduğu gibi bir CSS piksel yuvarlama toleransı kullanılır. Bu değişiklik gerçek bir kontrolün ekran dışında kalmasını geçerli saymaz.

## V20 tamamlama kontrolü

Son yayın kapısını durduran hata, 390 piksel genişlikte metinler iki kat büyütüldüğünde karar rehberinin uzun Türkçe başlığının kendi sütunundan taşmasıydı. Önceki tam test çalışmasında 308 normal görünüm geçerken stüdyo metin büyütme kontrolünde belge genişliği 392 piksel oldu. Ayrı DOM incelemesi, 318 piksel metin kutusunda 353 piksel genişliğe ulaşan uzun başlık sözcüğünü saptadı.

Düzeltme, yalnız rehber başlıklarında gerektiğinde sözcük kırılmasına izin verir. Yazı küçültülmedi. Metin gizlenmedi. Sayfa taşması overflow hidden ile maskelenmedi. Mevcut bir CSS piksel toleransı artırılmadı. Yönetimli yerel tarayıcıdaki statik yeniden üretimde belge genişliği 392 pikselden 390 piksele döndü. Gerçek HTTP, WebGL ve canlı doğrulama sonuçları ayrıca yayın raporunda verilir.

Bu teslimde önceki tasarım sürecinin bütün işlevleri yeniden tasarlanmadı. V20 ürün sayfası, görselli karşılaştırma, doğrulanan konfigürasyon dosyası, yerleşim şeması, detay noktaları, grafik profili ve gerçek model dışa aktarımı tamamlanır. Ticari sunucu, kalıcı müşteri paneli, gerçek işletme koşulları, gerçek numuneler ve fiziksel cihaz AR doğrulaması yapılmış gibi işaretlenmez.
