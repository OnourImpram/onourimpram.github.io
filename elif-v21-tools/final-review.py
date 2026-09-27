"""Finish the recovered report work without weakening the publication gates."""
from pathlib import Path
root=Path('elif-tasarim/source-v12')
p=root/'tests/v21/acceptance.py'
text=p.read_text()
old="  assert 'ücretsiz keşif' not in page.locator('.v21-guide-terms').inner_text().lower()"
new="  terms=page.locator('.v21-guide-terms').inner_text()\n  assert 'Ücretsiz keşif, kesin fiyat veya garanti süresi vaat edilmez.' in terms\n  assert 'Keşif gerekliliği ve varsa ücreti.' in terms"
assert text.count(old)==1,'Expected the measured false-positive check exactly once'
p.write_text(text.replace(old,new))
notes=root/'docs/v21/FINAL_REVIEW.md'
assert not notes.exists()
notes.write_text('''# V21 rapor uygulamasının son incelemesi

27 Eylül 2026. İnceleme tabanı main 5b7584153e6557142aca06ee9d52257d4a0b61c1. Bekleyen rapor dalı elif-v21-rapor-20260927.

## Yeniden başlama kararı

Önceki hazırlığı yeniden üretmek yerine hash doğrulamasıyla 38 dosyalık kaynak değişikliği kurtarıldı. 137 birim ve derleme testi bu oturumda yeniden geçti. Önceki tarayıcı kapısı, ücretsiz keşif sözcüklerini koşulsuz yasaklıyordu. Oysa rehberin ilgili cümlesi ücretsiz keşif, kesin fiyat veya garanti süresi vaat edilmediğini açıkça belirtiyordu. Bu bir ürün vaadi hatası değil, olumsuz cümleyi ayırt etmeyen test hatasıydı.

Kontrol kaldırılmadı. Açık vaat yokluğu cümlesi ile keşif gerekliliği ve varsa ücreti maddesi birlikte doğrulanır. Ürün metni test geçsin diye değiştirilmedi. Gerçek HTTP tarayıcı ve canlı kontrol sonuçları son teslim raporunda ayrıca kaydedilir.

## Korunan kararlar

Raporun Faz 1 maddeleri gerçek ticari yayına geçişi koşul olarak belirtir. Önizleme noindex koruması, doğrulanmış alan adı ve işletme bilgisi gelmeden kaldırılmaz. E-posta alıcısı, adres, saatler, fiyat, müşteri yorumu ve ustalık yılı uydurulmaz. SMS aynı numarayı kullanır, bağımsız yedek hat değildir. Alıcısız mailto bir e-posta hazırlama aracıdır, kurulmuş bir kurumsal e-posta hesabı değildir.

Yeni taslak kurtarma açık onayla, sadece kullanıcının cihazında çalışır. Sunucuda müşteri kaydı veya reklam analitiği açılmaz. Portföy, gerçek 3D, karşılaştırma ve dosya dışa aktarımları korunur.
''')
print('Corrected the negative-disclaimer check. Product copy and all other checks unchanged.')
