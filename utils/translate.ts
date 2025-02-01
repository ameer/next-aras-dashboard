import translations from '@/locales/translations.json';
import { Translations } from '@/types';
const typedTranslations: Translations = translations
export const t = (key: string) : string => {
  return typedTranslations[key] || key;
};
