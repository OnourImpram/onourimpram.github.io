# Elif Tasarım V12 C+

Gerçek Three.js ile çekmece kullanım yönü düzeltilmiş ve yatayda tam tur incelenebilir Devir 01 konsept stüdyosu. Onaylı marka kimliği, çift taraflı kitaplıklar, Yunus Usta iletişimi ve V11 proje akışları korunur.

## Kaynak ve yayın

Kaynaklar `elif-tasarim/source-v12/` dizinindedir. Ürünün yayımlanan dosyaları `elif-tasarim/` altındadır. Kök kişisel sitenin dosyaları değiştirilmez.

Nihai uygulama commit'i `14238da625f315a3f7176e0ca297c7a6631d5e5f`, sürüm `v12-cplus-360`, paket `0.12.0`.

Ayrıntılar [V12 değişiklik günlüğünde](docs/V12_Surum_Notlari.md) bulunur. Önceki kapsamın 33 kabul senaryosu `docs/v11/PLAN_STATUS.md` içinde korunur. Açık işletme ve gerçek cihaz koşulları geçmiş gibi işaretlenmez.

## Çalıştırma

Node.js 22 veya üzeri kullanılır. Kaynak dizininde aşağıdaki komutlar çalıştırılır.

```sh
npm ci --ignore-scripts
npm run build
npm test
npm run typecheck:core
npm run verify:dist
npm run serve
```

Tek etkin derleme `tools/build-v12.cjs` dosyasıdır. Sunucu, `dist` dosyalarını `/elif-tasarim/` altında sunar. Terminalde yazılan HTTP adresi açılır. Taşınabilir tek dosya `preview/Elif_Tasarim.html` içinde üretilir. Ayrı ESM modülleri içeren normal dağıtım HTTP sunucusu gerektirir.

Three.js 0.185.1, TypeScript 5.8.3 ve mevcut yerel MIT Preact çalışma zamanı kullanılır. Normal kullanımda üçüncü taraf 3D servisi veya CDN zorunlu değildir. Çekirdek strict TypeScript denetimi, bütün JSX bileşenlerinin tam semantik denetimi anlamına gelmez. Font dosyası dağıtılmaz.

## Tarayıcı doğrulaması

Python Playwright ve Pillow gerekir. `tests/v12/acceptance.py`, sandbox destekli Google Chrome kanalı ve Xvfb kullanır. Başka ortamda tarayıcı kurulumu ayrıca doğrulanmalıdır.

```sh
xvfb-run -a python tests/v12/acceptance.py
xvfb-run -a python tests/v11/acceptance.py
xvfb-run -a python tests/v11/followup.py
xvfb-run -a python tests/v11/matrix.py
```

Varsayılan test girdisi yerel taşınabilir önizlemedir. Gerçek HTTP testi için `BASE_URL`, sonu eğik çizgiyle biten yayın adresine ayarlanır. `EVIDENCE_DIR` sonuçların dizinini seçer. Bu testler mesaj göndermez.

Yayından sonra `tests/v11/public_verify.py`, yeniden derlenen V12 manifesti ile gerçek public dosyaları ve doğrudan sayfaları karşılaştırır.

## V12 C+ davranışı

Ana tablanın çekmeceleri, yükseklik kumandası ve alt dolap sandalyenin bulunduğu negatif Z kullanım yönüne bakar. Hem mekân hem ürün görünümünde yatay yörünge serbesttir. Görüşü kapatan oda elemanları kullanıcı tarafındaki incelemede geçici saklanır. Raf ve aydınlatma tercihleri silinmez. Dikey kamera ve mesafe sınırları korunur.

Genel, Çekmece tarafı, Arka, Soldan, Sağdan ve Üstten görünümleri bulunur. Fareyle ve klavyeyle tur, dokunma yakınlaştırması, otomatik dönüş, ölçü aktarımı ve görüntü dışa aktarımı test kapsamındadır. Gerçek fiziksel cihaz başarımı ayrı değerlendirilir.

## Veri, ticari ve imalat sınırları

Yunus Usta ve +90 530 879 71 69 kullanıcı tarafından verilmiştir. WhatsApp bağlantısı doğru alıcıyı açar. Bu, mesajın gönderildiğini veya teslim alındığını kanıtlamaz. Otomatik sipariş veritabanı, ödeme, fatura veya kargo servisi yoktur.

Özel müşteri notları ve görseller açık sekmenin belleğinde tutulur. Yalnız açıkça kaydedilen herkese açık ilham kimlikleri kalıcı saklanır. Paylaşılabilir stüdyo bağlantıları özel not, ev fotoğrafı veya iletişim bilgisi taşımaz. Yenileme veya sekmeyi kapatma özel taslağı temizleyebilir.

GitHub Pages yayını noindex portföy ve tasarım önizlemesidir. Bu etiket platformun ticari kullanım koşullarını ortadan kaldırmaz. Ticari alan adı, barındırma, işletme kapsamı ve izinler ayrıca değerlendirilir.

Masa yüksekliği, yan tabla açısı ve yerleşim geometrisi fiziksel üretim çizimi, çarpışma çözümü, motor kapasitesi, taşıma dayanımı veya elektrik güvenliği onayı değildir. Kitaplık ve oda dekoru masa teklifine otomatik dahil değildir. Gerçek iş, montaj, konsept ve dış referans ayrımı korunur.
