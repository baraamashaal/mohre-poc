import 'i18next'

import enCommon from '../locales/en/common.json'
import enCompany from '../locales/en/company.json'
import enEmployee from '../locales/en/employee.json'

// Type augmentation for i18next
// Official docs: https://www.i18next.com/overview/typescript
declare module 'i18next' {
  interface CustomTypeOptions {
    // Set default namespace
    defaultNS: 'common'

    // Resources for type inference (using English as source of truth)
    resources: {
      common: typeof enCommon
      company: typeof enCompany
      employee: typeof enEmployee
    }

    // Return type options for better type safety
    returnNull: false  // Don't allow null returns
    returnObjects: false  // Don't allow object returns (only strings)
  }
}
