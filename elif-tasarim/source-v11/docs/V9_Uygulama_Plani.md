# Elif Tasarım V9. Çift raflı tasarım stüdyosu

## Onaylanan kapsam
Mevcut V8 üzerinde devam edilir. Seçilen ahşap amblem, ana başlık, gerçek atölye portföyü, konsept etiketleri ve Yusuf Usta iletişimi korunur. Kullanıcının onayladığı görselin mekân duygusu, statik ekran görüntüsü olarak değil gerçek Three.js geometrileriyle uygulanır. Görseldeki uydurma proje şehirleri, garanti ve malzeme iddiaları alınmaz.

## 1. Gerçek çift kitaplık
`public/three/atelier-room.mjs` iki yanda bağımsız raflı kitaplıklar, raf aydınlatması, kitaplar, seramikler, yapraklı bitkiler, çalışma koltuğu, dokulu duvar ve halı üretir. Sol ve sağ raflar ayrı sahne gruplarıdır. Mekân görünümü ile yalnız ürün görünümü arasında geçilir. Raf seçimi masa imalat ölçüsüne dahil sayılmaz.

## 2. Masa ve sahne bağlantısı
`public/three/desk-scene.mjs` mevcut hareketli tabla, çekmeceler, kapak ve yan dönüşü korur. Kamera mekân modunda duvarın içine geçmez. Ürün modunda serbest çevresel inceleme sürer. Raf ışığı ve sahne durumları kontrollüdür. Görünmeyen sahne sürekli çizilmez. Sahne terk edildiğinde geometri, malzeme, gözlemci ve olaylar temizlenir.

## 3. Kontroller
`src/components/DeskExperience.tsx` mekân ve ürün seçimi, çift/sol/sağ raf düzeni, raf ışığı, ilave sol ve sağ kamera açıları ve tam ekran kontrolünü ekler. Ölçü, malzeme, yükseklik ve dolap hareketleri korunur. Kaydetme ve Yusuf Usta ile görüşme gerçek kullanıcı hareketine bağlı kalır. Kamera hareketi azaltılmış hareket tercihine uyar.

## 4. Parametreler ve eski bağlantılar
`src/lib/desk-v8.ts` önceki masa parametrelerine isteğe bağlı raf ve mekân tercihlerini ekler. Yeni paylaşım bağlantısı seçenekleri geri yükler. Eski V8 bağlantıları çalışmaya devam eder. Kişisel notlar ve dosyalar URL içine eklenmez.

## 5. Site geneli
`src/v9.css` sıcak kemik rengi, dengeli kenarlıklar, geniş ama kontrollü tipografi, anlaşılır kartlar ve mobil kontrolleri birleştirir. Ana sayfaya kategori şeridi ve işçilik ayrıntılarına ayrılan editoryal bölüm eklenir. Gerçek proje ve konseptler ayrı sunulur. Stüdyo maketi yerine gerçek sahneden alınan görseller kullanılır.

## 6. Test kapıları
Önce raf geometrisinin eksik olduğunu gösteren test çalıştırılır. Gerçek Three.js nesnelerinde iki raf, bağımsız görünürlük, ışık sınırları ve dispose kontrol edilir. Masa parametreleri ve URL geri yükleme test edilir. Tarayıcıda WebGL, raf değişimi, ürün modu, yükseklik, çekmeceler, kapak, ölçü aktarımı, mobil menü, arama ve gizlilik sınırı denenir. Rota matrisi, metin büyütme ve bozuk görseller ayrı incelenir.

## 7. Derleme ve teslim
`tools/build-v9.cjs` kaynaklardan HTML sayfalarını, hashli uygulama/CSS dosyalarını ve yerel Three.js modüllerini üretir. `release-v9.json` bütünlüğü kaydeder. `dist` yalnız Elif alt dizinine yayımlanabilir. Kişisel ana sayfa değişmez. Erişilebilir yayınlama eylemi olmadığı sürece yayın tamamlandı denmez.

## 8. Uygulama kaydı
- V8 kaynak paketinden izole yerel çalışma oluşturuldu.
- V8 tabanında 71 test geçti.
- GitHub güncelleme eylemi bu oturumun bağlantısında bulunmuyor.
- Bu planın teslim kapsamı, test edilmiş yeni sürüm ve birebir yayın paketidir. Canlıya geçiş ayrı doğrulanır.
