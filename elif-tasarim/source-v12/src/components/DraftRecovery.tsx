import {createElement,Component} from 'react';
import {Icon} from './ui';
import {projectStore,attachmentStore} from '../lib/project';
import {encodeDraft,decodeDraft,MAX_BACKUP_BYTES,type BackupRead} from '../lib/draft-recovery';
import {draftSession} from '../lib/draft-session';
import {downloadText} from '../lib/domain';
type Props={onRestore:()=>void};
type State={enabled:boolean;message:string;record:BackupRead;busy:boolean};
export class DraftRecovery extends Component<Props,State>{
 state:State={enabled:false,message:'',record:{kind:'empty'},busy:false};private unsubscribe:(()=>void)|null=null;private alive=true;
 componentDidMount(){this.refresh();this.unsubscribe=draftSession.subscribe(this.refresh)}
 componentWillUnmount(){this.alive=false;this.unsubscribe?.()}
 refresh=()=>{if(this.alive)this.setState(draftSession.status())};
 restore=()=>{const r=draftSession.status().record;if(r.kind!=='ready'||!r.draft){this.refresh();return}if(!window.confirm('Kayıtlı metin ve ölçüler bu açık taslağın yerine getirilsin mi? Açık taslaktaki fotoğraflar kaldırılır, onları yeniden eklemeniz gerekir.'))return;attachmentStore.clear();draftSession.restore(r.draft);this.props.onRestore();this.refresh();this.setState({message:'Taslak geri yüklendi. Fotoğrafları yeniden ekleyin. Otomatik cihaz kaydı için aşağıdaki izni ayrıca açabilirsiniz.'});};
 enable=(checked:boolean)=>{if(checked){if(this.state.record.kind==='ready'&&!this.state.enabled&&!window.confirm('Bu cihazdaki önceki kurtarma kaydı, açık taslağınızla değiştirilsin mi?'))return;draftSession.enable()}else draftSession.disable();this.refresh()};
 export=()=>{try{downloadText('Elif_Proje_Taslagi.json',encodeDraft(projectStore.get()));this.setState({message:'Kurtarma dosyası hazırlandı. Kendi notunuz ve yazdığınız bölge dosyadadır. Özel dosyanızı güvenli saklayın. Fotoğraflar dahil değil.'})}catch(e){this.setState({message:e instanceof Error?e.message:'Taslak dosyası oluşturulamadı.'})}};
 import=async(file:File|undefined)=>{if(!file||this.state.busy)return;if(file.size>MAX_BACKUP_BYTES){this.setState({message:'En fazla 96 KB Elif taslak dosyası açılabilir.'});return}this.setState({busy:true});try{const value=decodeDraft(await file.text());if(!this.alive)return;if(!window.confirm('Dosyadaki proje, bu açık taslağın yerine açılsın mı? Mevcut fotoğraflar kaldırılır. İşlem atölyeye hiçbir veri göndermez.'))return;attachmentStore.clear();draftSession.restore(value);this.props.onRestore();this.refresh();this.setState({message:'Dosyadaki taslak açıldı. Fotoğrafları yeniden ekleyin. Atölyeye otomatik gönderilmedi.'});}catch(e){if(this.alive)this.setState({message:e instanceof Error?e.message:'Taslak dosyası okunamadı.'})}finally{if(this.alive)this.setState({busy:false})}};
 render(){const s=this.state,pending=s.record.kind==='ready'&&!s.enabled;return <details className="v21-recovery" open={pending}>
 <summary><span><Icon name="download" size={18}/> Fikrinize daha sonra devam edin</span><small>{s.enabled?'Cihaz kurtarması açık':pending?'Kayıtlı taslak bulundu':'İsteğe bağlı, yalnız sizin cihazınızda'}</small></summary>
 <div className="v21-recovery-body"><p>Not, model ve ölçülerinizi koruyun. Varsayılan olarak yalnız açık sekmededir. Fotoğraflar ve ilham dosyanız bu kurtarma kaydına dahil değildir.</p>
 {pending&&<div className="v21-restore-notice"><strong>Önceki taslağınız bu cihazda duruyor.</strong><p>Geri yüklemeden önce açık taslağınızı dosya olarak saklayabilirsiniz.</p><button type="button" className="button" onClick={this.restore}>Kayıtlı taslağı geri getir</button><button type="button" className="text-link" onClick={()=>{draftSession.disable();this.refresh()}}>Cihazdaki kaydı sil</button></div>}
 <label className="v21-save-consent"><input type="checkbox" checked={s.enabled} onChange={e=>this.enable(e.currentTarget.checked)}/><span>Metin ve ölçülerimi bu cihazda 7 gün sakla<small>Seçince sonraki değişiklikler de kaydedilir. Son kayıttan yedi gün sonra, site tekrar kontrol ettiğinde kurtarma kaydı silinir. Ortak cihazlarda kullanmayın. Bu kayıt şifreli bir müşteri hesabı değildir.</small></span></label>
 <div className="v21-recovery-actions"><button type="button" className="button button-outline" onClick={this.export}>Taslak dosyasını indir <Icon name="download" size={16}/></button><label className="button button-outline v21-import">Taslak dosyasını aç<input type="file" accept=".json,application/json" aria-label="Elif proje taslağı dosyasını aç" disabled={s.busy} onChange={e=>{const file=e.currentTarget.files?.[0];e.currentTarget.value='';void this.import(file)}}/></label></div>
 <p className="field-hint">İndirilen JSON dosyası özel notlarınızı içerebilir. Herkese açık masa karşılaştırma dosyasından farklıdır. Kaydetmek veya açmak, atölyeye talep göndermez.</p>
 {s.record.kind==='invalid'&&<p role="status">Cihazdaki kurtarma kaydı okunamıyor. Açık taslağınız değiştirilmedi. Önceki kaydı cihaz tercihleri alanından silebilirsiniz.</p>}
 {s.record.kind==='expired'&&<p role="status">Önceki kurtarma kaydının süresi dolmuş ve bu cihazdan silinmiş.</p>}
 {s.record.kind==='unavailable'&&<p role="status">Tarayıcı depolaması kullanılamıyor. Taslak dosyasını indirerek devam edebilirsiniz.</p>}
 {s.message&&<p className="v21-recovery-status" role="status">{s.message}</p>}</div></details>}
}
