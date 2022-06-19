import React from 'react'

import ErrorBoundary from './Error'
import { IconPath } from './icons/paths'
import { IconType } from './icons/types'

type LazilyLoadedSVG = Promise<{
  default: React.ComponentType<React.SVGAttributes<SVGElement>>
}>

type SVGProps = React.SVGAttributes<SVGElement>

export interface LazyIconProps extends SVGProps {
  icon: IconType
  size?: number | string
}

export const LazyIcon = React.forwardRef<
  React.Component<React.SVGAttributes<SVGElement>>,
  LazyIconProps
>(({ icon, size, width, height, ...props }, ref) => {
  const Icon = React.lazy(
    (): LazilyLoadedSVG => import(`../src/icons/${IconPath[icon]}`)
  )

  return (
    <ErrorBoundary>
      <React.Suspense fallback="Loading...">
        <Icon
          ref={ref}
          width={width ?? size}
          height={height ?? size}
          {...props}
        />
      </React.Suspense>
    </ErrorBoundary>
  )
})
