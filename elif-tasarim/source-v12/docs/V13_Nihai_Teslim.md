# Elif Tasarım V13. Nihai teslim kapsamı

## Sürüm

Sürüm kimliği `v13-final-atelier`, paket `0.13.0`. Canlı hedef `https://onourimpram.github.io/elif-tasarim/`.

Bu belge kapsam kaydıdır. Başarılı yayın ve test sonucu ancak son iş akışı ve public dosya doğrulamasıyla kesinleşir.

## V13 ile tamamlanan uygulama

Devir 01 stüdyosuna dört açıklama noktası eklenmiştir. Kumanda, üst çekmeceler, döner yan çalışma yüzeyi ve sabit depolama açıklamaları ilgili üç boyutlu parçalara bağlı olarak gösterilir. Bunlar fotoğraf üzerine sabit etiketler değildir.

Oda eni ve derinliği ile seçili masa düzeninin dış sınırını karşılaştıran görsel yerleşim yardımcısı eklenmiştir. Masanın ortalandığı varsayımıyla yanlarda ve önde/arkada kalan yaklaşık alanı gösterir. Sandalye hareketi, duvar eğriliği, kapı açılımı, tesisat, raflar, montaj toleransı veya çarpışmasız mekanik hareket hesaplanmaz. Sonuç imalat onayı değildir.

Devir karar rehberi, kullanım, depolama, yan yüzey ve teklif öncesi netleştirilecek motor, mekanizma, kablo ve numune konularını açıklar. Yeni donanım garantisi veya doğrulanmamış üretim kapasitesi vaat edilmez.

V12 C+ kullanım yönü düzeltmesi, gerçek yatay tam tur, altı kamera açısı, geçici oda gizleme, çift taraflı raflar ve ışıkları korunur. V11 müşteri notu ayrımı, model geçişi, tam mesaj önizlemesi, ölçü aktarımı ve arama korunur. Bu eski özellikler V13'te yeniden yapılmış gibi sayılmaz.

## Yayın için kapanış

Eski kabul testinde sabit kalan V12 başlık beklentisi V13'e güncellenir. İşlevsel doğrulamalar kaldırılmaz veya atlanmaz. Temiz kaynak derlemesi, birim testleri, çekirdek tip kontrolü, üç boyutlu etkileşimler, müşteri yolculukları ve ekran matrisi başarıyla geçmeden test edilen dosyalar yayın alanına alınmaz.

Uygulama yalnız `elif-tasarim/` altında yayımlanır. Kişisel kök `index.html` korunur. Canlı dosyalar yerel sürüm manifestiyle boyut ve SHA256 bakımından karşılaştırılır. Kaynak yolu tarihsel olarak `source-v12` kalmıştır, etkin paket ve derleyici V13'tür. Etkin komut `npm run build`, giriş `tools/build-v13.cjs` olur.

## İşletme ve veri sınırları

İletişim adı Yunus Usta, numara `+90 530 879 71 69`. WhatsApp bağlantısı alıcıyı ve metni hazırlar. Gönderim, okunma veya teslim onayı vermez. Müşteri notu ve fotoğrafı otomatik bir sunucuya kaydedilmez. Paylaşılabilir masa bağlantısı yalnız açık model seçeneklerini taşır.

Mevcut yayın noindex portföy ve konsept önizlemesidir. Ticari alan adı, yeni barındırma, ödeme, otomatik sipariş, kalıcı müşteri paneli, CRM, CMS, AR ve GLB/USDZ üretimi bu teslimde devreye alınmamıştır. Bunlara ait çalışan düğme veya tamamlanmış özellik iddiası yapılmaz.

Gerçek atölye numuneleri, yeni proje çekimleri, müşteri yorumları, mekanizma onayı ve ticari hizmet şartları işletme teyidi gerektirir. Referans markaların garanti ve taşıma kapasitesi Elif'e aktarılmaz.

## Testlerin yorumu

Birim test sayısı, tarayıcı kontrol grubu sayısı ve ekran birleşimi sayısı farklı ölçümlerdir. Birbirine eklenerek özellik sayısı çıkarılmaz. Tarayıcı testleri Chromium ve yazılımsal WebGL'dir. Gerçek telefon, Safari, Firefox, pil tüketimi, gerçek GPU veya erişilebilirlik sertifikasyonu kapsamı olarak sunulmaz.

Bu aşamada yeni özellik araştırması kapanmıştır. Sonuç mevcut kapsamın doğrulanmış yayını ve tekrar üretilebilir kaynak teslimidir.
