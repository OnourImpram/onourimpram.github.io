import { createElement, Fragment, Component, type ReactNode } from 'react';
import { publicHref } from '../lib/domain';
import { products, type Product } from '../lib/data';
export type CartLine = {
    key: string;
    id: string;
    material: string;
    size: string;
    quantity: number;
    unitMinor: number;
};
export type PageProps = {
    navigate: (path: string) => void;
    notify: (message: string) => void;
    favorites: string[];
    favorite: (id: string) => void;
    cart: CartLine[];
    addCart: (product: Product, material: string, size: string, quantity: number) => void;
    changeCart: (key: string, quantity: number) => void;
    removeCart: (key: string) => void;
    openInfo: () => void;
};
export function image(name: string) { return typeof window !== 'undefined' && (window as any).__ELIF_ASSETS__?.[name] || '/assets/' + name; }
export function Icon({ name = 'arrow', size = 20 }: {
    name?: string;
    size?: number;
}) {
    const paths: Record<string, ReactNode> = { phone: <path d="M5 3h4l2 5-3 2a15 15 0 0 0 6 6l2-3 5 2v4c-10 5-22-7-16-16Z"/>, arrow: <><path d="M4 12h16M13 5l7 7-7 7"/></>, diagonal: <><path d="M5 19L19 5M5 5h14v14"/></>, search: <><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></>, close: <path d="m5 5 14 14M19 5 5 19"/>, menu: <path d="M3 7h18M3 16h18"/>, bag: <><path d="M5 8h14l1 13H4L5 8Z"/><path d="M8 8V6a4 4 0 0 1 8 0v2"/></>, heart: <path d="M20.8 4.7a5.5 5.5 0 0 0-7.8 0L12 5.8l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.5a5.5 5.5 0 0 0 0-7.8Z"/>, plus: <path d="M12 4v16M4 12h16"/>, minus: <path d="M4 12h16"/>, down: <path d="m5 9 7 7 7-7"/>, check: <path d="m4 12 5 5 11-11"/>, ruler: <><path d="m3 16 13-13 5 5L8 21 3 16Z"/><path d="m7 12 3 3m1-7 3 3m1-7 3 3"/></>, leaf: <><path d="M20 3C9 2 2 6 4 14s16 7 16-11Z"/><path d="M3 22 16 8"/></>, hand: <><path d="M8 12V5a2 2 0 0 1 4 0v7-9a2 2 0 0 1 4 0v9-6a2 2 0 0 1 4 0v9c0 6-12 10-15 1l-2-5a2 2 0 0 1 3-2l2 3"/></>, upload: <><path d="M4 15v5h16v-5M12 17V3m-5 5 5-5 5 5"/></>, clock: <><circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/></>, info: <><circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-11v2"/></>, grid: <><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></>, download: <><path d="M12 3v13m-5-5 5 5 5-5M4 17v4h16v-4"/></>, pin: <><path d="M19 9c0 6-7 12-7 12S5 15 5 9a7 7 0 0 1 14 0Z"/><circle cx="12" cy="9" r="2"/></> };
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name] || paths.arrow}</svg>;
}
export function Link({ to, navigate, children, className = '', ...rest }: {
    to: string;
    navigate: (p: string) => void;
    children: ReactNode;
    className?: string;
    [key: string]: any;
}) { return <a href={publicHref(to)} className={className} {...rest} onClick={(e: any) => { if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0)
    return; e.preventDefault(); navigate(to); }}>{children}</a>; }
export function TextLink({ to, navigate, children, light = false }: {
    to: string;
    navigate: (p: string) => void;
    children: ReactNode;
    light?: boolean;
}) { return <Link to={to} navigate={navigate} className={'text-link ' + (light ? 'on-dark' : '')}>{children}<Icon name="arrow" size={22}/></Link>; }
export function ButtonLink({ to, navigate, children, secondary = false }: {
    to: string;
    navigate: (p: string) => void;
    children: ReactNode;
    secondary?: boolean;
}) { return <Link to={to} navigate={navigate} className={'button ' + (secondary ? 'button-outline' : '')}>{children}<Icon /></Link>; }
export function Eyebrow({ children }: {
    children: ReactNode;
}) { return <div className="eyebrow">{children}</div>; }
export function Photo({ name, alt, ratio = '', className = '', caption = true, eager = false }: {
    name: string;
    alt: string;
    ratio?: string;
    className?: string;
    caption?: boolean;
    eager?: boolean;
}) { return <figure className={'photo ' + className} style={ratio ? { aspectRatio: ratio } : undefined}><img src={image(name)} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async"/>{caption && <figcaption>Konsept model</figcaption>}</figure>; }
export function SectionHead({ number, title, sub, to, navigate }: {
    number: string;
    title: ReactNode;
    sub?: string;
    to?: string;
    navigate: (p: string) => void;
}) { return <div className="section-head"><div><Eyebrow>{number} / ELİF TASARIM</Eyebrow><h2>{title}</h2>{sub && <p>{sub}</p>}</div>{to && <TextLink to={to} navigate={navigate}>Tümünü keşfet</TextLink>}</div>; }
export function PageIntro({ kicker, title, desc }: {
    kicker: string;
    title: ReactNode;
    desc?: string;
}) { return <header className="page-intro wrap"><Eyebrow>{kicker}</Eyebrow><h1>{title}</h1>{desc && <p>{desc}</p>}</header>; }
export function ProductCard({ product: p, actions: a }: {
    product: Product;
    actions: PageProps;
}) { return <article className="product-card"><div className="product-visual"><Link to={'/urun/' + p.id} navigate={a.navigate} aria-label={p.name + ' ' + p.categoryLabel + ' detayları'}><img src={image(p.image)} alt={p.name + ' ' + p.categoryLabel + ' — temsili konsept görseli'} loading="lazy"/></Link><span className="image-index">{p.number} / KONSEPT</span><button className={'save-button ' + (a.favorites.includes(p.id) ? 'is-saved' : '')} aria-label={p.name + (a.favorites.includes(p.id) ? ' kaydını kaldır' : ' ürününü kaydet')} aria-pressed={a.favorites.includes(p.id)} onClick={() => a.favorite(p.id)}><Icon name="heart" size={19}/></button></div><div className="product-caption"><div><span className="label">{p.categoryLabel}</span><h3><Link to={'/urun/' + p.id} navigate={a.navigate}>{p.name}</Link></h3><p>{p.material} görünümü · {p.mode === 'quoted' ? 'Özel ölçü' : 'Konsept koleksiyon'}</p></div><Link to={'/urun/' + p.id} navigate={a.navigate} className="card-arrow" aria-label={p.name + ' ürününü incele'}><Icon name="diagonal"/></Link></div></article>; }
export function Callout({ navigate }: {
    navigate: (p: string) => void;
}) { return <section className="closing-cta"><div className="wrap"><Eyebrow>BİR FİKİRLE BAŞLAYALIM</Eyebrow><h2>Ölçüsü size.<br /><em>Hikâyesi birlikte.</em></h2><ButtonLink to="/teklif-al" navigate={navigate}>Projenizi konuşalım</ButtonLink><p>Bir ölçü, bir fotoğraf ya da yalnızca bir fikir.</p></div></section>; }
export function Accordion({ items }: {
    items: [
        string,
        string
    ][];
}) { return <div className="accordion">{items.map(([title, text], i) => <details key={title}><summary><span className="accordion-num">0{i + 1}</span><span>{title}</span><Icon name="plus"/></summary><div className="answer">{text}</div></details>)}</div>; }
export class Dialog extends Component<{
    title: string;
    onClose: () => void;
    children: ReactNode;
}, {}> {
    private el: HTMLDialogElement | null = null;
    private previous: HTMLElement | null = null;
    componentDidMount() { this.previous = document.activeElement as HTMLElement; this.el?.showModal(); }
    componentWillUnmount() { this.el?.close(); if (this.previous?.isConnected)
        this.previous.focus({preventScroll:true}); }
    render() { return <dialog className="dialog" ref={(e) => { this.el = e; }} onCancel={(e) => { e.preventDefault(); this.props.onClose(); }} onKeyDown={(e) => { if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        this.props.onClose();
    } }} onClick={(e) => { if (e.target === e.currentTarget)
        this.props.onClose(); }} aria-label={this.props.title}><div className="dialog-inner"><div className="dialog-head"><h2>{this.props.title}</h2><button className="icon-button" onClick={this.props.onClose} aria-label="Pencereyi kapat"><Icon name="close"/></button></div>{this.props.children}</div></dialog>; }
}
