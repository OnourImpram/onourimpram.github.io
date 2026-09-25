# Elif Tasarım V6. Yayın ve teslim raporu

24 Eylül 2026.

## Yayın

Adres. https://onourimpram.github.io/elif-tasarim/

Yayın commit’i. `69417f27e6a7d04a237adb2e095ef8f72d21a92a`.

Test edilen çalışma dalı çıktısı. `705b2b99f594ff429053cc0855a1fd73e3d75444`.

Derleme ve HTTP kabul kaydı. https://github.com/OnourImpram/onourimpram.github.io/actions/runs/35997102140

Public URL kabul kaydı. https://github.com/OnourImpram/onourimpram.github.io/actions/runs/35998520601

Yalnız Elif Tasarım alt alanı değiştirildi. Kök kişisel ana sayfa blob’u `501229ef0c1d25dbc4554e27ca089b03e590c7e0` olarak korundu.

## Uygulanan kapsam

Onaylı başlık ve amblem. Sekiz menü bağlantısı. Hero hemen altında altı gerçek çalışma kartı. Atölye arşivinden 13 çalışma kaydı ve ayrı iki montaj kaydı. Sekiz yapay zekâ konsepti. Sekiz üretim kategorisi ve ilham keşif yolu. Kullanıcının paylaştığı 12 Pinterest referansı. Üç adımlı Kendi modelinizi getirin akışı. V5 tasarım masası, özel ölçü formu ve örnek katalog akışları.

Fotoğrafların atölye arşivine ait olduğu bilgisi kullanıcıdan gelir. Bu teslim bağımsız hak sahipliği veya tamamlanmış teslim denetimi değildir. Görsellerden bilinmeyen malzeme, fiyat, müşteri veya konum türetilmedi.

## Dosya bütünlüğü

Public URL’den HTML, JavaScript, CSS ve 96 görsel dosyası tek tek indirilip test edilmiş dosyalarla eşleştirildi. 99 dosyanın tamamı SHA256 ve boyut seviyesinde eşleşti. 96 görsel dosyası, responsive varyantları da içerir. 96 farklı fotoğraf veya proje anlamına gelmez.

Hero ana dosyası 1672 × 941 pikseldir. 4K olarak sunulmaz. Doğal kaynak boyutları ve kırpma kayıtları image-manifest.json içindedir.

## Public kabul testleri

19 adlandırılmış kontrol geçti. 0 başarısız. 330 rota ve viewport birleşimi kontrol edildi. 55 rota ve 360, 390, 768, 1024, 1440, 1920 piksel genişlikleri. Bu sayı 330 bağımsız işlev testi demek değildir.

Tarayıcı motoru. Chromium 140.0.7339.16. Playwright 1.55.0. Derleme aracı TypeScript 5.8.3.

* Geçti. V6 identity, approved slogan, eight navigation links and six real-work cards.
* Geçti. Responsive high-resolution hero and user-controlled scene changes.
* Geçti. Real projects, Turkish search, filters, URL reset and separate in-progress photos.
* Geçti. Project gallery changes photo, enlarges, cycles and restores focus.
* Geçti. Nine discovery categories and no fabricated completed table project.
* Geçti. Eight concepts, twelve supplied references and selected Pin-to-request prefill.
* Geçti. Bring-your-model validation rejects unsafe links and accepts a written idea.
* Geçti. Local project export, explicit unsent state, editable summary and recipient-selected WhatsApp.
* Geçti. Upload validates bytes, rejects over-five batch, previews and removes without network.
* Geçti. Homepage-to-desk-to-quote dimensions remain precise with true cm/mm conversion.
* Geçti. Legacy demo catalog comparison cap and Turkish search remain usable.
* Geçti. Mobile first action, menu focus trap and restoration, sticky navigation and return-to-top.
* Geçti. Reduced motion and skip-link respect the current route.
* Geçti. Demo cart persists on the actual HTTP origin without creating an order.
* Geçti. Browser Back restores portfolio query and results on HTTP.
* Geçti. 55 routes at six widths, one heading, no page overflow or broken loaded image.
* Geçti. Rendered release screenshots saved.
* Geçti. No application runtime errors.
* Geçti. No external requests before explicit external-widget consent.

Test edilen akışlarda uygulama hatası ve opt-in öncesi harici istek görülmedi. Matris tek H1, yatay taşma ve yüklenmiş kırık görselleri kontrol eder. Her sayfanın her pikseli için erişilebilirlik veya görüntü kalitesi sertifikası değildir.

## Pinterest denemesi

Widget ancak kullanıcı düğmeye bastıktan sonra istek yaptı. Kapanınca iframe kaldırıldı. Asıl kaynak bağlantısı her zaman kaldı. Public screenshot dosyası `verification/live/pinterest-opt-in.png` görüntüleyicideki mutfak fotoğrafının gerçekten göründüğünü gösterir.

İlk otomatik görüntü algılayıcı yalnız `document.images` öğelerine baktığı için `widget_image_rendered` alanı false kaydedildi. Bu alan genel bir yüklenme sonucu olarak kullanılmadı. Aynı denemenin ekran görüntüsünde Pinterest fotoğrafı görünür. Rapor ham JSON’u değiştirmez ve tüm 12 kaydın bütün ziyaretçilerde yükleneceğini garanti etmez. Bu bir tek kayıt üzerinde opt-in ve görsel gözlemidir.

## Temiz kaynak paketi

22 TypeScript veya TSX kaynak modülü bütünlendi. `npm test` altında 42 mevcut alan mantığı testi ve bir yeni temiz derleme testi, toplam 43 test geçti. Yeni test ilk koşumda V5 sürüm etiketini yakaladı, derleme betiği V6 için güncellenince geçti.

Temiz kaynak derlemesi yerelde başarıyla üretildi. Yerel tarayıcı akışının ilk 10 kontrolü geçti, devam eden süreç 120 saniyelik ortam sınırında kesildi. Bu kısmi koşum tam yerel kabul olarak sayılmaz. Ana kabul, yayındaki gerçek V6 dosyalarına karşı tamamlanmış 19 kontrollü public koşumdur.

`published/` yayındaki birebir kopyadır. `npm run build` temiz kaynak önizlemesi üretir, tarihsel modül ekleri nedeniyle public kopyayla byte düzeyinde aynı değildir. Bu ayrım README içinde de belirtilmiştir. `npm run verify:published` public 99 dosyanın bütünlüğünü ağsız doğrular.

## Açık kalan ticari işler

Doğrulanmış Yusuf Usta iş telefonu ve taşınılacak atölye adresi henüz yoktur. Yeni model formu projeyi yerel olarak özetler. WhatsApp bağlantısı alıcı seçimine bırakır, atölyeye otomatik gönderim değildir. Görsel dosyaları metin bağlantısına eklenmez, ayrıca paylaşılmalıdır.

Canlı ödeme, hesap doğrulama, kalıcı sipariş sunucusu, kargo ve fatura entegrasyonları yoktur. Önceki katalog fiyatları örnektir. React uyumlu bileşenler Preact önizleme runtime’ıyla çalışır. Bu teslim doğrulanmış Next.js üretim derlemesi veya tam ticaret sistemi olarak sunulmaz.

Fotoğraf izinleri, tam ürün özellikleri, gerçek hizmet koşulları ve adres işletme tarafından netleştirilmelidir. Ticari yayın için güvenlik, hukuk, farklı tarayıcı ve gerçek cihaz kontrolleri ayrı yürütülmelidir. noindex önizleme ayarı bilerek korunmuştur.

## Teslim

Yayındaki site. Çevrimdışı HTML. Tam kaynak ve seçilmiş yayın görselleri. 99 dosyanın public hash manifesti. V6 ekran görüntüleri. Uygulanan içerik ve yerleşim planı. Testler, yeniden derleme ve doğrulama araçları.
