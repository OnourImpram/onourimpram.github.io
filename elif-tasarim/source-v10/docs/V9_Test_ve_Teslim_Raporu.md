# Elif Tasarım V9. Uygulama, test ve yayın durumu

## Sonuç

V9 kaynakları, yayın dosyaları ve gerçek Three.js içeren tek HTML önizlemesi hazırlandı. Yeni sürüm bu oturumda GitHub'a gönderilmedi. Kullanılabilir GitHub araçları yalnız okuma işlevleri sunuyordu. Son kontrol edilen main commit `2b9ee083f56cd59eca049c627be7e79f40680c91`, V8 tabanıdır. Canlı site veya kişisel ana sayfa değiştirilmedi.

## Uygulanan 3D çalışma

Masanın iki yanında bağımsız dört raflı iki kitaplık, kapalı alt depolama, kitaplar, seramikler ve geometrik bitkiler oluşturuldu. Raf ışıkları ve çalışma ortamı gerçek Three.js nesneleridir. Arka plana maket resmi yapıştırılmadı.

Çift raf, sol raf, sağ raf ve rafsız seçenekler gerçek nesne görünürlüğünü değiştirir. Mekân içinde ve yalnız masa görünümü ayrıdır. Raf ışığı, gün ışığı ve akşam seçenekleri bulunur. Soldan ve sağdan kamera girişleri eklenmiştir. Üst görünümde mimari arka plan saklanır.

Masanın yükseklik, en, derinlik ve yan tabla dönüşü korunur. İnce çekmeceler ana tablayla birlikte yükselir, alt dolap ve yan tabla yüksekliği ayrı kalır. Dolap kapağı ve çekmeceler gerçek geometri üzerinde hareket eder. İmalat, çarpışma, motor veya yük testi yapılmış sayılmaz.

Sahneye koltuk, masa lambası, çalışma yüzeyi ayrıntıları ve dokulu zemin eklendi. Bunlar masa fiyatına veya ölçülerine otomatik dahil değildir. Çalışma ortamının bir parçasıdır. Yeni malzeme haritaları önceki konsept çiziminin ahşap ayrıntısından türetildi, gerçek atölye fotoğrafları değiştirilmedi.

Statik oda geometrileri malzeme bazında birleştirilir. Sol ve sağ kitaplıklar tek görünürlük grubuna kaynaştırılmaz. Bu bir render düzenlemesidir. Gerçek telefon FPS artışı veya saha performans puanı ölçülmedi.

## Site genelindeki değişiklikler

Slogan, onaylı amblem, gerçek çalışma arşivi ve Yusuf Usta iletişimi korunmuştur. Sekiz kategorilik görsel keşif şeridi, masaüstünde görünür 3D stüdyo kısayolu, düzenlenmiş proje kartları ve malzeme ile işçiliğe ayrılmış editoryal bölüm eklenmiştir.

Mobil kontrol alanları, kaynak açıklamaları ve altbilgi yazı düzeni iyileştirilmiştir. Yeniden boyutlanan konsept etiketi ve kamera düğmeleri taşmak yerine sarılır. Gerçek iş, montaj ve konsept sınıfları korunur. Onaysız şehir, müşteri adı, yorum, fiyat, garanti veya sertifika eklenmemiştir.

## Paylaşım ve iletişim

Raf, mekân ve ışık tercihi paylaşılabilir model URL'sinde saklanır. Kişisel not ve iletişim bilgisi bu bağlantıya eklenmez. Masa ölçüleri ve konsept özeti ortak proje taslağına aktarılır. WhatsApp alıcısı kullanıcı tarafından sağlanan `905308797169` numarasıdır. Düğmeye basılması, mesajın teslim edildiği anlamına gelmez.

## Derleme ve dosyalar

Sürüm `v9-dual-shelf-atelier`, paket sürümü `0.9.0`. Tek etkin derleme `tools/build-v9.cjs`. Three.js `0.185.1`, TypeScript `5.8.3`, mevcut yerel Preact runtime korunur. Bu, Next.js üretim projesine geçildiği anlamına gelmez.

43 gerçek HTML sayfası önceden oluşturulur. Normal dağıtımda gerçek yollar, taşınabilir önizlemede hash yolları vardır. Noindex korunur. Yerel Three.js modülleri normal sitede aynı kaynaktan yüklenir. Tek dosyalı önizleme modülleri yerel Blob ESM olarak ihtiyaç halinde başlatır.

JavaScript 299375 bayt, CSS 212053 bayttır. Boyutlar sıkıştırılmamış dosya büyüklüğüdür, yüklenme süresi değildir. Manifest 173 dosyanın boyut ve SHA256 kaydını içerir. Manifest kendisi ayrıca bulunur. Aynı kaynak iki kez derlenerek byte düzeyinde tutarlılık test edilmiştir.

Yeni stüdyo posterleri aynı gerçek 3D geometriden 1920 × 1280 piksel olarak alınmıştır. Doğal fotoğrafların tamamının 4K'ya yükseltildiği iddia edilmez.

## Gerçek doğrulama sonuçları

| Kontrol | Sonuç | Sınır |
| --- | --- | --- |
| Birim, geometri ve derleme | 83 geçti | Node ve yerel kaynak derlemesi |
| Yayın yardımcı betiği korumaları | 3 geçti | Repo kimliği, güvenli dosya yolu ve paket manifesti. Gerçek push yapılmadı. |
| Three.js ve kullanıcı akışları | 32 geçti | Çevrimdışı Chromium. Gerçek WebGL oluşturuldu. |
| Normal hareket tamamlayıcı kontrolü | Geçti | 80 cm'den 113 cm'ye normal animasyon, bağımsız masa parçaları ve iki kitaplık |
| Sayfa ve ekran matrisi | 258 birleşim geçti | 43 rota ve altı CSS genişliği |
| Kontrollü metin büyütme | 3 ekran geçti | 390 px'de ana sayfa, model formu ve stüdyo. Resmî WCAG denetimi değildir. |
| Yayın dosyalarının yerel bütünlüğü | 173/173 | Canlı sunucu ile değil, yerel manifestle eşleştirme |
| Çekirdek strict TypeScript | Geçti | Proje, yükleme, ZIP, seçim ve stüdyo durum modülleri. Bütün JSX uygulamasını kapsamaz. |

32 kontrolün bir kısmı özellikle azaltılmış hareket tercihiyle yürütüldü. Normal hareket yolu ayrıca son kontrolde çalıştırıldı. WebGL bağlantı kaybı senaryosu kontrollü olay ile sınandı. Gerçek bir cihaz arızası oluşturulmadı.

Tarayıcı 144.0.7559.96. Gerçek Three.js sistem Chromium içinde Xvfb ekranı ve yazılımsal grafik sürücüsüyle çalıştı. Başsız WebGL bu ortamda açılamadı, aynı tarayıcının görüntülü yürütümü kullanıldı. Güvenlik politikaları değiştirilmedi. Yerel HTTP gezintisi engeli aşılmadı. Testler tek dosyalı sayfanın `set_content` yüklemesiyle yürütüldü.

Test edilen çevrimdışı akışlarda yakalanmamış uygulama hatası veya HTTP dış isteği görülmedi. Bu sonuç canlı ağ, üçüncü taraf Pinterest çerezleri, gerçek WhatsApp teslimi, Safari, Firefox, gerçek iPhone/Android, Lighthouse veya Web Vitals saha ölçümü değildir.

## Testte bulunan ve giderilen ek sorunlar

Görünmeyen sahnede veya azaltılmış hareket tercihinde ölçü değişimi, render beklerken geometriyi eski durumda bırakabiliyordu. Durum yerleştirmesi ve görüntü dışa aktarma, seçilmiş son konfigürasyonu kullanacak şekilde düzeltildi.

Büyük yazıda konsept rozeti ve kamera düğmeleri min-content genişliğinden taşıyordu. Sarma ve bağımsız esneklik kuralları düzeltildi. Altbilgi ifadesi de büyük yazıda satır kırabilir. Başarısız ilk stres kayıtları geçmiş test kanıtıdır, son sonuç yerine kullanılmaz.

## Son paket kimliği

Manifest SHA256. `772f52d1cd84cc68d462f20755f17c8d918c89846f29b0423482f1eb6a0438f5`.

Tek HTML SHA256. `f654edb40f0b637cdd1c5887feed92cf5fe1ff91a1f40911abad378b7bfdf65a`.

`evidence/v9/final-smoke.json` doğrudan bu son HTML'den alınmıştır. `browser/results.json` 32 kullanıcı kontrolünü, `matrix.json` rota ve ekran sonuçlarını taşır.

## Yayın devri

`dist/` ve ayrı yayın ZIP'i yalnız `elif-tasarim/` alt dizini içindir. `deploy/publish_v9.py` normal Git yetkilendirmesi olan ortamda açık `--publish` seçeneğiyle kullanılabilir. Kirli çalışma ağacında, yanlış depoda veya değişmiş uzak tabanda durur. Kök kişisel index korunur, force push yapılmaz. Betik bu oturumda yalnız check-only modunda çalıştırılmıştır.

Gerçek yayına alındıktan sonra public manifest ve 3D sayfası yeniden kontrol edilmelidir. Bu teslim canlı V9 olarak duyurulamaz.

## Açık kalan işler

GitHub yayını ve canlı HTTP doğrulaması. Gerçek ticari barındırma ve alan adı. Otomatik talep sunucusu, ödeme, sipariş, fatura ve kargo. Gerçek cihaz performansı. Üretim mekanizması ve fotoğraf izinlerinin işletme teyidi. Bunların tamamlandığına dair iddia yoktur.
