import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// Import translation files
import enCommon from '../locales/en/common.json'
import enCompany from '../locales/en/company.json'
import enEmployee from '../locales/en/employee.json'

import arCommon from '../locales/ar/common.json'
import arCompany from '../locales/ar/company.json'
import arEmployee from '../locales/ar/employee.json'

const resources = {
  en: {
    common: enCommon,
    company: enCompany,
    employee: enEmployee,
  },
  ar: {
    common: arCommon,
    company: arCompany,
    employee: arEmployee,
  },
}

void i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    defaultNS: 'common',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  })

export default i18n