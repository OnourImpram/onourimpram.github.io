# V9 execution ledger

Approved scope. Bilateral real Three.js shelves and full-site refinement. Publish only elif-tasarim subtree.
Baseline. 2b9ee083f56cd59eca049c627be7e79f40680c91.

Completed locally. Baseline tests, RED room contracts, separate room module, controls and homepage editorial changes. See evidence/v9/red.txt and green.txt.
Environment observation. Local Chromium cannot create WebGL2, including a minimal context probe. No product failure inferred. Real WebGL and HTTP checks will run in isolated GitHub Actions, not be claimed from the unavailable local renderer.
Ruling. Reuse existing licensed local Three.js engine and repository assets. No third-party photographs or generated fake city projects imported from design mockups.
Ruling. Shelf books and styling hide with shelves. Room props and shelf lighting are independently controlled. Furniture scope disclaimer remains.
Pending. Actual CI screenshots, correction cycle, post-correction regression suite, release-only subtree update and live verification.

CI stage 1. Geometry, shelves, motion, material and all studio widths passed. Actual pointer test caught the poster start button under inactive camera controls on mobile. Fix hides inactive controls and reserves launch clearance. Local geometry found a separate home photo width regression from inherited height plus new aspect-ratio. Fixed with width:100% and height:auto. Raw failures retained, not relabeled as success.

## Son inceleme düzeltmeleri
V9 tarayıcı kontrollerinin ikinci tam koşumunda 35 kontrol geçti. V8 regresyonunda azaltılmış hareket seçiliyken görünür olmayan stüdyo geometrisinin ancak görünür olduğunda güncellendiği görüldü. Çözüm, bu tercih etkin olduğunda geometrik durumu güncelleme çağrısında anında eşitlemek, çizimi yine görünürlük sınırında tutmaktır. Testte bekleme süresini yükselterek hata gizlenmedi.
Statik oda parçalarını gruplama testi ilk koşumda mergeStaticByMaterial yok hatası verdi. Uygulama sonrası geometri sınırları ve bağımsız raflar korunarak çizim parçası sayısı azaltıldı. Hareketli masa parçaları gruplanmadı.
V8 önbellek çakışmasını önlemek için 3D modül çağrısı V9 parametresi taşıyor. Eksik WebGL görünümü canlı 3D yerine konsept önizlemesi olarak adlandırılıyor.
