import { useState } from 'react'
import type { FC, SVGProps } from 'react'

import { createContext } from '../lib/createContext'

export type IconComponent = FC<SVGProps<SVGSVGElement>>
export type IconEntry = [string, IconComponent]

export interface SearchContextProps {
  search: string
  setSearch: React.Dispatch<React.SetStateAction<string>>
  searchSort: (a: IconEntry, z: IconEntry) => 0 | 1 | -1
}

export const [useSearchContext, SearchContext] = createContext<SearchContextProps>()

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [search, setSearch] = useState<string>('')

  const searchSort = (a: IconEntry, z: IconEntry) => {
    const [aName] = a
    const [zName] = z
    const aMatch = aName.toLowerCase().includes(search.toLowerCase())
    const zMatch = zName.toLowerCase().includes(search.toLowerCase())
    return aMatch ? (zMatch ? 0 : -1) : 1
  }

  const searchContext = {
    search,
    setSearch,
    searchSort,
  }

  return <SearchContext value={searchContext}>{children}</SearchContext>
}
