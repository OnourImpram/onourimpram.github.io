import {business} from './project';
import {getSiteProfile} from './site-profile';
export const smsUrl=()=> 'sms:'+business.telephone;
export function emailDraft(text:string,recipient=getSiteProfile().email||''){
 if(recipient&&!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/.test(recipient))throw Error('Doğrulanmış tek bir e-posta adresi gerekli.');
 const subject='Elif Tasarım. Proje görüşmesi',prefix='mailto:'+recipient+'?subject='+encodeURIComponent(subject)+'&body=';
 const needsAttachment=(prefix+encodeURIComponent(text)).length>5000;
 const sentText=needsAttachment?'Elif Tasarım için ayrıntılı proje özeti hazırladım. Tam özeti ve varsa görselleri bu e-postaya ayrıca ekleyeceğim.':text;
 return {recipient,href:prefix+encodeURIComponent(sentText),needsAttachment,fullText:text,sentText};
}
