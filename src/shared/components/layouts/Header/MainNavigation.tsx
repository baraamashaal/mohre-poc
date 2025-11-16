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
            <a href="#" className="hover:!text-primary-800 hover:!border-primary-800">
              <svg className="text-inherit" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                <rect width="256" height="256" fill="none" />
                <path d="M152,208V160a8,8,0,0,0-8-8H112a8,8,0,0,0-8,8v48a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V115.54a8,8,0,0,1,2.62-5.92l80-75.54a8,8,0,0,1,10.77,0l80,75.54a8,8,0,0,1,2.62,5.92V208a8,8,0,0,1-8,8H160A8,8,0,0,1,152,208Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
              </svg>
              <span>Home</span>
            </a>
          </li>
          <li className="menu-item lg:inline-flex lg:items-center menu-item-has-children group">
            <a href="#" data-dropdown-toggle="OurServicesHover" data-dropdown-trigger="hover" className="group-hover:!text-primary-800 group-hover:!border-primary-800">Services</a>
            <button id="OurServicesMenus" data-dropdown-toggle="OurServicesHover" className="submenu-btn flex-shrink-0 group-hover:!text-primary-800">
              <span><span className="sr-only">show submenu for "Service catalogue"</span></span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                <rect width="256" height="256" fill="none" />
                <polyline points="208 96 128 176 48 96" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
              </svg>
            </button>
            <div id="OurServicesHover" className="submenu hidden z-10 lg:py-4 xl:py-5 2xl:py-6 !inset-x-0 !top-full !transform-none xl:px-4 2xl:px-5">
              <div className="container">
                <div className="lg:grid lg:grid-cols-5 [&>div]:p-3" aria-labelledby="OurServicesMenus">
                  <div>
                    <h2 className="submenu-title max-lg:text-sm">Service category</h2>
                    <ul className="space-y-1.5 xl:space-y-2 2xl:space-y-2.5">
                      <li className="menu-item"> <a href="#">Service item number #1</a> </li>
                      <li className="menu-item"> <a href="#">Service item number #2</a> </li>
                      <li className="menu-item"> <a href="#">Service item number #3</a> </li>
                      <li className="menu-item"> <a href="#">Service item number #4</a> </li>
                      <li className="menu-item"> <a href="#">Service item number #5</a> </li>
                      <li className="menu-item"> <a href="#">Service item number #6</a> </li>
                      <li className="menu-item"> <a href="#">Service item number #7</a> </li>
                      <li className="menu-item"> <a href="#">Service item number #8</a> </li>
                      <li className="menu-item"> <a href="#">Service item number #9</a> </li>
                      <li className="menu-item"> <a href="#">View all 40 services</a> </li>
                    </ul>
                  </div>
                  <div>
                    <h2 className="submenu-title max-lg:text-sm">Service category</h2>
                    <ul className="space-y-1.5 xl:space-y-2 2xl:space-y-2.5">
                      <li className="menu-item"> <a href="#">Service item number #1</a> </li>
                      <li className="menu-item"> <a href="#">Service item number #2</a> </li>
                      <li className="menu-item"> <a href="#">Service item number #3</a> </li>
                      <li className="menu-item"> <a href="#">Service item number #4</a> </li>
                      <li className="menu-item"> <a href="#">Service item number #5</a> </li>
                      <li className="menu-item"> <a href="#">Service item number #6</a> </li>
                      <li className="menu-item"> <a href="#">Service item number #7</a> </li>
                      <li className="menu-item"> <a href="#">View all 40 services</a> </li>
                    </ul>
                  </div>
                  <div>
                    <h2 className="submenu-title max-lg:text-sm">Service category</h2>
                    <ul className="space-y-1.5 xl:space-y-2 2xl:space-y-2.5">
                      <li className="menu-item"> <a href="#">Service item number #1</a> </li>
                      <li className="menu-item"> <a href="#">Service item number #2</a> </li>
                      <li className="menu-item"> <a href="#">Service item number #3</a> </li>
                      <li className="menu-item"> <a href="#">Service item number #4</a> </li>
                      <li className="menu-item"> <a href="#">Service item number #5</a> </li>
                      <li className="menu-item"> <a href="#">Service item number #6</a> </li>
                      <li className="menu-item"> <a href="#">Service item number #7</a> </li>
                      <li className="menu-item"> <a href="#">View all 20 services</a> </li>
                    </ul>
                  </div>
                  <div>
                    <h2 className="submenu-title max-lg:text-sm">Service category</h2>
                    <ul className="space-y-1.5 xl:space-y-2 2xl:space-y-2.5">
                      <li className="menu-item"> <a href="#">Service item number #1</a> </li>
                      <li className="menu-item"> <a href="#">Service item number #2</a> </li>
                      <li className="menu-item"> <a href="#">Service item number #3</a> </li>
                      <li className="menu-item"> <a href="#">Service item number #4</a> </li>
                      <li className="menu-item"> <a href="#">Service item number #5</a> </li>
                      <li className="menu-item"> <a href="#">View all 10 services</a> </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li className="menu-item lg:inline-flex lg:items-center"> <a href="#" className="hover:!text-primary-800 hover:!border-primary-800">A custom link</a> </li>
          <li className="menu-item lg:inline-flex lg:items-center menu-item-has-children group">
            <a href="#" data-dropdown-toggle="DigitalParticipationHover" data-dropdown-trigger="hover" className="group-hover:!text-primary-800 group-hover:!border-primary-800">Digital participation</a>
            <button id="DigitalParticipationMenus" data-dropdown-toggle="DigitalParticipationHover" className="submenu-btn flex-shrink-0 group-hover:!text-primary-800">
              <span><span className="sr-only">show submenu for "Digital participation"</span></span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                <rect width="256" height="256" fill="none" />
                <polyline points="208 96 128 176 48 96" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
              </svg>
            </button>
            <div id="DigitalParticipationHover" className="submenu hidden z-10 lg:py-4 xl:py-5 2xl:py-6 rounded-bordered !-mt-2.5">
              <div className="[&>div]:p-3 [&>div]:w-72 lg:flex lg:flex-wrap" aria-labelledby="DigitalParticipationMenus">
                <div>
                  <h2 className="submenu-title max-lg:text-sm">Participate</h2>
                  <ul className="space-y-1.5 xl:space-y-2 2xl:space-y-2.5">
                    <li className="menu-item"> <a href="#">Events</a> </li>
                    <li className="menu-item"> <a href="#">Social media channels</a> </li>
                    <li className="menu-item"> <a href="#">Survey and polls</a> </li>
                  </ul>
                </div>
                <div>
                  <h2 className="submenu-title max-lg:text-sm">Media</h2>
                  <ul className="space-y-1.5 xl:space-y-2 2xl:space-y-2.5">
                    <li className="menu-item"> <a href="#">News and press releases</a> </li>
                    <li className="menu-item"> <a href="#">Video archives</a> </li>
                    <li className="menu-item"> <a href="#">Media gallery</a> </li>
                    <li className="menu-item"> <a href="#">Insights and blogs</a> </li>
                    <li className="menu-item"> <a href="#">Publications</a> </li>
                  </ul>
                </div>
                <div>
                  <h2 className="submenu-title max-lg:text-sm">Policies</h2>
                  <ul className="space-y-1.5 xl:space-y-2 2xl:space-y-2.5">
                    <li className="menu-item"> <a href="#">Digital participation policy</a> </li>
                    <li className="menu-item"> <a href="#">Social media content policy</a> </li>
                    <li className="menu-item"> <a href="#">National relationship management</a> </li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
          <li className="menu-item lg:inline-flex lg:items-center"> <a href="#" className="hover:!text-primary-800 hover:!border-primary-800">Open data</a> </li>
          <li className="menu-item relative lg:inline-flex lg:items-center menu-item-has-children group">
            <a href="#" data-dropdown-toggle="AboutHover" data-dropdown-trigger="hover" className="group-hover:!text-primary-800 group-hover:!border-primary-800">About</a>
            <button id="AboutMenus" data-dropdown-toggle="AboutHover" className="submenu-btn flex-shrink-0 group-hover:!text-primary-800">
              <span><span className="sr-only">show submenu for "About the ministry"</span></span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                <rect width="256" height="256" fill="none" />
                <polyline points="208 96 128 176 48 96" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
              </svg>
            </button>
            <div id="AboutHover" className="submenu hidden z-10 lg:py-4 xl:py-5 2xl:py-6 rounded-bordered !-mt-2.5">
              <div className="[&>div]:p-3 [&>div]:w-72 lg:flex lg:flex-wrap" aria-labelledby="AboutMenus">
                <div>
                  <ul className="space-y-1.5 xl:space-y-2 2xl:space-y-2.5">
                    <li className="menu-item"> <a href="#">About the Ministry</a> </li>
                    <li className="menu-item"> <a href="#">The Minister</a> </li>
                    <li className="menu-item"> <a href="#">Minister of State for
                      Financial Affairs</a>
                    </li>
                    <li className="menu-item"> <a href="#">Organization chart</a> </li>
                    <li className="menu-item"> <a href="#">Strategy</a> </li>
                    <li className="menu-item"> <a href="#">Awards</a> </li>
                    <li className="menu-item"> <a href="#">Contact</a> </li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
          <li className="menu-item relative lg:inline-flex lg:items-center menu-item-has-children group">
            <a href="#" data-dropdown-toggle="MoreHover" data-dropdown-trigger="hover" className="group-hover:!text-primary-800 group-hover:!border-primary-800">More</a>
            <button id="MoreMenus" data-dropdown-toggle="MoreHover" className="submenu-btn flex-shrink-0 group-hover:!text-primary-800">
              <span><span className="sr-only">show submenu for "More"</span></span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                <rect width="256" height="256" fill="none" />
                <polyline points="208 96 128 176 48 96" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
              </svg>
            </button>
            <div id="MoreHover" className="submenu hidden z-10 lg:py-4 xl:py-5 2xl:py-6 rounded-bordered !-mt-2.5">
              <div className="[&>div]:p-3 [&>div]:w-72 lg:flex lg:flex-wrap" aria-labelledby="MoreMenus">
                <div>
                  <ul className="space-y-1.5 xl:space-y-2 2xl:space-y-2.5">
                    <li className="menu-item"> <a href="#">Publications</a> </li>
                    <li className="menu-item"> <a href="#">Press contact and media kit</a> </li>
                    <li className="menu-item"> <a href="#">Federal debt management office</a> </li>
                    <li className="menu-item"> <a href="#">Digital procurement</a> </li>
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
