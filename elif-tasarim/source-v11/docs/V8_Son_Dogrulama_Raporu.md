# Elif Tasarım V8. Gerçek Three.js stüdyosu ve son doğrulama

24 Eylül 2026.

## 1. Yayın durumu

Canlı ana sayfa. https://onourimpram.github.io/elif-tasarim/

Canlı 3D stüdyo. https://onourimpram.github.io/elif-tasarim/tasarim-masasi/

Doğrulanan yayın commit’i. `2b9ee083f56cd59eca049c627be7e79f40680c91`.

Bu oturumda depo okunduğunda V8 uygulaması yayın dalında zaten mevcuttu. V7’ye geri dönülmedi veya çalışan uygulama yeniden bir görsel maketle değiştirilmedi. Var olan V8, temiz kaynaklardan yeniden derlendi ve gerçek yayın adresine karşı yeni bir doğrulama çalıştırıldı. Bu son kontrol oturumu yeni bir fiziksel ürün tasarımı veya yeni bir ana yayın commit’i üretmiş gibi sunulmaz.

Son doğrulama dalı. `elif-v8-final-review-20260924`.

Son doğrulama commit’i. `91a64da2f4de1a3e92394e41537e6eb42e29137e`.

Yeni doğrulama çalışması. https://github.com/OnourImpram/onourimpram.github.io/actions/runs/36040273066

Yeni doğrulama 24 Eylül 2026 tarihinde 18.20 UTC itibarıyla başarılı tamamlandı.

## 2. Ne gerçekten çalışıyor

Three.js 0.185.1 ve WebGL ile gerçek üç boyutlu geometri çizilir. Ekran görüntüsünün sağa sola kaydırılması veya yalnız bir SVG illüstrasyonu değildir. Kamera döner. Ana tabla yükselir. Yan tabla ayrı grup olarak döner. Üst tablanın altındaki üç çekmece, depolama çekmecesi ve dolap kapağı ayrı hareket eden parçalar olarak modellenmiştir.

Ana sayfadaki bölüm kullanıcı 3D deneyimi başlat düğmesine bastığında motoru yükler. Ayrı tasarım masası sayfasında motor doğrudan başlar. Three.js ve eklentileri site içinde yer alır. 3D motoru için üçüncü taraf CDN çağrısı gerekmez.

## 3. Konsept modelin kontrolleri

Ana tabla eni 120 ile 220 cm, derinliği 65 ile 95 cm, gösterilen çalışma yüksekliği 80 ile 125 cm arasında değiştirilebilir. Bu sınırlar modelin görsel keşif aralıklarıdır. Üretim, mekanizma veya ergonomi onayı değildir.

Yan tabla 0 ile 360 derece arasında kavramsal olarak döndürülebilir. Toplu, L düzen ve açık yerleşim kısa yolları vardır. Bu, gerçek ürünün bütün açılarda çarpışmasız veya güvenli olduğunun kanıtı değildir.

Ceviz tonu, açık meşe tonu ve koyu ahşap görünümleri. Gündüz ve akşam ışığı. Perspektif, önden ve üstten kamera. Yakınlaştırma, uzaklaştırma ve görünüm sıfırlama. Ölçü çizgilerini açma. Yavaş kamera dönüşü. Gerçek sahneden 1920 × 1280 piksel PNG kaydı. Kişisel not içermeyen model bağlantısı bulunur.

## 4. Müşteri akışı

Bu tasarımı Yusuf Usta ile konuş eylemi, seçilmiş eni, derinliği, yüksekliği, yüzey fikrini ve masa açıklamasını mevcut model paylaşımı akışına taşır.

Doğru WhatsApp alıcısı `905308797169` olarak doğrulandı. Test sırasında WhatsApp mesajı gönderilmedi. Uygulamanın açılması, mesajın teslim edildiği veya sipariş oluştuğu anlamına gelmez.

Mevcut gerçek proje ve ilham ayrımı korunur. Görsel etiketler Konsept model olarak sunulur. Konseptler tamamlanmış atölye işi olarak adlandırılmaz.

## 5. Bu turda gerçekten çalıştırılan kontroller

71 birim ve derleme testi geçti. 0 başarısız. Bunlara mevcut alan mantığı regresyonları, V7 çekirdek işlemleri, V8 model parametreleri, üretim iddiası sınırları ve tekrarlanabilir derleme kontrolleri dahildir.

Temiz kaynak derlemesi 43 sayfa, 27 erişilebilir uygulama modülü üretti. Ana uygulama JavaScript’i 291370 bayt, CSS 198018 bayttır. Three.js motoru ve eklentileri bu ana JavaScript boyutuna dahil değildir. Dosya boyutu hız skoru değildir.

Canlı sunucudan 165 dosya indirilerek yayındaki manifestin SHA256 kayıtlarıyla eşleşti. Manifestteki `.nojekyll` dosyası yalnız build girdisi olarak ayrı tutuldu. Dosya bütünlüğü, içeriğin her koşulda doğru davranacağını tek başına kanıtlamaz.

Canlı adres üzerinde 28 adlandırılmış WebGL ve kullanıcı davranışı kontrolü geçti. Altı genişlikteki ana sayfa taşma kontrolleri bu 28 sayıya dahildir, ayrıca bağımsız bir tüm site matrisi diye yeniden sayılmaz.

Motor gözleminde Three.js revision 185, 60796 üçgen ve 117 çizim çağrısı kaydedildi. Bunlar uygulamanın gerçek geometri çizdiğini doğrulamak için kullanıldı. Fiziksel doğruluk veya görsel sanat kalitesi puanı değildir.

Ana tabla 115 cm konumuna giderken sabit depolama ve yan yüzey yüksekliğinin değişmediği, yan tablanın ayrı döndüğü, çekmecelerin ve kapağın ayrı hareket ettiği geometri değerleriyle ve farklı görüntü pikselleriyle kontrol edildi.

203 × 83 × 115 cm örneği müşteri akışına taşındı. Kamera klavyeyle döndü. WebGL bağlantı kaybında açık yedek görünüm gösterildi. Hareket azaltma tercihinde konum güncellemesi animasyonsuz uygulandı. Test edilen akışlarda JavaScript çalışma zamanı istisnası oluşmadı.

Tarayıcı Chromium 140.0.7339.16, yazılımsal WebGL. Gerçek telefon GPU’su, Safari, Firefox veya bütün erişilebilirlik standartları için sertifikasyon değildir. Gerçek müşteri performansı LCP, INP ve CLS ölçülmedi.

## 6. Fotoğraf ve render boyutları

Yayındaki `office.webp` ve `devir-poster.webp` aynı 1920 × 1280 piksel Three.js renderını taşır. `devir-standing.webp`, `devir-detail.webp` ve `devir-top.webp` de 1920 × 1280 pikseldir. Eski 430 × 287 piksel çalışma alanı görselinin yerini yüksek çözünürlüklü bir konsept renderı almıştır.

Ana hero kaynağı 1672 × 941 pikseldir. Konsept oda görüntülerinin çoğu 1448 × 1086 pikseldir. Doğal kaynaklardan daha kaliteli kodlama yapılmış olması, bütün görsellerin 4K olduğu anlamına gelmez. Gerçek atölye fotoğrafları kaynaklarının izin verdiği ayrıntıyı korur, kayıp ayrıntı üretilmiş gibi sunulmaz.

Kaynak paketteki `docs/image-quality-v8.json`, bazı Devir görselleri için ilk hazırlık aşamasındaki geçici poster kayıtlarını taşır. Son boyutlar yukarıda, dağıtılan gerçek dosyalar Pillow ile açılarak doğrulanmıştır. Geçici kayıtlar final renderların 1672 × 941 olduğu şeklinde yorumlanmamalıdır.

Teslim önizleme paftası, çalışan sahnenin iki farklı yükseklikteki gerçek ekran çıktılarından hazırlanmıştır. Yeni bir AI web sitesi maketi değildir.

## 7. Korunan sınırlar

Kaynak ekran görüntülerindeki başka markaya ait beş yıl garanti, 200 lb taşıma kapasitesi ve çift motor iddiaları Elif ürün iddiası olarak alınmadı. Yükseklik hareketi, elektrik motoru mühendisliği veya taşıyıcı yapı hesabı değildir. Her nihai konfigürasyon atölyenin mekanizma ve üretim değerlendirmesine bağlıdır.

Site portföy ve tasarım önizlemesi niteliğindedir. `noindex` korunmuştur. Ödeme, sipariş sunucusu, kargo ve e fatura bu sürümle çalışır hale gelmiş değildir.

Kişisel sitenin kök `index.html` dosyasının Git blob’u `501229ef0c1d25dbc4554e27ca089b03e590c7e0` olarak yeniden doğrulandı. Son kontrol dalındaki test iş akışı ana site dosyalarını değiştirmez.

## 8. Teslim

`Elif_Tasarim_V8_Kaynak_ve_Testler.zip` düzenlenebilir kaynakları, lisansları, yayın görsellerini, testleri ve bu son kontrolün çıktısını içerir.

`Elif_Tasarim_V8_Yayin_Dosyalari.zip` yayındaki V8 dosyalarını `elif-tasarim/` altında taşır. Kök kişisel siteyi içermeyen yayın paketidir.

Test kanıtları kaynak paketinde `evidence/final-review/` ve `evidence/v8/browser/` altındadır. Font dosyası dağıtılmaz.
