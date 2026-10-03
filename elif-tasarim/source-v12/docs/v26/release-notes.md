# Elif Tasarım V26 denetim ve uygulama raporu

3 Ekim 2026. Mevcut kaynakta ve mevcut GitHub Pages yayınında çalışıldı. Yeni site veya ayrı bir prototip üretilmedi. Bu rapordaki iyileştirmeler deneyim ve teknik doğrulama bulgularıdır. Satış, dönüşüm oranı veya gerçek kullanıcı memnuniyeti artışı ölçülmedi.

## Karar

Elif'in güçlü tarafı, gerçek atölye işlerini gösteren ve insanı doğrudan Yunus Usta ile konuşmaya hazırlayan aile atölyesi kimliği. Yeni yön, bunu daha büyük bir katalogla değil, daha kolay görsel inceleme ve daha anlaşılır görüşme hazırlığıyla güçlendiriyor.

## Bulgular ve uygulanan değişiklikler

| Konu | Bulgu ve sonuç |
| --- | --- |
| 1. Mevcut sistem | Kaynak `OnourImpram/onourimpram.github.io`, üretim dalı `main`, yayın yolu `elif-tasarim/`. TypeScript ve TSX, yerel Preact uyumluluk çalışma zamanı, yerel Three.js modülleri ve 51 statik rota var. GitHub Pages dal yayını ile mevcut canlı doğrulama iş akışı korunuyor. |
| 2. Ciddi zayıflıklar | Sıfırlanan projeye gecikmiş fotoğrafın dönmesi, silinemeyen cihaz kaydına başarı denmesi, yeniden denenemeyen bir 3D başlangıç hatası, çıplak alt dizin rotası ve bilinmeyen rehberde içerik ile başlık uyuşmazlığı doğrulandı. İkinci incelemede eski ZIP'in sıfırlamadan sonra indirilmesi de yeniden üretildi. Bunlar düzeltildi. |
| 3. Korunan değerler | Amblem, ana slogan, sıcak ahşap tonları, aile hikâyesi, 20 işte 26 özgün fotoğraf, konsept ayrımı, sekiz bazanın 16 görünümü, ana sayfadaki sehpa/kahve/antre dengesi, dokuz alanlı ilham görünümü ve tek 3D Stüdyo korundu. |
| 4. Pazar araştırması | 16 resmî marka kaynağı incelendi. Yedi İstanbul atölyesi, üç Türkiye tasarım referansı ve altı uluslararası örnek. Araştırma eki kanıt ile çıkarımı ayırıyor. Rakiplerin üretim kalitesi, satışları, gerçek dönüşümü veya yapılandırıcı doğruluğu test edilmiş sayılmıyor. |
| 5. Marka stratejisi | Gerçek işten başlayan, fikri görüşülebilir bir taslağa dönüştüren, ustasıyla doğrudan konuşulan aile atölyesi. Ödül, teslim sözü veya yeni müşteri öyküsü eklenmedi. |
| 6. UX stratejisi | Önce görseli incele, sonra karar sorularını gör, ardından istersen fikrini kaydet veya görüşmeye taşı. Form ve 3D zorunlu giriş kapısı yapılmadı. |
| 7. Bilgi mimarisi | Kategori sayfalarında gerçek işler ve konseptler karar rehberinin önüne alındı. Bölüm bağlantıları eklendi. Adresler ve üst gezinme korunuyor. Yeni, paralel bir stüdyo oluşturulmadı. |
| 8. Görsel tasarım | İlham, dosya ve form başlıkları sıkılaştırıldı. Mobil kategori kontrolleri yerel yatay kaydırma kullanıyor. Konseptler için büyük görsel ve kısa açıklamayı yan yana getiren, telefonda tek sütuna geçen önizleme eklendi. |
| 9. Metin | Form yardımları kısaltıldı. Seçilen örneğin açıklamasındaki tekrar düzeltildi. 3D açılamadığında görülen resmin sabit olduğu ve tercihlerle değişmediği açıkça yazıldı. Uygulama kütüphanesi adı yerine yararlı bir özet etiketi kullanıldı. |
| 10. Portfolyo | Mevcut gerçek iş ve fotoğraf aşaması etiketleri korundu. Kategori içinde örneğe ulaşmak, uzun karar metinlerini geçmeyi gerektirmiyor. Müşteri röportajı veya eksik proje malzemesi uydurulmadı. |
| 11. 3D Stüdyo | Boş taban yolu desteği düzeltildi. Betik yüklenip çalışma zamanı gelmediğinde yeniden deneme artık yeni girişim başlatıyor. Yedek görselin sınırı açık. Mevcut ölçü, oda, karşılaştırma, dışa aktarma ve AR seçenekleri korunuyor. Yeni mekanik doğruluk veya üretim onayı iddia edilmiyor. |
| 12. İlham dosyası | Seçilen mobilyalar ve görüşmeye geçiş, içe/dışa aktarma araçlarından önce geliyor. Saklama ve dosya seçenekleri açılır bölümde. Sekme kapatılınca kaybolma bilgisi seçimin yanında görünür. Kalıcı kayıt hâlâ açık tercihe bağlı. |
| 13. Görüşmeye geçiş | Formun ilk girdisinden önce duran kurtarma/yardım araçları aşağı alındı. Konsept önizlemesinden kaynak kimliği ve görseli korunarak forma geçiliyor. Mevcut kısa özet, WhatsApp, e-posta, telefon ve sade iletişim yolları korunuyor. Bu, ölçülmüş dönüşüm artışı değildir. |
| 14. Erişilebilirlik | Yeni önizleme mevcut doğal dialog davranışını kullanıyor. Escape kapatma ve odağın açan karta dönmesi tarayıcıda doğrulandı. 320 pikselde önizleme taşmadı, kapat/kaydet kontrolleri 44 piksel yüksekliğinde. Ekran okuyucu ve tam WCAG sertifikasyonu yapılmadı. |
| 15. Performans | Ana JS 532.801 bayttan 374.418 bayta indi, yüzde 29,7 azalma. CSS 285.673 bayttan 276.072 bayta indi, yüzde 3,4 azalma. Bunlar sıkıştırılmamış dosya boyutlarıdır. Lighthouse veya gerçek kullanıcı Core Web Vitals puanı değildir. Yerel, sürümü sabitlenmiş esbuild kullanılıyor. |
| 16. SEO | Bilinmeyen rehber rotasında 404 içeriği ile metadata tutarlı hale getirildi. Mevcut kanonik adresler, Türkçe sayfa kimliği ve yapılandırılmış veri korunuyor. Önizleme noindex olarak kaldı. Arama görünürlüğü artışı iddia edilmiyor. |
| 17. Yerel SEO | Doğrulanmış açık adres/saat bulunmadığı için yeni LocalBusiness adresi, ilçe sayfaları veya çalışma saatleri eklenmedi. Mevcut Organization şeması ve gerçek iletişim bilgileri korunuyor. |
| 18. Teknik bakım | Tek builder korundu. Tekrarlanabilir sıkıştırma, sabitlenmiş bağımlılıklar, yerel statik önizleme ve genişlik denetimi eklendi. Kaynak klasörünün tarihsel adı değişmedi. Değişiklikler bileşenlerle sınırlı tutuldu, tüm CSS geçmişi körlemesine silinmedi. |
| 19. Yeni görseller | Yeni yapay görsel üretilmedi. Onaylı mevcut görseller yeni inceleme arayüzünde kullanıldı. Rapordaki ekran görüntüleri test kanıtıdır, yeni portfolyo işi değildir. |
| 20. Önemli dosyalar | `App.tsx`, `BringModel.tsx`, `Portfolio.tsx`, `V7Pages.tsx`, `DeskExperience.tsx`, `source-context.ts`, `discovery.css`, `build-v25.cjs`, paket kilidi, `vite-preview.mjs`, `tests/v26` ve güncellenen sürüm beklentileri. Kök site ve MARSAM değiştirilmedi. |
| 21. Testler | Son yerel çalıştırmada 228 Node regresyonu geçti. Çekirdek sıkı TypeScript kontrolü, 252 dosyanın SHA256/boyut bütünlüğü ve iki temiz derlemenin aynılığı geçti. 16 sayfa dokuz genişlikte 144 DOM/yerleşim kontrolünden geçti. Kaynak aktarımı, kayıt, önizleme, Escape/odak ve pano reddi yolu CUA tarayıcısında ayrıca sınandı. |
| 22. Sınırlar | Bu tarayıcıda WebGL devre dışı. Canlı 3D GPU çizimi ve fiziksel AR burada doğrulanmadı. Doğrulanan kısım yedek görünüm, durum davranışları ve mevcut model testleri. Safari/Firefox, fiziksel telefon, yavaş ağ, gerçek ekran okuyucu ve saha performansı ayrı kontrol ister. E-posta veya WhatsApp gönderilmedi. |
| 23. İşletmeden beklenenler | Yeni açık adres, ziyaret politikası, çalışma saatleri, gerçek hizmet bölgesi, keşif/montaj koşulları, garanti ve bakım kapsamı, teklif yetkileri ve ticari gizlilik metni. Yalnız doğrulanmış bilgilerle eklenmeli. |
| 24. Sonraki içerik toplama | Önce üç gerçek projenin genel görünümü, kullanım detayı ve uygulama aşamaları. Ardından Yunus Usta'nın izinli portresi, gerçek atölye, numune yüzeyleri ve birleşim/donanım ayrıntıları. Her kare için hangi iş, hangi aşama, fotoğraf izni ve bilinen malzeme kaydı tutulmalı. |
| 25. Daha sonra değerli işler | Beş görev odaklı gerçek kullanıcı görüşmesi, gerçek cihazda 3D/AR, işletme doğrulaması sonrası ticari indeksleme ve Search Console kurulumu. Talep yönetimi ancak işletmenin süreci ve veri sorumluluğu netleştiğinde kurulmalı. Fiyat motoru için onaylı fiyat/kapsam verisi gerekir. |

## Doğrulamanın kapsamı

Genişlikler 320, 375, 390, 430, 768, 1024, 1280, 1440 ve 1920 CSS piksel. 16 sayfa ana sayfa, arşiv, ilham, kayıtlı fikirler, form, stüdyo, mutfak, baza, iletişim, kolay iletişim, hikâye, atölye, malzemeler, hizmet/teklif, rehber ve gizlilik. Aynı tarayıcı içinde çerçeve genişliği kullanıldı. Her sayfanın doğru rotada çalıştığı, tek H1'i, belge taşması ve ilk görünümdeki yüklenmiş görselleri kontrol edildi. Bu, her durumun her cihazda görsel sertifikasyonu değildir.

Tam proje özeti ve e-posta bağlantısının doğru alıcıya hazırlanması incelendi. Pano erişimi bu HTTP önizlemede reddedildi, elle kopyalama metni ve odak doğru gösterildi. Başarılı pano işlemi, uzun mesaj sınırları ve diğer veri dönüşümleri mevcut saf testler tarafından kapsanıyor. Eski Playwright kabul dosyaları doğrudan yerel araçla çalıştırılmadı. Mevcut GitHub canlı iş akışı bunları ayrıca çalıştırır. Oradaki sonuç ayrı yayın doğrulaması olarak raporlanır.

İlk incelemenin kaynak bulguları `technical-audit.md`, ikinci inceleme ve ZIP düzeltmesinin kapanışı `second-red-team.md`, ham genişlik sonuçları `responsive-checks.json`, kaynaklı 16 marka karşılaştırması `market-research.md` içinde.

## Öncelikli gerçek çekim listesi

| Öncelik | Çekilecek içerik | Kayda eklenecek bilgi |
| --- | --- | --- |
| 1 | Üç tamamlanmış işin düz, gün ışıklı genel görünümü | İş adı, gerçek kapsam, izin, çekim aşaması |
| 2 | Kapak/çekmece açıkken kullanım ve birleşim ayrıntısı | Donanım ve malzeme yalnız kaydı varsa |
| 3 | Aynı işin kurulum ile bitmiş durumunu ayıran kareler | Sıra ve aşama, doğrulanabiliyorsa tarih |
| 4 | Yunus Usta'nın gerçek çalışma ve portre fotoğrafları | Yayın izni, yer ve bağlam |
| 5 | Yan yana gerçek yüzey numuneleri | Üretici/ürün bilgisi, ışık koşulu, seçenek kapsamı |

## Yayın düzeni ve geri alma

Üretim HTML'i elle değiştirilmez. `npm ci`, `npm run build`, `npm test`, `npm run typecheck:core` ve `npm run verify:dist` aynı kaynakta çalışır. `dist` içeriği yalnız `elif-tasarim/` altına kopyalanır. Tarihsel `release-v25.json` etkin manifest yolu, `release-v23.json` uyumluluk kopyasıdır. İkisinin sürüm değeri `v26.0-considered-discovery` olur. Son doğrulanmış taban `6b47990c0c343bdaa365b5e7d3737b173e463ea9`. Geri alma gerekirse V26 değişikliklerini geri alan yeni commit kullanılır, geçmiş veya diğer siteler ezilmez.
