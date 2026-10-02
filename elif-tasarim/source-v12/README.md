# Elif Tasarım V25

Sekiz onaylı baza konsepti, on altı açık ve kapalı görünüm. Ahşap ağırlıklı dört model, döşemeli dört yorum. Gerçek atölye arşivi ayrı tutulur.

Etkin sürüm `0.25.0`. Etkin derleyici `tools/build-v25.cjs`, etkin manifest `release-v25.json`. `release-v23.json` aynı kaydın önceki doğrulama araçları için uyumluluk kopyasıdır.

Baza sayfası `/kategoriler/baza-yatak/`. Ana sayfa, kategori, ilham seçkisi, arama, ilham dosyası ve modele özel proje özetiyle bağlantılıdır. Görsel üretim onayı değildir.

## Kontrol komutları

```sh
npm ci
npm run build
npm run typecheck:core
npm test
npm run verify:dist
python tests/v25/site-audit.py
BASE_URL=http://127.0.0.1:8000/elif-tasarim/ python tests/v25/browser.py
```

HTTP testlerinden önce `npm run serve` çalıştırılır. Python testleri Playwright, Chromium ve beautifulsoup4 gerektirir. İletişim testleri sentetik örneklerle yapılır, gerçek mesaj göndermez.

Sitenin mevcut yayın biçimi `noindex` önizlemesidir. Adres, çalışma saatleri, malzeme numuneleri ve imalat donanımı doğrulanmadan ticari doğrulama iddiasında bulunulmaz. `_headers` dosyası GitHub Pages üzerinde sunucu kuralı oluşturmaz.

## Önceki sürüm notları

# Elif Tasarım V23.3

Tek 3D Stüdyo, beşli açılış görseli ve gerçek iş arşivi üzerine SEO ve karar içeriği güncellemesi.

Kahve köşesi, mutfak ve TV ünitesinin mevcut kategori sayfaları genel görüşme hazırlığıyla zenginleştirildi. İlk açılış fotoğrafı yüksek öncelikli, sonraki düşük önceliklidir. Başka kareye geçiş, görüntü çözümlendikten sonra yapılır. Arama başlıkları ve ilk HTML ile istemci metadata politikası birlikte yönetilir.

## Etkin ürün

Paket 0.23.3. Kimlik v23.3-seo-content. Manifest release-v23.json. Etkin derleyici tools/build-v23.cjs. Tarihsel source-v12 dizin adı sürümü belirtmez. /devir-01/ ayrı içerik sayfası değildir, tek stüdyoya eski bağlantı uyumluluğu içindir.

## Yerel çalışma

Node.js 22 ile kaynak dizininde.

```sh
npm ci --ignore-scripts
npm run build
npm test
npm run typecheck:core
npm run verify:dist
npm run serve
```

HTTP önizlemesi /elif-tasarim/ taban yoluyla 8000 portundadır. Taşınabilir dosya preview/Elif_Tasarim.html içindedir. Mesajlaşma ve e-posta ilgili dış uygulamaya bağlıdır. Sahne gerçek Three.js geometri kullanır. GLB/USDZ üretimi teknik imalat onayı veya fiziksel AR cihaz testi yerine geçmez.

## Gerçek tarayıcı kontrolleri

Playwright ve Chromium kurulumu gerekir. Mevcut bazı testler görünür tarayıcı kullandığı için başsız Linux sunucusunda xvfb-run gerekir.

```sh
BASE_URL=http://127.0.0.1:8000/elif-tasarim/ python tests/seo/browser.py
BASE_URL=http://127.0.0.1:8000/elif-tasarim/ python tests/v23-interaction/browser.py
BASE_URL=http://127.0.0.1:8000/elif-tasarim/ xvfb-run -a python tests/v22/acceptance.py
BASE_URL=http://127.0.0.1:8000/elif-tasarim/ xvfb-run -a python tests/v12/acceptance.py
BASE_URL=http://127.0.0.1:8000/elif-tasarim/ xvfb-run -a python tests/v11/matrix.py
```

Core tip denetimi yalnız komutta listelenen modülleri kapsar. Ekran matrisi WCAG sertifikası veya fiziksel telefon testi değildir. Mesajlaşma testleri dışarıya gerçek müşteri mesajı göndermez.

## İçeriğin kaynağı

src/lib/service-content.ts, üç hizmet sayfası ile isteğe bağlı form hazırlığının ortak kaynağıdır. Başlangıç örnekleri gerçek atölye arşivine bağlanır. Metinler genel görüşme hazırlığıdır, yapılmış bir usta röportajı değildir. Gerçek müşteri hikâyesi, malzeme veya montaj şartnamesi fotoğraftan türetilmez.

Gerçek içerik için docs/seo/USTA_GIRDI_FORMU.md kullanılır. Onaylanan planın kapsamı ve bekleyen işleri docs/seo/PLAN_VE_UYGULAMA_MATRISI_2026-10-01.md içinde ayrıdır. IMPLEMENTATION.md uygulama kararlarını, nihai teslim raporu gerçek test ve yayın sonuçlarını taşır.

## Yayın ve gizlilik

Mevcut GitHub Pages gösterimi noindex olarak kalır. indexableRoute ve pageRobots gelecekteki onaylı ticari yayında yalnız editoryal listedeki yolları açar. Özel proje ve arama yardımcıları indekslenmez. Gerçek ticari mod için alan adı, hesap ve işletme bilgileri ayrı onay gerektirir. seo-readiness.json bugünkü durumu gösterir. Noindex erişim kontrolü değildir.

Yunus Usta. +90 530 879 71 69. iletisim.eliftasarimatolyesi@gmail.com. E-posta ve telefon kullanıcıdan alınmıştır, gerçek teslim testleri yapılmamıştır. Adres, çalışma saatleri ve yeni ticari koşullar doğrulanmadan doldurulmaz.

Özel proje varsayılan olarak açık sekmede kalır. Yedi günlük cihaz kurtarması açık izin ister. Fotoğraflar bu kayda dahil değildir. İndirilen özel taslak, herkese açık ilham seçimi ve 3D karşılaştırma dosyaları farklıdır. Kullanıcının kişisel dosyaları bu public depoya yüklenmez. Bu sürüm yeni analitik, CRM, CMS, ödeme veya otomatik talep sunucusu eklemez.

## Yayın güvenliği

Önce temiz build, kaynak ve gerçek HTTP tarayıcı testleri. Ardından yalnız elif-tasarim alt ağacının güncel main üzerine aktarımı. Aynı depodaki diğer projeler ve kişisel kök index.html korunur. Zorla gönderim yoktur. Aday dalın başarısı, canlı manifest ve kullanıcı akışı doğrulanmadan yayının tamamlandığı anlamına gelmez.
