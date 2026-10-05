import { ui, defaultLang } from './ui';

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang], ...args: any[]) {
    let str = ui[lang][key] || ui[defaultLang][key];
    if (args.length > 0 && typeof args[0] === 'object') {
      const vars = args[0];
      for (const [k, v] of Object.entries(vars)) {
        str = str.replace(new RegExp(`{${k}}`, 'g'), String(v));
      }
    }
    return str;
  }
}
