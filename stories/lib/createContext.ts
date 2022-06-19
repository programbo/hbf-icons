import React from 'react'

export function createContext<TProps extends unknown | null>() {
  const context = React.createContext<TProps | undefined>(undefined)
  const useContext = () => {
    const c = React.useContext(context)
    if (c === undefined) {
      throw new Error('useContext must be inside a Provider with a value')
    }
    return c
  }
  return [useContext, context.Provider] as const
}
