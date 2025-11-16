import {useEffect} from 'react';
import {useTranslation} from 'react-i18next';

/**
 * Hook to handle RTL/LTR direction switching based on current language
 *
 * Automatically updates the HTML dir attribute when language changes
 * - Arabic (ar): RTL (Right-to-Left)
 * - English (en): LTR (Left-to-Right)
 *
 * Based on UAE Design System guidelines and i18next best practices
 */
export function useDirection() {
  const { i18n } = useTranslation()

  useEffect(() => {
    // Get current text direction from i18next
    // Set dir attribute on html element (document.documentElement)
    document.documentElement.dir = i18n.dir()

    // Also set lang attribute for accessibility
    document.documentElement.lang = i18n.language
  }, [i18n, i18n.language])

  return {
    dir: i18n.dir(),
    language: i18n.language,
    isRTL: i18n.dir() === 'rtl',
  }
}
