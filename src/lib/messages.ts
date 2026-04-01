import type { Locale } from './i18n';
import en from '@/messages/en.json';
import nl from '@/messages/nl.json';
import es from '@/messages/es.json';

const messages: Record<Locale, typeof en> = { en, nl, es };

export function getMessages(locale: Locale) {
  return messages[locale] ?? messages.en;
}
