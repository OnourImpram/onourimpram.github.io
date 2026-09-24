import {createElement,Fragment,Component} from 'react';
import {Icon,Dialog} from './ui';
import {pinLookup} from '../lib/pinterest';
/** Official Pinterest widget runs only after a visitor asks, inside an opaque sandbox. */
export class PinterestPreview extends Component<{pin:string},{open:boolean}>{
 state={open:false};
 render(){const pin=pinLookup[this.props.pin];if(!pin)return null;
 const doc='<!doctype html><html><head><meta name="referrer" content="no-referrer"><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{margin:0;background:#f6f1e8;display:flex;justify-content:center;padding:12px;font:14px/1.6 Arial;color:#50412e}a{color:inherit}</style></head><body><a href="'+pin.canonical+'" target="_blank" rel="noopener noreferrer" data-pin-do="embedPin" data-pin-width="large">Pinterest kaynağını aç</a><script async defer src="https://assets.pinterest.com/js/pinit.js"></script></body></html>';
 return <><button className="pin-preview-button" onClick={()=>this.setState({open:true})}><Icon name="plus" size={17}/>Pinterest görselini yükle</button>
 {this.state.open&&<Dialog title={pin.label} onClose={()=>this.setState({open:false})}><div className="pin-preview-dialog"><p>Pinterest'in kendi görüntüleyicisi yüklenir. Pinterest'e bağlantı kurulur ve çerez kullanılabilir. Bu model, tamamladığımız bir iş değildir.</p><iframe title={pin.label+' Pinterest görseli'} srcDoc={doc} sandbox="allow-scripts allow-popups" referrerPolicy="no-referrer" loading="eager"/><p>Görsel yüklenmezse veya erişim istenirse <a href={pin.canonical} target="_blank" rel="noopener noreferrer">Pinterest'te açın <Icon name="diagonal" size={15}/></a>.</p></div></Dialog>}</>}
}
