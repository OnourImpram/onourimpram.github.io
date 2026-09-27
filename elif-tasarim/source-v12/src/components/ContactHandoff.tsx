import {createElement,Fragment,Component} from 'react';
import {Icon,Eyebrow} from './ui';
import {whatsappMessage} from '../lib/project';
import {TextCopy} from './TextCopy';
import {ContactAlternatives} from './ContactAlternatives';
type Props={text:string;photos:number};
export class ContactHandoff extends Component<Props,{chosen:boolean}>{
 state={chosen:false};
 componentDidUpdate(previous:Props){if(previous.text!==this.props.text&&this.state.chosen)this.setState({chosen:false})}
 render(){const transfer=whatsappMessage(this.props.text);return <>
 <section className="v7-handoff v22-handoff" aria-labelledby="v22-handoff-title"><Eyebrow>DOĞRUDAN YUNUS USTA</Eyebrow><h3 id="v22-handoff-title">Özetiniz hazır. Son adımı tamamlayalım.</h3><p>Hazır metni WhatsApp'ta kontrol edip gönderin. İsterseniz e-posta, telefon veya SMS ile de devam edebilirsiniz.</p>
 {transfer.needsAttachment&&<div className="v11-long-message" role="note"><strong>Özetiniz tek bağlantı için uzun.</strong><p>WhatsApp aşağıdaki kısa girişle açılır. Tam özeti kopyalayıp yapıştırın veya indirdiğiniz dosyayı görüşmeye ekleyin.</p><pre id="whatsapp-actual-message">{transfer.sentText}</pre></div>}
 <a className="button" data-whatsapp-message={transfer.needsAttachment?'short-with-attachment':'complete'} href={transfer.url} target="_blank" rel="noopener noreferrer" onClick={()=>this.setState({chosen:true})}>Yunus Usta’ya WhatsApp’ta yaz <Icon name="diagonal"/></a>
 <p className="field-hint">Mesajı uygulamada siz gönderirsiniz. Bu sitede henüz sipariş veya gönderim kaydı oluşmaz.</p>
 {this.state.chosen&&<div className="v22-next-action" role="status"><strong>Son adım, açılan görüşmede.</strong><ol><li>Hazır mesajı kontrol edip Gönder düğmesine basın.</li><li>{this.props.photos?this.props.photos+' görseliniz var. Bunları ayrıca ekleyin veya aşağıdaki proje ZIP dosyasını belge olarak paylaşın.':'Görsel paylaşmak isterseniz görüşmeye ayrıca ekleyebilirsiniz.'}</li><li>Uygulama açılmadıysa e-posta veya kopyalama yolunu kullanın. Hazırladığınız özet bu sayfada duruyor.</li></ol><p>Uygulamanın açıldığını, gönderimi veya okunma bilgisini bu site doğrulamaz.</p></div>}
 </section>
 <TextCopy text={this.props.text} id="v22-summary-copy"/>
 <ContactAlternatives text={this.props.text}/>
 </>}
}
