import {createElement,Fragment} from 'react';
import {DeskExperience} from '../components/DeskExperience';
import {StudioGuide} from '../components/StudioGuide';
import {type PageProps} from '../components/ui';
export function DesignDesk(props:PageProps&{query?:string}){return <>
 <nav className="wrap studio-local-nav" aria-label="3D Stüdyo bölümleri">{[['studio-deneyimi','3D deneyimi'],['studio-baslangic','Başlangıç modelleri'],['studio-yaklasim','Kullanım ayrıntıları'],['studio-detay','Malzeme ve işçilik']].map(([id,label])=><a key={id} href={'#'+id} onClick={e=>{e.preventDefault();document.getElementById(id)?.scrollIntoView({behavior:'auto'});}}>{label}</a>)}</nav>
 <section id="studio-deneyimi" className="wrap v8-studio-page"><DeskExperience {...props}/></section>
 <StudioGuide navigate={props.navigate}/>
 </>}
