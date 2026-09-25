# V11. Onaylı planın 33 senaryo durum kaydı

25 Eylül 2026. Bu liste tamamlanmış ticari sistem veya bütün gerçek cihazlar için uygunluk iddiası değildir. Otomatik kontrolün hangi ortamda tamamlandığı, son test ve yayın raporunda belirtilir. Aynı senaryoyu iki ortamda çalıştırmak iki özellik sayılmaz.

| Kimlik | Senaryo | Durum | Kanıt veya açık sınır |
| --- | --- | --- | --- |
| A01 | Gerçek proje A, B, A | Uygulandı ve otomatik sınandı | acceptance.py, core.cjs |
| A02 | Dış kaynak A, B, A ve kişisel not | Uygulandı ve otomatik sınandı | acceptance.py, core.cjs |
| A03 | Dış referanstan atölye işine geçiş | Uygulandı ve otomatik sınandı | acceptance.py, source-context.ts |
| A04 | Sistem açıklaması ve müşteri notu ayrımı | Uygulandı ve otomatik sınandı | acceptance.py, core.cjs |
| A05 | Mutfak fikrinden Devir 01 kaynağına geçiş | Uygulandı ve otomatik sınandı | acceptance.py |
| A06 | 203 × 83 × 113 sahne, form, sahne | Uygulandı ve otomatik sınandı | acceptance.py, core.cjs. Aralık dışı form ölçüsü ayrıca görünür uyarı taşır. |
| A07 | Sayısal ve yaklaşık ölçü geçişi | Uygulandı ve otomatik sınandı | acceptance.py, core.cjs |
| A08 | cm, mm ve ondalık form değerleri | Uygulandı ve otomatik sınandı | core.cjs, acceptance.py. Ondalık imalat ölçüsü 3D görsel aralığına sessizce yuvarlanmaz. |
| A09 | Yeni tarayıcı bağlamında özel veri olmadan 3D paylaşımı | Uygulandı, ek tarayıcı kontrolü | followup.py, core.cjs |
| B01 | Ekran, WhatsApp, TXT ve ZIP aynı tam mesaj | Uygulandı ve otomatik sınandı | acceptance.py |
| B02 | Devir, 3D, çalışma masası ve yükseklik ayarlı aramaları | Uygulandı ve otomatik sınandı | acceptance.py, core.cjs |
| B03 | Gardrop ve gardırop varyantı | Uygulandı ve otomatik sınandı | acceptance.py, core.cjs |
| B04 | Konsept ve Pinterest aramasında tam hedef kartı | Uygulandı ve otomatik sınandı | acceptance.py. Dış içerik otomatik çekilmez. |
| B05 | Filtre, sorgu ve geri kaydırma konumu | Uygulandı, HTTP karşılığı ayrıca kontrol edilir | acceptance.py, followup.py |
| B06 | Projeye özel sabit WhatsApp başlığı, temiz URL ve alıcı | Uygulandı ve otomatik sınandı | acceptance.py |
| B07 | Uzun Türkçe özet ve dosya adı | Kısmen. Güvenli alternatif uygulandı | Uzun bağlantı yerine açık kısa giriş ve tam TXT/ZIP vardır. Gerçek telefon ile WhatsApp metin/ek teslimi bekliyor. |
| B08 | Sayfaya özgü açıklama ve noindex | Uygulandı ve otomatik sınandı | core.cjs, public_verify.py. Canlı doğrulama raporu ayrıca. |
| C01 | Mobilde masa ve yükseklik ayarını birlikte görmek | Uygulandı ve otomatik sınandı | acceptance.py, 320/360/390 CSS piksel |
| C02 | Tam ekran kontrol, çıkış adı ve odak | Uygulandı ve otomatik sınandı | acceptance.py. Tam ekran artık kontrol panelini de içerir. |
| C03 | Ekran yönü ve sanal klavye | Kısmen. Viewport değişimi sınandı | followup.py viewport simülasyonu. Gerçek sanal klavye ve fiziksel telefon testi bekliyor. |
| C04 | Klavyeyle sekme, raf ışığı, yükseklik ve kamera | Uygulandı, ek otomatik kontrol | acceptance.py, followup.py. Gerçek ekran okuyucu teyidi ayrı. |
| C05 | WebGL kaybında kullanılabilir iletişim ve özet | Uygulandı ve otomatik sınandı | acceptance.py kontrollü contextlost. Her fiziksel sürücü arızası simüle edilmez. |
| C06 | Üstten görsel yerleşim alanı | Uygulandı ve otomatik sınandı | Gerçek render geometrisinin zemin sınırı. 0/90/180 açıları acceptance.py. Mekanik veya insan dolaşım payı onayı değildir. |
| C07 | Azaltılmış harekette boşta çizim | Korundu, kontrollü gözlem | followup.py. Kuyruktaki son kare tamamlandıktan sonra boşta pencere. Donanım performans puanı değildir. |
| D01 | Gerçek iş ile konsepti doğru anlama | Sunum uygulandı, insan testi bekliyor | Kaynak rozetleri ve kavramsal sınırlar korundu. Müşteri anlama başarısı ölçülmedi. |
| D02 | Üç gerçek proje dosyasının anlaşılması | Kaynakla desteklenen içerik uygulandı | İhtiyaç soruları, görülen çözüm ve kapsam hazır. Asıl müşteri ihtiyacı, teknik ölçü, malzeme, tarih ve izin işletme teyidi bekliyor. |
| D03 | Tek formda kısa başlangıç ve isteğe bağlı ayrıntı | Uygulandı ve otomatik sınandı | acceptance.py. Eski /teklif-al adresi aynı taslağın ayrıntı girişi olarak korunur. |
| E01 | Mesajın gerçek telefondan gönderilip atölyede görülmesi | İnsan teyidi bekliyor | Yunus Usta ve numara kullanıcı beyanıdır. Test mesajı gönderilmedi. |
| E02 | Fotoğrafsız yazılı fikirle ilerlemek | Uygulandı ve otomatik sınandı | acceptance.py |
| E03 | Cihaz paylaşımını iptal etmek | Uygulandı ve otomatik sınandı | acceptance.py kontrollü AbortError. Sipariş veya teslim başarısı gösterilmez. |
| E04 | Ticari alan, barındırma ve gerçek işletme koşulları | Dış bağımlılık bekliyor | Mevcut Pages önizlemesi güncellenir. Yeni ticari alan/servis alınmadı. Adres, hizmet ve kullanım koşulları onaylanmadı. |
| F01 | Kişisel veri ve yanlış satış sayımı olmaması | Mevcut davranış otomatik kontrol edildi | Analitik/piksel yok. Ağ kontrolü acceptance.py. Yeni analitik ileride ayrı izin ve doğrulama ister. |
| F02 | Atölyenin gerçek talep, teklif ve iş takibi | İşletme uygulaması bekliyor | BUSINESS_HANDOFF.md ve kişisel verisiz şema yalnız uygulama taslağıdır. Gerçek veritabanı veya CRM kurulmadı. |

## Yeniden adlandırma

Etkin kullanıcı arayüzü, sayfa metadata’sı, alternatif metinler ve WhatsApp özetlerinde Yunus Usta kullanılır. Numara +90 530 879 71 69 olarak aynıdır. Tarihsel raporlar değiştirilmiş tarihçe gibi sunulmaz.

## Yayın yaklaşımı

V11, mevcut onaylı portföy önizlemesini günceller. Ticari barındırma koşulları, işletme teyitleri ve gerçek mesaj teslimi ayrı kapılar olarak kalır. İlk görüşme akışının çalışması için bu sürümde yeni ödeme veya ERP yazılımı kurulmadı.
