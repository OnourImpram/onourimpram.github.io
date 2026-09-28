from pathlib import Path
import json
r=Path('elif-tasarim/source-v12')
def edit(p,a,b):
 f=r/p;s=f.read_text();assert a in s,(str(p),a[:100]);f.write_text(s.replace(a,b))
(r/'src/components/ResilientImage.tsx').write_text('''import {createElement, Component} from 'react';
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
''')
edit(Path('src/components/ui.tsx'),"import { publicHref } from '../lib/domain';", "import { publicHref } from '../lib/domain';\nimport { ResilientImage } from './ResilientImage';")
edit(Path('src/components/ui.tsx'),"export function image(name: string) { return typeof window !== 'undefined' && (window as any).__ELIF_ASSETS__?.[name] || '/assets/' + name; }",'''export function image(name: string) {
 const w = typeof window !== 'undefined' ? window as any : null;
 if (w?.__ELIF_ASSETS__?.[name]) return w.__ELIF_ASSETS__[name];
 const base = (w?.__ELIF_BASE__ ?? (typeof document !== 'undefined' ? document.documentElement.dataset.base : '') ?? '').replace(/\\/$/, '');
 const alias: Record<string,string> = {'office.webp':'office-v8.webp', 'joinery.webp':'joinery-v8.webp'};
 return base + '/assets/' + (alias[name] || name);
}''')
edit(Path('src/components/ui.tsx'),'<img src={image(name)} alt={alt} loading={eager ? \'eager\' : \'lazy\'} decoding="async"/>','<ResilientImage src={image(name)} alt={alt} loading={eager ? \'eager\' : \'lazy\'} decoding="async" fetchPriority={eager ? \'high\' : \'auto\'}/>')
p=r/'src/components/PortfolioUI.tsx';s=p.read_text().replace("import {createElement,Fragment} from 'react';","import {createElement,Fragment} from 'react';\nimport {ResilientImage} from './ResilientImage';");s=s.replace('return <img ','return <ResilientImage ');s=s.replace('src={image(fallback.file)} srcSet=', 'src={image(fallback.file)} fallbackSrc={image(max.file)} srcSet=');p.write_text(s)
p=r/'src/main.tsx';s=p.read_text();s=s.replace("const root = document.getElementById('app');",'''const context = window as any;
const html = document.documentElement;
if (context.__ELIF_BASE__ === undefined) context.__ELIF_BASE__ = html.dataset.base || '';
if (context.__ELIF_SITE_URL__ === undefined) context.__ELIF_SITE_URL__ = html.dataset.site;
if (context.__ELIF_INITIAL__ === undefined) context.__ELIF_INITIAL__ = html.dataset.route || '/';
const root = document.getElementById('app');''');p.write_text(s)
p=r/'tools/build-v22.cjs';s=p.read_text();s=s.replace('data-route="\'+esc(route)+\'"><head>','data-route="\'+esc(route)+\'" data-base="\'+esc(base)+\'" data-site="\'+esc(site)+\'"><head>');assert 'data-base' in s;p.write_text(s)
p=r/'src/pages/Devir.tsx';s=p.read_text();s=s.replace("material:'mese' as const", "material:'mese' as const,image:'devir-odak-v23.webp'").replace("material:'ceviz' as const", "material:'ceviz' as const,image:'devir-akis-v23.webp'").replace("material:'koyu' as const", "material:'koyu' as const,image:'devir-hareket-v23.webp'");s=s.replace('name="devir-standing.webp"','name="devir-hareket-v23.webp"').replace('name="devir-detail.webp"','name="devir-detay-v23.webp"').replace('name="atelier-evening-v9.webp"','name="devir-atolye-v23.webp"').replace('ratio="4/5" eager','ratio="3/2" eager').replace('ratio="16/9"/>','ratio="16/9" eager/>').replace('ratio="1"/>','ratio="3/2" eager/>');s=s.replace('<div className={\'v20-start-swatch \'+c.material}/>', '<Photo name={c.image} alt={c.title+\' başlangıcı. \'+c.width+\' × \'+c.depth+\' cm, \'+c.height+\' cm yükseklik, \'+c.material+\' görünümü. Gerçek 3D modelden konsept.\'} ratio="3/2" caption={false} eager/><div className={\'v20-start-swatch \'+c.material} aria-hidden="true"/>');s=s.replace('Kendi Devir’inizi tasarlayın <Icon name="diagonal" size={17}/>','Kendi Devir’inizi tasarlayın');p.write_text(s)
p=r/'src/v22.css';p.write_text(p.read_text()+'''
/* V22.1 visibility repair. Product images use their true landscape frame. */
.image-unavailable{display:flex;flex-direction:column;justify-content:center;gap:9px;width:100%;height:100%;min-height:130px;padding:22px;background:#eee7da;color:#493b2c;overflow-wrap:anywhere;box-sizing:border-box;text-align:left}
.image-unavailable strong{font:500 18px/1.35 Georgia,serif}.image-unavailable span{font-size:13px;line-height:1.5}.image-unavailable small{font-size:11px;line-height:1.55;max-width:40em}
.v20-product-hero{align-items:center;padding-top:40px;padding-bottom:45px}.v20-product-visual{min-width:0}.v20-product-visual .photo{aspect-ratio:3/2}.v20-product-visual .photo img{object-fit:contain;mix-blend-mode:normal}.v20-product-stamp{top:16px;left:18px;font-size:34px}.v20-product-stamp small{font-size:8px}.v20-material-caption{display:none}
.v20-start-grid>a{position:relative;min-width:0;padding:18px}.v20-start-grid .photo{width:100%;margin:8px 0 20px;background:#e9e0d0}.v20-start-grid .photo img{object-fit:contain}.v20-start-grid .v20-start-num{position:relative;display:block;font-size:19px}.v20-start-grid .v20-start-swatch{float:right;width:24px;height:24px;margin:0 0 8px 12px}.v20-start-grid h3{margin-top:0}.v20-product-nav a{min-height:44px;display:inline-flex;align-items:center}.v20-detail-editorial .photo img{object-fit:contain}
#devir-yaklasim,#devir-baslangic,#devir-detay{scroll-margin-top:100px}
@media(max-width:780px){.v20-product-hero{gap:24px;padding-top:25px;padding-bottom:26px}.v20-product-visual .photo{aspect-ratio:3/2}.v20-room-editorial{display:flex;flex-direction:column;background:#382c22}.v20-room-editorial .photo{aspect-ratio:3/2!important;opacity:1;flex:none}.v20-room-editorial>div{position:static;max-width:none;padding:25px 24px 30px}.v20-room-editorial>div p{max-width:50ch}.v20-room-editorial>div h2{font-size:clamp(28px,6vw,40px)}.v20-detail-editorial{gap:26px}.v20-start-grid .photo{margin-top:5px}}
''')
p=r/'src/App.tsx';s=p.read_text();a="document.documentElement.dataset.page=route==='/tasarim-masasi'";b="const anchor=window.location.hash&&!window.location.hash.startsWith('#/')?window.location.hash:'';document.documentElement.dataset.page=route==='/tasarim-masasi'";assert a in s;s=s.replace(a,b,1);a="publicHref(route+(p.size?'?'+p.toString():'')));}";b="publicHref(route+(p.size?'?'+p.toString():''))+anchor);}if(anchor&&restore===null){requestAnimationFrame(()=>{const target=document.getElementById(anchor.slice(1));target?.scrollIntoView({behavior:'instant' as ScrollBehavior});});}";assert a in s;s=s.replace(a,b,1);p.write_text(s)
for file in ['package.json','package-lock.json']:
 p=r/file;s=p.read_text().replace('"version": "0.22.0"','"version": "0.22.1"')
 if file=='package.json':
  data=json.loads(s);data['scripts']['test']+=' tests/v23/*.cjs';s=json.dumps(data,ensure_ascii=False,indent=2)+'\n'
 p.write_text(s)
for p in [r/'tools/build-v22.cjs',r/'tools/verify-v22.cjs',r/'src/App.tsx']+list((r/'tests').rglob('*')):
 if not p.is_file() or p.suffix not in ['.tsx','.cjs','.mjs','.py']:continue
 s=p.read_text();s=s.replace('v22-contact-complete','v22.1-visible-content').replace("version:'0.22.0'","version:'0.22.1'").replace("version,'0.22.0'","version,'0.22.1'").replace("version, '0.22.0'","version, '0.22.1'").replace('V22 /','V22.1 /');p.write_text(s)
print('Applied bounded image, layout and bootstrap corrections to exact V22 source')
