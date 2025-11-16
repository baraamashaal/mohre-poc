/**
 * LogoSection Component
 *
 * Displays the header logos (main ministry logo + gold star logo).
 * Used in both desktop and mobile headers.
 */
export function LogoSection() {
  return (
    <div className="header-logo logos">
      <div className="logo-item">
        <a href="#" className="logo block">
          <img src="https://designsystem.gov.ae/img/logo-ministry.svg" alt="logo" />
          <span className="sr-only">Logo</span>
        </a>
      </div>
      <div className="logo-item">
        <a href="#" data-modal-target="modal-gold-star" data-modal-toggle="modal-gold-star" className="block">
          <img src="https://designsystem.gov.ae/img/global-star.png" alt="logo" className="secondary-logo" />
          <span className="sr-only">Gold star Logo</span>
        </a>
      </div>
    </div>
  )
}

LogoSection.displayName = 'LogoSection'