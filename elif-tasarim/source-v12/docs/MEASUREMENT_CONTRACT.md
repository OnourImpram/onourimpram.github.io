# Elif Tasarım. Gelecek ölçüm ve talep sözleşmesi

Bu belge etkin bir analitik entegrasyonu değildir. V7 analitik veya reklam pikseli yüklemez.

## Olay sınırları

`view_work` yalnız izinli genel proje kimliği taşır. `view_category` genel kategori kimliğidir. `start_project` form başlangıcıdır. `whatsapp_open` harici uygulamaya geçiştir, teslim veya satış değildir. `local_export` yerel dosya üretir, işletmeye talep sayılmaz. `native_share_open` cihaz paylaşım diyaloğudur, müşteri alıcısını veya mesaj teslimini kanıtlamaz.

`generate_lead` ancak sunucunun kalıcı kayıt oluşturup kabul numarasını döndürdüğü bir gelecekteki işleme bağlanabilir. WhatsApp üzerinden gelen müşteriyle işletme tarafındaki CRM kaydı ayrı yapılabilir. `qualify_lead`, `working_lead`, `close_convert_lead` yalnız insan tarafından doğrulanmış iş aşamalarından üretilir. Aynı olay benzersiz işlem kimliğiyle idempotent sayılmalıdır. Kabul edilen işin katkısı muhasebe verisine dayalı olmalıdır, serbest metinden veya site tıklamasından tahmin edilmez.

## Yasak parametreler

Telefon, e-posta, kişi adı, açık adres, ilçe serbest metni, özel proje notu, fotoğraf, dosya adı, serbest model URL'si, tam sayfa query/hash ve mesaj gövdesi analitik parametresi olmaz. İzinli alanlar kapalı listeyle kategori/proje kimliği ve genel arayüz eylemleridir. Gizlilik açıklaması, hukuki dayanak, saklama ve sağlayıcı ayarları onaylanmadan istemci gönderimi açılmaz.

## Gelecek sunucu kabulü

Gönderim yalnız sunucuda doğrulanır. Rate limit, boyut/piksel/imza denetimi, güvenli yeniden kodlama, özel obje deposu, müşteri erişim denetimi, süreli indirme, silme/saklama süresi ve bildirim kuyruğu gerekir. Özel ağlara URL fetch ve dış referans üzerinden komut yürütme kapalı olmalıdır. Bildirim başarısızlığı müşteri talebini silmemeli. Yeniden deneme aynı kabul numarasını korumalı. Ağ ve yetki hataları başarı diye gösterilmemeli.

## Ticari ölçüm

Kanal, kategori, uygun talep başına maliyet, görüşme zamanı, teklif zamanı, kazanılan iş, iptal nedeni ve iş başına gerçek katkı birlikte değerlendirilir. Kapasiteyi aşan çok sayıda niteliksiz talep tek başına başarı değildir. A/B kazancı veya dönüşüm oranı hedefi bu veri gelmeden iddia edilmez.
