# V21. İşletme bilgi ve devir listesi

## Doğrulanacak altı bilgi grubu

1. Marka alan adı ve alan adının sahipliği. Kendi alan adına ticari yayın ve önizlemenin ayrı tutulması kararı.
2. Gerçek işletme e-posta adresi, yanıt verecek kişi, ulaşılabilir saatler. Şu anki alıcısı boş e-posta taslağı bu bilginin yerini tutmaz.
3. Yeni atölyenin açık adresi, ziyaret kabulü, hizmet verilen ilçe ve keşif koşulları. Ev adresi veya müşteriye kapalı adres kendi kendine Google'a yayımlanmaz.
4. Google İşletme ve sosyal profil sahipliği, tam URL, mevcut yorumların yayımlama izni. Yeni hesap açılmış veya mevcut profil doğrulanmış sayılmaz.
5. Kuruluş yılı ve tamamlanmış iş istatistiği, gerçek fiyat veya başlangıç aralığı, teslim/garanti/ödeme ve iptal koşulları. Kanıt veya işletme onayı olmadan sayfa metnine alınmaz.
6. Yunus Usta'nın portresi, atölye videosu, gerçek malzeme numuneleri, müşteriye ait alanların fotoğraf izinleri. Kaynak dosya ve izin aynı projeyle ilişkilendirilir.

## İçerik toplama rutini

Her yeni projede bütün görünüm, iki çapraz açı, birleşim, açık çekmece veya kapak, donanım ve montaj sonrası görünüm toplayın. Tarih, kategori, görünür malzeme ve onaylı gerçek malzeme bilgisini ayrı kaydedin. Müşterinin evine ait tanımlayıcı unsurları yayımlamadan önce izin alın. Yorum, deneyim ve referanslar uydurulmaz. Müşteriye gönderilecek yorum talebi işletme onayıyla hazırlanır, bu sürüm otomatik mesaj göndermez.

## Kaynak ayarı

src/lib/site-profile.ts içindeki email, hours, address ve social alanları doğrulanmış bilgilerle güncellenebilir. Boş değerler müşteriye gerçek bilgi gibi gösterilmez. Adres onaylanınca LocalBusiness şeması buna göre üretilir. Doğrulanmış e-posta, özet akışında mailto alıcısına bağlanır. Destek ve yasal metinler gerçek iş modeline göre gözden geçirilir.

## Yayın komutları

npm run build. npm test. npm run typecheck:core. npm run verify:dist. npm run launch:check.

npm run launch:check -- --production komutu önizleme, eksik kurumsal iletişim veya indeks hazırlığı sürüyorsa başarısız olur. Bu bir ürün hatası değil, erken ticari yayın engelidir.

Ticari root kurulumunda BASE_PATH boş, SITE_URL onaylı HTTPS alan adı, INDEXABLE=1 ve COMMERCIAL_CONTENT_APPROVED=1 olmalıdır. Bu ayarlar tek başına eksik işletme verisini tamamlamaz. robots.txt host kökünde sunulmalı, sitemap.xml yeni alan adına göre üretilmelidir. Özel proje, arama ve müşteri taslak sayfaları site haritasına dahil edilmez.

GitHub Pages'deki /elif-tasarim/robots.txt dosyası, onourimpram.github.io host kökünün robots kurallarının yerine geçmez. Önizleme her sayfadaki noindex ile korunur. Noindex bir şifre veya erişim kontrolü değildir. Dosya ve kaynak erişimi hâlâ herkese açıktır, bu depoya müşteri kaydı konulmaz.

## Kurtarma kullanımı

Model formunun başındaki Fikrinize daha sonra devam edin alanını açın. Cihazda yedi gün sakla izni kapalıdır. Açınca sonraki metin ve ölçü değişiklikleri de aynı cihazda saklanır. Yenilemeden sonra kayıt otomatik uygulanmaz, Geri getir onayı gerekir. Fotoğrafları yeniden ekleyin. Cihaz iznini kaldırmak açık sekmedeki fikri silmez.

Taslak dosyasını indir ve aç seçenekleri kişisel JSON dosyası içindir. Bu dosya özel not içerir ve tasarım karşılaştırma JSON'undan farklıdır. Yanlış biçim, zararlı bağlantı ve fazla büyük dosya reddedilir. Proje kaydetmek, e-posta veya SMS uygulamasını açmak mesajın atölyeye gönderildiği anlamına gelmez.
