# V26 uygulama kararı

3 Ekim 2026. Mevcut repo `OnourImpram/onourimpram.github.io`, üretim dalı `main`, yayın yolu `elif-tasarim/`. Ayrı klon ve `elif-v26-evidence-and-discovery` dalında çalışılıyor. Kök siteye veya MARSAM'a dokunulmaz. Kullanıcının özerk uygulama ve yayın talimatı gereği ara tasarım onayı beklenmez.

## Amaç ve sınırlar

Gerçek işleri gösteren aile atölyesi kimliği korunur. İlham seçimi daha erken görünür, görsel formdan önce incelenebilir, seçilen örnek kimliği görüşme taslağına taşınır. Formun ilk girdi alanından önceki ikincil araçlar aşağı alınır. Kayıtlı fikirler dosya araçlarından önce gelir.

Amblem, ana başlık, 20 işte 26 fotoğraf, 8 bazanın 16 görünümü, ana sayfa üçlü seçkisi ve tek 3D Stüdyo korunur. Fiyat, adres, müşteri, malzeme veya teslim sözü eklenmez. Veri kapsamları ve noindex korunur.

## Uygulama sırası

1. Yarış durumunu davranış testiyle yeniden üret. Fotoğraf işlemlerini sıfırlama, taslak geri yükleme ve sayfadan çıkışta geçersiz kıl.
2. Ayrı dosya sahipliğiyle rota, cihaz verisi silme ve 3D yükleyici hatalarını düzelt. Başarısız silme tam başarı olarak gösterilmez.
3. Kavram önizlemesi, daha kısa keşif başlığı, önce seçimler düzeni, daha doğrudan form ve gerçek işten kaynak kimliği taşıma uygula.
4. Aynı builder ile tekrarlanabilir üretim, çekirdek tür kontrolü, tüm regresyonlar, manifest bütünlüğü ve tarayıcı görevlerini doğrula. Görsel kontrol ve GPU sınırlarını açık tut.
5. Bağımsız ikinci inceleme, bulguların giderilmesi, yalnız izinli alt dizinin yayınlanması, uzak dal değişikliği kontrolü ve canlı manifest eşleşmesi.

## Kabul ölçütleri

Eski yükleme yeni projeye fotoğraf ekleyemez. Silme sonucu depolama sonucuyla uyumludur. Bilinmeyen rehber yolu 404 gösterir. Köksüz ve alt dizin 3D yüklemeleri doğru yolu kullanır, bozuk başlatma yeniden denenebilir. Önizleme Escape ile kapanıp odağı karta döndürür. Kaynak kimliği ve fotoğraf formda korunur. Her genişlikte yatay taşma ve ulaşılamayan temel kontrol bulunmaz. Konsept, üretim onayı veya gerçek teslim diye sunulmaz.

## Mevcut test sınırı

İlk iki Node test hatası sandbox `EPERM` nedenliydi. Aynı testler gerekli alt süreç ve yerel soket erişimiyle geçti. Eski Playwright kabul senaryosu mevcut araç sözleşmesindeki CUA sınırından dolayı doğrudan çalıştırılmaz. Görevleri CUA ile ve saf bileşen testleriyle doğrulanır, eşdeğer olmayan bölümler raporda belirtilir.
