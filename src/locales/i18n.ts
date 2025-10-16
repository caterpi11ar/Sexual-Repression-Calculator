import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import { initReactI18next } from 'react-i18next'

import en from './lang/en_US/index.json'
import zh from './lang/zh_CN/index.json'

enum LocalEnum {
  en_US = 'en_US',
  zh_CN = 'zh_CN',
}

const defaultLng = localStorage.getItem('i18n') || (LocalEnum.zh_CN as string)
i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    lng: defaultLng, // localstorage -> i18nextLng: zh_CN
    fallbackLng: LocalEnum.zh_CN,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en_US: { translation: en },
      zh_CN: { translation: zh },
    },
  })

export default i18n
export const { t } = i18n
