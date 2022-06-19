import React from 'react'

import type { Meta, Story } from '@storybook/react'

import * as Mono from '../src/icons/mono'
import * as UtilityFill from '../src/icons/utility/fill'
import * as UtilityOutline from '../src/icons/utility/outline'
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
  title: 'Icons',
  component: Mono.AddUser,
  argTypes: {
    size: {
      control: { type: 'range', min: 8, max: 160, step: 4 },
      defaultValue: 80,
    },
    darkMode: {
      control: 'boolean',
      defaultValue: window.matchMedia?.('(prefers-color-scheme: dark)').matches,
    },
    color: {
      control: 'color',
      defaultValue: '#234',
    },
    background: {
      control: 'color',
      defaultValue: '#fff',
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

export type IconSet = Record<string, React.FC<React.SVGProps<SVGSVGElement>>>

const addPrefix = (icons: IconSet, prefix: string = '') =>
  Object.fromEntries(Object.entries(icons).map(([key, value]) => [`${prefix}:${key}`, value]))

interface StoryProps {
  color: string
  background: string
  darkMode: boolean
  size: number
  icons: IconSet
}

const Template: Story<StoryProps> = ({ color, background, darkMode = false, size, icons }) => {
  const { search, searchSort } = useSearchContext()
  const [copied, copyToClipboard] = useCopyToClipboard()

  const iconSize = Math.min(Math.max(size, 8), 160)

  return (
    <div style={wrapperStyle(darkMode, color, background)}>
      <style>{placeholderStyle(darkMode)}</style>
      <SearchInput style={searchStyle(darkMode)} />
      <div style={gridStyle(iconSize, 160)}>
        {Object.entries(icons)
          .sort(searchSort)
          .map(([prefixedName, Icon]) => {
            const [prefix, name] = prefixedName.split(':')
            const fullName = `${prefix}${name}`
            const match = fullName.toLowerCase().includes(search.toLowerCase())
            return (
              <div
                key={fullName}
                style={cellStyle(darkMode, color, background, match)}
                onClick={copyToClipboard}
                data-copy={fullName}
              >
                <Icon width={iconSize} height={iconSize} />
                <p style={textStyle}>
                  <span style={prefixStyle(darkMode)}>{prefix}</span>
                  {name}
                </p>
                <div className="copied" style={copyNotificationStyle(darkMode, color, background, copied === fullName)}>
                  Icon name copied
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
    ...addPrefix(Mono),
    ...addPrefix(UtilityFill, 'UtilityFill'),
    ...addPrefix(UtilityOutline, 'UtilityOutline'),
  },
}

export const MonoIcons = Template.bind({})
MonoIcons.args = { icons: addPrefix(Mono) }

export const UtilityFillIcons = Template.bind({})
UtilityFillIcons.args = {
  icons: addPrefix(UtilityFill, 'UtilityFill'),
}

export const UtilityOutlineIcons = Template.bind({})
UtilityOutlineIcons.args = {
  icons: addPrefix(UtilityOutline, 'UtilityOutline'),
}
