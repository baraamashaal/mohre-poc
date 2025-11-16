import { useTranslation } from 'react-i18next'
import { Button } from '../Button'

/**
 * Language Switcher Component
 *
 * Toggles between English (LTR) and Arabic (RTL)
 * - Automatically updates text direction (dir attribute)
 * - Updates language (lang attribute)
 * - Follows UAE Design System guidelines for RTL support
 */
export function LanguageSwitcher() {
  const { i18n } = useTranslation()

  const currentLang = i18n.language
  const isArabic = currentLang === 'ar'

  const toggleLanguage = () => {
    const newLang = isArabic ? 'en' : 'ar'
    void i18n.changeLanguage(newLang)
    // useDirection hook automatically handles dir and lang attributes
  }

  return (
    <Button
      onClick={toggleLanguage}
      variant="soft"
      style="secondary"
      size="xs"
      className="min-w-[60px]"
      aria-label={`Switch to ${isArabic ? 'English' : 'Arabic'}`}
    >
      {isArabic ? 'EN' : 'AR'}
    </Button>
  )
}