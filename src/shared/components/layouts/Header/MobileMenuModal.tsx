import { Hyperlink, Button } from '../../ui'

/**
 * MobileMenuModal Component
 *
 * Full-screen mobile menu modal with navigation and utility links.
 * Triggered by hamburger menu button.
 */
export function MobileMenuModal() {
  return (
    <div id="openMenu" tabIndex={-1} aria-hidden="true" className="responsive-menu !transform-none hidden [&_.main-navigation_.menu-item.active-page_a]:border-none [&_.accordion-active_svg]:rotate-180 max-lg:py-4 lg:hidden max-lg:bg-whitely-50 max-lg:fixed max-lg:inset-0 max-lg:w-full max-lg:[&_li_a]:w-full max-lg:[&_li_a]:py-2 max-lg:[&_.submenu-btn]:!absolute max-lg:[&_.submenu-btn]:end-0 max-lg:[&_.submenu-btn]:top-2 max-lg:[&_.submenu-btn]:w-6 max-lg:z-50 max-lg:flex-wrap max-lg:items-start max-lg:justify-start">
      <div className="w-full">
        <div className="w-full max-lg:px-4 flex items-center justify-between gap-4 mb-4">
          <Hyperlink href="#" variant="unstyled"> <img src="https://designsystem.gov.ae/img/logo-ministry.svg" alt="logo" width="150" /> </Hyperlink>
          <div className="flex items-center gap-4">
            <Button id="dropdownButtonSearch" data-dropdown-placement="bottom-end" data-dropdown-toggle="dropdownSearchMobile" variant="soft" size="xs" className="aegov-btn btn-icon btn-soft btn-xs" type="button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                <rect width="256" height="256" fill="none"></rect>
                <circle cx="112" cy="112" r="80" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></circle>
                <line x1="168.57" y1="168.57" x2="224" y2="224" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line>
              </svg>
              <span className="sr-only">search in site</span>
            </Button>
            <Button data-modal-hide="openMenu" variant="link" className="!p-0 !bg-transparent">
              <svg aria-hidden="true" className="w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                <rect width="256" height="256" fill="none" />
                <line x1="200" y1="56" x2="56" y2="200" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
                <line x1="200" y1="200" x2="56" y2="56" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
              </svg>
              <span className="sr-only">Close main menu</span>
            </Button>
          </div>
        </div>
        <div className="max-lg:max-h-[calc(100vh_-_6.375rem)] max-lg:px-4 max-lg:overflow-auto">
          {/* Search for mobile dropdown */}
          <form action="#" method="post">
            <div className="aegov-form-control control-sm w-64 xl:w-80 aegov-dropdown hidden max-md:!static max-md:!transform-none max-md:w-full" id="dropdownSearchMobile">
              <div className="form-control-input">
                <input type="search" aria-label="search in site" name="searchelem" id="searchelemMobile" placeholder="search for something" />
                <Button type="submit" variant="link" className="control-suffix !p-0 !bg-transparent !border-0 hover:!bg-transparent">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                    <rect width="256" height="256" fill="none"></rect>
                    <circle cx="112" cy="112" r="80" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></circle>
                    <line x1="168.57" y1="168.57" x2="224" y2="224" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line>
                  </svg>
                  <span className="sr-only">Search</span>
                </Button>
              </div>
            </div>
          </form>
          <nav className="main-navigation mb-4" aria-label="Main navigation">
            <div className="menu-main-menu-container">
              <ul id="responsive-header-collapse" data-accordion="collapse" className="menu nav-menu">
                <li className="menu-item has-link-icon">
                  <Hyperlink href="#" variant="unstyled">
                    <svg className="text-inherit" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                      <rect width="256" height="256" fill="none" />
                      <path d="M152,208V160a8,8,0,0,0-8-8H112a8,8,0,0,0-8,8v48a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V115.54a8,8,0,0,1,2.62-5.92l80-75.54a8,8,0,0,1,10.77,0l80,75.54a8,8,0,0,1,2.62,5.92V208a8,8,0,0,1-8,8H160A8,8,0,0,1,152,208Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
                    </svg>
                    <span>Home</span>
                  </Hyperlink>
                </li>
                <li className="menu-item relative menu-item-has-children">
                  <Hyperlink href="#" variant="unstyled">services</Hyperlink>
                  <Button variant="link" className="submenu-btn flex-shrink-0 !p-0 !bg-transparent !border-0" id="accordionOurServices" data-accordion-target="#accordion-collapse-service" aria-controls="accordion-collapse-service">
                    <span><span className="sr-only">show submenu for "services"</span></span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                      <rect width="256" height="256" fill="none" />
                      <polyline points="208 96 128 176 48 96" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
                    </svg>
                  </Button>
                  {/* submenu start from left */}
                  <div id="accordion-collapse-service" className="submenu hidden z-10 bg-transparent" aria-labelledby="accordionOurServices">
                    <div className="[&>div]:p-3 [&_ul]:space-y-1.5">
                      <div>
                        <h2 className="submenu-title max-lg:text-sm">Service category</h2>
                        <ul>
                          <li className="menu-item"> <Hyperlink href="#" variant="unstyled">Service item number #1</Hyperlink> </li>
                          <li className="menu-item"> <Hyperlink href="#" variant="unstyled">Service item number #2</Hyperlink> </li>
                          <li className="menu-item"> <Hyperlink href="#" variant="unstyled">Service item number #3</Hyperlink> </li>
                          <li className="menu-item"> <Hyperlink href="#" variant="unstyled">Service item number #4</Hyperlink> </li>
                          <li className="menu-item"> <Hyperlink href="#" variant="unstyled">Service item number #5</Hyperlink> </li>
                          <li className="menu-item"> <Hyperlink href="#" variant="unstyled">Service item number #6</Hyperlink> </li>
                          <li className="menu-item"> <Hyperlink href="#" variant="unstyled">Service item number #7</Hyperlink> </li>
                          <li className="menu-item"> <Hyperlink href="#" variant="unstyled">Service item number #8</Hyperlink> </li>
                          <li className="menu-item"> <Hyperlink href="#" variant="unstyled">Service item number #9</Hyperlink> </li>
                          <li className="menu-item"> <Hyperlink href="#" variant="unstyled">View all 40 services</Hyperlink> </li>
                        </ul>
                      </div>
                      <div>
                        <h2 className="submenu-title max-lg:text-sm">Service category</h2>
                        <ul>
                          <li className="menu-item"> <Hyperlink href="#" variant="unstyled">Service item number #1</Hyperlink> </li>
                          <li className="menu-item"> <Hyperlink href="#" variant="unstyled">Service item number #2</Hyperlink> </li>
                          <li className="menu-item"> <Hyperlink href="#" variant="unstyled">Service item number #3</Hyperlink> </li>
                          <li className="menu-item"> <Hyperlink href="#" variant="unstyled">Service item number #4</Hyperlink> </li>
                          <li className="menu-item"> <Hyperlink href="#" variant="unstyled">Service item number #5</Hyperlink> </li>
                          <li className="menu-item"> <Hyperlink href="#" variant="unstyled">Service item number #6</Hyperlink> </li>
                          <li className="menu-item"> <Hyperlink href="#" variant="unstyled">Service item number #7</Hyperlink> </li>
                          <li className="menu-item"> <Hyperlink href="#" variant="unstyled">View all 40 services</Hyperlink> </li>
                        </ul>
                      </div>
                      <div>
                        <h2 className="submenu-title max-lg:text-sm">Service category</h2>
                        <ul>
                          <li className="menu-item"> <Hyperlink href="#" variant="unstyled">Service item number #1</Hyperlink> </li>
                          <li className="menu-item"> <Hyperlink href="#" variant="unstyled">Service item number #2</Hyperlink> </li>
                          <li className="menu-item"> <Hyperlink href="#" variant="unstyled">Service item number #3</Hyperlink> </li>
                          <li className="menu-item"> <Hyperlink href="#" variant="unstyled">Service item number #4</Hyperlink> </li>
                          <li className="menu-item"> <Hyperlink href="#" variant="unstyled">Service item number #5</Hyperlink> </li>
                          <li className="menu-item"> <Hyperlink href="#" variant="unstyled">Service item number #6</Hyperlink> </li>
                          <li className="menu-item"> <Hyperlink href="#" variant="unstyled">Service item number #7</Hyperlink> </li>
                          <li className="menu-item"> <Hyperlink href="#" variant="unstyled">View all 20 services</Hyperlink> </li>
                        </ul>
                      </div>
                      <div>
                        <h2 className="submenu-title max-lg:text-sm">Service category</h2>
                        <ul>
                          <li className="menu-item"> <Hyperlink href="#" variant="unstyled">Service item number #1</Hyperlink> </li>
                          <li className="menu-item"> <Hyperlink href="#" variant="unstyled">Service item number #2</Hyperlink> </li>
                          <li className="menu-item"> <Hyperlink href="#" variant="unstyled">Service item number #3</Hyperlink> </li>
                          <li className="menu-item"> <Hyperlink href="#" variant="unstyled">Service item number #4</Hyperlink> </li>
                          <li className="menu-item"> <Hyperlink href="#" variant="unstyled">Service item number #5</Hyperlink> </li>
                          <li className="menu-item"> <Hyperlink href="#" variant="unstyled">View all 10 services</Hyperlink> </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="menu-item relative"> <Hyperlink href="#" variant="unstyled">A custom link</Hyperlink> </li>
                <li className="menu-item relative menu-item-has-children">
                  <Hyperlink href="#" variant="unstyled">Digital participation</Hyperlink>
                  <Button variant="link" className="submenu-btn flex-shrink-0 !p-0 !bg-transparent !border-0" id="accordionOurDigital" data-accordion-target="#accordion-collapse-digital" aria-controls="accordion-collapse-digital">
                    <span><span className="sr-only">show submenu for "Digital participation"</span></span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                      <rect width="256" height="256" fill="none" />
                      <polyline points="208 96 128 176 48 96" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
                    </svg>
                  </Button>
                  <div id="accordion-collapse-digital" className="submenu hidden z-10 bg-transparent">
                    <div className="[&>div]:p-3 [&_ul]:space-y-1.5" aria-labelledby="DigitalParticipationButton">
                      <div>
                        <h2 className="submenu-title max-lg:text-sm">Participate</h2>
                        <ul>
                          <li className="menu-item"> <Hyperlink href="#" variant="unstyled">Events</Hyperlink> </li>
                          <li className="menu-item"> <Hyperlink href="#" variant="unstyled">Social media channels</Hyperlink> </li>
                          <li className="menu-item"> <Hyperlink href="#" variant="unstyled">Survey and polls</Hyperlink> </li>
                        </ul>
                      </div>
                      <div>
                        <h2 className="submenu-title max-lg:text-sm">Media</h2>
                        <ul>
                          <li className="menu-item"> <Hyperlink href="#" variant="unstyled">News and press releases</Hyperlink> </li>
                          <li className="menu-item"> <Hyperlink href="#" variant="unstyled">Video archives</Hyperlink> </li>
                          <li className="menu-item"> <Hyperlink href="#" variant="unstyled">Media gallery</Hyperlink> </li>
                          <li className="menu-item"> <Hyperlink href="#" variant="unstyled">Insights and blogs</Hyperlink> </li>
                          <li className="menu-item"> <Hyperlink href="#" variant="unstyled">Publications</Hyperlink> </li>
                        </ul>
                      </div>
                      <div>
                        <h2 className="submenu-title max-lg:text-sm">Policies</h2>
                        <ul>
                          <li className="menu-item"> <Hyperlink href="#" variant="unstyled">Digital participation policy</Hyperlink> </li>
                          <li className="menu-item"> <Hyperlink href="#" variant="unstyled">Social media content policy</Hyperlink> </li>
                          <li className="menu-item"> <Hyperlink href="#" variant="unstyled">National relationship management</Hyperlink> </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="menu-item relative"> <Hyperlink href="#" variant="unstyled">Open data</Hyperlink> </li>
                <li className="menu-item relative menu-item-has-children active-page">
                  <Hyperlink href="#" variant="unstyled" id="AboutUsButton">About us</Hyperlink>
                  <Button variant="link" className="submenu-btn flex-shrink-0 !p-0 !bg-transparent !border-0" id="accordionAbout" data-accordion-target="#accordion-collapse-about" aria-controls="accordion-collapse-about">
                    <span><span className="sr-only">show submenu for "About us"</span></span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                      <rect width="256" height="256" fill="none" />
                      <polyline points="208 96 128 176 48 96" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
                    </svg>
                  </Button>
                  {/* submenu start from center */}
                  <div id="accordion-collapse-about" className="submenu hidden z-10 bg-transparent">
                    <div className="[&>div]:p-3 [&_ul]:space-y-1.5" aria-labelledby="AboutUsButton">
                      <div>
                        <ul>
                          <li className="menu-item"> <Hyperlink href="#" variant="unstyled">About the Ministry</Hyperlink> </li>
                          <li className="menu-item"> <Hyperlink href="#" variant="unstyled">The Minister</Hyperlink> </li>
                          <li className="menu-item"> <Hyperlink href="#" variant="unstyled">Minister of State for
                            Financial Affairs</Hyperlink>
                          </li>
                          <li className="menu-item"> <Hyperlink href="#" variant="unstyled">Organization chart</Hyperlink> </li>
                          <li className="menu-item"> <Hyperlink href="#" variant="unstyled">Strategy</Hyperlink> </li>
                          <li className="menu-item"> <Hyperlink href="#" variant="unstyled">Awards</Hyperlink> </li>
                          <li className="menu-item"> <Hyperlink href="#" variant="unstyled">Contact</Hyperlink> </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="menu-item relative menu-item-has-children">
                  <Hyperlink href="#" variant="unstyled" id="MoreButton">More</Hyperlink>
                  <Button variant="link" className="submenu-btn flex-shrink-0 !p-0 !bg-transparent !border-0" id="accordionMore" data-accordion-target="#accordion-collapse-more" aria-controls="accordion-collapse-more">
                    <span><span className="sr-only">show submenu for "More"</span></span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                      <rect width="256" height="256" fill="none" />
                      <polyline points="208 96 128 176 48 96" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
                    </svg>
                  </Button>
                  {/* submenu start from center with single or two col */}
                  <div id="accordion-collapse-more" className="submenu hidden z-10 bg-transparent">
                    <div className="[&>div]:p-3 [&_ul]:space-y-1.5" aria-labelledby="MoreButton">
                      <div>
                        <ul>
                          <li className="menu-item"> <Hyperlink href="#" variant="unstyled">Publications</Hyperlink> </li>
                          <li className="menu-item"> <Hyperlink href="#" variant="unstyled">Press contact and media kit</Hyperlink> </li>
                          <li className="menu-item"> <Hyperlink href="#" variant="unstyled">Federal debt management office</Hyperlink> </li>
                          <li className="menu-item"> <Hyperlink href="#" variant="unstyled">Digital procurement</Hyperlink> </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </nav>
          <div className="header-top-right">
            <div>
              <ul className="header-common-links">
                <li>
                  <Hyperlink href="#" variant="unstyled">
                    <svg className="flex-shrink-0 w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                      <rect width="256" height="256" fill="none" />
                      <circle cx="128" cy="96" r="64" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
                      <path d="M32,216c19.37-33.47,54.55-56,96-56s76.63,22.53,96,56" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
                    </svg>
                    <span>Login</span>
                  </Hyperlink>
                </li>
                <li>
                  <Hyperlink href="#" variant="unstyled">
                    <svg className="flex-shrink-0 w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                      <rect width="256" height="256" fill="none" />
                      <circle cx="128" cy="40" r="24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
                      <path d="M39,102.9C27.31,97.5,31.15,80,44,80H212c12.87,0,16.71,17.5,5,22.9L160,128l22.87,86.93a12,12,0,0,1-21.75,10.14L128,168,94.88,225.07a12,12,0,0,1-21.75-10.14L96,128Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
                    </svg>
                    <span>Accessibility</span>
                  </Hyperlink>
                </li>
                <li>
                  <Hyperlink href="#" variant="unstyled" onClick={() => { return false; }} data-modal-target="modal-lang" data-modal-toggle="modal-lang">
                    <svg className="flex-shrink-0 w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></circle><path d="M168,128c0,64-40,96-40,96s-40-32-40-96,40-96,40-96S168,64,168,128Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path><line x1="37.46" y1="96" x2="218.54" y2="96" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line><line x1="37.46" y1="160" x2="218.54" y2="160" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line></svg>
                    <span>Switch Language</span>
                  </Hyperlink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

MobileMenuModal.displayName = 'MobileMenuModal'
