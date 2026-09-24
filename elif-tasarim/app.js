/*! The MIT License (MIT)

Copyright (c) 2015-present Jason Miller

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 */
(function(){"use strict"; const modules={"src/App":function(module,exports,require){
'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const data_1 = require("./lib/data");
const domain_1 = require("./lib/domain");
const ui_1 = require("./components/ui");
const Home_1 = require("./pages/Home");
const Catalog_1 = require("./pages/Catalog");
const Editorial_1 = require("./pages/Editorial");
const Quote_1 = require("./pages/Quote");
const Commerce_1 = require("./pages/Commerce");
const Studio_1 = require("./pages/Studio");
const routes_1 = require("./lib/routes");
class App extends react_1.Component {
    constructor(props) {
        super(props);
        this.currentLocation = () => { const path = window.__ELIF_PREVIEW__ ? (window.location.hash.slice(1) || '/') : (window.location.pathname.replace(/\/+$/, '') || '/') + window.location.search; return path.startsWith('/') ? path : '/'; };
        this.onLocation = () => { this.setState({ path: this.currentLocation(), menu: false, search: false }, this.afterRoute); };
        this.afterRoute = () => { document.title = (0, routes_1.pageTitle)(this.state.path); document.documentElement.classList.toggle('is-home', this.state.path === '/'); window.scrollTo({ top: 0, behavior: 'instant' }); };
        this.navigate = (path) => {
            if (path === this.state.path) {
                this.setState({ menu: false, search: false });
                return;
            }
            history.pushState({}, '', (0, domain_1.publicHref)(path));
            this.setState({ path, menu: false, search: false, searchQuery: '' }, () => { this.afterRoute(); setTimeout(() => document.querySelector('main')?.focus({ preventScroll: true }), 50); });
        };
        this.notify = (toast) => {
            if (this.timer)
                clearTimeout(this.timer);
            this.setState({ toast });
            this.timer = setTimeout(() => this.setState({ toast: '' }), 5500);
        };
        this.favorite = (id) => { const exists = this.state.favorites.includes(id); const favorites = exists ? this.state.favorites.filter(x => x !== id) : [...this.state.favorites, id]; this.setState({ favorites }); const stored = (0, domain_1.writeLocal)('favorites', favorites); this.notify(exists ? 'Çalışma dosyanızdan çıkarıldı.' : stored ? 'Bu cihazdaki çalışma dosyanıza kaydedildi.' : 'Bu açık sayfada kaydedildi. Tarayıcı kalıcı depolamaya izin vermedi.'); };
        this.addCart = (p, material, size, quantity) => {
            if (p.price === null || !(0, domain_1.validQuantity)(quantity) || !p.sizes.includes(size) || !['Ceviz', 'Meşe'].includes(material))
                return;
            const key = (0, domain_1.cartKey)(p.id, material, size), old = this.state.cart.find(l => l.key === key);
            if (old && old.quantity + quantity > 100) {
                this.notify('Bir satırda en fazla 100 adet seçilebilir.');
                return;
            }
            const cart = old ? this.state.cart.map(l => l.key === key ? { ...l, quantity: l.quantity + quantity } : l) : [...this.state.cart, { key, id: p.id, material, size, quantity, unitMinor: p.price + Math.max(0, p.sizes.indexOf(size)) * 700000 }];
            this.setState({ cart });
            const stored = (0, domain_1.writeLocal)('cart', cart);
            this.notify(p.name + ' örnek sepete eklendi. ' + (stored ? 'Gerçek sipariş oluşturulmadı.' : 'Tarayıcı depolaması kapalı; yalnız bu açık sayfada tutuluyor.'));
        };
        this.changeCart = (key, quantity) => {
            if (!(0, domain_1.validQuantity)(quantity))
                return;
            const cart = this.state.cart.map(l => l.key === key ? { ...l, quantity } : l);
            this.setState({ cart });
            (0, domain_1.writeLocal)('cart', cart);
        };
        this.removeCart = (key) => { const cart = this.state.cart.filter(l => l.key !== key); this.setState({ cart }); (0, domain_1.writeLocal)('cart', cart); this.notify('Parça örnek sepetten çıkarıldı.'); };
        this.actions = () => ({ navigate: this.navigate, notify: this.notify, favorites: this.state.favorites, favorite: this.favorite, cart: this.state.cart, addCart: this.addCart, changeCart: this.changeCart, removeCart: this.removeCart, openInfo: () => this.setState({ info: true }) });
        this.state = { path: props.initialPath || '/', cart: [], favorites: [], menu: false, search: false, searchQuery: '', info: false, toast: '' };
    }
    componentDidMount() {
        let favorites = (0, domain_1.readLocal)('favorites', []), rawCart = (0, domain_1.readLocal)('cart', []);
        if (!Array.isArray(favorites))
            favorites = [];
        const cart = [];
        if (Array.isArray(rawCart))
            for (const l of rawCart) {
                const p = data_1.products.find(p => p.id === l?.id);
                if (p && p.price !== null && p.sizes.includes(l.size) && ['Ceviz', 'Meşe'].includes(l.material) && (0, domain_1.validQuantity)(l.quantity)) {
                    cart.push({ ...l, key: (0, domain_1.cartKey)(p.id, l.material, l.size), unitMinor: p.price + Math.max(0, p.sizes.indexOf(l.size)) * 700000 });
                }
            }
        this.setState({ path: this.currentLocation(), favorites: [...new Set(favorites.filter(id => data_1.products.some(p => p.id === id)))], cart }, this.afterRoute);
        window.addEventListener('hashchange', this.onLocation);
        window.addEventListener('popstate', this.onLocation);
    }
    componentWillUnmount() {
        window.removeEventListener('hashchange', this.onLocation);
        window.removeEventListener('popstate', this.onLocation);
        if (this.timer)
            clearTimeout(this.timer);
    }
    renderPage() {
        const a = this.actions(), [path, qs = ''] = this.state.path.split('?'), params = new URLSearchParams(qs);
        if (path === '/')
            return (0, react_1.createElement)(Home_1.Home, { ...a });
        if (path === '/urunler')
            return (0, react_1.createElement)(Catalog_1.Catalog, { key: this.state.path, ...a, initialCategory: data_1.categories.some(c => c.id === params.get('alan')) ? params.get('alan') : 'all' });
        if (path.startsWith('/urun/')) {
            const p = data_1.products.find(p => '/urun/' + p.id === path);
            if (p)
                return (0, react_1.createElement)(Catalog_1.ProductPage, { key: p.id, ...a, product: p });
        }
        const pages = { '/atolyemiz': Editorial_1.Atelier, '/ozel-uretim': Editorial_1.Bespoke, '/malzemeler': Editorial_1.Materials, '/mekan-fikirleri': Editorial_1.Ideas, '/rehber': Editorial_1.Journal, '/sikca-sorulan-sorular': Editorial_1.FAQ, '/iletisim': Commerce_1.Contact, '/sepet': Commerce_1.Cart, '/odeme': Commerce_1.Checkout, '/calisma-dosyam': Commerce_1.Saved, '/gizlilik': Editorial_1.Privacy, '/atolye-demolari': Studio_1.Studio };
        if (path === '/teklif-al')
            return (0, react_1.createElement)(Quote_1.Quote, { key: this.state.path, ...a, productId: params.get('urun') || undefined });
        if (path.startsWith('/mekan-fikirleri/') && data_1.ideas.some(i => '/mekan-fikirleri/' + i.id === path))
            return (0, react_1.createElement)(Editorial_1.Ideas, { ...a, slug: path.split('/').pop() });
        if (path.startsWith('/rehber/') && data_1.journal.some(i => '/rehber/' + i.id === path))
            return (0, react_1.createElement)(Editorial_1.Journal, { ...a, slug: path.split('/').pop() });
        const Page = pages[path];
        if (Page)
            return (0, react_1.createElement)(Page, { key: path, ...a });
        return (0, react_1.createElement)("section", { className: "wrap empty-state missing-page" },
            (0, react_1.createElement)(ui_1.Eyebrow, null, "404 / B\u0130R YOL AYRIMI"),
            (0, react_1.createElement)("h1", null,
                "Bu sayfay\u0131",
                (0, react_1.createElement)("br", null),
                (0, react_1.createElement)("em", null, "bulamad\u0131k.")),
            (0, react_1.createElement)("p", null, "Koleksiyona veya at\u00F6lyenin ana sayfas\u0131na d\u00F6nebilirsiniz."),
            (0, react_1.createElement)(ui_1.ButtonLink, { to: "/", navigate: this.navigate }, "At\u00F6lyeye d\u00F6n"));
    }
    render() {
        const s = this.state, a = this.actions(), count = s.cart.reduce((n, l) => n + l.quantity, 0);
        const nav = (to, label) => (0, react_1.createElement)(ui_1.Link, { key: to, to: to, navigate: this.navigate, "aria-current": s.path.split('?')[0] === to ? 'page' : undefined }, label);
        const results = data_1.products.filter(p => (0, domain_1.searchKey)(p.name + ' ' + p.categoryLabel + ' ' + p.material).includes((0, domain_1.searchKey)(s.searchQuery)));
        return (0, react_1.createElement)(react_1.Fragment, null,
            (0, react_1.createElement)("a", { href: "#main-content", className: "skip-link" }, "\u0130\u00E7eri\u011Fe ge\u00E7"),
            (0, react_1.createElement)("div", { className: "preview-bar" },
                (0, react_1.createElement)("span", null,
                    "TASARIM \u00D6N\u0130ZLEMES\u0130 ",
                    (0, react_1.createElement)("i", null),
                    " \u00D6rnek g\u00F6rseller ve \u00FCr\u00FCnler \u00B7 Canl\u0131 sat\u0131\u015F yok"),
                (0, react_1.createElement)("button", { onClick: () => this.setState({ info: true }) },
                    "Bu s\u00FCr\u00FCm hakk\u0131nda ",
                    (0, react_1.createElement)(ui_1.Icon, { name: "info", size: 14 }))),
            (0, react_1.createElement)("header", { className: "site-header" + (s.path === "/" ? " home-header" : "") },
                (0, react_1.createElement)("div", { className: "header-inner" },
                    (0, react_1.createElement)("nav", { className: "nav-left", "aria-label": "Ana gezinme" },
                        nav('/urunler', 'Koleksiyon'),
                        nav('/ozel-uretim', 'Özel Üretim'),
                        nav('/atolyemiz', 'Atölyemiz')),
                    (0, react_1.createElement)("button", { className: "icon-button mobile-menu", "aria-label": "Men\u00FCy\u00FC a\u00E7", onClick: () => this.setState({ menu: true }) },
                        (0, react_1.createElement)(ui_1.Icon, { name: "menu", size: 25 })),
                    (0, react_1.createElement)(ui_1.Link, { to: "/", navigate: this.navigate, className: "brand", "aria-label": "Elif Tasar\u0131m ana sayfa" },
                        (0, react_1.createElement)("img", { src: (0, ui_1.image)('elif-amblem.png'), alt: "" }),
                        (0, react_1.createElement)("span", null,
                            "EL\u0130F TASARIM",
                            (0, react_1.createElement)("small", null, "EL YAPIMI MOB\u0130LYA AT\u00D6LYES\u0130"))),
                    (0, react_1.createElement)("div", { className: "nav-right" },
                        (0, react_1.createElement)("nav", { "aria-label": "Di\u011Fer sayfalar" },
                            nav('/malzemeler', 'Malzemeler'),
                            nav('/rehber', 'Notlar')),
                        (0, react_1.createElement)("div", { className: "header-tools" },
                            (0, react_1.createElement)("button", { className: "icon-button", "aria-label": "Sitede ara", onClick: () => this.setState({ search: true }) },
                                (0, react_1.createElement)(ui_1.Icon, { name: "search" })),
                            (0, react_1.createElement)(ui_1.Link, { to: "/calisma-dosyam", navigate: this.navigate, className: "icon-button save-nav", "aria-label": 'Kaydedilenler, ' + s.favorites.length + ' ürün' },
                                (0, react_1.createElement)(ui_1.Icon, { name: "heart" }),
                                s.favorites.length > 0 && (0, react_1.createElement)("span", { className: "nav-dot" })),
                            (0, react_1.createElement)(ui_1.Link, { to: "/sepet", navigate: this.navigate, className: "icon-button cart-nav", "aria-label": 'Sepet, ' + count + ' ürün' },
                                (0, react_1.createElement)(ui_1.Icon, { name: "bag" }),
                                (0, react_1.createElement)("span", null, count)))))),
            (0, react_1.createElement)("main", { id: "main-content", tabIndex: -1, key: s.path.split('?')[0] }, this.renderPage()),
            (0, react_1.createElement)("footer", { className: "site-footer" },
                (0, react_1.createElement)("div", { className: "wrap" },
                    (0, react_1.createElement)("div", { className: "footer-top" },
                        (0, react_1.createElement)("div", null,
                            (0, react_1.createElement)(ui_1.Link, { to: "/", navigate: this.navigate, className: "brand footer-brand" },
                                (0, react_1.createElement)("img", { src: (0, ui_1.image)('elif-amblem-light.png'), alt: "" }),
                                (0, react_1.createElement)("span", null,
                                    "EL\u0130F TASARIM",
                                    (0, react_1.createElement)("small", null, "EL YAPIMI MOB\u0130LYA AT\u00D6LYES\u0130"))),
                            (0, react_1.createElement)("p", null,
                                "Zamana de\u011Fer",
                                (0, react_1.createElement)("br", null),
                                (0, react_1.createElement)("em", null, "katan mobilyalar."))),
                        (0, react_1.createElement)("div", { className: "footer-column" },
                            (0, react_1.createElement)("h2", null, "Ke\u015Ffedin"),
                            nav('/urunler', 'Koleksiyon'),
                            nav('/mekan-fikirleri', 'Mekân fikirleri'),
                            nav('/malzemeler', 'Malzemeler'),
                            nav('/calisma-dosyam', 'Kaydedilenler')),
                        (0, react_1.createElement)("div", { className: "footer-column" },
                            (0, react_1.createElement)("h2", null, "At\u00F6lye"),
                            nav('/atolyemiz', 'Hikâyemiz'),
                            nav('/ozel-uretim', 'Nasıl çalışıyoruz?'),
                            nav('/rehber', 'Atölye notları'),
                            nav('/sikca-sorulan-sorular', 'Sorular')),
                        (0, react_1.createElement)("div", { className: "footer-column footer-contact" },
                            (0, react_1.createElement)("h2", null, "Birlikte ba\u015Flayal\u0131m"),
                            (0, react_1.createElement)("p", null,
                                "\u0130stanbul, T\u00FCrkiye",
                                (0, react_1.createElement)("br", null),
                                "Do\u011Frudan at\u00F6lyeden, sizin i\u00E7in."),
                            (0, react_1.createElement)(ui_1.TextLink, { to: "/teklif-al", navigate: this.navigate, light: true }, "\u00D6zel \u00F6l\u00E7\u00FC st\u00FCdyosu"),
                            nav('/iletisim', 'İletişim'))),
                    (0, react_1.createElement)("div", { className: "footer-wordmark", "aria-hidden": "true" },
                        "elif tasar\u0131m",
                        (0, react_1.createElement)("span", null, "AT\u00D6LYE")),
                    (0, react_1.createElement)("div", { className: "footer-bottom" },
                        (0, react_1.createElement)("span", null, "EL\u0130F TASARIM \u00B7 TASARIM \u00D6N\u0130ZLEMES\u0130 / 2026"),
                        (0, react_1.createElement)("div", null,
                            nav('/gizlilik', 'Önizleme gizliliği'),
                            (0, react_1.createElement)("button", { onClick: () => this.setState({ info: true }) }, "Depolama tercihleri"),
                            nav('/atolye-demolari', 'Atölye demosu')),
                        (0, react_1.createElement)("span", null, "\u00D6zenle d\u00FC\u015F\u00FCn\u00FCl\u00FCr. At\u00F6lyede \u015Fekillenir.")),
                    (0, react_1.createElement)("p", { className: "footer-disclosure" }, "\u00DCr\u00FCn isimleri, fiyatlar, \u00F6l\u00E7\u00FCler ve g\u00F6rseller konsept ama\u00E7l\u0131d\u0131r. Ger\u00E7ek katalog, referans veya ticari taahh\u00FCt de\u011Fildir."))),
            s.menu && (0, react_1.createElement)(ui_1.Dialog, { title: "Elif Tasar\u0131m", onClose: () => this.setState({ menu: false }) },
                (0, react_1.createElement)("nav", { className: "mobile-links", "aria-label": "Mobil men\u00FC" }, [['/urunler', 'Koleksiyon'], ['/ozel-uretim', 'Özel Üretim'], ['/atolyemiz', 'Atölyemiz'], ['/mekan-fikirleri', 'Mekân Fikirleri'], ['/malzemeler', 'Malzemeler'], ['/rehber', 'Atölye Notları'], ['/iletisim', 'İletişim'], ['/teklif-al', 'Özel Ölçü Stüdyosu']].map(([p, label], i) => (0, react_1.createElement)(ui_1.Link, { key: p, to: p, navigate: this.navigate },
                    (0, react_1.createElement)("span", null,
                        "0",
                        i + 1),
                    label,
                    (0, react_1.createElement)(ui_1.Icon, { name: "diagonal" })))),
                (0, react_1.createElement)("div", { className: "mobile-menu-bottom" }, "\u0130STANBUL \u00B7 EL YAPIMI MOB\u0130LYA")),
            s.search && (0, react_1.createElement)(ui_1.Dialog, { title: "Koleksiyonda ara", onClose: () => this.setState({ search: false }) },
                (0, react_1.createElement)("label", { className: "search-dialog-input" },
                    (0, react_1.createElement)(ui_1.Icon, { name: "search" }),
                    (0, react_1.createElement)("input", { autoFocus: true, type: "search", placeholder: "Masa, ceviz, \u00E7al\u0131\u015Fma\u2026", "aria-label": "Arama kelimesi", value: s.searchQuery, onInput: e => this.setState({ searchQuery: e.currentTarget.value }) })),
                (0, react_1.createElement)("div", { className: "search-results", role: "region", "aria-live": "polite" }, results.length ? results.map(p => (0, react_1.createElement)(ui_1.Link, { key: p.id, to: '/urun/' + p.id, navigate: this.navigate },
                    (0, react_1.createElement)("img", { src: (0, ui_1.image)(p.image), alt: "" }),
                    (0, react_1.createElement)("span", null,
                        (0, react_1.createElement)("strong", null, p.name),
                        (0, react_1.createElement)("small", null,
                            p.categoryLabel,
                            " \u00B7 Konsept")),
                    (0, react_1.createElement)(ui_1.Icon, { name: "diagonal" }))) : (0, react_1.createElement)("p", { className: "empty-state" }, "Sonu\u00E7 bulunamad\u0131. Ba\u015Fka bir kelime deneyin.")),
                (0, react_1.createElement)(ui_1.TextLink, { to: "/urunler", navigate: this.navigate }, "T\u00FCm koleksiyona git")),
            s.info && (0, react_1.createElement)(ui_1.Dialog, { title: "Bu s\u00FCr\u00FCm hakk\u0131nda", onClose: () => this.setState({ info: false }) },
                (0, react_1.createElement)("div", { className: "info-dialog" },
                    (0, react_1.createElement)(ui_1.Eyebrow, null, "\u00C7ALI\u015EAN V\u0130TR\u0130N / YEREL \u00D6N\u0130ZLEME"),
                    (0, react_1.createElement)("p", null, "Bu site, Elif Tasar\u0131m i\u00E7in haz\u0131rlanan etkile\u015Fimli tasar\u0131m ve aray\u00FCz uygulamas\u0131d\u0131r. G\u00F6rseller, \u00FCr\u00FCn adlar\u0131, \u00F6l\u00E7\u00FCler ve fiyatlar \u00F6rnektir."),
                    (0, react_1.createElement)("h3", null, "Canl\u0131 i\u015Flem yap\u0131lmaz."),
                    (0, react_1.createElement)("p", null, "\u00D6deme, e-posta, kargo, m\u00FC\u015Fteri hesab\u0131 ve sunucu kay\u0131tlar\u0131 ba\u011Fl\u0131 de\u011Fildir. Formlar at\u00F6lyeye bilgi g\u00F6ndermez. \u0130\u015Flem \u00F6zetlerini kendi cihaz\u0131n\u0131za indirebilirsiniz."),
                    (0, react_1.createElement)("h3", null, "Yaln\u0131z gerekli yerel kay\u0131tlar."),
                    (0, react_1.createElement)("p", null, "\u00D6rnek sepet ve kaydedilenler 30 g\u00FCn; a\u00E7\u0131k\u00E7a kaydetti\u011Finiz \u00F6l\u00E7\u00FC tercihleri 7 g\u00FCn bu taray\u0131c\u0131da tutulur. \u0130leti\u015Fim, not ve foto\u011Fraflar tasla\u011Fa kaydedilmez. Analitik ve reklam takibi yoktur."),
                    (0, react_1.createElement)("button", { className: "button button-outline", onClick: () => {
                            if (window.confirm('Bu uygulamanın bu cihazdaki örnek sepeti, kaydedilenleri ve ölçü tercihleri silinsin mi?')) {
                                try {
                                    Object.keys(localStorage).filter(k => k.startsWith('elif-v2:')).forEach(k => localStorage.removeItem(k));
                                }
                                catch { }
                                this.setState({ cart: [], favorites: [], info: false });
                                this.notify('Bu uygulamanın bu cihazdaki kayıtları temizlendi.');
                            }
                        } },
                        "Bu cihazdaki Elif kay\u0131tlar\u0131n\u0131 sil ",
                        (0, react_1.createElement)(ui_1.Icon, { name: "close" })),
                    (0, react_1.createElement)(ui_1.Link, { to: "/gizlilik", navigate: p => { this.setState({ info: false }); this.navigate(p); }, className: "text-link" },
                        "Ayr\u0131nt\u0131l\u0131 a\u00E7\u0131klama ",
                        (0, react_1.createElement)(ui_1.Icon, null)))),
            s.toast && (0, react_1.createElement)("div", { className: "toast", role: "status" },
                (0, react_1.createElement)(ui_1.Icon, { name: "check" }),
                (0, react_1.createElement)("span", null, s.toast),
                (0, react_1.createElement)("button", { className: "icon-button", onClick: () => this.setState({ toast: '' }), "aria-label": "Bildirimi kapat" },
                    (0, react_1.createElement)(ui_1.Icon, { name: "close", size: 16 }))));
    }
}
exports.default = App;

},
"src/components/ui":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dialog = void 0;
exports.image = image;
exports.Icon = Icon;
exports.Link = Link;
exports.TextLink = TextLink;
exports.ButtonLink = ButtonLink;
exports.Eyebrow = Eyebrow;
exports.Photo = Photo;
exports.SectionHead = SectionHead;
exports.PageIntro = PageIntro;
exports.ProductCard = ProductCard;
exports.Callout = Callout;
exports.Accordion = Accordion;
const react_1 = require("react");
const domain_1 = require("../lib/domain");
function image(name) { return typeof window !== 'undefined' && window.__ELIF_ASSETS__?.[name] || '/assets/' + name; }
function Icon({ name = 'arrow', size = 20 }) {
    const paths = { arrow: (0, react_1.createElement)(react_1.Fragment, null,
            (0, react_1.createElement)("path", { d: "M4 12h16M13 5l7 7-7 7" })), diagonal: (0, react_1.createElement)(react_1.Fragment, null,
            (0, react_1.createElement)("path", { d: "M5 19L19 5M5 5h14v14" })), search: (0, react_1.createElement)(react_1.Fragment, null,
            (0, react_1.createElement)("circle", { cx: "10.5", cy: "10.5", r: "6.5" }),
            (0, react_1.createElement)("path", { d: "m16 16 5 5" })), close: (0, react_1.createElement)("path", { d: "m5 5 14 14M19 5 5 19" }), menu: (0, react_1.createElement)("path", { d: "M3 7h18M3 16h18" }), bag: (0, react_1.createElement)(react_1.Fragment, null,
            (0, react_1.createElement)("path", { d: "M5 8h14l1 13H4L5 8Z" }),
            (0, react_1.createElement)("path", { d: "M8 8V6a4 4 0 0 1 8 0v2" })), heart: (0, react_1.createElement)("path", { d: "M20.8 4.7a5.5 5.5 0 0 0-7.8 0L12 5.8l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.5a5.5 5.5 0 0 0 0-7.8Z" }), plus: (0, react_1.createElement)("path", { d: "M12 4v16M4 12h16" }), minus: (0, react_1.createElement)("path", { d: "M4 12h16" }), down: (0, react_1.createElement)("path", { d: "m5 9 7 7 7-7" }), check: (0, react_1.createElement)("path", { d: "m4 12 5 5 11-11" }), ruler: (0, react_1.createElement)(react_1.Fragment, null,
            (0, react_1.createElement)("path", { d: "m3 16 13-13 5 5L8 21 3 16Z" }),
            (0, react_1.createElement)("path", { d: "m7 12 3 3m1-7 3 3m1-7 3 3" })), leaf: (0, react_1.createElement)(react_1.Fragment, null,
            (0, react_1.createElement)("path", { d: "M20 3C9 2 2 6 4 14s16 7 16-11Z" }),
            (0, react_1.createElement)("path", { d: "M3 22 16 8" })), hand: (0, react_1.createElement)(react_1.Fragment, null,
            (0, react_1.createElement)("path", { d: "M8 12V5a2 2 0 0 1 4 0v7-9a2 2 0 0 1 4 0v9-6a2 2 0 0 1 4 0v9c0 6-12 10-15 1l-2-5a2 2 0 0 1 3-2l2 3" })), upload: (0, react_1.createElement)(react_1.Fragment, null,
            (0, react_1.createElement)("path", { d: "M4 15v5h16v-5M12 17V3m-5 5 5-5 5 5" })), clock: (0, react_1.createElement)(react_1.Fragment, null,
            (0, react_1.createElement)("circle", { cx: "12", cy: "12", r: "9" }),
            (0, react_1.createElement)("path", { d: "M12 6v6l4 2" })), info: (0, react_1.createElement)(react_1.Fragment, null,
            (0, react_1.createElement)("circle", { cx: "12", cy: "12", r: "9" }),
            (0, react_1.createElement)("path", { d: "M12 11v6m0-11v2" })), grid: (0, react_1.createElement)(react_1.Fragment, null,
            (0, react_1.createElement)("rect", { x: "3", y: "3", width: "7", height: "7" }),
            (0, react_1.createElement)("rect", { x: "14", y: "3", width: "7", height: "7" }),
            (0, react_1.createElement)("rect", { x: "3", y: "14", width: "7", height: "7" }),
            (0, react_1.createElement)("rect", { x: "14", y: "14", width: "7", height: "7" })), download: (0, react_1.createElement)(react_1.Fragment, null,
            (0, react_1.createElement)("path", { d: "M12 3v13m-5-5 5 5 5-5M4 17v4h16v-4" })), pin: (0, react_1.createElement)(react_1.Fragment, null,
            (0, react_1.createElement)("path", { d: "M19 9c0 6-7 12-7 12S5 15 5 9a7 7 0 0 1 14 0Z" }),
            (0, react_1.createElement)("circle", { cx: "12", cy: "9", r: "2" })) };
    return (0, react_1.createElement)("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.25", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true" }, paths[name] || paths.arrow);
}
function Link({ to, navigate, children, className = '', ...rest }) {
    return (0, react_1.createElement)("a", { href: (0, domain_1.publicHref)(to), className: className, ...rest, onClick: (e) => {
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0)
                return;
            e.preventDefault();
            navigate(to);
        } }, children);
}
function TextLink({ to, navigate, children, light = false }) { return (0, react_1.createElement)(Link, { to: to, navigate: navigate, className: 'text-link ' + (light ? 'on-dark' : '') },
    children,
    (0, react_1.createElement)(Icon, { name: "arrow", size: 22 })); }
function ButtonLink({ to, navigate, children, secondary = false }) { return (0, react_1.createElement)(Link, { to: to, navigate: navigate, className: 'button ' + (secondary ? 'button-outline' : '') },
    children,
    (0, react_1.createElement)(Icon, null)); }
function Eyebrow({ children }) { return (0, react_1.createElement)("div", { className: "eyebrow" }, children); }
function Photo({ name, alt, ratio = '', className = '', caption = true, eager = false }) { return (0, react_1.createElement)("figure", { className: 'photo ' + className, style: ratio ? { aspectRatio: ratio } : undefined },
    (0, react_1.createElement)("img", { src: image(name), alt: alt, loading: eager ? 'eager' : 'lazy', decoding: "async" }),
    caption && (0, react_1.createElement)("figcaption", null, "Temsili tasar\u0131m g\u00F6rseli")); }
function SectionHead({ number, title, sub, to, navigate }) { return (0, react_1.createElement)("div", { className: "section-head" },
    (0, react_1.createElement)("div", null,
        (0, react_1.createElement)(Eyebrow, null,
            number,
            " / EL\u0130F TASARIM"),
        (0, react_1.createElement)("h2", null, title),
        sub && (0, react_1.createElement)("p", null, sub)),
    to && (0, react_1.createElement)(TextLink, { to: to, navigate: navigate }, "T\u00FCm\u00FCn\u00FC ke\u015Ffet")); }
function PageIntro({ kicker, title, desc }) { return (0, react_1.createElement)("header", { className: "page-intro wrap" },
    (0, react_1.createElement)(Eyebrow, null, kicker),
    (0, react_1.createElement)("h1", null, title),
    desc && (0, react_1.createElement)("p", null, desc)); }
function ProductCard({ product: p, actions: a }) { return (0, react_1.createElement)("article", { className: "product-card" },
    (0, react_1.createElement)("div", { className: "product-visual" },
        (0, react_1.createElement)(Link, { to: '/urun/' + p.id, navigate: a.navigate, "aria-label": p.name + ' ' + p.categoryLabel + ' detayları' },
            (0, react_1.createElement)("img", { src: image(p.image), alt: p.name + ' ' + p.categoryLabel + ' — temsili konsept görseli', loading: "lazy" })),
        (0, react_1.createElement)("span", { className: "image-index" },
            p.number,
            " / KONSEPT"),
        (0, react_1.createElement)("button", { className: 'save-button ' + (a.favorites.includes(p.id) ? 'is-saved' : ''), "aria-label": p.name + (a.favorites.includes(p.id) ? ' kaydını kaldır' : ' ürününü kaydet'), "aria-pressed": a.favorites.includes(p.id), onClick: () => a.favorite(p.id) },
            (0, react_1.createElement)(Icon, { name: "heart", size: 19 }))),
    (0, react_1.createElement)("div", { className: "product-caption" },
        (0, react_1.createElement)("div", null,
            (0, react_1.createElement)("span", { className: "label" }, p.categoryLabel),
            (0, react_1.createElement)("h3", null,
                (0, react_1.createElement)(Link, { to: '/urun/' + p.id, navigate: a.navigate }, p.name)),
            (0, react_1.createElement)("p", null,
                p.material,
                " g\u00F6r\u00FCn\u00FCm\u00FC \u00B7 ",
                p.mode === 'quoted' ? 'Özel ölçü' : 'Konsept koleksiyon')),
        (0, react_1.createElement)(Link, { to: '/urun/' + p.id, navigate: a.navigate, className: "card-arrow", "aria-label": p.name + ' ürününü incele' },
            (0, react_1.createElement)(Icon, { name: "diagonal" })))); }
function Callout({ navigate }) { return (0, react_1.createElement)("section", { className: "closing-cta" },
    (0, react_1.createElement)("div", { className: "wrap" },
        (0, react_1.createElement)(Eyebrow, null, "B\u0130R F\u0130K\u0130RLE BA\u015ELAYALIM"),
        (0, react_1.createElement)("h2", null,
            "\u00D6l\u00E7\u00FCs\u00FC size.",
            (0, react_1.createElement)("br", null),
            (0, react_1.createElement)("em", null, "Hik\u00E2yesi birlikte.")),
        (0, react_1.createElement)(ButtonLink, { to: "/teklif-al", navigate: navigate }, "Projenizi konu\u015Fal\u0131m"),
        (0, react_1.createElement)("p", null, "Bir \u00F6l\u00E7\u00FC, bir foto\u011Fraf ya da yaln\u0131zca bir fikir."))); }
function Accordion({ items }) { return (0, react_1.createElement)("div", { className: "accordion" }, items.map(([title, text], i) => (0, react_1.createElement)("details", { key: title },
    (0, react_1.createElement)("summary", null,
        (0, react_1.createElement)("span", { className: "accordion-num" },
            "0",
            i + 1),
        (0, react_1.createElement)("span", null, title),
        (0, react_1.createElement)(Icon, { name: "plus" })),
    (0, react_1.createElement)("div", { className: "answer" }, text)))); }
class Dialog extends react_1.Component {
    constructor() {
        super(...arguments);
        this.el = null;
        this.previous = null;
    }
    componentDidMount() { this.previous = document.activeElement; this.el?.showModal(); }
    componentWillUnmount() {
        if (this.previous?.isConnected)
            this.previous.focus();
    }
    render() {
        return (0, react_1.createElement)("dialog", { className: "dialog", ref: (e) => { this.el = e; }, onCancel: (e) => { e.preventDefault(); this.props.onClose(); }, onKeyDown: (e) => {
                if (e.key === 'Escape') {
                    e.preventDefault();
                    e.stopPropagation();
                    this.props.onClose();
                }
            }, onClick: (e) => {
                if (e.target === e.currentTarget)
                    this.props.onClose();
            }, "aria-label": this.props.title },
            (0, react_1.createElement)("div", { className: "dialog-inner" },
                (0, react_1.createElement)("div", { className: "dialog-head" },
                    (0, react_1.createElement)("h2", null, this.props.title),
                    (0, react_1.createElement)("button", { className: "icon-button", onClick: this.props.onClose, "aria-label": "Pencereyi kapat" },
                        (0, react_1.createElement)(Icon, { name: "close" }))),
                this.props.children));
    }
}
exports.Dialog = Dialog;

},
"src/lib/data":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.faqs = exports.journal = exports.ideas = exports.materials = exports.categories = exports.products = exports.assets = void 0;
const assets = (name) => '/assets/' + name;
exports.assets = assets;
exports.products = [
    { id: 'vera-yemek-masasi', name: 'Vera', category: 'yemek', categoryLabel: 'Yemek masası', material: 'Ceviz', image: 'dining.webp', mode: 'made_to_order', price: 4200000, sizes: ['180 × 90 cm', '200 × 100 cm', '220 × 100 cm'], intro: 'Bir araya gelmek için, yalın bir neden.', detail: 'Oval çizgiler, güçlü bir ahşap karakter ve masanın çevresinde daha çok yer bırakan heykelsi bir form. Bu tasarım örneğinin ölçüsü, malzemesi ve üretim ayrıntıları atölyeyle birlikte netleştirilir.', dimensions: '180 × 90 × 75 cm', number: '01' },
    { id: 'kavis-sandalye', name: 'Kavis', category: 'oturma', categoryLabel: 'Sandalye', material: 'Ceviz', image: 'chair.webp', mode: 'stocked', price: 1250000, sizes: ['Standart ölçü'], intro: 'Bir çizginin, rahatlığa dönüşmesi.', detail: 'Sırtı çevreleyen kavisli form ile açık renk döşemenin dengesi. Görsel bir konsepttir; döşeme, bağlantı ve ölçüler gerçek ürün envanterine göre değiştirilecektir.', dimensions: '56 × 54 × 78 cm', number: '02' },
    { id: 'denge-konsol', name: 'Denge', category: 'depolama', categoryLabel: 'Konsol', material: 'Ceviz', image: 'sideboard.webp', mode: 'quoted', price: null, sizes: ['Ölçünüze göre'], intro: 'Sakladığı kadar, sergilediğiyle de güzel.', detail: 'Düşey ritimli yüzeyler ve sakin bir silüet. Yaşam alanınızdaki boşluğa göre düşünülmüş bir depolama fikri. İç bölümler ve donanım ihtiyaçlarınıza göre görüşülür.', dimensions: 'Mekânınıza göre belirlenir', number: '03' },
    { id: 'rota-calisma-masasi', name: 'Rota', category: 'calisma', categoryLabel: 'Yükseklik ayarlı masa', material: 'Ceviz', image: 'office.webp', mode: 'quoted', price: null, sizes: ['Ölçünüze göre'], intro: 'Çalışma gününüze, başka bir denge.', detail: 'Ahşap tabla ile yüksekliği ayarlanabilen çalışma fikrini buluşturuyor. Mekanizma, taşıma kapasitesi, kablo düzeni ve tabla uyumu üretimden önce teknik olarak doğrulanır.', dimensions: 'Tabla ve mekanizmaya göre belirlenir', number: '04' }
];
exports.categories = [{ id: 'all', label: 'Tüm parçalar' }, { id: 'yemek', label: 'Yemek alanı' }, { id: 'oturma', label: 'Oturma' }, { id: 'depolama', label: 'Depolama' }, { id: 'calisma', label: 'Çalışma alanı' }];
exports.materials = [
    { id: 'ceviz', name: 'Ceviz', latin: 'Derin, canlı, karakterli.', image: 'wood-walnut.webp', color: '#6e4b31', desc: 'Koyu tonlu ve belirgin damar hissi veren ceviz, bu konseptin ana görsel malzemesi. Kesin tür, masif veya kaplama tercihi ve yüzey işlemi gerçek ürün bilgisiyle doğrulanır.' },
    { id: 'mese', name: 'Meşe', latin: 'Aydınlık bir doğallık.', image: 'wood-oak.webp', color: '#b39065', desc: 'Açık tonları öne çıkan meşe görünümü, yalın ve ferah mekânlar için bir tasarım yönü sunar. Numune seçimi sırasında ton ve yüzey bitişi birlikte değerlendirilir.' },
    { id: 'kestane', name: 'Kestane', latin: 'Sıcak, yalın bir doku.', image: 'wood-chestnut.webp', color: '#916849', desc: 'Damarları ve sıcak tonlarıyla bir başka malzeme fikri. Bu kütüphane tasarım örneğidir; atölyenin gerçekten kullandığı malzemeler doğrulandıktan sonra güncellenir.' }
];
exports.ideas = [
    { id: 'bir-masanin-etrafinda', name: 'Bir masanın etrafında', type: 'YEMEK ALANI', image: 'dining.webp', text: 'Bir mekânı paylaşmanın en sade hâli. Oval bir masa, farklı yönlerden gelen ışık ve gereğinden fazla olmayan eşya.', products: ['vera-yemek-masasi', 'kavis-sandalye'] },
    { id: 'kendinize-ait-bir-kose', name: 'Kendinize ait bir köşe', type: 'ÇALIŞMA ALANI', image: 'office.webp', text: 'Günün ritmini değiştiren bir çalışma alanı. Işık, tabla derinliği ve kablo düzeni; yalnız görünümü değil kullanımı da tasarlamak.', products: ['rota-calisma-masasi'] },
    { id: 'sakin-bir-ritim', name: 'Sakin bir ritim', type: 'YAŞAM ALANI', image: 'sideboard.webp', text: 'Bir konsolun ritimli yüzeyi, mekâna eşlik eden az sayıda nesne ve dokuyu hissettiren bir ışık.', products: ['denge-konsol'] }
];
exports.journal = [
    { id: 'olcu-alma', title: 'İyi bir başlangıç: doğru ölçü', subtitle: 'ÖZEL ÜRETİM REHBERİ', image: 'sketch.webp', intro: 'Tam bir teknik çizimle gelmeniz gerekmiyor. Birkaç ölçü ve bir fotoğraf, ilk konuşma için yeterli bir başlangıç olabilir.', sections: [['Önce alanı düşünün', 'Mobilyanın yerleşeceği en, derinlik ve yükseklik alanını ayrı ayrı not edin. Ölçü birimini yazın; santimetre ile milimetreyi aynı çizimde karıştırmayın.'], ['Kullanım payını unutmayın', 'Sandalyenin geriye hareketi, bir çekmecenin açılışı veya geçiş alanı da tasarımın parçasıdır. Uygun boşluklar atölyeyle kullanım senaryonuza göre değerlendirilmeli.'], ['Bir fotoğrafla destekleyin', 'Mümkünse alanı karşıdan ve yandan gösterin. Kişisel belgeler, insanlar veya açık adres gibi özel bilgiler görünmesin.'], ['Son ölçü atölye teyidinden geçer', 'İlk talepte verdiğiniz ölçü üretim emri değildir. Üretilecek parça için son ölçü, malzeme ve çizim ayrıca onaylanır.']] },
    { id: 'malzeme-secimi', title: 'Ahşabı yalnız rengiyle seçmeyin', subtitle: 'MALZEME NOTLARI', image: 'joinery.webp', intro: 'Bir mobilyada gördüğümüz ton, verdiğimiz kararın yalnız bir parçası. Kullanım biçimi ve yüzey işlemi de konuşmanın içinde olmalı.', sections: [['Kullanımı tarif edin', 'Yemek masası, çalışma tablası ve dekoratif raf aynı beklentileri karşılamaz. Nerede, nasıl ve ne sıklıkla kullanılacağını atölyeye anlatın.'], ['Tür ile yüzeyi ayırın', 'Ceviz bir ağaç türünü, yağ veya vernik bir yüzey işlemini anlatır. Masif, kaplama ve kompozit yüzeyler de aynı anlama gelmez.'], ['Numuneyi kendi ışığınızda görün', 'Ekran ve fotoğraflar renk kararının tek dayanağı olmamalı. Kesin ton ve bitiş için gerçek bir numuneyi değerlendirmek isteyin.']] },
    { id: 'bakim', title: 'Birlikte yaşadıkça güzelleşsin', subtitle: 'BAKIM NOTLARI', image: 'wood-walnut.webp', intro: 'Bakım, ürünün gerçek malzemesi ve yüzey işlemiyle birlikte düşünülür. Bu sayfa ürün özelindeki bakım talimatının yerini tutmaz.', sections: [['Önce yüzey bilgisini öğrenin', 'Üretimde kullanılan yüzey ürününün talimatını isteyin. Her ahşap görünümlü yüzeye aynı yağ, cila veya temizlik ürünü uygulanmaz.'], ['Küçük alışkanlıklar', 'Sıcak ve ıslak nesnelerin doğrudan teması gibi kullanım koşullarını atölyeyle konuşun. Ürününüz için uygun temizlik ve koruma yöntemini teyit edin.'], ['Müdahaleden önce danışın', 'Bir leke veya hasarda yüzeyi zımparalamadan ya da kimyasal uygulamadan önce ürünün fotoğrafı ve malzeme bilgisiyle destek isteyin.']] }
];
exports.faqs = [
    ['Ölçülerim henüz net değil. Yine de başlayabilir miyiz?', 'Evet. Özel ölçü formundaki “Ölçülerimi birlikte belirleyelim” seçeneğiyle ilerleyebilirsiniz. İlk aşamada ihtiyacınızı anlamak, kesin ölçüden daha önemlidir.'],
    ['Görsellerdeki ürünler satın alınabilir mi?', 'Bu sürümdeki görseller, ürün adları, ölçüler ve fiyatlar tasarım örneğidir. Gerçek katalog ve onaylı fiyatlar henüz yerleştirilmedi; canlı satış yapılmaz.'],
    ['Bir görsel veya çizim paylaşabilir miyim?', 'Teklif stüdyosuna en fazla 5 JPG, PNG veya WebP görseli ekleyebilirsiniz. Her dosya en fazla 10 MB olabilir. Bu önizlemede dosyalar yalnız açık sayfanızda işlenir, sunucuya gönderilmez.'],
    ['Üretim ve teslim tarihi nasıl belirlenir?', 'Tarih; tasarım, malzeme, atölye kapasitesi ve teslimat koşulları netleşince teklifin bir parçası olur. Bu önizleme otomatik teslim sözü vermez.'],
    ['Özel üretim ile standart sipariş arasında ne fark var?', 'Özel üretimde önce ihtiyacınız, ölçü, malzeme ve iş kapsamı netleştirilir. Onaylı teklif ve çizimden sonra üretim planlanır. Standart üründe ise seçili varyant ve satış koşulları önceden belirlenmiştir.']
];

},
"src/lib/domain":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartKey = exports.validQuantity = exports.searchKey = exports.money = void 0;
exports.parseDimension = parseDimension;
exports.majorToMinor = majorToMinor;
exports.lineTotal = lineTotal;
exports.validateFile = validateFile;
exports.validateQuoteStep = validateQuoteStep;
exports.safeDraft = safeDraft;
exports.readLocal = readLocal;
exports.writeLocal = writeLocal;
exports.downloadText = downloadText;
exports.publicHref = publicHref;
function parseDimension(raw, unit) {
    if (unit !== 'cm' && unit !== 'mm')
        return { ok: false, error: 'Santimetre veya milimetre seçin.' };
    const s = String(raw).trim();
    if (!/^\d+(?:[.,]\d+)?$/.test(s))
        return { ok: false, error: '120,5 gibi tek ondalık ayraçlı bir ölçü yazın.' };
    const [a, b = ''] = s.replace(',', '.').split('.');
    const scale = unit === 'cm' ? 10 : 1;
    const n = Number(a + '.' + b) * scale;
    const rounded = Math.round(n);
    if (!Number.isFinite(n) || n <= 0 || n > 10000 || Math.abs(n - rounded) > 0.0000001)
        return { ok: false, error: 'Ölçüyü 1–10.000 mm aralığında, tam milimetre olarak belirtin.' };
    return { ok: true, mm: rounded };
}
function majorToMinor(value) {
    if (!/^\d+(?:\.\d{1,2})?$/.test(value))
        throw new Error('Geçersiz para değeri');
    const [whole, dec = ''] = value.split('.');
    const n = BigInt(whole) * 100n + BigInt(dec.padEnd(2, '0'));
    if (n > BigInt(Number.MAX_SAFE_INTEGER))
        throw new Error('Tutar sınırı aşıldı');
    return Number(n);
}
const money = (minor) => new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(minor / 100);
exports.money = money;
const searchKey = (s) => s.toLocaleLowerCase('tr-TR').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ı/g, 'i');
exports.searchKey = searchKey;
const validQuantity = (n) => Number.isSafeInteger(n) && n >= 1 && n <= 100;
exports.validQuantity = validQuantity;
const cartKey = (id, material, size) => [id, material, size].join('::');
exports.cartKey = cartKey;
function lineTotal(price, quantity) {
    if (!Number.isSafeInteger(price) || price < 0 || !(0, exports.validQuantity)(quantity) || !Number.isSafeInteger(price * quantity))
        throw new Error('Geçersiz satır');
    return price * quantity;
}
function validateFile(file) {
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type))
        return { ok: false, error: 'Yalnız JPG, PNG ve WebP görselleri ekleyebilirsiniz.' };
    if (file.size > 10 * 1024 * 1024 || file.size <= 0)
        return { ok: false, error: 'Her görsel 10 MB veya daha küçük olmalı.' };
    return { ok: true };
}
function validateQuoteStep(step, v) {
    const errors = {};
    if (step === 0 && !v.kind)
        errors.kind = 'Bir ürün türü seçin veya birlikte karar verelim seçeneğini kullanın.';
    if (step === 1 && !v.unknown)
        for (const field of ['width', 'depth', 'height']) {
            const r = parseDimension(v[field] || '', v.unit || 'cm');
            if (!r.ok)
                errors[field] = r.error;
        }
    if (step === 5) {
        if (!v.name || v.name.trim().length < 2)
            errors.name = 'En az iki karakterlik bir ad yazın.';
        if (!v.email && !v.phone)
            errors.email = 'E-posta veya telefon bilgilerinden en az birini yazın.';
        if (v.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email))
            errors.email = 'Geçerli bir e-posta adresi yazın.';
        if (v.phone && !/^\+?[\d\s()-]{10,20}$/.test(v.phone))
            errors.phone = 'Ülke kodu dahil geçerli bir telefon yazın.';
    }
    return errors;
}
function safeDraft(v) {
    const out = {};
    if (!v || typeof v !== 'object' || Array.isArray(v))
        return out;
    for (const k of ['kind', 'width', 'depth', 'height', 'material', 'finish'])
        if (typeof v[k] === 'string' && v[k].length <= 100)
            out[k] = v[k];
    if (v.unit === 'cm' || v.unit === 'mm')
        out.unit = v.unit;
    if (typeof v.unknown === 'boolean')
        out.unknown = v.unknown;
    return out;
}
function readLocal(key, fallback) {
    try {
        const raw = localStorage.getItem('elif-v2:' + key);
        if (!raw)
            return fallback;
        const record = JSON.parse(raw);
        if (typeof record.expires !== 'number' || !Number.isFinite(record.expires) || record.expires < Date.now()) {
            localStorage.removeItem('elif-v2:' + key);
            return fallback;
        }
        return record.value ?? fallback;
    }
    catch {
        return fallback;
    }
}
function writeLocal(key, value, days = 30) {
    try {
        localStorage.setItem('elif-v2:' + key, JSON.stringify({ value, expires: Date.now() + days * 86400000 }));
        return true;
    }
    catch {
        return false;
    }
}
function downloadText(name, text, mime = 'text/plain;charset=utf-8') { const url = URL.createObjectURL(new Blob([text], { type: mime })); const a = document.createElement('a'); a.href = url; a.download = name; a.click(); setTimeout(() => URL.revokeObjectURL(url), 10000); }
function publicHref(path) { return typeof window !== 'undefined' && window.__ELIF_PREVIEW__ ? '#' + path : path; }

},
"src/lib/routes":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routePaths = void 0;
exports.pageTitle = pageTitle;
const data_1 = require("./data");
exports.routePaths = ['/', '/urunler', '/atolyemiz', '/ozel-uretim', '/malzemeler', '/mekan-fikirleri', '/rehber', '/teklif-al', '/sikca-sorulan-sorular', '/iletisim', '/sepet', '/odeme', '/calisma-dosyam', '/gizlilik', '/atolye-demolari', ...data_1.products.map(p => '/urun/' + p.id), ...data_1.ideas.map(p => '/mekan-fikirleri/' + p.id), ...data_1.journal.map(p => '/rehber/' + p.id)];
function pageTitle(path) { const p = path.split('?')[0]; const product = data_1.products.find(x => '/urun/' + x.id === p); const article = data_1.journal.find(x => '/rehber/' + x.id === p); const idea = data_1.ideas.find(x => '/mekan-fikirleri/' + x.id === p); return product ? product.name + ' | Elif Tasarım' : article ? article.title + ' | Elif Tasarım' : idea ? idea.name + ' | Elif Tasarım' : { '/': 'Elif Tasarım | El Yapımı Mobilya Atölyesi', '/urunler': 'Koleksiyon | Elif Tasarım', '/teklif-al': 'Özel Ölçü Stüdyosu | Elif Tasarım', '/atolyemiz': 'Atölyemiz | Elif Tasarım', '/malzemeler': 'Malzeme Kütüphanesi | Elif Tasarım', '/sepet': 'Örnek Sepet | Elif Tasarım', '/odeme': 'Sipariş Hazırlığı | Elif Tasarım', '/iletisim': 'İletişim | Elif Tasarım', '/rehber': 'Atölye Notları | Elif Tasarım', '/ozel-uretim': 'Özel Üretim | Elif Tasarım', '/mekan-fikirleri': 'Mekân Fikirleri | Elif Tasarım', '/calisma-dosyam': 'Kaydedilenler | Elif Tasarım', '/gizlilik': 'Önizleme Gizliliği | Elif Tasarım', '/sikca-sorulan-sorular': 'Sorular | Elif Tasarım', '/atolye-demolari': 'Atölye İş Akışı Demosu | Elif Tasarım' }[p] || 'Sayfa bulunamadı | Elif Tasarım'; }

},
"src/main":function(module,exports,require){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const client_1 = require("react-dom/client");
const App_1 = __importDefault(require("./App"));
const root = document.getElementById('app');
if (!root)
    throw new Error('Uygulama kökü bulunamadı');
(0, client_1.createRoot)(root).render((0, react_1.createElement)(App_1.default, { initialPath: "/" }));

},
"src/pages/Catalog":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductPage = exports.Catalog = void 0;
const react_1 = require("react");
const data_1 = require("../lib/data");
const domain_1 = require("../lib/domain");
const ui_1 = require("../components/ui");
class Catalog extends react_1.Component {
    constructor(props) { super(props); this.state = { category: props.initialCategory || 'all', query: '', sort: 'editorial' }; }
    render() {
        const a = this.props;
        let items = data_1.products.filter(p => (this.state.category === 'all' || p.category === this.state.category) && (0, domain_1.searchKey)(p.name + ' ' + p.categoryLabel + ' ' + p.material).includes((0, domain_1.searchKey)(this.state.query)));
        if (this.state.sort === 'name')
            items = [...items].sort((a, b) => a.name.localeCompare(b.name, 'tr'));
        if (this.state.sort === 'price')
            items = [...items].sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
        return (0, react_1.createElement)(react_1.Fragment, null,
            (0, react_1.createElement)(ui_1.PageIntro, { kicker: "KOLEKS\u0130YON / TASARIM SE\u00C7K\u0130S\u0130", title: (0, react_1.createElement)(react_1.Fragment, null,
                    "G\u00FCndelik hayat.",
                    (0, react_1.createElement)("br", null),
                    (0, react_1.createElement)("em", null, "\u0130yi d\u00FC\u015F\u00FCn\u00FClm\u00FC\u015F par\u00E7alar.")), desc: "Bir mek\u00E2na yerle\u015Fmekten fazlas\u0131. Ya\u015Fam\u0131n\u0131za e\u015Flik etmesi i\u00E7in d\u00FC\u015F\u00FCn\u00FClen tasar\u0131m fikirleri." }),
            (0, react_1.createElement)("section", { className: "wrap catalog" },
                (0, react_1.createElement)("div", { className: "catalog-toolbar" },
                    (0, react_1.createElement)("div", { className: "filter-tabs", role: "group", "aria-label": "Kullan\u0131m alan\u0131" }, data_1.categories.map(c => (0, react_1.createElement)("button", { key: c.id, className: this.state.category === c.id ? 'active' : '', "aria-pressed": this.state.category === c.id, onClick: () => this.setState({ category: c.id }) }, c.label))),
                    (0, react_1.createElement)("label", { className: "sort-control" },
                        "S\u0131ralama",
                        (0, react_1.createElement)("select", { value: this.state.sort, onChange: e => this.setState({ sort: e.currentTarget.value }) },
                            (0, react_1.createElement)("option", { value: "editorial" }, "At\u00F6lye se\u00E7kisi"),
                            (0, react_1.createElement)("option", { value: "name" }, "\u0130sme g\u00F6re"),
                            (0, react_1.createElement)("option", { value: "price" }, "\u00D6rnek fiyata g\u00F6re")))),
                (0, react_1.createElement)("div", { className: "catalog-search" },
                    (0, react_1.createElement)("label", null,
                        (0, react_1.createElement)(ui_1.Icon, { name: "search" }),
                        (0, react_1.createElement)("input", { type: "search", value: this.state.query, onInput: e => this.setState({ query: e.currentTarget.value }), placeholder: "Bir par\u00E7a, malzeme veya kullan\u0131m alan\u0131\u2026", "aria-label": "Koleksiyonda ara" })),
                    (0, react_1.createElement)("span", { role: "status" },
                        items.length,
                        " tasar\u0131m fikri")),
                items.length ? (0, react_1.createElement)("div", { className: "catalog-grid" }, items.map(p => (0, react_1.createElement)(ui_1.ProductCard, { key: p.id, product: p, actions: a }))) : (0, react_1.createElement)("div", { className: "empty-state" },
                    (0, react_1.createElement)(ui_1.Icon, { name: "search", size: 34 }),
                    (0, react_1.createElement)("h2", null, "Bu aramada bir par\u00E7a bulamad\u0131k."),
                    (0, react_1.createElement)("p", null, "Ba\u015Fka bir kelime deneyebilir ya da t\u00FCm koleksiyona d\u00F6nebilirsiniz."),
                    (0, react_1.createElement)("button", { className: "button", onClick: () => this.setState({ query: '', category: 'all' }) },
                        "Filtreleri temizle ",
                        (0, react_1.createElement)(ui_1.Icon, null))),
                (0, react_1.createElement)("div", { className: "note-box" },
                    (0, react_1.createElement)(ui_1.Icon, { name: "info" }),
                    (0, react_1.createElement)("p", null, "Bu se\u00E7kideki isimler, g\u00F6rseller, \u00F6l\u00E7\u00FCler ve fiyatlar tasar\u0131m \u00F6rne\u011Fidir. Ger\u00E7ek katalog do\u011Fruland\u0131ktan sonra yay\u0131mlanacakt\u0131r. Canl\u0131 sat\u0131\u015F kapal\u0131d\u0131r."))),
            (0, react_1.createElement)(ui_1.Callout, { navigate: a.navigate }));
    }
}
exports.Catalog = Catalog;
class ProductPage extends react_1.Component {
    constructor(props) { super(props); this.state = { material: 'Ceviz', size: props.product.sizes[0], quantity: 1, view: 'full', lightbox: false }; }
    render() {
        const a = this.props, p = a.product;
        const sizeExtra = Math.max(0, p.sizes.indexOf(this.state.size)) * 700000;
        const price = p.price === null ? null : p.price + sizeExtra;
        return (0, react_1.createElement)(react_1.Fragment, null,
            (0, react_1.createElement)("div", { className: "breadcrumb wrap" },
                (0, react_1.createElement)(ui_1.Link, { to: "/urunler", navigate: a.navigate }, "Koleksiyon"),
                (0, react_1.createElement)("span", null, "/"),
                (0, react_1.createElement)(ui_1.Link, { to: '/urunler?alan=' + p.category, navigate: a.navigate }, p.categoryLabel),
                (0, react_1.createElement)("span", null, "/"),
                (0, react_1.createElement)("span", null, p.name)),
            (0, react_1.createElement)("section", { className: "wrap product-detail" },
                (0, react_1.createElement)("div", { className: "product-gallery" },
                    (0, react_1.createElement)("button", { className: 'main-product-image ' + (this.state.view === 'detail' ? 'zoomed' : ''), "aria-label": "\u00DCr\u00FCn konsept g\u00F6rselini b\u00FCy\u00FCt", onClick: () => this.setState({ lightbox: true }) },
                        (0, react_1.createElement)("img", { src: (0, ui_1.image)(p.image), alt: p.name + ' ' + (this.state.view === 'detail' ? 'aynı konsept görselinin detay kırpımı' : 'konsept genel görünümü') }),
                        (0, react_1.createElement)("span", { className: "zoom-icon" },
                            (0, react_1.createElement)(ui_1.Icon, { name: "plus" })),
                        (0, react_1.createElement)("span", { className: "photo-disclaimer" }, this.state.view === 'detail' ? 'Aynı konseptin detay kırpımı' : 'Temsili tasarım görseli')),
                    (0, react_1.createElement)("div", { className: "gallery-controls", role: "group", "aria-label": "G\u00F6rsel g\u00F6r\u00FCn\u00FCm\u00FC" },
                        (0, react_1.createElement)("button", { className: this.state.view === 'full' ? 'active' : '', onClick: () => this.setState({ view: 'full' }) },
                            (0, react_1.createElement)("img", { src: (0, ui_1.image)(p.image), alt: "" }),
                            "Genel g\u00F6r\u00FCn\u00FCm"),
                        (0, react_1.createElement)("button", { className: this.state.view === 'detail' ? 'active' : '', onClick: () => this.setState({ view: 'detail' }) },
                            (0, react_1.createElement)("img", { className: "detail-thumb", src: (0, ui_1.image)(p.image), alt: "" }),
                            "Detay k\u0131rp\u0131m\u0131")),
                    (0, react_1.createElement)("p", { className: "small muted" }, "G\u00F6rseldeki di\u011Fer mobilya ve aksesuarlar \u00FCr\u00FCn kapsam\u0131na dahil de\u011Fildir.")),
                (0, react_1.createElement)("div", { className: "product-info" },
                    (0, react_1.createElement)(ui_1.Eyebrow, null,
                        "EL\u0130F TASARIM / ",
                        p.categoryLabel.toLocaleUpperCase('tr-TR')),
                    (0, react_1.createElement)("div", { className: "product-title-row" },
                        (0, react_1.createElement)("h1", null, p.name),
                        (0, react_1.createElement)("button", { className: 'icon-button ' + (a.favorites.includes(p.id) ? 'is-saved' : ''), "aria-label": p.name + ' ürününü kaydet', "aria-pressed": a.favorites.includes(p.id), onClick: () => a.favorite(p.id) },
                            (0, react_1.createElement)(ui_1.Icon, { name: "heart", size: 25 }))),
                    (0, react_1.createElement)("p", { className: "product-poem" }, p.intro),
                    (0, react_1.createElement)("p", null, p.detail),
                    (0, react_1.createElement)("div", { className: "price-block" }, price === null ? (0, react_1.createElement)(react_1.Fragment, null,
                        (0, react_1.createElement)("strong", null, "\u00D6l\u00E7\u00FCn\u00FCze \u00F6zel teklif"),
                        (0, react_1.createElement)("span", null, "\u0130htiya\u00E7 ve malzemeye g\u00F6re birlikte belirlenir.")) : (0, react_1.createElement)(react_1.Fragment, null,
                        (0, react_1.createElement)("strong", null, (0, domain_1.money)(price)),
                        (0, react_1.createElement)("span", null, "Yaln\u0131z \u00F6rnek fiyat \u00B7 Sat\u0131\u015F teklifi de\u011Fildir"))),
                    (0, react_1.createElement)("div", { className: "option-group" },
                        (0, react_1.createElement)("span", { className: "field-label" },
                            "MALZEME F\u0130KR\u0130 ",
                            (0, react_1.createElement)("b", null, this.state.material)),
                        (0, react_1.createElement)("div", { className: "swatch-options" }, ['Ceviz', 'Meşe'].map((m, i) => (0, react_1.createElement)("button", { key: m, className: this.state.material === m ? 'active' : '', "aria-pressed": this.state.material === m, onClick: () => this.setState({ material: m }) },
                            (0, react_1.createElement)("span", { style: { backgroundImage: `url(${(0, ui_1.image)(i ? 'wood-oak.webp' : 'wood-walnut.webp')})` } }),
                            m))),
                        (0, react_1.createElement)("span", { className: "small muted" }, "Foto\u011Fraf ceviz g\u00F6r\u00FCn\u00FCm\u00FCnde konsepttir. Di\u011Fer malzeme i\u00E7in ger\u00E7ek numune gerekir.")),
                    (0, react_1.createElement)("label", { className: "field-label option-group" },
                        "\u00D6L\u00C7\u00DC",
                        (0, react_1.createElement)("select", { value: this.state.size, onChange: e => this.setState({ size: e.currentTarget.value }) }, p.sizes.map(s => (0, react_1.createElement)("option", { key: s, value: s }, s)))),
                    p.price !== null ? (0, react_1.createElement)("div", { className: "product-actions" },
                        (0, react_1.createElement)("div", { className: "quantity" },
                            (0, react_1.createElement)("button", { "aria-label": "Adedi azalt", disabled: this.state.quantity <= 1, onClick: () => this.setState({ quantity: this.state.quantity - 1 }) },
                                (0, react_1.createElement)(ui_1.Icon, { name: "minus", size: 16 })),
                            (0, react_1.createElement)("input", { "aria-label": "Adet", value: this.state.quantity, type: "number", min: "1", max: "100", onChange: e => {
                                    const n = Number(e.currentTarget.value);
                                    if ((0, domain_1.validQuantity)(n))
                                        this.setState({ quantity: n });
                                    else {
                                        e.currentTarget.value = String(this.state.quantity);
                                        a.notify('Adet 1 ile 100 arasında tam sayı olmalı.');
                                    }
                                } }),
                            (0, react_1.createElement)("button", { "aria-label": "Adedi art\u0131r", disabled: this.state.quantity >= 100, onClick: () => this.setState({ quantity: this.state.quantity + 1 }) },
                                (0, react_1.createElement)(ui_1.Icon, { name: "plus", size: 16 }))),
                        (0, react_1.createElement)("button", { className: "button", onClick: () => a.addCart(p, this.state.material, this.state.size, this.state.quantity) },
                            "\u00D6rnek sepete ekle ",
                            (0, react_1.createElement)(ui_1.Icon, { name: "bag" }))) : (0, react_1.createElement)(ui_1.ButtonLink, { to: '/teklif-al?urun=' + p.id, navigate: a.navigate }, "Bu tasar\u0131m\u0131 birlikte d\u00FC\u015F\u00FCnelim"),
                    (0, react_1.createElement)("div", { className: "product-support" },
                        (0, react_1.createElement)(ui_1.Icon, { name: "ruler" }),
                        (0, react_1.createElement)("span", null, "Ba\u015Fka bir \u00F6l\u00E7\u00FC m\u00FC d\u00FC\u015F\u00FCn\u00FCyorsunuz?"),
                        (0, react_1.createElement)(ui_1.Link, { to: '/teklif-al?urun=' + p.id, navigate: a.navigate },
                            "Konu\u015Fal\u0131m ",
                            (0, react_1.createElement)(ui_1.Icon, { size: 16 }))),
                    (0, react_1.createElement)(ui_1.Accordion, { items: [
                            ['Tasarım ve ölçü bilgisi', p.dimensions + '. Verilen ölçüler tasarım örneğidir; üretim ölçüsü ve teknik uygunluk atölye tarafından ayrıca onaylanmalıdır.'],
                            ['Malzeme ve yüzey', 'Ağaç türü, masif veya kaplama yapısı, yüzey işlemi ve donanım gerçek ürün kaydında ayrı belirtilir. Bu görselin tonu bir malzeme sertifikası veya numune değildir.'],
                            ['Üretim, teslim ve kurulum', 'Teslimat bölgesi, bina erişimi, kurulum ihtiyacı ve üretim planı kesin teklifte netleştirilir. Bu sürümde otomatik teslim tarihi veya ücretsiz kargo taahhüdü yoktur.'],
                            ['Bakım', 'Kesin bakım yöntemi gerçek malzeme ve yüzey işlemiyle belirlenir. Üretici talimatı dışında kimyasal veya yüzey uygulaması yapmadan önce atölyeye danışın.']
                        ] }))),
            (0, react_1.createElement)("section", { className: "wrap section related" },
                (0, react_1.createElement)("div", { className: "section-head" },
                    (0, react_1.createElement)("div", null,
                        (0, react_1.createElement)(ui_1.Eyebrow, null, "B\u0130RL\u0130KTE D\u00DC\u015E\u00DCN\u00DCLEB\u0130L\u0130R"),
                        (0, react_1.createElement)("h2", null,
                            "Birbirine e\u015Flik",
                            (0, react_1.createElement)("br", null),
                            (0, react_1.createElement)("em", null, "eden par\u00E7alar."))),
                    (0, react_1.createElement)(ui_1.TextLink, { to: "/urunler", navigate: a.navigate }, "Koleksiyona d\u00F6n")),
                (0, react_1.createElement)("div", { className: "featured-products" }, data_1.products.filter(x => x.id !== p.id).map(x => (0, react_1.createElement)(ui_1.ProductCard, { key: x.id, product: x, actions: a })))),
            this.state.lightbox && (0, react_1.createElement)(ui_1.Dialog, { title: p.name + ' / Konsept görseli', onClose: () => this.setState({ lightbox: false }) },
                (0, react_1.createElement)("img", { className: "lightbox-image", src: (0, ui_1.image)(p.image), alt: p.name + ' tam konsept görseli' }),
                (0, react_1.createElement)("p", { className: "small muted" }, "Temsili tasar\u0131m. Ger\u00E7ek \u00FCr\u00FCn foto\u011Fraf\u0131 de\u011Fildir.")));
    }
}
exports.ProductPage = ProductPage;

},
"src/pages/Commerce":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contact = exports.Checkout = void 0;
exports.Cart = Cart;
exports.Saved = Saved;
const react_1 = require("react");
const data_1 = require("../lib/data");
const domain_1 = require("../lib/domain");
const ui_1 = require("../components/ui");
function Cart(a) { const total = a.cart.reduce((s, l) => s + (0, domain_1.lineTotal)(l.unitMinor, l.quantity), 0); return (0, react_1.createElement)(react_1.Fragment, null,
    (0, react_1.createElement)(ui_1.PageIntro, { kicker: "SEPET / YEREL \u00D6N\u0130ZLEME", title: (0, react_1.createElement)(react_1.Fragment, null,
            "Se\u00E7ti\u011Finiz",
            (0, react_1.createElement)("br", null),
            (0, react_1.createElement)("em", null, "par\u00E7alar.")), desc: "Bu sepet yaln\u0131z tasar\u0131m ak\u0131\u015F\u0131n\u0131 denemek i\u00E7indir. Fiyatlar \u00F6rnektir; canl\u0131 sipari\u015F ve \u00F6deme olu\u015Fturulmaz." }),
    (0, react_1.createElement)("section", { className: "wrap cart-layout" }, !a.cart.length ? (0, react_1.createElement)("div", { className: "empty-state" },
        (0, react_1.createElement)(ui_1.Icon, { name: "bag", size: 42 }),
        (0, react_1.createElement)("h2", null, "Bir par\u00E7a ile ba\u015Flayal\u0131m."),
        (0, react_1.createElement)("p", null, "\u00D6rnek sat\u0131n alma ak\u0131\u015F\u0131n\u0131 Vera veya Kavis \u00FCzerinden deneyebilirsiniz."),
        (0, react_1.createElement)(ui_1.ButtonLink, { to: "/urunler", navigate: a.navigate }, "Koleksiyonu ke\u015Ffet")) : (0, react_1.createElement)(react_1.Fragment, null,
        (0, react_1.createElement)("div", { className: "cart-lines" }, a.cart.map(l => { const p = data_1.products.find(x => x.id === l.id); return (0, react_1.createElement)("article", { className: "cart-line", key: l.key },
            (0, react_1.createElement)(ui_1.Link, { to: '/urun/' + p.id, navigate: a.navigate },
                (0, react_1.createElement)("img", { src: (0, ui_1.image)(p.image), alt: p.name + ' konsepti' })),
            (0, react_1.createElement)("div", null,
                (0, react_1.createElement)("span", { className: "label" }, p.categoryLabel),
                (0, react_1.createElement)("h2", null,
                    (0, react_1.createElement)(ui_1.Link, { to: '/urun/' + p.id, navigate: a.navigate }, p.name)),
                (0, react_1.createElement)("p", null,
                    l.material,
                    " \u00B7 ",
                    l.size),
                (0, react_1.createElement)("span", { className: "small" },
                    "\u00D6rnek birim fiyat: ",
                    (0, domain_1.money)(l.unitMinor)),
                (0, react_1.createElement)("div", { className: "quantity" },
                    (0, react_1.createElement)("button", { "aria-label": p.name + ' adedini azalt', disabled: l.quantity === 1, onClick: () => a.changeCart(l.key, l.quantity - 1) },
                        (0, react_1.createElement)(ui_1.Icon, { name: "minus", size: 15 })),
                    (0, react_1.createElement)("span", { "aria-label": "Adet" }, l.quantity),
                    (0, react_1.createElement)("button", { "aria-label": p.name + ' adedini artır', disabled: l.quantity === 100, onClick: () => a.changeCart(l.key, l.quantity + 1) },
                        (0, react_1.createElement)(ui_1.Icon, { name: "plus", size: 15 })))),
            (0, react_1.createElement)("div", { className: "line-price" },
                (0, react_1.createElement)("strong", null, (0, domain_1.money)((0, domain_1.lineTotal)(l.unitMinor, l.quantity))),
                (0, react_1.createElement)("button", { onClick: () => a.removeCart(l.key), "aria-label": p.name + ' ürününü sepetten çıkar' }, "Kald\u0131r"))); })),
        (0, react_1.createElement)("aside", { className: "order-summary" },
            (0, react_1.createElement)(ui_1.Eyebrow, null, "\u00D6RNEK S\u0130PAR\u0130\u015E \u00D6ZET\u0130"),
            (0, react_1.createElement)("h2", null,
                "G\u00FCzel bir",
                (0, react_1.createElement)("br", null),
                (0, react_1.createElement)("em", null, "ba\u015Flang\u0131\u00E7.")),
            (0, react_1.createElement)("dl", null,
                (0, react_1.createElement)("div", null,
                    (0, react_1.createElement)("dt", null, "\u00DCr\u00FCn tutar\u0131"),
                    (0, react_1.createElement)("dd", null, (0, domain_1.money)(total))),
                (0, react_1.createElement)("div", null,
                    (0, react_1.createElement)("dt", null, "Teslimat / kurulum"),
                    (0, react_1.createElement)("dd", null, "Hen\u00FCz belirlenmedi")),
                (0, react_1.createElement)("div", null,
                    (0, react_1.createElement)("dt", null, "Vergi g\u00F6r\u00FCn\u00FCm\u00FC"),
                    (0, react_1.createElement)("dd", null, "Canl\u0131 katalogda do\u011Frulanacak"))),
            (0, react_1.createElement)("div", { className: "order-total" },
                (0, react_1.createElement)("span", null, "\u00D6rnek \u00FCr\u00FCn toplam\u0131"),
                (0, react_1.createElement)("strong", null, (0, domain_1.money)(total))),
            (0, react_1.createElement)(ui_1.ButtonLink, { to: "/odeme", navigate: a.navigate }, "Sipari\u015F ak\u0131\u015F\u0131n\u0131 incele"),
            (0, react_1.createElement)("p", { className: "small" }, "Bu tutar sat\u0131\u015F teklifi de\u011Fildir. \u00D6deme al\u0131nmaz, stok ayr\u0131lmaz.")))),
    (0, react_1.createElement)("section", { className: "wrap note-box" },
        (0, react_1.createElement)(ui_1.Icon, { name: "info" }),
        (0, react_1.createElement)("p", null, "\u00D6zel \u00F6l\u00E7\u00FC gerektiren \u00FCr\u00FCnler sepete eklenmez. Denge ve Rota i\u00E7in \u00F6nce teklif st\u00FCdyosundan ihtiyac\u0131n\u0131z\u0131 payla\u015Fabilirsiniz."))); }
function Saved(a) { return (0, react_1.createElement)(react_1.Fragment, null,
    (0, react_1.createElement)(ui_1.PageIntro, { kicker: "\u00C7ALI\u015EMA DOSYANIZ / BU C\u0130HAZDA", title: (0, react_1.createElement)(react_1.Fragment, null,
            "Akl\u0131n\u0131zda kalan",
            (0, react_1.createElement)("br", null),
            (0, react_1.createElement)("em", null, "par\u00E7alar.")), desc: "Kaydettikleriniz yaln\u0131z bu taray\u0131c\u0131da tutulur. Bu alan bir m\u00FC\u015Fteri hesab\u0131 veya bulut yede\u011Fi de\u011Fildir." }),
    (0, react_1.createElement)("section", { className: "wrap section" },
        a.favorites.length ? (0, react_1.createElement)("div", { className: "catalog-grid" }, data_1.products.filter(p => a.favorites.includes(p.id)).map(p => (0, react_1.createElement)(ui_1.ProductCard, { key: p.id, product: p, actions: a }))) : (0, react_1.createElement)("div", { className: "empty-state" },
            (0, react_1.createElement)(ui_1.Icon, { name: "heart", size: 38 }),
            (0, react_1.createElement)("h2", null, "Hen\u00FCz bir par\u00E7a kaydetmediniz."),
            (0, react_1.createElement)("p", null, "Koleksiyondaki kalp simgesiyle sevdi\u011Finiz tasar\u0131mlar\u0131 burada bir araya getirebilirsiniz."),
            (0, react_1.createElement)(ui_1.ButtonLink, { to: "/urunler", navigate: a.navigate }, "Koleksiyona g\u00F6z at")),
        (0, react_1.createElement)("div", { className: "note-box" },
            (0, react_1.createElement)(ui_1.Icon, { name: "info" }),
            (0, react_1.createElement)("p", null, "Bu s\u00FCr\u00FCmde ger\u00E7ek \u00FCyelik, parola ve ki\u015Fisel sipari\u015F eri\u015Fimi yoktur. Kaydedilenler ve \u00F6rnek sepet en fazla 30 g\u00FCn bu cihazda tutulur."))),
    (0, react_1.createElement)(ui_1.Callout, { navigate: a.navigate })); }
class Checkout extends react_1.Component {
    constructor() {
        super(...arguments);
        this.state = { name: '', email: '', phone: '', delivery: 'Teslimatı birlikte planlayalım', errors: {}, done: false };
    }
    render() {
        const a = this.props, total = a.cart.reduce((s, l) => s + (0, domain_1.lineTotal)(l.unitMinor, l.quantity), 0);
        return (0, react_1.createElement)(react_1.Fragment, null,
            (0, react_1.createElement)(ui_1.PageIntro, { kicker: "S\u0130PAR\u0130\u015E / \u00D6DEME BA\u011ELANTISI KAPALI", title: (0, react_1.createElement)(react_1.Fragment, null,
                    "Sonraki ad\u0131m,",
                    (0, react_1.createElement)("br", null),
                    (0, react_1.createElement)("em", null, "birlikte netle\u015Fir.")), desc: "\u00D6deme kurulu\u015Fu ba\u011Fl\u0131 olmad\u0131\u011F\u0131 i\u00E7in kart bilgisi istemiyor ve tahsilat yapm\u0131yoruz." }),
            (0, react_1.createElement)("section", { className: "wrap checkout-layout" }, !a.cart.length ? (0, react_1.createElement)("div", { className: "empty-state" },
                (0, react_1.createElement)("h2", null, "\u00D6nce bir par\u00E7a se\u00E7in."),
                (0, react_1.createElement)(ui_1.ButtonLink, { to: "/urunler", navigate: a.navigate }, "Koleksiyona d\u00F6n")) : this.state.done ? (0, react_1.createElement)("div", { className: "empty-state" },
                (0, react_1.createElement)("span", { className: "success-mark" },
                    (0, react_1.createElement)(ui_1.Icon, { name: "check" })),
                (0, react_1.createElement)("h2", null, "\u00D6rnek dosyan\u0131z haz\u0131r."),
                (0, react_1.createElement)("p", null,
                    "Cihaz\u0131n\u0131za indirilmek \u00FCzere haz\u0131rland\u0131. ",
                    (0, react_1.createElement)("strong", null, "Sipari\u015F verilmedi, \u00F6deme al\u0131nmad\u0131.")),
                (0, react_1.createElement)(ui_1.ButtonLink, { to: "/sepet", navigate: a.navigate }, "Sepete d\u00F6n")) : (0, react_1.createElement)(react_1.Fragment, null,
                (0, react_1.createElement)("form", { className: "checkout-form", noValidate: true, onSubmit: e => {
                        e.preventDefault();
                        const errors = (0, domain_1.validateQuoteStep)(5, this.state);
                        if (Object.keys(errors).length) {
                            this.setState({ errors });
                            return;
                        }
                        const text = ['ELİF TASARIM — ÖRNEK SİPARİŞ DOSYASI', 'Canlı sipariş değildir. Ödeme alınmadı. Stok ayrılmadı.', '', ...a.cart.map(l => `${data_1.products.find(p => p.id === l.id).name} / ${l.material} / ${l.size} / ${l.quantity} adet / örnek tutar ${(0, domain_1.money)(l.unitMinor * l.quantity)}`), '', `Örnek ürün toplamı: ${(0, domain_1.money)(total)}`, `Örnek isim: ${this.state.name}`, `Örnek e-posta: ${this.state.email}`, `Teslim yaklaşımı: ${this.state.delivery}`].join('\n');
                        (0, domain_1.downloadText)('Elif_Ornek_Siparis.txt', text);
                        this.setState({ done: true });
                    } },
                    (0, react_1.createElement)(ui_1.Eyebrow, null, "01 / \u0130LET\u0130\u015E\u0130M B\u0130LG\u0130S\u0130"),
                    (0, react_1.createElement)("h2", null, "\u00D6rnek bilgilerinizi girin."),
                    (0, react_1.createElement)("p", { className: "small muted" }, "Bu alanlar\u0131 test verisiyle doldurun. Bilgiler sunucuya g\u00F6nderilmez."),
                    ['name', 'email'].map((k, i) => (0, react_1.createElement)("label", { key: k, className: "form-field" },
                        i ? 'E-posta' : 'Adınız',
                        (0, react_1.createElement)("input", { type: i ? 'email' : 'text', autoComplete: "off", value: this.state[k], maxLength: 160, onInput: e => this.setState({ ...this.state, [k]: e.currentTarget.value, errors: {} }) }),
                        this.state.errors[k] && (0, react_1.createElement)("small", { className: "field-error" }, this.state.errors[k]))),
                    (0, react_1.createElement)("label", { className: "form-field spaced" },
                        "Teslim tercihi",
                        (0, react_1.createElement)("select", { value: this.state.delivery, onChange: e => this.setState({ delivery: e.currentTarget.value }) },
                            (0, react_1.createElement)("option", { value: "Teslimat\u0131 birlikte planlayal\u0131m" }, "Teslimat\u0131 birlikte planlayal\u0131m"),
                            (0, react_1.createElement)("option", { value: "At\u00F6lyeden teslim alma" }, "At\u00F6lyeden teslim alma"),
                            (0, react_1.createElement)("option", { value: "Teslim ve kurulum g\u00F6r\u00FC\u015Fmesi" }, "Teslim ve kurulum g\u00F6r\u00FC\u015Fmesi"))),
                    (0, react_1.createElement)("div", { className: "payment-unavailable" },
                        (0, react_1.createElement)(ui_1.Icon, { name: "info", size: 26 }),
                        (0, react_1.createElement)("div", null,
                            (0, react_1.createElement)("h3", null, "Canl\u0131 \u00F6deme bu s\u00FCr\u00FCmde kapal\u0131."),
                            (0, react_1.createElement)("p", null, "iyzico / PayTR hesab\u0131, ger\u00E7ek fiyatlar, sat\u0131c\u0131 bilgileri ve sunucu entegrasyonu do\u011Frulanmadan tahsilat a\u00E7\u0131lmaz."))),
                    (0, react_1.createElement)("button", { className: "button", type: "submit" },
                        "\u00D6rnek sipari\u015F dosyas\u0131n\u0131 haz\u0131rla ",
                        (0, react_1.createElement)(ui_1.Icon, { name: "download" }))),
                (0, react_1.createElement)("aside", { className: "order-summary" },
                    (0, react_1.createElement)(ui_1.Eyebrow, null, "\u00D6RNEK SE\u00C7\u0130M\u0130N\u0130Z"),
                    a.cart.map(l => (0, react_1.createElement)("div", { className: "summary-product", key: l.key },
                        (0, react_1.createElement)("img", { src: (0, ui_1.image)(data_1.products.find(p => p.id === l.id).image), alt: "" }),
                        (0, react_1.createElement)("span", null,
                            (0, react_1.createElement)("strong", null, data_1.products.find(p => p.id === l.id).name),
                            (0, react_1.createElement)("small", null,
                                l.quantity,
                                " adet \u00B7 ",
                                l.material)),
                        (0, react_1.createElement)("b", null, (0, domain_1.money)(l.unitMinor * l.quantity)))),
                    (0, react_1.createElement)("div", { className: "order-total" },
                        (0, react_1.createElement)("span", null, "\u00D6rnek \u00FCr\u00FCn toplam\u0131"),
                        (0, react_1.createElement)("strong", null, (0, domain_1.money)(total))),
                    (0, react_1.createElement)("p", { className: "small" }, "Teslimat ve ger\u00E7ek sat\u0131\u015F ko\u015Fullar\u0131 belirlenmedi. Bu bir \u00F6deme ekran\u0131 sim\u00FClasyonu de\u011Fil; g\u00FCvenli bir sipari\u015F haz\u0131rl\u0131k \u00F6rne\u011Fidir.")))));
    }
}
exports.Checkout = Checkout;
class Contact extends react_1.Component {
    constructor() {
        super(...arguments);
        this.state = { name: '', email: '', note: '', error: '' };
    }
    render() {
        const a = this.props;
        return (0, react_1.createElement)(react_1.Fragment, null,
            (0, react_1.createElement)(ui_1.PageIntro, { kicker: "\u0130LET\u0130\u015E\u0130M / DO\u011ERUDAN AT\u00D6LYEYE", title: (0, react_1.createElement)(react_1.Fragment, null,
                    "Bir fikir.",
                    (0, react_1.createElement)("br", null),
                    (0, react_1.createElement)("em", null, "Bir konu\u015Fma.")), desc: "Ne d\u00FC\u015F\u00FCnd\u00FC\u011F\u00FCn\u00FCz\u00FC duymak isteriz. Haz\u0131r bir \u00E7iziminiz olmasa da ba\u015Flayabiliriz." }),
            (0, react_1.createElement)("section", { className: "wrap contact-layout" },
                (0, react_1.createElement)("div", null,
                    (0, react_1.createElement)(ui_1.Eyebrow, null, "EL\u0130F TASARIM"),
                    (0, react_1.createElement)("h2", null,
                        "\u0130stanbul\u2019daki",
                        (0, react_1.createElement)("br", null),
                        (0, react_1.createElement)("em", null, "at\u00F6lyemizden.")),
                    (0, react_1.createElement)("p", null, "El yap\u0131m\u0131 mobilya ve \u00F6zel \u00FCretim \u00FCzerine bir aile at\u00F6lyesi."),
                    (0, react_1.createElement)("dl", { className: "contact-details" },
                        (0, react_1.createElement)("div", null,
                            (0, react_1.createElement)("dt", null, "Konum"),
                            (0, react_1.createElement)("dd", null, "\u0130stanbul, T\u00FCrkiye")),
                        (0, react_1.createElement)("div", null,
                            (0, react_1.createElement)("dt", null, "Telefon ve a\u00E7\u0131k adres"),
                            (0, react_1.createElement)("dd", null, "\u0130\u015Fletme taraf\u0131ndan do\u011Fruland\u0131\u011F\u0131nda eklenecek.")),
                        (0, react_1.createElement)("div", null,
                            (0, react_1.createElement)("dt", null, "G\u00F6r\u00FC\u015Fme ve teslimat"),
                            (0, react_1.createElement)("dd", null, "\u0130\u015Fin kapsam\u0131na g\u00F6re birlikte planlan\u0131r."))),
                    (0, react_1.createElement)("div", { className: "contact-studio" },
                        (0, react_1.createElement)(ui_1.Icon, { name: "ruler", size: 30 }),
                        (0, react_1.createElement)("h3", null, "\u00D6l\u00E7\u00FCl\u00FC bir ba\u015Flang\u0131\u00E7 i\u00E7in"),
                        (0, react_1.createElement)("p", null, "\u0130htiya\u00E7, malzeme ve g\u00F6rselleri bir araya getiren \u00F6zel st\u00FCdyomuzu kullanabilirsiniz."),
                        (0, react_1.createElement)(ui_1.ButtonLink, { to: "/teklif-al", navigate: a.navigate }, "\u00D6zel \u00F6l\u00E7\u00FC st\u00FCdyosu"))),
                (0, react_1.createElement)("form", { className: "contact-form", noValidate: true, onSubmit: e => {
                        e.preventDefault();
                        if (this.state.name.trim().length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.state.email) || this.state.note.trim().length < 5) {
                            this.setState({ error: 'Adınızı, geçerli bir e-postayı ve en az 5 karakterlik notunuzu yazın.' });
                            return;
                        }
                        (0, domain_1.downloadText)('Elif_Iletisim_Notu.txt', `ELİF TASARIM — İLETİŞİM NOTU\nBu not gönderilmedi.\n\nİsim: ${this.state.name}\nE-posta: ${this.state.email}\n\n${this.state.note}`);
                        a.notify('İletişim notu indirmeniz için hazırlandı. Atölyeye gönderilmedi.');
                    } },
                    (0, react_1.createElement)(ui_1.Eyebrow, null, "\u0130LET\u0130\u015E\u0130M NOTU / \u00D6N\u0130ZLEME"),
                    (0, react_1.createElement)("h2", null, "Ne d\u00FC\u015F\u00FCn\u00FCyorsunuz?"),
                    (0, react_1.createElement)("p", { className: "small muted" }, "Canl\u0131 ileti\u015Fim kanal\u0131 ba\u011Fl\u0131 de\u011Fil. Notunuzu bir metin dosyas\u0131 olarak haz\u0131rlayabilirsiniz."),
                    (0, react_1.createElement)("label", { className: "form-field" },
                        "Ad\u0131n\u0131z",
                        (0, react_1.createElement)("input", { maxLength: 100, value: this.state.name, onInput: e => this.setState({ name: e.currentTarget.value }) })),
                    (0, react_1.createElement)("label", { className: "form-field" },
                        "E-posta",
                        (0, react_1.createElement)("input", { type: "email", maxLength: 160, value: this.state.email, onInput: e => this.setState({ email: e.currentTarget.value }) })),
                    (0, react_1.createElement)("label", { className: "form-field" },
                        "Notunuz",
                        (0, react_1.createElement)("textarea", { rows: 5, maxLength: 2000, value: this.state.note, onInput: e => this.setState({ note: e.currentTarget.value }) })),
                    this.state.error && (0, react_1.createElement)("p", { className: "field-error", role: "alert" }, this.state.error),
                    (0, react_1.createElement)("button", { className: "button", type: "submit" },
                        "\u0130leti\u015Fim notunu indir ",
                        (0, react_1.createElement)(ui_1.Icon, { name: "download" })))));
    }
}
exports.Contact = Contact;

},
"src/pages/Editorial":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Atelier = Atelier;
exports.Bespoke = Bespoke;
exports.Materials = Materials;
exports.Ideas = Ideas;
exports.Journal = Journal;
exports.FAQ = FAQ;
exports.Privacy = Privacy;
const react_1 = require("react");
const data_1 = require("../lib/data");
const ui_1 = require("../components/ui");
function Atelier(a) { return (0, react_1.createElement)(react_1.Fragment, null,
    (0, react_1.createElement)(ui_1.PageIntro, { kicker: "AT\u00D6LYEM\u0130Z / EL\u0130F TASARIM", title: (0, react_1.createElement)(react_1.Fragment, null,
            "Elden ele ge\u00E7en",
            (0, react_1.createElement)("br", null),
            (0, react_1.createElement)("em", null, "bir yapma h\u00E2li.")), desc: "Aileden gelen marangozluk bilgisi. Bug\u00FCn\u00FCn ya\u015Fam\u0131na g\u00F6re \u015Fekillenen mobilyalar." }),
    (0, react_1.createElement)("section", { className: "wrap editorial-feature" },
        (0, react_1.createElement)(ui_1.Photo, { name: "craft.webp", alt: "Ah\u015Fap \u00FCzerinde \u00E7al\u0131\u015Fmay\u0131 anlatan temsili i\u015F\u00E7ilik g\u00F6rseli", ratio: "16/8", eager: true }),
        (0, react_1.createElement)("div", { className: "editorial-two" },
            (0, react_1.createElement)(ui_1.Eyebrow, null,
                "\u0130\u015E\u0130N BA\u015EINDA B\u0130R USTA,",
                (0, react_1.createElement)("br", null),
                "ARKASINDA B\u0130R A\u0130LE."),
            (0, react_1.createElement)("div", null,
                (0, react_1.createElement)("h2", null,
                    "Haz\u0131r olan\u0131 de\u011Fil,",
                    (0, react_1.createElement)("br", null),
                    (0, react_1.createElement)("em", null, "size uyan\u0131.")),
                (0, react_1.createElement)("p", { className: "lead" }, "Elif Tasar\u0131m, \u00FCr\u00FCnlerini kendi at\u00F6lyesinde \u00FCreten bir aile i\u015Fletmesi. Mesle\u011Fin bilgisi babadan \u00F6\u011Frenildi; yeni ku\u015Fa\u011F\u0131n yakla\u015F\u0131m\u0131yla bug\u00FCn de geli\u015Fmeye devam ediyor."),
                (0, react_1.createElement)("p", null, "\u0130\u015Fimiz yaln\u0131z mobilya g\u00F6stermek de\u011Fil. Nas\u0131l kulland\u0131\u011F\u0131n\u0131z\u0131, neye ihtiya\u00E7 duydu\u011Funuzu ve elinizdeki alan\u0131 anlamak. Tasar\u0131m\u0131, malzemeyi ve \u00F6l\u00E7\u00FCy\u00FC ayn\u0131 konu\u015Fman\u0131n i\u00E7inde ele almak."),
                (0, react_1.createElement)("p", null, "Bu hik\u00E2yenin sonraki sayfas\u0131, ger\u00E7ek at\u00F6lye foto\u011Fraflar\u0131 ve ustalar\u0131n kendi s\u00F6zleriyle tamamlanacak. Buradaki \u00FCretim g\u00F6rselleri temsili; kurulu\u015F y\u0131l\u0131, usta ismi veya referans uydurulmad\u0131.")))),
    (0, react_1.createElement)("section", { className: "values-section wrap" },
        (0, react_1.createElement)("div", null,
            (0, react_1.createElement)(ui_1.Icon, { name: "hand", size: 32 }),
            (0, react_1.createElement)("h3", null, "Kendi at\u00F6lyemizde"),
            (0, react_1.createElement)("p", null, "Haz\u0131r mobilya al\u0131p satmak yerine, \u00FCretimin arkas\u0131nda durdu\u011Fumuz bir \u00E7al\u0131\u015Fma bi\u00E7imi.")),
        (0, react_1.createElement)("div", null,
            (0, react_1.createElement)(ui_1.Icon, { name: "ruler", size: 32 }),
            (0, react_1.createElement)("h3", null, "\u00D6nce dinleyerek"),
            (0, react_1.createElement)("p", null, "Bir \u00F6l\u00E7\u00FCy\u00FC de\u011Fil, o \u00F6l\u00E7\u00FCn\u00FCn i\u00E7inde nas\u0131l ya\u015Fayaca\u011F\u0131n\u0131z\u0131 anlamaya \u00E7al\u0131\u015Farak.")),
        (0, react_1.createElement)("div", null,
            (0, react_1.createElement)(ui_1.Icon, { name: "leaf", size: 32 }),
            (0, react_1.createElement)("h3", null, "Ayr\u0131nt\u0131y\u0131 \u00F6nemseyerek"),
            (0, react_1.createElement)("p", null, "Yaln\u0131z ilk bak\u0131\u015Fta de\u011Fil, her g\u00FCn kullan\u0131rken de anlam ta\u015F\u0131yan kararlar alarak."))),
    (0, react_1.createElement)("div", { className: "quote-statement wrap" },
        (0, react_1.createElement)("img", { src: (0, ui_1.image)('elif-amblem.png'), alt: "Elif Tasar\u0131m se\u00E7ilmi\u015F amblemi" }),
        (0, react_1.createElement)("p", null,
            "\u201CBir par\u00E7an\u0131n \u00F6l\u00E7\u00FCs\u00FC al\u0131n\u0131r.",
            (0, react_1.createElement)("br", null),
            (0, react_1.createElement)("em", null, "Bir ihtiyac\u0131nsa \u00F6nce hik\u00E2yesi dinlenir.\u201D")),
        (0, react_1.createElement)("span", { className: "label" }, "MARKA \u0130FADES\u0130 / EL\u0130F TASARIM")),
    (0, react_1.createElement)(ui_1.Callout, { navigate: a.navigate })); }
function Bespoke(a) { return (0, react_1.createElement)(react_1.Fragment, null,
    (0, react_1.createElement)(ui_1.PageIntro, { kicker: "\u00D6ZEL \u00DCRET\u0130M / S\u0130Z\u0130N \u0130\u00C7\u0130N", title: (0, react_1.createElement)(react_1.Fragment, null,
            "\u00D6l\u00E7\u00FCden \u00F6nce,",
            (0, react_1.createElement)("br", null),
            (0, react_1.createElement)("em", null, "sizi anlayal\u0131m.")), desc: "Bazen ihtiyac\u0131n\u0131z olan bir masa, bazen bir k\u00F6\u015Fenin \u00E7\u00F6z\u00FCm\u00FC. Bir \u00E7izimle gelmeniz gerekmiyor." }),
    (0, react_1.createElement)("section", { className: "wrap bespoke-hero" },
        (0, react_1.createElement)(ui_1.Photo, { name: "office.webp", alt: "\u00D6l\u00E7\u00FCye \u00F6zel \u00E7al\u0131\u015Fma alan\u0131n\u0131 anlatan temsili konsept", ratio: "3/2" }),
        (0, react_1.createElement)("div", null,
            (0, react_1.createElement)(ui_1.Eyebrow, null, "B\u0130R F\u0130K\u0130R YETER"),
            (0, react_1.createElement)("h2", null,
                "Hayalinizin",
                (0, react_1.createElement)("br", null),
                (0, react_1.createElement)("em", null, "haz\u0131r \u00F6l\u00E7\u00FCs\u00FC yok.")),
            (0, react_1.createElement)("p", null, "\u00DCr\u00FCn t\u00FCr\u00FC, \u00F6l\u00E7\u00FCler, malzeme, mek\u00E2n ve kullan\u0131m. Her birini birlikte netle\u015Ftirmek \u00FCzere bir araya getiriyoruz."),
            (0, react_1.createElement)(ui_1.ButtonLink, { to: "/teklif-al", navigate: a.navigate }, "\u00D6zel \u00F6l\u00E7\u00FC st\u00FCdyosuna gir"),
            (0, react_1.createElement)("p", { className: "small muted" }, "\u00D6l\u00E7\u00FCleriniz veya malzeme tercihiniz hen\u00FCz belli olmayabilir."))),
    (0, react_1.createElement)("section", { className: "wrap section" },
        (0, react_1.createElement)(ui_1.SectionHead, { number: "S\u00DCRE\u00C7", title: (0, react_1.createElement)(react_1.Fragment, null,
                "Birlikte d\u00FC\u015F\u00FCn\u00FCr\u00FCz.",
                (0, react_1.createElement)("br", null),
                (0, react_1.createElement)("em", null, "At\u00F6lyede \u015Fekillenir.")), navigate: a.navigate }),
        (0, react_1.createElement)("div", { className: "process-grid" }, [['İhtiyacı konuşuruz', 'Nerede kullanılacak? Size ne sağlamalı? Fotoğraf, eskiz veya yalnız birkaç cümleyle başlayabiliriz.'], ['Ölçüyü netleştiririz', 'İlk ölçüler, kullanım payları ve teknik uygunluk birlikte değerlendirilir. Üretim ölçüsü ayrıca onaylanır.'], ['Tasarımı ve teklifi onaylarız', 'Malzeme, yüzey, iş kapsamı, fiyat ve teslim yaklaşımı aynı teklif içinde açıkça yer alır.'], ['Atölyede üretiriz', 'Onaylanan detaylarla üretim planlanır. Gerekli değişiklikler eski çizimin üstüne sessizce yazılmaz.'], ['Teslimi birlikte planlarız', 'Taşıma, kurulum ve mekâna erişim koşulları önceden konuşulur. Bakım bilgileri ürünle birlikte ele alınır.']].map(([title, desc], i) => (0, react_1.createElement)("article", { key: title },
            (0, react_1.createElement)("span", null,
                "0",
                i + 1),
            (0, react_1.createElement)("h3", null, title),
            (0, react_1.createElement)("p", null, desc))))),
    (0, react_1.createElement)(ui_1.Callout, { navigate: a.navigate })); }
function Materials(a) { return (0, react_1.createElement)(react_1.Fragment, null,
    (0, react_1.createElement)(ui_1.PageIntro, { kicker: "MALZEME K\u00DCT\u00DCPHANES\u0130", title: (0, react_1.createElement)(react_1.Fragment, null,
            "Dokusu do\u011Fadan.",
            (0, react_1.createElement)("br", null),
            (0, react_1.createElement)("em", null, "Karar\u0131 birlikte.")), desc: "T\u00FCr, yap\u0131, y\u00FCzey ve renk. Do\u011Fru malzeme konu\u015Fmas\u0131nda her biri ayr\u0131 bir sorudur." }),
    (0, react_1.createElement)("div", { className: "wrap material-list" }, data_1.materials.map((m, i) => (0, react_1.createElement)("section", { className: 'material-detail ' + (i % 2 ? 'reverse' : ''), key: m.id },
        (0, react_1.createElement)(ui_1.Photo, { name: m.image, alt: m.name + ' için temsili doku örneği', ratio: "1" }),
        (0, react_1.createElement)("div", null,
            (0, react_1.createElement)(ui_1.Eyebrow, null,
                "0",
                i + 1,
                " / MALZEME F\u0130KR\u0130"),
            (0, react_1.createElement)("h2", null, m.name),
            (0, react_1.createElement)("h3", null, m.latin),
            (0, react_1.createElement)("p", null, m.desc),
            (0, react_1.createElement)("dl", null,
                (0, react_1.createElement)("div", null,
                    (0, react_1.createElement)("dt", null, "A\u011Fa\u00E7 / yap\u0131"),
                    (0, react_1.createElement)("dd", null, "Ger\u00E7ek \u00FCr\u00FCn kayd\u0131yla do\u011Frulan\u0131r.")),
                (0, react_1.createElement)("div", null,
                    (0, react_1.createElement)("dt", null, "Y\u00FCzey i\u015Flemi"),
                    (0, react_1.createElement)("dd", null, "Ya\u011F, vernik veya di\u011Fer biti\u015F ayr\u0131ca se\u00E7ilir.")),
                (0, react_1.createElement)("div", null,
                    (0, react_1.createElement)("dt", null, "Renk karar\u0131"),
                    (0, react_1.createElement)("dd", null, "Ekran yerine fiziksel numuneyle kesinle\u015Ftirilir."))),
            (0, react_1.createElement)(ui_1.TextLink, { to: "/teklif-al", navigate: a.navigate }, "Malzemeyi birlikte se\u00E7elim"))))),
    (0, react_1.createElement)("section", { className: "wrap note-box" },
        (0, react_1.createElement)(ui_1.Icon, { name: "info" }),
        (0, react_1.createElement)("p", null, "Bu k\u00FCt\u00FCphane temsili malzeme \u00E7al\u0131\u015Fmas\u0131d\u0131r. At\u00F6lyenin malzeme envanteri, teknik belgeleri ve ger\u00E7ek numuneleriyle onaylanmadan bir \u00FCr\u00FCn vaadi olu\u015Fturmaz.")),
    (0, react_1.createElement)(ui_1.Callout, { navigate: a.navigate })); }
function Ideas(a) {
    const item = data_1.ideas.find(p => p.id === a.slug);
    if (item)
        return (0, react_1.createElement)(react_1.Fragment, null,
            (0, react_1.createElement)(ui_1.PageIntro, { kicker: 'MEKÂN FİKRİ / ' + item.type, title: item.name, desc: item.text }),
            (0, react_1.createElement)("section", { className: "wrap" },
                (0, react_1.createElement)(ui_1.Photo, { name: item.image, alt: item.name + ' temsili mekân görselleştirmesi', ratio: "16/10", eager: true }),
                (0, react_1.createElement)("div", { className: "editorial-two" },
                    (0, react_1.createElement)(ui_1.Eyebrow, null,
                        "KONSEPT \u00C7ALI\u015EMASI",
                        (0, react_1.createElement)("br", null),
                        "TAMAMLANMI\u015E PROJE DE\u011E\u0130LD\u0130R"),
                    (0, react_1.createElement)("div", null,
                        (0, react_1.createElement)("h2", null,
                            "Bir g\u00F6rselden,",
                            (0, react_1.createElement)("br", null),
                            (0, react_1.createElement)("em", null, "kendi alan\u0131n\u0131za.")),
                        (0, react_1.createElement)("p", null, "Bu mek\u00E2n bir ilham \u00E7al\u0131\u015Fmas\u0131d\u0131r; tamamlanm\u0131\u015F bir m\u00FC\u015Fteri projesi de\u011Fildir. Benzer bir fikir \u00FCzerinde konu\u015Furken sizin \u00F6l\u00E7\u00FCleriniz, al\u0131\u015Fkanl\u0131klar\u0131n\u0131z ve ger\u00E7ek \u00FCretim imk\u00E2nlar\u0131 esas al\u0131n\u0131r."),
                        (0, react_1.createElement)(ui_1.TextLink, { to: "/teklif-al", navigate: a.navigate }, "Bu fikirden ba\u015Flayal\u0131m"))),
                (0, react_1.createElement)("div", { className: "catalog-grid" }, data_1.products.filter(p => item.products.includes(p.id)).map(p => (0, react_1.createElement)(ui_1.ProductCard, { key: p.id, product: p, actions: a })))),
            (0, react_1.createElement)(ui_1.Callout, { navigate: a.navigate }));
    return (0, react_1.createElement)(react_1.Fragment, null,
        (0, react_1.createElement)(ui_1.PageIntro, { kicker: "MEK\u00C2N F\u0130K\u0130RLER\u0130 / KONSEPT \u00C7ALI\u015EMALARI", title: (0, react_1.createElement)(react_1.Fragment, null,
                "Bir par\u00E7a de\u011Fi\u015Fir.",
                (0, react_1.createElement)("br", null),
                (0, react_1.createElement)("em", null, "Bir mek\u00E2n de\u011Fi\u015Fir.")), desc: "Ger\u00E7ek proje referans\u0131 de\u011Fil; evinize ve \u00E7al\u0131\u015Fma alan\u0131n\u0131za ba\u015Fka bir g\u00F6zle bakmak i\u00E7in haz\u0131rlanan g\u00F6rsel fikirler." }),
        (0, react_1.createElement)("section", { className: "wrap idea-list" }, data_1.ideas.map((i, index) => (0, react_1.createElement)(ui_1.Link, { to: '/mekan-fikirleri/' + i.id, navigate: a.navigate, className: "idea-list-item", key: i.id },
            (0, react_1.createElement)(ui_1.Photo, { name: i.image, alt: i.name + ' temsili konsepti', ratio: "16/10" }),
            (0, react_1.createElement)("div", null,
                (0, react_1.createElement)(ui_1.Eyebrow, null,
                    "0",
                    index + 1,
                    " / ",
                    i.type),
                (0, react_1.createElement)("h2", null, i.name),
                (0, react_1.createElement)("p", null, i.text),
                (0, react_1.createElement)("span", { className: "text-link" },
                    "Fikri ke\u015Ffet ",
                    (0, react_1.createElement)(ui_1.Icon, null)))))),
        (0, react_1.createElement)(ui_1.Callout, { navigate: a.navigate }));
}
function Journal(a) {
    const entry = data_1.journal.find(j => j.id === a.slug);
    if (entry)
        return (0, react_1.createElement)(react_1.Fragment, null,
            (0, react_1.createElement)(ui_1.PageIntro, { kicker: entry.subtitle, title: entry.title, desc: entry.intro }),
            (0, react_1.createElement)("article", { className: "wrap article" },
                (0, react_1.createElement)(ui_1.Photo, { name: entry.image, alt: entry.title + ' için temsili görsel', ratio: "16/7", eager: true }),
                (0, react_1.createElement)("div", { className: "article-body" },
                    entry.sections.map(([title, body], i) => (0, react_1.createElement)("section", { key: title },
                        (0, react_1.createElement)(ui_1.Eyebrow, null,
                            "0",
                            i + 1),
                        (0, react_1.createElement)("h2", null, title),
                        (0, react_1.createElement)("p", null, body))),
                    (0, react_1.createElement)("div", { className: "note-box" },
                        (0, react_1.createElement)(ui_1.Icon, { name: "info" }),
                        (0, react_1.createElement)("p", null, "Genel haz\u0131rl\u0131k notlar\u0131d\u0131r. \u00DCr\u00FCn\u00FCn\u00FCz\u00FCn ger\u00E7ek malzeme, kullan\u0131m ve \u00FCretim talimat\u0131 i\u00E7in at\u00F6lye teyidi gereklidir.")),
                    (0, react_1.createElement)(ui_1.TextLink, { to: "/rehber", navigate: a.navigate }, "B\u00FCt\u00FCn at\u00F6lye notlar\u0131"))),
            (0, react_1.createElement)(ui_1.Callout, { navigate: a.navigate }));
    return (0, react_1.createElement)(react_1.Fragment, null,
        (0, react_1.createElement)(ui_1.PageIntro, { kicker: "REHBER / AT\u00D6LYE NOTLARI", title: (0, react_1.createElement)(react_1.Fragment, null,
                "Biraz bilgi.",
                (0, react_1.createElement)("br", null),
                (0, react_1.createElement)("em", null, "Daha iyi kararlar.")), desc: "\u00D6l\u00E7\u00FC almaktan malzeme se\u00E7imine, ilk konu\u015Fmay\u0131 kolayla\u015Ft\u0131racak notlar." }),
        (0, react_1.createElement)("section", { className: "wrap journal-grid section" }, data_1.journal.map(j => (0, react_1.createElement)(ui_1.Link, { key: j.id, to: '/rehber/' + j.id, navigate: a.navigate, className: "journal-card" },
            (0, react_1.createElement)(ui_1.Photo, { name: j.image, alt: j.title + ' temsili görseli', ratio: "4/3" }),
            (0, react_1.createElement)("span", { className: "label" }, j.subtitle),
            (0, react_1.createElement)("h2", null, j.title),
            (0, react_1.createElement)("p", null, j.intro),
            (0, react_1.createElement)("span", { className: "text-link" },
                "Notu oku ",
                (0, react_1.createElement)(ui_1.Icon, null))))),
        (0, react_1.createElement)(ui_1.Callout, { navigate: a.navigate }));
}
function FAQ(a) {
    return (0, react_1.createElement)(react_1.Fragment, null,
        (0, react_1.createElement)(ui_1.PageIntro, { kicker: "SIK\u00C7A SORULAN SORULAR", title: (0, react_1.createElement)(react_1.Fragment, null,
                "Akl\u0131n\u0131zda",
                (0, react_1.createElement)("br", null),
                (0, react_1.createElement)("em", null, "kalmas\u0131n.")), desc: "\u00D6zel \u00FCretim ve bu \u00F6nizlemenin \u00E7al\u0131\u015Fma bi\u00E7imi hakk\u0131nda merak edilenler." }),
        (0, react_1.createElement)("section", { className: "wrap narrow" },
            (0, react_1.createElement)(ui_1.Accordion, { items: data_1.faqs })),
        (0, react_1.createElement)(ui_1.Callout, { navigate: a.navigate }));
}
function Privacy(a) { return (0, react_1.createElement)(react_1.Fragment, null,
    (0, react_1.createElement)(ui_1.PageIntro, { kicker: "G\u0130ZL\u0130L\u0130K / BU \u00D6N\u0130ZLEME", title: (0, react_1.createElement)(react_1.Fragment, null,
            "Veriniz \u00FCzerinde",
            (0, react_1.createElement)("br", null),
            (0, react_1.createElement)("em", null, "s\u00F6z sizde.")), desc: "Bu a\u00E7\u0131klama yaln\u0131z size teslim edilen yerel \u00F6nizlemenin davran\u0131\u015F\u0131n\u0131 anlat\u0131r; canl\u0131 i\u015Fletmenin hukuki metni yerine ge\u00E7mez." }),
    (0, react_1.createElement)("article", { className: "wrap article-body" },
        (0, react_1.createElement)("h2", null, "Veriler nereye gider?"),
        (0, react_1.createElement)("p", null, "Bu s\u00FCr\u00FCm analitik, reklam, g\u00F6m\u00FCl\u00FC harita veya \u00F6deme servisine ba\u011Flanmaz. Teklif formundaki ileti\u015Fim bilgileri ve foto\u011Fraflar yaln\u0131z a\u00E7\u0131k sayfada tutulur, bir sunucuya g\u00F6nderilmez. Sayfa yenilenince veya ba\u015Fka sayfaya ge\u00E7ince bu alanlar silinir."),
        (0, react_1.createElement)("h2", null, "Bu cihazda ne saklan\u0131r?"),
        (0, react_1.createElement)("p", null, "Taray\u0131c\u0131n\u0131n depolamaya izin verdi\u011Fi durumlarda \u00F6rnek sepet ve kaydedilen \u00FCr\u00FCnler en fazla 30 g\u00FCn tutulur. Depolama kapal\u0131ysa bunlar yaln\u0131z a\u00E7\u0131k sayfada kal\u0131r. \u00D6l\u00E7\u00FC tasla\u011F\u0131 yaln\u0131z siz \u201C\u00D6l\u00E7\u00FC tercihlerini sakla\u201D dedi\u011Finizde, 7 g\u00FCn s\u00FCreyle kaydedilir. Bu taslak ad, telefon, e-posta, adres, not veya foto\u011Fraf i\u00E7ermez."),
        (0, react_1.createElement)("h2", null, "D\u0131\u015Fa aktar\u0131lan dosyalar"),
        (0, react_1.createElement)("p", null, "Talep \u00F6zetini indirdi\u011Finizde olu\u015Fturulan dosya cihaz\u0131n\u0131za kaydedilir. \u0130\u00E7indeki bilgileri kiminle payla\u015Faca\u011F\u0131n\u0131z sizin kontrol\u00FCn\u00FCzdedir. Formda ger\u00E7ek ki\u015Fisel veri yerine \u00F6rnek bilgi kullanman\u0131z\u0131 \u00F6neriyoruz."),
        (0, react_1.createElement)("h2", null, "Verileri silme"),
        (0, react_1.createElement)("p", null, "Yaln\u0131z bu uygulaman\u0131n \u201Celif-v2:\u201D \u00F6nekiyle olu\u015Fturdu\u011Fu taray\u0131c\u0131 kay\u0131tlar\u0131 temizlenir; di\u011Fer sitelerin kay\u0131tlar\u0131na dokunulmaz."),
        (0, react_1.createElement)("button", { className: "button button-outline", onClick: a.openInfo },
            "Depolama tercihlerini a\u00E7 ",
            (0, react_1.createElement)(ui_1.Icon, null)),
        (0, react_1.createElement)("h2", null, "Canl\u0131 yay\u0131n ko\u015Fulu"),
        (0, react_1.createElement)("p", null, "Ger\u00E7ek bir sunucu, \u00F6deme veya analitik eklendi\u011Finde veri ak\u0131\u015F\u0131, saklama s\u00FCreleri, sat\u0131c\u0131 bilgileri ve hukuki metinler yeniden de\u011Ferlendirilmelidir. Bu \u00F6nizleme hukuki uyum belgesi de\u011Fildir."))); }

},
"src/pages/Home":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialPreview = void 0;
exports.Home = Home;
const react_1 = require("react");
const data_1 = require("../lib/data");
const ui_1 = require("../components/ui");
class MaterialPreview extends react_1.Component {
    constructor() {
        super(...arguments);
        this.state = { selected: 0 };
    }
    render() {
        const m = data_1.materials[this.state.selected];
        return (0, react_1.createElement)("section", { className: "material-section" },
            (0, react_1.createElement)("div", { className: "wrap material-grid" },
                (0, react_1.createElement)("div", null,
                    (0, react_1.createElement)(ui_1.Eyebrow, null, "04 / MALZEMEN\u0130N D\u0130L\u0130"),
                    (0, react_1.createElement)("h2", null,
                        "Her damar,",
                        (0, react_1.createElement)("br", null),
                        (0, react_1.createElement)("em", null, "ba\u015Fka bir hik\u00E2ye.")),
                    (0, react_1.createElement)("p", null, "Bir y\u00FCzeyin rengi kadar dokusu, bir par\u00E7an\u0131n g\u00F6r\u00FCn\u00FC\u015F\u00FC kadar kullan\u0131m\u0131. Do\u011Fru malzemeyi birlikte d\u00FC\u015F\u00FCnelim."),
                    (0, react_1.createElement)("div", { className: "material-tabs", role: "tablist", "aria-label": "Malzeme fikirleri" }, data_1.materials.map((mat, i) => (0, react_1.createElement)("button", { key: mat.id, id: 'material-tab-' + mat.id, role: "tab", "aria-selected": i === this.state.selected, "aria-controls": "material-content", tabIndex: i === this.state.selected ? 0 : -1, onKeyDown: e => {
                            if (['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(e.key)) {
                                e.preventDefault();
                                const next = e.key === 'Home' ? 0 : e.key === 'End' ? data_1.materials.length - 1 : (i + (e.key === 'ArrowRight' ? 1 : data_1.materials.length - 1)) % data_1.materials.length;
                                this.setState({ selected: next }, () => document.getElementById('material-tab-' + data_1.materials[next].id)?.focus());
                            }
                        }, onClick: () => this.setState({ selected: i }), className: i === this.state.selected ? 'active' : '' },
                        (0, react_1.createElement)("span", { style: { background: mat.color } }),
                        mat.name))),
                    (0, react_1.createElement)("div", { id: "material-content", role: "tabpanel", "aria-labelledby": 'material-tab-' + m.id },
                        (0, react_1.createElement)("h3", null, m.latin),
                        (0, react_1.createElement)("p", { className: "small" }, m.desc)),
                    (0, react_1.createElement)(ui_1.TextLink, { to: "/malzemeler", navigate: this.props.actions.navigate }, "Malzeme k\u00FCt\u00FCphanesi")),
                (0, react_1.createElement)("figure", { className: "material-study" },
                    (0, react_1.createElement)("img", { src: (0, ui_1.image)(m.image), alt: m.name + ' dokusu, temsili numune', loading: "lazy" }),
                    (0, react_1.createElement)("div", { className: "material-label" },
                        (0, react_1.createElement)("span", null,
                            "NUMUNE \u00C7ALI\u015EMASI / 0",
                            this.state.selected + 1),
                        (0, react_1.createElement)("strong", null, m.name),
                        (0, react_1.createElement)("span", null, "Tonlar temsili. Kesin se\u00E7im ger\u00E7ek numuneyle.")),
                    (0, react_1.createElement)("span", { className: "vertical-label" }, "DO\u011EADAN \u0130LHAM ALAN Y\u00DCZEYLER"))));
    }
}
exports.MaterialPreview = MaterialPreview;
function Home(a) {
    return (0, react_1.createElement)(react_1.Fragment, null,
        (0, react_1.createElement)("section", { className: "hero-editorial", "aria-labelledby": "hero-title" },
            (0, react_1.createElement)("div", { className: "hero-editorial-image" },
                (0, react_1.createElement)(ui_1.Photo, { name: "dining.webp", alt: "G\u00FCn \u0131\u015F\u0131\u011F\u0131nda ah\u015Fap yemek masas\u0131 ve sandalyeler. Temsili tasar\u0131m g\u00F6rseli.", eager: true, caption: false })),
            (0, react_1.createElement)("div", { className: "hero-editorial-shade" }),
            (0, react_1.createElement)("div", { className: "wrap hero-editorial-inner" },
                (0, react_1.createElement)("div", { className: "hero-editorial-copy" },
                    (0, react_1.createElement)(ui_1.Eyebrow, null, "\u0130STANBUL \u00B7 EL YAPIMI MOB\u0130LYA AT\u00D6LYES\u0130"),
                    (0, react_1.createElement)("h1", { id: "hero-title" },
                        "Zamana de\u011Fer",
                        (0, react_1.createElement)("br", null),
                        "katan mobilyalar",
                        (0, react_1.createElement)("span", null, ".")),
                    (0, react_1.createElement)("p", null,
                        "Birlikte ya\u015Fad\u0131k\u00E7a anlam kazanan par\u00E7alar.",
                        (0, react_1.createElement)("br", null),
                        "Aileden gelen ustal\u0131kla, sizin \u00F6l\u00E7\u00FCn\u00FCzde."),
                    (0, react_1.createElement)("div", { className: "hero-actions" },
                        (0, react_1.createElement)(ui_1.ButtonLink, { to: "/urunler", navigate: a.navigate }, "Koleksiyonu ke\u015Ffet"),
                        (0, react_1.createElement)(ui_1.TextLink, { to: "/teklif-al", navigate: a.navigate, light: true }, "\u00D6zel \u00FCretim talebi"))),
                (0, react_1.createElement)("div", { className: "hero-editorial-bottom" },
                    (0, react_1.createElement)("span", null, "AH\u015EABA EMEK. YA\u015EAMINIZA YER."),
                    (0, react_1.createElement)("a", { href: "#room-discovery", onClick: e => { e.preventDefault(); document.getElementById('room-discovery')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); } },
                        "At\u00F6lyeyi ke\u015Ffedin ",
                        (0, react_1.createElement)(ui_1.Icon, { name: "down", size: 18 })),
                    (0, react_1.createElement)("span", { className: "concept-credit" }, "G\u00D6RSEL B\u0130R TASARIM KONSEPT\u0130D\u0130R")))),
        (0, react_1.createElement)("section", { className: "atelier-values", "aria-label": "\u00DCretim yakla\u015F\u0131m\u0131m\u0131z" },
            (0, react_1.createElement)("div", { className: "wrap" }, [['Kendi atölyemizden', 'Hazır olanı değil, size uyanı.'], ['El işçiliği', 'Her ayrıntıda bir ustanın emeği.'], ['Ölçünüze özel', 'Mekânınız ve alışkanlıklarınız için.'], ['Doğrudan iletişim', 'İşin başından, son dokunuşuna.']].map(([title, desc], i) => (0, react_1.createElement)("div", { key: title },
                (0, react_1.createElement)("span", { className: "value-index" },
                    "0",
                    i + 1),
                (0, react_1.createElement)("div", null,
                    (0, react_1.createElement)("h2", null, title),
                    (0, react_1.createElement)("p", null, desc)))))),
        (0, react_1.createElement)("section", { id: "room-discovery", className: "room-discovery wrap section" },
            (0, react_1.createElement)(ui_1.SectionHead, { number: "01", title: (0, react_1.createElement)(react_1.Fragment, null, "Ya\u015Fam\u0131n her alan\u0131 i\u00E7in."), sub: "Bir masan\u0131n etraf\u0131nda, size ait bir k\u00F6\u015Fede. Hayat\u0131n\u0131za yer a\u00E7an tasar\u0131m fikirleri.", to: "/urunler", navigate: a.navigate }),
            (0, react_1.createElement)("div", { className: "room-grid" }, [{ name: 'Yemek alanı', image: 'dining.webp', category: 'yemek', caption: 'Birlikte olmanın en güzel hâli.' }, { name: 'Oturma alanı', image: 'lounge.webp', category: 'oturma', caption: 'Günün ritmini yavaşlatın.' }, { name: 'Depolama', image: 'sideboard.webp', category: 'depolama', caption: 'Her şeyin kendine ait bir yeri.' }, { name: 'Çalışma alanı', image: 'office.webp', category: 'calisma', caption: 'Sizin gibi çalışan bir köşe.' }].map((room, i) => (0, react_1.createElement)(ui_1.Link, { key: room.category, to: '/urunler?alan=' + room.category, navigate: a.navigate, className: "room-card" },
                (0, react_1.createElement)(ui_1.Photo, { name: room.image, alt: room.name + ' için temsili mekân fikri', caption: false }),
                (0, react_1.createElement)("div", null,
                    (0, react_1.createElement)("span", { className: "room-number" },
                        "0",
                        i + 1,
                        " / MEK\u00C2N F\u0130KR\u0130"),
                    (0, react_1.createElement)("h3", null, room.name),
                    (0, react_1.createElement)("p", null, room.caption),
                    (0, react_1.createElement)("span", { className: "room-discover" },
                        "Ke\u015Ffet ",
                        (0, react_1.createElement)(ui_1.Icon, { name: "diagonal", size: 20 })))))),
            (0, react_1.createElement)("p", { className: "catalog-note" }, "Mek\u00E2n g\u00F6rselleri tasar\u0131m y\u00F6n\u00FCn\u00FC anlatan konseptlerdir. Ger\u00E7ek at\u00F6lye uygulamas\u0131 de\u011Fildir.")),
        (0, react_1.createElement)("section", { id: "koleksiyon", className: "wrap section collection-section" },
            (0, react_1.createElement)(ui_1.SectionHead, { number: "02", title: (0, react_1.createElement)(react_1.Fragment, null,
                    "Az par\u00E7a.",
                    (0, react_1.createElement)("br", null),
                    (0, react_1.createElement)("em", null, "\u00C7ok karakter.")), sub: "Evinizin ritmine e\u015Flik edecek bir tasar\u0131m se\u00E7kisi.", to: "/urunler", navigate: a.navigate }),
            (0, react_1.createElement)("div", { className: "featured-products" }, [data_1.products[0], data_1.products[2], data_1.products[3]].map(p => (0, react_1.createElement)(ui_1.ProductCard, { key: p.id, product: p, actions: a }))),
            (0, react_1.createElement)("p", { className: "catalog-note" }, "Bu se\u00E7ki bir tasar\u0131m \u00F6nizlemesidir. \u00DCr\u00FCn adlar\u0131 ve g\u00F6rseller ger\u00E7ek katalog yerine ge\u00E7mez.")),
        (0, react_1.createElement)("section", { className: "story-section" },
            (0, react_1.createElement)("div", { className: "wrap story-grid" },
                (0, react_1.createElement)("div", { className: "story-picture" },
                    (0, react_1.createElement)(ui_1.Photo, { name: "craft.webp", alt: "Ah\u015Fap i\u015F\u00E7ili\u011Fini anlatan temsili el ve rende g\u00F6rseli" }),
                    (0, react_1.createElement)("div", { className: "story-foot" },
                        (0, react_1.createElement)("span", null, "\u0130\u015E\u0130N \u00D6Z\u00DC"),
                        (0, react_1.createElement)("span", null, "Bir \u015Feyi iyi yapma iste\u011Fi."))),
                (0, react_1.createElement)("div", { className: "story-copy" },
                    (0, react_1.createElement)(ui_1.Eyebrow, null, "03 / AT\u00D6LYEM\u0130ZDEN"),
                    (0, react_1.createElement)("h2", null,
                        "Bir meslekten",
                        (0, react_1.createElement)("br", null),
                        "fazlas\u0131.",
                        (0, react_1.createElement)("br", null),
                        (0, react_1.createElement)("em", null, "Bir aile miras\u0131.")),
                    (0, react_1.createElement)("p", null, "Babadan \u00F6\u011Frenilen marangozluk bilgisi, bug\u00FCn ba\u015Fka ya\u015Fam alanlar\u0131nda yeni kar\u015F\u0131l\u0131klar buluyor."),
                    (0, react_1.createElement)("p", null, "Elif Tasar\u0131m\u2019da \u00FCr\u00FCnlerimizi kendi at\u00F6lyemizde \u00FCretiyoruz. Haz\u0131r olan\u0131 sunmak yerine, neye ihtiya\u00E7 duydu\u011Funuzu dinleyerek ba\u015Fl\u0131yoruz."),
                    (0, react_1.createElement)(ui_1.TextLink, { to: "/atolyemiz", navigate: a.navigate, light: true }, "Hik\u00E2yemizi ke\u015Ffet"),
                    (0, react_1.createElement)("div", { className: "story-signature" },
                        (0, react_1.createElement)("img", { src: (0, ui_1.image)('elif-amblem-light.png'), alt: "" }),
                        (0, react_1.createElement)("span", null,
                            "EL\u0130F TASARIM",
                            (0, react_1.createElement)("br", null),
                            (0, react_1.createElement)("small", null, "EL YAPIMI MOB\u0130LYA AT\u00D6LYES\u0130")))))),
        (0, react_1.createElement)(MaterialPreview, { actions: a }),
        (0, react_1.createElement)("section", { className: "bespoke-section wrap" },
            (0, react_1.createElement)("div", { className: "bespoke-copy" },
                (0, react_1.createElement)(ui_1.Eyebrow, null, "05 / \u00D6ZEL \u00DCRET\u0130M"),
                (0, react_1.createElement)("h2", null,
                    "Bir kal\u0131ba de\u011Fil,",
                    (0, react_1.createElement)("br", null),
                    (0, react_1.createElement)("em", null, "size uysun.")),
                (0, react_1.createElement)("p", null, "Bazen do\u011Fru mobilya hen\u00FCz yap\u0131lmam\u0131\u015Ft\u0131r. Bir duvar\u0131n \u00F6l\u00E7\u00FCs\u00FC, bir \u00E7al\u0131\u015Fma al\u0131\u015Fkanl\u0131\u011F\u0131 veya akl\u0131n\u0131zda kalan bir \u00E7izgiyle ba\u015Flayabiliriz."),
                (0, react_1.createElement)(ui_1.ButtonLink, { to: "/teklif-al", navigate: a.navigate }, "Birlikte tasarlayal\u0131m"),
                (0, react_1.createElement)("div", { className: "process-mini" },
                    (0, react_1.createElement)("span", null,
                        (0, react_1.createElement)("b", null, "01"),
                        " \u0130htiyac\u0131 konu\u015Fal\u0131m"),
                    (0, react_1.createElement)("span", null,
                        (0, react_1.createElement)("b", null, "02"),
                        " \u00D6l\u00E7\u00FCy\u00FC netle\u015Ftirelim"),
                    (0, react_1.createElement)("span", null,
                        (0, react_1.createElement)("b", null, "03"),
                        " At\u00F6lyede \u00FCretelim"))),
            (0, react_1.createElement)("div", { className: "drawing-paper" },
                (0, react_1.createElement)("div", { className: "drawing-title" },
                    "EL\u0130F / \u00D6ZEL \u00D6L\u00C7\u00DC ST\u00DCDYOSU ",
                    (0, react_1.createElement)(ui_1.Icon, { name: "ruler" })),
                (0, react_1.createElement)("svg", { viewBox: "0 0 600 410", fill: "none", "aria-label": "Temsili masa \u00F6l\u00E7\u00FC \u00E7izimi" },
                    (0, react_1.createElement)("g", { stroke: "currentColor", strokeWidth: "1.2" },
                        (0, react_1.createElement)("path", { d: "m96 195 250-85 166 68-253 100Z" }),
                        (0, react_1.createElement)("path", { d: "m96 195 0 13 163 72 253-91v-11M259 278v94m-9-94v91l9 3 9-4v-94M106 211v87l9 4 8-3v-80M484 201v89l9 3 8-3v-95" }),
                        (0, react_1.createElement)("path", { d: "m87 169 252-87m-258 78 8 20m244-106 8 20M368 95l158 65m-161-74-5 15m165 49 6 18M80 212v94m-8-94h16m-16 94h16", strokeDasharray: "3 4" }),
                        (0, react_1.createElement)("path", { d: "m127 199 220-74m-184 91 220-74m-185 91 219-74", opacity: ".3" })),
                    (0, react_1.createElement)("g", { fill: "currentColor", fontSize: "14", fontFamily: "serif" },
                        (0, react_1.createElement)("text", { x: "202", y: "99", transform: "rotate(-19 202 99)" }, "sizin \u00F6l\u00E7\u00FCn\u00FCz"),
                        (0, react_1.createElement)("text", { x: "437", y: "112", transform: "rotate(22 437 112)" }, "sizin alan\u0131n\u0131z"),
                        (0, react_1.createElement)("text", { x: "58", y: "274", transform: "rotate(-90 58 274)" }, "sizin ritminiz"))),
                (0, react_1.createElement)("div", { className: "drawing-bottom" },
                    (0, react_1.createElement)("span", null, "Her \u00E7izgi, bir konu\u015Fmayla ba\u015Flar."),
                    (0, react_1.createElement)("span", null, "ET / 01")))),
        (0, react_1.createElement)("section", { className: "wrap section inspiration-section" },
            (0, react_1.createElement)(ui_1.SectionHead, { number: "06", title: (0, react_1.createElement)(react_1.Fragment, null,
                    "Birlikte ya\u015Famak i\u00E7in",
                    (0, react_1.createElement)("br", null),
                    (0, react_1.createElement)("em", null, "d\u00FC\u015F\u00FCn\u00FClen mek\u00E2nlar.")), to: "/mekan-fikirleri", navigate: a.navigate }),
            (0, react_1.createElement)("div", { className: "ideas-grid" }, data_1.ideas.slice(0, 2).map((p, i) => (0, react_1.createElement)(ui_1.Link, { key: p.id, to: '/mekan-fikirleri/' + p.id, navigate: a.navigate, className: 'idea-card idea-' + i },
                (0, react_1.createElement)(ui_1.Photo, { name: p.image, alt: p.name + ' — temsili mekân konsepti', ratio: i ? '4/5' : '5/4' }),
                (0, react_1.createElement)("div", { className: "idea-caption" },
                    (0, react_1.createElement)("div", null,
                        (0, react_1.createElement)("span", { className: "label" },
                            p.type,
                            " / MEK\u00C2N F\u0130KR\u0130"),
                        (0, react_1.createElement)("h3", null, p.name)),
                    (0, react_1.createElement)(ui_1.Icon, { name: "diagonal", size: 26 })))))),
        (0, react_1.createElement)("section", { className: "detail-strip" },
            (0, react_1.createElement)(ui_1.Photo, { name: "joinery.webp", alt: "Temsili ah\u015Fap birle\u015Fim detay\u0131" }),
            (0, react_1.createElement)("div", null,
                (0, react_1.createElement)(ui_1.Eyebrow, null, "G\u00D6R\u00DCNEN\u0130N ARDINDAK\u0130 EMEK"),
                (0, react_1.createElement)("h2", null,
                    "As\u0131l fark,",
                    (0, react_1.createElement)("br", null),
                    (0, react_1.createElement)("em", null, "ayr\u0131nt\u0131da.")),
                (0, react_1.createElement)("p", null, "Bir kenar\u0131n d\u00F6n\u00FC\u015F\u00FCnde, bir birle\u015Fimin \u00E7izgisinde, elinizin de\u011Fdi\u011Fi y\u00FCzeyde."),
                (0, react_1.createElement)(ui_1.TextLink, { to: "/ozel-uretim", navigate: a.navigate }, "Nas\u0131l \u00E7al\u0131\u015F\u0131yoruz?"))),
        (0, react_1.createElement)("section", { className: "wrap section journal-section" },
            (0, react_1.createElement)(ui_1.SectionHead, { number: "07", title: (0, react_1.createElement)(react_1.Fragment, null,
                    "At\u00F6lye ",
                    (0, react_1.createElement)("em", null, "notlar\u0131.")), to: "/rehber", navigate: a.navigate }),
            (0, react_1.createElement)("div", { className: "journal-grid" }, data_1.journal.map(p => (0, react_1.createElement)(ui_1.Link, { key: p.id, to: '/rehber/' + p.id, navigate: a.navigate, className: "journal-card" },
                (0, react_1.createElement)(ui_1.Photo, { name: p.image, alt: p.title + ' için temsili görsel', ratio: "8/5", caption: false }),
                (0, react_1.createElement)("span", { className: "label" }, p.subtitle),
                (0, react_1.createElement)("h3", null, p.title),
                (0, react_1.createElement)("span", { className: "read-more" },
                    "Notu oku ",
                    (0, react_1.createElement)(ui_1.Icon, { size: 18 })))))),
        (0, react_1.createElement)("section", { className: "wrap faq-section" },
            (0, react_1.createElement)("div", null,
                (0, react_1.createElement)(ui_1.Eyebrow, null, "MERAK ED\u0130LENLER"),
                (0, react_1.createElement)("h2", null,
                    "Ba\u015Flamadan",
                    (0, react_1.createElement)("br", null),
                    (0, react_1.createElement)("em", null, "\u00F6nce.")),
                (0, react_1.createElement)(ui_1.TextLink, { to: "/sikca-sorulan-sorular", navigate: a.navigate }, "T\u00FCm sorular")),
            (0, react_1.createElement)(ui_1.Accordion, { items: data_1.faqs.slice(0, 3) })),
        (0, react_1.createElement)(ui_1.Callout, { navigate: a.navigate }));
}

},
"src/pages/Quote":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quote = void 0;
const react_1 = require("react");
const data_1 = require("../lib/data");
const domain_1 = require("../lib/domain");
const ui_1 = require("../components/ui");
const initial = { kind: '', unknown: false, width: '', depth: '', height: '', unit: 'cm', material: 'Danışmak istiyorum', finish: 'Birlikte değerlendirelim', city: 'İstanbul', district: '', delivery: 'Birlikte planlayalım', name: '', email: '', phone: '', note: '', ack: false };
const labels = ['İhtiyaç', 'Ölçü', 'Malzeme', 'Görseller', 'Teslim', 'İletişim', 'Kontrol'];
const stepTitles = ['Neyi birlikte düşünelim?', 'Alanınızın ölçüsü nedir?', 'Dokusu nasıl olsun?', 'Bir görsel, çok şey anlatır.', 'Nereye yerleşecek?', 'Size nasıl ulaşalım?', 'Son bir kez, birlikte bakalım.'];
const stepDescriptions = ['Bir ürün seçin veya fikrinizi birlikte şekillendirelim.', 'Kesin ölçü bilmek zorunda değilsiniz. İlk fikir bile değerlidir.', 'Ağaç türü ile yüzey tercihini ayrı ayrı değerlendirelim.', 'Referans, mekân fotoğrafı veya eskiz ekleyebilirsiniz. Bu adım isteğe bağlı.', 'İlk aşamada açık adresinize ihtiyacımız yok.', 'Bu önizlemede bilgiler gönderilmez ve kalıcı olarak saklanmaz. Örnek bilgi kullanın.', 'Hazırlanan özet bir sipariş veya kabul edilmiş teklif değildir.'];
class Quote extends react_1.Component {
    constructor() {
        super(...arguments);
        this.state = { step: 0, v: { ...initial }, errors: {}, files: [], uploading: false, done: false, hasDraft: false };
        this.alive = true;
        this.set = (k, value) => this.setState(s => ({ v: { ...s.v, [k]: value }, errors: { ...s.errors, [k]: '' } }));
        this.next = () => {
            const errors = (0, domain_1.validateQuoteStep)(this.state.step, this.state.v);
            if (Object.keys(errors).length) {
                this.setState({ errors }, () => document.getElementById('q-' + Object.keys(errors)[0])?.focus());
                return;
            }
            this.setState(s => ({ step: Math.min(6, s.step + 1), errors: {} }), () => document.getElementById('wizard-title')?.focus());
        };
        this.summary = () => { const v = this.state.v; return ['ELİF TASARIM — ÖNİZLEME TALEP ÖZETİ', 'Bu dosya atölyeye gönderilmedi. Sipariş veya fiyat teklifi değildir.', '', `İhtiyaç: ${v.kind}`, `Ölçü: ${v.unknown ? 'Birlikte belirlenecek' : [v.width, v.depth, v.height].join(' × ') + ' ' + v.unit}`, `Malzeme tercihi: ${v.material}`, `Yüzey tercihi: ${v.finish}`, `Bölge: ${v.city}${v.district ? ' / ' + v.district : ''}`, `Teslim yaklaşımı: ${v.delivery}`, `İsim: ${v.name}`, `E-posta: ${v.email || 'Belirtilmedi'}`, `Telefon: ${v.phone || 'Belirtilmedi'}`, `Not: ${v.note || 'Belirtilmedi'}`, `Görseller: ${this.state.files.map(f => f.name).join(', ') || 'Eklenmedi'}`, 'Görsel dosyaları bu metin dosyasına dahil değildir.'].join('\n'); };
        this.field = (name, label, placeholder = '', type = 'text') => (0, react_1.createElement)("label", { className: "form-field", htmlFor: 'q-' + name },
            (0, react_1.createElement)("span", { id: 'label-' + name }, label),
            (0, react_1.createElement)("input", { "aria-labelledby": 'label-' + name, id: 'q-' + name, type: type, value: String(this.state.v[name]), maxLength: name === 'name' ? 100 : 200, placeholder: placeholder, onInput: e => this.set(name, e.currentTarget.value), "aria-invalid": !!this.state.errors[name], "aria-describedby": this.state.errors[name] ? 'err-' + name : undefined }),
            this.state.errors[name] && (0, react_1.createElement)("small", { className: "field-error", id: 'err-' + name }, this.state.errors[name]));
    }
    componentDidMount() { const p = data_1.products.find(p => p.id === this.props.productId); this.setState({ hasDraft: !!(0, domain_1.readLocal)('quote-draft', null), v: { ...initial, kind: p ? p.categoryLabel : '' } }); }
    componentWillUnmount() { this.alive = false; this.state.files.forEach(f => URL.revokeObjectURL(f.url)); }
    async addFiles(list) {
        if (!list)
            return;
        const received = Array.from(list);
        if (received.length + this.state.files.length > 5) {
            this.props.notify('En fazla 5 görsel ekleyebilirsiniz.');
            return;
        }
        this.setState({ uploading: true });
        const accepted = [];
        try {
            for (const file of received) {
                const v = (0, domain_1.validateFile)(file);
                if (!v.ok) {
                    this.props.notify(v.error);
                    continue;
                }
                const bytes = new Uint8Array(await file.slice(0, 12).arrayBuffer());
                const png = bytes[0] === 137 && bytes[1] === 80 && bytes[2] === 78 && bytes[3] === 71;
                const jpg = bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255;
                const webp = String.fromCharCode(...bytes.slice(0, 4)) === 'RIFF' && String.fromCharCode(...bytes.slice(8, 12)) === 'WEBP';
                if (!(png || jpg || webp)) {
                    this.props.notify(file.name + ': dosya içeriği desteklenen bir görsel değil.');
                    continue;
                }
                const bitmap = await createImageBitmap(file);
                if (bitmap.width * bitmap.height > 40000000) {
                    bitmap.close();
                    this.props.notify('40 megapikselden küçük bir görsel seçin.');
                    continue;
                }
                bitmap.close();
                accepted.push({ name: file.name, url: URL.createObjectURL(file), bytes: file.size });
            }
        }
        catch {
            this.props.notify('Görsel okunamadı. Başka bir dosya deneyin.');
        }
        finally {
            if (this.alive)
                this.setState(s => ({ files: [...s.files, ...accepted], uploading: false }));
            else
                accepted.forEach(f => URL.revokeObjectURL(f.url));
        }
    }
    renderStep() {
        const { v, step, files } = this.state;
        if (step === 0)
            return (0, react_1.createElement)("div", { className: "choice-grid", id: "q-kind", tabIndex: -1 },
                [['Yemek masası', 'dining.webp'], ['Sandalye', 'chair.webp'], ['Konsol', 'sideboard.webp'], ['Yükseklik ayarlı masa', 'office.webp']].map(([kind, photo]) => (0, react_1.createElement)("button", { type: "button", key: kind, className: 'picture-choice ' + (v.kind === kind ? 'selected' : ''), "aria-pressed": v.kind === kind, onClick: () => this.set('kind', kind) },
                    (0, react_1.createElement)("img", { src: (0, ui_1.image)(photo), alt: "" }),
                    (0, react_1.createElement)("span", null,
                        kind,
                        (0, react_1.createElement)("i", null, v.kind === kind ? (0, react_1.createElement)(ui_1.Icon, { name: "check", size: 14 }) : null)))),
                (0, react_1.createElement)("button", { type: "button", className: 'choice-wide ' + (v.kind === 'Birlikte karar verelim' ? 'selected' : ''), onClick: () => this.set('kind', 'Birlikte karar verelim'), "aria-pressed": v.kind === 'Birlikte karar verelim' },
                    (0, react_1.createElement)(ui_1.Icon, { name: "ruler" }),
                    "Ba\u015Fka bir fikir / Birlikte karar verelim",
                    (0, react_1.createElement)(ui_1.Icon, { name: "arrow" })),
                this.state.errors.kind && (0, react_1.createElement)("p", { className: "field-error" }, this.state.errors.kind));
        if (step === 1)
            return (0, react_1.createElement)(react_1.Fragment, null,
                (0, react_1.createElement)("label", { className: "check-card" },
                    (0, react_1.createElement)("input", { type: "checkbox", checked: v.unknown, onChange: e => this.set('unknown', e.currentTarget.checked) }),
                    (0, react_1.createElement)("span", null,
                        "\u00D6l\u00E7\u00FClerimi birlikte belirleyelim",
                        (0, react_1.createElement)("small", null, "\u015Eimdilik kesin \u00F6l\u00E7\u00FC vermeden devam edebilirsiniz."))),
                !v.unknown && (0, react_1.createElement)(react_1.Fragment, null,
                    (0, react_1.createElement)("div", { className: "form-row three" },
                        this.field('width', 'En', '180'),
                        this.field('depth', 'Derinlik', '90'),
                        this.field('height', 'Yükseklik', '75')),
                    (0, react_1.createElement)("label", { className: "form-field" },
                        "\u00D6l\u00E7\u00FC birimi",
                        (0, react_1.createElement)("select", { value: v.unit, onChange: e => this.set('unit', e.currentTarget.value) },
                            (0, react_1.createElement)("option", { value: "cm" }, "Santimetre (cm)"),
                            (0, react_1.createElement)("option", { value: "mm" }, "Milimetre (mm)"))),
                    (0, react_1.createElement)("p", { className: "small muted" }, "120,5 veya 120.5 yazabilirsiniz. Bunlar ilk talep \u00F6l\u00E7\u00FCleridir; \u00FCretim onay\u0131 de\u011Fildir.")),
                (0, react_1.createElement)("details", { className: "inline-guide" },
                    (0, react_1.createElement)("summary", null,
                        "\u00D6l\u00E7\u00FC alma notlar\u0131 ",
                        (0, react_1.createElement)(ui_1.Icon, { name: "plus", size: 16 })),
                    (0, react_1.createElement)("p", null, "En, derinlik ve y\u00FCksekli\u011Fi ayr\u0131 \u00F6l\u00E7\u00FCn. Se\u00E7ti\u011Finiz birimi b\u00FCt\u00FCn alanlarda tutarl\u0131 kullan\u0131n. Kap\u0131, \u00E7ekmece ve sandalye i\u00E7in gereken kullan\u0131m paylar\u0131n\u0131 at\u00F6lyeyle de\u011Ferlendirin. \u0130lk \u00F6l\u00E7\u00FCler \u00FCretim onay\u0131 de\u011Fildir.")));
        if (step === 2)
            return (0, react_1.createElement)(react_1.Fragment, null,
                (0, react_1.createElement)("span", { className: "field-label" }, "MALZEME TERC\u0130H\u0130"),
                (0, react_1.createElement)("div", { className: "material-choices" }, data_1.materials.map(m => (0, react_1.createElement)("button", { type: "button", key: m.id, className: v.material === m.name ? 'selected' : '', onClick: () => this.set('material', m.name), "aria-pressed": v.material === m.name },
                    (0, react_1.createElement)("img", { src: (0, ui_1.image)(m.image), alt: "" }),
                    (0, react_1.createElement)("span", null,
                        m.name,
                        v.material === m.name && (0, react_1.createElement)(ui_1.Icon, { name: "check", size: 16 }))))),
                (0, react_1.createElement)("button", { type: "button", className: 'choice-wide ' + (v.material === 'Danışmak istiyorum' ? 'selected' : ''), onClick: () => this.set('material', 'Danışmak istiyorum'), "aria-pressed": v.material === 'Danışmak istiyorum' },
                    "Malzeme konusunda dan\u0131\u015Fmak istiyorum ",
                    (0, react_1.createElement)(ui_1.Icon, { name: "arrow" })),
                (0, react_1.createElement)("label", { className: "form-field spaced" },
                    "Y\u00FCzey beklentiniz",
                    (0, react_1.createElement)("select", { value: v.finish, onChange: e => this.set('finish', e.currentTarget.value) },
                        (0, react_1.createElement)("option", { value: "Birlikte de\u011Ferlendirelim" }, "Birlikte de\u011Ferlendirelim"),
                        (0, react_1.createElement)("option", { value: "Do\u011Fal g\u00F6r\u00FCn\u00FCm" }, "Do\u011Fal g\u00F6r\u00FCn\u00FCm"),
                        (0, react_1.createElement)("option", { value: "Mat biti\u015F" }, "Mat biti\u015F"),
                        (0, react_1.createElement)("option", { value: "Farkl\u0131 renk / y\u00FCzey g\u00F6r\u00FC\u015Felim" }, "Farkl\u0131 renk / y\u00FCzey g\u00F6r\u00FC\u015Felim"))),
                (0, react_1.createElement)("p", { className: "small muted" }, "G\u00F6rseller temsili tonlard\u0131r. Malzeme yap\u0131s\u0131 ve y\u00FCzey i\u015Flemi numuneyle netle\u015Fir."));
        if (step === 3)
            return (0, react_1.createElement)(react_1.Fragment, null,
                (0, react_1.createElement)("label", { className: "upload-zone" },
                    (0, react_1.createElement)(ui_1.Icon, { name: "upload", size: 32 }),
                    (0, react_1.createElement)("strong", null, this.state.uploading ? 'Görseller kontrol ediliyor…' : 'Görsel eklemek için seçin'),
                    (0, react_1.createElement)("span", null, "JPG, PNG, WebP \u00B7 En fazla 5 g\u00F6rsel \u00B7 Her biri 10 MB"),
                    (0, react_1.createElement)("input", { type: "file", multiple: true, accept: "image/jpeg,image/png,image/webp", disabled: this.state.uploading, onChange: e => { this.addFiles(e.currentTarget.files); e.currentTarget.value = ''; }, "aria-label": "Referans g\u00F6rsellerini se\u00E7" })),
                (0, react_1.createElement)("div", { className: "upload-list" }, files.map((f, i) => (0, react_1.createElement)("div", { key: f.url },
                    (0, react_1.createElement)("img", { src: f.url, alt: 'Seçtiğiniz referans: ' + f.name }),
                    (0, react_1.createElement)("span", null, f.name),
                    (0, react_1.createElement)("button", { type: "button", className: "icon-button", "aria-label": f.name + ' görselini kaldır', onClick: () => { URL.revokeObjectURL(f.url); this.setState({ files: files.filter((_, n) => n !== i) }); } },
                        (0, react_1.createElement)(ui_1.Icon, { name: "close", size: 16 }))))),
                (0, react_1.createElement)("div", { className: "note-box" },
                    (0, react_1.createElement)(ui_1.Icon, { name: "info" }),
                    (0, react_1.createElement)("p", null, "G\u00F6rseller yaln\u0131z a\u00E7\u0131k sayfan\u0131zda tutulur. Yenileme veya ba\u015Fka sayfaya ge\u00E7i\u015Fte silinir. Sunucuya g\u00F6nderilmez. \u0130nsan, belge ve a\u00E7\u0131k adres gibi \u00F6zel bilgiler i\u00E7eren foto\u011Fraflar payla\u015Fmay\u0131n.")));
        if (step === 4)
            return (0, react_1.createElement)(react_1.Fragment, null,
                (0, react_1.createElement)("div", { className: "form-row" },
                    (0, react_1.createElement)("label", { className: "form-field" },
                        "\u0130l",
                        (0, react_1.createElement)("select", { value: v.city, onChange: e => this.set('city', e.currentTarget.value) },
                            (0, react_1.createElement)("option", { value: "\u0130stanbul" }, "\u0130stanbul"),
                            (0, react_1.createElement)("option", { value: "Ba\u015Fka bir il" }, "Ba\u015Fka bir il"),
                            (0, react_1.createElement)("option", { value: "Daha sonra netle\u015Ftirelim" }, "Daha sonra netle\u015Ftirelim"))),
                    this.field('district', 'İlçe / bölge (isteğe bağlı)')),
                (0, react_1.createElement)("label", { className: "form-field" },
                    "Teslim yakla\u015F\u0131m\u0131",
                    (0, react_1.createElement)("select", { value: v.delivery, onChange: e => this.set('delivery', e.currentTarget.value) },
                        (0, react_1.createElement)("option", { value: "Birlikte planlayal\u0131m" }, "Birlikte planlayal\u0131m"),
                        (0, react_1.createElement)("option", { value: "At\u00F6lyeden teslim almak istiyorum" }, "At\u00F6lyeden teslim almak istiyorum"),
                        (0, react_1.createElement)("option", { value: "Adrese teslimi g\u00F6r\u00FC\u015Fmek istiyorum" }, "Adrese teslimi g\u00F6r\u00FC\u015Fmek istiyorum"),
                        (0, react_1.createElement)("option", { value: "Teslim ve kurulum ihtiyac\u0131m var" }, "Teslim ve kurulum ihtiyac\u0131m var"))),
                (0, react_1.createElement)("div", { className: "note-box" },
                    (0, react_1.createElement)(ui_1.Icon, { name: "pin" }),
                    (0, react_1.createElement)("p", null, "Bu se\u00E7im kesin teslimat veya fiyat taahh\u00FCd\u00FC olu\u015Fturmaz. Ta\u015F\u0131ma, mek\u00E2na eri\u015Fim ve kurulum son teklifte netle\u015Fir.")));
        if (step === 5)
            return (0, react_1.createElement)(react_1.Fragment, null,
                this.field('name', 'Adınız', 'Örnek Müşteri'),
                (0, react_1.createElement)("div", { className: "form-row" },
                    this.field('email', 'E-posta', 'ornek@example.com', 'email'),
                    this.field('phone', 'Telefon (e-posta yerine de olabilir)', '', 'tel')),
                (0, react_1.createElement)("label", { className: "form-field" },
                    "Eklemek istedi\u011Finiz bir \u015Fey var m\u0131?",
                    (0, react_1.createElement)("textarea", { value: v.note, maxLength: 2000, rows: 4, onInput: e => this.set('note', e.currentTarget.value), placeholder: "Nas\u0131l kullanaca\u011F\u0131n\u0131z\u0131 ve sizin i\u00E7in \u00F6nemli ayr\u0131nt\u0131lar\u0131 anlatabilirsiniz." })),
                (0, react_1.createElement)("p", { className: "small muted" }, "Bu bilgiler yaln\u0131z indirmeniz i\u00E7in haz\u0131rlanacak \u00F6zette kullan\u0131l\u0131r. At\u00F6lyeye g\u00F6nderim yap\u0131lmaz ve ileti\u015Fim bilgisi taray\u0131c\u0131 tasla\u011F\u0131na kaydedilmez."));
        return (0, react_1.createElement)(react_1.Fragment, null,
            (0, react_1.createElement)("dl", { className: "summary-list" }, [['İhtiyaç', v.kind], ['Ölçü', v.unknown ? 'Birlikte belirlenecek' : `${v.width} × ${v.depth} × ${v.height} ${v.unit}`], ['Malzeme', v.material], ['Yüzey', v.finish], ['Teslim', v.city + ' / ' + v.delivery], ['İletişim', v.name + ' · ' + (v.email || v.phone)], ['Görseller', files.length + ' görsel, yalnız açık sayfada']].map(([k, val]) => (0, react_1.createElement)("div", { key: k },
                (0, react_1.createElement)("dt", null, k),
                (0, react_1.createElement)("dd", null, val)))),
            v.note && (0, react_1.createElement)("p", { className: "quote-note" }, v.note),
            (0, react_1.createElement)("label", { className: "check-card" },
                (0, react_1.createElement)("input", { type: "checkbox", checked: v.ack, onChange: e => this.set('ack', e.currentTarget.checked) }),
                (0, react_1.createElement)("span", null,
                    "Bu i\u015Flemin yaln\u0131z yerel bir \u00F6nizleme oldu\u011Funu anl\u0131yorum.",
                    (0, react_1.createElement)("small", null, "At\u00F6lyeye bilgi g\u00F6nderilmez, sipari\u015F veya \u00F6deme olu\u015Fturulmaz."))));
    }
    render() {
        const a = this.props, { v, step } = this.state;
        return (0, react_1.createElement)("section", { className: "quote-page wrap" },
            (0, react_1.createElement)("div", { className: "quote-heading" },
                (0, react_1.createElement)(ui_1.Eyebrow, null, "EL\u0130F / \u00D6ZEL \u00D6L\u00C7\u00DC ST\u00DCDYOSU"),
                (0, react_1.createElement)("h1", null,
                    "\u00D6l\u00E7\u00FCs\u00FC size.",
                    (0, react_1.createElement)("br", null),
                    (0, react_1.createElement)("em", null, "Hik\u00E2yesi birlikte.")),
                (0, react_1.createElement)("p", null, "Bir fikri, konu\u015Fulabilir bir tasar\u0131ma d\u00F6n\u00FC\u015Ft\u00FCrelim.")),
            this.state.done ? (0, react_1.createElement)("div", { className: "quote-success" },
                (0, react_1.createElement)("span", { className: "success-mark" },
                    (0, react_1.createElement)(ui_1.Icon, { name: "check", size: 30 })),
                (0, react_1.createElement)(ui_1.Eyebrow, null, "\u00D6N\u0130ZLEME TAMAMLANDI"),
                (0, react_1.createElement)("h2", null,
                    "Fikriniz art\u0131k",
                    (0, react_1.createElement)("br", null),
                    (0, react_1.createElement)("em", null, "bir arada.")),
                (0, react_1.createElement)("p", null,
                    "Talep \u00F6zetiniz haz\u0131r. ",
                    (0, react_1.createElement)("strong", null, "At\u00F6lyeye g\u00F6nderilmedi."),
                    (0, react_1.createElement)("br", null),
                    "Bu bir sipari\u015F, fiyat teklifi veya \u00FCretim onay\u0131 de\u011Fildir."),
                (0, react_1.createElement)("div", { className: "success-summary" },
                    (0, react_1.createElement)("pre", null, this.summary())),
                (0, react_1.createElement)("div", { className: "action-row" },
                    (0, react_1.createElement)("button", { type: "button", className: "button", onClick: () => (0, domain_1.downloadText)('Elif_Tasarim_Talep_Ozeti.txt', this.summary()) },
                        "\u00D6zeti indir ",
                        (0, react_1.createElement)(ui_1.Icon, { name: "download" })),
                    (0, react_1.createElement)("button", { type: "button", className: "button button-outline", onClick: () => this.setState({ done: false, step: 6 }) },
                        "\u00D6zeti d\u00FCzenle ",
                        (0, react_1.createElement)(ui_1.Icon, null))),
                (0, react_1.createElement)(ui_1.Link, { to: "/urunler", navigate: a.navigate, className: "text-link" },
                    "Koleksiyona d\u00F6n ",
                    (0, react_1.createElement)(ui_1.Icon, null))) : (0, react_1.createElement)("div", { className: "wizard-layout" },
                (0, react_1.createElement)("aside", { className: "wizard-aside" },
                    (0, react_1.createElement)("ol", { className: "step-list" }, labels.map((s, i) => (0, react_1.createElement)("li", { key: s, className: i === step ? 'current' : i < step ? 'complete' : '', "aria-current": i === step ? 'step' : undefined },
                        (0, react_1.createElement)("button", { type: "button", disabled: i > step, onClick: () => this.setState({ step: i, errors: {} }) },
                            (0, react_1.createElement)("span", null, i < step ? (0, react_1.createElement)(ui_1.Icon, { name: "check", size: 14 }) : String(i + 1).padStart(2, '0')),
                            s)))),
                    (0, react_1.createElement)("div", { className: "wizard-help" },
                        (0, react_1.createElement)(ui_1.Icon, { name: "ruler", size: 28 }),
                        (0, react_1.createElement)("h3", null, "Her \u015Feyin cevab\u0131n\u0131 bilmeniz gerekmiyor."),
                        (0, react_1.createElement)("p", null, "\u00D6l\u00E7\u00FC, malzeme ve teslim detaylar\u0131n\u0131 birlikte de\u011Ferlendirmek i\u00E7in buraday\u0131z."),
                        (0, react_1.createElement)("span", null, "Temsili ak\u0131\u015F \u00B7 Canl\u0131 g\u00F6nderim yok"))),
                (0, react_1.createElement)("div", { className: "wizard-card" },
                    (0, react_1.createElement)("div", { className: "wizard-topline" },
                        (0, react_1.createElement)("span", null,
                            "ADIM ",
                            step + 1,
                            " / 7"),
                        (0, react_1.createElement)("span", null,
                            Math.round((step + 1) / 7 * 100),
                            "%")),
                    (0, react_1.createElement)("div", { className: "progress-bar" },
                        (0, react_1.createElement)("span", { style: { width: (step + 1) / 7 * 100 + '%' } })),
                    (0, react_1.createElement)("h2", { id: "wizard-title", tabIndex: -1 }, stepTitles[step]),
                    (0, react_1.createElement)("p", { className: "wizard-subtitle" }, stepDescriptions[step]),
                    this.state.hasDraft && step === 0 && (0, react_1.createElement)("div", { className: "draft-alert" },
                        (0, react_1.createElement)("span", null, "Bu cihazda kaydedilmi\u015F \u00F6l\u00E7\u00FC tercihleri var."),
                        (0, react_1.createElement)("button", { type: "button", onClick: () => {
                                const saved = (0, domain_1.readLocal)('quote-draft', null);
                                if (saved)
                                    this.setState({ v: { ...initial, ...(0, domain_1.safeDraft)(saved) }, hasDraft: false });
                            } },
                            "Tercihleri getir ",
                            (0, react_1.createElement)(ui_1.Icon, { size: 16 }))),
                    (0, react_1.createElement)("form", { onSubmit: e => {
                            e.preventDefault();
                            if (step < 6)
                                this.next();
                            else if (v.ack)
                                this.setState({ done: true });
                        }, noValidate: true },
                        (0, react_1.createElement)("div", { className: "wizard-content" }, this.renderStep()),
                        (0, react_1.createElement)("div", { className: "wizard-actions" },
                            (0, react_1.createElement)("button", { className: "back-button", type: "button", disabled: step === 0, onClick: () => this.setState({ step: step - 1, errors: {} }) },
                                (0, react_1.createElement)("span", { className: "reverse-arrow" },
                                    (0, react_1.createElement)(ui_1.Icon, null)),
                                "Geri"),
                            (0, react_1.createElement)("button", { className: "button", type: "submit", disabled: this.state.uploading || (step === 6 && !v.ack) },
                                step === 6 ? 'Talep özetini hazırla' : 'Devam et',
                                (0, react_1.createElement)(ui_1.Icon, null)))),
                    (0, react_1.createElement)("div", { className: "save-draft-row" },
                        (0, react_1.createElement)("button", { type: "button", onClick: () => { const ok = (0, domain_1.writeLocal)('quote-draft', (0, domain_1.safeDraft)(v), 7); a.notify(ok ? 'Yalnız ürün, ölçü ve malzeme tercihleri bu cihazda 7 gün saklandı. İletişim, not ve fotoğraf kaydedilmedi.' : 'Tarayıcı kayıt izni vermedi. Bu sayfada çalışmaya devam edebilirsiniz.'); } }, "\u00D6l\u00E7\u00FC tercihlerini bu cihazda sakla"),
                        (0, react_1.createElement)("span", null, "\u0130leti\u015Fim ve foto\u011Fraflar kaydedilmez.")))));
    }
}
exports.Quote = Quote;

},
"src/pages/Studio":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Studio = void 0;
const react_1 = require("react");
const data_1 = require("../lib/data");
const ui_1 = require("../components/ui");
const stages = ['Ölçü teyidi', 'Planlandı', 'Üretimde', 'Yüzey işlemi', 'Kalite kontrol', 'Sevke hazır'];
class Studio extends react_1.Component {
    constructor() {
        super(...arguments);
        this.state = { tab: 'overview', jobs: [] };
    }
    render() { const a = this.props; return (0, react_1.createElement)(react_1.Fragment, null,
        (0, react_1.createElement)(ui_1.PageIntro, { kicker: "AT\u00D6LYE MASASI / YALNIZ \u0130\u015E AKI\u015EI DEMOSU", title: (0, react_1.createElement)(react_1.Fragment, null,
                "G\u00F6r\u00FCnmeyen i\u015Fin",
                (0, react_1.createElement)("br", null),
                (0, react_1.createElement)("em", null, "g\u00F6r\u00FCnen d\u00FCzeni.")), desc: "Bu ekran ger\u00E7ek bir y\u00F6netim paneli veya yetkilendirilmi\u015F i\u015Fletme hesab\u0131 de\u011Fildir. Yaln\u0131z sentetik i\u015Flerle s\u00FCre\u00E7 provas\u0131 yapar; m\u00FC\u015Fteri verisi i\u00E7ermez." }),
        (0, react_1.createElement)("section", { className: "wrap studio" },
            (0, react_1.createElement)("div", { className: "filter-tabs", role: "group", "aria-label": "At\u00F6lye demo b\u00F6l\u00FCmleri" }, [['overview', 'Genel bakış'], ['production', 'Üretim kartları'], ['connections', 'Entegrasyon durumu']].map(([id, label]) => (0, react_1.createElement)("button", { className: this.state.tab === id ? 'active' : '', onClick: () => this.setState({ tab: id }), key: id }, label))),
            this.state.tab === 'connections' ? (0, react_1.createElement)("div", { className: "connection-list" }, [['Ticaret çekirdeği', 'Medusa + PostgreSQL', 'Kurulmadı / sunucu entegrasyonu gerekiyor'], ['Ödeme', 'iyzico / PayTR', 'Bağlı değil / tahsilat kapalı'], ['Kargo', 'Aras / PTT', 'Bağlı değil / sağlayıcı erişimi gerekiyor'], ['Fatura', 'Sağlayıcı doğrulanacak', 'Bağlı değil / gerçek belge oluşturulmaz'], ['Analitik', 'GA4 / Search Console', 'Hesap bağlı değil / izleme kapalı'], ['Personel yetkileri', 'Sunucu kimlik doğrulaması', 'Kurulmadı / bu ekran bir yetki sistemi değil']].map(([title, provider, status]) => (0, react_1.createElement)("article", { key: title },
                (0, react_1.createElement)("div", null,
                    (0, react_1.createElement)("h3", null, title),
                    (0, react_1.createElement)("p", null, provider)),
                (0, react_1.createElement)("span", { className: "status-tag" }, status)))) : (0, react_1.createElement)(react_1.Fragment, null,
                (0, react_1.createElement)("div", { className: "studio-metrics" },
                    (0, react_1.createElement)("div", null,
                        (0, react_1.createElement)("span", null, "Katalog \u00F6rne\u011Fi"),
                        (0, react_1.createElement)("strong", null, data_1.products.length),
                        (0, react_1.createElement)("small", null, "Ger\u00E7ek \u00FCr\u00FCn kayd\u0131 de\u011Fil")),
                    (0, react_1.createElement)("div", null,
                        (0, react_1.createElement)("span", null, "Demo \u00FCretim kart\u0131"),
                        (0, react_1.createElement)("strong", null, this.state.jobs.length),
                        (0, react_1.createElement)("small", null, "Yaln\u0131z a\u00E7\u0131k sayfada")),
                    (0, react_1.createElement)("div", null,
                        (0, react_1.createElement)("span", null, "Canl\u0131 tahsilat"),
                        (0, react_1.createElement)("strong", null, "Kapal\u0131"),
                        (0, react_1.createElement)("small", null, "Finansal i\u015Flem yap\u0131lmaz"))),
                (0, react_1.createElement)("div", { className: "studio-top" },
                    (0, react_1.createElement)("h2", null, "\u00DCretim provas\u0131"),
                    (0, react_1.createElement)("button", { className: "button", disabled: this.state.jobs.length >= 5, onClick: () => this.setState(s => ({ jobs: [...s.jobs, { id: 'DEMO-' + String(s.jobs.length + 1).padStart(3, '0'), product: data_1.products[s.jobs.length % 4].name, stage: 0, spec: '180 × 90 × 75 cm / örnek çizim v1' }] })) },
                        "\u00D6rnek i\u015F kart\u0131 olu\u015Ftur ",
                        (0, react_1.createElement)(ui_1.Icon, { name: "plus" }))),
                !this.state.jobs.length ? (0, react_1.createElement)("div", { className: "empty-state" },
                    (0, react_1.createElement)(ui_1.Icon, { name: "grid", size: 32 }),
                    (0, react_1.createElement)("h3", null, "Hen\u00FCz demo i\u015F kart\u0131 yok."),
                    (0, react_1.createElement)("p", null, "\u00D6rnek kart olu\u015Fturup \u00FCretim a\u015Famalar\u0131n\u0131 deneyebilirsiniz. Ger\u00E7ek sipari\u015F a\u00E7\u0131lmaz.")) : (0, react_1.createElement)("div", { className: "job-grid" }, this.state.jobs.map(j => (0, react_1.createElement)("article", { key: j.id, className: "job-card" },
                    (0, react_1.createElement)(ui_1.Eyebrow, null,
                        j.id,
                        " / SENTET\u0130K VER\u0130"),
                    (0, react_1.createElement)("h3", null, j.product),
                    (0, react_1.createElement)("p", null, j.spec),
                    (0, react_1.createElement)("span", { className: "status-tag" }, stages[j.stage]),
                    (0, react_1.createElement)("div", { className: "job-track" }, stages.map((s, i) => (0, react_1.createElement)("span", { key: s, title: s, className: i <= j.stage ? 'complete' : '' }))),
                    (0, react_1.createElement)("div", { className: "action-row" },
                        (0, react_1.createElement)("button", { className: "text-link", disabled: j.stage === 0, onClick: () => this.setState(s => ({ jobs: s.jobs.map(x => x.id === j.id ? { ...x, stage: x.stage - 1 } : x) })) }, "Geri"),
                        (0, react_1.createElement)("button", { className: "text-link", disabled: j.stage === 5, onClick: () => this.setState(s => ({ jobs: s.jobs.map(x => x.id === j.id ? { ...x, stage: x.stage + 1 } : x) })) },
                            "Sonraki a\u015Fama ",
                            (0, react_1.createElement)(ui_1.Icon, { size: 18 }))))))),
            (0, react_1.createElement)("div", { className: "note-box" },
                (0, react_1.createElement)(ui_1.Icon, { name: "info" }),
                (0, react_1.createElement)("p", null, "Bu prova verileri sayfadan \u00E7\u0131k\u0131nca silinir. \u00DCretim sunucusu, \u00F6deme do\u011Frulamas\u0131, stok rezervasyonu, ger\u00E7ek e-posta ve yetki kontrol\u00FC bu pakette tamamlanm\u0131\u015F olarak sunulmaz.")))); }
}
exports.Studio = Studio;

},
"react":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = exports.isValidElement = void 0;
exports.render = N;
exports.hydrate = O;
exports.createElement = a;
exports.h = a;
exports.Fragment = y;
exports.createRef = h;
exports.Component = p;
exports.cloneElement = S;
exports.createContext = q;
exports.toChildArray = w;
// Preact, MIT License
var n, l, u, i, t, o, r = {}, f = [], e = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
function c(e, n) { for (var t in n)
    e[t] = n[t]; return e; }
function s(e) { var n = e.parentNode; n && n.removeChild(e); }
function a(e, n, t) { var _, l, o, r = arguments, i = {}; for (o in n)
    "key" == o ? _ = n[o] : "ref" == o ? l = n[o] : i[o] = n[o]; if (arguments.length > 3)
    for (t = [t], o = 3; o < arguments.length; o++)
        t.push(r[o]); if (null != t && (i.children = t), "function" == typeof e && null != e.defaultProps)
    for (o in e.defaultProps)
        void 0 === i[o] && (i[o] = e.defaultProps[o]); return v(e, i, _, l, null); }
function v(e, t, _, l, o) { var r = { type: e, props: t, key: _, ref: l, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, __h: null, constructor: void 0, __v: null == o ? ++n.__v : o }; return null != n.vnode && n.vnode(r), r; }
function h() { return { current: null }; }
function y(e) { return e.children; }
function p(e, n) { this.props = e, this.context = n; }
function d(e, n) { if (null == n)
    return e.__ ? d(e.__, e.__.__k.indexOf(e) + 1) : null; for (var t; n < e.__k.length; n++)
    if (null != (t = e.__k[n]) && null != t.__e)
        return t.__e; return "function" == typeof e.type ? d(e) : null; }
function _(e) { var n, t; if (null != (e = e.__) && null != e.__c) {
    for (e.__e = e.__c.base = null, n = 0; n < e.__k.length; n++)
        if (null != (t = e.__k[n]) && null != t.__e) {
            e.__e = e.__c.base = t.__e;
            break;
        }
    return _(e);
} }
function k(e) { (!e.__d && (e.__d = !0) && u.push(e) && !b.__r++ || t !== n.debounceRendering) && ((t = n.debounceRendering) || i)(b); }
function b() { for (var e; b.__r = u.length;)
    e = u.sort(function (e, n) { return e.__v.__b - n.__v.__b; }), u = [], e.some(function (e) { var n, t, l, o, r, i; e.__d && (r = (o = (n = e).__v).__e, (i = n.__P) && (t = [], (l = c({}, o)).__v = o.__v + 1, I(i, o, l, n.__n, void 0 !== i.ownerSVGElement, null != o.__h ? [r] : null, t, null == r ? d(o) : r, o.__h), T(t, o), o.__e != r && _(o))); }); }
function m(e, n, t, _, l, o, i, u, s, c) { var p, a, h, m, k, b, C, P = _ && _.__k || f, S = P.length; for (t.__k = [], p = 0; p < n.length; p++)
    if (null != (m = t.__k[p] = null == (m = n[p]) || "boolean" == typeof m ? null : "string" == typeof m || "number" == typeof m || "bigint" == typeof m ? v(null, m, null, null, m) : Array.isArray(m) ? v(y, { children: m }, null, null, null) : m.__b > 0 ? v(m.type, m.props, m.key, null, m.__v) : m)) {
        if (m.__ = t, m.__b = t.__b + 1, null === (h = P[p]) || h && m.key == h.key && m.type === h.type)
            P[p] = void 0;
        else
            for (a = 0; a < S; a++) {
                if ((h = P[a]) && m.key == h.key && m.type === h.type) {
                    P[a] = void 0;
                    break;
                }
                h = null;
            }
        I(e, m, h = h || r, l, o, i, u, s, c), k = m.__e, (a = m.ref) && h.ref != a && (C || (C = []), h.ref && C.push(h.ref, null, m), C.push(a, m.__c || k, m)), null != k ? (null == b && (b = k), "function" == typeof m.type && null != m.__k && m.__k === h.__k ? m.__d = s = g(m, s, e) : s = x(e, m, h, P, k, s), c || "option" !== t.type ? "function" == typeof t.type && (t.__d = s) : e.value = "") : s && h.__e == s && s.parentNode != e && (s = d(h));
    } for (t.__e = b, p = S; p--;)
    null != P[p] && ("function" == typeof t.type && null != P[p].__e && P[p].__e == t.__d && (t.__d = d(_, p + 1)), L(P[p], P[p])); if (C)
    for (p = 0; p < C.length; p++)
        z(C[p], C[++p], C[++p]); }
function g(e, n, t) { var _, l; for (_ = 0; _ < e.__k.length; _++)
    (l = e.__k[_]) && (l.__ = e, n = "function" == typeof l.type ? g(l, n, t) : x(t, l, l, e.__k, l.__e, n)); return n; }
function w(e, n) { return n = n || [], null == e || "boolean" == typeof e || (Array.isArray(e) ? e.some(function (e) { w(e, n); }) : n.push(e)), n; }
function x(e, n, t, _, l, o) { var r, i, u; if (void 0 !== n.__d)
    r = n.__d, n.__d = void 0;
else if (null == t || l != o || null == l.parentNode)
    e: if (null == o || o.parentNode !== e)
        e.appendChild(l), r = null;
    else {
        for (i = o, u = 0; (i = i.nextSibling) && u < _.length; u += 2)
            if (i == l)
                break e;
        e.insertBefore(l, o), r = o;
    } return void 0 !== r ? r : l.nextSibling; }
function A(e, n, t, _, l) { var o; for (o in t)
    "children" === o || "key" === o || o in n || C(e, o, null, t[o], _); for (o in n)
    l && "function" != typeof n[o] || "children" === o || "key" === o || "value" === o || "checked" === o || t[o] === n[o] || C(e, o, n[o], t[o], _); }
function P(n, t, _) { "-" === t[0] ? n.setProperty(t, _) : n[t] = null == _ ? "" : "number" != typeof _ || e.test(t) ? _ : _ + "px"; }
function C(e, n, t, _, l) { var o; e: if ("style" === n)
    if ("string" == typeof t)
        e.style.cssText = t;
    else {
        if ("string" == typeof _ && (e.style.cssText = _ = ""), _)
            for (n in _)
                t && n in t || P(e.style, n, "");
        if (t)
            for (n in t)
                _ && t[n] === _[n] || P(e.style, n, t[n]);
    }
else if ("o" === n[0] && "n" === n[1])
    o = n !== (n = n.replace(/Capture$/, "")), n = n.toLowerCase() in e ? n.toLowerCase().slice(2) : n.slice(2), e.l || (e.l = {}), e.l[n + o] = t, t ? _ || e.addEventListener(n, o ? H : $, o) : e.removeEventListener(n, o ? H : $, o);
else if ("dangerouslySetInnerHTML" !== n) {
    if (l)
        n = n.replace(/xlink[H:h]/, "h").replace(/sName$/, "s");
    else if ("href" !== n && "list" !== n && "form" !== n && "tabIndex" !== n && "download" !== n && n in e)
        try {
            e[n] = null == t ? "" : t;
            break e;
        }
        catch (e) { }
    "function" == typeof t || (null != t && (!1 !== t || "a" === n[0] && "r" === n[1]) ? e.setAttribute(n, t) : e.removeAttribute(n));
} }
function $(e) { this.l[e.type + !1](n.event ? n.event(e) : e); }
function H(e) { this.l[e.type + !0](n.event ? n.event(e) : e); }
function I(e, t, _, l, o, r, i, u, s) { var f, a, d, h, v, k, g, b, C, x, P, S = t.type; if (void 0 !== t.constructor)
    return null; null != _.__h && (s = _.__h, u = t.__e = _.__e, t.__h = null, r = [u]), (f = n.__b) && f(t); try {
    e: if ("function" == typeof S) {
        if (b = t.props, C = (f = S.contextType) && l[f.__c], x = f ? C ? C.props.value : f.__ : l, _.__c ? g = (a = t.__c = _.__c).__ = a.__E : ("prototype" in S && S.prototype.render ? t.__c = a = new S(b, x) : (t.__c = a = new p(b, x), a.constructor = S, a.render = M), C && C.sub(a), a.props = b, a.state || (a.state = {}), a.context = x, a.__n = l, d = a.__d = !0, a.__h = []), null == a.__s && (a.__s = a.state), null != S.getDerivedStateFromProps && (a.__s == a.state && (a.__s = c({}, a.__s)), c(a.__s, S.getDerivedStateFromProps(b, a.__s))), h = a.props, v = a.state, d)
            null == S.getDerivedStateFromProps && null != a.componentWillMount && a.componentWillMount(), null != a.componentDidMount && a.__h.push(a.componentDidMount);
        else {
            if (null == S.getDerivedStateFromProps && b !== h && null != a.componentWillReceiveProps && a.componentWillReceiveProps(b, x), !a.__e && null != a.shouldComponentUpdate && !1 === a.shouldComponentUpdate(b, a.__s, x) || t.__v === _.__v) {
                a.props = b, a.state = a.__s, t.__v !== _.__v && (a.__d = !1), a.__v = t, t.__e = _.__e, t.__k = _.__k, t.__k.forEach(function (e) { e && (e.__ = t); }), a.__h.length && i.push(a);
                break e;
            }
            null != a.componentWillUpdate && a.componentWillUpdate(b, a.__s, x), null != a.componentDidUpdate && a.__h.push(function () { a.componentDidUpdate(h, v, k); });
        }
        a.context = x, a.props = b, a.state = a.__s, (f = n.__r) && f(t), a.__d = !1, a.__v = t, a.__P = e, f = a.render(a.props, a.state, a.context), a.state = a.__s, null != a.getChildContext && (l = c(c({}, l), a.getChildContext())), d || null == a.getSnapshotBeforeUpdate || (k = a.getSnapshotBeforeUpdate(h, v)), P = null != f && f.type === y && null == f.key ? f.props.children : f, m(e, Array.isArray(P) ? P : [P], t, _, l, o, r, i, u, s), a.base = t.__e, t.__h = null, a.__h.length && i.push(a), g && (a.__E = a.__ = null), a.__e = !1;
    }
    else
        null == r && t.__v === _.__v ? (t.__k = _.__k, t.__e = _.__e) : t.__e = j(_.__e, t, _, l, o, r, i, s);
    (f = n.diffed) && f(t);
}
catch (e) {
    t.__v = null, (s || null != r) && (t.__e = u, t.__h = !!s, r[r.indexOf(u)] = null), n.__e(e, t, _);
} }
function T(e, t) { n.__c && n.__c(t, e), e.some(function (t) { try {
    e = t.__h, t.__h = [], e.some(function (e) { e.call(t); });
}
catch (e) {
    n.__e(e, t.__v);
} }); }
function j(e, n, t, _, l, o, i, u) { var c, p, a, d, h = t.props, v = n.props, y = n.type, k = 0; if ("svg" === y && (l = !0), null != o)
    for (; k < o.length; k++)
        if ((c = o[k]) && (c === e || (y ? c.localName == y : 3 == c.nodeType))) {
            e = c, o[k] = null;
            break;
        } if (null == e) {
    if (null === y)
        return document.createTextNode(v);
    e = l ? document.createElementNS("http://www.w3.org/2000/svg", y) : document.createElement(y, v.is && v), o = null, u = !1;
} if (null === y)
    h === v || u && e.data === v || (e.data = v);
else {
    if (o = o && f.slice.call(e.childNodes), p = (h = t.props || r).dangerouslySetInnerHTML, a = v.dangerouslySetInnerHTML, !u) {
        if (null != o)
            for (h = {}, d = 0; d < e.attributes.length; d++)
                h[e.attributes[d].name] = e.attributes[d].value;
        (a || p) && (a && (p && a.__html == p.__html || a.__html === e.innerHTML) || (e.innerHTML = a && a.__html || ""));
    }
    if (A(e, v, h, l, u), a)
        n.__k = [];
    else if (k = n.props.children, m(e, Array.isArray(k) ? k : [k], n, t, _, l && "foreignObject" !== y, o, i, e.firstChild, u), null != o)
        for (k = o.length; k--;)
            null != o[k] && s(o[k]);
    u || ("value" in v && void 0 !== (k = v.value) && (k !== e.value || "progress" === y && !k) && C(e, "value", k, h.value, !1), "checked" in v && void 0 !== (k = v.checked) && k !== e.checked && C(e, "checked", k, h.checked, !1));
} return e; }
function z(e, t, _) { try {
    "function" == typeof e ? e(t) : e.current = t;
}
catch (e) {
    n.__e(e, _);
} }
function L(e, t, _) { var l, o, r; if (n.unmount && n.unmount(e), (l = e.ref) && (l.current && l.current !== e.__e || z(l, null, t)), _ || "function" == typeof e.type || (_ = null != (o = e.__e)), e.__e = e.__d = void 0, null != (l = e.__c)) {
    if (l.componentWillUnmount)
        try {
            l.componentWillUnmount();
        }
        catch (e) {
            n.__e(e, t);
        }
    l.base = l.__P = null;
} if (l = e.__k)
    for (r = 0; r < l.length; r++)
        l[r] && L(l[r], t, _); null != o && s(o); }
function M(e, n, t) { return this.constructor(e, t); }
function N(e, t, _) { var l, o, i; n.__ && n.__(e, t), o = (l = "function" == typeof _) ? null : _ && _.__k || t.__k, i = [], I(t, e = (!l && _ || t).__k = a(y, null, [e]), o || r, r, void 0 !== t.ownerSVGElement, !l && _ ? [_] : o ? null : t.firstChild ? f.slice.call(t.childNodes) : null, i, !l && _ ? _ : o ? o.__e : t.firstChild, l), T(i, e); }
function O(e, n) { N(e, n, O); }
function S(e, n, t) { var _, l, o, r = arguments, i = c({}, e.props); for (o in n)
    "key" == o ? _ = n[o] : "ref" == o ? l = n[o] : i[o] = n[o]; if (arguments.length > 3)
    for (t = [t], o = 3; o < arguments.length; o++)
        t.push(r[o]); return null != t && (i.children = t), v(e.type, i, _ || e.key, l || e.ref, null); }
function q(e, n) { var t = { __c: n = "__cC" + o++, __: e, Consumer: function (e, n) { return e.children(n); }, Provider: function (e) { var t, _; return this.getChildContext || (t = [], (_ = {})[n] = this, this.getChildContext = function () { return _; }, this.shouldComponentUpdate = function (e) { this.props.value !== e.value && t.some(k); }, this.sub = function (e) { t.push(e); var n = e.componentWillUnmount; e.componentWillUnmount = function () { t.splice(t.indexOf(e), 1), n && n.call(e); }; }), e.children; } }; return t.Provider.__ = t.Consumer.contextType = t; }
exports.options = n = { __e: function (e, n) { for (var t, _, l; n = n.__;)
        if ((t = n.__c) && !t.__)
            try {
                if ((_ = t.constructor) && null != _.getDerivedStateFromError && (t.setState(_.getDerivedStateFromError(e)), l = t.__d), null != t.componentDidCatch && (t.componentDidCatch(e), l = t.__d), l)
                    return t.__E = t;
            }
            catch (n) {
                e = n;
            } throw e; }, __v: 0 }, exports.isValidElement = l = function (e) { return null != e && void 0 === e.constructor; }, p.prototype.setState = function (e, n) { var t; t = null != this.__s && this.__s !== this.state ? this.__s : this.__s = c({}, this.state), "function" == typeof e && (e = e(c({}, t), this.props)), e && c(t, e), null != e && this.__v && (n && this.__h.push(n), k(this)); }, p.prototype.forceUpdate = function (e) { this.__v && (this.__e = !0, e && this.__h.push(e), k(this)); }, p.prototype.render = y, u = [], i = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, b.__r = 0, o = 0;

},
"react-dom/client":function(module,exports,require){
exports.createRoot=(root)=>({render:(node)=>require('react').render(node,root)});
}};Object.assign(modules,{"src/App":function(module,exports,require){
'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const data_1 = require("./lib/data");
const domain_1 = require("./lib/domain");
const ui_1 = require("./components/ui");
const DesignDesk_1 = require("./pages/DesignDesk");
const Home_1 = require("./pages/Home");
const Catalog_1 = require("./pages/Catalog");
const Editorial_1 = require("./pages/Editorial");
const Quote_1 = require("./pages/Quote");
const Commerce_1 = require("./pages/Commerce");
const Studio_1 = require("./pages/Studio");
const routes_1 = require("./lib/routes");
class App extends react_1.Component {
    constructor(props) {
        super(props);
        this.currentLocation = () => { const path = window.__ELIF_PREVIEW__ ? (window.location.hash.slice(1) || '/') : (window.location.pathname.replace(/\/+$/, '') || '/') + window.location.search; return path.startsWith('/') ? path : '/'; };
        this.onLocation = () => { this.setState({ path: this.currentLocation(), menu: false, search: false }, this.afterRoute); };
        this.afterRoute = () => { document.title = (0, routes_1.pageTitle)(this.state.path); window.scrollTo({ top: 0, behavior: 'instant' }); };
        this.navigate = (path) => {
            if (path === this.state.path) {
                this.setState({ menu: false, search: false });
                return;
            }
            history.pushState({}, '', (0, domain_1.publicHref)(path));
            this.setState({ path, menu: false, search: false, searchQuery: '' }, () => { this.afterRoute(); setTimeout(() => document.querySelector('main')?.focus({ preventScroll: true }), 50); });
        };
        this.notify = (toast) => {
            if (this.timer)
                clearTimeout(this.timer);
            this.setState({ toast });
            this.timer = setTimeout(() => this.setState({ toast: '' }), 5500);
        };
        this.favorite = (id) => { const exists = this.state.favorites.includes(id); const favorites = exists ? this.state.favorites.filter(x => x !== id) : [...this.state.favorites, id]; this.setState({ favorites }); const stored = (0, domain_1.writeLocal)('favorites', favorites); this.notify(exists ? 'Çalışma dosyanızdan çıkarıldı.' : stored ? 'Bu cihazdaki çalışma dosyanıza kaydedildi.' : 'Bu açık sayfada kaydedildi. Tarayıcı kalıcı depolamaya izin vermedi.'); };
        this.addCart = (p, material, size, quantity) => {
            if (p.price === null || !(0, domain_1.validQuantity)(quantity) || !p.sizes.includes(size) || !['Ceviz', 'Meşe'].includes(material))
                return;
            const key = (0, domain_1.cartKey)(p.id, material, size), old = this.state.cart.find(l => l.key === key);
            if (old && old.quantity + quantity > 100) {
                this.notify('Bir satırda en fazla 100 adet seçilebilir.');
                return;
            }
            const cart = old ? this.state.cart.map(l => l.key === key ? { ...l, quantity: l.quantity + quantity } : l) : [...this.state.cart, { key, id: p.id, material, size, quantity, unitMinor: p.price + Math.max(0, p.sizes.indexOf(size)) * 700000 }];
            this.setState({ cart });
            const stored = (0, domain_1.writeLocal)('cart', cart);
            this.notify(p.name + ' örnek sepete eklendi. ' + (stored ? 'Gerçek sipariş oluşturulmadı.' : 'Tarayıcı depolaması kapalı; yalnız bu açık sayfada tutuluyor.'));
        };
        this.changeCart = (key, quantity) => {
            if (!(0, domain_1.validQuantity)(quantity))
                return;
            const cart = this.state.cart.map(l => l.key === key ? { ...l, quantity } : l);
            this.setState({ cart });
            (0, domain_1.writeLocal)('cart', cart);
        };
        this.removeCart = (key) => { const cart = this.state.cart.filter(l => l.key !== key); this.setState({ cart }); (0, domain_1.writeLocal)('cart', cart); this.notify('Parça örnek sepetten çıkarıldı.'); };
        this.actions = () => ({ navigate: this.navigate, notify: this.notify, favorites: this.state.favorites, favorite: this.favorite, cart: this.state.cart, addCart: this.addCart, changeCart: this.changeCart, removeCart: this.removeCart, openInfo: () => this.setState({ info: true }) });
        this.state = { path: props.initialPath || '/', cart: [], favorites: [], menu: false, search: false, searchQuery: '', info: false, toast: '' };
    }
    componentDidMount() {
        let favorites = (0, domain_1.readLocal)('favorites', []), rawCart = (0, domain_1.readLocal)('cart', []);
        if (!Array.isArray(favorites))
            favorites = [];
        const cart = [];
        if (Array.isArray(rawCart))
            for (const l of rawCart) {
                const p = data_1.products.find(p => p.id === l?.id);
                if (p && p.price !== null && p.sizes.includes(l.size) && ['Ceviz', 'Meşe'].includes(l.material) && (0, domain_1.validQuantity)(l.quantity)) {
                    cart.push({ ...l, key: (0, domain_1.cartKey)(p.id, l.material, l.size), unitMinor: p.price + Math.max(0, p.sizes.indexOf(l.size)) * 700000 });
                }
            }
        this.setState({ path: this.currentLocation(), favorites: [...new Set(favorites.filter(id => data_1.products.some(p => p.id === id)))], cart }, this.afterRoute);
        window.addEventListener('hashchange', this.onLocation);
        window.addEventListener('popstate', this.onLocation);
    }
    componentWillUnmount() {
        window.removeEventListener('hashchange', this.onLocation);
        window.removeEventListener('popstate', this.onLocation);
        if (this.timer)
            clearTimeout(this.timer);
    }
    renderPage() {
        const a = this.actions(), [path, qs = ''] = this.state.path.split('?'), params = new URLSearchParams(qs);
        if (path === '/')
            return (0, react_1.createElement)(Home_1.Home, { ...a });
        if (path === '/tasarim-masasi')
            return (0, react_1.createElement)(DesignDesk_1.DesignDesk, { key: this.state.path, ...a, query: qs });
        if (path === '/urunler')
            return (0, react_1.createElement)(Catalog_1.Catalog, { key: this.state.path, ...a, initialCategory: data_1.categories.some(c => c.id === params.get('alan')) ? params.get('alan') : 'all' });
        if (path.startsWith('/urun/')) {
            const p = data_1.products.find(p => '/urun/' + p.id === path);
            if (p)
                return (0, react_1.createElement)(Catalog_1.ProductPage, { key: p.id, ...a, product: p });
        }
        const pages = { '/atolyemiz': Editorial_1.Atelier, '/ozel-uretim': Editorial_1.Bespoke, '/malzemeler': Editorial_1.Materials, '/mekan-fikirleri': Editorial_1.Ideas, '/rehber': Editorial_1.Journal, '/sikca-sorulan-sorular': Editorial_1.FAQ, '/iletisim': Commerce_1.Contact, '/sepet': Commerce_1.Cart, '/odeme': Commerce_1.Checkout, '/calisma-dosyam': Commerce_1.Saved, '/gizlilik': Editorial_1.Privacy, '/atolye-demolari': Studio_1.Studio };
        if (path === '/teklif-al')
            return (0, react_1.createElement)(Quote_1.Quote, { key: this.state.path, ...a, productId: params.get('urun') || undefined, query: qs });
        if (path.startsWith('/mekan-fikirleri/') && data_1.ideas.some(i => '/mekan-fikirleri/' + i.id === path))
            return (0, react_1.createElement)(Editorial_1.Ideas, { ...a, slug: path.split('/').pop() });
        if (path.startsWith('/rehber/') && data_1.journal.some(i => '/rehber/' + i.id === path))
            return (0, react_1.createElement)(Editorial_1.Journal, { ...a, slug: path.split('/').pop() });
        const Page = pages[path];
        if (Page)
            return (0, react_1.createElement)(Page, { key: path, ...a });
        return (0, react_1.createElement)("section", { className: "wrap empty-state missing-page" },
            (0, react_1.createElement)(ui_1.Eyebrow, null, "404 / B\u0130R YOL AYRIMI"),
            (0, react_1.createElement)("h1", null,
                "Bu sayfay\u0131",
                (0, react_1.createElement)("br", null),
                (0, react_1.createElement)("em", null, "bulamad\u0131k.")),
            (0, react_1.createElement)("p", null, "Koleksiyona veya at\u00F6lyenin ana sayfas\u0131na d\u00F6nebilirsiniz."),
            (0, react_1.createElement)(ui_1.ButtonLink, { to: "/", navigate: this.navigate }, "At\u00F6lyeye d\u00F6n"));
    }
    render() {
        const s = this.state, a = this.actions(), count = s.cart.reduce((n, l) => n + l.quantity, 0);
        const nav = (to, label) => (0, react_1.createElement)(ui_1.Link, { key: to, to: to, navigate: this.navigate, "aria-current": s.path.split('?')[0] === to ? 'page' : undefined }, label);
        const results = data_1.products.filter(p => (0, domain_1.searchKey)(p.name + ' ' + p.categoryLabel + ' ' + p.material + ' ' + p.id + ' ' + p.category).includes((0, domain_1.searchKey)(s.searchQuery)));
        return (0, react_1.createElement)(react_1.Fragment, null,
            (0, react_1.createElement)("a", { href: "#main-content", className: "skip-link" }, "\u0130\u00E7eri\u011Fe ge\u00E7"),
            (0, react_1.createElement)("div", { className: "preview-bar" },
                (0, react_1.createElement)("span", null,
                    "TASARIM \u00D6N\u0130ZLEMES\u0130 ",
                    (0, react_1.createElement)("i", null),
                    " \u00D6rnek g\u00F6rseller ve \u00FCr\u00FCnler \u00B7 Canl\u0131 sat\u0131\u015F yok"),
                (0, react_1.createElement)("button", { onClick: () => this.setState({ info: true }) },
                    "Bu s\u00FCr\u00FCm hakk\u0131nda ",
                    (0, react_1.createElement)(ui_1.Icon, { name: "info", size: 14 }))),
            (0, react_1.createElement)("header", { className: 'site-header ' + (s.path === '/' ? 'home-header' : '') },
                (0, react_1.createElement)("div", { className: "header-inner" },
                    (0, react_1.createElement)("nav", { className: "nav-left", "aria-label": "Ana gezinme" },
                        nav('/urunler', 'Koleksiyon'),
                        nav('/ozel-uretim', 'Özel Üretim'),
                        nav('/atolyemiz', 'Atölyemiz')),
                    (0, react_1.createElement)("button", { className: "icon-button mobile-menu", "aria-label": "Men\u00FCy\u00FC a\u00E7", onClick: () => this.setState({ menu: true }) },
                        (0, react_1.createElement)(ui_1.Icon, { name: "menu", size: 25 })),
                    (0, react_1.createElement)(ui_1.Link, { to: "/", navigate: this.navigate, className: "brand", "aria-label": "Elif Tasar\u0131m ana sayfa" },
                        (0, react_1.createElement)("img", { src: (0, ui_1.image)('elif-amblem.png'), alt: "" }),
                        (0, react_1.createElement)("span", null,
                            "EL\u0130F TASARIM",
                            (0, react_1.createElement)("small", null, "EL YAPIMI MOB\u0130LYA AT\u00D6LYES\u0130"))),
                    (0, react_1.createElement)("div", { className: "nav-right" },
                        (0, react_1.createElement)("nav", { "aria-label": "Di\u011Fer sayfalar" },
                            nav('/malzemeler', 'Malzemeler'),
                            nav('/tasarim-masasi', 'Tasarım Masası')),
                        (0, react_1.createElement)("div", { className: "header-tools" },
                            (0, react_1.createElement)("button", { className: "icon-button", "aria-label": "Sitede ara", onClick: () => this.setState({ search: true }) },
                                (0, react_1.createElement)(ui_1.Icon, { name: "search" })),
                            (0, react_1.createElement)(ui_1.Link, { to: "/calisma-dosyam", navigate: this.navigate, className: "icon-button save-nav", "aria-label": 'Kaydedilenler, ' + s.favorites.length + ' ürün' },
                                (0, react_1.createElement)(ui_1.Icon, { name: "heart" }),
                                s.favorites.length > 0 && (0, react_1.createElement)("span", { className: "nav-dot" })),
                            (0, react_1.createElement)(ui_1.Link, { to: "/sepet", navigate: this.navigate, className: "icon-button cart-nav", "aria-label": 'Sepet, ' + count + ' ürün' },
                                (0, react_1.createElement)(ui_1.Icon, { name: "bag" }),
                                (0, react_1.createElement)("span", null, count)))))),
            (0, react_1.createElement)("main", { id: "main-content", tabIndex: -1, key: s.path.split('?')[0] }, this.renderPage()),
            (0, react_1.createElement)("footer", { className: "site-footer" },
                (0, react_1.createElement)("div", { className: "wrap" },
                    (0, react_1.createElement)("div", { className: "footer-top" },
                        (0, react_1.createElement)("div", null,
                            (0, react_1.createElement)(ui_1.Link, { to: "/", navigate: this.navigate, className: "brand footer-brand" },
                                (0, react_1.createElement)("img", { src: (0, ui_1.image)('elif-amblem-light.png'), alt: "" }),
                                (0, react_1.createElement)("span", null,
                                    "EL\u0130F TASARIM",
                                    (0, react_1.createElement)("small", null, "EL YAPIMI MOB\u0130LYA AT\u00D6LYES\u0130"))),
                            (0, react_1.createElement)("p", null,
                                "Zamana de\u011Fer",
                                (0, react_1.createElement)("br", null),
                                (0, react_1.createElement)("em", null, "katan mobilyalar."))),
                        (0, react_1.createElement)("div", { className: "footer-column" },
                            (0, react_1.createElement)("h2", null, "Ke\u015Ffedin"),
                            nav('/urunler', 'Koleksiyon'),
                            nav('/mekan-fikirleri', 'Mekân fikirleri'),
                            nav('/malzemeler', 'Malzemeler'),
                            nav('/calisma-dosyam', 'Kaydedilenler')),
                        (0, react_1.createElement)("div", { className: "footer-column" },
                            (0, react_1.createElement)("h2", null, "At\u00F6lye"),
                            nav('/atolyemiz', 'Hikâyemiz'),
                            nav('/ozel-uretim', 'Nasıl çalışıyoruz?'),
                            nav('/rehber', 'Atölye notları'),
                            nav('/sikca-sorulan-sorular', 'Sorular')),
                        (0, react_1.createElement)("div", { className: "footer-column footer-contact" },
                            (0, react_1.createElement)("h2", null, "Birlikte ba\u015Flayal\u0131m"),
                            (0, react_1.createElement)("p", null,
                                "\u0130stanbul, T\u00FCrkiye",
                                (0, react_1.createElement)("br", null),
                                "Do\u011Frudan at\u00F6lyeden, sizin i\u00E7in."),
                            (0, react_1.createElement)(ui_1.TextLink, { to: "/teklif-al", navigate: this.navigate, light: true }, "\u00D6zel \u00F6l\u00E7\u00FC st\u00FCdyosu"),
                            nav('/iletisim', 'İletişim'))),
                    (0, react_1.createElement)("div", { className: "footer-wordmark", "aria-hidden": "true" },
                        "elif tasar\u0131m",
                        (0, react_1.createElement)("span", null, "AT\u00D6LYE")),
                    (0, react_1.createElement)("div", { className: "footer-bottom" },
                        (0, react_1.createElement)("span", null, "EL\u0130F TASARIM \u00B7 TASARIM \u00D6N\u0130ZLEMES\u0130 / 2026"),
                        (0, react_1.createElement)("div", null,
                            nav('/gizlilik', 'Önizleme gizliliği'),
                            (0, react_1.createElement)("button", { onClick: () => this.setState({ info: true }) }, "Depolama tercihleri"),
                            nav('/atolye-demolari', 'Atölye demosu')),
                        (0, react_1.createElement)("span", null, "\u00D6zenle d\u00FC\u015F\u00FCn\u00FCl\u00FCr. At\u00F6lyede \u015Fekillenir.")),
                    (0, react_1.createElement)("p", { className: "footer-disclosure" }, "\u00DCr\u00FCn isimleri, fiyatlar, \u00F6l\u00E7\u00FCler ve g\u00F6rseller konsept ama\u00E7l\u0131d\u0131r. Ger\u00E7ek katalog, referans veya ticari taahh\u00FCt de\u011Fildir."))),
            s.menu && (0, react_1.createElement)(ui_1.Dialog, { title: "Elif Tasar\u0131m", onClose: () => this.setState({ menu: false }) },
                (0, react_1.createElement)("nav", { className: "mobile-links", "aria-label": "Mobil men\u00FC" }, [['/urunler', 'Koleksiyon'], ['/ozel-uretim', 'Özel Üretim'], ['/atolyemiz', 'Atölyemiz'], ['/mekan-fikirleri', 'Mekân Fikirleri'], ['/malzemeler', 'Malzemeler'], ['/tasarim-masasi', 'Tasarım Masası'], ['/rehber', 'Atölye Notları'], ['/iletisim', 'İletişim'], ['/teklif-al', 'Özel Ölçü Stüdyosu']].map(([p, label], i) => (0, react_1.createElement)(ui_1.Link, { key: p, to: p, navigate: this.navigate },
                    (0, react_1.createElement)("span", null,
                        "0",
                        i + 1),
                    label,
                    (0, react_1.createElement)(ui_1.Icon, { name: "diagonal" })))),
                (0, react_1.createElement)("div", { className: "mobile-menu-bottom" }, "\u0130STANBUL \u00B7 EL YAPIMI MOB\u0130LYA")),
            s.search && (0, react_1.createElement)(ui_1.Dialog, { title: "Koleksiyonda ara", onClose: () => this.setState({ search: false }) },
                (0, react_1.createElement)("label", { className: "search-dialog-input" },
                    (0, react_1.createElement)(ui_1.Icon, { name: "search" }),
                    (0, react_1.createElement)("input", { autoFocus: true, type: "search", placeholder: "Masa, ceviz, \u00E7al\u0131\u015Fma\u2026", "aria-label": "Arama kelimesi", value: s.searchQuery, onInput: e => this.setState({ searchQuery: e.currentTarget.value }) })),
                (0, react_1.createElement)("div", { className: "search-results", role: "region", "aria-live": "polite" }, results.length ? results.map(p => (0, react_1.createElement)(ui_1.Link, { key: p.id, to: '/urun/' + p.id, navigate: this.navigate },
                    (0, react_1.createElement)("img", { src: (0, ui_1.image)(p.image), alt: "" }),
                    (0, react_1.createElement)("span", null,
                        (0, react_1.createElement)("strong", null, p.name),
                        (0, react_1.createElement)("small", null,
                            p.categoryLabel,
                            " \u00B7 Konsept")),
                    (0, react_1.createElement)(ui_1.Icon, { name: "diagonal" }))) : (0, react_1.createElement)("p", { className: "empty-state" }, "Sonu\u00E7 bulunamad\u0131. Ba\u015Fka bir kelime deneyin.")),
                (0, react_1.createElement)(ui_1.TextLink, { to: "/urunler", navigate: this.navigate }, "T\u00FCm koleksiyona git")),
            s.info && (0, react_1.createElement)(ui_1.Dialog, { title: "Bu s\u00FCr\u00FCm hakk\u0131nda", onClose: () => this.setState({ info: false }) },
                (0, react_1.createElement)("div", { className: "info-dialog" },
                    (0, react_1.createElement)(ui_1.Eyebrow, null, "\u00C7ALI\u015EAN V\u0130TR\u0130N / YEREL \u00D6N\u0130ZLEME"),
                    (0, react_1.createElement)("p", null, "Bu site, Elif Tasar\u0131m i\u00E7in haz\u0131rlanan etkile\u015Fimli tasar\u0131m ve aray\u00FCz uygulamas\u0131d\u0131r. G\u00F6rseller, \u00FCr\u00FCn adlar\u0131, \u00F6l\u00E7\u00FCler ve fiyatlar \u00F6rnektir."),
                    (0, react_1.createElement)("h3", null, "Canl\u0131 i\u015Flem yap\u0131lmaz."),
                    (0, react_1.createElement)("p", null, "\u00D6deme, e-posta, kargo, m\u00FC\u015Fteri hesab\u0131 ve sunucu kay\u0131tlar\u0131 ba\u011Fl\u0131 de\u011Fildir. Formlar at\u00F6lyeye bilgi g\u00F6ndermez. \u0130\u015Flem \u00F6zetlerini kendi cihaz\u0131n\u0131za indirebilirsiniz."),
                    (0, react_1.createElement)("h3", null, "Yaln\u0131z gerekli yerel kay\u0131tlar."),
                    (0, react_1.createElement)("p", null, "\u00D6rnek sepet ve kaydedilenler 30 g\u00FCn; a\u00E7\u0131k\u00E7a kaydetti\u011Finiz \u00F6l\u00E7\u00FC tercihleri 7 g\u00FCn bu taray\u0131c\u0131da tutulur. \u0130leti\u015Fim, not ve foto\u011Fraflar tasla\u011Fa kaydedilmez. Analitik ve reklam takibi yoktur."),
                    (0, react_1.createElement)("button", { className: "button button-outline", onClick: () => {
                            if (window.confirm('Bu uygulamanın bu cihazdaki örnek sepeti, kaydedilenleri ve ölçü tercihleri silinsin mi?')) {
                                try {
                                    Object.keys(localStorage).filter(k => k.startsWith('elif-v2:')).forEach(k => localStorage.removeItem(k));
                                }
                                catch { }
                                this.setState({ cart: [], favorites: [], info: false });
                                this.notify('Bu uygulamanın bu cihazdaki kayıtları temizlendi.');
                            }
                        } },
                        "Bu cihazdaki Elif kay\u0131tlar\u0131n\u0131 sil ",
                        (0, react_1.createElement)(ui_1.Icon, { name: "close" })),
                    (0, react_1.createElement)(ui_1.Link, { to: "/gizlilik", navigate: p => { this.setState({ info: false }); this.navigate(p); }, className: "text-link" },
                        "Ayr\u0131nt\u0131l\u0131 a\u00E7\u0131klama ",
                        (0, react_1.createElement)(ui_1.Icon, null)))),
            s.toast && (0, react_1.createElement)("div", { className: "toast", role: "status" },
                (0, react_1.createElement)(ui_1.Icon, { name: "check" }),
                (0, react_1.createElement)("span", null, s.toast),
                (0, react_1.createElement)("button", { className: "icon-button", onClick: () => this.setState({ toast: '' }), "aria-label": "Bildirimi kapat" },
                    (0, react_1.createElement)(ui_1.Icon, { name: "close", size: 16 }))));
    }
}
exports.default = App;

},"src/lib/routes":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routePaths = void 0;
exports.pageTitle = pageTitle;
const data_1 = require("./data");
exports.routePaths = ['/', '/urunler', '/tasarim-masasi', '/atolyemiz', '/ozel-uretim', '/malzemeler', '/mekan-fikirleri', '/rehber', '/teklif-al', '/sikca-sorulan-sorular', '/iletisim', '/sepet', '/odeme', '/calisma-dosyam', '/gizlilik', '/atolye-demolari', ...data_1.products.map(p => '/urun/' + p.id), ...data_1.ideas.map(p => '/mekan-fikirleri/' + p.id), ...data_1.journal.map(p => '/rehber/' + p.id)];
function pageTitle(path) { const p = path.split('?')[0]; if (p === '/tasarim-masasi')
    return 'Tasarım Masası | Elif Tasarım'; const product = data_1.products.find(x => '/urun/' + x.id === p); const article = data_1.journal.find(x => '/rehber/' + x.id === p); const idea = data_1.ideas.find(x => '/mekan-fikirleri/' + x.id === p); return product ? product.name + ' | Elif Tasarım' : article ? article.title + ' | Elif Tasarım' : idea ? idea.name + ' | Elif Tasarım' : { '/': 'Elif Tasarım | El Yapımı Mobilya Atölyesi', '/urunler': 'Koleksiyon | Elif Tasarım', '/teklif-al': 'Özel Ölçü Stüdyosu | Elif Tasarım', '/atolyemiz': 'Atölyemiz | Elif Tasarım', '/malzemeler': 'Malzeme Kütüphanesi | Elif Tasarım', '/sepet': 'Örnek Sepet | Elif Tasarım', '/odeme': 'Sipariş Hazırlığı | Elif Tasarım', '/iletisim': 'İletişim | Elif Tasarım', '/rehber': 'Atölye Notları | Elif Tasarım', '/ozel-uretim': 'Özel Üretim | Elif Tasarım', '/mekan-fikirleri': 'Mekân Fikirleri | Elif Tasarım', '/calisma-dosyam': 'Kaydedilenler | Elif Tasarım', '/gizlilik': 'Önizleme Gizliliği | Elif Tasarım', '/sikca-sorulan-sorular': 'Sorular | Elif Tasarım', '/atolye-demolari': 'Atölye İş Akışı Demosu | Elif Tasarım' }[p] || 'Sayfa bulunamadı | Elif Tasarım'; }

},"src/lib/desk":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deskBases = exports.deskMaterials = exports.defaultDesk = void 0;
exports.deskFromParams = deskFromParams;
exports.deskQuery = deskQuery;
exports.deskSummary = deskSummary;
exports.tableGeometry = tableGeometry;
exports.defaultDesk = { width: 160, depth: 80, height: 75, material: 'ceviz', base: 'metal', view: 'perspective' };
exports.deskMaterials = { ceviz: { name: 'Ceviz', image: 'wood-walnut.webp', color: '#755039' }, mese: { name: 'Meşe', image: 'wood-oak.webp', color: '#bca077' }, kestane: { name: 'Kestane', image: 'wood-chestnut.webp', color: '#967452' } };
exports.deskBases = { wood: 'Ahşap ayak', metal: 'Metal taşıyıcı', adjustable: 'Yükseklik ayarlı' };
const inRange = (raw, min, max, fallback) => { if (raw === null || raw.trim() === '')
    return fallback; const n = Number(raw.replace(',', '.')); return Number.isFinite(n) && n >= min && n <= max ? Math.round(n) : fallback; };
function deskFromParams(p) { return { width: inRange(p.get('en'), 100, 240, 160), depth: inRange(p.get('derinlik'), 50, 100, 80), height: inRange(p.get('yukseklik'), 60, 125, 75), material: (['ceviz', 'mese', 'kestane'].includes(p.get('malzeme') || '') ? p.get('malzeme') : 'ceviz'), base: (['wood', 'metal', 'adjustable'].includes(p.get('ayak') || '') ? p.get('ayak') : 'metal'), view: 'perspective' }; }
function deskQuery(d) { return new URLSearchParams({ en: String(d.width), derinlik: String(d.depth), yukseklik: String(d.height), malzeme: d.material, ayak: d.base }).toString(); }
function deskSummary(d) { return ['ELİF TASARIM / TASARIM MASASI', 'Sipariş değildir. Üretilebilirlik, mekanizma ve son ölçüler atölye onayına bağlıdır.', 'Bu özet atölyeye gönderilmedi.', '', `Ölçü fikri: ${d.width} × ${d.depth} × ${d.height} cm`, `Malzeme fikri: ${exports.deskMaterials[d.material].name}`, `Taşıyıcı fikri: ${exports.deskBases[d.base]}`, 'Malzeme görüntüsü temsilidir. Masif veya kaplama tercihi, yüzey işlemi ve taşıma kapasitesi ayrıca değerlendirilir.'].join('\n'); }
function tableGeometry(d) {
    const scale = 1.55, cx = 370, cy = 334;
    const project = (x, y, z) => [cx + (x - y) * scale, cy + (x + y) * scale * .37 - z * scale];
    const w = d.width / 2, dep = d.depth / 2, h = d.height;
    return { top: [project(-w, -dep, h), project(w, -dep, h), project(w, dep, h), project(-w, dep, h)], project, w, dep, h };
}

},"src/pages/Home":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Home = void 0;
const react_1 = require("react");
const DesignDesk_1 = require("./DesignDesk");
const data_1 = require("../lib/data");
const ui_1 = require("../components/ui");
const scenes = [
    { image: 'dining.webp', title: 'Bir masanın etrafında.', label: 'Yemek sahnesi', type: 'BİRLİKTE GEÇEN ZAMAN', path: '/mekan-fikirleri/bir-masanin-etrafinda' },
    { image: 'office.webp', title: 'Kendinize ait bir köşe.', label: 'Çalışma sahnesi', type: 'KENDİNİZE AYIRDIĞINIZ ZAMAN', path: '/mekan-fikirleri/kendinize-ait-bir-kose' },
    { image: 'sideboard.webp', title: 'Gündeliğin içindeki ritim.', label: 'Yaşam sahnesi', type: 'YAŞAMIN KÜÇÜK AYRINTILARI', path: '/mekan-fikirleri/sakin-bir-ritim' }
];
const details = [
    { label: '01 Form detayını keşfet', title: 'Bir çizginin kararı.', text: 'Bir kenarın dönüşü, parçanın mekânda bıraktığı boşluk. Tasarım, yalnız görüneni değil kullanımını da düşünmekle başlar.', image: 'chair.webp', tag: '01 / FORM', x: 27, y: 26 },
    { label: '02 Birleşim detayını keşfet', title: 'Bir arada, sağlam.', text: 'Birleşim yöntemi, malzeme ve kullanım ihtiyacına göre seçilir. Görüntünün ardındaki yapıyı da atölyeyle birlikte konuşuruz.', image: 'joinery.webp', tag: '02 / BİRLEŞİM', x: 52, y: 51 },
    { label: '03 Yüzey detayını keşfet', title: 'Dokunduğunuz son katman.', text: 'Doku, renk ve yüzey işlemi ayrı kararlardır. Son görünümü bir ekran görüntüsüyle değil, mümkün olduğunda gerçek bir numuneyle netleştiririz.', image: 'wood-walnut.webp', tag: '03 / YÜZEY', x: 76, y: 73 }
];
const steps = [
    { label: '01 Bir fikirle başlar', title: 'Bir fikirle başlar.', text: 'Ölçünüz, bir referansınız ya da yalnızca bir ihtiyacınız olabilir. Önce parçanın hayatınızda nasıl bir yer bulacağını konuşuruz.', image: 'sketch.webp' },
    { label: '02 Birlikte netleşir', title: 'Birlikte netleşir.', text: 'Ölçü, malzeme, iş kapsamı ve teslim yaklaşımı birlikte belirlenir. Teklif ve çizim onaylanmadan üretim kararı verilmez.', image: 'joinery.webp' },
    { label: '03 Atölyede şekillenir', title: 'Atölyede şekillenir.', text: 'Onaylanan tasarım, atölyedeki çalışmanın rehberi olur. Üretim ayrıntıları ve süreç, işin gerçek kapsamına göre takip edilir.', image: 'craft.webp' },
    { label: '04 Yaşamınıza katılır', title: 'Yaşamınıza katılır.', text: 'Teslim ve gerekiyorsa montaj birlikte planlanır. Parçanın gerçek malzemesine uygun bakım bilgileri de bu yolculuğun parçasıdır.', image: 'dining.webp' }
];
class Home extends react_1.Component {
    constructor() {
        super(...arguments);
        this.state = { scene: 0, detail: 1, material: 0, step: 0, width: 180, briefMaterial: 0 };
        this.root = null;
        this.observer = null;
    }
    componentDidMount() {
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
            this.observer = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) {
                e.target.classList.add('is-visible');
                this.observer?.unobserve(e.target);
            } }), { threshold: .07 });
            this.root?.querySelectorAll('[data-reveal]').forEach(el => { el.classList.add('reveal-ready'); this.observer?.observe(el); });
        }
    }
    componentWillUnmount() { this.observer?.disconnect(); }
    nextTab(e, current, count, kind) {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key))
            return;
        e.preventDefault();
        const next = e.key === 'Home' ? 0 : e.key === 'End' ? count - 1 : (current + (e.key === 'ArrowRight' ? 1 : count - 1)) % count;
        this.setState({ [kind]: next }, () => document.getElementById('v4-' + kind + '-' + next)?.focus());
    }
    render() {
        const a = this.props, s = this.state, scene = scenes[s.scene], detail = details[s.detail], mat = data_1.materials[s.material], step = steps[s.step], briefMat = data_1.materials[s.briefMaterial];
        const deskPath = '/tasarim-masasi?' + new URLSearchParams({ en: String(s.width), derinlik: '80', yukseklik: '75', malzeme: briefMat.id, ayak: 'adjustable' }).toString();
        return (0, react_1.createElement)("div", { className: "v4-home", ref: (el) => { this.root = el; } },
            (0, react_1.createElement)("section", { className: "v4-hero hero-editorial", "aria-roledescription": "Sahne se\u00E7imi" },
                (0, react_1.createElement)("div", { className: "v4-hero-photo", key: scene.image },
                    (0, react_1.createElement)("img", { "data-hero-image": true, src: (0, ui_1.image)(scene.image), alt: scene.title + ' Temsili mobilya ve mekân konsepti.', fetchPriority: "high", decoding: "async" })),
                (0, react_1.createElement)("div", { className: "v4-hero-veil" }),
                (0, react_1.createElement)("div", { className: "v4-hero-body wrap" },
                    (0, react_1.createElement)(ui_1.Eyebrow, null, "\u0130STANBUL / EL YAPIMI MOB\u0130LYA AT\u00D6LYES\u0130"),
                    (0, react_1.createElement)("h1", null,
                        (0, react_1.createElement)("span", null, "Zamana"),
                        ' ',
                        (0, react_1.createElement)("span", null, "de\u011Fer katan"),
                        ' ',
                        (0, react_1.createElement)("em", null, "mobilyalar.")),
                    (0, react_1.createElement)("p", null,
                        "Birlikte ge\u00E7irilen anlar, kendinize ay\u0131rd\u0131\u011F\u0131n\u0131z bir k\u00F6\u015Fe.",
                        (0, react_1.createElement)("br", { className: "desktop-only" }),
                        " Ya\u015Fam\u0131n\u0131za e\u015Flik eden par\u00E7alar, kendi at\u00F6lyemizden."),
                    (0, react_1.createElement)("div", { className: "v4-hero-actions" },
                        (0, react_1.createElement)(ui_1.ButtonLink, { to: "/urunler", navigate: a.navigate }, "Koleksiyonu ke\u015Ffet"),
                        (0, react_1.createElement)(ui_1.TextLink, { to: "/teklif-al", navigate: a.navigate }, "\u00D6zel \u00FCretim talebi"))),
                (0, react_1.createElement)("div", { className: "v4-hero-bottom wrap" },
                    (0, react_1.createElement)("div", { className: "v4-scene-controls", "aria-label": "Mek\u00E2n sahneleri" }, scenes.map((item, i) => (0, react_1.createElement)("button", { key: item.image, "aria-label": item.label, "aria-pressed": s.scene === i, onClick: () => this.setState({ scene: i }) },
                        (0, react_1.createElement)("span", null,
                            "0",
                            i + 1),
                        (0, react_1.createElement)("i", null)))),
                    (0, react_1.createElement)(ui_1.Link, { to: scene.path, navigate: a.navigate, className: "v4-scene-caption" },
                        (0, react_1.createElement)("span", null, scene.type),
                        (0, react_1.createElement)("strong", null, scene.title),
                        (0, react_1.createElement)(ui_1.Icon, { name: "diagonal" })),
                    (0, react_1.createElement)("button", { className: "v4-down", "aria-label": "At\u00F6lyeyi ke\u015Ffetmeye devam et", onClick: () => document.getElementById('v4-intro')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }) },
                        (0, react_1.createElement)(ui_1.Icon, { name: "down" }))),
                (0, react_1.createElement)("span", { className: "v4-image-note" }, "Temsili tasar\u0131m g\u00F6rselleri")),
            (0, react_1.createElement)("section", { className: "v4-values", id: "v4-intro", "aria-label": "At\u00F6lyenin yakla\u015F\u0131m\u0131" },
                (0, react_1.createElement)("div", { className: "wrap" }, [
                    ['leaf', 'Kendi atölyemizde', 'Hazır alıp satmak yerine üretiriz.'], ['hand', 'El işçiliği', 'Ayrıntıları birlikte düşünürüz.'], ['ruler', 'Ölçünüze özel', 'Mekânınızdan yola çıkarız.'], ['clock', 'Aileden gelen ustalık', 'Bildiğimiz işi özenle sürdürürüz.']
                ].map(([icon, title, desc]) => (0, react_1.createElement)("div", { className: "v4-value", key: title },
                    (0, react_1.createElement)(ui_1.Icon, { name: icon, size: 27 }),
                    (0, react_1.createElement)("h2", null, title),
                    (0, react_1.createElement)("p", null, desc))))),
            (0, react_1.createElement)("section", { className: "v4-intro wrap", "data-reveal": true },
                (0, react_1.createElement)("span", { className: "v4-index" },
                    "EL\u0130F TASARIM",
                    (0, react_1.createElement)("br", null),
                    "B\u0130R YA\u015EAMA B\u0130\u00C7\u0130M\u0130"),
                (0, react_1.createElement)("div", null,
                    (0, react_1.createElement)("h2", null,
                        "Bir mobilyadan fazlas\u0131.",
                        (0, react_1.createElement)("br", null),
                        (0, react_1.createElement)("em", null, "Hayat\u0131n i\u00E7inde bir yer.")),
                    (0, react_1.createElement)("p", null, "Uzayan bir sofray\u0131, sakin bir sabah\u0131, size ait bir \u00E7al\u0131\u015Fma k\u00F6\u015Fesini d\u00FC\u015F\u00FCn\u00FCn. Biz o ya\u015Fam\u0131n i\u00E7inde yerini bulacak par\u00E7ay\u0131, ihtiyac\u0131n\u0131zdan ba\u015Flayarak tasarlamak istiyoruz.")),
                (0, react_1.createElement)("span", { className: "v4-intro-mark", "aria-hidden": "true" },
                    (0, react_1.createElement)("img", { src: (0, ui_1.image)('elif-amblem.png'), alt: "" }))),
            (0, react_1.createElement)("section", { className: "v4-heritage", "data-reveal": true },
                (0, react_1.createElement)("div", { className: "v4-heritage-photo" },
                    (0, react_1.createElement)("img", { src: (0, ui_1.image)('craft.webp'), alt: "Marangozluk \u00E7al\u0131\u015Fmas\u0131n\u0131 anlatan temsili rende ve el g\u00F6rseli", loading: "lazy" }),
                    (0, react_1.createElement)("span", null, "USTALI\u011EIN \u0130Z\u0130NDE / TEMS\u0130L\u0130 G\u00D6RSEL"),
                    (0, react_1.createElement)("div", { className: "v4-photo-seal", "aria-hidden": "true" },
                        "EL EME\u011E\u0130",
                        (0, react_1.createElement)("br", null),
                        (0, react_1.createElement)("i", null, "bir iz b\u0131rak\u0131r."))),
                (0, react_1.createElement)("div", { className: "v4-heritage-copy" },
                    (0, react_1.createElement)(ui_1.Eyebrow, null, "01 / AT\u00D6LYEN\u0130N H\u0130K\u00C2YES\u0130"),
                    (0, react_1.createElement)("h2", null,
                        "Bir meslekten",
                        (0, react_1.createElement)("br", null),
                        "fazlas\u0131.",
                        (0, react_1.createElement)("br", null),
                        (0, react_1.createElement)("em", null, "Bir aile miras\u0131.")),
                    (0, react_1.createElement)("p", null, "Babadan \u00F6\u011Frenilen marangozluk bilgisi, yeni ku\u015Fa\u011F\u0131n tasar\u0131m anlay\u0131\u015F\u0131yla bulu\u015Fuyor. Elif Tasar\u0131m, kendi \u00FCr\u00FCnlerini kendi at\u00F6lyesinde \u00FCreten bir aile i\u015Fletmesi."),
                    (0, react_1.createElement)("p", null, "Her yeni i\u015Fte ayn\u0131 niyet var. \u0130htiyac\u0131 iyi anlamak, malzemeye dikkat etmek ve yap\u0131lan i\u015Fin arkas\u0131nda durmak."),
                    (0, react_1.createElement)(ui_1.TextLink, { to: "/atolyemiz", navigate: a.navigate }, "Hik\u00E2yemize yak\u0131ndan bak\u0131n")),
                (0, react_1.createElement)("div", { className: "v4-heritage-side" },
                    (0, react_1.createElement)("img", { src: (0, ui_1.image)('chair.webp'), alt: "Kavisli sandalye formu, tasar\u0131m konsepti", loading: "lazy" }),
                    (0, react_1.createElement)("span", null,
                        "AZ PAR\u00C7A.",
                        (0, react_1.createElement)("br", null),
                        "\u00C7OK KARAKTER."))),
            (0, react_1.createElement)("section", { className: "v4-rooms wrap", id: "koleksiyon", "data-reveal": true },
                (0, react_1.createElement)("div", { className: "v4-heading" },
                    (0, react_1.createElement)("div", null,
                        (0, react_1.createElement)(ui_1.Eyebrow, null, "02 / KOLEKS\u0130YON"),
                        (0, react_1.createElement)("h2", null, "Ya\u015Fam\u0131n her alan\u0131 i\u00E7in.")),
                    (0, react_1.createElement)("div", null,
                        (0, react_1.createElement)("p", null,
                            "Bir araya gelmek, dinlenmek, \u00FCretmek.",
                            (0, react_1.createElement)("br", null),
                            "Mek\u00E2n\u0131n\u0131z\u0131n ritminden ba\u015Flayan fikirler."),
                        (0, react_1.createElement)(ui_1.TextLink, { to: "/urunler", navigate: a.navigate }, "T\u00FCm par\u00E7alar"))),
                (0, react_1.createElement)("div", { className: "v4-room-grid" }, [
                    ['yemek', 'dining.webp', 'Bir araya gelmek.', 'Yemek alanı'], ['oturma', 'lounge.webp', 'Kendinize yer açmak.', 'Oturma alanı'], ['depolama', 'sideboard.webp', 'Sadeleşmek.', 'Depolama'], ['calisma', 'office.webp', 'Kendi ritmini bulmak.', 'Çalışma alanı']
                ].map(([id, img, title, category], i) => (0, react_1.createElement)(ui_1.Link, { key: id, to: '/urunler?alan=' + id, navigate: a.navigate, className: 'v4-room room-' + i },
                    (0, react_1.createElement)("img", { src: (0, ui_1.image)(img), alt: category + ', temsili mekân fikri', loading: "lazy" }),
                    (0, react_1.createElement)("div", null,
                        (0, react_1.createElement)("span", null,
                            "0",
                            i + 1,
                            " / ",
                            category),
                        (0, react_1.createElement)("h3", null, title),
                        (0, react_1.createElement)(ui_1.Icon, { name: "diagonal", size: 24 }))))),
                (0, react_1.createElement)("p", { className: "v4-small-note" }, "Bu se\u00E7ki, ger\u00E7ek \u00FCr\u00FCn katalo\u011Fu de\u011Fil tasar\u0131m y\u00F6n\u00FCn\u00FC g\u00F6steren konseptlerden olu\u015Fur.")),
            (0, react_1.createElement)("section", { className: "v4-craft", "data-reveal": true },
                (0, react_1.createElement)("div", { className: "wrap v4-craft-grid" },
                    (0, react_1.createElement)("div", { className: "v4-craft-copy" },
                        (0, react_1.createElement)(ui_1.Eyebrow, null, "03 / \u0130NCE \u0130\u015E\u00C7\u0130L\u0130K"),
                        (0, react_1.createElement)("h2", null,
                            "As\u0131l fark,",
                            (0, react_1.createElement)("br", null),
                            (0, react_1.createElement)("em", null, "ayr\u0131nt\u0131da sakl\u0131.")),
                        (0, react_1.createElement)("p", null,
                            "G\u00FCzel bir mobilya uzaktan fark edilir.",
                            (0, react_1.createElement)("br", null),
                            "\u00D6zenle d\u00FC\u015F\u00FCn\u00FClm\u00FC\u015F bir mobilya, yak\u0131ndan da anlatacak bir \u015Fey bulur."),
                        (0, react_1.createElement)("div", { id: "craft-detail", className: "v4-detail-copy", "aria-live": "polite" },
                            (0, react_1.createElement)("span", null, detail.tag),
                            (0, react_1.createElement)("h3", null, detail.title),
                            (0, react_1.createElement)("p", null, detail.text)),
                        (0, react_1.createElement)("div", { className: "v4-detail-selector", "aria-label": "\u0130\u015F\u00E7ilik ayr\u0131nt\u0131lar\u0131" }, details.map((d, i) => (0, react_1.createElement)("button", { key: d.label, "aria-label": d.label, "aria-pressed": s.detail === i, onClick: () => this.setState({ detail: i }) },
                            (0, react_1.createElement)("span", null,
                                "0",
                                i + 1),
                            ['Form', 'Birleşim', 'Yüzey'][i])))),
                    (0, react_1.createElement)("div", { className: "v4-craft-art" },
                        (0, react_1.createElement)("img", { src: (0, ui_1.image)(detail.image), alt: detail.title + ' Temsili ayrıntı çalışması.', loading: "lazy" }),
                        (0, react_1.createElement)("div", { className: "v4-craft-frame", "aria-hidden": "true" }),
                        (0, react_1.createElement)("div", { className: "v4-craft-tag" },
                            (0, react_1.createElement)("span", null, "YAKINDAN BAKIN"),
                            (0, react_1.createElement)("strong", null, detail.tag)),
                        (0, react_1.createElement)("span", { className: "v4-craft-caption" }, "Malzeme ve y\u00F6ntem, ger\u00E7ek i\u015F i\u00E7in at\u00F6lyede teyit edilir.")))),
            (0, react_1.createElement)("section", { className: "v4-selection wrap", "data-reveal": true },
                (0, react_1.createElement)("div", { className: "v4-heading" },
                    (0, react_1.createElement)("div", null,
                        (0, react_1.createElement)(ui_1.Eyebrow, null, "04 / AT\u00D6LYE SE\u00C7K\u0130S\u0130"),
                        (0, react_1.createElement)("h2", null,
                            "Yal\u0131n \u00E7izgiler.",
                            (0, react_1.createElement)("br", null),
                            (0, react_1.createElement)("em", null, "Kendine has par\u00E7alar."))),
                    (0, react_1.createElement)(ui_1.TextLink, { to: "/urunler", navigate: a.navigate }, "\u0130nceleyin ve kar\u015F\u0131la\u015Ft\u0131r\u0131n")),
                (0, react_1.createElement)("div", { className: "v4-product-grid" }, data_1.products.map(p => (0, react_1.createElement)(ui_1.ProductCard, { key: p.id, product: p, actions: a })))),
            (0, react_1.createElement)("section", { className: "v4-materials", "data-reveal": true },
                (0, react_1.createElement)("div", { className: "wrap v4-material-grid" },
                    (0, react_1.createElement)("div", { className: "v4-sample-art" },
                        (0, react_1.createElement)("div", { className: "v4-sample-board", key: mat.id },
                            (0, react_1.createElement)("img", { src: (0, ui_1.image)(mat.image), alt: mat.name + ' için temsili doku numunesi', loading: "lazy" }),
                            (0, react_1.createElement)("div", { className: "v4-sample-label" },
                                (0, react_1.createElement)("span", null, "EL\u0130F / MALZEME AR\u015E\u0130V\u0130"),
                                (0, react_1.createElement)("strong", null, mat.name),
                                (0, react_1.createElement)("span", null,
                                    "0",
                                    s.material + 1,
                                    " / NUMUNE F\u0130KR\u0130"))),
                        (0, react_1.createElement)("span", { className: "v4-sample-measure" }, "B\u0130R DOKU, B\u0130NLERCE AYRINTI.")),
                    (0, react_1.createElement)("div", { className: "v4-material-copy" },
                        (0, react_1.createElement)(ui_1.Eyebrow, null, "05 / MALZEMEN\u0130N D\u0130L\u0130"),
                        (0, react_1.createElement)("h2", null,
                            "Her damar,",
                            (0, react_1.createElement)("br", null),
                            (0, react_1.createElement)("em", null, "ba\u015Fka bir hik\u00E2ye.")),
                        (0, react_1.createElement)("p", null, "Renk ilk izlenimi verir. Doku, y\u00FCzey ve kullan\u0131m bi\u00E7imi karar\u0131 tamamlar."),
                        (0, react_1.createElement)("div", { className: "v4-material-tabs", role: "tablist", "aria-label": "Ah\u015Fap numune fikirleri" }, data_1.materials.map((m, i) => (0, react_1.createElement)("button", { key: m.id, id: 'v4-material-' + i, role: "tab", "aria-label": m.name + ' numunesi', "aria-selected": s.material === i, "aria-controls": "v4-material-panel", tabIndex: s.material === i ? 0 : -1, onKeyDown: e => this.nextTab(e, i, data_1.materials.length, 'material'), onClick: () => this.setState({ material: i }) },
                            (0, react_1.createElement)("span", { style: { backgroundImage: `url(${(0, ui_1.image)(m.image)})` } }),
                            m.name))),
                        (0, react_1.createElement)("div", { id: "v4-material-panel", role: "tabpanel", "aria-labelledby": 'v4-material-' + s.material },
                            (0, react_1.createElement)("h3", null, mat.name),
                            (0, react_1.createElement)("p", null,
                                mat.latin,
                                " ",
                                mat.desc)),
                        (0, react_1.createElement)(ui_1.TextLink, { to: "/malzemeler", navigate: a.navigate }, "Malzemeleri daha yak\u0131ndan tan\u0131y\u0131n"),
                        (0, react_1.createElement)("p", { className: "v4-small-note" }, "G\u00F6r\u00FCn\u00FCmler temsilidir. T\u00FCr, masif veya kaplama tercihi ve y\u00FCzey i\u015Flemi ayr\u0131 ayr\u0131 netle\u015Ftirilir.")))),
            (0, react_1.createElement)("section", { className: "v4-bespoke wrap", "data-reveal": true },
                (0, react_1.createElement)("div", { className: "v4-bespoke-copy" },
                    (0, react_1.createElement)(ui_1.Eyebrow, null, "06 / S\u0130Z\u0130N \u00D6L\u00C7\u00DCN\u00DCZDE"),
                    (0, react_1.createElement)("h2", null,
                        "Hayalinizin",
                        (0, react_1.createElement)("br", null),
                        (0, react_1.createElement)("em", null, "ilk \u00E7izgisi.")),
                    (0, react_1.createElement)("p", null, "Bir masayla ba\u015Flayal\u0131m. Enini de\u011Fi\u015Ftirin, bir malzeme fikri se\u00E7in. Sonra tasar\u0131m masas\u0131nda derinli\u011Fi, y\u00FCksekli\u011Fi ve ta\u015F\u0131y\u0131c\u0131y\u0131 birlikte d\u00FC\u015F\u00FCn\u00FCn."),
                    (0, react_1.createElement)("label", { className: "v4-brief-range" },
                        (0, react_1.createElement)("span", null,
                            "Masa eni ",
                            (0, react_1.createElement)("output", null,
                                s.width,
                                (0, react_1.createElement)("small", null, " cm"))),
                        (0, react_1.createElement)("input", { "aria-label": "Ba\u015Flang\u0131\u00E7 masa eni", type: "range", min: "100", max: "240", step: "5", value: s.width, onInput: e => this.setState({ width: Number(e.currentTarget.value) }) }),
                        (0, react_1.createElement)("span", { className: "v4-range-hints" },
                            (0, react_1.createElement)("small", null, "100 cm"),
                            (0, react_1.createElement)("small", null, "240 cm"))),
                    (0, react_1.createElement)("div", { className: "v4-brief-materials", "aria-label": "Ba\u015Flang\u0131\u00E7 malzeme fikri" }, data_1.materials.map((m, i) => (0, react_1.createElement)("button", { key: m.id, "aria-label": 'Başlangıç malzemesi ' + m.name, "aria-pressed": s.briefMaterial === i, onClick: () => this.setState({ briefMaterial: i }) },
                        (0, react_1.createElement)("span", { style: { backgroundImage: `url(${(0, ui_1.image)(m.image)})` } }),
                        m.name))),
                    (0, react_1.createElement)(ui_1.ButtonLink, { to: deskPath, navigate: a.navigate }, "Tasar\u0131m masas\u0131nda devam et"),
                    (0, react_1.createElement)("p", { className: "v4-small-note" }, "Bu bir tasar\u0131m eskizidir. Fiyat, ta\u015F\u0131ma kapasitesi veya \u00FCretilebilirlik onay\u0131 de\u011Fildir.")),
                (0, react_1.createElement)("div", { className: "v4-draft" },
                    (0, react_1.createElement)("div", { className: "v4-draft-top" },
                        (0, react_1.createElement)("span", null, "EL\u0130F TASARIM / \u00C7ALI\u015EMA NO. 01"),
                        (0, react_1.createElement)("span", null, "\u00D6L\u00C7\u00DC F\u0130KR\u0130")),
                    (0, react_1.createElement)(DesignDesk_1.TableDrawing, { id: "home-preview", desk: { width: s.width, depth: 80, height: 75, material: briefMat.id, base: 'adjustable', view: 'perspective' } }),
                    (0, react_1.createElement)("div", { className: "v4-draft-bottom" },
                        (0, react_1.createElement)("strong", null,
                            briefMat.name,
                            " g\u00F6r\u00FCn\u00FCm\u00FC"),
                        (0, react_1.createElement)("span", null, "Y\u00FCkseklik ayarl\u0131 \u00E7al\u0131\u015Fma fikri")))),
            (0, react_1.createElement)("section", { className: "v4-process", "data-reveal": true },
                (0, react_1.createElement)("div", { className: "wrap" },
                    (0, react_1.createElement)("div", { className: "v4-heading" },
                        (0, react_1.createElement)("div", null,
                            (0, react_1.createElement)(ui_1.Eyebrow, null, "07 / B\u0130RL\u0130KTE \u00DCRETMEK"),
                            (0, react_1.createElement)("h2", null,
                                "Sizin fikriniz.",
                                (0, react_1.createElement)("br", null),
                                (0, react_1.createElement)("em", null, "Bizim ustal\u0131\u011F\u0131m\u0131z."))),
                        (0, react_1.createElement)("p", null,
                            "\u0130lk konu\u015Fmadan ya\u015Fam alan\u0131n\u0131za.",
                            (0, react_1.createElement)("br", null),
                            "Her a\u015Famada ayn\u0131 \u00F6zen.")),
                    (0, react_1.createElement)("div", { className: "v4-process-grid" },
                        (0, react_1.createElement)("div", { className: "v4-process-nav", role: "tablist", "aria-label": "\u00DCretim yolculu\u011Fu" }, steps.map((st, i) => (0, react_1.createElement)("button", { key: st.label, id: 'v4-step-' + i, role: "tab", "aria-label": st.label, "aria-selected": s.step === i, "aria-controls": "v4-process-panel", tabIndex: s.step === i ? 0 : -1, onKeyDown: e => this.nextTab(e, i, steps.length, 'step'), onClick: () => this.setState({ step: i }) },
                            (0, react_1.createElement)("span", null,
                                "0",
                                i + 1),
                            (0, react_1.createElement)("strong", null, st.title),
                            (0, react_1.createElement)(ui_1.Icon, { name: "arrow" })))),
                        (0, react_1.createElement)("div", { id: "v4-process-panel", role: "tabpanel", "aria-labelledby": 'v4-step-' + s.step },
                            (0, react_1.createElement)("img", { src: (0, ui_1.image)(step.image), alt: step.title + ' Temsili süreç görseli.', loading: "lazy" }),
                            (0, react_1.createElement)("div", null,
                                (0, react_1.createElement)("span", null,
                                    "0",
                                    s.step + 1,
                                    " / YOLCULUK"),
                                (0, react_1.createElement)("h3", null, step.title),
                                (0, react_1.createElement)("p", null, step.text)))))),
            (0, react_1.createElement)("section", { className: "v4-journal wrap", "data-reveal": true },
                (0, react_1.createElement)("div", { className: "v4-heading" },
                    (0, react_1.createElement)("div", null,
                        (0, react_1.createElement)(ui_1.Eyebrow, null, "08 / AT\u00D6LYE NOTLARI"),
                        (0, react_1.createElement)("h2", null,
                            "Biraz bilgi.",
                            (0, react_1.createElement)("br", null),
                            (0, react_1.createElement)("em", null, "Daha do\u011Fru bir ba\u015Flang\u0131\u00E7."))),
                    (0, react_1.createElement)(ui_1.TextLink, { to: "/rehber", navigate: a.navigate }, "T\u00FCm notlar")),
                (0, react_1.createElement)("div", { className: "v4-journal-grid" }, data_1.journal.map((j, i) => (0, react_1.createElement)(ui_1.Link, { key: j.id, to: '/rehber/' + j.id, navigate: a.navigate },
                    (0, react_1.createElement)(ui_1.Photo, { name: j.image, alt: j.title + ' için temsili görsel', ratio: "1.5", caption: false }),
                    (0, react_1.createElement)("div", null,
                        (0, react_1.createElement)("span", null, j.subtitle),
                        (0, react_1.createElement)("h3", null, j.title),
                        (0, react_1.createElement)("p", null, j.intro),
                        (0, react_1.createElement)("strong", null,
                            "Notu okuyun ",
                            (0, react_1.createElement)(ui_1.Icon, { name: "arrow", size: 18 }))))))),
            (0, react_1.createElement)("section", { className: "v4-faq wrap", "data-reveal": true },
                (0, react_1.createElement)("div", null,
                    (0, react_1.createElement)(ui_1.Eyebrow, null, "BA\u015ELAMADAN \u00D6NCE"),
                    (0, react_1.createElement)("h2", null,
                        "Akl\u0131n\u0131zdaki",
                        (0, react_1.createElement)("br", null),
                        (0, react_1.createElement)("em", null, "sorular.")),
                    (0, react_1.createElement)(ui_1.TextLink, { to: "/sikca-sorulan-sorular", navigate: a.navigate }, "T\u00FCm sorular")),
                (0, react_1.createElement)(ui_1.Accordion, { items: data_1.faqs.slice(0, 3) })),
            (0, react_1.createElement)("section", { className: "v4-closing" },
                (0, react_1.createElement)("div", { className: "v4-closing-grain", style: { backgroundImage: `url(${(0, ui_1.image)('wood-walnut.webp')})` } }),
                (0, react_1.createElement)("div", { className: "wrap" },
                    (0, react_1.createElement)(ui_1.Eyebrow, null, "G\u00DCZEL B\u0130R \u015EEY, B\u0130R KONU\u015EMAYLA BA\u015ELAR."),
                    (0, react_1.createElement)("h2", null,
                        "Birlikte, size ait",
                        (0, react_1.createElement)("br", null),
                        (0, react_1.createElement)("em", null, "bir \u015Fey \u00FCretelim.")),
                    (0, react_1.createElement)(ui_1.ButtonLink, { to: "/teklif-al", navigate: a.navigate }, "Projenizi konu\u015Fal\u0131m"),
                    (0, react_1.createElement)("span", null, "Bir \u00F6l\u00E7\u00FC, bir foto\u011Fraf ya da yaln\u0131zca bir fikir.")),
                (0, react_1.createElement)("div", { className: "v4-closing-signature" }, "EL\u0130F TASARIM / \u0130STANBUL")));
    }
}
exports.Home = Home;

},"src/pages/Catalog":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductPage = exports.Catalog = void 0;
const react_1 = require("react");
const data_1 = require("../lib/data");
const domain_1 = require("../lib/domain");
const ui_1 = require("../components/ui");
class Catalog extends react_1.Component {
    constructor(props) {
        super(props);
        this.toggle = (id) => { const selected = this.state.selected; if (selected.includes(id))
            this.setState({ selected: selected.filter(x => x !== id) });
        else if (selected.length < 3)
            this.setState({ selected: [...selected, id] });
        else
            this.props.notify('Yan yana en fazla üç parçayı karşılaştırabilirsiniz.'); };
        this.state = { category: props.initialCategory || 'all', query: '', sort: 'editorial', selected: [], compare: false, quick: null };
    }
    render() {
        const a = this.props, s = this.state;
        let items = data_1.products.filter(p => (s.category === 'all' || p.category === s.category) && (0, domain_1.searchKey)(p.name + ' ' + p.categoryLabel + ' ' + p.material + ' ' + p.id + ' ' + p.category).includes((0, domain_1.searchKey)(s.query)));
        if (s.sort === 'name')
            items = [...items].sort((a, b) => a.name.localeCompare(b.name, 'tr'));
        if (s.sort === 'price')
            items = [...items].sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
        const chosen = data_1.products.filter(p => s.selected.includes(p.id)), quick = data_1.products.find(p => p.id === s.quick);
        return (0, react_1.createElement)(react_1.Fragment, null,
            (0, react_1.createElement)(ui_1.PageIntro, { kicker: "KOLEKS\u0130YON / TASARIM SE\u00C7K\u0130S\u0130", title: (0, react_1.createElement)(react_1.Fragment, null,
                    "G\u00FCndelik hayat.",
                    (0, react_1.createElement)("br", null),
                    (0, react_1.createElement)("em", null, "\u0130yi d\u00FC\u015F\u00FCn\u00FClm\u00FC\u015F par\u00E7alar.")), desc: "Bir mek\u00E2na yerle\u015Fmekten fazlas\u0131. Ya\u015Fam\u0131n\u0131za e\u015Flik etmesi i\u00E7in d\u00FC\u015F\u00FCn\u00FClen tasar\u0131m fikirleri." }),
            (0, react_1.createElement)("section", { className: "wrap catalog" },
                (0, react_1.createElement)("div", { className: "catalog-toolbar" },
                    (0, react_1.createElement)("div", { className: "filter-tabs", role: "group", "aria-label": "Kullan\u0131m alan\u0131" }, data_1.categories.map(c => (0, react_1.createElement)("button", { key: c.id, className: s.category === c.id ? 'active' : '', "aria-pressed": s.category === c.id, onClick: () => this.setState({ category: c.id }) }, c.label))),
                    (0, react_1.createElement)("label", { className: "sort-control" },
                        "S\u0131ralama",
                        (0, react_1.createElement)("select", { value: s.sort, onChange: e => this.setState({ sort: e.currentTarget.value }) },
                            (0, react_1.createElement)("option", { value: "editorial" }, "At\u00F6lye se\u00E7kisi"),
                            (0, react_1.createElement)("option", { value: "name" }, "\u0130sme g\u00F6re"),
                            (0, react_1.createElement)("option", { value: "price" }, "\u00D6rnek fiyata g\u00F6re")))),
                (0, react_1.createElement)("div", { className: "catalog-search" },
                    (0, react_1.createElement)("label", null,
                        (0, react_1.createElement)(ui_1.Icon, { name: "search" }),
                        (0, react_1.createElement)("input", { type: "search", value: s.query, onInput: e => this.setState({ query: e.currentTarget.value }), placeholder: "Bir par\u00E7a, malzeme veya kullan\u0131m alan\u0131\u2026", "aria-label": "Koleksiyonda ara" })),
                    (0, react_1.createElement)("span", { role: "status" },
                        items.length,
                        " tasar\u0131m fikri")),
                items.length ? (0, react_1.createElement)("div", { className: "catalog-grid" }, items.map(p => (0, react_1.createElement)("div", { key: p.id, className: "catalog-item" },
                    (0, react_1.createElement)(ui_1.ProductCard, { product: p, actions: a }),
                    (0, react_1.createElement)("div", { className: "catalog-item-actions" },
                        (0, react_1.createElement)("button", { onClick: () => this.setState({ quick: p.id }), "aria-label": p.name + ' hızlı bakış' },
                            "Yak\u0131ndan bak ",
                            (0, react_1.createElement)(ui_1.Icon, { name: "plus", size: 15 })),
                        (0, react_1.createElement)("button", { "aria-label": p.name + (s.selected.includes(p.id) ? ' karşılaştırmadan çıkar' : ' karşılaştırma listesine ekle'), "aria-pressed": s.selected.includes(p.id), onClick: () => this.toggle(p.id) },
                            (0, react_1.createElement)("span", { className: "compare-check" }, s.selected.includes(p.id) && (0, react_1.createElement)(ui_1.Icon, { name: "check", size: 12 })),
                            "Kar\u015F\u0131la\u015Ft\u0131r"))))) : (0, react_1.createElement)("div", { className: "empty-state" },
                    (0, react_1.createElement)(ui_1.Icon, { name: "search", size: 34 }),
                    (0, react_1.createElement)("h2", null, "Bu aramada bir par\u00E7a bulamad\u0131k."),
                    (0, react_1.createElement)("p", null, "Ba\u015Fka bir kelime deneyebilir ya da t\u00FCm koleksiyona d\u00F6nebilirsiniz."),
                    (0, react_1.createElement)("button", { className: "button", onClick: () => this.setState({ query: '', category: 'all' }) },
                        "Filtreleri temizle ",
                        (0, react_1.createElement)(ui_1.Icon, null))),
                s.selected.length > 0 && (0, react_1.createElement)("div", { className: "comparison-bar", role: "region", "aria-label": "Kar\u015F\u0131la\u015Ft\u0131rma se\u00E7iminiz" },
                    (0, react_1.createElement)("div", { className: "comparison-thumbs" }, chosen.map(p => (0, react_1.createElement)("button", { key: p.id, onClick: () => this.toggle(p.id), "aria-label": p.name + ' karşılaştırmadan çıkar' },
                        (0, react_1.createElement)("img", { src: (0, ui_1.image)(p.image), alt: "" }),
                        (0, react_1.createElement)("span", null, p.name),
                        (0, react_1.createElement)(ui_1.Icon, { name: "close", size: 13 })))),
                    (0, react_1.createElement)("div", null,
                        (0, react_1.createElement)("span", null,
                            chosen.length,
                            " / 3 par\u00E7a"),
                        (0, react_1.createElement)("button", { className: "button", disabled: chosen.length < 2, onClick: () => this.setState({ compare: true }) },
                            "Se\u00E7ilenleri kar\u015F\u0131la\u015Ft\u0131r ",
                            (0, react_1.createElement)(ui_1.Icon, null)))),
                (0, react_1.createElement)("div", { className: "note-box" },
                    (0, react_1.createElement)(ui_1.Icon, { name: "info" }),
                    (0, react_1.createElement)("p", null, "Bu se\u00E7kideki isimler, g\u00F6rseller, \u00F6l\u00E7\u00FCler ve fiyatlar tasar\u0131m \u00F6rne\u011Fidir. Ger\u00E7ek katalog do\u011Fruland\u0131ktan sonra yay\u0131mlanacakt\u0131r. Canl\u0131 sat\u0131\u015F kapal\u0131d\u0131r."))),
            (0, react_1.createElement)(ui_1.Callout, { navigate: a.navigate }),
            quick && (0, react_1.createElement)(ui_1.Dialog, { title: quick.name + ' / Yakından bakış', onClose: () => this.setState({ quick: null }) },
                (0, react_1.createElement)("div", { className: "quick-view" },
                    (0, react_1.createElement)("img", { src: (0, ui_1.image)(quick.image), alt: quick.name + ' temsili tasarım görseli' }),
                    (0, react_1.createElement)("div", null,
                        (0, react_1.createElement)(ui_1.Eyebrow, null, quick.categoryLabel),
                        (0, react_1.createElement)("p", { className: "quick-poem" }, quick.intro),
                        (0, react_1.createElement)("p", null, quick.detail),
                        (0, react_1.createElement)("dl", { className: "product-passport" },
                            (0, react_1.createElement)("div", null,
                                (0, react_1.createElement)("dt", null, "\u00D6l\u00E7\u00FC fikri"),
                                (0, react_1.createElement)("dd", null, quick.dimensions)),
                            (0, react_1.createElement)("div", null,
                                (0, react_1.createElement)("dt", null, "Yakla\u015F\u0131m"),
                                (0, react_1.createElement)("dd", null, quick.mode === 'quoted' ? 'Ölçüye özel teklif' : 'Konsept koleksiyon'))),
                        (0, react_1.createElement)(ui_1.ButtonLink, { to: '/urun/' + quick.id, navigate: a.navigate }, "Par\u00E7ay\u0131 incele"),
                        (0, react_1.createElement)("span", { className: "small muted" }, "Temsili \u00FCr\u00FCn ve \u00F6l\u00E7\u00FC. Canl\u0131 sat\u0131\u015F yok.")))),
            s.compare && (0, react_1.createElement)(ui_1.Dialog, { title: "Yan yana d\u00FC\u015F\u00FCnelim.", onClose: () => this.setState({ compare: false }) },
                (0, react_1.createElement)("p", { className: "comparison-intro" }, "Bir se\u00E7imden \u00F6nce, ayr\u0131nt\u0131lar\u0131 birlikte g\u00F6r\u00FCn. Bilgiler bu tasar\u0131m \u00F6nizlemesine aittir."),
                (0, react_1.createElement)("div", { className: "comparison-table", tabIndex: 0, role: "region", "aria-label": "\u00DCr\u00FCn kar\u015F\u0131la\u015Ft\u0131rma tablosu" },
                    (0, react_1.createElement)("table", null,
                        (0, react_1.createElement)("thead", null,
                            (0, react_1.createElement)("tr", null,
                                (0, react_1.createElement)("th", { scope: "col" }, "Par\u00E7alar"),
                                chosen.map(p => (0, react_1.createElement)("th", { key: p.id, scope: "col" },
                                    (0, react_1.createElement)("img", { src: (0, ui_1.image)(p.image), alt: p.name + ' konsepti' }),
                                    (0, react_1.createElement)("strong", null, p.name),
                                    (0, react_1.createElement)("span", null, p.categoryLabel))))),
                        (0, react_1.createElement)("tbody", null,
                            [['Ölçü fikri', (p) => p.dimensions], ['Malzeme görünümü', (p) => p.material], ['Seçenekler', (p) => p.sizes.join(' / ')], ['Sipariş yaklaşımı', (p) => p.mode === 'quoted' ? 'Ölçüye özel teklif' : 'Konsept koleksiyon'], ['Örnek fiyat', (p) => p.price === null ? 'Görüşmeyle belirlenir' : (0, domain_1.money)(p.price)]].map(([label, value]) => (0, react_1.createElement)("tr", { key: String(label) },
                                (0, react_1.createElement)("th", { scope: "row" }, String(label)),
                                chosen.map(p => (0, react_1.createElement)("td", { key: p.id }, value(p))))),
                            (0, react_1.createElement)("tr", null,
                                (0, react_1.createElement)("th", { scope: "row" }, "Ayr\u0131nt\u0131lar"),
                                chosen.map(p => (0, react_1.createElement)("td", { key: p.id },
                                    (0, react_1.createElement)(ui_1.TextLink, { to: '/urun/' + p.id, navigate: a.navigate }, "\u0130ncele")))))))));
    }
}
exports.Catalog = Catalog;
class ProductPage extends react_1.Component {
    constructor(props) { super(props); this.state = { material: 'Ceviz', size: props.product.sizes[0], quantity: 1, view: 'full', lightbox: false }; }
    render() {
        const a = this.props, p = a.product;
        const sizeExtra = Math.max(0, p.sizes.indexOf(this.state.size)) * 700000;
        const price = p.price === null ? null : p.price + sizeExtra;
        return (0, react_1.createElement)(react_1.Fragment, null,
            (0, react_1.createElement)("div", { className: "breadcrumb wrap" },
                (0, react_1.createElement)(ui_1.Link, { to: "/urunler", navigate: a.navigate }, "Koleksiyon"),
                (0, react_1.createElement)("span", null, "/"),
                (0, react_1.createElement)(ui_1.Link, { to: '/urunler?alan=' + p.category, navigate: a.navigate }, p.categoryLabel),
                (0, react_1.createElement)("span", null, "/"),
                (0, react_1.createElement)("span", null, p.name)),
            (0, react_1.createElement)("section", { className: "wrap product-detail" },
                (0, react_1.createElement)("div", { className: "product-gallery" },
                    (0, react_1.createElement)("button", { className: 'main-product-image ' + (this.state.view === 'detail' ? 'zoomed' : ''), "aria-label": "\u00DCr\u00FCn konsept g\u00F6rselini b\u00FCy\u00FCt", onClick: () => this.setState({ lightbox: true }) },
                        (0, react_1.createElement)("img", { src: (0, ui_1.image)(p.image), alt: p.name + ' ' + (this.state.view === 'detail' ? 'aynı konsept görselinin detay kırpımı' : 'konsept genel görünümü') }),
                        (0, react_1.createElement)("span", { className: "zoom-icon" },
                            (0, react_1.createElement)(ui_1.Icon, { name: "plus" })),
                        (0, react_1.createElement)("span", { className: "photo-disclaimer" }, this.state.view === 'detail' ? 'Aynı konseptin detay kırpımı' : 'Temsili tasarım görseli')),
                    (0, react_1.createElement)("div", { className: "gallery-controls", role: "group", "aria-label": "G\u00F6rsel g\u00F6r\u00FCn\u00FCm\u00FC" },
                        (0, react_1.createElement)("button", { className: this.state.view === 'full' ? 'active' : '', onClick: () => this.setState({ view: 'full' }) },
                            (0, react_1.createElement)("img", { src: (0, ui_1.image)(p.image), alt: "" }),
                            "Genel g\u00F6r\u00FCn\u00FCm"),
                        (0, react_1.createElement)("button", { className: this.state.view === 'detail' ? 'active' : '', onClick: () => this.setState({ view: 'detail' }) },
                            (0, react_1.createElement)("img", { className: "detail-thumb", src: (0, ui_1.image)(p.image), alt: "" }),
                            "Detay k\u0131rp\u0131m\u0131")),
                    (0, react_1.createElement)("p", { className: "small muted" }, "G\u00F6rseldeki di\u011Fer mobilya ve aksesuarlar \u00FCr\u00FCn kapsam\u0131na dahil de\u011Fildir.")),
                (0, react_1.createElement)("div", { className: "product-info" },
                    (0, react_1.createElement)(ui_1.Eyebrow, null,
                        "EL\u0130F TASARIM / ",
                        p.categoryLabel.toLocaleUpperCase('tr-TR')),
                    (0, react_1.createElement)("div", { className: "product-title-row" },
                        (0, react_1.createElement)("h1", null, p.name),
                        (0, react_1.createElement)("button", { className: 'icon-button ' + (a.favorites.includes(p.id) ? 'is-saved' : ''), "aria-label": p.name + ' ürününü kaydet', "aria-pressed": a.favorites.includes(p.id), onClick: () => a.favorite(p.id) },
                            (0, react_1.createElement)(ui_1.Icon, { name: "heart", size: 25 }))),
                    (0, react_1.createElement)("p", { className: "product-poem" }, p.intro),
                    (0, react_1.createElement)("p", null, p.detail),
                    (0, react_1.createElement)("dl", { className: "product-passport" },
                        (0, react_1.createElement)("div", null,
                            (0, react_1.createElement)("dt", null, "PAR\u00C7A NO."),
                            (0, react_1.createElement)("dd", null,
                                "ET / ",
                                p.number)),
                        (0, react_1.createElement)("div", null,
                            (0, react_1.createElement)("dt", null, "\u00D6L\u00C7\u00DC F\u0130KR\u0130"),
                            (0, react_1.createElement)("dd", null, p.dimensions)),
                        (0, react_1.createElement)("div", null,
                            (0, react_1.createElement)("dt", null, "\u00DCRET\u0130M YAKLA\u015EIMI"),
                            (0, react_1.createElement)("dd", null, p.mode === 'quoted' ? 'İhtiyacınıza göre görüşülür' : 'Ölçü ve malzemeyle şekillenir'))),
                    p.id === 'rota-calisma-masasi' && (0, react_1.createElement)("div", { className: "product-desk-link" },
                        (0, react_1.createElement)(ui_1.TextLink, { to: "/tasarim-masasi", navigate: a.navigate }, "\u00D6l\u00E7\u00FCleri tasar\u0131m masas\u0131nda dene")),
                    (0, react_1.createElement)("div", { className: "price-block" }, price === null ? (0, react_1.createElement)(react_1.Fragment, null,
                        (0, react_1.createElement)("strong", null, "\u00D6l\u00E7\u00FCn\u00FCze \u00F6zel teklif"),
                        (0, react_1.createElement)("span", null, "\u0130htiya\u00E7 ve malzemeye g\u00F6re birlikte belirlenir.")) : (0, react_1.createElement)(react_1.Fragment, null,
                        (0, react_1.createElement)("strong", null, (0, domain_1.money)(price)),
                        (0, react_1.createElement)("span", null, "Yaln\u0131z \u00F6rnek fiyat \u00B7 Sat\u0131\u015F teklifi de\u011Fildir"))),
                    (0, react_1.createElement)("div", { className: "option-group" },
                        (0, react_1.createElement)("span", { className: "field-label" },
                            "MALZEME F\u0130KR\u0130 ",
                            (0, react_1.createElement)("b", null, this.state.material)),
                        (0, react_1.createElement)("div", { className: "swatch-options" }, ['Ceviz', 'Meşe'].map((m, i) => (0, react_1.createElement)("button", { key: m, className: this.state.material === m ? 'active' : '', "aria-pressed": this.state.material === m, onClick: () => this.setState({ material: m }) },
                            (0, react_1.createElement)("span", { style: { backgroundImage: `url(${(0, ui_1.image)(i ? 'wood-oak.webp' : 'wood-walnut.webp')})` } }),
                            m))),
                        (0, react_1.createElement)("span", { className: "small muted" }, "Foto\u011Fraf ceviz g\u00F6r\u00FCn\u00FCm\u00FCnde konsepttir. Di\u011Fer malzeme i\u00E7in ger\u00E7ek numune gerekir.")),
                    (0, react_1.createElement)("label", { className: "field-label option-group" },
                        "\u00D6L\u00C7\u00DC",
                        (0, react_1.createElement)("select", { value: this.state.size, onChange: e => this.setState({ size: e.currentTarget.value }) }, p.sizes.map(s => (0, react_1.createElement)("option", { key: s, value: s }, s)))),
                    p.price !== null ? (0, react_1.createElement)("div", { className: "product-actions" },
                        (0, react_1.createElement)("div", { className: "quantity" },
                            (0, react_1.createElement)("button", { "aria-label": "Adedi azalt", disabled: this.state.quantity <= 1, onClick: () => this.setState({ quantity: this.state.quantity - 1 }) },
                                (0, react_1.createElement)(ui_1.Icon, { name: "minus", size: 16 })),
                            (0, react_1.createElement)("input", { "aria-label": "Adet", value: this.state.quantity, type: "number", min: "1", max: "100", onChange: e => {
                                    const n = Number(e.currentTarget.value);
                                    if ((0, domain_1.validQuantity)(n))
                                        this.setState({ quantity: n });
                                    else {
                                        e.currentTarget.value = String(this.state.quantity);
                                        a.notify('Adet 1 ile 100 arasında tam sayı olmalı.');
                                    }
                                } }),
                            (0, react_1.createElement)("button", { "aria-label": "Adedi art\u0131r", disabled: this.state.quantity >= 100, onClick: () => this.setState({ quantity: this.state.quantity + 1 }) },
                                (0, react_1.createElement)(ui_1.Icon, { name: "plus", size: 16 }))),
                        (0, react_1.createElement)("button", { className: "button", onClick: () => a.addCart(p, this.state.material, this.state.size, this.state.quantity) },
                            "\u00D6rnek sepete ekle ",
                            (0, react_1.createElement)(ui_1.Icon, { name: "bag" }))) : (0, react_1.createElement)(ui_1.ButtonLink, { to: '/teklif-al?urun=' + p.id, navigate: a.navigate }, "Bu tasar\u0131m\u0131 birlikte d\u00FC\u015F\u00FCnelim"),
                    (0, react_1.createElement)("div", { className: "product-support" },
                        (0, react_1.createElement)(ui_1.Icon, { name: "ruler" }),
                        (0, react_1.createElement)("span", null, "Ba\u015Fka bir \u00F6l\u00E7\u00FC m\u00FC d\u00FC\u015F\u00FCn\u00FCyorsunuz?"),
                        (0, react_1.createElement)(ui_1.Link, { to: '/teklif-al?urun=' + p.id, navigate: a.navigate },
                            "Konu\u015Fal\u0131m ",
                            (0, react_1.createElement)(ui_1.Icon, { size: 16 }))),
                    (0, react_1.createElement)(ui_1.Accordion, { items: [
                            ['Tasarım ve ölçü bilgisi', p.dimensions + '. Verilen ölçüler tasarım örneğidir; üretim ölçüsü ve teknik uygunluk atölye tarafından ayrıca onaylanmalıdır.'],
                            ['Malzeme ve yüzey', 'Ağaç türü, masif veya kaplama yapısı, yüzey işlemi ve donanım gerçek ürün kaydında ayrı belirtilir. Bu görselin tonu bir malzeme sertifikası veya numune değildir.'],
                            ['Üretim, teslim ve kurulum', 'Teslimat bölgesi, bina erişimi, kurulum ihtiyacı ve üretim planı kesin teklifte netleştirilir. Bu sürümde otomatik teslim tarihi veya ücretsiz kargo taahhüdü yoktur.'],
                            ['Bakım', 'Kesin bakım yöntemi gerçek malzeme ve yüzey işlemiyle belirlenir. Üretici talimatı dışında kimyasal veya yüzey uygulaması yapmadan önce atölyeye danışın.']
                        ] }))),
            (0, react_1.createElement)("section", { className: "wrap section related" },
                (0, react_1.createElement)("div", { className: "section-head" },
                    (0, react_1.createElement)("div", null,
                        (0, react_1.createElement)(ui_1.Eyebrow, null, "B\u0130RL\u0130KTE D\u00DC\u015E\u00DCN\u00DCLEB\u0130L\u0130R"),
                        (0, react_1.createElement)("h2", null,
                            "Birbirine e\u015Flik",
                            (0, react_1.createElement)("br", null),
                            (0, react_1.createElement)("em", null, "eden par\u00E7alar."))),
                    (0, react_1.createElement)(ui_1.TextLink, { to: "/urunler", navigate: a.navigate }, "Koleksiyona d\u00F6n")),
                (0, react_1.createElement)("div", { className: "featured-products" }, data_1.products.filter(x => x.id !== p.id).map(x => (0, react_1.createElement)(ui_1.ProductCard, { key: x.id, product: x, actions: a })))),
            this.state.lightbox && (0, react_1.createElement)(ui_1.Dialog, { title: p.name + ' / Konsept görseli', onClose: () => this.setState({ lightbox: false }) },
                (0, react_1.createElement)("img", { className: "lightbox-image", src: (0, ui_1.image)(p.image), alt: p.name + ' tam konsept görseli' }),
                (0, react_1.createElement)("p", { className: "small muted" }, "Temsili tasar\u0131m. Ger\u00E7ek \u00FCr\u00FCn foto\u011Fraf\u0131 de\u011Fildir.")));
    }
}
exports.ProductPage = ProductPage;

},"src/pages/Quote":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quote = void 0;
const react_1 = require("react");
const desk_1 = require("../lib/desk");
const data_1 = require("../lib/data");
const domain_1 = require("../lib/domain");
const ui_1 = require("../components/ui");
const initial = { kind: '', unknown: false, width: '', depth: '', height: '', unit: 'cm', material: 'Danışmak istiyorum', finish: 'Birlikte değerlendirelim', city: 'İstanbul', district: '', delivery: 'Birlikte planlayalım', name: '', email: '', phone: '', note: '', ack: false };
const labels = ['İhtiyaç', 'Ölçü', 'Malzeme', 'Görseller', 'Teslim', 'İletişim', 'Kontrol'];
const stepTitles = ['Neyi birlikte düşünelim?', 'Alanınızın ölçüsü nedir?', 'Dokusu nasıl olsun?', 'Bir görsel, çok şey anlatır.', 'Nereye yerleşecek?', 'Size nasıl ulaşalım?', 'Son bir kez, birlikte bakalım.'];
const stepDescriptions = ['Bir ürün seçin veya fikrinizi birlikte şekillendirelim.', 'Kesin ölçü bilmek zorunda değilsiniz. İlk fikir bile değerlidir.', 'Ağaç türü ile yüzey tercihini ayrı ayrı değerlendirelim.', 'Referans, mekân fotoğrafı veya eskiz ekleyebilirsiniz. Bu adım isteğe bağlı.', 'İlk aşamada açık adresinize ihtiyacımız yok.', 'Bu önizlemede bilgiler gönderilmez ve kalıcı olarak saklanmaz. Örnek bilgi kullanın.', 'Hazırlanan özet bir sipariş veya kabul edilmiş teklif değildir.'];
class Quote extends react_1.Component {
    constructor() {
        super(...arguments);
        this.state = { step: 0, v: { ...initial }, errors: {}, files: [], uploading: false, done: false, hasDraft: false };
        this.alive = true;
        this.set = (k, value) => this.setState(s => ({ v: { ...s.v, [k]: value }, errors: { ...s.errors, [k]: '' } }));
        this.next = () => {
            const errors = (0, domain_1.validateQuoteStep)(this.state.step, this.state.v);
            if (Object.keys(errors).length) {
                this.setState({ errors }, () => document.getElementById('q-' + Object.keys(errors)[0])?.focus());
                return;
            }
            this.setState(s => ({ step: Math.min(6, s.step + 1), errors: {} }), () => document.getElementById('wizard-title')?.focus());
        };
        this.summary = () => { const v = this.state.v; return ['ELİF TASARIM — ÖNİZLEME TALEP ÖZETİ', 'Bu dosya atölyeye gönderilmedi. Sipariş veya fiyat teklifi değildir.', '', `İhtiyaç: ${v.kind}`, `Ölçü: ${v.unknown ? 'Birlikte belirlenecek' : [v.width, v.depth, v.height].join(' × ') + ' ' + v.unit}`, `Malzeme tercihi: ${v.material}`, `Yüzey tercihi: ${v.finish}`, `Bölge: ${v.city}${v.district ? ' / ' + v.district : ''}`, `Teslim yaklaşımı: ${v.delivery}`, `İsim: ${v.name}`, `E-posta: ${v.email || 'Belirtilmedi'}`, `Telefon: ${v.phone || 'Belirtilmedi'}`, `Not: ${v.note || 'Belirtilmedi'}`, `Görseller: ${this.state.files.map(f => f.name).join(', ') || 'Eklenmedi'}`, 'Görsel dosyaları bu metin dosyasına dahil değildir.'].join('\n'); };
        this.field = (name, label, placeholder = '', type = 'text') => (0, react_1.createElement)("label", { className: "form-field", htmlFor: 'q-' + name },
            (0, react_1.createElement)("span", { id: 'label-' + name }, label),
            (0, react_1.createElement)("input", { "aria-labelledby": 'label-' + name, id: 'q-' + name, type: type, value: String(this.state.v[name]), maxLength: name === 'name' ? 100 : 200, placeholder: placeholder, onInput: e => this.set(name, e.currentTarget.value), "aria-invalid": !!this.state.errors[name], "aria-describedby": this.state.errors[name] ? 'err-' + name : undefined }),
            this.state.errors[name] && (0, react_1.createElement)("small", { className: "field-error", id: 'err-' + name }, this.state.errors[name]));
    }
    componentDidMount() { const p = data_1.products.find(p => p.id === this.props.productId), params = new URLSearchParams(this.props.query || ''), fromDesk = params.has('en'); const d = (0, desk_1.deskFromParams)(params); this.setState({ hasDraft: !fromDesk && !!(0, domain_1.readLocal)('quote-draft', null), v: { ...initial, kind: fromDesk ? (d.base === 'adjustable' ? 'Yükseklik ayarlı masa' : 'Çalışma masası') : p ? p.categoryLabel : '', ...(fromDesk ? { width: String(d.width), depth: String(d.depth), height: String(d.height), material: desk_1.deskMaterials[d.material].name, note: 'Tasarım masası fikri. Taşıyıcı tercihi, ' + desk_1.deskBases[d.base] + '. Üretim uygunluğu atölyede teyit edilecek.' } : {}) } }); }
    componentWillUnmount() { this.alive = false; this.state.files.forEach(f => URL.revokeObjectURL(f.url)); }
    async addFiles(list) {
        if (!list)
            return;
        const received = Array.from(list);
        if (received.length + this.state.files.length > 5) {
            this.props.notify('En fazla 5 görsel ekleyebilirsiniz.');
            return;
        }
        this.setState({ uploading: true });
        const accepted = [];
        try {
            for (const file of received) {
                const v = (0, domain_1.validateFile)(file);
                if (!v.ok) {
                    this.props.notify(v.error);
                    continue;
                }
                const bytes = new Uint8Array(await file.slice(0, 12).arrayBuffer());
                const png = bytes[0] === 137 && bytes[1] === 80 && bytes[2] === 78 && bytes[3] === 71;
                const jpg = bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255;
                const webp = String.fromCharCode(...bytes.slice(0, 4)) === 'RIFF' && String.fromCharCode(...bytes.slice(8, 12)) === 'WEBP';
                if (!(png || jpg || webp)) {
                    this.props.notify(file.name + ': dosya içeriği desteklenen bir görsel değil.');
                    continue;
                }
                const bitmap = await createImageBitmap(file);
                if (bitmap.width * bitmap.height > 40000000) {
                    bitmap.close();
                    this.props.notify('40 megapikselden küçük bir görsel seçin.');
                    continue;
                }
                bitmap.close();
                accepted.push({ name: file.name, url: URL.createObjectURL(file), bytes: file.size });
            }
        }
        catch {
            this.props.notify('Görsel okunamadı. Başka bir dosya deneyin.');
        }
        finally {
            if (this.alive)
                this.setState(s => ({ files: [...s.files, ...accepted], uploading: false }));
            else
                accepted.forEach(f => URL.revokeObjectURL(f.url));
        }
    }
    renderStep() {
        const { v, step, files } = this.state;
        if (step === 0)
            return (0, react_1.createElement)("div", { className: "choice-grid", id: "q-kind", tabIndex: -1 },
                [['Yemek masası', 'dining.webp'], ['Sandalye', 'chair.webp'], ['Konsol', 'sideboard.webp'], ['Yükseklik ayarlı masa', 'office.webp']].map(([kind, photo]) => (0, react_1.createElement)("button", { type: "button", key: kind, className: 'picture-choice ' + (v.kind === kind ? 'selected' : ''), "aria-pressed": v.kind === kind, onClick: () => this.set('kind', kind) },
                    (0, react_1.createElement)("img", { src: (0, ui_1.image)(photo), alt: "" }),
                    (0, react_1.createElement)("span", null,
                        kind,
                        (0, react_1.createElement)("i", null, v.kind === kind ? (0, react_1.createElement)(ui_1.Icon, { name: "check", size: 14 }) : null)))),
                (0, react_1.createElement)("button", { type: "button", className: 'choice-wide ' + (v.kind === 'Birlikte karar verelim' ? 'selected' : ''), onClick: () => this.set('kind', 'Birlikte karar verelim'), "aria-pressed": v.kind === 'Birlikte karar verelim' },
                    (0, react_1.createElement)(ui_1.Icon, { name: "ruler" }),
                    "Ba\u015Fka bir fikir / Birlikte karar verelim",
                    (0, react_1.createElement)(ui_1.Icon, { name: "arrow" })),
                this.state.errors.kind && (0, react_1.createElement)("p", { className: "field-error" }, this.state.errors.kind));
        if (step === 1)
            return (0, react_1.createElement)(react_1.Fragment, null,
                (0, react_1.createElement)("label", { className: "check-card" },
                    (0, react_1.createElement)("input", { type: "checkbox", checked: v.unknown, onChange: e => this.set('unknown', e.currentTarget.checked) }),
                    (0, react_1.createElement)("span", null,
                        "\u00D6l\u00E7\u00FClerimi birlikte belirleyelim",
                        (0, react_1.createElement)("small", null, "\u015Eimdilik kesin \u00F6l\u00E7\u00FC vermeden devam edebilirsiniz."))),
                !v.unknown && (0, react_1.createElement)(react_1.Fragment, null,
                    (0, react_1.createElement)("div", { className: "form-row three" },
                        this.field('width', 'En', '180'),
                        this.field('depth', 'Derinlik', '90'),
                        this.field('height', 'Yükseklik', '75')),
                    (0, react_1.createElement)("label", { className: "form-field" },
                        "\u00D6l\u00E7\u00FC birimi",
                        (0, react_1.createElement)("select", { value: v.unit, onChange: e => this.set('unit', e.currentTarget.value) },
                            (0, react_1.createElement)("option", { value: "cm" }, "Santimetre (cm)"),
                            (0, react_1.createElement)("option", { value: "mm" }, "Milimetre (mm)"))),
                    (0, react_1.createElement)("p", { className: "small muted" }, "120,5 veya 120.5 yazabilirsiniz. Bunlar ilk talep \u00F6l\u00E7\u00FCleridir; \u00FCretim onay\u0131 de\u011Fildir.")),
                (0, react_1.createElement)("details", { className: "inline-guide" },
                    (0, react_1.createElement)("summary", null,
                        "\u00D6l\u00E7\u00FC alma notlar\u0131 ",
                        (0, react_1.createElement)(ui_1.Icon, { name: "plus", size: 16 })),
                    (0, react_1.createElement)("p", null, "En, derinlik ve y\u00FCksekli\u011Fi ayr\u0131 \u00F6l\u00E7\u00FCn. Se\u00E7ti\u011Finiz birimi b\u00FCt\u00FCn alanlarda tutarl\u0131 kullan\u0131n. Kap\u0131, \u00E7ekmece ve sandalye i\u00E7in gereken kullan\u0131m paylar\u0131n\u0131 at\u00F6lyeyle de\u011Ferlendirin. \u0130lk \u00F6l\u00E7\u00FCler \u00FCretim onay\u0131 de\u011Fildir.")));
        if (step === 2)
            return (0, react_1.createElement)(react_1.Fragment, null,
                (0, react_1.createElement)("span", { className: "field-label" }, "MALZEME TERC\u0130H\u0130"),
                (0, react_1.createElement)("div", { className: "material-choices" }, data_1.materials.map(m => (0, react_1.createElement)("button", { type: "button", key: m.id, className: v.material === m.name ? 'selected' : '', onClick: () => this.set('material', m.name), "aria-pressed": v.material === m.name },
                    (0, react_1.createElement)("img", { src: (0, ui_1.image)(m.image), alt: "" }),
                    (0, react_1.createElement)("span", null,
                        m.name,
                        v.material === m.name && (0, react_1.createElement)(ui_1.Icon, { name: "check", size: 16 }))))),
                (0, react_1.createElement)("button", { type: "button", className: 'choice-wide ' + (v.material === 'Danışmak istiyorum' ? 'selected' : ''), onClick: () => this.set('material', 'Danışmak istiyorum'), "aria-pressed": v.material === 'Danışmak istiyorum' },
                    "Malzeme konusunda dan\u0131\u015Fmak istiyorum ",
                    (0, react_1.createElement)(ui_1.Icon, { name: "arrow" })),
                (0, react_1.createElement)("label", { className: "form-field spaced" },
                    "Y\u00FCzey beklentiniz",
                    (0, react_1.createElement)("select", { value: v.finish, onChange: e => this.set('finish', e.currentTarget.value) },
                        (0, react_1.createElement)("option", { value: "Birlikte de\u011Ferlendirelim" }, "Birlikte de\u011Ferlendirelim"),
                        (0, react_1.createElement)("option", { value: "Do\u011Fal g\u00F6r\u00FCn\u00FCm" }, "Do\u011Fal g\u00F6r\u00FCn\u00FCm"),
                        (0, react_1.createElement)("option", { value: "Mat biti\u015F" }, "Mat biti\u015F"),
                        (0, react_1.createElement)("option", { value: "Farkl\u0131 renk / y\u00FCzey g\u00F6r\u00FC\u015Felim" }, "Farkl\u0131 renk / y\u00FCzey g\u00F6r\u00FC\u015Felim"))),
                (0, react_1.createElement)("p", { className: "small muted" }, "G\u00F6rseller temsili tonlard\u0131r. Malzeme yap\u0131s\u0131 ve y\u00FCzey i\u015Flemi numuneyle netle\u015Fir."));
        if (step === 3)
            return (0, react_1.createElement)(react_1.Fragment, null,
                (0, react_1.createElement)("label", { className: "upload-zone" },
                    (0, react_1.createElement)(ui_1.Icon, { name: "upload", size: 32 }),
                    (0, react_1.createElement)("strong", null, this.state.uploading ? 'Görseller kontrol ediliyor…' : 'Görsel eklemek için seçin'),
                    (0, react_1.createElement)("span", null, "JPG, PNG, WebP \u00B7 En fazla 5 g\u00F6rsel \u00B7 Her biri 10 MB"),
                    (0, react_1.createElement)("input", { type: "file", multiple: true, accept: "image/jpeg,image/png,image/webp", disabled: this.state.uploading, onChange: e => { this.addFiles(e.currentTarget.files); e.currentTarget.value = ''; }, "aria-label": "Referans g\u00F6rsellerini se\u00E7" })),
                (0, react_1.createElement)("div", { className: "upload-list" }, files.map((f, i) => (0, react_1.createElement)("div", { key: f.url },
                    (0, react_1.createElement)("img", { src: f.url, alt: 'Seçtiğiniz referans: ' + f.name }),
                    (0, react_1.createElement)("span", null, f.name),
                    (0, react_1.createElement)("button", { type: "button", className: "icon-button", "aria-label": f.name + ' görselini kaldır', onClick: () => { URL.revokeObjectURL(f.url); this.setState({ files: files.filter((_, n) => n !== i) }); } },
                        (0, react_1.createElement)(ui_1.Icon, { name: "close", size: 16 }))))),
                (0, react_1.createElement)("div", { className: "note-box" },
                    (0, react_1.createElement)(ui_1.Icon, { name: "info" }),
                    (0, react_1.createElement)("p", null, "G\u00F6rseller yaln\u0131z a\u00E7\u0131k sayfan\u0131zda tutulur. Yenileme veya ba\u015Fka sayfaya ge\u00E7i\u015Fte silinir. Sunucuya g\u00F6nderilmez. \u0130nsan, belge ve a\u00E7\u0131k adres gibi \u00F6zel bilgiler i\u00E7eren foto\u011Fraflar payla\u015Fmay\u0131n.")));
        if (step === 4)
            return (0, react_1.createElement)(react_1.Fragment, null,
                (0, react_1.createElement)("div", { className: "form-row" },
                    (0, react_1.createElement)("label", { className: "form-field" },
                        "\u0130l",
                        (0, react_1.createElement)("select", { value: v.city, onChange: e => this.set('city', e.currentTarget.value) },
                            (0, react_1.createElement)("option", { value: "\u0130stanbul" }, "\u0130stanbul"),
                            (0, react_1.createElement)("option", { value: "Ba\u015Fka bir il" }, "Ba\u015Fka bir il"),
                            (0, react_1.createElement)("option", { value: "Daha sonra netle\u015Ftirelim" }, "Daha sonra netle\u015Ftirelim"))),
                    this.field('district', 'İlçe / bölge (isteğe bağlı)')),
                (0, react_1.createElement)("label", { className: "form-field" },
                    "Teslim yakla\u015F\u0131m\u0131",
                    (0, react_1.createElement)("select", { value: v.delivery, onChange: e => this.set('delivery', e.currentTarget.value) },
                        (0, react_1.createElement)("option", { value: "Birlikte planlayal\u0131m" }, "Birlikte planlayal\u0131m"),
                        (0, react_1.createElement)("option", { value: "At\u00F6lyeden teslim almak istiyorum" }, "At\u00F6lyeden teslim almak istiyorum"),
                        (0, react_1.createElement)("option", { value: "Adrese teslimi g\u00F6r\u00FC\u015Fmek istiyorum" }, "Adrese teslimi g\u00F6r\u00FC\u015Fmek istiyorum"),
                        (0, react_1.createElement)("option", { value: "Teslim ve kurulum ihtiyac\u0131m var" }, "Teslim ve kurulum ihtiyac\u0131m var"))),
                (0, react_1.createElement)("div", { className: "note-box" },
                    (0, react_1.createElement)(ui_1.Icon, { name: "pin" }),
                    (0, react_1.createElement)("p", null, "Bu se\u00E7im kesin teslimat veya fiyat taahh\u00FCd\u00FC olu\u015Fturmaz. Ta\u015F\u0131ma, mek\u00E2na eri\u015Fim ve kurulum son teklifte netle\u015Fir.")));
        if (step === 5)
            return (0, react_1.createElement)(react_1.Fragment, null,
                this.field('name', 'Adınız', 'Örnek Müşteri'),
                (0, react_1.createElement)("div", { className: "form-row" },
                    this.field('email', 'E-posta', 'ornek@example.com', 'email'),
                    this.field('phone', 'Telefon (e-posta yerine de olabilir)', '', 'tel')),
                (0, react_1.createElement)("label", { className: "form-field" },
                    "Eklemek istedi\u011Finiz bir \u015Fey var m\u0131?",
                    (0, react_1.createElement)("textarea", { value: v.note, maxLength: 2000, rows: 4, onInput: e => this.set('note', e.currentTarget.value), placeholder: "Nas\u0131l kullanaca\u011F\u0131n\u0131z\u0131 ve sizin i\u00E7in \u00F6nemli ayr\u0131nt\u0131lar\u0131 anlatabilirsiniz." })),
                (0, react_1.createElement)("p", { className: "small muted" }, "Bu bilgiler yaln\u0131z indirmeniz i\u00E7in haz\u0131rlanacak \u00F6zette kullan\u0131l\u0131r. At\u00F6lyeye g\u00F6nderim yap\u0131lmaz ve ileti\u015Fim bilgisi taray\u0131c\u0131 tasla\u011F\u0131na kaydedilmez."));
        return (0, react_1.createElement)(react_1.Fragment, null,
            (0, react_1.createElement)("dl", { className: "summary-list" }, [['İhtiyaç', v.kind], ['Ölçü', v.unknown ? 'Birlikte belirlenecek' : `${v.width} × ${v.depth} × ${v.height} ${v.unit}`], ['Malzeme', v.material], ['Yüzey', v.finish], ['Teslim', v.city + ' / ' + v.delivery], ['İletişim', v.name + ' · ' + (v.email || v.phone)], ['Görseller', files.length + ' görsel, yalnız açık sayfada']].map(([k, val]) => (0, react_1.createElement)("div", { key: k },
                (0, react_1.createElement)("dt", null, k),
                (0, react_1.createElement)("dd", null, val)))),
            v.note && (0, react_1.createElement)("p", { className: "quote-note" }, v.note),
            (0, react_1.createElement)("label", { className: "check-card" },
                (0, react_1.createElement)("input", { type: "checkbox", checked: v.ack, onChange: e => this.set('ack', e.currentTarget.checked) }),
                (0, react_1.createElement)("span", null,
                    "Bu i\u015Flemin yaln\u0131z yerel bir \u00F6nizleme oldu\u011Funu anl\u0131yorum.",
                    (0, react_1.createElement)("small", null, "At\u00F6lyeye bilgi g\u00F6nderilmez, sipari\u015F veya \u00F6deme olu\u015Fturulmaz."))));
    }
    render() {
        const a = this.props, { v, step } = this.state;
        return (0, react_1.createElement)("section", { className: "quote-page wrap" },
            (0, react_1.createElement)("div", { className: "quote-heading" },
                (0, react_1.createElement)(ui_1.Eyebrow, null, "EL\u0130F / \u00D6ZEL \u00D6L\u00C7\u00DC ST\u00DCDYOSU"),
                (0, react_1.createElement)("h1", null,
                    "\u00D6l\u00E7\u00FCs\u00FC size.",
                    (0, react_1.createElement)("br", null),
                    (0, react_1.createElement)("em", null, "Hik\u00E2yesi birlikte.")),
                (0, react_1.createElement)("p", null, "Bir fikri, konu\u015Fulabilir bir tasar\u0131ma d\u00F6n\u00FC\u015Ft\u00FCrelim."),
                new URLSearchParams(this.props.query || '').has('en') && (0, react_1.createElement)("div", { className: "desk-prefill", role: "status" },
                    (0, react_1.createElement)(ui_1.Icon, { name: "check" }),
                    "Tasar\u0131m masan\u0131zdaki \u00F6l\u00E7\u00FC ve malzeme tercihleri bu talebe aktar\u0131ld\u0131. Her ad\u0131mda de\u011Fi\u015Ftirebilirsiniz.")),
            this.state.done ? (0, react_1.createElement)("div", { className: "quote-success" },
                (0, react_1.createElement)("span", { className: "success-mark" },
                    (0, react_1.createElement)(ui_1.Icon, { name: "check", size: 30 })),
                (0, react_1.createElement)(ui_1.Eyebrow, null, "\u00D6N\u0130ZLEME TAMAMLANDI"),
                (0, react_1.createElement)("h2", null,
                    "Fikriniz art\u0131k",
                    (0, react_1.createElement)("br", null),
                    (0, react_1.createElement)("em", null, "bir arada.")),
                (0, react_1.createElement)("p", null,
                    "Talep \u00F6zetiniz haz\u0131r. ",
                    (0, react_1.createElement)("strong", null, "At\u00F6lyeye g\u00F6nderilmedi."),
                    (0, react_1.createElement)("br", null),
                    "Bu bir sipari\u015F, fiyat teklifi veya \u00FCretim onay\u0131 de\u011Fildir."),
                (0, react_1.createElement)("div", { className: "success-summary" },
                    (0, react_1.createElement)("pre", null, this.summary())),
                (0, react_1.createElement)("div", { className: "action-row" },
                    (0, react_1.createElement)("button", { type: "button", className: "button", onClick: () => (0, domain_1.downloadText)('Elif_Tasarim_Talep_Ozeti.txt', this.summary()) },
                        "\u00D6zeti indir ",
                        (0, react_1.createElement)(ui_1.Icon, { name: "download" })),
                    (0, react_1.createElement)("button", { type: "button", className: "button button-outline", onClick: () => this.setState({ done: false, step: 6 }) },
                        "\u00D6zeti d\u00FCzenle ",
                        (0, react_1.createElement)(ui_1.Icon, null))),
                (0, react_1.createElement)(ui_1.Link, { to: "/urunler", navigate: a.navigate, className: "text-link" },
                    "Koleksiyona d\u00F6n ",
                    (0, react_1.createElement)(ui_1.Icon, null))) : (0, react_1.createElement)("div", { className: "wizard-layout" },
                (0, react_1.createElement)("aside", { className: "wizard-aside" },
                    (0, react_1.createElement)("ol", { className: "step-list" }, labels.map((s, i) => (0, react_1.createElement)("li", { key: s, className: i === step ? 'current' : i < step ? 'complete' : '', "aria-current": i === step ? 'step' : undefined },
                        (0, react_1.createElement)("button", { type: "button", disabled: i > step, onClick: () => this.setState({ step: i, errors: {} }) },
                            (0, react_1.createElement)("span", null, i < step ? (0, react_1.createElement)(ui_1.Icon, { name: "check", size: 14 }) : String(i + 1).padStart(2, '0')),
                            s)))),
                    (0, react_1.createElement)("div", { className: "wizard-help" },
                        (0, react_1.createElement)(ui_1.Icon, { name: "ruler", size: 28 }),
                        (0, react_1.createElement)("h3", null, "Her \u015Feyin cevab\u0131n\u0131 bilmeniz gerekmiyor."),
                        (0, react_1.createElement)("p", null, "\u00D6l\u00E7\u00FC, malzeme ve teslim detaylar\u0131n\u0131 birlikte de\u011Ferlendirmek i\u00E7in buraday\u0131z."),
                        (0, react_1.createElement)("span", null, "Temsili ak\u0131\u015F \u00B7 Canl\u0131 g\u00F6nderim yok"))),
                (0, react_1.createElement)("div", { className: "wizard-card" },
                    (0, react_1.createElement)("div", { className: "wizard-topline" },
                        (0, react_1.createElement)("span", null,
                            "ADIM ",
                            step + 1,
                            " / 7"),
                        (0, react_1.createElement)("span", null,
                            Math.round((step + 1) / 7 * 100),
                            "%")),
                    (0, react_1.createElement)("div", { className: "progress-bar" },
                        (0, react_1.createElement)("span", { style: { width: (step + 1) / 7 * 100 + '%' } })),
                    (0, react_1.createElement)("h2", { id: "wizard-title", tabIndex: -1 }, stepTitles[step]),
                    (0, react_1.createElement)("p", { className: "wizard-subtitle" }, stepDescriptions[step]),
                    this.state.hasDraft && step === 0 && (0, react_1.createElement)("div", { className: "draft-alert" },
                        (0, react_1.createElement)("span", null, "Bu cihazda kaydedilmi\u015F \u00F6l\u00E7\u00FC tercihleri var."),
                        (0, react_1.createElement)("button", { type: "button", onClick: () => {
                                const saved = (0, domain_1.readLocal)('quote-draft', null);
                                if (saved)
                                    this.setState({ v: { ...initial, ...(0, domain_1.safeDraft)(saved) }, hasDraft: false });
                            } },
                            "Tercihleri getir ",
                            (0, react_1.createElement)(ui_1.Icon, { size: 16 }))),
                    (0, react_1.createElement)("form", { onSubmit: e => {
                            e.preventDefault();
                            if (step < 6)
                                this.next();
                            else if (v.ack)
                                this.setState({ done: true });
                        }, noValidate: true },
                        (0, react_1.createElement)("div", { className: "wizard-content" }, this.renderStep()),
                        (0, react_1.createElement)("div", { className: "wizard-actions" },
                            (0, react_1.createElement)("button", { className: "back-button", type: "button", disabled: step === 0, onClick: () => this.setState({ step: step - 1, errors: {} }) },
                                (0, react_1.createElement)("span", { className: "reverse-arrow" },
                                    (0, react_1.createElement)(ui_1.Icon, null)),
                                "Geri"),
                            (0, react_1.createElement)("button", { className: "button", type: "submit", disabled: this.state.uploading || (step === 6 && !v.ack) },
                                step === 6 ? 'Talep özetini hazırla' : 'Devam et',
                                (0, react_1.createElement)(ui_1.Icon, null)))),
                    (0, react_1.createElement)("div", { className: "save-draft-row" },
                        (0, react_1.createElement)("button", { type: "button", onClick: () => { const ok = (0, domain_1.writeLocal)('quote-draft', (0, domain_1.safeDraft)(v), 7); a.notify(ok ? 'Yalnız ürün, ölçü ve malzeme tercihleri bu cihazda 7 gün saklandı. İletişim, not ve fotoğraf kaydedilmedi.' : 'Tarayıcı kayıt izni vermedi. Bu sayfada çalışmaya devam edebilirsiniz.'); } }, "\u00D6l\u00E7\u00FC tercihlerini bu cihazda sakla"),
                        (0, react_1.createElement)("span", null, "\u0130leti\u015Fim ve foto\u011Fraflar kaydedilmez.")))));
    }
}
exports.Quote = Quote;

},"src/pages/DesignDesk":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesignDesk = void 0;
exports.TableDrawing = TableDrawing;
const react_1 = require("react");
const ui_1 = require("../components/ui");
const domain_1 = require("../lib/domain");
const desk_1 = require("../lib/desk");
const poly = (pts) => pts.map(p => p.join(',')).join(' ');
function TableDrawing({ desk, id = 'desk', compact = false }) {
    const { project: p, w, dep, h, top } = (0, desk_1.tableGeometry)(desk), mat = desk_1.deskMaterials[desk.material];
    const box = (x, y, z, dx, dy, dz, key) => (0, react_1.createElement)("g", { key: key },
        (0, react_1.createElement)("polygon", { points: poly([p(x, y, z), p(x + dx, y, z), p(x + dx, y, z + dz), p(x, y, z + dz)]), fill: desk.base === 'wood' ? '#77543c' : '#48473f' }),
        (0, react_1.createElement)("polygon", { points: poly([p(x + dx, y, z), p(x + dx, y + dy, z), p(x + dx, y + dy, z + dz), p(x + dx, y, z + dz)]), fill: desk.base === 'wood' ? '#4a3020' : '#2e302c' }),
        (0, react_1.createElement)("polygon", { points: poly([p(x, y, z + dz), p(x + dx, y, z + dz), p(x + dx, y + dy, z + dz), p(x, y + dy, z + dz)]), fill: desk.base === 'wood' ? '#9a7152' : '#68695d' }));
    const topW = desk.width * 2, topD = desk.depth * 2;
    return (0, react_1.createElement)("svg", { className: 'table-drawing ' + (compact ? 'compact' : ''), viewBox: "0 0 740 470", role: "img", "aria-label": `Temsili masa çizimi, ${desk.width} santimetre en, ${desk.depth} santimetre derinlik, ${desk.height} santimetre yükseklik`, "data-width": desk.width, "data-depth": desk.depth, "data-height": desk.height },
        (0, react_1.createElement)("defs", null,
            (0, react_1.createElement)("pattern", { id: id + 'grain', patternUnits: "userSpaceOnUse", width: "320", height: "320" },
                (0, react_1.createElement)("image", { href: (0, ui_1.image)(mat.image), width: "320", height: "320", preserveAspectRatio: "xMidYMid slice" })),
            (0, react_1.createElement)("pattern", { id: id + 'grid', width: "24", height: "24", patternUnits: "userSpaceOnUse" },
                (0, react_1.createElement)("path", { d: "M24 0H0V24", fill: "none", stroke: "#81745f", "stroke-width": ".35", opacity: ".25" })),
            (0, react_1.createElement)("radialGradient", { id: id + 'shadow' },
                (0, react_1.createElement)("stop", { offset: "0", "stop-color": "#655541", "stop-opacity": ".19" }),
                (0, react_1.createElement)("stop", { offset: "1", "stop-color": "#655541", "stop-opacity": "0" }))),
        (0, react_1.createElement)("rect", { width: "740", height: "470", fill: `url(#${id}grid)` }),
        desk.view === 'top' ? (0, react_1.createElement)("g", null,
            (0, react_1.createElement)("rect", { x: 370 - topW / 2, y: 235 - topD / 2, width: topW, height: topD, rx: "8", fill: `url(#${id}grain)`, stroke: "#594533", "stroke-width": "2" }),
            (0, react_1.createElement)("path", { d: `M${370 - topW / 2} ${255 + topD / 2}H${370 + topW / 2}`, stroke: "#76654f", "stroke-dasharray": "3 4" }),
            (0, react_1.createElement)("text", { x: "370", y: 278 + topD / 2, "text-anchor": "middle", fill: "#554735", "font-size": "15" },
                desk.width,
                " cm"),
            (0, react_1.createElement)("text", { x: 395 + topW / 2, y: "238", fill: "#554735", "font-size": "15" },
                desk.depth,
                " cm")) : (0, react_1.createElement)("g", null,
            (0, react_1.createElement)("ellipse", { cx: "370", cy: "360", rx: "300", ry: "80", fill: `url(#${id}shadow)` }),
            desk.base === 'wood' ? [[-w + 14, -dep + 8], [w - 22, -dep + 8], [-w + 14, dep - 16], [w - 22, dep - 16]].map(([x, y], i) => box(x, y, 0, 8, 8, h - 4, 'leg' + i)) : [-w + 20, w - 27].map((x, i) => (0, react_1.createElement)("g", { key: i },
                box(x, -dep + 4, 0, 9, dep * 2 - 8, 3, 'foot' + i),
                box(x, -4, 3, 9, 8, h - 7, 'post' + i),
                desk.base === 'adjustable' && box(x - .6, -4.6, h * .46, 10.2, 9.2, 3, 'collar' + i),
                box(x, -dep + 4, h - 8, 9, dep * 2 - 8, 4, 'arm' + i))),
            (0, react_1.createElement)("polygon", { points: poly([p(-w, dep, h - 4), p(w, dep, h - 4), p(w, dep, h), p(-w, dep, h)]), fill: "#654329" }),
            (0, react_1.createElement)("polygon", { points: poly([p(w, -dep, h - 4), p(w, dep, h - 4), p(w, dep, h), p(w, -dep, h)]), fill: "#4b3222" }),
            (0, react_1.createElement)("polygon", { "data-testid": "desk-top", points: poly(top), fill: `url(#${id}grain)`, stroke: "#62472f", "stroke-width": "1" }),
            (0, react_1.createElement)("polygon", { points: poly(top), fill: mat.color, opacity: ".13" }),
            !compact && (0, react_1.createElement)("g", { fill: "#6c5b46", stroke: "#8d7a61", "stroke-width": ".7" },
                (0, react_1.createElement)("path", { d: `M${p(-w, dep + 20, h - 12).join(' ')}L${p(w, dep + 20, h - 12).join(' ')}`, "stroke-dasharray": "3 4" }),
                (0, react_1.createElement)("text", { x: p(0, dep + 20, h - 12)[0], y: p(0, dep + 20, h - 12)[1] + 23, "font-size": "15", "text-anchor": "middle", stroke: "none" },
                    desk.width,
                    " cm"),
                (0, react_1.createElement)("path", { d: `M${p(w + 25, dep, h).join(' ')}L${p(w + 25, -dep, h).join(' ')}`, "stroke-dasharray": "3 4" }),
                (0, react_1.createElement)("text", { x: p(w + 25, 0, h)[0] + 17, y: p(w + 25, 0, h)[1] + 5, "font-size": "15", stroke: "none" },
                    desk.depth,
                    " cm"),
                (0, react_1.createElement)("path", { d: `M${p(-w - 22, -dep, 0).join(' ')}L${p(-w - 22, -dep, h).join(' ')}`, "stroke-dasharray": "3 4" }),
                (0, react_1.createElement)("text", { x: p(-w - 22, -dep, h / 2)[0] - 10, y: p(-w - 22, -dep, h / 2)[1], "font-size": "15", "text-anchor": "end", stroke: "none" },
                    desk.height,
                    " cm"))));
}
class DesignDesk extends react_1.Component {
    constructor(props) {
        super(props);
        this.change = (key, value) => this.setState(s => ({ desk: { ...s.desk, [key]: value } }));
        this.state = { desk: (0, desk_1.deskFromParams)(new URLSearchParams(props.query || '')) };
    }
    render() {
        const d = this.state.desk, a = this.props;
        return (0, react_1.createElement)(react_1.Fragment, null,
            (0, react_1.createElement)("section", { className: "desk-intro wrap" },
                (0, react_1.createElement)(ui_1.Eyebrow, null, "EL\u0130F / D\u0130J\u0130TAL TASARIM MASASI"),
                (0, react_1.createElement)("div", null,
                    (0, react_1.createElement)("h1", null,
                        "\u00D6nce bir fikir.",
                        (0, react_1.createElement)("br", null),
                        (0, react_1.createElement)("em", null, "Sonra sizin par\u00E7an\u0131z.")),
                    (0, react_1.createElement)("p", null, "\u00D6l\u00E7\u00FCy\u00FC de\u011Fi\u015Ftirin. Dokuyu se\u00E7in. Mek\u00E2n\u0131n\u0131za nas\u0131l bir par\u00E7a yak\u0131\u015Faca\u011F\u0131n\u0131 birlikte d\u00FC\u015F\u00FCnmeye ba\u015Flayal\u0131m."))),
            (0, react_1.createElement)("section", { className: "desk-layout wrap", "aria-label": "Tasar\u0131m masas\u0131" },
                (0, react_1.createElement)("div", { className: "desk-paper" },
                    (0, react_1.createElement)("div", { className: "desk-paper-top" },
                        (0, react_1.createElement)("span", null, "\u00C7ALI\u015EMA NO. 01 / MASA"),
                        (0, react_1.createElement)("div", { role: "group", "aria-label": "\u00C7izim g\u00F6r\u00FCn\u00FCm\u00FC" },
                            (0, react_1.createElement)("button", { "aria-pressed": d.view === 'perspective', onClick: () => this.change('view', 'perspective') }, "Perspektif"),
                            (0, react_1.createElement)("button", { "aria-pressed": d.view === 'top', onClick: () => this.change('view', 'top') }, "\u00DCstten"))),
                    (0, react_1.createElement)(TableDrawing, { desk: d }),
                    (0, react_1.createElement)("div", { className: "desk-paper-bottom" },
                        (0, react_1.createElement)("span", null, "ET / TASARIM \u00C7ALI\u015EMASI"),
                        (0, react_1.createElement)("span", null, "\u015Eematik \u00E7izim. Teknik \u00FCretim projesi de\u011Fildir.")),
                    (0, react_1.createElement)("div", { className: "desk-live", "aria-live": "polite" },
                        desk_1.deskMaterials[d.material].name,
                        " ",
                        (0, react_1.createElement)("i", null),
                        " ",
                        d.width,
                        " \u00D7 ",
                        d.depth,
                        " \u00D7 ",
                        d.height,
                        " cm ",
                        (0, react_1.createElement)("i", null),
                        " ",
                        desk_1.deskBases[d.base])),
                (0, react_1.createElement)("div", { className: "desk-controls" },
                    (0, react_1.createElement)(ui_1.Eyebrow, null, "01 / \u00D6L\u00C7\u00DCYLE BA\u015ELAYALIM"),
                    (0, react_1.createElement)("h2", null,
                        "Size ne kadar",
                        (0, react_1.createElement)("br", null),
                        (0, react_1.createElement)("em", null, "yer a\u00E7al\u0131m?")),
                    [['width', 'En', 100, 240], ['depth', 'Derinlik', 50, 100], ['height', 'Yükseklik', 60, 125]].map(([key, label, min, max]) => (0, react_1.createElement)("label", { className: "desk-slider", key: key },
                        (0, react_1.createElement)("span", null,
                            label,
                            (0, react_1.createElement)("output", null,
                                d[key],
                                " ",
                                (0, react_1.createElement)("small", null, "cm"))),
                        (0, react_1.createElement)("input", { "aria-label": 'Masa ' + label.toLocaleLowerCase('tr'), type: "range", min: min, max: max, step: "5", value: d[key], onInput: e => this.change(key, Number(e.currentTarget.value)) }),
                        (0, react_1.createElement)("span", { className: "slider-bounds" },
                            (0, react_1.createElement)("small", null,
                                min,
                                " cm"),
                            (0, react_1.createElement)("small", null,
                                max,
                                " cm")))),
                    (0, react_1.createElement)("div", { className: "desk-choice" },
                        (0, react_1.createElement)("span", { className: "field-label" }, "02 / MALZEME F\u0130KR\u0130"),
                        (0, react_1.createElement)("div", { className: "desk-swatches" }, Object.entries(desk_1.deskMaterials).map(([id, m]) => (0, react_1.createElement)("button", { key: id, "aria-pressed": d.material === id, "aria-label": m.name + ' malzeme fikri', onClick: () => this.change('material', id) },
                            (0, react_1.createElement)("span", { style: { backgroundImage: `url(${(0, ui_1.image)(m.image)})` } }),
                            m.name)))),
                    (0, react_1.createElement)("label", { className: "desk-choice" },
                        (0, react_1.createElement)("span", { className: "field-label" }, "03 / TA\u015EIYICI YAKLA\u015EIMI"),
                        (0, react_1.createElement)("select", { "aria-label": "Ta\u015F\u0131y\u0131c\u0131 yakla\u015F\u0131m\u0131", value: d.base, onChange: e => this.change('base', e.currentTarget.value) }, Object.entries(desk_1.deskBases).map(([k, v]) => (0, react_1.createElement)("option", { key: k, value: k }, v)))),
                    (0, react_1.createElement)(ui_1.ButtonLink, { to: '/teklif-al?urun=rota-calisma-masasi&' + (0, desk_1.deskQuery)(d), navigate: a.navigate }, "Bu fikirle devam et"),
                    (0, react_1.createElement)("button", { className: "text-link desk-download", onClick: () => (0, domain_1.downloadText)('elif-tasarim-fikrim.txt', (0, desk_1.deskSummary)(d)) },
                        "Tasar\u0131m \u00F6zetini indir ",
                        (0, react_1.createElement)(ui_1.Icon, { name: "download" })))),
            (0, react_1.createElement)("div", { className: "wrap desk-disclaimer" },
                (0, react_1.createElement)(ui_1.Icon, { name: "info" }),
                (0, react_1.createElement)("p", null, "Bu \u00E7al\u0131\u015Fma bir g\u00F6rsel fikir arac\u0131d\u0131r. Se\u00E7enekler \u00FCretilebilirlik veya fiyat onay\u0131 de\u011Fildir. \u00D6zellikle y\u00FCkseklik mekanizmas\u0131, tabla a\u011F\u0131rl\u0131\u011F\u0131 ve montaj uyumu at\u00F6lye taraf\u0131ndan do\u011Frulanmal\u0131d\u0131r. Malzemeler temsili numunelerdir. Bilgi g\u00F6nderilmez.")));
    }
}
exports.DesignDesk = DesignDesk;

}}); Object.assign(modules,{"src/App":function(module,exports,require){
'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const data_1 = require("./lib/data");
const domain_1 = require("./lib/domain");
const ui_1 = require("./components/ui");
const DesignDesk_1 = require("./pages/DesignDesk");
const Home_1 = require("./pages/Home");
const Catalog_1 = require("./pages/Catalog");
const Editorial_1 = require("./pages/Editorial");
const Quote_1 = require("./pages/Quote");
const Commerce_1 = require("./pages/Commerce");
const Studio_1 = require("./pages/Studio");
const routes_1 = require("./lib/routes");
class App extends react_1.Component {
    constructor(props) {
        super(props);
        this.onScroll = () => { const scrolled = window.scrollY > 650; if (scrolled !== this.state.scrolled)
            this.setState({ scrolled }); };
        this.currentLocation = () => { const path = window.__ELIF_PREVIEW__ ? (window.location.hash.slice(1) || '/') : (window.location.pathname.replace(/\/+$/, '') || '/') + window.location.search; return path.startsWith('/') ? path : '/'; };
        this.onLocation = () => { this.setState({ path: this.currentLocation(), menu: false, search: false }, this.afterRoute); };
        this.afterRoute = () => { document.title = (0, routes_1.pageTitle)(this.state.path); window.scrollTo({ top: 0, behavior: 'instant' }); this.onScroll(); };
        this.navigate = (path) => {
            if (path === this.state.path) {
                this.setState({ menu: false, search: false });
                return;
            }
            history.pushState({}, '', (0, domain_1.publicHref)(path));
            this.setState({ path, menu: false, search: false, searchQuery: '' }, () => { this.afterRoute(); setTimeout(() => document.querySelector('main')?.focus({ preventScroll: true }), 50); });
        };
        this.notify = (toast) => {
            if (this.timer)
                clearTimeout(this.timer);
            this.setState({ toast });
            this.timer = setTimeout(() => this.setState({ toast: '' }), 5500);
        };
        this.favorite = (id) => { const exists = this.state.favorites.includes(id); const favorites = exists ? this.state.favorites.filter(x => x !== id) : [...this.state.favorites, id]; this.setState({ favorites }); const stored = (0, domain_1.writeLocal)('favorites', favorites); this.notify(exists ? 'Çalışma dosyanızdan çıkarıldı.' : stored ? 'Bu cihazdaki çalışma dosyanıza kaydedildi.' : 'Bu açık sayfada kaydedildi. Tarayıcı kalıcı depolamaya izin vermedi.'); };
        this.addCart = (p, material, size, quantity) => {
            if (p.price === null || !(0, domain_1.validQuantity)(quantity) || !p.sizes.includes(size) || !['Ceviz', 'Meşe'].includes(material))
                return;
            const key = (0, domain_1.cartKey)(p.id, material, size), old = this.state.cart.find(l => l.key === key);
            if (old && old.quantity + quantity > 100) {
                this.notify('Bir satırda en fazla 100 adet seçilebilir.');
                return;
            }
            const cart = old ? this.state.cart.map(l => l.key === key ? { ...l, quantity: l.quantity + quantity } : l) : [...this.state.cart, { key, id: p.id, material, size, quantity, unitMinor: p.price + Math.max(0, p.sizes.indexOf(size)) * 700000 }];
            this.setState({ cart });
            const stored = (0, domain_1.writeLocal)('cart', cart);
            this.notify(p.name + ' örnek sepete eklendi. ' + (stored ? 'Gerçek sipariş oluşturulmadı.' : 'Tarayıcı depolaması kapalı; yalnız bu açık sayfada tutuluyor.'));
        };
        this.changeCart = (key, quantity) => {
            if (!(0, domain_1.validQuantity)(quantity))
                return;
            const cart = this.state.cart.map(l => l.key === key ? { ...l, quantity } : l);
            this.setState({ cart });
            (0, domain_1.writeLocal)('cart', cart);
        };
        this.removeCart = (key) => { const cart = this.state.cart.filter(l => l.key !== key); this.setState({ cart }); (0, domain_1.writeLocal)('cart', cart); this.notify('Parça örnek sepetten çıkarıldı.'); };
        this.actions = () => ({ navigate: this.navigate, notify: this.notify, favorites: this.state.favorites, favorite: this.favorite, cart: this.state.cart, addCart: this.addCart, changeCart: this.changeCart, removeCart: this.removeCart, openInfo: () => this.setState({ info: true }) });
        this.state = { path: props.initialPath || '/', scrolled: false, cart: [], favorites: [], menu: false, search: false, searchQuery: '', info: false, toast: '' };
    }
    componentDidMount() {
        let favorites = (0, domain_1.readLocal)('favorites', []), rawCart = (0, domain_1.readLocal)('cart', []);
        if (!Array.isArray(favorites))
            favorites = [];
        const cart = [];
        if (Array.isArray(rawCart))
            for (const l of rawCart) {
                const p = data_1.products.find(p => p.id === l?.id);
                if (p && p.price !== null && p.sizes.includes(l.size) && ['Ceviz', 'Meşe'].includes(l.material) && (0, domain_1.validQuantity)(l.quantity)) {
                    cart.push({ ...l, key: (0, domain_1.cartKey)(p.id, l.material, l.size), unitMinor: p.price + Math.max(0, p.sizes.indexOf(l.size)) * 700000 });
                }
            }
        this.setState({ path: this.currentLocation(), favorites: [...new Set(favorites.filter(id => data_1.products.some(p => p.id === id)))], cart }, this.afterRoute);
        window.addEventListener('hashchange', this.onLocation);
        window.addEventListener('popstate', this.onLocation);
        window.addEventListener('scroll', this.onScroll, { passive: true });
        this.onScroll();
    }
    componentWillUnmount() {
        window.removeEventListener('hashchange', this.onLocation);
        window.removeEventListener('popstate', this.onLocation);
        window.removeEventListener('scroll', this.onScroll);
        if (this.timer)
            clearTimeout(this.timer);
    }
    renderPage() {
        const a = this.actions(), [path, qs = ''] = this.state.path.split('?'), params = new URLSearchParams(qs);
        if (path === '/')
            return (0, react_1.createElement)(Home_1.Home, { ...a });
        if (path === '/tasarim-masasi')
            return (0, react_1.createElement)(DesignDesk_1.DesignDesk, { key: this.state.path, ...a, query: qs });
        if (path === '/urunler')
            return (0, react_1.createElement)(Catalog_1.Catalog, { key: this.state.path, ...a, initialCategory: data_1.categories.some(c => c.id === params.get('alan')) ? params.get('alan') : 'all', initialQuery: (params.get('q') || '').slice(0, 200), initialSort: params.get('sirala') || 'editorial' });
        if (path.startsWith('/urun/')) {
            const p = data_1.products.find(p => '/urun/' + p.id === path);
            if (p)
                return (0, react_1.createElement)(Catalog_1.ProductPage, { key: p.id, ...a, product: p });
        }
        const pages = { '/atolyemiz': Editorial_1.Atelier, '/ozel-uretim': Editorial_1.Bespoke, '/malzemeler': Editorial_1.Materials, '/mekan-fikirleri': Editorial_1.Ideas, '/rehber': Editorial_1.Journal, '/sikca-sorulan-sorular': Editorial_1.FAQ, '/iletisim': Commerce_1.Contact, '/sepet': Commerce_1.Cart, '/odeme': Commerce_1.Checkout, '/calisma-dosyam': Commerce_1.Saved, '/gizlilik': Editorial_1.Privacy, '/atolye-demolari': Studio_1.Studio };
        if (path === '/teklif-al')
            return (0, react_1.createElement)(Quote_1.Quote, { key: this.state.path, ...a, productId: params.get('urun') || undefined, query: qs });
        if (path.startsWith('/mekan-fikirleri/') && data_1.ideas.some(i => '/mekan-fikirleri/' + i.id === path))
            return (0, react_1.createElement)(Editorial_1.Ideas, { ...a, slug: path.split('/').pop() });
        if (path.startsWith('/rehber/') && data_1.journal.some(i => '/rehber/' + i.id === path))
            return (0, react_1.createElement)(Editorial_1.Journal, { ...a, slug: path.split('/').pop() });
        const Page = pages[path];
        if (Page)
            return (0, react_1.createElement)(Page, { key: path, ...a });
        return (0, react_1.createElement)("section", { className: "wrap empty-state missing-page" },
            (0, react_1.createElement)(ui_1.Eyebrow, null, "404 / B\u0130R YOL AYRIMI"),
            (0, react_1.createElement)("h1", null,
                "Bu sayfay\u0131",
                (0, react_1.createElement)("br", null),
                (0, react_1.createElement)("em", null, "bulamad\u0131k.")),
            (0, react_1.createElement)("p", null, "Koleksiyona veya at\u00F6lyenin ana sayfas\u0131na d\u00F6nebilirsiniz."),
            (0, react_1.createElement)(ui_1.ButtonLink, { to: "/", navigate: this.navigate }, "At\u00F6lyeye d\u00F6n"));
    }
    render() {
        const s = this.state, a = this.actions(), count = s.cart.reduce((n, l) => n + l.quantity, 0);
        const nav = (to, label) => (0, react_1.createElement)(ui_1.Link, { key: to, to: to, navigate: this.navigate, "aria-current": s.path.split('?')[0] === to ? 'page' : undefined }, label);
        const results = data_1.products.filter(p => (0, domain_1.searchKey)(p.name + ' ' + p.categoryLabel + ' ' + p.material + ' ' + p.id + ' ' + p.category).includes((0, domain_1.searchKey)(s.searchQuery)));
        return (0, react_1.createElement)(react_1.Fragment, null,
            (0, react_1.createElement)("a", { href: "#main-content", className: "skip-link", onClick: e => { e.preventDefault(); const main = document.getElementById("main-content"); main?.focus({ preventScroll: true }); main?.scrollIntoView({ block: "start", behavior: "instant" }); } }, "\u0130\u00E7eri\u011Fe ge\u00E7"),
            (0, react_1.createElement)("div", { className: "preview-bar" },
                (0, react_1.createElement)("span", null,
                    "V5 / TASARIM \u00D6N\u0130ZLEMES\u0130 ",
                    (0, react_1.createElement)("i", null),
                    " Temsili \u00FCr\u00FCnler \u00B7 Canl\u0131 sat\u0131\u015F yok"),
                (0, react_1.createElement)("button", { onClick: () => this.setState({ info: true }) },
                    "Bu s\u00FCr\u00FCm hakk\u0131nda ",
                    (0, react_1.createElement)(ui_1.Icon, { name: "info", size: 14 }))),
            (0, react_1.createElement)("header", { className: 'site-header ' + (s.path === '/' ? 'home-header' : '') + (s.scrolled ? ' is-floating' : '') },
                (0, react_1.createElement)("div", { className: "header-inner" },
                    (0, react_1.createElement)("nav", { className: "nav-left", "aria-label": "Ana gezinme" },
                        nav('/urunler', 'Koleksiyon'),
                        nav('/ozel-uretim', 'Özel Üretim'),
                        nav('/atolyemiz', 'Atölyemiz')),
                    (0, react_1.createElement)("button", { className: "icon-button mobile-menu", "aria-label": "Men\u00FCy\u00FC a\u00E7", onClick: () => this.setState({ menu: true }) },
                        (0, react_1.createElement)(ui_1.Icon, { name: "menu", size: 25 })),
                    (0, react_1.createElement)(ui_1.Link, { to: "/", navigate: this.navigate, className: "brand", "aria-label": "Elif Tasar\u0131m ana sayfa" },
                        (0, react_1.createElement)("img", { src: (0, ui_1.image)('elif-amblem.png'), alt: "" }),
                        (0, react_1.createElement)("span", null,
                            "EL\u0130F TASARIM",
                            (0, react_1.createElement)("small", null, "EL YAPIMI MOB\u0130LYA AT\u00D6LYES\u0130"))),
                    (0, react_1.createElement)("div", { className: "nav-right" },
                        (0, react_1.createElement)("nav", { "aria-label": "Di\u011Fer sayfalar" },
                            nav('/malzemeler', 'Malzemeler'),
                            nav('/tasarim-masasi', 'Tasarım Masası')),
                        (0, react_1.createElement)("div", { className: "header-tools" },
                            (0, react_1.createElement)("button", { className: "icon-button", "aria-label": "Sitede ara", onClick: () => this.setState({ search: true }) },
                                (0, react_1.createElement)(ui_1.Icon, { name: "search" })),
                            (0, react_1.createElement)(ui_1.Link, { to: "/calisma-dosyam", navigate: this.navigate, className: "icon-button save-nav", "aria-label": 'Kaydedilenler, ' + s.favorites.length + ' ürün' },
                                (0, react_1.createElement)(ui_1.Icon, { name: "heart" }),
                                s.favorites.length > 0 && (0, react_1.createElement)("span", { className: "nav-dot" })),
                            (0, react_1.createElement)(ui_1.Link, { to: "/sepet", navigate: this.navigate, className: "icon-button cart-nav", "aria-label": 'Sepet, ' + count + ' ürün' },
                                (0, react_1.createElement)(ui_1.Icon, { name: "bag" }),
                                (0, react_1.createElement)("span", null, count)))))),
            (0, react_1.createElement)("main", { id: "main-content", tabIndex: -1, key: s.path.split('?')[0] }, this.renderPage()),
            (0, react_1.createElement)("footer", { className: "site-footer" },
                (0, react_1.createElement)("div", { className: "wrap" },
                    (0, react_1.createElement)("div", { className: "footer-top" },
                        (0, react_1.createElement)("div", null,
                            (0, react_1.createElement)(ui_1.Link, { to: "/", navigate: this.navigate, className: "brand footer-brand" },
                                (0, react_1.createElement)("img", { src: (0, ui_1.image)('elif-amblem-light.png'), alt: "" }),
                                (0, react_1.createElement)("span", null,
                                    "EL\u0130F TASARIM",
                                    (0, react_1.createElement)("small", null, "EL YAPIMI MOB\u0130LYA AT\u00D6LYES\u0130"))),
                            (0, react_1.createElement)("p", null,
                                "Zamana de\u011Fer",
                                (0, react_1.createElement)("br", null),
                                (0, react_1.createElement)("em", null, "katan mobilyalar."))),
                        (0, react_1.createElement)("div", { className: "footer-column" },
                            (0, react_1.createElement)("h2", null, "Ke\u015Ffedin"),
                            nav('/urunler', 'Koleksiyon'),
                            nav('/mekan-fikirleri', 'Mekân fikirleri'),
                            nav('/malzemeler', 'Malzemeler'),
                            nav('/calisma-dosyam', 'Kaydedilenler')),
                        (0, react_1.createElement)("div", { className: "footer-column" },
                            (0, react_1.createElement)("h2", null, "At\u00F6lye"),
                            nav('/atolyemiz', 'Hikâyemiz'),
                            nav('/ozel-uretim', 'Nasıl çalışıyoruz?'),
                            nav('/rehber', 'Atölye notları'),
                            nav('/sikca-sorulan-sorular', 'Sorular')),
                        (0, react_1.createElement)("div", { className: "footer-column footer-contact" },
                            (0, react_1.createElement)("h2", null, "Birlikte ba\u015Flayal\u0131m"),
                            (0, react_1.createElement)("p", null,
                                "\u0130stanbul, T\u00FCrkiye",
                                (0, react_1.createElement)("br", null),
                                "Do\u011Frudan at\u00F6lyeden, sizin i\u00E7in."),
                            (0, react_1.createElement)(ui_1.TextLink, { to: "/teklif-al", navigate: this.navigate, light: true }, "\u00D6zel \u00F6l\u00E7\u00FC st\u00FCdyosu"),
                            nav('/iletisim', 'İletişim'))),
                    (0, react_1.createElement)("div", { className: "footer-wordmark", "aria-hidden": "true" },
                        "elif tasar\u0131m",
                        (0, react_1.createElement)("span", null, "AT\u00D6LYE")),
                    (0, react_1.createElement)("div", { className: "footer-bottom" },
                        (0, react_1.createElement)("span", null, "EL\u0130F TASARIM \u00B7 V5 TASARIM \u00D6N\u0130ZLEMES\u0130 / 2026"),
                        (0, react_1.createElement)("div", null,
                            nav('/gizlilik', 'Önizleme gizliliği'),
                            (0, react_1.createElement)("button", { onClick: () => this.setState({ info: true }) }, "Depolama tercihleri"),
                            nav('/atolye-demolari', 'Atölye demosu')),
                        (0, react_1.createElement)("span", null, "\u00D6zenle d\u00FC\u015F\u00FCn\u00FCl\u00FCr. At\u00F6lyede \u015Fekillenir.")),
                    (0, react_1.createElement)("p", { className: "footer-disclosure" }, "\u00DCr\u00FCn isimleri, fiyatlar, \u00F6l\u00E7\u00FCler ve g\u00F6rseller konsept ama\u00E7l\u0131d\u0131r. Ger\u00E7ek katalog, referans veya ticari taahh\u00FCt de\u011Fildir."))),
            s.menu && (0, react_1.createElement)(ui_1.Dialog, { title: "Elif Tasar\u0131m", onClose: () => this.setState({ menu: false }) },
                (0, react_1.createElement)("nav", { className: "mobile-links", "aria-label": "Mobil men\u00FC" }, [['/urunler', 'Koleksiyon'], ['/ozel-uretim', 'Özel Üretim'], ['/atolyemiz', 'Atölyemiz'], ['/mekan-fikirleri', 'Mekân Fikirleri'], ['/malzemeler', 'Malzemeler'], ['/tasarim-masasi', 'Tasarım Masası'], ['/rehber', 'Atölye Notları'], ['/iletisim', 'İletişim'], ['/teklif-al', 'Özel Ölçü Stüdyosu']].map(([p, label], i) => (0, react_1.createElement)(ui_1.Link, { key: p, to: p, navigate: this.navigate },
                    (0, react_1.createElement)("span", null,
                        "0",
                        i + 1),
                    label,
                    (0, react_1.createElement)(ui_1.Icon, { name: "diagonal" })))),
                (0, react_1.createElement)("div", { className: "mobile-menu-bottom" }, "\u0130STANBUL \u00B7 EL YAPIMI MOB\u0130LYA")),
            s.search && (0, react_1.createElement)(ui_1.Dialog, { title: "Koleksiyonda ara", onClose: () => this.setState({ search: false }) },
                (0, react_1.createElement)("label", { className: "search-dialog-input" },
                    (0, react_1.createElement)(ui_1.Icon, { name: "search" }),
                    (0, react_1.createElement)("input", { autoFocus: true, type: "search", placeholder: "Masa, ceviz, \u00E7al\u0131\u015Fma\u2026", "aria-label": "Arama kelimesi", value: s.searchQuery, onInput: e => this.setState({ searchQuery: e.currentTarget.value }) })),
                (0, react_1.createElement)("div", { className: "search-results", role: "region", "aria-live": "polite" }, results.length ? results.map(p => (0, react_1.createElement)(ui_1.Link, { key: p.id, to: '/urun/' + p.id, navigate: this.navigate },
                    (0, react_1.createElement)("img", { src: (0, ui_1.image)(p.image), alt: "" }),
                    (0, react_1.createElement)("span", null,
                        (0, react_1.createElement)("strong", null, p.name),
                        (0, react_1.createElement)("small", null,
                            p.categoryLabel,
                            " \u00B7 Konsept")),
                    (0, react_1.createElement)(ui_1.Icon, { name: "diagonal" }))) : (0, react_1.createElement)("p", { className: "empty-state" }, "Sonu\u00E7 bulunamad\u0131. Ba\u015Fka bir kelime deneyin.")),
                (0, react_1.createElement)(ui_1.TextLink, { to: "/urunler", navigate: this.navigate }, "T\u00FCm koleksiyona git")),
            s.info && (0, react_1.createElement)(ui_1.Dialog, { title: "Bu s\u00FCr\u00FCm hakk\u0131nda", onClose: () => this.setState({ info: false }) },
                (0, react_1.createElement)("div", { className: "info-dialog" },
                    (0, react_1.createElement)(ui_1.Eyebrow, null, "\u00C7ALI\u015EAN V\u0130TR\u0130N / YEREL \u00D6N\u0130ZLEME"),
                    (0, react_1.createElement)("p", null, "Bu site, Elif Tasar\u0131m i\u00E7in haz\u0131rlanan etkile\u015Fimli tasar\u0131m ve aray\u00FCz uygulamas\u0131d\u0131r. G\u00F6rseller, \u00FCr\u00FCn adlar\u0131, \u00F6l\u00E7\u00FCler ve fiyatlar \u00F6rnektir."),
                    (0, react_1.createElement)("h3", null, "Canl\u0131 i\u015Flem yap\u0131lmaz."),
                    (0, react_1.createElement)("p", null, "\u00D6deme, e-posta, kargo, m\u00FC\u015Fteri hesab\u0131 ve sunucu kay\u0131tlar\u0131 ba\u011Fl\u0131 de\u011Fildir. Formlar at\u00F6lyeye bilgi g\u00F6ndermez. \u0130\u015Flem \u00F6zetlerini kendi cihaz\u0131n\u0131za indirebilirsiniz."),
                    (0, react_1.createElement)("h3", null, "Yaln\u0131z gerekli yerel kay\u0131tlar."),
                    (0, react_1.createElement)("p", null, "\u00D6rnek sepet ve kaydedilenler 30 g\u00FCn; a\u00E7\u0131k\u00E7a kaydetti\u011Finiz \u00F6l\u00E7\u00FC tercihleri 7 g\u00FCn bu taray\u0131c\u0131da tutulur. \u0130leti\u015Fim, not ve foto\u011Fraflar tasla\u011Fa kaydedilmez. Analitik ve reklam takibi yoktur."),
                    (0, react_1.createElement)("button", { className: "button button-outline", onClick: () => {
                            if (window.confirm('Bu uygulamanın bu cihazdaki örnek sepeti, kaydedilenleri ve ölçü tercihleri silinsin mi?')) {
                                try {
                                    Object.keys(localStorage).filter(k => k.startsWith('elif-v2:')).forEach(k => localStorage.removeItem(k));
                                }
                                catch { }
                                this.setState({ cart: [], favorites: [], info: false });
                                this.notify('Bu uygulamanın bu cihazdaki kayıtları temizlendi.');
                            }
                        } },
                        "Bu cihazdaki Elif kay\u0131tlar\u0131n\u0131 sil ",
                        (0, react_1.createElement)(ui_1.Icon, { name: "close" })),
                    (0, react_1.createElement)(ui_1.Link, { to: "/gizlilik", navigate: p => { this.setState({ info: false }); this.navigate(p); }, className: "text-link" },
                        "Ayr\u0131nt\u0131l\u0131 a\u00E7\u0131klama ",
                        (0, react_1.createElement)(ui_1.Icon, null)))),
            s.scrolled && (0, react_1.createElement)("button", { className: "v5-backtop", type: "button", "aria-label": "Sayfan\u0131n ba\u015F\u0131na d\u00F6n", onClick: () => { window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }); document.getElementById('main-content')?.focus({ preventScroll: true }); } },
                (0, react_1.createElement)("span", { className: "v5-up" },
                    (0, react_1.createElement)(ui_1.Icon, { name: "down", size: 18 })),
                (0, react_1.createElement)("span", null, "Ba\u015Fa d\u00F6n")),
            s.toast && (0, react_1.createElement)("div", { className: "toast", role: "status" },
                (0, react_1.createElement)(ui_1.Icon, { name: "check" }),
                (0, react_1.createElement)("span", null, s.toast),
                (0, react_1.createElement)("button", { className: "icon-button", onClick: () => this.setState({ toast: '' }), "aria-label": "Bildirimi kapat" },
                    (0, react_1.createElement)(ui_1.Icon, { name: "close", size: 16 }))));
    }
}
exports.default = App;

},"src/components/ui":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dialog = void 0;
exports.image = image;
exports.Icon = Icon;
exports.Link = Link;
exports.TextLink = TextLink;
exports.ButtonLink = ButtonLink;
exports.Eyebrow = Eyebrow;
exports.Photo = Photo;
exports.SectionHead = SectionHead;
exports.PageIntro = PageIntro;
exports.ProductCard = ProductCard;
exports.Callout = Callout;
exports.Accordion = Accordion;
const react_1 = require("react");
const domain_1 = require("../lib/domain");
function image(name) { return typeof window !== 'undefined' && window.__ELIF_ASSETS__?.[name] || '/assets/' + name; }
function Icon({ name = 'arrow', size = 20 }) {
    const paths = { arrow: (0, react_1.createElement)(react_1.Fragment, null,
            (0, react_1.createElement)("path", { d: "M4 12h16M13 5l7 7-7 7" })), diagonal: (0, react_1.createElement)(react_1.Fragment, null,
            (0, react_1.createElement)("path", { d: "M5 19L19 5M5 5h14v14" })), search: (0, react_1.createElement)(react_1.Fragment, null,
            (0, react_1.createElement)("circle", { cx: "10.5", cy: "10.5", r: "6.5" }),
            (0, react_1.createElement)("path", { d: "m16 16 5 5" })), close: (0, react_1.createElement)("path", { d: "m5 5 14 14M19 5 5 19" }), menu: (0, react_1.createElement)("path", { d: "M3 7h18M3 16h18" }), bag: (0, react_1.createElement)(react_1.Fragment, null,
            (0, react_1.createElement)("path", { d: "M5 8h14l1 13H4L5 8Z" }),
            (0, react_1.createElement)("path", { d: "M8 8V6a4 4 0 0 1 8 0v2" })), heart: (0, react_1.createElement)("path", { d: "M20.8 4.7a5.5 5.5 0 0 0-7.8 0L12 5.8l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.5a5.5 5.5 0 0 0 0-7.8Z" }), plus: (0, react_1.createElement)("path", { d: "M12 4v16M4 12h16" }), minus: (0, react_1.createElement)("path", { d: "M4 12h16" }), down: (0, react_1.createElement)("path", { d: "m5 9 7 7 7-7" }), check: (0, react_1.createElement)("path", { d: "m4 12 5 5 11-11" }), ruler: (0, react_1.createElement)(react_1.Fragment, null,
            (0, react_1.createElement)("path", { d: "m3 16 13-13 5 5L8 21 3 16Z" }),
            (0, react_1.createElement)("path", { d: "m7 12 3 3m1-7 3 3m1-7 3 3" })), leaf: (0, react_1.createElement)(react_1.Fragment, null,
            (0, react_1.createElement)("path", { d: "M20 3C9 2 2 6 4 14s16 7 16-11Z" }),
            (0, react_1.createElement)("path", { d: "M3 22 16 8" })), hand: (0, react_1.createElement)(react_1.Fragment, null,
            (0, react_1.createElement)("path", { d: "M8 12V5a2 2 0 0 1 4 0v7-9a2 2 0 0 1 4 0v9-6a2 2 0 0 1 4 0v9c0 6-12 10-15 1l-2-5a2 2 0 0 1 3-2l2 3" })), upload: (0, react_1.createElement)(react_1.Fragment, null,
            (0, react_1.createElement)("path", { d: "M4 15v5h16v-5M12 17V3m-5 5 5-5 5 5" })), clock: (0, react_1.createElement)(react_1.Fragment, null,
            (0, react_1.createElement)("circle", { cx: "12", cy: "12", r: "9" }),
            (0, react_1.createElement)("path", { d: "M12 6v6l4 2" })), info: (0, react_1.createElement)(react_1.Fragment, null,
            (0, react_1.createElement)("circle", { cx: "12", cy: "12", r: "9" }),
            (0, react_1.createElement)("path", { d: "M12 11v6m0-11v2" })), grid: (0, react_1.createElement)(react_1.Fragment, null,
            (0, react_1.createElement)("rect", { x: "3", y: "3", width: "7", height: "7" }),
            (0, react_1.createElement)("rect", { x: "14", y: "3", width: "7", height: "7" }),
            (0, react_1.createElement)("rect", { x: "3", y: "14", width: "7", height: "7" }),
            (0, react_1.createElement)("rect", { x: "14", y: "14", width: "7", height: "7" })), download: (0, react_1.createElement)(react_1.Fragment, null,
            (0, react_1.createElement)("path", { d: "M12 3v13m-5-5 5 5 5-5M4 17v4h16v-4" })), pin: (0, react_1.createElement)(react_1.Fragment, null,
            (0, react_1.createElement)("path", { d: "M19 9c0 6-7 12-7 12S5 15 5 9a7 7 0 0 1 14 0Z" }),
            (0, react_1.createElement)("circle", { cx: "12", cy: "9", r: "2" })) };
    return (0, react_1.createElement)("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.25", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true" }, paths[name] || paths.arrow);
}
function Link({ to, navigate, children, className = '', ...rest }) {
    return (0, react_1.createElement)("a", { href: (0, domain_1.publicHref)(to), className: className, ...rest, onClick: (e) => {
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0)
                return;
            e.preventDefault();
            navigate(to);
        } }, children);
}
function TextLink({ to, navigate, children, light = false }) { return (0, react_1.createElement)(Link, { to: to, navigate: navigate, className: 'text-link ' + (light ? 'on-dark' : '') },
    children,
    (0, react_1.createElement)(Icon, { name: "arrow", size: 22 })); }
function ButtonLink({ to, navigate, children, secondary = false }) { return (0, react_1.createElement)(Link, { to: to, navigate: navigate, className: 'button ' + (secondary ? 'button-outline' : '') },
    children,
    (0, react_1.createElement)(Icon, null)); }
function Eyebrow({ children }) { return (0, react_1.createElement)("div", { className: "eyebrow" }, children); }
function Photo({ name, alt, ratio = '', className = '', caption = true, eager = false }) { return (0, react_1.createElement)("figure", { className: 'photo ' + className, style: ratio ? { aspectRatio: ratio } : undefined },
    (0, react_1.createElement)("img", { src: image(name), alt: alt, loading: eager ? 'eager' : 'lazy', decoding: "async" }),
    caption && (0, react_1.createElement)("figcaption", null, "Temsili tasar\u0131m g\u00F6rseli")); }
function SectionHead({ number, title, sub, to, navigate }) { return (0, react_1.createElement)("div", { className: "section-head" },
    (0, react_1.createElement)("div", null,
        (0, react_1.createElement)(Eyebrow, null,
            number,
            " / EL\u0130F TASARIM"),
        (0, react_1.createElement)("h2", null, title),
        sub && (0, react_1.createElement)("p", null, sub)),
    to && (0, react_1.createElement)(TextLink, { to: to, navigate: navigate }, "T\u00FCm\u00FCn\u00FC ke\u015Ffet")); }
function PageIntro({ kicker, title, desc }) { return (0, react_1.createElement)("header", { className: "page-intro wrap" },
    (0, react_1.createElement)(Eyebrow, null, kicker),
    (0, react_1.createElement)("h1", null, title),
    desc && (0, react_1.createElement)("p", null, desc)); }
function ProductCard({ product: p, actions: a }) { return (0, react_1.createElement)("article", { className: "product-card" },
    (0, react_1.createElement)("div", { className: "product-visual" },
        (0, react_1.createElement)(Link, { to: '/urun/' + p.id, navigate: a.navigate, "aria-label": p.name + ' ' + p.categoryLabel + ' detayları' },
            (0, react_1.createElement)("img", { src: image(p.image), alt: p.name + ' ' + p.categoryLabel + ' — temsili konsept görseli', loading: "lazy" })),
        (0, react_1.createElement)("span", { className: "image-index" },
            p.number,
            " / KONSEPT"),
        (0, react_1.createElement)("button", { className: 'save-button ' + (a.favorites.includes(p.id) ? 'is-saved' : ''), "aria-label": p.name + (a.favorites.includes(p.id) ? ' kaydını kaldır' : ' ürününü kaydet'), "aria-pressed": a.favorites.includes(p.id), onClick: () => a.favorite(p.id) },
            (0, react_1.createElement)(Icon, { name: "heart", size: 19 }))),
    (0, react_1.createElement)("div", { className: "product-caption" },
        (0, react_1.createElement)("div", null,
            (0, react_1.createElement)("span", { className: "label" }, p.categoryLabel),
            (0, react_1.createElement)("h3", null,
                (0, react_1.createElement)(Link, { to: '/urun/' + p.id, navigate: a.navigate }, p.name)),
            (0, react_1.createElement)("p", null,
                p.material,
                " g\u00F6r\u00FCn\u00FCm\u00FC \u00B7 ",
                p.mode === 'quoted' ? 'Özel ölçü' : 'Konsept koleksiyon')),
        (0, react_1.createElement)(Link, { to: '/urun/' + p.id, navigate: a.navigate, className: "card-arrow", "aria-label": p.name + ' ürününü incele' },
            (0, react_1.createElement)(Icon, { name: "diagonal" })))); }
function Callout({ navigate }) { return (0, react_1.createElement)("section", { className: "closing-cta" },
    (0, react_1.createElement)("div", { className: "wrap" },
        (0, react_1.createElement)(Eyebrow, null, "B\u0130R F\u0130K\u0130RLE BA\u015ELAYALIM"),
        (0, react_1.createElement)("h2", null,
            "\u00D6l\u00E7\u00FCs\u00FC size.",
            (0, react_1.createElement)("br", null),
            (0, react_1.createElement)("em", null, "Hik\u00E2yesi birlikte.")),
        (0, react_1.createElement)(ButtonLink, { to: "/teklif-al", navigate: navigate }, "Projenizi konu\u015Fal\u0131m"),
        (0, react_1.createElement)("p", null, "Bir \u00F6l\u00E7\u00FC, bir foto\u011Fraf ya da yaln\u0131zca bir fikir."))); }
function Accordion({ items }) { return (0, react_1.createElement)("div", { className: "accordion" }, items.map(([title, text], i) => (0, react_1.createElement)("details", { key: title },
    (0, react_1.createElement)("summary", null,
        (0, react_1.createElement)("span", { className: "accordion-num" },
            "0",
            i + 1),
        (0, react_1.createElement)("span", null, title),
        (0, react_1.createElement)(Icon, { name: "plus" })),
    (0, react_1.createElement)("div", { className: "answer" }, text)))); }
class Dialog extends react_1.Component {
    constructor() {
        super(...arguments);
        this.el = null;
        this.previous = null;
    }
    componentDidMount() { this.previous = document.activeElement; this.el?.showModal(); }
    componentWillUnmount() {
        this.el?.close();
        if (this.previous?.isConnected)
            this.previous.focus({ preventScroll: true });
    }
    render() {
        return (0, react_1.createElement)("dialog", { className: "dialog", ref: (e) => { this.el = e; }, onCancel: (e) => { e.preventDefault(); this.props.onClose(); }, onKeyDown: (e) => {
                if (e.key === 'Escape') {
                    e.preventDefault();
                    e.stopPropagation();
                    this.props.onClose();
                }
            }, onClick: (e) => {
                if (e.target === e.currentTarget)
                    this.props.onClose();
            }, "aria-label": this.props.title },
            (0, react_1.createElement)("div", { className: "dialog-inner" },
                (0, react_1.createElement)("div", { className: "dialog-head" },
                    (0, react_1.createElement)("h2", null, this.props.title),
                    (0, react_1.createElement)("button", { className: "icon-button", onClick: this.props.onClose, "aria-label": "Pencereyi kapat" },
                        (0, react_1.createElement)(Icon, { name: "close" }))),
                this.props.children));
    }
}
exports.Dialog = Dialog;

},"src/lib/desk":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deskBases = exports.deskMaterials = exports.defaultDesk = void 0;
exports.deskFromParams = deskFromParams;
exports.deskQuery = deskQuery;
exports.deskSummary = deskSummary;
exports.tableGeometry = tableGeometry;
exports.defaultDesk = { width: 160, depth: 80, height: 75, material: 'ceviz', base: 'metal', view: 'perspective' };
exports.deskMaterials = { ceviz: { name: 'Ceviz', image: 'wood-walnut.webp', color: '#755039' }, mese: { name: 'Meşe', image: 'wood-oak.webp', color: '#bca077' }, kestane: { name: 'Kestane', image: 'wood-chestnut.webp', color: '#967452' } };
exports.deskBases = { wood: 'Ahşap ayak', metal: 'Metal taşıyıcı', adjustable: 'Yükseklik ayarlı' };
const inRange = (raw, min, max, fallback) => { if (raw === null || !/^\d+(?:[.,]\d+)?$/.test(raw.trim()))
    return fallback; const n = Number(raw.replace(',', '.')); return Number.isFinite(n) && n >= min && n <= max ? Math.round(n) : fallback; };
function deskFromParams(p) { return { width: inRange(p.get('en'), 100, 240, 160), depth: inRange(p.get('derinlik'), 50, 100, 80), height: inRange(p.get('yukseklik'), 60, 125, 75), material: (['ceviz', 'mese', 'kestane'].includes(p.get('malzeme') || '') ? p.get('malzeme') : 'ceviz'), base: (['wood', 'metal', 'adjustable'].includes(p.get('ayak') || '') ? p.get('ayak') : 'metal'), view: 'perspective' }; }
function deskQuery(d) { return new URLSearchParams({ en: String(d.width), derinlik: String(d.depth), yukseklik: String(d.height), malzeme: d.material, ayak: d.base }).toString(); }
function deskSummary(d) { return ['ELİF TASARIM / TASARIM MASASI', 'Sipariş değildir. Üretilebilirlik, mekanizma ve son ölçüler atölye onayına bağlıdır.', 'Bu özet atölyeye gönderilmedi.', '', `Ölçü fikri: ${d.width} × ${d.depth} × ${d.height} cm`, `Malzeme fikri: ${exports.deskMaterials[d.material].name}`, `Taşıyıcı fikri: ${exports.deskBases[d.base]}`, 'Malzeme görüntüsü temsilidir. Masif veya kaplama tercihi, yüzey işlemi ve taşıma kapasitesi ayrıca değerlendirilir.'].join('\n'); }
function tableGeometry(d) {
    const scale = 1.55, cx = 370, cy = 334;
    const project = (x, y, z) => [cx + (x - y) * scale, cy + (x + y) * scale * .37 - z * scale];
    const w = d.width / 2, dep = d.depth / 2, h = d.height;
    return { top: [project(-w, -dep, h), project(w, -dep, h), project(w, dep, h), project(-w, dep, h)], project, w, dep, h };
}

},"src/lib/domain":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartKey = exports.validQuantity = exports.searchKey = exports.money = void 0;
exports.parseDimension = parseDimension;
exports.majorToMinor = majorToMinor;
exports.lineTotal = lineTotal;
exports.validateFile = validateFile;
exports.validateQuoteStep = validateQuoteStep;
exports.safeDraft = safeDraft;
exports.readLocal = readLocal;
exports.writeLocal = writeLocal;
exports.downloadText = downloadText;
exports.publicHref = publicHref;
exports.convertDimensions = convertDimensions;
function parseDimension(raw, unit) {
    if (unit !== 'cm' && unit !== 'mm')
        return { ok: false, error: 'Santimetre veya milimetre seçin.' };
    const s = String(raw).trim();
    if (!/^\d+(?:[.,]\d+)?$/.test(s))
        return { ok: false, error: '120,5 gibi tek ondalık ayraçlı bir ölçü yazın.' };
    const [a, b = ''] = s.replace(',', '.').split('.');
    const scale = unit === 'cm' ? 10 : 1;
    const n = Number(a + '.' + b) * scale;
    const rounded = Math.round(n);
    if (!Number.isFinite(n) || n <= 0 || n > 10000 || Math.abs(n - rounded) > 0.0000001)
        return { ok: false, error: 'Ölçüyü 1–10.000 mm aralığında, tam milimetre olarak belirtin.' };
    return { ok: true, mm: rounded };
}
function majorToMinor(value) {
    if (!/^\d+(?:\.\d{1,2})?$/.test(value))
        throw new Error('Geçersiz para değeri');
    const [whole, dec = ''] = value.split('.');
    const n = BigInt(whole) * 100n + BigInt(dec.padEnd(2, '0'));
    if (n > BigInt(Number.MAX_SAFE_INTEGER))
        throw new Error('Tutar sınırı aşıldı');
    return Number(n);
}
const money = (minor) => new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', minimumFractionDigits: minor % 100 ? 2 : 0, maximumFractionDigits: 2 }).format(minor / 100);
exports.money = money;
const searchKey = (s) => s.trim().replace(/\s+/g, ' ').toLocaleLowerCase('tr-TR').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ı/g, 'i');
exports.searchKey = searchKey;
const validQuantity = (n) => Number.isSafeInteger(n) && n >= 1 && n <= 100;
exports.validQuantity = validQuantity;
const cartKey = (id, material, size) => [id, material, size].join('::');
exports.cartKey = cartKey;
function lineTotal(price, quantity) {
    if (!Number.isSafeInteger(price) || price < 0 || !(0, exports.validQuantity)(quantity) || !Number.isSafeInteger(price * quantity))
        throw new Error('Geçersiz satır');
    return price * quantity;
}
function validateFile(file) {
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type))
        return { ok: false, error: 'Yalnız JPG, PNG ve WebP görselleri ekleyebilirsiniz.' };
    if (file.size > 10 * 1024 * 1024 || file.size <= 0)
        return { ok: false, error: 'Her görsel 10 MB veya daha küçük olmalı.' };
    return { ok: true };
}
function validateQuoteStep(step, v) {
    const errors = {};
    if (step === 0 && !v.kind)
        errors.kind = 'Bir ürün türü seçin veya birlikte karar verelim seçeneğini kullanın.';
    if (step === 1 && !v.unknown)
        for (const field of ['width', 'depth', 'height']) {
            const r = parseDimension(v[field] || '', v.unit || 'cm');
            if (!r.ok)
                errors[field] = r.error;
        }
    if (step === 5) {
        if (!v.name || v.name.trim().length < 2)
            errors.name = 'En az iki karakterlik bir ad yazın.';
        if (!String(v.email || '').trim() && !String(v.phone || '').trim())
            errors.email = 'E-posta veya telefon bilgilerinden en az birini yazın.';
        if (v.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email))
            errors.email = 'Geçerli bir e-posta adresi yazın.';
        if (v.phone && (!/^\+?[\d\s()-]{10,24}$/.test(v.phone.trim()) || !/^\d{10,15}$/.test(v.phone.replace(/\D/g, ''))))
            errors.phone = 'Ülke kodu dahil geçerli bir telefon yazın.';
    }
    return errors;
}
function safeDraft(v) {
    const out = {};
    if (!v || typeof v !== 'object' || Array.isArray(v))
        return out;
    for (const k of ['kind', 'width', 'depth', 'height', 'material', 'finish'])
        if (typeof v[k] === 'string' && v[k].length <= 100)
            out[k] = v[k];
    if (v.unit === 'cm' || v.unit === 'mm')
        out.unit = v.unit;
    if (typeof v.unknown === 'boolean')
        out.unknown = v.unknown;
    return out;
}
function readLocal(key, fallback) {
    try {
        const raw = localStorage.getItem('elif-v2:' + key);
        if (!raw)
            return fallback;
        const record = JSON.parse(raw);
        if (typeof record.expires !== 'number' || !Number.isFinite(record.expires) || record.expires < Date.now()) {
            localStorage.removeItem('elif-v2:' + key);
            return fallback;
        }
        return record.value ?? fallback;
    }
    catch {
        return fallback;
    }
}
function writeLocal(key, value, days = 30) {
    try {
        localStorage.setItem('elif-v2:' + key, JSON.stringify({ value, expires: Date.now() + days * 86400000 }));
        return true;
    }
    catch {
        return false;
    }
}
function downloadText(name, text, mime = 'text/plain;charset=utf-8') { const url = URL.createObjectURL(new Blob([text], { type: mime })); const a = document.createElement('a'); a.href = url; a.download = name; a.click(); setTimeout(() => URL.revokeObjectURL(url), 10000); }
function publicHref(path) { return typeof window !== 'undefined' && window.__ELIF_PREVIEW__ ? '#' + path : path; }
/** Convert user measurements atomically. Invalid input never silently changes units. */
function convertDimensions(v, target) {
    const errors = {};
    const values = { unit: target };
    if (!['cm', 'mm'].includes(target))
        return { ok: false, errors: { unit: 'Geçerli bir ölçü birimi seçin.' } };
    for (const k of ['width', 'depth', 'height']) {
        const raw = String(v[k] ?? '').trim();
        if (!raw) {
            values[k] = '';
            continue;
        }
        const result = parseDimension(raw, v.unit);
        if (!result.ok)
            errors[k] = result.error;
        else
            values[k] = String(target === 'mm' ? result.mm : result.mm / 10);
    }
    return Object.keys(errors).length ? { ok: false, errors } : { ok: true, values };
}

},"src/pages/Catalog":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductPage = exports.Catalog = void 0;
const react_1 = require("react");
const data_1 = require("../lib/data");
const domain_1 = require("../lib/domain");
const ui_1 = require("../components/ui");
class Catalog extends react_1.Component {
    constructor(props) {
        super(props);
        this.update = (patch) => this.setState(patch, () => {
            const p = new URLSearchParams();
            if (this.state.category !== 'all')
                p.set('alan', this.state.category);
            if (this.state.query)
                p.set('q', this.state.query.slice(0, 200));
            if (this.state.sort !== 'editorial')
                p.set('sirala', this.state.sort);
            history.replaceState({}, '', (0, domain_1.publicHref)('/urunler' + (p.size ? '?' + p.toString() : '')));
        });
        this.toggle = (id) => { const selected = this.state.selected; if (selected.includes(id))
            this.setState({ selected: selected.filter(x => x !== id) });
        else if (selected.length < 3)
            this.setState({ selected: [...selected, id] });
        else
            this.props.notify('Yan yana en fazla üç parçayı karşılaştırabilirsiniz.'); };
        this.state = { category: props.initialCategory || 'all', query: props.initialQuery || '', sort: ['name', 'price'].includes(props.initialSort || '') ? props.initialSort : 'editorial', selected: [], compare: false, quick: null };
    }
    render() {
        const a = this.props, s = this.state;
        let items = data_1.products.filter(p => (s.category === 'all' || p.category === s.category) && (0, domain_1.searchKey)(p.name + ' ' + p.categoryLabel + ' ' + p.material + ' ' + p.id + ' ' + p.category).includes((0, domain_1.searchKey)(s.query)));
        if (s.sort === 'name')
            items = [...items].sort((a, b) => a.name.localeCompare(b.name, 'tr'));
        if (s.sort === 'price')
            items = [...items].sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
        const chosen = data_1.products.filter(p => s.selected.includes(p.id)), quick = data_1.products.find(p => p.id === s.quick);
        return (0, react_1.createElement)(react_1.Fragment, null,
            (0, react_1.createElement)(ui_1.PageIntro, { kicker: "KOLEKS\u0130YON / TASARIM SE\u00C7K\u0130S\u0130", title: (0, react_1.createElement)(react_1.Fragment, null,
                    "G\u00FCndelik hayat.",
                    (0, react_1.createElement)("br", null),
                    (0, react_1.createElement)("em", null, "\u0130yi d\u00FC\u015F\u00FCn\u00FClm\u00FC\u015F par\u00E7alar.")), desc: "Bir mek\u00E2na yerle\u015Fmekten fazlas\u0131. Ya\u015Fam\u0131n\u0131za e\u015Flik etmesi i\u00E7in d\u00FC\u015F\u00FCn\u00FClen tasar\u0131m fikirleri." }),
            (0, react_1.createElement)("section", { className: "wrap catalog" },
                (0, react_1.createElement)("div", { className: "catalog-toolbar" },
                    (0, react_1.createElement)("div", { className: "filter-tabs", role: "group", "aria-label": "Kullan\u0131m alan\u0131" }, data_1.categories.map(c => (0, react_1.createElement)("button", { key: c.id, className: s.category === c.id ? 'active' : '', "aria-pressed": s.category === c.id, onClick: () => this.update({ category: c.id }) }, c.label))),
                    (0, react_1.createElement)("label", { className: "sort-control" },
                        "S\u0131ralama",
                        (0, react_1.createElement)("select", { value: s.sort, onChange: e => this.update({ sort: e.currentTarget.value }) },
                            (0, react_1.createElement)("option", { value: "editorial" }, "At\u00F6lye se\u00E7kisi"),
                            (0, react_1.createElement)("option", { value: "name" }, "\u0130sme g\u00F6re"),
                            (0, react_1.createElement)("option", { value: "price" }, "\u00D6rnek fiyata g\u00F6re")))),
                (0, react_1.createElement)("div", { className: "catalog-search" },
                    (0, react_1.createElement)("label", null,
                        (0, react_1.createElement)(ui_1.Icon, { name: "search" }),
                        (0, react_1.createElement)("input", { type: "search", maxLength: 200, value: s.query, onInput: e => this.update({ query: e.currentTarget.value }), placeholder: "Bir par\u00E7a, malzeme veya kullan\u0131m alan\u0131\u2026", "aria-label": "Koleksiyonda ara" })),
                    (0, react_1.createElement)("span", { role: "status" },
                        items.length,
                        " tasar\u0131m fikri")),
                items.length ? (0, react_1.createElement)("div", { className: "catalog-grid" }, items.map(p => (0, react_1.createElement)("div", { key: p.id, className: "catalog-item" },
                    (0, react_1.createElement)(ui_1.ProductCard, { product: p, actions: a }),
                    (0, react_1.createElement)("div", { className: "catalog-item-actions" },
                        (0, react_1.createElement)("button", { onClick: () => this.setState({ quick: p.id }), "aria-label": p.name + ' hızlı bakış' },
                            "Yak\u0131ndan bak ",
                            (0, react_1.createElement)(ui_1.Icon, { name: "plus", size: 15 })),
                        (0, react_1.createElement)("button", { "aria-label": p.name + (s.selected.includes(p.id) ? ' karşılaştırmadan çıkar' : ' karşılaştırma listesine ekle'), "aria-pressed": s.selected.includes(p.id), onClick: () => this.toggle(p.id) },
                            (0, react_1.createElement)("span", { className: "compare-check" }, s.selected.includes(p.id) && (0, react_1.createElement)(ui_1.Icon, { name: "check", size: 12 })),
                            "Kar\u015F\u0131la\u015Ft\u0131r"))))) : (0, react_1.createElement)("div", { className: "empty-state" },
                    (0, react_1.createElement)(ui_1.Icon, { name: "search", size: 34 }),
                    (0, react_1.createElement)("h2", null, "Bu aramada bir par\u00E7a bulamad\u0131k."),
                    (0, react_1.createElement)("p", null, "Ba\u015Fka bir kelime deneyebilir ya da t\u00FCm koleksiyona d\u00F6nebilirsiniz."),
                    (0, react_1.createElement)("button", { className: "button", onClick: () => this.update({ query: '', category: 'all' }) },
                        "Filtreleri temizle ",
                        (0, react_1.createElement)(ui_1.Icon, null))),
                s.selected.length > 0 && (0, react_1.createElement)("div", { className: "comparison-bar", role: "region", "aria-label": "Kar\u015F\u0131la\u015Ft\u0131rma se\u00E7iminiz" },
                    (0, react_1.createElement)("div", { className: "comparison-thumbs" }, chosen.map(p => (0, react_1.createElement)("button", { key: p.id, onClick: () => this.toggle(p.id), "aria-label": p.name + ' karşılaştırmadan çıkar' },
                        (0, react_1.createElement)("img", { src: (0, ui_1.image)(p.image), alt: "" }),
                        (0, react_1.createElement)("span", null, p.name),
                        (0, react_1.createElement)(ui_1.Icon, { name: "close", size: 13 })))),
                    (0, react_1.createElement)("div", null,
                        (0, react_1.createElement)("span", null,
                            chosen.length,
                            " / 3 par\u00E7a"),
                        (0, react_1.createElement)("button", { className: "button", disabled: chosen.length < 2, onClick: () => this.setState({ compare: true }) },
                            "Se\u00E7ilenleri kar\u015F\u0131la\u015Ft\u0131r ",
                            (0, react_1.createElement)(ui_1.Icon, null)))),
                (0, react_1.createElement)("div", { className: "note-box" },
                    (0, react_1.createElement)(ui_1.Icon, { name: "info" }),
                    (0, react_1.createElement)("p", null, "Bu se\u00E7kideki isimler, g\u00F6rseller, \u00F6l\u00E7\u00FCler ve fiyatlar tasar\u0131m \u00F6rne\u011Fidir. Ger\u00E7ek katalog do\u011Fruland\u0131ktan sonra yay\u0131mlanacakt\u0131r. Canl\u0131 sat\u0131\u015F kapal\u0131d\u0131r."))),
            (0, react_1.createElement)(ui_1.Callout, { navigate: a.navigate }),
            quick && (0, react_1.createElement)(ui_1.Dialog, { title: quick.name + ' / Yakından bakış', onClose: () => this.setState({ quick: null }) },
                (0, react_1.createElement)("div", { className: "quick-view" },
                    (0, react_1.createElement)("img", { src: (0, ui_1.image)(quick.image), alt: quick.name + ' temsili tasarım görseli' }),
                    (0, react_1.createElement)("div", null,
                        (0, react_1.createElement)(ui_1.Eyebrow, null, quick.categoryLabel),
                        (0, react_1.createElement)("p", { className: "quick-poem" }, quick.intro),
                        (0, react_1.createElement)("p", null, quick.detail),
                        (0, react_1.createElement)("dl", { className: "product-passport" },
                            (0, react_1.createElement)("div", null,
                                (0, react_1.createElement)("dt", null, "\u00D6l\u00E7\u00FC fikri"),
                                (0, react_1.createElement)("dd", null, quick.dimensions)),
                            (0, react_1.createElement)("div", null,
                                (0, react_1.createElement)("dt", null, "Yakla\u015F\u0131m"),
                                (0, react_1.createElement)("dd", null, quick.mode === 'quoted' ? 'Ölçüye özel teklif' : 'Konsept koleksiyon'))),
                        (0, react_1.createElement)(ui_1.ButtonLink, { to: '/urun/' + quick.id, navigate: a.navigate }, "Par\u00E7ay\u0131 incele"),
                        (0, react_1.createElement)("span", { className: "small muted" }, "Temsili \u00FCr\u00FCn ve \u00F6l\u00E7\u00FC. Canl\u0131 sat\u0131\u015F yok.")))),
            s.compare && (0, react_1.createElement)(ui_1.Dialog, { title: "Yan yana d\u00FC\u015F\u00FCnelim.", onClose: () => this.setState({ compare: false }) },
                (0, react_1.createElement)("p", { className: "comparison-intro" }, "Bir se\u00E7imden \u00F6nce, ayr\u0131nt\u0131lar\u0131 birlikte g\u00F6r\u00FCn. Bilgiler bu tasar\u0131m \u00F6nizlemesine aittir."),
                (0, react_1.createElement)("div", { className: "comparison-table", tabIndex: 0, role: "region", "aria-label": "\u00DCr\u00FCn kar\u015F\u0131la\u015Ft\u0131rma tablosu" },
                    (0, react_1.createElement)("table", null,
                        (0, react_1.createElement)("thead", null,
                            (0, react_1.createElement)("tr", null,
                                (0, react_1.createElement)("th", { scope: "col" }, "Par\u00E7alar"),
                                chosen.map(p => (0, react_1.createElement)("th", { key: p.id, scope: "col" },
                                    (0, react_1.createElement)("img", { src: (0, ui_1.image)(p.image), alt: p.name + ' konsepti' }),
                                    (0, react_1.createElement)("strong", null, p.name),
                                    (0, react_1.createElement)("span", null, p.categoryLabel))))),
                        (0, react_1.createElement)("tbody", null,
                            [['Ölçü fikri', (p) => p.dimensions], ['Malzeme görünümü', (p) => p.material], ['Seçenekler', (p) => p.sizes.join(' / ')], ['Sipariş yaklaşımı', (p) => p.mode === 'quoted' ? 'Ölçüye özel teklif' : 'Konsept koleksiyon'], ['Örnek fiyat', (p) => p.price === null ? 'Görüşmeyle belirlenir' : (0, domain_1.money)(p.price)]].map(([label, value]) => (0, react_1.createElement)("tr", { key: String(label) },
                                (0, react_1.createElement)("th", { scope: "row" }, String(label)),
                                chosen.map(p => (0, react_1.createElement)("td", { key: p.id }, value(p))))),
                            (0, react_1.createElement)("tr", null,
                                (0, react_1.createElement)("th", { scope: "row" }, "Ayr\u0131nt\u0131lar"),
                                chosen.map(p => (0, react_1.createElement)("td", { key: p.id },
                                    (0, react_1.createElement)(ui_1.TextLink, { to: '/urun/' + p.id, navigate: a.navigate }, "\u0130ncele")))))))));
    }
}
exports.Catalog = Catalog;
class ProductPage extends react_1.Component {
    constructor(props) { super(props); this.state = { material: 'Ceviz', size: props.product.sizes[0], quantity: 1, view: 'full', lightbox: false }; }
    render() {
        const a = this.props, p = a.product;
        const sizeExtra = Math.max(0, p.sizes.indexOf(this.state.size)) * 700000;
        const price = p.price === null ? null : p.price + sizeExtra;
        return (0, react_1.createElement)(react_1.Fragment, null,
            (0, react_1.createElement)("div", { className: "breadcrumb wrap" },
                (0, react_1.createElement)(ui_1.Link, { to: "/urunler", navigate: a.navigate }, "Koleksiyon"),
                (0, react_1.createElement)("span", null, "/"),
                (0, react_1.createElement)(ui_1.Link, { to: '/urunler?alan=' + p.category, navigate: a.navigate }, p.categoryLabel),
                (0, react_1.createElement)("span", null, "/"),
                (0, react_1.createElement)("span", null, p.name)),
            (0, react_1.createElement)("section", { className: "wrap product-detail" },
                (0, react_1.createElement)("div", { className: "product-gallery" },
                    (0, react_1.createElement)("button", { className: 'main-product-image ' + (this.state.view === 'detail' ? 'zoomed' : ''), "aria-label": "\u00DCr\u00FCn konsept g\u00F6rselini b\u00FCy\u00FCt", onClick: () => this.setState({ lightbox: true }) },
                        (0, react_1.createElement)("img", { src: (0, ui_1.image)(p.image), alt: p.name + ' ' + (this.state.view === 'detail' ? 'aynı konsept görselinin detay kırpımı' : 'konsept genel görünümü') }),
                        (0, react_1.createElement)("span", { className: "zoom-icon" },
                            (0, react_1.createElement)(ui_1.Icon, { name: "plus" })),
                        (0, react_1.createElement)("span", { className: "photo-disclaimer" }, this.state.view === 'detail' ? 'Aynı konseptin detay kırpımı' : 'Temsili tasarım görseli')),
                    (0, react_1.createElement)("div", { className: "gallery-controls", role: "group", "aria-label": "G\u00F6rsel g\u00F6r\u00FCn\u00FCm\u00FC" },
                        (0, react_1.createElement)("button", { className: this.state.view === 'full' ? 'active' : '', onClick: () => this.setState({ view: 'full' }) },
                            (0, react_1.createElement)("img", { src: (0, ui_1.image)(p.image), alt: "" }),
                            "Genel g\u00F6r\u00FCn\u00FCm"),
                        (0, react_1.createElement)("button", { className: this.state.view === 'detail' ? 'active' : '', onClick: () => this.setState({ view: 'detail' }) },
                            (0, react_1.createElement)("img", { className: "detail-thumb", src: (0, ui_1.image)(p.image), alt: "" }),
                            "Detay k\u0131rp\u0131m\u0131")),
                    (0, react_1.createElement)("p", { className: "small muted" }, "G\u00F6rseldeki di\u011Fer mobilya ve aksesuarlar \u00FCr\u00FCn kapsam\u0131na dahil de\u011Fildir.")),
                (0, react_1.createElement)("div", { className: "product-info" },
                    (0, react_1.createElement)(ui_1.Eyebrow, null,
                        "EL\u0130F TASARIM / ",
                        p.categoryLabel.toLocaleUpperCase('tr-TR')),
                    (0, react_1.createElement)("div", { className: "product-title-row" },
                        (0, react_1.createElement)("h1", null, p.name),
                        (0, react_1.createElement)("button", { className: 'icon-button ' + (a.favorites.includes(p.id) ? 'is-saved' : ''), "aria-label": p.name + ' ürününü kaydet', "aria-pressed": a.favorites.includes(p.id), onClick: () => a.favorite(p.id) },
                            (0, react_1.createElement)(ui_1.Icon, { name: "heart", size: 25 }))),
                    (0, react_1.createElement)("p", { className: "product-poem" }, p.intro),
                    (0, react_1.createElement)("p", null, p.detail),
                    (0, react_1.createElement)("dl", { className: "product-passport" },
                        (0, react_1.createElement)("div", null,
                            (0, react_1.createElement)("dt", null, "PAR\u00C7A NO."),
                            (0, react_1.createElement)("dd", null,
                                "ET / ",
                                p.number)),
                        (0, react_1.createElement)("div", null,
                            (0, react_1.createElement)("dt", null, "\u00D6L\u00C7\u00DC F\u0130KR\u0130"),
                            (0, react_1.createElement)("dd", null, p.dimensions)),
                        (0, react_1.createElement)("div", null,
                            (0, react_1.createElement)("dt", null, "\u00DCRET\u0130M YAKLA\u015EIMI"),
                            (0, react_1.createElement)("dd", null, p.mode === 'quoted' ? 'İhtiyacınıza göre görüşülür' : 'Ölçü ve malzemeyle şekillenir'))),
                    p.id === 'rota-calisma-masasi' && (0, react_1.createElement)("div", { className: "product-desk-link" },
                        (0, react_1.createElement)(ui_1.TextLink, { to: "/tasarim-masasi", navigate: a.navigate }, "\u00D6l\u00E7\u00FCleri tasar\u0131m masas\u0131nda dene")),
                    (0, react_1.createElement)("div", { className: "price-block" }, price === null ? (0, react_1.createElement)(react_1.Fragment, null,
                        (0, react_1.createElement)("strong", null, "\u00D6l\u00E7\u00FCn\u00FCze \u00F6zel teklif"),
                        (0, react_1.createElement)("span", null, "\u0130htiya\u00E7 ve malzemeye g\u00F6re birlikte belirlenir.")) : (0, react_1.createElement)(react_1.Fragment, null,
                        (0, react_1.createElement)("strong", null, (0, domain_1.money)(price)),
                        (0, react_1.createElement)("span", null, "Yaln\u0131z \u00F6rnek fiyat \u00B7 Sat\u0131\u015F teklifi de\u011Fildir"))),
                    (0, react_1.createElement)("div", { className: "option-group" },
                        (0, react_1.createElement)("span", { className: "field-label" },
                            "MALZEME F\u0130KR\u0130 ",
                            (0, react_1.createElement)("b", null, this.state.material)),
                        (0, react_1.createElement)("div", { className: "swatch-options" }, ['Ceviz', 'Meşe'].map((m, i) => (0, react_1.createElement)("button", { key: m, className: this.state.material === m ? 'active' : '', "aria-pressed": this.state.material === m, onClick: () => this.setState({ material: m }) },
                            (0, react_1.createElement)("span", { style: { backgroundImage: `url(${(0, ui_1.image)(i ? 'wood-oak.webp' : 'wood-walnut.webp')})` } }),
                            m))),
                        (0, react_1.createElement)("span", { className: "small muted" }, "Foto\u011Fraf ceviz g\u00F6r\u00FCn\u00FCm\u00FCnde konsepttir. Di\u011Fer malzeme i\u00E7in ger\u00E7ek numune gerekir.")),
                    (0, react_1.createElement)("label", { className: "field-label option-group" },
                        "\u00D6L\u00C7\u00DC",
                        (0, react_1.createElement)("select", { value: this.state.size, onChange: e => this.setState({ size: e.currentTarget.value }) }, p.sizes.map(s => (0, react_1.createElement)("option", { key: s, value: s }, s)))),
                    p.price !== null ? (0, react_1.createElement)("div", { className: "product-actions" },
                        (0, react_1.createElement)("div", { className: "quantity" },
                            (0, react_1.createElement)("button", { "aria-label": "Adedi azalt", disabled: this.state.quantity <= 1, onClick: () => this.setState({ quantity: this.state.quantity - 1 }) },
                                (0, react_1.createElement)(ui_1.Icon, { name: "minus", size: 16 })),
                            (0, react_1.createElement)("input", { "aria-label": "Adet", value: this.state.quantity, type: "number", min: "1", max: "100", onChange: e => {
                                    const n = Number(e.currentTarget.value);
                                    if ((0, domain_1.validQuantity)(n))
                                        this.setState({ quantity: n });
                                    else {
                                        e.currentTarget.value = String(this.state.quantity);
                                        a.notify('Adet 1 ile 100 arasında tam sayı olmalı.');
                                    }
                                } }),
                            (0, react_1.createElement)("button", { "aria-label": "Adedi art\u0131r", disabled: this.state.quantity >= 100, onClick: () => this.setState({ quantity: this.state.quantity + 1 }) },
                                (0, react_1.createElement)(ui_1.Icon, { name: "plus", size: 16 }))),
                        (0, react_1.createElement)("button", { className: "button", onClick: () => a.addCart(p, this.state.material, this.state.size, this.state.quantity) },
                            "\u00D6rnek sepete ekle ",
                            (0, react_1.createElement)(ui_1.Icon, { name: "bag" }))) : (0, react_1.createElement)(ui_1.ButtonLink, { to: '/teklif-al?urun=' + p.id, navigate: a.navigate }, "Bu tasar\u0131m\u0131 birlikte d\u00FC\u015F\u00FCnelim"),
                    (0, react_1.createElement)("div", { className: "product-support" },
                        (0, react_1.createElement)(ui_1.Icon, { name: "ruler" }),
                        (0, react_1.createElement)("span", null, "Ba\u015Fka bir \u00F6l\u00E7\u00FC m\u00FC d\u00FC\u015F\u00FCn\u00FCyorsunuz?"),
                        (0, react_1.createElement)(ui_1.Link, { to: '/teklif-al?urun=' + p.id, navigate: a.navigate },
                            "Konu\u015Fal\u0131m ",
                            (0, react_1.createElement)(ui_1.Icon, { size: 16 }))),
                    (0, react_1.createElement)(ui_1.Accordion, { items: [
                            ['Tasarım ve ölçü bilgisi', p.dimensions + '. Verilen ölçüler tasarım örneğidir; üretim ölçüsü ve teknik uygunluk atölye tarafından ayrıca onaylanmalıdır.'],
                            ['Malzeme ve yüzey', 'Ağaç türü, masif veya kaplama yapısı, yüzey işlemi ve donanım gerçek ürün kaydında ayrı belirtilir. Bu görselin tonu bir malzeme sertifikası veya numune değildir.'],
                            ['Üretim, teslim ve kurulum', 'Teslimat bölgesi, bina erişimi, kurulum ihtiyacı ve üretim planı kesin teklifte netleştirilir. Bu sürümde otomatik teslim tarihi veya ücretsiz kargo taahhüdü yoktur.'],
                            ['Bakım', 'Kesin bakım yöntemi gerçek malzeme ve yüzey işlemiyle belirlenir. Üretici talimatı dışında kimyasal veya yüzey uygulaması yapmadan önce atölyeye danışın.']
                        ] }))),
            (0, react_1.createElement)("section", { className: "wrap section related" },
                (0, react_1.createElement)("div", { className: "section-head" },
                    (0, react_1.createElement)("div", null,
                        (0, react_1.createElement)(ui_1.Eyebrow, null, "B\u0130RL\u0130KTE D\u00DC\u015E\u00DCN\u00DCLEB\u0130L\u0130R"),
                        (0, react_1.createElement)("h2", null,
                            "Birbirine e\u015Flik",
                            (0, react_1.createElement)("br", null),
                            (0, react_1.createElement)("em", null, "eden par\u00E7alar."))),
                    (0, react_1.createElement)(ui_1.TextLink, { to: "/urunler", navigate: a.navigate }, "Koleksiyona d\u00F6n")),
                (0, react_1.createElement)("div", { className: "featured-products" }, data_1.products.filter(x => x.id !== p.id).map(x => (0, react_1.createElement)(ui_1.ProductCard, { key: x.id, product: x, actions: a })))),
            this.state.lightbox && (0, react_1.createElement)(ui_1.Dialog, { title: p.name + ' / Konsept görseli', onClose: () => this.setState({ lightbox: false }) },
                (0, react_1.createElement)("img", { className: "lightbox-image", src: (0, ui_1.image)(p.image), alt: p.name + ' tam konsept görseli' }),
                (0, react_1.createElement)("p", { className: "small muted" }, "Temsili tasar\u0131m. Ger\u00E7ek \u00FCr\u00FCn foto\u011Fraf\u0131 de\u011Fildir.")));
    }
}
exports.ProductPage = ProductPage;

},"src/pages/DesignDesk":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesignDesk = void 0;
exports.TableDrawing = TableDrawing;
const react_1 = require("react");
const ui_1 = require("../components/ui");
const domain_1 = require("../lib/domain");
const desk_1 = require("../lib/desk");
const poly = (pts) => pts.map(p => p.join(',')).join(' ');
function TableDrawing({ desk, id = 'desk', compact = false }) {
    const { project: p, w, dep, h, top } = (0, desk_1.tableGeometry)(desk), mat = desk_1.deskMaterials[desk.material];
    const box = (x, y, z, dx, dy, dz, key) => (0, react_1.createElement)("g", { key: key },
        (0, react_1.createElement)("polygon", { points: poly([p(x, y, z), p(x + dx, y, z), p(x + dx, y, z + dz), p(x, y, z + dz)]), fill: desk.base === 'wood' ? '#77543c' : '#48473f' }),
        (0, react_1.createElement)("polygon", { points: poly([p(x + dx, y, z), p(x + dx, y + dy, z), p(x + dx, y + dy, z + dz), p(x + dx, y, z + dz)]), fill: desk.base === 'wood' ? '#4a3020' : '#2e302c' }),
        (0, react_1.createElement)("polygon", { points: poly([p(x, y, z + dz), p(x + dx, y, z + dz), p(x + dx, y + dy, z + dz), p(x, y + dy, z + dz)]), fill: desk.base === 'wood' ? '#9a7152' : '#68695d' }));
    const topW = desk.width * 2, topD = desk.depth * 2;
    return (0, react_1.createElement)("svg", { className: 'table-drawing ' + (compact ? 'compact' : ''), viewBox: "0 0 740 470", role: "img", "aria-label": `Temsili masa çizimi, ${desk.width} santimetre en, ${desk.depth} santimetre derinlik, ${desk.height} santimetre yükseklik`, "data-width": desk.width, "data-depth": desk.depth, "data-height": desk.height },
        (0, react_1.createElement)("defs", null,
            (0, react_1.createElement)("pattern", { id: id + 'grain', patternUnits: "userSpaceOnUse", width: "320", height: "320" },
                (0, react_1.createElement)("image", { href: (0, ui_1.image)(mat.image), width: "320", height: "320", preserveAspectRatio: "xMidYMid slice" })),
            (0, react_1.createElement)("pattern", { id: id + 'grid', width: "24", height: "24", patternUnits: "userSpaceOnUse" },
                (0, react_1.createElement)("path", { d: "M24 0H0V24", fill: "none", stroke: "#81745f", "stroke-width": ".35", opacity: ".25" })),
            (0, react_1.createElement)("radialGradient", { id: id + 'shadow' },
                (0, react_1.createElement)("stop", { offset: "0", "stop-color": "#655541", "stop-opacity": ".19" }),
                (0, react_1.createElement)("stop", { offset: "1", "stop-color": "#655541", "stop-opacity": "0" }))),
        (0, react_1.createElement)("rect", { width: "740", height: "470", fill: `url(#${id}grid)` }),
        desk.view === 'top' ? (0, react_1.createElement)("g", null,
            (0, react_1.createElement)("rect", { x: 370 - topW / 2, y: 235 - topD / 2, width: topW, height: topD, rx: "8", fill: `url(#${id}grain)`, stroke: "#594533", "stroke-width": "2" }),
            (0, react_1.createElement)("path", { d: `M${370 - topW / 2} ${255 + topD / 2}H${370 + topW / 2}`, stroke: "#76654f", "stroke-dasharray": "3 4" }),
            (0, react_1.createElement)("text", { x: "370", y: 278 + topD / 2, "text-anchor": "middle", fill: "#554735", "font-size": "15" },
                desk.width,
                " cm"),
            (0, react_1.createElement)("text", { x: 395 + topW / 2, y: "238", fill: "#554735", "font-size": "15" },
                desk.depth,
                " cm")) : (0, react_1.createElement)("g", null,
            (0, react_1.createElement)("ellipse", { cx: "370", cy: "360", rx: "300", ry: "80", fill: `url(#${id}shadow)` }),
            desk.base === 'wood' ? [[-w + 14, -dep + 8], [w - 22, -dep + 8], [-w + 14, dep - 16], [w - 22, dep - 16]].map(([x, y], i) => box(x, y, 0, 8, 8, h - 4, 'leg' + i)) : [-w + 20, w - 27].map((x, i) => (0, react_1.createElement)("g", { key: i },
                box(x, -dep + 4, 0, 9, dep * 2 - 8, 3, 'foot' + i),
                box(x, -4, 3, 9, 8, h - 7, 'post' + i),
                desk.base === 'adjustable' && box(x - .6, -4.6, h * .46, 10.2, 9.2, 3, 'collar' + i),
                box(x, -dep + 4, h - 8, 9, dep * 2 - 8, 4, 'arm' + i))),
            (0, react_1.createElement)("polygon", { points: poly([p(-w, dep, h - 4), p(w, dep, h - 4), p(w, dep, h), p(-w, dep, h)]), fill: "#654329" }),
            (0, react_1.createElement)("polygon", { points: poly([p(w, -dep, h - 4), p(w, dep, h - 4), p(w, dep, h), p(w, -dep, h)]), fill: "#4b3222" }),
            (0, react_1.createElement)("polygon", { "data-testid": "desk-top", points: poly(top), fill: `url(#${id}grain)`, stroke: "#62472f", "stroke-width": "1" }),
            (0, react_1.createElement)("polygon", { points: poly(top), fill: mat.color, opacity: ".13" }),
            !compact && (0, react_1.createElement)("g", { fill: "#6c5b46", stroke: "#8d7a61", "stroke-width": ".7" },
                (0, react_1.createElement)("path", { d: `M${p(-w, dep + 20, h - 12).join(' ')}L${p(w, dep + 20, h - 12).join(' ')}`, "stroke-dasharray": "3 4" }),
                (0, react_1.createElement)("text", { x: p(0, dep + 20, h - 12)[0], y: p(0, dep + 20, h - 12)[1] + 23, "font-size": "15", "text-anchor": "middle", stroke: "none" },
                    desk.width,
                    " cm"),
                (0, react_1.createElement)("path", { d: `M${p(w + 25, dep, h).join(' ')}L${p(w + 25, -dep, h).join(' ')}`, "stroke-dasharray": "3 4" }),
                (0, react_1.createElement)("text", { x: p(w + 25, 0, h)[0] + 17, y: p(w + 25, 0, h)[1] + 5, "font-size": "15", stroke: "none" },
                    desk.depth,
                    " cm"),
                (0, react_1.createElement)("path", { d: `M${p(-w - 22, -dep, 0).join(' ')}L${p(-w - 22, -dep, h).join(' ')}`, "stroke-dasharray": "3 4" }),
                (0, react_1.createElement)("text", { x: p(-w - 22, -dep, h / 2)[0] - 10, y: p(-w - 22, -dep, h / 2)[1], "font-size": "15", "text-anchor": "end", stroke: "none" },
                    desk.height,
                    " cm"))));
}
class DesignDesk extends react_1.Component {
    constructor(props) {
        super(props);
        this.change = (key, value) => this.setState(s => ({ desk: { ...s.desk, [key]: value } }));
        this.commitNumber = (key, raw) => {
            const ranges = { width: [100, 240], depth: [50, 100], height: [60, 125] };
            const [min, max] = ranges[key];
            const n = Number(raw.trim());
            if (!/^\d+$/.test(raw.trim()) || !Number.isSafeInteger(n) || n < min || n > max) {
                this.props.notify(`Ölçü ${min} ile ${max} cm arasında tam sayı olmalı.`);
                return false;
            }
            this.change(key, n);
            return true;
        };
        this.shareURL = () => {
            const base = typeof location !== 'undefined' && /^https?:$/.test(location.protocol) ? location.href.split('#')[0] : 'https://onourimpram.github.io/elif-tasarim/';
            return base + '#/tasarim-masasi?' + (0, desk_1.deskQuery)(this.state.desk);
        };
        this.state = { desk: (0, desk_1.deskFromParams)(new URLSearchParams(props.query || '')), sharing: false };
    }
    render() {
        const d = this.state.desk, a = this.props;
        return (0, react_1.createElement)(react_1.Fragment, null,
            (0, react_1.createElement)("section", { className: "desk-intro wrap" },
                (0, react_1.createElement)(ui_1.Eyebrow, null, "EL\u0130F / D\u0130J\u0130TAL TASARIM MASASI"),
                (0, react_1.createElement)("div", null,
                    (0, react_1.createElement)("h1", null,
                        "\u00D6nce bir fikir.",
                        (0, react_1.createElement)("br", null),
                        (0, react_1.createElement)("em", null, "Sonra sizin par\u00E7an\u0131z.")),
                    (0, react_1.createElement)("p", null, "\u00D6l\u00E7\u00FCy\u00FC de\u011Fi\u015Ftirin. Dokuyu se\u00E7in. Mek\u00E2n\u0131n\u0131za nas\u0131l bir par\u00E7a yak\u0131\u015Faca\u011F\u0131n\u0131 birlikte d\u00FC\u015F\u00FCnmeye ba\u015Flayal\u0131m."))),
            (0, react_1.createElement)("section", { className: "desk-layout wrap", "aria-label": "Tasar\u0131m masas\u0131" },
                (0, react_1.createElement)("div", { className: "desk-paper" },
                    (0, react_1.createElement)("div", { className: "desk-paper-top" },
                        (0, react_1.createElement)("span", null, "\u00C7ALI\u015EMA NO. 01 / MASA"),
                        (0, react_1.createElement)("div", { role: "group", "aria-label": "\u00C7izim g\u00F6r\u00FCn\u00FCm\u00FC" },
                            (0, react_1.createElement)("button", { "aria-pressed": d.view === 'perspective', onClick: () => this.change('view', 'perspective') }, "Perspektif"),
                            (0, react_1.createElement)("button", { "aria-pressed": d.view === 'top', onClick: () => this.change('view', 'top') }, "\u00DCstten"))),
                    (0, react_1.createElement)(TableDrawing, { desk: d }),
                    (0, react_1.createElement)("div", { className: "desk-paper-bottom" },
                        (0, react_1.createElement)("span", null, "ET / TASARIM \u00C7ALI\u015EMASI"),
                        (0, react_1.createElement)("span", null, "\u015Eematik \u00E7izim. Teknik \u00FCretim projesi de\u011Fildir.")),
                    (0, react_1.createElement)("div", { className: "desk-live", "aria-live": "polite" },
                        desk_1.deskMaterials[d.material].name,
                        " ",
                        (0, react_1.createElement)("i", null),
                        " ",
                        d.width,
                        " \u00D7 ",
                        d.depth,
                        " \u00D7 ",
                        d.height,
                        " cm ",
                        (0, react_1.createElement)("i", null),
                        " ",
                        desk_1.deskBases[d.base])),
                (0, react_1.createElement)("div", { className: "desk-controls" },
                    (0, react_1.createElement)(ui_1.Eyebrow, null, "01 / \u00D6L\u00C7\u00DCYLE BA\u015ELAYALIM"),
                    (0, react_1.createElement)("h2", null,
                        "Size ne kadar",
                        (0, react_1.createElement)("br", null),
                        (0, react_1.createElement)("em", null, "yer a\u00E7al\u0131m?")),
                    [['width', 'En', 100, 240], ['depth', 'Derinlik', 50, 100], ['height', 'Yükseklik', 60, 125]].map(([key, label, min, max]) => (0, react_1.createElement)("div", { className: "desk-slider", key: key },
                        (0, react_1.createElement)("span", null,
                            label,
                            (0, react_1.createElement)("span", { className: "v5-desk-number" },
                                (0, react_1.createElement)("input", { key: key + ':' + d[key], type: "number", inputMode: "numeric", min: min, max: max, step: 1, defaultValue: d[key], "aria-label": 'Masa ' + ({ width: 'eni', depth: 'derinliği', height: 'yüksekliği' }[key]) + ', santimetre', onBlur: e => { if (!this.commitNumber(key, e.currentTarget.value))
                                        e.currentTarget.value = String(d[key]); }, onKeyDown: e => { if (e.key === 'Enter') {
                                        e.preventDefault();
                                        e.currentTarget.blur();
                                    } } }),
                                (0, react_1.createElement)("small", null, "cm"))),
                        (0, react_1.createElement)("input", { "aria-label": 'Masa ' + label.toLocaleLowerCase('tr'), type: "range", min: min, max: max, step: "1", value: d[key], onInput: e => this.change(key, Number(e.currentTarget.value)) }),
                        (0, react_1.createElement)("span", { className: "slider-bounds" },
                            (0, react_1.createElement)("small", null,
                                min,
                                " cm"),
                            (0, react_1.createElement)("small", null,
                                max,
                                " cm")))),
                    (0, react_1.createElement)("div", { className: "desk-choice" },
                        (0, react_1.createElement)("span", { className: "field-label" }, "02 / MALZEME F\u0130KR\u0130"),
                        (0, react_1.createElement)("div", { className: "desk-swatches" }, Object.entries(desk_1.deskMaterials).map(([id, m]) => (0, react_1.createElement)("button", { key: id, "aria-pressed": d.material === id, "aria-label": m.name + ' malzeme fikri', onClick: () => this.change('material', id) },
                            (0, react_1.createElement)("span", { style: { backgroundImage: `url(${(0, ui_1.image)(m.image)})` } }),
                            m.name)))),
                    (0, react_1.createElement)("label", { className: "desk-choice" },
                        (0, react_1.createElement)("span", { className: "field-label" }, "03 / TA\u015EIYICI YAKLA\u015EIMI"),
                        (0, react_1.createElement)("select", { "aria-label": "Ta\u015F\u0131y\u0131c\u0131 yakla\u015F\u0131m\u0131", value: d.base, onChange: e => this.change('base', e.currentTarget.value) }, Object.entries(desk_1.deskBases).map(([k, v]) => (0, react_1.createElement)("option", { key: k, value: k }, v)))),
                    (0, react_1.createElement)(ui_1.ButtonLink, { to: '/teklif-al?urun=rota-calisma-masasi&' + (0, desk_1.deskQuery)(d), navigate: a.navigate }, "Bu fikirle devam et"),
                    (0, react_1.createElement)("button", { className: "text-link desk-download", onClick: () => (0, domain_1.downloadText)('elif-tasarim-fikrim.txt', (0, desk_1.deskSummary)(d)) },
                        "Tasar\u0131m \u00F6zetini indir ",
                        (0, react_1.createElement)(ui_1.Icon, { name: "download" })),
                    (0, react_1.createElement)("button", { className: "text-link desk-download", type: "button", "aria-expanded": this.state.sharing, onClick: () => this.setState({ sharing: !this.state.sharing }) },
                        "Tasar\u0131m ba\u011Flant\u0131s\u0131n\u0131 g\u00F6ster ",
                        (0, react_1.createElement)(ui_1.Icon, { name: "diagonal" })),
                    this.state.sharing && (0, react_1.createElement)("div", { className: "v5-share-box" },
                        (0, react_1.createElement)("label", null,
                            "Payla\u015F\u0131labilir tasar\u0131m ba\u011Flant\u0131s\u0131",
                            (0, react_1.createElement)("input", { type: "text", readOnly: true, value: this.shareURL(), "aria-label": "Payla\u015F\u0131labilir tasar\u0131m ba\u011Flant\u0131s\u0131", onFocus: e => e.currentTarget.select() })),
                        (0, react_1.createElement)("button", { type: "button", onClick: async () => { try {
                                await navigator.clipboard.writeText(this.shareURL());
                                a.notify('Tasarım bağlantısı kopyalandı.');
                            }
                            catch {
                                a.notify('Bağlantı alanını seçip kopyalayabilirsiniz.');
                            } } },
                            "Ba\u011Flant\u0131y\u0131 kopyala ",
                            (0, react_1.createElement)(ui_1.Icon, { size: 16 })),
                        (0, react_1.createElement)("p", null, "Yaln\u0131z \u00F6l\u00E7\u00FC ve malzeme fikrini payla\u015F\u0131r. Ki\u015Fisel bilgi veya sipari\u015F i\u00E7ermez.")))),
            (0, react_1.createElement)("div", { className: "wrap desk-disclaimer" },
                (0, react_1.createElement)(ui_1.Icon, { name: "info" }),
                (0, react_1.createElement)("p", null, "Bu \u00E7al\u0131\u015Fma bir g\u00F6rsel fikir arac\u0131d\u0131r. Se\u00E7enekler \u00FCretilebilirlik veya fiyat onay\u0131 de\u011Fildir. \u00D6zellikle y\u00FCkseklik mekanizmas\u0131, tabla a\u011F\u0131rl\u0131\u011F\u0131 ve montaj uyumu at\u00F6lye taraf\u0131ndan do\u011Frulanmal\u0131d\u0131r. Malzemeler temsili numunelerdir. Bilgi g\u00F6nderilmez.")));
    }
}
exports.DesignDesk = DesignDesk;

},"src/pages/Quote":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quote = void 0;
const react_1 = require("react");
const desk_1 = require("../lib/desk");
const data_1 = require("../lib/data");
const domain_1 = require("../lib/domain");
const ui_1 = require("../components/ui");
const initial = { kind: '', unknown: false, width: '', depth: '', height: '', unit: 'cm', material: 'Danışmak istiyorum', finish: 'Birlikte değerlendirelim', city: 'İstanbul', district: '', delivery: 'Birlikte planlayalım', name: '', email: '', phone: '', note: '', ack: false };
const labels = ['İhtiyaç', 'Ölçü', 'Malzeme', 'Görseller', 'Teslim', 'İletişim', 'Kontrol'];
const stepTitles = ['Neyi birlikte düşünelim?', 'Alanınızın ölçüsü nedir?', 'Dokusu nasıl olsun?', 'Bir görsel, çok şey anlatır.', 'Nereye yerleşecek?', 'Size nasıl ulaşalım?', 'Son bir kez, birlikte bakalım.'];
const stepDescriptions = ['Bir ürün seçin veya fikrinizi birlikte şekillendirelim.', 'Kesin ölçü bilmek zorunda değilsiniz. İlk fikir bile değerlidir.', 'Ağaç türü ile yüzey tercihini ayrı ayrı değerlendirelim.', 'Referans, mekân fotoğrafı veya eskiz ekleyebilirsiniz. Bu adım isteğe bağlı.', 'İlk aşamada açık adresinize ihtiyacımız yok.', 'Bu önizlemede bilgiler gönderilmez ve kalıcı olarak saklanmaz. Örnek bilgi kullanın.', 'Hazırlanan özet bir sipariş veya kabul edilmiş teklif değildir.'];
class Quote extends react_1.Component {
    constructor() {
        super(...arguments);
        this.state = { step: 0, v: { ...initial }, errors: {}, files: [], uploading: false, done: false, hasDraft: false };
        this.alive = true;
        this.set = (k, value) => this.setState(s => ({ v: { ...s.v, [k]: value }, errors: { ...s.errors, [k]: '' } }));
        this.changeUnit = (target) => {
            const result = (0, domain_1.convertDimensions)(this.state.v, target);
            if (!result.ok) {
                this.setState({ errors: result.errors });
                this.props.notify('Birimi değiştirmeden önce işaretli ölçüyü düzeltin.');
                return;
            }
            this.setState(s => ({ v: { ...s.v, ...result.values, unit: target }, errors: {} }));
        };
        this.editStep = (step) => this.setState({ step, errors: {} }, () => document.getElementById('wizard-title')?.focus());
        this.next = () => {
            const errors = (0, domain_1.validateQuoteStep)(this.state.step, this.state.v);
            if (Object.keys(errors).length) {
                this.setState({ errors }, () => document.getElementById('q-' + Object.keys(errors)[0])?.focus());
                return;
            }
            this.setState(s => ({ step: Math.min(6, s.step + 1), errors: {} }), () => document.getElementById('wizard-title')?.focus());
        };
        this.summary = () => { const v = this.state.v; return ['ELİF TASARIM — ÖNİZLEME TALEP ÖZETİ', 'Bu dosya atölyeye gönderilmedi. Sipariş veya fiyat teklifi değildir.', '', `İhtiyaç: ${v.kind}`, `Ölçü: ${v.unknown ? 'Birlikte belirlenecek' : [v.width, v.depth, v.height].join(' × ') + ' ' + v.unit}`, `Malzeme tercihi: ${v.material}`, `Yüzey tercihi: ${v.finish}`, `Bölge: ${v.city}${v.district ? ' / ' + v.district : ''}`, `Teslim yaklaşımı: ${v.delivery}`, `İsim: ${v.name}`, `E-posta: ${v.email || 'Belirtilmedi'}`, `Telefon: ${v.phone || 'Belirtilmedi'}`, `Not: ${v.note || 'Belirtilmedi'}`, `Görseller: ${this.state.files.map(f => f.name).join(', ') || 'Eklenmedi'}`, 'Görsel dosyaları bu metin dosyasına dahil değildir.'].join('\n'); };
        this.field = (name, label, placeholder = '', type = 'text') => (0, react_1.createElement)("label", { className: "form-field", htmlFor: 'q-' + name },
            (0, react_1.createElement)("span", { id: 'label-' + name }, label),
            (0, react_1.createElement)("input", { inputMode: ['width', 'depth', 'height'].includes(name) ? 'decimal' : undefined, "aria-labelledby": 'label-' + name, id: 'q-' + name, type: type, value: String(this.state.v[name]), maxLength: name === 'name' ? 100 : 200, placeholder: placeholder, onInput: e => this.set(name, e.currentTarget.value), "aria-invalid": !!this.state.errors[name], "aria-describedby": this.state.errors[name] ? 'err-' + name : undefined }),
            this.state.errors[name] && (0, react_1.createElement)("small", { className: "field-error", id: 'err-' + name }, this.state.errors[name]));
    }
    componentDidMount() { const p = data_1.products.find(p => p.id === this.props.productId), params = new URLSearchParams(this.props.query || ''), fromDesk = params.has('en'); const d = (0, desk_1.deskFromParams)(params); this.setState({ hasDraft: !fromDesk && !!(0, domain_1.readLocal)('quote-draft', null), v: { ...initial, kind: fromDesk ? (d.base === 'adjustable' ? 'Yükseklik ayarlı masa' : 'Çalışma masası') : p ? p.categoryLabel : '', ...(fromDesk ? { width: String(d.width), depth: String(d.depth), height: String(d.height), material: desk_1.deskMaterials[d.material].name, note: 'Tasarım masası fikri. Taşıyıcı tercihi, ' + desk_1.deskBases[d.base] + '. Üretim uygunluğu atölyede teyit edilecek.' } : {}) } }); }
    componentWillUnmount() { this.alive = false; this.state.files.forEach(f => URL.revokeObjectURL(f.url)); }
    async addFiles(list) {
        if (!list)
            return;
        const received = Array.from(list);
        if (received.length + this.state.files.length > 5) {
            this.props.notify('En fazla 5 görsel ekleyebilirsiniz.');
            return;
        }
        this.setState({ uploading: true });
        const accepted = [];
        try {
            for (const file of received) {
                const v = (0, domain_1.validateFile)(file);
                if (!v.ok) {
                    this.props.notify(v.error);
                    continue;
                }
                const bytes = new Uint8Array(await file.slice(0, 12).arrayBuffer());
                const png = bytes[0] === 137 && bytes[1] === 80 && bytes[2] === 78 && bytes[3] === 71;
                const jpg = bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255;
                const webp = String.fromCharCode(...bytes.slice(0, 4)) === 'RIFF' && String.fromCharCode(...bytes.slice(8, 12)) === 'WEBP';
                if (!(png || jpg || webp)) {
                    this.props.notify(file.name + ': dosya içeriği desteklenen bir görsel değil.');
                    continue;
                }
                const bitmap = await createImageBitmap(file);
                if (bitmap.width * bitmap.height > 40000000) {
                    bitmap.close();
                    this.props.notify('40 megapikselden küçük bir görsel seçin.');
                    continue;
                }
                bitmap.close();
                accepted.push({ name: file.name, url: URL.createObjectURL(file), bytes: file.size });
            }
        }
        catch {
            this.props.notify('Görsel okunamadı. Başka bir dosya deneyin.');
        }
        finally {
            if (this.alive)
                this.setState(s => ({ files: [...s.files, ...accepted], uploading: false }));
            else
                accepted.forEach(f => URL.revokeObjectURL(f.url));
        }
    }
    renderStep() {
        const { v, step, files } = this.state;
        if (step === 0)
            return (0, react_1.createElement)("div", { className: "choice-grid", id: "q-kind", tabIndex: -1 },
                [['Yemek masası', 'dining.webp'], ['Sandalye', 'chair.webp'], ['Konsol', 'sideboard.webp'], ['Yükseklik ayarlı masa', 'office.webp']].map(([kind, photo]) => (0, react_1.createElement)("button", { type: "button", key: kind, className: 'picture-choice ' + (v.kind === kind ? 'selected' : ''), "aria-pressed": v.kind === kind, onClick: () => this.set('kind', kind) },
                    (0, react_1.createElement)("img", { src: (0, ui_1.image)(photo), alt: "" }),
                    (0, react_1.createElement)("span", null,
                        kind,
                        (0, react_1.createElement)("i", null, v.kind === kind ? (0, react_1.createElement)(ui_1.Icon, { name: "check", size: 14 }) : null)))),
                (0, react_1.createElement)("button", { type: "button", className: 'choice-wide ' + (v.kind === 'Birlikte karar verelim' ? 'selected' : ''), onClick: () => this.set('kind', 'Birlikte karar verelim'), "aria-pressed": v.kind === 'Birlikte karar verelim' },
                    (0, react_1.createElement)(ui_1.Icon, { name: "ruler" }),
                    "Ba\u015Fka bir fikir / Birlikte karar verelim",
                    (0, react_1.createElement)(ui_1.Icon, { name: "arrow" })),
                this.state.errors.kind && (0, react_1.createElement)("p", { className: "field-error" }, this.state.errors.kind));
        if (step === 1)
            return (0, react_1.createElement)(react_1.Fragment, null,
                (0, react_1.createElement)("label", { className: "check-card" },
                    (0, react_1.createElement)("input", { type: "checkbox", checked: v.unknown, onChange: e => this.set('unknown', e.currentTarget.checked) }),
                    (0, react_1.createElement)("span", null,
                        "\u00D6l\u00E7\u00FClerimi birlikte belirleyelim",
                        (0, react_1.createElement)("small", null, "\u015Eimdilik kesin \u00F6l\u00E7\u00FC vermeden devam edebilirsiniz."))),
                !v.unknown && (0, react_1.createElement)(react_1.Fragment, null,
                    (0, react_1.createElement)("div", { className: "form-row three" },
                        this.field('width', 'En', '180'),
                        this.field('depth', 'Derinlik', '90'),
                        this.field('height', 'Yükseklik', '75')),
                    (0, react_1.createElement)("label", { className: "form-field" },
                        "\u00D6l\u00E7\u00FC birimi",
                        (0, react_1.createElement)("select", { "aria-label": "\u00D6l\u00E7\u00FC birimi", value: v.unit, onChange: e => { const old = v.unit; this.changeUnit(e.currentTarget.value); e.currentTarget.value = old; } },
                            (0, react_1.createElement)("option", { value: "cm" }, "Santimetre (cm)"),
                            (0, react_1.createElement)("option", { value: "mm" }, "Milimetre (mm)"))),
                    (0, react_1.createElement)("p", { className: "small muted" }, "120,5 veya 120.5 yazabilirsiniz. Birim de\u011Fi\u015Fince girdi\u011Finiz \u00F6l\u00E7\u00FCler d\u00F6n\u00FC\u015Ft\u00FCr\u00FCl\u00FCr. Bunlar ilk talep \u00F6l\u00E7\u00FCleridir; \u00FCretim onay\u0131 de\u011Fildir.")),
                (0, react_1.createElement)("details", { className: "inline-guide" },
                    (0, react_1.createElement)("summary", null,
                        "\u00D6l\u00E7\u00FC alma notlar\u0131 ",
                        (0, react_1.createElement)(ui_1.Icon, { name: "plus", size: 16 })),
                    (0, react_1.createElement)("p", null, "En, derinlik ve y\u00FCksekli\u011Fi ayr\u0131 \u00F6l\u00E7\u00FCn. Se\u00E7ti\u011Finiz birimi b\u00FCt\u00FCn alanlarda tutarl\u0131 kullan\u0131n. Kap\u0131, \u00E7ekmece ve sandalye i\u00E7in gereken kullan\u0131m paylar\u0131n\u0131 at\u00F6lyeyle de\u011Ferlendirin. \u0130lk \u00F6l\u00E7\u00FCler \u00FCretim onay\u0131 de\u011Fildir.")));
        if (step === 2)
            return (0, react_1.createElement)(react_1.Fragment, null,
                (0, react_1.createElement)("span", { className: "field-label" }, "MALZEME TERC\u0130H\u0130"),
                (0, react_1.createElement)("div", { className: "material-choices" }, data_1.materials.map(m => (0, react_1.createElement)("button", { type: "button", key: m.id, className: v.material === m.name ? 'selected' : '', onClick: () => this.set('material', m.name), "aria-pressed": v.material === m.name },
                    (0, react_1.createElement)("img", { src: (0, ui_1.image)(m.image), alt: "" }),
                    (0, react_1.createElement)("span", null,
                        m.name,
                        v.material === m.name && (0, react_1.createElement)(ui_1.Icon, { name: "check", size: 16 }))))),
                (0, react_1.createElement)("button", { type: "button", className: 'choice-wide ' + (v.material === 'Danışmak istiyorum' ? 'selected' : ''), onClick: () => this.set('material', 'Danışmak istiyorum'), "aria-pressed": v.material === 'Danışmak istiyorum' },
                    "Malzeme konusunda dan\u0131\u015Fmak istiyorum ",
                    (0, react_1.createElement)(ui_1.Icon, { name: "arrow" })),
                (0, react_1.createElement)("label", { className: "form-field spaced" },
                    "Y\u00FCzey beklentiniz",
                    (0, react_1.createElement)("select", { value: v.finish, onChange: e => this.set('finish', e.currentTarget.value) },
                        (0, react_1.createElement)("option", { value: "Birlikte de\u011Ferlendirelim" }, "Birlikte de\u011Ferlendirelim"),
                        (0, react_1.createElement)("option", { value: "Do\u011Fal g\u00F6r\u00FCn\u00FCm" }, "Do\u011Fal g\u00F6r\u00FCn\u00FCm"),
                        (0, react_1.createElement)("option", { value: "Mat biti\u015F" }, "Mat biti\u015F"),
                        (0, react_1.createElement)("option", { value: "Farkl\u0131 renk / y\u00FCzey g\u00F6r\u00FC\u015Felim" }, "Farkl\u0131 renk / y\u00FCzey g\u00F6r\u00FC\u015Felim"))),
                (0, react_1.createElement)("p", { className: "small muted" }, "G\u00F6rseller temsili tonlard\u0131r. Malzeme yap\u0131s\u0131 ve y\u00FCzey i\u015Flemi numuneyle netle\u015Fir."));
        if (step === 3)
            return (0, react_1.createElement)(react_1.Fragment, null,
                (0, react_1.createElement)("label", { className: "upload-zone" },
                    (0, react_1.createElement)(ui_1.Icon, { name: "upload", size: 32 }),
                    (0, react_1.createElement)("strong", null, this.state.uploading ? 'Görseller kontrol ediliyor…' : 'Görsel eklemek için seçin'),
                    (0, react_1.createElement)("span", null, "JPG, PNG, WebP \u00B7 En fazla 5 g\u00F6rsel \u00B7 Her biri 10 MB"),
                    (0, react_1.createElement)("input", { type: "file", multiple: true, accept: "image/jpeg,image/png,image/webp", disabled: this.state.uploading, onChange: e => { this.addFiles(e.currentTarget.files); e.currentTarget.value = ''; }, "aria-label": "Referans g\u00F6rsellerini se\u00E7" })),
                (0, react_1.createElement)("div", { className: "upload-list" }, files.map((f, i) => (0, react_1.createElement)("div", { key: f.url },
                    (0, react_1.createElement)("img", { src: f.url, alt: 'Seçtiğiniz referans: ' + f.name }),
                    (0, react_1.createElement)("span", null, f.name),
                    (0, react_1.createElement)("button", { type: "button", className: "icon-button", "aria-label": f.name + ' görselini kaldır', onClick: () => { URL.revokeObjectURL(f.url); this.setState({ files: files.filter((_, n) => n !== i) }); } },
                        (0, react_1.createElement)(ui_1.Icon, { name: "close", size: 16 }))))),
                (0, react_1.createElement)("div", { className: "note-box" },
                    (0, react_1.createElement)(ui_1.Icon, { name: "info" }),
                    (0, react_1.createElement)("p", null, "G\u00F6rseller yaln\u0131z a\u00E7\u0131k sayfan\u0131zda tutulur. Yenileme veya ba\u015Fka sayfaya ge\u00E7i\u015Fte silinir. Sunucuya g\u00F6nderilmez. \u0130nsan, belge ve a\u00E7\u0131k adres gibi \u00F6zel bilgiler i\u00E7eren foto\u011Fraflar payla\u015Fmay\u0131n.")));
        if (step === 4)
            return (0, react_1.createElement)(react_1.Fragment, null,
                (0, react_1.createElement)("div", { className: "form-row" },
                    (0, react_1.createElement)("label", { className: "form-field" },
                        "\u0130l",
                        (0, react_1.createElement)("select", { value: v.city, onChange: e => this.set('city', e.currentTarget.value) },
                            (0, react_1.createElement)("option", { value: "\u0130stanbul" }, "\u0130stanbul"),
                            (0, react_1.createElement)("option", { value: "Ba\u015Fka bir il" }, "Ba\u015Fka bir il"),
                            (0, react_1.createElement)("option", { value: "Daha sonra netle\u015Ftirelim" }, "Daha sonra netle\u015Ftirelim"))),
                    this.field('district', 'İlçe / bölge (isteğe bağlı)')),
                (0, react_1.createElement)("label", { className: "form-field" },
                    "Teslim yakla\u015F\u0131m\u0131",
                    (0, react_1.createElement)("select", { value: v.delivery, onChange: e => this.set('delivery', e.currentTarget.value) },
                        (0, react_1.createElement)("option", { value: "Birlikte planlayal\u0131m" }, "Birlikte planlayal\u0131m"),
                        (0, react_1.createElement)("option", { value: "At\u00F6lyeden teslim almak istiyorum" }, "At\u00F6lyeden teslim almak istiyorum"),
                        (0, react_1.createElement)("option", { value: "Adrese teslimi g\u00F6r\u00FC\u015Fmek istiyorum" }, "Adrese teslimi g\u00F6r\u00FC\u015Fmek istiyorum"),
                        (0, react_1.createElement)("option", { value: "Teslim ve kurulum ihtiyac\u0131m var" }, "Teslim ve kurulum ihtiyac\u0131m var"))),
                (0, react_1.createElement)("div", { className: "note-box" },
                    (0, react_1.createElement)(ui_1.Icon, { name: "pin" }),
                    (0, react_1.createElement)("p", null, "Bu se\u00E7im kesin teslimat veya fiyat taahh\u00FCd\u00FC olu\u015Fturmaz. Ta\u015F\u0131ma, mek\u00E2na eri\u015Fim ve kurulum son teklifte netle\u015Fir.")));
        if (step === 5)
            return (0, react_1.createElement)(react_1.Fragment, null,
                this.field('name', 'Adınız', 'Örnek Müşteri'),
                (0, react_1.createElement)("div", { className: "form-row" },
                    this.field('email', 'E-posta', 'ornek@example.com', 'email'),
                    this.field('phone', 'Telefon (e-posta yerine de olabilir)', '', 'tel')),
                (0, react_1.createElement)("label", { className: "form-field" },
                    "Eklemek istedi\u011Finiz bir \u015Fey var m\u0131?",
                    (0, react_1.createElement)("textarea", { value: v.note, maxLength: 2000, rows: 4, onInput: e => this.set('note', e.currentTarget.value), placeholder: "Nas\u0131l kullanaca\u011F\u0131n\u0131z\u0131 ve sizin i\u00E7in \u00F6nemli ayr\u0131nt\u0131lar\u0131 anlatabilirsiniz." })),
                (0, react_1.createElement)("p", { className: "small muted" }, "Bu bilgiler yaln\u0131z indirmeniz i\u00E7in haz\u0131rlanacak \u00F6zette kullan\u0131l\u0131r. At\u00F6lyeye g\u00F6nderim yap\u0131lmaz ve ileti\u015Fim bilgisi taray\u0131c\u0131 tasla\u011F\u0131na kaydedilmez."));
        return (0, react_1.createElement)(react_1.Fragment, null,
            (0, react_1.createElement)("dl", { className: "summary-list" }, [['İhtiyaç', v.kind], ['Ölçü', v.unknown ? 'Birlikte belirlenecek' : `${v.width} × ${v.depth} × ${v.height} ${v.unit}`], ['Malzeme', v.material], ['Yüzey', v.finish], ['Teslim', v.city + ' / ' + v.delivery], ['İletişim', v.name + ' · ' + (v.email || v.phone)], ['Görseller', files.length + ' görsel, yalnız açık sayfada']].map(([k, val]) => (0, react_1.createElement)("div", { key: k },
                (0, react_1.createElement)("dt", null, k),
                (0, react_1.createElement)("dd", null, val),
                (0, react_1.createElement)("button", { type: "button", className: "summary-edit", "aria-label": k === 'Ölçü' ? 'Ölçüyü düzenle' : k + ' alanını düzenle', onClick: () => this.editStep({ İhtiyaç: 0, Ölçü: 1, Malzeme: 2, Yüzey: 2, Teslim: 4, İletişim: 5, Görseller: 3 }[k]) },
                    "D\u00FCzenle ",
                    (0, react_1.createElement)(ui_1.Icon, { name: "arrow", size: 14 }))))),
            v.note && (0, react_1.createElement)("p", { className: "quote-note" }, v.note),
            (0, react_1.createElement)("label", { className: "check-card" },
                (0, react_1.createElement)("input", { type: "checkbox", checked: v.ack, onChange: e => this.set('ack', e.currentTarget.checked) }),
                (0, react_1.createElement)("span", null,
                    "Bu i\u015Flemin yaln\u0131z yerel bir \u00F6nizleme oldu\u011Funu anl\u0131yorum.",
                    (0, react_1.createElement)("small", null, "At\u00F6lyeye bilgi g\u00F6nderilmez, sipari\u015F veya \u00F6deme olu\u015Fturulmaz."))));
    }
    render() {
        const a = this.props, { v, step } = this.state;
        return (0, react_1.createElement)("section", { className: "quote-page wrap" },
            (0, react_1.createElement)("div", { className: "quote-heading" },
                (0, react_1.createElement)(ui_1.Eyebrow, null, "EL\u0130F / \u00D6ZEL \u00D6L\u00C7\u00DC ST\u00DCDYOSU"),
                (0, react_1.createElement)("h1", null,
                    "\u00D6l\u00E7\u00FCs\u00FC size.",
                    (0, react_1.createElement)("br", null),
                    (0, react_1.createElement)("em", null, "Hik\u00E2yesi birlikte.")),
                (0, react_1.createElement)("p", null, "Bir fikri, konu\u015Fulabilir bir tasar\u0131ma d\u00F6n\u00FC\u015Ft\u00FCrelim."),
                new URLSearchParams(this.props.query || '').has('en') && (0, react_1.createElement)("div", { className: "desk-prefill", role: "status" },
                    (0, react_1.createElement)(ui_1.Icon, { name: "check" }),
                    "Tasar\u0131m masan\u0131zdaki \u00F6l\u00E7\u00FC ve malzeme tercihleri bu talebe aktar\u0131ld\u0131. Her ad\u0131mda de\u011Fi\u015Ftirebilirsiniz.")),
            this.state.done ? (0, react_1.createElement)("div", { className: "quote-success" },
                (0, react_1.createElement)("span", { className: "success-mark" },
                    (0, react_1.createElement)(ui_1.Icon, { name: "check", size: 30 })),
                (0, react_1.createElement)(ui_1.Eyebrow, null, "\u00D6N\u0130ZLEME TAMAMLANDI"),
                (0, react_1.createElement)("h2", null,
                    "Fikriniz art\u0131k",
                    (0, react_1.createElement)("br", null),
                    (0, react_1.createElement)("em", null, "bir arada.")),
                (0, react_1.createElement)("p", null,
                    "Talep \u00F6zetiniz haz\u0131r. ",
                    (0, react_1.createElement)("strong", null, "At\u00F6lyeye g\u00F6nderilmedi."),
                    (0, react_1.createElement)("br", null),
                    "Bu bir sipari\u015F, fiyat teklifi veya \u00FCretim onay\u0131 de\u011Fildir."),
                (0, react_1.createElement)("div", { className: "success-summary" },
                    (0, react_1.createElement)("pre", null, this.summary())),
                (0, react_1.createElement)("div", { className: "action-row" },
                    (0, react_1.createElement)("button", { type: "button", className: "button", onClick: () => (0, domain_1.downloadText)('Elif_Tasarim_Talep_Ozeti.txt', this.summary()) },
                        "\u00D6zeti indir ",
                        (0, react_1.createElement)(ui_1.Icon, { name: "download" })),
                    (0, react_1.createElement)("button", { type: "button", className: "button button-outline", onClick: () => this.setState({ done: false, step: 6 }) },
                        "\u00D6zeti d\u00FCzenle ",
                        (0, react_1.createElement)(ui_1.Icon, null))),
                (0, react_1.createElement)(ui_1.Link, { to: "/urunler", navigate: a.navigate, className: "text-link" },
                    "Koleksiyona d\u00F6n ",
                    (0, react_1.createElement)(ui_1.Icon, null))) : (0, react_1.createElement)("div", { className: "wizard-layout" },
                (0, react_1.createElement)("aside", { className: "wizard-aside" },
                    (0, react_1.createElement)("ol", { className: "step-list" }, labels.map((s, i) => (0, react_1.createElement)("li", { key: s, className: i === step ? 'current' : i < step ? 'complete' : '', "aria-current": i === step ? 'step' : undefined },
                        (0, react_1.createElement)("button", { type: "button", disabled: i > step, onClick: () => this.setState({ step: i, errors: {} }) },
                            (0, react_1.createElement)("span", null, i < step ? (0, react_1.createElement)(ui_1.Icon, { name: "check", size: 14 }) : String(i + 1).padStart(2, '0')),
                            s)))),
                    (0, react_1.createElement)("div", { className: "wizard-help" },
                        (0, react_1.createElement)(ui_1.Icon, { name: "ruler", size: 28 }),
                        (0, react_1.createElement)("h3", null, "Her \u015Feyin cevab\u0131n\u0131 bilmeniz gerekmiyor."),
                        (0, react_1.createElement)("p", null, "\u00D6l\u00E7\u00FC, malzeme ve teslim detaylar\u0131n\u0131 birlikte de\u011Ferlendirmek i\u00E7in buraday\u0131z."),
                        (0, react_1.createElement)("span", null, "Temsili ak\u0131\u015F \u00B7 Canl\u0131 g\u00F6nderim yok"))),
                (0, react_1.createElement)("div", { className: "wizard-card" },
                    (0, react_1.createElement)("div", { className: "wizard-topline" },
                        (0, react_1.createElement)("span", null,
                            "ADIM ",
                            step + 1,
                            " / 7"),
                        (0, react_1.createElement)("span", null,
                            Math.round((step + 1) / 7 * 100),
                            "%")),
                    (0, react_1.createElement)("div", { className: "progress-bar" },
                        (0, react_1.createElement)("span", { style: { width: (step + 1) / 7 * 100 + '%' } })),
                    (0, react_1.createElement)("h2", { id: "wizard-title", tabIndex: -1 }, stepTitles[step]),
                    (0, react_1.createElement)("p", { className: "wizard-subtitle" }, stepDescriptions[step]),
                    this.state.hasDraft && step === 0 && (0, react_1.createElement)("div", { className: "draft-alert" },
                        (0, react_1.createElement)("span", null, "Bu cihazda kaydedilmi\u015F \u00F6l\u00E7\u00FC tercihleri var."),
                        (0, react_1.createElement)("button", { type: "button", onClick: () => {
                                const saved = (0, domain_1.readLocal)('quote-draft', null);
                                if (saved)
                                    this.setState({ v: { ...initial, ...(0, domain_1.safeDraft)(saved) }, hasDraft: false });
                            } },
                            "Tercihleri getir ",
                            (0, react_1.createElement)(ui_1.Icon, { size: 16 }))),
                    (0, react_1.createElement)("form", { onSubmit: e => {
                            e.preventDefault();
                            if (step < 6)
                                this.next();
                            else if (v.ack)
                                this.setState({ done: true });
                        }, noValidate: true },
                        (0, react_1.createElement)("div", { className: "wizard-content" }, this.renderStep()),
                        (0, react_1.createElement)("div", { className: "wizard-actions" },
                            (0, react_1.createElement)("button", { className: "back-button", type: "button", disabled: step === 0, onClick: () => this.setState({ step: step - 1, errors: {} }) },
                                (0, react_1.createElement)("span", { className: "reverse-arrow" },
                                    (0, react_1.createElement)(ui_1.Icon, null)),
                                "Geri"),
                            (0, react_1.createElement)("button", { className: "button", type: "submit", disabled: this.state.uploading || (step === 6 && !v.ack) },
                                step === 6 ? 'Talep özetini hazırla' : 'Devam et',
                                (0, react_1.createElement)(ui_1.Icon, null)))),
                    (0, react_1.createElement)("div", { className: "save-draft-row" },
                        (0, react_1.createElement)("button", { type: "button", onClick: () => { const ok = (0, domain_1.writeLocal)('quote-draft', (0, domain_1.safeDraft)(v), 7); a.notify(ok ? 'Yalnız ürün, ölçü ve malzeme tercihleri bu cihazda 7 gün saklandı. İletişim, not ve fotoğraf kaydedilmedi.' : 'Tarayıcı kayıt izni vermedi. Bu sayfada çalışmaya devam edebilirsiniz.'); } }, "\u00D6l\u00E7\u00FC tercihlerini bu cihazda sakla"),
                        (0, react_1.createElement)("span", null, "\u0130leti\u015Fim ve foto\u011Fraflar kaydedilmez.")))));
    }
}
exports.Quote = Quote;

}});Object.assign(modules,{"src/App":function(module,exports,require){
'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const data_1 = require("./lib/data");
const domain_1 = require("./lib/domain");
const ui_1 = require("./components/ui");
const DesignDesk_1 = require("./pages/DesignDesk");
const Home_1 = require("./pages/Home");
const Catalog_1 = require("./pages/Catalog");
const Editorial_1 = require("./pages/Editorial");
const Quote_1 = require("./pages/Quote");
const Commerce_1 = require("./pages/Commerce");
const Studio_1 = require("./pages/Studio");
const routes_1 = require("./lib/routes");
const Portfolio_1 = require("./pages/Portfolio");
const BringModel_1 = require("./pages/BringModel");
const portfolio_1 = require("./lib/portfolio");
const PortfolioUI_1 = require("./components/PortfolioUI");
class App extends react_1.Component {
    constructor(props) {
        super(props);
        this.onScroll = () => { const scrolled = window.scrollY > 650; if (scrolled !== this.state.scrolled)
            this.setState({ scrolled }); };
        this.currentLocation = () => { const path = window.__ELIF_PREVIEW__ ? (window.location.hash.slice(1) || '/') : (window.location.pathname.replace(/\/+$/, '') || '/') + window.location.search; return path.startsWith('/') ? path : '/'; };
        this.onLocation = () => { this.setState({ path: this.currentLocation(), menu: false, search: false }, this.afterRoute); };
        this.afterRoute = () => { document.title = (0, routes_1.pageTitle)(this.state.path); window.scrollTo({ top: 0, behavior: 'instant' }); this.onScroll(); };
        this.navigate = (path) => {
            if (path === this.state.path) {
                this.setState({ menu: false, search: false });
                return;
            }
            history.pushState({}, '', (0, domain_1.publicHref)(path));
            this.setState({ path, menu: false, search: false, searchQuery: '' }, () => { this.afterRoute(); setTimeout(() => document.querySelector('main')?.focus({ preventScroll: true }), 50); });
        };
        this.notify = (toast) => {
            if (this.timer)
                clearTimeout(this.timer);
            this.setState({ toast });
            this.timer = setTimeout(() => this.setState({ toast: '' }), 5500);
        };
        this.favorite = (id) => { const exists = this.state.favorites.includes(id); const favorites = exists ? this.state.favorites.filter(x => x !== id) : [...this.state.favorites, id]; this.setState({ favorites }); const stored = (0, domain_1.writeLocal)('favorites', favorites); this.notify(exists ? 'Çalışma dosyanızdan çıkarıldı.' : stored ? 'Bu cihazdaki çalışma dosyanıza kaydedildi.' : 'Bu açık sayfada kaydedildi. Tarayıcı kalıcı depolamaya izin vermedi.'); };
        this.addCart = (p, material, size, quantity) => {
            if (p.price === null || !(0, domain_1.validQuantity)(quantity) || !p.sizes.includes(size) || !['Ceviz', 'Meşe'].includes(material))
                return;
            const key = (0, domain_1.cartKey)(p.id, material, size), old = this.state.cart.find(l => l.key === key);
            if (old && old.quantity + quantity > 100) {
                this.notify('Bir satırda en fazla 100 adet seçilebilir.');
                return;
            }
            const cart = old ? this.state.cart.map(l => l.key === key ? { ...l, quantity: l.quantity + quantity } : l) : [...this.state.cart, { key, id: p.id, material, size, quantity, unitMinor: p.price + Math.max(0, p.sizes.indexOf(size)) * 700000 }];
            this.setState({ cart });
            const stored = (0, domain_1.writeLocal)('cart', cart);
            this.notify(p.name + ' örnek sepete eklendi. ' + (stored ? 'Gerçek sipariş oluşturulmadı.' : 'Tarayıcı depolaması kapalı; yalnız bu açık sayfada tutuluyor.'));
        };
        this.changeCart = (key, quantity) => {
            if (!(0, domain_1.validQuantity)(quantity))
                return;
            const cart = this.state.cart.map(l => l.key === key ? { ...l, quantity } : l);
            this.setState({ cart });
            (0, domain_1.writeLocal)('cart', cart);
        };
        this.removeCart = (key) => { const cart = this.state.cart.filter(l => l.key !== key); this.setState({ cart }); (0, domain_1.writeLocal)('cart', cart); this.notify('Parça örnek sepetten çıkarıldı.'); };
        this.actions = () => ({ navigate: this.navigate, notify: this.notify, favorites: this.state.favorites, favorite: this.favorite, cart: this.state.cart, addCart: this.addCart, changeCart: this.changeCart, removeCart: this.removeCart, openInfo: () => this.setState({ info: true }) });
        this.state = { path: props.initialPath || '/', scrolled: false, cart: [], favorites: [], menu: false, search: false, searchQuery: '', info: false, toast: '' };
    }
    componentDidMount() {
        let favorites = (0, domain_1.readLocal)('favorites', []), rawCart = (0, domain_1.readLocal)('cart', []);
        if (!Array.isArray(favorites))
            favorites = [];
        const cart = [];
        if (Array.isArray(rawCart))
            for (const l of rawCart) {
                const p = data_1.products.find(p => p.id === l?.id);
                if (p && p.price !== null && p.sizes.includes(l.size) && ['Ceviz', 'Meşe'].includes(l.material) && (0, domain_1.validQuantity)(l.quantity)) {
                    cart.push({ ...l, key: (0, domain_1.cartKey)(p.id, l.material, l.size), unitMinor: p.price + Math.max(0, p.sizes.indexOf(l.size)) * 700000 });
                }
            }
        this.setState({ path: this.currentLocation(), favorites: [...new Set(favorites.filter(id => data_1.products.some(p => p.id === id)))], cart }, this.afterRoute);
        window.addEventListener('hashchange', this.onLocation);
        window.addEventListener('popstate', this.onLocation);
        window.addEventListener('scroll', this.onScroll, { passive: true });
        this.onScroll();
    }
    componentWillUnmount() {
        window.removeEventListener('hashchange', this.onLocation);
        window.removeEventListener('popstate', this.onLocation);
        window.removeEventListener('scroll', this.onScroll);
        if (this.timer)
            clearTimeout(this.timer);
    }
    renderPage() {
        const a = this.actions(), [path, qs = ''] = this.state.path.split('?'), params = new URLSearchParams(qs);
        if (path === '/')
            return (0, react_1.createElement)(Home_1.Home, { ...a });
        if (path === '/projeler')
            return (0, react_1.createElement)(Portfolio_1.Projects, { key: this.state.path, ...a, query: qs });
        if (path.startsWith('/proje/')) {
            const w = portfolio_1.works.find(w => '/proje/' + w.id === path);
            if (w)
                return (0, react_1.createElement)(Portfolio_1.WorkDetail, { key: w.id, ...a, work: w });
        }
        if (path === '/kategoriler')
            return (0, react_1.createElement)(Portfolio_1.Categories, { ...a });
        if (path.startsWith('/kategoriler/') && portfolio_1.workCategories.some(c => '/kategoriler/' + c.id === path))
            return (0, react_1.createElement)(Portfolio_1.Categories, { ...a, slug: path.split('/').pop() });
        if (path === '/ilham-modelleri')
            return (0, react_1.createElement)(Portfolio_1.Inspiration, { ...a });
        if (path === '/modelini-getir')
            return (0, react_1.createElement)(BringModel_1.BringModel, { key: this.state.path, ...a, query: qs });
        if (path === '/hakkimizda' || path === '/atolyemiz')
            return (0, react_1.createElement)(Portfolio_1.AboutAtelier, { ...a });
        if (path === '/atolye')
            return (0, react_1.createElement)(Portfolio_1.AboutAtelier, { ...a, atelier: true });
        if (path === '/tasarim-masasi')
            return (0, react_1.createElement)(DesignDesk_1.DesignDesk, { key: this.state.path, ...a, query: qs });
        if (path === '/urunler')
            return (0, react_1.createElement)(Catalog_1.Catalog, { key: this.state.path, ...a, initialCategory: data_1.categories.some(c => c.id === params.get('alan')) ? params.get('alan') : 'all', initialQuery: (params.get('q') || '').slice(0, 200), initialSort: params.get('sirala') || 'editorial' });
        if (path.startsWith('/urun/')) {
            const p = data_1.products.find(p => '/urun/' + p.id === path);
            if (p)
                return (0, react_1.createElement)(Catalog_1.ProductPage, { key: p.id, ...a, product: p });
        }
        const pages = { '/atolyemiz': Editorial_1.Atelier, '/ozel-uretim': Editorial_1.Bespoke, '/malzemeler': Editorial_1.Materials, '/mekan-fikirleri': Editorial_1.Ideas, '/rehber': Editorial_1.Journal, '/sikca-sorulan-sorular': Editorial_1.FAQ, '/iletisim': Commerce_1.Contact, '/sepet': Commerce_1.Cart, '/odeme': Commerce_1.Checkout, '/calisma-dosyam': Commerce_1.Saved, '/gizlilik': Editorial_1.Privacy, '/atolye-demolari': Studio_1.Studio };
        if (path === '/teklif-al')
            return (0, react_1.createElement)(Quote_1.Quote, { key: this.state.path, ...a, productId: params.get('urun') || undefined, query: qs });
        if (path.startsWith('/mekan-fikirleri/') && data_1.ideas.some(i => '/mekan-fikirleri/' + i.id === path))
            return (0, react_1.createElement)(Editorial_1.Ideas, { ...a, slug: path.split('/').pop() });
        if (path.startsWith('/rehber/') && data_1.journal.some(i => '/rehber/' + i.id === path))
            return (0, react_1.createElement)(Editorial_1.Journal, { ...a, slug: path.split('/').pop() });
        const Page = pages[path];
        if (Page)
            return (0, react_1.createElement)(Page, { key: path, ...a });
        return (0, react_1.createElement)("section", { className: "wrap empty-state missing-page" },
            (0, react_1.createElement)(ui_1.Eyebrow, null, "404 / B\u0130R YOL AYRIMI"),
            (0, react_1.createElement)("h1", null,
                "Bu sayfay\u0131",
                (0, react_1.createElement)("br", null),
                (0, react_1.createElement)("em", null, "bulamad\u0131k.")),
            (0, react_1.createElement)("p", null, "Koleksiyona veya at\u00F6lyenin ana sayfas\u0131na d\u00F6nebilirsiniz."),
            (0, react_1.createElement)(ui_1.ButtonLink, { to: "/", navigate: this.navigate }, "At\u00F6lyeye d\u00F6n"));
    }
    render() {
        const s = this.state, a = this.actions(), count = s.cart.reduce((n, l) => n + l.quantity, 0);
        const nav = (to, label) => (0, react_1.createElement)(ui_1.Link, { key: to, to: to, navigate: this.navigate, "aria-current": s.path.split('?')[0] === to ? 'page' : undefined }, label);
        const results = data_1.products.filter(p => (0, domain_1.searchKey)(p.name + ' ' + p.categoryLabel + ' ' + p.material + ' ' + p.id + ' ' + p.category).includes((0, domain_1.searchKey)(s.searchQuery)));
        const workResults = portfolio_1.works.filter(w => (0, domain_1.searchKey)(w.title + ' ' + w.subtitle + ' ' + (0, portfolio_1.categoryName)(w.category)).includes((0, domain_1.searchKey)(s.searchQuery))).slice(0, 8);
        return (0, react_1.createElement)(react_1.Fragment, null,
            (0, react_1.createElement)("a", { href: "#main-content", className: "skip-link", onClick: e => { e.preventDefault(); const main = document.getElementById("main-content"); main?.focus({ preventScroll: true }); main?.scrollIntoView({ block: "start", behavior: "instant" }); } }, "\u0130\u00E7eri\u011Fe ge\u00E7"),
            (0, react_1.createElement)("div", { className: "preview-bar" },
                (0, react_1.createElement)("span", null,
                    "V6 / AT\u00D6LYE SE\u00C7K\u0130S\u0130 ",
                    (0, react_1.createElement)("i", null),
                    " Portf\u00F6y ve ilham \u00F6nizlemesi"),
                (0, react_1.createElement)("button", { onClick: () => this.setState({ info: true }) },
                    "Bu s\u00FCr\u00FCm hakk\u0131nda ",
                    (0, react_1.createElement)(ui_1.Icon, { name: "info", size: 14 }))),
            (0, react_1.createElement)("header", { className: 'site-header v6-header ' + (s.path === '/' ? 'home-header' : '') + (s.scrolled ? ' is-floating' : '') },
                (0, react_1.createElement)("div", { className: "v6-header-main wrap" },
                    (0, react_1.createElement)("button", { className: "icon-button v6-menu-toggle", "aria-label": "Men\u00FCy\u00FC a\u00E7", onClick: () => this.setState({ menu: true }) },
                        (0, react_1.createElement)(ui_1.Icon, { name: "menu", size: 25 })),
                    (0, react_1.createElement)("span", { className: "v6-header-note" },
                        "\u0130STANBUL",
                        (0, react_1.createElement)("br", null),
                        "\u00D6L\u00C7\u00DCYE \u00D6ZEL \u00DCRET\u0130M"),
                    (0, react_1.createElement)(ui_1.Link, { to: "/", navigate: this.navigate, className: "brand", "aria-label": "Elif Tasar\u0131m ana sayfa" },
                        (0, react_1.createElement)("img", { src: (0, ui_1.image)('elif-amblem.png'), alt: "" }),
                        (0, react_1.createElement)("span", null,
                            "EL\u0130F TASARIM",
                            (0, react_1.createElement)("small", null, "EL YAPIMI MOB\u0130LYA AT\u00D6LYES\u0130"))),
                    (0, react_1.createElement)("div", { className: "v6-header-tools" },
                        (0, react_1.createElement)("button", { className: "icon-button", "aria-label": "Sitede ara", onClick: () => this.setState({ search: true }) },
                            (0, react_1.createElement)(ui_1.Icon, { name: "search" })),
                        (0, react_1.createElement)(ui_1.Link, { to: "/calisma-dosyam", navigate: this.navigate, className: "icon-button v6-saved", "aria-label": 'Kaydedilenler, ' + s.favorites.length + ' ürün' },
                            (0, react_1.createElement)(ui_1.Icon, { name: "heart" })),
                        (0, react_1.createElement)(ui_1.Link, { to: "/sepet", navigate: this.navigate, className: "icon-button v6-cart", "aria-label": 'Sepet, ' + count + ' ürün' },
                            (0, react_1.createElement)(ui_1.Icon, { name: "bag" }),
                            (0, react_1.createElement)("span", null, count)),
                        (0, react_1.createElement)(ui_1.Link, { to: "/modelini-getir", navigate: this.navigate, className: "v6-header-cta" },
                            "Projenizi konu\u015Fal\u0131m ",
                            (0, react_1.createElement)(ui_1.Icon, { size: 16 })))),
                (0, react_1.createElement)("nav", { className: "v6-header-nav wrap", "aria-label": "Ana gezinme" }, portfolio_1.mainNavigation.map(([path, label]) => nav(path, label)))),
            (0, react_1.createElement)("main", { id: "main-content", tabIndex: -1, key: s.path.split('?')[0] }, this.renderPage()),
            (0, react_1.createElement)("footer", { className: "site-footer" },
                (0, react_1.createElement)("div", { className: "wrap" },
                    (0, react_1.createElement)("div", { className: "footer-top" },
                        (0, react_1.createElement)("div", null,
                            (0, react_1.createElement)(ui_1.Link, { to: "/", navigate: this.navigate, className: "brand footer-brand" },
                                (0, react_1.createElement)("img", { src: (0, ui_1.image)('elif-amblem-light.png'), alt: "" }),
                                (0, react_1.createElement)("span", null,
                                    "EL\u0130F TASARIM",
                                    (0, react_1.createElement)("small", null, "EL YAPIMI MOB\u0130LYA AT\u00D6LYES\u0130"))),
                            (0, react_1.createElement)("p", null,
                                "Zamana de\u011Fer",
                                (0, react_1.createElement)("br", null),
                                (0, react_1.createElement)("em", null, "katan mobilyalar."))),
                        (0, react_1.createElement)("div", { className: "footer-column" },
                            (0, react_1.createElement)("h2", null, "Ke\u015Ffedin"),
                            nav('/projeler', 'Bitirdiğimiz İşler'),
                            nav('/kategoriler', 'Kategoriler'),
                            nav('/ilham-modelleri', 'İlham Modelleri'),
                            nav('/malzemeler', 'Malzemeler'),
                            nav('/urunler', 'Konsept ürünler')),
                        (0, react_1.createElement)("div", { className: "footer-column" },
                            (0, react_1.createElement)("h2", null, "At\u00F6lye"),
                            nav('/hakkimizda', 'Hikâyemiz'),
                            nav('/atolye', 'Atölye'),
                            nav('/ozel-uretim', 'Nasıl çalışıyoruz?'),
                            nav('/rehber', 'Atölye notları'),
                            nav('/sikca-sorulan-sorular', 'Sorular')),
                        (0, react_1.createElement)("div", { className: "footer-column footer-contact" },
                            (0, react_1.createElement)("h2", null, "Birlikte ba\u015Flayal\u0131m"),
                            (0, react_1.createElement)("p", null,
                                "\u0130stanbul, T\u00FCrkiye",
                                (0, react_1.createElement)("br", null),
                                "Do\u011Frudan at\u00F6lyeden, sizin i\u00E7in."),
                            (0, react_1.createElement)(ui_1.TextLink, { to: "/teklif-al", navigate: this.navigate, light: true }, "\u00D6zel \u00F6l\u00E7\u00FC st\u00FCdyosu"),
                            (0, react_1.createElement)(ui_1.TextLink, { to: "/modelini-getir", navigate: this.navigate, light: true }, "Kendi modelinizi getirin"),
                            nav('/iletisim', 'İletişim'))),
                    (0, react_1.createElement)("div", { className: "footer-wordmark", "aria-hidden": "true" },
                        "elif tasar\u0131m",
                        (0, react_1.createElement)("span", null, "AT\u00D6LYE")),
                    (0, react_1.createElement)("div", { className: "footer-bottom" },
                        (0, react_1.createElement)("span", null, "EL\u0130F TASARIM \u00B7 V6 PORTF\u00D6Y \u00D6N\u0130ZLEMES\u0130 / 2026"),
                        (0, react_1.createElement)("div", null,
                            nav('/gizlilik', 'Önizleme gizliliği'),
                            (0, react_1.createElement)("button", { onClick: () => this.setState({ info: true }) }, "Depolama tercihleri"),
                            nav('/atolye-demolari', 'Atölye demosu')),
                        (0, react_1.createElement)("span", null, "\u00D6zenle d\u00FC\u015F\u00FCn\u00FCl\u00FCr. At\u00F6lyede \u015Fekillenir.")),
                    (0, react_1.createElement)("p", { className: "footer-disclosure" }, "At\u00F6lye ar\u015Fivi, uygulama a\u015Famas\u0131, yapay zek\u00E2 konsepti ve d\u0131\u015F kaynak ilhamlar\u0131 ayr\u0131 etiketlenmi\u015Ftir. Fiyatl\u0131 eski \u00FCr\u00FCnler demo ama\u00E7l\u0131d\u0131r. Canl\u0131 sat\u0131\u015F veya otomatik form g\u00F6nderimi yap\u0131lmaz."))),
            s.menu && (0, react_1.createElement)(ui_1.Dialog, { title: "Elif Tasar\u0131m", onClose: () => this.setState({ menu: false }) },
                (0, react_1.createElement)("nav", { className: "mobile-links", "aria-label": "Mobil men\u00FC" }, [...portfolio_1.mainNavigation, ['/modelini-getir', 'Kendi Modelinizi Getirin'], ['/tasarim-masasi', 'Tasarım Masası'], ['/teklif-al', 'Özel Ölçü Stüdyosu']].map(([p, label], i) => (0, react_1.createElement)(ui_1.Link, { key: p, to: p, navigate: this.navigate },
                    (0, react_1.createElement)("span", null, String(i + 1).padStart(2, '0')),
                    label,
                    (0, react_1.createElement)(ui_1.Icon, { name: "diagonal" })))),
                (0, react_1.createElement)("div", { className: "mobile-menu-bottom" }, "\u0130STANBUL \u00B7 EL YAPIMI MOB\u0130LYA")),
            s.search && (0, react_1.createElement)(ui_1.Dialog, { title: "At\u00F6lyede bir \u015Fey aray\u0131n", onClose: () => this.setState({ search: false }) },
                (0, react_1.createElement)("label", { className: "search-dialog-input" },
                    (0, react_1.createElement)(ui_1.Icon, { name: "search" }),
                    (0, react_1.createElement)("input", { autoFocus: true, type: "search", placeholder: "Mutfak, kahve k\u00F6\u015Fesi, gard\u0131rop\u2026", "aria-label": "Arama kelimesi", value: s.searchQuery, onInput: e => this.setState({ searchQuery: e.currentTarget.value }) })),
                (0, react_1.createElement)("div", { className: "search-results", role: "region", "aria-live": "polite" },
                    workResults.map(w => (0, react_1.createElement)(ui_1.Link, { key: w.id, to: '/proje/' + w.id, navigate: this.navigate },
                        (0, react_1.createElement)(PortfolioUI_1.VImage, { asset: w.images[0], alt: "", sizes: "80px" }),
                        (0, react_1.createElement)("span", null,
                            (0, react_1.createElement)("strong", null, w.subtitle),
                            (0, react_1.createElement)("small", null,
                                (0, portfolio_1.categoryName)(w.category),
                                " \u00B7 At\u00F6lye ar\u015Fivi")),
                        (0, react_1.createElement)(ui_1.Icon, { name: "diagonal" }))),
                    results.length ? results.map(p => (0, react_1.createElement)(ui_1.Link, { key: p.id, to: '/urun/' + p.id, navigate: this.navigate },
                        (0, react_1.createElement)("img", { src: (0, ui_1.image)(p.image), alt: "" }),
                        (0, react_1.createElement)("span", null,
                            (0, react_1.createElement)("strong", null, p.name),
                            (0, react_1.createElement)("small", null,
                                p.categoryLabel,
                                " \u00B7 Konsept")),
                        (0, react_1.createElement)(ui_1.Icon, { name: "diagonal" }))) : !workResults.length ? (0, react_1.createElement)("p", { className: "empty-state" }, "Sonu\u00E7 bulunamad\u0131. Ba\u015Fka bir kelime deneyin.") : null),
                (0, react_1.createElement)(ui_1.TextLink, { to: "/urunler", navigate: this.navigate }, "T\u00FCm koleksiyona git")),
            s.info && (0, react_1.createElement)(ui_1.Dialog, { title: "Bu s\u00FCr\u00FCm hakk\u0131nda", onClose: () => this.setState({ info: false }) },
                (0, react_1.createElement)("div", { className: "info-dialog" },
                    (0, react_1.createElement)(ui_1.Eyebrow, null, "\u00C7ALI\u015EAN V\u0130TR\u0130N / YEREL \u00D6N\u0130ZLEME"),
                    (0, react_1.createElement)("p", null, "Bu V6 s\u00FCr\u00FCm\u00FC, at\u00F6lyenin payla\u015Ft\u0131\u011F\u0131 uygulama foto\u011Fraflar\u0131n\u0131, ayr\u0131 etiketli yapay zek\u00E2 konseptlerini ve Pinterest ilham ba\u011Flant\u0131lar\u0131n\u0131 bir araya getirir. Bitmi\u015F i\u015Fler konsept g\u00F6rsellerle de\u011Fi\u015Ftirilmez. Eski fiyatl\u0131 koleksiyon \u00FCr\u00FCnleri h\u00E2l\u00E2 demodur."),
                    (0, react_1.createElement)("h3", null, "Canl\u0131 i\u015Flem yap\u0131lmaz."),
                    (0, react_1.createElement)("p", null, "\u00D6deme, e-posta, kargo, m\u00FC\u015Fteri hesab\u0131 ve sunucu kay\u0131tlar\u0131 ba\u011Fl\u0131 de\u011Fildir. Formlar at\u00F6lyeye bilgi g\u00F6ndermez. \u0130\u015Flem \u00F6zetlerini kendi cihaz\u0131n\u0131za indirebilirsiniz. Modelini Getir sayfas\u0131nda WhatsApp a\u00E7\u0131larak al\u0131c\u0131y\u0131 sizin se\u00E7ti\u011Finiz payla\u015F\u0131m yap\u0131labilir. \u0130\u015Fletme numaras\u0131 hen\u00FCz tan\u0131ml\u0131 de\u011Fildir."),
                    (0, react_1.createElement)("h3", null, "Yaln\u0131z gerekli yerel kay\u0131tlar."),
                    (0, react_1.createElement)("p", null, "\u00D6rnek sepet ve kaydedilenler 30 g\u00FCn; a\u00E7\u0131k\u00E7a kaydetti\u011Finiz \u00F6l\u00E7\u00FC tercihleri 7 g\u00FCn bu taray\u0131c\u0131da tutulur. \u0130leti\u015Fim, not ve foto\u011Fraflar tasla\u011Fa kaydedilmez. Analitik ve reklam takibi yoktur."),
                    (0, react_1.createElement)("button", { className: "button button-outline", onClick: () => {
                            if (window.confirm('Bu uygulamanın bu cihazdaki örnek sepeti, kaydedilenleri ve ölçü tercihleri silinsin mi?')) {
                                try {
                                    Object.keys(localStorage).filter(k => k.startsWith('elif-v2:')).forEach(k => localStorage.removeItem(k));
                                }
                                catch { }
                                this.setState({ cart: [], favorites: [], info: false });
                                this.notify('Bu uygulamanın bu cihazdaki kayıtları temizlendi.');
                            }
                        } },
                        "Bu cihazdaki Elif kay\u0131tlar\u0131n\u0131 sil ",
                        (0, react_1.createElement)(ui_1.Icon, { name: "close" })),
                    (0, react_1.createElement)(ui_1.Link, { to: "/gizlilik", navigate: p => { this.setState({ info: false }); this.navigate(p); }, className: "text-link" },
                        "Ayr\u0131nt\u0131l\u0131 a\u00E7\u0131klama ",
                        (0, react_1.createElement)(ui_1.Icon, null)))),
            s.scrolled && (0, react_1.createElement)("button", { className: "v5-backtop", type: "button", "aria-label": "Sayfan\u0131n ba\u015F\u0131na d\u00F6n", onClick: () => { window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }); document.getElementById('main-content')?.focus({ preventScroll: true }); } },
                (0, react_1.createElement)("span", { className: "v5-up" },
                    (0, react_1.createElement)(ui_1.Icon, { name: "down", size: 18 })),
                (0, react_1.createElement)("span", null, "Ba\u015Fa d\u00F6n")),
            s.toast && (0, react_1.createElement)("div", { className: "toast", role: "status" },
                (0, react_1.createElement)(ui_1.Icon, { name: "check" }),
                (0, react_1.createElement)("span", null, s.toast),
                (0, react_1.createElement)("button", { className: "icon-button", onClick: () => this.setState({ toast: '' }), "aria-label": "Bildirimi kapat" },
                    (0, react_1.createElement)(ui_1.Icon, { name: "close", size: 16 }))));
    }
}
exports.default = App;

},"src/pages/Home":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Home = void 0;
const react_1 = require("react");
const ui_1 = require("../components/ui");
const PortfolioUI_1 = require("../components/PortfolioUI");
const portfolio_1 = require("../lib/portfolio");
const Portfolio_1 = require("./Portfolio");
const DesignDesk_1 = require("./DesignDesk");
const desk_1 = require("../lib/desk");
const scenes = [{ image: 'concept-hero', caption: 'Bir masanın etrafında.', label: 'Yaşam' }, { image: 'concept-mutfak', caption: 'Evin kalbinde.', label: 'Mutfak' }, { image: 'concept-kahve', caption: 'Kendinize küçük bir köşe.', label: 'Kahve' }];
class Home extends react_1.Component {
    constructor() {
        super(...arguments);
        this.state = { scene: 0, desk: { ...desk_1.defaultDesk }, chapter: 0 };
    }
    render() {
        const a = this.props, s = this.state, scene = scenes[s.scene];
        return (0, react_1.createElement)("div", { className: "v6-home" },
            (0, react_1.createElement)("section", { className: "v6-hero", "aria-label": "Elif Tasar\u0131m a\u00E7\u0131l\u0131\u015F se\u00E7kisi" },
                (0, react_1.createElement)("div", { className: "v6-hero-scene", key: scene.image },
                    (0, react_1.createElement)(PortfolioUI_1.VImage, { asset: scene.image, alt: scene.caption + ' Yapay zekâ ile hazırlanmış temsili mobilya sahnesi.', eager: true, full: true, sizes: "100vw" })),
                (0, react_1.createElement)("div", { className: "v6-hero-shade" }),
                (0, react_1.createElement)("div", { className: "wrap v6-hero-inner" },
                    (0, react_1.createElement)(ui_1.Eyebrow, null, "\u0130STANBUL / EL YAPIMI MOB\u0130LYA AT\u00D6LYES\u0130"),
                    (0, react_1.createElement)("h1", null,
                        "Zamana de\u011Fer",
                        (0, react_1.createElement)("br", null),
                        " ",
                        (0, react_1.createElement)("em", null, "katan mobilyalar.")),
                    (0, react_1.createElement)("p", null,
                        "Usta ellerden, sizin ya\u015Fam alan\u0131n\u0131za.",
                        (0, react_1.createElement)("br", null),
                        "\u00D6l\u00E7\u00FCn\u00FCze, ihtiyac\u0131n\u0131za ve hik\u00E2yenize g\u00F6re."),
                    (0, react_1.createElement)("div", { className: "v6-hero-actions" },
                        (0, react_1.createElement)(ui_1.ButtonLink, { to: "/projeler", navigate: a.navigate }, "Bitirdi\u011Fimiz i\u015Fleri ke\u015Ffedin"),
                        (0, react_1.createElement)(ui_1.TextLink, { to: "/modelini-getir", navigate: a.navigate, light: true }, "Kendi modelinizi getirin"))),
                (0, react_1.createElement)("div", { className: "wrap v6-hero-bottom" },
                    (0, react_1.createElement)("div", { className: "v6-scene-controls", role: "group", "aria-label": "A\u00E7\u0131l\u0131\u015F sahneleri" }, scenes.map((sc, i) => (0, react_1.createElement)("button", { key: sc.image, onClick: () => this.setState({ scene: i }), "aria-pressed": s.scene === i, "aria-label": sc.label + ' sahnesi' },
                        (0, react_1.createElement)("span", null, String(i + 1).padStart(2, '0')),
                        (0, react_1.createElement)("i", null),
                        (0, react_1.createElement)("span", { className: "scene-word" }, sc.label)))),
                    (0, react_1.createElement)("span", { className: "v6-hero-caption" }, scene.caption),
                    (0, react_1.createElement)("button", { className: "hero-down", "aria-label": "Bitirdi\u011Fimiz i\u015Flere kayd\u0131r", onClick: () => document.getElementById('bitirdigimiz-isler')?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }) },
                        (0, react_1.createElement)(ui_1.Icon, { name: "down" }))),
                (0, react_1.createElement)("span", { className: "hero-source" }, "TEMS\u0130L\u0130 TASARIM SAHNES\u0130 / YAPAY ZEK\u00C2 KONSEPT\u0130")),
            (0, react_1.createElement)("section", { id: "bitirdigimiz-isler", className: "wrap v6-section home-works" },
                (0, react_1.createElement)("div", { className: "v6-heading" },
                    (0, react_1.createElement)("div", null,
                        (0, react_1.createElement)(ui_1.Eyebrow, null, "01 / AT\u00D6LYEDEN YA\u015EAMA"),
                        (0, react_1.createElement)("h2", null,
                            "Bitirdi\u011Fimiz i\u015Flerden",
                            (0, react_1.createElement)("br", null),
                            (0, react_1.createElement)("em", null, "se\u00E7kiler."))),
                    (0, react_1.createElement)("div", null,
                        (0, react_1.createElement)("p", null,
                            "Ger\u00E7ek mek\u00E2nlar, ger\u00E7ek \u00E7al\u0131\u015Fmalar.",
                            (0, react_1.createElement)("br", null),
                            "Yusuf Usta'n\u0131n payla\u015Ft\u0131\u011F\u0131 uygulama ar\u015Fivinden."),
                        (0, react_1.createElement)(ui_1.TextLink, { to: "/projeler", navigate: a.navigate }, "T\u00FCm \u00E7al\u0131\u015Fmalar"))),
                (0, react_1.createElement)("div", { className: "work-grid" }, portfolio_1.featuredWorks.map((id, i) => (0, react_1.createElement)(PortfolioUI_1.WorkCard, { key: id, work: portfolio_1.works.find(w => w.id === id), actions: a, featured: true, index: i })))),
            (0, react_1.createElement)("section", { className: "home-yusuf" },
                (0, react_1.createElement)("div", { className: "home-yusuf-image" },
                    (0, react_1.createElement)(PortfolioUI_1.VImage, { asset: "work-joinery", alt: "Ah\u015Fap kamelya \u00E7al\u0131\u015Fmas\u0131ndan ger\u00E7ek \u00E7at\u0131 ve birle\u015Fim ayr\u0131nt\u0131lar\u0131", sizes: "(max-width: 800px) 100vw, 60vw" }),
                    (0, react_1.createElement)("span", null, "UYGULAMA AR\u015E\u0130V\u0130NDEN B\u0130R AYRINTI")),
                (0, react_1.createElement)("div", { className: "home-yusuf-copy" },
                    (0, react_1.createElement)(ui_1.Eyebrow, null, "YUSUF USTA'NIN EL\u0130NDEN \u00C7IKANLAR"),
                    (0, react_1.createElement)("h2", null,
                        "Bir meslekten fazlas\u0131.",
                        (0, react_1.createElement)("br", null),
                        (0, react_1.createElement)("em", null, "Bir aile miras\u0131.")),
                    (0, react_1.createElement)("p", null, "Babas\u0131ndan \u00F6\u011Frendi\u011Fi marangozluk, Yusuf Usta'n\u0131n elinde bug\u00FCn\u00FCn ya\u015Fam alanlar\u0131na uyarlan\u0131yor. Her i\u015F, bir ihtiyac\u0131 dinlemekle ba\u015Fl\u0131yor."),
                    (0, react_1.createElement)("p", null, "\u00D6l\u00E7\u00FCy\u00FC birlikte d\u00FC\u015F\u00FCnmek, malzemeyi do\u011Fru se\u00E7mek ve at\u00F6lyedeki eme\u011Fi yerinde uygulamayla tamamlamak. Bizim i\u00E7in i\u015Fin \u00F6z\u00FC bu."),
                    (0, react_1.createElement)(ui_1.TextLink, { to: "/hakkimizda", navigate: a.navigate, light: true }, "Hik\u00E2yemizi ke\u015Ffedin"),
                    (0, react_1.createElement)("div", { className: "yusuf-notes" },
                        (0, react_1.createElement)("span", null, "Aile at\u00F6lyesi"),
                        (0, react_1.createElement)("span", null, "\u00D6l\u00E7\u00FCye \u00F6zel"),
                        (0, react_1.createElement)("span", null, "\u00DCretim & uygulama")))),
            (0, react_1.createElement)("section", { className: "wrap v6-section home-categories" },
                (0, react_1.createElement)("div", { className: "v6-heading" },
                    (0, react_1.createElement)("div", null,
                        (0, react_1.createElement)(ui_1.Eyebrow, null, "02 / YA\u015EAMIN HER ALANI"),
                        (0, react_1.createElement)("h2", null,
                            "Eviniz gibi,",
                            (0, react_1.createElement)("br", null),
                            (0, react_1.createElement)("em", null, "size \u00F6zel."))),
                    (0, react_1.createElement)(ui_1.TextLink, { to: "/kategoriler", navigate: a.navigate }, "T\u00FCm kategoriler")),
                (0, react_1.createElement)("div", { className: "category-editorial" }, [portfolio_1.workCategories[0], portfolio_1.workCategories[4], portfolio_1.workCategories[5]].map((c, i) => (0, react_1.createElement)(ui_1.Link, { className: 'editorial-tile tile-' + i, key: c.id, to: '/kategoriler/' + c.id, navigate: a.navigate },
                    (0, react_1.createElement)(PortfolioUI_1.VImage, { asset: c.image, alt: c.name + ' için temsili tasarım fikri', sizes: i === 0 ? '(max-width: 700px) 90vw, 55vw' : '(max-width: 700px) 90vw, 32vw' }),
                    (0, react_1.createElement)("div", null,
                        (0, react_1.createElement)("span", null,
                            "0",
                            i + 1,
                            " / KONSEPT SE\u00C7K\u0130S\u0130"),
                        (0, react_1.createElement)("h3", null, c.name),
                        (0, react_1.createElement)("p", null, c.line),
                        (0, react_1.createElement)(ui_1.Icon, { name: "diagonal", size: 25 }))))),
                (0, react_1.createElement)("div", { className: "category-links" },
                    portfolio_1.workCategories.filter(c => !['mutfak', 'kahve-kosesi', 'sehpa'].includes(c.id)).map(c => (0, react_1.createElement)(ui_1.Link, { key: c.id, to: '/kategoriler/' + c.id, navigate: a.navigate },
                        c.name,
                        (0, react_1.createElement)(ui_1.Icon, { name: "diagonal", size: 17 }))),
                    (0, react_1.createElement)(ui_1.Link, { to: "/ilham-modelleri", navigate: a.navigate },
                        "\u0130lham Modelleri ",
                        (0, react_1.createElement)(ui_1.Icon, { name: "diagonal", size: 17 })))),
            (0, react_1.createElement)(PortfolioUI_1.ModelCallout, { navigate: a.navigate }),
            (0, react_1.createElement)("section", { className: "wrap v6-section home-inspiration" },
                (0, react_1.createElement)("div", { className: "v6-heading" },
                    (0, react_1.createElement)("div", null,
                        (0, react_1.createElement)(ui_1.Eyebrow, null, "03 / \u0130LHAM DEFTER\u0130"),
                        (0, react_1.createElement)("h2", null,
                            "Akl\u0131n\u0131zda bir fikir.",
                            (0, react_1.createElement)("br", null),
                            (0, react_1.createElement)("em", null, "\u00D6n\u00FCn\u00FCzde yeni olas\u0131l\u0131klar."))),
                    (0, react_1.createElement)("div", null,
                        (0, react_1.createElement)("p", null, "Se\u00E7ilmi\u015F konseptler ve Pinterest'ten kaydetti\u011Fimiz modeller. Tamamlanm\u0131\u015F i\u015Fler de\u011Fil, birlikte konu\u015Fmak i\u00E7in ba\u015Flang\u0131\u00E7 noktalar\u0131."),
                        (0, react_1.createElement)(ui_1.TextLink, { to: "/ilham-modelleri", navigate: a.navigate }, "\u0130lham defterini a\u00E7\u0131n"))),
                (0, react_1.createElement)("div", { className: "concept-grid three" }, portfolio_1.concepts.slice(0, 3).map(c => (0, react_1.createElement)(Portfolio_1.ConceptCard, { key: c.id, c: c, navigate: a.navigate })))),
            (0, react_1.createElement)("section", { className: "v6-process" },
                (0, react_1.createElement)("div", { className: "wrap" },
                    (0, react_1.createElement)("div", { className: "v6-heading" },
                        (0, react_1.createElement)("div", null,
                            (0, react_1.createElement)(ui_1.Eyebrow, null, "04 / F\u0130K\u0130RDEN UYGULAMAYA"),
                            (0, react_1.createElement)("h2", null,
                                "Birlikte ",
                                (0, react_1.createElement)("em", null, "nas\u0131l ilerleriz?"))),
                        (0, react_1.createElement)("p", null, "Acele bir se\u00E7im de\u011Fil, iyi d\u00FC\u015F\u00FCn\u00FClm\u00FC\u015F bir par\u00E7a. Her a\u015Famada ihtiyac\u0131n\u0131z\u0131 ve kullan\u0131m\u0131n\u0131z\u0131 merkeze al\u0131r\u0131z.")),
                    (0, react_1.createElement)("div", { className: "process-steps" }, [['Fikrinizi dinleriz.', 'Bir Pinterest bağlantısı, fotoğraf veya kendi çiziminiz. Önce nasıl kullanacağınızı konuşuruz.'], ['Ölçüyü netleştiririz.', 'Malzeme, renk, donanım ve alanın ölçülerini birlikte değerlendiririz. Teklif bu ayrıntılarla şekillenir.'], ['Atölyede şekillenir.', 'Üzerinde anlaşılan tasarım, ölçü ve malzemeyle üretim planlanır.'], ['Yerini bulur.', 'Teslim ve gerekiyorsa yerinde uygulama, projenin koşullarına göre birlikte düzenlenir.']].map(([title, text], i) => (0, react_1.createElement)("article", { key: title },
                        (0, react_1.createElement)("span", { className: "process-number" },
                            "0",
                            i + 1),
                        (0, react_1.createElement)("h3", null, title),
                        (0, react_1.createElement)("p", null, text)))))),
            (0, react_1.createElement)("section", { className: "wrap v6-section home-desk" },
                (0, react_1.createElement)("div", null,
                    (0, react_1.createElement)(ui_1.Eyebrow, null, "05 / D\u0130J\u0130TAL TASARIM MASASI"),
                    (0, react_1.createElement)("h2", null,
                        "Bir \u00F6l\u00E7\u00FCyle",
                        (0, react_1.createElement)("br", null),
                        (0, react_1.createElement)("em", null, "ba\u015Flayal\u0131m m\u0131?")),
                    (0, react_1.createElement)("p", null, "Masan\u0131z\u0131n enini de\u011Fi\u015Ftirin. Fikrin ilk \u00E7izgisini g\u00F6r\u00FCn. Daha sonra derinlik, y\u00FCkseklik ve malzemeyi tasar\u0131m masas\u0131nda birlikte d\u00FC\u015F\u00FCn\u00FCn."),
                    (0, react_1.createElement)("label", { className: "home-desk-control" },
                        (0, react_1.createElement)("span", null,
                            "MASA EN\u0130 ",
                            (0, react_1.createElement)("output", null,
                                s.desk.width,
                                " cm")),
                        (0, react_1.createElement)("input", { type: "range", min: "100", max: "240", step: "1", "aria-label": "Ana sayfa masa eni", value: s.desk.width, onInput: e => this.setState({ desk: { ...s.desk, width: Number(e.currentTarget.value) } }) })),
                    (0, react_1.createElement)(ui_1.ButtonLink, { to: '/tasarim-masasi?' + (0, desk_1.deskQuery)(s.desk), navigate: a.navigate }, "Tasar\u0131m masas\u0131nda devam et"),
                    (0, react_1.createElement)("small", null, "\u015Eematik fikir arac\u0131d\u0131r. Teknik \u00FCretim \u00E7izimi de\u011Fildir.")),
                (0, react_1.createElement)("div", { className: "home-desk-drawing" },
                    (0, react_1.createElement)("span", null, "EL\u0130F / \u00C7ALI\u015EMA NO. 01"),
                    (0, react_1.createElement)(DesignDesk_1.TableDrawing, { desk: s.desk, id: "v6-home-desk", compact: true }),
                    (0, react_1.createElement)("div", null,
                        (0, react_1.createElement)("span", null,
                            s.desk.width,
                            " \u00D7 ",
                            s.desk.depth,
                            " \u00D7 ",
                            s.desk.height,
                            " cm"),
                        (0, react_1.createElement)("span", null, "\u00D6L\u00C7\u00DCN\u00DCZE G\u00D6RE")))),
            (0, react_1.createElement)("section", { className: "wrap v6-section home-faq" },
                (0, react_1.createElement)("div", null,
                    (0, react_1.createElement)(ui_1.Eyebrow, null, "AKLINIZDA KALMASIN"),
                    (0, react_1.createElement)("h2", null,
                        "Birlikte",
                        (0, react_1.createElement)("br", null),
                        (0, react_1.createElement)("em", null, "netle\u015Ftirelim.")),
                    (0, react_1.createElement)(ui_1.TextLink, { to: "/iletisim", navigate: a.navigate }, "\u0130leti\u015Fim")),
                (0, react_1.createElement)(ui_1.Accordion, { items: [["Pinterest'te beğendiğim bir modeli getirebilir miyim?", 'Evet. Bağlantıyı, fotoğrafı veya çiziminizi paylaşabilirsiniz. Modelin kullanımını, ölçülerini ve malzemesini birlikte değerlendirip size uygun özgün bir yaklaşım üzerinde konuşuruz. Her model için üretilebilirlik ayrıca teyit edilir.'], ['Kesin ölçülerimi bilmiyorum. Başlayabilir miyim?', 'Elbette. İlk aşamada yaklaşık ölçü veya mekân fotoğrafı yeterli olabilir. Üretimden önce ölçüler ve yerleşim ayrıca netleştirilir.'], ['Konsept görseller sizin tamamladığınız işler mi?', 'Hayır. Bitirdiğimiz İşler bölümünde atölyenin paylaştığı fotoğraflar bulunur. Yapay zekâ konseptleri ve Pinterest bağlantıları ayrı etiketlerle ilham amacıyla gösterilir.'], ['Yeni atölye adresi nerede?', 'İstanbul’daki yeni atölye adresi netleştiğinde burada paylaşılacak. Ziyaret bilgileri adresle birlikte duyurulacak. Proje fikrinizi model paylaşım alanında hazırlayabilirsiniz.']] })),
            (0, react_1.createElement)("section", { className: "v6-final-cta" },
                (0, react_1.createElement)("div", { className: "wrap" },
                    (0, react_1.createElement)(ui_1.Eyebrow, null, "S\u0130Z\u0130N F\u0130KR\u0130N\u0130Z. B\u0130Z\u0130M USTALI\u011EIMIZ."),
                    (0, react_1.createElement)("h2", null,
                        "Akl\u0131n\u0131zdaki modeli g\u00F6nderin.",
                        (0, react_1.createElement)("br", null),
                        (0, react_1.createElement)("em", null, "Birlikte yorumlayal\u0131m.")),
                    (0, react_1.createElement)(ui_1.ButtonLink, { to: "/modelini-getir", navigate: a.navigate }, "Fikrimi payla\u015Fay\u0131m"),
                    (0, react_1.createElement)("p", null, "Bir foto\u011Fraf, bir ba\u011Flant\u0131 ya da yaln\u0131zca bir fikir."))));
    }
}
exports.Home = Home;

},"src/pages/Quote":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quote = void 0;
const react_1 = require("react");
const desk_1 = require("../lib/desk");
const data_1 = require("../lib/data");
const portfolio_1 = require("../lib/portfolio");
const domain_1 = require("../lib/domain");
const ui_1 = require("../components/ui");
const initial = { kind: '', unknown: false, width: '', depth: '', height: '', unit: 'cm', material: 'Danışmak istiyorum', finish: 'Birlikte değerlendirelim', city: 'İstanbul', district: '', delivery: 'Birlikte planlayalım', name: '', email: '', phone: '', note: '', ack: false };
const labels = ['İhtiyaç', 'Ölçü', 'Malzeme', 'Görseller', 'Teslim', 'İletişim', 'Kontrol'];
const stepTitles = ['Neyi birlikte düşünelim?', 'Alanınızın ölçüsü nedir?', 'Dokusu nasıl olsun?', 'Bir görsel, çok şey anlatır.', 'Nereye yerleşecek?', 'Size nasıl ulaşalım?', 'Son bir kez, birlikte bakalım.'];
const stepDescriptions = ['Bir ürün seçin veya fikrinizi birlikte şekillendirelim.', 'Kesin ölçü bilmek zorunda değilsiniz. İlk fikir bile değerlidir.', 'Ağaç türü ile yüzey tercihini ayrı ayrı değerlendirelim.', 'Referans, mekân fotoğrafı veya eskiz ekleyebilirsiniz. Bu adım isteğe bağlı.', 'İlk aşamada açık adresinize ihtiyacımız yok.', 'Bu önizlemede bilgiler gönderilmez ve kalıcı olarak saklanmaz. Örnek bilgi kullanın.', 'Hazırlanan özet bir sipariş veya kabul edilmiş teklif değildir.'];
class Quote extends react_1.Component {
    constructor() {
        super(...arguments);
        this.state = { step: 0, v: { ...initial }, errors: {}, files: [], uploading: false, done: false, hasDraft: false };
        this.alive = true;
        this.set = (k, value) => this.setState(s => ({ v: { ...s.v, [k]: value }, errors: { ...s.errors, [k]: '' } }));
        this.changeUnit = (target) => {
            const result = (0, domain_1.convertDimensions)(this.state.v, target);
            if (!result.ok) {
                this.setState({ errors: result.errors });
                this.props.notify('Birimi değiştirmeden önce işaretli ölçüyü düzeltin.');
                return;
            }
            this.setState(s => ({ v: { ...s.v, ...result.values, unit: target }, errors: {} }));
        };
        this.editStep = (step) => this.setState({ step, errors: {} }, () => document.getElementById('wizard-title')?.focus());
        this.next = () => {
            const errors = (0, domain_1.validateQuoteStep)(this.state.step, this.state.v);
            if (Object.keys(errors).length) {
                this.setState({ errors }, () => document.getElementById('q-' + Object.keys(errors)[0])?.focus());
                return;
            }
            this.setState(s => ({ step: Math.min(6, s.step + 1), errors: {} }), () => document.getElementById('wizard-title')?.focus());
        };
        this.summary = () => { const v = this.state.v; return ['ELİF TASARIM — ÖNİZLEME TALEP ÖZETİ', 'Bu dosya atölyeye gönderilmedi. Sipariş veya fiyat teklifi değildir.', '', `İhtiyaç: ${v.kind}`, `Ölçü: ${v.unknown ? 'Birlikte belirlenecek' : [v.width, v.depth, v.height].join(' × ') + ' ' + v.unit}`, `Malzeme tercihi: ${v.material}`, `Yüzey tercihi: ${v.finish}`, `Bölge: ${v.city}${v.district ? ' / ' + v.district : ''}`, `Teslim yaklaşımı: ${v.delivery}`, `İsim: ${v.name}`, `E-posta: ${v.email || 'Belirtilmedi'}`, `Telefon: ${v.phone || 'Belirtilmedi'}`, `Not: ${v.note || 'Belirtilmedi'}`, `Görseller: ${this.state.files.map(f => f.name).join(', ') || 'Eklenmedi'}`, 'Görsel dosyaları bu metin dosyasına dahil değildir.'].join('\n'); };
        this.field = (name, label, placeholder = '', type = 'text') => (0, react_1.createElement)("label", { className: "form-field", htmlFor: 'q-' + name },
            (0, react_1.createElement)("span", { id: 'label-' + name }, label),
            (0, react_1.createElement)("input", { inputMode: ['width', 'depth', 'height'].includes(name) ? 'decimal' : undefined, "aria-labelledby": 'label-' + name, id: 'q-' + name, type: type, value: String(this.state.v[name]), maxLength: name === 'name' ? 100 : 200, placeholder: placeholder, onInput: e => this.set(name, e.currentTarget.value), "aria-invalid": !!this.state.errors[name], "aria-describedby": this.state.errors[name] ? 'err-' + name : undefined }),
            this.state.errors[name] && (0, react_1.createElement)("small", { className: "field-error", id: 'err-' + name }, this.state.errors[name]));
    }
    componentDidMount() { const p = data_1.products.find(p => p.id === this.props.productId), params = new URLSearchParams(this.props.query || ''), fromDesk = params.has('en'); const d = (0, desk_1.deskFromParams)(params); this.setState({ hasDraft: !fromDesk && !!(0, domain_1.readLocal)('quote-draft', null), v: { ...initial, kind: fromDesk ? (d.base === 'adjustable' ? 'Yükseklik ayarlı masa' : 'Çalışma masası') : p ? p.categoryLabel : '', ...(fromDesk ? { width: String(d.width), depth: String(d.depth), height: String(d.height), material: desk_1.deskMaterials[d.material].name, note: 'Tasarım masası fikri. Taşıyıcı tercihi, ' + desk_1.deskBases[d.base] + '. Üretim uygunluğu atölyede teyit edilecek.' } : {}) } }); }
    componentWillUnmount() { this.alive = false; this.state.files.forEach(f => URL.revokeObjectURL(f.url)); }
    async addFiles(list) {
        if (!list)
            return;
        const received = Array.from(list);
        if (received.length + this.state.files.length > 5) {
            this.props.notify('En fazla 5 görsel ekleyebilirsiniz.');
            return;
        }
        this.setState({ uploading: true });
        const accepted = [];
        try {
            for (const file of received) {
                const v = (0, domain_1.validateFile)(file);
                if (!v.ok) {
                    this.props.notify(v.error);
                    continue;
                }
                const bytes = new Uint8Array(await file.slice(0, 12).arrayBuffer());
                const png = bytes[0] === 137 && bytes[1] === 80 && bytes[2] === 78 && bytes[3] === 71;
                const jpg = bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255;
                const webp = String.fromCharCode(...bytes.slice(0, 4)) === 'RIFF' && String.fromCharCode(...bytes.slice(8, 12)) === 'WEBP';
                if (!(png || jpg || webp)) {
                    this.props.notify(file.name + ': dosya içeriği desteklenen bir görsel değil.');
                    continue;
                }
                const bitmap = await createImageBitmap(file);
                if (bitmap.width * bitmap.height > 40000000) {
                    bitmap.close();
                    this.props.notify('40 megapikselden küçük bir görsel seçin.');
                    continue;
                }
                bitmap.close();
                accepted.push({ name: file.name, url: URL.createObjectURL(file), bytes: file.size });
            }
        }
        catch {
            this.props.notify('Görsel okunamadı. Başka bir dosya deneyin.');
        }
        finally {
            if (this.alive)
                this.setState(s => ({ files: [...s.files, ...accepted], uploading: false }));
            else
                accepted.forEach(f => URL.revokeObjectURL(f.url));
        }
    }
    renderStep() {
        const { v, step, files } = this.state;
        if (step === 0)
            return (0, react_1.createElement)("div", { className: "choice-grid", id: "q-kind", tabIndex: -1 },
                [...portfolio_1.workCategories.map(c => [c.name, c.image + '-full.webp']), ['Yemek masası', 'dining.webp'], ['Yükseklik ayarlı masa', 'office.webp']].map(([kind, photo]) => (0, react_1.createElement)("button", { type: "button", key: kind, className: 'picture-choice ' + (v.kind === kind ? 'selected' : ''), "aria-pressed": v.kind === kind, onClick: () => this.set('kind', kind) },
                    (0, react_1.createElement)("img", { src: (0, ui_1.image)(photo), alt: "" }),
                    (0, react_1.createElement)("span", null,
                        kind,
                        (0, react_1.createElement)("i", null, v.kind === kind ? (0, react_1.createElement)(ui_1.Icon, { name: "check", size: 14 }) : null)))),
                (0, react_1.createElement)("button", { type: "button", className: 'choice-wide ' + (v.kind === 'Birlikte karar verelim' ? 'selected' : ''), onClick: () => this.set('kind', 'Birlikte karar verelim'), "aria-pressed": v.kind === 'Birlikte karar verelim' },
                    (0, react_1.createElement)(ui_1.Icon, { name: "ruler" }),
                    "Ba\u015Fka bir fikir / Birlikte karar verelim",
                    (0, react_1.createElement)(ui_1.Icon, { name: "arrow" })),
                this.state.errors.kind && (0, react_1.createElement)("p", { className: "field-error" }, this.state.errors.kind));
        if (step === 1)
            return (0, react_1.createElement)(react_1.Fragment, null,
                (0, react_1.createElement)("label", { className: "check-card" },
                    (0, react_1.createElement)("input", { type: "checkbox", checked: v.unknown, onChange: e => this.set('unknown', e.currentTarget.checked) }),
                    (0, react_1.createElement)("span", null,
                        "\u00D6l\u00E7\u00FClerimi birlikte belirleyelim",
                        (0, react_1.createElement)("small", null, "\u015Eimdilik kesin \u00F6l\u00E7\u00FC vermeden devam edebilirsiniz."))),
                !v.unknown && (0, react_1.createElement)(react_1.Fragment, null,
                    (0, react_1.createElement)("div", { className: "form-row three" },
                        this.field('width', 'En', '180'),
                        this.field('depth', 'Derinlik', '90'),
                        this.field('height', 'Yükseklik', '75')),
                    (0, react_1.createElement)("label", { className: "form-field" },
                        "\u00D6l\u00E7\u00FC birimi",
                        (0, react_1.createElement)("select", { "aria-label": "\u00D6l\u00E7\u00FC birimi", value: v.unit, onChange: e => { const old = v.unit; this.changeUnit(e.currentTarget.value); e.currentTarget.value = old; } },
                            (0, react_1.createElement)("option", { value: "cm" }, "Santimetre (cm)"),
                            (0, react_1.createElement)("option", { value: "mm" }, "Milimetre (mm)"))),
                    (0, react_1.createElement)("p", { className: "small muted" }, "120,5 veya 120.5 yazabilirsiniz. Birim de\u011Fi\u015Fince girdi\u011Finiz \u00F6l\u00E7\u00FCler d\u00F6n\u00FC\u015Ft\u00FCr\u00FCl\u00FCr. Bunlar ilk talep \u00F6l\u00E7\u00FCleridir; \u00FCretim onay\u0131 de\u011Fildir.")),
                (0, react_1.createElement)("details", { className: "inline-guide" },
                    (0, react_1.createElement)("summary", null,
                        "\u00D6l\u00E7\u00FC alma notlar\u0131 ",
                        (0, react_1.createElement)(ui_1.Icon, { name: "plus", size: 16 })),
                    (0, react_1.createElement)("p", null, "En, derinlik ve y\u00FCksekli\u011Fi ayr\u0131 \u00F6l\u00E7\u00FCn. Se\u00E7ti\u011Finiz birimi b\u00FCt\u00FCn alanlarda tutarl\u0131 kullan\u0131n. Kap\u0131, \u00E7ekmece ve sandalye i\u00E7in gereken kullan\u0131m paylar\u0131n\u0131 at\u00F6lyeyle de\u011Ferlendirin. \u0130lk \u00F6l\u00E7\u00FCler \u00FCretim onay\u0131 de\u011Fildir.")));
        if (step === 2)
            return (0, react_1.createElement)(react_1.Fragment, null,
                (0, react_1.createElement)("span", { className: "field-label" }, "MALZEME TERC\u0130H\u0130"),
                (0, react_1.createElement)("div", { className: "material-choices" }, data_1.materials.map(m => (0, react_1.createElement)("button", { type: "button", key: m.id, className: v.material === m.name ? 'selected' : '', onClick: () => this.set('material', m.name), "aria-pressed": v.material === m.name },
                    (0, react_1.createElement)("img", { src: (0, ui_1.image)(m.image), alt: "" }),
                    (0, react_1.createElement)("span", null,
                        m.name,
                        v.material === m.name && (0, react_1.createElement)(ui_1.Icon, { name: "check", size: 16 }))))),
                (0, react_1.createElement)("button", { type: "button", className: 'choice-wide ' + (v.material === 'Danışmak istiyorum' ? 'selected' : ''), onClick: () => this.set('material', 'Danışmak istiyorum'), "aria-pressed": v.material === 'Danışmak istiyorum' },
                    "Malzeme konusunda dan\u0131\u015Fmak istiyorum ",
                    (0, react_1.createElement)(ui_1.Icon, { name: "arrow" })),
                (0, react_1.createElement)("label", { className: "form-field spaced" },
                    "Y\u00FCzey beklentiniz",
                    (0, react_1.createElement)("select", { value: v.finish, onChange: e => this.set('finish', e.currentTarget.value) },
                        (0, react_1.createElement)("option", { value: "Birlikte de\u011Ferlendirelim" }, "Birlikte de\u011Ferlendirelim"),
                        (0, react_1.createElement)("option", { value: "Do\u011Fal g\u00F6r\u00FCn\u00FCm" }, "Do\u011Fal g\u00F6r\u00FCn\u00FCm"),
                        (0, react_1.createElement)("option", { value: "Mat biti\u015F" }, "Mat biti\u015F"),
                        (0, react_1.createElement)("option", { value: "Farkl\u0131 renk / y\u00FCzey g\u00F6r\u00FC\u015Felim" }, "Farkl\u0131 renk / y\u00FCzey g\u00F6r\u00FC\u015Felim"))),
                (0, react_1.createElement)("p", { className: "small muted" }, "G\u00F6rseller temsili tonlard\u0131r. Malzeme yap\u0131s\u0131 ve y\u00FCzey i\u015Flemi numuneyle netle\u015Fir."));
        if (step === 3)
            return (0, react_1.createElement)(react_1.Fragment, null,
                (0, react_1.createElement)("label", { className: "upload-zone" },
                    (0, react_1.createElement)(ui_1.Icon, { name: "upload", size: 32 }),
                    (0, react_1.createElement)("strong", null, this.state.uploading ? 'Görseller kontrol ediliyor…' : 'Görsel eklemek için seçin'),
                    (0, react_1.createElement)("span", null, "JPG, PNG, WebP \u00B7 En fazla 5 g\u00F6rsel \u00B7 Her biri 10 MB"),
                    (0, react_1.createElement)("input", { type: "file", multiple: true, accept: "image/jpeg,image/png,image/webp", disabled: this.state.uploading, onChange: e => { this.addFiles(e.currentTarget.files); e.currentTarget.value = ''; }, "aria-label": "Referans g\u00F6rsellerini se\u00E7" })),
                (0, react_1.createElement)("div", { className: "upload-list" }, files.map((f, i) => (0, react_1.createElement)("div", { key: f.url },
                    (0, react_1.createElement)("img", { src: f.url, alt: 'Seçtiğiniz referans: ' + f.name }),
                    (0, react_1.createElement)("span", null, f.name),
                    (0, react_1.createElement)("button", { type: "button", className: "icon-button", "aria-label": f.name + ' görselini kaldır', onClick: () => { URL.revokeObjectURL(f.url); this.setState({ files: files.filter((_, n) => n !== i) }); } },
                        (0, react_1.createElement)(ui_1.Icon, { name: "close", size: 16 }))))),
                (0, react_1.createElement)("div", { className: "note-box" },
                    (0, react_1.createElement)(ui_1.Icon, { name: "info" }),
                    (0, react_1.createElement)("p", null, "G\u00F6rseller yaln\u0131z a\u00E7\u0131k sayfan\u0131zda tutulur. Yenileme veya ba\u015Fka sayfaya ge\u00E7i\u015Fte silinir. Sunucuya g\u00F6nderilmez. \u0130nsan, belge ve a\u00E7\u0131k adres gibi \u00F6zel bilgiler i\u00E7eren foto\u011Fraflar payla\u015Fmay\u0131n.")));
        if (step === 4)
            return (0, react_1.createElement)(react_1.Fragment, null,
                (0, react_1.createElement)("div", { className: "form-row" },
                    (0, react_1.createElement)("label", { className: "form-field" },
                        "\u0130l",
                        (0, react_1.createElement)("select", { value: v.city, onChange: e => this.set('city', e.currentTarget.value) },
                            (0, react_1.createElement)("option", { value: "\u0130stanbul" }, "\u0130stanbul"),
                            (0, react_1.createElement)("option", { value: "Ba\u015Fka bir il" }, "Ba\u015Fka bir il"),
                            (0, react_1.createElement)("option", { value: "Daha sonra netle\u015Ftirelim" }, "Daha sonra netle\u015Ftirelim"))),
                    this.field('district', 'İlçe / bölge (isteğe bağlı)')),
                (0, react_1.createElement)("label", { className: "form-field" },
                    "Teslim yakla\u015F\u0131m\u0131",
                    (0, react_1.createElement)("select", { value: v.delivery, onChange: e => this.set('delivery', e.currentTarget.value) },
                        (0, react_1.createElement)("option", { value: "Birlikte planlayal\u0131m" }, "Birlikte planlayal\u0131m"),
                        (0, react_1.createElement)("option", { value: "At\u00F6lyeden teslim almak istiyorum" }, "At\u00F6lyeden teslim almak istiyorum"),
                        (0, react_1.createElement)("option", { value: "Adrese teslimi g\u00F6r\u00FC\u015Fmek istiyorum" }, "Adrese teslimi g\u00F6r\u00FC\u015Fmek istiyorum"),
                        (0, react_1.createElement)("option", { value: "Teslim ve kurulum ihtiyac\u0131m var" }, "Teslim ve kurulum ihtiyac\u0131m var"))),
                (0, react_1.createElement)("div", { className: "note-box" },
                    (0, react_1.createElement)(ui_1.Icon, { name: "pin" }),
                    (0, react_1.createElement)("p", null, "Bu se\u00E7im kesin teslimat veya fiyat taahh\u00FCd\u00FC olu\u015Fturmaz. Ta\u015F\u0131ma, mek\u00E2na eri\u015Fim ve kurulum son teklifte netle\u015Fir.")));
        if (step === 5)
            return (0, react_1.createElement)(react_1.Fragment, null,
                this.field('name', 'Adınız', 'Örnek Müşteri'),
                (0, react_1.createElement)("div", { className: "form-row" },
                    this.field('email', 'E-posta', 'ornek@example.com', 'email'),
                    this.field('phone', 'Telefon (e-posta yerine de olabilir)', '', 'tel')),
                (0, react_1.createElement)("label", { className: "form-field" },
                    "Eklemek istedi\u011Finiz bir \u015Fey var m\u0131?",
                    (0, react_1.createElement)("textarea", { value: v.note, maxLength: 2000, rows: 4, onInput: e => this.set('note', e.currentTarget.value), placeholder: "Nas\u0131l kullanaca\u011F\u0131n\u0131z\u0131 ve sizin i\u00E7in \u00F6nemli ayr\u0131nt\u0131lar\u0131 anlatabilirsiniz." })),
                (0, react_1.createElement)("p", { className: "small muted" }, "Bu bilgiler yaln\u0131z indirmeniz i\u00E7in haz\u0131rlanacak \u00F6zette kullan\u0131l\u0131r. At\u00F6lyeye g\u00F6nderim yap\u0131lmaz ve ileti\u015Fim bilgisi taray\u0131c\u0131 tasla\u011F\u0131na kaydedilmez."));
        return (0, react_1.createElement)(react_1.Fragment, null,
            (0, react_1.createElement)("dl", { className: "summary-list" }, [['İhtiyaç', v.kind], ['Ölçü', v.unknown ? 'Birlikte belirlenecek' : `${v.width} × ${v.depth} × ${v.height} ${v.unit}`], ['Malzeme', v.material], ['Yüzey', v.finish], ['Teslim', v.city + ' / ' + v.delivery], ['İletişim', v.name + ' · ' + (v.email || v.phone)], ['Görseller', files.length + ' görsel, yalnız açık sayfada']].map(([k, val]) => (0, react_1.createElement)("div", { key: k },
                (0, react_1.createElement)("dt", null, k),
                (0, react_1.createElement)("dd", null, val),
                (0, react_1.createElement)("button", { type: "button", className: "summary-edit", "aria-label": k === 'Ölçü' ? 'Ölçüyü düzenle' : k + ' alanını düzenle', onClick: () => this.editStep({ İhtiyaç: 0, Ölçü: 1, Malzeme: 2, Yüzey: 2, Teslim: 4, İletişim: 5, Görseller: 3 }[k]) },
                    "D\u00FCzenle ",
                    (0, react_1.createElement)(ui_1.Icon, { name: "arrow", size: 14 }))))),
            v.note && (0, react_1.createElement)("p", { className: "quote-note" }, v.note),
            (0, react_1.createElement)("label", { className: "check-card" },
                (0, react_1.createElement)("input", { type: "checkbox", checked: v.ack, onChange: e => this.set('ack', e.currentTarget.checked) }),
                (0, react_1.createElement)("span", null,
                    "Bu i\u015Flemin yaln\u0131z yerel bir \u00F6nizleme oldu\u011Funu anl\u0131yorum.",
                    (0, react_1.createElement)("small", null, "At\u00F6lyeye bilgi g\u00F6nderilmez, sipari\u015F veya \u00F6deme olu\u015Fturulmaz."))));
    }
    render() {
        const a = this.props, { v, step } = this.state;
        return (0, react_1.createElement)("section", { className: "quote-page wrap" },
            (0, react_1.createElement)("div", { className: "quote-heading" },
                (0, react_1.createElement)(ui_1.Eyebrow, null, "EL\u0130F / \u00D6ZEL \u00D6L\u00C7\u00DC ST\u00DCDYOSU"),
                (0, react_1.createElement)("h1", null,
                    "\u00D6l\u00E7\u00FCs\u00FC size.",
                    (0, react_1.createElement)("br", null),
                    (0, react_1.createElement)("em", null, "Hik\u00E2yesi birlikte.")),
                (0, react_1.createElement)("p", null, "Bir fikri, konu\u015Fulabilir bir tasar\u0131ma d\u00F6n\u00FC\u015Ft\u00FCrelim."),
                new URLSearchParams(this.props.query || '').has('en') && (0, react_1.createElement)("div", { className: "desk-prefill", role: "status" },
                    (0, react_1.createElement)(ui_1.Icon, { name: "check" }),
                    "Tasar\u0131m masan\u0131zdaki \u00F6l\u00E7\u00FC ve malzeme tercihleri bu talebe aktar\u0131ld\u0131. Her ad\u0131mda de\u011Fi\u015Ftirebilirsiniz.")),
            this.state.done ? (0, react_1.createElement)("div", { className: "quote-success" },
                (0, react_1.createElement)("span", { className: "success-mark" },
                    (0, react_1.createElement)(ui_1.Icon, { name: "check", size: 30 })),
                (0, react_1.createElement)(ui_1.Eyebrow, null, "\u00D6N\u0130ZLEME TAMAMLANDI"),
                (0, react_1.createElement)("h2", null,
                    "Fikriniz art\u0131k",
                    (0, react_1.createElement)("br", null),
                    (0, react_1.createElement)("em", null, "bir arada.")),
                (0, react_1.createElement)("p", null,
                    "Talep \u00F6zetiniz haz\u0131r. ",
                    (0, react_1.createElement)("strong", null, "At\u00F6lyeye g\u00F6nderilmedi."),
                    (0, react_1.createElement)("br", null),
                    "Bu bir sipari\u015F, fiyat teklifi veya \u00FCretim onay\u0131 de\u011Fildir."),
                (0, react_1.createElement)("div", { className: "success-summary" },
                    (0, react_1.createElement)("pre", null, this.summary())),
                (0, react_1.createElement)("div", { className: "action-row" },
                    (0, react_1.createElement)("button", { type: "button", className: "button", onClick: () => (0, domain_1.downloadText)('Elif_Tasarim_Talep_Ozeti.txt', this.summary()) },
                        "\u00D6zeti indir ",
                        (0, react_1.createElement)(ui_1.Icon, { name: "download" })),
                    (0, react_1.createElement)("button", { type: "button", className: "button button-outline", onClick: () => this.setState({ done: false, step: 6 }) },
                        "\u00D6zeti d\u00FCzenle ",
                        (0, react_1.createElement)(ui_1.Icon, null))),
                (0, react_1.createElement)(ui_1.Link, { to: "/urunler", navigate: a.navigate, className: "text-link" },
                    "Koleksiyona d\u00F6n ",
                    (0, react_1.createElement)(ui_1.Icon, null))) : (0, react_1.createElement)("div", { className: "wizard-layout" },
                (0, react_1.createElement)("aside", { className: "wizard-aside" },
                    (0, react_1.createElement)("ol", { className: "step-list" }, labels.map((s, i) => (0, react_1.createElement)("li", { key: s, className: i === step ? 'current' : i < step ? 'complete' : '', "aria-current": i === step ? 'step' : undefined },
                        (0, react_1.createElement)("button", { type: "button", disabled: i > step, onClick: () => this.setState({ step: i, errors: {} }) },
                            (0, react_1.createElement)("span", null, i < step ? (0, react_1.createElement)(ui_1.Icon, { name: "check", size: 14 }) : String(i + 1).padStart(2, '0')),
                            s)))),
                    (0, react_1.createElement)("div", { className: "wizard-help" },
                        (0, react_1.createElement)(ui_1.Icon, { name: "ruler", size: 28 }),
                        (0, react_1.createElement)("h3", null, "Her \u015Feyin cevab\u0131n\u0131 bilmeniz gerekmiyor."),
                        (0, react_1.createElement)("p", null, "\u00D6l\u00E7\u00FC, malzeme ve teslim detaylar\u0131n\u0131 birlikte de\u011Ferlendirmek i\u00E7in buraday\u0131z."),
                        (0, react_1.createElement)("span", null, "Temsili ak\u0131\u015F \u00B7 Canl\u0131 g\u00F6nderim yok"))),
                (0, react_1.createElement)("div", { className: "wizard-card" },
                    (0, react_1.createElement)("div", { className: "wizard-topline" },
                        (0, react_1.createElement)("span", null,
                            "ADIM ",
                            step + 1,
                            " / 7"),
                        (0, react_1.createElement)("span", null,
                            Math.round((step + 1) / 7 * 100),
                            "%")),
                    (0, react_1.createElement)("div", { className: "progress-bar" },
                        (0, react_1.createElement)("span", { style: { width: (step + 1) / 7 * 100 + '%' } })),
                    (0, react_1.createElement)("h2", { id: "wizard-title", tabIndex: -1 }, stepTitles[step]),
                    (0, react_1.createElement)("p", { className: "wizard-subtitle" }, stepDescriptions[step]),
                    this.state.hasDraft && step === 0 && (0, react_1.createElement)("div", { className: "draft-alert" },
                        (0, react_1.createElement)("span", null, "Bu cihazda kaydedilmi\u015F \u00F6l\u00E7\u00FC tercihleri var."),
                        (0, react_1.createElement)("button", { type: "button", onClick: () => {
                                const saved = (0, domain_1.readLocal)('quote-draft', null);
                                if (saved)
                                    this.setState({ v: { ...initial, ...(0, domain_1.safeDraft)(saved) }, hasDraft: false });
                            } },
                            "Tercihleri getir ",
                            (0, react_1.createElement)(ui_1.Icon, { size: 16 }))),
                    (0, react_1.createElement)("form", { onSubmit: e => {
                            e.preventDefault();
                            if (step < 6)
                                this.next();
                            else if (v.ack)
                                this.setState({ done: true });
                        }, noValidate: true },
                        (0, react_1.createElement)("div", { className: "wizard-content" }, this.renderStep()),
                        (0, react_1.createElement)("div", { className: "wizard-actions" },
                            (0, react_1.createElement)("button", { className: "back-button", type: "button", disabled: step === 0, onClick: () => this.setState({ step: step - 1, errors: {} }) },
                                (0, react_1.createElement)("span", { className: "reverse-arrow" },
                                    (0, react_1.createElement)(ui_1.Icon, null)),
                                "Geri"),
                            (0, react_1.createElement)("button", { className: "button", type: "submit", disabled: this.state.uploading || (step === 6 && !v.ack) },
                                step === 6 ? 'Talep özetini hazırla' : 'Devam et',
                                (0, react_1.createElement)(ui_1.Icon, null)))),
                    (0, react_1.createElement)("div", { className: "save-draft-row" },
                        (0, react_1.createElement)("button", { type: "button", onClick: () => { const ok = (0, domain_1.writeLocal)('quote-draft', (0, domain_1.safeDraft)(v), 7); a.notify(ok ? 'Yalnız ürün, ölçü ve malzeme tercihleri bu cihazda 7 gün saklandı. İletişim, not ve fotoğraf kaydedilmedi.' : 'Tarayıcı kayıt izni vermedi. Bu sayfada çalışmaya devam edebilirsiniz.'); } }, "\u00D6l\u00E7\u00FC tercihlerini bu cihazda sakla"),
                        (0, react_1.createElement)("span", null, "\u0130leti\u015Fim ve foto\u011Fraflar kaydedilmez.")))));
    }
}
exports.Quote = Quote;

},"src/pages/Portfolio":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inspiration = exports.WorkDetail = exports.Projects = void 0;
exports.ConceptCard = ConceptCard;
exports.Categories = Categories;
exports.AboutAtelier = AboutAtelier;
const PinterestPreview_1 = require("../components/PinterestPreview");
const pinterest_1 = require("../lib/pinterest");
const react_1 = require("react");
const ui_1 = require("../components/ui");
const PortfolioUI_1 = require("../components/PortfolioUI");
const portfolio_1 = require("../lib/portfolio");
const domain_1 = require("../lib/domain");
class Projects extends react_1.Component {
    constructor(p) {
        super(p);
        this.update = (key, value) => this.setState({ [key]: value }, () => { const s = this.state, q = new URLSearchParams(); if (s.category !== 'all')
            q.set('alan', s.category); if (s.search)
            q.set('ara', s.search); if (s.stage !== 'work')
            q.set('durum', s.stage); history.replaceState({}, '', (0, domain_1.publicHref)('/projeler' + (q.size ? '?' + q : ''))); });
        const q = new URLSearchParams(p.query || '');
        this.state = { category: portfolio_1.workCategories.some(c => c.id === q.get('alan')) ? q.get('alan') : 'all', search: q.get('ara') || '', stage: q.get('durum') === 'process' ? 'process' : 'work' };
    }
    render() {
        const a = this.props, s = this.state, list = portfolio_1.works.filter(w => (s.category === 'all' || w.category === s.category) && w.status === s.stage && (0, domain_1.searchKey)(w.title + ' ' + w.subtitle + ' ' + (0, portfolio_1.categoryName)(w.category)).includes((0, domain_1.searchKey)(s.search)));
        return (0, react_1.createElement)(react_1.Fragment, null,
            (0, react_1.createElement)("header", { className: "v6-page-head wrap" },
                (0, react_1.createElement)(ui_1.Eyebrow, null, "EL\u0130F / UYGULAMA AR\u015E\u0130V\u0130"),
                (0, react_1.createElement)("div", null,
                    (0, react_1.createElement)("h1", null,
                        "S\u00F6z de\u011Fil.",
                        (0, react_1.createElement)("br", null),
                        (0, react_1.createElement)("em", null, "\u0130\u015Fin kendisi.")),
                    (0, react_1.createElement)("p", null, "At\u00F6lyeden \u00E7\u0131k\u0131p ya\u015Fam alanlar\u0131na yerle\u015Fen \u00E7al\u0131\u015Fmalar. Foto\u011Fraflar\u0131n arkas\u0131nda, \u00F6l\u00E7\u00FCs\u00FCnden son ayr\u0131nt\u0131s\u0131na kadar d\u00FC\u015F\u00FCn\u00FClm\u00FC\u015F bir emek var."))),
            (0, react_1.createElement)("section", { className: "wrap portfolio-section" },
                (0, react_1.createElement)("div", { className: "portfolio-toolbar" },
                    (0, react_1.createElement)("div", { className: "view-segments", role: "group", "aria-label": "Proje durumu" },
                        (0, react_1.createElement)("button", { onClick: () => this.update('stage', 'work'), "aria-pressed": s.stage === 'work' }, "Bitirdi\u011Fimiz \u0130\u015Fler"),
                        (0, react_1.createElement)("button", { onClick: () => this.update('stage', 'process'), "aria-pressed": s.stage === 'process' }, "Uygulama A\u015Famalar\u0131")),
                    (0, react_1.createElement)("label", { className: "portfolio-search" },
                        (0, react_1.createElement)(ui_1.Icon, { name: "search" }),
                        (0, react_1.createElement)("input", { type: "search", value: s.search, maxLength: 100, onInput: e => this.update('search', e.currentTarget.value), placeholder: "Bir \u00E7al\u0131\u015Fma aray\u0131n", "aria-label": "Projelerde ara" }))),
                (0, react_1.createElement)("div", { className: "filter-chips", role: "group", "aria-label": "Proje kategorisi" }, [{ id: 'all', name: 'Tümü' }, ...portfolio_1.workCategories].map(c => (0, react_1.createElement)("button", { key: c.id, onClick: () => this.update('category', c.id), "aria-pressed": s.category === c.id }, c.name))),
                (0, react_1.createElement)("div", { className: "result-line", "aria-live": "polite" },
                    (0, react_1.createElement)("span", null,
                        list.length,
                        " \u00E7al\u0131\u015Fma"),
                    (0, react_1.createElement)("span", null, "Ger\u00E7ek foto\u011Fraflar, at\u00F6lyenin payla\u015Ft\u0131\u011F\u0131 ar\u015Fivden.")),
                list.length ? (0, react_1.createElement)("div", { className: "work-grid" }, list.map((w, i) => (0, react_1.createElement)(PortfolioUI_1.WorkCard, { key: w.id, work: w, actions: a, index: i }))) : (0, react_1.createElement)("div", { className: "v6-empty" },
                    (0, react_1.createElement)(ui_1.Icon, { name: "search", size: 34 }),
                    (0, react_1.createElement)("h2", null, "Bu se\u00E7imde hen\u00FCz bir \u00E7al\u0131\u015Fma yok."),
                    (0, react_1.createElement)("p", null, "Kategorinin ilham fikirlerini inceleyebilir veya kendi modelinizle ba\u015Flayabilirsiniz."),
                    (0, react_1.createElement)("button", { className: "button button-outline", onClick: () => this.setState({ category: 'all', search: '', stage: 'work' }, () => history.replaceState({}, '', (0, domain_1.publicHref)('/projeler'))) },
                        "Filtreleri temizle ",
                        (0, react_1.createElement)(ui_1.Icon, null)),
                    (0, react_1.createElement)(ui_1.TextLink, { to: "/modelini-getir", navigate: a.navigate }, "Kendi modelimle ba\u015Flayay\u0131m"))),
            (0, react_1.createElement)(PortfolioUI_1.ModelCallout, { navigate: a.navigate, compact: true }));
    }
}
exports.Projects = Projects;
class WorkDetail extends react_1.Component {
    constructor() {
        super(...arguments);
        this.state = { photo: 0, zoom: false };
        this.move = (delta) => this.setState(s => ({ photo: (s.photo + delta + this.props.work.images.length) % this.props.work.images.length }));
    }
    render() {
        const a = this.props, w = a.work, others = portfolio_1.works.filter(p => p.category === w.category && p.id !== w.id && p.status === 'work').slice(0, 3);
        return (0, react_1.createElement)(react_1.Fragment, null,
            (0, react_1.createElement)("div", { className: "wrap v6-crumb" },
                (0, react_1.createElement)(ui_1.Link, { to: "/projeler", navigate: a.navigate }, "Bitirdi\u011Fimiz \u0130\u015Fler"),
                (0, react_1.createElement)("span", null, "/"),
                (0, react_1.createElement)(ui_1.Link, { to: '/kategoriler/' + w.category, navigate: a.navigate }, (0, portfolio_1.categoryName)(w.category))),
            (0, react_1.createElement)("section", { className: "wrap work-detail" },
                (0, react_1.createElement)("div", { className: "work-detail-media" },
                    (0, react_1.createElement)("button", { className: "work-main-photo", onClick: () => this.setState({ zoom: true }), "aria-label": "Proje foto\u011Fraf\u0131n\u0131 b\u00FCy\u00FCt" },
                        (0, react_1.createElement)(PortfolioUI_1.VImage, { asset: w.images[this.state.photo], alt: w.subtitle, eager: true, full: true }),
                        (0, react_1.createElement)("span", null,
                            (0, react_1.createElement)(ui_1.Icon, { name: "plus" }),
                            "Foto\u011Fraf\u0131 incele")),
                    w.images.length > 1 && (0, react_1.createElement)("div", { className: "work-thumbnails" }, w.images.map((im, i) => (0, react_1.createElement)("button", { key: im, onClick: () => this.setState({ photo: i }), "aria-label": 'Fotoğraf ' + (i + 1), "aria-pressed": i === this.state.photo },
                        (0, react_1.createElement)(PortfolioUI_1.VImage, { asset: im, alt: "", sizes: "100px" })))),
                    (0, react_1.createElement)("p", { className: "photo-credit" }, "At\u00F6lyenin payla\u015Ft\u0131\u011F\u0131 \u00F6zg\u00FCn foto\u011Fraf. Konsept g\u00F6rselle de\u011Fi\u015Ftirilmedi.")),
                (0, react_1.createElement)("div", { className: "work-detail-copy" },
                    (0, react_1.createElement)(PortfolioUI_1.SourceTag, { kind: w.status }),
                    (0, react_1.createElement)(ui_1.Eyebrow, null, (0, portfolio_1.categoryName)(w.category)),
                    (0, react_1.createElement)("h1", null, w.title),
                    (0, react_1.createElement)("p", { className: "work-lead" }, w.description),
                    (0, react_1.createElement)("dl", { className: "work-facts" },
                        (0, react_1.createElement)("div", null,
                            (0, react_1.createElement)("dt", null, "\u00C7al\u0131\u015Fma"),
                            (0, react_1.createElement)("dd", null, w.subtitle)),
                        (0, react_1.createElement)("div", null,
                            (0, react_1.createElement)("dt", null, "Yakla\u015F\u0131m"),
                            (0, react_1.createElement)("dd", null, "\u00D6l\u00E7\u00FC ve ihtiyaca g\u00F6re de\u011Ferlendirme")),
                        (0, react_1.createElement)("div", null,
                            (0, react_1.createElement)("dt", null, "Malzeme & \u00F6l\u00E7\u00FC"),
                            (0, react_1.createElement)("dd", null, "Yeni teklifinizde birlikte netle\u015Ftirilir"))),
                    (0, react_1.createElement)("div", { className: "work-features" }, w.features.map(f => (0, react_1.createElement)("span", { key: f },
                        (0, react_1.createElement)(ui_1.Icon, { name: "check", size: 16 }),
                        f))),
                    (0, react_1.createElement)(ui_1.ButtonLink, { to: (0, portfolio_1.modelHref)('', w.category, w.subtitle + ' benzeri bir çalışma istiyorum.'), navigate: a.navigate }, "Benzerini birlikte d\u00FC\u015F\u00FCnelim"),
                    (0, react_1.createElement)("p", { className: "fineprint" }, "Her mek\u00E2n farkl\u0131d\u0131r. Foto\u011Fraf, yeni projeniz i\u00E7in kesin \u00F6l\u00E7\u00FC, malzeme, fiyat veya ayn\u0131 sonucu elde etme taahh\u00FCd\u00FC de\u011Fildir."))),
            others.length > 0 && (0, react_1.createElement)("section", { className: "wrap v6-section" },
                (0, react_1.createElement)("div", { className: "v6-heading" },
                    (0, react_1.createElement)("div", null,
                        (0, react_1.createElement)(ui_1.Eyebrow, null, "AYNI ALANDAN"),
                        (0, react_1.createElement)("h2", null,
                            "Biraz daha ",
                            (0, react_1.createElement)("em", null, "ke\u015Ffedin."))),
                    (0, react_1.createElement)(ui_1.TextLink, { to: "/projeler", navigate: a.navigate }, "T\u00FCm \u00E7al\u0131\u015Fmalar")),
                (0, react_1.createElement)("div", { className: "work-grid" }, others.map((p, i) => (0, react_1.createElement)(PortfolioUI_1.WorkCard, { key: p.id, work: p, actions: a, index: i })))),
            (0, react_1.createElement)(PortfolioUI_1.ModelCallout, { navigate: a.navigate, compact: true }),
            this.state.zoom && (0, react_1.createElement)(ui_1.Dialog, { title: w.subtitle, onClose: () => this.setState({ zoom: false }) },
                (0, react_1.createElement)("div", { className: "v6-lightbox", onKeyDown: e => { if (e.key === 'ArrowRight')
                        this.move(1); if (e.key === 'ArrowLeft')
                        this.move(-1); } },
                    (0, react_1.createElement)(PortfolioUI_1.VImage, { asset: w.images[this.state.photo], alt: w.subtitle + ' büyük görünüm', eager: true, full: true, sizes: "95vw" }),
                    w.images.length > 1 && (0, react_1.createElement)("div", null,
                        (0, react_1.createElement)("button", { className: "icon-button", "aria-label": "\u00D6nceki foto\u011Fraf", onClick: () => this.move(-1) },
                            (0, react_1.createElement)("span", { className: "reverse-arrow" },
                                (0, react_1.createElement)(ui_1.Icon, null))),
                        (0, react_1.createElement)("span", null,
                            this.state.photo + 1,
                            " / ",
                            w.images.length),
                        (0, react_1.createElement)("button", { className: "icon-button", "aria-label": "Sonraki foto\u011Fraf", onClick: () => this.move(1) },
                            (0, react_1.createElement)(ui_1.Icon, null))),
                    (0, react_1.createElement)("p", null, "\u00D6zg\u00FCn uygulama foto\u011Fraf\u0131"))));
    }
}
exports.WorkDetail = WorkDetail;
function ConceptCard({ c, navigate }) { return (0, react_1.createElement)("article", { className: "concept-card" },
    (0, react_1.createElement)(ui_1.Link, { to: (0, portfolio_1.modelHref)('', c.category, c.subtitle + ' üzerine konuşmak istiyorum.'), navigate: navigate, className: "concept-image" },
        (0, react_1.createElement)(PortfolioUI_1.VImage, { asset: c.image, alt: c.subtitle + ', yapay zekâ ile üretilmiş temsili tasarım', sizes: "(max-width: 680px) 90vw, 45vw" }),
        (0, react_1.createElement)(PortfolioUI_1.SourceTag, { kind: "concept" }),
        (0, react_1.createElement)("span", { className: "concept-open" },
            (0, react_1.createElement)(ui_1.Icon, { name: "diagonal" }))),
    (0, react_1.createElement)("div", { className: "concept-caption" },
        (0, react_1.createElement)("span", null, (0, portfolio_1.categoryName)(c.category)),
        (0, react_1.createElement)("h3", null, c.title),
        (0, react_1.createElement)(ui_1.TextLink, { to: (0, portfolio_1.modelHref)('', c.category, c.subtitle + ' üzerine konuşmak istiyorum.'), navigate: navigate }, "Bu fikirle ba\u015Flayal\u0131m"))); }
function Categories(a) {
    const cat = portfolio_1.workCategories.find(c => c.id === a.slug);
    if (cat) {
        const list = portfolio_1.works.filter(w => w.category === cat.id && w.status === 'work'), ideas = portfolio_1.concepts.filter(c => c.category === cat.id);
        return (0, react_1.createElement)(react_1.Fragment, null,
            (0, react_1.createElement)("section", { className: "category-hero" },
                (0, react_1.createElement)(PortfolioUI_1.VImage, { asset: cat.image, alt: cat.name + ' için temsili tasarım sahnesi', eager: true, sizes: "100vw" }),
                (0, react_1.createElement)("div", { className: "category-shade" }),
                (0, react_1.createElement)("div", { className: "wrap" },
                    (0, react_1.createElement)(ui_1.Link, { className: "v6-backlink", to: "/kategoriler", navigate: a.navigate },
                        "Kategoriler ",
                        (0, react_1.createElement)(ui_1.Icon, { size: 16 })),
                    (0, react_1.createElement)(ui_1.Eyebrow, null, "\u00D6L\u00C7\u00DCN\u00DCZE, ALANINIZA, S\u0130ZE"),
                    (0, react_1.createElement)("h1", null, cat.name),
                    (0, react_1.createElement)("p", null, cat.line)),
                (0, react_1.createElement)(PortfolioUI_1.SourceTag, { kind: "concept" })),
            (0, react_1.createElement)("section", { className: "wrap v6-section" },
                (0, react_1.createElement)("div", { className: "v6-heading" },
                    (0, react_1.createElement)("div", null,
                        (0, react_1.createElement)(ui_1.Eyebrow, null, "AT\u00D6LYEDEN"),
                        (0, react_1.createElement)("h2", null,
                            cat.short,
                            " i\u00E7in",
                            (0, react_1.createElement)("br", null),
                            (0, react_1.createElement)("em", null, "d\u00FC\u015F\u00FCnd\u00FCklerimiz."))),
                    (0, react_1.createElement)("p", null, cat.detail)),
                list.length ? (0, react_1.createElement)("div", { className: "work-grid" }, list.map((w, i) => (0, react_1.createElement)(PortfolioUI_1.WorkCard, { key: w.id, work: w, actions: a, index: i }))) : (0, react_1.createElement)("div", { className: "category-no-work" },
                    (0, react_1.createElement)("p", null, "Bu kategoride payla\u015F\u0131lm\u0131\u015F bir bitmi\u015F i\u015F foto\u011Fraf\u0131 hen\u00FCz yok. A\u015Fa\u011F\u0131daki konseptleri ba\u015Flang\u0131\u00E7 noktas\u0131 olarak inceleyebilirsiniz."),
                    (0, react_1.createElement)(ui_1.TextLink, { to: (0, portfolio_1.modelHref)('', cat.id), navigate: a.navigate }, "Kendi fikrimle ba\u015Flayay\u0131m"))),
            ideas.length > 0 && (0, react_1.createElement)("section", { className: "concept-band" },
                (0, react_1.createElement)("div", { className: "wrap" },
                    (0, react_1.createElement)("div", { className: "v6-heading" },
                        (0, react_1.createElement)("div", null,
                            (0, react_1.createElement)(ui_1.Eyebrow, null, "TEMS\u0130L\u0130 TASARIM SE\u00C7K\u0130S\u0130"),
                            (0, react_1.createElement)("h2", null,
                                "Bir ba\u015Flang\u0131\u00E7 ",
                                (0, react_1.createElement)("em", null, "fikri."))),
                        (0, react_1.createElement)("p", null, "Bu g\u00F6rseller yapay zek\u00E2 konseptidir. At\u00F6lyenin tamamlad\u0131\u011F\u0131 i\u015Fler de\u011Fildir. \u00DCretilebilirlik ve ayr\u0131nt\u0131lar birlikte de\u011Ferlendirilir.")),
                    (0, react_1.createElement)("div", { className: "concept-grid" }, ideas.map(c => (0, react_1.createElement)(ConceptCard, { key: c.id, c: c, navigate: a.navigate }))))),
            (0, react_1.createElement)(PortfolioUI_1.ModelCallout, { navigate: a.navigate }));
    }
    return (0, react_1.createElement)(react_1.Fragment, null,
        (0, react_1.createElement)("header", { className: "v6-page-head wrap" },
            (0, react_1.createElement)(ui_1.Eyebrow, null, "EL\u0130F / YA\u015EAM ALANLARI"),
            (0, react_1.createElement)("div", null,
                (0, react_1.createElement)("h1", null,
                    "Evin her k\u00F6\u015Fesine.",
                    (0, react_1.createElement)("br", null),
                    (0, react_1.createElement)("em", null, "Size g\u00F6re.")),
                (0, react_1.createElement)("p", null, "Mutfaktan bir fincan kahveye ayr\u0131lan k\u00F6\u015Feye. Haz\u0131r bir \u00F6l\u00E7\u00FCye s\u0131\u011Fmak yerine, alan\u0131n\u0131zdan ve ihtiyac\u0131n\u0131zdan ba\u015Flayal\u0131m."))),
        (0, react_1.createElement)("section", { className: "wrap v6-section categories-index" },
            (0, react_1.createElement)("div", { className: "category-grid" },
                portfolio_1.workCategories.map((c, i) => (0, react_1.createElement)(ui_1.Link, { key: c.id, to: '/kategoriler/' + c.id, navigate: a.navigate, className: "category-tile" },
                    (0, react_1.createElement)("div", null,
                        (0, react_1.createElement)(PortfolioUI_1.VImage, { asset: c.image, alt: c.name + ' konsepti', sizes: "(max-width: 680px) 90vw, 30vw" }),
                        (0, react_1.createElement)(PortfolioUI_1.SourceTag, { kind: "concept" })),
                    (0, react_1.createElement)("span", { className: "category-number" }, String(i + 1).padStart(2, '0')),
                    (0, react_1.createElement)("h2", null, c.name),
                    (0, react_1.createElement)("p", null, c.line),
                    (0, react_1.createElement)(ui_1.Icon, { name: "diagonal" }))),
                (0, react_1.createElement)(ui_1.Link, { to: "/ilham-modelleri", navigate: a.navigate, className: "category-tile category-inspiration" },
                    (0, react_1.createElement)("span", { className: "category-number" }, "09"),
                    (0, react_1.createElement)(ui_1.Eyebrow, null, "SE\u00C7K\u0130LER VE S\u0130Z\u0130N F\u0130K\u0130RLER\u0130N\u0130Z"),
                    (0, react_1.createElement)("h2", null,
                        "\u0130lham",
                        (0, react_1.createElement)("br", null),
                        (0, react_1.createElement)("em", null, "Modelleri")),
                    (0, react_1.createElement)("p", null, "Kendi modelinizi getirin, birlikte yorumlayal\u0131m."),
                    (0, react_1.createElement)(ui_1.Icon, { name: "diagonal" })))),
        (0, react_1.createElement)(PortfolioUI_1.ModelCallout, { navigate: a.navigate }));
}
class Inspiration extends react_1.Component {
    constructor() {
        super(...arguments);
        this.state = { category: 'all', group: 'atelier' };
    }
    render() {
        const a = this.props, items = portfolio_1.concepts.filter(c => this.state.category === 'all' || c.category === this.state.category);
        return (0, react_1.createElement)(react_1.Fragment, null,
            (0, react_1.createElement)("header", { className: "v6-page-head wrap inspiration-heading" },
                (0, react_1.createElement)(ui_1.Eyebrow, null, "EL\u0130F / \u0130LHAM DEFTER\u0130"),
                (0, react_1.createElement)("div", null,
                    (0, react_1.createElement)("h1", null,
                        "Bir yerde g\u00F6rd\u00FCn\u00FCz.",
                        (0, react_1.createElement)("br", null),
                        (0, react_1.createElement)("em", null, "Akl\u0131n\u0131zda kald\u0131.")),
                    (0, react_1.createElement)("p", null, "Bir Pinterest kayd\u0131, bir eskiz, k\u00FC\u00E7\u00FCk bir ayr\u0131nt\u0131. O fikri mek\u00E2n\u0131n\u0131z\u0131n \u00F6l\u00E7\u00FCs\u00FCne ve sizin kullan\u0131m\u0131n\u0131za g\u00F6re birlikte d\u00FC\u015F\u00FCnelim.")),
                (0, react_1.createElement)(ui_1.ButtonLink, { to: "/modelini-getir", navigate: a.navigate }, "Kendi modelimi getireyim")),
            (0, react_1.createElement)("section", { className: "wrap v6-section inspiration-concepts" },
                (0, react_1.createElement)("div", { className: "v6-heading" },
                    (0, react_1.createElement)("div", null,
                        (0, react_1.createElement)(ui_1.Eyebrow, null, "B\u0130Z\u0130M KONSEPT SE\u00C7K\u0130M\u0130Z"),
                        (0, react_1.createElement)("h2", null,
                            "Biraz ",
                            (0, react_1.createElement)("em", null, "ilham."))),
                    (0, react_1.createElement)("p", null, "Yapay zek\u00E2 ile haz\u0131rlanm\u0131\u015F tasar\u0131m fikirleri. Bitmi\u015F proje veya teknik \u00FCretim onay\u0131 de\u011Fildir.")),
                (0, react_1.createElement)("div", { className: "filter-chips", role: "group", "aria-label": "\u0130lham kategorisi" }, [{ id: 'all', name: 'Tümü' }, ...portfolio_1.workCategories].map(c => (0, react_1.createElement)("button", { key: c.id, "aria-pressed": c.id === this.state.category, onClick: () => this.setState({ category: c.id }) }, c.name))),
                (0, react_1.createElement)("div", { className: "concept-grid" }, items.map(c => (0, react_1.createElement)(ConceptCard, { c: c, key: c.id, navigate: a.navigate })))),
            (0, react_1.createElement)("section", { className: "pinterest-section" },
                (0, react_1.createElement)("div", { className: "wrap" },
                    (0, react_1.createElement)("div", { className: "v6-heading" },
                        (0, react_1.createElement)("div", null,
                            (0, react_1.createElement)(ui_1.Eyebrow, null, "KAYNA\u011EINDAN KE\u015EFED\u0130N"),
                            (0, react_1.createElement)("h2", null,
                                "Pinterest'ten",
                                (0, react_1.createElement)("br", null),
                                (0, react_1.createElement)("em", null, "kaydetti\u011Fimiz fikirler."))),
                        (0, react_1.createElement)("p", null, "Ustan\u0131n payla\u015Ft\u0131\u011F\u0131 modeller ve birlikte \u00F6nerilenler. Kayna\u011F\u0131 Pinterest'te a\u00E7abilir, be\u011Fendi\u011Finiz ba\u011Flant\u0131yla kendi projenize ba\u015Flayabilirsiniz.")),
                    (0, react_1.createElement)("div", { className: "view-segments pin-segments", role: "group", "aria-label": "Pinterest se\u00E7kisi" },
                        (0, react_1.createElement)("button", { "aria-pressed": this.state.group === 'atelier', onClick: () => this.setState({ group: 'atelier' }) }, "Ustan\u0131n se\u00E7tikleri"),
                        (0, react_1.createElement)("button", { "aria-pressed": this.state.group === 'shared', onClick: () => this.setState({ group: 'shared' }) }, "Birlikte \u00F6nerilenler")),
                    (0, react_1.createElement)("div", { className: "pin-grid" }, portfolio_1.pinterestReferences.filter(p => p.group === this.state.group).map(p => (0, react_1.createElement)("article", { className: "pin-card", key: p.id },
                        (0, react_1.createElement)("div", { className: "pin-mark", "aria-hidden": "true" }, "P"),
                        (0, react_1.createElement)("span", { className: "eyebrow" }, "DI\u015E KAYNAK \u0130LHAM BA\u011ELANTISI"),
                        (0, react_1.createElement)("h3", null, pinterest_1.pinLookup[p.id]?.label || p.title),
                        (0, react_1.createElement)("p", null, p.category === 'vestiyer' ? 'Vestiyer için paylaşılan model.' : 'Paylaşılan tasarım referansı.'),
                        (0, react_1.createElement)(PinterestPreview_1.PinterestPreview, { pin: p.id }),
                        (0, react_1.createElement)("div", null,
                            (0, react_1.createElement)("a", { href: 'https://pin.it/' + p.id, target: "_blank", rel: "noopener noreferrer", className: "text-link" },
                                "Pinterest'te incele ",
                                (0, react_1.createElement)(ui_1.Icon, { name: "diagonal", size: 17 })),
                            (0, react_1.createElement)(ui_1.TextLink, { to: (0, portfolio_1.modelHref)('https://pin.it/' + p.id, p.category), navigate: a.navigate }, "Bu modelle ba\u015Flayal\u0131m"))))),
                    (0, react_1.createElement)("p", { className: "pin-note" }, "Pinterest i\u00E7erikleri ilgili \u00FCreticilerine ve kaynaklar\u0131na aittir. Burada bitmi\u015F Elif projesi olarak g\u00F6sterilmez. G\u00F6rsel y\u00FCkleyicisi yaln\u0131z iste\u011Finizle Pinterest ba\u011Flant\u0131s\u0131 kurar. Model payla\u015F\u0131m formuna bilgi aktarmaz. Pinterest kayna\u011F\u0131 ayr\u0131 sekmede de a\u00E7\u0131labilir. Ba\u011Flant\u0131lar zaman i\u00E7inde de\u011Fi\u015Febilir veya giri\u015F gerektirebilir."))),
            (0, react_1.createElement)(PortfolioUI_1.ModelCallout, { navigate: a.navigate }));
    }
}
exports.Inspiration = Inspiration;
function AboutAtelier(a) {
    return (0, react_1.createElement)(react_1.Fragment, null,
        (0, react_1.createElement)("header", { className: "v6-page-head wrap" },
            (0, react_1.createElement)(ui_1.Eyebrow, null, a.atelier ? 'ELİF / TEZGÂHTAN MEKÂNA' : 'ELİF / AİLEDEN GELEN USTALIK'),
            (0, react_1.createElement)("div", null,
                (0, react_1.createElement)("h1", null, a.atelier ? (0, react_1.createElement)(react_1.Fragment, null,
                    "Bir fikrin",
                    (0, react_1.createElement)("br", null),
                    (0, react_1.createElement)("em", null, "\u015Fekil ald\u0131\u011F\u0131 yer.")) : (0, react_1.createElement)(react_1.Fragment, null,
                    "Bir meslekten fazlas\u0131.",
                    (0, react_1.createElement)("br", null),
                    (0, react_1.createElement)("em", null, "Bir aile miras\u0131."))),
                (0, react_1.createElement)("p", null, "Yusuf Usta'n\u0131n babas\u0131ndan \u00F6\u011Frendi\u011Fi marangozluk, bug\u00FCn farkl\u0131 ya\u015Fam alanlar\u0131nda devam ediyor. Haz\u0131r bir kal\u0131p de\u011Fil, ihtiyaca g\u00F6re d\u00FC\u015F\u00FCn\u00FClm\u00FC\u015F bir \u00E7al\u0131\u015Fma."))),
        (0, react_1.createElement)("section", { className: "atelier-documentary" },
            (0, react_1.createElement)("div", { className: "atelier-documentary-image" },
                (0, react_1.createElement)(PortfolioUI_1.VImage, { asset: "work-joinery", alt: "At\u00F6lyenin ah\u015Fap kamelya uygulamas\u0131ndaki \u00E7at\u0131 birle\u015Fimi ayr\u0131nt\u0131s\u0131", eager: true, sizes: "70vw" }),
                (0, react_1.createElement)(PortfolioUI_1.SourceTag, { kind: "process" })),
            (0, react_1.createElement)("div", null,
                (0, react_1.createElement)(ui_1.Eyebrow, null, "YUSUF USTA'NIN EL\u0130NDEN \u00C7IKANLAR"),
                (0, react_1.createElement)("h2", null,
                    "\u00D6l\u00E7\u00FCs\u00FCnde dikkat.",
                    (0, react_1.createElement)("br", null),
                    (0, react_1.createElement)("em", null, "Ayr\u0131nt\u0131s\u0131nda emek.")),
                (0, react_1.createElement)("p", null, "Bir dolab\u0131n nas\u0131l a\u00E7\u0131ld\u0131\u011F\u0131n\u0131, bir raf\u0131n ne ta\u015F\u0131yaca\u011F\u0131n\u0131, bir k\u00F6\u015Fenin g\u00FCnl\u00FCk ya\u015Famda nas\u0131l kullan\u0131laca\u011F\u0131n\u0131 birlikte konu\u015Farak ba\u015Flar\u0131z."),
                (0, react_1.createElement)("p", null, "\u00DCretim ve uygulamay\u0131 ayn\u0131 hik\u00E2yenin par\u00E7alar\u0131 olarak g\u00F6r\u00FCr\u00FCz. Do\u011Fru \u00F6l\u00E7\u00FC, malzeme se\u00E7imi ve \u00F6zenli yerle\u015Fim, fikrin mek\u00E2na d\u00F6n\u00FC\u015Fmesini sa\u011Flar."),
                (0, react_1.createElement)(ui_1.TextLink, { to: "/modelini-getir", navigate: a.navigate }, "Fikrinizi birlikte d\u00FC\u015F\u00FCnelim"))),
        (0, react_1.createElement)("section", { className: "wrap atelier-values" },
            (0, react_1.createElement)("div", null,
                (0, react_1.createElement)("span", null, "01"),
                (0, react_1.createElement)("h2", null, "Aile at\u00F6lyesi."),
                (0, react_1.createElement)("p", null, "Nesilden nesile aktar\u0131lan meslek bilgisi. Do\u011Frudan ustayla konu\u015Farak ilerleyen bir s\u00FCre\u00E7.")),
            (0, react_1.createElement)("div", null,
                (0, react_1.createElement)("span", null, "02"),
                (0, react_1.createElement)("h2", null, "\u00D6l\u00E7\u00FCye \u00F6zel."),
                (0, react_1.createElement)("p", null, "Alan\u0131n\u0131z\u0131n ihtiyac\u0131ndan ba\u015Flar, kullan\u0131m bi\u00E7iminize g\u00F6re \u015Fekillendiririz.")),
            (0, react_1.createElement)("div", null,
                (0, react_1.createElement)("span", null, "03"),
                (0, react_1.createElement)("h2", null, "\u00DCretim ve uygulama."),
                (0, react_1.createElement)("p", null, "Tezg\u00E2hta verilen eme\u011Fi, yerinde uygulama ve montaj ayr\u0131nt\u0131lar\u0131yla tamamlar\u0131z."))),
        a.atelier && (0, react_1.createElement)("section", { className: "wrap v6-section" },
            (0, react_1.createElement)("div", { className: "v6-heading" },
                (0, react_1.createElement)("div", null,
                    (0, react_1.createElement)(ui_1.Eyebrow, null, "UYGULAMA AR\u015E\u0130V\u0130"),
                    (0, react_1.createElement)("h2", null,
                        "\u0130\u015Fin ",
                        (0, react_1.createElement)("em", null, "i\u00E7inden."))),
                (0, react_1.createElement)("p", null, "Bu kareler uygulama a\u015Famas\u0131n\u0131 g\u00F6sterir. Bitmi\u015F projelerin tan\u0131t\u0131m \u00E7ekimleri olarak sunulmaz.")),
            (0, react_1.createElement)("div", { className: "work-grid" }, portfolio_1.works.filter(w => w.status === 'process').map((w, i) => (0, react_1.createElement)(PortfolioUI_1.WorkCard, { key: w.id, work: w, actions: a, index: i })))),
        (0, react_1.createElement)("div", { className: "wrap address-note" },
            (0, react_1.createElement)(ui_1.Icon, { name: "pin", size: 28 }),
            (0, react_1.createElement)("div", null,
                (0, react_1.createElement)("h2", null, "\u0130stanbul'da, yeni at\u00F6lyemize haz\u0131rlan\u0131yoruz."),
                (0, react_1.createElement)("p", null, "Yeni at\u00F6lye adresi netle\u015Fti\u011Finde burada payla\u015F\u0131lacak. \u015Eimdilik projenizi bir fikir ve yakla\u015F\u0131k \u00F6l\u00E7\u00FCyle haz\u0131rlamaya ba\u015Flayabilirsiniz."))),
        (0, react_1.createElement)(PortfolioUI_1.ModelCallout, { navigate: a.navigate }));
}

},"src/pages/BringModel":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BringModel = void 0;
const react_1 = require("react");
const ui_1 = require("../components/ui");
const PortfolioUI_1 = require("../components/PortfolioUI");
const portfolio_1 = require("../lib/portfolio");
const model_request_1 = require("../lib/model-request");
const domain_1 = require("../lib/domain");
class BringModel extends react_1.Component {
    constructor(p) {
        super(p);
        this.alive = true;
        this.set = (key, value) => this.setState(s => ({ v: { ...s.v, [key]: value }, error: '' }));
        this.go = (step) => { if (step > 0) {
            const error = (0, model_request_1.modelInputError)({ ...this.state.v, files: this.state.files });
            if (error) {
                this.setState({ error });
                return;
            }
        } this.setState({ step, error: '' }, () => document.getElementById('model-step-title')?.focus({ preventScroll: true })); };
        this.text = () => (0, model_request_1.modelSummary)({ ...this.state.v, category: (0, portfolio_1.categoryName)(this.state.v.category) }, this.state.files.map(f => f.name));
        const q = new URLSearchParams(p.query || ''), category = q.get('kategori') || 'ozel-tasarim';
        this.state = { step: 0, v: { category: portfolio_1.workCategories.some(c => c.id === category) ? category : 'ozel-tasarim', url: (0, model_request_1.normalizeReference)(q.get('ref') || '') || '', note: (q.get('fikir') || '').slice(0, 1600), dimensions: '', district: '', timing: 'Birlikte planlayalım', interpretation: 'Alanıma göre birlikte yorumlayalım' }, files: [], error: '', loading: false };
    }
    componentWillUnmount() { this.alive = false; this.state.files.forEach(f => URL.revokeObjectURL(f.url)); }
    async add(list) { if (!list)
        return; const files = Array.from(list); if (files.length + this.state.files.length > 5) {
        this.setState({ error: 'En fazla 5 görsel ekleyebilirsiniz.' });
        return;
    } this.setState({ loading: true, error: '' }); const accepted = []; let error = ''; for (const file of files) {
        const validation = (0, domain_1.validateFile)(file);
        if (!validation.ok) {
            error = validation.error || 'Bu dosya desteklenmiyor.';
            continue;
        }
        try {
            const bytes = new Uint8Array(await file.slice(0, 12).arrayBuffer());
            const signature = (bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255) || (bytes[0] === 137 && bytes[1] === 80 && bytes[2] === 78 && bytes[3] === 71) || (String.fromCharCode(...bytes.slice(0, 4)) === 'RIFF' && String.fromCharCode(...bytes.slice(8, 12)) === 'WEBP');
            if (!signature) {
                error = 'Dosya uzantısı değil, gerçek görsel içeriği gerekli.';
                continue;
            }
            const b = await createImageBitmap(file);
            const tooLarge = b.width * b.height > 40000000;
            b.close();
            if (tooLarge) {
                error = '40 megapikselden küçük bir görsel seçin.';
                continue;
            }
            accepted.push({ name: file.name, file, url: URL.createObjectURL(file) });
        }
        catch {
            error = 'Görsel okunamadı. JPG, PNG veya WebP deneyin.';
        }
    } if (this.alive)
        this.setState(s => ({ files: [...s.files, ...accepted], loading: false, error }));
    else
        accepted.forEach(f => URL.revokeObjectURL(f.url)); }
    render() {
        const a = this.props, { v, files, step } = this.state;
        return (0, react_1.createElement)(react_1.Fragment, null,
            (0, react_1.createElement)("header", { className: "v6-page-head wrap model-head" },
                (0, react_1.createElement)(ui_1.Eyebrow, null, "EL\u0130F / S\u0130Z\u0130N F\u0130KR\u0130N\u0130Z"),
                (0, react_1.createElement)("div", null,
                    (0, react_1.createElement)("h1", null,
                        "Kendi modelinizi getirin.",
                        (0, react_1.createElement)("br", null),
                        (0, react_1.createElement)("em", null, "Birlikte \u00FCretelim.")),
                    (0, react_1.createElement)("p", null, "Pinterest ba\u011Flant\u0131n\u0131z\u0131, bir foto\u011Fraf\u0131 veya k\u00FC\u00E7\u00FCk bir \u00E7izimi ekleyin. Ayn\u0131s\u0131n\u0131 s\u00F6z vermek yerine, size uygun olan\u0131 birlikte d\u00FC\u015F\u00FCnelim."))),
            (0, react_1.createElement)("section", { className: "wrap model-request" },
                (0, react_1.createElement)("aside", { className: "model-aside" },
                    (0, react_1.createElement)("div", null,
                        (0, react_1.createElement)(PortfolioUI_1.VImage, { asset: "concept-model", alt: "Mobilya fikirleri, \u00E7izimler ve numunelerden olu\u015Fan yapay zek\u00E2 konsepti", eager: true, sizes: "(max-width: 800px) 90vw, 34vw" }),
                        (0, react_1.createElement)(PortfolioUI_1.SourceTag, { kind: "concept" })),
                    (0, react_1.createElement)("h2", null,
                        "Her fikir,",
                        (0, react_1.createElement)("br", null),
                        (0, react_1.createElement)("em", null, "konu\u015Fmaya de\u011Fer.")),
                    (0, react_1.createElement)("p", null, "Modelin bi\u00E7imini, kullan\u0131m amac\u0131n\u0131, malzeme ve \u00F6l\u00E7\u00FC se\u00E7eneklerini Yusuf Usta ile de\u011Ferlendirebiliriz."),
                    (0, react_1.createElement)("ol", null,
                        (0, react_1.createElement)("li", null,
                            (0, react_1.createElement)("span", null, "01"),
                            "Bir model veya fikir"),
                        (0, react_1.createElement)("li", null,
                            (0, react_1.createElement)("span", null, "02"),
                            "Size g\u00F6re ayr\u0131nt\u0131lar"),
                        (0, react_1.createElement)("li", null,
                            (0, react_1.createElement)("span", null, "03"),
                            "Bir arada proje \u00F6zeti")),
                    (0, react_1.createElement)("p", { className: "fineprint" }, "Bu ara\u00E7 \u00F6zetinizi cihaz\u0131n\u0131zda haz\u0131rlar. Otomatik g\u00F6nderim veya sipari\u015F olu\u015Fturmaz. G\u00F6rseller yaln\u0131z bu a\u00E7\u0131k sayfada kal\u0131r.")),
                (0, react_1.createElement)("div", { className: "model-form" },
                    (0, react_1.createElement)("nav", { className: "model-stepper", "aria-label": "Model payla\u015F\u0131m ad\u0131mlar\u0131" }, ['Modeliniz', 'Ayrıntılar', 'Özet'].map((title, i) => (0, react_1.createElement)("button", { key: title, type: "button", "aria-current": step === i ? 'step' : undefined, disabled: i > step, onClick: () => this.go(i) },
                        (0, react_1.createElement)("span", null, String(i + 1).padStart(2, '0')),
                        title))),
                    (0, react_1.createElement)("div", { className: "model-form-inner" },
                        (0, react_1.createElement)(ui_1.Eyebrow, null,
                            "ADIM ",
                            step + 1,
                            " / 3"),
                        (0, react_1.createElement)("h2", { id: "model-step-title", tabIndex: -1 }, ['Neyi beğendiniz?', 'Sizin için nasıl olsun?', 'Fikriniz artık bir arada.'][step]),
                        (0, react_1.createElement)("form", { noValidate: true, onSubmit: e => { e.preventDefault(); if (step < 2)
                                this.go(step + 1); } },
                            step === 0 && (0, react_1.createElement)(react_1.Fragment, null,
                                (0, react_1.createElement)("label", { className: "form-field", htmlFor: "model-url" },
                                    (0, react_1.createElement)("span", null, "Pinterest veya model ba\u011Flant\u0131s\u0131"),
                                    (0, react_1.createElement)("input", { id: "model-url", type: "url", value: v.url, maxLength: 2000, autoComplete: "off", onInput: e => this.set('url', e.currentTarget.value), placeholder: "https://pin.it/\u2026", "aria-describedby": "model-url-help" })),
                                (0, react_1.createElement)("p", { className: "field-hint", id: "model-url-help" }, "Pinterest, bir tasar\u0131m sayfas\u0131 veya kendi modelinizin HTTPS ba\u011Flant\u0131s\u0131. Ba\u011Flant\u0131n\u0131n i\u00E7eri\u011Fi otomatik okunmaz."),
                                (0, react_1.createElement)("div", { className: "or-divider" },
                                    (0, react_1.createElement)("span", null, "ya da bir g\u00F6rsel ekleyin")),
                                (0, react_1.createElement)("label", { className: "model-dropzone" },
                                    (0, react_1.createElement)(ui_1.Icon, { name: "upload", size: 30 }),
                                    (0, react_1.createElement)("strong", null, this.state.loading ? 'Görseller kontrol ediliyor…' : 'Fotoğraf veya çiziminizi seçin'),
                                    (0, react_1.createElement)("span", null, "JPG, PNG, WebP. En fazla 5 dosya, her biri 10 MB."),
                                    (0, react_1.createElement)("input", { "aria-label": "Model g\u00F6rsellerini se\u00E7", type: "file", multiple: true, accept: "image/jpeg,image/png,image/webp", disabled: this.state.loading, onChange: e => { this.add(e.currentTarget.files); e.currentTarget.value = ''; } })),
                                files.length > 0 && (0, react_1.createElement)("div", { className: "model-uploads" }, files.map((f, i) => (0, react_1.createElement)("div", { key: f.url },
                                    (0, react_1.createElement)("img", { src: f.url, alt: f.name }),
                                    (0, react_1.createElement)("span", null, f.name),
                                    (0, react_1.createElement)("button", { type: "button", "aria-label": f.name + ' görselini kaldır', onClick: () => { URL.revokeObjectURL(f.url); this.setState({ files: files.filter((_, j) => j !== i) }); } },
                                        (0, react_1.createElement)(ui_1.Icon, { name: "close", size: 16 }))))),
                                (0, react_1.createElement)("label", { className: "form-field spaced", htmlFor: "model-note" },
                                    (0, react_1.createElement)("span", null, "Modelde neyi sevdiniz?"),
                                    (0, react_1.createElement)("textarea", { id: "model-note", rows: 4, value: v.note, maxLength: 1600, onInput: e => this.set('note', e.currentTarget.value), placeholder: "\u00D6rne\u011Fin, yuvarlak k\u00F6\u015Felerini sevdim. Daha k\u00FC\u00E7\u00FCk bir \u00F6l\u00E7\u00FC ve a\u00E7\u0131k ton istiyorum." })),
                                (0, react_1.createElement)("p", { className: "field-hint" }, "Hen\u00FCz g\u00F6rseliniz yoksa fikrinizi yazman\u0131z da yeterli.")),
                            step === 1 && (0, react_1.createElement)(react_1.Fragment, null,
                                (0, react_1.createElement)("label", { className: "form-field" },
                                    "\u00DCr\u00FCn veya uygulama t\u00FCr\u00FC",
                                    (0, react_1.createElement)("select", { "aria-label": "Model kategorisi", value: v.category, onChange: e => this.set('category', e.currentTarget.value) }, portfolio_1.workCategories.map(c => (0, react_1.createElement)("option", { key: c.id, value: c.id }, c.name)))),
                                (0, react_1.createElement)("label", { className: "form-field" },
                                    "Yakla\u015F\u0131k \u00F6l\u00E7\u00FC, biliyorsan\u0131z",
                                    (0, react_1.createElement)("input", { value: v.dimensions, maxLength: 160, onInput: e => this.set('dimensions', e.currentTarget.value), placeholder: "\u00D6rne\u011Fin, en 180 cm, derinlik 45 cm" })),
                                (0, react_1.createElement)("p", { className: "field-hint" }, "Kesin \u00F6l\u00E7\u00FCn\u00FCz yoksa bo\u015F b\u0131rak\u0131n. Bu a\u015Famada \u00FCretim \u00F6l\u00E7\u00FCs\u00FC gerekmiyor."),
                                (0, react_1.createElement)("div", { className: "form-row" },
                                    (0, react_1.createElement)("label", { className: "form-field" },
                                        "Uygulama ili veya il\u00E7esi",
                                        (0, react_1.createElement)("input", { value: v.district, maxLength: 100, onInput: e => this.set('district', e.currentTarget.value), placeholder: "\u0130stanbul, Kad\u0131k\u00F6y gibi" })),
                                    (0, react_1.createElement)("label", { className: "form-field" },
                                        "Zaman beklentiniz",
                                        (0, react_1.createElement)("input", { value: v.timing, maxLength: 160, onInput: e => this.set('timing', e.currentTarget.value) }))),
                                (0, react_1.createElement)("label", { className: "form-field" },
                                    "Nas\u0131l yorumlayal\u0131m?",
                                    (0, react_1.createElement)("select", { value: v.interpretation, "aria-label": "Tasar\u0131m yakla\u015F\u0131m\u0131", onChange: e => this.set('interpretation', e.currentTarget.value) },
                                        (0, react_1.createElement)("option", null, "Alan\u0131ma g\u00F6re birlikte yorumlayal\u0131m"),
                                        (0, react_1.createElement)("option", null, "Benzer bir form, farkl\u0131 \u00F6l\u00E7\u00FC ve malzeme"),
                                        (0, react_1.createElement)("option", null, "Yaln\u0131z bir ayr\u0131nt\u0131s\u0131ndan ilham alal\u0131m"))),
                                (0, react_1.createElement)("div", { className: "model-advice" },
                                    (0, react_1.createElement)(ui_1.Icon, { name: "ruler" }),
                                    (0, react_1.createElement)("p", null, "Malzeme, donan\u0131m, mekanizma ve uygulanabilirlik g\u00F6r\u00FC\u015Fmede netle\u015Fir. Se\u00E7ilen model, otomatik \u00FCretim onay\u0131 veya birebir kopya taahh\u00FCd\u00FC de\u011Fildir."))),
                            step === 2 && (0, react_1.createElement)(react_1.Fragment, null,
                                (0, react_1.createElement)("p", { className: "model-summary-intro" }, "\u00D6zetinizi g\u00F6zden ge\u00E7irip cihaz\u0131n\u0131za kaydedebilir veya WhatsApp'ta se\u00E7ti\u011Finiz ki\u015Fiye payla\u015Fabilirsiniz."),
                                (0, react_1.createElement)("dl", { className: "model-summary" },
                                    (0, react_1.createElement)("div", null,
                                        (0, react_1.createElement)("dt", null, "\u0130htiya\u00E7"),
                                        (0, react_1.createElement)("dd", null, (0, portfolio_1.categoryName)(v.category))),
                                    (0, react_1.createElement)("div", null,
                                        (0, react_1.createElement)("dt", null, "Model"),
                                        (0, react_1.createElement)("dd", null, v.url ? (0, react_1.createElement)("a", { href: (0, model_request_1.normalizeReference)(v.url) || undefined, target: "_blank", rel: "noopener noreferrer" },
                                            "Kaynak ba\u011Flant\u0131s\u0131n\u0131 a\u00E7 ",
                                            (0, react_1.createElement)(ui_1.Icon, { name: "diagonal", size: 15 })) : 'Açıklama veya görsel ile')),
                                    (0, react_1.createElement)("div", null,
                                        (0, react_1.createElement)("dt", null, "\u00D6l\u00E7\u00FC"),
                                        (0, react_1.createElement)("dd", null, v.dimensions || 'Birlikte belirlenecek')),
                                    (0, react_1.createElement)("div", null,
                                        (0, react_1.createElement)("dt", null, "Yakla\u015F\u0131m"),
                                        (0, react_1.createElement)("dd", null, v.interpretation)),
                                    (0, react_1.createElement)("div", null,
                                        (0, react_1.createElement)("dt", null, "G\u00F6rseller"),
                                        (0, react_1.createElement)("dd", null,
                                            files.length,
                                            " dosya, yaln\u0131z bu sayfada"))),
                                v.note && (0, react_1.createElement)("blockquote", { className: "model-quote" }, v.note),
                                (0, react_1.createElement)("div", { className: "model-export" },
                                    (0, react_1.createElement)("button", { type: "button", className: "button", onClick: () => (0, domain_1.downloadText)('Elif_Tasarim_Model_Ozeti.txt', this.text()) },
                                        "Proje \u00F6zetimi indir ",
                                        (0, react_1.createElement)(ui_1.Icon, { name: "download" })),
                                    (0, react_1.createElement)("a", { className: "button button-outline", href: 'https://wa.me/?text=' + encodeURIComponent(this.text()), target: "_blank", rel: "noopener noreferrer" },
                                        "WhatsApp'ta payla\u015F ",
                                        (0, react_1.createElement)(ui_1.Icon, { name: "diagonal" }))),
                                (0, react_1.createElement)("div", { className: "model-sharing-note" },
                                    (0, react_1.createElement)(ui_1.Icon, { name: "info" }),
                                    (0, react_1.createElement)("p", null,
                                        (0, react_1.createElement)("strong", null, "Hen\u00FCz at\u00F6lyeye g\u00F6nderilmedi."),
                                        " WhatsApp a\u00E7\u0131ld\u0131\u011F\u0131nda al\u0131c\u0131y\u0131 siz se\u00E7ersiniz. \u0130\u015Fletmenin do\u011Frulanm\u0131\u015F numaras\u0131 bu s\u00FCr\u00FCmde tan\u0131ml\u0131 de\u011Fil. G\u00F6rselleri g\u00F6r\u00FC\u015Fmeye ayr\u0131ca ekleyin."))),
                            this.state.error && (0, react_1.createElement)("p", { className: "model-error", role: "alert" }, this.state.error),
                            (0, react_1.createElement)("div", { className: "model-actions" },
                                step > 0 ? (0, react_1.createElement)("button", { type: "button", className: "back-button", onClick: () => this.go(step - 1) },
                                    (0, react_1.createElement)("span", { className: "reverse-arrow" },
                                        (0, react_1.createElement)(ui_1.Icon, null)),
                                    step === 2 ? 'Bilgileri düzenle' : 'Geri') : (0, react_1.createElement)("span", { className: "field-hint" }, "\u00D6nce bir fikirle ba\u015Flayal\u0131m."),
                                step < 2 && (0, react_1.createElement)("button", { type: "submit", className: "button", disabled: this.state.loading },
                                    "Devam et ",
                                    (0, react_1.createElement)(ui_1.Icon, null))))))),
            (0, react_1.createElement)("div", { className: "wrap model-more" },
                (0, react_1.createElement)("p", null, "\u00D6l\u00E7\u00FC ve malzemeyi daha ayr\u0131nt\u0131l\u0131 \u00E7al\u0131\u015Fmak isterseniz."),
                (0, react_1.createElement)(ui_1.ButtonLink, { to: "/teklif-al", navigate: a.navigate, secondary: true }, "\u00D6zel \u00F6l\u00E7\u00FC st\u00FCdyosunu a\u00E7")));
    }
}
exports.BringModel = BringModel;

},"src/components/PortfolioUI":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VImage = VImage;
exports.SourceTag = SourceTag;
exports.WorkCard = WorkCard;
exports.ModelCallout = ModelCallout;
const react_1 = require("react");
const ui_1 = require("./ui");
const image_manifest_1 = require("../lib/image-manifest");
const portfolio_1 = require("../lib/portfolio");
function VImage({ asset, alt, className = '', eager = false, sizes = '(max-width: 680px) 100vw, 50vw', full = false }) {
    const m = image_manifest_1.imageManifest[asset];
    if (!m)
        return (0, react_1.createElement)("img", { src: (0, ui_1.image)(asset), alt: alt, className: className, loading: eager ? 'eager' : 'lazy' });
    const max = m.variants[m.variants.length - 1], fallback = full ? max : m.variants[Math.min(1, m.variants.length - 1)];
    return (0, react_1.createElement)("img", { src: (0, ui_1.image)(fallback.file), srcSet: m.variants.map((v) => (0, ui_1.image)(v.file) + ' ' + v.width + 'w').join(', '), sizes: sizes, width: m.width, height: m.height, alt: alt, className: className, loading: eager ? 'eager' : 'lazy', decoding: eager ? 'sync' : 'async', fetchPriority: eager ? 'high' : 'auto' });
}
function SourceTag({ kind = 'work' }) { return (0, react_1.createElement)("span", { className: 'source-tag source-' + kind }, ({ work: 'Atölye arşivi', process: 'Uygulama aşaması', concept: 'Yapay zekâ konsepti', reference: 'Pinterest ilhamı' })[kind]); }
function WorkCard({ work: w, actions: a, featured = false, index = 0 }) {
    return (0, react_1.createElement)("article", { className: 'work-card' + (featured ? ' featured-work' : ''), "data-work": w.id },
        (0, react_1.createElement)(ui_1.Link, { to: '/proje/' + w.id, navigate: a.navigate, className: "work-photo" },
            (0, react_1.createElement)(VImage, { asset: w.images[0], alt: w.subtitle + ', atölyeden paylaşılan fotoğraf', sizes: "(max-width: 680px) 90vw, (max-width: 1024px) 45vw, 30vw" }),
            (0, react_1.createElement)(SourceTag, { kind: w.status }),
            (0, react_1.createElement)("span", { className: "work-open" },
                (0, react_1.createElement)(ui_1.Icon, { name: "diagonal", size: 22 }))),
        (0, react_1.createElement)("div", { className: "work-caption" },
            (0, react_1.createElement)("span", { className: "work-index" }, String(index + 1).padStart(2, '0')),
            (0, react_1.createElement)("div", null,
                (0, react_1.createElement)("span", { className: "work-category" }, (0, portfolio_1.categoryName)(w.category)),
                (0, react_1.createElement)("h3", null,
                    (0, react_1.createElement)(ui_1.Link, { to: '/proje/' + w.id, navigate: a.navigate }, featured ? (0, portfolio_1.categoryName)(w.category) : w.title)),
                (0, react_1.createElement)("p", null, w.subtitle))));
}
function ModelCallout({ navigate, compact = false }) { return (0, react_1.createElement)("section", { className: 'model-callout' + (compact ? ' compact' : '') },
    (0, react_1.createElement)("div", { className: "model-callout-image" },
        (0, react_1.createElement)(VImage, { asset: "concept-model", alt: "Malzeme numuneleri, \u00E7izimler ve g\u00F6rsel fikirlerden olu\u015Fan temsili tasar\u0131m masas\u0131" }),
        (0, react_1.createElement)(SourceTag, { kind: "concept" })),
    (0, react_1.createElement)("div", { className: "model-callout-copy" },
        (0, react_1.createElement)("span", { className: "eyebrow" }, "KATALOGDA OLMAYANI DA KONU\u015EALIM"),
        (0, react_1.createElement)("h2", null,
            "Kendi modelinizi getirin.",
            (0, react_1.createElement)("br", null),
            (0, react_1.createElement)("em", null, "Birlikte \u00FCretelim.")),
        (0, react_1.createElement)("p", null, "Pinterest'te kaydetti\u011Finiz bir model, bir foto\u011Fraf ya da elinizle \u00E7izdi\u011Finiz bir fikir. Bize g\u00F6sterin, \u00F6l\u00E7\u00FCn\u00FCze ve ihtiyac\u0131n\u0131za g\u00F6re birlikte yorumlayal\u0131m."),
        (0, react_1.createElement)(ui_1.Link, { to: "/modelini-getir", navigate: navigate, className: "button" },
            "Modelimi payla\u015Fmak istiyorum ",
            (0, react_1.createElement)(ui_1.Icon, null)),
        (0, react_1.createElement)("small", null, "\u00D6l\u00E7\u00FC, malzeme ve \u00FCretilebilirlik Yusuf Usta ile de\u011Ferlendirilir."))); }

},"src/components/PinterestPreview":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PinterestPreview = void 0;
const react_1 = require("react");
const ui_1 = require("./ui");
const pinterest_1 = require("../lib/pinterest");
/** Official Pinterest widget runs only after a visitor asks, inside an opaque sandbox. */
class PinterestPreview extends react_1.Component {
    constructor() {
        super(...arguments);
        this.state = { open: false };
    }
    render() {
        const pin = pinterest_1.pinLookup[this.props.pin];
        if (!pin)
            return null;
        const doc = '<!doctype html><html><head><meta name="referrer" content="no-referrer"><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{margin:0;background:#f6f1e8;display:flex;justify-content:center;padding:12px;font:14px/1.6 Arial;color:#50412e}a{color:inherit}</style></head><body><a href="' + pin.canonical + '" target="_blank" rel="noopener noreferrer" data-pin-do="embedPin" data-pin-width="large">Pinterest kaynağını aç</a><script async defer src="https://assets.pinterest.com/js/pinit.js"></script></body></html>';
        return (0, react_1.createElement)(react_1.Fragment, null,
            (0, react_1.createElement)("button", { className: "pin-preview-button", onClick: () => this.setState({ open: true }) },
                (0, react_1.createElement)(ui_1.Icon, { name: "plus", size: 17 }),
                "Pinterest g\u00F6rselini y\u00FCkle"),
            this.state.open && (0, react_1.createElement)(ui_1.Dialog, { title: pin.label, onClose: () => this.setState({ open: false }) },
                (0, react_1.createElement)("div", { className: "pin-preview-dialog" },
                    (0, react_1.createElement)("p", null, "Pinterest'in kendi g\u00F6r\u00FCnt\u00FCleyicisi y\u00FCklenir. Pinterest'e ba\u011Flant\u0131 kurulur ve \u00E7erez kullan\u0131labilir. Bu model, tamamlad\u0131\u011F\u0131m\u0131z bir i\u015F de\u011Fildir."),
                    (0, react_1.createElement)("iframe", { title: pin.label + ' Pinterest görseli', srcDoc: doc, sandbox: "allow-scripts allow-popups", referrerPolicy: "no-referrer", loading: "eager" }),
                    (0, react_1.createElement)("p", null,
                        "G\u00F6rsel y\u00FCklenmezse veya eri\u015Fim istenirse ",
                        (0, react_1.createElement)("a", { href: pin.canonical, target: "_blank", rel: "noopener noreferrer" },
                            "Pinterest'te a\u00E7\u0131n ",
                            (0, react_1.createElement)(ui_1.Icon, { name: "diagonal", size: 15 })),
                        "."))));
    }
}
exports.PinterestPreview = PinterestPreview;

},"src/lib/portfolio":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainNavigation = exports.pinterestReferences = exports.concepts = exports.featuredWorks = exports.works = exports.workCategories = void 0;
exports.categoryName = categoryName;
exports.modelHref = modelHref;
exports.workCategories = [
    { id: 'mutfak', name: 'Mutfak', short: 'Mutfak', image: 'concept-mutfak', line: 'Günün başladığı, evin buluştuğu yer.', detail: 'Kapak düzeninden depolama alanlarına, ölçünüz ve kullanım alışkanlıklarınız etrafında tasarlanan mutfaklar.' },
    { id: 'tv-unitesi', name: 'TV Ünitesi', short: 'Yaşam alanı', image: 'concept-tv', line: 'Salonunuzun sakin odağı.', detail: 'Duvar panelleri, raflar ve kapalı depolamayı bir araya getiren, mekâna göre şekillenen TV üniteleri.' },
    { id: 'vestiyer', name: 'Vestiyer', short: 'Antre', image: 'concept-vestiyer', line: 'Evin ilk karşılaması.', detail: 'Giriş alanında askılık, ayakkabı ve günlük eşyalar için yer açan ölçüye özel çözümler.' },
    { id: 'gardrop', name: 'Gardırop', short: 'Giyinme alanı', image: 'concept-gardrop', line: 'Her şeyin kendine ait bir yeri.', detail: 'Kapak, raf, çekmece ve askı alanlarının birlikte düşünüldüğü gardırop ve giyinme çözümleri.' },
    { id: 'kahve-kosesi', name: 'Kahve Köşesi', short: 'Kahve köşesi', image: 'concept-kahve', line: 'Kendinize ayırdığınız küçük bir an.', detail: 'Kahve ekipmanınız ve servis alışkanlıklarınız için vitrin, raf ve tezgâhı buluşturan özel köşeler.' },
    { id: 'sehpa', name: 'Orta Sehpa ve Zigon Sehpa', short: 'Sehpa & zigon', image: 'concept-sehpa', line: 'Bazen küçük bir parça her şeyi değiştirir.', detail: 'Orta sehpa, yan sehpa ve iç içe geçen zigon fikirleri. Beğendiğiniz formu alanınıza göre birlikte değerlendirelim.' },
    { id: 'pergola', name: 'Pergola ve Açık Alan Yapıları', short: 'Bahçe & dış mekân', image: 'concept-pergola', line: 'Hayata dışarıda da yer açalım.', detail: 'Bahçe ve açık alan için ahşap kamelya ve üst yapı çalışmaları. Uygulama koşulları ve teknik uygunluk ayrıca değerlendirilir.' },
    { id: 'ozel-tasarim', name: 'Özel Tasarım Projeler', short: 'Size özel', image: 'concept-model', line: 'Katalogda olmayan bir fikriniz mi var?', detail: 'Mekânınız, çiziminiz veya bir referansınız üzerinden başlarız. Ne üretilebileceğini birlikte netleştiririz.' },
];
exports.works = [
    { id: 'sade-kose-mutfak', title: 'Sade çizgiler, sıcak bir mutfak.', category: 'mutfak', images: ['r13'], status: 'work', subtitle: 'L plan mutfak uygulaması', description: 'Açık tonlu kapaklar, koyu renk cihazlar ve tezgâh altı depolama aynı düzende buluşuyor. Atölyenin paylaşılan iş arşivinden.', features: ['L biçiminde yerleşim', 'Üst ve alt dolap bütünlüğü', 'Tezgâh arası aydınlatma'] },
    { id: 'cerceve-kapak-mutfak', title: 'Klasik çizginin yalın hâli.', category: 'mutfak', images: ['r10'], status: 'work', subtitle: 'Çerçeve kapaklı mutfak', description: 'Çerçeveli kapak düzeni ve uzun çalışma yüzeyiyle hazırlanmış mutfak uygulaması. Fotoğraf atölye tarafından paylaşılan arşivden.', features: ['Çerçeve kapak düzeni', 'Boydan boya çalışma yüzeyi', 'Üst dolap depolaması'] },
    { id: 'iki-ton-mutfak', title: 'İki ton, tek bir bütün.', category: 'mutfak', images: ['r18'], status: 'work', subtitle: 'İki renkli mutfak uygulaması', description: 'Açık üst dolaplar ile yeşil tonlu alt kapakların bir araya geldiği mutfak. Fotoğrafta görünen tasarım dili, yeni ölçülere göre değerlendirilir.', features: ['İki renkli kapak yaklaşımı', 'Cam detaylı üst dolaplar', 'Siyah kulp vurguları'] },
    { id: 'kemerli-kahve-kosesi', title: 'Günün en güzel molası.', category: 'kahve-kosesi', images: ['r07'], status: 'work', subtitle: 'Kemer detaylı kahve köşesi', description: 'Ortada açık raflar, iki yanda cam kapaklı vitrinler. Aydınlatma ve servis yüzeyi kahve köşesinin ritmini tamamlıyor.', features: ['Kemer detaylı açık alan', 'Cam kapaklı yan vitrinler', 'Çekmeceli alt depolama'] },
    { id: 'amber-kahve-kosesi', title: 'Bir fincana ayrılan yer.', category: 'kahve-kosesi', images: ['r06'], status: 'work', subtitle: 'Vitrinli kahve ve servis köşesi', description: 'Cam kapaklar ve sıcak aydınlatmayla tanımlanan kahve alanı. Ekipman yerleşimi ve depolama ihtiyacı üzerinden uyarlanabilir.', features: ['Aydınlatmalı vitrin', 'Kahve ekipmanı için yüzey', 'Kapalı alt dolaplar'] },
    { id: 'vitrinli-servis-unitesi', title: 'Sergilemek de bir işlev.', category: 'kahve-kosesi', images: ['r14', 'r08'], status: 'work', subtitle: 'Cam vitrinli servis ünitesi', description: 'Üstte vitrin, altta kapalı depolama ve arada servis yüzeyi. Arşivdeki iki görünüm, ışık ve kullanım ayrıntılarını gösteriyor.', features: ['Cam üst dolaplar', 'Dikey çizgili arkalık', 'Geniş servis yüzeyi'] },
    { id: 'cizgili-gardirop', title: 'Düzenin ince çizgisi.', category: 'gardrop', images: ['r02'], status: 'work', subtitle: 'Çizgili kapaklı gardırop', description: 'Dikey kapak çizgileri, açık raflar ve yan çalışma yüzeyinin birlikte düşünüldüğü dolap uygulaması.', features: ['Dikey çizgili kapaklar', 'Açık raf ve kapalı depolama', 'Yan çalışma alanı'] },
    { id: 'klasik-gardirop', title: 'Sessiz, dengeli, yerli yerinde.', category: 'gardrop', images: ['r01'], status: 'work', subtitle: 'Çerçeve kapaklı gardırop', description: 'Dengeli kapak oranları ve alt çekmecelerle hazırlanmış gardırop. Yeni alanınız için ölçü, donanım ve iç düzen ayrıca çalışılır.', features: ['Çerçeve kapaklar', 'Alt çekmece grubu', 'Koyu renk kulplar'] },
    { id: 'cam-kapak-giyinme', title: 'Düzen, görünür olduğunda.', category: 'gardrop', images: ['r04'], status: 'work', subtitle: 'Cam kapaklı köşe giyinme alanı', description: 'Köşe planına yerleşen koyu çerçeveli cam kapak sistemi. Kullanım biçimine göre raf ve askı düzeni birlikte değerlendirilir.', features: ['Köşeyi kullanan yerleşim', 'Cam kapak sistemi', 'İç raf ve askı alanları'] },
    { id: 'rafli-depolama', title: 'Her parçaya bir yer.', category: 'vestiyer', images: ['r05'], status: 'work', subtitle: 'Açık raflı depolama çalışması', description: 'Askı, raf ve çekmecelerin birlikte çözüldüğü depolama çalışması. Antre veya farklı bir kullanım alanına uyarlama, ölçü ve ihtiyaç üzerinden değerlendirilir.', features: ['Açık raf düzeni', 'Askı bölmeleri', 'Çekmeceli depolama'] },
    { id: 'isikli-tv-unitesi', title: 'Yaşam alanının odak noktası.', category: 'tv-unitesi', images: ['r22'], status: 'work', subtitle: 'Aydınlatmalı TV ve raf ünitesi', description: 'Merkezde TV paneli, iki yanda farklı raf düzenleri ve altta depolama. Dolaylı aydınlatma bütün kompozisyonu bir araya getiriyor.', features: ['Merkez panel düzeni', 'Aydınlatmalı açık raflar', 'Kapaklı alt depolama'] },
    { id: 'ahsap-bahce-kamelyasi', title: 'Dışarıda bir yaşam alanı.', category: 'pergola', images: ['r19', 'r23'], status: 'work', subtitle: 'Ahşap kamelya ve uygulama detayları', description: 'Ahşap taşıyıcılar, çatı ve korkuluklarıyla açık alan çalışması. Paylaşılan fotoğraflar uygulama sırasındaki sahadan görünüşleri de içerir.', features: ['Ahşap çatı strüktürü', 'Çapraz korkuluk detayları', 'Sahada uygulama'] },
    { id: 'yatak-cevresi-depolama', title: 'Odaya göre düşünülmüş.', category: 'ozel-tasarim', images: ['r09'], status: 'work', subtitle: 'Yatak çevresi dolap uygulaması', description: 'Yatak çevresini depolama alanına dönüştüren, düşey ve yatay dolapların birlikte yer aldığı özel çalışma.', features: ['Yatak çevresi yerleşim', 'Üst dolap alanı', 'Yan depolama bölmeleri'] },
    { id: 'mutfak-kurulum-asamasi', title: 'Görünmeyen emeğin bir anı.', category: 'mutfak', images: ['r12'], status: 'process', subtitle: 'Mutfak montaj aşaması', description: 'Koruyucu filmler ve devam eden kurulum fotoğrafta görünür. Bu, bitmiş mutfağın son çekimi değildir. Kapakların nihai rengi koruyucu filmden çıkarılamaz.', features: ['Sahada dolap yerleşimi', 'Koruyucu filmli yüzeyler', 'Devam eden kurulum'] },
    { id: 'klasik-mutfak-kurulumu', title: 'Bir mutfağın şekillendiği an.', category: 'mutfak', images: ['r15'], status: 'process', subtitle: 'Klasik mutfak kurulum görüntüsü', description: 'Dolaplar yerleşmiş, tezgâh ve cihaz alanlarında hazırlığın sürdüğü bir arşiv görüntüsü. Tamamlanmış teslim fotoğrafı olarak sunulmaz.', features: ['Cam detaylı üst dolap', 'Alt dolap yerleşimi', 'Kurulum hazırlığı'] },
];
exports.featuredWorks = ['sade-kose-mutfak', 'isikli-tv-unitesi', 'kemerli-kahve-kosesi', 'rafli-depolama', 'cam-kapak-giyinme', 'ahsap-bahce-kamelyasi'];
exports.concepts = [
    { id: 'oval-orta-sehpa', title: 'Bir araya gelmenin doğal hâli.', category: 'sehpa', image: 'concept-sehpa', subtitle: 'Oval orta sehpa ve zigon fikri' },
    { id: 'kahve-ritueli', title: 'Kendinize küçük bir köşe.', category: 'kahve-kosesi', image: 'concept-kahve', subtitle: 'Işıklı vitrin ve kahve köşesi fikri' },
    { id: 'sakin-antre', title: 'Eve ilk adım.', category: 'vestiyer', image: 'concept-vestiyer', subtitle: 'Banklı ve aynalı vestiyer fikri' },
    { id: 'yasam-duvari', title: 'Salonun bütününü düşünmek.', category: 'tv-unitesi', image: 'concept-tv', subtitle: 'Panel ve TV ünitesi fikri' },
    { id: 'evin-kalbi', title: 'Evin kalbinde.', category: 'mutfak', image: 'concept-mutfak', subtitle: 'Açık tonlu mutfak fikri' },
    { id: 'duzenli-bir-alan', title: 'Düzen için tasarlanmış.', category: 'gardrop', image: 'concept-gardrop', subtitle: 'Cam ve çizgili kapaklarla giyinme fikri' },
    { id: 'bahcede-zaman', title: 'Gölgesinde güzel zamanlar.', category: 'pergola', image: 'concept-pergola', subtitle: 'Ahşap kamelya fikri' },
    { id: 'bir-masanin-etrafinda', title: 'Bir masanın etrafında.', category: 'ozel-tasarim', image: 'concept-hero', subtitle: 'Ahşap yemek alanı fikri' },
];
exports.pinterestReferences = [
    { id: '3T8k8Pwyv', group: 'atelier', title: 'Ustanın seçkisi 01', category: 'ozel-tasarim' },
    { id: '2lc0S9lQO', group: 'atelier', title: 'Ustanın seçkisi 02', category: 'ozel-tasarim' },
    { id: '41JsOJFNf', group: 'atelier', title: 'Ustanın seçkisi 03', category: 'ozel-tasarim' },
    { id: '46g1kWzDY', group: 'atelier', title: 'Vestiyer seçkisi 01', category: 'vestiyer' },
    { id: '5Wc0LnUYw', group: 'atelier', title: 'Vestiyer seçkisi 02', category: 'vestiyer' },
    { id: '1CZAqZl4m', group: 'atelier', title: 'Vestiyer seçkisi 03', category: 'vestiyer' },
    { id: '601hk2fV2', group: 'atelier', title: 'Vestiyer seçkisi 04', category: 'vestiyer' },
    { id: '80Ac59zMm', group: 'atelier', title: 'Ustanın seçkisi 04', category: 'ozel-tasarim' },
    { id: '484Ae4eNQ', group: 'shared', title: 'Birlikte seçtiklerimiz 01', category: 'ozel-tasarim' },
    { id: '5mqOqX5LH', group: 'shared', title: 'Birlikte seçtiklerimiz 02', category: 'ozel-tasarim' },
    { id: '5i4CyJrkM', group: 'shared', title: 'Birlikte seçtiklerimiz 03', category: 'ozel-tasarim' },
    { id: '1pLUfH5pe', group: 'shared', title: 'Birlikte seçtiklerimiz 04', category: 'ozel-tasarim' },
];
exports.mainNavigation = [['/', 'Anasayfa'], ['/hakkimizda', 'Hakkımızda'], ['/projeler', 'Bitirdiğimiz İşler'], ['/kategoriler', 'Kategoriler'], ['/ilham-modelleri', 'İlham Modelleri'], ['/ozel-uretim', 'Özel Üretim'], ['/atolye', 'Atölye'], ['/iletisim', 'İletişim']];
function categoryName(id) { return exports.workCategories.find(c => c.id === id)?.name || 'Özel Tasarım'; }
function modelHref(ref, category = 'ozel-tasarim', note = '') { return '/modelini-getir?' + new URLSearchParams({ ref, kategori: category, fikir: note }).toString(); }

},"src/lib/model-request":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeReference = normalizeReference;
exports.modelInputError = modelInputError;
exports.modelSummary = modelSummary;
/** User supplied references are strings only. Never fetched from the preview. */
function normalizeReference(raw) {
    const value = String(raw || '').trim();
    if (!value || value.length > 2000 || /[\u0000-\u0020\\]/.test(value))
        return null;
    try {
        const u = new URL(value), host = u.hostname.toLowerCase().replace(/\.$/, '');
        if (u.protocol !== 'https:' || u.username || u.password || !host.includes('.'))
            return null;
        if (host === 'localhost' || host.endsWith('.localhost') || host.endsWith('.local') || host.endsWith('.internal') || host.includes(':') || /^\d+\./.test(host))
            return null;
        return u.href;
    }
    catch {
        return null;
    }
}
function modelInputError(v) {
    if (v.url.trim() && !normalizeReference(v.url))
        return 'Geçerli bir HTTPS model bağlantısı ekleyin. Özel ağ adresleri kabul edilmez.';
    if (!v.url.trim() && v.note.trim().length < 5 && !v.files.length)
        return 'Bir model bağlantısı, en az bir görsel veya en az 5 karakterlik bir açıklama ekleyin.';
    return null;
}
function modelSummary(v, files) {
    return ['ELİF TASARIM / KENDİ MODELİM', 'Bu özet atölyeye gönderilmedi. Kesin teklif veya sipariş değildir.', '',
        'İhtiyaç, ' + (v.category || 'Birlikte karar verelim'),
        'Model bağlantısı, ' + (normalizeReference(v.url) || 'Eklenmedi'),
        'Model / proje notu, ' + (v.note.trim() || 'Görseller üzerinden değerlendirelim'),
        'Yaklaşık ölçü, ' + (v.dimensions.trim() || 'Birlikte ölçelim'),
        'Uygulama bölgesi, ' + (v.district.trim() || 'Görüşmede paylaşılacak'),
        'Zaman beklentisi, ' + (v.timing.trim() || 'Birlikte planlayalım'),
        'Tasarım yaklaşımı, ' + v.interpretation,
        'Görseller, ' + (files.join(', ') || 'Eklenmedi'), '', 'Görsel dosyaları bu metne eklenmez. Görüşmede ayrıca paylaşın.',
        'Ölçü, malzeme, üretilebilirlik ve tasarımın uygunluğu atölyede değerlendirilir.'].join('\n');
}

},"src/lib/pinterest":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pinLookup = void 0;
exports.pinLookup = { "3T8k8Pwyv": { "canonical": "https://www.pinterest.com/pin/658792251715145444/", "label": "Ahşap mutfak ve çalışma tezgâhı" }, "2lc0S9lQO": { "canonical": "https://www.pinterest.com/pin/658792251714980037/", "label": "Klasik mutfak çizgileri" }, "41JsOJFNf": { "canonical": "https://www.pinterest.com/pin/658792251714434775/", "label": "Açık ton mutfak dolapları" }, "46g1kWzDY": { "canonical": "https://www.pinterest.com/pin/70791025388671144/", "label": "Kemerli depolama fikri" }, "5Wc0LnUYw": { "canonical": "https://www.pinterest.com/pin/73535406412559094/", "label": "Dresuar ve ayna birlikteliği" }, "1CZAqZl4m": { "canonical": "https://www.pinterest.com/pin/792915078189753441/", "label": "Beyaz gardırop fikri" }, "601hk2fV2": { "canonical": "https://www.pinterest.com/pin/862720872413051138/", "label": "Kompakt depolama çözümleri" }, "80Ac59zMm": { "canonical": "https://www.pinterest.com/pin/1086423110144415109/", "label": "Giyinme ve çalışma alanı" }, "484Ae4eNQ": { "canonical": "https://www.pinterest.com/pin/876583514994336197/", "label": "Ahşap plak ve kayıt konsolu" }, "5mqOqX5LH": { "canonical": "https://www.pinterest.com/pin/918945498989084139/", "label": "Yuvarlak yan sehpa" }, "5i4CyJrkM": { "canonical": "https://www.pinterest.com/pin/1090293391084521210/", "label": "Ahşap makyaj ve depolama ünitesi" }, "1pLUfH5pe": { "canonical": "https://www.pinterest.com/pin/1098737640376584104/", "label": "Çekmeceli dekoratif konsol" } };

},"src/lib/routes":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routePaths = void 0;
exports.pageTitle = pageTitle;
const portfolio_1 = require("./portfolio");
const data_1 = require("./data");
exports.routePaths = ['/projeler', '/kategoriler', '/ilham-modelleri', '/modelini-getir', '/hakkimizda', '/atolye', ...portfolio_1.works.map(w => '/proje/' + w.id), ...portfolio_1.workCategories.map(c => '/kategoriler/' + c.id), '/', '/urunler', '/tasarim-masasi', '/atolyemiz', '/ozel-uretim', '/malzemeler', '/mekan-fikirleri', '/rehber', '/teklif-al', '/sikca-sorulan-sorular', '/iletisim', '/sepet', '/odeme', '/calisma-dosyam', '/gizlilik', '/atolye-demolari', ...data_1.products.map(p => '/urun/' + p.id), ...data_1.ideas.map(p => '/mekan-fikirleri/' + p.id), ...data_1.journal.map(p => '/rehber/' + p.id)];
function pageTitle(path) { const p = path.split('?')[0]; const w = portfolio_1.works.find(w => '/proje/' + w.id === p); if (w)
    return w.subtitle + ' | Elif Tasarım'; const c = portfolio_1.workCategories.find(c => '/kategoriler/' + c.id === p); if (c)
    return c.name + ' | Elif Tasarım'; const newTitles = { '/projeler': 'Bitirdiğimiz İşler', '/kategoriler': 'Kategoriler', '/ilham-modelleri': 'İlham Modelleri', '/modelini-getir': 'Kendi Modelinizi Getirin', '/hakkimizda': 'Aileden Gelen Ustalık', '/atolye': 'Atölye' }; if (newTitles[p])
    return newTitles[p] + ' | Elif Tasarım'; if (p === '/tasarim-masasi')
    return 'Tasarım Masası | Elif Tasarım'; const product = data_1.products.find(x => '/urun/' + x.id === p); const article = data_1.journal.find(x => '/rehber/' + x.id === p); const idea = data_1.ideas.find(x => '/mekan-fikirleri/' + x.id === p); return product ? product.name + ' | Elif Tasarım' : article ? article.title + ' | Elif Tasarım' : idea ? idea.name + ' | Elif Tasarım' : { '/': 'Elif Tasarım | El Yapımı Mobilya Atölyesi', '/urunler': 'Koleksiyon | Elif Tasarım', '/teklif-al': 'Özel Ölçü Stüdyosu | Elif Tasarım', '/atolyemiz': 'Atölyemiz | Elif Tasarım', '/malzemeler': 'Malzeme Kütüphanesi | Elif Tasarım', '/sepet': 'Örnek Sepet | Elif Tasarım', '/odeme': 'Sipariş Hazırlığı | Elif Tasarım', '/iletisim': 'İletişim | Elif Tasarım', '/rehber': 'Atölye Notları | Elif Tasarım', '/ozel-uretim': 'Özel Üretim | Elif Tasarım', '/mekan-fikirleri': 'Mekân Fikirleri | Elif Tasarım', '/calisma-dosyam': 'Kaydedilenler | Elif Tasarım', '/gizlilik': 'Önizleme Gizliliği | Elif Tasarım', '/sikca-sorulan-sorular': 'Sorular | Elif Tasarım', '/atolye-demolari': 'Atölye İş Akışı Demosu | Elif Tasarım' }[p] || 'Sayfa bulunamadı | Elif Tasarım'; }

},"src/lib/image-manifest":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageManifest = void 0;
exports.imageManifest = {
    "concept-hero": {
        "kind": "concept",
        "width": 1672,
        "height": 941,
        "variants": [
            {
                "file": "concept-hero-480.webp",
                "width": 480,
                "height": 270,
                "bytes": 35402
            },
            {
                "file": "concept-hero-800.webp",
                "width": 800,
                "height": 450,
                "bytes": 84460
            },
            {
                "file": "concept-hero-full.webp",
                "width": 1672,
                "height": 941,
                "bytes": 267224
            }
        ],
        "source": "sıcak_işıklı_modern_i_skandinav_yemek_alanı.png",
        "sourceSha256": "0680ba46833f7b6594dee5089ff0e89e5314a3c252a7f37ac9bdb2100af4b866",
        "crop": null
    },
    "concept-mutfak": {
        "kind": "concept",
        "width": 1448,
        "height": 1086,
        "variants": [
            {
                "file": "concept-mutfak-480.webp",
                "width": 480,
                "height": 360,
                "bytes": 34596
            },
            {
                "file": "concept-mutfak-800.webp",
                "width": 800,
                "height": 600,
                "bytes": 77636
            },
            {
                "file": "concept-mutfak-full.webp",
                "width": 1448,
                "height": 1086,
                "bytes": 182066
            }
        ],
        "source": "güneşli_modern_mutfak_ve_yemek_köşesi.png",
        "sourceSha256": "8a1eeb595a7f167ea92e854911f5bd71e167c9a7712c2f87347aa221305dcd2f",
        "crop": null
    },
    "concept-tv": {
        "kind": "concept",
        "width": 1448,
        "height": 1086,
        "variants": [
            {
                "file": "concept-tv-480.webp",
                "width": 480,
                "height": 360,
                "bytes": 37858
            },
            {
                "file": "concept-tv-800.webp",
                "width": 800,
                "height": 600,
                "bytes": 85868
            },
            {
                "file": "concept-tv-full.webp",
                "width": 1448,
                "height": 1086,
                "bytes": 202748
            }
        ],
        "source": "sıcak_tonlarda_modern_minimalist_salon.png",
        "sourceSha256": "271f91df515e9554ccd3ac260a9fbecc72d7276626101d476db1751e0cda194b",
        "crop": null
    },
    "concept-kahve": {
        "kind": "concept",
        "width": 1448,
        "height": 1086,
        "variants": [
            {
                "file": "concept-kahve-480.webp",
                "width": 480,
                "height": 360,
                "bytes": 38296
            },
            {
                "file": "concept-kahve-800.webp",
                "width": 800,
                "height": 600,
                "bytes": 81620
            },
            {
                "file": "concept-kahve-full.webp",
                "width": 1448,
                "height": 1086,
                "bytes": 188928
            }
        ],
        "source": "gün_işığında_lüks_kahve_köşesi.png",
        "sourceSha256": "996cd88012aa63c3a4f60e5c5b11889c63ce8443a1d78763b6e1e463e6f4e736",
        "crop": null
    },
    "concept-vestiyer": {
        "kind": "concept",
        "width": 1448,
        "height": 1086,
        "variants": [
            {
                "file": "concept-vestiyer-480.webp",
                "width": 480,
                "height": 360,
                "bytes": 38592
            },
            {
                "file": "concept-vestiyer-800.webp",
                "width": 800,
                "height": 600,
                "bytes": 94606
            },
            {
                "file": "concept-vestiyer-full.webp",
                "width": 1448,
                "height": 1086,
                "bytes": 253932
            }
        ],
        "source": "sıcak_minimalist_modern_antre.png",
        "sourceSha256": "3e45146ace9a5d9d405dda5b21270b1d27b6931d620af5344bb73935a0c0e5c6",
        "crop": null
    },
    "concept-gardrop": {
        "kind": "concept",
        "width": 1448,
        "height": 1086,
        "variants": [
            {
                "file": "concept-gardrop-480.webp",
                "width": 480,
                "height": 360,
                "bytes": 36048
            },
            {
                "file": "concept-gardrop-800.webp",
                "width": 800,
                "height": 600,
                "bytes": 89510
            },
            {
                "file": "concept-gardrop-full.webp",
                "width": 1448,
                "height": 1086,
                "bytes": 234180
            }
        ],
        "source": "lüks_sıcak_tonlu_giyinme_odası.png",
        "sourceSha256": "b0665a9afd5085da7a12c778099632ef9870460fd7095568ae2ec5eb01070e89",
        "crop": null
    },
    "concept-sehpa": {
        "kind": "concept",
        "width": 1448,
        "height": 1086,
        "variants": [
            {
                "file": "concept-sehpa-480.webp",
                "width": 480,
                "height": 360,
                "bytes": 50804
            },
            {
                "file": "concept-sehpa-800.webp",
                "width": 800,
                "height": 600,
                "bytes": 116046
            },
            {
                "file": "concept-sehpa-full.webp",
                "width": 1448,
                "height": 1086,
                "bytes": 271470
            }
        ],
        "source": "sıcak_tonlarda_modern_salon_ve_ahşap_masalar.png",
        "sourceSha256": "23e37e8da07796b6f6bbe027edf8a552387a7f3c5c99d8d524f2b0992c188d3e",
        "crop": null
    },
    "concept-pergola": {
        "kind": "concept",
        "width": 1448,
        "height": 1086,
        "variants": [
            {
                "file": "concept-pergola-480.webp",
                "width": 480,
                "height": 360,
                "bytes": 73142
            },
            {
                "file": "concept-pergola-800.webp",
                "width": 800,
                "height": 600,
                "bytes": 185250
            },
            {
                "file": "concept-pergola-full.webp",
                "width": 1448,
                "height": 1086,
                "bytes": 480732
            }
        ],
        "source": "altın_saatte_ahşap_bahçe_pergolası.png",
        "sourceSha256": "a188dd13d5d44344b532ced1eda9fdbc400b0e32ea62ee669c0abb9748aa374b",
        "crop": null
    },
    "concept-model": {
        "kind": "concept",
        "width": 1448,
        "height": 1086,
        "variants": [
            {
                "file": "concept-model-480.webp",
                "width": 480,
                "height": 360,
                "bytes": 62570
            },
            {
                "file": "concept-model-800.webp",
                "width": 800,
                "height": 600,
                "bytes": 140990
            },
            {
                "file": "concept-model-full.webp",
                "width": 1448,
                "height": 1086,
                "bytes": 320256
            }
        ],
        "source": "sıcak_işıklı_mobilya_tasarım_atölyesi.png",
        "sourceSha256": "4ad1390a178c3a996ebe541625c861c8e9c54b8eee87d31040808a11311fd81a",
        "crop": null
    },
    "r01": {
        "kind": "work",
        "width": 1079,
        "height": 1440,
        "variants": [
            {
                "file": "r01-480.webp",
                "width": 480,
                "height": 641,
                "bytes": 23294
            },
            {
                "file": "r01-800.webp",
                "width": 800,
                "height": 1068,
                "bytes": 52176
            },
            {
                "file": "r01-full.webp",
                "width": 1079,
                "height": 1440,
                "bytes": 83128
            }
        ],
        "source": "R01.jpg",
        "sourceSha256": "071098a29578638c875a45cff61faa336658c1757e7671803cf331f61eaa2645",
        "crop": null
    },
    "r02": {
        "kind": "work",
        "width": 1079,
        "height": 1440,
        "variants": [
            {
                "file": "r02-480.webp",
                "width": 480,
                "height": 641,
                "bytes": 40398
            },
            {
                "file": "r02-800.webp",
                "width": 800,
                "height": 1068,
                "bytes": 83840
            },
            {
                "file": "r02-full.webp",
                "width": 1079,
                "height": 1440,
                "bytes": 118050
            }
        ],
        "source": "R02.jpg",
        "sourceSha256": "48f175f475cea3b88e37a872ea0f4fe0e2aafe11459ecf134a4f9db6da11fa19",
        "crop": null
    },
    "r04": {
        "kind": "work",
        "width": 1079,
        "height": 1080,
        "variants": [
            {
                "file": "r04-480.webp",
                "width": 480,
                "height": 480,
                "bytes": 15610
            },
            {
                "file": "r04-800.webp",
                "width": 800,
                "height": 801,
                "bytes": 30262
            },
            {
                "file": "r04-full.webp",
                "width": 1079,
                "height": 1080,
                "bytes": 43638
            }
        ],
        "source": "R04.jpg",
        "sourceSha256": "a4a653f72a30e49b26bffb20b69c6be6ca6ca445e7ed269ae0f529cedd6936c9",
        "crop": null
    },
    "r05": {
        "kind": "work",
        "width": 1080,
        "height": 1428,
        "variants": [
            {
                "file": "r05-480.webp",
                "width": 480,
                "height": 635,
                "bytes": 30658
            },
            {
                "file": "r05-800.webp",
                "width": 800,
                "height": 1058,
                "bytes": 60676
            },
            {
                "file": "r05-full.webp",
                "width": 1080,
                "height": 1428,
                "bytes": 91992
            }
        ],
        "source": "R05.jpg",
        "sourceSha256": "9f3a93c92fcba331e704ce28126e1a21ccf6865be85143ba16d39dc8a0ce3766",
        "crop": null
    },
    "r06": {
        "kind": "work",
        "width": 823,
        "height": 1350,
        "variants": [
            {
                "file": "r06-480.webp",
                "width": 480,
                "height": 787,
                "bytes": 44334
            },
            {
                "file": "r06-800.webp",
                "width": 800,
                "height": 1312,
                "bytes": 79832
            },
            {
                "file": "r06-full.webp",
                "width": 823,
                "height": 1350,
                "bytes": 83534
            }
        ],
        "source": "R06.jpg",
        "sourceSha256": "652b6b482b7861bfdada37c65b0146fd4e4a5b3f3c5c8735d1745dab3e02947a",
        "crop": null
    },
    "r07": {
        "kind": "work",
        "width": 1079,
        "height": 1439,
        "variants": [
            {
                "file": "r07-480.webp",
                "width": 480,
                "height": 640,
                "bytes": 46082
            },
            {
                "file": "r07-800.webp",
                "width": 800,
                "height": 1067,
                "bytes": 107998
            },
            {
                "file": "r07-full.webp",
                "width": 1079,
                "height": 1439,
                "bytes": 168522
            }
        ],
        "source": "R07.jpg",
        "sourceSha256": "9b5716c5eddd566a6eb7255f33c9578129230d3ef4e5748dd6f30c4a51839dff",
        "crop": null
    },
    "r08": {
        "kind": "work",
        "width": 861,
        "height": 1314,
        "variants": [
            {
                "file": "r08-480.webp",
                "width": 480,
                "height": 733,
                "bytes": 29284
            },
            {
                "file": "r08-800.webp",
                "width": 800,
                "height": 1221,
                "bytes": 54018
            },
            {
                "file": "r08-full.webp",
                "width": 861,
                "height": 1314,
                "bytes": 59970
            }
        ],
        "source": "R08.jpg",
        "sourceSha256": "1a109c1bc5e30a0bcdc26294b5d64cdcc63d028077ff0dfbfcdeae8850ba9006",
        "crop": null
    },
    "r09": {
        "kind": "work",
        "width": 1080,
        "height": 1729,
        "variants": [
            {
                "file": "r09-480.webp",
                "width": 480,
                "height": 768,
                "bytes": 31050
            },
            {
                "file": "r09-800.webp",
                "width": 800,
                "height": 1281,
                "bytes": 56974
            },
            {
                "file": "r09-full.webp",
                "width": 1080,
                "height": 1729,
                "bytes": 79596
            }
        ],
        "source": "R09.jpg",
        "sourceSha256": "546c6545382fe5718f0d1e7903d2fd0ab8aae29b580ae24faebc6e21bea35efb",
        "crop": null
    },
    "r10": {
        "kind": "work",
        "width": 1079,
        "height": 1440,
        "variants": [
            {
                "file": "r10-480.webp",
                "width": 480,
                "height": 641,
                "bytes": 35954
            },
            {
                "file": "r10-800.webp",
                "width": 800,
                "height": 1068,
                "bytes": 76774
            },
            {
                "file": "r10-full.webp",
                "width": 1079,
                "height": 1440,
                "bytes": 122484
            }
        ],
        "source": "R10.jpg",
        "sourceSha256": "d187cdcdcd411217fef1d89cce023b71c7036a1b3162e3cc56cff3593079ec9e",
        "crop": null
    },
    "r12": {
        "kind": "process",
        "width": 2040,
        "height": 1530,
        "variants": [
            {
                "file": "r12-480.webp",
                "width": 480,
                "height": 360,
                "bytes": 13570
            },
            {
                "file": "r12-800.webp",
                "width": 800,
                "height": 600,
                "bytes": 28730
            },
            {
                "file": "r12-full.webp",
                "width": 2040,
                "height": 1530,
                "bytes": 111350
            }
        ],
        "source": "R12.jpg",
        "sourceSha256": "6e9ad2f285b609249acda6c9ba0da1d17c786d2686a2ba9efbb3a92ae33ceb75",
        "crop": null
    },
    "r13": {
        "kind": "work",
        "width": 1448,
        "height": 1086,
        "variants": [
            {
                "file": "r13-480.webp",
                "width": 480,
                "height": 360,
                "bytes": 17440
            },
            {
                "file": "r13-800.webp",
                "width": 800,
                "height": 600,
                "bytes": 41434
            },
            {
                "file": "r13-full.webp",
                "width": 1448,
                "height": 1086,
                "bytes": 104746
            }
        ],
        "source": "R13.jpg",
        "sourceSha256": "884f0ee81c7732ea226919fa1be4e1e5defa3cb815a6e2fe67017de6027d6ea7",
        "crop": null
    },
    "r14": {
        "kind": "work",
        "width": 910,
        "height": 1440,
        "variants": [
            {
                "file": "r14-480.webp",
                "width": 480,
                "height": 760,
                "bytes": 40776
            },
            {
                "file": "r14-800.webp",
                "width": 800,
                "height": 1266,
                "bytes": 80270
            },
            {
                "file": "r14-full.webp",
                "width": 910,
                "height": 1440,
                "bytes": 94978
            }
        ],
        "source": "R14.jpg",
        "sourceSha256": "e0d3fc4067ec59b092e8948338f66613fa46c9a74c605b292c8ffd8a8a37453f",
        "crop": null
    },
    "r15": {
        "kind": "process",
        "width": 1079,
        "height": 1440,
        "variants": [
            {
                "file": "r15-480.webp",
                "width": 480,
                "height": 641,
                "bytes": 33082
            },
            {
                "file": "r15-800.webp",
                "width": 800,
                "height": 1068,
                "bytes": 64816
            },
            {
                "file": "r15-full.webp",
                "width": 1079,
                "height": 1440,
                "bytes": 91250
            }
        ],
        "source": "R15.jpg",
        "sourceSha256": "cb47c7fa8b81eb98d9830ae36c08e978f344d01c4c260435401582d6d6809623",
        "crop": null
    },
    "r18": {
        "kind": "work",
        "width": 1079,
        "height": 1440,
        "variants": [
            {
                "file": "r18-480.webp",
                "width": 480,
                "height": 641,
                "bytes": 35726
            },
            {
                "file": "r18-800.webp",
                "width": 800,
                "height": 1068,
                "bytes": 85046
            },
            {
                "file": "r18-full.webp",
                "width": 1079,
                "height": 1440,
                "bytes": 128106
            }
        ],
        "source": "R18.jpg",
        "sourceSha256": "9c1d8ca4bece318b9953103239d4c060f24f265cea8b2d605a80023177a5331f",
        "crop": null
    },
    "r19": {
        "kind": "work",
        "width": 2048,
        "height": 1536,
        "variants": [
            {
                "file": "r19-480.webp",
                "width": 480,
                "height": 360,
                "bytes": 50808
            },
            {
                "file": "r19-800.webp",
                "width": 800,
                "height": 600,
                "bytes": 128320
            },
            {
                "file": "r19-full.webp",
                "width": 2048,
                "height": 1536,
                "bytes": 574344
            }
        ],
        "source": "R19.jpg",
        "sourceSha256": "210dd5ee59f592bb6712fc7df49e14d30060adcd3c63b3e4b29894f5e13d7003",
        "crop": null
    },
    "r22": {
        "kind": "work",
        "width": 1086,
        "height": 1448,
        "variants": [
            {
                "file": "r22-480.webp",
                "width": 480,
                "height": 640,
                "bytes": 31244
            },
            {
                "file": "r22-800.webp",
                "width": 800,
                "height": 1067,
                "bytes": 73112
            },
            {
                "file": "r22-full.webp",
                "width": 1086,
                "height": 1448,
                "bytes": 122232
            }
        ],
        "source": "R22.jpg",
        "sourceSha256": "a731d0d6f3af63adeeef50b88c0ebe3b26e9f19aa8c75799325c3431f189cf81",
        "crop": null
    },
    "r23": {
        "kind": "work",
        "width": 2048,
        "height": 1536,
        "variants": [
            {
                "file": "r23-480.webp",
                "width": 480,
                "height": 360,
                "bytes": 51528
            },
            {
                "file": "r23-800.webp",
                "width": 800,
                "height": 600,
                "bytes": 118898
            },
            {
                "file": "r23-full.webp",
                "width": 2048,
                "height": 1536,
                "bytes": 480134
            }
        ],
        "source": "R23.jpg",
        "sourceSha256": "371aef8b146af29a57e5f18fb740d0cf5ab38f6bfcf31a948fb132e9e25a4e64",
        "crop": null
    },
    "work-joinery": {
        "kind": "process",
        "width": 2048,
        "height": 876,
        "variants": [
            {
                "file": "work-joinery-480.webp",
                "width": 480,
                "height": 205,
                "bytes": 25248
            },
            {
                "file": "work-joinery-800.webp",
                "width": 800,
                "height": 342,
                "bytes": 54852
            },
            {
                "file": "work-joinery-full.webp",
                "width": 2048,
                "height": 876,
                "bytes": 214736
            }
        ],
        "source": "R23.jpg",
        "sourceSha256": "371aef8b146af29a57e5f18fb740d0cf5ab38f6bfcf31a948fb132e9e25a4e64",
        "crop": [
            0,
            0,
            2048,
            876
        ]
    }
};

}}); const cache={}; function resolve(id,from){if(!id.startsWith("."))return id; const a=from.split("/");a.pop();for(const part of id.split("/")){if(part==="..")a.pop();else if(part!==".")a.push(part);}return a.join("/").replace(/\.tsx?$/,"");}function load(id,from=""){id=resolve(id,from);if(cache[id])return cache[id].exports;if(!modules[id])throw new Error("Unknown module "+id);const m={exports:{}};cache[id]=m;modules[id](m,m.exports,x=>load(x,id));return m.exports;}load("src/main");})();
// Small cross-version presentation corrections, with no business or data changes.
const finish=document.createElement('style');finish.textContent='.v4-hero h1>span{color:inherit}@media(max-width:600px){.v4-heritage-copy h2>br:first-of-type{display:initial}}';document.head.appendChild(finish);
// Keep keyboard focus inside the active modal, including the last-to-first Tab edge.
document.addEventListener('keydown', function(event) {
  if (event.key !== 'Tab') return;
  var modal = document.querySelector('dialog[open]');
  if (!modal) return;
  var items = Array.from(modal.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])')).filter(function(el) { return el.getClientRects().length > 0; });
  if (!items.length) { event.preventDefault(); modal.focus(); return; }
  var first = items[0], last = items[items.length-1];
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
}, true);
