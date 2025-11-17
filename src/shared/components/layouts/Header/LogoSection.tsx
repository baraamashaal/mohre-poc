import { useTranslation } from 'react-i18next'
import { Hyperlink } from '../../ui'

/**
 * LogoSection Component
 *
 * Displays the header logos (main ministry logo + gold star logo).
 * Uses language-specific logo based on current i18n language.
 * Used in both desktop and mobile headers.
 */
export function LogoSection() {
  const { i18n } = useTranslation()
  const logoSrc = i18n.language === 'ar'
    ? '/img/block_assets/_uae-mohre-logo-arabic.svg'
    : '/img/block_assets/uae-mohre-logo-english.svg'

  return (
    <div className="header-logo logos">
      <div className="logo-item">
        <Hyperlink href="#" variant="unstyled" className="logo block">
          <img src={logoSrc} alt="logo" />
          <span className="sr-only">Logo</span>
        </Hyperlink>
      </div>
      <div className="logo-item">
        <Hyperlink href="#" variant="unstyled" data-modal-target="modal-gold-star" data-modal-toggle="modal-gold-star" className="block">
          <img src="https://designsystem.gov.ae/img/global-star.png" alt="logo" className="secondary-logo" />
          <span className="sr-only">Gold star Logo</span>
        </Hyperlink>
      </div>
    </div>
  )
}

LogoSection.displayName = 'LogoSection'