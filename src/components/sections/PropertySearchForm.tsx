'use client';

import { useRouter } from 'next/navigation';
import { type Locale, getLocalizedPath } from '@/lib/i18n';
import type en from '@/messages/en.json';

type Messages = typeof en;

export function PropertySearchForm({ locale, t }: { locale: Locale; t: Messages }) {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const looking = data.get('looking') as string;
    const type = data.get('type') as string;
    const price = data.get('price') as string;
    const location = data.get('location') as string;

    const params = new URLSearchParams();
    if (looking) params.set('looking', looking);
    if (type) params.set('type', type);
    if (price) params.set('price', price);
    if (location) params.set('location', location);

    const contactPath = getLocalizedPath('contact', locale);
    router.push(`${contactPath}${params.toString() ? `?${params.toString()}` : ''}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_auto] items-end gap-0"
      style={{
        background: 'white',
        borderRadius: '14px',
        padding: '0.5rem',
        boxShadow: '0 20px 60px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)',
      }}
    >
      {/* Looking for */}
      <div style={{ padding: '0.75rem 1rem' }}>
        <label
          className="font-sans block"
          style={{ fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--navy)', marginBottom: '4px' }}
        >
          {t.advisory_page.form_looking}
        </label>
        <input
          type="text"
          name="looking"
          placeholder={t.advisory_page.form_looking_placeholder}
          className="font-sans w-full outline-none bg-transparent"
          style={{ fontSize: '0.85rem', color: 'var(--navy)', padding: '4px 0' }}
        />
      </div>

      {/* Type */}
      <div style={{ padding: '0.75rem 1rem', borderLeft: '1px solid rgba(26,35,50,0.08)' }}>
        <label
          className="font-sans block"
          style={{ fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--navy)', marginBottom: '4px' }}
        >
          {t.advisory_page.form_type}
        </label>
        <select
          name="type"
          className="font-sans w-full outline-none bg-transparent appearance-none cursor-pointer"
          style={{ fontSize: '0.85rem', color: 'var(--navy)', opacity: 0.5, padding: '4px 0' }}
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
      <div style={{ padding: '0.75rem 1rem', borderLeft: '1px solid rgba(26,35,50,0.08)' }}>
        <label
          className="font-sans block"
          style={{ fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--navy)', marginBottom: '4px' }}
        >
          {t.advisory_page.form_price}
        </label>
        <select
          name="price"
          className="font-sans w-full outline-none bg-transparent appearance-none cursor-pointer"
          style={{ fontSize: '0.85rem', color: 'var(--navy)', opacity: 0.5, padding: '4px 0' }}
          defaultValue=""
        >
          <option value="" disabled>{t.advisory_page.form_price_placeholder}</option>
          <option value="0-200k">{t.advisory_page.form_price_1}</option>
          <option value="200k-500k">{t.advisory_page.form_price_2}</option>
          <option value="500k-1m">{t.advisory_page.form_price_3}</option>
          <option value="1m+">{t.advisory_page.form_price_4}</option>
        </select>
      </div>

      {/* Location */}
      <div style={{ padding: '0.75rem 1rem', borderLeft: '1px solid rgba(26,35,50,0.08)' }}>
        <label
          className="font-sans block"
          style={{ fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--navy)', marginBottom: '4px' }}
        >
          {t.advisory_page.form_location}
        </label>
        <select
          name="location"
          className="font-sans w-full outline-none bg-transparent appearance-none cursor-pointer"
          style={{ fontSize: '0.85rem', color: 'var(--navy)', opacity: 0.5, padding: '4px 0' }}
          defaultValue=""
        >
          <option value="" disabled>{t.advisory_page.form_location_placeholder}</option>
          <option value="barcelona">{t.advisory_page.form_location_1}</option>
          <option value="costa-brava">{t.advisory_page.form_location_2}</option>
          <option value="sitges">{t.advisory_page.form_location_3}</option>
          <option value="madrid">{t.advisory_page.form_location_4}</option>
          <option value="other">{t.advisory_page.form_location_5}</option>
        </select>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="font-sans cursor-pointer hover:opacity-90 transition-opacity"
        style={{
          background: 'var(--navy)',
          color: 'white',
          border: 'none',
          borderRadius: '10px',
          padding: '0.9rem 1.8rem',
          fontSize: '0.75rem',
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
        }}
      >
        {t.advisory_page.form_submit}
      </button>
    </form>
  );
}
