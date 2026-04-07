'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Locale } from '@/lib/i18n';
import type en from '@/messages/en.json';

type Messages = typeof en;

const WHATSAPP_NUMBER = '34609321308';

/* ── Region → hero image mapping ── */
const REGION_IMAGES: Record<string, string> = {
  default: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&q=80&auto=format',
  barcelona: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=1920&q=80&auto=format',
  cataluna: 'https://images.unsplash.com/photo-1562883676-8c7feb83f09b?w=1920&q=80&auto=format',
  madrid: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=1920&q=80&auto=format',
  andalucia: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=1920&q=80&auto=format',
  valencia: 'https://images.unsplash.com/photo-1599832218283-81090c35b235?w=1920&q=80&auto=format',
  baleares: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1920&q=80&auto=format',
  canarias: 'https://images.unsplash.com/photo-1580828343064-fde4fc206bc6?w=1920&q=80&auto=format',
  paisvasco: 'https://images.unsplash.com/photo-1597655601841-214a4cfe8b2c?w=1920&q=80&auto=format',
  galicia: 'https://images.unsplash.com/photo-1607427293702-036933bbf746?w=1920&q=80&auto=format',
  norte: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=1920&q=80&auto=format',
  interior: 'https://images.unsplash.com/photo-1509840841025-9088ba78a826?w=1920&q=80&auto=format',
};

/* ── Province → region mapping (all 50 Spanish provinces) ── */
const PROVINCE_REGION: Record<string, string> = {
  // Andalucía
  almeria: 'andalucia', cadiz: 'andalucia', cordoba: 'andalucia', granada: 'andalucia',
  huelva: 'andalucia', jaen: 'andalucia', malaga: 'andalucia', sevilla: 'andalucia',
  // Aragón
  huesca: 'interior', teruel: 'interior', zaragoza: 'interior',
  // Asturias
  asturias: 'norte',
  // Baleares
  baleares: 'baleares',
  // Canarias
  las_palmas: 'canarias', santa_cruz: 'canarias',
  // Cantabria
  cantabria: 'norte',
  // Castilla y León
  avila: 'interior', burgos: 'interior', leon: 'interior', palencia: 'interior',
  salamanca: 'interior', segovia: 'interior', soria: 'interior', valladolid: 'interior', zamora: 'interior',
  // Castilla-La Mancha
  albacete: 'interior', ciudad_real: 'interior', cuenca: 'interior', guadalajara: 'interior', toledo: 'interior',
  // Cataluña
  barcelona: 'barcelona', girona: 'cataluna', lleida: 'cataluna', tarragona: 'cataluna',
  // Extremadura
  badajoz: 'interior', caceres: 'interior',
  // Galicia
  a_coruna: 'galicia', lugo: 'galicia', ourense: 'galicia', pontevedra: 'galicia',
  // La Rioja
  la_rioja: 'norte',
  // Madrid
  madrid: 'madrid',
  // Murcia
  murcia: 'valencia',
  // Navarra
  navarra: 'norte',
  // País Vasco
  alava: 'paisvasco', guipuzcoa: 'paisvasco', vizcaya: 'paisvasco',
  // Valencia
  alicante: 'valencia', castellon: 'valencia', valencia: 'valencia',
};

function getImageForProvince(province: string): string {
  const region = PROVINCE_REGION[province];
  if (region && REGION_IMAGES[region]) return REGION_IMAGES[region];
  return REGION_IMAGES.default; // default
}

/* ── Province groups for the select ── */
const PROVINCE_GROUPS = [
  {
    label: 'Andalucía',
    provinces: [
      { value: 'almeria', label: 'Almería' }, { value: 'cadiz', label: 'Cádiz' },
      { value: 'cordoba', label: 'Córdoba' }, { value: 'granada', label: 'Granada' },
      { value: 'huelva', label: 'Huelva' }, { value: 'jaen', label: 'Jaén' },
      { value: 'malaga', label: 'Málaga' }, { value: 'sevilla', label: 'Sevilla' },
    ],
  },
  {
    label: 'Aragón',
    provinces: [
      { value: 'huesca', label: 'Huesca' }, { value: 'teruel', label: 'Teruel' },
      { value: 'zaragoza', label: 'Zaragoza' },
    ],
  },
  {
    label: 'Asturias',
    provinces: [{ value: 'asturias', label: 'Asturias' }],
  },
  {
    label: 'Islas Baleares',
    provinces: [{ value: 'baleares', label: 'Islas Baleares' }],
  },
  {
    label: 'Canarias',
    provinces: [
      { value: 'las_palmas', label: 'Las Palmas' }, { value: 'santa_cruz', label: 'Santa Cruz de Tenerife' },
    ],
  },
  {
    label: 'Cantabria',
    provinces: [{ value: 'cantabria', label: 'Cantabria' }],
  },
  {
    label: 'Castilla y León',
    provinces: [
      { value: 'avila', label: 'Ávila' }, { value: 'burgos', label: 'Burgos' },
      { value: 'leon', label: 'León' }, { value: 'palencia', label: 'Palencia' },
      { value: 'salamanca', label: 'Salamanca' }, { value: 'segovia', label: 'Segovia' },
      { value: 'soria', label: 'Soria' }, { value: 'valladolid', label: 'Valladolid' },
      { value: 'zamora', label: 'Zamora' },
    ],
  },
  {
    label: 'Castilla-La Mancha',
    provinces: [
      { value: 'albacete', label: 'Albacete' }, { value: 'ciudad_real', label: 'Ciudad Real' },
      { value: 'cuenca', label: 'Cuenca' }, { value: 'guadalajara', label: 'Guadalajara' },
      { value: 'toledo', label: 'Toledo' },
    ],
  },
  {
    label: 'Cataluña',
    provinces: [
      { value: 'barcelona', label: 'Barcelona' }, { value: 'girona', label: 'Girona' },
      { value: 'lleida', label: 'Lleida' }, { value: 'tarragona', label: 'Tarragona' },
    ],
  },
  {
    label: 'Extremadura',
    provinces: [
      { value: 'badajoz', label: 'Badajoz' }, { value: 'caceres', label: 'Cáceres' },
    ],
  },
  {
    label: 'Galicia',
    provinces: [
      { value: 'a_coruna', label: 'A Coruña' }, { value: 'lugo', label: 'Lugo' },
      { value: 'ourense', label: 'Ourense' }, { value: 'pontevedra', label: 'Pontevedra' },
    ],
  },
  {
    label: 'La Rioja',
    provinces: [{ value: 'la_rioja', label: 'La Rioja' }],
  },
  {
    label: 'Madrid',
    provinces: [{ value: 'madrid', label: 'Madrid' }],
  },
  {
    label: 'Murcia',
    provinces: [{ value: 'murcia', label: 'Murcia' }],
  },
  {
    label: 'Navarra',
    provinces: [{ value: 'navarra', label: 'Navarra' }],
  },
  {
    label: 'País Vasco',
    provinces: [
      { value: 'alava', label: 'Álava' }, { value: 'guipuzcoa', label: 'Guipúzcoa' },
      { value: 'vizcaya', label: 'Vizcaya' },
    ],
  },
  {
    label: 'Comunidad Valenciana',
    provinces: [
      { value: 'alicante', label: 'Alicante' }, { value: 'castellon', label: 'Castellón' },
      { value: 'valencia', label: 'Valencia' },
    ],
  },
];

export function AdvisoryHero({ locale, t }: { locale: Locale; t: Messages }) {
  const [selectedProvince, setSelectedProvince] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalStep, setModalStep] = useState<'choose' | 'email' | 'success'>('choose');
  const [formData, setFormData] = useState({ looking: '', type: '', price: '', location: '' });
  const [contactInfo, setContactInfo] = useState({ name: '', email: '', phone: '' });
  const heroImage = selectedProvince ? getImageForProvince(selectedProvince) : REGION_IMAGES.barcelona;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setFormData({
      looking: data.get('looking') as string || '',
      type: data.get('type') as string || '',
      price: data.get('price') as string || '',
      location: data.get('location') as string || '',
    });
    setModalStep('choose');
    setShowModal(true);
  };

  const buildMessage = () => {
    const parts: string[] = [];
    if (formData.looking) parts.push(`Busco: ${formData.looking}`);
    if (formData.type) parts.push(`Tipo: ${formData.type}`);
    if (formData.price) parts.push(`Presupuesto: ${formData.price}`);
    if (formData.location) parts.push(`Ubicación: ${formData.location}`);
    return parts.length > 0
      ? `Hola, estoy interesado en comprar una propiedad en España.\n\n${parts.join('\n')}`
      : 'Hola, estoy interesado en comprar una propiedad en España.';
  };

  const handleWhatsApp = () => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildMessage())}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setShowModal(false);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent('Property inquiry – VDH Enterprises');
    const body = encodeURIComponent(
      `${buildMessage()}\n\nNombre: ${contactInfo.name}\nEmail: ${contactInfo.email}\nTeléfono: ${contactInfo.phone}`
    );
    window.open(`mailto:info@vdhenterprises.com?subject=${subject}&body=${body}`, '_self');
    setModalStep('success');
    setTimeout(() => {
      setShowModal(false);
      setModalStep('choose');
      setContactInfo({ name: '', email: '', phone: '' });
    }, 2500);
  };

  return (
    <section
      className="relative"
      style={{ height: '50vh', minHeight: '420px', padding: 'clamp(0.75rem, 1.5vw, 1.25rem)', marginTop: '5rem' }}
    >
      {/* Full image container with rounded corners */}
      <div
        className="relative w-full h-full"
        style={{ borderRadius: '16px', overflow: 'hidden' }}
      >
        <Image
          src={heroImage}
          alt="Property location"
          fill
          className="object-cover object-center transition-opacity duration-700"
          priority
          sizes="100vw"
          key={heroImage}
        />

        {/* Strong navy tint */}
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(26, 35, 50, 0.62)' }} />
        {/* Dark gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/65" />

        {/* Content overlay */}
        <div className="absolute inset-0 z-10 flex flex-col">

          {/* Top text area */}
          <div
            className="w-full mx-auto px-6 lg:px-10 shrink-0"
            style={{ maxWidth: 'var(--max-width)', paddingTop: 'clamp(5rem, 10vh, 7rem)' }}
          >
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 lg:gap-16 lg:items-end">
              <div>
                <p
                  className="font-sans uppercase tracking-widest"
                  style={{ fontSize: '0.6rem', letterSpacing: '0.25em', color: 'var(--gold)', marginBottom: 'clamp(0.5rem, 1vw, 1.25rem)' }}
                >
                  | {t.advisory_page.label} |
                </p>
                <h1
                  className="font-serif text-left"
                  style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', fontWeight: 300, lineHeight: 1.1, letterSpacing: '-0.04em', color: 'white' }}
                >
                  {t.advisory_page.hero_headline}
                </h1>
              </div>
              <p
                className="font-sans text-left"
                style={{ fontSize: 'clamp(0.82rem, 1vw, 0.95rem)', lineHeight: 1.7, color: 'rgba(255,255,255,0.7)', maxWidth: '440px' }}
              >
                {t.advisory_page.hero_desc}
              </p>
            </div>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Search form at the bottom */}
          <div
            className="w-full mx-auto px-4 lg:px-8 shrink-0"
            style={{ maxWidth: 'var(--max-width)', paddingBottom: 'clamp(1rem, 2vw, 1.5rem)' }}
          >
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_auto] items-end gap-0"
              style={{
                background: 'rgba(255,255,255,0.97)',
                backdropFilter: 'blur(12px)',
                borderRadius: '12px',
                padding: '0.4rem',
                boxShadow: '0 8px 40px rgba(0,0,0,0.15)',
              }}
            >
              {/* Looking for */}
              <div style={{ padding: '0.65rem 1rem' }}>
                <label
                  className="font-sans block"
                  style={{ fontSize: '0.55rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--navy)', marginBottom: '3px' }}
                >
                  {t.advisory_page.form_looking}
                </label>
                <input
                  type="text"
                  name="looking"
                  placeholder={t.advisory_page.form_looking_placeholder}
                  className="font-sans w-full outline-none bg-transparent"
                  style={{ fontSize: '0.82rem', color: 'var(--navy)', padding: '2px 0' }}
                />
              </div>

              {/* Type */}
              <div style={{ padding: '0.65rem 1rem', borderLeft: '1px solid rgba(26,35,50,0.08)' }}>
                <label
                  className="font-sans block"
                  style={{ fontSize: '0.55rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--navy)', marginBottom: '3px' }}
                >
                  {t.advisory_page.form_type}
                </label>
                <select
                  name="type"
                  className="font-sans w-full outline-none bg-transparent appearance-none cursor-pointer"
                  style={{ fontSize: '0.82rem', color: 'var(--navy)', opacity: 0.5, padding: '2px 0' }}
                  defaultValue=""
                >
                  <option value="" disabled>{t.advisory_page.form_type_placeholder}</option>
                  <option value="apartment">{t.advisory_page.form_type_apartment}</option>
                  <option value="house">{t.advisory_page.form_type_house}</option>
                  <option value="villa">{t.advisory_page.form_type_villa}</option>
                  <option value="penthouse">{t.advisory_page.form_type_penthouse}</option>
                </select>
              </div>

              {/* Price range */}
              <div style={{ padding: '0.65rem 1rem', borderLeft: '1px solid rgba(26,35,50,0.08)' }}>
                <label
                  className="font-sans block"
                  style={{ fontSize: '0.55rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--navy)', marginBottom: '3px' }}
                >
                  {t.advisory_page.form_price}
                </label>
                <select
                  name="price"
                  className="font-sans w-full outline-none bg-transparent appearance-none cursor-pointer"
                  style={{ fontSize: '0.82rem', color: 'var(--navy)', opacity: 0.5, padding: '2px 0' }}
                  defaultValue=""
                >
                  <option value="" disabled>{t.advisory_page.form_price_placeholder}</option>
                  <option value="0-200k">{t.advisory_page.form_price_1}</option>
                  <option value="200k-500k">{t.advisory_page.form_price_2}</option>
                  <option value="500k-1m">{t.advisory_page.form_price_3}</option>
                  <option value="1m+">{t.advisory_page.form_price_4}</option>
                </select>
              </div>

              {/* Location — with province groups */}
              <div style={{ padding: '0.65rem 1rem', borderLeft: '1px solid rgba(26,35,50,0.08)' }}>
                <label
                  className="font-sans block"
                  style={{ fontSize: '0.55rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--navy)', marginBottom: '3px' }}
                >
                  {t.advisory_page.form_location}
                </label>
                <select
                  name="location"
                  className="font-sans w-full outline-none bg-transparent appearance-none cursor-pointer"
                  style={{ fontSize: '0.82rem', color: 'var(--navy)', opacity: 0.5, padding: '2px 0' }}
                  defaultValue=""
                  onChange={(e) => setSelectedProvince(e.target.value)}
                >
                  <option value="" disabled>{t.advisory_page.form_location_placeholder}</option>
                  <option value="unknown">{t.advisory_page.form_location_unknown}</option>
                  {PROVINCE_GROUPS.map((group) => (
                    <optgroup key={group.label} label={group.label}>
                      {group.provinces.map((p) => (
                        <option key={p.value} value={p.value}>{p.label}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              {/* Submit + WhatsApp */}
              <div className="flex items-center gap-2" style={{ padding: '0.4rem' }}>
                <button
                  type="submit"
                  className="font-sans cursor-pointer hover:opacity-90 transition-opacity"
                  style={{
                    background: 'var(--navy)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.8rem 1.4rem',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {t.advisory_page.form_submit}
                </button>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity shrink-0"
                  style={{
                    background: '#25D366',
                    borderRadius: '8px',
                    width: '40px',
                    height: '40px',
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* ── Contact method modal ── */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
          onClick={() => { setShowModal(false); setModalStep('choose'); }}
        >
          <div
            className="relative w-full mx-4"
            style={{
              maxWidth: '420px',
              background: 'white',
              borderRadius: '16px',
              padding: 'clamp(1.5rem, 3vw, 2.5rem)',
              boxShadow: '0 24px 80px rgba(0,0,0,0.2)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => { setShowModal(false); setModalStep('choose'); }}
              className="absolute top-4 right-4 cursor-pointer"
              style={{ background: 'none', border: 'none', fontSize: '1.2rem', color: 'var(--navy)', opacity: 0.4 }}
              aria-label="Close"
            >
              ✕
            </button>

            {modalStep === 'choose' && (
              <div className="flex flex-col items-center gap-5">
                <h3
                  className="font-serif text-center"
                  style={{ fontSize: '1.25rem', fontWeight: 500, color: 'var(--navy)' }}
                >
                  {t.advisory_page.popup_title}
                </h3>

                <button
                  onClick={handleWhatsApp}
                  className="w-full flex items-center justify-center gap-3 cursor-pointer hover:opacity-90 transition-opacity"
                  style={{
                    background: '#25D366',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '0.9rem 1.5rem',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  {t.advisory_page.popup_whatsapp}
                </button>

                <button
                  onClick={() => setModalStep('email')}
                  className="w-full flex items-center justify-center gap-3 cursor-pointer hover:opacity-90 transition-opacity"
                  style={{
                    background: 'var(--navy)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '0.9rem 1.5rem',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                    <path d="M22 7l-10 7L2 7"/>
                  </svg>
                  {t.advisory_page.popup_email}
                </button>
              </div>
            )}

            {modalStep === 'email' && (
              <form onSubmit={handleEmailSubmit} className="flex flex-col gap-4">
                <button
                  type="button"
                  onClick={() => setModalStep('choose')}
                  className="self-start cursor-pointer font-sans"
                  style={{ background: 'none', border: 'none', fontSize: '0.8rem', color: 'var(--navy)', opacity: 0.6 }}
                >
                  ← {t.advisory_page.popup_back}
                </button>

                <h3
                  className="font-serif text-center"
                  style={{ fontSize: '1.25rem', fontWeight: 500, color: 'var(--navy)' }}
                >
                  {t.advisory_page.popup_email}
                </h3>

                <div>
                  <label className="font-sans block" style={{ fontSize: '0.65rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--navy)', marginBottom: '4px' }}>
                    {t.advisory_page.popup_name}
                  </label>
                  <input
                    type="text"
                    required
                    value={contactInfo.name}
                    onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                    className="font-sans w-full outline-none"
                    style={{ border: '1px solid rgba(26,35,50,0.15)', borderRadius: '8px', padding: '0.7rem 0.9rem', fontSize: '0.85rem', color: 'var(--navy)' }}
                  />
                </div>

                <div>
                  <label className="font-sans block" style={{ fontSize: '0.65rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--navy)', marginBottom: '4px' }}>
                    {t.advisory_page.popup_email_address}
                  </label>
                  <input
                    type="email"
                    required
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                    className="font-sans w-full outline-none"
                    style={{ border: '1px solid rgba(26,35,50,0.15)', borderRadius: '8px', padding: '0.7rem 0.9rem', fontSize: '0.85rem', color: 'var(--navy)' }}
                  />
                </div>

                <div>
                  <label className="font-sans block" style={{ fontSize: '0.65rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--navy)', marginBottom: '4px' }}>
                    {t.advisory_page.popup_phone}
                  </label>
                  <input
                    type="tel"
                    required
                    value={contactInfo.phone}
                    onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                    className="font-sans w-full outline-none"
                    style={{ border: '1px solid rgba(26,35,50,0.15)', borderRadius: '8px', padding: '0.7rem 0.9rem', fontSize: '0.85rem', color: 'var(--navy)' }}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full cursor-pointer hover:opacity-90 transition-opacity font-sans"
                  style={{
                    background: 'var(--navy)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '0.9rem 1.5rem',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    marginTop: '0.25rem',
                  }}
                >
                  {t.advisory_page.popup_send}
                </button>
              </form>
            )}

            {modalStep === 'success' && (
              <div className="flex flex-col items-center gap-4 py-4">
                <div style={{ fontSize: '2.5rem' }}>✓</div>
                <p className="font-sans text-center" style={{ fontSize: '0.95rem', color: 'var(--navy)' }}>
                  {t.advisory_page.popup_success}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
