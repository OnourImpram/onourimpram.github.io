# Elif Tasarım V10. Çalışma kaydı

## Kapsam
V9 kaynak paketi temel alındı. GitHub main üzerinde okunan sürüm V8, commit 2b9ee083f56cd59eca049c627be7e79f40680c91. Kullanıcının onaylı tasarımını değiştirmeden gerçek davranış hatalarını giderme ve reklamdan gelen ziyaretçinin karar yolunu iyileştirme hedefi var. Yeni bir ödeme veya talep sunucusu kurulmuyor. Kişisel kök ana sayfa korunmalı.

## Başlangıç
V9 için npm test, 83 geçti. npm run build başarılı. Çıktı 43 rota, 173 manifest girdisi. Bu geçmiş iddiaya güvenmek değil, yeniden çalıştırılmış başlangıç kontrolüdür.

## Hata üretimi
V9'un değişmemiş taşınabilir HTML'i Chromium içinde çalıştırıldı. red-corrected/results.json ve red-complete/results.json kaynak davranışını kaydeder. Dolap kapağı yanlış yönde açılıyor. Akşam ışığı paylaşılmıyor. Kamera görünümü ile seçili düğme ayrışıyor. Dönüşü sıfırla işlemi etkin dönüş durumunu kapatmıyor. Görsel dışa aktarmada denetimli kodlayıcı hatası renderer boyutunu ve kamerayı geri yüklemiyor. Meşe seçimi formdaki seçeneklerle uyuşmuyor. Hatalı yükseklik, en alanında işaretleniyor. Yeni referans eski kategori ve URL'yi koruyor. Aynı rota üzerindeki ikinci arama ekrana geçmiyor.

Node oda testi, gizlenmiş kitaplıklara ait iki aktif noktasal ışığı gösterdi. İki statik HTML kontrolü, TV projesi ve 3D stüdyo için yanlış mutfak paylaşım görselini yakaladı.

## Test düzeltmeleri
İlk kapak probunda dönüş matrisi işareti yanlış hesaplandı. O ilk PASS geçerli kabul edilmedi. Sağ menteşeden negatif X yönüne uzanan panelde z=-x*sin(a) olduğundan serbest kenar +0.4*sin(a) ile yeniden sınandı ve V9 FAIL verdi. İlk malzeme probunun exact accessible-name seçicisi fazla dardı. Etiketi içeren gerçek select öğesiyle yeniden çalıştırıldı ve boş seçim görüldü. İlk çekirdek testin yükleyici yolu yanlış olduğu için o koşum ürün hatası sayılmadı. Aynı kaynak yükleyicisiyle tekrarlandığında dört yeni sözleşme beklenen biçimde başarısızdı. İlk V10 büyük çevrimdışı HTML yüklemesi 12 saniyelik test gezinme sınırında kaldı. Gezinme bütçesi 60 saniye yapıldı, etkileşim bekleme süreleri artırılmadı.

## Uygulama kararları
1. Kitaplık görünürlüğü kendi ışık görünürlüğünü de yönetir. Masa ile odanın fiyat veya üretim kapsamı aynı sayılmaz.
2. Işık tercihi normalize edilmiş stüdyo konfigürasyonuna katılır. Paylaşım URL'si yalnız izinli model parametreleri içerir.
3. Kamera görünümü veya görünümü sıfırla, dönüşü durdurur. Motor kamera/animasyon değişikliklerini UI'ya bildirir.
4. Snapshot geçici renderer ve kamera değişikliklerini try/finally ile geri alır. Çözünürlük sınırları açık. Bu yeni fiziksel mühendislik kontrolü değildir.
5. Yeni bir referansın kamuya açık kategori ve URL'si benimsenirken müşterinin notları ve ölçüleri korunur. Tekrar ziyaret eski varsayılan metni geri yazmaz.
6. Meşe ve ceviz tonları, formdaki mevcut ve temkinli malzeme seçeneklerine eşlenir. Görselden masif ağaç türü garantisi üretilmez.
7. Statik HTML ve istemci gezinmesi aynı sayfa metadata yardımcılarını kullanır. Özel sorgu girdileri kanonik adres veya JSON-LD'ye eklenmez.
8. Reklam deneyi başlatılmaz. WhatsApp'a doğrudan soru yolu ve sonrası açıklaştırılır. Gönderim kullanıcıya aittir.

## İnceleme sınırı
Bu çalışma ayrı modellerden oluşan bağımsız bir ekip denetimi değildir. Tam fiziksel çarpışma analizi, imalat, taşıma kapasitesi ve elektrik güvenliği doğrulanmış sayılmaz. Gerçek telefon testleri ve reklam dönüşüm verisi yoktur. Yeni sürümün yayın durumu ancak gerçek uzak işlem ve sonrasındaki testle raporlanacaktır.

## İkinci kök neden ve doğrulama
Malzeme eşlemesi düzeldikten sonra DOM probu, formdaki bazı option öğelerinin değerinin yine boş olduğunu gösterdi. Yüzey, malzeme, hazırlık aşaması ve yorumlama seçenekleri için açık value alanları eklendi. Altı select öğesinin seçili indeksleri ve görünen değerleri gerçek DOM'dan tekrar kontrol edildi. Sonuçlar select-details.json ve select-fixed.txt içindedir.

Yerel V10 birim ve derleme grubu 90 geçti. V9'un kabul protokolü yalnız sürüm kimliği ve kasıtlı kapak yönü beklentisi değiştirilerek çalıştırıldı, 32 kontrol geçti. İlk yeni regresyon grubunda 14 kontrol geçti, yeniden başlatma düğmesinin click çağrısı yazılımsal grafik ortamında 12 saniye sınırına takıldı. Bu kontrol geçmiş sayılmadı. Yalnız ağır yeniden başlatma click'i için 60 saniye bütçe tanımlandı. Yeni genel kabul için ayrı HTTP CI koşumu yapılıyor.

## Tamamlanan doğrulama
Temiz HTTP CI koşumunda 90 birim ve 15 yeni regresyon kontrolü geçti. Yayın commit cb8cf2af5f7044327dc4744014bc26baa53853a4. Canlı 15 kontrol, 86 doğrudan rota/ekran ve 172 dosya ile manifest eşleşmesi geçti. Yerel 258 matris ve üç metin büyütme probu geçti. Testler mesaj göndermedi.
