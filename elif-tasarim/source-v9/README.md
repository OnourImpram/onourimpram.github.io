# Elif Tasarım V9. Devir 01

Gerçek Three.js 0.185.1 ve WebGL ile oluşturulmuş hareketli konsept masa. Fotoğrafın kamera hareketiyle kaydırılması değildir. Tabla, üç ince çekmece, ahşap örtülü destek, dolap çekmecesi, menteşeli kapak ve bağımsız yan tabla ayrı geometri gruplarıdır.

## Çalıştırma

Node.js 22 veya üzeri gerekir. Kaynak paketin kökünde `npm install --ignore-scripts`, `npm test`, `npm run build` ve `npm run serve` çalıştırın. Tarayıcıda terminalde yazılan yerel HTTP adresini açın. Three.js modülleri dağıtımın içinde bulunur. Normal kullanımda CDN veya üçüncü taraf 3D hizmeti çağrılmaz.

## Yayın

`dist` dizininin tamamı `/elif-tasarim/` yoluna yerleştirilir. Yalnız bu alt dizin değiştirilmelidir. Kök kişisel sitenin `index.html` dosyasına dokunulmaz. `release-v9.json` her yayın dosyasının boyut ve SHA256 kaydını içerir.

GitHub Pages sürümü noindex tasarım ve portföy önizlemesidir. Canlı ödeme, sipariş veritabanı veya otomatik mesaj teslimi içermez. Ticari yayın ayrı koşullara tabidir.

## 3D kullanım

Ana sayfada motor kullanıcı başlatınca yüklenir. Tasarım masası sayfasında otomatik yüklenir. Kamera döndürme, yakınlaştırma, yükseklik, tabla açısı, çekmece ve kapak hareketi, üç yüzey tonu, aydınlatma, ölçü çizgileri, görsel dışa aktarma ve seçenek bağlantısı bulunur. Mouse tekerleği sayfanın kaymasını engellemez. Klavye okları kamera dönüşünü, artı ve eksi yakınlığı, 0 ilk görünümü değiştirir.

Görseller Three.js sahnesinden üretildiklerinde gerçek modelin aynı geometrisini taşır. Doğal kaynak çözünürlüğünü aşan gerçek atölye fotoğrafları yapay biçimde detaylandırılmaz. Konsept modeller ile bitmiş işler ayrı kalır.

## Güvenlik ve iddia sınırı

80 ile 125 cm yükseklik ve diğer giriş aralıkları görsel keşif sınırıdır. Test edilmiş fiziksel mekanizma, gerçek 360 derece çarpışmasız hareket, elektrik sistemi, dayanım veya yük testi değildir. Görüntüde mümkün olan bir konfigürasyon, imal edilebilirlik garantisi değildir. Yusuf Usta tarafından verilen üretim ve mekanizma bilgileri ayrıca doğrulanmalıdır.

WebGL desteklenmiyorsa fotoğraf ve ölçü özeti kullanılır. Mevcut model özel müşteri taslağına aktarılır. Paylaşılabilir URL yalnız model parametrelerini taşır. Telefon ve WhatsApp alıcısı kullanıcı tarafından sağlanan +90 530 879 71 69 numarasıdır. Mesaj gönderilmesi kullanıcıya aittir.

## Lisanslar

Three.js lisansı `public/three/vendor/THREE_LICENSE.txt`, Preact lisansı `tools/PREACT_LICENSE.txt` içindedir. Sistem yazı tipleri kullanılır, font dosyaları dağıtılmaz. Üçüncü taraf HULALA fotoğrafları yayın paketine alınmamıştır.

## V9 atölye ortamı

İki kitaplıkta dörder raf, açılıp kapanabilen raf ışığı ve yaşam ayrıntıları vardır. Hareket eden masa parçaları ortamdan bağımsız kalır. Statik mobilya parçaları malzeme başına gruplanarak çizim çağrıları azaltılır. Kaynaklar ve yayın aynı build yolunu kullanır. `public/three/atelier-room.mjs` yalnız oda ve rafları, `desk-scene.mjs` masa geometrisini ve çizim yaşam döngüsünü yönetir.

`npm run test:browser` yalnız çalışan bir HTTP önizlemesine karşı gerçek Chromium ve WebGL ile kullanılmalıdır. Hedefi `BASE_URL` belirler. Testler gerçek mesaj veya sipariş göndermez.
