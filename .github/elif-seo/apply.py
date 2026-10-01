from pathlib import Path
import json
r=Path.cwd()
def rep(p,old,new):
 f=r/p;s=f.read_text();assert old in s,(p,old[:90]);f.write_text(s.replace(old,new))
# Prioritize the visible hero only. Neighbor images can prepare without high priority.
rep('src/components/PortfolioUI.tsx',"full=false}:{asset", "full=false,priority,onLoad}:{asset")
rep('src/components/PortfolioUI.tsx','full?:boolean})','full?:boolean;priority?:\'high\'|\'low\'|\'auto\';onLoad?:()=>void})')
rep('src/components/PortfolioUI.tsx',"fetchPriority={eager?'high':'auto'}", "fetchPriority={priority||(eager?'high':'auto')} onLoad={onLoad}")
rep('src/components/PortfolioUI.tsx',"decoding={eager?'sync':'async'}", "decoding={priority==='low'?'async':eager?'sync':'async'}")
f=r/'src/pages/Home.tsx';s=f.read_text().replace('chapter:number;paused:boolean','chapter:number;paused:boolean;requested:number[]').replace('chapter:0,paused:false','chapter:0,paused:false,requested:[0,1]');s=s.replace('private timer:number|undefined;', 'private alive=false;private serial=0;private timer:number|undefined;')
s=s.replace('componentDidMount(){this.motion=', 'componentDidMount(){this.alive=true;this.motion=');s=s.replace('componentWillUnmount(){window.clearInterval', 'componentWillUnmount(){this.alive=false;this.serial++;window.clearInterval')
s=s.replace('reschedule=()=>{window.clearInterval','reschedule=()=>{this.serial++;window.clearInterval')
s=s.replace("window.setInterval(()=>this.setState(s=>({scene:(s.scene+1)%scenes.length})),5000)","window.setInterval(()=>this.setScene((this.state.scene+1)%scenes.length),5000)")
s=s.replace('setScene=(scene:number)=>this.setState({scene},this.reschedule);', '''warm=(scene:number)=>{const next=(scene+1)%scenes.length;if(!this.state.requested.includes(next))this.setState(s=>({requested:[...s.requested,next]}));};
 setScene=(scene:number)=>{const token=++this.serial;this.setState(s=>({requested:s.requested.includes(scene)?s.requested:[...s.requested,scene]}),async()=>{const img=this.hero?.querySelector('[data-slide="'+scene+'"] img') as HTMLImageElement|null;if(!img)return;try{await img.decode();if(!img.naturalWidth)throw Error('not-ready');if(this.alive&&token===this.serial)this.setState({scene},()=>{this.warm(scene);this.reschedule()});}catch{if(this.alive&&token===this.serial)this.reschedule();}})};''')
alts=["Ahşap görünümlü oval yemek masası, sandalyeler ve aydınlatmalı mutfak. Konsept model.","Cam kapaklı gardıroplar, aydınlatılmış raflar ve orta depolama adası. Giyinme odası konsepti.","Cam yan vitrinler, kemerli raflar ve çekmeceli kahve dolabı. Konsept model.","Oval orta sehpa ve iç içe zigonlar bulunan oturma alanı. Konsept model.","Dikey çizgili TV paneli, açık raflar ve kapalı alt depolama. Konsept model."]
for img,alt in zip(['concept-hero','concept-gardrop','concept-kahve','concept-sehpa','concept-tv'],alts):s=s.replace("image:'"+img+"',caption:","image:'"+img+"',alt:"+json.dumps(alt,ensure_ascii=False)+",caption:")
s=s.replace('<VImage asset={sc.image} alt={sc.caption+\' Konsept model.\'} eager full sizes="100vw"/>','{s.requested.includes(i)&&<VImage asset={sc.image} alt={sc.alt} eager priority={i===0?\'high\':\'low\'} full sizes="100vw"/>}')
f.write_text(s)
# Existing category URLs gain source-aware preparation content. No fake interviews or new locations.
rep('src/pages/Portfolio.tsx',"import {ScopeNotes", "import {ServiceGuide} from '../components/ServiceGuide';\nimport {ScopeNotes")
rep('src/pages/Portfolio.tsx','<CategoryDecision category={cat.id} navigate={a.navigate}/>','<CategoryDecision category={cat.id} navigate={a.navigate}/><ServiceGuide category={cat.id} navigate={a.navigate}/>')
rep('src/pages/BringModel.tsx',"import {createElement", "import {PreparationHint} from '../components/ServiceGuide';\nimport {createElement")
rep('src/pages/BringModel.tsx','<div className="model-form"><','<div className="model-form"><PreparationHint category={v.category}/><')
# Shared title and publication policy. Default remains a noindex preview.
f=r/'src/lib/routes.ts';s=f.read_text();titles={'/':'İstanbul Özel Ölçü Mobilya Atölyesi | Elif Tasarım','/kategoriler/kahve-kosesi':'Özel Ölçü Kahve Köşesi Dolabı | Elif Tasarım','/kategoriler/mutfak':'İstanbul Özel Ölçü Mutfak Dolabı | Elif Tasarım','/kategoriler/tv-unitesi':'Ölçüye Özel TV Ünitesi ve Depolama | Elif Tasarım','/rehber/bakim':'Ahşap Mobilya Bakımı. Yüzeye Göre Temizlik | Elif Tasarım','/rehber/olcu-alma':'Özel Mobilya İçin Ölçü Hazırlığı | Elif Tasarım','/rehber/malzeme-secimi':'Mobilyada Gövde, Kapak ve Yüzey Seçimi | Elif Tasarım'}
s='export const seoTitles:Record<string,string>='+json.dumps(titles,ensure_ascii=False)+';\n'+s
s=s.replace("const p = path.split('?')[0]; if(p===", "const p = path.split('?')[0]; if(seoTitles[p])return seoTitles[p]; if(p===",1)
a=s.index('export function indexableRoute(');b=s.index('export function pageSchema',a)
approved=['/','/hakkimizda','/iletisim','/projeler','/kategoriler','/ozel-uretim','/hizmet-ve-teklif','/rehber','/rehber/bakim','/rehber/olcu-alma','/rehber/malzeme-secimi','/kategoriler/kahve-kosesi','/kategoriler/mutfak','/kategoriler/tv-unitesi','/proje/kemerli-kahve-kosesi','/proje/sade-kose-mutfak','/proje/isikli-tv-unitesi','/tasarim-masasi']
s=s[:a]+'export const seoApprovedRoutes='+json.dumps(approved)+';\nexport function indexableRoute(path:string){return seoApprovedRoutes.includes(path.split(\'?\')[0]);}\nexport function pageRobots(path:string,approved:boolean){return approved&&indexableRoute(path)?\'index,follow\':\'noindex,nofollow\';}\n'+s[b:];f.write_text(s)
# Metadata parity, static HTML controls initial crawl as well as hydrated navigation.
rep('src/App.tsx','pageDescription,','pageDescription,pageRobots,')
rep('src/App.tsx',"setMeta('description',description);","setMeta('description',description);setMeta('robots',pageRobots(route,document.documentElement.dataset.indexable==='true')); ")
f=r/'tools/build-v23.cjs';s=f.read_text().replace("'src/studio-unified.css']","'src/studio-unified.css','src/seo.css']").replace('pageSchema,indexableRoute}=load','pageSchema,indexableRoute,pageRobots,seoApprovedRoutes}=load')
s=s.replace('data-site="\'+esc(site)+\'">','data-site="\'+esc(site)+\'" data-indexable="\'+(indexable?\'true\':\'false\')+\'">')
s=s.replace("(indexable&&!offline&&indexableRoute(route)?'index,follow':'noindex,nofollow')","pageRobots(route,indexable&&!offline)")
s=s.replace('<meta property="og:locale" content="tr_TR">','<meta property="og:locale" content="tr_TR"><meta property="og:site_name" content="Elif Tasarım">')
s=s.replace("fs.writeFileSync(out+'/robots.txt'", "fs.writeFileSync(out+'/seo-readiness.json',JSON.stringify({currentMode:indexable?'approved-publication':'noindex-preview',editoriallyApprovedRoutes:seoApprovedRoutes,pendingReview:routeList.filter(r=>!seoApprovedRoutes.includes(r)),businessInputsPending:['confirmed hours','address/visit policy','material samples','actual interviews'],noNewTracking:true},null,2));\nfs.writeFileSync(out+'/robots.txt'")
s=s.replace('v23.2-interactive','v23.3-seo-content').replace("baseline:'673d874943b5de26255e5ce6980437b388e7f3b9'","baseline:'72923f20ee73011178b57fe1703b841e997ec562'");f.write_text(s)
# Record a minor content release, preserving historical scripts and real runtime libraries.
for name in ['package.json','package-lock.json']:
 f=r/name;s=f.read_text().replace('0.23.2','0.23.3');
 if name=='package.json':
  d=json.loads(s);d['scripts']['test']+=' tests/seo/*.cjs';d['scripts']['typecheck:core']+=' src/lib/service-content.ts';s=json.dumps(d,ensure_ascii=False,indent=2)+'\n'
 f.write_text(s)
for f in (r/'tests').rglob('*'):
 if f.suffix not in ['.cjs','.py','.mjs'] or 'seo' in f.parts:continue
 s=f.read_text().replace('0.23.2','0.23.3').replace('v23.2-interactive','v23.3-seo-content');f.write_text(s)
