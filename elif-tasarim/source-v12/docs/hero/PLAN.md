# Açılış seçkisi. Etkileşim düzeltmesi

1 Ekim 2026. Kullanıcı açılıştaki değişimin yavaş ve fark edilmez olduğunu bildirdi. Mevcut V23.3 üzerinde yalnız açılış akışı ve yakın kullanılabilirlik hataları düzeltilir. Yeni ürün sayfası, ayrı Devir bölümü, üçüncü taraf takip veya ticari indeks açılışı yok.

## Teşhis

GitHub main 026d7bda0e324c90b9c79a95ece6dbae1744ef15. Home.tsx uzak Git nesnesi 591a6510d56fcd6d16b44cde9497defa8e027b59 ile kaynak arşivi eşleşti. 5000ms çevrim, 950ms opacity geçişi. Mouse enter tüm hero alanını durduruyor. Aynı kaynakla üretilmiş taşınabilir tarayıcı önizlemesinde merkezde duran imleçle 6.2 saniyede sıfır geçiş gözlendi. Dışarı çıktıktan 5.05 saniye sonra değişim geldi. Düğme geçici durumu açıklamıyor. Mobilde pasif sahnelerin adları eski CSS tarafından gizleniyor.

## Karar

İlk geçiş hedefi 2200ms, devamı 3200ms. Görsel çözülmeden kare değişmez. 650ms fade, sabit marka başlığı ve eylem metinleri. 01/05 sayacı, beş görünen mekân adı, önceki/sonraki düğmeleri ve gerçek zamanlayıcıyla eşleşen ilerleme çubuğu. İmleç sabit metinde veya arka planda durunca gösterim susmaz. Mouse bekletme yalnız seçim kontrollerindedir. Klavye odağı hero içinde otomatiği durdurur ve ancak açık Oynat eylemiyle yeniden başlar. Hareket azaltma, görünmeyen sekme ve ekran dışı duruş korunur. Bu arka plan fotoğraflarına özgü bir hover kapsamıdır, tam APG uygunluk sertifikası iddiası yoktur. Yön okları ve beş düğme yerinde kalır. Yeni hareketli metin, flashing veya agresif zoom yok.

## Testler

Yedi davranış testinin dördü eski kaynakta başarısız, üç korunması gereken davranış eski kaynakta başarılı gözlendi. Düzeltmeden sonra tümü başarılı. Kaynak toplamı 185 test. Eski SEO testi sahte window nesnesinde yalnız interval yöntemlerini tanımlıyordu. Tek seferli timeout zamanlayıcısına geçildiğinde test sahte zamanlayıcısına setTimeout/clearTimeout eklendi, testin beklenen sonucu değiştirilmedi.

Yerel taşınabilir tarayıcıda ilk geçiş 2.053s, devam aralıkları yaklaşık 3.24s. Gerçek HTTP ve canlı yayın testleri GitHub Actions içinde ayrıca yürütülecek. İlk fotoğraf yüksek öncelikli, yalnız sıradaki düşük öncelikle hazırlanır. Mobilde gizleyen eski CSS için sınırlı isim görünürlüğü düzeltmesi var. 44px kontroller ve iki kat metin test edilir. Sıralama, gerçek müşteri dönüşümü veya fiziksel telefon hızı sonucu çıkarılmaz.

## Yayın sınırları

Yalnız elif-tasarim alt ağacı güncel main üzerine eklenir. Kök kişisel sayfa, MARSAM ve diğer projeler korunur. Eski kaynakla uzak yeni değişiklikler ezilmez, force kullanılmaz. Ürün kodu değişmeden önce bütün HTTP kontrolleri geçer, sonrasında canlı manifest ve tarayıcı kanıtı alınır. Başarılı aday, canlı yayın kanıtı yerine geçmez.

## Yöntem kaynakları

W3C carousel rehberi, duraklatma, odak ve elle gezinme seçenekleri. https://www.w3.org/WAI/tutorials/carousels/animations/ ve https://www.w3.org/WAI/ARIA/apg/patterns/carousel/

MDN HTMLImageElement.decode, hazırlanmış görüntüyü gösterme davranışı. https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/decode

Yerel ortamda canlı DNS ve localhost tarayıcı gezintisi bu turda kullanılamadı. Bunlar değiştirilmeden mevcut taşınabilir build üzerinde görsel test yapıldı. Gerçek HTTP kontrolleri bağlı GitHub Actions ortamında yürütülecek.
