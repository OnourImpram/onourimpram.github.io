# Elif Tasarım V23. Nihai teslim

1 Ekim 2026.

## Sonuç

V23 mevcut adreste yayındadır. Paket ve manifest sürümü 0.23.0, kimlik v23-premium-finish. Derleyici tools/build-v23.cjs. Son gerçek yayın doğrulaması https://github.com/OnourImpram/onourimpram.github.io/actions/runs/36838089319 üzerinden başarıyla tamamlandı. Kanıt artefaktı 11149774032, birebir test edilen son teslim artefaktı 11149664618.

## Görünür değişiklikler

Devir 01 hero görseli 3:2 çerçevededir. Üç boş görünümlü renk kartı yerine aynı özgün Three.js modelinden alınmış Odak, Akış ve Hareket renderları bulunur. Kartlar 160×75×80 cm açık meşe, 180×80×80 cm ceviz ve 200×85×110 cm koyu ahşap konfigürasyonlarını ilgili yan tabla açılarıyla stüdyoda açar. Bunlar değiştirilebilir konsept başlangıçlarıdır.

Yükselir, Döner ve Saklar açıklamaları, çift kitaplıklı oda görünümü ve açık depolama ayrıntısı ürün sayfasında birlikte yer alır. Beş render altı görüntü alanında kullanılır. Üç dosya 1920×1280, iki dosya 1200×800 pikseldir. Mobilde oda metni görselin altına taşınır. Renderlar bitmiş müşteri işi veya gerçek atölye numunesi diye sunulmaz.

Ana Devir görselleri yüklemek için sonraki kaydırmayı beklemez. Geçici görsel hatası bir kez yeniden denenir. Kalıcı hatada boş kutu yerine açıklama ve çalışır ürün eylemleri korunur. Yapılandırma kayıt betiği engellendiğinde HTML verisinden doğru alt yol ve sayfa kurtarılır. Doğrudan bölüm bağlantısı ile geçmişe dönüş birbirini bozmaz.

## Son denetim

160 birim, geometri ve derleme testi geçti. Çekirdek strict TypeScript denetimi ve temiz derleme geçti. 187 HTTP dosyasının boyutu ve SHA256 özeti ile manifest eşleşti. Manifestte .nojekyll dahil 188 girdi vardır. 46 doğrudan rota ve bilinmeyen adreste 404 denetlendi.

11 görünürlük kontrol grubu, bütün 46 rotada masaüstü içerik ve görsel kontrolünü içerir. Geçici ve kalıcı istek hataları, engellenmiş config, dört ekran genişliği ve gerçek JavaScript kapalı ürün sayfası geçmiştir. Aynı 46 rota 390 piksel mobil görünümde ayrıca geçmiştir. 12 müşteri iletişim ve 20 yön/tam tur kontrol grubu da son canlı testte geçti.

Hero, oda, varyantlar ve ayrıntı bölümleri doğal kaydırma, görüntü decode ve boyama sonrasında kaydedildi. 320, 390 ve 768 piksel ek ekranlar alındı. Bölüm ekran görüntülerindeki viewport kırpmasını ürün kusuru sanmamak için tam sayfa görüntüsü de incelendi. Kullanıcıya sunulan önizleme yalnız gerçek canlı sayfa görüntülerinin kırpılması ve boyutlandırılmasıdır.

30 Eylül hazırlığındaki 15 ürün/GLB/USDZ grubu ve 322 rota-genişlik birleşimi önceki kapsamdır, yeni test sayılarıyla toplanmaz. Son metadata düzeltmesinde bu hazırlıktan gelen runtime dosyalarının bütün hash'lerinin aynı kaldığı ayrıca doğrulandı.

## Sonlandırma düzeltmeleri

V23 paketinde eski manifest sürümü 0.22.1 kalmıştı. Yeni test önce başarısız oldu, sürüm doğrudan package.json içinden üretilerek 0.23.0 ile eşitlendi. Düzeltme ea13987e5e20e9b0b377cadd7262ec1dc98e8bb1. Mevcut yayın görsel ve uygulama dosyaları değişmedi.

JavaScript kapalı testte rAF tabanlı görsel bekleme zaman aşımına uğradı. Aynı altı doğal görselin complete ve naturalWidth koşulu, aynı 12 saniyelik süreyle doğrudan okunarak sınandı. Son tur bu koşulu geçti; gerçek ürün yükleme hatasını gizlemek için test sınırı genişletilmedi. Test kaynağı 2093b2807ef55089e4a01551ce2712cb915e3bb3.

## Korunan sınırlar

Yunus Usta, +90 530 879 71 69 ve iletisim.eliftasarimatolyesi@gmail.com korunur. Özgün amblem, slogan, gerçek iş arşivi, konsept ayrımı, çift raf, 360 derece, karşılaştırma, GLB ve USDZ korunur. Kişisel kök index.html nesnesi 501229ef0c1d25dbc4554e27ca089b03e590c7e0 değişmemiştir.

Testler izole Chromium ve gerektiğinde yazılımsal WebGL ortamındadır. Fiziksel telefon, AR zemin/ölçek, ekran okuyucuyla kullanıcı araştırması, gerçek mesaj teslimi veya sıfır hata garantisi değildir. Atölye numunesi, müşteri yorumu, fiyat, teslim süresi veya garanti uydurulmadı. Noindex önizleme ve müşteri verisi sınırları korunur. Yeni ödeme, CRM, CMS, izleme veya özel müşteri sunucusu açılmadı.
