import {createElement,Component} from 'react';
import {Icon} from './ui';
type Props={text:string;id:string;label?:string};
/** Writes only the explicitly requested text. Never reads the clipboard. */
export class TextCopy extends Component<Props,{manual:boolean;status:string;busy:boolean}>{
 state={manual:false,status:'',busy:false};private alive=true;
 componentWillUnmount(){this.alive=false}
 componentDidUpdate(previous:Props){if(previous.text!==this.props.text&&(this.state.manual||this.state.status||this.state.busy))this.setState({manual:false,status:'',busy:false})}
 copy=async()=>{const text=this.props.text;this.setState({busy:true,status:''});try{if(!navigator.clipboard?.writeText)throw Error('unavailable');await navigator.clipboard.writeText(text);if(this.alive&&text===this.props.text)this.setState({busy:false,manual:false,status:'Kopyalandı. Seçtiğiniz görüşmeye kendiniz yapıştırabilirsiniz.'})}catch{if(this.alive&&text===this.props.text)this.setState({busy:false,manual:true,status:'Panoya erişilemedi. Aşağıdaki metni seçip kendiniz kopyalayın veya özet dosyasını indirin.'},()=>{const input=document.getElementById(this.props.id) as HTMLTextAreaElement|null;input?.focus({preventScroll:true});input?.select()})}};
 render(){return <div className="v22-copy"><button type="button" className="text-link" disabled={this.state.busy} onClick={this.copy}>{this.props.label||'Tam özeti kopyala'} <Icon name="copy" size={17}/></button>{this.state.status&&<p className="v22-copy-status" role="status">{this.state.status}</p>}{this.state.manual&&<div className="v22-manual-copy"><label htmlFor={this.props.id}>Elle kopyalanacak metin</label><textarea id={this.props.id} readOnly rows={6} value={this.props.text}/></div>}</div>}
}
