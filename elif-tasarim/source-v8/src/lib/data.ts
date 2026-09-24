export type Product = {
    id: string;
    name: string;
    category: string;
    categoryLabel: string;
    material: string;
    image: string;
    mode: 'stocked' | 'made_to_order' | 'quoted';
    price: number | null;
    sizes: string[];
    intro: string;
    detail: string;
    dimensions: string;
    number: string;
};
export const assets = (name: string) => '/assets/' + name;
export const products: Product[] = [
    { id: 'vera-yemek-masasi', name: 'Vera', category: 'yemek', categoryLabel: 'Yemek masası', material: 'Ceviz', image: 'dining.webp', mode: 'made_to_order', price: 4200000, sizes: ['180 × 90 cm', '200 × 100 cm', '220 × 100 cm'], intro: 'Bir araya gelmek için, yalın bir neden.', detail: 'Oval çizgiler, güçlü bir ahşap karakter ve masanın çevresinde daha çok yer bırakan heykelsi bir form. Bu tasarım örneğinin ölçüsü, malzemesi ve üretim ayrıntıları atölyeyle birlikte netleştirilir.', dimensions: '180 × 90 × 75 cm', number: '01' },
    { id: 'kavis-sandalye', name: 'Kavis', category: 'oturma', categoryLabel: 'Sandalye', material: 'Ceviz', image: 'chair.webp', mode: 'stocked', price: 1250000, sizes: ['Standart ölçü'], intro: 'Bir çizginin, rahatlığa dönüşmesi.', detail: 'Sırtı çevreleyen kavisli form ile açık renk döşemenin dengesi. Görsel bir konsepttir; döşeme, bağlantı ve ölçüler gerçek ürün envanterine göre değiştirilecektir.', dimensions: '56 × 54 × 78 cm', number: '02' },
    { id: 'denge-konsol', name: 'Denge', category: 'depolama', categoryLabel: 'Konsol', material: 'Ceviz', image: 'sideboard.webp', mode: 'quoted', price: null, sizes: ['Ölçünüze göre'], intro: 'Sakladığı kadar, sergilediğiyle de güzel.', detail: 'Düşey ritimli yüzeyler ve sakin bir silüet. Yaşam alanınızdaki boşluğa göre düşünülmüş bir depolama fikri. İç bölümler ve donanım ihtiyaçlarınıza göre görüşülür.', dimensions: 'Mekânınıza göre belirlenir', number: '03' },
    { id: 'rota-calisma-masasi', name: 'Rota', category: 'calisma', categoryLabel: 'Yükseklik ayarlı masa', material: 'Ceviz', image: 'office.webp', mode: 'quoted', price: null, sizes: ['Ölçünüze göre'], intro: 'Çalışma gününüze, başka bir denge.', detail: 'Ahşap tabla ile yüksekliği ayarlanabilen çalışma fikrini buluşturuyor. Mekanizma, taşıma kapasitesi, kablo düzeni ve tabla uyumu üretimden önce teknik olarak doğrulanır.', dimensions: 'Tabla ve mekanizmaya göre belirlenir', number: '04' }
];
export const categories = [{ id: 'all', label: 'Tüm parçalar' }, { id: 'yemek', label: 'Yemek alanı' }, { id: 'oturma', label: 'Oturma' }, { id: 'depolama', label: 'Depolama' }, { id: 'calisma', label: 'Çalışma alanı' }];
export const materials = [
    { id: 'ceviz', name: 'Ceviz', latin: 'Derin, canlı, karakterli.', image: 'wood-walnut.webp', color: '#6e4b31', desc: 'Koyu tonlu ve belirgin damar hissi veren ceviz, bu konseptin ana görsel malzemesi. Kesin tür, masif veya kaplama tercihi ve yüzey işlemi gerçek ürün bilgisiyle doğrulanır.' },
    { id: 'mese', name: 'Meşe', latin: 'Aydınlık bir doğallık.', image: 'wood-oak.webp', color: '#b39065', desc: 'Açık tonları öne çıkan meşe görünümü, yalın ve ferah mekânlar için bir tasarım yönü sunar. Numune seçimi sırasında ton ve yüzey bitişi birlikte değerlendirilir.' },
    { id: 'kestane', name: 'Kestane', latin: 'Sıcak, yalın bir doku.', image: 'wood-chestnut.webp', color: '#916849', desc: 'Damarları ve sıcak tonlarıyla bir başka malzeme fikri. Bu kütüphane tasarım örneğidir; atölyenin gerçekten kullandığı malzemeler doğrulandıktan sonra güncellenir.' }
];
export const ideas = [
    { id: 'bir-masanin-etrafinda', name: 'Bir masanın etrafında', type: 'YEMEK ALANI', image: 'dining.webp', text: 'Bir mekânı paylaşmanın en sade hâli. Oval bir masa, farklı yönlerden gelen ışık ve gereğinden fazla olmayan eşya.', products: ['vera-yemek-masasi', 'kavis-sandalye'] },
    { id: 'kendinize-ait-bir-kose', name: 'Kendinize ait bir köşe', type: 'ÇALIŞMA ALANI', image: 'office.webp', text: 'Günün ritmini değiştiren bir çalışma alanı. Işık, tabla derinliği ve kablo düzeni; yalnız görünümü değil kullanımı da tasarlamak.', products: ['rota-calisma-masasi'] },
    { id: 'sakin-bir-ritim', name: 'Sakin bir ritim', type: 'YAŞAM ALANI', image: 'sideboard.webp', text: 'Bir konsolun ritimli yüzeyi, mekâna eşlik eden az sayıda nesne ve dokuyu hissettiren bir ışık.', products: ['denge-konsol'] }
];
export const journal = [
    { id: 'olcu-alma', title: 'İyi bir başlangıç: doğru ölçü', subtitle: 'ÖZEL ÜRETİM REHBERİ', image: 'sketch.webp', intro: 'Tam bir teknik çizimle gelmeniz gerekmiyor. Birkaç ölçü ve bir fotoğraf, ilk konuşma için yeterli bir başlangıç olabilir.', sections: [['Önce alanı düşünün', 'Mobilyanın yerleşeceği en, derinlik ve yükseklik alanını ayrı ayrı not edin. Ölçü birimini yazın; santimetre ile milimetreyi aynı çizimde karıştırmayın.'], ['Kullanım payını unutmayın', 'Sandalyenin geriye hareketi, bir çekmecenin açılışı veya geçiş alanı da tasarımın parçasıdır. Uygun boşluklar atölyeyle kullanım senaryonuza göre değerlendirilmeli.'], ['Bir fotoğrafla destekleyin', 'Mümkünse alanı karşıdan ve yandan gösterin. Kişisel belgeler, insanlar veya açık adres gibi özel bilgiler görünmesin.'], ['Son ölçü atölye teyidinden geçer', 'İlk talepte verdiğiniz ölçü üretim emri değildir. Üretilecek parça için son ölçü, malzeme ve çizim ayrıca onaylanır.']] },
    { id: 'malzeme-secimi', title: 'Ahşabı yalnız rengiyle seçmeyin', subtitle: 'MALZEME NOTLARI', image: 'joinery.webp', intro: 'Bir mobilyada gördüğümüz ton, verdiğimiz kararın yalnız bir parçası. Kullanım biçimi ve yüzey işlemi de konuşmanın içinde olmalı.', sections: [['Kullanımı tarif edin', 'Yemek masası, çalışma tablası ve dekoratif raf aynı beklentileri karşılamaz. Nerede, nasıl ve ne sıklıkla kullanılacağını atölyeye anlatın.'], ['Tür ile yüzeyi ayırın', 'Ceviz bir ağaç türünü, yağ veya vernik bir yüzey işlemini anlatır. Masif, kaplama ve kompozit yüzeyler de aynı anlama gelmez.'], ['Numuneyi kendi ışığınızda görün', 'Ekran ve fotoğraflar renk kararının tek dayanağı olmamalı. Kesin ton ve bitiş için gerçek bir numuneyi değerlendirmek isteyin.']] },
    { id: 'bakim', title: 'Birlikte yaşadıkça güzelleşsin', subtitle: 'BAKIM NOTLARI', image: 'wood-walnut.webp', intro: 'Bakım, ürünün gerçek malzemesi ve yüzey işlemiyle birlikte düşünülür. Bu sayfa ürün özelindeki bakım talimatının yerini tutmaz.', sections: [['Önce yüzey bilgisini öğrenin', 'Üretimde kullanılan yüzey ürününün talimatını isteyin. Her ahşap görünümlü yüzeye aynı yağ, cila veya temizlik ürünü uygulanmaz.'], ['Küçük alışkanlıklar', 'Sıcak ve ıslak nesnelerin doğrudan teması gibi kullanım koşullarını atölyeyle konuşun. Ürününüz için uygun temizlik ve koruma yöntemini teyit edin.'], ['Müdahaleden önce danışın', 'Bir leke veya hasarda yüzeyi zımparalamadan ya da kimyasal uygulamadan önce ürünün fotoğrafı ve malzeme bilgisiyle destek isteyin.']] }
];
export const faqs = [
    ['Ölçülerim henüz net değil. Yine de başlayabilir miyiz?', 'Evet. Özel ölçü formundaki “Ölçülerimi birlikte belirleyelim” seçeneğiyle ilerleyebilirsiniz. İlk aşamada ihtiyacınızı anlamak, kesin ölçüden daha önemlidir.'],
    ['Görsellerdeki ürünler satın alınabilir mi?', 'Bu sürümdeki görseller, ürün adları, ölçüler ve fiyatlar tasarım örneğidir. Gerçek katalog ve onaylı fiyatlar henüz yerleştirilmedi; canlı satış yapılmaz.'],
    ['Bir görsel veya çizim paylaşabilir miyim?', 'Teklif stüdyosuna en fazla 5 JPG, PNG veya WebP görseli ekleyebilirsiniz. Her dosya en fazla 10 MB olabilir. Bu önizlemede dosyalar yalnız açık sayfanızda işlenir, sunucuya gönderilmez.'],
    ['Üretim ve teslim tarihi nasıl belirlenir?', 'Tarih; tasarım, malzeme, atölye kapasitesi ve teslimat koşulları netleşince teklifin bir parçası olur. Bu önizleme otomatik teslim sözü vermez.'],
    ['Özel üretim ile standart sipariş arasında ne fark var?', 'Özel üretimde önce ihtiyacınız, ölçü, malzeme ve iş kapsamı netleştirilir. Onaylı teklif ve çizimden sonra üretim planlanır. Standart üründe ise seçili varyant ve satış koşulları önceden belirlenmiştir.']
];
