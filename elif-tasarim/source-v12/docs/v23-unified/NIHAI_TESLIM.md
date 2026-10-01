# Elif Tasarım. Tek 3D Stüdyo ve arşiv teslimi

1 Ekim 2026. Paket 0.23.1, yayın kimliği v23-unified-studio.

## Kullanıcının düzeltmesi

Bağımsız Devir 01 sayfası ve gezinme hedefi kaldırıldı. Menüde bir adet 3D Stüdyo vardır. Masa anlatımı, görselli başlangıç modelleri, malzeme ve kullanım açıklamaları, gerçek Three.js sahnesi, karşılaştırma ve dışa aktarma aynı /tasarim-masasi/ adresindedir. Ana sayfa, altbilgi ve arama sonuçları artık ayrı ürün sayfasına gitmez.

/devir-01/ yalnız uyumluluk yönlendirmesidir. JavaScript açıkken eski ölçü parametreleri ve bilinen bölüm bağlantıları stüdyoya aktarılır. JavaScript kapalıyken bağlantı ve meta yönlendirme bulunur. Bu HTTP 301 değildir. Eski model kimliği, stüdyo içi açıklama ve dosya uyumluluğunda korunabilir; bağımsız bir bölüm değildir.

## Verilen ZIP

Eliftasarımatölyesi(1).zip içindeki 32 girdi, tekrarlar ayıklandığında 26 farklı fotoğraf içerir. Önceki sürümde bulunan 17 görsel yeniden çoğaltılmadı, eksik dokuz görsel eklendi. Fotoğraflar 20 proje dosyasında gruplanır. 17 dosya bitmiş iş, üç dosya kurulum/uygulama olarak ayrılmıştır. Bu sayı 26 yeni proje veya bağımsız olarak doğrulanmış müşteri teslimi değildir.

Bahçe kamelyasının beş açısı tek galeridedir. Mutfak kurulumuna ikinci açı eklendi. Cam vitrin uygulaması ve dört TV ünitesi görünümü arşive katıldı. Bütün 26 kimlik gerçek galeri URL'lerinde sınandı. Arşiv, kullanıcının kaynak beyanına dayanır. Mevcut ilan filigranları ve ekran görüntüsü işaretleri silinmedi. Kesin ölçü, malzeme markası, müşteri adı ve teslim süresi fotoğraftan uydurulmadı.

Ana sayfanın üç ana görselinde ve gerçek iş bulunan kategori kapaklarında atölye arşivine öncelik verildi. Proje dosyalarında fotoğraf sayısı, galeri, gözlenebilir kullanım/biçim açıklamaları ve yeni talepte konuşulacak sorular bulunur. Orijinal ZIP değişmedi. Tekil kaynak ve türev eşlemesi ARCHIVE_AUDIT.json dosyasındadır.

## Stüdyo ve talep akışı

Odak, Akış ve Hareket seçenekleri aynı stüdyoda kendi ölçüsü, yüzeyi ve yan tabla açısıyla açılır. İki kitaplık, tam 360 derece, yükseklik, çekmeceler, kapak, kamera, karşılaştırma, oda alanı aracı ve gerçek GLB/USDZ dışa aktarma korunur. Kablo/priz planı doğrulanacak üretim kararıdır, olmayan bir mekanizma varmış gibi sunulmaz.

Proje özeti, fikir/model, ölçü, fotoğraf ve metin durumunu ayrı gösterir. Eklenmemiş fotoğrafa veya bilinmeyen ölçüye hazır işareti konmaz. Mesajı hazırlamak talebin atölyeye ulaştığını göstermez. WhatsApp, e-posta, telefon, SMS, kopyalama yedeği ve dosya seçenekleri korunur.

Yunus Usta, +90 530 879 71 69 ve iletisim.eliftasarimatolyesi@gmail.com korunur. Onaylı marka kimliği, slogan, gerçek iş/konsept ayrımı, açık izinli taslak kurtarma ve JavaScript gerektirmeyen iletişim sayfası korunur.

## Test ve yayın kanıtı

Yayınlanan uygulama commit'i cbb8d79194cd9d95208902574b2e81fdeb0faadb.
Yayın öncesi tam aday testi https://github.com/OnourImpram/onourimpram.github.io/actions/runs/36847196580.
Gerçek canlı işlev denetimi https://github.com/OnourImpram/onourimpram.github.io/actions/runs/36848267019.
Son başarılı görsel, istek kurtarma ve teslim denetimi https://github.com/OnourImpram/onourimpram.github.io/actions/runs/36849738616.

169 birim/geometri/derleme testi, çekirdek strict TypeScript ve temiz derleme geçti. 201 HTTP dosyası ve yayın manifesti boyut/SHA256 düzeyinde eşleşti. Manifestin .nojekyll dahil toplamı 202 girdidir. 50 doğrudan rota, 50 masaüstü ve 50 mobil içerik/görsel yolu, 11 birleşik stüdyo/arşiv grubu, 12 iletişim ve 20 gerçek tam tur grubu canlı adreste geçti. Adayda ayrıca 15 model/karşılaştırma/GLB/USDZ grubu geçti. Bu kapsamlar birbiriyle örtüşür, yeni özellik veya fiziksel cihaz sayısı değildir.

İlk canlı iş akışındaki bütün işlevsel aşamalar geçti. Son ek istek sayacı, ilk HTML isteği ile istemci bağlama isteğini yeniden deneme sanarak başarısız oldu. Son denetim bu iki doğal isteği tek açık uygulama yeniden denemesinden ayrı saydı. Aynı görsel bir kez yeniden denendi, açık hata durumu ve üç tasarım bağlantısı korundu, 500 ms boyunca yeni istek oluşmadı. Bu sayaç düzeltmesi uygulama veya yayın dosyalarını değiştirmedi. İlk iş akışının bütünü başarılı diye sunulmaz, iki denetim kapsamı ayrı saklanır.

Stüdyo, model kartları, ayrıntılar, gerçek kamelya galerisi ve ana sayfa doğal görsel çözümleme/boyama sonrasında kaydedildi. Yapılandırma betiği engellendiğinde doğru stüdyo ve alt yol kurtarıldı. Kişisel kök index.html nesnesi 501229ef0c1d25dbc4554e27ca089b03e590c7e0 değişmedi.

## Rapordaki işletme bilgileri ve sınırlar

27 Eylül raporları görsel tarayıcı testi içermediğini açıklar. Daha önce çözülmüş e-posta, alternatif kanal, taslak kurtarma, SSS, rehber ve paylaşım görselleri yeniden eksik sayılmadı. Kullanıcının tek stüdyo talimatı eski ayrı ürün sayfası önerisini geçersiz kılar.

Yeni atölye adresi, saatler, kurumsal kayıtlar, gerçek müşteri yorumları, fiyat ve garanti için doğrulanmış yeni veri gelmedi, bu bilgiler uydurulmadı. Noindex önizleme değişmedi. Yeni alan adı, Google işletme kaydı, Search Console, ödeme, CMS, CRM veya özel müşteri sunucusu kurulmadı.

Doğrulama izole Chromium ve gerektiğinde yazılımsal WebGL kapsamındadır. Fiziksel telefon/AR yerleşimi, diğer tarayıcı aileleri, gerçek mesaj teslimi veya ekran okuyucuyla kullanıcı araştırması yapılmış sayılmaz. Sıfır hata veya dönüşüm artışı garantisi verilmez.
