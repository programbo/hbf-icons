import React from 'react'
import 'react-dom'
import ReactDOMClient from 'react-dom/client'
import { IconType } from '../src/icons/types'
import { Default as LazyIcon } from '../stories/LazyIcon.stories'

describe('LazyIcon', () => {
  it('renders without crashing', () => {
    const container = document.createElement('div')

    // Create a root.
    const root = ReactDOMClient.createRoot(container)
    root.render(<LazyIcon icon={IconType.RatingExcellent} />)
  })
})
