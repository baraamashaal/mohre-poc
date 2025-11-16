import { Hyperlink, Button } from '../../ui'

/**
 * MainNavigation Component
 *
 * Primary navigation menu for desktop header.
 * Contains menu items with dropdowns for services, digital participation, about, etc.
 */
export function MainNavigation() {
  return (
    <nav className="main-navigation" aria-label="Main navigation">
      <div className="menu-main-menu-container">
        <ul className="menu nav-menu lg:flex lg:items-center lg:gap-1 xl:gap-2">
          <li className="menu-item lg:inline-flex lg:items-center has-link-icon">
            <Hyperlink href="#" variant="unstyled" className="hover:!text-primary-800 hover:!border-primary-800">
              <svg className="text-inherit" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                <rect width="256" height="256" fill="none" />
                <path d="M152,208V160a8,8,0,0,0-8-8H112a8,8,0,0,0-8,8v48a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V115.54a8,8,0,0,1,2.62-5.92l80-75.54a8,8,0,0,1,10.77,0l80,75.54a8,8,0,0,1,2.62,5.92V208a8,8,0,0,1-8,8H160A8,8,0,0,1,152,208Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
              </svg>
              <span>Home</span>
            </Hyperlink>
          </li>
          <li className="menu-item lg:inline-flex lg:items-center menu-item-has-children group">
            <Hyperlink href="#" variant="unstyled" data-dropdown-toggle="OurServicesHover" data-dropdown-trigger="hover" className="group-hover:!text-primary-800 group-hover:!border-primary-800">Services</Hyperlink>
            <Button id="OurServicesMenus" data-dropdown-toggle="OurServicesHover" variant="link" className="submenu-btn flex-shrink-0 group-hover:!text-primary-800 !p-0 !bg-transparent !border-0 hover:!bg-transparent">
              <span><span className="sr-only">show submenu for "Service catalogue"</span></span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                <rect width="256" height="256" fill="none" />
                <polyline points="208 96 128 176 48 96" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
              </svg>
            </Button>
            <div id="OurServicesHover" className="submenu hidden z-10 lg:py-4 xl:py-5 2xl:py-6 !inset-x-0 !top-full !transform-none xl:px-4 2xl:px-5">
              <div className="container">
                <div className="lg:grid lg:grid-cols-5 [&>div]:p-3" aria-labelledby="OurServicesMenus">
                  <div>
                    <h2 className="submenu-title max-lg:text-sm">Service category</h2>
                    <ul className="space-y-1.5 xl:space-y-2 2xl:space-y-2.5">
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
                    <ul className="space-y-1.5 xl:space-y-2 2xl:space-y-2.5">
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
                    <ul className="space-y-1.5 xl:space-y-2 2xl:space-y-2.5">
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
                    <ul className="space-y-1.5 xl:space-y-2 2xl:space-y-2.5">
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
            </div>
          </li>
          <li className="menu-item lg:inline-flex lg:items-center"> <Hyperlink href="#" variant="unstyled" className="hover:!text-primary-800 hover:!border-primary-800">A custom link</Hyperlink> </li>
          <li className="menu-item lg:inline-flex lg:items-center menu-item-has-children group">
            <Hyperlink href="#" variant="unstyled" data-dropdown-toggle="DigitalParticipationHover" data-dropdown-trigger="hover" className="group-hover:!text-primary-800 group-hover:!border-primary-800">Digital participation</Hyperlink>
            <Button id="DigitalParticipationMenus" data-dropdown-toggle="DigitalParticipationHover" variant="link" className="submenu-btn flex-shrink-0 group-hover:!text-primary-800 !p-0 !bg-transparent !border-0 hover:!bg-transparent">
              <span><span className="sr-only">show submenu for "Digital participation"</span></span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                <rect width="256" height="256" fill="none" />
                <polyline points="208 96 128 176 48 96" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
              </svg>
            </Button>
            <div id="DigitalParticipationHover" className="submenu hidden z-10 lg:py-4 xl:py-5 2xl:py-6 rounded-bordered !-mt-2.5">
              <div className="[&>div]:p-3 [&>div]:w-72 lg:flex lg:flex-wrap" aria-labelledby="DigitalParticipationMenus">
                <div>
                  <h2 className="submenu-title max-lg:text-sm">Participate</h2>
                  <ul className="space-y-1.5 xl:space-y-2 2xl:space-y-2.5">
                    <li className="menu-item"> <Hyperlink href="#" variant="unstyled">Events</Hyperlink> </li>
                    <li className="menu-item"> <Hyperlink href="#" variant="unstyled">Social media channels</Hyperlink> </li>
                    <li className="menu-item"> <Hyperlink href="#" variant="unstyled">Survey and polls</Hyperlink> </li>
                  </ul>
                </div>
                <div>
                  <h2 className="submenu-title max-lg:text-sm">Media</h2>
                  <ul className="space-y-1.5 xl:space-y-2 2xl:space-y-2.5">
                    <li className="menu-item"> <Hyperlink href="#" variant="unstyled">News and press releases</Hyperlink> </li>
                    <li className="menu-item"> <Hyperlink href="#" variant="unstyled">Video archives</Hyperlink> </li>
                    <li className="menu-item"> <Hyperlink href="#" variant="unstyled">Media gallery</Hyperlink> </li>
                    <li className="menu-item"> <Hyperlink href="#" variant="unstyled">Insights and blogs</Hyperlink> </li>
                    <li className="menu-item"> <Hyperlink href="#" variant="unstyled">Publications</Hyperlink> </li>
                  </ul>
                </div>
                <div>
                  <h2 className="submenu-title max-lg:text-sm">Policies</h2>
                  <ul className="space-y-1.5 xl:space-y-2 2xl:space-y-2.5">
                    <li className="menu-item"> <Hyperlink href="#" variant="unstyled">Digital participation policy</Hyperlink> </li>
                    <li className="menu-item"> <Hyperlink href="#" variant="unstyled">Social media content policy</Hyperlink> </li>
                    <li className="menu-item"> <Hyperlink href="#" variant="unstyled">National relationship management</Hyperlink> </li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
          <li className="menu-item lg:inline-flex lg:items-center"> <Hyperlink href="#" variant="unstyled" className="hover:!text-primary-800 hover:!border-primary-800">Open data</Hyperlink> </li>
          <li className="menu-item relative lg:inline-flex lg:items-center menu-item-has-children group">
            <Hyperlink href="#" variant="unstyled" data-dropdown-toggle="AboutHover" data-dropdown-trigger="hover" className="group-hover:!text-primary-800 group-hover:!border-primary-800">About</Hyperlink>
            <Button id="AboutMenus" data-dropdown-toggle="AboutHover" variant="link" className="submenu-btn flex-shrink-0 group-hover:!text-primary-800 !p-0 !bg-transparent !border-0 hover:!bg-transparent">
              <span><span className="sr-only">show submenu for "About the ministry"</span></span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                <rect width="256" height="256" fill="none" />
                <polyline points="208 96 128 176 48 96" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
              </svg>
            </Button>
            <div id="AboutHover" className="submenu hidden z-10 lg:py-4 xl:py-5 2xl:py-6 rounded-bordered !-mt-2.5">
              <div className="[&>div]:p-3 [&>div]:w-72 lg:flex lg:flex-wrap" aria-labelledby="AboutMenus">
                <div>
                  <ul className="space-y-1.5 xl:space-y-2 2xl:space-y-2.5">
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
          <li className="menu-item relative lg:inline-flex lg:items-center menu-item-has-children group">
            <Hyperlink href="#" variant="unstyled" data-dropdown-toggle="MoreHover" data-dropdown-trigger="hover" className="group-hover:!text-primary-800 group-hover:!border-primary-800">More</Hyperlink>
            <Button id="MoreMenus" data-dropdown-toggle="MoreHover" variant="link" className="submenu-btn flex-shrink-0 group-hover:!text-primary-800 !p-0 !bg-transparent !border-0 hover:!bg-transparent">
              <span><span className="sr-only">show submenu for "More"</span></span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                <rect width="256" height="256" fill="none" />
                <polyline points="208 96 128 176 48 96" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
              </svg>
            </Button>
            <div id="MoreHover" className="submenu hidden z-10 lg:py-4 xl:py-5 2xl:py-6 rounded-bordered !-mt-2.5">
              <div className="[&>div]:p-3 [&>div]:w-72 lg:flex lg:flex-wrap" aria-labelledby="MoreMenus">
                <div>
                  <ul className="space-y-1.5 xl:space-y-2 2xl:space-y-2.5">
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
  )
}

MainNavigation.displayName = 'MainNavigation'
