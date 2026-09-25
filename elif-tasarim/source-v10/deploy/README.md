# V9 yayın devri

V9 bu çalışma oturumunda GitHub'a gönderilmedi. Kullanılabilir bağlantı yalnız okuma işlevleri sundu. Canlı yayın iddiası yoktur.

## Hazır dosyalar

`dist/` V9'un test edilmiş statik yayın dizinidir. Yalnız `OnourImpram/onourimpram.github.io` deposundaki `elif-tasarim/` alt dizini bu içerikle güncellenmelidir. Kök `index.html`, alan adı ve kişisel yönlendirme korunmalıdır. Önizleme noindex kalır.

Son okunan taban commit `2b9ee083f56cd59eca049c627be7e79f40680c91`.

Kök index dosyasının korunacak Git blob özeti `501229ef0c1d25dbc4554e27ca089b03e590c7e0`.

## Yetkili yerel Git ortamında

Kaynak paketi ve depo farklı dizinlerde olmalı. Git kurulmuş ve kendi hesabınızla normal biçimde yetkilendirilmiş olmalı. Parola veya token bu dosyalara yazılmamalı.

Önce hazırlanan dosyaları doğrulayın.

```bash
npm ci --ignore-scripts
npm test
npm run build
npm run verify:dist
```

Ardından yalnız açık yayın seçeneğiyle dağıtım betiğini çalıştırın.

```bash
python deploy/publish_v9.py --repo /yerel/onourimpram.github.io --publish
```

Betik kirli çalışma ağacında veya taban commit değişmişse durur. Zorla gönderme yapmaz. Yeni bir dal üzerinde yalnız Elif alt dizinini hazırlar ve açık `--publish` seçeneği verilmişse `main` dalına fast forward gönderir. Önceki onayla çelişen yeni uzak değişiklikler varsa otomatik ezmez.

Başarılı bir Git push, tek başına GitHub Pages yayınının tamamlandığını göstermez. Betiğin ardından canlı `release-v9.json` dosyasının yerel manifestle aynı olduğu ve `/tasarim-masasi/` yolunun gerçek Three.js sahnesini açtığı ayrıca kontrol edilmelidir.
