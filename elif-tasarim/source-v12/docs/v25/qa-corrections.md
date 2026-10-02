# V25 kontrol sırasında yapılan düzeltmeler

Baza görsellerinin gerçek 3:2 oranını bozan doğrudan img ölçülendirmesi düzeltildi. Açık ve kapalı görünümler ayrı dosyalarla sunuldu. JavaScript kapalıyken her iki görsele ulaşmak için açık dosya bağlantıları eklendi.

Dokuzuncu üretim kategorisinin masaüstünde tek başına alt satıra düşmesi düzeltildi. Kategori şeridi dokuz eşit sütuna geçti. Telefonda mevcut yatay kaydırma korundu.

Önceki mobil medya testi, etkin olmayan ve aria-hidden olarak işaretlenmiş açılış karelerinin de görünür olmasını bekliyordu. Bu, geçiş sisteminin tanımlı davranışıyla çelişiyordu. Kontrol yalnız .v232-scene[aria-hidden=true]:not(.is-active) karelerini dışlayacak biçimde düzeltildi. Etkin karelerin ve bütün normal içerik görsellerinin yüklenmesi ve görünürlüğü zorunlu kalmıştır. Kullanıcıya görünen bir hata testten çıkarılmamıştır.

İlk HTTP koşusunda yeni koleksiyon, 204 sayfa ve ekran genişliği birleşimi, mevcut proje akışları, e-posta ve kopyalama alternatifleri, açılış geçişleri ve 3D etkileşimleri geçti. Son kontroller düzeltmelerin ardından tekrar çalıştırılır. Ölçülen sonuçlar GitHub Actions kayıtları ve teslim raporundadır.
