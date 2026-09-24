export type WorkCategory='mutfak'|'tv-unitesi'|'vestiyer'|'gardrop'|'kahve-kosesi'|'sehpa'|'pergola'|'ozel-tasarim';
export type Work={id:string;title:string;category:WorkCategory;images:string[];status:'work'|'process';subtitle:string;description:string;features:string[]};
export const workCategories=[
 {id:'mutfak',name:'Mutfak',short:'Mutfak',image:'concept-mutfak',line:'Günün başladığı, evin buluştuğu yer.',detail:'Kapak düzeninden depolama alanlarına, ölçünüz ve kullanım alışkanlıklarınız etrafında tasarlanan mutfaklar.'},
 {id:'tv-unitesi',name:'TV Ünitesi',short:'Yaşam alanı',image:'concept-tv',line:'Salonunuzun sakin odağı.',detail:'Duvar panelleri, raflar ve kapalı depolamayı bir araya getiren, mekâna göre şekillenen TV üniteleri.'},
 {id:'vestiyer',name:'Vestiyer',short:'Antre',image:'concept-vestiyer',line:'Evin ilk karşılaması.',detail:'Giriş alanında askılık, ayakkabı ve günlük eşyalar için yer açan ölçüye özel çözümler.'},
 {id:'gardrop',name:'Gardırop',short:'Giyinme alanı',image:'concept-gardrop',line:'Her şeyin kendine ait bir yeri.',detail:'Kapak, raf, çekmece ve askı alanlarının birlikte düşünüldüğü gardırop ve giyinme çözümleri.'},
 {id:'kahve-kosesi',name:'Kahve Köşesi',short:'Kahve köşesi',image:'concept-kahve',line:'Kendinize ayırdığınız küçük bir an.',detail:'Kahve ekipmanınız ve servis alışkanlıklarınız için vitrin, raf ve tezgâhı buluşturan özel köşeler.'},
 {id:'sehpa',name:'Orta Sehpa ve Zigon Sehpa',short:'Sehpa & zigon',image:'concept-sehpa',line:'Bazen küçük bir parça her şeyi değiştirir.',detail:'Orta sehpa, yan sehpa ve iç içe geçen zigon fikirleri. Beğendiğiniz formu alanınıza göre birlikte değerlendirelim.'},
 {id:'pergola',name:'Pergola ve Açık Alan Yapıları',short:'Bahçe & dış mekân',image:'concept-pergola',line:'Hayata dışarıda da yer açalım.',detail:'Bahçe ve açık alan için ahşap kamelya ve üst yapı çalışmaları. Uygulama koşulları ve teknik uygunluk ayrıca değerlendirilir.'},
 {id:'ozel-tasarim',name:'Özel Tasarım Projeler',short:'Size özel',image:'concept-model',line:'Katalogda olmayan bir fikriniz mi var?',detail:'Mekânınız, çiziminiz veya bir referansınız üzerinden başlarız. Ne üretilebileceğini birlikte netleştiririz.'},
] as const;
export const works:Work[]=[
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
 {id:'ahsap-bahce-kamelyasi',title:'Dışarıda bir yaşam alanı.',category:'pergola',images:['r19','r23'],status:'work',subtitle:'Ahşap kamelya ve uygulama detayları',description:'Ahşap taşıyıcılar, çatı ve korkuluklarıyla açık alan çalışması. Paylaşılan fotoğraflar uygulama sırasındaki sahadan görünüşleri de içerir.',features:['Ahşap çatı strüktürü','Çapraz korkuluk detayları','Sahada uygulama']},
 {id:'yatak-cevresi-depolama',title:'Odaya göre düşünülmüş.',category:'ozel-tasarim',images:['r09'],status:'work',subtitle:'Yatak çevresi dolap uygulaması',description:'Yatak çevresini depolama alanına dönüştüren, düşey ve yatay dolapların birlikte yer aldığı özel çalışma.',features:['Yatak çevresi yerleşim','Üst dolap alanı','Yan depolama bölmeleri']},
 {id:'mutfak-kurulum-asamasi',title:'Görünmeyen emeğin bir anı.',category:'mutfak',images:['r12'],status:'process',subtitle:'Mutfak montaj aşaması',description:'Koruyucu filmler ve devam eden kurulum fotoğrafta görünür. Bu, bitmiş mutfağın son çekimi değildir. Kapakların nihai rengi koruyucu filmden çıkarılamaz.',features:['Sahada dolap yerleşimi','Koruyucu filmli yüzeyler','Devam eden kurulum']},
 {id:'klasik-mutfak-kurulumu',title:'Bir mutfağın şekillendiği an.',category:'mutfak',images:['r15'],status:'process',subtitle:'Klasik mutfak kurulum görüntüsü',description:'Dolaplar yerleşmiş, tezgâh ve cihaz alanlarında hazırlığın sürdüğü bir arşiv görüntüsü. Tamamlanmış teslim fotoğrafı olarak sunulmaz.',features:['Cam detaylı üst dolap','Alt dolap yerleşimi','Kurulum hazırlığı']},
];
export const featuredWorks=['sade-kose-mutfak','isikli-tv-unitesi','kemerli-kahve-kosesi','rafli-depolama','cam-kapak-giyinme','ahsap-bahce-kamelyasi'];
export const concepts=[
 {id:'oval-orta-sehpa',title:'Bir araya gelmenin doğal hâli.',category:'sehpa',image:'concept-sehpa',subtitle:'Oval orta sehpa ve zigon fikri'},
 {id:'kahve-ritueli',title:'Kendinize küçük bir köşe.',category:'kahve-kosesi',image:'concept-kahve',subtitle:'Işıklı vitrin ve kahve köşesi fikri'},
 {id:'sakin-antre',title:'Eve ilk adım.',category:'vestiyer',image:'concept-vestiyer',subtitle:'Banklı ve aynalı vestiyer fikri'},
 {id:'yasam-duvari',title:'Salonun bütününü düşünmek.',category:'tv-unitesi',image:'concept-tv',subtitle:'Panel ve TV ünitesi fikri'},
 {id:'evin-kalbi',title:'Evin kalbinde.',category:'mutfak',image:'concept-mutfak',subtitle:'Açık tonlu mutfak fikri'},
 {id:'duzenli-bir-alan',title:'Düzen için tasarlanmış.',category:'gardrop',image:'concept-gardrop',subtitle:'Cam ve çizgili kapaklarla giyinme fikri'},
 {id:'bahcede-zaman',title:'Gölgesinde güzel zamanlar.',category:'pergola',image:'concept-pergola',subtitle:'Ahşap kamelya fikri'},
 {id:'bir-masanin-etrafinda',title:'Bir masanın etrafında.',category:'ozel-tasarim',image:'concept-hero',subtitle:'Ahşap yemek alanı fikri'},
] as const;
export const pinterestReferences=[
 {id:'3T8k8Pwyv',group:'atelier',title:'Ustanın seçkisi 01',category:'ozel-tasarim'},
 {id:'2lc0S9lQO',group:'atelier',title:'Ustanın seçkisi 02',category:'ozel-tasarim'},
 {id:'41JsOJFNf',group:'atelier',title:'Ustanın seçkisi 03',category:'ozel-tasarim'},
 {id:'46g1kWzDY',group:'atelier',title:'Vestiyer seçkisi 01',category:'vestiyer'},
 {id:'5Wc0LnUYw',group:'atelier',title:'Vestiyer seçkisi 02',category:'vestiyer'},
 {id:'1CZAqZl4m',group:'atelier',title:'Vestiyer seçkisi 03',category:'vestiyer'},
 {id:'601hk2fV2',group:'atelier',title:'Vestiyer seçkisi 04',category:'vestiyer'},
 {id:'80Ac59zMm',group:'atelier',title:'Ustanın seçkisi 04',category:'ozel-tasarim'},
 {id:'484Ae4eNQ',group:'shared',title:'Birlikte seçtiklerimiz 01',category:'ozel-tasarim'},
 {id:'5mqOqX5LH',group:'shared',title:'Birlikte seçtiklerimiz 02',category:'ozel-tasarim'},
 {id:'5i4CyJrkM',group:'shared',title:'Birlikte seçtiklerimiz 03',category:'ozel-tasarim'},
 {id:'1pLUfH5pe',group:'shared',title:'Birlikte seçtiklerimiz 04',category:'ozel-tasarim'},
] as const;
export const mainNavigation=[['/','Anasayfa'],['/hakkimizda','Hakkımızda'],['/projeler','Bitirdiğimiz İşler'],['/kategoriler','Kategoriler'],['/ilham-modelleri','İlham Modelleri'],['/ozel-uretim','Özel Üretim'],['/atolye','Atölye'],['/iletisim','İletişim']] as const;
export function categoryName(id:string){return workCategories.find(c=>c.id===id)?.name||'Özel Tasarım'}
export function modelHref(ref:string,category='ozel-tasarim',note=''){return '/modelini-getir?'+new URLSearchParams({ref,kategori:category,fikir:note}).toString()}
