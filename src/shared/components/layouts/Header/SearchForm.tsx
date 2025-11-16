import { Input } from '../../forms'
import { MagnifyingGlassIcon } from '@phosphor-icons/react'

/**
 * SearchForm Component
 *
 * Desktop search form with search input.
 * Positioned in header-top section.
 * Uses Input component with custom search icon at the end (suffix).
 */
export function SearchForm() {
  return (
    <form action="#" method="post" className="w-64 xl:w-80">
      <Input
        type="text"
        id="searchelem"
        name="searchelem"
        placeholder="search for something"
        aria-label="search in site"
        suffix={<MagnifyingGlassIcon className="h-6 w-6" />}
      />
    </form>
  )
}

SearchForm.displayName = 'SearchForm'