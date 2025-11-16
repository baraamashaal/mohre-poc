import { LogoSection } from './LogoSection'
import { MobileMenuModal } from './MobileMenuModal'
import { Button } from '../../ui'

/**
 * HeaderMobile Component
 *
 * Mobile version of the header (hidden on desktop).
 * Contains header-top (logos + hamburger) and mobile menu modal.
 */
export function HeaderMobile() {
  return (
    <div className="header-mobile lg:hidden">
      <div className="header-top py-2">
        <div className="container">
          <div className="max-lg:flex max-lg:items-center justify-between">
            <LogoSection />
            <div className="header-top-right">
              <div>
                <div className="flex items-center gap-3">
                  <Button data-modal-target="openMenu" data-modal-toggle="openMenu" variant="link" className="hamburger-icon text-aeblack-700 !p-0 !bg-transparent !border-0 hover:!bg-transparent">
                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                      <rect width="256" height="256" fill="none"></rect>
                      <line x1="40" y1="128" x2="216" y2="128" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line>
                      <line x1="40" y1="64" x2="216" y2="64" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line>
                      <line x1="40" y1="192" x2="216" y2="192" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line>
                    </svg>
                    <span className="sr-only">Toggle main menu</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MobileMenuModal />
    </div>
  )
}

HeaderMobile.displayName = 'HeaderMobile'
