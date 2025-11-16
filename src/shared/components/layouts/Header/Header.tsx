import { HeaderDesktop } from './HeaderDesktop'
import { HeaderMobile } from './HeaderMobile'
import { LanguageModal } from './LanguageModal'
import { GoldStarModal } from './GoldStarModal'

/**
 * Header Component
 *
 * Main header component that composes:
 * - HeaderDesktop: Desktop version (hidden on mobile)
 * - HeaderMobile: Mobile version (hidden on desktop)
 * - LanguageModal: Language selection modal
 * - GoldStarModal: Gold Star Rating modal
 *
 * UAE Design System compliant header.
 * Matches the official UAE DSL HTML structure exactly.
 */
export function Header() {
  return (
    <>
      <header className="aegov-header">
        <HeaderDesktop />
        <HeaderMobile />
      </header>
      <LanguageModal />
      <GoldStarModal />
    </>
  )
}
