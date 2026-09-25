# Elif Tasarım V10. Bulgu ve düzeltme kaydı

25 Eylül 2026.

## İncelemenin esası

Bu sürüm V9 kaynak paketi üzerinde yeniden üretilen hatalardan başlar. V9'un eski testlerinin geçmesi doğru müşteri deneyiminin tamamlandığı kabul edilmedi. Başlangıçta 83 birim testi geçtiği hâlde yeni negatif senaryolar farklı hataları ortaya çıkardı. Bu nedenle V10 sadece görsel bir revizyon değildir.

Aşağıdaki kayıtlar güvenlik açığı, müşteri etkisi ve tasarım iyileştirmesini birbirine karıştırmaz. Sayısal CVSS, dönüşüm artışı veya bağımsız insan ekibi denetimi iddiası yoktur. Kapsam, aynı ajan tarafından kaynak incelemesi ve tarayıcı sınamasıdır.

## Bulunan ve düzeltilen hatalar

| Kimlik | V9'da gözlenen davranış | V10 düzeltmesi | Doğrulama |
| --- | --- | --- | --- |
| V10.01 | Dolap kapağı kapalı hacmin içine dönüyordu. | Menteşe dönüşünün işareti düzeltildi. Kapak dışarı açılıyor. | Gerçek modelde serbest kenarın derinliği yaklaşık eksi 0,397 metreden artı 0,397 metreye değişti. Fiziksel tüm çarpışmaların çözümü anlamına gelmez. |
| V10.02 | Kitaplık saklandığında ona ait noktasal ışık görünür kalıyordu. | Sol ve sağ kitaplık kendi ışığının görünürlüğünü de yönetiyor. | Node oda testinde rafsız seçimin aktif raf ışığı sayısı 2 yerine 0. |
| V10.03 | Akşam görünümü paylaşım bağlantısına dahil değildi. | Işık seçimi tek stüdyo konfigürasyonunda, isik parametresiyle saklanıyor. | Akşam bağlantısı yeniden ayrıştırıldığında evening geri geliyor. |
| V10.04 | Üst görünümden ürün görünümüne geçildiğinde kamera değişiyor, üstten düğmesi seçili kalıyordu. | Kamera motoru görünüm değişikliğini arayüze bildiriyor. | Ürün görünümünde üstten düğmesi artık seçili değil. |
| V10.05 | Görünümü sıfırla, otomatik dönüşün etkin durumunu kapatmıyordu. | Kamera sıfırlama ve elle kamera kontrolü dönüşü durduruyor. | Düğme normal durumuna geliyor ve sınanan bekleme aralığında kamera sürüklenmiyor. Başlangıç probunda da görünürlük nedeniyle kayma 0 idi. Hatanın asıl kanıtı etkin dönüş durumuydu. |
| V10.06 | PNG dışa aktarma sırasında kodlayıcı hatası verilirse renderer boyutu ve kamera değişmiş kalıyordu. | Geçici değişiklikler finally bloğunda geri alınıyor. Çıktı boyutu sınırları eklendi. | Denetimli toDataURL hatasında canvas ve kamera önceki değerleriyle birebir aynı. |
| V10.07 | Açık meşe stüdyodan forma aktarılınca seçili malzeme boş görünüyordu. | Stüdyo tonları formdaki gerçek seçeneklere eşlendi. | Meşe görünümü, yapısını görüşelim seçili. Masif meşe üretim garantisi verilmez. |
| V10.08 | Metin olarak görünen bazı select seçeneklerinin DOM değeri boştu. | Malzeme, yüzey, hazırlık ve yaklaşım option değerleri açıkça tanımlandı. | Altı select öğesinde anlamlı değer ve geçerli seçili indeks kontrol edildi. |
| V10.09 | Yükseklik yanlış girildiğinde en alanı hatalı işaretleniyordu. | İlk gerçekten geçersiz ölçü alanı bulunuyor. | Yükseklik 0 örneğinde odak model-height alanına gider ve aria-invalid uygulanır. |
| V10.10 | Yeni Pinterest veya proje bağlantısı eski modelin kategori ve URL'sini değiştirmiyordu. | Yeni referans bağlamı açıkça benimseniyor. Özel notlar ve ölçüler korunuyor. | Mutfak ve auditA'dan TV ünitesi ve auditB'ye geçilir. Kullanıcı notu kaybolmaz. |
| V10.11 | Arama sayfasındayken yeni arama yapılınca URL değişiyor fakat önceki sorgu ekranda kalıyordu. | Sayfa aynı rota üzerindeki yeni query girdisini de izliyor. | Kahve araması ardından mutfak arandığında ekran ve URL mutfak olur. |
| V10.12 | TV ve stüdyo paylaşım görselleri ana mutfak görselini kullanıyor, gezinme metadata'sı eski sayfada kalabiliyordu. | Statik HTML ve istemci gezinmesi ortak metadata işlevini kullanıyor. | TV için r22, stüdyo için masa posteri. Canonical, OG URL ve JSON-LD temiz rota ile eşleşiyor. |

## İlave sağlamlık ve açıklık düzenlemeleri

WebGL kayıp durumunda tekrar deneme düğmesi sahneyi son seçeneklerle yeniden oluşturur. Eski render döngüsü durdurulur. Bu test, kontrollü contextlost olayıdır. Gerçek sürücü arızalarının tamamını kapsamaz.

Masa, Ölçü ve Mekân sekmeleri ok tuşları, Home ve End ile kullanılabilir. Tek etkin tab durağı, seçili durum ve panel ilişkisi vardır. Yeniden deneme ve sekme kontrolleri işlevsellik testleriyle doğrulandı.

Gizlilik ve saklama açıklamasındaki eski V7 ve yedi günlük otomatik tasarım saklama ifadesi ayıklandı. Özel proje taslağı açık sekmenin belleğinde kalır. Tercihe bağlı seçki kaydı yalnız herkese açık kimlikleri 30 gün saklar. Bu düzenleme yeni bir veri servisi kurmaz.

## Reklam ve müşteri kararı düzenlemeleri

Kategori başlıkları ne üretildiğini açıkça söyler. Kahve köşesi, mutfak ve TV ünitesi girişleri ilgili gerçek çalışmayı ve doğru kategoriyle başlayan iletişimi korur. Yeni referans hatasının düzeltilmesi bu zincirin teknik temelidir.

3D stüdyoda ayrıntılı formu doldurmadan Yusuf Usta'ya soru sorma yolu eklenmiştir. Mesaj yalnız konsept seçeneklerini içerir ve numara 905308797169'dur. Düğme tıklaması mesajın teslimi olarak kaydedilmez.

Model formu yanındaki üç adım, ne olacağını açıklar. Önce fikir hazırlanır. WhatsApp'ta kullanıcı mesajı gönderir. Üretilebilirlik ve teklif birlikte değerlendirilir. Otomatik sipariş veya talep alındı iddiası yoktur.

Raflar ve odadaki dekor masa ölçüsüne veya fiyatına dahil gösterilmez. Aydınlatma stüdyo görünümüdür, elektrik tesisatı teklifi değildir. Onaylı amblem ve Zamana değer katan mobilyalar başlığı değişmez. Yeni konsept üretimi yerine mevcut çalışan ürünün güvenilirliği geliştirilmiştir.

## Tekrar üretim ve yöntem düzeltmeleri

Kırmızı test kayıtları evidence/v10/red-complete içinde, V10 HTTP karşılığı stage-evidence ve canlı karşılığı live içinde teslim edilir. Oda ve paylaşım görseli için Node testleri ayrı bulunur.

İlk kapak testi dönüş matrisinin işaretini yanlış hesaplamıştı. Bu ilk PASS geçersiz sayıldı. Doğru serbest kenar hesabı ile V9 başarısız, V10 başarılı oldu. İlk select sorgusu fazla dar bir erişilebilir ad kullanıyordu. Gerçek etiket ve select üzerinden tekrarlandı. Bir ilk çekirdek test koşumu yanlış derlenmiş dosya yolu kullandı, ürün hatası sayılmadı.

Büyük çevrimdışı HTML için gezinme süresi 60 saniyeye çıkarıldı. Yazılımsal grafik ortamında sahneyi yeniden oluşturma click'i 12 saniyeyi aşabildiği için yalnız o eylemin test bütçesi 60 saniye oldu. Gerçek HTTP koşumu tamamlanmadan bu adım geçti denmedi.

## Kalan sınırlar

Tam fiziksel çarpışma, mekanizma kapasitesi, taşıma dayanımı ve elektrik güvenliği sınanmadı. Gerçek müşterinin mesajı gönderip Yusuf Usta'nın teslim aldığını teyit ettiği uçtan uca test yapılmadı. Ödeme, otomatik talep veritabanı, kargo ve fatura sistemi eklenmedi. Gerçek iOS, Android, Safari ve Firefox testleri ayrıca gerekir. Noindex önizlemesi korunur. Reklam harcaması, reklam onayı, gerçek kullanıcı dönüşüm oranı ve Lighthouse skoru üretilmedi.
