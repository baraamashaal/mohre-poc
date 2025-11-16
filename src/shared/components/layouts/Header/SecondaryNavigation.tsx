/**
 * SecondaryNavigation Component
 *
 * Right-side utility navigation with icon-only links:
 * - Login
 * - Accessibility
 * - Language switcher
 */
export function SecondaryNavigation() {
  return (
    <div className="header-navs-right">
      <ul className="flex items-center">
        <li>
          <a href="#" data-tooltip-placement="bottom" data-tooltip-target="tooltip-login" className="lg:h-12 xl:h-14 lg:px-2 xl:px-3 flex items-center justify-center flex-shrink-0">
            <svg className="flex-shrink-0 w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
              <rect width="256" height="256" fill="none" />
              <circle cx="128" cy="96" r="64" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
              <path d="M32,216c19.37-33.47,54.55-56,96-56s76.63,22.53,96,56" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
            </svg>
            <span className="sr-only">Login</span>
          </a>
          <div id="tooltip-login" role="tooltip" className="z-50 aegov-tooltip">
            Login
            <div className="tooltip-arrow" data-popper-arrow></div>
          </div>
        </li>
        <li>
          <a href="#" data-tooltip-placement="bottom" data-tooltip-target="tooltip-accessibility" className="lg:h-12 xl:h-14 lg:px-2 xl:px-3 flex items-center justify-center flex-shrink-0">
            <svg className="flex-shrink-0 w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
              <rect width="256" height="256" fill="none" />
              <circle cx="128" cy="40" r="24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
              <path d="M39,102.9C27.31,97.5,31.15,80,44,80H212c12.87,0,16.71,17.5,5,22.9L160,128l22.87,86.93a12,12,0,0,1-21.75,10.14L128,168,94.88,225.07a12,12,0,0,1-21.75-10.14L96,128Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
            </svg>
            <span className="sr-only">Accessibility</span>
          </a>
          <div id="tooltip-accessibility" role="tooltip" className="z-50 aegov-tooltip">
            Accessibility
            <div className="tooltip-arrow" data-popper-arrow></div>
          </div>
        </li>
        <li>
          <a href="#" onClick={() => { return false; }} data-modal-target="modal-lang" data-modal-toggle="modal-lang" data-tooltip-placement="bottom" data-tooltip-target="tooltip-Switch-language" className="lg:h-12 xl:h-14 lg:px-2 xl:px-3 flex items-center justify-center flex-shrink-0 no-underline !text-lg !font-normal">
            <svg className="flex-shrink-0 w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></circle><path d="M168,128c0,64-40,96-40,96s-40-32-40-96,40-96,40-96S168,64,168,128Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path><line x1="37.46" y1="96" x2="218.54" y2="96" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line><line x1="37.46" y1="160" x2="218.54" y2="160" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line></svg>
            <span className="sr-only">Switch Language</span>
          </a>
          <div id="tooltip-Switch-language" role="tooltip" className="z-50 aegov-tooltip">
            Switch language
            <div className="tooltip-arrow" data-popper-arrow></div>
          </div>
        </li>
      </ul>
    </div>
  )
}

SecondaryNavigation.displayName = 'SecondaryNavigation'