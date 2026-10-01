import {createElement} from 'react';
import {projectReadiness} from '../lib/project-readiness';
import {type ProjectDraft} from '../lib/project';
import {Icon} from './ui';
export function ProjectReadiness({draft,photos}:{draft:ProjectDraft;photos:number}){return <section className="project-readiness" aria-labelledby="project-readiness-title"><h3 id="project-readiness-title">Projeniz, bir bakışta.</h3><div>{projectReadiness(draft,photos).map(row=><article key={row.id} data-readiness={row.id} data-ready={row.ready?'true':'false'}><Icon name={row.ready?'check':'info'} size={18}/><div><strong>{row.title}</strong><p>{row.detail}</p></div></article>)}</div></section>}
