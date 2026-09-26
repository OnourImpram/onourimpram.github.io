# Elif Tasarım V20

Devir 01 ürün keşfi, gerçek 360 derece stüdyo, üç tasarımı karşılaştırma, odanın dikdörtgen dış sınır karşılaştırması ve GLB/USDZ model çıktıları.

## Çalıştırma

Node.js 22. `npm ci --ignore-scripts`, `npm run build`, `npm test`, `npm run typecheck:core`, `npm run verify:dist`.

`npm run serve` yerel HTTP önizlemesini açar. `preview/Elif_Tasarim.html` taşınabilir çevrimdışı sürümdür. WhatsApp ve Pinterest harici hizmetlerdir. Model dosyaları yerel Three.js modülleriyle cihazda oluşturulur.

`tests/v20/acceptance.py` yeni ürün ve karşılaştırma akışlarını, gerçek GLB ve USDZ dosyalarını kontrol eder. `tests/v11/acceptance.py` müşteri karar akışlarını, `tests/v12/acceptance.py` masa yönü ve 360 derece kontrollerini korur. `tests/v11/matrix.py` ekran boyutlarını kontrol eder.

## Yayın

Kimlik `v20-master-atelier`, manifest `release-v20.json`, paket `0.20.0`. Tek etkin derleyici `tools/build-v20.cjs`. Kaynak dizininin tarihsel olarak `source-v12` olması etkin sürümü değiştirmez.

Yalnız `elif-tasarim/` değiştirilebilir. Kök kişisel ana sayfaya dokunulmaz. Yeni canlı sürüm, testler ve public manifest doğrulamasından sonra tamamlandı sayılır.

`docs/V20_Teslim_Kapsami.md` kapsam ve sınırları açıklar. Noindex portföy ve konsept önizlemesi. Ödeme, CRM ve otomatik sipariş sunucusu yoktur. GLB/USDZ görselleştirme biçimleridir, imalat planı değildir. Fiziksel AR cihaz denemesi ayrıca gerekir.
