import { LogoSection } from './LogoSection'
import { SearchForm } from './SearchForm'
import { MainNavigation } from './MainNavigation'
import { SecondaryNavigation } from './SecondaryNavigation'

/**
 * HeaderDesktop Component
 *
 * Desktop version of the header (hidden on mobile).
 * Contains header-top (logos + search) and header-navs (navigation + actions).
 */
export function HeaderDesktop() {
  return (
    <div className="header-desktop hidden lg:block">
      <div className="header-top py-3">
        <div className="container">
          <div className="lg:flex lg:items-center lg:justify-between">
            <LogoSection />
            <div className="header-top-right flex flex-wrap items-center">
              <SearchForm />
            </div>
          </div>
        </div>
      </div>
      <div className="header-navs">
        <div className="container">
          <div className="flex content-between flex-wrap lg:flex-nowrap lg:justify-between lg:items-center">
            <MainNavigation />
            <SecondaryNavigation />
          </div>
        </div>
      </div>
    </div>
  )
}

HeaderDesktop.displayName = 'HeaderDesktop'
