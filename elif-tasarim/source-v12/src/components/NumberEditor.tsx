import {createElement,Component} from 'react';
import {parseWholeNumber} from '../lib/design-board';
type Props={value:number;min:number;max:number;label:string;onCommit:(v:number)=>void};
export class NumberEditor extends Component<Props,{text:string;error:boolean}>{
 constructor(p:Props){super(p);this.state={text:String(p.value),error:false};}
 componentDidUpdate(prev:Props){if(prev.value!==this.props.value)this.setState({text:String(this.props.value),error:false});}
 commit=()=>{const n=parseWholeNumber(this.state.text,this.props.min,this.props.max);if(n===null){this.setState({text:String(this.props.value),error:true});return;}this.setState({text:String(n),error:false});if(n!==this.props.value)this.props.onCommit(n);};
 render(){const p=this.props,s=this.state;return <span className="v20-number-editor"><input type="text" role="spinbutton" inputMode="numeric" aria-label={p.label} aria-valuemin={p.min} aria-valuemax={p.max} aria-valuenow={p.value} aria-invalid={s.error||undefined} value={s.text} onInput={e=>this.setState({text:e.currentTarget.value,error:false})} onBlur={this.commit} onKeyDown={e=>{if(e.key==='Enter'){e.preventDefault();this.commit();}if(e.key==='Escape')this.setState({text:String(p.value),error:false});if(e.key==='ArrowUp'||e.key==='ArrowDown'){e.preventDefault();const n=Math.min(p.max,Math.max(p.min,p.value+(e.key==='ArrowUp'?1:-1)));this.setState({text:String(n),error:false});p.onCommit(n);}}}/>{s.error&&<small role="status">{p.min} ile {p.max} arasında tam sayı girin. Önceki değer korundu.</small>}</span>}
}
