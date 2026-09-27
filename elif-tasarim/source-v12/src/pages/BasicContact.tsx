import {createElement,Fragment} from 'react';
import {Eyebrow,ButtonLink,Icon,type PageProps} from '../components/ui';
import {TextCopy} from '../components/TextCopy';
import {business,whatsappUrl} from '../lib/project';
import {getSiteProfile} from '../lib/site-profile';
import {emailDraft,smsUrl} from '../lib/contact-options';
const message='Merhaba Yunus Usta.\nYaptırmak istediğim ürün,\nYaklaşık ölçü veya kullanım alanı,\nBulunduğum ilçe,\nBenim için önemli ayrıntılar,';
/** All essential contact information is server-rendered as normal links and text. */
export function BasicContact(a:PageProps){const email=getSiteProfile().email,mail=emailDraft(message);return <>
 <header className="v6-page-head wrap"><Eyebrow>ELİF / KOLAY İLETİŞİM</Eyebrow><div><h1>Tek bir mesajla<br/><em>başlayabiliriz.</em></h1><p>Form doldurmanız gerekmiyor. Fikrinizi size uygun iletişim yoluyla doğrudan atölyeye ulaştırın.</p></div></header>
 <section className="wrap v22-basic-contact"><div className="v22-contact-card"><Eyebrow>YUNUS USTA İLE GÖRÜŞÜN</Eyebrow><h2>Önce ihtiyacınızı konuşalım.</h2><p>Fotoğraf, bağlantı veya birkaç cümle yeterli. Kesin ölçü ve malzeme seçimi görüşmede netleşir.</p><a className="v22-visible-email" href={mail.href}>{email}</a><p><a href={'tel:'+business.telephone}>{business.display}</a></p><div className="action-row"><a className="button" href={mail.href}>E-posta yaz <Icon name="diagonal"/></a><a className="button button-outline" href={whatsappUrl(message)} target="_blank" rel="noopener noreferrer">WhatsApp’ta yaz <Icon name="diagonal"/></a><a className="button button-outline" href={smsUrl()}>SMS uygulamasını aç</a></div><p className="field-hint">Bu bağlantılar iletişim uygulamanızı açar. Mesajı siz gönderirsiniz. E-posta uygulaması açılmazsa görünen adresi kendi e-posta hesabınızda kullanabilirsiniz.</p></div>
 <div className="v22-contact-template"><Eyebrow>İLK MESAJ İÇİN KISA BİR YOL</Eyebrow><h2>Fikrinizi böyle anlatabilirsiniz.</h2><pre>{message}</pre><TextCopy id="v22-basic-copy" label="Başlangıç metnini kopyala" text={message}/><p>Fotoğrafları ve çizimleri mesajınıza ayrıca ekleyin. Adres ve ziyaret düzenini yola çıkmadan Yunus Usta ile teyit edin.</p><ButtonLink to="/modelini-getir" navigate={a.navigate} secondary>Ayrıntılı proje özeti hazırlayayım</ButtonLink></div></section>
 </>}
