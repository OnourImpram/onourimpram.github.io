import { createElement, Fragment, Component } from 'react';
import { deskFromParams, deskMaterials, deskBases } from '../lib/desk';
import { products, materials } from '../lib/data';
import {workCategories} from '../lib/portfolio';
import {imageManifest} from '../lib/image-manifest';
import { validateQuoteStep, convertDimensions, validateFile, parseDimension, safeDraft, readLocal, writeLocal, downloadText } from '../lib/domain';
import { image, Icon, Link, TextLink, ButtonLink, Eyebrow, Photo, type PageProps } from '../components/ui';
type Values = {
    kind: string;
    unknown: boolean;
    width: string;
    depth: string;
    height: string;
    unit: 'cm' | 'mm';
    material: string;
    finish: string;
    city: string;
    district: string;
    delivery: string;
    name: string;
    email: string;
    phone: string;
    note: string;
    ack: boolean;
};
type Upload = {
    name: string;
    url: string;
    bytes: number;
};
const initial: Values = { kind: '', unknown: false, width: '', depth: '', height: '', unit: 'cm', material: 'Danışmak istiyorum', finish: 'Birlikte değerlendirelim', city: 'İstanbul', district: '', delivery: 'Birlikte planlayalım', name: '', email: '', phone: '', note: '', ack: false };
const labels = ['İhtiyaç', 'Ölçü', 'Malzeme', 'Görseller', 'Teslim', 'İletişim', 'Kontrol'];
const stepTitles = ['Neyi birlikte düşünelim?', 'Alanınızın ölçüsü nedir?', 'Dokusu nasıl olsun?', 'Bir görsel, çok şey anlatır.', 'Nereye yerleşecek?', 'Size nasıl ulaşalım?', 'Son bir kez, birlikte bakalım.'];
const stepDescriptions = ['Bir ürün seçin veya fikrinizi birlikte şekillendirelim.', 'Kesin ölçü bilmek zorunda değilsiniz. İlk fikir bile değerlidir.', 'Ağaç türü ile yüzey tercihini ayrı ayrı değerlendirelim.', 'Referans, mekân fotoğrafı veya eskiz ekleyebilirsiniz. Bu adım isteğe bağlı.', 'İlk aşamada açık adresinize ihtiyacımız yok.', 'Bu önizlemede bilgiler gönderilmez ve kalıcı olarak saklanmaz. Örnek bilgi kullanın.', 'Hazırlanan özet bir sipariş veya kabul edilmiş teklif değildir.'];
export class Quote extends Component<PageProps & {
    productId?: string;
    query?: string;
}, {
    step: number;
    v: Values;
    errors: Record<string, string>;
    files: Upload[];
    uploading: boolean;
    done: boolean;
    hasDraft: boolean;
}> {
    state = { step: 0, v: { ...initial }, errors: {}, files: [] as Upload[], uploading: false, done: false, hasDraft: false };
    private alive = true;
    componentDidMount() { const p = products.find(p => p.id === this.props.productId), params=new URLSearchParams(this.props.query||''), fromDesk=params.has('en'); const d=deskFromParams(params); this.setState({ hasDraft: !fromDesk&&!!readLocal('quote-draft', null), v: { ...initial, kind: fromDesk ? (d.base==='adjustable'?'Yükseklik ayarlı masa':'Çalışma masası') : p ? p.categoryLabel : '', ...(fromDesk?{width:String(d.width),depth:String(d.depth),height:String(d.height),material:deskMaterials[d.material].name,note:'Tasarım masası fikri. Taşıyıcı tercihi, '+deskBases[d.base]+'. Üretim uygunluğu atölyede teyit edilecek.'}:{}) } }); }
    componentWillUnmount() { this.alive = false; this.state.files.forEach(f => URL.revokeObjectURL(f.url)); }
    set = (k: keyof Values, value: any) => this.setState(s => ({ v: { ...s.v, [k]: value }, errors: { ...s.errors, [k]: '' } }));
    changeUnit = (target: 'cm' | 'mm') => {
        const result=convertDimensions(this.state.v,target);
        if(!result.ok){this.setState({errors:result.errors});this.props.notify('Birimi değiştirmeden önce işaretli ölçüyü düzeltin.');return;}
        this.setState(s=>({v:{...s.v,...result.values,unit:target},errors:{}}));
    };
    editStep = (step:number) => this.setState({step,errors:{}},()=>document.getElementById('wizard-title')?.focus());
    next = () => { const errors = validateQuoteStep(this.state.step, this.state.v); if (Object.keys(errors).length) {
        this.setState({ errors }, () => document.getElementById('q-' + Object.keys(errors)[0])?.focus());
        return;
    } this.setState(s => ({ step: Math.min(6, s.step + 1), errors: {} }), () => document.getElementById('wizard-title')?.focus()); };
    summary = () => { const v = this.state.v; return ['ELİF TASARIM — ÖNİZLEME TALEP ÖZETİ', 'Bu dosya atölyeye gönderilmedi. Sipariş veya fiyat teklifi değildir.', '', `İhtiyaç: ${v.kind}`, `Ölçü: ${v.unknown ? 'Birlikte belirlenecek' : [v.width, v.depth, v.height].join(' × ') + ' ' + v.unit}`, `Malzeme tercihi: ${v.material}`, `Yüzey tercihi: ${v.finish}`, `Bölge: ${v.city}${v.district ? ' / ' + v.district : ''}`, `Teslim yaklaşımı: ${v.delivery}`, `İsim: ${v.name}`, `E-posta: ${v.email || 'Belirtilmedi'}`, `Telefon: ${v.phone || 'Belirtilmedi'}`, `Not: ${v.note || 'Belirtilmedi'}`, `Görseller: ${this.state.files.map(f => f.name).join(', ') || 'Eklenmedi'}`, 'Görsel dosyaları bu metin dosyasına dahil değildir.'].join('\n'); };
    async addFiles(list: FileList | null) { if (!list)
        return; const received = Array.from(list); if (received.length + this.state.files.length > 5) {
        this.props.notify('En fazla 5 görsel ekleyebilirsiniz.');
        return;
    } this.setState({ uploading: true }); const accepted: Upload[] = []; try {
        for (const file of received) {
            const v = validateFile(file);
            if (!v.ok) {
                this.props.notify(v.error!);
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
    } }
    field = (name: keyof Values, label: string, placeholder = '', type = 'text') => <label className="form-field" htmlFor={'q-' + name}><span id={'label-' + name}>{label}</span><input inputMode={['width','depth','height'].includes(name)?'decimal':undefined} aria-labelledby={'label-' + name} id={'q-' + name} type={type} value={String(this.state.v[name])} maxLength={name === 'name' ? 100 : 200} placeholder={placeholder} onInput={e => this.set(name, e.currentTarget.value)} aria-invalid={!!(this.state.errors as any)[name]} aria-describedby={(this.state.errors as any)[name] ? 'err-' + name : undefined}/>{(this.state.errors as any)[name] && <small className="field-error" id={'err-' + name}>{(this.state.errors as any)[name]}</small>}</label>;
    renderStep() {
        const { v, step, files } = this.state;
        if (step === 0)
            return <div className="choice-grid" id="q-kind" tabIndex={-1}>{[...workCategories.map(c=>[c.name, c.image+'-full.webp']), ['Yemek masası','dining.webp'],['Yükseklik ayarlı masa','office.webp']].map(([kind, photo]) => <button type="button" key={kind} className={'picture-choice ' + (v.kind === kind ? 'selected' : '')} aria-pressed={v.kind === kind} onClick={() => this.set('kind', kind)}><img src={image(photo)} alt=""/><span>{kind}<i>{v.kind === kind ? <Icon name="check" size={14}/> : null}</i></span></button>)}<button type="button" className={'choice-wide ' + (v.kind === 'Birlikte karar verelim' ? 'selected' : '')} onClick={() => this.set('kind', 'Birlikte karar verelim')} aria-pressed={v.kind === 'Birlikte karar verelim'}><Icon name="ruler"/>Başka bir fikir / Birlikte karar verelim<Icon name="arrow"/></button>{(this.state.errors as any).kind && <p className="field-error">{(this.state.errors as any).kind}</p>}</div>;
        if (step === 1)
            return <><label className="check-card"><input type="checkbox" checked={v.unknown} onChange={e => this.set('unknown', e.currentTarget.checked)}/><span>Ölçülerimi birlikte belirleyelim<small>Şimdilik kesin ölçü vermeden devam edebilirsiniz.</small></span></label>{!v.unknown && <><div className="form-row three">{this.field('width', 'En', '180')}{this.field('depth', 'Derinlik', '90')}{this.field('height', 'Yükseklik', '75')}</div><label className="form-field">Ölçü birimi<select aria-label="Ölçü birimi" value={v.unit} onChange={e => {const old=v.unit;this.changeUnit(e.currentTarget.value as 'cm'|'mm');e.currentTarget.value=old;}}><option value="cm">Santimetre (cm)</option><option value="mm">Milimetre (mm)</option></select></label><p className="small muted">120,5 veya 120.5 yazabilirsiniz. Birim değişince girdiğiniz ölçüler dönüştürülür. Bunlar ilk talep ölçüleridir; üretim onayı değildir.</p></>}<details className="inline-guide"><summary>Ölçü alma notları <Icon name="plus" size={16}/></summary><p>En, derinlik ve yüksekliği ayrı ölçün. Seçtiğiniz birimi bütün alanlarda tutarlı kullanın. Kapı, çekmece ve sandalye için gereken kullanım paylarını atölyeyle değerlendirin. İlk ölçüler üretim onayı değildir.</p></details></>;
        if (step === 2)
            return <><span className="field-label">MALZEME TERCİHİ</span><div className="material-choices">{materials.map(m => <button type="button" key={m.id} className={v.material === m.name ? 'selected' : ''} onClick={() => this.set('material', m.name)} aria-pressed={v.material === m.name}><img src={image(m.image)} alt=""/><span>{m.name}{v.material === m.name && <Icon name="check" size={16}/>}</span></button>)}</div><button type="button" className={'choice-wide ' + (v.material === 'Danışmak istiyorum' ? 'selected' : '')} onClick={() => this.set('material', 'Danışmak istiyorum')} aria-pressed={v.material === 'Danışmak istiyorum'}>Malzeme konusunda danışmak istiyorum <Icon name="arrow"/></button><label className="form-field spaced">Yüzey beklentiniz<select value={v.finish} onChange={e => this.set('finish', e.currentTarget.value)}><option value="Birlikte değerlendirelim">Birlikte değerlendirelim</option><option value="Doğal görünüm">Doğal görünüm</option><option value="Mat bitiş">Mat bitiş</option><option value="Farklı renk / yüzey görüşelim">Farklı renk / yüzey görüşelim</option></select></label><p className="small muted">Görseller temsili tonlardır. Malzeme yapısı ve yüzey işlemi numuneyle netleşir.</p></>;
        if (step === 3)
            return <><label className="upload-zone"><Icon name="upload" size={32}/><strong>{this.state.uploading ? 'Görseller kontrol ediliyor…' : 'Görsel eklemek için seçin'}</strong><span>JPG, PNG, WebP · En fazla 5 görsel · Her biri 10 MB</span><input type="file" multiple accept="image/jpeg,image/png,image/webp" disabled={this.state.uploading} onChange={e => { this.addFiles(e.currentTarget.files); e.currentTarget.value = ''; }} aria-label="Referans görsellerini seç"/></label><div className="upload-list">{files.map((f, i) => <div key={f.url}><img src={f.url} alt={'Seçtiğiniz referans: ' + f.name}/><span>{f.name}</span><button type="button" className="icon-button" aria-label={f.name + ' görselini kaldır'} onClick={() => { URL.revokeObjectURL(f.url); this.setState({ files: files.filter((_, n) => n !== i) }); }}><Icon name="close" size={16}/></button></div>)}</div><div className="note-box"><Icon name="info"/><p>Görseller yalnız açık sayfanızda tutulur. Yenileme veya başka sayfaya geçişte silinir. Sunucuya gönderilmez. İnsan, belge ve açık adres gibi özel bilgiler içeren fotoğraflar paylaşmayın.</p></div></>;
        if (step === 4)
            return <><div className="form-row"><label className="form-field">İl<select value={v.city} onChange={e => this.set('city', e.currentTarget.value)}><option value="İstanbul">İstanbul</option><option value="Başka bir il">Başka bir il</option><option value="Daha sonra netleştirelim">Daha sonra netleştirelim</option></select></label>{this.field('district', 'İlçe / bölge (isteğe bağlı)')}</div><label className="form-field">Teslim yaklaşımı<select value={v.delivery} onChange={e => this.set('delivery', e.currentTarget.value)}><option value="Birlikte planlayalım">Birlikte planlayalım</option><option value="Atölyeden teslim almak istiyorum">Atölyeden teslim almak istiyorum</option><option value="Adrese teslimi görüşmek istiyorum">Adrese teslimi görüşmek istiyorum</option><option value="Teslim ve kurulum ihtiyacım var">Teslim ve kurulum ihtiyacım var</option></select></label><div className="note-box"><Icon name="pin"/><p>Bu seçim kesin teslimat veya fiyat taahhüdü oluşturmaz. Taşıma, mekâna erişim ve kurulum son teklifte netleşir.</p></div></>;
        if (step === 5)
            return <>{this.field('name', 'Adınız', 'Örnek Müşteri')}<div className="form-row">{this.field('email', 'E-posta', 'ornek@example.com', 'email')}{this.field('phone', 'Telefon (e-posta yerine de olabilir)', '', 'tel')}</div><label className="form-field">Eklemek istediğiniz bir şey var mı?<textarea value={v.note} maxLength={2000} rows={4} onInput={e => this.set('note', e.currentTarget.value)} placeholder="Nasıl kullanacağınızı ve sizin için önemli ayrıntıları anlatabilirsiniz."/></label><p className="small muted">Bu bilgiler yalnız indirmeniz için hazırlanacak özette kullanılır. Atölyeye gönderim yapılmaz ve iletişim bilgisi tarayıcı taslağına kaydedilmez.</p></>;
        return <><dl className="summary-list">{[['İhtiyaç', v.kind], ['Ölçü', v.unknown ? 'Birlikte belirlenecek' : `${v.width} × ${v.depth} × ${v.height} ${v.unit}`], ['Malzeme', v.material], ['Yüzey', v.finish], ['Teslim', v.city + ' / ' + v.delivery], ['İletişim', v.name + ' · ' + (v.email || v.phone)], ['Görseller', files.length + ' görsel, yalnız açık sayfada']].map(([k, val]) => <div key={k}><dt>{k}</dt><dd>{val}</dd><button type="button" className="summary-edit" aria-label={k==='Ölçü'?'Ölçüyü düzenle':k+' alanını düzenle'} onClick={()=>this.editStep(({İhtiyaç:0,Ölçü:1,Malzeme:2,Yüzey:2,Teslim:4,İletişim:5,Görseller:3} as Record<string,number>)[k])}>Düzenle <Icon name="arrow" size={14}/></button></div>)}</dl>{v.note && <p className="quote-note">{v.note}</p>}<label className="check-card"><input type="checkbox" checked={v.ack} onChange={e => this.set('ack', e.currentTarget.checked)}/><span>Bu işlemin yalnız yerel bir önizleme olduğunu anlıyorum.<small>Atölyeye bilgi gönderilmez, sipariş veya ödeme oluşturulmaz.</small></span></label></>;
    }
    render() { const a = this.props, { v, step } = this.state; return <section className="quote-page wrap"><div className="quote-heading"><Eyebrow>ELİF / ÖZEL ÖLÇÜ STÜDYOSU</Eyebrow><h1>Ölçüsü size.<br /><em>Hikâyesi birlikte.</em></h1><p>Bir fikri, konuşulabilir bir tasarıma dönüştürelim.</p>{new URLSearchParams(this.props.query||'').has('en')&&<div className="desk-prefill" role="status"><Icon name="check"/>Tasarım masanızdaki ölçü ve malzeme tercihleri bu talebe aktarıldı. Her adımda değiştirebilirsiniz.</div>}</div>{this.state.done ? <div className="quote-success"><span className="success-mark"><Icon name="check" size={30}/></span><Eyebrow>ÖNİZLEME TAMAMLANDI</Eyebrow><h2>Fikriniz artık<br /><em>bir arada.</em></h2><p>Talep özetiniz hazır. <strong>Atölyeye gönderilmedi.</strong><br />Bu bir sipariş, fiyat teklifi veya üretim onayı değildir.</p><div className="success-summary"><pre>{this.summary()}</pre></div><div className="action-row"><button type="button" className="button" onClick={() => downloadText('Elif_Tasarim_Talep_Ozeti.txt', this.summary())}>Özeti indir <Icon name="download"/></button><button type="button" className="button button-outline" onClick={() => this.setState({ done: false, step: 6 })}>Özeti düzenle <Icon /></button></div><Link to="/urunler" navigate={a.navigate} className="text-link">Koleksiyona dön <Icon /></Link></div> : <div className="wizard-layout"><aside className="wizard-aside"><ol className="step-list">{labels.map((s, i) => <li key={s} className={i === step ? 'current' : i < step ? 'complete' : ''} aria-current={i === step ? 'step' : undefined}><button type="button" disabled={i > step} onClick={() => this.setState({ step: i, errors: {} })}><span>{i < step ? <Icon name="check" size={14}/> : String(i + 1).padStart(2, '0')}</span>{s}</button></li>)}</ol><div className="wizard-help"><Icon name="ruler" size={28}/><h3>Her şeyin cevabını bilmeniz gerekmiyor.</h3><p>Ölçü, malzeme ve teslim detaylarını birlikte değerlendirmek için buradayız.</p><span>Temsili akış · Canlı gönderim yok</span></div></aside><div className="wizard-card"><div className="wizard-topline"><span>ADIM {step + 1} / 7</span><span>{Math.round((step + 1) / 7 * 100)}%</span></div><div className="progress-bar"><span style={{ width: (step + 1) / 7 * 100 + '%' }}/></div><h2 id="wizard-title" tabIndex={-1}>{stepTitles[step]}</h2><p className="wizard-subtitle">{stepDescriptions[step]}</p>{this.state.hasDraft && step === 0 && <div className="draft-alert"><span>Bu cihazda kaydedilmiş ölçü tercihleri var.</span><button type="button" onClick={() => { const saved = readLocal<Record<string, any> | null>('quote-draft', null); if (saved)
        this.setState({ v: { ...initial, ...safeDraft(saved) }, hasDraft: false }); }}>Tercihleri getir <Icon size={16}/></button></div>}<form onSubmit={e => { e.preventDefault(); if (step < 6)
        this.next();
    else if (v.ack)
        this.setState({ done: true }); }} noValidate><div className="wizard-content">{this.renderStep()}</div><div className="wizard-actions"><button className="back-button" type="button" disabled={step === 0} onClick={() => this.setState({ step: step - 1, errors: {} })}><span className="reverse-arrow"><Icon /></span>Geri</button><button className="button" type="submit" disabled={this.state.uploading || (step === 6 && !v.ack)}>{step === 6 ? 'Talep özetini hazırla' : 'Devam et'}<Icon /></button></div></form><div className="save-draft-row"><button type="button" onClick={() => { const ok = writeLocal('quote-draft', safeDraft(v), 7); a.notify(ok ? 'Yalnız ürün, ölçü ve malzeme tercihleri bu cihazda 7 gün saklandı. İletişim, not ve fotoğraf kaydedilmedi.' : 'Tarayıcı kayıt izni vermedi. Bu sayfada çalışmaya devam edebilirsiniz.'); }}>Ölçü tercihlerini bu cihazda sakla</button><span>İletişim ve fotoğraflar kaydedilmez.</span></div></div></div>}</section>; }
}
