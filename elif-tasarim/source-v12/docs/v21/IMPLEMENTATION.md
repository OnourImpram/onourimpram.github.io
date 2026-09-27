# V21. Rapor odaklı güven ve süreklilik

27 Eylül 2026. Kullanıcı talebi, eklenen denetim raporlarını inceleyip mevcut Elif Tasarım sitesine uygun şekilde uygulamak.

Kaynaklar. elif-tasarim-gelistirme-raporu.pdf, 4 sayfa, özellikle 4 ve 6. bölümler. İkinci ek, önceki V12 gelişim değerlendirmesi. Teknik temel, main 5b7584153e6557142aca06ee9d52257d4a0b61c1 içindeki V20.

## Karar

Mevcut marka, gerçek iş ve konsept ayrımı, Yunus Usta iletişimi, Three.js, karşılaştırma ve dışa aktarım korunur. Rapor planı kullanıcı tarafından uygulanmak üzere verilmiştir. Yeni ücretli hesap, alan adı, otomatik mesaj, analitik servisi veya özel sunucu açılmaz.

1. V20 ile denetim bulgularını karşılaştır. SSS, rehberler, telefona erişim ve sayfaya özgü paylaşım görselleri zaten vardır. Bunları yokmuş gibi yeniden üretme.
2. Kişisel taslağı varsayılan olarak bellekte tut. Kullanıcı açıkça seçerse yalnız metin, model ve ölçüler için yedi günlük cihaz kurtarma kaydı oluştur. Yenileme sonrası geri yükleme ayrıca seçilir. Görseller dahil değildir. Dosyadan kurtarma doğrulanır. İzin olmadan depolama veya otomatik sunucu gönderimi yoktur.
3. Telefonu koru. SMS başlangıcı ve alıcısı açıkça belirtilen e-posta taslağı ekle. İşletme e-postası doğrulanmadığı için hayali alıcı yazma.
4. SSS'yi gerçek iş, bütçe, keşif, teslim, montaj, garanti ve ödeme sorularıyla genişlet. Onaylı işletme koşulu olmayan yerde kesin vaat değil görüşmede netleştirilecek kapsamı açıkla. Hizmet ve teklif rehberi ekle. Mevcut üç rehberi koru.
5. Sayfa, kuruluş, breadcrumb ve makale verisini tamamla. Doğrulanmış adres gelmeden Google için eksik LocalBusiness kaydı yayınlama. LocalBusiness geçişini doğrulanmış profil ile hazırla. noindex, production sitemap ve kök robots ayrımını test et.
6. İletişim, SSS ve rehberlere iç bağlantı ekle. Mobil, klavye, büyütülmüş metin, cihaz kaydı ve gerçek 3D regresyonlarını test et.
7. Yalnız elif-tasarim alt ağacını yayımla. Ana dal değişirse üzerine yazma. Canlı dosya bütünlüğünü ve yeni akışları tekrar doğrula.

## Test disiplini

Önce yeni sözleşmeler başarısız gözlenir, sonra uygulanır. V20 başlangıç testi 128 başarılıdır. Yerel ortamda HTTP tarayıcı gezinmesi ERR_BLOCKED_BY_ADMINISTRATOR ile engellenmiştir. Bu kısıt aşılmaya çalışılmaz. Yerel saf fonksiyon ve statik görünüm kontrolü, gerçek HTTP ve WebGL testleri için GitHub Actions kullanılır.

## Açık işletme girdileri

Onaylı alan adı, kurumsal e-posta, çalışma saatleri, yeni adres, harita ve sosyal hesap URL'leri, müşteri yayın izinleri, kuruluş yılı, gerçek fiyatlar, garanti ve keşif koşulları. Bunlar yazılımla doğrulanmış sayılmaz.
