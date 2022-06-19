import React from 'react'

import type { Meta, Story } from '@storybook/react'

import * as Illustrative120px from '../src/icons/illustrative/120px'
import * as Illustrative80px from '../src/icons/illustrative/80px'
import { SearchProvider, useSearchContext } from './components/SearchContext'
import { SearchInput } from './components/SearchInput'
import { useCopyToClipboard } from './lib/useCopyToClipboard'
import {
  cellStyle,
  copyNotificationStyle,
  gridStyle,
  placeholderStyle,
  prefixStyle,
  searchStyle,
  textStyle,
  wrapperStyle,
} from './styles'

const meta: Meta = {
  title: 'Illustrative Icons',
  component: Illustrative80px.Alert,
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['80px', '120px'],
    },
    darkMode: {
      control: 'boolean',
    },
    background: {
      control: 'color',
    },
    icons: {
      table: {
        disable: true,
      },
    },
  },
  decorators: [
    (Story) => (
      <SearchProvider>
        <Story />
      </SearchProvider>
    ),
  ],
}

export default meta

type IconSet = Record<string, React.FC<React.SVGProps<SVGSVGElement>>>

interface StoryProps {
  background: string
  darkMode: boolean
  size: `${number}px`
  icons: IconSet
}

const Template: Story<StoryProps> = ({ background, darkMode = false, size, icons }) => {
  const { search, searchSort } = useSearchContext()
  const [copied, copyToClipboard] = useCopyToClipboard()
  const iconSize = parseInt(size, 10)

  const altBackground = '#234'

  return (
    <div style={wrapperStyle(darkMode, altBackground, background)}>
      <style>{placeholderStyle(darkMode)}</style>
      <SearchInput style={searchStyle(darkMode)} />
      <div style={gridStyle(iconSize, 196)}>
        {Object.entries(icons[size])
          .sort(searchSort)
          .map(([name, Icon]) => {
            const match = name.toLowerCase().includes(search.toLowerCase())
            const fullName = `Illustrative${size}${name}`
            return (
              <div
                key={name}
                className="cell"
                style={cellStyle(darkMode, altBackground, background, match)}
                onClick={copyToClipboard}
                data-copy={fullName}
              >
                <Icon width={size} height={size} />
                <p style={textStyle}>
                  <span style={prefixStyle(darkMode)}>Illustrative{size}</span>
                  {name}
                </p>
                <div
                  className="copied"
                  style={copyNotificationStyle(darkMode, altBackground, background, copied === fullName)}
                >
                  Copied to clipboard
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({})
Default.args = {
  icons: {
    '80px': Illustrative80px,
    '120px': Illustrative120px,
  },
  size: '80px',
  darkMode: window.matchMedia?.('(prefers-color-scheme: dark)').matches,
  background: '#fff',
}
