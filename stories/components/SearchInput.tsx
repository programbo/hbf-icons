import type { CSSProperties } from 'react'
import { useEffect, useRef } from 'react'

import { useSearchContext } from './SearchContext'

interface SearchInputProps {
  style: CSSProperties
}

export const SearchInput = ({ style }: SearchInputProps) => {
  const { search, setSearch } = useSearchContext()
  const searchRef = useRef<HTMLInputElement>(null)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  useEffect(() => {
    searchRef.current?.focus()
  }, [])

  return (
    <input
      ref={searchRef}
      onChange={handleSearch}
      value={search}
      style={style}
      type="search"
      name="icon-search"
      id="icon-search"
      placeholder="Icon search..."
    />
  )
}
