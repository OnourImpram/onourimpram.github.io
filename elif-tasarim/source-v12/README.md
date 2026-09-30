# Elif Tasarım V23

Rapor odaklı iletişimi tamamlama sürümü. Kullanıcının sağladığı iletisim.eliftasarimatolyesi@gmail.com adresi, pano izinli kopyalama ve yedek metin alanı, taşınabilir ilham dosyası ve JavaScript gerektirmeyen kolay iletişim sayfası eklenmiştir. Onaylı marka, gerçek portföy, Devir 01, çift kitaplık, gerçek 360 derece inceleme, üç tasarımı karşılaştırma ve GLB/USDZ çıktıları korunur.

V23, V22'nin tamamlanmış iletişim ve kurtarma akışlarını korur. Ayrıca Devir 01 için gerçek ürün renderları, görünür hata durumları ve boş sayfa/görsel taraması ekler. V21, açık izinli cihaz taslağı kurtarması, özel JSON taslağı indirme ve geri açma, alternatif iletişim yolları, genişletilmiş SSS, hizmet ve teklif rehberi, doğrulanmış bilgilerle yapılandırılmış veri ve ölçülmüş okunabilirlik düzeltmeleri ekler.

## Çalıştırma

Node.js 22 veya daha yeni. Kaynak dizininde aşağıdaki komutlar çalıştırılır.

```sh
npm ci --ignore-scripts
npm run build
npm test
npm run typecheck:core
npm run verify:dist
npm run launch:check
npm run serve
```

Yerel HTTP sunucusu 8000 portunda /elif-tasarim/ taban yolunu açar. Derleme preview/Elif_Tasarim.html taşınabilir sürümünü de oluşturur. Çevrimdışı dosyada gezinme ve 3D yerel çalışır. Telefon, SMS, e-posta, WhatsApp ve Pinterest ilgili dış uygulama veya servise bağlıdır.

## Etkin sürüm

Paket 0.23.0. Kimlik v23-premium-finish. Yayın manifesti release-v23.json. Etkin derleyici tools/build-v23.cjs. Tarihsel source-v12 klasör adı, uygulamanın V12 olduğu anlamına gelmez. Önceki derleyiciler ve test dizinleri geçmiş ve regresyon amacıyla korunur.

## Kontroller

```sh
BASE_URL=http://127.0.0.1:8000/elif-tasarim/ python tests/v22/acceptance.py
BASE_URL=http://127.0.0.1:8000/elif-tasarim/ python tests/v21/acceptance.py
BASE_URL=http://127.0.0.1:8000/elif-tasarim/ python tests/v20/acceptance.py
BASE_URL=http://127.0.0.1:8000/elif-tasarim/ python tests/v11/acceptance.py
BASE_URL=http://127.0.0.1:8000/elif-tasarim/ python tests/v12/acceptance.py
BASE_URL=http://127.0.0.1:8000/elif-tasarim/ python tests/v11/matrix.py
```

Tarayıcı kontrolleri Playwright ve Chromium gerektirir. Görünür tarayıcı kullanan regresyonlar başsız Linux ortamında xvfb-run ile çalıştırılabilir. typecheck:core yalnız komutta listelenen çekirdek modüllerin strict denetimidir, bütün JSX uygulamasının semantik tip denetimi değildir.

## Taslak ve veri sınırları

Özel proje varsayılan olarak sekme belleğinde kalır. Açık izin verilirse metin, ölçü ve model bilgisi kullanıcının cihazında saklanır. Son kayıttan yedi gün sonra site tekrar okuduğunda süresi dolan kayıt silinir. Bu kayıt şifreli değildir, ortak cihazda önerilmez. Fotoğraflar ve ilham seçimleri bu kurtarma kapsamına dahil değildir. Geri yükleme açık onay ister.

Özel proje JSON dosyası kişisel not içerebilir. Herkese açık masa seçenekleri karşılaştırma JSON dosyasından farklıdır. Cihaz kaydı, dosya indirme veya mesaj uygulamasını açma, talebin atölyeye ulaştığı anlamına gelmez.

## İşletme bilgileri ve ticari yayın

Doğrulanmış işletme bilgilerinin tek kaynağı src/lib/site-profile.ts dosyasıdır. E-posta kullanıcı tarafından sağlanmıştır. Saatler, adres ve sosyal profil URL'leri doğrulanmadan doldurulmaz. Telefon ve SMS aynı doğrulanmış numarayı kullanır. E-posta bağlantıları sağlanan alıcıyı açar. Bağlantıya basmak gönderim veya teslim değildir.

Önizlemenin noindex davranışı korunur. Ticari indeksleme için doğrulanmış alan adı, iletişim bilgileri ve içerik onayı gerekir. npm run launch:check -- --production eksik hazırlıkla başarısız olur. Noindex erişim kontrolü değildir. Bu herkese açık depoya müşteri kaydı veya özel dosya yüklenmez.

Yalnız elif-tasarim alt ağacı güncellenir. Kişisel kök ana sayfa ve diğer projeler korunur. Ödeme, CRM, CMS, otomatik talep sunucusu ve reklam analitiği bu sürüme eklenmemiştir. Model çıktıları teknik üretim çizimi, mekanik güvenlik onayı veya gerçek cihaz AR doğrulaması değildir.

## Rapor ve devir belgeleri

- docs/v21/RAPOR_UYGULAMA_MATRISI.md. İki kaynak raporun önerileri, kodda doğrulanan durum ve V21 karşılığı.
- docs/v21/ISLETME_BILGILERI_VE_DEVIR.md. Gerekli işletme girdileri ve yayın adımları.
- docs/v21/IMPLEMENTATION.md. Kapsam ve uygulama kararları.
- docs/v21/READABILITY_AUDIT.md. Ölçülmüş okunabilirlik ve laboratuvar sınırları.
- docs/v21/FINAL_REVIEW.md. Kaynak kurtarma ve inceleme kaydı.

## V22 kayıtları

- docs/v22/IMPLEMENTATION.md. Kaynak rapor, uygulama ve sınırlar.
- docs/v22/FINAL_UX_REVIEW.md. Son müşteri akışı incelemesi ve yeniden üretilen hatalar.
