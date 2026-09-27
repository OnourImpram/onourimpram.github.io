/** Only confirmed public business facts belong here. Missing evidence is not a placeholder address. */
export type SiteProfile={email:string|null;hours:string|null;address:{streetAddress:string;addressLocality:string;postalCode:string;addressCountry:'TR'}|null;social:string[];verifiedAt:string};
const base:SiteProfile={email:null,hours:null,address:null,social:[],verifiedAt:'2026-09-27'};
export function getSiteProfile():SiteProfile{return {...base,social:[...base.social],address:base.address?{...base.address}:null};}
