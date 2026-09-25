# Elif Tasarım. V10 sonrası öncelikli geliştirme planı

25 Eylül 2026. Durum, inceleme sonucundan türetilmiş öneri planı. Henüz uygulanmadı.

## 1. Amaç

Müşterinin gerçek bir işi veya Devir 01 konseptini keşfetmesini, seçenekler arasında karar değiştirmesini ve doğru bilgilerle Yusuf Usta’ya ulaşmasını güvenilir hâle getirmek. Mevcut sanatsal kimliği, gerçek portföyü ve çift raflı Three.js deneyimini korumak. Gereksiz yeni sistemleri öne almamak.

Dayanak, aynı tarihli Derin Red Team Raporu, RT01 ile RT25 kayıtları ve audit kanıtları. Esas alınan sürüm `cb8cf2af5f7044327dc4744014bc26baa53853a4`. Uygulama başlamadan önce uzak sürüm yeniden okunmalı. Bu planın hazırlanması uygulama veya yayın izni değildir.

## 2. Korunacak sınırlar

Onaylı amblem ve Zamana değer katan mobilyalar başlığı korunur. Gerçek iş, montaj, konsept model ve dış referans ayrımı korunur. Konsept modelleri bitmiş iş olarak gösterilmez. Yusuf Usta’nın kullanıcı tarafından sağlanan numarası `+90 530 879 71 69` olur, bağımsız mesaj teslimi henüz doğrulanmış sayılmaz.

Müşteri notu, ev fotoğrafı ve tam adres paylaşılabilir herkese açık tasarım URL’sine konmaz. WhatsApp açılması, mesajın gönderildiği veya siparişin alındığı anlamına gelmez. Fiziksel masa kapasitesi, garanti, elektrik güvenliği ve imalat uygunluğu doğrulanmadan vaat edilmez. Kişisel ana sitenin kök dosyaları kapsam dışıdır.

## 3. Altı paketlik yol haritası

| Sıra | Paket | Öncelik | Bağımlılık | Sorumlu | Göreli efor |
| --- | --- | --- | --- | --- | --- |
| A | Tek ve kaynakları ayrılmış proje durumu | P1 | Yok | Ön yüz, Three.js, QA | Büyük |
| B | Tam kontrol ekranı, arama ve iletişim bağlamı | P1 | Özet için A, arama paralel olabilir | Ön yüz ve içerik | Orta |
| C | Mobil ve tam ekran 3D kullanılabilirliği | P2, özel masa için yüksek değer | A, onaylı kısa arayüz tasarımı | UX, Three.js, QA | Orta |
| D | Sade bilgi mimarisi ve gerçek proje dosyaları | P1/P2 | Yusuf Usta içerik teyidi | Onur, Yusuf Usta, içerik/UX | Orta |
| E | Ticari yayın ve gerçek görüşme koşulları | P0 açılış kapısı | İşletme bilgisi, uygun barındırma | İşletme, yayın/veri sorumlusu | Dış bağımlılıklı |
| F | Gerçek cihaz kalite kontrolü ve ölçümlü pilot | P1/P2 | A, B, E. C kapsamı ayrıca | QA, reklam ve atölye | Orta |

Eforlar bütçe veya gün taahhüdü değildir. Uygulayıcının mevcut kodu, test ortamı ve işletmeden gelecek bilgiye göre tahmin etmesi gereken büyüklüklerdir.

## 4. Paket A. Proje, kaynak ve 3D aynı kararı taşımalı

### Çözülecek kayıtlar

RT01, RT02, RT03, RT05. Bunlar tek bir uygulama oturumunda farklı karar kaynaklarının karışmasıyla ilgilidir.

### Tasarım kararı

Mevcut `projectStore`, notu hem sistem önerisi hem kullanıcının kendi açıklaması için kullanıyor. `DeskExperience` ise formun dışında kendi konfigürasyonunu kuruyor. Planlanan modelde kaynak ve kullanıcı metni ayrılmalı.

Önerilen alanlar, mevcut kodun içinde var oldukları iddiası değildir. `draftId` ve `revision`, etkin proje kimliği ve değişim sırası. `sourceRef`, gerçek proje, konsept, Pin veya dış URL kimliği. `systemPrefill`, seçilen kaynağın ürettiği açıklama. `customerNote`, kullanıcının kendi metni. `studioConfig`, Devir 01 ölçü, malzeme ve konfigürasyonu. `measurements`, birim, değer, kesinlik ve kaynağı. Ek ilham kayıtları etkin ürün kaynağından ayrı tutulur.

Üç kullanıcı eylemi açıkça ayrılmalı. Yeni modelle başla. Mevcut projeme ilham ekle. Mevcut projeyi düzenle. Daha önce ziyaret edilmiş olması bir modeli yeniden seçmeyi engellememeli. Kullanıcının yazdığı özel not, yeni model seçildi diye sessizce silinmemeli. Buna karşılık otomatik mutfak açıklaması, masa talebinin özel notu sanılarak korunmamalı.

### İlgili mevcut dosyalar

`src/lib/project.ts`, `src/pages/BringModel.tsx`, `src/components/DeskExperience.tsx`, `src/lib/desk-v8.ts`. Referans oluşturan bağlantılar için `src/pages/Portfolio.tsx` ve `src/pages/V7Pages.tsx`. Dosya adının eski sürüm taşıması tek başına hata değildir, yalnız çalışma yeri belirtir.

### Ölçü yaklaşımı

Sayısal ölçüler tek kanonik birimde tutulabilir. Görüntüleme ve kullanıcı girdisi cm veya mm olabilir. Yaklaşık olma, sayıyı başka bir kaynaktan geri almak değil, kesinlik özelliğidir. Serbest metin ölçü desteklenecekse sayısal ölçüyle çatışma durumu görünür olmalı. Atölye keşfiyle onaylanmış üretim ölçüsü ayrı statüdür.

### Çıkış koşulu

A→B→A, dış referans→atölye işi, mutfak→masa, masa→form→masa, kesin→yaklaşık→kesin ve kaynaklı→kaynaksız senaryoları tutarlı. Özel notlar ve hazırlanmış görseller dahili gezinmede korunuyor. Açık sıfırlama dışında varsayılan masa özel tasarımın üzerine gelmiyor. Paylaşım URL’si yalnız herkese açık konfigürasyonu içeriyor.

## 5. Paket B. Müşterinin gördüğü ile gönderdiği aynı olsun

### Çözülecek kayıtlar

RT04, RT06, RT07, RT10, RT14, RT21.

### Tam mesaj önizlemesi

Son ekrandaki kontrol bileşeni, WhatsApp metni ve TXT/ZIP özeti tek bir özet tarifinden üretilmeli. Kartın başında seçili model, kaynak türü ve küçük görsel. Devamında ölçü, malzeme, yüzey, kullanım, bölge, zaman ve yaklaşım. Uzunsa ayrıntılar açılabilir, fakat hiçbir gönderilen alan önizlemeden tamamen kaybolmamalı.

Görsellerin mesaj bağlantısına otomatik eklenmediği uyarısı korunur. Dosya paylaşımı, alıcı seçimi ve ZIP gönderimi ayrı eylemler olarak açıklanır. İptal edilen paylaşım teslim sayılmaz. Uzun Unicode mesajlarda oluşturulan URL ve metin kesilmesi gerçek telefonlarda sınanır.

### Arama kapsamı

`src/lib/selections.ts` ve birleşik arama sayfasına Devir 01, yükseklik ayarlı masa, çalışma masası ve 3D stüdyo gibi sayfa/yetenek kayıtları eklenmeli. Gardrop ve gardırop gibi sınırlı yazım varyantları normalize edilmeli. Sonsuz eş anlam veya yapay zekâ arama servisi gerekmiyor.

Sonuç kaydı yalnız bir sayfaya değil, ilgili karta veya modele gitmeli. Konsept ve Pin aramasında genel galeriye açıldığında hedef kart görünür hâle getirilmeli. URL hedef parametresi izin verilen kayıt kimliğinden oluşturulmalı, dışarıdan gelen sınırsız CSS seçicisi çalıştırılmamalı.

Geri gezinmede arama, filtre ve kaydırma konumu korunmalı. Ana sayfaya bilinçli yeni gezinme ile tarayıcı geri hareketi aynı işlem sayılmamalı.

### İletişim ve metadata

Sabit WhatsApp eylemi gerçek proje sayfasında o projenin başlığını ve temiz adresini taşımalı. Genel sayfada genel mesaj kullanılabilir. Kişisel taslak bilgisi açık kullanıcı niyeti olmadan URL veya analitiğe eklenmez.

13 ortak meta açıklaması sayfaya uygun hâle getirilmeli. İndeksleme politikası değişmez. Önizleme noindex kalır, üretime geçiş E paketinin kararıdır. Kanonik ve sosyal paylaşım hedefleri gerçek yayın alan adına göre tekrar kontrol edilir.

### Çıkış koşulu

Mesaj önizlemesi paylaşılacak bütün alanları içerir. Dört masa araması doğru modele gider. Gardrop ve gardırop aynı anlamlı sonucu verir. Pin araması aynı kaydı açar. Geri hareket liste konumunu korur. Önemli sayfaların açıklamaları birbirinin kopyası değildir.

## 6. Paket C. 3D deneyimin kalite hedefi, her kontrolün sonucunu görmek

### Çözülecek kayıtlar

RT08, RT09, RT16, RT23.

### Mobil düzen

390 piksel örneğinde y1471’deki yükseklik kontrolünü değiştiren kişinin üstteki masayı yeniden aramaması gerekiyor. Önerilen tasarım, kullanıcının stüdyo içinde çalıştığı süre boyunca kompakt sahne ve yanında ya da hemen altında tek aktif kontrol paneli. Klavye açıldığında form eylemini kapatmamalı. Sabit telefon/WhatsApp katmanı kontrol panelinin üzerine binmemeli.

Masa, Ölçü ve Mekân ayrımı korunabilir. Geniş dekor seçenekleri başlangıçta açık olmak zorunda değil. İlk görünümde yükseklik, malzeme ve yerleşim temel eylemleri. Raf ve ışık seçenekleri isteğe bağlı Mekân bölümünde. Kullanıcının istediği çift raflı sanat yönü kaldırılmaz.

### Tam ekran kararı

Ya tam ekrana kompakt yükseklik ve malzeme çekmecesi eklenir ya da eylem yalnız görüntüleme olarak adlandırılır. İki seçenekten biri onaylanmalı. Aktif tam ekran için çıkış düğmesi doğru etiketlenir. Escape, ekran yönü değişimi ve odak dönüşü kontrol edilir.

### Odaya sığma

Üstten görünümde ana tabla, sabit dolap ve döner yüzeyin birlikte kapladığı alan gösterilmeli. Mekanik uygunluk doğrulanmadan gerçek çarpışma güvencesi verilmemeli. Prototip onayı bekleyen değerler “görsel yerleşim” diye belirtilir. Masa ile kitaplık ve dekorun kapsamı ayrı kalır.

### Test maliyetini artırmadan performans

Zaten isteğe bağlı yükleme ve azaltılmış harekette bekleme davranışı var. Bunlar korunmalı. Yeni otomatik animasyon eklemek yerine gerçek telefon ölçümünden ihtiyaç belirlenmeli. Düşük donanımda ürün görünümü, düşük piksel oranı veya poster alternatifi gerektiğinde devreye girebilir. Bu kararlar ölçüm olmadan rastgele cihaz engelleme kurallarıyla verilmez.

## 7. Paket D. Az ama derin içerik

### Çözülecek kayıtlar

RT11, RT12, RT13, RT15, RT19 ve RT17’nin içerik bölümü.

### Önerilen bilgi mimarisi

Çalışmalar, Üretim Alanları, Kendi Modeliniz, Devir 01 Stüdyosu, Atölye, İletişim. Bu öneri kesin menü adı kararı değildir. “Hakkımızda” ve “Atölye” gerçekten farklı bilgi taşıyorsa ayrı kalabilir. Aynı aile anlatısını tekrar ediyorsa birleştirmek sınanmalı. Logo ana sayfaya döndürüyorsa ayrıca ana sayfa menüsü gerekliliği gözden geçirilebilir.

Teklif al ve modelini getir yolları aynı proje deneyiminin farklı girişleri olabilir. Farklı ad kullanılıyorsa sonraki beklenti açık olmalı. Eski adresler kırılmadan yeni akışa yönlendirilir. Sırf sayfa sayısını azaltmak için mevcut yararlı rehberler silinmez.

### Ana sayfa sadeleştirme hipotezi

Açılışta şiirsel sloganla birlikte bir cümle somut hizmet. Ardından gerçek projeler. Bir kategori keşif alanı. Kısa ustalık ve süreç. Devir 01 stüdyosuna davet. Tek açık iletişim kapanışı. İlham modelleri kendi sayfasında kapsamlı kalabilir.

Bu, “ideal ana sayfa altı bölüm olmalı” kuralı değil. Aynı kararı tekrar ettirmeyen ilk test önerisi. Başarı, kaydırılan piksel değil, ilgili işi bulma ve doğru sonraki adımı seçme.

### Üç gerçek proje dosyası

Başlangıç için mutfak, kahve köşesi ve TV ünitesi. Her birinin editoryal ismi, hangi ihtiyacı karşıladığı, gerçek uygulama fotoğrafları, görünen çözüm ve işletmenin onayladığı teknik bilgiler. Malzeme, ölçü, donanım, tarih ve yer doğrulanmadıysa uydurulmaz. Fotoğraf hak sahibinin ve kullanım kapsamının kaydı tutulur. Konseptler ayrı kalır.

Örnek içerik şablonu. Müşterinin ihtiyacı. Mekân kısıtı. Ustanın çözümü. Yakın çekim ayrıntısı. Kapsama dahil olan ve ayrıca değerlendirilen işler. Benzer ihtiyaç için hazırlık sorusu. Bu yapı proje başına yeniden yazılır, aynı genel metin tüm projelere kopyalanmaz.

### Uyarı katmanları

Konsept/gerçek iş etiketini görünür tut. WhatsApp düğmesinin yanında kısa paylaşım açıklaması. Ayrıntılı bellek, saklama ve dış servis metnini kolay açılır bölümde göster. Ticari altyapı gelmeden otomatik teslim veya sipariş varmış gibi davranma.

## 8. Paket E. Ticari açılışın koşulları

### Çözülecek kayıtlar

RT17, RT18, RT20 ve RT24’ün gerçekten etkinleştirilecek bölümü.

Yusuf Usta’nın hizmet bölgesi, yeni adresinin ziyaret biçimi, iletişim düzeni ve ilk değerlendirme süreci işletme tarafından onaylanmalı. Rastgele saat, kesin teslim günü, ücretsiz keşif veya garanti süresi yazılmamalı.

Ticari barındırma ve işletme alan adı, platform kullanım koşullarıyla birlikte seçilmeli. GitHub kod ve test deposu kalabilir. Noindex veya siteye önizleme yazmak ticari kullanım koşulundan muafiyet değildir. Kök kişisel site ayrı tutulur.

İlk hizmet vitrini telefon ve WhatsApp üzerinden çalışabilir. Bunun için ödeme sunucusu zorunlu değil. Ancak gerçek bir telefondan hazırlanan mesajın Yusuf Usta’nın doğru görüşmesinde açılması, kullanıcı tarafından gönderilmesi ve atölyenin aldığını teyit etmesi sınanmalı. Bu insan teyidi audit içinde yapılmadı.

Sunucu üzerinden talep kaydı eklenecekse gerçek başarı, kalıcı kayıt alındıktan sonra gösterilmeli. Fotoğraflar özel depoda tutulmalı. İzinli kişi ve süreli erişim, silme ve başarısız bildirim durumu test edilmeli. URL otomatik okunacaksa özel ağ erişimi ve dış içerik talimatları ayrı tehdit modeli altında kalmalı. Bütün bunları aynı sürüme zorla dahil etmek yerine, hangi iletişim modeli kullanılacağı önce seçilmeli.

## 9. Paket F. Test kalitesi ve ölçümlü müşteri edinimi

### Çözülecek kayıtlar

RT22, RT23, RT25.

Mevcut 90 test tutulur. Buna karar döngüleri, hata toparlanması ve kaynak değişimleri eklenir. “43 sayfa açılıyor” farklıdır, “bir müşteri beş seçimden sonra doğru talebi hazırlıyor” farklıdır.

Gerçek iPhone/Safari ve Android/Chrome, masaüstü Firefox, klavye kullanımı, en az bir ekran okuyucu ve düşük bellekli cihaz sınaması yapılmalı. 3D yüklenmese bile model bilgisi ve iletişim eylemi kullanılabilir kalmalı. Metin büyütme, ekran yönü, tam ekran, sanal klavye ve geri gezinme dahil edilmeli.

İlk reklam pilotunda tek kategori, ilgili gerçek proje ve tek eylem hipoteziyle başlamak daha yorumlanabilir sonuç verir. Aynı anda slogan, fiyat, galeri, form ve hedef kitle değiştirilmemeli. Önceden hesaplanmış dönüşüm artışı yüzdesi yoktur.

Görüşme, nitelikli talep, teklif ve kabul edilen iş atölye kaydıyla ayrılır. WhatsApp tıklaması yalnız açılış sayılır. Serbest not, telefon, adres ve fotoğraf analitik parametresi olmaz. Kaynak kategori ve temiz sayfa kimliği yeterliyse daha fazlası toplanmaz.

## 10. Gelecek kabul senaryoları

**Aşağıdaki 33 senaryo planlanmıştır. Bu belgede yeni sürüm üzerinde çalıştırılmış veya geçmiş gibi sunulmaz.** Mevcut hataları sınayanlar önce değişmemiş V10 üzerinde beklenen hatayı göstermeli, daha sonra düzeltme üzerinde geçmelidir.

| Kimlik | Senaryo | Beklenen sonuç |
| --- | --- | --- |
| A01 | Gerçek mutfak A, TV B, mutfak A | Son kategori, kaynak ve özet A. |
| A02 | Dış bağlantı A, B, A | Son URL A, kullanıcının özel notu korunmuş. |
| A03 | Dış referans, sonra atölye işi | Eski dış URL etkin kaynakta kalmıyor. |
| A04 | Otomatik A açıklaması, sonra B | Sistem açıklaması B, kullanıcı metni ayrı. |
| A05 | Mutfak taslağı, sonra Devir 01 | Tek açık niyet veya ayrı proje. Mutfak URL’si masa mesajına örtülü girmiyor. |
| A06 | 203 × 83 × 113 masa, form, stüdyo | Aynı ölçüler, malzeme ve yerleşim geri geliyor. |
| A07 | Kesin ölçü, yaklaşık, kesin | Sayı değişmiyor veya çatışma açıkça seçiliyor. |
| A08 | cm, mm, cm ve ondalık giriş | Fiziksel ölçü korunuyor. |
| A09 | Yeni sekmede paylaşım bağlantısı | Yalnız ortak konfigürasyon geliyor, özel not yok. |
| B01 | Malzeme, yüzey ve kaynak değiştir, özete git | Mesaj önizlemesi bütün alanlarla aynı. |
| B02 | Devir, 3D, çalışma masası, yükseklik ayarlı ara | Doğru stüdyo veya ürün kaydı bulunuyor. |
| B03 | Gardrop ve gardırop ara | Anlamlı sonuç tutarlı. |
| B04 | Belirli Pin ve konsept arama sonucu | Aynı kart görünür ve vurgulu. |
| B05 | Filtreli listede aşağı kaydır, detay, geri | Filtre, sorgu ve konum korunuyor. |
| B06 | TV projesinin sabit WhatsApp eylemi | İlgili proje adı, temiz URL ve doğru alıcı. |
| B07 | Uzun Türkçe not ve dosya adları | Gerçek telefonda mesaj kesilmesi veya bozuk kodlama yok, aksi durumda alternatif. |
| B08 | 13 genel metadata sayfası | Doğru ve sayfaya özgü açıklamalar, noindex politikası korunmuş. |
| C01 | 390 ve 360 pikselde yükseklik değiştir | Masa ve etkin kontrol birlikte görülebiliyor. |
| C02 | Tam ekran aç ve kapat | İşlev adı, görünür araçlar ve odak tutarlı. |
| C03 | Sanal klavye, ekran yönü değişimi | Eylemler kapatılmıyor, ölçü girişi kaybolmuyor. |
| C04 | Klavyeyle raf, ışık, yükseklik ve kamera | Etiket, seçili durum ve sonuç eşleşiyor. |
| C05 | 3D yüklenmiyor veya WebGL kaybı | Poster, model özeti ve iletişim kullanılabilir. |
| C06 | Geniş/dar masa ve yan tabla açıları | Görsel yerleşim ölçüsü açık. İmalat güvencesi verilmez. |
| C07 | Azaltılmış hareket ve görünmeyen sahne | Gereksiz sürekli animasyon yok, son durum doğru. |
| D01 | Yeni kullanıcı gerçek işi ve konsepti ayırır | Kaynaklar doğru anlaşılır. |
| D02 | Mutfak, kahve ve TV projesini anlatır | İhtiyaç, çözüm ve kapsam anlaşılır. |
| D03 | Kısa fikirden isteğe bağlı ayrıntıya geçer | Gereksiz yeniden giriş yok, aynı taslak. |
| E01 | Gerçek cihazda WhatsApp mesajı | Kullanıcı gönderir, doğru atölye aldığını teyit eder. |
| E02 | Fotoğrafı olmayan müşteri | Fikir ve görüşmeyle ilerleyebilir. |
| E03 | Kullanıcı paylaşımı iptal eder | Teslim veya sipariş başarısı gösterilmez. |
| E04 | Ticari alan adı, doğrudan URL, 404 ve gizlilik | Onaylı yayın davranışı, doğru alan ve başlıklar. |
| F01 | Analitik olay incelemesi | Tıklama talep/satış sayılmıyor, kişisel veri yok. |
| F02 | İşletme talep ve teklif takibi | Nitelik, yanıt ve iş sonucu ayrı kaydediliyor. |

## 11. İlk yayın kararının kanıtı

İlk zorunlu kapanışlar A01–A08, B01–B06 ve gerçek iletişim E01/E03. D paketinde en az ilk gerçek proje dosyaları ve işletme kapsamı onaylı olmalı. C paketinde mobil ana kontrol ile sahne eşzamanlı kullanılabilmeli. E paketinde barındırma koşulu açık olmalı.

Bu koşullar tamamlanmadan siteyi “hatasız”, “reklama kesin hazır” veya “tam güvenli” ilan etmek doğru değil. Daha sonraki iyileştirmeler için kontrollü kapsam kalabilir. Başarısız bir test yayıma rağmen kapanmış olarak işaretlenmez.

## 12. Uygulama dışı tutulanlar

Bu plan yeni AI konsept üretmiyor, müşteri fotoğraflarını dönüştürmüyor, yeni alışveriş/ERP sistemi kurmuyor, ödeme entegrasyonu satın almıyor, işletme adresi veya çalışma saati tahmin etmiyor, reklam kampanyası açmıyor. Kaynak kodu ve yayın paketi değiştirilmedi.

Sonraki uygulayıcıya verilecek temel karar şu. **Önce aynı projenin bütün ekranlarda aynı anlama gelmesini sağla. Sonra daha fazla şey eklemek yerine müşterinin kararını kolaylaştır.**
