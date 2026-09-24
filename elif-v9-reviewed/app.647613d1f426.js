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
(function(){"use strict";const modules={"react":function(module,exports,require){
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
exports.createRoot=(root)=>({render:(node)=>require("react").render(node,root)});
},
"src/App":function(module,exports,require){
'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const ui_1 = require("./components/ui");
const Home_1 = require("./pages/Home");
const DesignDesk_1 = require("./pages/DesignDesk");
const Editorial_1 = require("./pages/Editorial");
const Portfolio_1 = require("./pages/Portfolio");
const BringModel_1 = require("./pages/BringModel");
const V7Pages_1 = require("./pages/V7Pages");
const portfolio_1 = require("./lib/portfolio");
const selections_1 = require("./lib/selections");
const project_1 = require("./lib/project");
const domain_1 = require("./lib/domain");
const routes_1 = require("./lib/routes");
const PortfolioUI_1 = require("./components/PortfolioUI");
const aliases = { '/urunler': '/kategoriler', '/sepet': '/modelini-getir', '/odeme': '/modelini-getir', '/atolye-demolari': '/atolye', '/atolyemiz': '/hakkimizda', '/mekan-fikirleri': '/ilham-modelleri' };
function normalizePath(p) { const [route, qs] = p.split('?'); if (route.startsWith('/urun/'))
    return '/kategoriler'; if (route.startsWith('/mekan-fikirleri/'))
    return '/ilham-modelleri'; return aliases[route] || p; }
class App extends react_1.Component {
    constructor() {
        super(...arguments);
        this.state = { path: this.props.initialPath || '/', scrolled: false, favorites: [], remember: false, menu: false, search: false, searchQuery: '', info: false, toast: '' };
        this.currentLocation = () => { const w = window; const hash = window.location.hash; if (hash.startsWith('#/'))
            return normalizePath(hash.slice(1)); if (w.__ELIF_PREVIEW__)
            return w.__ELIF_INITIAL__ || '/'; const base = w.__ELIF_BASE__ || '', path = window.location.pathname; return normalizePath((base && path.startsWith(base + '/') ? path.slice(base.length) : path).replace(/\/+$/, '') + window.location.search || '/'); };
        this.onLocation = () => this.setState({ path: this.currentLocation(), menu: false, search: false }, this.afterRoute);
        this.onScroll = () => { const scrolled = window.scrollY > 550; if (scrolled !== this.state.scrolled)
            this.setState({ scrolled }); };
        this.beforeUnload = (e) => { if ((0, project_1.hasPrivateDraft)()) {
            e.preventDefault();
            e.returnValue = '';
        } };
        this.afterRoute = () => { document.title = (0, routes_1.pageTitle)(this.state.path); document.querySelector('meta[name="description"]')?.setAttribute('content', (0, routes_1.pageDescription)(this.state.path)); document.querySelector('meta[property="og:title"]')?.setAttribute('content', (0, routes_1.pageTitle)(this.state.path)); document.querySelector('meta[property="og:description"]')?.setAttribute('content', (0, routes_1.pageDescription)(this.state.path)); const route = this.state.path.split('?')[0]; const url = window.__ELIF_SITE_URL__ || ''; document.querySelector('link[rel="canonical"]')?.setAttribute('href', url + (route === '/' ? '/' : route + '/')); window.scrollTo({ top: 0, behavior: 'instant' }); this.onScroll(); if (!(window.__ELIF_PREVIEW__)) {
            const p = new URLSearchParams(this.state.path.split('?')[1] || '');
            p.delete('ref');
            p.delete('fikir');
            history.replaceState({}, '', (0, domain_1.publicHref)(route + (p.size ? '?' + p.toString() : '')));
        } };
        this.navigate = (path) => { path = normalizePath(path); if (!path.startsWith('/') || path.startsWith('//'))
            path = '/'; if (path === this.state.path) {
            this.setState({ menu: false, search: false });
            return;
        } history.pushState({}, '', (0, domain_1.publicHref)(path)); this.setState({ path, menu: false, search: false, searchQuery: '' }, () => { this.afterRoute(); document.getElementById('main-content')?.focus({ preventScroll: true }); }); };
        this.notify = (toast) => { clearTimeout(this.timer); this.setState({ toast }); this.timer = setTimeout(() => this.setState({ toast: '' }), 5500); };
        this.persist = (ids, remember) => { try {
            if (remember)
                localStorage.setItem('elif-v7:selections', JSON.stringify({ ids: (0, selections_1.validSelectionIds)(ids), expires: Date.now() + 30 * 86400000 }));
            else
                localStorage.removeItem('elif-v7:selections');
            return true;
        }
        catch {
            return false;
        } };
        this.favorite = (id) => { if (!selections_1.selectionEntries.some(x => x.id === id))
            return; const exists = this.state.favorites.includes(id); if (!exists && this.state.favorites.length >= 24) {
            this.notify('İlham dosyanızda en fazla 24 seçim bulunabilir.');
            return;
        } const favorites = exists ? this.state.favorites.filter(x => x !== id) : [...this.state.favorites, id]; const ok = this.persist(favorites, this.state.remember); this.setState({ favorites, remember: ok ? this.state.remember : false }); this.notify(exists ? 'Seçiminiz ilham dosyanızdan çıkarıldı.' : 'İlham dosyanıza eklendi. ' + (this.state.remember && ok ? 'Bu cihazda 30 gün saklanır.' : 'Yalnız bu açık sekmede tutulur.')); };
        this.actions = () => ({ navigate: this.navigate, notify: this.notify, favorites: this.state.favorites, favorite: this.favorite, cart: [], addCart: () => { }, changeCart: () => { }, removeCart: () => { }, openInfo: () => this.setState({ info: true }) });
    }
    componentDidMount() { let favorites = [], remember = false; try {
        const raw = JSON.parse(localStorage.getItem('elif-v7:selections') || 'null');
        if (raw && raw.expires > Date.now()) {
            favorites = (0, selections_1.validSelectionIds)(raw.ids);
            remember = true;
        }
        else
            localStorage.removeItem('elif-v7:selections');
    }
    catch { } this.setState({ path: this.currentLocation(), favorites, remember }, this.afterRoute); window.addEventListener('hashchange', this.onLocation); window.addEventListener('popstate', this.onLocation); window.addEventListener('scroll', this.onScroll, { passive: true }); window.addEventListener('beforeunload', this.beforeUnload); document.getElementById('static-content')?.remove(); document.documentElement.dataset.appReady = 'true'; }
    componentWillUnmount() { window.removeEventListener('hashchange', this.onLocation); window.removeEventListener('popstate', this.onLocation); window.removeEventListener('scroll', this.onScroll); window.removeEventListener('beforeunload', this.beforeUnload); clearTimeout(this.timer); }
    renderPage() { const a = this.actions(), [p, qs = ''] = this.state.path.split('?'); if (p === '/')
        return (0, react_1.createElement)(Home_1.Home, { ...a }); if (p === '/arama')
        return (0, react_1.createElement)(V7Pages_1.SearchPage, { key: p, ...a, query: qs }); if (p === '/projeler')
        return (0, react_1.createElement)(Portfolio_1.Projects, { key: this.state.path, ...a, query: qs }); if (p.startsWith('/proje/')) {
        const w = portfolio_1.works.find(x => '/proje/' + x.id === p);
        if (w)
            return (0, react_1.createElement)(Portfolio_1.WorkDetail, { key: w.id, ...a, work: w });
    } if (p === '/kategoriler')
        return (0, react_1.createElement)(Portfolio_1.Categories, { ...a }); if (p.startsWith('/kategoriler/') && portfolio_1.workCategories.some(c => p === '/kategoriler/' + c.id))
        return (0, react_1.createElement)(Portfolio_1.Categories, { ...a, slug: p.split('/').pop() }); if (p === '/ilham-modelleri')
        return (0, react_1.createElement)(Portfolio_1.Inspiration, { ...a }); if (p === '/modelini-getir' || p === '/teklif-al')
        return (0, react_1.createElement)(BringModel_1.BringModel, { key: p, ...a, query: qs, advanced: p === '/teklif-al' }); if (p === '/hakkimizda' || p === '/atolye')
        return (0, react_1.createElement)(Portfolio_1.AboutAtelier, { ...a, atelier: p === '/atolye' }); if (p === '/tasarim-masasi')
        return (0, react_1.createElement)(DesignDesk_1.DesignDesk, { key: this.state.path, ...a, query: qs }); if (p === '/iletisim')
        return (0, react_1.createElement)(V7Pages_1.ContactV7, { ...a }); if (p === '/gizlilik')
        return (0, react_1.createElement)(V7Pages_1.PrivacyV7, { ...a }); if (p === '/malzemeler')
        return (0, react_1.createElement)(V7Pages_1.MaterialsV7, { ...a }); if (p === '/ozel-uretim')
        return (0, react_1.createElement)(Editorial_1.Bespoke, { ...a }); if (p === '/sikca-sorulan-sorular')
        return (0, react_1.createElement)(Editorial_1.FAQ, { ...a }); if (p === '/rehber' || p.startsWith('/rehber/'))
        return (0, react_1.createElement)(Editorial_1.Journal, { ...a, slug: p.split('/')[2] }); if (p === '/calisma-dosyam')
        return (0, react_1.createElement)(V7Pages_1.SavedBoard, { ...a, remember: this.state.remember, setRemember: remember => { const ok = this.persist(this.state.favorites, remember); this.setState({ remember: remember && ok }); if (!ok)
                this.notify('Tarayıcı kaydetmeye izin vermedi. Seçimler bu açık sekmede korunur.'); } }); return (0, react_1.createElement)("section", { className: "wrap empty-state missing-page" },
        (0, react_1.createElement)(ui_1.Eyebrow, null, "404 / B\u0130R YOL AYRIMI"),
        (0, react_1.createElement)("h1", null,
            "Bu sayfay\u0131",
            (0, react_1.createElement)("br", null),
            (0, react_1.createElement)("em", null, "bulamad\u0131k.")),
        (0, react_1.createElement)("p", null, "\u00C7al\u0131\u015Fmalar\u0131 ke\u015Ffedebilir veya kendi fikrinizle ba\u015Flayabilirsiniz."),
        (0, react_1.createElement)(ui_1.ButtonLink, { to: "/projeler", navigate: this.navigate }, "\u00C7al\u0131\u015Fmalar\u0131 ke\u015Ffet")); }
    render() {
        const s = this.state, a = this.actions(), nav = (to, label) => (0, react_1.createElement)(ui_1.Link, { key: to, to: to, navigate: this.navigate, "aria-current": s.path.split('?')[0] === to ? 'page' : undefined }, label);
        const results = selections_1.selectionEntries.filter(x => (0, domain_1.searchKey)(x.title + ' ' + (0, portfolio_1.categoryName)(x.category)).includes((0, domain_1.searchKey)(s.searchQuery))).slice(0, 8);
        return (0, react_1.createElement)(react_1.Fragment, null,
            (0, react_1.createElement)("a", { href: "#main-content", className: "skip-link", onClick: e => { e.preventDefault(); document.getElementById('main-content')?.focus(); } }, "\u0130\u00E7eri\u011Fe ge\u00E7"),
            (0, react_1.createElement)("div", { className: "preview-bar" },
                (0, react_1.createElement)("span", null,
                    "V9 / TASARIM \u00D6N\u0130ZLEMES\u0130 ",
                    (0, react_1.createElement)("i", null),
                    " Ger\u00E7ek i\u015F ar\u015Fivi, do\u011Frudan ileti\u015Fim"),
                (0, react_1.createElement)("button", { onClick: () => this.setState({ info: true }) },
                    "Bilgi ve tercihler ",
                    (0, react_1.createElement)(ui_1.Icon, { name: "info", size: 16 }))),
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
                        (0, react_1.createElement)(ui_1.Link, { to: "/calisma-dosyam", navigate: this.navigate, className: "icon-button v6-saved", "aria-label": 'İlham dosyam, ' + s.favorites.length + ' seçim' },
                            (0, react_1.createElement)(ui_1.Icon, { name: "heart" }),
                            s.favorites.length > 0 && (0, react_1.createElement)("span", { className: "v7-count" }, s.favorites.length)),
                        (0, react_1.createElement)("a", { className: "v7-header-phone", href: 'tel:' + project_1.business.telephone, "aria-label": "Yusuf Usta\u2019y\u0131 telefonla ara" },
                            (0, react_1.createElement)(ui_1.Icon, { name: "phone" })),
                        (0, react_1.createElement)(ui_1.Link, { to: "/modelini-getir", navigate: this.navigate, className: "v6-header-cta" },
                            "Projenizi konu\u015Fal\u0131m ",
                            (0, react_1.createElement)(ui_1.Icon, { size: 16 })))),
                (0, react_1.createElement)("nav", { className: "v6-header-nav wrap", "aria-label": "Ana gezinme" }, portfolio_1.mainNavigation.map(([p, label]) => nav(p, label)))),
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
                            nav('/projeler', 'Çalışma arşivi'),
                            nav('/kategoriler', 'Kategoriler'),
                            nav('/ilham-modelleri', 'İlham modelleri'),
                            nav('/calisma-dosyam', 'İlham dosyanız'),
                            nav('/malzemeler', 'Malzeme ve bakım')),
                        (0, react_1.createElement)("div", { className: "footer-column" },
                            (0, react_1.createElement)("h2", null, "At\u00F6lye"),
                            nav('/hakkimizda', 'Hikâyemiz'),
                            nav('/atolye', 'Atölye'),
                            nav('/ozel-uretim', 'Nasıl çalışıyoruz?'),
                            nav('/rehber', 'Atölye notları'),
                            nav('/gizlilik', 'Veri ve dış servisler')),
                        (0, react_1.createElement)("div", { className: "footer-column footer-contact" },
                            (0, react_1.createElement)("h2", null, "Do\u011Frudan Yusuf Usta"),
                            (0, react_1.createElement)("a", { className: "v7-footer-phone", href: 'tel:' + project_1.business.telephone }, project_1.business.display),
                            (0, react_1.createElement)("a", { href: (0, project_1.whatsappUrl)(), target: "_blank", rel: "noopener noreferrer", className: "text-link on-dark" },
                                "WhatsApp'ta g\u00F6r\u00FC\u015F ",
                                (0, react_1.createElement)(ui_1.Icon, { name: "diagonal" })),
                            (0, react_1.createElement)("p", null,
                                "\u0130stanbul, T\u00FCrkiye.",
                                (0, react_1.createElement)("br", null),
                                "Yeni adresi ziyaret \u00F6ncesinde teyit edin."),
                            nav('/iletisim', 'İletişim ayrıntıları'))),
                    (0, react_1.createElement)("div", { className: "footer-wordmark", "aria-hidden": "true" },
                        "elif tasar\u0131m",
                        (0, react_1.createElement)("span", null, "AT\u00D6LYE")),
                    (0, react_1.createElement)("div", { className: "footer-bottom" },
                        (0, react_1.createElement)("span", null, "EL\u0130F TASARIM \u00B7 V9 / 2026"),
                        (0, react_1.createElement)("div", null,
                            nav('/gizlilik', 'Gizlilik ve dış servisler'),
                            (0, react_1.createElement)("button", { onClick: () => this.setState({ info: true }) }, "Cihaz kay\u0131tlar\u0131n\u0131 y\u00F6net")),
                        (0, react_1.createElement)("span", null, "\u00D6zenle d\u00FC\u015F\u00FCn\u00FCl\u00FCr. At\u00F6lyede \u015Fekillenir.")),
                    (0, react_1.createElement)("p", { className: "footer-disclosure" }, "At\u00F6lye ar\u015Fivi, uygulama a\u015Famas\u0131, konsept model ve d\u0131\u015F referanslar ayr\u0131 etiketlidir. Bu bir tasar\u0131m \u00F6nizlemesidir. Sitede \u00F6deme veya otomatik talep kayd\u0131 yoktur. WhatsApp mesaj\u0131 harici uygulamada sizin taraf\u0131n\u0131zdan g\u00F6nderilir."))),
            s.menu && (0, react_1.createElement)(ui_1.Dialog, { title: "Elif Tasar\u0131m", onClose: () => this.setState({ menu: false }) },
                (0, react_1.createElement)("nav", { className: "mobile-links", "aria-label": "Mobil men\u00FC" }, [...portfolio_1.mainNavigation, ['/modelini-getir', 'Kendi Modelinizi Getirin'], ['/calisma-dosyam', 'İlham Dosyanız'], ['/tasarim-masasi', 'Tasarım Masası']].map(([p, label], i) => (0, react_1.createElement)(ui_1.Link, { key: p, to: p, navigate: this.navigate },
                    (0, react_1.createElement)("span", null, String(i + 1).padStart(2, '0')),
                    label,
                    (0, react_1.createElement)(ui_1.Icon, { name: "diagonal" })))),
                (0, react_1.createElement)("a", { className: "v7-direct", href: 'tel:' + project_1.business.telephone },
                    "Yusuf Usta \u00B7 ",
                    project_1.business.display)),
            s.search && (0, react_1.createElement)(ui_1.Dialog, { title: "At\u00F6lyede bir \u015Fey aray\u0131n", onClose: () => this.setState({ search: false }) },
                (0, react_1.createElement)("label", { className: "search-dialog-input" },
                    (0, react_1.createElement)(ui_1.Icon, { name: "search" }),
                    (0, react_1.createElement)("input", { autoFocus: true, type: "search", placeholder: "Mutfak, kahve k\u00F6\u015Fesi, gard\u0131rop\u2026", "aria-label": "Arama kelimesi", value: s.searchQuery, maxLength: 100, onInput: e => this.setState({ searchQuery: e.currentTarget.value }) })),
                (0, react_1.createElement)("div", { className: "search-results", role: "region", "aria-live": "polite" },
                    results.map(x => (0, react_1.createElement)(ui_1.Link, { key: x.id, to: x.path, navigate: this.navigate },
                        x.image && (0, react_1.createElement)(PortfolioUI_1.VImage, { asset: x.image, alt: "", sizes: "80px" }),
                        (0, react_1.createElement)("span", null,
                            (0, react_1.createElement)("strong", null, x.title),
                            (0, react_1.createElement)("small", null,
                                (0, portfolio_1.categoryName)(x.category),
                                " \u00B7 ",
                                x.kind === 'concept' ? 'Konsept model' : x.kind === 'reference' ? 'Pinterest referansı' : 'Atölye arşivi')),
                        (0, react_1.createElement)(ui_1.Icon, { name: "diagonal" }))),
                    !results.length && (0, react_1.createElement)("p", { className: "empty-state" }, "Sonu\u00E7 bulunamad\u0131. Ba\u015Fka bir kelime deneyin.")),
                (0, react_1.createElement)(ui_1.TextLink, { to: '/arama?q=' + encodeURIComponent(s.searchQuery.trim()), navigate: this.navigate }, "T\u00FCm sonu\u00E7lar\u0131 g\u00F6r")),
            s.info && (0, react_1.createElement)(ui_1.Dialog, { title: "Bilgi ve cihaz kay\u0131tlar\u0131", onClose: () => this.setState({ info: false }) },
                (0, react_1.createElement)("div", { className: "info-dialog" },
                    (0, react_1.createElement)(ui_1.Eyebrow, null, "V9 / \u015EEFFAF B\u0130R BA\u015ELANGI\u00C7"),
                    (0, react_1.createElement)("p", null,
                        "Yusuf Usta'n\u0131n kullan\u0131c\u0131 taraf\u0131ndan payla\u015F\u0131lan i\u015F telefonu ",
                        project_1.business.display,
                        ". WhatsApp ve telefon ba\u011Flant\u0131lar\u0131 bu numaray\u0131 a\u00E7ar. Yeni a\u00E7\u0131k adres hen\u00FCz kesinle\u015Fmemi\u015Ftir."),
                    (0, react_1.createElement)("h3", null, "Mesaj\u0131 siz g\u00F6nderirsiniz."),
                    (0, react_1.createElement)("p", null, "Site proje \u00F6zetinizi haz\u0131rlar. Sitede \u00F6deme, sipari\u015F kayd\u0131 veya otomatik g\u00F6nderim yoktur. WhatsApp mesaj\u0131n\u0131 orada g\u00F6nderirsiniz. Dosya payla\u015F\u0131m\u0131 ayr\u0131 bir ad\u0131md\u0131r. A\u00E7\u0131ld\u0131, g\u00F6nderildi ve teslim al\u0131nd\u0131 ayn\u0131 durum de\u011Fildir."),
                    (0, react_1.createElement)("h3", null, "Ki\u015Fisel taslak yaln\u0131z bellekte."),
                    (0, react_1.createElement)("p", null, "Not, il\u00E7e, model ve g\u00F6rseller a\u00E7\u0131k sekme i\u00E7inde korunur, yeniden y\u00FCklemede silinebilir. A\u00E7\u0131k\u00E7a se\u00E7ti\u011Finizde yaln\u0131z herkese a\u00E7\u0131k ilham kimlikleri 30 g\u00FCn, tasar\u0131m masas\u0131ndan kaydetti\u011Finiz \u00F6l\u00E7\u00FC tercihleri 7 g\u00FCn cihazda kal\u0131r. Analitik veya reklam pikseli y\u00FCklenmez."),
                    (0, react_1.createElement)("button", { className: "button button-outline", onClick: () => { if (window.confirm('Bu açık sekmedeki proje fikri, görseller ve bu cihazdaki Elif kayıtları silinsin mi?')) {
                            project_1.projectStore.clear();
                            project_1.attachmentStore.clear();
                            try {
                                Object.keys(localStorage).filter(k => k.startsWith('elif-v2:') || k.startsWith('elif-v7:')).forEach(k => localStorage.removeItem(k));
                            }
                            catch { }
                            this.setState({ favorites: [], remember: false, info: false });
                            this.navigate('/');
                            this.notify('Elif taslağı ve bu cihazdaki kayıtlar temizlendi.');
                        } } },
                        "Tasla\u011F\u0131 ve cihaz kay\u0131tlar\u0131n\u0131 sil ",
                        (0, react_1.createElement)(ui_1.Icon, { name: "close" })),
                    (0, react_1.createElement)(ui_1.Link, { to: "/gizlilik", navigate: p => { this.setState({ info: false }); this.navigate(p); }, className: "text-link" },
                        "Veri ve d\u0131\u015F servis a\u00E7\u0131klamas\u0131 ",
                        (0, react_1.createElement)(ui_1.Icon, null)))),
            s.scrolled && !s.menu && !s.search && !s.info && (0, react_1.createElement)("div", { className: "v7-mobile-contact" },
                (0, react_1.createElement)("a", { href: 'tel:' + project_1.business.telephone },
                    (0, react_1.createElement)(ui_1.Icon, { name: "phone", size: 18 }),
                    "Ara"),
                (0, react_1.createElement)("a", { href: (0, project_1.whatsappUrl)(), target: "_blank", rel: "noopener noreferrer" },
                    "Yusuf Usta\u2019ya yaz ",
                    (0, react_1.createElement)(ui_1.Icon, { name: "diagonal", size: 18 }))),
            s.scrolled && (0, react_1.createElement)("button", { className: "v5-backtop", type: "button", "aria-label": "Sayfan\u0131n ba\u015F\u0131na d\u00F6n", onClick: () => window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }) },
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

},
"src/components/DeskExperience":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeskExperience = void 0;
const react_1 = require("react");
const ui_1 = require("./ui");
const desk_v8_1 = require("../lib/desk-v8");
const project_1 = require("../lib/project");
const domain_1 = require("../lib/domain");
let runtimePromise = null;
function loadRuntime() { const w = window; if (w.ElifDesk3D)
    return Promise.resolve(w.ElifDesk3D); if (runtimePromise)
    return runtimePromise; runtimePromise = new Promise((resolve, reject) => { const script = document.createElement('script'); script.type = 'module'; script.src = (w.__ELIF_BASE__ || '/elif-tasarim') + '/three/desk-scene.mjs?v=9-atelier'; script.onload = () => w.ElifDesk3D ? resolve(w.ElifDesk3D) : reject(Error('3D initialization failed')); script.onerror = () => { runtimePromise = null; script.remove(); reject(Error('3D runtime unavailable')); }; document.head.appendChild(script); }); return runtimePromise; }
class DeskExperience extends react_1.Component {
    constructor(p) {
        super(p);
        this.host = null;
        this.root = null;
        this.engine = null;
        this.alive = true;
        this.start = async () => { if (this.state.status === 'loading' || this.engine)
            return; this.setState({ status: 'loading' }); try {
            const runtime = await loadRuntime();
            if (!this.alive || !this.host)
                return;
            this.engine = runtime.createDeskScene(this.host, this.state.config, { status: (status) => { if (this.alive)
                    this.setState({ status }); } });
            this.engine.environment({ mode: this.state.environment, shelves: this.state.shelves, lights: this.state.shelfLights, props: this.state.styling });
            this.engine.light(this.state.light);
            this.setState({ status: 'ready' });
        }
        catch {
            if (this.alive)
                this.setState({ status: 'unavailable' });
        } };
        this.change = (patch) => { const config = (0, desk_v8_1.normalizeStudio)({ ...this.state.config, ...patch }); this.setState({ config }, () => this.engine?.update(config)); };
        this.setView = (view) => { this.setState({ view }); this.engine?.setView(view); };
        this.handoff = () => { const s = this.state.config, d = project_1.projectStore.get(); project_1.projectStore.patch({ category: 'ozel-tasarim', width: String(s.width), depth: String(s.depth), height: String(s.height), unit: 'cm', unknown: false, dimensions: `${s.width} × ${s.depth} × ${s.height} cm`, material: desk_v8_1.studioMaterials[s.material].name, details: (0, desk_v8_1.studioSummary)(s), note: d.note || 'Devir 01 çekmeceli, döner yan tablalı çalışma masası konseptini alanıma göre birlikte değerlendirmek istiyorum.' }); this.props.navigate('/modelini-getir'); };
        this.atmosphere = (patch) => { this.setState(patch, () => this.engine?.environment({ mode: this.state.environment, shelves: this.state.shelves, lights: this.state.shelfLights, props: this.state.styling })); };
        this.fullscreen = async () => { try {
            if (document.fullscreenElement)
                await document.exitFullscreen();
            else
                await this.root?.querySelector('.v8-showroom')?.requestFullscreen();
        }
        catch {
            this.props.notify('Bu cihazda tam ekran açılamadı. Stüdyoyu normal görünümde kullanabilirsiniz.');
        } };
        this.snapshot = () => { if (!this.engine)
            return; try {
            const url = this.engine.snapshot(1920, 1280), a = document.createElement('a');
            a.href = url;
            a.download = 'Elif-Devir-01-Konsept-Model.png';
            a.click();
            this.props.notify('Görüntü hazırlandı. Konsept modeldir, teknik imalat çizimi değildir.');
        }
        catch {
            this.props.notify('Görüntü bu cihazda kaydedilemedi. Ölçü özetinizi indirebilirsiniz.');
        } };
        this.shareURL = () => { const w = typeof window !== 'undefined' ? window : {}; return (w.__ELIF_SITE_URL__ || 'https://onourimpram.github.io/elif-tasarim').replace(/\/$/, '') + '/tasarim-masasi/?' + (0, desk_v8_1.studioQuery)(this.state.config); };
        this.field = (key, label, min, max, unit = 'cm') => { const v = this.state.config[key]; return (0, react_1.createElement)("div", { className: "v8-field", key: key },
            (0, react_1.createElement)("div", null,
                (0, react_1.createElement)("label", { htmlFor: 'v8-' + (this.props.compact ? 'home-' : 'full-') + key }, label),
                (0, react_1.createElement)("span", null,
                    (0, react_1.createElement)("input", { type: "number", inputMode: "numeric", value: v, min: min, max: max, step: "1", "aria-label": label + ', sayı girişi', onChange: e => { const raw = e.currentTarget.value; if (/^\d+$/.test(raw) && +raw >= min && +raw <= max)
                            this.change({ [key]: +raw });
                        else
                            e.currentTarget.value = String(v); } }),
                    unit)),
            (0, react_1.createElement)("input", { id: 'v8-' + (this.props.compact ? 'home-' : 'full-') + key, type: "range", "aria-label": label, min: min, max: max, value: v, step: "1", onInput: e => this.change({ [key]: +e.currentTarget.value }) }),
            (0, react_1.createElement)("div", { className: "v8-bounds" },
                (0, react_1.createElement)("span", null,
                    min,
                    " ",
                    unit),
                (0, react_1.createElement)("span", null,
                    max,
                    " ",
                    unit))); };
        this.state = { config: p.query ? (0, desk_v8_1.studioFromQuery)(p.query) : { ...desk_v8_1.defaultStudio }, status: 'poster', tab: 'motion', dimensions: false, view: 'perspective', light: 'day', share: false, rotating: false, environment: 'atelier', shelves: true, shelfLights: true, styling: true };
    }
    componentDidMount() { if (!this.props.compact)
        this.start(); }
    componentWillUnmount() { this.alive = false; this.engine?.dispose(); this.engine = null; }
    render() {
        const { config: c, status, tab, dimensions, view, light } = this.state, p = this.props, ready = status === 'ready';
        return (0, react_1.createElement)("div", { ref: e => this.root = e, className: 'v8-experience v9-experience ' + (p.compact ? 'v8-compact' : 'v8-full'), "data-studio": p.compact ? 'home' : 'full', "data-three-status": status },
            (0, react_1.createElement)("div", { className: "v8-story" },
                (0, react_1.createElement)(ui_1.Eyebrow, null, p.compact ? '05 / YAŞAYAN TASARIM MASASI' : 'ELİF TASARIM / DEVİR 01'),
                p.compact ? (0, react_1.createElement)("h2", null,
                    "\u00C7al\u0131\u015Fma alan\u0131n\u0131z,",
                    (0, react_1.createElement)("br", null),
                    (0, react_1.createElement)("em", null, "sizinle de\u011Fi\u015Fsin.")) : (0, react_1.createElement)("h1", null,
                    "Kendi \u00E7al\u0131\u015Fma",
                    (0, react_1.createElement)("br", null),
                    "alan\u0131n\u0131z\u0131 ",
                    (0, react_1.createElement)("em", null, "tasarlay\u0131n.")),
                (0, react_1.createElement)("p", { className: "v8-lede" }, "\u0130ki yanda raflar, elinizin alt\u0131nda \u00E7ekmeceler. I\u015F\u0131\u011F\u0131, ah\u015Fab\u0131 ve hareketi birlikte d\u00FC\u015F\u00FCn\u00FCn. Size ait bir \u00E7al\u0131\u015Fma alan\u0131, \u00F6l\u00E7\u00FClerinizle \u015Fekillensin."),
                (0, react_1.createElement)("div", { className: "v8-design-note" },
                    (0, react_1.createElement)("span", { className: "v8-series-number" }, "01"),
                    (0, react_1.createElement)("div", null,
                        (0, react_1.createElement)("strong", null, "DEV\u0130R"),
                        (0, react_1.createElement)("span", null, "Y\u00DCKSEKL\u0130K AYARLI \u00C7ALI\u015EMA MASASI")),
                    (0, react_1.createElement)("span", { className: "v8-concept-label" }, "Konsept model")),
                (0, react_1.createElement)("div", { className: "v8-control-tabs", role: "tablist", "aria-label": "Tasar\u0131m kontrol grubu" }, [['motion', 'Hareketi keşfet'], ['size', 'Ölçünü belirle'], ['room', 'Mekânı düzenle']].map(([id, name]) => (0, react_1.createElement)("button", { type: "button", role: "tab", key: id, "aria-selected": tab === id, onClick: () => this.setState({ tab: id }) }, name))),
                (0, react_1.createElement)("div", { className: "v8-controls", role: "tabpanel", "aria-label": tab === 'motion' ? 'Hareket kontrolleri' : tab === 'size' ? 'Ölçü kontrolleri' : 'Mekân kontrolleri' }, tab === 'motion' ? (0, react_1.createElement)(react_1.Fragment, null,
                    this.field('height', 'Çalışma yüksekliği', 80, 125),
                    this.field('angle', 'Yan tabla açısı', 0, 360, '°'),
                    (0, react_1.createElement)("div", { className: "v8-presets", "aria-label": "Masa yerle\u015Fimleri" }, [['Toplu', 0], ['L düzen', 90], ['Açık', 180]].map(([label, a]) => (0, react_1.createElement)("button", { type: "button", key: label, "aria-pressed": c.angle === a, onClick: () => this.change({ angle: a }) }, label))),
                    (0, react_1.createElement)("div", { className: "v8-toggle-row" },
                        (0, react_1.createElement)("button", { type: "button", "aria-pressed": c.drawers, onClick: () => this.change({ drawers: !c.drawers }) },
                            (0, react_1.createElement)(ui_1.Icon, { name: "plus", size: 16 }),
                            c.drawers ? 'Çekmeceleri kapat' : 'Çekmeceleri aç'),
                        (0, react_1.createElement)("button", { type: "button", "aria-pressed": c.door, onClick: () => this.change({ door: !c.door }) },
                            (0, react_1.createElement)(ui_1.Icon, { name: "grid", size: 16 }),
                            c.door ? 'Dolabı kapat' : 'Dolabı aç'))) : tab === 'size' ? (0, react_1.createElement)(react_1.Fragment, null,
                    this.field('width', 'Masa eni', 120, 220),
                    this.field('depth', 'Masa derinliği', 65, 95),
                    (0, react_1.createElement)("p", { className: "v8-control-note" }, "Bu aral\u0131klar g\u00F6rsel ke\u015Fif i\u00E7indir. Ger\u00E7ek \u00F6l\u00E7\u00FC ve mekanizma, \u00FCretim \u00F6ncesi birlikte netle\u015Ftirilir.")) : (0, react_1.createElement)("p", { className: "v8-control-note" }, "\u0130ki yandaki kitapl\u0131klar\u0131, raf \u0131\u015F\u0131\u011F\u0131n\u0131 ve ya\u015Fam ayr\u0131nt\u0131lar\u0131n\u0131 kendinize g\u00F6re d\u00FCzenleyin. \u00DCr\u00FCn\u00FC tek ba\u015F\u0131na incelemek i\u00E7in yal\u0131n g\u00F6r\u00FCn\u00FCme ge\u00E7in.")),
                (0, react_1.createElement)("div", { className: "v8-materials" },
                    (0, react_1.createElement)("span", null, "Y\u00DCZEY F\u0130KR\u0130"),
                    (0, react_1.createElement)("div", { role: "group", "aria-label": "Ah\u015Fap y\u00FCzey se\u00E7enekleri" }, Object.entries(desk_v8_1.studioMaterials).map(([id, m]) => (0, react_1.createElement)("button", { type: "button", key: id, "aria-pressed": c.material === id, "aria-label": m.name, onClick: () => this.change({ material: id }) },
                        (0, react_1.createElement)("i", { className: 'v8-swatch v8-' + id, style: { backgroundColor: m.color } }),
                        (0, react_1.createElement)("span", null, m.name))))),
                tab === 'room' && (0, react_1.createElement)("div", { className: "v9-atmosphere" },
                    (0, react_1.createElement)("span", { className: "v9-control-kicker" }, "MEK\u00C2NIN ATMOSFER\u0130"),
                    (0, react_1.createElement)("div", { className: "v9-mode-tabs", role: "group", "aria-label": "St\u00FCdyo g\u00F6r\u00FCn\u00FCm\u00FC" },
                        (0, react_1.createElement)("button", { type: "button", "aria-pressed": this.state.environment === 'atelier', onClick: () => this.atmosphere({ environment: 'atelier' }) }, "Mek\u00E2n i\u00E7inde"),
                        (0, react_1.createElement)("button", { type: "button", "aria-pressed": this.state.environment === 'product', onClick: () => this.atmosphere({ environment: 'product' }) }, "Yal\u0131n \u00FCr\u00FCn")),
                    (0, react_1.createElement)("div", { className: "v9-atmosphere-options" },
                        (0, react_1.createElement)("button", { type: "button", "aria-pressed": this.state.shelves, onClick: () => this.atmosphere({ shelves: !this.state.shelves }) },
                            (0, react_1.createElement)(ui_1.Icon, { name: "grid", size: 16 }),
                            (0, react_1.createElement)("span", null, "\u00C7ift tarafl\u0131 raflar"),
                            (0, react_1.createElement)("i", { "aria-hidden": "true" })),
                        (0, react_1.createElement)("button", { type: "button", "aria-pressed": this.state.shelfLights, onClick: () => this.atmosphere({ shelfLights: !this.state.shelfLights }) },
                            (0, react_1.createElement)(ui_1.Icon, { name: "plus", size: 16 }),
                            (0, react_1.createElement)("span", null, "Raf ayd\u0131nlatmas\u0131"),
                            (0, react_1.createElement)("i", { "aria-hidden": "true" })),
                        (0, react_1.createElement)("button", { type: "button", "aria-pressed": this.state.styling, onClick: () => this.atmosphere({ styling: !this.state.styling }) },
                            (0, react_1.createElement)(ui_1.Icon, { name: "leaf", size: 16 }),
                            (0, react_1.createElement)("span", null, "Ya\u015Fam ayr\u0131nt\u0131lar\u0131"),
                            (0, react_1.createElement)("i", { "aria-hidden": "true" }))),
                    (0, react_1.createElement)("small", null, "Raflar ve aksesuarlar mek\u00E2n \u00F6nerisidir. Masa kapsam\u0131 ayr\u0131ca belirlenir.")),
                (0, react_1.createElement)("div", { className: "v8-primary-action" },
                    p.compact ? (0, react_1.createElement)(ui_1.Link, { className: "button", to: '/tasarim-masasi?' + (0, desk_v8_1.studioQuery)(c), navigate: p.navigate },
                        "St\u00FCdyoda devam et ",
                        (0, react_1.createElement)(ui_1.Icon, null)) : (0, react_1.createElement)("button", { type: "button", className: "button", onClick: this.handoff },
                        "Bu tasar\u0131m\u0131 Yusuf Usta ile konu\u015F ",
                        (0, react_1.createElement)(ui_1.Icon, null)),
                    (0, react_1.createElement)("span", null, "\u00D6l\u00E7\u00FC, malzeme ve hareket alan\u0131n\u0131 birlikte de\u011Ferlendirelim."))),
            (0, react_1.createElement)("div", { className: "v8-showroom" },
                (0, react_1.createElement)("div", { className: "v8-viewer-top" },
                    (0, react_1.createElement)("div", null,
                        (0, react_1.createElement)("span", { className: "v8-live-dot" }),
                        (0, react_1.createElement)("span", null, ready ? 'CANLI 3D STÜDYO' : 'İNTERAKTİF TASARIM STÜDYOSU')),
                    (0, react_1.createElement)("span", null, "ATELIER / DEV\u0130R 01")),
                (0, react_1.createElement)("div", { className: "v8-canvas-wrap" },
                    (0, react_1.createElement)("div", { className: "v8-canvas-host", ref: e => this.host = e }),
                    !ready && (0, react_1.createElement)("div", { className: "v8-poster" },
                        (0, react_1.createElement)("img", { src: (0, ui_1.image)('devir-studio-v9.webp'), alt: "\u0130ki yandaki ah\u015Fap kitapl\u0131klarla Devir 01 \u00E7al\u0131\u015Fma masas\u0131. Ger\u00E7ek \u00FC\u00E7 boyutlu st\u00FCdyodan g\u00F6r\u00FCn\u00FCm" }),
                        (0, react_1.createElement)("div", { className: "v8-poster-action" }, status === 'poster' ? (0, react_1.createElement)("button", { type: "button", "aria-label": "3D deneyimi ba\u015Flat", onClick: this.start },
                            (0, react_1.createElement)("span", { className: "v8-cube", "aria-hidden": "true" }, "\u25C7"),
                            "3D deneyimi ba\u015Flat ",
                            (0, react_1.createElement)(ui_1.Icon, { size: 18 })) : status === 'loading' ? (0, react_1.createElement)("p", { role: "status" }, "Malzemeler ve \u0131\u015F\u0131k haz\u0131rlan\u0131yor.") : (0, react_1.createElement)(react_1.Fragment, null,
                            (0, react_1.createElement)("p", { role: "status" }, status === 'lost' ? '3D görüntü bağlantısı kesildi.' : 'Bu cihazda 3D görünüm açılamadı.'),
                            (0, react_1.createElement)("small", null, "\u00D6l\u00E7\u00FC ve malzeme se\u00E7iminiz korunur. Tasar\u0131m \u00F6zetiyle devam edebilirsiniz.")))),
                    (0, react_1.createElement)("div", { className: "v8-view-tabs", role: "group", "aria-label": "Kamera a\u00E7\u0131lar\u0131" }, [['perspective', 'Perspektif'], ['front', 'Önden'], ['left', 'Soldan'], ['right', 'Sağdan'], ['top', 'Üstten']].map(([id, name]) => (0, react_1.createElement)("button", { type: "button", key: id, disabled: !ready, "aria-pressed": view === id, onClick: () => this.setView(id) }, name))),
                    (0, react_1.createElement)("div", { className: "v8-view-tools" },
                        (0, react_1.createElement)("button", { type: "button", disabled: !ready, "aria-label": "St\u00FCdyoyu tam ekran a\u00E7", onClick: this.fullscreen },
                            (0, react_1.createElement)(ui_1.Icon, { name: "expand" })),
                        (0, react_1.createElement)("button", { type: "button", disabled: !ready, "aria-label": "Yak\u0131nla\u015Ft\u0131r", onClick: () => this.engine?.zoom(.88) },
                            (0, react_1.createElement)(ui_1.Icon, { name: "plus" })),
                        (0, react_1.createElement)("button", { type: "button", disabled: !ready, "aria-label": "Uzakla\u015Ft\u0131r", onClick: () => this.engine?.zoom(1.12) },
                            (0, react_1.createElement)(ui_1.Icon, { name: "minus" })),
                        (0, react_1.createElement)("button", { type: "button", disabled: !ready, "aria-label": "G\u00F6r\u00FCn\u00FCm\u00FC s\u0131f\u0131rla", onClick: () => this.setView('perspective') }, "\u21BA"),
                        (0, react_1.createElement)("button", { type: "button", disabled: !ready, "aria-label": "\u00D6l\u00E7\u00FC \u00E7izgilerini g\u00F6ster", "aria-pressed": dimensions, onClick: () => this.setState({ dimensions: !dimensions }, () => this.engine?.dimensions(this.state.dimensions)) },
                            (0, react_1.createElement)(ui_1.Icon, { name: "ruler" }))),
                    (0, react_1.createElement)("span", { className: "v8-canvas-hint" }, ready ? 'Sürükleyerek döndürün. Klavyede ok tuşlarını kullanın.' : 'Konsept model önizlemesi'),
                    (0, react_1.createElement)("span", { className: "v8-scene-label" }, "Konsept model")),
                (0, react_1.createElement)("div", { className: "v8-viewer-bottom" },
                    (0, react_1.createElement)("div", null,
                        (0, react_1.createElement)("span", null, "SE\u00C7T\u0130\u011E\u0130N\u0130Z \u00D6L\u00C7\u00DC"),
                        (0, react_1.createElement)("strong", null,
                            c.width,
                            " ",
                            (0, react_1.createElement)("i", null, "\u00D7"),
                            " ",
                            c.depth,
                            " ",
                            (0, react_1.createElement)("i", null, "\u00D7"),
                            " ",
                            c.height,
                            (0, react_1.createElement)("small", null, " cm"))),
                    (0, react_1.createElement)("div", { className: "v8-light-options", role: "group", "aria-label": "St\u00FCdyo \u0131\u015F\u0131\u011F\u0131" },
                        (0, react_1.createElement)("button", { type: "button", "aria-pressed": light === 'day', onClick: () => this.setState({ light: 'day' }, () => this.engine?.light('day')) }, "G\u00FCn \u0131\u015F\u0131\u011F\u0131"),
                        (0, react_1.createElement)("button", { type: "button", "aria-pressed": light === 'evening', onClick: () => this.setState({ light: 'evening' }, () => this.engine?.light('evening')) }, "Ak\u015Fam")),
                    (0, react_1.createElement)("button", { type: "button", disabled: !ready, className: "v8-export", onClick: this.snapshot },
                        (0, react_1.createElement)(ui_1.Icon, { name: "download", size: 19 }),
                        (0, react_1.createElement)("span", null, "G\u00F6r\u00FCn\u00FCm\u00FC kaydet"))),
                (0, react_1.createElement)("div", { className: "v8-experience-foot" },
                    (0, react_1.createElement)("span", null,
                        (0, react_1.createElement)(ui_1.Icon, { name: "ruler", size: 16 }),
                        "\u00D6l\u00E7\u00FCye g\u00F6re de\u011Fi\u015Fen geometri"),
                    (0, react_1.createElement)("span", null,
                        (0, react_1.createElement)(ui_1.Icon, { name: "grid", size: 16 }),
                        "\u00C7ift rafl\u0131 mek\u00E2n kurgusu"),
                    (0, react_1.createElement)("span", null, "Three.js / WebGL")),
                !p.compact && (0, react_1.createElement)(react_1.Fragment, null,
                    (0, react_1.createElement)("div", { className: "v8-export-row" },
                        (0, react_1.createElement)("button", { className: "text-link", type: "button", onClick: () => (0, domain_1.downloadText)('Elif-Devir-01-Tasarim.txt', (0, desk_v8_1.studioSummary)(c)) },
                            "\u00D6l\u00E7\u00FC \u00F6zetini indir ",
                            (0, react_1.createElement)(ui_1.Icon, { name: "download", size: 17 })),
                        (0, react_1.createElement)("button", { className: "text-link", type: "button", "aria-expanded": this.state.share, onClick: () => this.setState({ share: !this.state.share }) },
                            "Tasar\u0131m ba\u011Flant\u0131s\u0131 ",
                            (0, react_1.createElement)(ui_1.Icon, { name: "diagonal", size: 17 })),
                        (0, react_1.createElement)("button", { type: "button", className: "text-link", disabled: !ready, "aria-pressed": this.state.rotating, onClick: () => this.setState({ rotating: !this.state.rotating }, () => this.engine?.rotate(this.state.rotating)) },
                            this.state.rotating ? 'Dönüşü durdur' : 'Yavaşça döndür',
                            " ",
                            (0, react_1.createElement)(ui_1.Icon, { name: "clock", size: 17 }))),
                    this.state.share && (0, react_1.createElement)("label", { className: "v8-share-field" },
                        "Yaln\u0131z model se\u00E7eneklerinizi i\u00E7eren ba\u011Flant\u0131",
                        (0, react_1.createElement)("input", { "aria-label": "Payla\u015F\u0131labilir 3D tasar\u0131m ba\u011Flant\u0131s\u0131", readOnly: true, value: this.shareURL(), onFocus: e => e.currentTarget.select() }),
                        (0, react_1.createElement)("small", null, "Ki\u015Fisel not veya ileti\u015Fim bilgisi i\u00E7ermez."))),
                (0, react_1.createElement)("p", { className: "v8-engineering-note" }, "Konsept modeldir. Nihai mekanizma, y\u00FCk kapasitesi, hareket a\u00E7\u0131kl\u0131\u011F\u0131 ve \u00FCretim \u00F6l\u00E7\u00FCleri at\u00F6lye onay\u0131 gerektirir. Bu sahne teknik imalat \u00E7izimi veya g\u00FCvenlik testi de\u011Fildir.")));
    }
}
exports.DeskExperience = DeskExperience;

},
"src/components/PinterestPreview":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PinterestPreview = void 0;
const react_1 = require("react");
const ui_1 = require("./ui");
const pinterest_1 = require("../lib/pinterest");
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
            (0, react_1.createElement)("p", { className: "v7-pin-disclosure" }, "Y\u00FCklemeyi se\u00E7erseniz Pinterest\u2019e ba\u011Flan\u0131l\u0131r. IP ve taray\u0131c\u0131 bilgileri aktar\u0131labilir, d\u0131\u015F servis \u00E7erez kullanabilir. Bu bir Elif uygulama foto\u011Fraf\u0131 de\u011Fildir."),
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

},
"src/components/PortfolioUI":function(module,exports,require){
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
function SourceTag({ kind = 'work' }) { return (0, react_1.createElement)("span", { className: 'source-tag source-' + kind }, ({ work: 'Atölye arşivi', process: 'Uygulama aşaması', concept: 'Konsept model', reference: 'Pinterest ilhamı' })[kind]); }
function WorkCard({ work: w, actions: a, featured = false, index = 0 }) {
    return (0, react_1.createElement)("article", { className: 'work-card' + (featured ? ' featured-work' : ''), "data-work": w.id },
        (0, react_1.createElement)(ui_1.Link, { to: '/proje/' + w.id, navigate: a.navigate, className: "work-photo" },
            (0, react_1.createElement)(VImage, { asset: w.images[0], alt: w.subtitle + ', atölyeden paylaşılan fotoğraf', sizes: "(max-width: 680px) 90vw, (max-width: 1024px) 45vw, 30vw" }),
            (0, react_1.createElement)(SourceTag, { kind: w.id === 'ahsap-bahce-kamelyasi' ? 'process' : w.status }),
            (0, react_1.createElement)("span", { className: "work-open" },
                (0, react_1.createElement)(ui_1.Icon, { name: "diagonal", size: 22 }))),
        (0, react_1.createElement)("div", { className: "work-caption" },
            (0, react_1.createElement)("span", { className: "work-index" }, String(index + 1).padStart(2, '0')),
            (0, react_1.createElement)("div", null,
                (0, react_1.createElement)("span", { className: "work-category" }, (0, portfolio_1.categoryName)(w.category)),
                (0, react_1.createElement)("h3", null,
                    (0, react_1.createElement)(ui_1.Link, { to: '/proje/' + w.id, navigate: a.navigate }, featured ? (0, portfolio_1.categoryName)(w.category) : w.title)),
                (0, react_1.createElement)("p", null, w.subtitle))),
        (0, react_1.createElement)("button", { type: "button", className: "v7-save-text", "aria-label": w.subtitle + (a.favorites.includes('work:' + w.id) ? ' kaydını kaldır' : ' çalışmasını kaydet'), "aria-pressed": a.favorites.includes('work:' + w.id), onClick: () => a.favorite('work:' + w.id) },
            (0, react_1.createElement)(ui_1.Icon, { name: "heart", size: 18 }),
            a.favorites.includes('work:' + w.id) ? 'İlham dosyanızda' : 'İlham dosyama ekle'));
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
    const paths = { phone: (0, react_1.createElement)("path", { d: "M5 3h4l2 5-3 2a15 15 0 0 0 6 6l2-3 5 2v4c-10 5-22-7-16-16Z" }), arrow: (0, react_1.createElement)(react_1.Fragment, null,
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
    caption && (0, react_1.createElement)("figcaption", null, "Konsept model")); }
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
"src/lib/desk":function(module,exports,require){
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

},
"src/lib/desk-v8":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studioMaterials = exports.defaultStudio = void 0;
exports.normalizeStudio = normalizeStudio;
exports.studioFromQuery = studioFromQuery;
exports.studioQuery = studioQuery;
exports.studioSummary = studioSummary;
exports.defaultStudio = { width: 180, depth: 80, height: 80, angle: 90, material: 'ceviz', drawers: false, door: false };
exports.studioMaterials = { ceviz: { name: 'Ceviz tonu', color: '#765039' }, mese: { name: 'Açık meşe tonu', color: '#b89a6e' }, koyu: { name: 'Koyu ahşap', color: '#37312d' } };
const clamp = (v, min, max, fallback) => typeof v === 'number' && Number.isFinite(v) ? Math.min(max, Math.max(min, Math.round(v))) : fallback;
function normalizeStudio(v) { return { width: clamp(v.width, 120, 220, 180), depth: clamp(v.depth, 65, 95, 80), height: clamp(v.height, 80, 125, 80), angle: clamp(v.angle, 0, 360, 90), material: ['ceviz', 'mese', 'koyu'].includes(v.material || '') ? v.material : 'ceviz', drawers: v.drawers === true, door: v.door === true }; }
function studioFromQuery(query) { const p = new URLSearchParams(query), num = (k, min, max, def) => { const raw = p.get(k) || ''; if (!/^\d+(?:[.,]\d+)?$/.test(raw))
    return def; const n = Number(raw.replace(',', '.')); return n >= min && n <= max ? n : def; }; return normalizeStudio({ width: num('en', 120, 220, 180), depth: num('derinlik', 65, 95, 80), height: num('yukseklik', 80, 125, 80), angle: num('donus', 0, 360, 90), material: p.get('malzeme'), drawers: p.get('cekmece') === '1', door: p.get('kapak') === '1' }); }
function studioQuery(s) { const v = normalizeStudio(s); return new URLSearchParams({ en: String(v.width), derinlik: String(v.depth), yukseklik: String(v.height), donus: String(v.angle), malzeme: v.material, cekmece: v.drawers ? '1' : '0', kapak: v.door ? '1' : '0' }).toString(); }
function studioSummary(s) { const v = normalizeStudio(s); return ['ELİF TASARIM / DEVİR 01', 'Konsept model. Üretim çizimi veya onaylanmış ürün şartnamesi değildir.', `Ana tabla ölçü fikri, ${v.width} × ${v.depth} cm`, `Gösterilen çalışma yüksekliği, ${v.height} cm`, `Yan tabla açısı, ${v.angle}°`, `Yüzey fikri, ${exports.studioMaterials[v.material].name}`, 'Tablanın altında çekmeceler, sabit depolama ünitesi ve bağımsız dönen yan tabla.', 'Mekanizma, yük kapasitesi, güvenli hareket alanı ve son ölçüler Yusuf Usta ile ayrıca doğrulanır.', 'Bu özet gönderilmiş sipariş değildir.'].join('\n'); }

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
function publicHref(path) { if (typeof window === 'undefined')
    return path; const w = window; if (w.__ELIF_PREVIEW__)
    return '#' + path; const [p, qs] = path.split('?'); return (w.__ELIF_BASE__ || '') + (p === '/' ? '/' : p.replace(/\/+$/, '') + '/') + (qs ? '?' + qs : ''); }
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

},
"src/lib/image-manifest":function(module,exports,require){
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
                "bytes": 42382
            },
            {
                "file": "concept-hero-800.webp",
                "width": 800,
                "height": 450,
                "bytes": 102820
            },
            {
                "file": "concept-hero-full.webp",
                "width": 1672,
                "height": 941,
                "bytes": 319464
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
                "bytes": 41180
            },
            {
                "file": "concept-mutfak-800.webp",
                "width": 800,
                "height": 600,
                "bytes": 91722
            },
            {
                "file": "concept-mutfak-full.webp",
                "width": 1448,
                "height": 1086,
                "bytes": 219550
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
                "bytes": 44786
            },
            {
                "file": "concept-tv-800.webp",
                "width": 800,
                "height": 600,
                "bytes": 101632
            },
            {
                "file": "concept-tv-full.webp",
                "width": 1448,
                "height": 1086,
                "bytes": 244086
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
                "bytes": 45566
            },
            {
                "file": "concept-kahve-800.webp",
                "width": 800,
                "height": 600,
                "bytes": 94430
            },
            {
                "file": "concept-kahve-full.webp",
                "width": 1448,
                "height": 1086,
                "bytes": 222372
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
                "bytes": 45534
            },
            {
                "file": "concept-vestiyer-800.webp",
                "width": 800,
                "height": 600,
                "bytes": 112866
            },
            {
                "file": "concept-vestiyer-full.webp",
                "width": 1448,
                "height": 1086,
                "bytes": 290080
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
                "bytes": 42626
            },
            {
                "file": "concept-gardrop-800.webp",
                "width": 800,
                "height": 600,
                "bytes": 105982
            },
            {
                "file": "concept-gardrop-full.webp",
                "width": 1448,
                "height": 1086,
                "bytes": 282042
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
                "bytes": 58926
            },
            {
                "file": "concept-sehpa-800.webp",
                "width": 800,
                "height": 600,
                "bytes": 138830
            },
            {
                "file": "concept-sehpa-full.webp",
                "width": 1448,
                "height": 1086,
                "bytes": 319338
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
                "bytes": 82240
            },
            {
                "file": "concept-pergola-800.webp",
                "width": 800,
                "height": 600,
                "bytes": 210842
            },
            {
                "file": "concept-pergola-full.webp",
                "width": 1448,
                "height": 1086,
                "bytes": 552024
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
                "bytes": 72728
            },
            {
                "file": "concept-model-800.webp",
                "width": 800,
                "height": 600,
                "bytes": 161022
            },
            {
                "file": "concept-model-full.webp",
                "width": 1448,
                "height": 1086,
                "bytes": 383818
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

},
"src/lib/model-request":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeReference = normalizeReference;
exports.modelInputError = modelInputError;
exports.modelSummary = modelSummary;
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

},
"src/lib/pinterest":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pinLookup = void 0;
exports.pinLookup = { "3T8k8Pwyv": { "canonical": "https://www.pinterest.com/pin/658792251715145444/", "label": "Ahşap mutfak ve çalışma tezgâhı" }, "2lc0S9lQO": { "canonical": "https://www.pinterest.com/pin/658792251714980037/", "label": "Klasik mutfak çizgileri" }, "41JsOJFNf": { "canonical": "https://www.pinterest.com/pin/658792251714434775/", "label": "Açık ton mutfak dolapları" }, "46g1kWzDY": { "canonical": "https://www.pinterest.com/pin/70791025388671144/", "label": "Kemerli depolama fikri" }, "5Wc0LnUYw": { "canonical": "https://www.pinterest.com/pin/73535406412559094/", "label": "Dresuar ve ayna birlikteliği" }, "1CZAqZl4m": { "canonical": "https://www.pinterest.com/pin/792915078189753441/", "label": "Beyaz gardırop fikri" }, "601hk2fV2": { "canonical": "https://www.pinterest.com/pin/862720872413051138/", "label": "Kompakt depolama çözümleri" }, "80Ac59zMm": { "canonical": "https://www.pinterest.com/pin/1086423110144415109/", "label": "Giyinme ve çalışma alanı" }, "484Ae4eNQ": { "canonical": "https://www.pinterest.com/pin/876583514994336197/", "label": "Ahşap plak ve kayıt konsolu" }, "5mqOqX5LH": { "canonical": "https://www.pinterest.com/pin/918945498989084139/", "label": "Yuvarlak yan sehpa" }, "5i4CyJrkM": { "canonical": "https://www.pinterest.com/pin/1090293391084521210/", "label": "Ahşap makyaj ve depolama ünitesi" }, "1pLUfH5pe": { "canonical": "https://www.pinterest.com/pin/1098737640376584104/", "label": "Çekmeceli dekoratif konsol" } };

},
"src/lib/portfolio":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainNavigation = exports.pinterestReferences = exports.concepts = exports.featuredWorks = exports.works = exports.workCategories = void 0;
exports.categoryName = categoryName;
exports.modelHref = modelHref;
exports.workCategories = [
    { id: 'mutfak', name: 'Mutfak', short: 'Mutfak', image: 'concept-mutfak', line: 'Günün başladığı, evin buluştuğu yer.', detail: 'Kapak düzeninden depolama alanlarına, ölçünüz ve kullanım alışkanlıklarınız etrafında tasarlanan mutfaklar.' },
    { id: 'tv-unitesi', name: 'TV Ünitesi', short: 'Yaşam alanı', image: 'concept-tv', line: 'Salonunuzun sakin odağı.', detail: 'Duvar panelleri, raflar ve kapalı depolamayı bir araya getiren, mekâna göre şekillenen TV üniteleri.' },
    { id: 'vestiyer', name: 'Vestiyer ve Depolama', short: 'Antre', image: 'concept-vestiyer', line: 'Evin ilk karşılaması.', detail: 'Giriş alanında askılık, ayakkabı ve günlük eşyalar için yer açan ölçüye özel çözümler.' },
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

},
"src/lib/project":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachmentStore = exports.projectStore = exports.business = void 0;
exports.whatsappUrl = whatsappUrl;
exports.emptyProject = emptyProject;
exports.createProjectStore = createProjectStore;
exports.convertMeasure = convertMeasure;
exports.projectText = projectText;
exports.hasPrivateDraft = hasPrivateDraft;
const model_request_1 = require("./model-request");
exports.business = Object.freeze({ name: 'Elif Tasarım', contact: 'Yusuf Usta', digits: '905308797169', telephone: '+905308797169', display: '+90 530 879 71 69', city: 'İstanbul', verifiedBy: 'Kullanıcı beyanı, 24 Eylül 2026' });
function whatsappUrl(text = 'Merhaba Yusuf Usta. Elif Tasarım üzerinden yazıyorum, projem hakkında görüşmek istiyorum.') { return 'https://wa.me/' + exports.business.digits + '?text=' + encodeURIComponent(text); }
function emptyProject() { return { category: 'ozel-tasarim', url: '', note: '', dimensions: '', district: '', timing: 'Birlikte planlayalım', interpretation: 'Alanıma göre birlikte yorumlayalım', width: '', depth: '', height: '', unit: 'cm', unknown: true, material: 'Birlikte değerlendirelim', finish: 'Birlikte değerlendirelim', details: '', readiness: 'Fikir topluyorum', selections: [] }; }
function createProjectStore() { let value = emptyProject(); const seen = new Set(); return { get: () => ({ ...value, selections: [...value.selections] }), patch: (patch) => { value = { ...value, ...patch, selections: patch.selections ? [...patch.selections] : value.selections }; return { ...value, selections: [...value.selections] }; }, seed: (key, seed, replace = false) => { if (seen.has(key))
        return; seen.add(key); if (replace) {
        value = { ...value, ...seed };
        return;
    } for (const [k, v] of Object.entries(seed)) {
        const name = k;
        if (v !== undefined && v !== '' && (!value[name] || (name === 'category' && value.category === 'ozel-tasarim')))
            value[name] = v;
    } }, clear: () => { value = emptyProject(); seen.clear(); } }; }
exports.projectStore = createProjectStore();
function convertMeasure(value, from, to) { if (!value.trim())
    return ''; if (!/^\d+(?:[.,]\d+)?$/.test(value.trim()))
    return null; const n = Number(value.replace(',', '.')); if (!Number.isFinite(n) || n <= 0)
    return null; return String(Math.round(n * (from === to ? 1 : from === 'cm' ? 10 : 0.1) * 10000) / 10000); }
function projectText(v, files, selectionLabels = []) { return ['Merhaba Yusuf Usta, Elif Tasarım üzerinden yazıyorum.', 'Proje fikrimi birlikte değerlendirmek istiyorum.', '', 'İhtiyaç, ' + v.category, 'Model, ' + ((0, model_request_1.normalizeReference)(v.url) || 'Yazılı fikir / fotoğraf'), 'Fikrim, ' + (v.note || 'Seçtiğim örnekler üzerinden konuşalım.'), 'Yaklaşık ölçü, ' + (!v.unknown && v.width ? [v.width, v.depth, v.height].join(' × ') + ' ' + v.unit : v.dimensions || 'Birlikte belirlenecek'), 'Bölge, ' + (v.district || 'Görüşmede paylaşacağım'), 'Malzeme, ' + v.material, 'Yüzey, ' + v.finish, 'Kullanım ayrıntıları, ' + (v.details || 'Birlikte değerlendirelim'), 'Zaman, ' + v.timing, 'Aşama, ' + v.readiness, 'Yaklaşım, ' + v.interpretation, selectionLabels.length ? 'Seçtiklerim, ' + selectionLabels.join(' / ') : '', files.length ? 'Görseller, ' + files.join(', ') + ' (bu bağlantıda ekli değil, ayrıca paylaşacağım)' : '', '', 'Ölçü, donanım ve uygulanabilirlik görüşmede netleşsin. Bu mesaj kesin sipariş veya üretim onayı değildir.'].filter(Boolean).join('\n'); }
let items = [];
exports.attachmentStore = { get: () => [...items], add: (a) => { items = [...items, ...a]; }, remove: (id) => { items.filter(x => x.id === id).forEach(x => URL.revokeObjectURL(x.preview)); items = items.filter(x => x.id !== id); }, clear: () => { items.forEach(x => URL.revokeObjectURL(x.preview)); items = []; } };
function hasPrivateDraft() { const d = exports.projectStore.get(); return Boolean(d.note || d.url || d.dimensions || d.district || d.details || exports.attachmentStore.get().length); }

},
"src/lib/routes":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.v7Routes = exports.routePaths = void 0;
exports.pageTitle = pageTitle;
exports.pageDescription = pageDescription;
const portfolio_1 = require("./portfolio");
const data_1 = require("./data");
exports.routePaths = ['/projeler', '/kategoriler', '/ilham-modelleri', '/modelini-getir', '/hakkimizda', '/atolye', ...portfolio_1.works.map(w => '/proje/' + w.id), ...portfolio_1.workCategories.map(c => '/kategoriler/' + c.id), '/', '/urunler', '/tasarim-masasi', '/atolyemiz', '/ozel-uretim', '/malzemeler', '/mekan-fikirleri', '/rehber', '/teklif-al', '/sikca-sorulan-sorular', '/iletisim', '/sepet', '/odeme', '/calisma-dosyam', '/gizlilik', '/atolye-demolari', ...data_1.products.map(p => '/urun/' + p.id), ...data_1.ideas.map(p => '/mekan-fikirleri/' + p.id), ...data_1.journal.map(p => '/rehber/' + p.id)];
function pageTitle(path) { const p = path.split('?')[0]; if (p === '/arama')
    return 'Arama | Elif Tasarım'; if (p === '/calisma-dosyam')
    return 'İlham Dosyanız | Elif Tasarım'; if (p === '/gizlilik')
    return 'Veri ve Dış Servisler | Elif Tasarım'; const w = portfolio_1.works.find(w => '/proje/' + w.id === p); if (w)
    return w.subtitle + ' | Elif Tasarım'; const c = portfolio_1.workCategories.find(c => '/kategoriler/' + c.id === p); if (c)
    return c.name + ' | Elif Tasarım'; const newTitles = { '/projeler': 'Bitirdiğimiz İşler', '/kategoriler': 'Kategoriler', '/ilham-modelleri': 'İlham Modelleri', '/modelini-getir': 'Kendi Modelinizi Getirin', '/hakkimizda': 'Aileden Gelen Ustalık', '/atolye': 'Atölye' }; if (newTitles[p])
    return newTitles[p] + ' | Elif Tasarım'; if (p === '/tasarim-masasi')
    return 'Devir 01. Üç Boyutlu Tasarım Stüdyosu | Elif Tasarım'; const product = data_1.products.find(x => '/urun/' + x.id === p); const article = data_1.journal.find(x => '/rehber/' + x.id === p); const idea = data_1.ideas.find(x => '/mekan-fikirleri/' + x.id === p); return product ? product.name + ' | Elif Tasarım' : article ? article.title + ' | Elif Tasarım' : idea ? idea.name + ' | Elif Tasarım' : { '/': 'Elif Tasarım | El Yapımı Mobilya Atölyesi', '/urunler': 'Koleksiyon | Elif Tasarım', '/teklif-al': 'Özel Ölçü Stüdyosu | Elif Tasarım', '/atolyemiz': 'Atölyemiz | Elif Tasarım', '/malzemeler': 'Malzeme Kütüphanesi | Elif Tasarım', '/sepet': 'Örnek Sepet | Elif Tasarım', '/odeme': 'Sipariş Hazırlığı | Elif Tasarım', '/iletisim': 'İletişim | Elif Tasarım', '/rehber': 'Atölye Notları | Elif Tasarım', '/ozel-uretim': 'Özel Üretim | Elif Tasarım', '/mekan-fikirleri': 'Mekân Fikirleri | Elif Tasarım', '/calisma-dosyam': 'Kaydedilenler | Elif Tasarım', '/gizlilik': 'Önizleme Gizliliği | Elif Tasarım', '/sikca-sorulan-sorular': 'Sorular | Elif Tasarım', '/atolye-demolari': 'Atölye İş Akışı Demosu | Elif Tasarım' }[p] || 'Sayfa bulunamadı | Elif Tasarım'; }
function pageDescription(path) { const p = path.split('?')[0], w = portfolio_1.works.find(w => '/proje/' + w.id === p), c = portfolio_1.workCategories.find(c => '/kategoriler/' + c.id === p); if (w)
    return w.subtitle + '. ' + w.description; if (c)
    return 'Elif Tasarım. ' + c.name + '. ' + c.detail; const desc = { '/': 'Zamana değer katan mobilyalar. İstanbul’daki aile atölyesinden gerçek çalışmalar, ilham modelleri ve Yusuf Usta ile doğrudan iletişim.', '/modelini-getir': 'Pinterest bağlantısı, kendi fotoğrafınız veya fikrinizle başlayın. Ölçü ve kullanımınızı özetleyin, Yusuf Usta ile WhatsApp’ta görüşün.', '/teklif-al': 'Kayıpsız ortak proje taslağı. Yaklaşık ölçü, malzeme ve kullanım ayrıntılarını birlikte hazırlayın.', '/arama': 'Elif Tasarım çalışma arşivi, ilham modelleri ve kategorilerinde arayın.', '/iletisim': 'Yusuf Usta ile doğrudan iletişim. +90 530 879 71 69. Yeni atölye adresini ziyaret öncesinde teyit edin.', '/gizlilik': 'Elif Tasarım V8. Yerel proje taslağı, fotoğraf hazırlama, isteğe bağlı saklama, WhatsApp ve Pinterest hakkında açıklama.', '/calisma-dosyam': 'Gerçek çalışma, konsept model ve Pinterest modelini ortak ilham dosyanızda toplayın.' }; return desc[p] || 'Elif Tasarım. Aileden gelen marangozluk, ölçüye özel üretim, gerçek çalışma arşivi ve doğrudan ustayla görüşme.'; }
exports.v7Routes = [...new Set([...exports.routePaths.filter(p => !['/urunler', '/sepet', '/odeme', '/atolye-demolari', '/atolyemiz', '/mekan-fikirleri'].includes(p) && !p.startsWith('/urun/') && !p.startsWith('/mekan-fikirleri/')), '/arama'])];

},
"src/lib/selections":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectionEntries = void 0;
exports.validSelectionIds = validSelectionIds;
exports.selectedEntries = selectedEntries;
exports.selectionSummary = selectionSummary;
const portfolio_1 = require("./portfolio");
const pinterest_1 = require("./pinterest");
exports.selectionEntries = [...portfolio_1.works.map(w => ({ id: 'work:' + w.id, title: w.subtitle, category: w.category, image: w.images[0], kind: 'work', path: '/proje/' + w.id })), ...portfolio_1.concepts.map(c => ({ id: 'concept:' + c.id, title: c.subtitle, category: c.category, image: c.image, kind: 'concept', path: '/ilham-modelleri' })), ...portfolio_1.pinterestReferences.map(p => ({ id: 'pin:' + p.id, title: pinterest_1.pinLookup[p.id]?.label || p.title, category: p.category, kind: 'reference', path: '/ilham-modelleri' }))];
function validSelectionIds(value) { return Array.isArray(value) ? [...new Set(value.filter((id) => typeof id === 'string' && exports.selectionEntries.some(x => x.id === id)))].slice(0, 24) : []; }
function selectedEntries(ids) { const good = validSelectionIds(ids); return good.map(id => exports.selectionEntries.find(x => x.id === id)); }
function selectionSummary(ids) { return selectedEntries(ids).map(x => x.title + ' [' + x.id + ']' + (x.kind === 'reference' ? '\nKaynak, ' + (pinterest_1.pinLookup[x.id.slice(4)]?.canonical || 'https://pin.it/' + x.id.slice(4)) : '')); }

},
"src/lib/upload":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageDimensions = imageDimensions;
exports.fileTypeError = fileTypeError;
exports.imageBudgetError = imageBudgetError;
exports.prepareImage = prepareImage;
function imageDimensions(b) {
    const at = (n) => b[n] || 0, be16 = (n) => (at(n) << 8) | at(n + 1), be32 = (n) => at(n) * 16777216 + at(n + 1) * 65536 + at(n + 2) * 256 + at(n + 3), le24 = (n) => at(n) + at(n + 1) * 256 + at(n + 2) * 65536, word = (n, s) => s.split('').every((c, i) => at(n + i) === c.charCodeAt(0));
    if (b.length >= 24 && [137, 80, 78, 71, 13, 10, 26, 10].every((v, i) => at(i) === v) && word(12, 'IHDR'))
        return { width: be32(16), height: be32(20), type: 'image/png' };
    if (b.length >= 12 && at(0) === 255 && at(1) === 216) {
        let i = 2;
        while (i + 4 < b.length) {
            if (at(i) !== 255)
                return null;
            while (at(i) === 255)
                i++;
            const marker = at(i++);
            if (marker === 217 || marker === 218)
                break;
            if (marker === 1 || (marker >= 208 && marker <= 215))
                continue;
            const len = be16(i);
            if (len < 2 || i + len > b.length)
                return null;
            if ([192, 193, 194, 195, 197, 198, 199, 201, 202, 203, 205, 206, 207].includes(marker) && len >= 8)
                return { width: be16(i + 5), height: be16(i + 3), type: 'image/jpeg' };
            i += len;
        }
        return null;
    }
    if (b.length >= 30 && word(0, 'RIFF') && word(8, 'WEBP')) {
        if (word(12, 'VP8X')) {
            if (at(20) & 2)
                return null;
            return { width: le24(24) + 1, height: le24(27) + 1, type: 'image/webp' };
        }
        if (word(12, 'VP8 ') && at(23) === 157 && at(24) === 1 && at(25) === 42)
            return { width: (at(26) + at(27) * 256) & 16383, height: (at(28) + at(29) * 256) & 16383, type: 'image/webp' };
        if (word(12, 'VP8L') && at(20) === 47)
            return { width: 1 + (((at(22) & 63) << 8) | at(21)), height: 1 + (((at(24) & 15) << 10) | (at(23) << 2) | ((at(22) & 192) >> 6)), type: 'image/webp' };
    }
    return null;
}
function fileTypeError(type, name) { if (/heic|heif/i.test(type + ' ' + name))
    return 'HEIC/HEIF bu sürümde desteklenmiyor. Fotoğrafı JPG olarak dışa aktarın veya ekran görüntüsünü PNG olarak ekleyin.'; return ['image/jpeg', 'image/png', 'image/webp'].includes(type) ? null : 'JPG, PNG veya WebP biçiminde gerçek bir fotoğraf seçin.'; }
function imageBudgetError(size, bytes, total) { if (!size || !Number.isInteger(size.width) || !Number.isInteger(size.height) || size.width < 1 || size.height < 1)
    return 'Görsel başlığı okunamadı. JPG veya PNG olarak yeniden kaydedin.'; if (bytes > 10 * 1024 * 1024)
    return 'Bir görsel en fazla 10 MB olabilir.'; if (bytes + total > 25 * 1024 * 1024)
    return 'Görsellerin kaynak boyutu toplam en fazla 25 MB olabilir.'; if (size.width * size.height > 20000000)
    return '20 megapikselden küçük bir görsel seçin.'; return null; }
async function prepareImage(file, total) { const typeError = fileTypeError(file.type, file.name); if (typeError)
    throw Error(typeError); if (file.size > 10 * 1024 * 1024)
    throw Error('Bir görsel en fazla 10 MB olabilir.'); if (file.size + total > 25 * 1024 * 1024)
    throw Error('Görsellerin kaynak boyutu toplam en fazla 25 MB olabilir.'); const header = new Uint8Array(await file.slice(0, 524288).arrayBuffer()), size = imageDimensions(header), error = imageBudgetError(size, file.size, total); if (error)
    throw Error(error); if (size.type !== file.type)
    throw Error('Dosya türü ile görsel içeriği uyuşmuyor.'); const bitmap = await createImageBitmap(file); try {
    if (bitmap.width * bitmap.height > 20000000)
        throw Error('20 megapikselden küçük bir görsel seçin.');
    const scale = Math.min(1, 2000 / Math.max(bitmap.width, bitmap.height)), canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    const ctx = canvas.getContext('2d');
    if (!ctx)
        throw Error('Bu tarayıcı görsel hazırlayamıyor.');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise((resolve, reject) => canvas.toBlob(b => b ? resolve(b) : reject(Error('Görsel hazırlanamadı.')), 'image/jpeg', 0.9));
    const id = typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : String(Date.now()) + '-' + Math.random().toString(36).slice(2);
    return { id, name: file.name, file: new File([blob], 'model-' + id.slice(0, 8) + '.jpg', { type: 'image/jpeg' }), preview: URL.createObjectURL(blob), sourceBytes: file.size };
}
finally {
    bitmap.close();
} }

},
"src/lib/zip":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.localZip = localZip;
exports.saveBlob = saveBlob;
async function localZip(entries) {
    let offset = 0;
    const bodies = [], central = [];
    const encoder = new TextEncoder();
    const crc = (data) => { let c = 0xffffffff; for (const n of data) {
        c ^= n;
        for (let i = 0; i < 8; i++)
            c = (c >>> 1) ^ ((c & 1) ? 0xedb88320 : 0);
    } return (c ^ 0xffffffff) >>> 0; };
    for (const e of entries) {
        const name = encoder.encode(e.name.replace(/[^A-Za-z0-9_.-]/g, '_')), data = new Uint8Array(await e.blob.arrayBuffer()), checksum = crc(data);
        const h = new Uint8Array(30 + name.length), v = new DataView(h.buffer);
        v.setUint32(0, 0x04034b50, true);
        v.setUint16(4, 20, true);
        v.setUint16(6, 0x800, true);
        v.setUint16(12, 33, true);
        v.setUint32(14, checksum, true);
        v.setUint32(18, data.length, true);
        v.setUint32(22, data.length, true);
        v.setUint16(26, name.length, true);
        h.set(name, 30);
        const c = new Uint8Array(46 + name.length), cv = new DataView(c.buffer);
        cv.setUint32(0, 0x02014b50, true);
        cv.setUint16(4, 20, true);
        cv.setUint16(6, 20, true);
        cv.setUint16(8, 0x800, true);
        cv.setUint16(14, 33, true);
        cv.setUint32(16, checksum, true);
        cv.setUint32(20, data.length, true);
        cv.setUint32(24, data.length, true);
        cv.setUint16(28, name.length, true);
        cv.setUint32(42, offset, true);
        c.set(name, 46);
        bodies.push(h, data);
        central.push(c);
        offset += h.length + data.length;
    }
    const count = entries.length, csize = central.reduce((n, x) => n + x.length, 0), end = new Uint8Array(22), ev = new DataView(end.buffer);
    ev.setUint32(0, 0x06054b50, true);
    ev.setUint16(8, count, true);
    ev.setUint16(10, count, true);
    ev.setUint32(12, csize, true);
    ev.setUint32(16, offset, true);
    return new Blob([...bodies, ...central, end], { type: 'application/zip' });
}
function saveBlob(name, blob) { const url = URL.createObjectURL(blob), a = document.createElement('a'); a.href = url; a.download = name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 20000); }

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
(0, client_1.createRoot)(root).render((0, react_1.createElement)(App_1.default, { initialPath: window.__ELIF_INITIAL__ || "/" }));

},
"src/pages/BringModel":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BringModel = void 0;
const react_1 = require("react");
const ui_1 = require("../components/ui");
const PortfolioUI_1 = require("../components/PortfolioUI");
const portfolio_1 = require("../lib/portfolio");
const model_request_1 = require("../lib/model-request");
const project_1 = require("../lib/project");
const upload_1 = require("../lib/upload");
const selections_1 = require("../lib/selections");
const zip_1 = require("../lib/zip");
const domain_1 = require("../lib/domain");
const detailsHint = { 'mutfak': 'Mutfak planı, kullanacağınız cihazlar, mevcut tezgâh ve depolama ihtiyacınız.', 'kahve-kosesi': 'Kahve makineniz, su veya priz ihtiyacı, fincanlar ve saklamak istedikleriniz.', 'tv-unitesi': 'TV boyutu, duvar ölçüsü, kablo ve prizlerin yeri, saklamak istedikleriniz.', 'gardrop': 'Askı, çekmece ve raf ihtiyacı. Kapakların açılacağı alan.', 'sehpa': 'Oturma düzeni, orta sehpa veya zigon tercihi, kullanım yüksekliği.', 'pergola': 'Uygulama alanı, zemin ve yaklaşık açıklık. Teknik uygunluk ayrıca değerlendirilecek.' };
class BringModel extends react_1.Component {
    constructor(p) {
        super(p);
        this.alive = true;
        this.busy = false;
        this.set = (key, value) => { const v = project_1.projectStore.patch({ [key]: value }); this.setState({ v, error: '', errorField: '' }); };
        this.fail = (field, error) => { this.setState({ error, errorField: field }, () => document.getElementById(field)?.focus()); };
        this.go = (step) => {
            const { v, files } = this.state;
            if (step > this.state.step) {
                if (v.url.trim() && !(0, model_request_1.normalizeReference)(v.url)) {
                    this.fail('model-url', 'Geçerli bir HTTPS bağlantısı kullanın. Özel ağ veya çalıştırılabilir bağlantı kabul edilmez.');
                    return;
                }
                if (!v.url.trim() && v.note.trim().length < 5 && !files.length && !this.props.favorites.length) {
                    this.fail('model-note', 'Bir bağlantı, fotoğraf, seçki veya en az 5 karakterlik bir fikir ekleyin.');
                    return;
                }
                if (step === 2 && !v.unknown && [v.width, v.depth, v.height].some(x => { const n = (0, project_1.convertMeasure)(x, v.unit, 'mm'); return !n || Number(n) > 20000; })) {
                    this.fail('model-width', 'En, derinlik ve yüksekliği 0 ile 20000 mm arasında girin veya yaklaşık ölçü seçeneğine dönün.');
                    return;
                }
            }
            this.setState({ step, error: '', errorField: '' }, () => document.getElementById('model-step-title')?.focus({ preventScroll: true }));
        };
        this.changeUnit = (unit) => { const { v } = this.state; const dims = [v.width, v.depth, v.height].map(n => (0, project_1.convertMeasure)(n, v.unit, unit)); if (dims.some(n => n === null)) {
            this.fail('model-width', 'Ölçüleri tek bir ondalık ayırıcıyla yazın. Örneğin 123,5.');
            return;
        } this.setState({ v: project_1.projectStore.patch({ unit, width: dims[0], depth: dims[1], height: dims[2] }) }); };
        this.text = () => (0, project_1.projectText)({ ...this.state.v, category: (0, portfolio_1.categoryName)(this.state.v.category) }, this.state.files.map(f => f.file.name), (0, selections_1.selectionSummary)(this.props.favorites));
        this.exportBundle = async () => { this.setState({ sharing: true, message: '' }); try {
            const entries = [{ name: 'Elif_Proje_Ozeti.txt', blob: new Blob([this.text()], { type: 'text/plain;charset=utf-8' }) }, ...this.state.files.map(f => ({ name: f.file.name, blob: f.file }))];
            (0, zip_1.saveBlob)('Elif_Proje_Dosyasi.zip', await (0, zip_1.localZip)(entries));
            this.setState({ message: 'Proje dosyanız bu cihazda hazırlandı. Atölyeye otomatik gönderilmedi.' });
        }
        catch {
            this.setState({ message: 'Dosya hazırlanamadı. Özeti ayrı indirebilir, fotoğrafları WhatsApp içinde ekleyebilirsiniz.' });
        }
        finally {
            this.setState({ sharing: false });
        } };
        this.shareFiles = async () => { const files = this.state.files.map(f => f.file); if (!files.length || !navigator.canShare?.({ files }) || !navigator.share) {
            this.setState({ message: 'Tarayıcınız dosya paylaşımını desteklemiyor. Proje dosyasını indirin, Yusuf Usta ile WhatsApp görüşmesine ekleyin.' });
            return;
        } try {
            await navigator.share({ files, title: 'Elif Tasarım proje fikrim', text: this.text() });
            this.setState({ message: 'Paylaşım ekranından çıktınız. Mesajın Yusuf Usta’ya ulaştığı bu siteden doğrulanamaz.' });
        }
        catch (e) {
            this.setState({ message: e?.name === 'AbortError' ? 'Paylaşım iptal edildi. Fikriniz ve görselleriniz bu sayfada duruyor.' : 'Paylaşım açılamadı. Proje dosyasını indirip WhatsApp görüşmesine ekleyebilirsiniz.' });
        } };
        const q = new URLSearchParams(p.query || '');
        const cat = q.get('kategori') || 'ozel-tasarim';
        project_1.projectStore.seed(p.query || 'default', { category: portfolio_1.workCategories.some(c => c.id === cat) ? cat : 'ozel-tasarim', url: (0, model_request_1.normalizeReference)(q.get('ref') || '') || '', note: (q.get('fikir') || '').slice(0, 1600) });
        if (q.has('en')) {
            const nums = ['en', 'derinlik', 'yukseklik'].map(k => q.get(k) || '');
            if (nums.every(v => /^\d{2,3}$/.test(v) && Number(v) > 0 && Number(v) <= 500))
                project_1.projectStore.seed('desk:' + p.query, { width: nums[0], depth: nums[1], height: nums[2], unit: 'cm', unknown: false, dimensions: nums.join(' × ') + ' cm', material: { ceviz: 'Ceviz görünümü, yapısını görüşelim', mese: 'Meşe görünümü, yapısını görüşelim', kestane: 'Kestane görünümü, yapısını görüşelim' }[q.get('malzeme') || ''] || project_1.projectStore.get().material, details: project_1.projectStore.get().details || 'Taşıyıcı fikri, ' + ({ wood: 'ahşap ayak', metal: 'metal taşıyıcı', adjustable: 'yükseklik ayarlı' }[q.get('ayak') || ''] || 'birlikte değerlendirelim') }, true);
            const d = project_1.projectStore.get();
            if (!d.note)
                project_1.projectStore.patch({ note: 'Tasarım masasında hazırladığım ölçülerle masa projemi konuşmak istiyorum.' });
        }
        this.state = { step: 0, v: project_1.projectStore.get(), files: project_1.attachmentStore.get(), error: '', errorField: '', loading: false, sharing: false, message: '' };
    }
    componentWillUnmount() { this.alive = false; }
    async add(list) { if (!list || this.busy)
        return; const incoming = Array.from(list), existing = project_1.attachmentStore.get(); if (existing.length + incoming.length > 5) {
        this.fail('model-files', 'En fazla 5 görsel ekleyebilirsiniz. Fazla görselleri çıkarıp yeniden seçin.');
        return;
    } if (existing.reduce((n, f) => n + f.sourceBytes, 0) + incoming.reduce((n, f) => n + f.size, 0) > 25 * 1024 * 1024) {
        this.fail('model-files', 'Görsellerin kaynak boyutu toplam en fazla 25 MB olabilir.');
        return;
    } this.busy = true; this.setState({ loading: true, error: '', errorField: '' }); const accepted = []; let total = existing.reduce((n, f) => n + f.sourceBytes, 0), error = ''; for (const file of incoming) {
        try {
            const a = await (0, upload_1.prepareImage)(file, total);
            accepted.push(a);
            total += file.size;
        }
        catch (e) {
            error = e instanceof Error ? e.message : 'Görsel hazırlanamadı.';
        }
    } if (this.alive) {
        project_1.attachmentStore.add(accepted);
        this.setState({ files: project_1.attachmentStore.get(), loading: false, error, errorField: error ? 'model-files' : '' });
    }
    else
        accepted.forEach(f => URL.revokeObjectURL(f.preview)); this.busy = false; }
    render() {
        const a = this.props, { v, files, step, error, errorField } = this.state, selection = (0, selections_1.selectedEntries)(a.favorites);
        return (0, react_1.createElement)(react_1.Fragment, null,
            (0, react_1.createElement)("header", { className: "v6-page-head wrap model-head" },
                (0, react_1.createElement)(ui_1.Eyebrow, null, "EL\u0130F / S\u0130Z\u0130N F\u0130KR\u0130N\u0130Z"),
                (0, react_1.createElement)("div", null,
                    (0, react_1.createElement)("h1", null, a.advanced ? (0, react_1.createElement)(react_1.Fragment, null,
                        "\u00D6l\u00E7\u00FCs\u00FC size.",
                        (0, react_1.createElement)("br", null),
                        (0, react_1.createElement)("em", null, "Hik\u00E2yesi birlikte.")) : (0, react_1.createElement)(react_1.Fragment, null,
                        "Kendi modelinizi getirin.",
                        (0, react_1.createElement)("br", null),
                        (0, react_1.createElement)("em", null, "Birlikte \u00FCretelim."))),
                    (0, react_1.createElement)("p", null, "Pinterest'te g\u00F6rd\u00FC\u011F\u00FCn\u00FCz bir model, bir foto\u011Fraf veya kendi \u00E7iziminiz. Alan\u0131n\u0131za uygun olan\u0131 Yusuf Usta ile birlikte d\u00FC\u015F\u00FCnelim."))),
            (0, react_1.createElement)("section", { className: "wrap model-request" },
                (0, react_1.createElement)("aside", { className: "model-aside" },
                    (0, react_1.createElement)("div", null,
                        (0, react_1.createElement)(PortfolioUI_1.VImage, { asset: "concept-model", alt: "Fikirler, \u00E7izimler ve numunelerden olu\u015Fan konsept model", eager: true, sizes: "(max-width: 800px) 90vw, 34vw" }),
                        (0, react_1.createElement)(PortfolioUI_1.SourceTag, { kind: "concept" })),
                    (0, react_1.createElement)("h2", null,
                        "Her fikir,",
                        (0, react_1.createElement)("br", null),
                        (0, react_1.createElement)("em", null, "konu\u015Fmaya de\u011Fer.")),
                    (0, react_1.createElement)("p", null, "\u00D6nce ihtiyac\u0131n\u0131z\u0131, sonra \u00F6l\u00E7\u00FC, malzeme ve uygulanabilirli\u011Fi konu\u015Furuz. Bu a\u015Famada kesin karar vermeniz gerekmiyor."),
                    (0, react_1.createElement)("ol", null,
                        (0, react_1.createElement)("li", null,
                            (0, react_1.createElement)("span", null, "01"),
                            "Model veya fikir"),
                        (0, react_1.createElement)("li", null,
                            (0, react_1.createElement)("span", null, "02"),
                            "Size g\u00F6re ayr\u0131nt\u0131lar"),
                        (0, react_1.createElement)("li", null,
                            (0, react_1.createElement)("span", null, "03"),
                            "Do\u011Frudan ustayla g\u00F6r\u00FC\u015Fme")),
                    (0, react_1.createElement)("a", { className: "v7-direct", href: 'tel:' + project_1.business.telephone },
                        (0, react_1.createElement)(ui_1.Icon, { name: "phone" }),
                        " ",
                        project_1.business.display),
                    (0, react_1.createElement)("p", { className: "fineprint" }, "Yusuf Usta. Telefon numaras\u0131 i\u015Fletme i\u00E7in payla\u015F\u0131ld\u0131. Yeni at\u00F6lye adresini ziyaret \u00F6ncesinde g\u00F6r\u00FC\u015Fmede teyit edin."),
                    (0, react_1.createElement)("p", { className: "fineprint" }, "Tasla\u011F\u0131n\u0131z bu a\u00E7\u0131k sekmede, sayfalar aras\u0131nda korunur. Sayfay\u0131 yenilemeden veya kapatmadan \u00F6nce proje dosyan\u0131z\u0131 indirin. Foto\u011Fraf ve notlar sunucuda saklanmaz.")),
                (0, react_1.createElement)("div", { className: "model-form" },
                    (0, react_1.createElement)("nav", { className: "model-stepper", "aria-label": "Model payla\u015F\u0131m ad\u0131mlar\u0131" }, ['Modeliniz', 'Ayrıntılar', 'Görüşelim'].map((title, i) => (0, react_1.createElement)("button", { key: title, type: "button", "aria-current": step === i ? 'step' : undefined, disabled: i > step, onClick: () => this.go(i) },
                        (0, react_1.createElement)("span", null, String(i + 1).padStart(2, '0')),
                        title))),
                    (0, react_1.createElement)("div", { className: "model-form-inner" },
                        (0, react_1.createElement)(ui_1.Eyebrow, null,
                            "ADIM ",
                            step + 1,
                            " / 3"),
                        (0, react_1.createElement)("h2", { id: "model-step-title", tabIndex: -1 }, ['Neyi beğendiniz?', 'Sizin için nasıl olsun?', 'Şimdi Yusuf Usta ile konuşalım.'][step]),
                        (0, react_1.createElement)("form", { noValidate: true, onSubmit: e => { e.preventDefault(); if (step < 2)
                                this.go(step + 1); } },
                            step === 0 && (0, react_1.createElement)(react_1.Fragment, null,
                                (0, react_1.createElement)("label", { className: "form-field", htmlFor: "model-url" },
                                    (0, react_1.createElement)("span", null, "Pinterest veya model ba\u011Flant\u0131s\u0131"),
                                    (0, react_1.createElement)("input", { id: "model-url", type: "url", value: v.url, maxLength: 2000, autoComplete: "off", onInput: e => this.set('url', e.currentTarget.value), placeholder: "https://pin.it/\u2026", "aria-invalid": errorField === 'model-url' || undefined, "aria-describedby": 'model-url-help' + (errorField === 'model-url' ? ' model-error' : '') })),
                                (0, react_1.createElement)("p", { className: "field-hint", id: "model-url-help" }, "HTTPS ba\u011Flant\u0131s\u0131 kullan\u0131n. \u0130\u00E7eri\u011Fi otomatik okunmaz, bu site ba\u011Flant\u0131daki sayfay\u0131 taramaz."),
                                (0, react_1.createElement)("div", { className: "or-divider" },
                                    (0, react_1.createElement)("span", null, "ya da bir foto\u011Fraf ekleyin")),
                                (0, react_1.createElement)("label", { className: "model-dropzone" },
                                    (0, react_1.createElement)(ui_1.Icon, { name: "upload", size: 30 }),
                                    (0, react_1.createElement)("strong", null, this.state.loading ? 'Görseller hazırlanıyor…' : 'Fotoğraf veya çiziminizi seçin'),
                                    (0, react_1.createElement)("span", null, "JPG, PNG, WebP. En fazla 5 dosya. Dosya ba\u015F\u0131na 10 MB, toplam 25 MB."),
                                    (0, react_1.createElement)("input", { id: "model-files", "aria-label": "Model g\u00F6rsellerini se\u00E7", type: "file", multiple: true, accept: "image/jpeg,image/png,image/webp,.heic,.heif", disabled: this.state.loading, "aria-invalid": errorField === 'model-files' || undefined, "aria-describedby": 'upload-help' + (errorField === 'model-files' ? ' model-error' : ''), onChange: e => { this.add(e.currentTarget.files); e.currentTarget.value = ''; } })),
                                (0, react_1.createElement)("p", { className: "field-hint", id: "upload-help" }, "HEIC i\u00E7in JPG veya ekran g\u00F6r\u00FCnt\u00FCs\u00FC kullan\u0131n. Payla\u015F\u0131m kopyas\u0131 en fazla 2000 piksele k\u00FC\u00E7\u00FClt\u00FCl\u00FCr ve JPEG olarak haz\u0131rlan\u0131r. Dosya metadata\u2019s\u0131 aktar\u0131lmaz, foto\u011Frafta g\u00F6r\u00FCnen \u00F6zel bilgiler kendili\u011Finden silinmez."),
                                files.length > 0 && (0, react_1.createElement)("div", { className: "model-uploads" }, files.map(f => (0, react_1.createElement)("div", { key: f.id },
                                    (0, react_1.createElement)("img", { src: f.preview, alt: f.name }),
                                    (0, react_1.createElement)("span", null, f.name),
                                    (0, react_1.createElement)("button", { type: "button", "aria-label": f.name + ' görselini kaldır', onClick: () => { project_1.attachmentStore.remove(f.id); this.setState({ files: project_1.attachmentStore.get() }); } },
                                        (0, react_1.createElement)(ui_1.Icon, { name: "close", size: 16 }))))),
                                (0, react_1.createElement)("label", { className: "form-field spaced", htmlFor: "model-note" },
                                    (0, react_1.createElement)("span", null, "Modelde neyi sevdiniz?"),
                                    (0, react_1.createElement)("textarea", { id: "model-note", rows: 4, value: v.note, maxLength: 1600, "aria-invalid": errorField === 'model-note' || undefined, "aria-describedby": errorField === 'model-note' ? 'model-error' : 'note-help', onInput: e => this.set('note', e.currentTarget.value), placeholder: "Yuvarlak k\u00F6\u015Felerini sevdim. Daha k\u00FC\u00E7\u00FCk bir \u00F6l\u00E7\u00FC ve a\u00E7\u0131k ton istiyorum." })),
                                (0, react_1.createElement)("p", { className: "field-hint", id: "note-help" }, "Hen\u00FCz g\u00F6rseliniz yoksa fikrinizi yazman\u0131z da yeterli."),
                                selection.length > 0 && (0, react_1.createElement)("div", { className: "v7-selected-note" },
                                    (0, react_1.createElement)("strong", null,
                                        "\u0130lham dosyan\u0131zdan ",
                                        selection.length,
                                        " se\u00E7im eklenecek."),
                                    (0, react_1.createElement)("ul", null, selection.map(s => (0, react_1.createElement)("li", { key: s.id }, s.title))),
                                    (0, react_1.createElement)(ui_1.Link, { to: "/calisma-dosyam", navigate: a.navigate }, "Se\u00E7imlerimi d\u00FCzenle"))),
                            step === 1 && (0, react_1.createElement)(react_1.Fragment, null,
                                (0, react_1.createElement)("label", { className: "form-field" },
                                    "\u00DCr\u00FCn veya uygulama t\u00FCr\u00FC",
                                    (0, react_1.createElement)("select", { "aria-label": "Model kategorisi", value: v.category, onChange: e => this.set('category', e.currentTarget.value) }, portfolio_1.workCategories.map(c => (0, react_1.createElement)("option", { key: c.id, value: c.id }, c.name)))),
                                (0, react_1.createElement)("label", { className: "form-field" },
                                    "Yakla\u015F\u0131k \u00F6l\u00E7\u00FC, biliyorsan\u0131z",
                                    (0, react_1.createElement)("input", { id: "model-dimensions", value: v.dimensions, maxLength: 160, onInput: e => this.set('dimensions', e.currentTarget.value), placeholder: "\u00D6rne\u011Fin, en 180 cm, derinlik 45 cm" })),
                                (0, react_1.createElement)("label", { className: "v7-check" },
                                    (0, react_1.createElement)("input", { type: "checkbox", checked: !v.unknown, onChange: e => this.set('unknown', !e.currentTarget.checked) }),
                                    "En, derinlik ve y\u00FCksekli\u011Fi ayr\u0131 ayr\u0131 biliyorum."),
                                !v.unknown && (0, react_1.createElement)(react_1.Fragment, null,
                                    (0, react_1.createElement)("div", { className: "v7-measures" }, [['width', 'En'], ['depth', 'Derinlik'], ['height', 'Yükseklik']].map(([key, label]) => (0, react_1.createElement)("label", { className: "form-field", key: key },
                                        label,
                                        (0, react_1.createElement)("input", { id: 'model-' + key, inputMode: "decimal", "aria-label": label, value: v[key], maxLength: 10, "aria-invalid": errorField === 'model-width' || undefined, "aria-describedby": errorField === 'model-width' ? 'model-error' : undefined, onInput: e => this.set(key, e.currentTarget.value) })))),
                                    (0, react_1.createElement)("label", { className: "form-field" },
                                        "\u00D6l\u00E7\u00FC birimi",
                                        (0, react_1.createElement)("select", { "aria-label": "\u00D6l\u00E7\u00FC birimi", value: v.unit, onChange: e => this.changeUnit(e.currentTarget.value) },
                                            (0, react_1.createElement)("option", { value: "cm" }, "Santimetre (cm)"),
                                            (0, react_1.createElement)("option", { value: "mm" }, "Milimetre (mm)"))),
                                    (0, react_1.createElement)("p", { className: "field-hint" }, "Birim de\u011Fi\u015Fince fiziksel \u00F6l\u00E7\u00FC korunur. 123,5 cm, 1235 mm olur. Bunlar imalat i\u00E7in onaylanm\u0131\u015F \u00F6l\u00E7\u00FCler de\u011Fildir.")),
                                (0, react_1.createElement)("label", { className: "form-field" },
                                    "Kullan\u0131m\u0131n\u0131z i\u00E7in \u00F6nemli ayr\u0131nt\u0131lar",
                                    (0, react_1.createElement)("textarea", { rows: 3, value: v.details, maxLength: 1200, onInput: e => this.set('details', e.currentTarget.value), placeholder: detailsHint[v.category] || 'Ne için kullanacaksınız, sizin için hangi ayrıntılar önemli?' })),
                                (0, react_1.createElement)("div", { className: "form-row" },
                                    (0, react_1.createElement)("label", { className: "form-field" },
                                        "Malzeme yakla\u015F\u0131m\u0131",
                                        (0, react_1.createElement)("select", { value: v.material, onChange: e => this.set('material', e.currentTarget.value) }, ['Birlikte değerlendirelim', 'Ceviz görünümü, yapısını görüşelim', 'Meşe görünümü, yapısını görüşelim', 'Kestane görünümü, yapısını görüşelim', 'Ahşap / ahşap kaplama görünümü', 'Boyalı veya lake görünüm', 'Levha esaslı seçenekleri görüşelim', 'Masif ahşap uygunluğunu görüşelim'].map(x => (0, react_1.createElement)("option", { key: x }, x)))),
                                    (0, react_1.createElement)("label", { className: "form-field" },
                                        "Y\u00FCzey ve renk",
                                        (0, react_1.createElement)("select", { value: v.finish, onChange: e => this.set('finish', e.currentTarget.value) }, ['Birlikte değerlendirelim', 'Açık ton ve mat görünüm', 'Koyu ton ve ahşap dokusu', 'Kendi renk örneğimi paylaşacağım'].map(x => (0, react_1.createElement)("option", { key: x }, x))))),
                                (0, react_1.createElement)("p", { className: "field-hint" }, "G\u00F6vde, kapak, kaplama, donan\u0131m ve tezg\u00E2h ayr\u0131 kararlard\u0131r. Se\u00E7im bir malzeme taahh\u00FCd\u00FC olu\u015Fturmaz."),
                                (0, react_1.createElement)("div", { className: "form-row" },
                                    (0, react_1.createElement)("label", { className: "form-field" },
                                        "Uygulama ili veya il\u00E7esi",
                                        (0, react_1.createElement)("input", { id: "model-district", value: v.district, maxLength: 100, onInput: e => this.set('district', e.currentTarget.value), placeholder: "\u0130stanbul, Kad\u0131k\u00F6y gibi" })),
                                    (0, react_1.createElement)("label", { className: "form-field" },
                                        "Zaman beklentiniz",
                                        (0, react_1.createElement)("input", { value: v.timing, maxLength: 160, onInput: e => this.set('timing', e.currentTarget.value) }))),
                                (0, react_1.createElement)("label", { className: "form-field" },
                                    "Hangi a\u015Famadas\u0131n\u0131z?",
                                    (0, react_1.createElement)("select", { value: v.readiness, onChange: e => this.set('readiness', e.currentTarget.value) }, ['Fikir topluyorum', 'Ölçü ve bütçeyi konuşmak istiyorum', 'Projemi netleştirmeye hazırım'].map(x => (0, react_1.createElement)("option", { key: x }, x)))),
                                (0, react_1.createElement)("label", { className: "form-field" },
                                    "Nas\u0131l yorumlayal\u0131m?",
                                    (0, react_1.createElement)("select", { value: v.interpretation, "aria-label": "Tasar\u0131m yakla\u015F\u0131m\u0131", onChange: e => this.set('interpretation', e.currentTarget.value) },
                                        (0, react_1.createElement)("option", null, "Alan\u0131ma g\u00F6re birlikte yorumlayal\u0131m"),
                                        (0, react_1.createElement)("option", null, "Benzer bir form, farkl\u0131 \u00F6l\u00E7\u00FC ve malzeme"),
                                        (0, react_1.createElement)("option", null, "Yaln\u0131z bir ayr\u0131nt\u0131s\u0131ndan ilham alal\u0131m")))),
                            step === 2 && (0, react_1.createElement)(react_1.Fragment, null,
                                (0, react_1.createElement)("p", { className: "model-summary-intro" },
                                    "\u00D6zetinizi kontrol edin. WhatsApp d\u00FC\u011Fmesi Yusuf Usta\u2019n\u0131n ",
                                    (0, react_1.createElement)("strong", null, project_1.business.display),
                                    " numaral\u0131 g\u00F6r\u00FC\u015Fmesini haz\u0131r mesajla a\u00E7ar."),
                                (0, react_1.createElement)("dl", { className: "model-summary" },
                                    (0, react_1.createElement)("div", null,
                                        (0, react_1.createElement)("dt", null, "\u0130htiya\u00E7"),
                                        (0, react_1.createElement)("dd", null, (0, portfolio_1.categoryName)(v.category))),
                                    (0, react_1.createElement)("div", null,
                                        (0, react_1.createElement)("dt", null, "\u00D6l\u00E7\u00FC"),
                                        (0, react_1.createElement)("dd", null, !v.unknown ? [v.width, v.depth, v.height].join(' × ') + ' ' + v.unit : v.dimensions || 'Birlikte belirlenecek')),
                                    (0, react_1.createElement)("div", null,
                                        (0, react_1.createElement)("dt", null, "B\u00F6lge"),
                                        (0, react_1.createElement)("dd", null, v.district || 'Görüşmede paylaşılacak')),
                                    (0, react_1.createElement)("div", null,
                                        (0, react_1.createElement)("dt", null, "G\u00F6rseller"),
                                        (0, react_1.createElement)("dd", null,
                                            files.length,
                                            " haz\u0131rlanm\u0131\u015F JPEG, yaln\u0131z cihaz\u0131n\u0131zda")),
                                    (0, react_1.createElement)("div", null,
                                        (0, react_1.createElement)("dt", null, "Se\u00E7kiler"),
                                        (0, react_1.createElement)("dd", null,
                                            selection.length,
                                            " \u00E7al\u0131\u015Fma veya ilham modeli"))),
                                v.note && (0, react_1.createElement)("blockquote", { className: "model-quote" }, v.note),
                                (0, react_1.createElement)("div", { className: "v7-handoff" },
                                    (0, react_1.createElement)(ui_1.Eyebrow, null, "DO\u011ERUDAN YUSUF USTA"),
                                    (0, react_1.createElement)("h3", null, "Konu\u015Fman\u0131n ilk ad\u0131m\u0131."),
                                    (0, react_1.createElement)("p", null, "WhatsApp harici bir servistir. T\u0131klad\u0131\u011F\u0131n\u0131zda a\u015Fa\u011F\u0131daki \u00F6zet WhatsApp'a aktar\u0131l\u0131r. G\u00F6nder d\u00FC\u011Fmesine orada siz basars\u0131n\u0131z. Foto\u011Fraflar metin ba\u011Flant\u0131s\u0131na eklenmez."),
                                    (0, react_1.createElement)("a", { className: "button", href: (0, project_1.whatsappUrl)(this.text()), target: "_blank", rel: "noopener noreferrer" },
                                        "Yusuf Usta\u2019ya WhatsApp\u2019ta yaz ",
                                        (0, react_1.createElement)(ui_1.Icon, { name: "diagonal" })),
                                    (0, react_1.createElement)("p", { className: "field-hint" }, "Bu site mesaj teslimini veya okundu bilgisini do\u011Frulamaz. Hen\u00FCz sipari\u015F olu\u015Fmad\u0131.")),
                                (0, react_1.createElement)("div", { className: "model-export" },
                                    (0, react_1.createElement)("button", { type: "button", className: "button button-outline", disabled: this.state.sharing, onClick: this.exportBundle },
                                        "\u00D6zet ve g\u00F6rselleri indir ",
                                        (0, react_1.createElement)(ui_1.Icon, { name: "download" })),
                                    files.length > 0 && (0, react_1.createElement)("button", { type: "button", className: "button button-outline", onClick: this.shareFiles },
                                        "G\u00F6rselleri cihazdan payla\u015F ",
                                        (0, react_1.createElement)(ui_1.Icon, { name: "diagonal" })),
                                    (0, react_1.createElement)("button", { type: "button", className: "text-link", onClick: () => (0, domain_1.downloadText)('Elif_Proje_Ozeti.txt', this.text()) },
                                        "Yaln\u0131z \u00F6zeti indir ",
                                        (0, react_1.createElement)(ui_1.Icon, { name: "download", size: 16 }))),
                                (0, react_1.createElement)("p", { className: "field-hint" }, "Cihaz payla\u015F\u0131m ekran\u0131nda WhatsApp\u2019\u0131 ve do\u011Fru ki\u015Fiyi ayr\u0131ca se\u00E7ersiniz. \u0130ndirilen ZIP dosyas\u0131n\u0131 WhatsApp g\u00F6r\u00FC\u015Fmesine belge olarak da ekleyebilirsiniz."),
                                this.state.message && (0, react_1.createElement)("p", { role: "status", className: "v7-status" }, this.state.message)),
                            error && (0, react_1.createElement)("p", { id: "model-error", className: "model-error", role: "alert" }, error),
                            (0, react_1.createElement)("div", { className: "model-actions" },
                                step > 0 ? (0, react_1.createElement)("button", { type: "button", className: "back-button", onClick: () => this.go(step - 1) },
                                    (0, react_1.createElement)(ui_1.Icon, { name: "arrow" }),
                                    step === 2 ? 'Bilgileri düzenle' : 'Geri') : (0, react_1.createElement)("span", { className: "field-hint" }, "Kesin \u00F6l\u00E7\u00FC bilmeden ba\u015Flayabilirsiniz."),
                                step < 2 && (0, react_1.createElement)("button", { type: "submit", className: "button", disabled: this.state.loading },
                                    "Devam et ",
                                    (0, react_1.createElement)(ui_1.Icon, null))))))),
            (0, react_1.createElement)("div", { className: "wrap model-more" },
                (0, react_1.createElement)("p", null, "K\u0131sa model payla\u015F\u0131m\u0131 ve ayr\u0131nt\u0131l\u0131 \u00F6l\u00E7\u00FC st\u00FCdyosu ayn\u0131 tasla\u011F\u0131 kullan\u0131r. Bu sekmede ge\u00E7i\u015F yap\u0131nca bilgileriniz korunur."),
                (0, react_1.createElement)(ui_1.ButtonLink, { to: a.advanced ? '/modelini-getir' : '/teklif-al', navigate: a.navigate, secondary: true }, a.advanced ? 'Model paylaşımına dön' : 'Özel ölçü stüdyosunu aç')));
    }
}
exports.BringModel = BringModel;

},
"src/pages/DesignDesk":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesignDesk = DesignDesk;
const react_1 = require("react");
const DeskExperience_1 = require("../components/DeskExperience");
const ui_1 = require("../components/ui");
function DesignDesk(props) { return (0, react_1.createElement)(react_1.Fragment, null,
    (0, react_1.createElement)("section", { className: "wrap v8-studio-page" },
        (0, react_1.createElement)(DeskExperience_1.DeskExperience, { ...props })),
    (0, react_1.createElement)("section", { className: "wrap v8-details" },
        (0, react_1.createElement)("div", { className: "v8-details-heading" },
            (0, react_1.createElement)(ui_1.Eyebrow, null, "G\u00D6R\u00DCNMEYEN EMEK, H\u0130SSED\u0130LEN FARK."),
            (0, react_1.createElement)("h2", null,
                "\u0130yi bir \u00E7al\u0131\u015Fma alan\u0131,",
                (0, react_1.createElement)("br", null),
                (0, react_1.createElement)("em", null, "ayr\u0131nt\u0131larda ba\u015Flar.")),
            (0, react_1.createElement)("p", null, "Tablan\u0131n alt\u0131nda bir \u00E7ekmece. Yan\u0131n\u0131zda yeni bir y\u00FCzey. Her hareket, g\u00FCnl\u00FCk kullan\u0131m\u0131n bir par\u00E7as\u0131 olarak d\u00FC\u015F\u00FCn\u00FCl\u00FCr.")),
        (0, react_1.createElement)("div", { className: "v8-detail-grid" },
            (0, react_1.createElement)("article", null,
                (0, react_1.createElement)(ui_1.Photo, { name: "devir-detail.webp", alt: "Devir 01 konseptinin \u00E7ekmece ve ah\u015Fap birle\u015Fim ayr\u0131nt\u0131s\u0131" }),
                (0, react_1.createElement)("span", null, "01 / EL\u0130N\u0130Z\u0130N ALTINDA"),
                (0, react_1.createElement)("h3", null, "Her e\u015Fyan\u0131n bir yeri."),
                (0, react_1.createElement)("p", null, "Ana y\u00FCzeyle birlikte hareket eden ince \u00E7ekmeceler. Yan mod\u00FClde ayr\u0131 \u00E7ekmece ve kapakl\u0131 depolama. \u0130\u00E7 d\u00FCzen, ger\u00E7ek kullan\u0131m\u0131n\u0131za g\u00F6re konu\u015Fulur.")),
            (0, react_1.createElement)("article", null,
                (0, react_1.createElement)(ui_1.Photo, { name: "devir-standing.webp", alt: "Devir 01 konsepti y\u00FCkseltilmi\u015F ana tabla ve al\u00E7ak yan mod\u00FClle" }),
                (0, react_1.createElement)("span", null, "02 / FARKLI B\u0130R R\u0130T\u0130M"),
                (0, react_1.createElement)("h3", null, "Birbirinden ba\u011F\u0131ms\u0131z y\u00FCzeyler."),
                (0, react_1.createElement)("p", null, "\u00C7al\u0131\u015Fma tablas\u0131 y\u00FCkselirken yard\u0131mc\u0131 alan yerinde kal\u0131r. Mekanizma ve g\u00FCvenli hareket mesafeleri \u00FCretim tasar\u0131m\u0131nda ayr\u0131ca do\u011Frulan\u0131r.")),
            (0, react_1.createElement)("article", null,
                (0, react_1.createElement)(ui_1.Photo, { name: "devir-top.webp", alt: "Devir 01 d\u00F6ner yan mod\u00FCl\u00FCn \u00FCstten konsept g\u00F6r\u00FCn\u00FCm\u00FC" }),
                (0, react_1.createElement)("span", null, "03 / ALANINIZA G\u00D6RE"),
                (0, react_1.createElement)("h3", null, "Tek bi\u00E7ime ba\u011Fl\u0131 kalmay\u0131n."),
                (0, react_1.createElement)("p", null, "Toplu, k\u00F6\u015Fe veya a\u00E7\u0131k yerle\u015Fim. Ekrandaki a\u00E7\u0131 ve \u00F6l\u00E7\u00FCler, at\u00F6lyeyle g\u00F6r\u00FC\u015Fmenize bir ba\u015Flang\u0131\u00E7 noktas\u0131 olu\u015Fturur."))),
        (0, react_1.createElement)("div", { className: "v8-detail-end" },
            (0, react_1.createElement)("p", null, "Be\u011Fendi\u011Finiz ba\u015Fka bir ayr\u0131nt\u0131 m\u0131 var?"),
            (0, react_1.createElement)(ui_1.Link, { to: "/modelini-getir", navigate: props.navigate, className: "text-link" },
                "Kendi modelinizi de getirin ",
                (0, react_1.createElement)(ui_1.Icon, null))))); }

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
exports.Home = void 0;
const react_1 = require("react");
const ui_1 = require("../components/ui");
const PortfolioUI_1 = require("../components/PortfolioUI");
const portfolio_1 = require("../lib/portfolio");
const Portfolio_1 = require("./Portfolio");
const DeskExperience_1 = require("../components/DeskExperience");
const desk_1 = require("../lib/desk");
const scenes = [{ image: 'concept-hero', caption: 'Bir masanın etrafında.', label: 'Yaşam', kind: 'concept' }, { image: 'r13', caption: 'Atölyeden, evin kalbine.', label: 'Mutfak', kind: 'work' }, { image: 'r07', caption: 'Yusuf Usta’nın arşivinden.', label: 'Kahve', kind: 'work' }];
class Home extends react_1.Component {
    constructor() {
        super(...arguments);
        this.state = { scene: 0, desk: { ...desk_1.defaultDesk }, chapter: 0 };
    }
    render() {
        const a = this.props, s = this.state, scene = scenes[s.scene];
        return (0, react_1.createElement)("div", { className: "v6-home v9-home" },
            (0, react_1.createElement)("section", { className: "v6-hero", "aria-label": "Elif Tasar\u0131m a\u00E7\u0131l\u0131\u015F se\u00E7kisi" },
                (0, react_1.createElement)("div", { className: "v6-hero-scene", key: scene.image },
                    (0, react_1.createElement)(PortfolioUI_1.VImage, { asset: scene.image, alt: scene.caption + (scene.kind === 'concept' ? ' Konsept mobilya sahnesi.' : ' Atölyeden paylaşılan çalışma fotoğrafı.'), eager: true, full: true, sizes: "100vw" })),
                (0, react_1.createElement)("div", { className: "v6-hero-shade" }),
                (0, react_1.createElement)("div", { className: "wrap v6-hero-inner" },
                    (0, react_1.createElement)(ui_1.Eyebrow, null, "\u0130STANBUL / EL YAPIMI MOB\u0130LYA AT\u00D6LYES\u0130"),
                    (0, react_1.createElement)("h1", null,
                        "Zamana de\u011Fer",
                        (0, react_1.createElement)("br", null),
                        " ",
                        (0, react_1.createElement)("em", null, "katan mobilyalar.")),
                    (0, react_1.createElement)("p", null,
                        "\u0130stanbul\u2019daki aile at\u00F6lyemizden, ya\u015Fam alan\u0131n\u0131za.",
                        (0, react_1.createElement)("br", null),
                        "\u00D6l\u00E7\u00FCn\u00FCze ve ihtiyac\u0131n\u0131za g\u00F6re, do\u011Frudan ustas\u0131yla."),
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
                (0, react_1.createElement)("span", { className: "hero-source" }, scene.kind === 'concept' ? 'KONSEPT MODEL' : 'GERÇEK ÇALIŞMA FOTOĞRAFI / ATÖLYE ARŞİVİ')),
            (0, react_1.createElement)("nav", { className: "v9-category-strip", "aria-label": "Ya\u015Fam alan\u0131na g\u00F6re ke\u015Ffet" },
                (0, react_1.createElement)("div", { className: "wrap v9-category-row" }, portfolio_1.workCategories.map(c => (0, react_1.createElement)(ui_1.Link, { key: c.id, to: '/kategoriler/' + c.id, navigate: a.navigate, className: "v9-category-card" },
                    (0, react_1.createElement)("div", null,
                        (0, react_1.createElement)(PortfolioUI_1.VImage, { asset: c.image, alt: c.name + ' konsept modeli', sizes: "(max-width: 650px) 140px, 180px" })),
                    (0, react_1.createElement)("span", null, c.name),
                    (0, react_1.createElement)(ui_1.Icon, { size: 14 })))),
                (0, react_1.createElement)("p", { className: "wrap v9-strip-caption" }, "Alan\u0131n\u0131zdan ba\u015Flay\u0131n. G\u00F6rseller konsept se\u00E7kisidir.")),
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
                (0, react_1.createElement)("div", { className: "concept-grid three" }, portfolio_1.concepts.slice(0, 3).map(c => (0, react_1.createElement)(Portfolio_1.ConceptCard, { key: c.id, c: c, navigate: a.navigate, actions: a })))),
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
            (0, react_1.createElement)("section", { className: "wrap v8-home-studio", id: "uc-boyutlu-studyo" },
                (0, react_1.createElement)(DeskExperience_1.DeskExperience, { compact: true, navigate: a.navigate, notify: a.notify })),
            (0, react_1.createElement)("section", { className: "v9-craft-story wrap" },
                (0, react_1.createElement)("div", { className: "v9-craft-image" },
                    (0, react_1.createElement)(PortfolioUI_1.VImage, { asset: "work-joinery", alt: "At\u00F6lye ar\u015Fivinden ah\u015Fap birle\u015Fim ve ta\u015F\u0131y\u0131c\u0131 ayr\u0131nt\u0131s\u0131", sizes: "(max-width: 700px) 90vw, 36vw" }),
                    (0, react_1.createElement)(PortfolioUI_1.SourceTag, { kind: "work" })),
                (0, react_1.createElement)("div", { className: "v9-craft-copy" },
                    (0, react_1.createElement)(ui_1.Eyebrow, null, "DETAYLARDA \u0130NCEL\u0130K"),
                    (0, react_1.createElement)("h2", null,
                        "Malzemenin dili.",
                        (0, react_1.createElement)("br", null),
                        (0, react_1.createElement)("em", null, "Ustan\u0131n yorumu.")),
                    (0, react_1.createElement)("p", null, "Bir kapa\u011F\u0131n oran\u0131, bir raf\u0131n yeri, bir birle\u015Fimin \u00E7izgisi. \u0130yi bir par\u00E7a, yaln\u0131z g\u00F6r\u00FCn\u00FC\u015F\u00FCyle de\u011Fil, g\u00FCnl\u00FCk hayattaki kullan\u0131m\u0131yla tamamlan\u0131r."),
                    (0, react_1.createElement)("div", { className: "v9-craft-points" },
                        (0, react_1.createElement)("span", null,
                            (0, react_1.createElement)(ui_1.Icon, { name: "ruler" }),
                            "\u00D6l\u00E7\u00FCye g\u00F6re"),
                        (0, react_1.createElement)("span", null,
                            (0, react_1.createElement)(ui_1.Icon, { name: "grid" }),
                            "\u0130htiyaca g\u00F6re"),
                        (0, react_1.createElement)("span", null,
                            (0, react_1.createElement)(ui_1.Icon, { name: "leaf" }),
                            "Malzemeyle birlikte")),
                    (0, react_1.createElement)(ui_1.TextLink, { to: "/malzemeler", navigate: a.navigate }, "Malzeme yakla\u015F\u0131m\u0131m\u0131z"))),
            (0, react_1.createElement)("section", { className: "wrap v6-section home-faq" },
                (0, react_1.createElement)("div", null,
                    (0, react_1.createElement)(ui_1.Eyebrow, null, "AKLINIZDA KALMASIN"),
                    (0, react_1.createElement)("h2", null,
                        "Birlikte",
                        (0, react_1.createElement)("br", null),
                        (0, react_1.createElement)("em", null, "netle\u015Ftirelim.")),
                    (0, react_1.createElement)(ui_1.TextLink, { to: "/iletisim", navigate: a.navigate }, "\u0130leti\u015Fim")),
                (0, react_1.createElement)(ui_1.Accordion, { items: [["Pinterest'te beğendiğim bir modeli getirebilir miyim?", 'Evet. Bağlantıyı, fotoğrafı veya çiziminizi paylaşabilirsiniz. Modelin kullanımını, ölçülerini ve malzemesini birlikte değerlendirip size uygun özgün bir yaklaşım üzerinde konuşuruz. Her model için üretilebilirlik ayrıca teyit edilir.'], ['Kesin ölçülerimi bilmiyorum. Başlayabilir miyim?', 'Elbette. İlk aşamada yaklaşık ölçü veya mekân fotoğrafı yeterli olabilir. Üretimden önce ölçüler ve yerleşim ayrıca netleştirilir.'], ['Konsept görseller sizin tamamladığınız işler mi?', 'Hayır. Bitirdiğimiz İşler bölümünde atölyenin paylaştığı fotoğraflar bulunur. Konsept modeller ve Pinterest bağlantıları ayrı etiketlerle ilham amacıyla gösterilir.'], ['Yeni atölye adresi nerede?', 'İstanbul’daki yeni atölye adresi netleştiğinde burada paylaşılacak. Ziyaret bilgileri adresle birlikte duyurulacak. Proje fikrinizi model paylaşım alanında hazırlayabilirsiniz.']] })),
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

},
"src/pages/Portfolio":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inspiration = exports.WorkDetail = exports.Projects = void 0;
exports.ConceptCard = ConceptCard;
exports.Categories = Categories;
exports.AboutAtelier = AboutAtelier;
const V7Pages_1 = require("./V7Pages");
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
            (0, react_1.createElement)("div", { className: "wrap" },
                (0, react_1.createElement)(V7Pages_1.ScopeNotes, { category: w.category })),
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
function ConceptCard({ c, navigate, actions }) { return (0, react_1.createElement)("article", { className: "concept-card" },
    (0, react_1.createElement)(ui_1.Link, { to: (0, portfolio_1.modelHref)('', c.category, c.subtitle + ' üzerine konuşmak istiyorum.'), navigate: navigate, className: "concept-image" },
        (0, react_1.createElement)(PortfolioUI_1.VImage, { asset: c.image, alt: c.subtitle + ', konsept model', sizes: "(max-width: 680px) 90vw, 45vw" }),
        (0, react_1.createElement)(PortfolioUI_1.SourceTag, { kind: "concept" }),
        (0, react_1.createElement)("span", { className: "concept-open" },
            (0, react_1.createElement)(ui_1.Icon, { name: "diagonal" }))),
    (0, react_1.createElement)("div", { className: "concept-caption" },
        (0, react_1.createElement)("span", null, (0, portfolio_1.categoryName)(c.category)),
        (0, react_1.createElement)("h3", null, c.title),
        (0, react_1.createElement)(ui_1.TextLink, { to: (0, portfolio_1.modelHref)('', c.category, c.subtitle + ' üzerine konuşmak istiyorum.'), navigate: navigate }, "Bu fikirle ba\u015Flayal\u0131m"),
        actions && (0, react_1.createElement)("button", { className: "v7-save-text", "aria-pressed": actions.favorites.includes('concept:' + c.id), onClick: () => actions.favorite('concept:' + c.id) },
            (0, react_1.createElement)(ui_1.Icon, { name: "heart", size: 18 }),
            actions.favorites.includes('concept:' + c.id) ? 'İlham dosyanızda' : 'İlham dosyama ekle'))); }
function Categories(a) {
    const cat = portfolio_1.workCategories.find(c => c.id === a.slug);
    if (cat) {
        const list = portfolio_1.works.filter(w => w.category === cat.id && w.status === 'work'), ideas = portfolio_1.concepts.filter(c => c.category === cat.id);
        return (0, react_1.createElement)(react_1.Fragment, null,
            (0, react_1.createElement)("section", { className: "category-hero" },
                (0, react_1.createElement)(PortfolioUI_1.VImage, { asset: V7Pages_1.categorySupport[cat.id]?.asset || cat.image, alt: cat.name + (V7Pages_1.categorySupport[cat.id] ? ' atölye fotoğrafı' : ' için temsili tasarım sahnesi'), eager: true, sizes: "100vw" }),
                (0, react_1.createElement)("div", { className: "category-shade" }),
                (0, react_1.createElement)("div", { className: "wrap" },
                    (0, react_1.createElement)(ui_1.Link, { className: "v6-backlink", to: "/kategoriler", navigate: a.navigate },
                        "Kategoriler ",
                        (0, react_1.createElement)(ui_1.Icon, { size: 16 })),
                    (0, react_1.createElement)(ui_1.Eyebrow, null, "\u00D6L\u00C7\u00DCN\u00DCZE, ALANINIZA, S\u0130ZE"),
                    (0, react_1.createElement)("h1", null, cat.name),
                    (0, react_1.createElement)("p", null, cat.line)),
                (0, react_1.createElement)(PortfolioUI_1.SourceTag, { kind: V7Pages_1.categorySupport[cat.id] ? 'work' : 'concept' })),
            (0, react_1.createElement)(V7Pages_1.CategoryDecision, { category: cat.id, navigate: a.navigate }),
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
                        (0, react_1.createElement)("p", null, "Bu g\u00F6rseller konsept modeldir. At\u00F6lyenin tamamlad\u0131\u011F\u0131 i\u015Fler de\u011Fildir. \u00DCretilebilirlik ve ayr\u0131nt\u0131lar birlikte de\u011Ferlendirilir.")),
                    (0, react_1.createElement)("div", { className: "concept-grid" }, ideas.map(c => (0, react_1.createElement)(ConceptCard, { key: c.id, c: c, navigate: a.navigate, actions: a }))))),
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
                    (0, react_1.createElement)("p", null, "Konsept modeller ve tasar\u0131m fikirleri. Bitmi\u015F proje veya teknik \u00FCretim onay\u0131 de\u011Fildir.")),
                (0, react_1.createElement)("div", { className: "filter-chips", role: "group", "aria-label": "\u0130lham kategorisi" }, [{ id: 'all', name: 'Tümü' }, ...portfolio_1.workCategories].map(c => (0, react_1.createElement)("button", { key: c.id, "aria-pressed": c.id === this.state.category, onClick: () => this.setState({ category: c.id }) }, c.name))),
                (0, react_1.createElement)("div", { className: "concept-grid" }, items.map(c => (0, react_1.createElement)(ConceptCard, { c: c, key: c.id, navigate: a.navigate, actions: a })))),
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
                        (0, react_1.createElement)("button", { className: "v7-save-text", "aria-label": (pinterest_1.pinLookup[p.id]?.label || p.title) + ' modelini kaydet', "aria-pressed": a.favorites.includes('pin:' + p.id), onClick: () => a.favorite('pin:' + p.id) },
                            (0, react_1.createElement)(ui_1.Icon, { name: "heart", size: 18 }),
                            a.favorites.includes('pin:' + p.id) ? 'İlham dosyanızda' : 'İlham dosyama ekle'),
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
                (0, react_1.createElement)("p", null, "Yeni at\u00F6lye adresi netle\u015Fti\u011Finde burada payla\u015F\u0131lacak. Ziyaret \u00F6ncesinde Yusuf Usta ile g\u00F6r\u00FC\u015Ferek adresi ve uygunlu\u011Fu teyit edin. Projenizi bir fikir ve yakla\u015F\u0131k \u00F6l\u00E7\u00FCyle haz\u0131rlamaya ba\u015Flayabilirsiniz."))),
        (0, react_1.createElement)(PortfolioUI_1.ModelCallout, { navigate: a.navigate }));
}

},
"src/pages/V7Pages":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchPage = exports.categorySupport = void 0;
exports.ScopeNotes = ScopeNotes;
exports.CategoryDecision = CategoryDecision;
exports.SavedBoard = SavedBoard;
exports.ContactV7 = ContactV7;
exports.PrivacyV7 = PrivacyV7;
exports.MaterialsV7 = MaterialsV7;
const react_1 = require("react");
const ui_1 = require("../components/ui");
const PortfolioUI_1 = require("../components/PortfolioUI");
const portfolio_1 = require("../lib/portfolio");
const selections_1 = require("../lib/selections");
const project_1 = require("../lib/project");
const domain_1 = require("../lib/domain");
exports.categorySupport = {
    'kahve-kosesi': { asset: 'r07', headline: 'Bir fincana ayrılan yer. Tam size göre.', intro: 'Cihazlarınızın yerleşimini, servis yüzeyini ve depolamayı birlikte düşünelim. Başlangıç noktamız alanınız ve gün içindeki kullanımınız.', questions: ['Hangi kahve makinesini kullanıyorsunuz?', 'Fincan ve ekipman için ne kadar saklama alanı gerekiyor?', 'Priz, su ve aydınlatma ihtiyacınız nedir?'] },
    'mutfak': { asset: 'r13', headline: 'Evin kalbi. Sizin düzeniniz.', intro: 'Bir mutfağın güzel görünmesi kadar, günlük hayatınıza uyması da önemli. Yerleşim, cihazlar ve depolama üzerinden başlayalım.', questions: ['Mevcut mutfak planı ve yaklaşık ölçüleriniz nasıl?', 'Korunacak cihaz, tezgâh veya tesisat var mı?', 'Çekmece, raf ve kapak kullanımında önceliğiniz ne?'] },
    'tv-unitesi': { asset: 'r22', headline: 'Duvarınızdan başlayan bir tasarım.', intro: 'Ekran, kitaplar, kablolar ve depolama tek bir düzenin parçaları. Odanızın ölçüsünü ve kullanım alışkanlığınızı birlikte değerlendirelim.', questions: ['TV boyutu ve duvar genişliği nedir?', 'Priz ve kablo çıkışları hangi noktalarda?', 'Açık raf mı, kapalı depolama mı istersiniz?'] }
};
function ScopeNotes({ category = 'ozel-tasarim' }) {
    const info = exports.categorySupport[category];
    return (0, react_1.createElement)("section", { className: "v7-scope" },
        (0, react_1.createElement)("div", null,
            (0, react_1.createElement)(ui_1.Eyebrow, null, "TEKL\u0130FTEN \u00D6NCE B\u0130RL\u0130KTE NETLE\u015ET\u0130REL\u0130M"),
            (0, react_1.createElement)("h2", null,
                "G\u00F6r\u00FCnenden",
                (0, react_1.createElement)("br", null),
                (0, react_1.createElement)("em", null, "biraz daha fazlas\u0131.")),
            (0, react_1.createElement)("p", null, "Her foto\u011Fraf bir ba\u015Flang\u0131\u00E7t\u0131r. Yeni i\u015Fin kapsam\u0131, \u00F6l\u00E7\u00FCs\u00FC ve malzemesi ayr\u0131ca belirlenir.")),
        (0, react_1.createElement)("div", null,
            (0, react_1.createElement)(ui_1.Accordion, { items: [
                    ['Fiyatı hangi kararlar değiştirir?', 'Ölçü, gövde ve kapak tercihi, yüzey, donanım, aydınlatma ve uygulama koşulları birlikte değerlendirilir. Burada doğrulanmamış başlangıç fiyatı veya sabit teslim süresi verilmez.'],
                    ['Fotoğrafta gördüğüm her şey dahil mi?', 'Beyaz eşya, kahve makinesi, TV, dekor, tezgâh ve elektrik işleri kendiliğinden teklife dahil sayılmaz. Mobilya, donanım, nakliye ve montaj kalemlerinin kapsamı yazılı teklifte ayrı netleştirilir.'],
                    ['Önce hangi bilgileri paylaşmalıyım?', info ? info.questions.join(' ') : 'Ürünün kullanım amacı, yaklaşık alan veya ölçü, ilçe ve sizin için önemli ayrıntılarla başlayabilirsiniz. Kesin imalat ölçüsünü ilk mesajda bilmeniz gerekmiyor.'],
                    ['Tasarım onayından sonra bir şey değişirse?', 'Ölçü, malzeme veya model değişikliğinin fiyat ve üretim planına etkisi yeniden görüşülür. Karşılıklı olarak netleşmeyen bir değişiklik üretim onayı sayılmaz.']
                ] })));
}
function CategoryDecision({ category, navigate }) { const x = exports.categorySupport[category]; if (!x)
    return null; return (0, react_1.createElement)("section", { className: "wrap v7-decision" },
    (0, react_1.createElement)("div", null,
        (0, react_1.createElement)(ui_1.Eyebrow, null,
            "\u00D6L\u00C7\u00DCYE \u00D6ZEL ",
            (0, portfolio_1.categoryName)(category).toLocaleUpperCase('tr-TR')),
        (0, react_1.createElement)("h2", null, x.headline),
        (0, react_1.createElement)("p", null, x.intro),
        (0, react_1.createElement)(ui_1.ButtonLink, { to: '/modelini-getir?kategori=' + category, navigate: navigate },
            (0, portfolio_1.categoryName)(category),
            " projemi konu\u015Fal\u0131m")),
    (0, react_1.createElement)("div", { className: "v7-preparation" },
        (0, react_1.createElement)("span", { className: "eyebrow" }, "B\u0130R G\u00D6R\u00DC\u015EMEYE HAZIRLANIRKEN"),
        (0, react_1.createElement)("ol", null, x.questions.map(q => (0, react_1.createElement)("li", { key: q }, q))),
        (0, react_1.createElement)("p", null, "Yan\u0131tlar\u0131n hepsi haz\u0131r de\u011Filse sorun de\u011Fil. Bir foto\u011Fraf veya fikirle de ba\u015Flayabilirsiniz."))); }
class SearchPage extends react_1.Component {
    constructor(p) {
        super(p);
        this.update = (q) => { this.setState({ q }); history.replaceState({}, '', (0, domain_1.publicHref)('/arama' + (q ? '?q=' + encodeURIComponent(q) : ''))); };
        this.state = { q: new URLSearchParams(p.query || '').get('q') || '' };
    }
    render() { const a = this.props, k = (0, domain_1.searchKey)(this.state.q), list = selections_1.selectionEntries.filter(x => (0, domain_1.searchKey)(x.title + ' ' + (0, portfolio_1.categoryName)(x.category)).includes(k)), cats = portfolio_1.workCategories.filter(c => (0, domain_1.searchKey)(c.name).includes(k)); return (0, react_1.createElement)(react_1.Fragment, null,
        (0, react_1.createElement)("header", { className: "v6-page-head wrap" },
            (0, react_1.createElement)(ui_1.Eyebrow, null, "EL\u0130F / B\u0130RL\u0130KTE BULALIM"),
            (0, react_1.createElement)("div", null,
                (0, react_1.createElement)("h1", null,
                    "Akl\u0131n\u0131zdaki",
                    (0, react_1.createElement)("br", null),
                    (0, react_1.createElement)("em", null, "hangi par\u00E7a?")),
                (0, react_1.createElement)("p", null, "Ger\u00E7ek \u00E7al\u0131\u015Fmalar, ilham modelleri ve kategoriler ayn\u0131 aramada. Kaynak t\u00FCr\u00FC her sonu\u00E7ta belirtilir."))),
        (0, react_1.createElement)("section", { className: "wrap v7-search-page" },
            (0, react_1.createElement)("label", { className: "portfolio-search" },
                (0, react_1.createElement)(ui_1.Icon, { name: "search" }),
                (0, react_1.createElement)("input", { type: "search", "aria-label": "T\u00FCm sitede ara", value: this.state.q, maxLength: 100, onInput: e => this.update(e.currentTarget.value), placeholder: "Kahve, mutfak, gard\u0131rop\u2026" })),
            (0, react_1.createElement)("p", { role: "status" },
                list.length,
                " \u00E7al\u0131\u015Fma ve model, ",
                cats.length,
                " kategori."),
            (0, react_1.createElement)("div", { className: "filter-chips" }, cats.map(c => (0, react_1.createElement)(ui_1.Link, { key: c.id, to: '/kategoriler/' + c.id, navigate: a.navigate },
                c.name,
                " ",
                (0, react_1.createElement)(ui_1.Icon, { size: 16 })))),
            (0, react_1.createElement)("div", { className: "v7-result-grid" }, list.map(x => (0, react_1.createElement)("article", { key: x.id },
                x.image && (0, react_1.createElement)(ui_1.Link, { to: x.path, navigate: a.navigate },
                    (0, react_1.createElement)(PortfolioUI_1.VImage, { asset: x.image, alt: x.title, sizes: "(max-width: 680px) 90vw, 30vw" })),
                (0, react_1.createElement)(PortfolioUI_1.SourceTag, { kind: x.kind }),
                (0, react_1.createElement)("h2", null,
                    (0, react_1.createElement)(ui_1.Link, { to: x.path, navigate: a.navigate }, x.title)),
                (0, react_1.createElement)("p", null, (0, portfolio_1.categoryName)(x.category)),
                (0, react_1.createElement)("button", { className: "v7-save-text", "aria-pressed": a.favorites.includes(x.id), onClick: () => a.favorite(x.id) },
                    (0, react_1.createElement)(ui_1.Icon, { name: "heart", size: 18 }),
                    a.favorites.includes(x.id) ? 'Seçkiden çıkar' : 'İlham dosyama ekle')))),
            !list.length && !cats.length && (0, react_1.createElement)("div", { className: "v6-empty" },
                (0, react_1.createElement)("h2", null, "Bu kelimeyle bir sonu\u00E7 yok."),
                (0, react_1.createElement)("p", null, "Ba\u015Fka bir kelime deneyin veya fikrinizi do\u011Frudan Yusuf Usta ile konu\u015Fun."),
                (0, react_1.createElement)("button", { className: "button button-outline", onClick: () => this.update('') }, "Aramay\u0131 temizle"),
                (0, react_1.createElement)(ui_1.ButtonLink, { to: "/modelini-getir", navigate: a.navigate }, "Kendi fikrimle ba\u015Flayay\u0131m")))); }
}
exports.SearchPage = SearchPage;
function SavedBoard(a) { const entries = (0, selections_1.selectedEntries)(a.favorites); return (0, react_1.createElement)(react_1.Fragment, null,
    (0, react_1.createElement)("header", { className: "v6-page-head wrap" },
        (0, react_1.createElement)(ui_1.Eyebrow, null, "EL\u0130F / \u0130LHAM DOSYANIZ"),
        (0, react_1.createElement)("div", null,
            (0, react_1.createElement)("h1", null,
                "Be\u011Fendikleriniz.",
                (0, react_1.createElement)("br", null),
                (0, react_1.createElement)("em", null, "Bir arada.")),
            (0, react_1.createElement)("p", null, "Ger\u00E7ek bir \u00E7al\u0131\u015Fma, bir konsept ve bir Pinterest modeli. Se\u00E7tiklerinizi tek bir g\u00F6r\u00FC\u015Fmede de\u011Ferlendirin."))),
    (0, react_1.createElement)("section", { className: "wrap v7-board" },
        (0, react_1.createElement)("label", { className: "v7-check" },
            (0, react_1.createElement)("input", { type: "checkbox", checked: a.remember, onChange: e => a.setRemember(e.currentTarget.checked) }),
            "Se\u00E7ti\u011Fim herkese a\u00E7\u0131k model kimliklerini bu cihazda 30 g\u00FCn sakla."),
        (0, react_1.createElement)("p", { className: "field-hint" }, "Kapal\u0131yken yaln\u0131z bu a\u00E7\u0131k sekmede tutulur. Bu izin not, adres veya m\u00FC\u015Fteri foto\u011Fraf\u0131 saklamaz."),
        entries.length ? (0, react_1.createElement)(react_1.Fragment, null,
            (0, react_1.createElement)("div", { className: "v7-result-grid" }, entries.map(x => (0, react_1.createElement)("article", { key: x.id },
                x.image && (0, react_1.createElement)(ui_1.Link, { to: x.path, navigate: a.navigate },
                    (0, react_1.createElement)(PortfolioUI_1.VImage, { asset: x.image, alt: x.title, sizes: "(max-width: 680px) 90vw, 30vw" })),
                (0, react_1.createElement)(PortfolioUI_1.SourceTag, { kind: x.kind }),
                (0, react_1.createElement)("h2", null, x.title),
                (0, react_1.createElement)("p", null, (0, portfolio_1.categoryName)(x.category)),
                (0, react_1.createElement)("button", { className: "text-link", "aria-label": x.title + ' seçimini kaldır', onClick: () => a.favorite(x.id) },
                    "Se\u00E7imden \u00E7\u0131kar ",
                    (0, react_1.createElement)(ui_1.Icon, { name: "close", size: 16 }))))),
            (0, react_1.createElement)("div", { className: "v7-board-action" },
                (0, react_1.createElement)("p", null,
                    entries.length,
                    " se\u00E7iminiz proje \u00F6zetine eklenecek."),
                (0, react_1.createElement)(ui_1.ButtonLink, { to: "/modelini-getir", navigate: a.navigate }, "Bu se\u00E7kilerle g\u00F6r\u00FC\u015Felim"))) : (0, react_1.createElement)("div", { className: "v6-empty" },
            (0, react_1.createElement)("h2", null, "\u0130lham dosyan\u0131z hen\u00FCz bo\u015F."),
            (0, react_1.createElement)("p", null, "\u00C7al\u0131\u015Fma veya model kartlar\u0131ndaki kalp d\u00FC\u011Fmesiyle se\u00E7iminizi ekleyin."),
            (0, react_1.createElement)(ui_1.ButtonLink, { to: "/projeler", navigate: a.navigate }, "Ger\u00E7ek \u00E7al\u0131\u015Fmalar\u0131 ke\u015Ffet")))); }
function ContactV7(a) { return (0, react_1.createElement)(react_1.Fragment, null,
    (0, react_1.createElement)("header", { className: "v6-page-head wrap" },
        (0, react_1.createElement)(ui_1.Eyebrow, null, "EL\u0130F / DO\u011ERUDAN AT\u00D6LYE"),
        (0, react_1.createElement)("div", null,
            (0, react_1.createElement)("h1", null,
                "Bir fikirle ba\u015Flay\u0131n.",
                (0, react_1.createElement)("br", null),
                (0, react_1.createElement)("em", null, "Ustas\u0131yla konu\u015Fun.")),
            (0, react_1.createElement)("p", null, "Haz\u0131r bir modeliniz olmas\u0131 gerekmiyor. Alan\u0131n\u0131z\u0131 ve nas\u0131l kullanmak istedi\u011Finizi anlatman\u0131z yeterli."))),
    (0, react_1.createElement)("section", { className: "wrap v7-contact" },
        (0, react_1.createElement)("div", { className: "v7-contact-main" },
            (0, react_1.createElement)(ui_1.Eyebrow, null, "YUSUF USTA"),
            (0, react_1.createElement)("h2", null,
                "\u00D6l\u00E7\u00FCn\u00FCz\u00FC de\u011Fil,",
                (0, react_1.createElement)("br", null),
                (0, react_1.createElement)("em", null, "\u00F6nce ihtiyac\u0131n\u0131z\u0131 dinleyelim.")),
            (0, react_1.createElement)("a", { className: "v7-number", href: 'tel:' + project_1.business.telephone }, project_1.business.display),
            (0, react_1.createElement)("div", { className: "action-row" },
                (0, react_1.createElement)("a", { className: "button", href: (0, project_1.whatsappUrl)(), target: "_blank", rel: "noopener noreferrer" },
                    "WhatsApp'ta g\u00F6r\u00FC\u015F ",
                    (0, react_1.createElement)(ui_1.Icon, { name: "diagonal" })),
                (0, react_1.createElement)("a", { className: "button button-outline", href: 'tel:' + project_1.business.telephone },
                    "Telefonla ara ",
                    (0, react_1.createElement)(ui_1.Icon, { name: "phone" }))),
            (0, react_1.createElement)("p", { className: "field-hint" }, "WhatsApp harici uygulamada a\u00E7\u0131l\u0131r. Mesaj\u0131 orada g\u00F6nderirsiniz. T\u0131klama, yan\u0131t veya mesaj teslimi garantisi de\u011Fildir.")),
        (0, react_1.createElement)("div", { className: "v7-contact-side" },
            (0, react_1.createElement)(PortfolioUI_1.VImage, { asset: "work-joinery", alt: "Ah\u015Fap uygulama ar\u015Fivinden birle\u015Fim ayr\u0131nt\u0131s\u0131", sizes: "(max-width: 800px) 90vw, 40vw" }),
            (0, react_1.createElement)(PortfolioUI_1.SourceTag, { kind: "process" }),
            (0, react_1.createElement)("h3", null, "\u0130stanbul\u2019da, yeni at\u00F6lyemize haz\u0131rlan\u0131yoruz."),
            (0, react_1.createElement)("p", null, "Yeni a\u00E7\u0131k adres ve ziyaret d\u00FCzeni hen\u00FCz kesinle\u015Fmedi. Yola \u00E7\u0131kmadan \u00F6nce Yusuf Usta ile g\u00F6r\u00FC\u015F\u00FCn. Hizmet b\u00F6lgesi, ke\u015Fif, teslim ve montaj kapsam\u0131 projenize g\u00F6re netle\u015Ftirilir."))),
    (0, react_1.createElement)("section", { className: "wrap v7-contact-next" },
        (0, react_1.createElement)("h2", null, "G\u00F6r\u00FC\u015Fmeye bir dosyayla gelin."),
        (0, react_1.createElement)("p", null, "Foto\u011Fraf\u0131n\u0131z\u0131, Pinterest ba\u011Flant\u0131n\u0131z\u0131 ve yakla\u015F\u0131k \u00F6l\u00E7\u00FCn\u00FCz\u00FC ayn\u0131 proje \u00F6zetinde haz\u0131rlayabilirsiniz. Foto\u011Fraf y\u00FCklemek zorunlu de\u011Fildir."),
        (0, react_1.createElement)(ui_1.ButtonLink, { to: "/modelini-getir", navigate: a.navigate }, "Proje fikrimi haz\u0131rlayay\u0131m"))); }
function PrivacyV7(a) { return (0, react_1.createElement)("section", { className: "wrap v7-readable" },
    (0, react_1.createElement)(ui_1.Eyebrow, null, "EL\u0130F / VER\u0130 VE DI\u015E SERV\u0130SLER"),
    (0, react_1.createElement)("h1", null,
        "Fikriniz size ait.",
        (0, react_1.createElement)("br", null),
        (0, react_1.createElement)("em", null, "Kontrol de sizde.")),
    (0, react_1.createElement)("p", null, "Bu a\u00E7\u0131klama V7 tasar\u0131m \u00F6nizlemesinin fiil\u00EE davran\u0131\u015F\u0131n\u0131 anlat\u0131r. Tam ticari ayd\u0131nlatma metni veya hukuki uygunluk onay\u0131 de\u011Fildir. \u0130\u015Fletmenin veri sorumlusu bilgileri ve ticari hizmet \u015Fartlar\u0131 yay\u0131na ge\u00E7meden \u00F6nce tamamlanmal\u0131d\u0131r."),
    (0, react_1.createElement)("h2", null, "Proje tasla\u011F\u0131 ve g\u00F6rseller"),
    (0, react_1.createElement)("p", null, "Model ba\u011Flant\u0131s\u0131, notlar, yakla\u015F\u0131k \u00F6l\u00E7\u00FC, il\u00E7e ve se\u00E7ti\u011Finiz foto\u011Fraflar bu a\u00E7\u0131k sekmenin belle\u011Finde i\u015Flenir. Site i\u00E7indeki model ve \u00F6l\u00E7\u00FC ak\u0131\u015Flar\u0131 aras\u0131nda korunur. Varsay\u0131lan olarak sunucuya g\u00F6nderilmez, kal\u0131c\u0131 taray\u0131c\u0131 depolamas\u0131na yaz\u0131lmaz. Yenileme veya sekmeyi kapatma veriyi silebilir. \u00D6ncesinde proje dosyan\u0131z\u0131 kendi cihaz\u0131n\u0131za indirin."),
    (0, react_1.createElement)("p", null, "Foto\u011Fraflar cihaz\u0131n\u0131zda en fazla 2000 piksel JPEG payla\u015F\u0131m kopyas\u0131 olarak haz\u0131rlan\u0131r. Dosya metadata\u2019s\u0131 bu kopyaya aktar\u0131lmaz. Foto\u011Frafta g\u00F6r\u00FCnen ki\u015Fi, adres, belge ve \u00F6zel nesneler otomatik silinmez. Payla\u015Fmadan \u00F6nce g\u00F6r\u00FCnt\u00FCy\u00FC kontrol edin."),
    (0, react_1.createElement)("h2", null, "\u0130lham dosyas\u0131 ve cihaz tercihleri"),
    (0, react_1.createElement)("p", null, "\u0130lham dosyas\u0131 varsay\u0131lan olarak bellektedir. A\u00E7\u0131k\u00E7a se\u00E7erseniz yaln\u0131z herkese a\u00E7\u0131k \u00E7al\u0131\u015Fma ve model kimlikleri 30 g\u00FCn yerel depolamada kal\u0131r. Tasar\u0131m masas\u0131nda a\u00E7\u0131k\u00E7a kaydetti\u011Finiz \u00F6l\u00E7\u00FC tercihleri 7 g\u00FCn saklanabilir. Not ve g\u00F6rseller bu izinlere dahil de\u011Fildir. Depolama tercihleri alan\u0131ndan kay\u0131tlar\u0131 silebilirsiniz."),
    (0, react_1.createElement)("h2", null, "WhatsApp, telefon ve cihaz payla\u015F\u0131m\u0131"),
    (0, react_1.createElement)("p", null, "WhatsApp'a yaz d\u00FC\u011Fmesi, kullan\u0131c\u0131 taraf\u0131ndan i\u015Fletme ileti\u015Fimi i\u00E7in verilen +90 530 879 71 69 numaras\u0131n\u0131 a\u00E7ar. D\u00FC\u011Fmeye bast\u0131\u011F\u0131n\u0131zda proje \u00F6zeti WhatsApp'\u0131n URL parametresine aktar\u0131l\u0131r ve harici servis kendi kurallar\u0131na g\u00F6re i\u015Fler. Siteden otomatik mesaj g\u00F6nderilmez. Foto\u011Fraflar bu metin ba\u011Flant\u0131s\u0131na dahil de\u011Fildir."),
    (0, react_1.createElement)("p", null, "Cihazdan payla\u015F se\u00E7ene\u011Fi, desteklenen cihazlarda i\u015Fletim sisteminin payla\u015F\u0131m men\u00FCs\u00FCn\u00FC a\u00E7ar. Uygulama ve al\u0131c\u0131y\u0131 siz se\u00E7ersiniz. ZIP veya TXT indirme yaln\u0131z dosyay\u0131 cihaz\u0131n\u0131za haz\u0131rlar. Bu site mesaj\u0131n g\u00F6nderildi\u011Fini, teslim edildi\u011Fini veya okundu\u011Funu do\u011Frulayamaz."),
    (0, react_1.createElement)("h2", null, "Pinterest"),
    (0, react_1.createElement)("p", null, "Pinterest g\u00F6r\u00FCnt\u00FCleyicisi, a\u00E7\u0131klamay\u0131 g\u00F6r\u00FCp ilgili d\u00FC\u011Fmeye bast\u0131\u011F\u0131n\u0131zda y\u00FCklenir. IP adresi ve taray\u0131c\u0131 bilgileri gibi teknik bilgiler d\u0131\u015F hizmete gidebilir, Pinterest \u00E7erez kullanabilir. A\u00E7may\u0131 se\u00E7meden Pinterest iste\u011Fi yap\u0131lmaz. Kaynak ba\u011Flant\u0131s\u0131n\u0131 ayr\u0131 sekmede a\u00E7mak da harici servise ge\u00E7i\u015Ftir. G\u00F6m\u00FCl\u00FC alan\u0131 kapatmak mevcut iframe\u2019i kald\u0131r\u0131r, d\u0131\u015F serviste olu\u015Fmu\u015F kay\u0131tlar\u0131 geri almaz."),
    (0, react_1.createElement)("h2", null, "Bar\u0131nd\u0131rma ve analitik"),
    (0, react_1.createElement)("p", null, "Sayfa ve g\u00F6rseller bar\u0131nd\u0131rma sa\u011Flay\u0131c\u0131s\u0131ndan istenir. Sa\u011Flay\u0131c\u0131 teknik eri\u015Fim kay\u0131tlar\u0131 tutabilir. Bu s\u00FCr\u00FCm reklam pikseli, Google Analytics veya otomatik m\u00FC\u015Fteri kay\u0131t API\u2019si y\u00FCklemez. M\u00FC\u015Fteri dosyalar\u0131 GitHub deposuna kaydedilmez. Ticari bar\u0131nd\u0131rma, saklama ve d\u0131\u015F aktar\u0131m d\u00FCzeni ayr\u0131ca kararla\u015Ft\u0131r\u0131lmal\u0131d\u0131r."),
    (0, react_1.createElement)("h2", null, "D\u00FCzeltme ve ileti\u015Fim"),
    (0, react_1.createElement)("p", null, "\u0130\u015Fletmeyle payla\u015F\u0131lm\u0131\u015F bilgiler hakk\u0131nda Yusuf Usta ile a\u015Fa\u011F\u0131daki numaradan g\u00F6r\u00FC\u015Febilirsiniz. Bu site WhatsApp'ta veya telefonunuzda payla\u015Ft\u0131\u011F\u0131n\u0131z kay\u0131tlar\u0131 kendili\u011Finden silemez."),
    (0, react_1.createElement)("a", { className: "text-link", href: 'tel:' + project_1.business.telephone }, project_1.business.display),
    (0, react_1.createElement)("div", { className: "action-row" },
        (0, react_1.createElement)("button", { className: "button button-outline", onClick: a.openInfo },
            "Cihaz kay\u0131tlar\u0131n\u0131 y\u00F6net ",
            (0, react_1.createElement)(ui_1.Icon, null)),
        (0, react_1.createElement)(ui_1.ButtonLink, { to: "/iletisim", navigate: a.navigate }, "\u0130leti\u015Fim"))); }
function MaterialsV7(a) { return (0, react_1.createElement)(react_1.Fragment, null,
    (0, react_1.createElement)("header", { className: "v6-page-head wrap" },
        (0, react_1.createElement)(ui_1.Eyebrow, null, "EL\u0130F / MALZEMEY\u0130 B\u0130RL\u0130KTE SE\u00C7EL\u0130M"),
        (0, react_1.createElement)("div", null,
            (0, react_1.createElement)("h1", null,
                "Sadece bir renk de\u011Fil.",
                (0, react_1.createElement)("br", null),
                (0, react_1.createElement)("em", null, "Bir kullan\u0131m karar\u0131.")),
            (0, react_1.createElement)("p", null, "Foto\u011Fraftaki g\u00F6r\u00FCn\u00FCm tek ba\u015F\u0131na malzemenin t\u00FCr\u00FCn\u00FC s\u00F6ylemez. G\u00F6vde, kapak, y\u00FCzey ve donan\u0131m\u0131 ayr\u0131 ayr\u0131 netle\u015Ftirelim."))),
    (0, react_1.createElement)("section", { className: "wrap v7-materials" }, [['01', 'Gövde', 'Depolama, taşıma ve yerleşim ihtiyacı. Levha esaslı çözümler veya masif ahşap, projenin koşullarına göre konuşulur.'], ['02', 'Kapak ve yüzey', 'Kaplama, boya veya lake görünümü. Son rengi ve dokuyu fotoğraf üzerinden kesinleştirmek yerine numuneyle teyit ederiz.'], ['03', 'Donanım', 'Menteşe, ray, kulp ve varsa mekanizma. Marka, model ve kapasite uygunluğu kesin teklifte belirtilir.'], ['04', 'Tezgâh ve uygulama', 'Tezgâh, elektrik, aydınlatma, taşıma ve montaj ayrı kapsam kalemleridir. Fotoğrafta görünmesi otomatik olarak dahil olduğu anlamına gelmez.']].map(([n, title, text]) => (0, react_1.createElement)("article", { key: n },
        (0, react_1.createElement)(ui_1.Eyebrow, null,
            n,
            " / B\u0130RL\u0130KTE KARAR"),
        (0, react_1.createElement)("h2", null, title),
        (0, react_1.createElement)("p", null, text)))),
    (0, react_1.createElement)("section", { className: "wrap v7-readable" },
        (0, react_1.createElement)("h2", null, "Bak\u0131m, y\u00FCzeye g\u00F6re de\u011Fi\u015Fir."),
        (0, react_1.createElement)("p", null, "Temizlik \u00FCr\u00FCn\u00FC veya ya\u011F uygulamadan \u00F6nce kullan\u0131lan y\u00FCzeyi ve \u00FCreticinin bak\u0131m y\u00F6nlendirmesini teyit edin. Her ah\u015Fap g\u00F6r\u00FCn\u00FCml\u00FC mobilyaya ayn\u0131 i\u015Flem uygun olmayabilir. Malzeme ve donan\u0131m bilgilerini teklif ve teslimde istemeniz, sonraki bak\u0131m\u0131 kolayla\u015Ft\u0131r\u0131r.")),
    (0, react_1.createElement)(PortfolioUI_1.ModelCallout, { navigate: a.navigate, compact: true })); }

}};const cache={};function resolve(id,from){if(!id.startsWith("."))return id;const a=from.split("/");a.pop();for(const part of id.split("/")){if(part==="..")a.pop();else if(part!==".")a.push(part)}return a.join("/").replace(/\.tsx?$/,"")}function load(id,from=""){id=resolve(id,from);if(cache[id])return cache[id].exports;if(!modules[id])throw Error("Missing module "+id);const m={exports:{}};cache[id]=m;modules[id](m,m.exports,x=>load(x,id));return m.exports}load("src/main");})();