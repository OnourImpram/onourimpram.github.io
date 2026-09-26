# Elif Tasarım V20. Nihai yayın kaydı

26 Eylül 2026.

## Yayın

Ürün kimliği v20-master-atelier. Paket sürümü 0.20.0. Ürün yayın commit'i cc44c9eb1679ec9c66cac6e72514fc835249ef14. Önceki ana dal 092c34722848d6927f4003033e6c4ba3d39bfff7 idi. Yalnız elif-tasarim alt ağacı yayımlandı. Kişisel kök index.html nesnesi 501229ef0c1d25dbc4554e27ca089b03e590c7e0 olarak korundu.

Ana site, https://onourimpram.github.io/elif-tasarim/
Devir 01, https://onourimpram.github.io/elif-tasarim/devir-01/
Stüdyo, https://onourimpram.github.io/elif-tasarim/tasarim-masasi/

## Tamamlanan ürün deneyimi

Devir 01'in ayrı ürün anlatısı ve Odak, Akış, Hareket başlangıçları. Gerçek 360 derece inceleme ve çift kitaplık. Geometriye bağlı dört detay noktası. Üç tasarıma kadar görselli karşılaştırma, aynı ayarları yeniden açma, konfigürasyon JSON dosyasını doğrulayarak içe alma. Yazarken ara değerleri kabul eden ve tamamlanan ölçüyü doğrulayan sayı alanları. Oda ile seçili masa dış sınırının dikdörtgen şemada karşılaştırılması. Grafik profilleri. Görselli yazdırma sayfası. Gerçek GLB ve USDZ dosyaları.

Karşılaştırma dosyasına kişisel not, adres, müşteri fotoğrafı veya oda ölçüsü eklenmez. Eski AR dosyası konfigürasyon değişince geçersizleştirilir. Dışa aktarımda oda, kitaplık ve sandalye geometrisi bulunmaz.

## Son düzeltme

390 piksel ekranda yüzde 200 metin büyütülünce uzun Türkçe rehber başlığı sütunundan taşıyordu. Ölçülen belge genişliği 392 pikseldi. Yalnız rehber başlıklarına gerektiğinde sözcük kırılmasına izin veren kural eklendi. Yazı küçültülmedi, içerik gizlenmedi ve mevcut test toleransı artırılmadı. Aynı hata önce yeniden üretildi, sonra kontrol geçti. Canlı metin büyütme testleri de başarılı oldu.

## Doğrulama

Yayın öncesi tam çalışma, https://github.com/OnourImpram/onourimpram.github.io/actions/runs/36236025943

Canlı tam çalışma, https://github.com/OnourImpram/onourimpram.github.io/actions/runs/36236697321

128 birim, geometri ve derleme testi geçti. İlgili çekirdek TypeScript modüllerinin strict kontrolü geçti. Bu, bütün JSX bileşenleri için tam semantik tip denetimi iddiası değildir.

Canlı adreste 15 V20 ürün ve dışa aktarım kontrol grubu, 25 müşteri kararı kontrol grubu ve 20 masa yönü ve 360 derece kontrol grubu geçti. Bunlar ortak işlevler içerebilir, 60 ayrı yeni özellik anlamına gelmez.

44 rota yedi ekran genişliğinde 308 birleşimde kontrol edildi. Ana sayfa, model formu ve stüdyo, 390 pikselde iki kat metin büyütme testini geçti. 179 public HTTP dosyası ile sürüm manifesti beklenen boyut ve SHA256 değerleriyle eşleşti. Manifestteki .nojekyll build girdisi ayrı tutuldu. 44 doğrudan sayfa adresi ve bilinmeyen adreste 404 yanıtı kontrol edildi.

Gerçek GLB ve USDZ örnekleri tarayıcıda üretildi. GLB geometri ve konsept metadata'sı, USDZ sahne ve doku girdileri kontrol edildi. Ek arşiv incelemesinde USDZ CRC bütünlüğü, sıkıştırmasız paketleme, 64 bayt hizalaması ve metre birimi doğrulandı.

Test edilen akışlarda yakalanmamış JavaScript hatası görülmedi. Gerçek WhatsApp mesajı veya telefon araması yapılmadı. Testler Chromium ve yazılımsal WebGL ortamındadır. Fiziksel telefon, Safari, Firefox, gerçek GPU performansı veya AR zemin ve ölçek doğrulaması yapılmış sayılmaz.

## İşletme sınırları

Yunus Usta adı ve +90 530 879 71 69 numarası korunur. Gerçek çalışma, montaj, konsept ve dış referans ayrımı devam eder. Noindex portföy önizlemesi korunmuştur. Yeni ücretli alan adı veya barındırma satın alınmamıştır.

Ödeme, CRM, CMS, kalıcı özel müşteri paneli, otomatik sipariş, kargo ve fatura sunucusu bu sürüme eklenmemiştir. Gerçek adres, numune, fiyat, garanti ve müşteri yorumu uydurulmamıştır. Masa geometrisi teknik üretim çizimi, motor güvenliği, yük veya çarpışma onayı değildir.

Bu son kayıt yalnız belgelemedir. Test edilen ürün kodu veya runtime manifesti yeniden değiştirilmez.
