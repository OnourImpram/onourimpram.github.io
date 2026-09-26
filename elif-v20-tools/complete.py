"""Finalize the recovered V20 source with a measured reflow fix."""
from pathlib import Path
root=Path('elif-tasarim/source-v12')
css=root/'src/v20.css'
text=css.read_text()
rule='\n/* V20 completion. Long Turkish display words wrap at enlarged text sizes.\n   No content clipping or document-overflow suppression is used. */\n.v13-devir-guide h2,.v13-devir-guide h3{overflow-wrap:anywhere}\n'
assert '.v13-devir-guide h2,.v13-devir-guide h3{overflow-wrap:anywhere}' not in text
css.write_text(text+rule)
notes=root/'docs/V20_Teslim_Kapsami.md'
notes.write_text(notes.read_text()+'''\n## V20 tamamlama kontrolü\n\nSon yayın kapısını durduran hata, 390 piksel genişlikte metinler iki kat büyütüldüğünde karar rehberinin uzun Türkçe başlığının kendi sütunundan taşmasıydı. Önceki tam test çalışmasında 308 normal görünüm geçerken stüdyo metin büyütme kontrolünde belge genişliği 392 piksel oldu. Ayrı DOM incelemesi, 318 piksel metin kutusunda 353 piksel genişliğe ulaşan uzun başlık sözcüğünü saptadı.\n\nDüzeltme, yalnız rehber başlıklarında gerektiğinde sözcük kırılmasına izin verir. Yazı küçültülmedi. Metin gizlenmedi. Sayfa taşması overflow hidden ile maskelenmedi. Mevcut bir CSS piksel toleransı artırılmadı. Yönetimli yerel tarayıcıdaki statik yeniden üretimde belge genişliği 392 pikselden 390 piksele döndü. Gerçek HTTP, WebGL ve canlı doğrulama sonuçları ayrıca yayın raporunda verilir.\n\nBu teslimde önceki tasarım sürecinin bütün işlevleri yeniden tasarlanmadı. V20 ürün sayfası, görselli karşılaştırma, doğrulanan konfigürasyon dosyası, yerleşim şeması, detay noktaları, grafik profili ve gerçek model dışa aktarımı tamamlanır. Ticari sunucu, kalıcı müşteri paneli, gerçek işletme koşulları, gerçek numuneler ve fiziksel cihaz AR doğrulaması yapılmış gibi işaretlenmez.\n''')
print('Applied measured Turkish heading reflow fix; existing overflow assertions unchanged')
