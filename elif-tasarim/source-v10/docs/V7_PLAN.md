# Elif Tasarım V7. Uygulama planı

24 Eylül 2026. Kullanıcının V6 reklam ve red team raporunu uygulama onayı esas alınır. Kullanıcının bu turda verdiği işletme telefonu +90 530 879 71 69.

## Sabit kapsam
Onaylı amblem, slogan, gerçek arşiv ve ayrı işaretlenen ilham görselleri korunur. Kişisel ana sayfa değiştirilmez. Müşteri notu, fotoğrafı ve iletişim bilgisi depoya, analitiğe veya paylaşılabilir sayfa adresine taşınmaz. WhatsApp açmak, mesajın teslim edildiğini kanıtlamaz. Sunucu kaydı ve ödeme yapılmış gibi gösterilmez.

## İş paketleri ve kabul

1. İletişim ve proje mantığı. `src/lib/project.ts`, `src/lib/upload.ts`, `tests/v7/unit.cjs`. Doğru alıcı, bellekte ortak taslak, URL başlangıç verisinin son girdiyi ezmemesi, gerçek cm/mm dönüşümü, dosya başlığı boyut denetimi, toplam yükleme bütçesi. Önce kırmızı test, sonra uygulama.
2. Kayıpsız kısa ve ayrıntılı talep. `BringModel.tsx`, `App.tsx`. Modelini Getir ve Özel Ölçü Stüdyosu tek veri modeli kullanır. Not, ilçe, referans ve görseller ileri geri geçişte korunur. Aynı sayfa yeniden yüklenince varsayılan olarak kişisel taslak saklanmaz. Alan bazlı erişilebilir hata ve net harici paylaşım açıklaması.
3. Keşif ve ilham dosyası. `PortfolioUI.tsx`, `Portfolio.tsx`, `V7Pages.tsx`. Gerçek iş, konsept ve Pinterest kayıtları ortak seçkide toplanır. Tüm sonuçlar aynı sorguyu sürdürür. Demo fiyat, sepet, ödeme ve panel kamusal gezinmeden çıkarılır, doğrudan eski rotalar da gerçek keşfe yönelir.
4. Karar desteği ve iletişim. Mutfak, kahve ve TV kategorileri gerçek fotoğraflı giriş, uygunluk soruları ve kapsam açıklaması alır. Varsayımsal fiyat, malzeme, garanti, iş bitiş süresi ve adres eklenmez. Telefon, WhatsApp, ulaşım öncesi teyit, bakım ve teklif kapsamı görünür olur.
5. Güvenlik ve okunabilirlik. Yükleme imzası ve ölçü ön denetimi, 20MP, 10MB tek dosya, 25MB toplam kaynak bütçesi, en fazla 5 dosya. HEIC için açık JPG/ekran görüntüsü alternatifi. Pinterest ilk istekten önce açıklanır. Mobil yazı büyütme, hedef boyutları, sekmeler ve odak test edilir.
6. Tek derleme. `tools/build-v7.cjs`. Temiz kaynak tek çıktı üretir. İçerik hashli JS/CSS, dosya manifesti, doğrudan statik sayfalar ve sayfaya özel metadata. Önizleme noindex kalır. Ticari indeksleme ancak onaylı alan adı ve koşullar ile ayrıca açılır.
7. Doğrulama ve teslim. Birim testleri, eski kusurları yeniden üreten tarayıcı testleri, mobil/masaüstü ekranlar, ayrı kaynak/yayın paketi, yayımlama betiği. GitHub bu oturumda yalnız okuma sunuyor. Canlı yayın değişikliği yapılmış olarak raporlanmaz.

## Açık kalan işletme işleri
Ticari barındırma bağlantısı, alan adı, yeni açık adres, fotoğraf kullanım izinlerinin belge kaydı, hizmet şartları, gerçek cihaz testleri ve sunucu temelli kayıt onayları eksik. Doğrudan telefon numarası kullanıcı beyanıyla yapılandırılabilir. Bağımsız hat sahipliği veya mesaj teslimi testi yapılmaz. Reklam/analitik varsayılan kapalı.

## Uygulama günlüğü

Mevcut V6 dosyaları ve red team bulguları karşılaştırıldı. Orijinal 43 test başlangıçta geçti. Yeni çekirdek sözleşmeleri önce başarısız oldu, uygulama sonrasında geçti. Son desk seed testinde geçmiş URL'nin son düzenlemeyi ezdiği özel durum yakalanıp düzeltildi. Seçki özetine Pinterest kaynak bağlantısını taşıma testi önce başarısız, sonra başarılı oldu. Yerel sunucunun `/elif-tasarim` mount eşlemesi için iki kırmızı test yazılıp düzeltildi.

Aktif üretim derlemesi tekleştirildi. Eski alternatif build dosyaları etkin paket araçlarından kaldırıldı. Eski para/ölçü saf fonksiyonları regresyon için korunur, demo Commerce/Catalog/Studio modülleri müşteri çalışma zamanına dahil değildir. 43 bağımsız HTML sayfası ve altı eski adres yönlendirmesi üretilir.

Son birim/derleme toplamı 67 başarılı test. Çekirdek strict TypeScript kontrolü başarılı. Çevrimdışı Chromium'da 14 kullanıcı akışı ve iki hata/ağ kontrolü başarılı. 43 rota, altı genişlikte 258 birleşim tamamlandı. Ana sayfa ve form yüzde 200 yazı büyütme stres probunda taşmadı. Manifestteki 152 dosya doğrulandı.

Bu sonuçlar çevrimdışı davranış ve yerel build için geçerlidir. Canlı adrese yayın yapılmadı. Numara doğru yapılandırıldı, gerçek hat sahipliği veya mesaj teslimi test edilmedi. Yeni sunucu ve analitik açılmadı. Sonraki işletme tamamlamaları `V7_AUDIT_STATUS.md` içinde açık tutulur.
