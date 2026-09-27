# Elif Tasarım V22. İletişimi tamamlamak

## Kullanıcı talebi ve kapsam

Kullanıcının sağladığı işletme e-postası iletisim.eliftasarimatolyesi@gmail.com. Bu adres iletişim sayfasına, altbilgiye, yapılandırılmış veriye, doğrudan iletişim sayfasına ve proje özeti e-posta bağlantılarına eklenir. Hesap alıcısı kullanıcıdan alınmıştır. Hesaba giriş veya gerçek e-posta teslimi yapılmamıştır.

27 Eylül 2026 tarihli ikinci Eksikler ve Kullanıcı Deneyimi raporunun 2.1 ve 3.1 ile 3.5 bölümleri uygulanır. Rapor tarayıcı testi içermediğini söyler. Eksik olduğuna ilişkin her ifade güncel V21 ile ayrıca karşılaştırılmıştır. V21'in yedi günlük açık izinli taslak kurtarması, SSS, rehber ve sayfaya özgü görselleri yeniden yapılmaz.

## Tamamlanan uygulama

Her proje özetinde tam metni açık kullanıcı eylemiyle kopyalama. Pano izni reddedildiğinde seçili, salt okunur metin ve mevcut TXT/ZIP indirme yolu. Metin değiştiğinde eski kopyalama durumunun sıfırlanması. İletişim düğmesi seçildikten sonra uygulamada mesajı gönderme ve görselleri ayrıca ekleme adımlarının açıklanması. Tıklama, mesaj teslimi veya sipariş kaydı olarak sunulmaz.

Doğrulanmış kullanıcı adresine mailto bağlantısı. Uzun özetlerde kısa başlangıç metni ve ayrıntılı dosyayı ayrıca ekleme açıklaması. Tam özet korunur, alıcı değişmez. SMS ve telefon aynı mevcut numarayı kullanmaya devam eder.

İlham dosyasında herkese açık model kimliklerini dışa aktarma. En fazla 64 KB ve 24 model. İçe aktarımda biçim, sürüm, kimlik ve sınır doğrulanır. Birleştirme veya açık onaylı değiştirme vardır. İptal ve hatalı dosya mevcut seçkiyi silmez. Bu dosya özel proje taslağından ve Devir karşılaştırma dosyasından farklıdır.

Kolay iletişim sayfası, /kolay-iletisim. E-posta, telefon, SMS ve WhatsApp normal HTML bağlantılarıdır. Görünür başlangıç şablonu JavaScript olmadan da vardır. Kopyalama ek kolaylıktır, temel iletişim için zorunlu değildir.

## UX incelemesi

Mobilde uzun e-posta ve açıklamalar gerektiğinde satır kırar. Yeni etkileşimlerin dokunma yüksekliği en az 44 CSS pikseldir. Elle kopyalama alanı eski genel form stillerinden ayrılmıştır. Proje formunda bağlamı taşımayan sabit genel WhatsApp çubuğu ve metni örten başa dön düğmesi gösterilmez. Modelin tam özeti ve e-posta alternatifi doğrudan formun kendi içinde kalır.

## Korunanlar

Marka, slogan, gerçek portföy, konsept ayrımı, Yunus Usta, +90 530 879 71 69. Devir 01, iki raf, gerçek 360 derece, model karşılaştırması, GLB/USDZ. Kişisel kök ana sayfa değişmez. Noindex önizleme korunur. Adres, saat, fiyat, müşteri yorumu, çalışma yılı, motor garantisi ve yeni ticari hizmet uydurulmaz.

Ödeme, CRM, CMS ve otomatik talep sunucusu yoktur. E-posta, harici istemci bağlantısıdır, sunucudan e-posta gönderimi değildir. Gerçek mesaj veya arama testleri yapılmaz. Dosya importları katalog kimlikleri dışında kişisel veri taşımamalıdır.

## Test ve yayın

Etkin sürüm v22-contact-complete, paket 0.22.0, manifest release-v22.json. Tarihsel source-v12 dizin adı korunmuştur. tests/v22/acceptance.py yeni kullanıcı yollarını, önceki testler korunmuş işlevleri doğrular. Temiz derleme, birim testleri, çekirdek strict TypeScript ve dosya bütünlüğü birlikte çalıştırılır. Canlı yayın doğrulaması staging kontrolünden ayrıdır.
