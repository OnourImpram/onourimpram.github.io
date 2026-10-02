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
const ServiceGuide_1 = require("./pages/ServiceGuide");
const BasicContact_1 = require("./pages/BasicContact");
const site_profile_1 = require("./lib/site-profile");
const draft_session_1 = require("./lib/draft-session");
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
const aliases = { '/devir-01': '/tasarim-masasi', '/urunler': '/kategoriler', '/sepet': '/modelini-getir', '/odeme': '/modelini-getir', '/atolye-demolari': '/atolye', '/atolyemiz': '/hakkimizda', '/mekan-fikirleri': '/ilham-modelleri' };
function normalizePath(p) { const [route, qs] = p.split('?'); if (route.startsWith('/urun/'))
    return '/kategoriler'; if (route.startsWith('/mekan-fikirleri/'))
    return '/ilham-modelleri'; return aliases[route] ? (aliases[route] + (qs ? '?' + qs : '')) : p; }
class App extends react_1.Component {
    constructor() {
        super(...arguments);
        this.state = { path: this.props.initialPath || '/', scrolled: false, favorites: [], remember: false, menu: false, search: false, searchQuery: '', info: false, toast: '' };
        this.entry = 0;
        this.entries = new Map();
        this.restoring = null;
        this.oldRestoration = 'auto';
        this.currentLocation = () => { const w = window; const hash = window.location.hash; if (hash.startsWith('#/'))
            return normalizePath(hash.slice(1)); if (w.__ELIF_PREVIEW__)
            return w.__ELIF_INITIAL__ || '/'; const base = w.__ELIF_BASE__ || '', path = window.location.pathname; return normalizePath((base && path.startsWith(base + '/') ? path.slice(base.length) : path).replace(/\/+$/, '') + window.location.search || '/'); };
        this.saveEntry = () => { if (!this.entry)
            return; const path = this.currentLocation(), route = this.state.path.split('?')[0]; this.entries.set(this.entry, { path: path.split('?')[0] === route && !['/modelini-getir', '/teklif-al'].includes(route) ? path : this.state.path, y: window.scrollY }); };
        this.onLocation = () => { const id = history.state?.elifEntry, found = typeof id === 'number' ? this.entries.get(id) : undefined; if (id === this.entry && found)
            return; this.entry = found ? id : Date.now() + Math.random(); const fragment = window.location.hash && !window.location.hash.startsWith('#/'); this.restoring = found ? found.y : fragment ? null : 0; const path = found?.path || this.currentLocation(); if (!found)
            this.entries.set(this.entry, { path, y: 0 }); history.replaceState({ ...history.state, elifEntry: this.entry }, ''); this.setState({ path, menu: false, search: false }, this.afterRoute); };
        this.onScroll = () => { this.saveEntry(); const scrolled = window.scrollY > 550; if (scrolled !== this.state.scrolled)
            this.setState({ scrolled }); };
        this.beforeUnload = (e) => { if ((0, project_1.hasPrivateDraft)()) {
            e.preventDefault();
            e.returnValue = '';
        } };
        this.afterRoute = () => {
            const route = this.state.path.split('?')[0], site = (window.__ELIF_SITE_URL__ || 'https://onourimpram.github.io/elif-tasarim').replace(/\/$/, ''), title = (0, routes_1.pageTitle)(route), description = (0, routes_1.pageDescription)(route);
            const setMeta = (key, value, property = false) => { const attr = property ? 'property' : 'name'; let node = document.querySelector('meta[' + attr + '="' + key + '"]'); if (!node) {
                node = document.createElement('meta');
                node.setAttribute(attr, key);
                document.head.appendChild(node);
            } node.content = value; };
            document.title = title;
            setMeta('description', description);
            setMeta('robots', (0, routes_1.pageRobots)(route, document.documentElement.dataset.indexable === 'true'));
            setMeta('og:title', title, true);
            setMeta('og:description', description, true);
            setMeta('og:url', site + (route === '/' ? '/' : route + '/'), true);
            setMeta('og:image', site + '/assets/' + (0, routes_1.pageShareImage)(route), true);
            setMeta('og:site_name', 'Elif Tasarım', true);
            let canonical = document.querySelector('link[rel="canonical"]');
            if (!canonical) {
                canonical = document.createElement('link');
                canonical.rel = 'canonical';
                document.head.appendChild(canonical);
            }
            canonical.href = site + (route === '/' ? '/' : route + '/');
            let schema = document.querySelector('script[type="application/ld+json"]');
            if (!schema) {
                schema = document.createElement('script');
                schema.type = 'application/ld+json';
                document.head.appendChild(schema);
            }
            schema.textContent = JSON.stringify((0, routes_1.pageSchema)(route, site));
            const anchor = window.location.hash && !window.location.hash.startsWith('#/') ? window.location.hash : '';
            document.documentElement.dataset.page = route === '/tasarim-masasi' ? 'studio' : route === '/modelini-getir' || route === '/teklif-al' ? 'project' : 'content';
            const restore = this.restoring;
            this.restoring = null;
            const y = restore ?? 0;
            window.scrollTo({ top: y, behavior: 'instant' });
            if (restore !== null)
                requestAnimationFrame(() => requestAnimationFrame(() => { window.scrollTo({ top: y, behavior: 'instant' }); this.onScroll(); }));
            this.onScroll();
            if (!(window.__ELIF_PREVIEW__)) {
                const p = new URLSearchParams(this.state.path.split('?')[1] || '');
                p.delete('ref');
                p.delete('fikir');
                history.replaceState({ ...history.state, elifEntry: this.entry }, '', (0, domain_1.publicHref)(route + (p.size ? '?' + p.toString() : '')) + anchor);
            }
            if (anchor && restore === null) {
                requestAnimationFrame(() => { const target = document.getElementById(anchor.slice(1)); target?.scrollIntoView({ behavior: 'instant' }); });
            }
        };
        this.navigate = (path) => { path = normalizePath(path); if (!path.startsWith('/') || path.startsWith('//'))
            path = '/'; if (path === this.state.path) {
            this.setState({ menu: false, search: false });
            return;
        } this.saveEntry(); this.entry = Date.now() + Math.random(); this.entries.set(this.entry, { path, y: 0 }); this.restoring = null; history.pushState({ elifEntry: this.entry }, '', (0, domain_1.publicHref)(path)); this.setState({ path, menu: false, search: false, searchQuery: '' }, () => { this.afterRoute(); document.getElementById('main-content')?.focus({ preventScroll: true }); }); };
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
    componentDidMount() { this.entry = Date.now() + Math.random(); this.entries.set(this.entry, { path: this.currentLocation(), y: 0 }); this.oldRestoration = history.scrollRestoration; history.scrollRestoration = 'manual'; history.replaceState({ ...history.state, elifEntry: this.entry }, ''); let favorites = [], remember = false; try {
        const raw = JSON.parse(localStorage.getItem('elif-v7:selections') || 'null');
        if (raw && raw.expires > Date.now()) {
            favorites = (0, selections_1.validSelectionIds)(raw.ids);
            remember = true;
        }
        else
            localStorage.removeItem('elif-v7:selections');
    }
    catch { } this.setState({ path: this.currentLocation(), favorites, remember }, this.afterRoute); window.addEventListener('hashchange', this.onLocation); window.addEventListener('popstate', this.onLocation); window.addEventListener('scroll', this.onScroll, { passive: true }); window.addEventListener('beforeunload', this.beforeUnload); document.getElementById('static-content')?.remove(); document.documentElement.dataset.appReady = 'true'; }
    componentWillUnmount() { history.scrollRestoration = this.oldRestoration; window.removeEventListener('hashchange', this.onLocation); window.removeEventListener('popstate', this.onLocation); window.removeEventListener('scroll', this.onScroll); window.removeEventListener('beforeunload', this.beforeUnload); clearTimeout(this.timer); }
    renderPage() { const a = this.actions(), [p, qs = ''] = this.state.path.split('?'); if (p === '/')
        return (0, react_1.createElement)(Home_1.Home, { ...a }); if (p === '/arama')
        return (0, react_1.createElement)(V7Pages_1.SearchPage, { key: p, ...a, query: qs }); if (p === '/projeler')
        return (0, react_1.createElement)(Portfolio_1.Projects, { key: this.state.path, ...a, query: qs }); if (p.startsWith('/proje/')) {
        const w = portfolio_1.works.find(x => '/proje/' + x.id === p);
        if (w)
            return (0, react_1.createElement)(Portfolio_1.WorkDetail, { key: w.id, ...a, work: w });
    } if (p === '/kategoriler')
        return (0, react_1.createElement)(Portfolio_1.Categories, { ...a }); if (p.startsWith('/kategoriler/') && portfolio_1.workCategories.some(c => p === '/kategoriler/' + c.id))
        return (0, react_1.createElement)(Portfolio_1.Categories, { ...a, slug: p.split('/').pop(), query: qs }); if (p === '/ilham-modelleri')
        return (0, react_1.createElement)(Portfolio_1.Inspiration, { key: this.state.path, ...a, query: qs }); if (p === '/modelini-getir' || p === '/teklif-al')
        return (0, react_1.createElement)(BringModel_1.BringModel, { key: this.state.path, ...a, query: qs, advanced: p === '/teklif-al' || new URLSearchParams(qs).get('detay') === '1' }); if (p === '/hakkimizda' || p === '/atolye')
        return (0, react_1.createElement)(Portfolio_1.AboutAtelier, { ...a, atelier: p === '/atolye' }); if (p === '/tasarim-masasi')
        return (0, react_1.createElement)(DesignDesk_1.DesignDesk, { key: this.state.path, ...a, query: qs }); if (p === '/kolay-iletisim')
        return (0, react_1.createElement)(BasicContact_1.BasicContact, { ...a }); if (p === '/hizmet-ve-teklif')
        return (0, react_1.createElement)(ServiceGuide_1.ServiceGuide, { ...a }); if (p === '/iletisim')
        return (0, react_1.createElement)(V7Pages_1.ContactV7, { ...a }); if (p === '/gizlilik')
        return (0, react_1.createElement)(V7Pages_1.PrivacyV7, { ...a }); if (p === '/malzemeler')
        return (0, react_1.createElement)(V7Pages_1.MaterialsV7, { ...a }); if (p === '/ozel-uretim')
        return (0, react_1.createElement)(Editorial_1.Bespoke, { ...a }); if (p === '/sikca-sorulan-sorular')
        return (0, react_1.createElement)(Editorial_1.FAQ, { ...a }); if (p === '/rehber' || p.startsWith('/rehber/'))
        return (0, react_1.createElement)(Editorial_1.Journal, { ...a, slug: p.split('/')[2] }); if (p === '/calisma-dosyam')
        return (0, react_1.createElement)(V7Pages_1.SavedBoard, { ...a, replaceFavorites: ids => { const favorites = (0, selections_1.validSelectionIds)(ids), ok = this.persist(favorites, this.state.remember); this.setState({ favorites, remember: ok ? this.state.remember : false }); if (!ok)
                this.notify('Cihaz kaydı yapılamadı. İçe aktarılan seçimler açık sekmede korunuyor.'); }, remember: this.state.remember, setRemember: remember => { const ok = this.persist(this.state.favorites, remember); this.setState({ remember: remember && ok }); if (!ok)
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
        const results = (0, selections_1.searchEntries)(s.searchQuery).slice(0, 8), contactText = (0, project_1.contextMessage)(s.path, (0, routes_1.pageTitle)(s.path.split('?')[0]).split('|')[0].trim(), (typeof window !== 'undefined' && window.__ELIF_SITE_URL__) || undefined), studio = s.path.split('?')[0] === '/tasarim-masasi', guided = ['/modelini-getir', '/teklif-al', '/kolay-iletisim'].includes(s.path.split('?')[0]);
        return (0, react_1.createElement)(react_1.Fragment, null,
            (0, react_1.createElement)("a", { href: "#main-content", className: "skip-link", onClick: e => { e.preventDefault(); document.getElementById('main-content')?.focus(); } }, "\u0130\u00E7eri\u011Fe ge\u00E7"),
            (0, react_1.createElement)("div", { className: "preview-bar" },
                (0, react_1.createElement)("span", null,
                    "V25.2 / TASARIM \u00D6N\u0130ZLEMES\u0130 ",
                    (0, react_1.createElement)("i", null),
                    (0, react_1.createElement)("span", { className: "v9-preview-detail" }, "Ger\u00E7ek i\u015F ar\u015Fivi, do\u011Frudan ileti\u015Fim")),
                (0, react_1.createElement)("button", { onClick: () => this.setState({ info: true }) },
                    "Bilgi ve tercihler ",
                    (0, react_1.createElement)(ui_1.Icon, { name: "info", size: 16 }))),
            (0, react_1.createElement)("header", { className: 'site-header v6-header ' + (s.path === '/' ? 'home-header' : '') + (s.scrolled && !studio ? ' is-floating' : '') },
                (0, react_1.createElement)("div", { className: "v6-header-main wrap" },
                    (0, react_1.createElement)("button", { className: "icon-button v6-menu-toggle", "aria-label": "Men\u00FCy\u00FC a\u00E7", onClick: () => this.setState({ menu: true }) },
                        (0, react_1.createElement)(ui_1.Icon, { name: "menu", size: 25 })),
                    (0, react_1.createElement)("span", { className: "v6-header-note" },
                        "\u0130STANBUL",
                        (0, react_1.createElement)("br", null),
                        "\u00D6L\u00C7\u00DCYE \u00D6ZEL \u00DCRET\u0130M"),
                    (0, react_1.createElement)(ui_1.Link, { to: "/", navigate: this.navigate, className: "brand", title: "Ana sayfa" },
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
                        (0, react_1.createElement)("a", { className: "v7-header-phone", href: 'tel:' + project_1.business.telephone, "aria-label": "Yunus Usta\u2019y\u0131 telefonla ara" },
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
                            nav('/tasarim-masasi', '3D Stüdyo'),
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
                            nav('/hizmet-ve-teklif', 'Hizmet ve teklif rehberi'),
                            nav('/sikca-sorulan-sorular', 'Sıkça sorulan sorular'),
                            nav('/rehber', 'Atölye notları'),
                            nav('/gizlilik', 'Veri ve dış servisler')),
                        (0, react_1.createElement)("div", { className: "footer-column footer-contact" },
                            (0, react_1.createElement)("h2", null, "Do\u011Frudan Yunus Usta"),
                            (0, react_1.createElement)("a", { className: "v7-footer-phone", href: 'tel:' + project_1.business.telephone }, project_1.business.display),
                            (0, react_1.createElement)("a", { href: (0, project_1.whatsappUrl)(contactText), target: "_blank", rel: "noopener noreferrer", className: "text-link on-dark" },
                                "WhatsApp'ta g\u00F6r\u00FC\u015F ",
                                (0, react_1.createElement)(ui_1.Icon, { name: "diagonal" })),
                            (0, react_1.createElement)("p", null,
                                "\u0130stanbul, T\u00FCrkiye.",
                                (0, react_1.createElement)("br", null),
                                "Yeni adresi ziyaret \u00F6ncesinde teyit edin."),
                            (0, react_1.createElement)("a", { className: "v22-footer-email", href: 'mailto:' + (0, site_profile_1.getSiteProfile)().email }, (0, site_profile_1.getSiteProfile)().email),
                            nav('/iletisim', 'İletişim ayrıntıları'),
                            nav('/kolay-iletisim', 'Kolay iletişim'))),
                    (0, react_1.createElement)("div", { className: "footer-wordmark", "aria-hidden": "true" },
                        "elif tasar\u0131m",
                        (0, react_1.createElement)("span", null, "AT\u00D6LYE")),
                    (0, react_1.createElement)("div", { className: "footer-bottom" },
                        (0, react_1.createElement)("span", null, "EL\u0130F TASARIM \u00B7 V25.2 / 2026"),
                        (0, react_1.createElement)("div", null,
                            nav('/gizlilik', 'Gizlilik ve dış servisler'),
                            (0, react_1.createElement)("button", { onClick: () => this.setState({ info: true }) }, "Cihaz kay\u0131tlar\u0131n\u0131 y\u00F6net")),
                        (0, react_1.createElement)("span", null, "\u00D6zenle d\u00FC\u015F\u00FCn\u00FCl\u00FCr. At\u00F6lyede \u015Fekillenir.")),
                    (0, react_1.createElement)("p", { className: "footer-disclosure" }, "At\u00F6lye ar\u015Fivi, uygulama a\u015Famas\u0131, konsept model ve d\u0131\u015F referanslar ayr\u0131 etiketlidir. Bu bir tasar\u0131m \u00F6nizlemesidir. Sitede \u00F6deme veya otomatik talep kayd\u0131 yoktur. WhatsApp mesaj\u0131 harici uygulamada sizin taraf\u0131n\u0131zdan g\u00F6nderilir."))),
            s.menu && (0, react_1.createElement)(ui_1.Dialog, { title: "Elif Tasar\u0131m", onClose: () => this.setState({ menu: false }) },
                (0, react_1.createElement)("nav", { className: "mobile-links", "aria-label": "Mobil men\u00FC" }, [...portfolio_1.mainNavigation, ['/calisma-dosyam', 'İlham Dosyanız']].map(([p, label], i) => (0, react_1.createElement)(ui_1.Link, { key: p, to: p, navigate: this.navigate },
                    (0, react_1.createElement)("span", null, String(i + 1).padStart(2, '0')),
                    label,
                    (0, react_1.createElement)(ui_1.Icon, { name: "diagonal" })))),
                (0, react_1.createElement)("a", { className: "v7-direct", href: 'tel:' + project_1.business.telephone },
                    "Yunus Usta \u00B7 ",
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
                                x.kind === 'page' ? 'Stüdyo ve rehber' : x.kind === 'concept' ? 'Konsept model' : x.kind === 'reference' ? 'Pinterest referansı' : x.photoKind === 'process' ? 'Uygulama aşaması' : 'Atölye arşivi')),
                        (0, react_1.createElement)(ui_1.Icon, { name: "diagonal" }))),
                    !results.length && (0, react_1.createElement)("p", { className: "empty-state" }, "Sonu\u00E7 bulunamad\u0131. Ba\u015Fka bir kelime deneyin.")),
                (0, react_1.createElement)(ui_1.TextLink, { to: '/arama?q=' + encodeURIComponent(s.searchQuery.trim()), navigate: this.navigate }, "T\u00FCm sonu\u00E7lar\u0131 g\u00F6r")),
            s.info && (0, react_1.createElement)(ui_1.Dialog, { title: "Bilgi ve cihaz kay\u0131tlar\u0131", onClose: () => this.setState({ info: false }) },
                (0, react_1.createElement)("div", { className: "info-dialog" },
                    (0, react_1.createElement)(ui_1.Eyebrow, null, "V25.2 / \u015EEFFAF B\u0130R BA\u015ELANGI\u00C7"),
                    (0, react_1.createElement)("p", null,
                        "Yunus Usta'n\u0131n kullan\u0131c\u0131 taraf\u0131ndan payla\u015F\u0131lan i\u015F telefonu ",
                        project_1.business.display,
                        ". WhatsApp ve telefon ba\u011Flant\u0131lar\u0131 bu numaray\u0131 a\u00E7ar. Yeni a\u00E7\u0131k adres hen\u00FCz kesinle\u015Fmemi\u015Ftir."),
                    (0, react_1.createElement)("h3", null, "Mesaj\u0131 siz g\u00F6nderirsiniz."),
                    (0, react_1.createElement)("p", null, "Site proje \u00F6zetinizi haz\u0131rlar. Sitede \u00F6deme, sipari\u015F kayd\u0131 veya otomatik g\u00F6nderim yoktur. WhatsApp mesaj\u0131n\u0131 orada g\u00F6nderirsiniz. Dosya payla\u015F\u0131m\u0131 ayr\u0131 bir ad\u0131md\u0131r. A\u00E7\u0131ld\u0131, g\u00F6nderildi ve teslim al\u0131nd\u0131 ayn\u0131 durum de\u011Fildir."),
                    (0, react_1.createElement)("h3", null, "Tasla\u011F\u0131n kontrol\u00FC sizde."),
                    (0, react_1.createElement)("p", null, "Varsay\u0131lan olarak not, il\u00E7e, model ve g\u00F6rseller a\u00E7\u0131k sekmede korunur. Model formunda a\u00E7\u0131k\u00E7a se\u00E7erseniz metin ve \u00F6l\u00E7\u00FCler son kay\u0131ttan itibaren yedi g\u00FCn cihazda saklan\u0131r. Foto\u011Fraflar bu kayda dahil de\u011Fildir. S\u00FCresi dolan kay\u0131t sonraki kontrolde silinir. JSON kurtarma dosyas\u0131 ki\u015Fisel notlar\u0131n\u0131z\u0131 i\u00E7erebilir. Herkese a\u00E7\u0131k ilham kimlikleri i\u00E7in ayr\u0131 30 g\u00FCnl\u00FCk izin vard\u0131r. Analitik veya reklam pikseli y\u00FCklenmez."),
                    (0, react_1.createElement)("button", { className: "button button-outline", onClick: () => { if (window.confirm('Bu açık sekmedeki proje fikri, görseller ve bu cihazdaki Elif kayıtları silinsin mi?')) {
                            draft_session_1.draftSession.disable();
                            project_1.projectStore.clear();
                            project_1.attachmentStore.clear();
                            try {
                                Object.keys(localStorage).filter(k => k.startsWith('elif-v2:') || k.startsWith('elif-v7:') || k.startsWith('elif-v21:')).forEach(k => localStorage.removeItem(k));
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
            s.scrolled && !studio && !guided && !s.menu && !s.search && !s.info && (0, react_1.createElement)("div", { className: "v7-mobile-contact" },
                (0, react_1.createElement)("a", { href: 'tel:' + project_1.business.telephone },
                    (0, react_1.createElement)(ui_1.Icon, { name: "phone", size: 18 }),
                    "Ara"),
                (0, react_1.createElement)("a", { href: (0, project_1.whatsappUrl)(contactText), target: "_blank", rel: "noopener noreferrer" },
                    "Yunus Usta\u2019ya yaz ",
                    (0, react_1.createElement)(ui_1.Icon, { name: "diagonal", size: 18 }))),
            s.scrolled && !studio && !guided && (0, react_1.createElement)("button", { className: "v5-backtop", type: "button", "aria-label": "Sayfan\u0131n ba\u015F\u0131na d\u00F6n", onClick: () => window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }) },
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
"src/components/ContactAlternatives":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactAlternatives = ContactAlternatives;
const react_1 = require("react");
const ui_1 = require("./ui");
const project_1 = require("../lib/project");
const TextCopy_1 = require("./TextCopy");
const contact_options_1 = require("../lib/contact-options");
function ContactAlternatives({ text }) { const email = (0, contact_options_1.emailDraft)(text); return (0, react_1.createElement)("section", { className: "v21-contact-alternatives", "aria-labelledby": "contact-alternative-title" },
    (0, react_1.createElement)("span", { className: "eyebrow" }, "BA\u015EKA B\u0130R YOLDAN DEVAM ED\u0130N"),
    (0, react_1.createElement)("h3", { id: "contact-alternative-title" }, "WhatsApp kullanm\u0131yor musunuz?"),
    (0, react_1.createElement)("p", null, "Telefonla g\u00F6r\u00FC\u015Febilir, SMS uygulamas\u0131n\u0131 a\u00E7abilir veya haz\u0131rlad\u0131\u011F\u0131n\u0131z \u00F6zeti e-posta tasla\u011F\u0131na aktarabilirsiniz."),
    (0, react_1.createElement)("div", { className: "action-row" },
        (0, react_1.createElement)("a", { className: "button button-outline", href: 'tel:' + project_1.business.telephone },
            "Telefonla ara ",
            (0, react_1.createElement)(ui_1.Icon, { name: "phone", size: 17 })),
        (0, react_1.createElement)("a", { className: "button button-outline", href: (0, contact_options_1.smsUrl)() },
            "SMS ile g\u00F6r\u00FC\u015Fme ba\u015Flat ",
            (0, react_1.createElement)(ui_1.Icon, { name: "diagonal", size: 17 })),
        (0, react_1.createElement)("a", { className: "button button-outline", href: email.href },
            "E-posta tasla\u011F\u0131 haz\u0131rla ",
            (0, react_1.createElement)(ui_1.Icon, { name: "diagonal", size: 17 }))),
    email.recipient && (0, react_1.createElement)("div", { className: "v22-email-target" },
        (0, react_1.createElement)("span", null, "E-posta al\u0131c\u0131s\u0131"),
        (0, react_1.createElement)("a", { href: 'mailto:' + email.recipient }, email.recipient),
        (0, react_1.createElement)(TextCopy_1.TextCopy, { id: "v22-email-address-copy", text: email.recipient, label: "E-posta adresini kopyala" })),
    (0, react_1.createElement)("p", { className: "field-hint" }, "SMS d\u00FC\u011Fmesi numaray\u0131 a\u00E7ar, metninizi siz yazars\u0131n\u0131z. G\u00F6nderim \u00FCcretleri operat\u00F6r\u00FCn\u00FCze ba\u011Fl\u0131d\u0131r."),
    (0, react_1.createElement)("p", { className: "field-hint" }, email.recipient ? 'E-posta taslağının alıcısı, ' + email.recipient + '. Göndermeden önce özeti ve alıcıyı kontrol edin.' : 'İşletme e-posta adresi henüz doğrulanmadığından e-posta uygulaması alıcı alanı boş açılır. Yunus Usta’dan teyit ettiğiniz alıcıyı kendiniz girin. Bu, etkin bir kurumsal e-posta hattı değildir.'),
    email.needsAttachment && (0, react_1.createElement)("p", { className: "v21-email-note" }, "\u00D6zetiniz e-posta ba\u011Flant\u0131s\u0131 i\u00E7in uzun. Uygulama k\u0131sa bir ba\u015Flang\u0131\u00E7 metniyle a\u00E7\u0131l\u0131r. Tam \u00F6zeti a\u015Fa\u011F\u0131daki indirme se\u00E7ene\u011Fiyle saklay\u0131p e-postaya ekleyin."),
    (0, react_1.createElement)("p", { className: "field-hint" }, "Hi\u00E7bir d\u00FC\u011Fme kendili\u011Finden mesaj g\u00F6ndermez. Foto\u011Fraflar\u0131 ve proje dosyas\u0131n\u0131 se\u00E7ti\u011Finiz uygulamada ayr\u0131ca ekleyin.")); }

},
"src/components/ContactHandoff":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactHandoff = void 0;
const react_1 = require("react");
const ui_1 = require("./ui");
const project_1 = require("../lib/project");
const TextCopy_1 = require("./TextCopy");
const ContactAlternatives_1 = require("./ContactAlternatives");
class ContactHandoff extends react_1.Component {
    constructor() {
        super(...arguments);
        this.state = { chosen: false };
    }
    componentDidUpdate(previous) { if (previous.text !== this.props.text && this.state.chosen)
        this.setState({ chosen: false }); }
    render() {
        const transfer = (0, project_1.whatsappMessage)(this.props.text);
        return (0, react_1.createElement)(react_1.Fragment, null,
            (0, react_1.createElement)("section", { className: "v7-handoff v22-handoff", "aria-labelledby": "v22-handoff-title" },
                (0, react_1.createElement)(ui_1.Eyebrow, null, "DO\u011ERUDAN YUNUS USTA"),
                (0, react_1.createElement)("h3", { id: "v22-handoff-title" }, "\u00D6zetiniz haz\u0131r. Son ad\u0131m\u0131 tamamlayal\u0131m."),
                (0, react_1.createElement)("p", null, "Haz\u0131r metni WhatsApp'ta kontrol edip g\u00F6nderin. \u0130sterseniz e-posta, telefon veya SMS ile de devam edebilirsiniz."),
                transfer.needsAttachment && (0, react_1.createElement)("div", { className: "v11-long-message", role: "note" },
                    (0, react_1.createElement)("strong", null, "\u00D6zetiniz tek ba\u011Flant\u0131 i\u00E7in uzun."),
                    (0, react_1.createElement)("p", null, "WhatsApp a\u015Fa\u011F\u0131daki k\u0131sa giri\u015Fle a\u00E7\u0131l\u0131r. Tam \u00F6zeti kopyalay\u0131p yap\u0131\u015Ft\u0131r\u0131n veya indirdi\u011Finiz dosyay\u0131 g\u00F6r\u00FC\u015Fmeye ekleyin."),
                    (0, react_1.createElement)("pre", { id: "whatsapp-actual-message" }, transfer.sentText)),
                (0, react_1.createElement)("a", { className: "button", "data-whatsapp-message": transfer.needsAttachment ? 'short-with-attachment' : 'complete', href: transfer.url, target: "_blank", rel: "noopener noreferrer", onClick: () => this.setState({ chosen: true }) },
                    "Yunus Usta\u2019ya WhatsApp\u2019ta yaz ",
                    (0, react_1.createElement)(ui_1.Icon, { name: "diagonal" })),
                (0, react_1.createElement)("p", { className: "field-hint" }, "Mesaj\u0131 uygulamada siz g\u00F6nderirsiniz. Bu sitede hen\u00FCz sipari\u015F veya g\u00F6nderim kayd\u0131 olu\u015Fmaz."),
                this.state.chosen && (0, react_1.createElement)("div", { className: "v22-next-action", role: "status" },
                    (0, react_1.createElement)("strong", null, "Son ad\u0131m, a\u00E7\u0131lan g\u00F6r\u00FC\u015Fmede."),
                    (0, react_1.createElement)("ol", null,
                        (0, react_1.createElement)("li", null, "Haz\u0131r mesaj\u0131 kontrol edip G\u00F6nder d\u00FC\u011Fmesine bas\u0131n."),
                        (0, react_1.createElement)("li", null, this.props.photos ? this.props.photos + ' görseliniz var. Bunları ayrıca ekleyin veya aşağıdaki proje ZIP dosyasını belge olarak paylaşın.' : 'Görsel paylaşmak isterseniz görüşmeye ayrıca ekleyebilirsiniz.'),
                        (0, react_1.createElement)("li", null, "Uygulama a\u00E7\u0131lmad\u0131ysa e-posta veya kopyalama yolunu kullan\u0131n. Haz\u0131rlad\u0131\u011F\u0131n\u0131z \u00F6zet bu sayfada duruyor.")),
                    (0, react_1.createElement)("p", null, "Uygulaman\u0131n a\u00E7\u0131ld\u0131\u011F\u0131n\u0131, g\u00F6nderimi veya okunma bilgisini bu site do\u011Frulamaz."))),
            (0, react_1.createElement)(TextCopy_1.TextCopy, { text: this.props.text, id: "v22-summary-copy" }),
            (0, react_1.createElement)(ContactAlternatives_1.ContactAlternatives, { text: this.props.text }));
    }
}
exports.ContactHandoff = ContactHandoff;

},
"src/components/DesignWorkbench":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesignWorkbench = void 0;
const react_1 = require("react");
const design_board_1 = require("../lib/design-board");
const desk_v8_1 = require("../lib/desk-v8");
const domain_1 = require("../lib/domain");
const design_sheet_1 = require("../lib/design-sheet");
const ui_1 = require("./ui");
class DesignWorkbench extends react_1.Component {
    constructor() {
        super(...arguments);
        this.state = { items: design_board_1.designBoard.list(), busy: '', message: '', quality: 'balanced', arUrl: '', arPreview: '' };
        this.alive = true;
        this.screenshot = () => { try {
            return this.props.getEngine()?.snapshot(960, 640) || null;
        }
        catch {
            return null;
        } };
        this.save = () => { const result = design_board_1.designBoard.add(this.props.config, this.screenshot()); this.setState({ items: design_board_1.designBoard.list(), message: result.status === 'full' ? 'Üç seçenek dolu. Bir seçeneği kaldırıp yeniden ekleyin.' : result.status === 'duplicate' ? 'Bu tasarım karşılaştırmada zaten var. Görünümü yenilendi.' : 'Seçili tasarım karşılaştırmaya eklendi.' }); };
        this.importFile = async (e) => { const file = e.currentTarget.files?.[0]; e.currentTarget.value = ''; if (!file)
            return; if (file.size > 16384) {
            this.setState({ message: 'Tasarım dosyası 16 KB sınırını aşıyor.' });
            return;
        } if (design_board_1.designBoard.list().length && !window.confirm('Dosyadaki seçenekler mevcut karşılaştırmanın yerini alsın mı?'))
            return; try {
            const n = design_board_1.designBoard.import(await file.text());
            if (this.alive)
                this.setState({ items: design_board_1.designBoard.list(), message: n + ' tasarım yüklendi. Görüntüler, stüdyoda yeniden açtığınızda hazırlanabilir.' });
        }
        catch (error) {
            if (this.alive)
                this.setState({ message: error instanceof Error ? error.message : 'Dosya okunamadı.' });
        } };
        this.modelExport = async (format) => { if (this.state.busy)
            return; this.setState({ busy: format, message: 'Seçili model dosyası hazırlanıyor.' }); try {
            const signature = (0, desk_v8_1.studioQuery)(this.props.config), preview = this.screenshot();
            const blob = await this.props.getEngine().exportModel(format);
            if (signature !== (0, desk_v8_1.studioQuery)(this.props.config))
                throw Error('Configuration changed');
            if (!this.alive)
                return;
            const url = URL.createObjectURL(blob);
            if (format === 'usdz') {
                if (this.state.arUrl)
                    URL.revokeObjectURL(this.state.arUrl);
                this.setState({ arUrl: url, arPreview: preview || '' });
            }
            else {
                const a = document.createElement('a');
                a.href = url;
                a.download = 'Elif-Devir-01-Konsept.glb';
                a.click();
                setTimeout(() => URL.revokeObjectURL(url), 60000);
            }
            this.setState({ message: format === 'usdz' ? 'USDZ dosyası hazır. Uyumlu Apple cihazında AR önizlemesi açılabilir. Diğer cihazlarda dosya indirilebilir.' : 'GLB dosyası hazırlandı. Ölçek birimi metredir. Konsept geometri, CAD veya üretim dosyası değildir.' });
        }
        catch (error) {
            if (this.alive)
                this.setState({ message: 'Bu cihazda model dışa aktarılamadı. Tasarım JSON dosyasıyla veya yazdırılabilir özetle devam edebilirsiniz.' });
        }
        finally {
            if (this.alive)
                this.setState({ busy: '' });
        } };
    }
    componentDidUpdate(previous) { if (!previous.ready && this.props.ready)
        this.props.getEngine()?.quality(this.state.quality); if ((0, desk_v8_1.studioQuery)(previous.config) !== (0, desk_v8_1.studioQuery)(this.props.config) && this.state.arUrl) {
        URL.revokeObjectURL(this.state.arUrl);
        this.setState({ arUrl: '', arPreview: '' });
    } }
    componentWillUnmount() { this.alive = false; if (this.state.arUrl)
        URL.revokeObjectURL(this.state.arUrl); }
    render() {
        const p = this.props, s = this.state, selected = (0, desk_v8_1.studioQuery)(p.config);
        return (0, react_1.createElement)("section", { className: "v20-workbench", "aria-labelledby": "v20-board-title" },
            (0, react_1.createElement)("div", { className: "v20-section-heading" },
                (0, react_1.createElement)("div", null,
                    (0, react_1.createElement)(ui_1.Eyebrow, null, "TASARIM DEFTER\u0130N\u0130Z"),
                    (0, react_1.createElement)("h2", { id: "v20-board-title" },
                        "Bir karar vermeden,",
                        (0, react_1.createElement)("br", null),
                        (0, react_1.createElement)("em", null, "yan yana d\u00FC\u015F\u00FCn\u00FCn."))),
                (0, react_1.createElement)("button", { type: "button", className: "button", disabled: !p.ready || !!s.busy, onClick: this.save },
                    "Bu tasar\u0131m\u0131 kar\u015F\u0131la\u015Ft\u0131r ",
                    (0, react_1.createElement)(ui_1.Icon, { name: "plus", size: 17 }))),
            (0, react_1.createElement)("p", { className: "v20-intro" }, "En fazla \u00FC\u00E7 d\u00FCzeni ay\u0131r\u0131n. \u00D6l\u00E7\u00FCy\u00FC, y\u00FCzeyi ve \u00E7al\u0131\u015Fma y\u00FCksekli\u011Fini kar\u015F\u0131la\u015Ft\u0131r\u0131n. Her se\u00E7enek tek dokunu\u015Fla st\u00FCdyoya d\u00F6ner."),
            (0, react_1.createElement)("div", { className: "v20-comparison-grid" },
                s.items.map((item, i) => (0, react_1.createElement)("article", { key: item.id, className: selected === (0, desk_v8_1.studioQuery)(item.config) ? 'selected' : '' },
                    (0, react_1.createElement)("div", { className: "v20-compare-image" },
                        item.preview ? (0, react_1.createElement)("img", { alt: 'Tasarım ' + (i + 1) + ' görünümü', src: item.preview }) : (0, react_1.createElement)("span", null, "G\u00F6r\u00FCn\u00FCm st\u00FCdyoda haz\u0131rlan\u0131r."),
                        (0, react_1.createElement)("span", { className: "v20-design-index" },
                            "0",
                            i + 1)),
                    (0, react_1.createElement)("h3", null, desk_v8_1.studioMaterials[item.config.material].name),
                    (0, react_1.createElement)("dl", null,
                        (0, react_1.createElement)("div", null,
                            (0, react_1.createElement)("dt", null, "Tabla"),
                            (0, react_1.createElement)("dd", null,
                                item.config.width,
                                " \u00D7 ",
                                item.config.depth,
                                " cm")),
                        (0, react_1.createElement)("div", null,
                            (0, react_1.createElement)("dt", null, "Y\u00FCkseklik"),
                            (0, react_1.createElement)("dd", null,
                                item.config.height,
                                " cm")),
                        (0, react_1.createElement)("div", null,
                            (0, react_1.createElement)("dt", null, "Yan tabla"),
                            (0, react_1.createElement)("dd", null,
                                item.config.angle,
                                "\u00B0")),
                        (0, react_1.createElement)("div", null,
                            (0, react_1.createElement)("dt", null, "I\u015F\u0131k"),
                            (0, react_1.createElement)("dd", null, item.config.lighting === 'evening' ? 'Akşam' : 'Gün ışığı'))),
                    (0, react_1.createElement)("div", { className: "v20-compare-actions" },
                        (0, react_1.createElement)("button", { type: "button", onClick: () => { p.onSelect(item.config); this.setState({ message: 'Tasarım ' + (i + 1) + ' stüdyoya aktarıldı.' }); }, "aria-label": 'Tasarım ' + (i + 1) + ' stüdyoda aç' },
                            "St\u00FCdyoda a\u00E7 ",
                            (0, react_1.createElement)(ui_1.Icon, { size: 14 })),
                        (0, react_1.createElement)("button", { type: "button", "aria-label": 'Tasarım ' + (i + 1) + ' kaldır', onClick: () => { design_board_1.designBoard.remove(item.id); this.setState({ items: design_board_1.designBoard.list() }); } },
                            (0, react_1.createElement)(ui_1.Icon, { name: "close", size: 15 }))))),
                s.items.length === 0 && (0, react_1.createElement)("div", { className: "v20-compare-empty" },
                    (0, react_1.createElement)("span", null, "01 / 02 / 03"),
                    (0, react_1.createElement)("p", null,
                        "\u00D6nce masay\u0131 size g\u00F6re d\u00FCzenleyin.",
                        (0, react_1.createElement)("br", null),
                        "Sonra kar\u015F\u0131la\u015Ft\u0131rmaya ekleyin."))),
            (0, react_1.createElement)("div", { className: "v20-board-file" },
                (0, react_1.createElement)("button", { type: "button", disabled: !s.items.length, onClick: () => (0, domain_1.downloadText)('Elif-Tasarim-Seceneklerim.json', design_board_1.designBoard.serialize()) },
                    "Se\u00E7enekleri JSON olarak sakla ",
                    (0, react_1.createElement)(ui_1.Icon, { name: "download", size: 16 })),
                (0, react_1.createElement)("label", null,
                    "Kaydetti\u011Fim se\u00E7enekleri a\u00E7",
                    (0, react_1.createElement)("input", { type: "file", accept: "application/json,.json", onChange: this.importFile }))),
            (0, react_1.createElement)("small", { className: "v20-privacy-note" }, "Bu defter yaln\u0131z a\u00E7\u0131k sekmede tutulur. JSON dosyas\u0131 not, adres, oda \u00F6l\u00E7\u00FCs\u00FC veya m\u00FC\u015Fteri foto\u011Fraf\u0131 i\u00E7ermez. Yenilemeden \u00F6nce se\u00E7enekleri kaydedin."),
            (0, react_1.createElement)("div", { className: "v20-delivery-tools" },
                (0, react_1.createElement)("div", null,
                    (0, react_1.createElement)(ui_1.Eyebrow, null, "ST\u00DCDYODAN G\u00D6R\u00DC\u015EMEYE"),
                    (0, react_1.createElement)("h3", null, "Tasar\u0131m\u0131n\u0131z burada kalmas\u0131n."),
                    (0, react_1.createElement)("p", null, "G\u00F6rseli ve \u00F6l\u00E7\u00FCy\u00FC bir arada yazd\u0131r\u0131n. Dijital modeli GLB veya USDZ bi\u00E7iminde inceleyin.")),
                (0, react_1.createElement)("div", { className: "v20-export-buttons" },
                    (0, react_1.createElement)("button", { type: "button", disabled: !p.ready || !!s.busy, onClick: () => { if (!(0, design_sheet_1.openDesignSheet)(p.config, this.screenshot()))
                            this.setState({ message: 'Açılır pencere engellendi. Tarayıcınızdan bu siteye izin verin.' }); } },
                        "G\u00F6rselli tasar\u0131m dosyas\u0131 ",
                        (0, react_1.createElement)(ui_1.Icon, { name: "download", size: 16 })),
                    (0, react_1.createElement)("button", { type: "button", disabled: !p.ready || !!s.busy, onClick: () => this.modelExport('glb') }, s.busy === 'glb' ? 'GLB hazırlanıyor' : '3D modeli indir · GLB'),
                    (0, react_1.createElement)("button", { type: "button", disabled: !p.ready || !!s.busy, onClick: () => this.modelExport('usdz') }, s.busy === 'usdz' ? 'USDZ hazırlanıyor' : 'AR dosyasını hazırla · USDZ'),
                    s.arUrl && (0, react_1.createElement)(react_1.Fragment, null,
                        (0, react_1.createElement)("a", { className: "v20-ar-link", href: s.arUrl, rel: "ar", download: "Elif-Devir-01-Konsept.usdz" },
                            (0, react_1.createElement)("img", { src: s.arPreview, alt: "" }),
                            "USDZ modelini a\u00E7"),
                        (0, react_1.createElement)("small", null, "AR a\u00E7\u0131lmas\u0131 cihaz ve g\u00F6r\u00FCnt\u00FCleyici deste\u011Fine ba\u011Fl\u0131d\u0131r. Yerinde \u00F6l\u00E7ek ve zemin davran\u0131\u015F\u0131 ger\u00E7ek cihazda teyit edilmelidir.")))),
            (0, react_1.createElement)("div", { className: "v20-quality" },
                (0, react_1.createElement)("label", { htmlFor: "v20-quality" }, "G\u00F6r\u00FCnt\u00FC profili"),
                (0, react_1.createElement)("select", { id: "v20-quality", value: s.quality, onChange: e => { const quality = e.currentTarget.value; p.getEngine()?.quality(quality); this.setState({ quality }); }, disabled: !p.ready },
                    (0, react_1.createElement)("option", { value: "balanced" }, "Dengeli"),
                    (0, react_1.createElement)("option", { value: "economy" }, "D\u00FC\u015F\u00FCk grafik y\u00FCk\u00FC"),
                    (0, react_1.createElement)("option", { value: "detail" }, "Ayr\u0131nt\u0131l\u0131")),
                (0, react_1.createElement)("small", null, "Sahne \u00E7\u00F6z\u00FCn\u00FCrl\u00FC\u011F\u00FC ve g\u00F6lge kalitesi de\u011Fi\u015Fir. Masa \u00F6l\u00E7\u00FCleri de\u011Fi\u015Fmez.")),
            s.message && (0, react_1.createElement)("p", { role: "status", className: "v20-workbench-status" }, s.message));
    }
}
exports.DesignWorkbench = DesignWorkbench;

},
"src/components/DeskExperience":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeskExperience = void 0;
const react_1 = require("react");
const NumberEditor_1 = require("./NumberEditor");
const DesignWorkbench_1 = require("./DesignWorkbench");
const RoomDiagram_1 = require("./RoomDiagram");
const ui_1 = require("./ui");
const desk_v8_1 = require("../lib/desk-v8");
const project_1 = require("../lib/project");
const domain_1 = require("../lib/domain");
const room_fit_1 = require("../lib/room-fit");
let runtimePromise = null;
const hotspotCopy = {
    lift: { title: 'Yükseklik kumandası', body: 'Ana çalışma yüzeyinin yükselmesini temsil eder. Gerçek motor, taşıma kapasitesi ve elektrik güvenliği üretim öncesi ayrıca doğrulanır.' },
    drawers: { title: 'Üst çekmece grubu', body: 'Sık kullanılan küçük ekipmanlar için üç bölümlü depolama fikri. İç düzen ve ray sistemi gerçek projede kullanımınıza göre netleştirilir.' },
    return: { title: 'Döner yan çalışma yüzeyi', body: 'Tek masa ile farklı yerleşimlere geçebilmek için tasarlanan ikincil yüzey. Dönüş çapı ve mekanik durdurucular prototip aşamasında doğrulanmalıdır.' },
    storage: { title: 'Sabit depolama gövdesi', body: 'Dosya, aksesuar ve günlük ekipman için sabit alt depolama fikri. Kapak, çekmece ve iç bölmeler ihtiyaca göre yeniden çalışılabilir.' }
};
function loadRuntime() { const w = window; if (w.ElifDesk3D)
    return Promise.resolve(w.ElifDesk3D); if (w.__ELIF_LOAD_3D__)
    return w.__ELIF_LOAD_3D__(); if (runtimePromise)
    return runtimePromise; runtimePromise = new Promise((resolve, reject) => { const script = document.createElement('script'); script.type = 'module'; script.src = (w.__ELIF_BASE__ || '/elif-tasarim') + '/three/desk-scene.mjs?v=v23.2-interactive'; script.onload = () => w.ElifDesk3D ? resolve(w.ElifDesk3D) : reject(Error('3D initialization failed')); script.onerror = () => { runtimePromise = null; script.remove(); reject(Error('3D runtime unavailable')); }; document.head.appendChild(script); }); return runtimePromise; }
class DeskExperience extends react_1.Component {
    constructor(p) {
        super(p);
        this.host = null;
        this.root = null;
        this.engine = null;
        this.alive = true;
        this.start = async () => { if (this.state.status === 'loading')
            return; if (this.engine) {
            if (!['lost', 'unavailable'].includes(this.state.status))
                return;
            this.engine.dispose();
            this.engine = null;
        } this.setState({ status: 'loading' }); try {
            const runtime = await loadRuntime();
            if (!this.alive || !this.host)
                return;
            this.engine = runtime.createDeskScene(this.host, this.state.config, { status: (status) => { if (this.alive)
                    this.setState({ status }); }, motion: (rotating) => { if (this.alive)
                    this.setState({ rotating }); }, camera: (view) => { if (this.alive)
                    this.setState({ view }); }, hotspot: (hotspot) => { if (this.alive)
                    this.setState({ hotspot }); }, change: (patch) => { if (this.alive)
                    this.change(patch); } });
            this.engine.light(this.state.config.lighting);
            this.engine.dimensions(this.state.dimensions);
            this.engine.hotspots?.(this.state.hotspots);
            this.setState({ status: 'ready' });
        }
        catch (error) {
            console.error('Elif 3D initialization', error);
            if (this.alive)
                this.setState({ status: 'unavailable' });
        } };
        this.change = (patch) => { const config = (0, desk_v8_1.normalizeStudio)({ ...this.state.config, ...patch }), roomChanged = config.room !== this.state.config.room; project_1.projectStore.setStudio(config); this.setState({ config, footprint: null, fit: null, fitError: '', ...(roomChanged ? { view: 'perspective', rotating: false } : {}) }, () => this.engine?.update(config)); };
        this.setView = (view) => { this.setState({ view, rotating: false }); this.engine?.rotate(false); this.engine?.setView(view); };
        this.handoff = () => { const notice = project_1.projectStore.get().studioNotice; if (notice && !window.confirm(notice + ' Gösterilen 3D ölçülerini proje taslağınıza aktarmak istediğinize emin misiniz?'))
            return; project_1.projectStore.handoffStudio(this.state.config); this.props.navigate('/modelini-getir'); };
        this.fullscreenChanged = () => { const fullscreen = document.fullscreenElement === this.root; this.setState({ fullscreen }, () => { if (!fullscreen)
            this.root?.querySelector('.v11-fullscreen-toggle')?.focus({ preventScroll: true }); }); };
        this.fullscreen = async () => { const el = this.root; if (!el)
            return; try {
            if (document.fullscreenElement === el)
                await document.exitFullscreen();
            else if (el.requestFullscreen)
                await el.requestFullscreen();
            else
                this.props.notify('Tam ekran bu tarayıcıda desteklenmiyor.');
        }
        catch {
            this.props.notify('Tam ekran açılamadı. Stüdyo normal görünümde kullanılabilir.');
        } };
        this.measureFootprint = () => { if (!this.engine)
            return; this.setView('top'); const footprint = this.engine.footprint(); this.setState({ footprint, fit: null, fitError: '' }); };
        this.toggleHotspots = () => this.setState(s => ({ hotspots: !s.hotspots, hotspot: s.hotspots ? '' : s.hotspot }), () => this.engine?.hotspots?.(this.state.hotspots));
        this.evaluateFit = () => { if (!this.engine)
            return; const footprint = this.engine.footprint(), roomWidth = Number(this.state.roomWidth.replace(',', '.')), roomDepth = Number(this.state.roomDepth.replace(',', '.')); const fit = (0, room_fit_1.evaluateRoomFit)(roomWidth, roomDepth, footprint); if (!fit) {
            this.setState({ fit: null, fitError: 'Oda eni ve derinliği için pozitif bir santimetre değeri girin.' });
            return;
        } this.setState({ footprint, fit, fitError: '' }); this.setView('top'); };
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
        this.toggleRotate = () => { this.engine?.rotate(!this.state.rotating); };
        this.tabKey = (event, id) => { const tabs = ['motion', 'size', 'room']; let n = tabs.indexOf(id); if (event.key === 'ArrowRight')
            n = (n + 1) % 3;
        else if (event.key === 'ArrowLeft')
            n = (n + 2) % 3;
        else if (event.key === 'Home')
            n = 0;
        else if (event.key === 'End')
            n = 2;
        else
            return; event.preventDefault(); const tab = tabs[n]; this.setState({ tab }, () => this.root?.querySelector('[role="tab"][aria-selected="true"]')?.focus()); };
        this.field = (key, label, min, max, unit = 'cm') => { const v = this.state.config[key]; return (0, react_1.createElement)("div", { className: "v8-field", key: key },
            (0, react_1.createElement)("div", null,
                (0, react_1.createElement)("label", { htmlFor: 'v8-' + (this.props.compact ? 'home-' : 'full-') + key }, label),
                (0, react_1.createElement)("span", null,
                    (0, react_1.createElement)(NumberEditor_1.NumberEditor, { value: v, min: min, max: max, label: label + ', sayı girişi', onCommit: n => this.change({ [key]: n }) }),
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
        this.state = { config: p.query && new URLSearchParams(p.query).has('en') ? project_1.projectStore.openStudio(p.query, (0, desk_v8_1.studioFromQuery)(p.query)) : project_1.projectStore.getStudio(), status: 'poster', tab: 'motion', dimensions: false, view: 'perspective', share: false, rotating: false, fullscreen: false, footprint: null, hotspots: false, hotspot: '', roomWidth: '', roomDepth: '', fit: null, fitError: '' };
    }
    componentDidMount() { document.addEventListener('fullscreenchange', this.fullscreenChanged); if (!this.props.compact)
        this.start(); }
    componentWillUnmount() { document.removeEventListener('fullscreenchange', this.fullscreenChanged); this.alive = false; this.engine?.dispose(); this.engine = null; }
    render() {
        const { config: c, status, tab, dimensions, view } = this.state, light = c.lighting, p = this.props, ready = status === 'ready', prefix = p.compact ? 'home' : 'full';
        return (0, react_1.createElement)("div", { ref: e => this.root = e, className: 'v8-experience ' + (p.compact ? 'v8-compact' : 'v8-full'), "data-studio": p.compact ? 'home' : 'full', "data-three-status": status, "data-room": c.room, "data-fullscreen": this.state.fullscreen ? 'true' : 'false' },
            (0, react_1.createElement)("div", { className: "v8-story" },
                (0, react_1.createElement)(ui_1.Eyebrow, null, p.compact ? '05 / YAŞAYAN TASARIM MASASI' : 'ELİF TASARIM / 3D STÜDYO'),
                p.compact ? (0, react_1.createElement)("h2", null,
                    "\u00C7al\u0131\u015Fma alan\u0131n\u0131z,",
                    (0, react_1.createElement)("br", null),
                    (0, react_1.createElement)("em", null, "sizinle de\u011Fi\u015Fsin.")) : (0, react_1.createElement)("h1", null,
                    "Kendi \u00E7al\u0131\u015Fma",
                    (0, react_1.createElement)("br", null),
                    (0, react_1.createElement)("em", null, "alan\u0131n\u0131z\u0131 tasarlay\u0131n.")),
                (0, react_1.createElement)("p", { className: "v8-lede" }, "Y\u00FCkselen bir \u00E7al\u0131\u015Fma y\u00FCzeyi, \u00E7ekmeceler ve d\u00F6ner yan tabla. Masay\u0131 \u00F6l\u00E7\u00FCn\u00FCze g\u00F6re inceleyin. \u0130ki yandaki kitapl\u0131klar, mek\u00E2n\u0131 birlikte hayal etmek i\u00E7in."),
                project_1.projectStore.get().studioNotice && (0, react_1.createElement)("p", { className: "v11-studio-notice", role: "status" }, project_1.projectStore.get().studioNotice),
                (0, react_1.createElement)("div", { className: "v8-design-note" },
                    (0, react_1.createElement)("span", { className: "v8-series-number" }, "01"),
                    (0, react_1.createElement)("div", null,
                        (0, react_1.createElement)("strong", null, "DEV\u0130R"),
                        (0, react_1.createElement)("span", null, "Y\u00DCKSEKL\u0130K AYARLI \u00C7ALI\u015EMA MASASI")),
                    (0, react_1.createElement)("span", { className: "v8-concept-label" }, "Konsept model")),
                (0, react_1.createElement)("div", { className: "v8-control-tabs", role: "tablist", "aria-label": "Tasar\u0131m kontrol grubu" }, [['motion', 'Masa'], ['size', 'Ölçü'], ['room', 'Mekân']].map(([id, name]) => (0, react_1.createElement)("button", { type: "button", role: "tab", key: id, id: 'studio-' + prefix + '-tab-' + id, "aria-controls": 'studio-' + prefix + '-panel', tabIndex: tab === id ? 0 : -1, "aria-selected": tab === id, onKeyDown: e => this.tabKey(e, id), onClick: () => this.setState({ tab: id }) }, name))),
                (0, react_1.createElement)("div", { className: "v8-controls", id: 'studio-' + prefix + '-panel', "aria-labelledby": 'studio-' + prefix + '-tab-' + tab, role: "tabpanel", "aria-label": tab === 'motion' ? 'Hareket kontrolleri' : tab === 'size' ? 'Ölçü kontrolleri' : 'Mekân kontrolleri' }, tab === 'motion' ? (0, react_1.createElement)(react_1.Fragment, null,
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
                    (0, react_1.createElement)("p", { className: "v8-control-note" }, "Bu aral\u0131klar g\u00F6rsel ke\u015Fif i\u00E7indir. Ger\u00E7ek \u00F6l\u00E7\u00FC ve mekanizma, \u00FCretim \u00F6ncesi birlikte netle\u015Ftirilir.")) : (0, react_1.createElement)("div", { className: "v9-room-controls" },
                    (0, react_1.createElement)("span", { className: "v9-control-label" }, "MEK\u00C2N K\u0130TAPLIKLARI"),
                    (0, react_1.createElement)("div", { className: "v9-shelf-options", role: "group", "aria-label": "Raf d\u00FCzeni" }, [['both', 'Çift taraflı'], ['left', 'Sol raf'], ['right', 'Sağ raf'], ['none', 'Rafsız']].map(([id, label]) => (0, react_1.createElement)("button", { key: id, type: "button", "aria-pressed": c.shelves === id, onClick: () => this.change({ shelves: id, room: 'atelier' }) }, label))),
                    (0, react_1.createElement)("label", { className: "v9-light-control" },
                        "Raf ayd\u0131nlatmas\u0131 ",
                        (0, react_1.createElement)("span", null,
                            c.shelfLight,
                            "%"),
                        (0, react_1.createElement)("input", { "aria-label": "Raf \u0131\u015F\u0131\u011F\u0131", type: "range", min: "0", max: "100", value: c.shelfLight, onInput: e => this.change({ shelfLight: +e.currentTarget.value }) })),
                    (0, react_1.createElement)("p", { className: "v8-control-note" }, "Kitapl\u0131klar ve koltuk mek\u00E2n\u0131 g\u00F6stermek i\u00E7indir. Masa \u00F6l\u00E7\u00FCs\u00FCne veya bir fiyat teklifine dahil de\u011Fildir."))),
                (0, react_1.createElement)("div", { className: "v8-materials" },
                    (0, react_1.createElement)("span", null, "MASA Y\u00DCZEY\u0130"),
                    (0, react_1.createElement)("div", { role: "group", "aria-label": "Ah\u015Fap y\u00FCzey se\u00E7enekleri" }, Object.entries(desk_v8_1.studioMaterials).map(([id, m]) => (0, react_1.createElement)("button", { type: "button", key: id, "aria-pressed": c.material === id, "aria-label": m.name, onClick: () => this.change({ material: id }) },
                        (0, react_1.createElement)("i", { className: 'v8-swatch v8-' + id, style: { backgroundColor: m.color } }),
                        (0, react_1.createElement)("span", null, m.name))))),
                (0, react_1.createElement)("div", { className: "v8-primary-action" },
                    p.compact ? (0, react_1.createElement)(ui_1.Link, { className: "button", to: '/tasarim-masasi?' + (0, desk_v8_1.studioQuery)(c), navigate: p.navigate },
                        "St\u00FCdyoda devam et ",
                        (0, react_1.createElement)(ui_1.Icon, null)) : (0, react_1.createElement)("button", { type: "button", className: "button", onClick: this.handoff },
                        "Bu tasar\u0131m\u0131 Yunus Usta ile konu\u015F ",
                        (0, react_1.createElement)(ui_1.Icon, null)),
                    (0, react_1.createElement)("span", null, "\u00D6l\u00E7\u00FC, malzeme ve hareket alan\u0131n\u0131 birlikte de\u011Ferlendirelim."),
                    !p.compact && (0, react_1.createElement)("a", { className: "v10-direct-question", href: (0, project_1.whatsappUrl)("Merhaba Yunus Usta, Devir 01 konsepti hakkında görüşmek istiyorum.\n" + (0, desk_v8_1.studioSummary)(c)), target: "_blank", rel: "noopener noreferrer" },
                        "Form doldurmadan WhatsApp\u2019ta sor ",
                        (0, react_1.createElement)(ui_1.Icon, { name: "diagonal", size: 16 })))),
            (0, react_1.createElement)("div", { className: "v8-showroom" },
                (0, react_1.createElement)("div", { className: "v8-viewer-top" },
                    (0, react_1.createElement)("div", null,
                        (0, react_1.createElement)("span", { className: "v8-live-dot" }),
                        (0, react_1.createElement)("span", null, ready ? 'CANLI 360° STÜDYO' : 'İNTERAKTİF TASARIM STÜDYOSU')),
                    (0, react_1.createElement)("span", null, "DEV\u0130R 01 \u00B7 KONSEPT MODEL")),
                (0, react_1.createElement)("div", { className: "v8-canvas-wrap" },
                    (0, react_1.createElement)("div", { className: "v9-environment", role: "group", "aria-label": "Sahne g\u00F6r\u00FCn\u00FCm\u00FC" },
                        (0, react_1.createElement)("button", { type: "button", "aria-pressed": c.room === 'atelier', onClick: () => this.change({ room: 'atelier' }) }, "Mek\u00E2n i\u00E7inde"),
                        (0, react_1.createElement)("button", { type: "button", "aria-pressed": c.room === 'product', onClick: () => this.change({ room: 'product' }) }, "Yaln\u0131z masa")),
                    (0, react_1.createElement)("div", { className: "v8-canvas-host", ref: e => this.host = e }),
                    !ready && (0, react_1.createElement)("div", { className: "v8-poster" },
                        (0, react_1.createElement)("img", { src: (0, ui_1.image)(c.room === 'atelier' ? 'atelier-poster-v9.webp' : 'devir-poster.webp'), alt: "\u00C7ekmeceli ana tabla, dolap ve d\u00F6ner yan y\u00FCzeyli Devir 01 konsept \u00E7al\u0131\u015Fma masas\u0131" }),
                        (0, react_1.createElement)("div", { className: "v8-poster-action" }, status === 'poster' ? (0, react_1.createElement)("button", { type: "button", "aria-label": "3D deneyimi ba\u015Flat", onClick: this.start },
                            (0, react_1.createElement)("span", { className: "v8-cube", "aria-hidden": "true" }, "\u25C7"),
                            "3D deneyimi ba\u015Flat ",
                            (0, react_1.createElement)(ui_1.Icon, { size: 18 })) : status === 'loading' ? (0, react_1.createElement)("p", { role: "status" }, "Malzemeler ve \u0131\u015F\u0131k haz\u0131rlan\u0131yor.") : (0, react_1.createElement)(react_1.Fragment, null,
                            (0, react_1.createElement)("p", { role: "status" }, status === 'lost' ? '3D görüntü bağlantısı kesildi.' : 'Bu cihazda 3D görünüm açılamadı.'),
                            (0, react_1.createElement)("small", null, "\u00D6l\u00E7\u00FC ve malzeme se\u00E7iminiz korunur. Tasar\u0131m \u00F6zetiyle devam edebilirsiniz."),
                            (0, react_1.createElement)("button", { type: "button", onClick: this.start },
                                "3D g\u00F6r\u00FCn\u00FCm\u00FC yeniden dene ",
                                (0, react_1.createElement)(ui_1.Icon, null))))),
                    (0, react_1.createElement)("div", { className: "v8-view-tabs", role: "group", "aria-label": "Kamera a\u00E7\u0131lar\u0131" }, [['perspective', 'Genel'], ['front', 'Çekmece tarafı'], ['back', 'Arka'], ['left', 'Soldan'], ['right', 'Sağdan'], ['top', 'Üstten']].map(([id, name]) => (0, react_1.createElement)("button", { type: "button", key: id, disabled: !ready, "aria-pressed": view === id, onClick: () => this.setView(id) }, name))),
                    (0, react_1.createElement)("div", { className: "v8-view-tools" },
                        (0, react_1.createElement)("button", { type: "button", disabled: !ready, className: "v11-fullscreen-toggle", "aria-label": this.state.fullscreen ? 'Tam ekrandan çık' : 'Stüdyoyu kontrollerle tam ekran aç', "aria-pressed": this.state.fullscreen, onClick: this.fullscreen },
                            (0, react_1.createElement)("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", "aria-hidden": "true" },
                                (0, react_1.createElement)("path", { d: "M9 3H3v6m12-6h6v6M3 15v6h6m12-6v6h-6" }))),
                        (0, react_1.createElement)("button", { type: "button", disabled: !ready, "aria-label": "Yak\u0131nla\u015Ft\u0131r", onClick: () => this.engine?.zoom(.88) },
                            (0, react_1.createElement)(ui_1.Icon, { name: "plus" })),
                        (0, react_1.createElement)("button", { type: "button", disabled: !ready, "aria-label": "Uzakla\u015Ft\u0131r", onClick: () => this.engine?.zoom(1.12) },
                            (0, react_1.createElement)(ui_1.Icon, { name: "minus" })),
                        (0, react_1.createElement)("button", { type: "button", disabled: !ready, "aria-label": "G\u00F6r\u00FCn\u00FCm\u00FC s\u0131f\u0131rla", onClick: () => this.setView('perspective') },
                            (0, react_1.createElement)("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", "aria-hidden": "true" },
                                (0, react_1.createElement)("path", { d: "M3 10a9 9 0 1 1 1 8M3 4v6h6" }))),
                        (0, react_1.createElement)("button", { type: "button", disabled: !ready, "aria-label": "\u00D6l\u00E7\u00FC \u00E7izgilerini g\u00F6ster", "aria-pressed": dimensions, onClick: () => this.setState({ dimensions: !dimensions }, () => this.engine?.dimensions(this.state.dimensions)) },
                            (0, react_1.createElement)(ui_1.Icon, { name: "ruler" })),
                        (0, react_1.createElement)("button", { type: "button", disabled: !ready, "aria-label": this.state.hotspots ? 'Detay noktalarını gizle' : 'Detay noktalarını göster', "aria-pressed": this.state.hotspots, onClick: this.toggleHotspots },
                            (0, react_1.createElement)(ui_1.Icon, { name: "info" }))),
                    this.state.hotspot && hotspotCopy[this.state.hotspot] && (0, react_1.createElement)("aside", { className: "v13-hotspot-card", role: "status" },
                        (0, react_1.createElement)("button", { type: "button", "aria-label": "Detay bilgisini kapat", onClick: () => this.setState({ hotspot: '' }) }, "\u00D7"),
                        (0, react_1.createElement)("span", null, "DETAY NOKTASI"),
                        (0, react_1.createElement)("strong", null, hotspotCopy[this.state.hotspot].title),
                        (0, react_1.createElement)("p", null, hotspotCopy[this.state.hotspot].body)),
                    (0, react_1.createElement)("span", { className: "v8-canvas-hint" }, ready ? 'Çekmeceye veya dolaba dokunarak açın. Sürükleyerek 360° inceleyin.' : 'Gerçek zamanlı üç boyutlu model'),
                    (0, react_1.createElement)("span", { className: "v8-scene-label" }, "Konsept model")),
                (0, react_1.createElement)("div", { className: "v11-quick-controls", "aria-label": "G\u00F6r\u00FCnt\u00FCn\u00FCn yan\u0131nda h\u0131zl\u0131 ayarlar" },
                    (0, react_1.createElement)("label", { htmlFor: 'quick-height-' + prefix },
                        "Y\u00FCkseklik ",
                        (0, react_1.createElement)("strong", null,
                            c.height,
                            " cm")),
                    (0, react_1.createElement)("input", { id: 'quick-height-' + prefix, "aria-label": "H\u0131zl\u0131 \u00E7al\u0131\u015Fma y\u00FCksekli\u011Fi", type: "range", min: "80", max: "125", step: "1", value: c.height, onInput: e => this.change({ height: +e.currentTarget.value }) }),
                    (0, react_1.createElement)("div", { role: "group", "aria-label": "H\u0131zl\u0131 y\u00FCzey se\u00E7imi" }, Object.entries(desk_v8_1.studioMaterials).map(([id, m]) => (0, react_1.createElement)("button", { type: "button", key: id, "aria-label": 'Hızlı ' + m.name, "aria-pressed": c.material === id, onClick: () => this.change({ material: id }) },
                        (0, react_1.createElement)("i", { style: { backgroundColor: m.color } }),
                        m.name)))),
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
                        (0, react_1.createElement)("button", { type: "button", "aria-pressed": light === 'day', onClick: () => this.change({ lighting: 'day' }) }, "G\u00FCn \u0131\u015F\u0131\u011F\u0131"),
                        (0, react_1.createElement)("button", { type: "button", "aria-pressed": light === 'evening', onClick: () => this.change({ lighting: 'evening' }) }, "Ak\u015Fam")),
                    (0, react_1.createElement)("button", { type: "button", disabled: !ready, className: "v8-export", onClick: this.snapshot },
                        (0, react_1.createElement)(ui_1.Icon, { name: "download", size: 19 }),
                        (0, react_1.createElement)("span", null, "G\u00F6r\u00FCn\u00FCm\u00FC kaydet"))),
                (0, react_1.createElement)("div", { className: "v8-experience-foot" },
                    (0, react_1.createElement)("span", null,
                        (0, react_1.createElement)(ui_1.Icon, { name: "ruler", size: 16 }),
                        "\u00D6l\u00E7\u00FCye g\u00F6re de\u011Fi\u015Fen geometri"),
                    (0, react_1.createElement)("span", null,
                        (0, react_1.createElement)(ui_1.Icon, { name: "grid", size: 16 }),
                        "\u00C7ift tarafl\u0131 raf deneyimi"),
                    (0, react_1.createElement)("span", null, "Three.js / WebGL")),
                !p.compact && (0, react_1.createElement)(react_1.Fragment, null,
                    (0, react_1.createElement)("div", { className: "v8-export-row" },
                        (0, react_1.createElement)("button", { className: "text-link", type: "button", onClick: () => (0, domain_1.downloadText)('Elif-Devir-01-Tasarim.txt', (0, desk_v8_1.studioSummary)(c)) },
                            "\u00D6l\u00E7\u00FC \u00F6zetini indir ",
                            (0, react_1.createElement)(ui_1.Icon, { name: "download", size: 17 })),
                        (0, react_1.createElement)("button", { className: "text-link", type: "button", "aria-expanded": this.state.share, onClick: () => this.setState({ share: !this.state.share }) },
                            "Tasar\u0131m ba\u011Flant\u0131s\u0131 ",
                            (0, react_1.createElement)(ui_1.Icon, { name: "diagonal", size: 17 })),
                        (0, react_1.createElement)("button", { type: "button", className: "text-link", disabled: !ready, "aria-pressed": this.state.rotating, onClick: this.toggleRotate },
                            this.state.rotating ? 'Dönüşü durdur' : '360° otomatik döndür',
                            " ",
                            (0, react_1.createElement)(ui_1.Icon, { name: "clock", size: 17 }))),
                    this.state.share && (0, react_1.createElement)("label", { className: "v8-share-field" },
                        "Yaln\u0131z model se\u00E7eneklerinizi i\u00E7eren ba\u011Flant\u0131",
                        (0, react_1.createElement)("input", { "aria-label": "Payla\u015F\u0131labilir 3D tasar\u0131m ba\u011Flant\u0131s\u0131", readOnly: true, value: this.shareURL(), onFocus: e => e.currentTarget.select() }),
                        (0, react_1.createElement)("small", null, "Ki\u015Fisel not veya ileti\u015Fim bilgisi i\u00E7ermez."))),
                !p.compact && (0, react_1.createElement)(DesignWorkbench_1.DesignWorkbench, { config: c, ready: ready, getEngine: () => this.engine, onSelect: this.change, notify: p.notify }),
                (0, react_1.createElement)("div", { className: "v11-footprint" },
                    (0, react_1.createElement)("button", { className: "text-link", type: "button", disabled: !ready, onClick: this.measureFootprint },
                        "\u00DCstten yerle\u015Fim alan\u0131n\u0131 g\u00F6r ",
                        (0, react_1.createElement)(ui_1.Icon, { name: "ruler", size: 17 })),
                    this.state.footprint && (0, react_1.createElement)("p", { role: "status", className: "v11-footprint-result" },
                        (0, react_1.createElement)("strong", null,
                            this.state.footprint.width,
                            " \u00D7 ",
                            this.state.footprint.depth,
                            " cm"),
                        " Ekrandaki masa ve hareketli par\u00E7alar\u0131n toplam g\u00F6rsel s\u0131n\u0131r\u0131."),
                    (0, react_1.createElement)("small", null, "Oda, sandalye ve kitapl\u0131klar dahil de\u011Fildir. Hareket g\u00FCvenli\u011Fi veya imalat \u00F6l\u00E7\u00FCs\u00FC de\u011Fil, se\u00E7ili konumun yakla\u015F\u0131k yerle\u015Fim g\u00F6r\u00FCn\u00FCm\u00FCd\u00FCr."),
                    !p.compact && (0, react_1.createElement)("div", { className: "v13-fit-planner" },
                        (0, react_1.createElement)("div", null,
                            (0, react_1.createElement)("span", { className: "eyebrow" }, "ODANIZA G\u00D6RE D\u00DC\u015E\u00DCN\u00DCN"),
                            (0, react_1.createElement)("h3", null, "Bu d\u00FCzen alana nas\u0131l oturuyor?"),
                            (0, react_1.createElement)("p", null, "Odan\u0131z\u0131n kullan\u0131labilir enini ve derinli\u011Fini girin. Hesap yaln\u0131z se\u00E7ili masa geometrisinin ortalanm\u0131\u015F g\u00F6rsel s\u0131n\u0131r\u0131n\u0131 kar\u015F\u0131la\u015Ft\u0131r\u0131r.")),
                        (0, react_1.createElement)("div", { className: "v13-fit-fields" },
                            (0, react_1.createElement)("label", null,
                                "Oda eni ",
                                (0, react_1.createElement)("span", null,
                                    (0, react_1.createElement)("input", { "aria-label": "Oda eni", inputMode: "decimal", value: this.state.roomWidth, onInput: e => this.setState({ roomWidth: e.currentTarget.value, fit: null, fitError: '' }) }),
                                    " cm")),
                            (0, react_1.createElement)("label", null,
                                "Oda derinli\u011Fi ",
                                (0, react_1.createElement)("span", null,
                                    (0, react_1.createElement)("input", { "aria-label": "Oda derinli\u011Fi", inputMode: "decimal", value: this.state.roomDepth, onInput: e => this.setState({ roomDepth: e.currentTarget.value, fit: null, fitError: '' }) }),
                                    " cm")),
                            (0, react_1.createElement)("button", { type: "button", className: "button button-outline", disabled: !ready, onClick: this.evaluateFit }, "Yerle\u015Fimi kar\u015F\u0131la\u015Ft\u0131r")),
                        this.state.fit && (0, react_1.createElement)("div", { className: 'v13-fit-result ' + (this.state.fit.fits ? 'fits' : 'does-not-fit'), role: "status" },
                            (0, react_1.createElement)("strong", null, this.state.fit.fits ? 'Bu görsel sınır oda içine sığıyor.' : 'Bu seçili konumda masa sınırı odayı aşıyor.'),
                            (0, react_1.createElement)("span", null, this.state.fit.fits ? 'Yanlarda yaklaşık ' + this.state.fit.widthClearance + ' cm, önde ve arkada yaklaşık ' + this.state.fit.depthClearance + ' cm pay.' : 'Oda eni için ' + (Math.ceil(Math.max(0, this.state.fit.footprintWidth - this.state.fit.roomWidth) * 10) / 10) + ' cm, derinlik için ' + (Math.ceil(Math.max(0, this.state.fit.footprintDepth - this.state.fit.roomDepth) * 10) / 10) + ' cm ek alan gerekir.')),
                        this.state.fit && (0, react_1.createElement)(RoomDiagram_1.RoomDiagram, { fit: this.state.fit }),
                        (0, react_1.createElement)("p", { className: "v20-fit-detail" }, "Se\u00E7enekleri kar\u015F\u0131la\u015Ft\u0131r\u0131rken oda \u00F6l\u00E7\u00FCs\u00FC bu sekmede kal\u0131r. Payla\u015F\u0131labilir tasar\u0131m ba\u011Flant\u0131s\u0131na eklenmez."),
                        this.state.fitError && (0, react_1.createElement)("p", { className: "model-error", role: "alert" }, this.state.fitError),
                        (0, react_1.createElement)("small", null, "Bu sonu\u00E7 sandalye dola\u015F\u0131m\u0131, kap\u0131 a\u00E7\u0131l\u0131m\u0131, s\u00FCp\u00FCrgelik, montaj tolerans\u0131 veya g\u00FCvenli mekanik hareket pay\u0131n\u0131 hesaplamaz. Yerle\u015Fim g\u00F6r\u00FC\u015Fmesine haz\u0131rl\u0131k i\u00E7indir."))),
                (0, react_1.createElement)("p", { className: "v12-orbit-note" }, "\u00C7ekmeceler sandalye taraf\u0131na a\u00E7\u0131l\u0131r. Arka a\u00E7\u0131ya ge\u00E7erken g\u00F6r\u00FC\u015F\u00FC kapatan oda \u00F6\u011Feleri ge\u00E7ici gizlenir, raf se\u00E7iminiz de\u011Fi\u015Fmez. Klavye oklar\u0131yla d\u00F6nebilir, + ve \u2212 ile yak\u0131nla\u015Ft\u0131rabilir, 0 ile ilk g\u00F6r\u00FCn\u00FCme d\u00F6nebilirsiniz. Telefonda sayfay\u0131 sahnenin d\u0131\u015F\u0131ndan kayd\u0131r\u0131n."),
                (0, react_1.createElement)("p", { className: "v8-engineering-note" }, "Konsept modeldir. Raflar ve aksesuarlar masa \u00F6l\u00E7\u00FCs\u00FCne veya teklifine otomatik dahil de\u011Fildir. Nihai mekanizma, y\u00FCk kapasitesi, hareket a\u00E7\u0131kl\u0131\u011F\u0131 ve \u00FCretim \u00F6l\u00E7\u00FCleri at\u00F6lye onay\u0131 gerektirir. Bu sahne teknik imalat \u00E7izimi veya g\u00FCvenlik testi de\u011Fildir."),
                !p.compact && (0, react_1.createElement)("section", { className: "v13-devir-guide", "aria-labelledby": "devir-guide-title" },
                    (0, react_1.createElement)("span", { className: "eyebrow" }, "DEV\u0130R 01 / KARAR REHBER\u0130"),
                    (0, react_1.createElement)("h2", { id: "devir-guide-title" },
                        "G\u00FCzel g\u00F6r\u00FCnmesinden \u00F6nce,",
                        (0, react_1.createElement)("br", null),
                        (0, react_1.createElement)("em", null, "nas\u0131l kullanaca\u011F\u0131n\u0131z\u0131 d\u00FC\u015F\u00FCn\u00FCn.")),
                    (0, react_1.createElement)("div", { className: "v13-guide-grid" },
                        (0, react_1.createElement)("article", null,
                            (0, react_1.createElement)("span", null, "01"),
                            (0, react_1.createElement)("h3", null, "Oturun, y\u00FCkseltin, devam edin."),
                            (0, react_1.createElement)("p", null, "Konseptin ana fikri, ayn\u0131 y\u00FCzeyde oturarak ve ayakta \u00E7al\u0131\u015Fma aras\u0131nda ge\u00E7i\u015F. Ger\u00E7ek motor se\u00E7imi ve ergonomik y\u00FCkseklik aral\u0131\u011F\u0131 \u00FCretim \u00F6ncesi do\u011Frulan\u0131r.")),
                        (0, react_1.createElement)("article", null,
                            (0, react_1.createElement)("span", null, "02"),
                            (0, react_1.createElement)("h3", null, "Yan y\u00FCzey, farkl\u0131 d\u00FCzenler."),
                            (0, react_1.createElement)("p", null, "D\u00F6ner tabla, tek bir masay\u0131 d\u00FCz, L veya daha a\u00E7\u0131k \u00E7al\u0131\u015Fma d\u00FCzenlerine yakla\u015Ft\u0131r\u0131r. Mekanik s\u0131n\u0131rlar ve odadaki d\u00F6n\u00FC\u015F alan\u0131 prototiple teyit edilmelidir.")),
                        (0, react_1.createElement)("article", null,
                            (0, react_1.createElement)("span", null, "03"),
                            (0, react_1.createElement)("h3", null, "Depolama i\u015Fin i\u00E7inde."),
                            (0, react_1.createElement)("p", null, "\u00DCst \u00E7ekmeceler ve sabit dolap g\u00FCnl\u00FCk ekipman\u0131 masan\u0131n \u00FCzerinde b\u0131rakmadan yak\u0131n\u0131n\u0131zda tutmak i\u00E7in d\u00FC\u015F\u00FCn\u00FClm\u00FC\u015Ft\u00FCr. \u0130\u00E7 d\u00FCzen tamamen yeniden planlanabilir."))),
                    (0, react_1.createElement)("div", { className: "v13-guide-check" },
                        (0, react_1.createElement)("h3", null, "Teklif g\u00F6r\u00FC\u015Fmesinde birlikte netle\u015Ftirelim."),
                        (0, react_1.createElement)("ul", null,
                            (0, react_1.createElement)("li", null, "Ger\u00E7ek oda \u00F6l\u00E7\u00FCs\u00FC ve dola\u015F\u0131m alan\u0131"),
                            (0, react_1.createElement)("li", null, "Motor, kontrol \u00FCnitesi ve ta\u015F\u0131ma gereksinimi"),
                            (0, react_1.createElement)("li", null, "Kablo y\u00F6netimi ve priz konumu"),
                            (0, react_1.createElement)("li", null, "\u00C7ekmece, dolap ve yan tabla kullan\u0131m senaryosu"),
                            (0, react_1.createElement)("li", null, "Ger\u00E7ek ah\u015Fap, kaplama, boya ve y\u00FCzey numunesi"))))));
    }
}
exports.DeskExperience = DeskExperience;

},
"src/components/DraftRecovery":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DraftRecovery = void 0;
const react_1 = require("react");
const ui_1 = require("./ui");
const project_1 = require("../lib/project");
const draft_recovery_1 = require("../lib/draft-recovery");
const draft_session_1 = require("../lib/draft-session");
const domain_1 = require("../lib/domain");
class DraftRecovery extends react_1.Component {
    constructor() {
        super(...arguments);
        this.state = { enabled: false, message: '', record: { kind: 'empty' }, busy: false };
        this.unsubscribe = null;
        this.alive = true;
        this.refresh = () => { if (this.alive)
            this.setState(draft_session_1.draftSession.status()); };
        this.restore = () => { const r = draft_session_1.draftSession.status().record; if (r.kind !== 'ready' || !r.draft) {
            this.refresh();
            return;
        } if (!window.confirm('Kayıtlı metin ve ölçüler bu açık taslağın yerine getirilsin mi? Açık taslaktaki fotoğraflar kaldırılır, onları yeniden eklemeniz gerekir.'))
            return; project_1.attachmentStore.clear(); draft_session_1.draftSession.restore(r.draft); this.props.onRestore(); this.refresh(); this.setState({ message: 'Taslak geri yüklendi. Fotoğrafları yeniden ekleyin. Otomatik cihaz kaydı için aşağıdaki izni ayrıca açabilirsiniz.' }); };
        this.enable = (checked) => { if (checked) {
            if (this.state.record.kind === 'ready' && !this.state.enabled && !window.confirm('Bu cihazdaki önceki kurtarma kaydı, açık taslağınızla değiştirilsin mi?'))
                return;
            draft_session_1.draftSession.enable();
        }
        else
            draft_session_1.draftSession.disable(); this.refresh(); };
        this.export = () => { try {
            (0, domain_1.downloadText)('Elif_Proje_Taslagi.json', (0, draft_recovery_1.encodeDraft)(project_1.projectStore.get()));
            this.setState({ message: 'Kurtarma dosyası hazırlandı. Kendi notunuz ve yazdığınız bölge dosyadadır. Özel dosyanızı güvenli saklayın. Fotoğraflar dahil değil.' });
        }
        catch (e) {
            this.setState({ message: e instanceof Error ? e.message : 'Taslak dosyası oluşturulamadı.' });
        } };
        this.import = async (file) => { if (!file || this.state.busy)
            return; if (file.size > draft_recovery_1.MAX_BACKUP_BYTES) {
            this.setState({ message: 'En fazla 96 KB Elif taslak dosyası açılabilir.' });
            return;
        } this.setState({ busy: true }); try {
            const value = (0, draft_recovery_1.decodeDraft)(await file.text());
            if (!this.alive)
                return;
            if (!window.confirm('Dosyadaki proje, bu açık taslağın yerine açılsın mı? Mevcut fotoğraflar kaldırılır. İşlem atölyeye hiçbir veri göndermez.'))
                return;
            project_1.attachmentStore.clear();
            draft_session_1.draftSession.restore(value);
            this.props.onRestore();
            this.refresh();
            this.setState({ message: 'Dosyadaki taslak açıldı. Fotoğrafları yeniden ekleyin. Atölyeye otomatik gönderilmedi.' });
        }
        catch (e) {
            if (this.alive)
                this.setState({ message: e instanceof Error ? e.message : 'Taslak dosyası okunamadı.' });
        }
        finally {
            if (this.alive)
                this.setState({ busy: false });
        } };
    }
    componentDidMount() { this.refresh(); this.unsubscribe = draft_session_1.draftSession.subscribe(this.refresh); }
    componentWillUnmount() { this.alive = false; this.unsubscribe?.(); }
    render() {
        const s = this.state, pending = s.record.kind === 'ready' && !s.enabled;
        return (0, react_1.createElement)("details", { className: "v21-recovery", open: pending },
            (0, react_1.createElement)("summary", null,
                (0, react_1.createElement)("span", null,
                    (0, react_1.createElement)(ui_1.Icon, { name: "download", size: 18 }),
                    " Fikrinize daha sonra devam edin"),
                (0, react_1.createElement)("small", null, s.enabled ? 'Cihaz kurtarması açık' : pending ? 'Kayıtlı taslak bulundu' : 'İsteğe bağlı, yalnız sizin cihazınızda')),
            (0, react_1.createElement)("div", { className: "v21-recovery-body" },
                (0, react_1.createElement)("p", null, "Not, model ve \u00F6l\u00E7\u00FClerinizi koruyun. Varsay\u0131lan olarak yaln\u0131z a\u00E7\u0131k sekmededir. Foto\u011Fraflar ve ilham dosyan\u0131z bu kurtarma kayd\u0131na dahil de\u011Fildir."),
                pending && (0, react_1.createElement)("div", { className: "v21-restore-notice" },
                    (0, react_1.createElement)("strong", null, "\u00D6nceki tasla\u011F\u0131n\u0131z bu cihazda duruyor."),
                    (0, react_1.createElement)("p", null, "Geri y\u00FCklemeden \u00F6nce a\u00E7\u0131k tasla\u011F\u0131n\u0131z\u0131 dosya olarak saklayabilirsiniz."),
                    (0, react_1.createElement)("button", { type: "button", className: "button", onClick: this.restore }, "Kay\u0131tl\u0131 tasla\u011F\u0131 geri getir"),
                    (0, react_1.createElement)("button", { type: "button", className: "text-link", onClick: () => { draft_session_1.draftSession.disable(); this.refresh(); } }, "Cihazdaki kayd\u0131 sil")),
                (0, react_1.createElement)("label", { className: "v21-save-consent" },
                    (0, react_1.createElement)("input", { type: "checkbox", checked: s.enabled, onChange: e => this.enable(e.currentTarget.checked) }),
                    (0, react_1.createElement)("span", null,
                        "Metin ve \u00F6l\u00E7\u00FClerimi bu cihazda 7 g\u00FCn sakla",
                        (0, react_1.createElement)("small", null, "Se\u00E7ince sonraki de\u011Fi\u015Fiklikler de kaydedilir. Son kay\u0131ttan yedi g\u00FCn sonra, site tekrar kontrol etti\u011Finde kurtarma kayd\u0131 silinir. Ortak cihazlarda kullanmay\u0131n. Bu kay\u0131t \u015Fifreli bir m\u00FC\u015Fteri hesab\u0131 de\u011Fildir."))),
                (0, react_1.createElement)("div", { className: "v21-recovery-actions" },
                    (0, react_1.createElement)("button", { type: "button", className: "button button-outline", onClick: this.export },
                        "Taslak dosyas\u0131n\u0131 indir ",
                        (0, react_1.createElement)(ui_1.Icon, { name: "download", size: 16 })),
                    (0, react_1.createElement)("label", { className: "button button-outline v21-import" },
                        "Taslak dosyas\u0131n\u0131 a\u00E7",
                        (0, react_1.createElement)("input", { type: "file", accept: ".json,application/json", "aria-label": "Elif proje tasla\u011F\u0131 dosyas\u0131n\u0131 a\u00E7", disabled: s.busy, onChange: e => { const file = e.currentTarget.files?.[0]; e.currentTarget.value = ''; void this.import(file); } }))),
                (0, react_1.createElement)("p", { className: "field-hint" }, "\u0130ndirilen JSON dosyas\u0131 \u00F6zel notlar\u0131n\u0131z\u0131 i\u00E7erebilir. Herkese a\u00E7\u0131k masa kar\u015F\u0131la\u015Ft\u0131rma dosyas\u0131ndan farkl\u0131d\u0131r. Kaydetmek veya a\u00E7mak, at\u00F6lyeye talep g\u00F6ndermez."),
                s.record.kind === 'invalid' && (0, react_1.createElement)("p", { role: "status" }, "Cihazdaki kurtarma kayd\u0131 okunam\u0131yor. A\u00E7\u0131k tasla\u011F\u0131n\u0131z de\u011Fi\u015Ftirilmedi. \u00D6nceki kayd\u0131 cihaz tercihleri alan\u0131ndan silebilirsiniz."),
                s.record.kind === 'expired' && (0, react_1.createElement)("p", { role: "status" }, "\u00D6nceki kurtarma kayd\u0131n\u0131n s\u00FCresi dolmu\u015F ve bu cihazdan silinmi\u015F."),
                s.record.kind === 'unavailable' && (0, react_1.createElement)("p", { role: "status" }, "Taray\u0131c\u0131 depolamas\u0131 kullan\u0131lam\u0131yor. Taslak dosyas\u0131n\u0131 indirerek devam edebilirsiniz."),
                s.message && (0, react_1.createElement)("p", { className: "v21-recovery-status", role: "status" }, s.message)));
    }
}
exports.DraftRecovery = DraftRecovery;

},
"src/components/InspirationTransfer":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InspirationTransfer = void 0;
const react_1 = require("react");
const ui_1 = require("./ui");
const selection_backup_1 = require("../lib/selection-backup");
const domain_1 = require("../lib/domain");
class InspirationTransfer extends react_1.Component {
    constructor() {
        super(...arguments);
        this.state = { pending: null, status: '', busy: false };
        this.alive = true;
        this.read = async (file) => { if (!file)
            return; this.setState({ busy: true, pending: null, status: '' }); try {
            if (file.size > selection_backup_1.MAX_SELECTION_FILE_BYTES)
                throw Error('Dosya en fazla 64 KB olabilir.');
            const ids = (0, selection_backup_1.decodeSelections)(await file.text());
            if (this.alive)
                this.setState({ pending: ids, status: ids.length + ' model bulundu. Mevcut listeniz henüz değiştirilmedi.' });
        }
        catch (e) {
            if (this.alive)
                this.setState({ status: e instanceof Error ? e.message : 'Dosya açılamadı. Mevcut seçimleriniz korunuyor.' });
        }
        finally {
            if (this.alive)
                this.setState({ busy: false });
        } };
        this.apply = (merge) => { if (!this.state.pending)
            return; try {
            const ids = merge ? (0, selection_backup_1.combineSelections)(this.props.ids, this.state.pending) : this.state.pending;
            if (!merge && !window.confirm('Mevcut ilham seçkiniz bu dosyadaki ' + ids.length + ' modelle değiştirilsin mi?'))
                return;
            this.props.replace(ids);
            this.setState({ pending: null, status: 'İlham dosyanız güncellendi. Otomatik olarak atölyeye gönderilmedi.' });
        }
        catch (e) {
            this.setState({ status: e instanceof Error ? e.message : 'Seçkiler birleştirilemedi.' });
        } };
    }
    componentWillUnmount() { this.alive = false; }
    render() { return (0, react_1.createElement)("section", { className: "v22-inspiration-transfer", "aria-labelledby": "v22-transfer-title" },
        (0, react_1.createElement)("h2", { id: "v22-transfer-title" }, "\u0130lham\u0131n\u0131z yan\u0131n\u0131zda kals\u0131n."),
        (0, react_1.createElement)("p", null, "Se\u00E7ti\u011Finiz modelleri dosya olarak saklay\u0131n. Ba\u015Fka bir cihazda ayn\u0131 se\u00E7kiyi a\u00E7abilirsiniz. Yaln\u0131z herkese a\u00E7\u0131k model kimlikleri kaydedilir, ki\u015Fisel not veya foto\u011Fraf eklenmez."),
        (0, react_1.createElement)("div", { className: "action-row" },
            (0, react_1.createElement)("button", { type: "button", className: "button button-outline", disabled: !this.props.ids.length, onClick: () => (0, domain_1.downloadText)('Elif_Ilham_Dosyasi.json', (0, selection_backup_1.encodeSelections)(this.props.ids)) },
                "\u0130lham dosyam\u0131 indir ",
                (0, react_1.createElement)(ui_1.Icon, { name: "download", size: 17 })),
            (0, react_1.createElement)("label", { className: "v22-file-label" },
                "\u0130lham dosyam\u0131 a\u00E7",
                (0, react_1.createElement)("input", { type: "file", accept: "application/json,.json", "aria-label": "Elif ilham dosyas\u0131n\u0131 a\u00E7", disabled: this.state.busy, onChange: e => { const f = e.currentTarget.files?.[0]; e.currentTarget.value = ''; this.read(f); } }))),
        this.state.pending && (0, react_1.createElement)("div", { className: "v22-import-choice" },
            (0, react_1.createElement)("p", null,
                this.state.pending.length,
                " model haz\u0131r. Nas\u0131l devam edelim?"),
            (0, react_1.createElement)("div", { className: "action-row" },
                (0, react_1.createElement)("button", { type: "button", className: "button", onClick: () => this.apply(true) }, "Mevcut se\u00E7imlerimle birle\u015Ftir"),
                (0, react_1.createElement)("button", { type: "button", className: "button button-outline", onClick: () => this.apply(false) }, "Mevcut se\u00E7kiyi de\u011Fi\u015Ftir"),
                (0, react_1.createElement)("button", { type: "button", className: "text-link", onClick: () => this.setState({ pending: null, status: 'İçe aktarma iptal edildi. Seçimleriniz değişmedi.' }) }, "Vazge\u00E7"))),
        this.state.status && (0, react_1.createElement)("p", { role: "status", className: "v22-transfer-status" }, this.state.status)); }
}
exports.InspirationTransfer = InspirationTransfer;

},
"src/components/NumberEditor":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberEditor = void 0;
const react_1 = require("react");
const design_board_1 = require("../lib/design-board");
class NumberEditor extends react_1.Component {
    constructor(p) {
        super(p);
        this.commit = () => { const n = (0, design_board_1.parseWholeNumber)(this.state.text, this.props.min, this.props.max); if (n === null) {
            this.setState({ text: String(this.props.value), error: true });
            return;
        } this.setState({ text: String(n), error: false }); if (n !== this.props.value)
            this.props.onCommit(n); };
        this.state = { text: String(p.value), error: false };
    }
    componentDidUpdate(prev) { if (prev.value !== this.props.value)
        this.setState({ text: String(this.props.value), error: false }); }
    render() { const p = this.props, s = this.state; return (0, react_1.createElement)("span", { className: "v20-number-editor" },
        (0, react_1.createElement)("input", { type: "text", role: "spinbutton", inputMode: "numeric", "aria-label": p.label, "aria-valuemin": p.min, "aria-valuemax": p.max, "aria-valuenow": p.value, "aria-invalid": s.error || undefined, value: s.text, onInput: e => this.setState({ text: e.currentTarget.value, error: false }), onBlur: this.commit, onKeyDown: e => { if (e.key === 'Enter') {
                e.preventDefault();
                this.commit();
            } if (e.key === 'Escape')
                this.setState({ text: String(p.value), error: false }); if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                e.preventDefault();
                const n = Math.min(p.max, Math.max(p.min, p.value + (e.key === 'ArrowUp' ? 1 : -1)));
                this.setState({ text: String(n), error: false });
                p.onCommit(n);
            } } }),
        s.error && (0, react_1.createElement)("small", { role: "status" },
            p.min,
            " ile ",
            p.max,
            " aras\u0131nda tam say\u0131 girin. \u00D6nceki de\u011Fer korundu.")); }
}
exports.NumberEditor = NumberEditor;

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
            !this.props.disclosureId && (0, react_1.createElement)("p", { className: "v7-pin-disclosure" }, "Y\u00FCklemeyi se\u00E7erseniz Pinterest\u2019e ba\u011Flan\u0131l\u0131r. IP ve taray\u0131c\u0131 bilgileri aktar\u0131labilir, d\u0131\u015F servis \u00E7erez kullanabilir. Bu bir Elif uygulama foto\u011Fraf\u0131 de\u011Fildir."),
            (0, react_1.createElement)("button", { className: "pin-preview-button", "aria-describedby": this.props.disclosureId, onClick: () => this.setState({ open: true }) },
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
const ResilientImage_1 = require("./ResilientImage");
const ui_1 = require("./ui");
const image_manifest_1 = require("../lib/image-manifest");
const portfolio_1 = require("../lib/portfolio");
function VImage({ asset, alt, className = '', eager = false, sizes = '(max-width: 680px) 100vw, 50vw', full = false, priority, onLoad }) {
    const m = image_manifest_1.imageManifest[asset];
    if (!m)
        return (0, react_1.createElement)(ResilientImage_1.ResilientImage, { src: (0, ui_1.image)(asset), alt: alt, className: className, loading: eager ? 'eager' : 'lazy' });
    const max = m.variants[m.variants.length - 1], fallback = full ? max : m.variants[Math.min(1, m.variants.length - 1)];
    return (0, react_1.createElement)(ResilientImage_1.ResilientImage, { src: (0, ui_1.image)(fallback.file), fallbackSrc: (0, ui_1.image)(max.file), srcSet: m.variants.map((v) => (0, ui_1.image)(v.file) + ' ' + v.width + 'w').join(', '), sizes: sizes, width: m.width, height: m.height, alt: alt, className: className, loading: eager ? 'eager' : 'lazy', decoding: priority === 'low' ? 'async' : eager ? 'sync' : 'async', fetchPriority: priority || (eager ? 'high' : 'auto'), onLoad: onLoad });
}
function SourceTag({ kind = 'work' }) { return (0, react_1.createElement)("span", { className: 'source-tag source-' + kind }, ({ work: 'Atölye arşivi', process: 'Uygulama aşaması', concept: 'Konsept model', reference: 'Pinterest ilhamı' })[kind]); }
function WorkCard({ work: w, actions: a, featured = false, index = 0 }) {
    return (0, react_1.createElement)("article", { className: 'work-card' + (featured ? ' featured-work' : ''), "data-work": w.id },
        (0, react_1.createElement)(ui_1.Link, { to: '/proje/' + w.id, navigate: a.navigate, className: "work-photo" },
            (0, react_1.createElement)(VImage, { asset: w.images[0], alt: w.subtitle + ', atölyeden paylaşılan fotoğraf', sizes: "(max-width: 680px) 90vw, (max-width: 1024px) 45vw, 30vw" }),
            (0, react_1.createElement)(SourceTag, { kind: (0, portfolio_1.workPhotoEvidence)(w).kind }),
            (0, react_1.createElement)("span", { className: "work-open" },
                (0, react_1.createElement)(ui_1.Icon, { name: "diagonal", size: 22 }))),
        (0, react_1.createElement)("div", { className: "work-caption" },
            (0, react_1.createElement)("span", { className: "work-index" }, String(index + 1).padStart(2, '0')),
            (0, react_1.createElement)("div", null,
                (0, react_1.createElement)("span", { className: "work-category" }, (0, portfolio_1.categoryName)(w.category)),
                (0, react_1.createElement)("h3", null,
                    (0, react_1.createElement)(ui_1.Link, { to: '/proje/' + w.id, navigate: a.navigate }, featured ? w.subtitle : w.title)),
                (0, react_1.createElement)("p", null, featured ? w.title : w.subtitle),
                (0, react_1.createElement)("p", { className: "work-gallery-count" },
                    w.images.length,
                    " foto\u011Fraf",
                    (0, react_1.createElement)("span", { "aria-hidden": "true" }, " \u00B7 "),
                    w.features[0]))),
        (0, react_1.createElement)("button", { type: "button", className: "v7-save-text", "aria-label": (a.favorites.includes('work:' + w.id) ? 'İlham dosyanızda. Kaydı kaldır. ' : 'İlham dosyama ekle. ') + w.subtitle, "aria-pressed": a.favorites.includes('work:' + w.id), onClick: () => a.favorite('work:' + w.id) },
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
        (0, react_1.createElement)("small", null, "\u00D6l\u00E7\u00FC, malzeme ve \u00FCretilebilirlik Yunus Usta ile de\u011Ferlendirilir."))); }

},
"src/components/ProjectReadiness":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectReadiness = ProjectReadiness;
const react_1 = require("react");
const project_readiness_1 = require("../lib/project-readiness");
const ui_1 = require("./ui");
function ProjectReadiness({ draft, photos }) { return (0, react_1.createElement)("section", { className: "project-readiness", "aria-labelledby": "project-readiness-title" },
    (0, react_1.createElement)("h3", { id: "project-readiness-title" }, "Projeniz, bir bak\u0131\u015Fta."),
    (0, react_1.createElement)("div", null, (0, project_readiness_1.projectReadiness)(draft, photos).map(row => (0, react_1.createElement)("article", { key: row.id, "data-readiness": row.id, "data-ready": row.ready ? 'true' : 'false' },
        (0, react_1.createElement)(ui_1.Icon, { name: row.ready ? 'check' : 'info', size: 18 }),
        (0, react_1.createElement)("div", null,
            (0, react_1.createElement)("strong", null, row.title),
            (0, react_1.createElement)("p", null, row.detail)))))); }

},
"src/components/ResilientImage":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResilientImage = void 0;
const react_1 = require("react");
class ResilientImage extends react_1.Component {
    constructor() {
        super(...arguments);
        this.state = { retried: false, failed: false };
        this.element = null;
        this.onError = () => {
            if (this.state.failed)
                return;
            this.setState(this.state.retried ? { failed: true } : { retried: true });
        };
    }
    componentDidMount() {
        if (this.element?.complete && !this.element.naturalWidth)
            this.onError();
    }
    componentDidUpdate(previous) {
        if (previous.src !== this.props.src || previous.srcSet !== this.props.srcSet)
            this.setState({ retried: false, failed: false });
    }
    render() {
        const { fallbackSrc, src, srcSet, alt, className = '', ...rest } = this.props;
        if (this.state.failed)
            return (0, react_1.createElement)("span", { className: 'image-unavailable ' + className, role: "status" },
                (0, react_1.createElement)("strong", null, "G\u00F6rsel y\u00FCklenemedi."),
                (0, react_1.createElement)("span", null, alt || 'Bu bölümün görseli şu anda görüntülenemiyor.'),
                (0, react_1.createElement)("small", null, "Sayfadaki bilgiler ve ileti\u015Fim se\u00E7enekleri kullan\u0131labilir. Ba\u011Flant\u0131n\u0131z d\u00FCzeldi\u011Finde sayfay\u0131 yeniden a\u00E7abilirsiniz."));
        const fallback = fallbackSrc || src;
        const retry = fallback.startsWith('data:') || fallback.startsWith('blob:') ? fallback : fallback + (fallback.includes('?') ? '&' : '?') + 'elif-image-retry=1';
        return (0, react_1.createElement)("img", { ...rest, className: className, src: this.state.retried ? retry : src, srcSet: this.state.retried ? undefined : srcSet, alt: alt, ref: el => { this.element = el; }, onError: this.onError });
    }
}
exports.ResilientImage = ResilientImage;

},
"src/components/RoomDiagram":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomDiagram = RoomDiagram;
const react_1 = require("react");
function RoomDiagram({ fit: f }) { const maxW = Math.max(f.roomWidth, f.footprintWidth), maxD = Math.max(f.roomDepth, f.footprintDepth), scale = Math.min(330 / maxW, 210 / maxD), rw = f.roomWidth * scale, rd = f.roomDepth * scale, dw = f.footprintWidth * scale, dd = f.footprintDepth * scale; return (0, react_1.createElement)("figure", { className: "v20-room-diagram" },
    (0, react_1.createElement)("svg", { role: "img", "aria-label": "Odan\u0131n ve se\u00E7ili masa d\u00FCzeninin ortalanm\u0131\u015F d\u0131\u015F s\u0131n\u0131rlar\u0131", viewBox: "0 0 420 300" },
        (0, react_1.createElement)("rect", { x: (420 - rw) / 2, y: (272 - rd) / 2, width: rw, height: rd, fill: "#efe7d9", stroke: "#8d7b66", strokeWidth: "1.5" }),
        (0, react_1.createElement)("rect", { x: (420 - dw) / 2, y: (272 - dd) / 2, width: dw, height: dd, fill: f.fits ? '#987650' : '#a76e5b', fillOpacity: ".32", stroke: f.fits ? '#6a4a2d' : '#9c4431', strokeDasharray: "5 3" }),
        (0, react_1.createElement)("text", { x: "210", y: "136", textAnchor: "middle", fill: "#493420", fontSize: "13" }, "MASA D\u00DCZEN\u0130N\u0130N DI\u015E SINIRI"),
        (0, react_1.createElement)("text", { x: "210", y: "157", textAnchor: "middle", fill: "#493420", fontSize: "12" },
            f.footprintWidth,
            " \u00D7 ",
            f.footprintDepth,
            " cm"),
        (0, react_1.createElement)("text", { x: "210", y: "291", textAnchor: "middle", fill: "#79644c", fontSize: "12" },
            "ODA. ",
            f.roomWidth,
            " \u00D7 ",
            f.roomDepth,
            " cm")),
    (0, react_1.createElement)("figcaption", null, "Ortalanm\u0131\u015F dikd\u00F6rtgen s\u0131n\u0131r kar\u015F\u0131la\u015Ft\u0131rmas\u0131. Ger\u00E7ek masa konturu veya hareketin tarad\u0131\u011F\u0131 alan de\u011Fildir.")); }

},
"src/components/ServiceGuide":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceGuide = ServiceGuide;
exports.PreparationHint = PreparationHint;
const react_1 = require("react");
const service_content_1 = require("../lib/service-content");
const portfolio_1 = require("../lib/portfolio");
const ui_1 = require("./ui");
const PortfolioUI_1 = require("./PortfolioUI");
function ServiceGuide({ category, navigate }) {
    const x = service_content_1.serviceContent[category];
    if (!x)
        return null;
    const project = x.project ? portfolio_1.works.find(p => p.id === x.project) : undefined;
    const concept = x.concept ? portfolio_1.concepts.find(c => c.id === x.concept) : undefined;
    const photo = project ? (0, portfolio_1.workPhotoEvidence)(project) : undefined;
    return (0, react_1.createElement)("section", { className: "wrap seo-service-guide", "aria-label": "\u00D6zel \u00FCretim karar rehberi" },
        (0, react_1.createElement)("header", null,
            (0, react_1.createElement)(ui_1.Eyebrow, null, "ALANINIZA G\u00D6RE D\u00DC\u015E\u00DCNEL\u0130M"),
            (0, react_1.createElement)("h2", null, x.title),
            (0, react_1.createElement)("p", null, x.intro)),
        (0, react_1.createElement)("div", { className: 'seo-decisions' + (x.sections.length === 3 ? ' three' : '') }, x.sections.map(([title, text], i) => (0, react_1.createElement)("article", { key: title },
            (0, react_1.createElement)("span", { className: "eyebrow" },
                "0",
                i + 1),
            (0, react_1.createElement)("h3", null, title),
            (0, react_1.createElement)("p", null, text)))),
        project && photo && (0, react_1.createElement)("div", { className: "seo-real-example" },
            (0, react_1.createElement)("div", null,
                (0, react_1.createElement)(PortfolioUI_1.VImage, { asset: photo.image, alt: project.subtitle + '. ' + photo.caption, sizes: "(max-width: 800px) 90vw, 40vw" }),
                (0, react_1.createElement)(PortfolioUI_1.SourceTag, { kind: photo.kind })),
            (0, react_1.createElement)("div", null,
                (0, react_1.createElement)(ui_1.Eyebrow, null, "KEND\u0130 AR\u015E\u0130V\u0130M\u0130ZDEN"),
                (0, react_1.createElement)("h3", null, project.subtitle),
                (0, react_1.createElement)("p", null, project.description),
                (0, react_1.createElement)(ui_1.TextLink, { to: '/proje/' + project.id, navigate: navigate }, "Ger\u00E7ek \u00E7al\u0131\u015Fmay\u0131 incele"),
                (0, react_1.createElement)("p", { className: "field-hint" }, "Foto\u011Frafta g\u00F6r\u00FCnen d\u00FCzeni anlat\u0131yoruz. M\u00FC\u015Fteri hik\u00E2yesi, kesin \u00F6l\u00E7\u00FC ve teknik malzeme kayd\u0131 de\u011Fildir."))),
        concept && (0, react_1.createElement)("div", { className: "seo-real-example seo-concept-example" },
            (0, react_1.createElement)("div", null,
                (0, react_1.createElement)(PortfolioUI_1.VImage, { asset: concept.image, alt: concept.subtitle + '. Konsept model, tamamlanmış iş değildir.', sizes: "(max-width: 800px) 90vw, 40vw" }),
                (0, react_1.createElement)(PortfolioUI_1.SourceTag, { kind: "concept" })),
            (0, react_1.createElement)("div", null,
                (0, react_1.createElement)(ui_1.Eyebrow, null, "KONSEPTTEN B\u0130R F\u0130K\u0130R"),
                (0, react_1.createElement)("h3", null, concept.subtitle),
                (0, react_1.createElement)("p", null, "Birlikte ve ayr\u0131 kullan\u0131m d\u00FC\u015F\u00FCncesini bu temsili g\u00F6rselden ba\u015Flayarak konu\u015Fabiliriz. Bu, at\u00F6lyenin tamamlad\u0131\u011F\u0131 bir proje de\u011Fildir."),
                (0, react_1.createElement)(ui_1.TextLink, { to: '/ilham-modelleri?hedef=' + encodeURIComponent('concept:' + concept.id), navigate: navigate }, "Bu fikri incele"))),
        (0, react_1.createElement)("div", { className: "seo-preparation" },
            (0, react_1.createElement)("h3", null, "G\u00F6r\u00FC\u015Fme \u00F6ncesi k\u00FC\u00E7\u00FCk bir haz\u0131rl\u0131k."),
            (0, react_1.createElement)("ul", null, x.preparation.map(v => (0, react_1.createElement)("li", { key: v }, v))),
            (0, react_1.createElement)("p", null, "Hepsini haz\u0131rlaman\u0131z gerekmiyor. Bildiklerinizle ba\u015Flayabilirsiniz."),
            (0, react_1.createElement)(ui_1.ButtonLink, { to: '/modelini-getir?kategori=' + category, navigate: navigate }, "Bu bilgilerle fikrimi haz\u0131rlayay\u0131m"),
            (0, react_1.createElement)("p", { className: "field-hint" }, x.note),
            (0, react_1.createElement)("div", { className: "seo-guide-links" },
                (0, react_1.createElement)(ui_1.TextLink, { to: "/rehber/olcu-alma", navigate: navigate }, "\u00D6l\u00E7\u00FC haz\u0131rl\u0131\u011F\u0131"),
                (0, react_1.createElement)(ui_1.TextLink, { to: "/rehber/malzeme-secimi", navigate: navigate }, "Malzeme karar\u0131"),
                (0, react_1.createElement)(ui_1.TextLink, { to: "/hizmet-ve-teklif", navigate: navigate }, "Teklif kapsam\u0131"))));
}
function PreparationHint({ category }) { const x = service_content_1.serviceContent[category]; return x ? (0, react_1.createElement)("details", { className: "seo-form-hint" },
    (0, react_1.createElement)("summary", null, "Bu \u00FCr\u00FCn i\u00E7in hangi bilgiyi payla\u015Fabilirim?"),
    (0, react_1.createElement)("ul", null, x.preparation.map(v => (0, react_1.createElement)("li", { key: v }, v))),
    (0, react_1.createElement)("p", null, "Bu bir zorunlu alan listesi de\u011Fil. \u0130sterseniz a\u00E7\u0131klama notunuza ekleyin. \u00DCretim \u00F6l\u00E7\u00FCs\u00FC ayr\u0131ca teyit edilir.")) : null; }

},
"src/components/StudioGuide":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudioGuide = StudioGuide;
const react_1 = require("react");
const ui_1 = require("./ui");
const studio_presets_1 = require("../lib/studio-presets");
function StudioGuide({ navigate }) {
    return (0, react_1.createElement)("div", { className: "studio-guide" },
        (0, react_1.createElement)("section", { id: "studio-baslangic", className: "wrap studio-starts" },
            (0, react_1.createElement)("div", { className: "studio-section-heading" },
                (0, react_1.createElement)("div", null,
                    (0, react_1.createElement)(ui_1.Eyebrow, null, "3D ST\u00DCDYO / BA\u015ELANGI\u00C7 MODELLER\u0130"),
                    (0, react_1.createElement)("h2", null,
                        "Bir d\u00FCzen se\u00E7in.",
                        (0, react_1.createElement)("br", null),
                        (0, react_1.createElement)("em", null, "Kendinize g\u00F6re de\u011Fi\u015Ftirin."))),
                (0, react_1.createElement)("p", null, "\u00DC\u00E7 farkl\u0131 \u00F6l\u00E7\u00FC ve y\u00FCzey. Se\u00E7ti\u011Finiz model, yukar\u0131daki ayn\u0131 st\u00FCdyoda a\u00E7\u0131l\u0131r. Sonra eni, y\u00FCksekli\u011Fi ve yan y\u00FCzeyin a\u00E7\u0131s\u0131n\u0131 de\u011Fi\u015Ftirebilirsiniz.")),
            (0, react_1.createElement)("div", { className: "studio-preset-grid" }, studio_presets_1.studioPresets.map((p, i) => (0, react_1.createElement)(ui_1.Link, { key: p.id, to: (0, studio_presets_1.presetHref)(p), navigate: navigate, className: "studio-preset", "data-preset": p.id },
                (0, react_1.createElement)("div", { className: "studio-preset-top" },
                    (0, react_1.createElement)("span", null,
                        "0",
                        i + 1),
                    (0, react_1.createElement)("span", null, "Konsept model")),
                (0, react_1.createElement)(ui_1.Photo, { name: p.image, alt: p.title + '. ' + p.finish + '. ' + p.width + ' × ' + p.depth + ' × ' + p.height + ' cm başlangıç düzeni.', ratio: "3/2", caption: false, eager: true }),
                (0, react_1.createElement)("div", { className: "studio-preset-copy" },
                    (0, react_1.createElement)("h3", null, p.title),
                    (0, react_1.createElement)("p", null, p.subtitle),
                    (0, react_1.createElement)("dl", null,
                        (0, react_1.createElement)("div", null,
                            (0, react_1.createElement)("dt", null, "G\u00F6r\u00FCn\u00FCm"),
                            (0, react_1.createElement)("dd", null, p.finish)),
                        (0, react_1.createElement)("div", null,
                            (0, react_1.createElement)("dt", null, "En \u00D7 derinlik \u00D7 y\u00FCkseklik"),
                            (0, react_1.createElement)("dd", null,
                                p.width,
                                " \u00D7 ",
                                p.depth,
                                " \u00D7 ",
                                p.height,
                                " cm"))),
                    (0, react_1.createElement)("span", { className: "text-link" },
                        "Bu modeli st\u00FCdyoda a\u00E7 ",
                        (0, react_1.createElement)(ui_1.Icon, { size: 18 })))))),
            (0, react_1.createElement)("p", { className: "studio-caption" }, "G\u00F6rseller st\u00FCdyodaki ger\u00E7ek Three.js modelinden al\u0131nm\u0131\u015Ft\u0131r. \u00D6l\u00E7\u00FCler de\u011Fi\u015Ftirilebilir g\u00F6rsel ba\u015Flang\u0131\u00E7lard\u0131r, onaylanm\u0131\u015F \u00FCretim \u00F6l\u00E7\u00FCs\u00FC de\u011Fildir.")),
        (0, react_1.createElement)("section", { id: "studio-yaklasim", className: "wrap studio-behavior" },
            (0, react_1.createElement)("div", { className: "studio-section-heading" },
                (0, react_1.createElement)("div", null,
                    (0, react_1.createElement)(ui_1.Eyebrow, null, "MASANIN HAREKETLER\u0130"),
                    (0, react_1.createElement)("h2", null,
                        "G\u00FCndelik kullan\u0131m,",
                        (0, react_1.createElement)("br", null),
                        (0, react_1.createElement)("em", null, "ayr\u0131nt\u0131y\u0131 belirler."))),
                (0, react_1.createElement)("p", null, "Sahnedeki bilgi d\u00FC\u011Fmesinden detay noktalar\u0131n\u0131 a\u00E7\u0131n. Y\u00FCkseklik kumandas\u0131, \u00E7ekmeceler, yan y\u00FCzey ve alt g\u00F6vdeyi yerinde inceleyin.")),
            (0, react_1.createElement)("div", { className: "studio-explain-grid" }, [['Yükselir.', 'Ana yüzey ile üst çekmeceler birlikte hareket eder. Oturarak ve ayakta çalışma fikrini aynı model üzerinde değerlendirin.'], ['Döner.', 'Yan yüzeyin açısını değiştirerek toplu, L biçiminde veya açık bir yerleşim deneyin. Gerçek dönüş mesafesi ve durdurucular prototipte doğrulanır.'], ['Saklar.', 'Üst çekmece grubu, alt çekmece ve kapaklı gövde ayrı depolama alanlarıdır. İç düzeni kullanacağınız eşyalara göre konuşabiliriz.']].map(([title, body], i) => (0, react_1.createElement)("article", { key: title },
                (0, react_1.createElement)("span", null,
                    "0",
                    i + 1),
                (0, react_1.createElement)("h3", null, title),
                (0, react_1.createElement)("p", null, body))))),
        (0, react_1.createElement)("section", { id: "studio-detay", className: "wrap studio-details" },
            (0, react_1.createElement)("div", { className: "studio-detail-media" },
                (0, react_1.createElement)(ui_1.Photo, { name: "devir-detay-v23.webp", alt: "St\u00FCdyodaki konsept masan\u0131n a\u00E7\u0131k \u00E7ekmeceleri ve alt depolama b\u00F6l\u00FCm\u00FC", ratio: "3/2", eager: true }),
                (0, react_1.createElement)("span", { className: "studio-caption" }, "Konsept modelin depolama ayr\u0131nt\u0131s\u0131.")),
            (0, react_1.createElement)("div", { className: "studio-detail-copy" },
                (0, react_1.createElement)(ui_1.Eyebrow, null, "MALZEME VE \u0130\u015E\u00C7\u0130L\u0130K KARARLARI"),
                (0, react_1.createElement)("h2", null,
                    "Ekrandan sonra,",
                    (0, react_1.createElement)("br", null),
                    (0, react_1.createElement)("em", null, "numune ve \u00F6l\u00E7\u00FC.")),
                (0, react_1.createElement)("details", { open: true },
                    (0, react_1.createElement)("summary", null, "Y\u00FCzeyin ger\u00E7ek kar\u015F\u0131l\u0131\u011F\u0131"),
                    (0, react_1.createElement)("p", null, "Me\u015Fe, ceviz ve koyu ah\u015Fap se\u00E7enekleri ekrandaki g\u00F6r\u00FCn\u00FCm\u00FC anlat\u0131r. Masif, kaplama, g\u00F6vde malzemesi ve son kat uygulamas\u0131 ger\u00E7ek numune \u00FCzerinden ayr\u0131ca belirlenir. Ekrandaki renk, numune taahh\u00FCd\u00FC de\u011Fildir.")),
                (0, react_1.createElement)("details", null,
                    (0, react_1.createElement)("summary", null, "\u00C7ekmece, ray ve mekanizma"),
                    (0, react_1.createElement)("p", null, "\u00C7ekmecenin i\u00E7 \u00F6l\u00E7\u00FCs\u00FC, ray sistemi, motor, ta\u015F\u0131ma kapasitesi ve elektrik g\u00FCvenli\u011Fi \u00FCretim tasar\u0131m\u0131n\u0131n konusudur. St\u00FCdyo bu ba\u015Fl\u0131klar\u0131 konu\u015Fmak i\u00E7in g\u00F6rsel bir ara\u00E7t\u0131r.")),
                (0, react_1.createElement)("details", null,
                    (0, react_1.createElement)("summary", null, "Kablo ve priz plan\u0131"),
                    (0, react_1.createElement)("p", null, "Kullanaca\u011F\u0131n\u0131z ekran, bilgisayar ve di\u011Fer ekipmanlar\u0131 belirtin. Kablo ge\u00E7i\u015Fi ve priz konumu ger\u00E7ek projede \u00E7al\u0131\u015Fma alan\u0131n\u0131za g\u00F6re planlan\u0131r. Mevcut modelde onaylanm\u0131\u015F bir kablo mekanizmas\u0131 g\u00F6sterilmez.")),
                (0, react_1.createElement)(ui_1.Link, { to: "/modelini-getir", navigate: navigate, className: "text-link" },
                    "Kendi ayr\u0131nt\u0131n\u0131z\u0131 da payla\u015F\u0131n ",
                    (0, react_1.createElement)(ui_1.Icon, null)))),
        (0, react_1.createElement)("section", { className: "wrap studio-room-note" },
            (0, react_1.createElement)(ui_1.Photo, { name: "devir-atolye-v23.webp", alt: "\u0130ki kitapl\u0131k ve masa ile olu\u015Fturulmu\u015F \u00FC\u00E7 boyutlu \u00E7al\u0131\u015Fma odas\u0131 konsepti", ratio: "3/2", eager: true }),
            (0, react_1.createElement)("div", null,
                (0, react_1.createElement)(ui_1.Eyebrow, null, "AYNI ST\u00DCDYODA MEK\u00C2NI DA D\u00DC\u015E\u00DCN\u00DCN"),
                (0, react_1.createElement)("h2", null,
                    "\u0130ki yanda raflar.",
                    (0, react_1.createElement)("br", null),
                    (0, react_1.createElement)("em", null, "Ortada sizin d\u00FCzeniniz.")),
                (0, react_1.createElement)("p", null, "Mek\u00E2n sekmesinden kitapl\u0131klar\u0131 ve raf ayd\u0131nlatmas\u0131n\u0131 de\u011Fi\u015Ftirin. \u00DCstten g\u00F6r\u00FCn\u00FCm ve oda \u00F6l\u00E7\u00FCs\u00FC arac\u0131yla yerle\u015Fimi de\u011Ferlendirin."),
                (0, react_1.createElement)("p", null, "Kitapl\u0131k, koltuk ve aksesuarlar ortam\u0131 anlat\u0131r. Masa teklifine otomatik olarak dahil de\u011Fildir. Odamda g\u00F6r ve model indirme se\u00E7enekleri sahnenin payla\u015F\u0131m ara\u00E7lar\u0131nda bulunur."),
                (0, react_1.createElement)("a", { href: "#studio-deneyimi", className: "text-link", onClick: e => { e.preventDefault(); document.getElementById('studio-deneyimi')?.scrollIntoView({ behavior: 'auto' }); } },
                    "3D deneyimine d\u00F6n ",
                    (0, react_1.createElement)(ui_1.Icon, null)))));
}

},
"src/components/TextCopy":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextCopy = void 0;
const react_1 = require("react");
const ui_1 = require("./ui");
class TextCopy extends react_1.Component {
    constructor() {
        super(...arguments);
        this.state = { manual: false, status: '', busy: false };
        this.alive = true;
        this.copy = async () => { const text = this.props.text; this.setState({ busy: true, status: '' }); try {
            if (!navigator.clipboard?.writeText)
                throw Error('unavailable');
            await navigator.clipboard.writeText(text);
            if (this.alive && text === this.props.text)
                this.setState({ busy: false, manual: false, status: 'Kopyalandı. Seçtiğiniz görüşmeye kendiniz yapıştırabilirsiniz.' });
        }
        catch {
            if (this.alive && text === this.props.text)
                this.setState({ busy: false, manual: true, status: 'Panoya erişilemedi. Aşağıdaki metni seçip kendiniz kopyalayın veya özet dosyasını indirin.' }, () => { const input = document.getElementById(this.props.id); input?.focus({ preventScroll: true }); input?.select(); });
        } };
    }
    componentWillUnmount() { this.alive = false; }
    componentDidUpdate(previous) { if (previous.text !== this.props.text && (this.state.manual || this.state.status || this.state.busy))
        this.setState({ manual: false, status: '', busy: false }); }
    render() { return (0, react_1.createElement)("div", { className: "v22-copy" },
        (0, react_1.createElement)("button", { type: "button", className: "text-link", disabled: this.state.busy, onClick: this.copy },
            this.props.label || 'Tam özeti kopyala',
            " ",
            (0, react_1.createElement)(ui_1.Icon, { name: "copy", size: 17 })),
        this.state.status && (0, react_1.createElement)("p", { className: "v22-copy-status", role: "status" }, this.state.status),
        this.state.manual && (0, react_1.createElement)("div", { className: "v22-manual-copy" },
            (0, react_1.createElement)("label", { htmlFor: this.props.id }, "Elle kopyalanacak metin"),
            (0, react_1.createElement)("textarea", { id: this.props.id, readOnly: true, rows: 6, value: this.props.text }))); }
}
exports.TextCopy = TextCopy;

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
const ResilientImage_1 = require("./ResilientImage");
function image(name) {
    const w = typeof window !== 'undefined' ? window : null;
    if (w?.__ELIF_ASSETS__?.[name])
        return w.__ELIF_ASSETS__[name];
    const base = (w?.__ELIF_BASE__ ?? (typeof document !== 'undefined' ? document.documentElement.dataset.base : '') ?? '').replace(/\/$/, '');
    const alias = { 'office.webp': 'office-v8.webp', 'joinery.webp': 'joinery-v8.webp' };
    return base + '/assets/' + (alias[name] || name);
}
function Icon({ name = 'arrow', size = 20 }) {
    const paths = { copy: (0, react_1.createElement)(react_1.Fragment, null,
            (0, react_1.createElement)("rect", { x: "8", y: "8", width: "12", height: "13", rx: "1" }),
            (0, react_1.createElement)("path", { d: "M15 8V3H3v13h5" })), phone: (0, react_1.createElement)("path", { d: "M5 3h4l2 5-3 2a15 15 0 0 0 6 6l2-3 5 2v4c-10 5-22-7-16-16Z" }), arrow: (0, react_1.createElement)(react_1.Fragment, null,
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
    (0, react_1.createElement)(ResilientImage_1.ResilientImage, { src: image(name), alt: alt, loading: eager ? 'eager' : 'lazy', decoding: "async", fetchPriority: eager ? 'high' : 'auto' }),
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
"src/lib/beds":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bedById = exports.beds = void 0;
exports.beds = [
    { id: 'ceviz-yalin', title: 'Ceviz Yalın', subtitle: 'Ceviz Yalın ahşap ağırlıklı baza konsepti', category: 'baza-yatak', image: 'bed-ceviz-yalin-closed', openImage: 'bed-ceviz-yalin-open', group: 'wood', material: 'Ceviz görünümü ve krem başlık', description: 'Ahşap dokusunu geniş yan yüzeyler ve sade bir ön panel boyunca devam ettiren sakin bir çizgi.', details: ['Ahşap görünümlü ön ve yan yüzeyler', 'Dikey kanallı, döşemeli başlık', 'İki bölümlü depolama fikri'] },
    { id: 'mese-cizgi', title: 'Meşe Çizgi', subtitle: 'Meşe Çizgi ahşap ağırlıklı baza konsepti', category: 'baza-yatak', image: 'bed-mese-cizgi-closed', openImage: 'bed-mese-cizgi-open', group: 'wood', material: 'Açık meşe görünümü ve bej başlık', description: 'Açık ahşap tonu, başlığın iki yanında ince çizgilerle tamamlanır. Daha aydınlık bir yatak odası için.', details: ['Açık ahşap görünümlü gövde', 'Başlık kenarlarında çizgili ahşap detay', 'Yumuşatılmış köşe hatları'] },
    { id: 'ceviz-cerceve', title: 'Ceviz Çerçeve', subtitle: 'Ceviz Çerçeve ahşap detaylı baza konsepti', category: 'baza-yatak', image: 'bed-ceviz-cerceve-closed', openImage: 'bed-ceviz-cerceve-open', group: 'wood', material: 'Ceviz çerçeve ve bej döşeme', description: 'Başlıktan ayaklara uzanan ahşap çerçeve, döşemeli yüzeyleri tek bir tasarım diliyle birleştirir.', details: ['Başlığı çevreleyen ahşap hat', 'Döşemeli ön ve yan paneller', 'İnce alt kayıt ve ayak birleşimi'] },
    { id: 'ceviz-kusak', title: 'Ceviz Kuşak', subtitle: 'Ceviz Kuşak ahşap kuşaklı baza konsepti', category: 'baza-yatak', image: 'bed-ceviz-kusak-closed', openImage: 'bed-ceviz-kusak-open', group: 'wood', material: 'Geniş ceviz kuşak ve kum döşeme', description: 'Alt gövdedeki belirgin ahşap kuşak, kumaşın yumuşak dokusuyla dengelenir. Yuvarlatılmış köşelerle tamamlanır.', details: ['Geniş alt ahşap kuşak', 'Yuvarlatılmış ahşap köşe detayları', 'Kanallı ve çerçeveli başlık'] },
    { id: 'keten-ceviz', title: 'Keten ve Ceviz', subtitle: 'Keten ve Ceviz döşemeli baza konsepti', category: 'baza-yatak', image: 'bed-keten-ceviz-closed', openImage: 'bed-keten-ceviz-open', group: 'upholstered', material: 'Krem döşeme ve ince ceviz detay', description: 'Döşemenin öne çıktığı, ahşabın ise başlık kenarında ve alt çerçevede ince bir eşlikçi olduğu yorum.', details: ['Açık renk, dokulu döşeme', 'İnce ahşap kenar ve ayaklar', 'Dikey başlık kanalları'] },
    { id: 'yumusak-bukle', title: 'Yumuşak Bukle', subtitle: 'Yumuşak Bukle yuvarlatılmış baza konsepti', category: 'baza-yatak', image: 'bed-yumusak-bukle-closed', openImage: 'bed-yumusak-bukle-open', group: 'upholstered', material: 'Açık bukle görünümü', description: 'Yuvarlatılmış kenarlar ve başlıktan gövdeye uzanan dokulu yüzey. Daha yumuşak bir oda atmosferi için.', details: ['Bukle görünümlü döşeme', 'Alçak ayaklı gövde yorumu', 'Yumuşak köşeli başlık'] },
    { id: 'antrasit-hat', title: 'Antrasit Hat', subtitle: 'Antrasit Hat döşemeli baza konsepti', category: 'baza-yatak', image: 'bed-antrasit-hat-closed', openImage: 'bed-antrasit-hat-open', group: 'upholstered', material: 'Antrasit döşeme ve ahşap ayak', description: 'Koyu döşeme, yalın bir başlık ve ahşap ayaklarla birleşir. Odada daha belirgin bir odak isteyenlere.', details: ['Antrasit dokulu yüzeyler', 'Yalın, dikey bölümlü başlık', 'Görünür ahşap ayaklar'] },
    { id: 'kum-dokusu', title: 'Kum Dokusu', subtitle: 'Kum Dokusu döşemeli baza konsepti', category: 'baza-yatak', image: 'bed-kum-dokusu-closed', openImage: 'bed-kum-dokusu-open', group: 'upholstered', material: 'Kum rengi döşeme ve açık ahşap ayak', description: 'Sıcak nötr tonlar ve düzenli başlık kanallarıyla, farklı oda renklerine eşlik eden sade bir seçenek.', details: ['Kum rengi dokulu döşeme', 'Hafif yan kanatlı başlık', 'Açık ahşap görünümlü ayaklar'] }
];
const bedById = (id) => exports.beds.find(b => b.id === id);
exports.bedById = bedById;

},
"src/lib/contact-options":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.smsUrl = void 0;
exports.emailDraft = emailDraft;
const project_1 = require("./project");
const site_profile_1 = require("./site-profile");
const smsUrl = () => 'sms:' + project_1.business.telephone;
exports.smsUrl = smsUrl;
function emailDraft(text, recipient = (0, site_profile_1.getSiteProfile)().email || '') {
    if (recipient && !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/.test(recipient))
        throw Error('Doğrulanmış tek bir e-posta adresi gerekli.');
    const subject = 'Elif Tasarım. Proje görüşmesi', prefix = 'mailto:' + recipient + '?subject=' + encodeURIComponent(subject) + '&body=';
    const needsAttachment = (prefix + encodeURIComponent(text)).length > 5000;
    const sentText = needsAttachment ? 'Elif Tasarım için ayrıntılı proje özeti hazırladım. Tam özeti ve varsa görselleri bu e-postaya ayrıca ekleyeceğim.' : text;
    return { recipient, href: prefix + encodeURIComponent(sentText), needsAttachment, fullText: text, sentText };
}

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
    ['Kesin ölçüm yok. Yine de görüşebilir miyiz?', 'Bir fotoğraf, bir model bağlantısı veya birkaç cümleyle başlayabilirsiniz. İlk görüşme için imalat ölçüsü zorunlu değildir. Son ölçü, malzeme ve çizim üretim öncesinde ayrıca netleşir.'],
    ['Gerçek işler ile konseptleri nasıl ayırt ederim?', 'Atölye arşivi, uygulama aşaması, konsept model ve Pinterest referansı ayrı etiketlerle sunulur. Konsept model tamamlanmış müşteri işi değildir. Arşivde bir örneğin bulunması, aynı ürünün stokta olduğu anlamına gelmez.'],
    ['Fiyatı ve bütçeyi hangi kararlar değiştirir?', 'Ölçü, gövde ve kapak yapısı, yüzey, ray ve menteşe gibi donanımlar, nakliye ve montaj koşulları bütçeyi birlikte etkiler. Önceliklerinizi paylaşabilirsiniz. Doğrulanmış fiyat listesi bulunmadığı için başlangıç tutarı gösterilmez. Hizmet ve teklif rehberi, karşılaştıracağınız kalemleri açıklar.'],
    ['İstanbul’un hangi ilçelerine hizmet veriliyor?', 'Atölye İstanbul’dadır. İlçenizi ve işin türünü ilk mesajda paylaşın. Keşif, teslim, nakliye ve montaj uygunluğu görüşmede teyit edilir. Her ilçeye aynı kapsamda veya şehir dışına koşulsuz hizmet sözü verilmez.'],
    ['Keşif ücretsiz mi, atölyeyi ziyaret edebilir miyim?', 'Yerinde inceleme gerekip gerekmediği, kapsamı ve varsa ücreti önceden konuşulmalıdır. Yeni atölye adresi ve ziyaret saatleri henüz kesinleşmediği için yola çıkmadan önce telefonla teyit edin. Bu sitede ücretsiz keşif veya sabit çalışma saati vaadi yoktur.'],
    ['Üretim ve teslim süresi ne zaman netleşir?', 'Tasarım, malzeme ve donanım seçimi, atölye planı ve mekâna erişim değerlendirildikten sonra takvim görüşülür. Taslak çalışma ile onaylı üretim planı farklı aşamalardır. Otomatik veya sabit bir teslim süresi gösterilmez.'],
    ['Nakliye ve montaj fiyata dahil mi?', 'Teklifte üretim, donanım, nakliye, taşıma ve montaj kapsamlarını ayrı sorun. Kat, asansör, erişim ve mevcut mobilyanın sökülmesi gibi ihtiyaçları baştan belirtin. Fotoğraftaki cihazlar, tezgâh, aydınlatma ve dekor kendiliğinden dahil sayılmaz.'],
    ['Kapora, ödeme ve iptal koşulları nasıl belirlenir?', 'Bu önizleme ödeme almaz veya sözleşme kurmaz. Ödeme planı, kapora, değişiklik ve iptal koşullarını üretim onayından önce işletmeden yazılı isteyin. Buradaki açıklamalar özel sözleşme veya yasal haklarınızın yerine geçmez.'],
    ['Garanti, bakım ve teslim sonrası destek nasıl konuşulur?', 'Ürünün gerçek malzemesi, kullanılan donanım ve yüzey işlemi için bakım talimatını ve destek kapsamını yazılı isteyin. Bu sitede doğrulanmamış garanti süresi verilmez. Bir sorun yaşarsanız ürün fotoğrafını ve ilgili proje bilgisini Yunus Usta ile paylaşın.'],
    ['WhatsApp olmadan iletişim kurabilir miyim?', 'Telefonla arayabilir veya SMS uygulamasını açabilirsiniz. Proje özeti TXT veya ZIP olarak hazırlanır. E-posta taslağı atölyenin paylaşılan adresiyle açılır. Adres iletişim sayfasında da görünür. Hiçbiri otomatik gönderim değildir.'],
    ['Taslağıma daha sonra nasıl devam ederim?', 'Varsayılan olarak taslak açık sekmenin belleğindedir. Açıkça seçerseniz metin, model ve ölçüler son kayıttan itibaren yedi gün bu cihazda tutulur. Dönüşte geri yüklemeyi siz seçersiniz. JSON kurtarma dosyası da indirilebilir. Bu iki yöntem fotoğrafları içermez, görselleri yeniden ekleyin.'],
    ['Ne kadar görsel ekleyebilirim?', 'En fazla beş JPG, PNG veya WebP görseli ekleyebilirsiniz. Her kaynak dosya en fazla 10 MB, toplam kaynaklar en fazla 25 MB olmalıdır. Görseller paylaşım için bu cihazda hazırlanır. Özel belgeleri, kişileri ve adres bilgilerini paylaşmadan önce kendiniz kontrol edin.'],
    ['3D masa üretime hazır teknik çizim mi?', 'Hayır. Devir 01 ölçü, yüzey ve yerleşim konuşması için bir konsepttir. GLB ve USDZ dosyaları görsel modeldir. Gerçek motor, dayanım, taşıma kapasitesi ve çarpışmasız hareket atölye ve mekanizma tedarikçisiyle doğrulanmalıdır.'],
    ['Pinterest’teki bir modeli birebir ürettirebilir miyim?', 'Beğendiğiniz modelden başlayabiliriz. Ölçü, kullanım, malzeme, üretilebilirlik ve tasarım hakları birlikte değerlendirilir. Bağlantı paylaşmanız birebir kopya veya kesin üretim taahhüdü oluşturmaz.']
];

},
"src/lib/design-board":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.designBoard = exports.DesignBoard = void 0;
exports.parseWholeNumber = parseWholeNumber;
const desk_v8_1 = require("./desk-v8");
function parseWholeNumber(raw, min, max) { const s = raw.trim(); if (!/^\d+$/.test(s))
    return null; const n = Number(s); return Number.isSafeInteger(n) && n >= min && n <= max ? n : null; }
function verifiedConfig(value) {
    if (!value || typeof value !== 'object' || Array.isArray(value))
        throw Error('Geçerli bir masa seçeneği bekleniyor.');
    const x = value, keys = Object.keys(desk_v8_1.defaultStudio);
    if (Object.keys(x).length !== keys.length || Object.keys(x).some(k => !keys.includes(k)))
        throw Error('Dosyada beklenmeyen ya da eksik alan var.');
    const normalized = (0, desk_v8_1.normalizeStudio)(x);
    if (keys.some(k => x[k] !== normalized[k]))
        throw Error('Masa seçenekleri desteklenen aralığın dışında.');
    return normalized;
}
class DesignBoard {
    constructor() {
        this.entries = [];
        this.serial = 0;
    }
    list() { return this.entries.map(x => ({ ...x, config: { ...x.config } })); }
    add(raw, preview = null) {
        const config = (0, desk_v8_1.normalizeStudio)(raw), key = (0, desk_v8_1.studioQuery)(config), old = this.entries.find(x => (0, desk_v8_1.studioQuery)(x.config) === key);
        const safePreview = preview && /^data:image\/png;base64,[a-zA-Z0-9+/=]+$/.test(preview) && preview.length < 4500000 ? preview : null;
        if (old) {
            if (safePreview)
                old.preview = safePreview;
            return { status: 'duplicate', id: old.id };
        }
        if (this.entries.length >= 3)
            return { status: 'full', id: '' };
        const id = 'devir-' + (++this.serial);
        this.entries.push({ id, config, preview: safePreview });
        return { status: 'added', id };
    }
    remove(id) { this.entries = this.entries.filter(x => x.id !== id); }
    serialize() { return JSON.stringify({ kind: 'elif.design-board', version: 1, options: this.entries.map(x => ({ ...x.config })) }, null, 2); }
    import(text) {
        if (text.length > 16384)
            throw Error('Dosya 16 KB sınırını aşıyor.');
        let parsed;
        try {
            parsed = JSON.parse(text);
        }
        catch {
            throw Error('Dosya okunabilir bir JSON kaydı değil.');
        }
        if (!parsed || parsed.kind !== 'elif.design-board' || parsed.version !== 1 || !Array.isArray(parsed.options) || parsed.options.length < 1 || parsed.options.length > 3)
            throw Error('Bu dosya Elif tasarım karşılaştırması biçiminde değil.');
        const configs = parsed.options.map(verifiedConfig);
        this.entries = [];
        configs.forEach((s) => this.add(s));
        return this.entries.length;
    }
}
exports.DesignBoard = DesignBoard;
exports.designBoard = new DesignBoard();

},
"src/lib/design-sheet":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openDesignSheet = openDesignSheet;
const desk_v8_1 = require("./desk-v8");
const escape = (s) => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
function openDesignSheet(config, preview) {
    const win = window.open('', '_blank');
    if (!win)
        return false;
    const site = (window.__ELIF_SITE_URL__ || 'https://onourimpram.github.io/elif-tasarim').replace(/\/$/, '');
    const link = site + '/tasarim-masasi/?' + (0, desk_v8_1.studioQuery)(config);
    const safeImage = preview && /^data:image\/png;base64,[a-zA-Z0-9+/=]+$/.test(preview) ? preview : null;
    win.document.write('<!doctype html><html lang="tr"><meta charset="utf-8"><meta name="referrer" content="no-referrer"><title>Elif Tasarım. Devir 01 tasarım dosyası</title><style>body{font:15px/1.7 Georgia,serif;color:#352b22;background:#fffaf1;max-width:900px;margin:40px auto;padding:0 25px}header{border-bottom:1px solid #a38a69;display:flex;justify-content:space-between;align-items:center}h1{font-size:42px;margin:26px 0 8px}small{font:11px/1.6 Arial,sans-serif;letter-spacing:.08em}img{width:100%;max-height:430px;object-fit:contain;background:#eee6d8}pre{font:14px/1.8 Arial,sans-serif;white-space:pre-wrap;overflow-wrap:anywhere;padding:20px;background:#f1e9dc}a{color:#745434;overflow-wrap:anywhere}button{padding:14px 22px;border:0;background:#6c5036;color:white;cursor:pointer}footer{border-top:1px solid #c3b39a;margin-top:24px;padding:15px 0;font:12px/1.6 Arial,sans-serif}@media print{body{margin:0;max-width:none;background:white}.no-print{display:none}img{max-height:300px}h1{font-size:30px}pre{font-size:11px;padding:10px}footer{font-size:10px}header{break-after:avoid}}</style><header><strong>ELİF TASARIM</strong><small>DEVİR 01 · KONSEPT DOSYASI</small></header><h1>Sizin çalışma düzeniniz.</h1><p>Seçtiğiniz masa konfigürasyonunun görüşme özeti. Bir üretim onayı veya fiyat teklifi değildir.</p>' + (safeImage ? '<img alt="Seçili üç boyutlu modelin görünümü" src="' + safeImage + '">' : '') + '<pre>' + escape((0, desk_v8_1.studioSummary)(config)) + '</pre><p><a href="' + escape(link) + '">Aynı tasarımı 3D stüdyoda açın</a></p><footer>Yunus Usta. +90 530 879 71 69.<br>Kitaplıklar, sandalye, lamba ve diğer aksesuarlar masa kapsamına dahil değildir. Son ölçü, malzeme ve mekanizma ayrıca netleştirilir. Bu sayfa herhangi bir kişiye otomatik gönderilmedi.</footer><button class="no-print" id="print">Yazdır veya PDF olarak kaydet</button><p class="no-print">Tarayıcınızın yazdırma menüsünden PDF olarak kaydedebilirsiniz.</p></html>');
    win.document.close();
    win.document.getElementById('print')?.addEventListener('click', () => win.print());
    win.opener = null;
    return true;
}

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
exports.studioRequestMaterial = studioRequestMaterial;
exports.defaultStudio = { width: 180, depth: 80, height: 80, angle: 90, material: 'ceviz', drawers: false, door: false, shelves: 'both', room: 'atelier', shelfLight: 65, lighting: 'day' };
exports.studioMaterials = { ceviz: { name: 'Ceviz tonu', color: '#765039' }, mese: { name: 'Açık meşe tonu', color: '#b89a6e' }, koyu: { name: 'Koyu ahşap', color: '#37312d' } };
const clamp = (v, min, max, fallback) => typeof v === 'number' && Number.isFinite(v) ? Math.min(max, Math.max(min, Math.round(v))) : fallback;
function normalizeStudio(v) { return { width: clamp(v.width, 120, 220, 180), depth: clamp(v.depth, 65, 95, 80), height: clamp(v.height, 80, 125, 80), angle: clamp(v.angle, 0, 360, 90), material: ['ceviz', 'mese', 'koyu'].includes(v.material || '') ? v.material : 'ceviz', drawers: v.drawers === true, door: v.door === true, shelves: ['both', 'left', 'right', 'none'].includes(v.shelves || '') ? v.shelves : 'both', room: v.room === 'product' ? 'product' : 'atelier', shelfLight: clamp(v.shelfLight, 0, 100, 65), lighting: v.lighting === 'evening' ? 'evening' : 'day' }; }
function studioFromQuery(query) { const p = new URLSearchParams(query), num = (k, min, max, def) => { const raw = p.get(k) || ''; if (!/^\d+(?:[.,]\d+)?$/.test(raw))
    return def; const n = Number(raw.replace(',', '.')); return n >= min && n <= max ? n : def; }; return normalizeStudio({ width: num('en', 120, 220, 180), depth: num('derinlik', 65, 95, 80), height: num('yukseklik', 80, 125, 80), angle: num('donus', 0, 360, 90), material: p.get('malzeme'), drawers: p.get('cekmece') === '1', door: p.get('kapak') === '1', shelves: p.get('raf'), room: p.get('mekan'), shelfLight: num('rafisigi', 0, 100, 65), lighting: p.get('isik') === 'evening' ? 'evening' : 'day' }); }
function studioQuery(s) { const v = normalizeStudio(s); return new URLSearchParams({ en: String(v.width), derinlik: String(v.depth), yukseklik: String(v.height), donus: String(v.angle), malzeme: v.material, cekmece: v.drawers ? '1' : '0', kapak: v.door ? '1' : '0', raf: v.shelves, mekan: v.room, rafisigi: String(v.shelfLight), isik: v.lighting }).toString(); }
function studioSummary(s) { const v = normalizeStudio(s); return ['ELİF TASARIM / DEVİR 01', 'Konsept model. Üretim çizimi veya onaylanmış ürün şartnamesi değildir.', `Ana tabla ölçü fikri, ${v.width} × ${v.depth} cm`, `Gösterilen çalışma yüksekliği, ${v.height} cm`, `Yan tabla açısı, ${v.angle}°`, `Yüzey fikri, ${exports.studioMaterials[v.material].name}`, `Sunum ışığı, ${v.lighting === 'evening' ? 'akşam' : 'gün ışığı'}. Görsel tercih, elektrik tesisatı taahhüdü değildir.`, `Mekân kitaplığı tercihi, ${{ both: 'çift taraflı', left: 'sol', right: 'sağ', none: 'rafsız' }[v.shelves]}. Kitaplıklar masa ölçüsüne dahil değildir.`, 'Tablanın altında çekmeceler, sabit depolama ünitesi ve bağımsız dönen yan tabla.', 'Mekanizma, yük kapasitesi, güvenli hareket alanı ve son ölçüler Yunus Usta ile ayrıca doğrulanır.', 'Bu özet gönderilmiş sipariş değildir.'].join('\n'); }
function studioRequestMaterial(material) { return { ceviz: 'Ceviz görünümü, yapısını görüşelim', mese: 'Meşe görünümü, yapısını görüşelim', koyu: 'Ahşap / ahşap kaplama görünümü' }[material]; }

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
"src/lib/draft-recovery":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAX_BACKUP_BYTES = exports.BACKUP_TTL_MS = exports.BACKUP_KEY = void 0;
exports.encodeDraft = encodeDraft;
exports.decodeDraft = decodeDraft;
exports.createDraftBackup = createDraftBackup;
const project_1 = require("./project");
const model_request_1 = require("./model-request");
const desk_v8_1 = require("./desk-v8");
const portfolio_1 = require("./portfolio");
exports.BACKUP_KEY = 'elif-v21:project-recovery';
exports.BACKUP_TTL_MS = 7 * 24 * 60 * 60 * 1000;
exports.MAX_BACKUP_BYTES = 96 * 1024;
const limits = { systemPrefill: 2500, customerNote: 1600, studioNotice: 1200, systemDetails: 5000, category: 60, url: 2000, note: 1600, dimensions: 160, district: 100, timing: 160, interpretation: 200, width: 10, depth: 10, height: 10, material: 200, finish: 200, details: 1200, readiness: 200 };
function object(x) { return !!x && typeof x === 'object' && !Array.isArray(x); }
function text(x, max) { if (typeof x !== 'string' || x.length > max || /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(x))
    throw Error('Taslak alanı geçersiz veya çok uzun.'); return x; }
function safeDraft(raw) {
    if (!object(raw))
        throw Error('Proje verisi bulunamadı.');
    const d = (0, project_1.emptyProject)();
    for (const [key, max] of Object.entries(limits)) {
        if (key in raw)
            d[key] = text(raw[key], max);
    }
    if (!portfolio_1.workCategories.some(c => c.id === d.category))
        throw Error('Bilinmeyen proje kategorisi.');
    if (raw.unit !== 'cm' && raw.unit !== 'mm')
        throw Error('Ölçü birimi geçersiz.');
    d.unit = raw.unit;
    if (typeof raw.unknown !== 'boolean')
        throw Error('Ölçü durumu geçersiz.');
    d.unknown = raw.unknown;
    if (d.url && !(0, model_request_1.normalizeReference)(d.url))
        throw Error('Taslakta güvenli olmayan model bağlantısı var.');
    d.url = (0, model_request_1.normalizeReference)(d.url) || '';
    d.customerNote = d.note = d.customerNote || d.note;
    if (raw.sourceRef !== null && raw.sourceRef !== undefined) {
        const x = raw.sourceRef;
        if (!object(x) || !['work', 'concept', 'reference', 'studio', 'idea'].includes(x.kind))
            throw Error('Model kaynağı geçersiz.');
        const url = text(x.url, 2000);
        if (url && !(0, model_request_1.normalizeReference)(url))
            throw Error('Model kaynağı bağlantısı geçersiz.');
        const ref = { id: text(x.id, 150), kind: x.kind, title: text(x.title, 300), url: (0, model_request_1.normalizeReference)(url) || '' };
        if (x.image !== undefined) {
            const image = text(x.image, 120);
            if (!/^[a-z0-9][a-z0-9_-]*(?:\.webp)?$/.test(image))
                throw Error('Model görsel anahtarı geçersiz.');
            ref.image = image;
        }
        d.sourceRef = ref;
    }
    if (raw.studioConfig !== null && raw.studioConfig !== undefined) {
        if (!object(raw.studioConfig))
            throw Error('3D seçenekleri geçersiz.');
        const normalized = (0, desk_v8_1.normalizeStudio)(raw.studioConfig);
        for (const key of Object.keys(normalized)) {
            if (raw.studioConfig[key] !== normalized[key])
                throw Error('3D seçenekleri desteklenen aralığın dışında.');
        }
        d.studioConfig = normalized;
    }
    d.selections = [];
    return d;
}
function encodeDraft(draft, now = Date.now()) { const out = JSON.stringify({ format: 'elif-project-draft', version: 1, savedAt: now, project: safeDraft(draft) }, null, 2); if (new TextEncoder().encode(out).length > exports.MAX_BACKUP_BYTES)
    throw Error('Taslak dosyası fazla büyük.'); return out; }
function decodeDraft(input) { if (typeof input !== 'string' || new TextEncoder().encode(input).length > exports.MAX_BACKUP_BYTES)
    throw Error('En fazla 96 KB taslak dosyası açılabilir.'); let r; try {
    r = JSON.parse(input);
}
catch {
    throw Error('Dosya geçerli JSON değil.');
} if (!object(r) || r.format !== 'elif-project-draft' || r.version !== 1)
    throw Error('Bu dosya Elif proje taslağı biçiminde değil.'); return safeDraft(r.project); }
function createDraftBackup(storage) {
    return {
        save(draft, now = Date.now()) { try {
            if (!storage)
                throw Error('Cihaz depolaması kullanılamıyor.');
            storage.setItem(exports.BACKUP_KEY, JSON.stringify({ savedAt: now, expiresAt: now + exports.BACKUP_TTL_MS, file: encodeDraft(draft, now) }));
            return { ok: true };
        }
        catch {
            return { ok: false, error: 'Cihaz kaydı yapılamadı. Taslağınız açık sekmede duruyor. Taslak dosyasını indirin.' };
        } },
        read(now = Date.now()) { try {
            if (!storage)
                return { kind: 'unavailable' };
            const text = storage.getItem(exports.BACKUP_KEY);
            if (!text)
                return { kind: 'empty' };
            if (text.length > exports.MAX_BACKUP_BYTES * 2)
                return { kind: 'invalid' };
            let r;
            try {
                r = JSON.parse(text);
            }
            catch {
                return { kind: 'invalid' };
            }
            if (!object(r) || !Number.isFinite(r.savedAt) || !Number.isFinite(r.expiresAt) || r.expiresAt - r.savedAt !== exports.BACKUP_TTL_MS || r.savedAt > now + 300000)
                return { kind: 'invalid' };
            if (r.expiresAt <= now) {
                storage.removeItem(exports.BACKUP_KEY);
                return { kind: 'expired' };
            }
            try {
                return { kind: 'ready', draft: decodeDraft(r.file), savedAt: r.savedAt, expiresAt: r.expiresAt };
            }
            catch {
                return { kind: 'invalid' };
            }
        }
        catch {
            return { kind: 'unavailable' };
        } },
        erase() { try {
            if (!storage)
                return false;
            storage.removeItem(exports.BACKUP_KEY);
            return true;
        }
        catch {
            return false;
        } }
    };
}

},
"src/lib/draft-session":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.draftSession = void 0;
const project_1 = require("./project");
const draft_recovery_1 = require("./draft-recovery");
let enabled = false, message = '';
const listeners = new Set();
const notify = () => listeners.forEach(fn => fn());
function disk() { try {
    return (0, draft_recovery_1.createDraftBackup)(typeof window !== 'undefined' ? window.localStorage : null);
}
catch {
    return (0, draft_recovery_1.createDraftBackup)(null);
} }
project_1.projectStore.subscribe(draft => { if (!enabled)
    return; const result = disk().save(draft); if (!result.ok) {
    enabled = false;
    message = result.error || 'Cihaz kaydı yapılamadı.';
}
else
    message = 'Metin, model ve ölçüler bu cihazda kaydedildi. Fotoğraflar dahil değil.'; notify(); });
exports.draftSession = {
    status: () => ({ enabled, message, record: disk().read() }),
    subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); },
    enable() { const r = disk().save(project_1.projectStore.get()); enabled = r.ok; message = r.ok ? 'Yedi günlük cihaz kurtarması açık. Sonraki metin ve ölçü değişiklikleri kaydedilir.' : r.error || 'Kaydedilemedi.'; notify(); return r.ok; },
    disable() { enabled = false; const ok = disk().erase(); message = ok ? 'Cihazdaki kurtarma kaydı silindi. Açık sekmedeki fikriniz korunuyor.' : 'Depolamaya erişilemedi. Tarayıcı site verilerini kullanarak kaydı temizleyin.'; notify(); return ok; },
    restore(draft) { const d = project_1.projectStore.restore(draft); notify(); return d; },
};

},
"src/lib/hero-rotation":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HERO_FADE = exports.HERO_INTERVAL = exports.HERO_FIRST_DELAY = void 0;
exports.decodeHeroFrame = decodeHeroFrame;
exports.HERO_FIRST_DELAY = 2200;
exports.HERO_INTERVAL = 3200;
exports.HERO_FADE = 600;
async function decodeHeroFrame(getImage, timeout = 5000) {
    const until = Date.now() + timeout;
    while (Date.now() < until) {
        const image = getImage();
        if (!image)
            return false;
        if (image.complete && image.naturalWidth > 0) {
            const source = image.currentSrc || image.src;
            let timer;
            try {
                const ready = await Promise.race([Promise.resolve(image.decode()).then(() => true, () => false), new Promise(resolve => { timer = setTimeout(() => resolve(false), Math.max(0, until - Date.now())); })]);
                if (ready && source === (image.currentSrc || image.src) && image.naturalWidth > 0)
                    return true;
            }
            catch { }
            finally {
                if (timer !== undefined)
                    clearTimeout(timer);
            }
        }
        if (Date.now() < until)
            await new Promise(resolve => setTimeout(resolve, Math.min(80, until - Date.now())));
    }
    return false;
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
    },
    "r03": {
        "kind": "process",
        "width": 1080,
        "height": 1440,
        "variants": [
            {
                "file": "r03-full.webp",
                "width": 1080,
                "height": 1440,
                "bytes": 78522
            }
        ],
        "source": "WhatsApp Image 2026-09-22 at 16.07.21 (1).jpeg",
        "sourceSha256": "8dba3be7cd03c892883d946a00ae11b043c88108a0b4dc76f422042de1f480d7",
        "crop": null
    },
    "r11": {
        "kind": "process",
        "width": 1440,
        "height": 1050,
        "variants": [
            {
                "file": "r11-full.webp",
                "width": 1440,
                "height": 1050,
                "bytes": 41202
            }
        ],
        "source": "WhatsApp Image 2026-09-22 at 16.08.29 (3).jpeg",
        "sourceSha256": "7b1e318d0c4570a6eb79e9f53c73688c33a238741eeca28729f29d55a57f5cb5",
        "crop": [
            0,
            0,
            1580,
            1152
        ]
    },
    "r16": {
        "kind": "work",
        "width": 1080,
        "height": 1440,
        "variants": [
            {
                "file": "r16-full.webp",
                "width": 1080,
                "height": 1440,
                "bytes": 331988
            }
        ],
        "source": "WhatsApp Image 2026-09-22 at 16.08.30 (2).jpeg",
        "sourceSha256": "93da45ec05e48cd8adef2fe19a008be4bdc37fab82bf8b298d1fca03f760e57b",
        "crop": null
    },
    "r17": {
        "kind": "work",
        "width": 1080,
        "height": 1440,
        "variants": [
            {
                "file": "r17-full.webp",
                "width": 1080,
                "height": 1440,
                "bytes": 351604
            }
        ],
        "source": "WhatsApp Image 2026-09-22 at 16.08.30 (3).jpeg",
        "sourceSha256": "31056cf0668fc98a485bde3c4e5f29e9fd597e89ca98934893ffea76a1a5fd5c",
        "crop": null
    },
    "r20": {
        "kind": "work",
        "width": 1440,
        "height": 1080,
        "variants": [
            {
                "file": "r20-full.webp",
                "width": 1440,
                "height": 1080,
                "bytes": 272440
            }
        ],
        "source": "WhatsApp Image 2026-09-22 at 16.08.31 (2).jpeg",
        "sourceSha256": "98f712df0cbae63d806f5689ebcaf5d523a0b427c7d2fbff8e5ee1bf2f11e404",
        "crop": null
    },
    "r21": {
        "kind": "work",
        "width": 1055,
        "height": 1217,
        "variants": [
            {
                "file": "r21-full.webp",
                "width": 1055,
                "height": 1217,
                "bytes": 81956
            }
        ],
        "source": "WhatsApp Image 2026-09-22 at 16.08.31 (3).jpeg",
        "sourceSha256": "9405d33bdb2404886b3b03dcd666cd83ada9329397c9a7f4beaec22edb3ecfe8",
        "crop": null
    },
    "r24": {
        "kind": "work",
        "width": 777,
        "height": 810,
        "variants": [
            {
                "file": "r24-full.webp",
                "width": 777,
                "height": 810,
                "bytes": 31426
            }
        ],
        "source": "WhatsApp Image 2026-09-22 at 16.08.32 (1).jpeg",
        "sourceSha256": "0d852236e1db7500f2e57285e19872df577fcb1516cea6a653b63426faf1bc3d",
        "crop": null
    },
    "r25": {
        "kind": "work",
        "width": 812,
        "height": 880,
        "variants": [
            {
                "file": "r25-full.webp",
                "width": 812,
                "height": 880,
                "bytes": 50292
            }
        ],
        "source": "WhatsApp Image 2026-09-22 at 16.08.32 (2).jpeg",
        "sourceSha256": "63f30160f5f9e58ce550b0081f64f969cedaa54c78df3048d65cce1edd59459f",
        "crop": null
    },
    "r26": {
        "kind": "work",
        "width": 662,
        "height": 810,
        "variants": [
            {
                "file": "r26-full.webp",
                "width": 662,
                "height": 810,
                "bytes": 35602
            }
        ],
        "source": "WhatsApp Image 2026-09-22 at 16.08.33.jpeg",
        "sourceSha256": "03d0e5533779d04ebca07d69086a8d344d6212d0583f0dcb5183d223f1159690",
        "crop": null
    },
    "bed-ceviz-yalin-open": {
        "kind": "concept",
        "width": 1122,
        "height": 748,
        "variants": [
            {
                "file": "bed-ceviz-yalin-open-480.webp",
                "width": 480,
                "height": 320,
                "bytes": 14256
            },
            {
                "file": "bed-ceviz-yalin-open-800.webp",
                "width": 800,
                "height": 533,
                "bytes": 31514
            },
            {
                "file": "bed-ceviz-yalin-open-full.webp",
                "width": 1122,
                "height": 748,
                "bytes": 51388
            }
        ],
        "source": "i_kili_kaldırmalı_ceviz_depolama_yatağı.png",
        "sourceSha256": "c31b0d3ab342262ed44d9a4660ee9037b3a02f10e232cc8f5bcb53190727c50f",
        "crop": [
            0,
            0,
            1122,
            724
        ]
    },
    "bed-ceviz-yalin-closed": {
        "kind": "concept",
        "width": 1122,
        "height": 748,
        "variants": [
            {
                "file": "bed-ceviz-yalin-closed-480.webp",
                "width": 480,
                "height": 320,
                "bytes": 7298
            },
            {
                "file": "bed-ceviz-yalin-closed-800.webp",
                "width": 800,
                "height": 533,
                "bytes": 23928
            },
            {
                "file": "bed-ceviz-yalin-closed-full.webp",
                "width": 1122,
                "height": 748,
                "bytes": 51858
            }
        ],
        "source": "i_kili_kaldırmalı_ceviz_depolama_yatağı.png",
        "sourceSha256": "c31b0d3ab342262ed44d9a4660ee9037b3a02f10e232cc8f5bcb53190727c50f",
        "crop": [
            0,
            724,
            1122,
            1402
        ]
    },
    "bed-mese-cizgi-open": {
        "kind": "concept",
        "width": 1122,
        "height": 748,
        "variants": [
            {
                "file": "bed-mese-cizgi-open-480.webp",
                "width": 480,
                "height": 320,
                "bytes": 14280
            },
            {
                "file": "bed-mese-cizgi-open-800.webp",
                "width": 800,
                "height": 533,
                "bytes": 31282
            },
            {
                "file": "bed-mese-cizgi-open-full.webp",
                "width": 1122,
                "height": 748,
                "bytes": 50994
            }
        ],
        "source": "kaldırılabilir_depolama_özellikli_meşe_karyola.png",
        "sourceSha256": "3dd7c15290a65ac4729d734897c4026e4afcc4cbbd00729bf3c3a136fb0e88ce",
        "crop": [
            0,
            0,
            1122,
            724
        ]
    },
    "bed-mese-cizgi-closed": {
        "kind": "concept",
        "width": 1122,
        "height": 748,
        "variants": [
            {
                "file": "bed-mese-cizgi-closed-480.webp",
                "width": 480,
                "height": 320,
                "bytes": 8080
            },
            {
                "file": "bed-mese-cizgi-closed-800.webp",
                "width": 800,
                "height": 533,
                "bytes": 24492
            },
            {
                "file": "bed-mese-cizgi-closed-full.webp",
                "width": 1122,
                "height": 748,
                "bytes": 47680
            }
        ],
        "source": "kaldırılabilir_depolama_özellikli_meşe_karyola.png",
        "sourceSha256": "3dd7c15290a65ac4729d734897c4026e4afcc4cbbd00729bf3c3a136fb0e88ce",
        "crop": [
            0,
            724,
            1122,
            1402
        ]
    },
    "bed-ceviz-cerceve-open": {
        "kind": "concept",
        "width": 1122,
        "height": 748,
        "variants": [
            {
                "file": "bed-ceviz-cerceve-open-480.webp",
                "width": 480,
                "height": 320,
                "bytes": 13860
            },
            {
                "file": "bed-ceviz-cerceve-open-800.webp",
                "width": 800,
                "height": 533,
                "bytes": 31842
            },
            {
                "file": "bed-ceviz-cerceve-open-full.webp",
                "width": 1122,
                "height": 748,
                "bytes": 56090
            }
        ],
        "source": "modern_walnut_storage_bed_views.png",
        "sourceSha256": "ba8af49e5181695974673db22e5e1548289eeeac9aa32014ea01029e05903a29",
        "crop": [
            0,
            0,
            1122,
            724
        ]
    },
    "bed-ceviz-cerceve-closed": {
        "kind": "concept",
        "width": 1122,
        "height": 748,
        "variants": [
            {
                "file": "bed-ceviz-cerceve-closed-480.webp",
                "width": 480,
                "height": 320,
                "bytes": 7504
            },
            {
                "file": "bed-ceviz-cerceve-closed-800.webp",
                "width": 800,
                "height": 533,
                "bytes": 26702
            },
            {
                "file": "bed-ceviz-cerceve-closed-full.webp",
                "width": 1122,
                "height": 748,
                "bytes": 56840
            }
        ],
        "source": "modern_walnut_storage_bed_views.png",
        "sourceSha256": "ba8af49e5181695974673db22e5e1548289eeeac9aa32014ea01029e05903a29",
        "crop": [
            0,
            724,
            1122,
            1402
        ]
    },
    "bed-ceviz-kusak-open": {
        "kind": "concept",
        "width": 1122,
        "height": 748,
        "variants": [
            {
                "file": "bed-ceviz-kusak-open-480.webp",
                "width": 480,
                "height": 320,
                "bytes": 14644
            },
            {
                "file": "bed-ceviz-kusak-open-800.webp",
                "width": 800,
                "height": 533,
                "bytes": 34448
            },
            {
                "file": "bed-ceviz-kusak-open-full.webp",
                "width": 1122,
                "height": 748,
                "bytes": 58794
            }
        ],
        "source": "kaldırmalı_depolamalı_modern_ahşap_yatak.png",
        "sourceSha256": "c92ac02ec1a80c1340b1c8f1d3eaec0fe48455216aa1fb1fe03da707e69ab30f",
        "crop": [
            0,
            0,
            1122,
            724
        ]
    },
    "bed-ceviz-kusak-closed": {
        "kind": "concept",
        "width": 1122,
        "height": 748,
        "variants": [
            {
                "file": "bed-ceviz-kusak-closed-480.webp",
                "width": 480,
                "height": 320,
                "bytes": 8336
            },
            {
                "file": "bed-ceviz-kusak-closed-800.webp",
                "width": 800,
                "height": 533,
                "bytes": 30064
            },
            {
                "file": "bed-ceviz-kusak-closed-full.webp",
                "width": 1122,
                "height": 748,
                "bytes": 66256
            }
        ],
        "source": "kaldırmalı_depolamalı_modern_ahşap_yatak.png",
        "sourceSha256": "c92ac02ec1a80c1340b1c8f1d3eaec0fe48455216aa1fb1fe03da707e69ab30f",
        "crop": [
            0,
            724,
            1122,
            1402
        ]
    },
    "bed-keten-ceviz-open": {
        "kind": "concept",
        "width": 1122,
        "height": 748,
        "variants": [
            {
                "file": "bed-keten-ceviz-open-480.webp",
                "width": 480,
                "height": 320,
                "bytes": 13702
            },
            {
                "file": "bed-keten-ceviz-open-800.webp",
                "width": 800,
                "height": 533,
                "bytes": 29108
            },
            {
                "file": "bed-keten-ceviz-open-full.webp",
                "width": 1122,
                "height": 748,
                "bytes": 50256
            }
        ],
        "source": "bej_depolama_yatağı_i_ki_görünüm.png",
        "sourceSha256": "f46a1da64d43513db90f0eb937daac77747debc8ae89848ab9140dfe9e0990a4",
        "crop": [
            0,
            0,
            1122,
            724
        ]
    },
    "bed-keten-ceviz-closed": {
        "kind": "concept",
        "width": 1122,
        "height": 748,
        "variants": [
            {
                "file": "bed-keten-ceviz-closed-480.webp",
                "width": 480,
                "height": 320,
                "bytes": 6774
            },
            {
                "file": "bed-keten-ceviz-closed-800.webp",
                "width": 800,
                "height": 533,
                "bytes": 20410
            },
            {
                "file": "bed-keten-ceviz-closed-full.webp",
                "width": 1122,
                "height": 748,
                "bytes": 42908
            }
        ],
        "source": "bej_depolama_yatağı_i_ki_görünüm.png",
        "sourceSha256": "f46a1da64d43513db90f0eb937daac77747debc8ae89848ab9140dfe9e0990a4",
        "crop": [
            0,
            724,
            1122,
            1402
        ]
    },
    "bed-yumusak-bukle-open": {
        "kind": "concept",
        "width": 1122,
        "height": 748,
        "variants": [
            {
                "file": "bed-yumusak-bukle-open-480.webp",
                "width": 480,
                "height": 320,
                "bytes": 13870
            },
            {
                "file": "bed-yumusak-bukle-open-800.webp",
                "width": 800,
                "height": 533,
                "bytes": 39312
            },
            {
                "file": "bed-yumusak-bukle-open-full.webp",
                "width": 1122,
                "height": 748,
                "bytes": 75146
            }
        ],
        "source": "modern_greige_lift_up_storage_bed.png",
        "sourceSha256": "3cb40769adeef4409a29628323634de73be520130ecaa63bfaa71f6a31a858c7",
        "crop": [
            0,
            0,
            1122,
            724
        ]
    },
    "bed-yumusak-bukle-closed": {
        "kind": "concept",
        "width": 1122,
        "height": 748,
        "variants": [
            {
                "file": "bed-yumusak-bukle-closed-480.webp",
                "width": 480,
                "height": 320,
                "bytes": 11252
            },
            {
                "file": "bed-yumusak-bukle-closed-800.webp",
                "width": 800,
                "height": 533,
                "bytes": 48912
            },
            {
                "file": "bed-yumusak-bukle-closed-full.webp",
                "width": 1122,
                "height": 748,
                "bytes": 103390
            }
        ],
        "source": "modern_greige_lift_up_storage_bed.png",
        "sourceSha256": "3cb40769adeef4409a29628323634de73be520130ecaa63bfaa71f6a31a858c7",
        "crop": [
            0,
            724,
            1122,
            1402
        ]
    },
    "bed-antrasit-hat-open": {
        "kind": "concept",
        "width": 1122,
        "height": 748,
        "variants": [
            {
                "file": "bed-antrasit-hat-open-480.webp",
                "width": 480,
                "height": 320,
                "bytes": 12680
            },
            {
                "file": "bed-antrasit-hat-open-800.webp",
                "width": 800,
                "height": 533,
                "bytes": 29974
            },
            {
                "file": "bed-antrasit-hat-open-full.webp",
                "width": 1122,
                "height": 748,
                "bytes": 53792
            }
        ],
        "source": "modern_çift_mekanizmalı_depolama_karyolası.png",
        "sourceSha256": "3a52a2a81270f58808f1de9b4633984034649adbcb4332e7a361544c9c22984b",
        "crop": [
            0,
            0,
            1122,
            724
        ]
    },
    "bed-antrasit-hat-closed": {
        "kind": "concept",
        "width": 1122,
        "height": 748,
        "variants": [
            {
                "file": "bed-antrasit-hat-closed-480.webp",
                "width": 480,
                "height": 320,
                "bytes": 7636
            },
            {
                "file": "bed-antrasit-hat-closed-800.webp",
                "width": 800,
                "height": 533,
                "bytes": 26796
            },
            {
                "file": "bed-antrasit-hat-closed-full.webp",
                "width": 1122,
                "height": 748,
                "bytes": 54876
            }
        ],
        "source": "modern_çift_mekanizmalı_depolama_karyolası.png",
        "sourceSha256": "3a52a2a81270f58808f1de9b4633984034649adbcb4332e7a361544c9c22984b",
        "crop": [
            0,
            724,
            1122,
            1402
        ]
    },
    "bed-kum-dokusu-open": {
        "kind": "concept",
        "width": 1122,
        "height": 748,
        "variants": [
            {
                "file": "bed-kum-dokusu-open-480.webp",
                "width": 480,
                "height": 320,
                "bytes": 12970
            },
            {
                "file": "bed-kum-dokusu-open-800.webp",
                "width": 800,
                "height": 533,
                "bytes": 33530
            },
            {
                "file": "bed-kum-dokusu-open-full.webp",
                "width": 1122,
                "height": 748,
                "bytes": 61002
            }
        ],
        "source": "taupe_depolama_yatak_takımı.png",
        "sourceSha256": "849a2c4188889000fff818916adf7a0031dc556732aed9824dfb6bdd1b858ebb",
        "crop": [
            0,
            0,
            1122,
            724
        ]
    },
    "bed-kum-dokusu-closed": {
        "kind": "concept",
        "width": 1122,
        "height": 748,
        "variants": [
            {
                "file": "bed-kum-dokusu-closed-480.webp",
                "width": 480,
                "height": 320,
                "bytes": 7548
            },
            {
                "file": "bed-kum-dokusu-closed-800.webp",
                "width": 800,
                "height": 533,
                "bytes": 30906
            },
            {
                "file": "bed-kum-dokusu-closed-full.webp",
                "width": 1122,
                "height": 748,
                "bytes": 71336
            }
        ],
        "source": "taupe_depolama_yatak_takımı.png",
        "sourceSha256": "849a2c4188889000fff818916adf7a0031dc556732aed9824dfb6bdd1b858ebb",
        "crop": [
            0,
            724,
            1122,
            1402
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
exports.mainNavigation = exports.pinterestReferences = exports.homeConcepts = exports.concepts = exports.featuredWorks = exports.works = exports.workCategories = void 0;
exports.workPhotoEvidence = workPhotoEvidence;
exports.inspirationConcepts = inspirationConcepts;
exports.visiblePinterestReferences = visiblePinterestReferences;
exports.categoryName = categoryName;
exports.modelHref = modelHref;
const beds_1 = require("./beds");
exports.workCategories = [
    { id: 'mutfak', name: 'Mutfak', short: 'Mutfak', image: 'concept-mutfak', line: 'Günün başladığı, evin buluştuğu yer.', detail: 'Kapak düzeninden depolama alanlarına, ölçünüz ve kullanım alışkanlıklarınız etrafında tasarlanan mutfaklar.' },
    { id: 'tv-unitesi', name: 'TV Ünitesi', short: 'Yaşam alanı', image: 'concept-tv', line: 'Salonunuzun sakin odağı.', detail: 'Duvar panelleri, raflar ve kapalı depolamayı bir araya getiren, mekâna göre şekillenen TV üniteleri.' },
    { id: 'vestiyer', name: 'Vestiyer ve Depolama', short: 'Antre', image: 'concept-vestiyer', line: 'Evin ilk karşılaması.', detail: 'Giriş alanında askılık, ayakkabı ve günlük eşyalar için yer açan ölçüye özel çözümler.' },
    { id: 'gardrop', name: 'Gardırop', short: 'Giyinme alanı', image: 'concept-gardrop', line: 'Her şeyin kendine ait bir yeri.', detail: 'Kapak, raf, çekmece ve askı alanlarının birlikte düşünüldüğü gardırop ve giyinme çözümleri.' },
    { id: 'kahve-kosesi', name: 'Kahve Köşesi', short: 'Kahve köşesi', image: 'concept-kahve', line: 'Kendinize ayırdığınız küçük bir an.', detail: 'Kahve ekipmanınız ve servis alışkanlıklarınız için vitrin, raf ve tezgâhı buluşturan özel köşeler.' },
    { id: 'sehpa', name: 'Orta Sehpa ve Zigon Sehpa', short: 'Sehpa & zigon', image: 'concept-sehpa', line: 'Bazen küçük bir parça her şeyi değiştirir.', detail: 'Orta sehpa, yan sehpa ve iç içe geçen zigon fikirleri. Beğendiğiniz formu alanınıza göre birlikte değerlendirelim.' },
    { id: 'pergola', name: 'Pergola ve Açık Alan Yapıları', short: 'Bahçe & dış mekân', image: 'concept-pergola', line: 'Hayata dışarıda da yer açalım.', detail: 'Bahçe ve açık alan için ahşap kamelya ve üst yapı çalışmaları. Uygulama koşulları ve teknik uygunluk ayrıca değerlendirilir.' },
    { id: 'ozel-tasarim', name: 'Özel Tasarım Projeler', short: 'Size özel', image: 'concept-model', line: 'Katalogda olmayan bir fikriniz mi var?', detail: 'Mekânınız, çiziminiz veya bir referansınız üzerinden başlarız. Ne üretilebileceğini birlikte netleştiririz.' },
    { id: 'baza-yatak', name: 'Baza ve Yatak', short: 'Yatak odanız', image: 'bed-ceviz-yalin-closed', line: 'Ahşabın karakteri, döşemenin yumuşaklığı.', detail: 'Ahşap ağırlıklı ve döşemeli sekiz baza konsepti. Açık ve kapalı görünümlerle tasarım fikrini keşfedin. Ölçü, malzeme ve mekanizma uygunluğu ayrıca değerlendirilir.' },
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
    { id: 'ahsap-bahce-kamelyasi', title: 'Dışarıda bir yaşam alanı.', category: 'pergola', images: ['r19', 'r16', 'r17', 'r20', 'r23'], status: 'work', subtitle: 'Ahşap kamelya ve uygulama detayları', description: 'Ahşap taşıyıcılar, çatı ve korkuluklarıyla açık alan çalışması. Paylaşılan fotoğraflar uygulama sırasındaki sahadan görünüşleri de içerir.', features: ['Ahşap çatı strüktürü', 'Çapraz korkuluk detayları', 'Sahada uygulama'] },
    { id: 'yatak-cevresi-depolama', title: 'Odaya göre düşünülmüş.', category: 'ozel-tasarim', images: ['r09'], status: 'work', subtitle: 'Yatak çevresi dolap uygulaması', description: 'Yatak çevresini depolama alanına dönüştüren, düşey ve yatay dolapların birlikte yer aldığı özel çalışma.', features: ['Yatak çevresi yerleşim', 'Üst dolap alanı', 'Yan depolama bölmeleri'] },
    { id: 'mutfak-kurulum-asamasi', title: 'Görünmeyen emeğin bir anı.', category: 'mutfak', images: ['r12', 'r11'], status: 'process', subtitle: 'Mutfak montaj aşaması', description: 'Koruyucu filmler ve devam eden kurulum fotoğrafta görünür. Bu, bitmiş mutfağın son çekimi değildir. Kapakların nihai rengi koruyucu filmden çıkarılamaz.', features: ['Sahada dolap yerleşimi', 'Koruyucu filmli yüzeyler', 'Devam eden kurulum'] },
    { id: 'klasik-mutfak-kurulumu', title: 'Bir mutfağın şekillendiği an.', category: 'mutfak', images: ['r15'], status: 'process', subtitle: 'Klasik mutfak kurulum görüntüsü', description: 'Dolaplar yerleşmiş, tezgâh ve cihaz alanlarında hazırlığın sürdüğü bir arşiv görüntüsü. Tamamlanmış teslim fotoğrafı olarak sunulmaz.', features: ['Cam detaylı üst dolap', 'Alt dolap yerleşimi', 'Kurulum hazırlığı'] },
    { "id": "cam-vitrin-uygulamasi", "title": "Bir vitrinin yerini bulduğu an.", "category": "gardrop", "images": ["r03"], "status": "process", "subtitle": "Cam vitrin ve raf uygulaması", "description": "Koyu çerçeveli cam kapaklar, yan raflar ve çizgili alt depolama. Zemindeki aletler ve kurulum ayrıntıları görünen bu kare, uygulama sürecinden paylaşılmıştır.", "features": ["Cam kapaklı düşey bölüm", "Açık raf düzeni", "Dikey çizgili alt kapaklar"] },
    { "id": "dikey-cizgili-tv-duvari", "title": "İnce çizgiler, bütün bir duvar.", "category": "tv-unitesi", "images": ["r21"], "status": "work", "subtitle": "Dikey çizgili TV duvarı", "description": "Açık renkli çizgili arkalık, sağdaki raflı bölüm ve alt depolama bir arada. Paylaşılan arşivdeki ekran görüntüsü, üzerindeki mevcut işaretler korunarak gösterilmiştir.", "features": ["Dikey çizgili duvar yüzeyi", "Yan sergileme alanı", "Alçak depolama düzeni"] },
    { "id": "gri-tv-depolama-unitesi", "title": "Ekranın yanında, düzen için yer.", "category": "tv-unitesi", "images": ["r24"], "status": "work", "subtitle": "Gri TV ve depolama ünitesi", "description": "TV alanına eşlik eden raflar ve kapalı depolama. Paylaşılan ekran görüntüsündeki ilan filigranı korunmuştur. Bu iş için teknik ölçü veya malzeme belgesi paylaşılmamıştır.", "features": ["TV için orta bölüm", "Açık ve kapalı depolama", "Gri tonlu yüzeyler"] },
    { "id": "ahsap-cizgili-tv-paneli", "title": "Ahşap çizgilerle sakin bir odak.", "category": "tv-unitesi", "images": ["r25"], "status": "work", "subtitle": "Ahşap görünümlü çizgili TV paneli", "description": "Dikey çizgili panel, yandaki gri raf alanı ve alttaki ışık çizgisi fotoğrafta birlikte görülüyor. Atölyenin paylaştığı tamamlanan işler arşivinden.", "features": ["Çizgili arka panel", "Yan raf yerleşimi", "Alt aydınlatma çizgisi"] },
    { "id": "isik-cerceveli-tv-unitesi", "title": "Işıkla çerçevelenen yaşam alanı.", "category": "tv-unitesi", "images": ["r26"], "status": "work", "subtitle": "Işık çerçeveli TV ünitesi", "description": "Gri ve ahşap görünümlü yüzeyler, raflar ve sıcak ışık hatlarıyla hazırlanmış TV duvarı. Atölyenin paylaştığı arşivden.", "features": ["Gri ve ahşap görünüm birlikteliği", "Çerçeveleyen aydınlatma", "Yan sergileme rafları"] },
];
const archivePhotoNotes = {
    r07: { kind: 'work', caption: 'Kemerli açık orta bölüm, iki yanda cam vitrin ve altta çekmeceler aynı karede görülüyor.' },
    r13: { kind: 'work', caption: 'L biçimindeki tezgâh, açık renkli dolaplar ve koyu cihaz yüzeyleri birlikte görülüyor.' },
    r22: { kind: 'work', caption: 'Merkez TV paneli, yan raflar ve kapalı alt depolama aynı duvar üzerinde görülüyor.' },
    r19: { kind: 'process', caption: 'Kamelyanın dış görünümü. Sahadaki uygulama fotoğrafı, teslim veya kullanım onayı değildir.' },
    r16: { kind: 'process', caption: 'Kamelyanın köşesi, ahşap taşıyıcılar ve korkulukların sahadan görünümü.' },
    r17: { kind: 'process', caption: 'Çatının altından ve yanından görünüm. Uygulama sahasındaki çalışma sürüyor.' },
    r20: { kind: 'process', caption: 'Kamelyanın diğer dış görünümü. Bu kare saha uygulamasından paylaşılmıştır.' },
    r23: { kind: 'process', caption: 'Çatı altı birleşimleri ve sahadaki çalışma gereçlerinin görüldüğü uygulama karesi.' },
    r03: { kind: 'process', caption: 'Cam vitrin, raflar ve zemindeki kurulum gereçleri. Uygulama aşaması.' },
    r11: { kind: 'process', caption: 'Mutfak dolaplarının yerleşimi ve koruyucu filmli yüzeyler. Son teslim fotoğrafı değildir.' },
    r12: { kind: 'process', caption: 'Mutfak montajının diğer görünümü. Filmli kapaklardan nihai renk çıkarılamaz.' },
    r15: { kind: 'process', caption: 'Mutfakta dolap, tezgâh ve cihaz yerlerinin kurulum sırasındaki görünümü.' }
};
function workPhotoEvidence(work, index = 0) {
    const image = work.images[Number.isInteger(index) && index >= 0 && index < work.images.length ? index : 0];
    const note = archivePhotoNotes[image];
    return { image, source: 'workshop-archive', kind: note?.kind || work.status, caption: note?.caption || work.subtitle + '. Paylaşılan atölye arşivinden.' };
}
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
    ...beds_1.beds,
];
function inspirationConcepts(category = 'all') {
    if (category !== 'all')
        return exports.concepts.filter(c => c.category === category);
    const seen = new Set();
    return exports.concepts.filter(c => { if (seen.has(c.category))
        return false; seen.add(c.category); return true; });
}
const homeConceptIds = ['oval-orta-sehpa', 'kahve-ritueli', 'sakin-antre'];
exports.homeConcepts = homeConceptIds.map(id => exports.concepts.find(c => c.id === id));
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
function visiblePinterestReferences(group, expanded = false) {
    const entries = exports.pinterestReferences.filter(p => p.group === group);
    return expanded ? entries : entries.slice(0, 4);
}
exports.mainNavigation = [['/projeler', 'Çalışmalar'], ['/kategoriler', 'Üretim Alanları'], ['/ilham-modelleri', 'İlham Modelleri'], ['/modelini-getir', 'Kendi Modeliniz'], ['/tasarim-masasi', '3D Stüdyo'], ['/atolye', 'Atölye'], ['/iletisim', 'İletişim']];
function categoryName(id) { return exports.workCategories.find(c => c.id === id)?.name || 'Özel Tasarım'; }
function modelHref(ref, category = 'ozel-tasarim', note = '', sourceId = '') {
    const work = exports.works.find(w => note.startsWith(w.subtitle)), concept = exports.concepts.find(c => note.startsWith(c.subtitle));
    const pin = exports.pinterestReferences.find(p => ref === 'https://pin.it/' + p.id);
    const source = sourceId || (ref && pin ? 'pin:' + pin.id : !ref && work ? 'work:' + work.id : !ref && concept ? 'concept:' + concept.id : '');
    const q = new URLSearchParams({ ref, kategori: category, fikir: note });
    if (source)
        q.set('kaynak', source);
    return '/modelini-getir?' + q.toString();
}

},
"src/lib/project":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachmentStore = exports.projectStore = exports.business = void 0;
exports.whatsappUrl = whatsappUrl;
exports.emptyProject = emptyProject;
exports.convertMeasure = convertMeasure;
exports.measurementText = measurementText;
exports.createProjectStore = createProjectStore;
exports.projectRows = projectRows;
exports.projectText = projectText;
exports.whatsappMessage = whatsappMessage;
exports.contextMessage = contextMessage;
exports.hasPrivateDraft = hasPrivateDraft;
exports.firstInvalidMeasure = firstInvalidMeasure;
const model_request_1 = require("./model-request");
const desk_v8_1 = require("./desk-v8");
exports.business = Object.freeze({ name: 'Elif Tasarım', contact: 'Yunus Usta', digits: '905308797169', telephone: '+905308797169', display: '+90 530 879 71 69', city: 'İstanbul', verifiedBy: 'Kullanıcı düzeltmesi, 25 Eylül 2026' });
function whatsappUrl(text = 'Merhaba Yunus Usta. Elif Tasarım üzerinden yazıyorum, projem hakkında görüşmek istiyorum.') { return 'https://wa.me/' + exports.business.digits + '?text=' + encodeURIComponent(text); }
function emptyProject() { return { draftId: 'local-project', revision: 0, sourceRef: null, systemPrefill: '', customerNote: '', studioConfig: null, studioNotice: '', systemDetails: '', category: 'ozel-tasarim', url: '', note: '', dimensions: '', district: '', timing: 'Birlikte planlayalım', interpretation: 'Alanıma göre birlikte yorumlayalım', width: '', depth: '', height: '', unit: 'cm', unknown: true, material: 'Birlikte değerlendirelim', finish: 'Birlikte değerlendirelim', details: '', readiness: 'Fikir topluyorum', selections: [] }; }
function convertMeasure(value, from, to) { if (!value.trim())
    return ''; if (!/^\d+(?:[.,]\d+)?$/.test(value.trim()))
    return null; const n = Number(value.replace(',', '.')); if (!Number.isFinite(n) || n <= 0)
    return null; return String(Math.round(n * (from === to ? 1 : from === 'cm' ? 10 : 0.1) * 10000) / 10000); }
function numericText(v) { return [v.width, v.depth, v.height].every(n => !!convertMeasure(n, v.unit, 'mm')) ? [v.width, v.depth, v.height].join(' × ') + ' ' + v.unit : ''; }
function measurementText(v) { return (!v.unknown ? numericText(v) : v.dimensions) || 'Birlikte belirlenecek'; }
const clone = (v) => ({ ...v, selections: [...v.selections], sourceRef: v.sourceRef ? { ...v.sourceRef } : null, studioConfig: v.studioConfig ? { ...v.studioConfig } : null });
function createProjectStore() {
    let value = emptyProject(), activeKey = '', studioEntry = '';
    const legacySeeds = new Set();
    const get = () => clone(value);
    const listeners = new Set();
    const notify = () => { const snapshot = get(); for (const fn of listeners) {
        try {
            fn(clone(snapshot));
        }
        catch { }
    } return snapshot; };
    const synchronizeStudio = () => {
        if (value.sourceRef?.kind !== 'studio' || !value.studioConfig)
            return;
        const nums = [value.width, value.depth, value.height].map(n => Number(convertMeasure(n, value.unit, 'cm'))), ranges = [[120, 220], [65, 95], [80, 125]];
        if (!value.unknown && nums.every((n, i) => Number.isInteger(n) && n >= ranges[i][0] && n <= ranges[i][1])) {
            const material = value.material.includes('Meşe') ? 'mese' : value.material.includes('Ceviz') ? 'ceviz' : value.material === 'Ahşap / ahşap kaplama görünümü' ? 'koyu' : value.studioConfig.material;
            value.studioConfig = (0, desk_v8_1.normalizeStudio)({ ...value.studioConfig, width: nums[0], depth: nums[1], height: nums[2], material });
            value.studioNotice = '';
            value.systemDetails = (0, desk_v8_1.studioSummary)(value.studioConfig);
        }
        else if (!value.unknown) {
            value.studioNotice = 'Formdaki ölçüler 3D modelin görsel aralığı dışında veya ondalıklı. Formdaki değerler korunuyor. Sahne son gösterilebilir ölçüdedir, imalat sınırı değildir.';
        }
    };
    const patch = (input) => {
        const next = { ...input };
        if ('note' in next)
            next.customerNote = next.note || '';
        else if ('customerNote' in next)
            next.note = next.customerNote || '';
        if ('dimensions' in next && value.unknown && next.dimensions !== value.dimensions && !('width' in next)) {
            next.width = '';
            next.depth = '';
            next.height = '';
        }
        if ('unknown' in next && next.unknown !== value.unknown) {
            const text = numericText({ ...value, ...next });
            if (text)
                next.dimensions = text;
        }
        value = { ...value, ...next, selections: next.selections ? [...next.selections] : value.selections, revision: value.revision + 1 };
        if (['width', 'depth', 'height', 'unit', 'material'].some(k => k in next)) {
            if (!value.unknown && numericText(value))
                value.dimensions = numericText(value);
            synchronizeStudio();
        }
        return notify();
    };
    const adoptReference = (key, seed) => {
        if (activeKey === key)
            return get();
        activeKey = key;
        const external = (0, model_request_1.normalizeReference)(seed.url || '') || '';
        value = { ...value, category: seed.category || 'ozel-tasarim', url: external, sourceRef: seed.sourceRef ? { ...seed.sourceRef } : { id: key, kind: external ? 'reference' : 'idea', title: seed.systemPrefill || seed.note || 'Seçilen model', url: external }, systemPrefill: seed.systemPrefill || seed.note || '', systemDetails: '', revision: value.revision + 1 };
        return notify();
    };
    const getStudio = () => ({ ...(value.studioConfig || desk_v8_1.defaultStudio) });
    const setStudio = (config) => { const c = (0, desk_v8_1.normalizeStudio)(config), previous = value.studioConfig; value = { ...value, studioConfig: c, revision: value.revision + 1 }; if (value.sourceRef?.kind === 'studio' && !value.studioNotice) {
        value = { ...value, width: String(c.width), depth: String(c.depth), height: String(c.height), unit: 'cm', dimensions: `${c.width} × ${c.depth} × ${c.height} cm`, systemDetails: (0, desk_v8_1.studioSummary)(c), material: previous?.material !== c.material ? (0, desk_v8_1.studioRequestMaterial)(c.material) : value.material };
    } notify(); return getStudio(); };
    const handoffStudio = (config) => {
        const c = (0, desk_v8_1.normalizeStudio)(config);
        activeKey = 'studio:devir-01';
        value = { ...value, sourceRef: { id: 'devir-01', kind: 'studio', title: 'Devir 01. Yükseklik ayarlı çalışma masası', url: '', image: 'devir-poster.webp' }, systemPrefill: 'Devir 01 çekmeceli, döner yan tablalı çalışma masası konseptini alanıma göre değerlendirmek istiyorum.', url: '', category: 'ozel-tasarim', studioConfig: c, studioNotice: '', width: String(c.width), depth: String(c.depth), height: String(c.height), unit: 'cm', unknown: false, dimensions: `${c.width} × ${c.depth} × ${c.height} cm`, material: (0, desk_v8_1.studioRequestMaterial)(c.material), finish: c.material === 'mese' ? 'Açık ton ve mat görünüm' : c.material === 'koyu' ? 'Koyu ton ve ahşap dokusu' : 'Birlikte değerlendirelim', systemDetails: (0, desk_v8_1.studioSummary)(c), revision: value.revision + 1 };
        return notify();
    };
    return { get, patch, adoptReference, getStudio, setStudio, handoffStudio, subscribe: (fn) => { listeners.add(fn); return () => listeners.delete(fn); },
        restore: (draft) => { value = { ...emptyProject(), ...clone(draft), revision: value.revision + 1 }; activeKey = ''; studioEntry = ''; legacySeeds.clear(); return notify(); }, openStudio: (key, config) => { if (key && studioEntry !== key) {
            studioEntry = key;
            setStudio(config);
        } return getStudio(); },
        seed: (key, seed, replace = false) => { if (legacySeeds.has(key))
            return; legacySeeds.add(key); if (replace) {
            patch(seed);
            return;
        } const update = {}; for (const [k, v] of Object.entries(seed)) {
            const n = k;
            if (v !== undefined && v !== '' && (!value[n] || (n === 'category' && value.category === 'ozel-tasarim')))
                update[n] = v;
        } patch(update); },
        clearSource: () => { activeKey = ''; value = { ...value, sourceRef: null, systemPrefill: '', url: '', systemDetails: '', revision: value.revision + 1 }; return notify(); },
        clear: () => { value = emptyProject(); activeKey = ''; studioEntry = ''; legacySeeds.clear(); notify(); } };
}
exports.projectStore = createProjectStore();
function projectRows(v, files, selectionLabels = []) {
    return [
        { label: 'İhtiyaç', value: v.category }, { label: 'Seçilen model', value: v.sourceRef?.title || 'Kendi fikrim' },
        { label: 'Kaynak türü', value: v.sourceRef ? ({ work: 'Atölye arşivi', concept: 'Konsept model', reference: 'Dış ilham kaynağı', studio: 'Devir 01 konsept stüdyosu', idea: 'Fikir' }[v.sourceRef.kind]) : 'Yazılı fikir / fotoğraf' },
        { label: 'Kaynak bağlantısı', value: (0, model_request_1.normalizeReference)(v.url) || v.sourceRef?.url || 'Dış kaynak bağlantısı yok' },
        { label: 'Modelden gelen açıklama', value: v.systemPrefill || 'Belirtilmedi' },
        { label: 'Kendi notum', value: v.customerNote || v.note || 'Ek kişisel not yok' },
        { label: 'Yaklaşık ölçü', value: measurementText(v) }, { label: 'Ölçü durumu', value: v.unknown ? 'Yaklaşık veya görüşmede belirlenecek' : 'Müşteri tarafından girilen ölçü, imalat onayı değil' },
        { label: 'Bölge', value: v.district || 'Görüşmede paylaşacağım' }, { label: 'Malzeme', value: v.material }, { label: 'Yüzey', value: v.finish },
        { label: 'Kullanım ayrıntıları', value: v.details || 'Birlikte değerlendirelim' },
        ...(v.systemDetails ? [{ label: 'Konsept konfigürasyonu', value: v.systemDetails }] : []),
        ...(v.studioNotice ? [{ label: 'Form ve 3D uyumu', value: v.studioNotice }] : []),
        { label: 'Zaman', value: v.timing }, { label: 'Aşama', value: v.readiness }, { label: 'Yaklaşım', value: v.interpretation },
        { label: 'Ek ilham seçimlerim', value: selectionLabels.length ? selectionLabels.join('\n') : 'Ek seçim yok' },
        { label: 'Görseller', value: files.length ? files.join(', ') + ' (bu bağlantıda ekli değil, ayrıca paylaşacağım)' : 'Görsel eklenmedi' }
    ];
}
function projectText(v, files, selectionLabels = []) { return ['Merhaba Yunus Usta, Elif Tasarım üzerinden yazıyorum.', 'Proje fikrimi birlikte değerlendirmek istiyorum.', '', ...projectRows(v, files, selectionLabels).map(x => x.label + ', ' + x.value), '', 'Ölçü, donanım ve uygulanabilirlik görüşmede netleşsin. Bu mesaj kesin sipariş veya üretim onayı değildir.'].join('\n'); }
function whatsappMessage(text) { const url = whatsappUrl(text), needsAttachment = url.length > 7000; const sentText = needsAttachment ? 'Merhaba Yunus Usta. Elif Tasarım’da ayrıntılı bir proje özeti hazırladım. Bağlantıya sığmayan özeti metin veya proje dosyası olarak ayrıca paylaşacağım. Projemi birlikte değerlendirmek istiyorum.' : text; return { url: needsAttachment ? whatsappUrl(sentText) : url, needsAttachment, fullText: text, sentText }; }
function contextMessage(path, title, site = 'https://onourimpram.github.io/elif-tasarim') { const route = path.split(/[?#]/)[0]; if (!/^\/[a-z0-9/-]*$/.test(route) || route === '/')
    return 'Merhaba Yunus Usta. Elif Tasarım üzerinden yazıyorum, projem hakkında görüşmek istiyorum.'; return 'Merhaba Yunus Usta. ' + (title || 'İncelediğim çalışma') + ' hakkında görüşmek istiyorum.\n' + site.replace(/\/$/, '') + route.replace(/\/$/, '') + '/'; }
let items = [];
exports.attachmentStore = { get: () => [...items], add: (a) => { items = [...items, ...a]; }, remove: (id) => { items.filter(x => x.id === id).forEach(x => URL.revokeObjectURL(x.preview)); items = items.filter(x => x.id !== id); }, clear: () => { items.forEach(x => URL.revokeObjectURL(x.preview)); items = []; } };
function hasPrivateDraft() { const d = exports.projectStore.get(); return Boolean(d.note || d.url || d.dimensions || d.district || d.details || exports.attachmentStore.get().length); }
function firstInvalidMeasure(v) { if (v.unknown)
    return null; for (const key of ['width', 'depth', 'height']) {
    const n = convertMeasure(v[key], v.unit, 'mm');
    if (!n || Number(n) > 20000)
        return key;
} return null; }

},
"src/lib/project-readiness":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectReadiness = projectReadiness;
const project_1 = require("./project");
function projectReadiness(draft, photoCount) {
    const measurement = (0, project_1.measurementText)(draft), hasMeasure = measurement !== 'Birlikte belirlenecek';
    const hasModel = !!draft.sourceRef || !!draft.customerNote.trim() || !!draft.note.trim();
    return [
        { id: 'model', title: hasModel ? 'Model veya fikir hazır' : 'Fikrinizi görüşmede açabiliriz', detail: draft.sourceRef?.title || 'Kendi proje fikriniz', ready: hasModel },
        { id: 'measure', title: hasMeasure ? 'Ölçü bilgisi özette' : 'Ölçü görüşmede netleşecek', detail: hasMeasure ? measurement : 'Kesin ölçü bilmeden başlayabilirsiniz.', ready: hasMeasure },
        { id: 'photos', title: photoCount > 0 ? photoCount + ' görsel hazır' : 'Görsel eklenmedi', detail: photoCount > 0 ? 'Görüşmeye ayrıca ekleyin veya ZIP dosyasını paylaşın.' : 'Görsel eklemek isteğe bağlıdır.', ready: photoCount > 0 },
        { id: 'summary', title: 'Özet hazır', detail: 'Kontrol edip seçtiğiniz uygulamada siz gönderirsiniz.', ready: true }
    ];
}

},
"src/lib/room-fit":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluateRoomFit = evaluateRoomFit;
const n = (v) => Math.round(v * 10) / 10;
function evaluateRoomFit(roomWidth, roomDepth, footprint) {
    if (!Number.isFinite(roomWidth) || !Number.isFinite(roomDepth) || roomWidth <= 0 || roomDepth <= 0 || !footprint || !Number.isFinite(footprint.width) || !Number.isFinite(footprint.depth) || footprint.width <= 0 || footprint.depth <= 0)
        return null;
    const widthClearance = n((roomWidth - footprint.width) / 2), depthClearance = n((roomDepth - footprint.depth) / 2);
    return { fits: roomWidth >= footprint.width && roomDepth >= footprint.depth, widthClearance, depthClearance, footprintWidth: n(footprint.width), footprintDepth: n(footprint.depth), roomWidth, roomDepth };
}

},
"src/lib/routes":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seoApprovedRoutes = exports.v7Routes = exports.routePaths = exports.seoTitles = void 0;
exports.pageTitle = pageTitle;
exports.pageDescription = pageDescription;
exports.pageShareImage = pageShareImage;
exports.indexableRoute = indexableRoute;
exports.pageRobots = pageRobots;
exports.pageSchema = pageSchema;
exports.seoTitles = { "/kategoriler/baza-yatak": "Ahşap ve Döşemeli Baza Modelleri | Elif Tasarım", "/": "İstanbul Özel Ölçü Mobilya Atölyesi | Elif Tasarım", "/kategoriler/kahve-kosesi": "Özel Ölçü Kahve Köşesi Dolabı | Elif Tasarım", "/kategoriler/mutfak": "İstanbul Özel Ölçü Mutfak Dolabı | Elif Tasarım", "/kategoriler/tv-unitesi": "Ölçüye Özel TV Ünitesi ve Depolama | Elif Tasarım", "/rehber/bakim": "Ahşap Mobilya Bakımı. Yüzeye Göre Temizlik | Elif Tasarım", "/rehber/olcu-alma": "Özel Mobilya İçin Ölçü Hazırlığı | Elif Tasarım", "/rehber/malzeme-secimi": "Mobilyada Gövde, Kapak ve Yüzey Seçimi | Elif Tasarım" };
const portfolio_1 = require("./portfolio");
const project_1 = require("./project");
const site_profile_1 = require("./site-profile");
const data_1 = require("./data");
exports.routePaths = ['/kolay-iletisim', '/hizmet-ve-teklif', '/projeler', '/kategoriler', '/ilham-modelleri', '/modelini-getir', '/hakkimizda', '/atolye', ...portfolio_1.works.map(w => '/proje/' + w.id), ...portfolio_1.workCategories.map(c => '/kategoriler/' + c.id), '/', '/urunler', '/tasarim-masasi', '/atolyemiz', '/ozel-uretim', '/malzemeler', '/mekan-fikirleri', '/rehber', '/teklif-al', '/sikca-sorulan-sorular', '/iletisim', '/sepet', '/odeme', '/calisma-dosyam', '/gizlilik', '/atolye-demolari', ...data_1.products.map(p => '/urun/' + p.id), ...data_1.ideas.map(p => '/mekan-fikirleri/' + p.id), ...data_1.journal.map(p => '/rehber/' + p.id)];
function pageTitle(path) { const p = path.split('?')[0]; if (exports.seoTitles[p])
    return exports.seoTitles[p]; if (p === '/kolay-iletisim')
    return 'Kolay İletişim | Elif Tasarım'; if (p === '/hizmet-ve-teklif')
    return 'Hizmet ve Teklif Rehberi | Elif Tasarım'; if (p === '/arama')
    return 'Arama | Elif Tasarım'; if (p === '/calisma-dosyam')
    return 'İlham Dosyanız | Elif Tasarım'; if (p === '/gizlilik')
    return 'Veri ve Dış Servisler | Elif Tasarım'; const w = portfolio_1.works.find(w => '/proje/' + w.id === p); if (w)
    return w.subtitle + ' | Elif Tasarım'; const c = portfolio_1.workCategories.find(c => '/kategoriler/' + c.id === p); if (c)
    return c.name + ' | Elif Tasarım'; const newTitles = { '/projeler': 'Bitirdiğimiz İşler', '/kategoriler': 'Kategoriler', '/ilham-modelleri': 'İlham Modelleri', '/modelini-getir': 'Kendi Modelinizi Getirin', '/hakkimizda': 'Aileden Gelen Ustalık', '/atolye': 'Atölye' }; if (newTitles[p])
    return newTitles[p] + ' | Elif Tasarım'; if (p === '/tasarim-masasi')
    return '3D Stüdyo | Elif Tasarım'; const product = data_1.products.find(x => '/urun/' + x.id === p); const article = data_1.journal.find(x => '/rehber/' + x.id === p); const idea = data_1.ideas.find(x => '/mekan-fikirleri/' + x.id === p); return product ? product.name + ' | Elif Tasarım' : article ? article.title + ' | Elif Tasarım' : idea ? idea.name + ' | Elif Tasarım' : { '/': 'Elif Tasarım | El Yapımı Mobilya Atölyesi', '/urunler': 'Koleksiyon | Elif Tasarım', '/teklif-al': 'Proje Fikrinizi Hazırlayın | Elif Tasarım', '/atolyemiz': 'Atölyemiz | Elif Tasarım', '/malzemeler': 'Malzeme Kütüphanesi | Elif Tasarım', '/sepet': 'Örnek Sepet | Elif Tasarım', '/odeme': 'Sipariş Hazırlığı | Elif Tasarım', '/iletisim': 'İletişim | Elif Tasarım', '/rehber': 'Atölye Notları | Elif Tasarım', '/ozel-uretim': 'Özel Üretim | Elif Tasarım', '/mekan-fikirleri': 'Mekân Fikirleri | Elif Tasarım', '/calisma-dosyam': 'Kaydedilenler | Elif Tasarım', '/gizlilik': 'Önizleme Gizliliği | Elif Tasarım', '/sikca-sorulan-sorular': 'Sorular | Elif Tasarım', '/atolye-demolari': 'Atölye İş Akışı Demosu | Elif Tasarım' }[p] || 'Sayfa bulunamadı | Elif Tasarım'; }
function pageDescription(path) {
    const p = path.split('?')[0], w = portfolio_1.works.find(w => '/proje/' + w.id === p), c = portfolio_1.workCategories.find(c => '/kategoriler/' + c.id === p);
    if (w)
        return w.subtitle + '. ' + w.description;
    if (c)
        return 'Elif Tasarım. ' + c.name + '. ' + c.detail;
    const desc = { '/': 'Zamana değer katan mobilyalar. İstanbul’daki aile atölyesinden gerçek çalışmalar, ilham modelleri ve Yunus Usta ile doğrudan iletişim.', '/modelini-getir': 'Pinterest bağlantısı, kendi fotoğrafınız veya fikrinizle başlayın. Ölçü ve kullanımınızı özetleyin, Yunus Usta ile WhatsApp’ta görüşün.', '/teklif-al': 'Kayıpsız ortak proje taslağı. Yaklaşık ölçü, malzeme ve kullanım ayrıntılarını birlikte hazırlayın.', '/arama': 'Elif Tasarım çalışma arşivi, ilham modelleri ve kategorilerinde arayın.', '/iletisim': 'Yunus Usta ile doğrudan iletişim. +90 530 879 71 69. Yeni atölye adresini ziyaret öncesinde teyit edin.', '/gizlilik': 'Elif Tasarım. Yerel proje taslağı, fotoğraf hazırlama, isteğe bağlı saklama, WhatsApp ve Pinterest hakkında açıklama.', '/calisma-dosyam': 'Gerçek çalışma, konsept model ve Pinterest modelini ortak ilham dosyanızda toplayın.' };
    const specific = {
        '/kolay-iletisim': 'Form kullanmadan Elif Tasarım ile iletişim kurun. Görünür e-posta, telefon, SMS ve ilk mesaj için başlangıç metni.',
        '/hizmet-ve-teklif': 'Özel üretim mobilyada bütçe, malzeme, donanım, keşif, nakliye ve montaj kapsamını birlikte netleştirmek için görüşme rehberi.',
        '/projeler': 'Atölyeden paylaşılan mutfak, kahve köşesi, TV ünitesi ve depolama çalışmalarını kaynak türü ve kullanım alanına göre inceleyin.',
        '/kategoriler': 'Mutfak, TV ünitesi, vestiyer, gardırop, kahve köşesi, sehpa, pergola, baza ve özel tasarım için üretim alanlarımızı keşfedin.',
        '/ilham-modelleri': 'Konsept seçkileri ve kaynağı korunan Pinterest modelleri. Beğendiğiniz ayrıntıyı ilham dosyanıza ekleyin veya kendi fikrinize başlangıç yapın.',
        '/hakkimizda': 'Yunus Usta’nın aileden öğrendiği marangozluk ve ihtiyaca göre çalışma yaklaşımı. Elif Tasarım’ın atölye hikâyesi.',
        '/atolye': 'Üretim ve uygulama aşamalarından gerçek atölye arşivi. Montaj fotoğrafları bitmiş işlerden ayrı gösterilir.',
        '/tasarim-masasi': '3D Stüdyoda çalışma masanızı tasarlayın. Yükseklik, ölçü, döner yan tabla ve çift taraflı raf seçeneklerini birlikte deneyin.',
        '/malzemeler': 'Gövde, kapak, yüzey ve donanım kararlarını ayrı değerlendirin. Fotoğraftaki ahşap görünümü ile gerçek malzeme seçimi arasındaki farkı öğrenin.',
        '/ozel-uretim': 'İlk fikirden ölçü ve kapsam görüşmesine, taslak değerlendirmesinden üretim onayına özel mobilya sürecinin adımları.',
        '/rehber': 'Ölçü, malzeme ve bakım hakkında atölye notları. İlk mobilya görüşmenize daha doğru sorularla hazırlanın.',
        '/rehber/bakim': 'Mobilya bakımında yüzey türünü tanıyın. Temizlik ve bakım ürününü seçmeden önce üretici yönlendirmesi ve donanım bilgisini teyit edin.',
        '/rehber/malzeme-secimi': 'Masif, kaplama, gövde ve yüzey aynı karar değildir. Kullanım alanınıza uygun malzeme görüşmesi için başlangıç rehberi.',
        '/rehber/olcu-alma': 'Mekânınıza özel mobilya için yaklaşık ölçü hazırlığı. En, derinlik, yükseklik ve yerleşim açıklıklarını görüşmeye taşıyın.',
        '/sikca-sorulan-sorular': 'Ölçüye özel mobilya, Pinterest fikirleri, konsept modeller ve atölye görüşmesi hakkında sık sorulan sorular.'
    };
    return desc[p] || specific[p] || ('Elif Tasarım. ' + pageTitle(p).split(' | ')[0] + '. Çalışmaları ve görüşme seçeneklerini keşfedin.');
}
exports.v7Routes = [...new Set([...exports.routePaths.filter(p => !['/urunler', '/sepet', '/odeme', '/atolye-demolari', '/atolyemiz', '/mekan-fikirleri'].includes(p) && !p.startsWith('/urun/') && !p.startsWith('/mekan-fikirleri/')), '/arama'])];
function pageShareImage(path) { const p = path.split('?')[0]; if (p === '/hizmet-ve-teklif')
    return 'r13-full.webp'; const article = data_1.journal.find(j => '/rehber/' + j.id === p); if (article)
    return article.image === 'joinery.webp' ? 'joinery-v8.webp' : article.image; if (['/iletisim', '/kolay-iletisim', '/hakkimizda', '/atolye'].includes(p))
    return 'work-joinery-full.webp'; if (p === '/malzemeler')
    return 'joinery-v8.webp'; if (p === '/sikca-sorulan-sorular')
    return 'concept-model-full.webp'; if (p === '/tasarim-masasi' || p === '/devir-01')
    return 'devir-atolye-v23.webp'; const work = portfolio_1.works.find(w => '/proje/' + w.id === p); if (work)
    return work.images[0] + '-full.webp'; const cat = portfolio_1.workCategories.find(c => '/kategoriler/' + c.id === p); if (cat) {
    const representative = portfolio_1.works.find(w => w.category === cat.id && w.status === 'work');
    return (representative ? representative.images[0] : cat.image) + '-full.webp';
} if (['/modelini-getir', '/teklif-al', '/ilham-modelleri'].includes(p))
    return 'concept-model-full.webp'; return 'r13-full.webp'; }
exports.seoApprovedRoutes = ["/", "/hakkimizda", "/iletisim", "/projeler", "/kategoriler", "/ozel-uretim", "/hizmet-ve-teklif", "/rehber", "/rehber/bakim", "/rehber/olcu-alma", "/rehber/malzeme-secimi", "/kategoriler/kahve-kosesi", "/kategoriler/mutfak", "/kategoriler/tv-unitesi", "/proje/kemerli-kahve-kosesi", "/proje/sade-kose-mutfak", "/proje/isikli-tv-unitesi", "/tasarim-masasi"];
function indexableRoute(path) { return exports.seoApprovedRoutes.includes(path.split('?')[0]); }
function pageRobots(path, approved) { return approved && indexableRoute(path) ? 'index,follow' : 'noindex,nofollow'; }
function pageSchema(path, site) {
    const route = path.split('?')[0], base = site.replace(/\/$/, ''), profile = (0, site_profile_1.getSiteProfile)(), url = base + (route === '/' ? '/' : route + '/');
    const publisher = { '@type': profile.address ? 'LocalBusiness' : 'Organization', '@id': base + '/#atolye', name: project_1.business.name, url: base + '/', telephone: project_1.business.telephone, logo: base + '/assets/elif-amblem.png', areaServed: { '@type': 'City', name: project_1.business.city }, contactPoint: { '@type': 'ContactPoint', telephone: project_1.business.telephone, contactType: 'Proje görüşmesi', availableLanguage: 'tr' } };
    if (profile.email)
        publisher.email = profile.email;
    if (profile.address)
        publisher.address = { '@type': 'PostalAddress', ...profile.address };
    if (profile.social.length)
        publisher.sameAs = profile.social;
    const crumbs = [{ name: 'Anasayfa', url: base + '/' }];
    if (route.startsWith('/proje/'))
        crumbs.push({ name: 'Bitirdiğimiz İşler', url: base + '/projeler/' });
    if (route.startsWith('/kategoriler/'))
        crumbs.push({ name: 'Kategoriler', url: base + '/kategoriler/' });
    if (route.startsWith('/rehber/'))
        crumbs.push({ name: 'Atölye Notları', url: base + '/rehber/' });
    if (route !== '/')
        crumbs.push({ name: pageTitle(route).split(' | ')[0], url });
    const schema = { '@context': 'https://schema.org', '@type': 'WebPage', '@id': url + '#sayfa', name: pageTitle(route), description: pageDescription(route), url, inLanguage: 'tr-TR', publisher, isPartOf: { '@type': 'WebSite', '@id': base + '/#website', name: project_1.business.name, url: base + '/' }, breadcrumb: { '@type': 'BreadcrumbList', itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: c.url })) } };
    const article = data_1.journal.find(j => '/rehber/' + j.id === route);
    if (article)
        schema.mainEntity = { '@type': 'Article', headline: article.title, description: article.intro, image: base + '/assets/' + pageShareImage(route), inLanguage: 'tr-TR', author: { '@type': 'Organization', name: project_1.business.name }, publisher, mainEntityOfPage: url };
    return schema;
}

},
"src/lib/selection-backup":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAX_SELECTION_FILE_BYTES = void 0;
exports.encodeSelections = encodeSelections;
exports.decodeSelections = decodeSelections;
exports.combineSelections = combineSelections;
const selections_1 = require("./selections");
exports.MAX_SELECTION_FILE_BYTES = 65536;
function validate(ids) {
    if (!Array.isArray(ids) || ids.length > 24 || ids.some(id => typeof id !== 'string' || !selections_1.selectionEntries.some(entry => entry.id === id)))
        throw Error('Dosyada geçersiz veya bu katalogda bulunmayan bir model var. İlham dosyanız değiştirilmedi.');
    return [...new Set(ids)];
}
function encodeSelections(ids) { return JSON.stringify({ format: 'elif-inspiration', version: 1, ids: validate(ids) }, null, 2); }
function decodeSelections(text) {
    if (new TextEncoder().encode(text).length > exports.MAX_SELECTION_FILE_BYTES)
        throw Error('Dosya en fazla 64 KB olabilir.');
    let data;
    try {
        data = JSON.parse(text);
    }
    catch {
        throw Error('Geçerli bir Elif ilham dosyası seçin.');
    }
    if (!data || data.format !== 'elif-inspiration' || data.version !== 1)
        throw Error('Bu dosya Elif ilham dosyası biçiminde değil. Proje taslağı ve 3D karşılaştırma dosyaları farklıdır.');
    return validate(data.ids);
}
function combineSelections(current, incoming) { const ids = [...new Set([...validate(current), ...validate(incoming)])]; if (ids.length > 24)
    throw Error('Birleşen liste 24 modeli aşıyor. Önce mevcut seçkiden birkaç model çıkarın.'); return ids; }

},
"src/lib/selections":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchTerms = exports.selectionEntries = void 0;
exports.searchEntries = searchEntries;
exports.validSelectionIds = validSelectionIds;
exports.selectedEntries = selectedEntries;
exports.selectionSummary = selectionSummary;
exports.inspirationTarget = inspirationTarget;
exports.targetElementId = targetElementId;
const portfolio_1 = require("./portfolio");
const pinterest_1 = require("./pinterest");
const domain_1 = require("./domain");
const target = (id) => '/ilham-modelleri?hedef=' + encodeURIComponent(id);
exports.selectionEntries = [...portfolio_1.works.map(w => ({ id: 'work:' + w.id, title: w.subtitle, category: w.category, image: w.images[0], photoKind: (0, portfolio_1.workPhotoEvidence)(w).kind, kind: 'work', path: '/proje/' + w.id })), ...portfolio_1.concepts.map(c => ({ id: 'concept:' + c.id, title: c.subtitle, category: c.category, image: c.image, kind: 'concept', path: target('concept:' + c.id) })), ...portfolio_1.pinterestReferences.map(p => ({ id: 'pin:' + p.id, title: pinterest_1.pinLookup[p.id]?.label || p.title, category: p.category, kind: 'reference', path: target('pin:' + p.id) }))];
const pages = [
    { id: 'page:basic-contact', title: 'Kolay iletişim. Form olmadan başlayın', category: 'ozel-tasarim', kind: 'page', path: '/kolay-iletisim', keywords: 'e-posta mail email telefon SMS WhatsApp iletişim' },
    { id: 'page:service', title: 'Hizmet ve teklif rehberi', category: 'ozel-tasarim', kind: 'page', path: '/hizmet-ve-teklif', keywords: 'bütçe fiyat nakliye montaj keşif garanti kapora ödeme hizmet bölgesi' },
    { id: 'page:faq', title: 'Sıkça sorulan sorular', category: 'ozel-tasarim', kind: 'page', path: '/sikca-sorulan-sorular', keywords: 'soru cevap teslim süre ücret iptal saklama kurtarma taslak SMS e-posta' },
    { id: 'page:devir', title: '3D Stüdyo. Yükseklik ayarlı çalışma masası', category: 'ozel-tasarim', image: 'devir-poster.webp', kind: 'page', path: '/tasarim-masasi', keywords: 'Devir 01 devir01 3D üç boyutlu üçboyutlu three.js stüdyo çalışma masası yukseklik ayarli ofis masa çekmece' },
    { id: 'page:bespoke', title: 'Özel üretim. Nasıl ilerliyoruz?', category: 'ozel-tasarim', kind: 'page', path: '/ozel-uretim', keywords: 'süreç özel ölçü teklif montaj keşif' },
    { id: 'page:materials', title: 'Malzeme ve yüzey seçenekleri', category: 'ozel-tasarim', kind: 'page', path: '/malzemeler', keywords: 'ahşap masif lake kaplama malzeme meşe ceviz' },
    { id: 'page:care', title: 'Mobilya bakımını birlikte netleştirelim', category: 'ozel-tasarim', kind: 'page', path: '/rehber/bakim', keywords: 'temizlik bakım yağ leke' },
    { id: 'page:measure', title: 'Yaklaşık ölçüyle nasıl başlanır?', category: 'ozel-tasarim', kind: 'page', path: '/rehber/olcu-alma', keywords: 'ölçü almak metrekare metre derinlik' },
    { id: 'page:beds', title: 'Baza ve yatak modelleri', category: 'baza-yatak', image: 'bed-ceviz-yalin-closed', kind: 'page', path: '/kategoriler/baza-yatak', keywords: 'ahşap ceviz meşe döşemeli yatak odası depolama sandıklı baza' }
];
const searchTerms = (s) => (0, domain_1.searchKey)(s).replace(/gardrop/g, 'gardirop').replace(/\s+/g, ' ').trim();
exports.searchTerms = searchTerms;
function searchEntries(query) { const terms = (0, exports.searchTerms)(query).split(' ').filter(Boolean); return [...pages, ...exports.selectionEntries].filter(x => { const text = (0, exports.searchTerms)(x.title + ' ' + (0, portfolio_1.categoryName)(x.category) + ' ' + ('keywords' in x ? x.keywords || '' : '')); return terms.every(t => text.includes(t)); }); }
function validSelectionIds(value) { return Array.isArray(value) ? [...new Set(value.filter((id) => typeof id === 'string' && exports.selectionEntries.some(x => x.id === id)))].slice(0, 24) : []; }
function selectedEntries(ids) { return validSelectionIds(ids).map(id => exports.selectionEntries.find(x => x.id === id)); }
function selectionSummary(ids) { return selectedEntries(ids).map(x => x.title + ' [' + x.id + ']' + (x.kind === 'reference' ? '\nKaynak, ' + (pinterest_1.pinLookup[x.id.slice(4)]?.canonical || 'https://pin.it/' + x.id.slice(4)) : '')); }
function inspirationTarget(id) { return id ? exports.selectionEntries.find(x => x.id === id && ['concept', 'reference'].includes(x.kind)) || null : null; }
function targetElementId(id) { return 'ilham-' + id.replace(/[^a-zA-Z0-9_-]/g, '-'); }

},
"src/lib/service-content":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceContent = void 0;
exports.serviceContent = {
    'kahve-kosesi': { title: 'Kahve köşesi dolabı. Makinenizden başlayalım.', intro: 'Bir kahve alanını yalnız dolabın eniyle planlamayalım. Makineyi kullanırken, temizlerken ve fincan hazırlarken yaptığınız hareketleri de konuşalım.', sections: [
            ['Makinenin ölçüsü tek başına yetmez.', 'Marka ve modeli, su haznesinin nasıl çıkarıldığını ve varsa üst kapağın açılma yönünü paylaşın. Cihazın üretici belgesindeki kullanım ve havalandırma boşluklarını ayrıca kontrol edelim. Her makineye uyan tek bir niş derinliği vermek doğru olmaz.'],
            ['Açık raf mı, kapalı depolama mı?', 'Günlük fincanları el altında tutmakla yedek ekipmanları saklamak farklı ihtiyaçlar. Görünmesini istediğiniz parçaları, kapalı dolapta duracakları ve çekmeceye ayıracağınız küçük gereçleri üç grupta düşünün.'],
            ['Servis yüzeyi de çalışma alanıdır.', 'Makinenin yanında fincan koyacağınız, öğütücüyü kullanacağınız veya ekipmanı temizleyeceğiniz yüzeyi tarif edin. Kablo çıkışı, priz konumu, su bağlantısı ve aydınlatma ayrı kararlardır. Elektrik ve tesisat işinin teklife dahil olduğunu varsaymayın.'],
            ['Fotoğraftaki ayrıntıyı kendi alanınıza uyarlayın.', 'Kemerli orta bölüm, cam yan vitrin ve alt çekmeceler, arşivdeki gerçek örnekte birlikte görülebilir. Aynı görünümün sizin alanınızda nasıl çalışacağı cihaz ve ölçü bilgisiyle değerlendirilir. Fotoğraftan malzeme markası, fiyat veya teslim süresi çıkarılmaz.']
        ], preparation: ['Makinenin marka/modeli veya ürün belgesi.', 'Hazne ve kapak açılırken çekilmiş bir fotoğraf.', 'Duvarın tamamı, yaklaşık en ve priz konumları.', 'Açıkta kalmasını ve saklanmasını istediğiniz ekipmanlar.'], project: 'kemerli-kahve-kosesi', note: 'Üretim ölçüsü değildir. Cihaz açıklıkları üretici bilgisiyle, mobilya ve uygulama kapsamı Yunus Usta ile ayrıca teyit edilir.' },
    'mutfak': { title: 'Mutfak dolabı. Görünüm kadar günlük düzen.', intro: 'Mevcut alanı, korunacak cihazları ve sık kullandığınız eşyaları birlikte ele alalım. Bir planın fotoğrafta güzel görünmesi, sizin mutfağınıza aynen uyacağı anlamına gelmez.', sections: [
            ['Önce korunacakları belirleyin.', 'Beyaz eşya, tezgâh, evye ve tesisattan hangileri kalacak? Cihaz marka/modelini ve mevcut bağlantı noktalarını paylaşın. Dolap siparişi, tezgâh veya elektrik işlerinin otomatik olarak dahil olduğu anlamına gelmez.'],
            ['Çekmece ve kapağı kullanımına göre seçin.', 'Tencere, tabak, kuru gıda ve temizlik malzemelerinin nerede duracağını düşünün. Bir çekmecenin açılması için gereken alanı yalnız kapalı dolap ölçüsünden anlayamayız. Geçişler, kapılar ve karşıdaki mobilya da yerleşimin parçasıdır.'],
            ['Aynı ölçü, aynı teklif demek değildir.', 'Gövde, kapak, yüzey, ray ve menteşeleri ayrı kalemler olarak konuşun. İki teklifi karşılaştırırken yalnız toplam tutara değil, donanım ve montaj kapsamına da bakın. Gerçek ürün seçimi ve numune onayı olmadan aynı renk aynı malzeme sayılmaz.'],
            ['Yaklaşık ölçüyle başlayın, son ölçüyü onaylayın.', 'Duvar boyunca yaklaşık en, tavan yüksekliği, pencere ve kapı konumları ilk görüşmeye yardımcı olur. Fotoğraf ve ölçü hazırlığı, yerinde inceleme ya da imalata esas son ölçünün yerine geçmez.']
        ], preparation: ['Mekânın iki köşesinden genel fotoğraf.', 'Kalacak cihazların marka/model listesi.', 'Yaklaşık duvar ölçüleri ve pencere/kapı konumları.', 'Bugünkü mutfakta zorlandığınız üç kullanım durumu.'], project: 'sade-kose-mutfak', note: 'Üretim öncesinde son ölçü, kapak ve donanım, tezgâh, tesisat, taşıma ve montaj kapsamları yazılı olarak netleşir.' },
    'tv-unitesi': { title: 'TV ünitesi. Ekran, kablo ve depolama bir arada.', intro: 'Panelin görünümünü seçmeden önce ekranınızı, diğer cihazları ve duvarın kullanımını konuşalım. Yalnız televizyonun inç ölçüsü bütün yerleşimi tarif etmez.', sections: [
            ['Ekranı ve diğer cihazları birlikte listeleyin.', 'TV modeli, ayak veya askı tercihi, ses sistemi, oyun konsolu ve modem gibi cihazları belirtin. Üreticinin montaj ve havalandırma talimatları cihaz özelinde değerlendirilmelidir. Evrensel askı yüksekliği veya kapalı raf ölçüsü vermiyoruz.'],
            ['Kablolar gizlensin, erişim kaybolmasın.', 'Priz, anten ve veri noktalarının fotoğrafını paylaşın. Günlük kullanımda görünmeyen bir kablonun bakım veya cihaz değişiminde erişilebilir olması da önemlidir. Panel ve dolabın arkasına nasıl ulaşılacağını tasarım görüşmesinde sorun.'],
            ['Sergileme ile depolamayı ayırın.', 'Kitap, dekor ve kapalı tutulacak cihazlar için farklı alanlar gerekebilir. Açık raf, cam bölüm ve kapaklı alt dolap seçeneklerini neyi kullanacağınız üzerinden karşılaştırın. Aydınlatma ve elektrik bağlantıları ayrı iş kapsamlarıdır.'],
            ['Duvar ve geçiş alanı belirleyicidir.', 'Duvarın eni, kapı açılımı, süpürgelik ve yakın mobilyalar yerleşimi etkiler. Duvara sabitleme uygunluğu ve taşıma ihtiyacı yerinde kontrol edilmelidir. Bir arşiv fotoğrafı duvarınızın taşıma kapasitesini kanıtlamaz.']
        ], preparation: ['TV marka/modeli, ayak veya askı tercihi.', 'Ses sistemi ve diğer cihazların listesi.', 'Duvarın tamamı ve bağlantı noktalarının fotoğrafı.', 'Saklanacak eşyalar ve açıkta sergilenecek parçalar.'], project: 'isikli-tv-unitesi', note: 'Üretim ölçüsü, duvar bağlantısı ve cihaz gereklilikleri ayrıca kontrol edilir. Görseldeki TV, dekor ve elektrik işleri kendiliğinden teklif kapsamına girmez.' },
    'gardrop': { title: 'Gardırop. Önce içinde yaşayacak düzen.', intro: 'Askıdaki kıyafetler, katlanan parçalar ve küçük eşyalar aynı depolama ihtiyacı değildir. Dış görünümü seçmeden önce içeride neye yer ayıracağınızı konuşalım.', sections: [
            ['Askı, raf ve çekmeceyi ayrı düşünün.', 'Uzun giysiler, katlanmış kıyafetler, çantalar ve küçük parçalar için önceliklerinizi sıralayın. Günlük kullandıklarınız ile mevsimlik sakladıklarınızın aynı yerde durması gerekmeyebilir. İç düzeni eşya listenizle değerlendirelim.'],
            ['Kapak açıkken odanız nasıl kullanılıyor?', 'Dolabın karşısındaki yatak veya diğer mobilyalar, oda kapısı ve geçiş yönü birlikte ele alınır. Sürgülü veya menteşeli kapağı yalnız görünümüne göre değil, açıldığında ulaşmak istediğiniz bölmelere göre konuşun. Kesin açıklık ve donanım uygunluğu ayrıca teyit edilir.'],
            ['Görünür olanla saklanacak olanı ayırın.', 'Açık raf, cam kapak ve kapalı bölmeler farklı tercihlerdir. Cam kapaklı köşe uygulamasında raf ve askı alanları görülüyor. İçerideki eşyalarınızın ne kadar görünmesini istediğinizi bu örnek üzerinden anlatabilirsiniz.']
        ], preparation: ['Askıda, rafta ve çekmecede tutacağınız eşya grupları.', 'Dolap duvarını, oda kapısını ve karşı mobilyayı gösteren fotoğraf.', 'Varsa yaklaşık en, derinlik ve yükseklik.', 'Açık raf, cam veya kapalı kapak tercihiniz.'], project: 'cam-kapak-giyinme', note: 'Bu bir görüşme hazırlığıdır. Son ölçü, iç bölmeler, sabitleme ve donanım kapasitesi üretim öncesinde ayrıca değerlendirilir.' },
    'vestiyer': { title: 'Antre. Evinize nasıl giriyorsunuz?', intro: 'Montu bırakmak, ayakkabıyı değiştirmek, anahtarı bulmak. Girişteki düzeni günlük hareketlerinizden başlayarak birlikte düşünelim.', sections: [
            ['Günlük eşyaları ayrı bir gruba alın.', 'Sık kullanılan ayakkabı ve montlarla yedek ya da mevsimlik eşyaları ayırın. Açık askılık mı, kapalı depolama mı sizin için daha kullanışlı olacak? Çanta ve küçük eşyaların yerini de ilk konuşmaya katın.'],
            ['Oturma ve servis yüzeyi ihtiyacını tarif edin.', 'Ayakkabı değiştirirken oturmak, kısa süreli çanta bırakmak veya ayna kullanmak isteyebilirsiniz. Bank, çekmece ve rafın birlikte çözülüp çözülemeyeceği alanla değerlendirilir. Bir fotoğraf oturma elemanının taşıma kapasitesini göstermez.'],
            ['Kapı açılımını ve erişilecek noktaları gösterin.', 'Giriş kapısının hareketi, süpürgelik, priz ve erişimi korunacak pano gibi noktaları fotoğrafa dahil edin. Depolama eklerken geçişi ve günlük erişimi nasıl koruyacağınızı görüşelim.']
        ], preparation: ['Giriş alanının ve kapının açık hâlinin fotoğrafı.', 'Günlük mont, ayakkabı ve çanta ihtiyacı.', 'Oturma, ayna ve küçük eşya yüzeyi tercihi.', 'Varsa yaklaşık duvar ölçüsü ve erişilecek noktalar.'], project: 'rafli-depolama', note: 'Arşiv örneği açık raflı depolamadır. Fotoğrafın özgün kullanım yerini varsaymıyoruz. Sizin antrenize uygunluk, ölçü ve uygulama koşullarıyla ayrıca belirlenir.' },
    'sehpa': { title: 'Sehpa ve zigon. Bir arada mı, ayrı ayrı mı?', intro: 'Bir orta yüzey mi, koltuğun yanına taşınabilen küçük parçalar mı gerekiyor? Seçimi yalnız form üzerinden değil, kullanım senaryonuzla birlikte yapalım.', sections: [
            ['Kullanacağınız anı anlatın.', 'Kitap bırakmak, içecek servis etmek veya misafir geldiğinde farklı noktalara yüzey açmak ayrı ihtiyaçlar. Tek orta sehpa, yan sehpa ve zigon seçeneklerini hangi anda kullanacağınızı düşünerek karşılaştırın.'],
            ['Kapalı ve açılmış düzeni birlikte düşünün.', 'İç içe duran parçaların ayrıldığında nerede kullanılacağını ve kullanılmadığında nerede duracağını tarif edin. Oturma düzeni ile dolaşım alanı, yalnız bir sehpanın en ve boyundan daha fazla bilgi verir.'],
            ['Kenar ve yüzey tercihinizi belirleyin.', 'Oval ya da köşeli form, açık veya koyu ton ve depolama isteği konuşulabilir. Kenar biçimi tek başına güvenlik garantisi değildir. Gerçek malzeme, yüzey işlemi ve bakım koşulları numune ve ürün bilgisiyle netleşir.']
        ], preparation: ['Koltuk düzenini ve mevcut sehpayı gösteren fotoğraf.', 'Tek yüzey veya ayrı kullanılan parçalar tercihi.', 'Kullanılmadığında saklama veya iç içe toplama ihtiyacı.', 'Beğendiğiniz form ve değiştirmek istediğiniz ayrıntı.'], concept: 'oval-orta-sehpa', note: 'Bu kategorinin örneği bir konsept görseldir, tamamlanmış atölye işi değildir. Üretim ölçüsü, gerçek malzeme ve kullanılabilirlik ayrıca değerlendirilir.' },
    'pergola': { title: 'Açık alan. Önce yeri ve koşulları tanıyalım.', intro: 'Bir bahçe fotoğrafı iyi bir başlangıçtır. Zemin, çevre ve kullanım koşullarını bilmeden taşıyıcı veya bağlantı çözümü belirlemeyelim.', sections: [
            ['Alanı ve erişimi gösterin.', 'Çalışmanın düşünüldüğü yer, çevresindeki yapılar, zemin ve taşıma erişimini gösteren fotoğraflarla başlayın. İlk ölçüler saha değerlendirmesinin ve teknik projenin yerine geçmez.'],
            ['Kullanım ve maruziyeti tarif edin.', 'Oturma, gölgelenme veya başka bir kullanım mı düşünüyorsunuz? Alanın yağış ve rüzgârla ilişkisi, çatı yaklaşımı ve drenaj gereksinimi yetkin teknik değerlendirmeyle ele alınmalıdır.'],
            ['Kapsamı baştan ayırın.', 'Ahşap yapı, zemin hazırlığı, çatı, elektrik ve bakım farklı iş kalemleri olabilir. Gerekli izinler, taşıyıcı hesapları ve uygulama sorumlulukları netleşmeden bir görsel üretim onayı değildir.']
        ], preparation: ['Alanı ve çevresini gösteren genel fotoğraflar.', 'Zemin hakkında bildikleriniz ve erişim koşulları.', 'Kullanım amacınız ve yaklaşık yerleşim düşünceniz.'], project: 'ahsap-bahce-kamelyasi', note: 'Açıklık, taşıma kapasitesi veya bağlantı hesabı burada verilmez. Güvenli uygulama için saha koşulları, teknik proje ve gerekli izinler ayrıca değerlendirilir.' },
    'ozel-tasarim': { title: 'Özel tasarım. Fikrin hangi ayrıntısını koruyalım?', intro: 'Hazır bir çiziminiz olması gerekmiyor. Bir fotoğraf, bağlantı ya da birkaç cümleyle neyi sevdiğinizi anlatabilirsiniz.', sections: [
            ['Beğendiğiniz özelliği seçin.', 'Form, doku, depolama düzeni veya hareketli bir parça. Referansta sizin için asıl önemli olan ayrıntıyı tarif edin. Görseldeki her şeyin aynı biçimde üretilmesini istemek zorunda değilsiniz.'],
            ['Değişmesini istediğinizi ekleyin.', 'Daha küçük bir ölçü, farklı bir ton veya başka bir kullanım önceliğiniz olabilir. Sizin notunuz ile referansın açıklamasını ayrı tutarak başlayalım.'],
            ['Uygunluğu birlikte değerlendirelim.', 'Mekân, malzeme, donanım ve mekanizma, atölye görüşmesinde netleşir. Bir referans veya 3D konsept, teknik çizim ya da kesin üretim taahhüdü değildir.']
        ], preparation: ['Bir fotoğraf, çizim, bağlantı veya kısa fikir notu.', 'Korumak ve değiştirmek istediğiniz özellikler.', 'Kullanılacağı alan ve varsa yaklaşık ölçü.'], project: 'yatak-cevresi-depolama', note: 'İlk görüşme, tasarım onayı ve kesin teklif farklı adımlardır. Son ölçü ve kapsam üretimden önce ayrıca kararlaştırılır.' }
};

},
"src/lib/site-profile":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSiteProfile = getSiteProfile;
const base = { email: 'iletisim.eliftasarimatolyesi@gmail.com', hours: null, address: null, social: [], verifiedAt: '2026-09-27' };
function getSiteProfile() { return { ...base, social: [...base.social], address: base.address ? { ...base.address } : null }; }

},
"src/lib/source-context":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sourceContext = sourceContext;
const portfolio_1 = require("./portfolio");
const pinterest_1 = require("./pinterest");
const model_request_1 = require("./model-request");
function sourceContext(query) {
    const site = (typeof window !== 'undefined' && window.__ELIF_SITE_URL__ || 'https://onourimpram.github.io/elif-tasarim').replace(/\/$/, ''), q = new URLSearchParams(query), id = q.get('kaynak') || '', category = portfolio_1.workCategories.some(c => c.id === q.get('kategori')) ? q.get('kategori') : 'ozel-tasarim';
    const w = portfolio_1.works.find(w => id === 'work:' + w.id), c = portfolio_1.concepts.find(c => id === 'concept:' + c.id), p = portfolio_1.pinterestReferences.find(p => id === 'pin:' + p.id);
    if (w)
        return { key: id, seed: { category: w.category, url: '', systemPrefill: w.subtitle + ' benzeri bir çalışmayı alanıma göre değerlendirmek istiyorum.', sourceRef: { id, kind: 'work', title: w.subtitle, url: site + '/proje/' + w.id + '/', image: w.images[0] } } };
    if (c)
        return { key: id, seed: { category: c.category, url: '', systemPrefill: c.subtitle + ' fikrinden başlayarak kendi modelimi konuşmak istiyorum.', sourceRef: { id, kind: 'concept', title: c.subtitle, url: site + '/ilham-modelleri/', image: c.image } } };
    if (p) {
        const url = 'https://pin.it/' + p.id;
        return { key: id, seed: { category: p.category, url, systemPrefill: 'Bu dış kaynak modelinden ilhamla bir çalışma istiyorum.', sourceRef: { id, kind: 'reference', title: pinterest_1.pinLookup[p.id]?.label || p.title, url } } };
    }
    if (!q.has('ref') && !q.has('fikir') && !q.has('kategori'))
        return null;
    const url = (0, model_request_1.normalizeReference)(q.get('ref') || '') || '', note = (q.get('fikir') || '').slice(0, 1600);
    return { key: new URLSearchParams({ category, url, note }).toString(), seed: { category, url, systemPrefill: note, sourceRef: { id: 'input', kind: url ? 'reference' : 'idea', title: url ? 'Paylaştığınız model' : (0, portfolio_1.categoryName)(category) + ' fikri', url } } };
}

},
"src/lib/studio-presets":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studioPresets = void 0;
exports.presetHref = presetHref;
const desk_v8_1 = require("./desk-v8");
exports.studioPresets = [
    { id: 'odak', title: 'Odak', subtitle: 'Toplu bir çalışma düzeni.', finish: 'Doğal meşe görünümü', width: 160, depth: 75, height: 80, angle: 0, material: 'mese', image: 'devir-odak-v23.webp' },
    { id: 'akis', title: 'Akış', subtitle: 'İki yüzey, tek çalışma düzeni.', finish: 'Ceviz görünümü', width: 180, depth: 80, height: 80, angle: 90, material: 'ceviz', image: 'devir-akis-v23.webp' },
    { id: 'hareket', title: 'Hareket', subtitle: 'Ayakta kullanım için bir başlangıç.', finish: 'Koyu ahşap görünümü', width: 200, depth: 85, height: 110, angle: 180, material: 'koyu', image: 'devir-hareket-v23.webp' }
];
function presetHref(p) {
    const config = { ...desk_v8_1.defaultStudio, width: p.width, depth: p.depth, height: p.height, material: p.material, angle: p.angle };
    return '/tasarim-masasi?' + (0, desk_v8_1.studioQuery)(config);
}

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
const context = window;
const html = document.documentElement;
if (context.__ELIF_BASE__ === undefined)
    context.__ELIF_BASE__ = html.dataset.base || '';
if (context.__ELIF_SITE_URL__ === undefined)
    context.__ELIF_SITE_URL__ = html.dataset.site;
if (context.__ELIF_INITIAL__ === undefined)
    context.__ELIF_INITIAL__ = html.dataset.route || '/';
const root = document.getElementById('app');
if (!root)
    throw new Error('Uygulama kökü bulunamadı');
(0, client_1.createRoot)(root).render((0, react_1.createElement)(App_1.default, { initialPath: window.__ELIF_INITIAL__ || "/" }));

},
"src/pages/BasicContact":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicContact = BasicContact;
const react_1 = require("react");
const ui_1 = require("../components/ui");
const TextCopy_1 = require("../components/TextCopy");
const project_1 = require("../lib/project");
const site_profile_1 = require("../lib/site-profile");
const contact_options_1 = require("../lib/contact-options");
const message = 'Merhaba Yunus Usta.\nYaptırmak istediğim ürün,\nYaklaşık ölçü veya kullanım alanı,\nBulunduğum ilçe,\nBenim için önemli ayrıntılar,';
function BasicContact(a) {
    const email = (0, site_profile_1.getSiteProfile)().email, mail = (0, contact_options_1.emailDraft)(message);
    return (0, react_1.createElement)(react_1.Fragment, null,
        (0, react_1.createElement)("header", { className: "v6-page-head wrap" },
            (0, react_1.createElement)(ui_1.Eyebrow, null, "EL\u0130F / KOLAY \u0130LET\u0130\u015E\u0130M"),
            (0, react_1.createElement)("div", null,
                (0, react_1.createElement)("h1", null,
                    "Tek bir mesajla",
                    (0, react_1.createElement)("br", null),
                    (0, react_1.createElement)("em", null, "ba\u015Flayabiliriz.")),
                (0, react_1.createElement)("p", null, "Form doldurman\u0131z gerekmiyor. Fikrinizi size uygun ileti\u015Fim yoluyla do\u011Frudan at\u00F6lyeye ula\u015Ft\u0131r\u0131n."))),
        (0, react_1.createElement)("section", { className: "wrap v22-basic-contact" },
            (0, react_1.createElement)("div", { className: "v22-contact-card" },
                (0, react_1.createElement)(ui_1.Eyebrow, null, "YUNUS USTA \u0130LE G\u00D6R\u00DC\u015E\u00DCN"),
                (0, react_1.createElement)("h2", null, "\u00D6nce ihtiyac\u0131n\u0131z\u0131 konu\u015Fal\u0131m."),
                (0, react_1.createElement)("p", null, "Foto\u011Fraf, ba\u011Flant\u0131 veya birka\u00E7 c\u00FCmle yeterli. Kesin \u00F6l\u00E7\u00FC ve malzeme se\u00E7imi g\u00F6r\u00FC\u015Fmede netle\u015Fir."),
                (0, react_1.createElement)("a", { className: "v22-visible-email", href: mail.href }, email),
                (0, react_1.createElement)("p", null,
                    (0, react_1.createElement)("a", { href: 'tel:' + project_1.business.telephone }, project_1.business.display)),
                (0, react_1.createElement)("div", { className: "action-row" },
                    (0, react_1.createElement)("a", { className: "button", href: mail.href },
                        "E-posta yaz ",
                        (0, react_1.createElement)(ui_1.Icon, { name: "diagonal" })),
                    (0, react_1.createElement)("a", { className: "button button-outline", href: (0, project_1.whatsappUrl)(message), target: "_blank", rel: "noopener noreferrer" },
                        "WhatsApp\u2019ta yaz ",
                        (0, react_1.createElement)(ui_1.Icon, { name: "diagonal" })),
                    (0, react_1.createElement)("a", { className: "button button-outline", href: (0, contact_options_1.smsUrl)() }, "SMS uygulamas\u0131n\u0131 a\u00E7")),
                (0, react_1.createElement)("p", { className: "field-hint" }, "Bu ba\u011Flant\u0131lar ileti\u015Fim uygulaman\u0131z\u0131 a\u00E7ar. Mesaj\u0131 siz g\u00F6nderirsiniz. E-posta uygulamas\u0131 a\u00E7\u0131lmazsa g\u00F6r\u00FCnen adresi kendi e-posta hesab\u0131n\u0131zda kullanabilirsiniz.")),
            (0, react_1.createElement)("div", { className: "v22-contact-template" },
                (0, react_1.createElement)(ui_1.Eyebrow, null, "\u0130LK MESAJ \u0130\u00C7\u0130N KISA B\u0130R YOL"),
                (0, react_1.createElement)("h2", null, "Fikrinizi b\u00F6yle anlatabilirsiniz."),
                (0, react_1.createElement)("pre", null, message),
                (0, react_1.createElement)(TextCopy_1.TextCopy, { id: "v22-basic-copy", label: "Ba\u015Flang\u0131\u00E7 metnini kopyala", text: message }),
                (0, react_1.createElement)("p", null, "Foto\u011Fraflar\u0131 ve \u00E7izimleri mesaj\u0131n\u0131za ayr\u0131ca ekleyin. Adres ve ziyaret d\u00FCzenini yola \u00E7\u0131kmadan Yunus Usta ile teyit edin."),
                (0, react_1.createElement)(ui_1.ButtonLink, { to: "/modelini-getir", navigate: a.navigate, secondary: true }, "Ayr\u0131nt\u0131l\u0131 proje \u00F6zeti haz\u0131rlayay\u0131m"))));
}

},
"src/pages/BedCollection":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BedCollection = exports.BedCard = void 0;
const react_1 = require("react");
const ui_1 = require("../components/ui");
const PortfolioUI_1 = require("../components/PortfolioUI");
const beds_1 = require("../lib/beds");
const portfolio_1 = require("../lib/portfolio");
const selections_1 = require("../lib/selections");
const viewLabel = (open) => open ? 'Depolama görünümü' : 'Kapalı görünüm';
class BedCard extends react_1.Component {
    constructor() {
        super(...arguments);
        this.state = { open: false, zoom: false };
    }
    render() {
        const { bed: b, actions: a, navigate } = this.props, s = this.state, id = 'concept:' + b.id, asset = s.open ? b.openImage : b.image;
        const choices = (large = false) => (0, react_1.createElement)("div", { className: 'bed-view-controls' + (large ? ' bed-view-controls-large' : ''), role: "group", "aria-label": b.title + ' görünümü' }, [false, true].map(open => (0, react_1.createElement)("button", { key: String(open), type: "button", "aria-pressed": s.open === open, onClick: () => this.setState({ open }) }, viewLabel(open))));
        return (0, react_1.createElement)("article", { className: "bed-card", id: (0, selections_1.targetElementId)(id), tabIndex: -1, "data-bed": b.id },
            (0, react_1.createElement)("div", { className: "bed-card-image" },
                (0, react_1.createElement)("button", { type: "button", className: "bed-zoom", "aria-haspopup": "dialog", "aria-label": b.title + ' görselini büyüt', onClick: () => this.setState({ zoom: true }) },
                    (0, react_1.createElement)(PortfolioUI_1.VImage, { asset: asset, alt: b.title + '. ' + viewLabel(s.open) + '. Yapay zekâ ile hazırlanmış baza konsepti.', sizes: "(max-width: 700px) 92vw, (max-width: 1100px) 46vw, 580px" }),
                    (0, react_1.createElement)("span", { className: "bed-zoom-hint" },
                        (0, react_1.createElement)(ui_1.Icon, { name: "search", size: 16 }),
                        "B\u00FCy\u00FCt"))),
            choices(),
            (0, react_1.createElement)("div", { className: "bed-card-copy" },
                (0, react_1.createElement)("div", { className: "bed-card-meta" },
                    (0, react_1.createElement)(PortfolioUI_1.SourceTag, { kind: "concept" }),
                    (0, react_1.createElement)("span", null, b.group === 'wood' ? 'Ahşap ağırlıklı' : 'Döşemeli yorum')),
                (0, react_1.createElement)("h3", null, b.title),
                (0, react_1.createElement)("p", { className: "bed-material" }, b.material),
                (0, react_1.createElement)("p", null, b.description),
                (0, react_1.createElement)("details", { className: "bed-details" },
                    (0, react_1.createElement)("summary", null, "Tasar\u0131m ayr\u0131nt\u0131lar\u0131"),
                    (0, react_1.createElement)("ul", null, b.details.map(d => (0, react_1.createElement)("li", { key: d }, d))),
                    (0, react_1.createElement)("p", null, "Ah\u015Fap t\u00FCr\u00FC, kaplama, kuma\u015F ve mekanizma se\u00E7imi numune ve teknik de\u011Ferlendirmeyle kesinle\u015Fir. G\u00F6rseldeki donan\u0131m bir g\u00FCvenlik veya ta\u015F\u0131ma kapasitesi beyan\u0131 de\u011Fildir."),
                    (0, react_1.createElement)("p", { className: "bed-direct-views" },
                        (0, react_1.createElement)("a", { href: (0, ui_1.image)(b.image + '-full.webp'), target: "_blank", rel: "noopener noreferrer" }, "Kapal\u0131 g\u00F6rseli a\u00E7"),
                        (0, react_1.createElement)("a", { href: (0, ui_1.image)(b.openImage + '-full.webp'), target: "_blank", rel: "noopener noreferrer" }, "Depolama g\u00F6rselini a\u00E7"))),
                (0, react_1.createElement)("div", { className: "bed-actions" },
                    (0, react_1.createElement)(ui_1.TextLink, { to: (0, portfolio_1.modelHref)('', b.category, b.subtitle + ' üzerine konuşmak istiyorum.'), navigate: navigate }, "Bu modeli konu\u015Fal\u0131m"),
                    a && (0, react_1.createElement)("button", { type: "button", className: "bed-save", "aria-label": (a.favorites.includes(id) ? 'İlham dosyasından çıkar. ' : 'İlham dosyama ekle. ') + b.title, "aria-pressed": a.favorites.includes(id), onClick: () => a.favorite(id) },
                        (0, react_1.createElement)(ui_1.Icon, { name: "heart", size: 18 }),
                        (0, react_1.createElement)("span", null, a.favorites.includes(id) ? 'Kaydedildi' : 'Kaydet')))),
            s.zoom && (0, react_1.createElement)(ui_1.Dialog, { title: b.title + ' · Konsept model', onClose: () => this.setState({ zoom: false }) },
                (0, react_1.createElement)("div", { className: "bed-gallery", onKeyDown: e => { if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                        e.preventDefault();
                        this.setState({ open: !s.open });
                    } } },
                    (0, react_1.createElement)(PortfolioUI_1.VImage, { asset: asset, alt: b.title + '. ' + viewLabel(s.open) + '. Baza tasarım konsepti.', eager: true, full: true, sizes: "(max-width: 700px) 92vw, 1000px" }),
                    choices(true),
                    (0, react_1.createElement)("p", { className: "bed-gallery-note" },
                        viewLabel(s.open),
                        ". Yapay zek\u00E2 ile haz\u0131rlanm\u0131\u015F tasar\u0131m g\u00F6rselidir. Bitmi\u015F at\u00F6lye i\u015Fi veya teknik \u00FCretim \u00E7izimi de\u011Fildir."))));
    }
}
exports.BedCard = BedCard;
class BedCollection extends react_1.Component {
    constructor() {
        super(...arguments);
        this.state = { group: 'all' };
        this.focusModel = () => { if (this.focusFrame !== undefined)
            cancelAnimationFrame(this.focusFrame); const id = new URLSearchParams(this.props.query || '').get('model'); if (!id || !beds_1.beds.some(b => b.id === id))
            return; this.setState({ group: 'all' }, () => { this.focusFrame = requestAnimationFrame(() => { this.focusFrame = requestAnimationFrame(() => { const node = document.getElementById((0, selections_1.targetElementId)('concept:' + id)); node?.focus({ preventScroll: true }); node?.scrollIntoView({ block: 'start', behavior: 'instant' }); }); }); }); };
    }
    componentDidMount() { this.focusModel(); }
    componentDidUpdate(previous) { if (previous.query !== this.props.query)
        this.focusModel(); }
    componentWillUnmount() { if (this.focusFrame !== undefined)
        cancelAnimationFrame(this.focusFrame); }
    render() {
        const a = this.props, items = beds_1.beds.filter(b => this.state.group === 'all' || b.group === this.state.group);
        return (0, react_1.createElement)(react_1.Fragment, null,
            (0, react_1.createElement)("header", { className: "wrap bed-collection-hero" },
                (0, react_1.createElement)("div", { className: "bed-hero-copy" },
                    (0, react_1.createElement)(ui_1.Link, { to: "/kategoriler", navigate: a.navigate, className: "bed-back" },
                        "\u00DCretim alanlar\u0131 ",
                        (0, react_1.createElement)(ui_1.Icon, { size: 16 })),
                    (0, react_1.createElement)(ui_1.Eyebrow, null, "EL\u0130F / BAZA VE YATAK"),
                    (0, react_1.createElement)("h1", null,
                        "G\u00FCn\u00FCn sonunda,",
                        (0, react_1.createElement)("br", null),
                        (0, react_1.createElement)("em", null, "size ait bir yer.")),
                    (0, react_1.createElement)("p", null, "Ah\u015Fab\u0131n karakteri, d\u00F6\u015Femenin yumu\u015Fakl\u0131\u011F\u0131 ve saklamaya ayr\u0131lan alan. Yatak odan\u0131z i\u00E7in sekiz farkl\u0131 ba\u015Flang\u0131\u00E7 fikri."),
                    (0, react_1.createElement)("a", { className: "button", href: "#baza-seckisi" },
                        "Modelleri ke\u015Ffedin ",
                        (0, react_1.createElement)(ui_1.Icon, null)),
                    (0, react_1.createElement)("p", { className: "bed-hero-disclosure" }, "Bu se\u00E7ki, yapay zek\u00E2 ile haz\u0131rlanm\u0131\u015F tasar\u0131m konseptlerinden olu\u015Fur. Tamamlanm\u0131\u015F at\u00F6lye i\u015Fi, stok \u00FCr\u00FCn\u00FC veya \u00FCretim onay\u0131 de\u011Fildir.")),
                (0, react_1.createElement)("figure", { className: "bed-hero-visual" },
                    (0, react_1.createElement)(PortfolioUI_1.VImage, { asset: "bed-ceviz-yalin-open", alt: "Ceviz Yal\u0131n baza konseptinin a\u00E7\u0131k depolama g\u00F6r\u00FCn\u00FCm\u00FC. Ah\u015Fap g\u00F6r\u00FCn\u00FCml\u00FC g\u00F6vde ve krem ba\u015Fl\u0131k.", eager: true, full: true, priority: "high", sizes: "(max-width: 800px) 100vw, 58vw" }),
                    (0, react_1.createElement)("figcaption", null,
                        (0, react_1.createElement)("span", null, "Ceviz Yal\u0131n"),
                        (0, react_1.createElement)("span", null, "Ah\u015Fap a\u011F\u0131rl\u0131kl\u0131 konsept")))),
            (0, react_1.createElement)("div", { className: "wrap bed-collection-summary" },
                (0, react_1.createElement)("span", null,
                    (0, react_1.createElement)("strong", null, "08"),
                    " tasar\u0131m yorumu"),
                (0, react_1.createElement)("span", null,
                    (0, react_1.createElement)("strong", null, "04"),
                    " ah\u015Fap a\u011F\u0131rl\u0131kl\u0131 model"),
                (0, react_1.createElement)("span", null,
                    (0, react_1.createElement)("strong", null, "02"),
                    " g\u00F6r\u00FCn\u00FCm, her modelde")),
            (0, react_1.createElement)("section", { className: "wrap bed-collection", id: "baza-seckisi" },
                (0, react_1.createElement)("div", { className: "v6-heading" },
                    (0, react_1.createElement)("div", null,
                        (0, react_1.createElement)(ui_1.Eyebrow, null, "BA\u015ELIKTAN G\u00D6VDEYE B\u0130R B\u00DCT\u00DCN"),
                        (0, react_1.createElement)("h2", null,
                            "Dokusu farkl\u0131.",
                            (0, react_1.createElement)("br", null),
                            (0, react_1.createElement)("em", null, "\u0130htiyac\u0131 sizin."))),
                    (0, react_1.createElement)("p", null, "Kapal\u0131 g\u00F6r\u00FCn\u00FCmde \u00E7izgisini, depolama g\u00F6r\u00FCn\u00FCm\u00FCnde i\u00E7 d\u00FCzen fikrini inceleyin. Be\u011Fendi\u011Finiz modeli kaydedin veya do\u011Frudan o fikirle g\u00F6r\u00FC\u015Fmeye ba\u015Flay\u0131n.")),
                (0, react_1.createElement)("div", { className: "bed-filter-row" },
                    (0, react_1.createElement)("div", { className: "filter-chips", role: "group", "aria-label": "Baza tasar\u0131m t\u00FCr\u00FC" }, [['all', 'Tüm modeller'], ['wood', 'Ahşap ağırlıklı'], ['upholstered', 'Döşemeli yorumlar']].map(([group, title]) => (0, react_1.createElement)("button", { type: "button", key: group, "aria-pressed": this.state.group === group, onClick: () => this.setState({ group: group }) }, title))),
                    (0, react_1.createElement)("span", { className: "bed-result", role: "status", "aria-live": "polite" },
                        items.length,
                        " model")),
                (0, react_1.createElement)("div", { className: "bed-grid" }, items.map(b => (0, react_1.createElement)(BedCard, { key: b.id, bed: b, navigate: a.navigate, actions: a })))),
            (0, react_1.createElement)("section", { className: "bed-preparation" },
                (0, react_1.createElement)("div", { className: "wrap bed-preparation-inner" },
                    (0, react_1.createElement)("div", null,
                        (0, react_1.createElement)(ui_1.Eyebrow, null, "G\u00D6RSELDEN S\u0130Z\u0130N ODANIZA"),
                        (0, react_1.createElement)("h2", null,
                            "\u00D6l\u00E7\u00FCy\u00FC de\u011Fil,",
                            (0, react_1.createElement)("br", null),
                            (0, react_1.createElement)("em", null, "\u00F6nce ihtiyac\u0131 konu\u015Fal\u0131m.")),
                        (0, react_1.createElement)("p", null, "Buradaki modeller birer ba\u015Flang\u0131\u00E7 noktas\u0131. Se\u00E7ti\u011Finiz \u00E7izgi, odan\u0131z\u0131n ko\u015Fullar\u0131 ve kullan\u0131m\u0131n\u0131zla birlikte de\u011Ferlendirilir."),
                        (0, react_1.createElement)(ui_1.TextLink, { to: "/rehber/malzeme-secimi", navigate: a.navigate }, "Malzeme se\u00E7imini tan\u0131y\u0131n")),
                    (0, react_1.createElement)("div", null,
                        (0, react_1.createElement)(ui_1.Accordion, { items: [
                                ['Ölçü ve yerleşim için neler gerekli?', 'Mevcut yatağınızın eni ve boyu, odadaki geçişler, komodinler ve başlık için ayrılabilen alanla başlayabiliriz. Yaklaşık ölçüler görüşme içindir. Kesin üretim ölçüsü yerinde veya teknik değerlendirmeyle teyit edilir.'],
                                ['Görseldeki ahşap ve kumaş birebir mi?', 'Görseller renk ve tasarım fikrini gösterir. Ceviz veya meşe görünümü, bütün gövdenin masif ahşap olduğu anlamına gelmez. Masif, kaplama, gövde malzemesi, kumaş ve yüzey işlemi ayrı seçilir. Son karar gerçek numuneyle verilir.'],
                                ['Açılır mekanizma nasıl seçilir?', 'Yatak ölçüsü ve ağırlığı, taşıyıcı yapı, bağlantılar, açılma mesafesi ve emniyet donanımı birlikte değerlendirilir. Görselden gazlı amortisör kuvveti veya taşıma kapasitesi belirlenmez. Üretim öncesinde uygun mekanizma ve teknik ayrıntılar usta ve donanım sağlayıcısıyla doğrulanmalıdır.'],
                                ['Fiyat ve teslim kapsamı nasıl netleşir?', 'Baza gövdesi, başlık, döşeme, mekanizma, yatak, komodin, nakliye ve montaj kapsamları teklif aşamasında ayrı konuşulur. Bir görseli seçmek sipariş veya üretim onayı oluşturmaz. Fiyat ve süre, kesinleşen kapsam üzerinden belirlenir.']
                            ] })))),
            (0, react_1.createElement)(PortfolioUI_1.ModelCallout, { navigate: a.navigate }));
    }
}
exports.BedCollection = BedCollection;

},
"src/pages/BringModel":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BringModel = void 0;
const ServiceGuide_1 = require("../components/ServiceGuide");
const react_1 = require("react");
const ui_1 = require("../components/ui");
const PortfolioUI_1 = require("../components/PortfolioUI");
const portfolio_1 = require("../lib/portfolio");
const source_context_1 = require("../lib/source-context");
const model_request_1 = require("../lib/model-request");
const project_1 = require("../lib/project");
const DraftRecovery_1 = require("../components/DraftRecovery");
const ContactHandoff_1 = require("../components/ContactHandoff");
const ProjectReadiness_1 = require("../components/ProjectReadiness");
const draft_session_1 = require("../lib/draft-session");
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
        this.set = (key, value) => { if (key === 'url' && value !== this.state.v.url) {
            project_1.projectStore.clearSource();
            const normalized = (0, model_request_1.normalizeReference)(value);
            if (normalized)
                project_1.projectStore.patch({ sourceRef: { id: 'manual-reference', kind: 'reference', title: 'Paylaştığınız model', url: normalized } });
        } const v = project_1.projectStore.patch({ [key]: value }); this.setState({ v, error: '', errorField: '' }); };
        this.fail = (field, error) => { this.setState({ error, errorField: field, ...(['model-width', 'model-depth', 'model-height'].includes(field) ? { step: 1, detailsOpen: true } : {}) }, () => document.getElementById(field)?.focus()); };
        this.go = (step) => {
            const { v, files } = this.state;
            if (step > this.state.step) {
                if (v.url.trim() && !(0, model_request_1.normalizeReference)(v.url)) {
                    this.fail('model-url', 'Geçerli bir HTTPS bağlantısı kullanın. Özel ağ veya çalıştırılabilir bağlantı kabul edilmez.');
                    return;
                }
                if (!v.url.trim() && v.note.trim().length < 5 && !v.systemPrefill && !files.length && !this.props.favorites.length) {
                    this.fail('model-note', 'Bir bağlantı, fotoğraf, seçki veya en az 5 karakterlik bir fikir ekleyin.');
                    return;
                }
                if (step === 2) {
                    const invalid = (0, project_1.firstInvalidMeasure)(v);
                    if (invalid) {
                        this.fail('model-' + invalid, ({ width: 'En', depth: 'Derinlik', height: 'Yükseklik' }[invalid]) + ' için sıfırdan büyük, en fazla 20000 mm karşılığı bir ölçü girin. Kesin ölçünüz yoksa yaklaşık ölçü seçeneğine dönün.');
                        return;
                    }
                }
            }
            this.setState({ step, error: '', errorField: '' }, () => document.getElementById('model-step-title')?.focus({ preventScroll: true }));
        };
        this.changeUnit = (unit) => { const { v } = this.state; const dims = [v.width, v.depth, v.height].map(n => (0, project_1.convertMeasure)(n, v.unit, unit)); if (dims.some(n => n === null)) {
            this.fail('model-' + ['width', 'depth', 'height'][dims.findIndex(n => n === null)], 'Ölçüleri tek bir ondalık ayırıcıyla yazın. Örneğin 123,5.');
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
            this.setState({ message: 'Tarayıcınız dosya paylaşımını desteklemiyor. Proje dosyasını indirin, Yunus Usta ile WhatsApp görüşmesine ekleyin.' });
            return;
        } try {
            await navigator.share({ files, title: 'Elif Tasarım proje fikrim', text: this.text() });
            this.setState({ message: 'Paylaşım ekranından çıktınız. Mesajın Yunus Usta’ya ulaştığı bu siteden doğrulanamaz.' });
        }
        catch (e) {
            this.setState({ message: e?.name === 'AbortError' ? 'Paylaşım iptal edildi. Fikriniz ve görselleriniz bu sayfada duruyor.' : 'Paylaşım açılamadı. Proje dosyasını indirip WhatsApp görüşmesine ekleyebilirsiniz.' });
        } };
        const ctx = (0, source_context_1.sourceContext)(p.query || '');
        if (ctx)
            project_1.projectStore.adoptReference(ctx.key, ctx.seed);
        const q = new URLSearchParams(p.query || '');
        if (q.has('en')) {
            const dims = ['en', 'derinlik', 'yukseklik'].map(k => q.get(k) || '');
            if (dims.every(n => /^\d{2,3}$/.test(n) && +n > 0 && +n <= 500))
                project_1.projectStore.seed('legacy:' + p.query, { width: dims[0], depth: dims[1], height: dims[2], unit: 'cm', unknown: false, dimensions: dims.join(' × ') + ' cm' }, true);
        }
        const v = project_1.projectStore.get();
        this.state = { step: 0, v, files: project_1.attachmentStore.get(), error: '', errorField: '', loading: false, sharing: false, message: '', detailsOpen: !!p.advanced || !v.unknown };
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
        const a = this.props, { v, files, step, error, errorField } = this.state, selection = (0, selections_1.selectedEntries)(a.favorites), transfer = (0, project_1.whatsappMessage)(this.text());
        return (0, react_1.createElement)(react_1.Fragment, null,
            (0, react_1.createElement)("header", { className: "v6-page-head wrap model-head" },
                (0, react_1.createElement)(ui_1.Eyebrow, null, "EL\u0130F / S\u0130Z\u0130N F\u0130KR\u0130N\u0130Z"),
                (0, react_1.createElement)("div", null,
                    (0, react_1.createElement)("h1", null,
                        (0, react_1.createElement)(react_1.Fragment, null,
                            "Kendi modelinizi getirin.",
                            (0, react_1.createElement)("br", null),
                            (0, react_1.createElement)("em", null, "Birlikte \u00FCretelim."))),
                    (0, react_1.createElement)("p", null, "Bir foto\u011Fraf, ba\u011Flant\u0131 veya birka\u00E7 c\u00FCmle yeterli. \u00D6l\u00E7\u00FCleri hen\u00FCz bilmiyorsan\u0131z ayr\u0131nt\u0131lar\u0131 atlay\u0131p g\u00F6r\u00FC\u015Fme \u00F6zetinize ge\u00E7ebilirsiniz."))),
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
                    (0, react_1.createElement)("ol", { className: "v10-next-steps" },
                        (0, react_1.createElement)("li", null,
                            (0, react_1.createElement)("span", null, "01"),
                            (0, react_1.createElement)("div", null,
                                (0, react_1.createElement)("strong", null, "Fikrinizi haz\u0131rlay\u0131n."),
                                (0, react_1.createElement)("small", null, "Foto\u011Fraf veya birka\u00E7 c\u00FCmle yeter."))),
                        (0, react_1.createElement)("li", null,
                            (0, react_1.createElement)("span", null, "02"),
                            (0, react_1.createElement)("div", null,
                                (0, react_1.createElement)("strong", null, "Tercih etti\u011Finiz kanaldan payla\u015F\u0131n."),
                                (0, react_1.createElement)("small", null, "Telefon, e-posta veya WhatsApp ile ba\u015Flay\u0131n."))),
                        (0, react_1.createElement)("li", null,
                            (0, react_1.createElement)("span", null, "03"),
                            (0, react_1.createElement)("div", null,
                                (0, react_1.createElement)("strong", null, "Uygunlu\u011Fu birlikte konu\u015Fun."),
                                (0, react_1.createElement)("small", null, "\u00D6l\u00E7\u00FC ve kapsam, g\u00F6r\u00FC\u015Fmede netle\u015Fir.")))),
                    (0, react_1.createElement)("a", { className: "v7-direct", href: 'tel:' + project_1.business.telephone },
                        (0, react_1.createElement)(ui_1.Icon, { name: "phone" }),
                        " ",
                        project_1.business.display),
                    (0, react_1.createElement)("p", { className: "fineprint" }, "Yunus Usta. Telefon numaras\u0131 i\u015Fletme i\u00E7in payla\u015F\u0131ld\u0131. Yeni at\u00F6lye adresini ziyaret \u00F6ncesinde g\u00F6r\u00FC\u015Fmede teyit edin."),
                    (0, react_1.createElement)("details", { className: "v11-data-note" },
                        (0, react_1.createElement)("summary", null, "Tasla\u011F\u0131m nerede saklan\u0131yor?"),
                        (0, react_1.createElement)("p", null, "Varsay\u0131lan olarak a\u00E7\u0131k sekmede korunur. Sa\u011Fdaki kurtarma alan\u0131ndan metin ve \u00F6l\u00E7\u00FCleri a\u00E7\u0131k izninizle bu cihazda yedi g\u00FCn saklayabilir veya bir taslak dosyas\u0131na indirebilirsiniz. Foto\u011Fraflar kurtarma kayd\u0131na dahil de\u011Fildir. Otomatik sunucu g\u00F6nderimi yap\u0131lmaz."))),
                (0, react_1.createElement)("div", { className: "model-form" },
                    (0, react_1.createElement)(ServiceGuide_1.PreparationHint, { category: v.category }),
                    (0, react_1.createElement)("div", { className: "v22-form-shortcut" },
                        (0, react_1.createElement)(ui_1.Link, { to: "/kolay-iletisim", navigate: a.navigate },
                            "Form yerine do\u011Frudan ileti\u015Fim kurun ",
                            (0, react_1.createElement)(ui_1.Icon, { size: 16 }))),
                    (0, react_1.createElement)(DraftRecovery_1.DraftRecovery, { onRestore: () => this.setState({ v: project_1.projectStore.get(), files: [], step: 0, error: '', errorField: '', detailsOpen: !project_1.projectStore.get().unknown }) }),
                    (0, react_1.createElement)("nav", { className: "model-stepper", "aria-label": "Model payla\u015F\u0131m ad\u0131mlar\u0131" }, ['Modeliniz', 'Ayrıntılar', 'Görüşelim'].map((title, i) => (0, react_1.createElement)("button", { key: title, type: "button", "aria-current": step === i ? 'step' : undefined, disabled: i > step, onClick: () => this.go(i) },
                        (0, react_1.createElement)("span", null, String(i + 1).padStart(2, '0')),
                        title))),
                    (0, react_1.createElement)("div", { className: "model-form-inner" },
                        (0, react_1.createElement)(ui_1.Eyebrow, null,
                            "ADIM ",
                            step + 1,
                            " / 3"),
                        (0, react_1.createElement)("h2", { id: "model-step-title", tabIndex: -1 }, ['Neyi beğendiniz?', 'Sizin için nasıl olsun?', 'Şimdi Yunus Usta ile konuşalım.'][step]),
                        (0, react_1.createElement)("form", { noValidate: true, onSubmit: e => { e.preventDefault(); if (step < 2)
                                this.go(step + 1); } },
                            step === 0 && (0, react_1.createElement)(react_1.Fragment, null,
                                v.sourceRef && (0, react_1.createElement)("div", { className: "v11-active-source", "data-source-id": v.sourceRef.id },
                                    v.sourceRef.image && (0, react_1.createElement)(PortfolioUI_1.VImage, { asset: v.sourceRef.image, alt: "", sizes: "100px" }),
                                    (0, react_1.createElement)("div", null,
                                        (0, react_1.createElement)("span", { className: "eyebrow" }, "ETK\u0130N MODEL"),
                                        (0, react_1.createElement)("h3", null, v.sourceRef.title),
                                        (0, react_1.createElement)("p", null, v.systemPrefill),
                                        (0, react_1.createElement)("button", { type: "button", className: "text-link", onClick: () => this.setState({ v: project_1.projectStore.clearSource() }) }, "Bu modeli \u00E7\u0131kar, kendi fikrimle devam et"))),
                                (0, react_1.createElement)("label", { className: "form-field", htmlFor: "model-url" },
                                    (0, react_1.createElement)("span", null, "Pinterest veya model ba\u011Flant\u0131s\u0131"),
                                    (0, react_1.createElement)("input", { id: "model-url", type: "url", value: v.url, maxLength: 2000, autoComplete: "off", onInput: e => this.set('url', e.currentTarget.value), placeholder: "https://pin.it/\u2026", "aria-invalid": errorField === 'model-url' || undefined, "aria-describedby": 'model-url-help' + (errorField === 'model-url' ? ' model-error' : '') })),
                                (0, react_1.createElement)("p", { className: "field-hint", id: "model-url-help" }, "Bu alana yazd\u0131\u011F\u0131n\u0131z yeni ba\u011Flant\u0131 etkin modelin yerine ge\u00E7er. Galeriden ba\u015Fka bir model se\u00E7erseniz kaynak ve model a\u00E7\u0131klamas\u0131 de\u011Fi\u015Fir, kendi notunuz korunur. Ek \u00F6rnekleri ilham dosyan\u0131za ekleyebilirsiniz. HTTPS ba\u011Flant\u0131s\u0131 otomatik okunmaz."),
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
                                    (0, react_1.createElement)("span", null, "Kendi notunuz. Neyi koruyal\u0131m, neyi de\u011Fi\u015Ftirmek istersiniz?"),
                                    (0, react_1.createElement)("textarea", { id: "model-note", rows: 4, value: v.note, maxLength: 1600, "aria-invalid": errorField === 'model-note' || undefined, "aria-describedby": errorField === 'model-note' ? 'model-error' : 'note-help', onInput: e => this.set('note', e.currentTarget.value), placeholder: "Yuvarlak k\u00F6\u015Felerini sevdim. Daha k\u00FC\u00E7\u00FCk bir \u00F6l\u00E7\u00FC ve a\u00E7\u0131k ton istiyorum." })),
                                (0, react_1.createElement)("p", { className: "field-hint", id: "note-help" }, "Be\u011Fendi\u011Finiz ayr\u0131nt\u0131y\u0131 ve de\u011Fi\u015Ftirmek istedi\u011Finizi ayr\u0131 c\u00FCmlelerle anlatabilirsiniz. Hen\u00FCz g\u00F6rseliniz yoksa yaln\u0131z fikrinizi yazman\u0131z da yeterli."),
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
                                    (0, react_1.createElement)("input", { disabled: !v.unknown, id: "model-dimensions", value: v.dimensions, maxLength: 160, onInput: e => this.set('dimensions', e.currentTarget.value), placeholder: "\u00D6rne\u011Fin, en 180 cm, derinlik 45 cm" })),
                                (0, react_1.createElement)("div", { className: "v11-optional-heading" },
                                    (0, react_1.createElement)("button", { type: "button", className: "button button-outline", "aria-expanded": this.state.detailsOpen, "aria-controls": "project-optional-details", onClick: () => this.setState({ detailsOpen: !this.state.detailsOpen }) },
                                        this.state.detailsOpen ? 'Ayrıntıları daralt' : 'Ölçü ve malzeme ayrıntılarını ekle',
                                        " ",
                                        (0, react_1.createElement)(ui_1.Icon, { name: "plus" })),
                                    (0, react_1.createElement)("p", null, "\u0130lk g\u00F6r\u00FC\u015Fme i\u00E7in zorunlu de\u011Fil. Yazd\u0131klar\u0131n\u0131z kapat\u0131nca silinmez.")),
                                (0, react_1.createElement)("div", { id: "project-optional-details", hidden: !this.state.detailsOpen },
                                    (0, react_1.createElement)("label", { className: "v7-check" },
                                        (0, react_1.createElement)("input", { type: "checkbox", checked: !v.unknown, onChange: e => this.set('unknown', !e.currentTarget.checked) }),
                                        "En, derinlik ve y\u00FCksekli\u011Fi ayr\u0131 ayr\u0131 biliyorum."),
                                    !v.unknown && (0, react_1.createElement)(react_1.Fragment, null,
                                        (0, react_1.createElement)("div", { className: "v7-measures" }, [['width', 'En'], ['depth', 'Derinlik'], ['height', 'Yükseklik']].map(([key, label]) => (0, react_1.createElement)("label", { className: "form-field", key: key },
                                            label,
                                            (0, react_1.createElement)("input", { id: 'model-' + key, inputMode: "decimal", "aria-label": label, value: v[key], maxLength: 10, "aria-invalid": errorField === 'model-' + key || undefined, "aria-describedby": errorField === 'model-' + key ? 'model-error' : undefined, onInput: e => this.set(key, e.currentTarget.value) })))),
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
                                            (0, react_1.createElement)("select", { "aria-label": "Malzeme yakla\u015F\u0131m\u0131", value: v.material, onChange: e => this.set('material', e.currentTarget.value) }, ['Birlikte değerlendirelim', 'Ceviz görünümü, yapısını görüşelim', 'Meşe görünümü, yapısını görüşelim', 'Kestane görünümü, yapısını görüşelim', 'Ahşap / ahşap kaplama görünümü', 'Boyalı veya lake görünüm', 'Levha esaslı seçenekleri görüşelim', 'Masif ahşap uygunluğunu görüşelim'].map(x => (0, react_1.createElement)("option", { key: x, value: x }, x)))),
                                        (0, react_1.createElement)("label", { className: "form-field" },
                                            "Y\u00FCzey ve renk",
                                            (0, react_1.createElement)("select", { value: v.finish, onChange: e => this.set('finish', e.currentTarget.value) }, ['Birlikte değerlendirelim', 'Açık ton ve mat görünüm', 'Koyu ton ve ahşap dokusu', 'Kendi renk örneğimi paylaşacağım'].map(x => (0, react_1.createElement)("option", { key: x, value: x }, x))))),
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
                                        (0, react_1.createElement)("select", { value: v.readiness, onChange: e => this.set('readiness', e.currentTarget.value) }, ['Fikir topluyorum', 'Ölçü ve bütçeyi konuşmak istiyorum', 'Projemi netleştirmeye hazırım'].map(x => (0, react_1.createElement)("option", { key: x, value: x }, x)))),
                                    (0, react_1.createElement)("label", { className: "form-field" },
                                        "Nas\u0131l yorumlayal\u0131m?",
                                        (0, react_1.createElement)("select", { value: v.interpretation, "aria-label": "Tasar\u0131m yakla\u015F\u0131m\u0131", onChange: e => this.set('interpretation', e.currentTarget.value) },
                                            (0, react_1.createElement)("option", { value: "Alan\u0131ma g\u00F6re birlikte yorumlayal\u0131m" }, "Alan\u0131ma g\u00F6re birlikte yorumlayal\u0131m"),
                                            (0, react_1.createElement)("option", { value: "Benzer bir form, farkl\u0131 \u00F6l\u00E7\u00FC ve malzeme" }, "Benzer bir form, farkl\u0131 \u00F6l\u00E7\u00FC ve malzeme"),
                                            (0, react_1.createElement)("option", { value: "Yaln\u0131z bir ayr\u0131nt\u0131s\u0131ndan ilham alal\u0131m" }, "Yaln\u0131z bir ayr\u0131nt\u0131s\u0131ndan ilham alal\u0131m"))))),
                            step === 2 && (0, react_1.createElement)(react_1.Fragment, null,
                                (0, react_1.createElement)("p", { className: "model-summary-intro" },
                                    "\u00D6zetinizi kontrol edin. WhatsApp d\u00FC\u011Fmesi Yunus Usta\u2019n\u0131n ",
                                    (0, react_1.createElement)("strong", null, project_1.business.display),
                                    " numaral\u0131 g\u00F6r\u00FC\u015Fmesini haz\u0131r mesajla a\u00E7ar."),
                                (0, react_1.createElement)("div", { className: "v11-review-intro" },
                                    v.sourceRef?.image && (0, react_1.createElement)(PortfolioUI_1.VImage, { asset: v.sourceRef.image, alt: "Se\u00E7ilen modelin kontrol g\u00F6rseli", sizes: "90px" }),
                                    (0, react_1.createElement)("div", null,
                                        (0, react_1.createElement)("span", { className: "eyebrow" }, "PAYLA\u015EMADAN \u00D6NCE"),
                                        (0, react_1.createElement)("h3", null, v.sourceRef?.title || 'Kendi proje fikriniz'),
                                        (0, react_1.createElement)("p", null,
                                            (0, project_1.measurementText)(v),
                                            ". ",
                                            (0, portfolio_1.categoryName)(v.category),
                                            "."),
                                        (0, react_1.createElement)("button", { type: "button", className: "text-link", onClick: () => this.go(0) },
                                            "Modeli ve notumu d\u00FCzenle ",
                                            (0, react_1.createElement)(ui_1.Icon, { size: 16 })))),
                                (0, react_1.createElement)(ProjectReadiness_1.ProjectReadiness, { draft: v, photos: files.length }),
                                (0, react_1.createElement)("details", { className: "v11-message-review", open: true },
                                    (0, react_1.createElement)("summary", null, "G\u00F6nderilecek proje \u00F6zetinin tamam\u0131"),
                                    (0, react_1.createElement)("pre", { id: "project-message-preview" }, this.text())),
                                (0, react_1.createElement)(ContactHandoff_1.ContactHandoff, { text: this.text(), photos: files.length }),
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
                                step === 0 && (0, react_1.createElement)("button", { type: "button", className: "v11-quick-summary text-link", disabled: this.state.loading, onClick: () => this.go(2) }, "Ayr\u0131nt\u0131 eklemeden \u00F6zeti g\u00F6r"),
                                step < 2 && (0, react_1.createElement)("button", { type: "submit", className: "button", disabled: this.state.loading },
                                    "Devam et ",
                                    (0, react_1.createElement)(ui_1.Icon, null))))))),
            (0, react_1.createElement)("div", { className: "wrap model-more" },
                (0, react_1.createElement)("p", null, "Bir model se\u00E7mek i\u00E7in galerilere d\u00F6nebilirsiniz. Kendi notunuz bu sekmede korunur, etkin model de\u011Fi\u015Fikli\u011Fi \u00F6zetinizde a\u00E7\u0131k\u00E7a g\u00F6r\u00FCn\u00FCr."),
                (0, react_1.createElement)(ui_1.ButtonLink, { to: "/ilham-modelleri", navigate: a.navigate, secondary: true }, "\u0130lham modellerine bak"),
                (0, react_1.createElement)("button", { type: "button", className: "text-link v11-new-project", onClick: () => { if (!window.confirm('Bu proje notları, ölçüleri ve eklenen fotoğraflar temizlensin mi? İlham dosyanızdaki herkese açık seçimler korunur.'))
                        return; draft_session_1.draftSession.disable(); project_1.projectStore.clear(); project_1.attachmentStore.clear(); this.setState({ step: 0, v: project_1.projectStore.get(), files: [], error: '', errorField: '', message: '', detailsOpen: false }); a.navigate('/modelini-getir'); } }, "Yeni bir proje ba\u015Flat")));
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
const StudioGuide_1 = require("../components/StudioGuide");
function DesignDesk(props) {
    return (0, react_1.createElement)(react_1.Fragment, null,
        (0, react_1.createElement)("nav", { className: "wrap studio-local-nav", "aria-label": "3D St\u00FCdyo b\u00F6l\u00FCmleri" }, [['studio-deneyimi', '3D deneyimi'], ['studio-baslangic', 'Başlangıç modelleri'], ['studio-yaklasim', 'Kullanım ayrıntıları'], ['studio-detay', 'Malzeme ve işçilik']].map(([id, label]) => (0, react_1.createElement)("a", { key: id, href: '#' + id, onClick: e => { e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: 'auto' }); } }, label))),
        (0, react_1.createElement)("section", { id: "studio-deneyimi", className: "wrap v8-studio-page" },
            (0, react_1.createElement)(DeskExperience_1.DeskExperience, { ...props })),
        (0, react_1.createElement)(StudioGuide_1.StudioGuide, { navigate: props.navigate }));
}

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
            (0, react_1.createElement)(ui_1.ButtonLink, { to: "/teklif-al", navigate: a.navigate }, "Proje fikrimi haz\u0131rlayay\u0131m"),
            (0, react_1.createElement)("p", { className: "small muted" }, "\u00D6l\u00E7\u00FCleriniz veya malzeme tercihiniz hen\u00FCz belli olmayabilir."))),
    (0, react_1.createElement)("section", { className: "wrap v11-first-meeting" },
        (0, react_1.createElement)(ui_1.Eyebrow, null, "\u0130LK G\u00D6R\u00DC\u015EME, \u00DCRET\u0130M ONAYI DE\u011E\u0130LD\u0130R."),
        (0, react_1.createElement)("h2", null, "Birlikte \u00F6nce neyi netle\u015Ftirece\u011Fiz?"),
        (0, react_1.createElement)("div", null,
            (0, react_1.createElement)("p", null,
                (0, react_1.createElement)("strong", null, "Sizden ba\u015Flayal\u0131m."),
                " Kullan\u0131m amac\u0131n\u0131z, be\u011Fendi\u011Finiz model ve varsa yakla\u015F\u0131k \u00F6l\u00E7\u00FC. Her bilgiyi haz\u0131r getirmeniz gerekmez."),
            (0, react_1.createElement)("p", null,
                (0, react_1.createElement)("strong", null, "Uygunlu\u011Fu konu\u015Fal\u0131m."),
                " Alan, malzeme, mekanizma ve uygulama ihtiyac\u0131n\u0131 de\u011Ferlendirelim. Yerinde inceleme gerekip gerekmedi\u011Fi ve bunun ko\u015Fullar\u0131 ayr\u0131ca kararla\u015Ft\u0131r\u0131l\u0131r."),
            (0, react_1.createElement)("p", null,
                (0, react_1.createElement)("strong", null, "Sonraki ad\u0131m\u0131 ay\u0131ral\u0131m."),
                " Tasar\u0131m fikri, \u00F6l\u00E7\u00FC teyidi ve kapsam\u0131 net bir teklif ayn\u0131 \u015Fey de\u011Fildir. Fiyat, de\u011Fi\u015Fiklik, \u00FCretim ve teslim ko\u015Fullar\u0131 netle\u015Fmeden g\u00F6r\u00FC\u015Fme kesin sipari\u015Fe d\u00F6n\u00FC\u015Fmez.")),
        (0, react_1.createElement)("p", { className: "field-hint" }, "\u00DCcretsiz ke\u015Fif, sabit teslim s\u00FCresi veya garanti kapsam\u0131 burada vaat edilmez. Projenize ait ko\u015Fullar Yunus Usta ile teyit edilir.")),
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
                (0, react_1.createElement)("em", null, "kalmas\u0131n.")), desc: "B\u00FCt\u00E7e, ke\u015Fif, montaj, teslim ve taslak g\u00FCvenli\u011Fi. \u0130lk g\u00F6r\u00FC\u015Fmeden \u00F6nce s\u0131k sorulan sorular." }),
        (0, react_1.createElement)("section", { className: "wrap narrow" },
            (0, react_1.createElement)("div", { className: "v21-faq-intro" },
                (0, react_1.createElement)(ui_1.TextLink, { to: "/hizmet-ve-teklif", navigate: a.navigate }, "Teklif kapsam\u0131n\u0131 nas\u0131l kar\u015F\u0131la\u015Ft\u0131r\u0131r\u0131m?")),
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
const V7Pages_1 = require("./V7Pages");
const hero_rotation_1 = require("../lib/hero-rotation");
const desk_1 = require("../lib/desk");
const scenes = [
    { image: 'concept-hero', alt: "Ahşap görünümlü oval yemek masası, sandalyeler ve aydınlatmalı mutfak. Konsept model.", caption: 'Yaşamın etrafında toplandığı yer.', label: 'Yemek', kind: 'concept' },
    { image: 'concept-gardrop', alt: "Cam kapaklı gardıroplar, aydınlatılmış raflar ve orta depolama adası. Giyinme odası konsepti.", caption: 'Her ayrıntıya yer açan bir düzen.', label: 'Giyinme', kind: 'concept' },
    { image: 'concept-kahve', alt: "Cam yan vitrinler, kemerli raflar ve çekmeceli kahve dolabı. Konsept model.", caption: 'Günün en sevdiğiniz köşesi.', label: 'Kahve', kind: 'concept' },
    { image: 'concept-sehpa', alt: "Oval orta sehpa ve iç içe zigonlar bulunan oturma alanı. Konsept model.", caption: 'Bir arada, doğal ve yalın.', label: 'Salon', kind: 'concept' },
    { image: 'concept-tv', alt: "Dikey çizgili TV paneli, açık raflar ve kapalı alt depolama. Konsept model.", caption: 'Mekânınıza göre düşünülmüş.', label: 'TV', kind: 'concept' }
];
class Home extends react_1.Component {
    constructor() {
        super(...arguments);
        this.state = { scene: 0, desk: { ...desk_1.defaultDesk }, chapter: 0, paused: false, requested: [0, 1], loading: null, playing: false, epoch: 0, status: '' };
        this.alive = false;
        this.serial = 0;
        this.hero = null;
        this.observer = null;
        this.visible = true;
        this.hover = false;
        this.focus = false;
        this.motion = null;
        this.first = true;
        this.automatic = false;
        this.explicitPlay = false;
        this.nextCandidate = null;
        this.canPlay = () => !this.state.paused && !this.motion?.matches && !document.hidden && this.visible && (!(this.hover || this.focus) || this.explicitPlay);
        this.reschedule = () => {
            window.clearTimeout(this.timer);
            this.timer = undefined;
            if (!this.canPlay()) {
                if (this.automatic) {
                    this.serial++;
                    this.automatic = false;
                    if (this.state.loading !== null)
                        this.setState({ loading: null });
                }
                if (this.state.playing)
                    this.setState({ playing: false });
                return;
            }
            if (this.state.loading !== null)
                return;
            const delay = this.first ? hero_rotation_1.HERO_FIRST_DELAY : hero_rotation_1.HERO_INTERVAL;
            this.setState(s => ({ playing: true, epoch: s.epoch + 1 }));
            this.timer = window.setTimeout(() => { this.timer = undefined; void this.setScene(this.nextCandidate ?? ((this.state.scene + 1) % scenes.length), true); }, delay);
        };
        this.hold = (held) => { this.hover = held; if (held)
            this.explicitPlay = false; this.reschedule(); };
        this.togglePlayback = () => { const paused = !this.state.paused; this.explicitPlay = !paused; if (paused) {
            this.serial++;
            this.automatic = false;
        } this.setState({ paused, loading: paused ? null : this.state.loading }, this.reschedule); };
        this.warm = (scene) => { const next = (scene + 1) % scenes.length; if (!this.state.requested.includes(next))
            this.setState(s => ({ requested: [...s.requested, next] })); };
        this.setScene = (scene, automatic = false) => {
            if (scene < 0 || scene >= scenes.length || automatic && !this.canPlay())
                return Promise.resolve();
            window.clearTimeout(this.timer);
            this.timer = undefined;
            const token = ++this.serial;
            this.automatic = automatic;
            if (!automatic)
                this.explicitPlay = false;
            if (scene === this.state.scene) {
                this.setState({ paused: automatic ? this.state.paused : true, loading: null, playing: false, status: '' }, this.reschedule);
                return Promise.resolve();
            }
            return new Promise(finish => this.setState(s => ({ requested: s.requested.includes(scene) ? s.requested : [...s.requested, scene], paused: automatic ? s.paused : true, loading: scene, playing: false, status: '' }), async () => {
                const ready = await (0, hero_rotation_1.decodeHeroFrame)(() => this.alive && token === this.serial ? this.hero?.querySelector('[data-slide="' + scene + '"] img') || null : null);
                if (!this.alive || token !== this.serial) {
                    finish();
                    return;
                }
                this.automatic = false;
                if (ready) {
                    this.first = false;
                    this.nextCandidate = null;
                    this.setState({ scene, loading: null, status: '' }, () => { this.warm(scene); this.reschedule(); finish(); });
                }
                else {
                    this.nextCandidate = (scene + 1) % scenes.length;
                    this.warm(scene);
                    this.setState({ loading: null, status: 'Bu görsel açılamadı. Mevcut görüntüyü koruduk; başka bir görsel seçebilirsiniz.' }, () => { this.reschedule(); finish(); });
                }
            }));
        };
    }
    componentDidMount() { this.alive = true; this.motion = matchMedia('(prefers-reduced-motion: reduce)'); this.motion.addEventListener('change', this.reschedule); document.addEventListener('visibilitychange', this.reschedule); if (this.hero) {
        this.observer = new IntersectionObserver(es => { this.visible = es[0].isIntersecting; this.reschedule(); });
        this.observer.observe(this.hero);
    } this.reschedule(); }
    componentWillUnmount() { this.alive = false; this.serial++; window.clearTimeout(this.timer); this.observer?.disconnect(); this.motion?.removeEventListener('change', this.reschedule); document.removeEventListener('visibilitychange', this.reschedule); }
    render() {
        const a = this.props, s = this.state, scene = scenes[s.scene];
        return (0, react_1.createElement)("div", { className: "v6-home" },
            (0, react_1.createElement)("section", { className: "v6-hero v232-carousel", ref: el => this.hero = el, "aria-label": "Elif Tasar\u0131m a\u00E7\u0131l\u0131\u015F se\u00E7kisi", "aria-roledescription": "slayt g\u00F6sterisi", onFocusCapture: () => { this.focus = true; this.explicitPlay = false; this.reschedule(); }, onBlurCapture: e => { if (!e.currentTarget.contains(e.relatedTarget)) {
                    this.focus = false;
                    this.reschedule();
                } } },
                scenes.map((sc, i) => (0, react_1.createElement)("div", { className: 'v6-hero-scene v232-scene' + (i === s.scene ? ' is-active' : ''), key: sc.image, "aria-hidden": i !== s.scene, "data-slide": i }, s.requested.includes(i) && (0, react_1.createElement)(PortfolioUI_1.VImage, { asset: sc.image, alt: sc.alt, eager: true, priority: i === 0 ? 'high' : 'low', full: true, sizes: "100vw" }))),
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
                    (0, react_1.createElement)("div", { className: "v6-hero-actions", onMouseEnter: () => this.hold(true), onMouseLeave: () => this.hold(false) },
                        (0, react_1.createElement)(ui_1.ButtonLink, { to: "/projeler", navigate: a.navigate }, "Bitirdi\u011Fimiz i\u015Fleri ke\u015Ffedin"),
                        (0, react_1.createElement)(ui_1.TextLink, { to: "/modelini-getir", navigate: a.navigate, light: true }, "Kendi modelinizi getirin"))),
                (0, react_1.createElement)("div", { className: "wrap v6-hero-bottom v234-bottom" },
                    (0, react_1.createElement)("div", { className: "v234-controls", onMouseEnter: () => this.hold(true), onMouseLeave: () => this.hold(false), "data-carousel-state": s.loading !== null ? 'loading' : s.playing ? 'playing' : 'paused' },
                        (0, react_1.createElement)("div", { className: "v234-controls-heading" },
                            (0, react_1.createElement)("span", null, "5 mek\u00E2n\u0131 ke\u015Ffedin"),
                            (0, react_1.createElement)("span", { className: "v234-current-scene" },
                                String(s.scene + 1).padStart(2, '0'),
                                " / 05 \u00B7 ",
                                scene.label)),
                        (0, react_1.createElement)("div", { className: "v234-control-row" },
                            (0, react_1.createElement)("button", { type: "button", className: "v234-arrow v234-previous", "aria-label": "\u00D6nceki g\u00F6rsel", onClick: () => this.setScene((s.scene + scenes.length - 1) % scenes.length) },
                                (0, react_1.createElement)(ui_1.Icon, { size: 19 })),
                            (0, react_1.createElement)("div", { className: "v6-scene-controls", role: "group", "aria-label": "A\u00E7\u0131l\u0131\u015F sahneleri" }, scenes.map((sc, i) => (0, react_1.createElement)("button", { key: sc.image, type: "button", onClick: () => this.setScene(i), "aria-pressed": s.scene === i, "aria-label": String(i + 1).padStart(2, '0') + ' ' + sc.label + ' sahnesi' },
                                (0, react_1.createElement)("span", null, String(i + 1).padStart(2, '0')),
                                (0, react_1.createElement)("i", null),
                                (0, react_1.createElement)("span", { className: "scene-word" }, sc.label)))),
                            (0, react_1.createElement)("button", { type: "button", className: "v234-arrow v234-next", "aria-label": "Sonraki g\u00F6rsel", onClick: () => this.setScene((s.scene + 1) % scenes.length) },
                                (0, react_1.createElement)(ui_1.Icon, { size: 19 })),
                            (0, react_1.createElement)("button", { type: "button", className: "v232-pause", "aria-label": s.paused ? 'Otomatik geçişi başlat' : 'Otomatik geçişi durdur', "aria-pressed": s.paused, onClick: this.togglePlayback }, s.paused ? 'Oynat' : 'Duraklat')),
                        (0, react_1.createElement)("div", { className: "v234-progress", "aria-hidden": "true", "data-running": s.playing ? 'true' : 'false' },
                            (0, react_1.createElement)("span", { key: s.epoch, style: { animationDuration: (this.first ? hero_rotation_1.HERO_FIRST_DELAY : hero_rotation_1.HERO_INTERVAL) + 'ms' } })),
                        s.loading !== null && (0, react_1.createElement)("span", { className: "v234-loading", role: "status" }, "G\u00F6rsel haz\u0131rlan\u0131yor\u2026"),
                        s.status && (0, react_1.createElement)("span", { className: "v234-loading", role: "status" }, s.status)),
                    (0, react_1.createElement)("span", { className: "v6-hero-caption" }, scene.caption),
                    (0, react_1.createElement)("button", { className: "hero-down", "aria-label": "Bitirdi\u011Fimiz i\u015Flere kayd\u0131r", onClick: () => document.getElementById('bitirdigimiz-isler')?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }) },
                        (0, react_1.createElement)(ui_1.Icon, { name: "down" }))),
                (0, react_1.createElement)("span", { className: "hero-source" }, scene.kind === 'concept' ? 'KONSEPT MODEL' : 'GERÇEK ÇALIŞMA FOTOĞRAFI / ATÖLYE ARŞİVİ')),
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
                            "Yunus Usta'n\u0131n payla\u015Ft\u0131\u011F\u0131 uygulama ar\u015Fivinden."),
                        (0, react_1.createElement)(ui_1.TextLink, { to: "/projeler", navigate: a.navigate }, "T\u00FCm \u00E7al\u0131\u015Fmalar"))),
                (0, react_1.createElement)("div", { className: "work-grid" }, portfolio_1.featuredWorks.map((id, i) => (0, react_1.createElement)(PortfolioUI_1.WorkCard, { key: id, work: portfolio_1.works.find(w => w.id === id), actions: a, featured: true, index: i })))),
            (0, react_1.createElement)("nav", { className: "wrap v9-category-ribbon", "aria-label": "Ya\u015Fam alan\u0131na g\u00F6re ke\u015Ffet" }, portfolio_1.workCategories.map(c => (0, react_1.createElement)(ui_1.Link, { key: c.id, to: '/kategoriler/' + c.id, navigate: a.navigate },
                (0, react_1.createElement)("div", null,
                    (0, react_1.createElement)(PortfolioUI_1.VImage, { asset: V7Pages_1.categorySupport[c.id]?.asset || c.image, alt: c.name + (V7Pages_1.categorySupport[c.id] ? ' atölye arşivi' : ' konsept seçkisi'), sizes: "180px" }),
                    (0, react_1.createElement)("span", null, V7Pages_1.categorySupport[c.id] ? 'Atölye arşivi' : 'Konsept')),
                (0, react_1.createElement)("strong", null, c.name),
                (0, react_1.createElement)(ui_1.Icon, { name: "diagonal", size: 15 })))),
            (0, react_1.createElement)("section", { className: "home-yunus" },
                (0, react_1.createElement)("div", { className: "home-yunus-image" },
                    (0, react_1.createElement)(PortfolioUI_1.VImage, { asset: "work-joinery", alt: "Ah\u015Fap kamelya \u00E7al\u0131\u015Fmas\u0131ndan ger\u00E7ek \u00E7at\u0131 ve birle\u015Fim ayr\u0131nt\u0131lar\u0131", sizes: "(max-width: 800px) 100vw, 60vw" }),
                    (0, react_1.createElement)("span", null, "UYGULAMA AR\u015E\u0130V\u0130NDEN B\u0130R AYRINTI")),
                (0, react_1.createElement)("div", { className: "home-yunus-copy" },
                    (0, react_1.createElement)(ui_1.Eyebrow, null, "YUNUS USTA'NIN EL\u0130NDEN \u00C7IKANLAR"),
                    (0, react_1.createElement)("h2", null,
                        "Bir meslekten fazlas\u0131.",
                        (0, react_1.createElement)("br", null),
                        (0, react_1.createElement)("em", null, "Bir aile miras\u0131.")),
                    (0, react_1.createElement)("p", null, "Babas\u0131ndan \u00F6\u011Frendi\u011Fi marangozluk, Yunus Usta'n\u0131n elinde bug\u00FCn\u00FCn ya\u015Fam alanlar\u0131na uyarlan\u0131yor. Her i\u015F, bir ihtiyac\u0131 dinlemekle ba\u015Fl\u0131yor."),
                    (0, react_1.createElement)("p", null, "\u00D6l\u00E7\u00FCy\u00FC birlikte d\u00FC\u015F\u00FCnmek, malzemeyi do\u011Fru se\u00E7mek ve at\u00F6lyedeki eme\u011Fi yerinde uygulamayla tamamlamak. Bizim i\u00E7in i\u015Fin \u00F6z\u00FC bu."),
                    (0, react_1.createElement)(ui_1.TextLink, { to: "/hakkimizda", navigate: a.navigate, light: true }, "Hik\u00E2yemizi ke\u015Ffedin"),
                    (0, react_1.createElement)("div", { className: "yunus-notes" },
                        (0, react_1.createElement)("span", null, "Aile at\u00F6lyesi"),
                        (0, react_1.createElement)("span", null, "\u00D6l\u00E7\u00FCye \u00F6zel"),
                        (0, react_1.createElement)("span", null, "\u00DCretim & uygulama")))),
            (0, react_1.createElement)("section", { className: "wrap v6-section home-inspiration", id: "ilham-seckisi" },
                (0, react_1.createElement)("div", { className: "v6-heading" },
                    (0, react_1.createElement)("div", null,
                        (0, react_1.createElement)(ui_1.Eyebrow, null, "02 / \u0130LHAM SE\u00C7K\u0130S\u0130"),
                        (0, react_1.createElement)("h2", null,
                            "Bir fikirle ba\u015Flar.",
                            (0, react_1.createElement)("br", null),
                            (0, react_1.createElement)("em", null, "Size g\u00F6re \u015Fekillenir."))),
                    (0, react_1.createElement)("div", null,
                        (0, react_1.createElement)("p", null, "Bir sehpa, kahve k\u00F6\u015Fesi ya da antre. Farkl\u0131 alanlar i\u00E7in d\u00FC\u015F\u00FCnd\u00FC\u011F\u00FCm\u00FCz konseptlerden bir se\u00E7ki."),
                        (0, react_1.createElement)(ui_1.TextLink, { to: "/ilham-modelleri", navigate: a.navigate }, "T\u00FCm ilham modelleri"))),
                (0, react_1.createElement)("div", { className: "concept-grid three" }, portfolio_1.homeConcepts.map(c => (0, react_1.createElement)(Portfolio_1.ConceptCard, { key: c.id, c: c, navigate: a.navigate }))),
                (0, react_1.createElement)("p", { className: "home-inspiration-note" }, "Tasar\u0131m fikirleridir. Bitmi\u015F at\u00F6lye i\u015Fleri yukar\u0131daki \u00E7al\u0131\u015Fma se\u00E7kisinde yer al\u0131r.")),
            (0, react_1.createElement)("section", { className: "v6-process" },
                (0, react_1.createElement)("div", { className: "wrap" },
                    (0, react_1.createElement)("div", { className: "v6-heading" },
                        (0, react_1.createElement)("div", null,
                            (0, react_1.createElement)(ui_1.Eyebrow, null, "03 / F\u0130K\u0130RDEN UYGULAMAYA"),
                            (0, react_1.createElement)("h2", null,
                                "Birlikte ",
                                (0, react_1.createElement)("em", null, "nas\u0131l ilerleriz?"))),
                        (0, react_1.createElement)("p", null, "Acele bir se\u00E7im de\u011Fil, iyi d\u00FC\u015F\u00FCn\u00FClm\u00FC\u015F bir par\u00E7a. Her a\u015Famada ihtiyac\u0131n\u0131z\u0131 ve kullan\u0131m\u0131n\u0131z\u0131 merkeze al\u0131r\u0131z.")),
                    (0, react_1.createElement)("div", { className: "process-steps" },
                        [['Fikrinizi dinleriz.', 'Bir Pinterest bağlantısı, fotoğraf veya kendi çiziminiz. Önce nasıl kullanacağınızı konuşuruz.'], ['Ölçüyü netleştiririz.', 'Malzeme, renk, donanım ve alanın ölçülerini birlikte değerlendiririz. Teklif bu ayrıntılarla şekillenir.'], ['Atölyede şekillenir.', 'Üzerinde anlaşılan tasarım, ölçü ve malzemeyle üretim planlanır.'], ['Yerini bulur.', 'Teslim ve gerekiyorsa yerinde uygulama, projenin koşullarına göre birlikte düzenlenir.']].map(([title, text], i) => (0, react_1.createElement)("article", { key: title },
                            (0, react_1.createElement)("span", { className: "process-number" },
                                "0",
                                i + 1),
                            (0, react_1.createElement)("h3", null, title),
                            (0, react_1.createElement)("p", null, text))),
                        (0, react_1.createElement)(ui_1.TextLink, { to: "/hizmet-ve-teklif", navigate: a.navigate }, "Teklif kapsam\u0131n\u0131 birlikte netle\u015Ftirelim")))),
            (0, react_1.createElement)("section", { className: "wrap v11-studio-invitation", id: "uc-boyutlu-studyo" },
                (0, react_1.createElement)("div", null,
                    (0, react_1.createElement)(ui_1.Eyebrow, null, "3D ST\u00DCDYO / \u00D6L\u00C7\u00DCN\u00DCZE G\u00D6RE"),
                    (0, react_1.createElement)("h2", null,
                        "Bir masa.",
                        (0, react_1.createElement)("br", null),
                        (0, react_1.createElement)("em", null, "Size g\u00F6re yeni bir d\u00FCzen.")),
                    (0, react_1.createElement)("p", null, "Y\u00FCksekli\u011Fi ve \u00F6l\u00E7\u00FCleri de\u011Fi\u015Ftirin. \u00C7ekmeceleri, d\u00F6ner yan y\u00FCzeyi ve \u00E7ift tarafl\u0131 kitapl\u0131klarla \u00E7al\u0131\u015Fma alan\u0131n\u0131z\u0131 ke\u015Ffedin."),
                    (0, react_1.createElement)(ui_1.ButtonLink, { to: "/tasarim-masasi", navigate: a.navigate }, "3D st\u00FCdyoyu ke\u015Ffet"),
                    (0, react_1.createElement)("small", null, "G\u00F6rsel bir konsepttir. \u0130malat ve mekanizma uygunlu\u011Fu at\u00F6lye g\u00F6r\u00FC\u015Fmesinde netle\u015Fir.")),
                (0, react_1.createElement)(ui_1.Link, { className: "v11-studio-poster", to: "/tasarim-masasi", navigate: a.navigate },
                    (0, react_1.createElement)(ui_1.Photo, { name: "devir-atolye-v23.webp", alt: "\u00C7al\u0131\u015Fma masas\u0131 modelinin iki kitapl\u0131kl\u0131 \u00E7al\u0131\u015Fma ortam\u0131, ger\u00E7ek Three.js sahnesinden konsept g\u00F6r\u00FCn\u00FCm\u00FC", ratio: "3/2" }),
                    (0, react_1.createElement)("span", { className: "v11-poster-action" },
                        (0, react_1.createElement)(ui_1.Icon, { name: "grid" }),
                        "Ke\u015Ffet. D\u00F6nd\u00FCr. Birlikte d\u00FC\u015F\u00FCn."),
                    (0, react_1.createElement)(PortfolioUI_1.SourceTag, { kind: "concept" }))),
            (0, react_1.createElement)("section", { className: "v6-final-cta" },
                (0, react_1.createElement)("div", { className: "wrap" },
                    (0, react_1.createElement)(ui_1.Eyebrow, null, "S\u0130Z\u0130N F\u0130KR\u0130N\u0130Z. B\u0130Z\u0130M USTALI\u011EIMIZ."),
                    (0, react_1.createElement)("h2", null,
                        "Akl\u0131n\u0131zdaki modeli g\u00F6nderin.",
                        (0, react_1.createElement)("br", null),
                        (0, react_1.createElement)("em", null, "Birlikte yorumlayal\u0131m.")),
                    (0, react_1.createElement)(ui_1.ButtonLink, { to: "/modelini-getir", navigate: a.navigate }, "Fikrimi payla\u015Fay\u0131m"),
                    (0, react_1.createElement)("p", null, "Bir foto\u011Fraf, bir ba\u011Flant\u0131 ya da yaln\u0131zca bir fikir."),
                    (0, react_1.createElement)(ui_1.TextLink, { to: "/iletisim", navigate: a.navigate, light: true }, "Do\u011Frudan Yunus Usta ile g\u00F6r\u00FC\u015F\u00FCn"))));
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
const BedCollection_1 = require("./BedCollection");
const ServiceGuide_1 = require("../components/ServiceGuide");
const V7Pages_1 = require("./V7Pages");
const PinterestPreview_1 = require("../components/PinterestPreview");
const pinterest_1 = require("../lib/pinterest");
const react_1 = require("react");
const ui_1 = require("../components/ui");
const PortfolioUI_1 = require("../components/PortfolioUI");
const portfolio_1 = require("../lib/portfolio");
const selections_1 = require("../lib/selections");
const domain_1 = require("../lib/domain");
const projectStudies = {
    'sade-kose-mutfak': { focus: 'Köşe planında günlük akış.', observations: ['L biçimindeki tezgâh, iki duvar boyunca çalışma ve depolama alanını birleştiriyor.', 'Açık renkli kapaklar ile koyu cihaz yüzeyleri aynı yerleşimde görülüyor.', 'Alt dolaplar, üst depolama ve cihaz boşlukları birlikte düşünülmüş bir düzen oluşturuyor.'], questions: ['Mevcut tesisat ve cihaz yerleri korunacak mı?', 'Tezgâhta hangi işleri daha sık yapıyorsunuz?', 'Kapak, çekmece ve erişim öncelikleriniz neler?'] },
    'kemerli-kahve-kosesi': { focus: 'Servis, sergileme ve saklama bir arada.', observations: ['Kemerli orta bölüm, açık rafları ve servis yüzeyini bir odak noktasında topluyor.', 'İki yandaki cam kapaklı bölümler, sergileme ile kapalı saklamayı aynı kompozisyonda birleştiriyor.', 'Raf aydınlatması ve alt depolama, fotoğraftaki kahve köşesinin belirgin ayrıntıları.'], questions: ['Makinenizin en, derinlik ve kapağı açıldığındaki yüksekliği nedir?', 'Fincanlar, kahve malzemeleri ve küçük cihazlar için ne kadar yer gerekiyor?', 'Priz, havalandırma veya su bağlantısı için özel ihtiyaç var mı?'] },
    'isikli-tv-unitesi': { focus: 'Ekran duvarını bir bütüne dönüştürmek.', observations: ['TV paneli, yan raflar ve alttaki depolama tek bir duvar düzeninde bir araya geliyor.', 'Açık raf ile kapalı hacimlerin birlikte kullanımı, görünen ve saklanan eşyalar arasında ayrım sağlıyor.', 'Dolaylı aydınlatma, panel ve rafların çevresinde ayrı bir ışık katmanı oluşturuyor.'], questions: ['Ekranın boyutu, ağırlığı ve duvarın yapısı nedir?', 'Prizler, kablolar ve kullanılacak cihazlar nerede duracak?', 'Kitap, oyun konsolu ve diğer eşyalar için açık veya kapalı alan mı gerekiyor?'] }
};
function ProjectStudy({ work: w, navigate }) { const c = projectStudies[w.id] || { focus: w.subtitle, observations: w.features, questions: ['Bu mobilya hangi alanda ve nasıl kullanılacak?', 'Mevcut alanın yaklaşık ölçüsü ve engelleri neler?', 'Açık raf, kapalı depolama ve yüzey seçimi için öncelikleriniz neler?'] }; return (0, react_1.createElement)("section", { className: "wrap v11-case-study" },
    (0, react_1.createElement)("div", null,
        (0, react_1.createElement)(ui_1.Eyebrow, null, "FOTO\u011ERAFTAN KARARINIZA"),
        (0, react_1.createElement)("h2", null, c.focus),
        (0, react_1.createElement)("p", null, w.description),
        (0, react_1.createElement)("p", { className: "field-hint" }, "Foto\u011Frafta g\u00F6r\u00FClen d\u00FCzen \u00FCzerinden d\u00FC\u015F\u00FCnelim. M\u00FC\u015Fteri r\u00F6portaj\u0131 veya teknik \u015Fartname de\u011Fildir.")),
    (0, react_1.createElement)("div", { className: "v11-case-columns" },
        (0, react_1.createElement)("article", null,
            (0, react_1.createElement)("span", { className: "eyebrow" }, "BU UYGULAMADA G\u00D6R\u00DCNENLER"),
            (0, react_1.createElement)("h3", null, "Nas\u0131l bir \u00E7\u00F6z\u00FCm?"),
            c.observations.map(t => (0, react_1.createElement)("p", { key: t }, t))),
        (0, react_1.createElement)("article", null,
            (0, react_1.createElement)("span", { className: "eyebrow" }, "S\u0130Z\u0130N ALANINIZ \u0130\u00C7\u0130N"),
            (0, react_1.createElement)("h3", null, "\u0130lk g\u00F6r\u00FC\u015Fmede konu\u015Fal\u0131m."),
            (0, react_1.createElement)("ol", null, c.questions.map(t => (0, react_1.createElement)("li", { key: t }, t))),
            (0, react_1.createElement)("p", null, "Yakla\u015F\u0131k \u00F6l\u00E7\u00FC veya mek\u00E2n foto\u011Fraf\u0131yla ba\u015Flanabilir. \u00DCretim \u00F6l\u00E7\u00FCs\u00FC ayr\u0131ca teyit edilir."))),
    (0, react_1.createElement)("details", { className: "v11-case-verification" },
        (0, react_1.createElement)("summary", null, "Malzeme, kapsam ve foto\u011Fraf bilgisi"),
        (0, react_1.createElement)("p", null, "G\u00F6rsel at\u00F6lyenin payla\u015F\u0131lan ar\u015Fivinden gelir. Bu \u00E7al\u0131\u015Fman\u0131n \u00F6zg\u00FCn \u00F6l\u00E7\u00FCs\u00FC, malzeme markas\u0131, donan\u0131m kodu, teslim tarihi ve m\u00FC\u015Fteri adresi do\u011Frulanm\u0131\u015F kay\u0131t olarak elimizde bulunmuyor. Foto\u011Fraftan t\u00FCretilerek yaz\u0131lmaz. Yeni i\u015F i\u00E7in mobilya, cihaz, tezg\u00E2h, ayd\u0131nlatma, nakliye ve montaj kapsamlar\u0131 teklifte ayr\u0131 g\u00F6r\u00FC\u015F\u00FCl\u00FCr.")),
    (0, react_1.createElement)("nav", { className: "case-next-links", "aria-label": "Projeden sonraki ad\u0131m" },
        (0, react_1.createElement)(ui_1.TextLink, { to: '/kategoriler/' + w.category, navigate: navigate }, "Bu alan\u0131 ke\u015Ffedin"),
        (0, react_1.createElement)(ui_1.TextLink, { to: "/malzemeler", navigate: navigate }, "Malzeme kararlar\u0131"),
        (0, react_1.createElement)(ui_1.TextLink, { to: (0, portfolio_1.modelHref)('', w.category, w.subtitle + ' benzeri bir çalışma istiyorum.'), navigate: navigate }, "Kendi alan\u0131m i\u00E7in konu\u015Fal\u0131m"))); }
class Projects extends react_1.Component {
    constructor(p) {
        super(p);
        this.update = (key, value) => this.setState({ [key]: value }, () => { const s = this.state, q = new URLSearchParams(); if (s.category !== 'all')
            q.set('alan', s.category); if (s.search)
            q.set('ara', s.search); if (s.stage !== 'work')
            q.set('durum', s.stage); history.replaceState({ ...history.state }, '', (0, domain_1.publicHref)('/projeler' + (q.size ? '?' + q : ''))); });
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
                (0, react_1.createElement)("div", { className: "filter-chips", role: "group", "aria-label": "Proje kategorisi" }, [{ id: 'all', name: 'Tüm alanlar' }, ...portfolio_1.workCategories].map(c => (0, react_1.createElement)("button", { key: c.id, onClick: () => this.update('category', c.id), "aria-pressed": s.category === c.id }, c.name))),
                (0, react_1.createElement)("div", { className: "result-line", "aria-live": "polite" },
                    (0, react_1.createElement)("span", null,
                        list.length,
                        " \u00E7al\u0131\u015Fma"),
                    (0, react_1.createElement)("span", null, "Ger\u00E7ek foto\u011Fraflar, at\u00F6lyenin payla\u015Ft\u0131\u011F\u0131 ar\u015Fivden.")),
                list.length ? (0, react_1.createElement)("div", { className: "work-grid" }, list.map((w, i) => (0, react_1.createElement)(PortfolioUI_1.WorkCard, { key: w.id, work: w, actions: a, index: i }))) : (0, react_1.createElement)("div", { className: "v6-empty" },
                    (0, react_1.createElement)(ui_1.Icon, { name: "search", size: 34 }),
                    (0, react_1.createElement)("h2", null, "Bu se\u00E7imde hen\u00FCz bir \u00E7al\u0131\u015Fma yok."),
                    (0, react_1.createElement)("p", null, "Kategorinin ilham fikirlerini inceleyebilir veya kendi modelinizle ba\u015Flayabilirsiniz."),
                    (0, react_1.createElement)("button", { className: "button button-outline", onClick: () => this.setState({ category: 'all', search: '', stage: 'work' }, () => history.replaceState({ ...history.state }, '', (0, domain_1.publicHref)('/projeler'))) },
                        "Filtreleri temizle ",
                        (0, react_1.createElement)(ui_1.Icon, null)),
                    s.category !== 'all' && (0, react_1.createElement)(ui_1.TextLink, { to: '/kategoriler/' + s.category, navigate: a.navigate }, "Bu alan\u0131n ilham modellerini inceleyin"),
                    (0, react_1.createElement)(ui_1.TextLink, { to: (0, portfolio_1.modelHref)('', s.category === 'all' ? 'ozel-tasarim' : s.category), navigate: a.navigate }, "Kendi modelimle ba\u015Flayay\u0131m"))),
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
        const a = this.props, w = a.work, photo = (0, portfolio_1.workPhotoEvidence)(w, this.state.photo), others = portfolio_1.works.filter(p => p.category === w.category && p.id !== w.id && p.status === 'work').slice(0, 3);
        return (0, react_1.createElement)(react_1.Fragment, null,
            (0, react_1.createElement)("div", { className: "wrap v6-crumb" },
                (0, react_1.createElement)(ui_1.Link, { to: w.status === 'process' ? '/projeler?durum=process' : '/projeler', navigate: a.navigate }, w.status === 'process' ? 'Uygulama Aşamaları' : 'Çalışma arşivi'),
                (0, react_1.createElement)("span", null, "/"),
                (0, react_1.createElement)(ui_1.Link, { to: '/kategoriler/' + w.category, navigate: a.navigate }, (0, portfolio_1.categoryName)(w.category))),
            (0, react_1.createElement)("section", { className: "wrap work-detail" },
                (0, react_1.createElement)("div", { className: "work-detail-media" },
                    (0, react_1.createElement)("button", { className: "work-main-photo", onClick: () => this.setState({ zoom: true }), "aria-label": "Proje foto\u011Fraf\u0131n\u0131 b\u00FCy\u00FCt" },
                        (0, react_1.createElement)(PortfolioUI_1.VImage, { asset: w.images[this.state.photo], alt: w.subtitle + '. ' + photo.caption, eager: true, full: true }),
                        (0, react_1.createElement)("span", null,
                            (0, react_1.createElement)(ui_1.Icon, { name: "plus" }),
                            "Foto\u011Fraf\u0131 incele")),
                    w.images.length > 1 && (0, react_1.createElement)("div", { className: "work-thumbnails" }, w.images.map((im, i) => (0, react_1.createElement)("button", { key: im, onClick: () => this.setState({ photo: i }), "aria-label": 'Fotoğraf ' + (i + 1), "aria-pressed": i === this.state.photo },
                        (0, react_1.createElement)(PortfolioUI_1.VImage, { asset: im, alt: "", sizes: "100px" })))),
                    (0, react_1.createElement)("p", { className: "photo-credit", "aria-live": "polite" },
                        this.state.photo + 1,
                        " / ",
                        w.images.length,
                        ". ",
                        photo.caption)),
                (0, react_1.createElement)("div", { className: "work-detail-copy" },
                    (0, react_1.createElement)(PortfolioUI_1.SourceTag, { kind: photo.kind }),
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
            (0, react_1.createElement)(ProjectStudy, { work: w, navigate: a.navigate }),
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
                    (0, react_1.createElement)("p", null,
                        photo.caption,
                        " ",
                        this.state.photo + 1,
                        " / ",
                        w.images.length))));
    }
}
exports.WorkDetail = WorkDetail;
function ConceptCard({ c, navigate, actions }) {
    const bed = c.category === 'baza-yatak', inquiry = (0, portfolio_1.modelHref)('', c.category, c.subtitle + ' üzerine konuşmak istiyorum.');
    const destination = bed ? '/kategoriler/baza-yatak?model=' + encodeURIComponent(c.id) : inquiry;
    return (0, react_1.createElement)("article", { className: 'concept-card' + (bed ? ' concept-card-bed' : ''), id: (0, selections_1.targetElementId)('concept:' + c.id), tabIndex: -1, "data-concept": c.id, "data-category": c.category },
        (0, react_1.createElement)(ui_1.Link, { to: destination, navigate: navigate, className: "concept-image", "aria-label": bed ? c.title + ' açık ve kapalı görünümlerini incele' : c.subtitle + ' ile başla' },
            (0, react_1.createElement)(PortfolioUI_1.VImage, { asset: c.image, alt: c.subtitle + ', konsept model', sizes: "(max-width: 680px) 90vw, (max-width: 1100px) 45vw, 30vw" }),
            (0, react_1.createElement)(PortfolioUI_1.SourceTag, { kind: "concept" }),
            (0, react_1.createElement)("span", { className: "concept-open" },
                (0, react_1.createElement)(ui_1.Icon, { name: "diagonal" }))),
        (0, react_1.createElement)("div", { className: "concept-caption" },
            (0, react_1.createElement)("span", null, (0, portfolio_1.categoryName)(c.category)),
            (0, react_1.createElement)("h3", null, c.title),
            (0, react_1.createElement)(ui_1.TextLink, { to: inquiry, navigate: navigate }, "Bu fikirle ba\u015Flayal\u0131m"),
            actions && (0, react_1.createElement)("button", { type: "button", className: "v7-save-text", "aria-label": (actions.favorites.includes('concept:' + c.id) ? 'İlham dosyasından çıkar. ' : 'İlham dosyama ekle. ') + c.subtitle, "aria-pressed": actions.favorites.includes('concept:' + c.id), onClick: () => actions.favorite('concept:' + c.id) },
                (0, react_1.createElement)(ui_1.Icon, { name: "heart", size: 18 }),
                actions.favorites.includes('concept:' + c.id) ? 'İlham dosyanızda' : 'İlham dosyama ekle')));
}
function Categories(a) {
    if (a.slug === 'baza-yatak')
        return (0, react_1.createElement)(BedCollection_1.BedCollection, { ...a });
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
            (0, react_1.createElement)(ServiceGuide_1.ServiceGuide, { category: cat.id, navigate: a.navigate }),
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
            (0, react_1.createElement)("div", { className: "category-grid" }, portfolio_1.workCategories.map((c, i) => (0, react_1.createElement)(ui_1.Link, { key: c.id, to: '/kategoriler/' + c.id, navigate: a.navigate, className: "category-tile" },
                (0, react_1.createElement)("div", null,
                    (0, react_1.createElement)(PortfolioUI_1.VImage, { asset: V7Pages_1.categorySupport[c.id]?.asset || c.image, alt: c.name + (V7Pages_1.categorySupport[c.id] ? ' atölye arşivi' : ' konsepti'), sizes: "(max-width: 680px) 90vw, 30vw" }),
                    (0, react_1.createElement)(PortfolioUI_1.SourceTag, { kind: V7Pages_1.categorySupport[c.id] ? 'work' : 'concept' })),
                (0, react_1.createElement)("span", { className: "category-number" }, String(i + 1).padStart(2, '0')),
                (0, react_1.createElement)("h2", null, c.name),
                (0, react_1.createElement)("p", null, c.line),
                (0, react_1.createElement)(ui_1.Icon, { name: "diagonal" })))),
            (0, react_1.createElement)("div", { className: "category-index-more" },
                (0, react_1.createElement)(ui_1.TextLink, { to: "/ilham-modelleri", navigate: a.navigate }, "T\u00FCm ilham modellerini ke\u015Ffedin"),
                (0, react_1.createElement)("p", null, "Farkl\u0131 alanlar i\u00E7in konseptler ve kayna\u011F\u0131 korunan Pinterest se\u00E7kileri."))),
        (0, react_1.createElement)(PortfolioUI_1.ModelCallout, { navigate: a.navigate }));
}
class Inspiration extends react_1.Component {
    constructor() {
        super(...arguments);
        this.state = { category: 'all', group: 'atelier', expanded: false };
        this.focusTarget = () => {
            const target = (0, selections_1.inspirationTarget)(new URLSearchParams(this.props.query || '').get('hedef'));
            if (!target)
                return;
            const pin = target.kind === 'reference' ? portfolio_1.pinterestReferences.find(p => 'pin:' + p.id === target.id) : null;
            this.setState({ category: target.kind === 'concept' ? target.category : 'all', group: pin?.group || 'atelier', expanded: !!pin }, () => {
                requestAnimationFrame(() => requestAnimationFrame(() => { const el = document.getElementById((0, selections_1.targetElementId)(target.id)); if (el) {
                    el.classList.add('v11-target');
                    el.focus({ preventScroll: true });
                    el.scrollIntoView({ block: 'center', behavior: 'instant' });
                } }));
            });
        };
        this.pinCard = (p) => {
            const a = this.props, title = pinterest_1.pinLookup[p.id]?.label || p.title;
            return (0, react_1.createElement)("article", { className: "pin-card", key: p.id, id: (0, selections_1.targetElementId)('pin:' + p.id), tabIndex: -1, "data-pin": p.id },
                (0, react_1.createElement)("span", { className: "eyebrow pin-source-label" }, "PINTEREST / DI\u015E REFERANS"),
                (0, react_1.createElement)("h3", null, title),
                (0, react_1.createElement)(PinterestPreview_1.PinterestPreview, { pin: p.id, disclosureId: "pinterest-disclosure" }),
                (0, react_1.createElement)("button", { className: "v7-save-text", "aria-label": (a.favorites.includes('pin:' + p.id) ? 'İlham dosyanızda. Kaydı kaldır. ' : 'İlham dosyama ekle. ') + title, "aria-pressed": a.favorites.includes('pin:' + p.id), onClick: () => a.favorite('pin:' + p.id) },
                    (0, react_1.createElement)(ui_1.Icon, { name: "heart", size: 18 }),
                    a.favorites.includes('pin:' + p.id) ? 'İlham dosyanızda' : 'İlham dosyama ekle'),
                (0, react_1.createElement)("div", { className: "pin-card-actions" },
                    (0, react_1.createElement)("a", { href: 'https://pin.it/' + p.id, target: "_blank", rel: "noopener noreferrer", className: "text-link" },
                        "Pinterest'te incele ",
                        (0, react_1.createElement)(ui_1.Icon, { name: "diagonal", size: 17 })),
                    (0, react_1.createElement)(ui_1.TextLink, { to: (0, portfolio_1.modelHref)('https://pin.it/' + p.id, p.category), navigate: a.navigate }, "Bu modelle ba\u015Flayal\u0131m")));
        };
    }
    componentDidMount() { this.focusTarget(); }
    componentDidUpdate(previous) { if (previous.query !== this.props.query)
        this.focusTarget(); }
    render() {
        const a = this.props, s = this.state, items = (0, portfolio_1.inspirationConcepts)(s.category), first = (0, portfolio_1.visiblePinterestReferences)(s.group), rest = (0, portfolio_1.visiblePinterestReferences)(s.group, true).slice(4), total = first.length + rest.length;
        return (0, react_1.createElement)(react_1.Fragment, null,
            (0, react_1.createElement)("header", { className: "v6-page-head wrap inspiration-heading" },
                (0, react_1.createElement)(ui_1.Eyebrow, null, "EL\u0130F / \u0130LHAM DEFTER\u0130"),
                (0, react_1.createElement)("div", null,
                    (0, react_1.createElement)("h1", null,
                        "Bir yerde g\u00F6rd\u00FCn\u00FCz.",
                        (0, react_1.createElement)("br", null),
                        (0, react_1.createElement)("em", null, "Akl\u0131n\u0131zda kald\u0131.")),
                    (0, react_1.createElement)("p", null, "Farkl\u0131 alanlardan fikir se\u00E7in. Be\u011Fendi\u011Finiz ayr\u0131nt\u0131y\u0131 kendi mek\u00E2n\u0131n\u0131za ve kullan\u0131m\u0131n\u0131za g\u00F6re birlikte d\u00FC\u015F\u00FCnelim.")),
                (0, react_1.createElement)(ui_1.ButtonLink, { to: "/modelini-getir", navigate: a.navigate }, "Kendi modelimi getireyim"),
                (0, react_1.createElement)("nav", { className: "inspiration-jump-links", "aria-label": "\u0130lham se\u00E7kileri" },
                    (0, react_1.createElement)("a", { href: "#konsept-seckisi" }, "Konsept se\u00E7kisi"),
                    (0, react_1.createElement)("a", { href: "#pinterest-seckileri" }, "Pinterest se\u00E7kileri"))),
            (0, react_1.createElement)("section", { className: "wrap v6-section inspiration-concepts", id: "konsept-seckisi" },
                (0, react_1.createElement)("div", { className: "v6-heading" },
                    (0, react_1.createElement)("div", null,
                        (0, react_1.createElement)(ui_1.Eyebrow, null, "B\u0130Z\u0130M KONSEPT SE\u00C7K\u0130M\u0130Z"),
                        (0, react_1.createElement)("h2", null,
                            "Biraz ",
                            (0, react_1.createElement)("em", null, "ilham."))),
                    (0, react_1.createElement)("p", null, "Tasar\u0131m fikirleri. Bitmi\u015F proje veya teknik \u00FCretim onay\u0131 de\u011Fildir.")),
                (0, react_1.createElement)("div", { className: "filter-chips", role: "group", "aria-label": "\u0130lham kategorisi" }, [{ id: 'all', name: 'Tüm alanlar' }, ...portfolio_1.workCategories].map(c => (0, react_1.createElement)("button", { key: c.id, "aria-pressed": c.id === s.category, onClick: () => this.setState({ category: c.id }) }, c.name))),
                (0, react_1.createElement)("p", { className: "inspiration-result", role: "status", "aria-live": "polite" }, s.category === 'all' ? items.length + ' alan, ' + items.length + ' başlangıç fikri. Diğer modeller kategori içinde.' : (0, portfolio_1.categoryName)(s.category) + ' için ' + items.length + ' konsept model.'),
                (0, react_1.createElement)("div", { className: "concept-grid" }, items.map(c => (0, react_1.createElement)(ConceptCard, { c: c, key: c.id, navigate: a.navigate, actions: a }))),
                s.category === 'baza-yatak' && (0, react_1.createElement)("div", { className: "inspiration-category-link" },
                    (0, react_1.createElement)(ui_1.TextLink, { to: "/kategoriler/baza-yatak", navigate: a.navigate }, "Baza koleksiyonunun a\u00E7\u0131k ve kapal\u0131 g\u00F6r\u00FCn\u00FCmlerini inceleyin"))),
            (0, react_1.createElement)("section", { className: "pinterest-section", id: "pinterest-seckileri" },
                (0, react_1.createElement)("div", { className: "wrap" },
                    (0, react_1.createElement)("div", { className: "v6-heading" },
                        (0, react_1.createElement)("div", null,
                            (0, react_1.createElement)(ui_1.Eyebrow, null, "KAYNA\u011EINDAN KE\u015EFED\u0130N"),
                            (0, react_1.createElement)("h2", null,
                                "Pinterest'ten",
                                (0, react_1.createElement)("br", null),
                                (0, react_1.createElement)("em", null, "kaydetti\u011Fimiz fikirler."))),
                        (0, react_1.createElement)("p", null, "Kayna\u011F\u0131n\u0131 inceleyin, ilham dosyan\u0131za ekleyin veya be\u011Fendi\u011Finiz ba\u011Flant\u0131yla g\u00F6r\u00FC\u015Fmeye ba\u015Flay\u0131n.")),
                    (0, react_1.createElement)("p", { className: "pin-consent-note", id: "pinterest-disclosure" },
                        (0, react_1.createElement)("strong", null, "G\u00F6rseller yaln\u0131z siz y\u00FCklemeyi se\u00E7ti\u011Finizde a\u00E7\u0131l\u0131r."),
                        " Pinterest'e ba\u011Flan\u0131ld\u0131\u011F\u0131nda IP ve taray\u0131c\u0131 bilgileri aktar\u0131labilir, d\u0131\u015F servis \u00E7erez kullanabilir. Bunlar tamamlanm\u0131\u015F Elif projeleri de\u011Fildir."),
                    (0, react_1.createElement)("div", { className: "pin-toolbar" },
                        (0, react_1.createElement)("div", { className: "view-segments pin-segments", role: "group", "aria-label": "Pinterest se\u00E7kisi" },
                            (0, react_1.createElement)("button", { "aria-pressed": s.group === 'atelier', onClick: () => this.setState({ group: 'atelier', expanded: false }) }, "Ustan\u0131n se\u00E7tikleri"),
                            (0, react_1.createElement)("button", { "aria-pressed": s.group === 'shared', onClick: () => this.setState({ group: 'shared', expanded: false }) }, "Birlikte \u00F6nerilenler")),
                        (0, react_1.createElement)("span", { className: "pin-count", "aria-live": "polite" },
                            s.expanded ? total : first.length,
                            " / ",
                            total,
                            " referans")),
                    (0, react_1.createElement)("div", { className: "pin-grid" }, first.map(this.pinCard)),
                    rest.length > 0 && (0, react_1.createElement)("details", { className: "pin-more", key: s.group, open: s.expanded, onToggle: e => { if (e.currentTarget.open !== this.state.expanded)
                            this.setState({ expanded: e.currentTarget.open }); } },
                        (0, react_1.createElement)("summary", { "aria-controls": "pin-expanded-list" },
                            s.expanded ? 'Ek referansları daralt' : 'Diğer ' + rest.length + ' referansı göster',
                            " ",
                            (0, react_1.createElement)(ui_1.Icon, { name: "plus", size: 18 })),
                        (0, react_1.createElement)("div", { className: "pin-grid", id: "pin-expanded-list" }, rest.map(this.pinCard))),
                    (0, react_1.createElement)("noscript", null,
                        (0, react_1.createElement)("div", { className: "pin-noscript" },
                            (0, react_1.createElement)("h3", null, "Birlikte \u00F6nerilenlerin kaynaklar\u0131"),
                            portfolio_1.pinterestReferences.filter(p => p.group === 'shared').map(p => (0, react_1.createElement)("p", { key: p.id },
                                (0, react_1.createElement)("a", { href: pinterest_1.pinLookup[p.id]?.canonical || 'https://pin.it/' + p.id, target: "_blank", rel: "noopener noreferrer" }, pinterest_1.pinLookup[p.id]?.label || p.title))))),
                    (0, react_1.createElement)("p", { className: "pin-note" }, "Kaynaklar ilgili \u00FCreticilerine aittir. Ba\u011Flant\u0131lar de\u011Fi\u015Febilir veya giri\u015F gerektirebilir. \u00D6nizleme formunuza bilgi aktarmaz. G\u00F6rsel a\u00E7\u0131lmazsa Pinterest ba\u011Flant\u0131s\u0131n\u0131 kullanabilirsiniz."))),
            (0, react_1.createElement)(PortfolioUI_1.ModelCallout, { navigate: a.navigate }));
    }
}
exports.Inspiration = Inspiration;
function AboutAtelier(a) {
    return (0, react_1.createElement)(react_1.Fragment, null,
        (0, react_1.createElement)("header", { className: "v6-page-head wrap", "data-atelier-view": a.atelier ? 'process' : 'story' },
            (0, react_1.createElement)(ui_1.Eyebrow, null, a.atelier ? 'ELİF / TEZGÂHTAN MEKÂNA' : 'ELİF / AİLEDEN GELEN USTALIK'),
            (0, react_1.createElement)("div", null,
                (0, react_1.createElement)("h1", null, a.atelier ? (0, react_1.createElement)(react_1.Fragment, null,
                    "Bir fikrin",
                    (0, react_1.createElement)("br", null),
                    (0, react_1.createElement)("em", null, "\u015Fekil ald\u0131\u011F\u0131 yer.")) : (0, react_1.createElement)(react_1.Fragment, null,
                    "Bir meslekten fazlas\u0131.",
                    (0, react_1.createElement)("br", null),
                    (0, react_1.createElement)("em", null, "Bir aile miras\u0131."))),
                (0, react_1.createElement)("p", null, a.atelier ? 'Paylaşılan uygulama kareleri üzerinden, yerleşimden montaj ayrıntısına. İşin yalnız son görünümüne değil, oluşma aşamalarına da bakalım.' : "Yunus Usta'nın babasından öğrendiği marangozluk, bugün farklı yaşam alanlarında devam ediyor. Hazır bir kalıp değil, ihtiyaca göre düşünülmüş bir çalışma."))),
        (0, react_1.createElement)("section", { className: "atelier-documentary" },
            (0, react_1.createElement)("div", { className: "atelier-documentary-image" },
                (0, react_1.createElement)(PortfolioUI_1.VImage, { asset: "work-joinery", alt: "At\u00F6lyenin ah\u015Fap kamelya uygulamas\u0131ndaki \u00E7at\u0131 birle\u015Fimi ayr\u0131nt\u0131s\u0131", eager: true, sizes: "70vw" }),
                (0, react_1.createElement)(PortfolioUI_1.SourceTag, { kind: "process" })),
            (0, react_1.createElement)("div", null,
                (0, react_1.createElement)(ui_1.Eyebrow, null, a.atelier ? 'ARŞİVDEN BİR UYGULAMA AYRINTISI' : "YUNUS USTA'NIN ELİNDEN ÇIKANLAR"),
                (0, react_1.createElement)("h2", null, a.atelier ? (0, react_1.createElement)(react_1.Fragment, null,
                    "G\u00F6r\u00FCnen y\u00FCzeyin",
                    (0, react_1.createElement)("br", null),
                    (0, react_1.createElement)("em", null, "arkas\u0131ndaki d\u00FCzen.")) : (0, react_1.createElement)(react_1.Fragment, null,
                    "\u00D6l\u00E7\u00FCs\u00FCnde dikkat.",
                    (0, react_1.createElement)("br", null),
                    (0, react_1.createElement)("em", null, "Ayr\u0131nt\u0131s\u0131nda emek."))),
                a.atelier ? (0, react_1.createElement)(react_1.Fragment, null,
                    (0, react_1.createElement)("p", null, "Bu kare, ah\u015Fap kamelyan\u0131n \u00E7at\u0131 alt\u0131 birle\u015Fimlerini g\u00F6steriyor. Di\u011Fer uygulama foto\u011Fraflar\u0131nda dolap yerle\u015Fimi, koruyucu filmler ve kurulum ayr\u0131nt\u0131lar\u0131 g\u00F6r\u00FClebilir."),
                    (0, react_1.createElement)("p", null, "Foto\u011Fraflar s\u00FCrecin belirli anlar\u0131d\u0131r. Tamamlanma tarihi, teknik uygunluk veya teslim onay\u0131 yerine ge\u00E7mez. Kendi projenizde \u00F6l\u00E7\u00FC, malzeme, ba\u011Flant\u0131 ve montaj kapsam\u0131n\u0131 ayr\u0131 ayr\u0131 konu\u015Fabiliriz."),
                    (0, react_1.createElement)(ui_1.TextLink, { to: "/hakkimizda", navigate: a.navigate }, "Aile hik\u00E2yemizi ke\u015Ffedin")) : (0, react_1.createElement)(react_1.Fragment, null,
                    (0, react_1.createElement)("p", null, "Bir dolab\u0131n nas\u0131l a\u00E7\u0131ld\u0131\u011F\u0131n\u0131, bir raf\u0131n ne ta\u015F\u0131yaca\u011F\u0131n\u0131, bir k\u00F6\u015Fenin g\u00FCnl\u00FCk ya\u015Famda nas\u0131l kullan\u0131laca\u011F\u0131n\u0131 birlikte konu\u015Farak ba\u015Flar\u0131z."),
                    (0, react_1.createElement)("p", null, "Mesle\u011Fin aileden gelen bilgisini, sizin alan\u0131n\u0131z\u0131n ihtiyac\u0131yla bulu\u015Ftururuz. Bir \u00E7izim haz\u0131rlaman\u0131z \u015Fart de\u011Fil. Be\u011Fendi\u011Finiz ayr\u0131nt\u0131y\u0131 ve neyi de\u011Fi\u015Ftirmek istedi\u011Finizi do\u011Frudan Yunus Usta ile konu\u015Fabilirsiniz."),
                    (0, react_1.createElement)(ui_1.TextLink, { to: "/atolye", navigate: a.navigate }, "At\u00F6lye s\u00FCrecini inceleyin")))),
        (0, react_1.createElement)("section", { className: "wrap atelier-values" }, (a.atelier ? [
            ['Ölçüyü konuşmak.', 'Yaklaşık ölçü ve mekân fotoğrafı başlangıçtır. İmalata esas ölçüler, uygulama öncesinde ayrıca netleştirilir.'],
            ['Ayrıntıyı ayırmak.', 'Gövde, yüzey, kapak ve donanım farklı kararlardır. Görselde beğendiğiniz ayrıntının nasıl uygulanacağını görüşmede sorun.'],
            ['Kapsamı netleştirmek.', 'Nakliye, yerinde montaj ve varsa diğer işler aynı şey değildir. Hangi işin kimin sorumluluğunda olduğu teklifte belirlenir.']
        ] : [
            ['Aile atölyesi.', 'Nesilden nesile aktarılan meslek bilgisi. Doğrudan ustayla konuşarak ilerleyen bir süreç.'],
            ['Ölçüye özel.', 'Alanınızın ihtiyacından başlar, kullanım biçiminize göre şekillendiririz.'],
            ['Birlikte karar.', 'Hazır bir modele bağlı kalmak yerine, neyi korumak ve neyi değiştirmek istediğinizi konuşuruz.']
        ]).map(([title, text], i) => (0, react_1.createElement)("div", { key: title },
            (0, react_1.createElement)("span", null,
                "0",
                i + 1),
            (0, react_1.createElement)("h2", null, title),
            (0, react_1.createElement)("p", null, text)))),
        a.atelier && (0, react_1.createElement)("section", { className: "wrap v6-section" },
            (0, react_1.createElement)("div", { className: "v6-heading" },
                (0, react_1.createElement)("div", null,
                    (0, react_1.createElement)(ui_1.Eyebrow, null, "UYGULAMA AR\u015E\u0130V\u0130"),
                    (0, react_1.createElement)("h2", null,
                        "Uygulama foto\u011Fraflar\u0131.",
                        (0, react_1.createElement)("br", null),
                        (0, react_1.createElement)("em", null, "\u0130\u015Fin i\u00E7inden."))),
                (0, react_1.createElement)("p", null, "Bu kareler uygulama a\u015Famas\u0131n\u0131 g\u00F6sterir. Bitmi\u015F projelerin tan\u0131t\u0131m \u00E7ekimleri olarak sunulmaz.")),
            (0, react_1.createElement)("div", { className: "work-grid" }, portfolio_1.works.filter(w => w.status === 'process').map((w, i) => (0, react_1.createElement)(PortfolioUI_1.WorkCard, { key: w.id, work: w, actions: a, index: i }))),
            (0, react_1.createElement)(ui_1.TextLink, { to: "/projeler?durum=process", navigate: a.navigate }, "Uygulama ar\u015Fivini a\u00E7\u0131n")),
        (0, react_1.createElement)("div", { className: "wrap address-note" },
            (0, react_1.createElement)(ui_1.Icon, { name: "pin", size: 28 }),
            (0, react_1.createElement)("div", null,
                (0, react_1.createElement)("h2", null, "\u0130stanbul'da, yeni at\u00F6lyemize haz\u0131rlan\u0131yoruz."),
                (0, react_1.createElement)("p", null, "Yeni at\u00F6lye adresi netle\u015Fti\u011Finde burada payla\u015F\u0131lacak. Ziyaret \u00F6ncesinde Yunus Usta ile g\u00F6r\u00FC\u015Ferek adresi ve uygunlu\u011Fu teyit edin. Projenizi bir fikir ve yakla\u015F\u0131k \u00F6l\u00E7\u00FCyle haz\u0131rlamaya ba\u015Flayabilirsiniz."))),
        (0, react_1.createElement)(PortfolioUI_1.ModelCallout, { navigate: a.navigate }));
}

},
"src/pages/ServiceGuide":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceGuide = ServiceGuide;
const react_1 = require("react");
const ui_1 = require("../components/ui");
const PortfolioUI_1 = require("../components/PortfolioUI");
const portfolio_1 = require("../lib/portfolio");
function ServiceGuide(a) {
    const completed = portfolio_1.works.filter(w => w.status === 'work'), categories = new Set(completed.map(w => w.category)).size;
    return (0, react_1.createElement)(react_1.Fragment, null,
        (0, react_1.createElement)("header", { className: "v6-page-head wrap" },
            (0, react_1.createElement)(ui_1.Eyebrow, null, "EL\u0130F / H\u0130ZMET VE TEKL\u0130F REHBER\u0130"),
            (0, react_1.createElement)("div", null,
                (0, react_1.createElement)("h1", null,
                    "G\u00FCzel bir i\u015F,",
                    (0, react_1.createElement)("br", null),
                    (0, react_1.createElement)("em", null, "a\u00E7\u0131k bir anla\u015Fmayla ba\u015Flar.")),
                (0, react_1.createElement)("p", null, "Bir modelin foto\u011Fraf\u0131ndan, size ait bir mobilyaya. \u00D6l\u00E7\u00FCy\u00FC, malzemeyi ve kapsam\u0131 ayn\u0131 a\u00E7\u0131kl\u0131kla konu\u015Fal\u0131m."))),
        (0, react_1.createElement)("section", { className: "wrap v21-guide-hero" },
            (0, react_1.createElement)("div", null,
                (0, react_1.createElement)(PortfolioUI_1.VImage, { asset: "r13", alt: "Elif Tasar\u0131m at\u00F6lye ar\u015Fivindeki mutfak uygulamas\u0131", eager: true, sizes: "(max-width: 800px) 92vw, 52vw" }),
                (0, react_1.createElement)(PortfolioUI_1.SourceTag, { kind: "work" })),
            (0, react_1.createElement)("div", null,
                (0, react_1.createElement)(ui_1.Eyebrow, null, "\u00D6NCE NEYE \u0130HT\u0130YACINIZ VAR?"),
                (0, react_1.createElement)("h2", null,
                    "Bir b\u00FCt\u00E7eden \u00F6nce,",
                    (0, react_1.createElement)("br", null),
                    (0, react_1.createElement)("em", null, "bir \u00F6ncelik.")),
                (0, react_1.createElement)("p", null, "Daha fazla depolama, rahat bir \u00E7al\u0131\u015Fma alan\u0131 veya evinize uyan bir \u00F6l\u00E7\u00FC. \u00D6nceli\u011Finizi ve varsa b\u00FCt\u00E7e beklentinizi ilk g\u00F6r\u00FC\u015Fmede payla\u015F\u0131n."),
                (0, react_1.createElement)("p", null, "Burada do\u011Frulanm\u0131\u015F fiyat listesi bulunmuyor. Ayn\u0131 g\u00F6r\u00FCn\u00FCm, farkl\u0131 g\u00F6vde, kapak, donan\u0131m ve uygulama kararlar\u0131yla farkl\u0131 bir kapsama d\u00F6n\u00FC\u015Febilir."),
                (0, react_1.createElement)(ui_1.ButtonLink, { to: "/modelini-getir", navigate: a.navigate }, "Fikrimi ve \u00F6nceliklerimi haz\u0131rlayay\u0131m"))),
        (0, react_1.createElement)("section", { className: "wrap v21-guide-section" },
            (0, react_1.createElement)(ui_1.Eyebrow, null, "TEKL\u0130FLER\u0130 AYNI KAPSAMDA KAR\u015EILA\u015ETIRIN"),
            (0, react_1.createElement)("h2", null,
                "Fiyat\u0131n arkas\u0131ndaki",
                (0, react_1.createElement)("br", null),
                (0, react_1.createElement)("em", null, "alt\u0131 karar.")),
            (0, react_1.createElement)("div", { className: "v21-scope-grid" }, [
                ['Ölçü ve yerleşim', 'En, derinlik ve yükseklik yanında kapak, çekmece ve geçiş alanını da konuşun. İlk ölçü, üretim için onaylanmış son ölçü değildir.'],
                ['Gövde ve kapak', 'Ahşap türü, masif veya kaplama yaklaşımı, levha ve kapak yapısı ayrı kalemlerdir. Yalnız fotoğrafın rengine bakarak aynı malzemeyi varsaymayın.'],
                ['Yüzey ve numune', 'Matlık, renk ve doku için gerçek numuneyi isteyin. Ekrandaki tonun üretim onayı olmadığını akılda tutun.'],
                ['Donanım ve ayrıntı', 'Ray, menteşe, kulp, aydınlatma ve hareketli mekanizmanın kapsamını ayrı sorun. Marka ve model ancak doğrulanınca teklifin parçası olur.'],
                ['Taşıma ve montaj', 'İlçe, kat, asansör ve erişim durumunu paylaşın. Söküm, nakliye, taşıma, montaj ve elektrik işlerinin dahil olup olmadığını yazılı netleştirin.'],
                ['Takvim ve onay', 'Çizim, son ölçü, revizyon, ödeme planı ve teslim beklentisi birlikte netleşsin. Taslak görüşme, üretim talimatı veya kesin sipariş değildir.']
            ].map(([title, text], i) => (0, react_1.createElement)("article", { key: title },
                (0, react_1.createElement)("span", null,
                    "0",
                    i + 1),
                (0, react_1.createElement)("h3", null, title),
                (0, react_1.createElement)("p", null, text))))),
        (0, react_1.createElement)("section", { className: "wrap v21-guide-terms" },
            (0, react_1.createElement)("div", null,
                (0, react_1.createElement)(ui_1.Eyebrow, null, "\u0130STANBUL / PROJEN\u0130ZE G\u00D6RE"),
                (0, react_1.createElement)("h2", null,
                    "Gelmeden \u00F6nce,",
                    (0, react_1.createElement)("br", null),
                    (0, react_1.createElement)("em", null, "konu\u015Fal\u0131m.")),
                (0, react_1.createElement)("p", null, "Yeni at\u00F6lye adresi ve ziyaret saatleri kesinle\u015Fmedi. Yunus Usta ile g\u00F6r\u00FC\u015Fmeden yola \u00E7\u0131kmay\u0131n. \u0130l\u00E7enizi belirterek ke\u015Fif, nakliye ve montaj uygunlu\u011Funu sorun."),
                (0, react_1.createElement)(ui_1.TextLink, { to: "/iletisim", navigate: a.navigate }, "Do\u011Frudan ileti\u015Fim")),
            (0, react_1.createElement)("div", null,
                (0, react_1.createElement)("h3", null, "Yaz\u0131l\u0131 olarak netle\u015Ftirilecekler"),
                (0, react_1.createElement)("ul", null,
                    (0, react_1.createElement)("li", null, "\u00DCretilecek par\u00E7alar, malzeme ve donan\u0131m kapsam\u0131."),
                    (0, react_1.createElement)("li", null, "Ke\u015Fif gereklili\u011Fi ve varsa \u00FCcreti."),
                    (0, react_1.createElement)("li", null, "Fiyat, kapora ve \u00F6deme a\u015Famalar\u0131."),
                    (0, react_1.createElement)("li", null, "De\u011Fi\u015Fiklik, iptal ve teslim ko\u015Fullar\u0131."),
                    (0, react_1.createElement)("li", null, "Bak\u0131m talimat\u0131, garanti ve teslim sonras\u0131 destek kapsam\u0131.")),
                (0, react_1.createElement)("p", { className: "field-hint" }, "Bu sayfa genel g\u00F6r\u00FC\u015Fme haz\u0131rl\u0131\u011F\u0131d\u0131r. \u0130\u015Fletmenin onayl\u0131 s\u00F6zle\u015Fmesinin veya yasal haklar\u0131n\u0131z\u0131n yerine ge\u00E7mez. \u00DCcretsiz ke\u015Fif, kesin fiyat veya garanti s\u00FCresi vaat edilmez."))),
        (0, react_1.createElement)("section", { className: "wrap v21-proof" },
            (0, react_1.createElement)(ui_1.Icon, { name: "hand", size: 28 }),
            (0, react_1.createElement)("div", null,
                (0, react_1.createElement)("h2", null, "\u0130\u015Fi, foto\u011Fraf\u0131ndan ve ayr\u0131nt\u0131s\u0131ndan tan\u0131y\u0131n."),
                (0, react_1.createElement)("p", null,
                    "Payla\u015F\u0131lan ar\u015Fivde ",
                    completed.length,
                    " tamamlanm\u0131\u015F \u00E7al\u0131\u015Fma kayd\u0131, ",
                    categories,
                    " kullan\u0131m kategorisinde incelenebilir. Bu say\u0131 i\u015Fletmenin toplam i\u015F adedi de\u011Fil, yaln\u0131z sitedeki se\u00E7kidir. Uygulama foto\u011Fraflar\u0131 ve konsept modeller ayr\u0131 etiketlidir.")),
            (0, react_1.createElement)(ui_1.ButtonLink, { to: "/projeler", navigate: a.navigate, secondary: true }, "Ger\u00E7ek i\u015Fleri incele")),
        (0, react_1.createElement)("section", { className: "wrap v21-help-links" },
            (0, react_1.createElement)(ui_1.TextLink, { to: "/sikca-sorulan-sorular", navigate: a.navigate }, "S\u0131k\u00E7a sorulan sorular"),
            (0, react_1.createElement)(ui_1.TextLink, { to: "/rehber/olcu-alma", navigate: a.navigate }, "\u00D6l\u00E7\u00FC haz\u0131rl\u0131\u011F\u0131"),
            (0, react_1.createElement)(ui_1.TextLink, { to: "/rehber/malzeme-secimi", navigate: a.navigate }, "Malzeme se\u00E7imi"),
            (0, react_1.createElement)(ui_1.TextLink, { to: "/rehber/bakim", navigate: a.navigate }, "Bak\u0131m notlar\u0131")));
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
const service_content_1 = require("../lib/service-content");
const react_1 = require("react");
const ui_1 = require("../components/ui");
const PortfolioUI_1 = require("../components/PortfolioUI");
const portfolio_1 = require("../lib/portfolio");
const selections_1 = require("../lib/selections");
const project_1 = require("../lib/project");
const contact_options_1 = require("../lib/contact-options");
const site_profile_1 = require("../lib/site-profile");
const InspirationTransfer_1 = require("../components/InspirationTransfer");
const TextCopy_1 = require("../components/TextCopy");
const domain_1 = require("../lib/domain");
exports.categorySupport = {
    'kahve-kosesi': { asset: 'r07', headline: 'Ölçünüze göre bir kahve köşesi.', intro: 'Cihazlarınızın yerleşimini, servis yüzeyini ve depolamayı birlikte düşünelim. Başlangıç noktamız alanınız ve gün içindeki kullanımınız.', questions: ['Hangi kahve makinesini kullanıyorsunuz?', 'Fincan ve ekipman için ne kadar saklama alanı gerekiyor?', 'Priz, su ve aydınlatma ihtiyacınız nedir?'] },
    'mutfak': { asset: 'r13', headline: 'Mutfak, sizin düzeninize uysun.', intro: 'Bir mutfağın güzel görünmesi kadar, günlük hayatınıza uyması da önemli. Yerleşim, cihazlar ve depolama üzerinden başlayalım.', questions: ['Mevcut mutfak planı ve yaklaşık ölçüleriniz nasıl?', 'Korunacak cihaz, tezgâh veya tesisat var mı?', 'Çekmece, raf ve kapak kullanımında önceliğiniz ne?'] },
    'tv-unitesi': { asset: 'r22', headline: 'Duvarınıza göre TV ünitesi.', intro: 'Ekran, kitaplar, kablolar ve depolama tek bir düzenin parçaları. Odanızın ölçüsünü ve kullanım alışkanlığınızı birlikte değerlendirelim.', questions: ['TV boyutu ve duvar genişliği nedir?', 'Priz ve kablo çıkışları hangi noktalarda?', 'Açık raf mı, kapalı depolama mı istersiniz?'] }
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
                    ['Önce hangi bilgileri paylaşmalıyım?', service_content_1.serviceContent[category] ? service_content_1.serviceContent[category].preparation.join(' ') : info ? info.questions.join(' ') : 'Ürünün kullanım amacı, yaklaşık alan veya ölçü, ilçe ve sizin için önemli ayrıntılarla başlayabilirsiniz. Kesin imalat ölçüsünü ilk mesajda bilmeniz gerekmiyor.'],
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
        this.update = (q) => { this.setState({ q }); history.replaceState({ ...history.state }, '', (0, domain_1.publicHref)('/arama' + (q ? '?q=' + encodeURIComponent(q) : ''))); };
        this.state = { q: new URLSearchParams(p.query || '').get('q') || '' };
    }
    componentDidUpdate(previous) { if (previous.query !== this.props.query)
        this.setState({ q: new URLSearchParams(this.props.query || '').get('q') || '' }); }
    render() { const a = this.props, k = (0, selections_1.searchTerms)(this.state.q), list = (0, selections_1.searchEntries)(this.state.q), cats = portfolio_1.workCategories.filter(c => (0, selections_1.searchTerms)(c.name).includes(k)); return (0, react_1.createElement)(react_1.Fragment, null,
        (0, react_1.createElement)("header", { className: "v6-page-head wrap" },
            (0, react_1.createElement)(ui_1.Eyebrow, null, "EL\u0130F / B\u0130RL\u0130KTE BULALIM"),
            (0, react_1.createElement)("div", null,
                (0, react_1.createElement)("h1", null,
                    "Akl\u0131n\u0131zdaki",
                    (0, react_1.createElement)("br", null),
                    (0, react_1.createElement)("em", null, "hangi par\u00E7a?")),
                (0, react_1.createElement)("p", null, "Ger\u00E7ek \u00E7al\u0131\u015Fmalar, Devir 01 st\u00FCdyosu, ilham modelleri ve rehberler ayn\u0131 aramada. Kaynak t\u00FCr\u00FC her sonu\u00E7ta belirtilir."))),
        (0, react_1.createElement)("section", { className: "wrap v7-search-page" },
            (0, react_1.createElement)("label", { className: "portfolio-search" },
                (0, react_1.createElement)(ui_1.Icon, { name: "search" }),
                (0, react_1.createElement)("input", { type: "search", "aria-label": "T\u00FCm sitede ara", value: this.state.q, maxLength: 100, onInput: e => this.update(e.currentTarget.value), placeholder: "Kahve, mutfak, gard\u0131rop\u2026" })),
            (0, react_1.createElement)("p", { role: "status" },
                list.length,
                " sonu\u00E7, ",
                cats.length,
                " kategori."),
            (0, react_1.createElement)("div", { className: "filter-chips" }, cats.map(c => (0, react_1.createElement)(ui_1.Link, { key: c.id, to: '/kategoriler/' + c.id, navigate: a.navigate },
                c.name,
                " ",
                (0, react_1.createElement)(ui_1.Icon, { size: 16 })))),
            (0, react_1.createElement)("div", { className: "v7-result-grid" }, list.map(x => (0, react_1.createElement)("article", { key: x.id },
                x.image && (0, react_1.createElement)(ui_1.Link, { to: x.path, navigate: a.navigate },
                    (0, react_1.createElement)(PortfolioUI_1.VImage, { asset: x.image, alt: x.title, sizes: "(max-width: 680px) 90vw, 30vw" })),
                x.kind === 'page' ? (0, react_1.createElement)("span", { className: "source-tag" }, "St\u00FCdyo ve rehber") : (0, react_1.createElement)(PortfolioUI_1.SourceTag, { kind: x.photoKind || x.kind }),
                (0, react_1.createElement)("h2", null,
                    (0, react_1.createElement)(ui_1.Link, { to: x.path, navigate: a.navigate }, x.title)),
                (0, react_1.createElement)("p", null, (0, portfolio_1.categoryName)(x.category)),
                x.kind !== 'page' && (0, react_1.createElement)("button", { className: "v7-save-text", "aria-pressed": a.favorites.includes(x.id), onClick: () => a.favorite(x.id) },
                    (0, react_1.createElement)(ui_1.Icon, { name: "heart", size: 18 }),
                    a.favorites.includes(x.id) ? 'Seçkiden çıkar' : 'İlham dosyama ekle')))),
            !list.length && !cats.length && (0, react_1.createElement)("div", { className: "v6-empty" },
                (0, react_1.createElement)("h2", null, "Bu kelimeyle bir sonu\u00E7 yok."),
                (0, react_1.createElement)("p", null, "Ba\u015Fka bir kelime deneyin veya fikrinizi do\u011Frudan Yunus Usta ile konu\u015Fun."),
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
        (0, react_1.createElement)(InspirationTransfer_1.InspirationTransfer, { ids: a.favorites, replace: a.replaceFavorites }),
        (0, react_1.createElement)("label", { className: "v7-check" },
            (0, react_1.createElement)("input", { type: "checkbox", checked: a.remember, onChange: e => a.setRemember(e.currentTarget.checked) }),
            "Se\u00E7ti\u011Fim herkese a\u00E7\u0131k model kimliklerini bu cihazda 30 g\u00FCn sakla."),
        (0, react_1.createElement)("p", { className: "field-hint" }, "Kapal\u0131yken yaln\u0131z bu a\u00E7\u0131k sekmede tutulur. Bu izin not, adres veya m\u00FC\u015Fteri foto\u011Fraf\u0131 saklamaz."),
        entries.length ? (0, react_1.createElement)(react_1.Fragment, null,
            (0, react_1.createElement)("div", { className: "v7-result-grid" }, entries.map(x => (0, react_1.createElement)("article", { key: x.id },
                x.image && (0, react_1.createElement)(ui_1.Link, { to: x.path, navigate: a.navigate },
                    (0, react_1.createElement)(PortfolioUI_1.VImage, { asset: x.image, alt: x.title, sizes: "(max-width: 680px) 90vw, 30vw" })),
                (0, react_1.createElement)(PortfolioUI_1.SourceTag, { kind: x.photoKind || x.kind }),
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
function ContactV7(a) { const profile = (0, site_profile_1.getSiteProfile)(); return (0, react_1.createElement)(react_1.Fragment, null,
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
            (0, react_1.createElement)(ui_1.Eyebrow, null, "YUNUS USTA"),
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
                    (0, react_1.createElement)(ui_1.Icon, { name: "phone" })),
                (0, react_1.createElement)("a", { className: "button button-outline", href: (0, contact_options_1.smsUrl)() },
                    "SMS uygulamas\u0131n\u0131 a\u00E7 ",
                    (0, react_1.createElement)(ui_1.Icon, { name: "diagonal" }))),
            (0, react_1.createElement)("div", { className: "v22-contact-email" },
                (0, react_1.createElement)(ui_1.Eyebrow, null, "E-POSTA \u0130LE DE ULA\u015EAB\u0130L\u0130RS\u0130N\u0130Z"),
                (0, react_1.createElement)("a", { className: "v22-visible-email", href: 'mailto:' + profile.email }, profile.email),
                (0, react_1.createElement)(TextCopy_1.TextCopy, { id: "v22-contact-email-copy", text: profile.email || '', label: "E-posta adresini kopyala" }),
                (0, react_1.createElement)("p", { className: "field-hint" }, "Adresimizi kendi e-posta uygulaman\u0131zda da kullanabilirsiniz. Foto\u011Fraf ve proje \u00F6zetinizi mesaj\u0131n\u0131za ayr\u0131ca ekleyin.")),
            (0, react_1.createElement)("p", { className: "field-hint" }, "Telefon, SMS, WhatsApp ve e-posta ba\u011Flant\u0131lar\u0131 ilgili uygulamay\u0131 a\u00E7ar. Mesaj\u0131n\u0131z\u0131 uygulamada siz g\u00F6nderirsiniz.")),
        (0, react_1.createElement)("div", { className: "v7-contact-side" },
            (0, react_1.createElement)(PortfolioUI_1.VImage, { asset: "work-joinery", alt: "Ah\u015Fap uygulama ar\u015Fivinden birle\u015Fim ayr\u0131nt\u0131s\u0131", sizes: "(max-width: 800px) 90vw, 40vw" }),
            (0, react_1.createElement)(PortfolioUI_1.SourceTag, { kind: "process" }),
            (0, react_1.createElement)("h3", null, "\u0130stanbul\u2019da, yeni at\u00F6lyemize haz\u0131rlan\u0131yoruz."),
            (0, react_1.createElement)("p", null, "Yeni a\u00E7\u0131k adres ve ziyaret d\u00FCzeni hen\u00FCz kesinle\u015Fmedi. Yola \u00E7\u0131kmadan \u00F6nce Yunus Usta ile g\u00F6r\u00FC\u015F\u00FCn. Hizmet b\u00F6lgesi, ke\u015Fif, teslim ve montaj kapsam\u0131 projenize g\u00F6re netle\u015Ftirilir."))),
    (0, react_1.createElement)("section", { className: "wrap v21-contact-facts", "aria-label": "G\u00F6r\u00FC\u015Fme ve ziyaret bilgileri" },
        (0, react_1.createElement)("article", null,
            (0, react_1.createElement)(ui_1.Eyebrow, null, "H\u0130ZMET B\u00D6LGES\u0130"),
            (0, react_1.createElement)("h3", null, "\u0130stanbul, projenize g\u00F6re."),
            (0, react_1.createElement)("p", null, "\u0130l\u00E7enizi ve ihtiya\u00E7 duydu\u011Funuz i\u015Fi payla\u015F\u0131n. Ke\u015Fif, nakliye ve montaj uygunlu\u011Funu ilk g\u00F6r\u00FC\u015Fmede netle\u015Ftirin.")),
        (0, react_1.createElement)("article", null,
            (0, react_1.createElement)(ui_1.Eyebrow, null, "Z\u0130YARET VE SAATLER"),
            (0, react_1.createElement)("h3", null, "Yola \u00E7\u0131kmadan teyit edin."),
            (0, react_1.createElement)("p", null, profile.hours || 'Yeni adres ve çalışma saatleri henüz kesinleşmedi. Ziyaretinizi telefonla görüşerek planlayın.')),
        (0, react_1.createElement)("article", null,
            (0, react_1.createElement)(ui_1.Eyebrow, null, "WHATSAPP DI\u015EINDA"),
            (0, react_1.createElement)("h3", null, "Bir konu\u015Fman\u0131n ba\u015Fka yollar\u0131."),
            (0, react_1.createElement)("p", null, "Telefon ve SMS ayn\u0131 do\u011Frulanm\u0131\u015F i\u015F numaras\u0131n\u0131 a\u00E7ar. \u00D6zetinizi indirip ba\u015Fka bir kanalda kendiniz payla\u015Fabilirsiniz."),
            profile.email && (0, react_1.createElement)("a", { href: 'mailto:' + profile.email }, profile.email))),
    (0, react_1.createElement)("section", { className: "wrap v7-contact-next" },
        (0, react_1.createElement)(ui_1.Link, { to: "/kolay-iletisim", navigate: a.navigate, className: "text-link" },
            "Sade ileti\u015Fim sayfas\u0131n\u0131 a\u00E7 ",
            (0, react_1.createElement)(ui_1.Icon, null)),
        (0, react_1.createElement)("h2", null, "G\u00F6r\u00FC\u015Fmeye bir dosyayla gelin."),
        (0, react_1.createElement)("p", null, "Foto\u011Fraf\u0131n\u0131z\u0131, Pinterest ba\u011Flant\u0131n\u0131z\u0131 ve yakla\u015F\u0131k \u00F6l\u00E7\u00FCn\u00FCz\u00FC ayn\u0131 proje \u00F6zetinde haz\u0131rlayabilirsiniz. Foto\u011Fraf y\u00FCklemek zorunlu de\u011Fildir."),
        (0, react_1.createElement)(ui_1.ButtonLink, { to: "/modelini-getir", navigate: a.navigate }, "Proje fikrimi haz\u0131rlayay\u0131m"),
        (0, react_1.createElement)("div", { className: "v21-help-links" },
            (0, react_1.createElement)(ui_1.ButtonLink, { to: "/hizmet-ve-teklif", navigate: a.navigate, secondary: true }, "Hizmet ve teklif rehberi"),
            (0, react_1.createElement)(ui_1.Link, { to: "/sikca-sorulan-sorular", navigate: a.navigate, className: "text-link" },
                "S\u0131k\u00E7a sorulan sorular ",
                (0, react_1.createElement)(ui_1.Icon, null))))); }
function PrivacyV7(a) { return (0, react_1.createElement)("section", { className: "wrap v7-readable" },
    (0, react_1.createElement)(ui_1.Eyebrow, null, "EL\u0130F / VER\u0130 VE DI\u015E SERV\u0130SLER"),
    (0, react_1.createElement)("h1", null,
        "Fikriniz size ait.",
        (0, react_1.createElement)("br", null),
        (0, react_1.createElement)("em", null, "Kontrol de sizde.")),
    (0, react_1.createElement)("p", null, "Bu a\u00E7\u0131klama tasar\u0131m \u00F6nizlemesinin fiil\u00EE davran\u0131\u015F\u0131n\u0131 anlat\u0131r. Tam ticari ayd\u0131nlatma metni veya hukuki uygunluk onay\u0131 de\u011Fildir. \u0130\u015Fletmenin veri sorumlusu bilgileri ve ticari hizmet \u015Fartlar\u0131 yay\u0131na ge\u00E7meden \u00F6nce tamamlanmal\u0131d\u0131r."),
    (0, react_1.createElement)("h2", null, "Proje tasla\u011F\u0131 ve g\u00F6rseller"),
    (0, react_1.createElement)("p", null, "Model ba\u011Flant\u0131s\u0131, notlar, yakla\u015F\u0131k \u00F6l\u00E7\u00FC, il\u00E7e ve se\u00E7ti\u011Finiz foto\u011Fraflar bu a\u00E7\u0131k sekmenin belle\u011Finde i\u015Flenir. Site i\u00E7indeki model ve \u00F6l\u00E7\u00FC ak\u0131\u015Flar\u0131 aras\u0131nda korunur. Varsay\u0131lan olarak sunucuya g\u00F6nderilmez, kal\u0131c\u0131 taray\u0131c\u0131 depolamas\u0131na yaz\u0131lmaz. Yenileme veya sekmeyi kapatma veriyi silebilir. Model formunda a\u00E7\u0131k izninizle yedi g\u00FCnl\u00FCk cihaz kurtarmas\u0131n\u0131 etkinle\u015Ftirebilir veya \u00F6zel JSON taslak dosyas\u0131n\u0131 indirebilirsiniz."),
    (0, react_1.createElement)("p", null, "Foto\u011Fraflar cihaz\u0131n\u0131zda en fazla 2000 piksel JPEG payla\u015F\u0131m kopyas\u0131 olarak haz\u0131rlan\u0131r. Dosya metadata\u2019s\u0131 bu kopyaya aktar\u0131lmaz. Foto\u011Frafta g\u00F6r\u00FCnen ki\u015Fi, adres, belge ve \u00F6zel nesneler otomatik silinmez. Payla\u015Fmadan \u00F6nce g\u00F6r\u00FCnt\u00FCy\u00FC kontrol edin."),
    (0, react_1.createElement)("h2", null, "\u0130zinli taslak kurtarma"),
    (0, react_1.createElement)("p", null, "Model formundaki izin kutusunu se\u00E7erseniz metin, model ba\u011Flant\u0131s\u0131 ve \u00F6l\u00E7\u00FCler yerel taray\u0131c\u0131 depolamas\u0131na yaz\u0131l\u0131r. Sonraki de\u011Fi\u015Fiklikler de kaydedilir. Son kay\u0131ttan itibaren yedi g\u00FCn ge\u00E7ince, site kayd\u0131 yeniden kontrol etti\u011Fi ilk anda siler. Taray\u0131c\u0131 kapal\u0131yken ba\u011F\u0131ms\u0131z bir silme g\u00F6revi \u00E7al\u0131\u015Fmaz. Geri geldi\u011Finizde kayd\u0131 a\u00E7may\u0131 siz se\u00E7ersiniz. Foto\u011Fraflar, dosyalar ve ilham dosyan\u0131z bu kayda dahil de\u011Fildir."),
    (0, react_1.createElement)("p", null, "Bu kay\u0131t \u015Fifreli bir hesap de\u011Fildir. Ayn\u0131 taray\u0131c\u0131 profilini kullanan ki\u015Filer eri\u015Febilir. Ortak bilgisayarda a\u00E7may\u0131n. \u0130zin kutusunu kapatmak veya cihaz kay\u0131tlar\u0131n\u0131 silmek kurtarma kayd\u0131n\u0131 kald\u0131r\u0131r, a\u00E7\u0131k taslaktaki notu silmez. Taray\u0131c\u0131 depolamay\u0131 engellerse kay\u0131t yap\u0131lamad\u0131\u011F\u0131 a\u00E7\u0131klan\u0131r. \u0130ndirilen JSON dosyas\u0131 ki\u015Fisel not ve il\u00E7e bilgisi i\u00E7erir, kendiniz g\u00FCvenli saklay\u0131n. JSON dosyas\u0131 cihazdaki yedi g\u00FCnl\u00FCk s\u00FCreden ba\u011F\u0131ms\u0131zd\u0131r."),
    (0, react_1.createElement)("h2", null, "\u0130lham dosyas\u0131 ve cihaz tercihleri"),
    (0, react_1.createElement)("p", null, "\u0130lham dosyas\u0131 varsay\u0131lan olarak bellektedir. A\u00E7\u0131k\u00E7a se\u00E7erseniz yaln\u0131z herkese a\u00E7\u0131k \u00E7al\u0131\u015Fma ve model kimlikleri 30 g\u00FCn yerel depolamada kal\u0131r. 3D se\u00E7enekleri a\u00E7\u0131k sekmede hat\u0131rlan\u0131r. Olu\u015Fturdu\u011Funuz tasar\u0131m ba\u011Flant\u0131s\u0131 yaln\u0131z herkese a\u00E7\u0131k model se\u00E7eneklerini ta\u015F\u0131r. \u00D6zel m\u00FC\u015Fteri notlar\u0131 bu ba\u011Flant\u0131ya eklenmez. \u0130lham kimliklerini saklama izni, \u00F6zel notlar\u0131 saklama izni de\u011Fildir. Model formundaki kurtarma izni ayr\u0131d\u0131r. Depolama tercihleri alan\u0131ndan kay\u0131tlar\u0131 silebilirsiniz."),
    (0, react_1.createElement)("h2", null, "WhatsApp, telefon ve cihaz payla\u015F\u0131m\u0131"),
    (0, react_1.createElement)("p", null, "WhatsApp'a yaz d\u00FC\u011Fmesi, kullan\u0131c\u0131 taraf\u0131ndan i\u015Fletme ileti\u015Fimi i\u00E7in verilen +90 530 879 71 69 numaras\u0131n\u0131 a\u00E7ar. D\u00FC\u011Fmeye bast\u0131\u011F\u0131n\u0131zda proje \u00F6zeti WhatsApp'\u0131n URL parametresine aktar\u0131l\u0131r ve harici servis kendi kurallar\u0131na g\u00F6re i\u015Fler. Siteden otomatik mesaj g\u00F6nderilmez. Foto\u011Fraflar bu metin ba\u011Flant\u0131s\u0131na dahil de\u011Fildir."),
    (0, react_1.createElement)("p", null, "Cihazdan payla\u015F se\u00E7ene\u011Fi, desteklenen cihazlarda i\u015Fletim sisteminin payla\u015F\u0131m men\u00FCs\u00FCn\u00FC a\u00E7ar. Uygulama ve al\u0131c\u0131y\u0131 siz se\u00E7ersiniz. ZIP veya TXT indirme yaln\u0131z dosyay\u0131 cihaz\u0131n\u0131za haz\u0131rlar. Bu site mesaj\u0131n g\u00F6nderildi\u011Fini, teslim edildi\u011Fini veya okundu\u011Funu do\u011Frulayamaz."),
    (0, react_1.createElement)("h2", null, "SMS ve e-posta tasla\u011F\u0131"),
    (0, react_1.createElement)("p", null,
        "SMS d\u00FC\u011Fmesi i\u015Fletme numaras\u0131n\u0131 cihaz\u0131n\u0131z\u0131n mesaj uygulamas\u0131nda a\u00E7ar. SMS metnini ve g\u00F6nderimini siz y\u00F6netirsiniz. E-posta tasla\u011F\u0131 se\u00E7ene\u011Fi, g\u00F6r\u00FCnt\u00FClenen proje metnini e-posta uygulamas\u0131na ta\u015F\u0131r. ",
        (0, site_profile_1.getSiteProfile)().email ? 'Alıcı alanı, ' + (0, site_profile_1.getSiteProfile)().email + ' adresiyle hazırlanır.' : 'İşletme e-postası henüz eklenmemişse alıcıyı kendiniz teyit ederek girmelisiniz.',
        " Uzun \u00F6zetlerde k\u0131sa giri\u015F metni ayr\u0131 a\u00E7\u0131klan\u0131r. Tam dosyay\u0131 ve foto\u011Fraflar\u0131 ayr\u0131ca ekleyin. Bu site e-posta veya SMS teslimini do\u011Frulamaz."),
    (0, react_1.createElement)("h2", null, "Tasar\u0131m kar\u015F\u0131la\u015Ft\u0131rmas\u0131 ve 3D dosyalar\u0131"),
    (0, react_1.createElement)("p", null, "Kar\u015F\u0131la\u015Ft\u0131rma defterindeki en fazla \u00FC\u00E7 masa konfig\u00FCrasyonu ve bu sahnelerden al\u0131nan g\u00F6r\u00FCnt\u00FCler yaln\u0131z a\u00E7\u0131k sekmede tutulur. JSON dosyas\u0131 yaln\u0131z masa se\u00E7eneklerini i\u00E7erir. Oda \u00F6l\u00E7\u00FCleri, m\u00FC\u015Fteri notlar\u0131 ve ev foto\u011Fraflar\u0131 bu dosyaya eklenmez. GLB ve USDZ d\u0131\u015Fa aktar\u0131m\u0131 cihaz\u0131n\u0131zda yap\u0131l\u0131r. Bir sunucuya model veya ki\u015Fisel veri g\u00F6nderilmez. Yazd\u0131r\u0131labilir tasar\u0131m sayfas\u0131 da yaln\u0131z a\u00E7\u0131k model se\u00E7eneklerini i\u00E7erir. AR davran\u0131\u015F\u0131 cihaz\u0131n kendi g\u00F6r\u00FCnt\u00FCleyicisine ba\u011Fl\u0131d\u0131r."),
    (0, react_1.createElement)("h2", null, "Pinterest"),
    (0, react_1.createElement)("p", null, "Pinterest g\u00F6r\u00FCnt\u00FCleyicisi, a\u00E7\u0131klamay\u0131 g\u00F6r\u00FCp ilgili d\u00FC\u011Fmeye bast\u0131\u011F\u0131n\u0131zda y\u00FCklenir. IP adresi ve taray\u0131c\u0131 bilgileri gibi teknik bilgiler d\u0131\u015F hizmete gidebilir, Pinterest \u00E7erez kullanabilir. A\u00E7may\u0131 se\u00E7meden Pinterest iste\u011Fi yap\u0131lmaz. Kaynak ba\u011Flant\u0131s\u0131n\u0131 ayr\u0131 sekmede a\u00E7mak da harici servise ge\u00E7i\u015Ftir. G\u00F6m\u00FCl\u00FC alan\u0131 kapatmak mevcut iframe\u2019i kald\u0131r\u0131r, d\u0131\u015F serviste olu\u015Fmu\u015F kay\u0131tlar\u0131 geri almaz."),
    (0, react_1.createElement)("h2", null, "Bar\u0131nd\u0131rma ve analitik"),
    (0, react_1.createElement)("p", null, "Sayfa ve g\u00F6rseller bar\u0131nd\u0131rma sa\u011Flay\u0131c\u0131s\u0131ndan istenir. Sa\u011Flay\u0131c\u0131 teknik eri\u015Fim kay\u0131tlar\u0131 tutabilir. Bu s\u00FCr\u00FCm reklam pikseli, Google Analytics veya otomatik m\u00FC\u015Fteri kay\u0131t API\u2019si y\u00FCklemez. M\u00FC\u015Fteri dosyalar\u0131 GitHub deposuna kaydedilmez. Ticari bar\u0131nd\u0131rma, saklama ve d\u0131\u015F aktar\u0131m d\u00FCzeni ayr\u0131ca kararla\u015Ft\u0131r\u0131lmal\u0131d\u0131r."),
    (0, react_1.createElement)("h2", null, "D\u00FCzeltme ve ileti\u015Fim"),
    (0, react_1.createElement)("p", null, "\u0130\u015Fletmeyle payla\u015F\u0131lm\u0131\u015F bilgiler hakk\u0131nda Yunus Usta ile a\u015Fa\u011F\u0131daki numaradan g\u00F6r\u00FC\u015Febilirsiniz. Bu site WhatsApp'ta veya telefonunuzda payla\u015Ft\u0131\u011F\u0131n\u0131z kay\u0131tlar\u0131 kendili\u011Finden silemez."),
    (0, react_1.createElement)("a", { className: "text-link", href: 'tel:' + project_1.business.telephone }, project_1.business.display),
    (0, react_1.createElement)("div", { className: "action-row" },
        (0, react_1.createElement)("button", { className: "button button-outline", onClick: a.openInfo },
            "Cihaz kay\u0131tlar\u0131n\u0131 y\u00F6net ",
            (0, react_1.createElement)(ui_1.Icon, null)),
        (0, react_1.createElement)(ui_1.ButtonLink, { to: "/iletisim", navigate: a.navigate }, "\u0130leti\u015Fim"))); }
function MaterialsV7(a) {
    return (0, react_1.createElement)(react_1.Fragment, null,
        (0, react_1.createElement)("header", { className: "v6-page-head wrap" },
            (0, react_1.createElement)(ui_1.Eyebrow, null, "EL\u0130F / MALZEMEY\u0130 B\u0130RL\u0130KTE SE\u00C7EL\u0130M"),
            (0, react_1.createElement)("div", null,
                (0, react_1.createElement)("h1", null,
                    "Sadece bir renk de\u011Fil.",
                    (0, react_1.createElement)("br", null),
                    (0, react_1.createElement)("em", null, "Bir kullan\u0131m karar\u0131.")),
                (0, react_1.createElement)("p", null, "Foto\u011Fraftaki g\u00F6r\u00FCn\u00FCm tek ba\u015F\u0131na malzemenin t\u00FCr\u00FCn\u00FC s\u00F6ylemez. G\u00F6vde, kapak, y\u00FCzey ve donan\u0131m\u0131 ayr\u0131 ayr\u0131 netle\u015Ftirelim."))),
        (0, react_1.createElement)("section", { className: "wrap v7-materials" }, [
            ['01', 'Gövde', 'Depolama, taşıma ve yerleşim ihtiyacı. Levha esaslı çözümler veya masif ahşap, projenin koşullarına göre konuşulur.'],
            ['02', 'Kapak ve yüzey', 'Kaplama, boya veya lake görünümü. Son rengi ve dokuyu fotoğraf üzerinden kesinleştirmek yerine numuneyle teyit ederiz.'],
            ['03', 'Donanım', 'Menteşe, ray, kulp ve varsa mekanizma. Marka, model ve kapasite uygunluğu kesin teklifte belirtilir.'],
            ['04', 'Tezgâh ve uygulama', 'Tezgâh, elektrik, aydınlatma, taşıma ve montaj ayrı kapsam kalemleridir. Fotoğrafta görünmesi otomatik olarak dahil olduğu anlamına gelmez.']
        ].map(([n, title, text]) => (0, react_1.createElement)("article", { key: n },
            (0, react_1.createElement)(ui_1.Eyebrow, null,
                n,
                " / B\u0130RL\u0130KTE KARAR"),
            (0, react_1.createElement)("h2", null, title),
            (0, react_1.createElement)("p", null, text)))),
        (0, react_1.createElement)("section", { className: "wrap material-decisions", id: "malzeme-karari", "aria-labelledby": "material-decision-title" },
            (0, react_1.createElement)("div", { className: "v6-heading" },
                (0, react_1.createElement)("div", null,
                    (0, react_1.createElement)(ui_1.Eyebrow, null, "G\u00D6R\u00DCN\u00DCMDEN GER\u00C7EK NUMUNEYE"),
                    (0, react_1.createElement)("h2", { id: "material-decision-title" },
                        "Ayn\u0131 renk,",
                        (0, react_1.createElement)("br", null),
                        (0, react_1.createElement)("em", null, "ayn\u0131 malzeme de\u011Fil."))),
                (0, react_1.createElement)("p", null,
                    (0, react_1.createElement)("strong", null, "Numune katalo\u011Fu de\u011Fil."),
                    " A\u015Fa\u011F\u0131daki sorular g\u00F6r\u00FC\u015Fme haz\u0131rl\u0131\u011F\u0131d\u0131r. Fiziksel numune, stok veya belirli bir malzeme markas\u0131 vaadi i\u00E7ermez.")),
            (0, react_1.createElement)("div", { className: "material-question-grid" }, [
                ['Görünüm', 'Beğendiğim şey ağaç tonu mu, çizgili yüzey mi, matlık mı?', 'Gövde ile dış yüzeyin aynı malzeme olup olmadığını sorun. Ceviz görünümü, masif ceviz tanımı değildir.'],
                ['Kullanım', 'Bu parça nerede duracak, ne taşıyacak, nasıl kullanılacak?', 'Islaklık, sıcak cihazlar, güneş veya günlük teması tarif edin. Uygunluk, gerçek ürün ve yüzey bilgisiyle değerlendirilir.'],
                ['Bakım', 'Seçtiğim yüzeyin kendi bakım talimatı var mı?', 'Temizlik ve bakım bilgisini kullanılan kaplama veya yüzey ürünüyle birlikte isteyin. Her ahşap görünümlü yüzeye aynı işlem uygulanmaz.'],
                ['Teklif', 'Gövde, kapak, donanım ve uygulama ayrı yazılmış mı?', 'Numune veya renk onayını, donanım kodlarını ve hangi işlerin dahil olduğunu karşılaştırın. Yalnız toplam tutar aynı kapsamı göstermez.']
            ].map(([title, question, note]) => (0, react_1.createElement)("details", { key: title },
                (0, react_1.createElement)("summary", null,
                    title,
                    " i\u00E7in neyi soray\u0131m? ",
                    (0, react_1.createElement)(ui_1.Icon, { name: "plus", size: 18 })),
                (0, react_1.createElement)("div", null,
                    (0, react_1.createElement)("h3", null, question),
                    (0, react_1.createElement)("p", null, note))))),
            (0, react_1.createElement)("div", { className: "material-next" },
                (0, react_1.createElement)(ui_1.ButtonLink, { to: "/modelini-getir", navigate: a.navigate }, "Malzeme g\u00F6r\u00FC\u015Fmesine haz\u0131rlan"),
                (0, react_1.createElement)(ui_1.Link, { className: "text-link", to: "/rehber/malzeme-secimi", navigate: a.navigate },
                    "Malzeme se\u00E7imi notunu oku ",
                    (0, react_1.createElement)(ui_1.Icon, null)))),
        (0, react_1.createElement)("section", { className: "wrap v7-readable" },
            (0, react_1.createElement)("h2", null, "Bak\u0131m, y\u00FCzeye g\u00F6re de\u011Fi\u015Fir."),
            (0, react_1.createElement)("p", null, "Temizlik \u00FCr\u00FCn\u00FC veya ya\u011F uygulamadan \u00F6nce kullan\u0131lan y\u00FCzeyi ve \u00FCreticinin bak\u0131m y\u00F6nlendirmesini teyit edin. Her ah\u015Fap g\u00F6r\u00FCn\u00FCml\u00FC mobilyaya ayn\u0131 i\u015Flem uygun olmayabilir. Malzeme ve donan\u0131m bilgilerini teklif ve teslimde istemeniz, sonraki bak\u0131m\u0131 kolayla\u015Ft\u0131r\u0131r."),
            (0, react_1.createElement)(ui_1.Link, { className: "text-link", to: "/rehber/bakim", navigate: a.navigate },
                "Bak\u0131m haz\u0131rl\u0131k notlar\u0131 ",
                (0, react_1.createElement)(ui_1.Icon, null))),
        (0, react_1.createElement)(PortfolioUI_1.ModelCallout, { navigate: a.navigate, compact: true }));
}

}};const cache={};function resolve(id,from){if(!id.startsWith("."))return id;const a=from.split("/");a.pop();for(const part of id.split("/")){if(part==="..")a.pop();else if(part!==".")a.push(part)}return a.join("/").replace(/\.tsx?$/,"")}function load(id,from=""){id=resolve(id,from);if(cache[id])return cache[id].exports;if(!modules[id])throw Error("Missing module "+id);const m={exports:{}};cache[id]=m;modules[id](m,m.exports,x=>load(x,id));return m.exports}load("src/main");})();