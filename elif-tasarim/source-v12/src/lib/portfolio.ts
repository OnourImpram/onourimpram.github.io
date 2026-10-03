import {completedWorkAdditions,completedPhotoNotes} from './completed-work-additions';
import {beds} from './beds';
import {pinReferenceUrl,pinLookup} from './pinterest';
export type WorkCategory='mutfak'|'tv-unitesi'|'vestiyer'|'gardrop'|'kahve-kosesi'|'sehpa'|'pergola'|'ozel-tasarim'|'baza-yatak';
export type Work={id:string;title:string;category:WorkCategory;images:string[];status:'work'|'process';subtitle:string;description:string;features:string[]};
export const workCategories=[
 {id:'mutfak',name:'Mutfak',short:'Mutfak',image:'concept-mutfak',line:'Günün başladığı, evin buluştuğu yer.',detail:'Kapak düzeninden depolama alanlarına, ölçünüz ve kullanım alışkanlıklarınız etrafında tasarlanan mutfaklar.'},
 {id:'tv-unitesi',name:'TV Ünitesi',short:'Yaşam alanı',image:'concept-tv',line:'Salonunuzun sakin odağı.',detail:'Duvar panelleri, raflar ve kapalı depolamayı bir araya getiren, mekâna göre şekillenen TV üniteleri.'},
 {id:'vestiyer',name:'Vestiyer ve Depolama',short:'Antre',image:'concept-vestiyer',line:'Evin ilk karşılaması.',detail:'Giriş alanında askılık, ayakkabı ve günlük eşyalar için yer açan ölçüye özel çözümler.'},
 {id:'gardrop',name:'Gardırop',short:'Giyinme alanı',image:'concept-gardrop',line:'Her şeyin kendine ait bir yeri.',detail:'Kapak, raf, çekmece ve askı alanlarının birlikte düşünüldüğü gardırop ve giyinme çözümleri.'},
 {id:'kahve-kosesi',name:'Kahve Köşesi',short:'Kahve köşesi',image:'concept-kahve',line:'Kendinize ayırdığınız küçük bir an.',detail:'Kahve ekipmanınız ve servis alışkanlıklarınız için vitrin, raf ve tezgâhı buluşturan özel köşeler.'},
 {id:'sehpa',name:'Orta Sehpa ve Zigon Sehpa',short:'Sehpa & zigon',image:'concept-sehpa',line:'Bazen küçük bir parça her şeyi değiştirir.',detail:'Orta sehpa, yan sehpa ve iç içe geçen zigon fikirleri. Beğendiğiniz formu alanınıza göre birlikte değerlendirelim.'},
 {id:'pergola',name:'Pergola ve Açık Alan Yapıları',short:'Bahçe & dış mekân',image:'concept-pergola',line:'Hayata dışarıda da yer açalım.',detail:'Bahçe ve açık alan için ahşap kamelya ve üst yapı çalışmaları. Uygulama koşulları ve teknik uygunluk ayrıca değerlendirilir.'},
 {id:'ozel-tasarim',name:'Özel Tasarım Projeler',short:'Size özel',image:'concept-model',line:'Katalogda olmayan bir fikriniz mi var?',detail:'Mekânınız, çiziminiz veya bir referansınız üzerinden başlarız. Ne üretilebileceğini birlikte netleştiririz.'},
 {id:'baza-yatak',name:'Baza ve Yatak',short:'Yatak odanız',image:'bed-ceviz-yalin-closed',line:'Ahşabın karakteri, döşemenin yumuşaklığı.',detail:'Ahşap ağırlıklı ve döşemeli sekiz baza konsepti. Açık ve kapalı görünümlerle tasarım fikrini keşfedin. Ölçü, malzeme ve mekanizma uygunluğu ayrıca değerlendirilir.'},
] as const;
export const works:Work[]=[
 ...completedWorkAdditions,
 {id:'sade-kose-mutfak',title:'Sade çizgiler, sıcak bir mutfak.',category:'mutfak',images:['r13'],status:'work',subtitle:'L plan mutfak uygulaması',description:'Açık tonlu kapaklar, koyu renk cihazlar ve tezgâh altı depolama aynı düzende buluşuyor. Atölyenin paylaşılan iş arşivinden.',features:['L biçiminde yerleşim','Üst ve alt dolap bütünlüğü','Tezgâh arası aydınlatma']},
 {id:'cerceve-kapak-mutfak',title:'Klasik çizginin yalın hâli.',category:'mutfak',images:['r10'],status:'work',subtitle:'Çerçeve kapaklı mutfak',description:'Çerçeveli kapak düzeni ve uzun çalışma yüzeyiyle hazırlanmış mutfak uygulaması. Fotoğraf atölye tarafından paylaşılan arşivden.',features:['Çerçeve kapak düzeni','Boydan boya çalışma yüzeyi','Üst dolap depolaması']},
 {id:'iki-ton-mutfak',title:'İki ton, tek bir bütün.',category:'mutfak',images:['r18'],status:'work',subtitle:'İki renkli mutfak uygulaması',description:'Açık üst dolaplar ile yeşil tonlu alt kapakların bir araya geldiği mutfak. Fotoğrafta görünen tasarım dili, yeni ölçülere göre değerlendirilir.',features:['İki renkli kapak yaklaşımı','Cam detaylı üst dolaplar','Siyah kulp vurguları']},
 {id:'kemerli-kahve-kosesi',title:'Günün en güzel molası.',category:'kahve-kosesi',images:['r07'],status:'work',subtitle:'Kemer detaylı kahve köşesi',description:'Ortada açık raflar, iki yanda cam kapaklı vitrinler. Aydınlatma ve servis yüzeyi kahve köşesinin ritmini tamamlıyor.',features:['Kemer detaylı açık alan','Cam kapaklı yan vitrinler','Çekmeceli alt depolama']},
 {id:'amber-kahve-kosesi',title:'Bir fincana ayrılan yer.',category:'kahve-kosesi',images:['r06'],status:'work',subtitle:'Vitrinli kahve ve servis köşesi',description:'Cam kapaklar ve sıcak aydınlatmayla tanımlanan kahve alanı. Ekipman yerleşimi ve depolama ihtiyacı üzerinden uyarlanabilir.',features:['Aydınlatmalı vitrin','Kahve ekipmanı için yüzey','Kapalı alt dolaplar']},
 {id:'vitrinli-servis-unitesi',title:'Sergilemek de bir işlev.',category:'kahve-kosesi',images:['r14','r08'],status:'work',subtitle:'Cam vitrinli servis ünitesi',description:'Üstte vitrin, altta kapalı depolama ve arada servis yüzeyi. Arşivdeki iki görünüm, ışık ve kullanım ayrıntılarını gösteriyor.',features:['Cam üst dolaplar','Dikey çizgili arkalık','Geniş servis yüzeyi']},
 {id:'cizgili-gardirop',title:'Düzenin ince çizgisi.',category:'gardrop',images:['r02'],status:'work',subtitle:'Çizgili kapaklı gardırop',description:'Dikey kapak çizgileri, açık raflar ve yan çalışma yüzeyinin birlikte düşünüldüğü dolap uygulaması.',features:['Dikey çizgili kapaklar','Açık raf ve kapalı depolama','Yan çalışma alanı']},
 {id:'klasik-gardirop',title:'Sessiz, dengeli, yerli yerinde.',category:'gardrop',images:['r01'],status:'work',subtitle:'Çerçeve kapaklı gardırop',description:'Dengeli kapak oranları ve alt çekmecelerle hazırlanmış gardırop. Yeni alanınız için ölçü, donanım ve iç düzen ayrıca çalışılır.',features:['Çerçeve kapaklar','Alt çekmece grubu','Koyu renk kulplar']},
 {id:'cam-kapak-giyinme',title:'Düzen, görünür olduğunda.',category:'gardrop',images:['r04'],status:'work',subtitle:'Cam kapaklı köşe giyinme alanı',description:'Köşe planına yerleşen koyu çerçeveli cam kapak sistemi. Kullanım biçimine göre raf ve askı düzeni birlikte değerlendirilir.',features:['Köşeyi kullanan yerleşim','Cam kapak sistemi','İç raf ve askı alanları']},
 {id:'rafli-depolama',title:'Her parçaya bir yer.',category:'vestiyer',images:['r05'],status:'work',subtitle:'Açık raflı depolama çalışması',description:'Askı, raf ve çekmecelerin birlikte çözüldüğü depolama çalışması. Antre veya farklı bir kullanım alanına uyarlama, ölçü ve ihtiyaç üzerinden değerlendirilir.',features:['Açık raf düzeni','Askı bölmeleri','Çekmeceli depolama']},
 {id:'isikli-tv-unitesi',title:'Yaşam alanının odak noktası.',category:'tv-unitesi',images:['r22'],status:'work',subtitle:'Aydınlatmalı TV ve raf ünitesi',description:'Merkezde TV paneli, iki yanda farklı raf düzenleri ve altta depolama. Dolaylı aydınlatma bütün kompozisyonu bir araya getiriyor.',features:['Merkez panel düzeni','Aydınlatmalı açık raflar','Kapaklı alt depolama']},
 {id:'ahsap-bahce-kamelyasi',title:'Dışarıda bir yaşam alanı.',category:'pergola',images:['r19','r16','r17','r20','r23'],status:'work',subtitle:'Ahşap kamelya ve uygulama detayları',description:'Ahşap taşıyıcılar, çatı ve korkuluklarıyla açık alan çalışması. Paylaşılan fotoğraflar uygulama sırasındaki sahadan görünüşleri de içerir.',features:['Ahşap çatı strüktürü','Çapraz korkuluk detayları','Sahada uygulama']},
 {id:'yatak-cevresi-depolama',title:'Odaya göre düşünülmüş.',category:'ozel-tasarim',images:['r09'],status:'work',subtitle:'Yatak çevresi dolap uygulaması',description:'Yatak çevresini depolama alanına dönüştüren, düşey ve yatay dolapların birlikte yer aldığı özel çalışma.',features:['Yatak çevresi yerleşim','Üst dolap alanı','Yan depolama bölmeleri']},
 {id:'mutfak-kurulum-asamasi',title:'Görünmeyen emeğin bir anı.',category:'mutfak',images:['r12','r11'],status:'process',subtitle:'Mutfak montaj aşaması',description:'Koruyucu filmler ve devam eden kurulum fotoğrafta görünür. Bu, bitmiş mutfağın son çekimi değildir. Kapakların nihai rengi koruyucu filmden çıkarılamaz.',features:['Sahada dolap yerleşimi','Koruyucu filmli yüzeyler','Devam eden kurulum']},
 {id:'klasik-mutfak-kurulumu',title:'Bir mutfağın şekillendiği an.',category:'mutfak',images:['r15'],status:'process',subtitle:'Klasik mutfak kurulum görüntüsü',description:'Dolaplar yerleşmiş, tezgâh ve cihaz alanlarında hazırlığın sürdüğü bir arşiv görüntüsü. Tamamlanmış teslim fotoğrafı olarak sunulmaz.',features:['Cam detaylı üst dolap','Alt dolap yerleşimi','Kurulum hazırlığı']},
 {"id": "cam-vitrin-uygulamasi", "title": "Bir vitrinin yerini bulduğu an.", "category": "gardrop", "images": ["r03"], "status": "process", "subtitle": "Cam vitrin ve raf uygulaması", "description": "Koyu çerçeveli cam kapaklar, yan raflar ve çizgili alt depolama. Zemindeki aletler ve kurulum ayrıntıları görünen bu kare, uygulama sürecinden paylaşılmıştır.", "features": ["Cam kapaklı düşey bölüm", "Açık raf düzeni", "Dikey çizgili alt kapaklar"]},
 {"id": "dikey-cizgili-tv-duvari", "title": "İnce çizgiler, bütün bir duvar.", "category": "tv-unitesi", "images": ["r21"], "status": "work", "subtitle": "Dikey çizgili TV duvarı", "description": "Açık renkli çizgili arkalık, sağdaki raflı bölüm ve alt depolama bir arada. Paylaşılan arşivdeki ekran görüntüsü, üzerindeki mevcut işaretler korunarak gösterilmiştir.", "features": ["Dikey çizgili duvar yüzeyi", "Yan sergileme alanı", "Alçak depolama düzeni"]},
 {"id": "gri-tv-depolama-unitesi", "title": "Ekranın yanında, düzen için yer.", "category": "tv-unitesi", "images": ["r24"], "status": "work", "subtitle": "Gri TV ve depolama ünitesi", "description": "TV alanına eşlik eden raflar ve kapalı depolama. Çizgili panel ve açık raflar, ekran çevresinde farklı kullanım alanları oluşturuyor. Fotoğraftaki ilan filigranı korunmuştur.", "features": ["TV için orta bölüm", "Açık ve kapalı depolama", "Gri tonlu yüzeyler"]},
 {"id": "ahsap-cizgili-tv-paneli", "title": "Ahşap çizgilerle sakin bir odak.", "category": "tv-unitesi", "images": ["r25"], "status": "work", "subtitle": "Ahşap görünümlü çizgili TV paneli", "description": "Dikey çizgili panel, yandaki gri raf alanı ve alttaki ışık çizgisi fotoğrafta birlikte görülüyor. Atölyenin paylaştığı tamamlanan işler arşivinden.", "features": ["Çizgili arka panel", "Yan raf yerleşimi", "Alt aydınlatma çizgisi"]},
 {"id": "isik-cerceveli-tv-unitesi", "title": "Işıkla çerçevelenen yaşam alanı.", "category": "tv-unitesi", "images": ["r26"], "status": "work", "subtitle": "Işık çerçeveli TV ünitesi", "description": "Gri ve ahşap görünümlü yüzeyler, raflar ve sıcak ışık hatlarıyla hazırlanmış TV duvarı. Atölyenin paylaştığı arşivden.", "features": ["Gri ve ahşap görünüm birlikteliği", "Çerçeveleyen aydınlatma", "Yan sergileme rafları"]},
];
/** Photo labels describe the visible capture, not a newly asserted project completion date. */
export type WorkPhotoEvidence={image:string;kind:'work'|'process';source:'workshop-archive';caption:string};
const archivePhotoNotes:Record<string,{kind:'work'|'process';caption:string}>={
 "r01": {
  "kind": "work",
  "caption": "Çerçeve kapaklı gardırop, koyu renk kulplar ve alttaki iki çekmece birlikte görülüyor."
 },
 "r02": {
  "kind": "work",
  "caption": "Dikey çizgili kapaklar, ortadaki açık raflar ve yandaki çalışma yüzeyi aynı dolap düzeninde görülüyor."
 },
 "r03": {
  "kind": "process",
  "caption": "Koyu çerçeveli cam kapaklar, açık raflar ve zemindeki kurulum gereçleri. Uygulama aşamasından bir kare."
 },
 "r04": {
  "kind": "work",
  "caption": "Köşeyi çevreleyen koyu çerçeveli cam kapakların ardında raf ve askı bölmeleri görülüyor."
 },
 "r05": {
  "kind": "work",
  "caption": "Üst dolaplar, açık raflar, çekmeceler ve yandaki askı bölmesi aynı depolama düzeninde birleşiyor."
 },
 "r06": {
  "kind": "work",
  "caption": "Sıcak ışıklı cam vitrinler, kahve ekipmanlarının yer aldığı servis yüzeyi ve kapalı alt dolaplar görülüyor."
 },
 "r07": {
  "kind": "work",
  "caption": "Kemerli açık orta bölüm, iki yanda cam vitrin ve altta çekmeceler aynı karede görülüyor."
 },
 "r08": {
  "kind": "work",
  "caption": "Işıklı cam üst dolaplar, dikey çizgili arkalık ve çekmeceli alt dolaplar görülüyor."
 },
 "r09": {
  "kind": "work",
  "caption": "Yatağın iki yanındaki dolaplar, yan çekmeceler ve yatağın üzerindeki yatay depolama bölümü görülüyor."
 },
 "r10": {
  "kind": "work",
  "caption": "Çerçeve kapaklı üst ve alt dolaplar boyunca ocak, fırın, evye ve aydınlatmalı çalışma yüzeyi sıralanıyor."
 },
 "r11": {
  "kind": "process",
  "caption": "Koruyucu filmli mutfak dolapları, boş cihaz alanları ve tavandan sarkan kablo kurulum aşamasını gösteriyor."
 },
 "r12": {
  "kind": "process",
  "caption": "Koruyucu filmli dolaplar ve tamamlanmamış cihaz alanları, mutfak kurulumunun başka bir açıdan görünümünü sunuyor."
 },
 "r13": {
  "kind": "work",
  "caption": "L biçimindeki tezgâh, açık renkli dolaplar ve koyu renk cihaz yüzeyleri birlikte görülüyor."
 },
 "r14": {
  "kind": "work",
  "caption": "Koyu çerçeveli cam vitrinler, ışıklı ve dikey çizgili arkalık ile çekmeceli alt depolama görülüyor."
 },
 "r15": {
  "kind": "process",
  "caption": "Cam detaylı üst dolaplar, çerçeve kapaklar ve boş tezgâh açıklıkları mutfak kurulum aşamasında görülüyor."
 },
 "r16": {
  "kind": "process",
  "caption": "Kamelyanın köşesindeki ahşap taşıyıcılar, çatı altı ve çapraz korkuluklar sahadan görülüyor."
 },
 "r17": {
  "kind": "process",
  "caption": "Kamelyanın çatı altı, köşe dikmesi ve çapraz korkulukları yandan görülüyor. Sahadaki uygulama arşivinden."
 },
 "r18": {
  "kind": "work",
  "caption": "Açık üst kapaklar, yeşil tonlu alt kapaklar ve koyu renk kulplar aynı mutfak düzeninde görülüyor."
 },
 "r19": {
  "kind": "process",
  "caption": "Kamelyanın ahşap taşıyıcıları, eğimli çatısı ve çevresindeki çapraz korkuluklar dışarıdan görülüyor."
 },
 "r20": {
  "kind": "process",
  "caption": "Kamelyanın çatı ve korkuluk düzeni başka bir açıdan görülüyor. Sahadaki uygulama arşivinden."
 },
 "r21": {
  "kind": "work",
  "caption": "Açık renkli çizgili TV duvarı, sağdaki kitaplık ve alçak kapaklı depolama görülüyor. ekran görüntüsündeki işaretler korunuyor."
 },
 "r22": {
  "kind": "work",
  "caption": "Merkezde TV paneli, iki yanda aydınlatmalı raflar ve altta açık ve kapalı depolama görülüyor."
 },
 "r23": {
  "kind": "process",
  "caption": "Kamelyanın çatı altı kirişleri, çapraz bağlantıları ve zemindeki çalışma gereçleri görülüyor."
 },
 "r24": {
  "kind": "work",
  "caption": "TV çevresindeki ışık çizgisi, soldaki dikey çizgili panel, sağdaki raflar ve alçak dolap görülüyor. mevcut filigran korunuyor."
 },
 "r25": {
  "kind": "work",
  "caption": "Ahşap görünümlü dikey çizgili panel, sağdaki gri raf bölümü ve alttaki aydınlatmalı depolama görülüyor."
 },
 "r26": {
  "kind": "work",
  "caption": "Çizgili TV duvarı, iki duvar lambası, sağdaki ışıklı cam bölüm ve alttaki beyaz kapaklar birlikte görülüyor."
 }
};
export function workPhotoEvidence(work:Work,index=0):WorkPhotoEvidence{
 const image=work.images[Number.isInteger(index)&&index>=0&&index<work.images.length?index:0];
 const note=archivePhotoNotes[image]||completedPhotoNotes[image];
 return {image,source:'workshop-archive',kind:note?.kind||work.status,caption:note?.caption||work.subtitle+'. Paylaşılan atölye arşivinden.'};
}
export function workDisplayStage(work:Work):'work'|'process'{return work.images.some((_,i)=>workPhotoEvidence(work,i).kind==='work')?'work':'process';}
export const featuredWorks=['kemerli-ayna-antre','cam-vitrin-kahve','uc-modul-kitaplik','sade-kose-mutfak','isikli-tv-unitesi','kemerli-kahve-kosesi','rafli-depolama','cam-kapak-giyinme','yatak-cevresi-depolama'];
export const concepts=[
 {id:'oval-orta-sehpa',title:'Bir araya gelmenin doğal hâli.',category:'sehpa',image:'concept-sehpa',subtitle:'Oval orta sehpa ve zigon fikri'},
 {id:'kahve-ritueli',title:'Kendinize küçük bir köşe.',category:'kahve-kosesi',image:'concept-kahve',subtitle:'Işıklı vitrin ve kahve köşesi fikri'},
 {id:'sakin-antre',title:'Eve ilk adım.',category:'vestiyer',image:'concept-vestiyer',subtitle:'Banklı ve aynalı vestiyer fikri'},
 {id:'yasam-duvari',title:'Salonun bütününü düşünmek.',category:'tv-unitesi',image:'concept-tv',subtitle:'Panel ve TV ünitesi fikri'},
 {id:'evin-kalbi',title:'Evin kalbinde.',category:'mutfak',image:'concept-mutfak',subtitle:'Açık tonlu mutfak fikri'},
 {id:'duzenli-bir-alan',title:'Düzen için tasarlanmış.',category:'gardrop',image:'concept-gardrop',subtitle:'Cam ve çizgili kapaklarla giyinme fikri'},
 {id:'bahcede-zaman',title:'Gölgesinde güzel zamanlar.',category:'pergola',image:'concept-pergola',subtitle:'Ahşap kamelya fikri'},
 {id:'bir-masanin-etrafinda',title:'Bir masanın etrafında.',category:'ozel-tasarim',image:'concept-hero',subtitle:'Ahşap yemek alanı fikri'},
 ...beds,
] as const;
/** A discovery page shows breadth. Variants remain in their dedicated category. */
export function inspirationConcepts(category='all') {
 if(category!=='all')return concepts.filter(c=>c.category===category);
 const seen=new Set<string>();
 return concepts.filter(c=>{if(seen.has(c.category))return false;seen.add(c.category);return true;});
}
const homeConceptIds=['oval-orta-sehpa','kahve-ritueli','sakin-antre'];
export const homeConcepts=homeConceptIds.map(id=>concepts.find(c=>c.id===id)!);
export const pinterestReferences=[
 {
  "id": "3T8k8Pwyv",
  "group": "atelier",
  "title": "Ahşap tezgâhlı klasik mutfak",
  "category": "mutfak"
 },
 {
  "id": "2lc0S9lQO",
  "group": "atelier",
  "title": "Ahşap adalı beyaz klasik mutfak",
  "category": "mutfak"
 },
 {
  "id": "41JsOJFNf",
  "group": "atelier",
  "title": "Cam kapaklı ve açık raflı beyaz mutfak",
  "category": "mutfak"
 },
 {
  "id": "46g1kWzDY",
  "group": "atelier",
  "title": "Kemer detaylı banklı antre dolabı",
  "category": "vestiyer"
 },
 {
  "id": "5Wc0LnUYw",
  "group": "atelier",
  "title": "Aydınlatmalı aynalı antre dolabı",
  "category": "vestiyer"
 },
 {
  "id": "1CZAqZl4m",
  "group": "atelier",
  "title": "Tavana uzanan beyaz gardırop",
  "category": "gardrop"
 },
 {
  "id": "601hk2fV2",
  "group": "atelier",
  "title": "Kapı üstünü değerlendiren antre dolabı",
  "category": "vestiyer"
 },
 {
  "id": "80Ac59zMm",
  "group": "atelier",
  "title": "Açık bölmeli aydınlatmalı gardırop",
  "category": "gardrop"
 },
 {
  "id": "mcIHdiZgI",
  "group": "atelier",
  "title": "Ortası çekmeceli panel kapaklı gardırop",
  "category": "gardrop"
 },
 {
  "id": "3fg3tRGhV",
  "group": "atelier",
  "title": "Üst dolaplı lacivert gardırop",
  "category": "gardrop"
 },
 {
  "id": "2UTN7Jm1P",
  "group": "atelier",
  "title": "Açık raflı mavi gardırop",
  "category": "gardrop"
 },
 {
  "id": "7jlvhY3if",
  "group": "atelier",
  "title": "Tavana uzanan koyu mavi gardırop",
  "category": "gardrop"
 },
 {
  "id": "TpIJNC2gw",
  "group": "atelier",
  "title": "Vitrinli ve aydınlatmalı kahve köşesi",
  "category": "kahve-kosesi"
 },
 {
  "id": "6OmBhyFBu",
  "group": "atelier",
  "title": "Ahşap raflı beyaz kahve dolabı",
  "category": "kahve-kosesi"
 },
 {
  "id": "4EvTLig9u",
  "group": "atelier",
  "title": "Cam vitrinli kompakt kahve köşesi",
  "category": "kahve-kosesi"
 },
 {
  "id": "tMopkttll",
  "group": "atelier",
  "title": "İki yanı vitrinli kahve ünitesi",
  "category": "kahve-kosesi"
 },
 {
  "id": "2TH1Ug3IX",
  "group": "atelier",
  "title": "Kemer nişli ve vitrinli kahve ünitesi",
  "category": "kahve-kosesi"
 },
 {
  "id": "2lVJ2LCpT",
  "group": "atelier",
  "title": "Ahşap gövdeli dar kahve ünitesi",
  "category": "kahve-kosesi"
 },
 {
  "id": "484Ae4eNQ",
  "group": "shared",
  "title": "Cam kapaklı ahşap plak konsolu",
  "category": "ozel-tasarim"
 },
 {
  "id": "5mqOqX5LH",
  "group": "shared",
  "title": "Çekmeceli yuvarlak yan sehpa",
  "category": "sehpa"
 },
 {
  "id": "5i4CyJrkM",
  "group": "shared",
  "title": "Boy aynalı ahşap depolama ünitesi",
  "category": "ozel-tasarim"
 },
 {
  "id": "1pLUfH5pe",
  "group": "shared",
  "title": "Kademeli çekmeceli dekoratif konsol",
  "category": "ozel-tasarim"
 },
 {
  "id": "885027764302674185",
  "group": "curated",
  "title": "Cam kapaklı kompakt kahve dolabı",
  "category": "kahve-kosesi"
 },
 {
  "id": "364580532351649400",
  "group": "curated",
  "title": "Kavis boyunca kayan çıtalı kapak",
  "category": "ozel-tasarim"
 },
 {
  "id": "748653138104147118",
  "group": "curated",
  "title": "Pencere önünde bank ve kitaplık",
  "category": "ozel-tasarim"
 },
 {
  "id": "362610207521373861",
  "group": "curated",
  "title": "İçinde saklama alanı olan ahşap bank",
  "category": "vestiyer"
 },
 {
  "id": "799037158930919259",
  "group": "curated",
  "title": "Üst çekmeceli kompakt çalışma masası",
  "category": "ozel-tasarim"
 },
 {
  "id": "4595501306841470848",
  "group": "curated",
  "title": "Kitaplıkla bütünleşen okuma köşesi",
  "category": "ozel-tasarim"
 }
] as const;
/** The first four are an editorial window, never a destructive catalogue limit. */
export function visiblePinterestReferences(group:string,expanded=false){
 const entries=pinterestReferences.filter(p=>p.group===group);
 return expanded?entries:entries.slice(0,4);
}
export const mainNavigation=[['/projeler','Bitirdiğimiz İşler'],['/ilham-modelleri','İlham Alın'],['/modelini-getir','Kendi Modelinizi Getirin'],['/tasarim-masasi','3D Stüdyo'],['/atolye','Atölye'],['/iletisim','İletişim']] as const;
export function categoryName(id:string){return workCategories.find(c=>c.id===id)?.name||'Özel Tasarım'}
export function modelHref(ref:string,category='ozel-tasarim',note='',sourceId=''){
 const work=works.find(w=>note.startsWith(w.subtitle)),concept=concepts.find(c=>note.startsWith(c.subtitle));
 const pin=pinterestReferences.find(p=>ref===pinReferenceUrl(p.id)||ref===pinLookup[p.id]?.canonical);
 const source=sourceId||(ref&&pin?'pin:'+pin.id:!ref&&work?'work:'+work.id:!ref&&concept?'concept:'+concept.id:'');
 const q=new URLSearchParams({ref,kategori:category,fikir:note});if(source)q.set('kaynak',source);
 return '/modelini-getir?'+q.toString();
}
