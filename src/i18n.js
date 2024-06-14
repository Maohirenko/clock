import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';


const options = {
  // order and from where user language should be detected
  order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
  // keys or params to lookup language from
  lookupQuerystring: 'lng',
  lookupCookie: 'i18next',
  lookupLocalStorage: 'i18nextLng',
  lookupSessionStorage: 'i18nextLng',
  lookupFromPathIndex: 0,
  lookupFromSubdomainIndex: 0,

  // cache user language on
  caches: ['localStorage', 'cookie'],
  excludeCacheFor: ['cimode'], // languages to not persist (cookie, localStorage)

  // optional expiry and domain for set cookie
  cookieMinutes: 10,
  cookieDomain: 'myDomain',

  // optional htmlTag with lang attribute, the default is:
  htmlTag: document.documentElement,

  // optional set cookie options, reference:[MDN Set-Cookie docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie)
  cookieOptions: { path: '/', sameSite: 'strict' },

  // optional conversion function used to modify the detected language code
  // eslint-disable-next-line
  convertDetectedLanguage: 'Iso15897',
  // eslint-disable-next-line
  convertDetectedLanguage: (lng) => lng.replace('-', '_')
}

i18next.use(initReactI18next).use(LanguageDetector).use(Backend).init({
  fallbackLng: 'en',
  supportedLngs: ['en', 'uk'],
  detection: options,

      backend: {
    loadPath: '/clock/locales/{{lng}}/{{ns}}.json',
  }
});

