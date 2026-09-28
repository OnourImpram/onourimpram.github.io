import {createElement, Component} from 'react';
type Props = {src: string; alt: string; srcSet?: string; sizes?: string; className?: string; fallbackSrc?: string; [key: string]: any};
type State = {retried: boolean; failed: boolean};
/** Keep a real img in successful layouts. One retry only, then an explicit accessible state. */
export class ResilientImage extends Component<Props, State> {
 state: State = {retried: false, failed: false};
 private element: HTMLImageElement | null = null;
 onError = () => {
  if (this.state.failed) return;
  this.setState(this.state.retried ? {failed: true} : {retried: true});
 };
 componentDidMount() {
  if (this.element?.complete && !this.element.naturalWidth) this.onError();
 }
 componentDidUpdate(previous: Props) {
  if (previous.src !== this.props.src || previous.srcSet !== this.props.srcSet)
   this.setState({retried: false, failed: false});
 }
 render() {
  const {fallbackSrc, src, srcSet, alt, className = '', ...rest} = this.props;
  if (this.state.failed) return <span className={'image-unavailable ' + className} role="status"><strong>Görsel yüklenemedi.</strong><span>{alt || 'Bu bölümün görseli şu anda görüntülenemiyor.'}</span><small>Sayfadaki bilgiler ve iletişim seçenekleri kullanılabilir. Bağlantınız düzeldiğinde sayfayı yeniden açabilirsiniz.</small></span>;
  const fallback = fallbackSrc || src;
  const retry = fallback.startsWith('data:') || fallback.startsWith('blob:') ? fallback : fallback + (fallback.includes('?') ? '&' : '?') + 'elif-image-retry=1';
  return <img {...rest} className={className} src={this.state.retried ? retry : src} srcSet={this.state.retried ? undefined : srcSet} alt={alt} ref={el => {this.element = el;}} onError={this.onError}/>;
 }
}
