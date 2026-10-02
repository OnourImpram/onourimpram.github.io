import {createElement,Fragment} from 'react';
import {serviceContent} from '../lib/service-content';
import {works,concepts,workPhotoEvidence} from '../lib/portfolio';
import {Eyebrow,TextLink,ButtonLink} from './ui';
import {VImage,SourceTag} from './PortfolioUI';
export function ServiceGuide({category,navigate}:{category:string;navigate:(p:string)=>void}){
 const x=serviceContent[category];if(!x)return null;
 const project=x.project?works.find(p=>p.id===x.project):undefined;
 const concept=x.concept?concepts.find(c=>c.id===x.concept):undefined;
 const photo=project?workPhotoEvidence(project):undefined;
 return <section className="wrap seo-service-guide" aria-label="Özel üretim karar rehberi">
 <header><Eyebrow>ALANINIZA GÖRE DÜŞÜNELİM</Eyebrow><h2>{x.title}</h2><p>{x.intro}</p></header>
 <div className={'seo-decisions'+(x.sections.length===3?' three':'')}>{x.sections.map(([title,text],i)=><article key={title}><span className="eyebrow">0{i+1}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
 {project&&photo&&<div className="seo-real-example"><div><VImage asset={photo.image} alt={project.subtitle+'. '+photo.caption} sizes="(max-width: 800px) 90vw, 40vw"/><SourceTag kind={photo.kind}/></div><div><Eyebrow>KENDİ ARŞİVİMİZDEN</Eyebrow><h3>{project.subtitle}</h3><p>{project.description}</p><TextLink to={'/proje/'+project.id} navigate={navigate}>Gerçek çalışmayı incele</TextLink><p className="field-hint">Fotoğrafta görünen düzeni anlatıyoruz. Müşteri hikâyesi, kesin ölçü ve teknik malzeme kaydı değildir.</p></div></div>}
 {concept&&<div className="seo-real-example seo-concept-example"><div><VImage asset={concept.image} alt={concept.subtitle+'. Konsept model, tamamlanmış iş değildir.'} sizes="(max-width: 800px) 90vw, 40vw"/><SourceTag kind="concept"/></div><div><Eyebrow>KONSEPTTEN BİR FİKİR</Eyebrow><h3>{concept.subtitle}</h3><p>Birlikte ve ayrı kullanım düşüncesini bu temsili görselden başlayarak konuşabiliriz. Bu, atölyenin tamamladığı bir proje değildir.</p><TextLink to={'/ilham-modelleri?hedef='+encodeURIComponent('concept:'+concept.id)} navigate={navigate}>Bu fikri incele</TextLink></div></div>}
 <div className="seo-preparation"><h3>Görüşme öncesi küçük bir hazırlık.</h3><ul>{x.preparation.map(v=><li key={v}>{v}</li>)}</ul><p>Hepsini hazırlamanız gerekmiyor. Bildiklerinizle başlayabilirsiniz.</p><ButtonLink to={'/modelini-getir?kategori='+category} navigate={navigate}>Bu bilgilerle fikrimi hazırlayayım</ButtonLink><p className="field-hint">{x.note}</p><div className="seo-guide-links"><TextLink to="/rehber/olcu-alma" navigate={navigate}>Ölçü hazırlığı</TextLink><TextLink to="/rehber/malzeme-secimi" navigate={navigate}>Malzeme kararı</TextLink><TextLink to="/hizmet-ve-teklif" navigate={navigate}>Teklif kapsamı</TextLink></div></div>
 </section>
}
export function PreparationHint({category}:{category:string}){const x=serviceContent[category];return x?<details className="seo-form-hint"><summary>Bu ürün için hangi bilgiyi paylaşabilirim?</summary><ul>{x.preparation.map(v=><li key={v}>{v}</li>)}</ul><p>Bu bir zorunlu alan listesi değil. İsterseniz açıklama notunuza ekleyin. Üretim ölçüsü ayrıca teyit edilir.</p></details>:null;}
