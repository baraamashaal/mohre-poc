/**
 * SearchForm Component
 *
 * Desktop search form with input and submit button.
 * Positioned in header-top section.
 */
export function SearchForm() {
  return (
    <form action="#" method="post">
      <div className="aegov-form-control w-64 xl:w-80 ">
        <div className="form-control-input">
          <input type="search" aria-label="search in site" name="searchelem" id="searchelem" placeholder="search for something" />
          <button type="submit" className="control-suffix">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
              <rect width="256" height="256" fill="none"></rect>
              <circle cx="112" cy="112" r="80" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></circle>
              <line x1="168.57" y1="168.57" x2="224" y2="224" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line>
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </div>
      </div>
    </form>
  )
}

SearchForm.displayName = 'SearchForm'