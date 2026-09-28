import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
const context = window as any;
const html = document.documentElement;
if (context.__ELIF_BASE__ === undefined) context.__ELIF_BASE__ = html.dataset.base || '';
if (context.__ELIF_SITE_URL__ === undefined) context.__ELIF_SITE_URL__ = html.dataset.site;
if (context.__ELIF_INITIAL__ === undefined) context.__ELIF_INITIAL__ = html.dataset.route || '/';
const root = document.getElementById('app');
if (!root)
    throw new Error('Uygulama kökü bulunamadı');
createRoot(root).render(<App initialPath={(window as any).__ELIF_INITIAL__||"/"}/>);
