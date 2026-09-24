'use client';
import { createElement, Fragment, Component } from 'react';
import { products, categories, journal, ideas, type Product } from './lib/data';
import { cartKey, readLocal, writeLocal, validQuantity, searchKey, publicHref } from './lib/domain';
import { image, Icon, Link, TextLink, ButtonLink, Eyebrow, Dialog, type CartLine, type PageProps } from './components/ui';
import { DesignDesk } from './pages/DesignDesk';
import { Home } from './pages/Home';
import { Catalog, ProductPage } from './pages/Catalog';
import { Atelier, Bespoke, Materials, Ideas, Journal, FAQ, Privacy } from './pages/Editorial';
import { Quote } from './pages/Quote';
import { Cart, Saved, Checkout, Contact } from './pages/Commerce';
import { Studio } from './pages/Studio';
import { routePaths, pageTitle } from './lib/routes';
import {Projects,WorkDetail,Categories,Inspiration,AboutAtelier} from './pages/Portfolio';
import {BringModel} from './pages/BringModel';
import {works,workCategories,mainNavigation,categoryName} from './lib/portfolio';
import {VImage} from './components/PortfolioUI';
type State = {
    path: string;
    scrolled: boolean;
    cart: CartLine[];
    favorites: string[];
    menu: boolean;
    search: boolean;
    searchQuery: string;
    info: boolean;
    toast: string;
};
export default class App extends Component<{
    initialPath?: string;
}, State> {
    constructor(props: {
        initialPath?: string;
    }) { super(props); this.state = { path: props.initialPath || '/', scrolled: false, cart: [], favorites: [], menu: false, search: false, searchQuery: '', info: false, toast: '' }; }
    onScroll = () => { const scrolled = window.scrollY > 650; if (scrolled !== this.state.scrolled) this.setState({ scrolled }); };
    private timer: ReturnType<typeof setTimeout> | undefined;
    currentLocation = () => { const path = (window as any).__ELIF_PREVIEW__ ? (window.location.hash.slice(1) || '/') : (window.location.pathname.replace(/\/+$/, '') || '/') + window.location.search; return path.startsWith('/') ? path : '/'; };
    onLocation = () => { this.setState({ path: this.currentLocation(), menu: false, search: false }, this.afterRoute); };
    componentDidMount() { let favorites = readLocal<unknown>('favorites', []), rawCart = readLocal<unknown>('cart', []); if (!Array.isArray(favorites))
        favorites = []; const cart: CartLine[] = []; if (Array.isArray(rawCart))
        for (const l of rawCart) {
            const p = products.find(p => p.id === l?.id);
            if (p && p.price !== null && p.sizes.includes(l.size) && ['Ceviz', 'Meşe'].includes(l.material) && validQuantity(l.quantity)) {
                cart.push({ ...l, key: cartKey(p.id, l.material, l.size), unitMinor: p.price + Math.max(0, p.sizes.indexOf(l.size)) * 700000 });
            }
        } this.setState({ path: this.currentLocation(), favorites: [...new Set((favorites as string[]).filter(id => products.some(p => p.id === id)))], cart }, this.afterRoute); window.addEventListener('hashchange', this.onLocation); window.addEventListener('popstate', this.onLocation); window.addEventListener('scroll', this.onScroll, {passive:true}); this.onScroll(); }
    componentWillUnmount() { window.removeEventListener('hashchange', this.onLocation); window.removeEventListener('popstate', this.onLocation); window.removeEventListener('scroll', this.onScroll); if (this.timer)
        clearTimeout(this.timer); }
    afterRoute = () => { document.title = pageTitle(this.state.path); window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }); this.onScroll(); };
    navigate = (path: string) => { if (path === this.state.path) {
        this.setState({ menu: false, search: false });
        return;
    } history.pushState({}, '', publicHref(path)); this.setState({ path, menu: false, search: false, searchQuery: '' }, () => { this.afterRoute(); setTimeout(() => document.querySelector<HTMLElement>('main')?.focus({ preventScroll: true }), 50); }); };
    notify = (toast: string) => { if (this.timer)
        clearTimeout(this.timer); this.setState({ toast }); this.timer = setTimeout(() => this.setState({ toast: '' }), 5500); };
    favorite = (id: string) => { const exists = this.state.favorites.includes(id); const favorites = exists ? this.state.favorites.filter(x => x !== id) : [...this.state.favorites, id]; this.setState({ favorites }); const stored = writeLocal('favorites', favorites); this.notify(exists ? 'Çalışma dosyanızdan çıkarıldı.' : stored ? 'Bu cihazdaki çalışma dosyanıza kaydedildi.' : 'Bu açık sayfada kaydedildi. Tarayıcı kalıcı depolamaya izin vermedi.'); };
    addCart = (p: Product, material: string, size: string, quantity: number) => { if (p.price === null || !validQuantity(quantity) || !p.sizes.includes(size) || !['Ceviz', 'Meşe'].includes(material))
        return; const key = cartKey(p.id, material, size), old = this.state.cart.find(l => l.key === key); if (old && old.quantity + quantity > 100) {
        this.notify('Bir satırda en fazla 100 adet seçilebilir.');
        return;
    } const cart = old ? this.state.cart.map(l => l.key === key ? { ...l, quantity: l.quantity + quantity } : l) : [...this.state.cart, { key, id: p.id, material, size, quantity, unitMinor: p.price + Math.max(0, p.sizes.indexOf(size)) * 700000 }]; this.setState({ cart }); const stored = writeLocal('cart', cart); this.notify(p.name + ' örnek sepete eklendi. ' + (stored ? 'Gerçek sipariş oluşturulmadı.' : 'Tarayıcı depolaması kapalı; yalnız bu açık sayfada tutuluyor.')); };
    changeCart = (key: string, quantity: number) => { if (!validQuantity(quantity))
        return; const cart = this.state.cart.map(l => l.key === key ? { ...l, quantity } : l); this.setState({ cart }); writeLocal('cart', cart); };
    removeCart = (key: string) => { const cart = this.state.cart.filter(l => l.key !== key); this.setState({ cart }); writeLocal('cart', cart); this.notify('Parça örnek sepetten çıkarıldı.'); };
    actions = (): PageProps => ({ navigate: this.navigate, notify: this.notify, favorites: this.state.favorites, favorite: this.favorite, cart: this.state.cart, addCart: this.addCart, changeCart: this.changeCart, removeCart: this.removeCart, openInfo: () => this.setState({ info: true }) });
    renderPage() {
        const a = this.actions(), [path, qs = ''] = this.state.path.split('?'), params = new URLSearchParams(qs);
        if (path === '/')
            return <Home {...a}/>;
        if(path==='/projeler')return <Projects key={this.state.path} {...a} query={qs}/>;
        if(path.startsWith('/proje/')){const w=works.find(w=>'/proje/'+w.id===path);if(w)return <WorkDetail key={w.id} {...a} work={w}/>;}
        if(path==='/kategoriler')return <Categories {...a}/>;
        if(path.startsWith('/kategoriler/')&&workCategories.some(c=>'/kategoriler/'+c.id===path))return <Categories {...a} slug={path.split('/').pop()}/>;
        if(path==='/ilham-modelleri')return <Inspiration {...a}/>;
        if(path==='/modelini-getir')return <BringModel key={this.state.path} {...a} query={qs}/>;
        if(path==='/hakkimizda'||path==='/atolyemiz')return <AboutAtelier {...a}/>;
        if(path==='/atolye')return <AboutAtelier {...a} atelier/>;
        if (path === '/tasarim-masasi')
            return <DesignDesk key={this.state.path} {...a} query={qs}/>;
        if (path === '/urunler')
            return <Catalog key={this.state.path} {...a} initialCategory={categories.some(c => c.id === params.get('alan')) ? params.get('alan')! : 'all'} initialQuery={(params.get('q') || '').slice(0,200)} initialSort={params.get('sirala') || 'editorial'}/>;
        if (path.startsWith('/urun/')) {
            const p = products.find(p => '/urun/' + p.id === path);
            if (p)
                return <ProductPage key={p.id} {...a} product={p}/>;
        }
        const pages: Record<string, any> = { '/atolyemiz': Atelier, '/ozel-uretim': Bespoke, '/malzemeler': Materials, '/mekan-fikirleri': Ideas, '/rehber': Journal, '/sikca-sorulan-sorular': FAQ, '/iletisim': Contact, '/sepet': Cart, '/odeme': Checkout, '/calisma-dosyam': Saved, '/gizlilik': Privacy, '/atolye-demolari': Studio };
        if (path === '/teklif-al')
            return <Quote key={this.state.path} {...a} productId={params.get('urun') || undefined} query={qs}/>;
        if (path.startsWith('/mekan-fikirleri/') && ideas.some(i => '/mekan-fikirleri/' + i.id === path))
            return <Ideas {...a} slug={path.split('/').pop()}/>;
        if (path.startsWith('/rehber/') && journal.some(i => '/rehber/' + i.id === path))
            return <Journal {...a} slug={path.split('/').pop()}/>;
        const Page = pages[path];
        if (Page)
            return <Page key={path} {...a}/>;
        return <section className="wrap empty-state missing-page"><Eyebrow>404 / BİR YOL AYRIMI</Eyebrow><h1>Bu sayfayı<br /><em>bulamadık.</em></h1><p>Koleksiyona veya atölyenin ana sayfasına dönebilirsiniz.</p><ButtonLink to="/" navigate={this.navigate}>Atölyeye dön</ButtonLink></section>;
    }
    render() {
        const s = this.state, a = this.actions(), count = s.cart.reduce((n, l) => n + l.quantity, 0);
        const nav = (to: string, label: string) => <Link key={to} to={to} navigate={this.navigate} aria-current={s.path.split('?')[0] === to ? 'page' : undefined}>{label}</Link>;
        const results = products.filter(p => searchKey(p.name + ' ' + p.categoryLabel + ' ' + p.material+' '+p.id+' '+p.category).includes(searchKey(s.searchQuery)));
        const workResults=works.filter(w=>searchKey(w.title+' '+w.subtitle+' '+categoryName(w.category)).includes(searchKey(s.searchQuery))).slice(0,8);
        return <>
 <a href="#main-content" className="skip-link" onClick={e=>{e.preventDefault();const main=document.getElementById("main-content");main?.focus({preventScroll:true});main?.scrollIntoView({block:"start",behavior:"instant" as ScrollBehavior});}}>İçeriğe geç</a><div className="preview-bar"><span>V6 / ATÖLYE SEÇKİSİ <i /> Portföy ve ilham önizlemesi</span><button onClick={() => this.setState({ info: true })}>Bu sürüm hakkında <Icon name="info" size={14}/></button></div>
 <header className={'site-header v6-header '+(s.path==='/'?'home-header':'')+(s.scrolled?' is-floating':'')}><div className="v6-header-main wrap"><button className="icon-button v6-menu-toggle" aria-label="Menüyü aç" onClick={()=>this.setState({menu:true})}><Icon name="menu" size={25}/></button><span className="v6-header-note">İSTANBUL<br/>ÖLÇÜYE ÖZEL ÜRETİM</span><Link to="/" navigate={this.navigate} className="brand" aria-label="Elif Tasarım ana sayfa"><img src={image('elif-amblem.png')} alt=""/><span>ELİF TASARIM<small>EL YAPIMI MOBİLYA ATÖLYESİ</small></span></Link><div className="v6-header-tools"><button className="icon-button" aria-label="Sitede ara" onClick={()=>this.setState({search:true})}><Icon name="search"/></button><Link to="/calisma-dosyam" navigate={this.navigate} className="icon-button v6-saved" aria-label={'Kaydedilenler, '+s.favorites.length+' ürün'}><Icon name="heart"/></Link><Link to="/sepet" navigate={this.navigate} className="icon-button v6-cart" aria-label={'Sepet, '+count+' ürün'}><Icon name="bag"/><span>{count}</span></Link><Link to="/modelini-getir" navigate={this.navigate} className="v6-header-cta">Projenizi konuşalım <Icon size={16}/></Link></div></div><nav className="v6-header-nav wrap" aria-label="Ana gezinme">{mainNavigation.map(([path,label])=>nav(path,label))}</nav></header>
 <main id="main-content" tabIndex={-1} key={s.path.split('?')[0]}>{this.renderPage()}</main>
 <footer className="site-footer"><div className="wrap"><div className="footer-top"><div><Link to="/" navigate={this.navigate} className="brand footer-brand"><img src={image('elif-amblem-light.png')} alt=""/><span>ELİF TASARIM<small>EL YAPIMI MOBİLYA ATÖLYESİ</small></span></Link><p>Zamana değer<br /><em>katan mobilyalar.</em></p></div><div className="footer-column"><h2>Keşfedin</h2>{nav('/projeler','Bitirdiğimiz İşler')}{nav('/kategoriler','Kategoriler')}{nav('/ilham-modelleri','İlham Modelleri')}{nav('/malzemeler','Malzemeler')}{nav('/urunler','Konsept ürünler')}</div><div className="footer-column"><h2>Atölye</h2>{nav('/hakkimizda','Hikâyemiz')}{nav('/atolye','Atölye')}{nav('/ozel-uretim', 'Nasıl çalışıyoruz?')}{nav('/rehber', 'Atölye notları')}{nav('/sikca-sorulan-sorular', 'Sorular')}</div><div className="footer-column footer-contact"><h2>Birlikte başlayalım</h2><p>İstanbul, Türkiye<br />Doğrudan atölyeden, sizin için.</p><TextLink to="/teklif-al" navigate={this.navigate} light>Özel ölçü stüdyosu</TextLink><TextLink to="/modelini-getir" navigate={this.navigate} light>Kendi modelinizi getirin</TextLink>{nav('/iletisim', 'İletişim')}</div></div><div className="footer-wordmark" aria-hidden="true">elif tasarım<span>ATÖLYE</span></div><div className="footer-bottom"><span>ELİF TASARIM · V6 PORTFÖY ÖNİZLEMESİ / 2026</span><div>{nav('/gizlilik', 'Önizleme gizliliği')}<button onClick={() => this.setState({ info: true })}>Depolama tercihleri</button>{nav('/atolye-demolari', 'Atölye demosu')}</div><span>Özenle düşünülür. Atölyede şekillenir.</span></div><p className="footer-disclosure">Atölye arşivi, uygulama aşaması, yapay zekâ konsepti ve dış kaynak ilhamları ayrı etiketlenmiştir. Fiyatlı eski ürünler demo amaçlıdır. Canlı satış veya otomatik form gönderimi yapılmaz.</p></div></footer>
 {s.menu && <Dialog title="Elif Tasarım" onClose={() => this.setState({ menu: false })}><nav className="mobile-links" aria-label="Mobil menü">{[...mainNavigation, ['/modelini-getir','Kendi Modelinizi Getirin'], ['/tasarim-masasi','Tasarım Masası'], ['/teklif-al','Özel Ölçü Stüdyosu']].map(([p, label], i) => <Link key={p} to={p} navigate={this.navigate}><span>{String(i+1).padStart(2,'0')}</span>{label}<Icon name="diagonal"/></Link>)}</nav><div className="mobile-menu-bottom">İSTANBUL · EL YAPIMI MOBİLYA</div></Dialog>}
 {s.search && <Dialog title="Atölyede bir şey arayın" onClose={() => this.setState({ search: false })}><label className="search-dialog-input"><Icon name="search"/><input autoFocus type="search" placeholder="Mutfak, kahve köşesi, gardırop…" aria-label="Arama kelimesi" value={s.searchQuery} onInput={e => this.setState({ searchQuery: e.currentTarget.value })}/></label><div className="search-results" role="region" aria-live="polite">{workResults.map(w=><Link key={w.id} to={'/proje/'+w.id} navigate={this.navigate}><VImage asset={w.images[0]} alt="" sizes="80px"/><span><strong>{w.subtitle}</strong><small>{categoryName(w.category)} · Atölye arşivi</small></span><Icon name="diagonal"/></Link>)}{results.length ? results.map(p => <Link key={p.id} to={'/urun/' + p.id} navigate={this.navigate}><img src={image(p.image)} alt=""/><span><strong>{p.name}</strong><small>{p.categoryLabel} · Konsept</small></span><Icon name="diagonal"/></Link>) : !workResults.length?<p className="empty-state">Sonuç bulunamadı. Başka bir kelime deneyin.</p>:null}</div><TextLink to="/urunler" navigate={this.navigate}>Tüm koleksiyona git</TextLink></Dialog>}
 {s.info && <Dialog title="Bu sürüm hakkında" onClose={() => this.setState({ info: false })}><div className="info-dialog"><Eyebrow>ÇALIŞAN VİTRİN / YEREL ÖNİZLEME</Eyebrow><p>Bu V6 sürümü, atölyenin paylaştığı uygulama fotoğraflarını, ayrı etiketli yapay zekâ konseptlerini ve Pinterest ilham bağlantılarını bir araya getirir. Bitmiş işler konsept görsellerle değiştirilmez. Eski fiyatlı koleksiyon ürünleri hâlâ demodur.</p><h3>Canlı işlem yapılmaz.</h3><p>Ödeme, e-posta, kargo, müşteri hesabı ve sunucu kayıtları bağlı değildir. Formlar atölyeye bilgi göndermez. İşlem özetlerini kendi cihazınıza indirebilirsiniz. Modelini Getir sayfasında WhatsApp açılarak alıcıyı sizin seçtiğiniz paylaşım yapılabilir. İşletme numarası henüz tanımlı değildir.</p><h3>Yalnız gerekli yerel kayıtlar.</h3><p>Örnek sepet ve kaydedilenler 30 gün; açıkça kaydettiğiniz ölçü tercihleri 7 gün bu tarayıcıda tutulur. İletişim, not ve fotoğraflar taslağa kaydedilmez. Analitik ve reklam takibi yoktur.</p><button className="button button-outline" onClick={() => { if (window.confirm('Bu uygulamanın bu cihazdaki örnek sepeti, kaydedilenleri ve ölçü tercihleri silinsin mi?')) {
            try {
                Object.keys(localStorage).filter(k => k.startsWith('elif-v2:')).forEach(k => localStorage.removeItem(k));
            }
            catch { }
            this.setState({ cart: [], favorites: [], info: false });
            this.notify('Bu uygulamanın bu cihazdaki kayıtları temizlendi.');
        } }}>Bu cihazdaki Elif kayıtlarını sil <Icon name="close"/></button><Link to="/gizlilik" navigate={p => { this.setState({ info: false }); this.navigate(p); }} className="text-link">Ayrıntılı açıklama <Icon /></Link></div></Dialog>}
 {s.scrolled && <button className="v5-backtop" type="button" aria-label="Sayfanın başına dön" onClick={()=>{window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant' as ScrollBehavior:'smooth'});document.getElementById('main-content')?.focus({preventScroll:true});}}><span className="v5-up"><Icon name="down" size={18}/></span><span>Başa dön</span></button>}
 {s.toast && <div className="toast" role="status"><Icon name="check"/><span>{s.toast}</span><button className="icon-button" onClick={() => this.setState({ toast: '' })} aria-label="Bildirimi kapat"><Icon name="close" size={16}/></button></div>}
 </>;
    }
}
