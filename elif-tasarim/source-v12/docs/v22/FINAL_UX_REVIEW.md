# V22 son UX inceleme kaydı

## İnceleme tabanı

V21 main c6d3561958069448f2c929e421bc987fede3b50a. E-posta kullanıcı mesajından alınmıştır. Önceki V22 dalında yalnız bozulmuş ve tamamlanmamış kod taşıma parçaları vardı. Kod olarak çalıştırılmadılar. Korunmuş V21 kaynağı yeniden kurulup yeni değişiklikler ayrı dalda hazırlanmıştır.

## Yeniden üretilen ve düzeltilenler

Yeni sözleşmeler önce yedi beklenen hata verdi. E-posta, schema, ilham dosyası ve yedek iletişim bunlardan sonra eklendi. Ek hata, kopyalama devam ederken metin değişince düğmenin bekleme durumunda kalmasıydı. Geciktirilmiş pano testi bu durumu önce başarısız, düzeltmeden sonra başarılı gösterdi.

390 piksel yerel görüntüde genel sabit iletişim çubuğu, aynı akışın özel proje mesajından bağımsız ikinci bir WhatsApp yolu sunuyordu. Başa dön düğmesi ise kopyalama satırına bindiriliyordu. Yönlendirilmiş form ve kolay iletişim sayfasında bu iki tekrar kaldırıldı. Telefon ve alternatifler sayfa içinde ve altbilgide korunur.

Yeni Kolay iletişim rotası eklendiği için deterministik rota sayısı 45 yerine 46 olarak güncellendi. Eski testin mailto seçicisi artık iki meşru bağlantıyla karşılaşıyordu, tam proje mesajını taşıyan düğmeye daraltıldı. Davranış ve alıcı doğrulaması korunmuştur. Test toleransı artırılmadı.

## Yerel ortam sınırı

Yönetimli yerel Chromium, localhost HTTP gezinmesini ERR_BLOCKED_BY_ADMINISTRATOR ile engelliyor. Çevrimdışı HTML üzerinden görsel ve odak incelemesi yapılabilir, fakat bu HTTP veya gerçek cihaz performansı olarak raporlanmaz. Yayın kapısı GitHub Actions içindeki gerçek HTTP Chromium kontrolleridir. Sabit genel iletişim öğeleri kaldırıldıktan sonra yerel gerçek fare tıklamasıyla da son özet adımı açıldı.

## Doğrulama ilkesi

149 birim ve derleme testi yerel ortamda geçti. Bu sayının yanında son staging ve canlı çalışma kimlikleri teslim raporunda ayrıca kaydedilir. Pano reddi ve harici bağlantı seçimi özel test profilinde taklit edilir. Hiçbir test e-posta veya WhatsApp mesajı göndermez. Gerçek telefon, Safari, Firefox ve AR yerleşimi test edilmiş sayılmaz.

## Son ölçülmüş yeniden akış düzeltmesi

İlk HTTP çalışması yeni e-posta, kopyalama reddi, son iletişim adımı ve ilham dosyası işlemlerini geçti. Metinler iki kat büyütülünce iletişim bilgisinin ikinci gösterimindeki e-posta satırı 390 piksel ekranda 559 piksele taştı. DOM incelemesi, sınıfsız ikinci mailto bağlantısını saptadı. Tüm e-posta bağlantılarının sözcük kırılması sağlandı. Kolay iletişim ve ilham dosyası sayfalarında büyütülmüş uzun Türkçe başlıkların min-content genişliği 432 ve 500 piksel oldu. Başlıkların gerektiğinde kırılmasıyla üç sayfa da yerel yeniden üretimde 390 piksele döndü. Metin küçültülmedi, overflow hidden kullanılmadı, test toleransı artırılmadı. Tam HTTP kontrolleri aynı koşullarla yeniden çalıştırılır.
