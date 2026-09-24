export type Unit = 'cm' | 'mm';
export type DimensionResult = {
    ok: true;
    mm: number;
} | {
    ok: false;
    error: string;
};
export function parseDimension(raw: string, unit: Unit): DimensionResult {
    if (unit !== 'cm' && unit !== 'mm') return { ok: false, error: 'Santimetre veya milimetre seçin.' };
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
export function majorToMinor(value: string): number {
    if (!/^\d+(?:\.\d{1,2})?$/.test(value))
        throw new Error('Geçersiz para değeri');
    const [whole, dec = ''] = value.split('.');
    const n = BigInt(whole) * 100n + BigInt(dec.padEnd(2, '0'));
    if (n > BigInt(Number.MAX_SAFE_INTEGER))
        throw new Error('Tutar sınırı aşıldı');
    return Number(n);
}
export const money = (minor: number) => new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', minimumFractionDigits: minor % 100 ? 2 : 0, maximumFractionDigits: 2 }).format(minor / 100);
export const searchKey = (s: string) => s.trim().replace(/\s+/g, ' ').toLocaleLowerCase('tr-TR').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ı/g, 'i');
export const validQuantity = (n: number) => Number.isSafeInteger(n) && n >= 1 && n <= 100;
export const cartKey = (id: string, material: string, size: string) => [id, material, size].join('::');
export function lineTotal(price: number, quantity: number) { if (!Number.isSafeInteger(price) || price < 0 || !validQuantity(quantity) || !Number.isSafeInteger(price * quantity))
    throw new Error('Geçersiz satır'); return price * quantity; }
export function validateFile(file: {
    type: string;
    size: number;
}): {
    ok: boolean;
    error?: string;
} {
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type))
        return { ok: false, error: 'Yalnız JPG, PNG ve WebP görselleri ekleyebilirsiniz.' };
    if (file.size > 10 * 1024 * 1024 || file.size <= 0)
        return { ok: false, error: 'Her görsel 10 MB veya daha küçük olmalı.' };
    return { ok: true };
}
export function validateQuoteStep(step: number, v: Record<string, any>): Record<string, string> {
    const errors: Record<string, string> = {};
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
export function safeDraft(v: Record<string, any>) {
    const out: Record<string, any> = {};
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
export function readLocal<T>(key: string, fallback: T): T { try {
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
} }
export function writeLocal(key: string, value: unknown, days = 30): boolean { try {
    localStorage.setItem('elif-v2:' + key, JSON.stringify({ value, expires: Date.now() + days * 86400000 }));
    return true;
}
catch {
    return false;
} }
export function downloadText(name: string, text: string, mime = 'text/plain;charset=utf-8') { const url = URL.createObjectURL(new Blob([text], { type: mime })); const a = document.createElement('a'); a.href = url; a.download = name; a.click(); setTimeout(() => URL.revokeObjectURL(url), 10000); }
export function publicHref(path: string) { return typeof window !== 'undefined' && (window as any).__ELIF_PREVIEW__ ? '#' + path : path; }

/** Convert user measurements atomically. Invalid input never silently changes units. */
export function convertDimensions(v: Record<string, any>, target: Unit):
    { ok: true; values: Record<string, string> } | { ok: false; errors: Record<string, string> } {
    const errors: Record<string, string> = {};
    const values: Record<string, string> = { unit: target };
    if (!['cm', 'mm'].includes(target)) return { ok: false, errors: { unit: 'Geçerli bir ölçü birimi seçin.' } };
    for (const k of ['width', 'depth', 'height']) {
        const raw = String(v[k] ?? '').trim();
        if (!raw) { values[k] = ''; continue; }
        const result = parseDimension(raw, v.unit);
        if (!result.ok) errors[k] = result.error;
        else values[k] = String(target === 'mm' ? result.mm : result.mm / 10);
    }
    return Object.keys(errors).length ? { ok: false, errors } : { ok: true, values };
}
