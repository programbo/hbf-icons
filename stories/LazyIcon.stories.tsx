import React from 'react'
import { Meta, Story } from '@storybook/react'
import { LazyIcon, LazyIconProps } from '../src'
import { IconPath } from '../src/icons/paths'
import { IconType } from '../src/icons/types'
const meta: Meta = {
  title: 'LazyIcon',
  component: LazyIcon,
  argTypes: {
    icon: {
      control: {
        type: 'select',
      },
      description: 'The name of the icon (use `IconType`)',
      options: Object.keys(IconPath),
    },
    darkMode: {
      control: 'boolean',
    },
    color: {
      control: 'color',
    },
    background: {
      control: 'color',
    },
  },
  parameters: {
    controls: { expanded: true },
  },
}

export default meta

interface StoryProps extends LazyIconProps {
  darkMode?: boolean
  background?: string
}

const Template: Story<StoryProps> = ({
  darkMode = false,
  background = '#fff',
  color = '#234',
  ...props
}) => {
  const foregroundColor = darkMode ? background : color
  const backgroundColor = darkMode ? color : background
  const squareSize = '1rem'

  const backgroundStyle: React.CSSProperties = {
    display: 'flex',
    width: '100%',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor,
    backgroundImage: `linear-gradient(45deg, ${foregroundColor} 25%, transparent 25%),
        linear-gradient(135deg, ${foregroundColor} 25%, transparent 25%),
        linear-gradient(45deg, transparent 75%, ${foregroundColor} 75%),
        linear-gradient(135deg, transparent 75%, ${foregroundColor} 75%)`,
    backgroundPosition: `0 0, ${squareSize} 0, ${squareSize} calc(-1 * ${squareSize}), 0 calc(-1 * ${squareSize})`,
    backgroundSize: `calc(2 * ${squareSize}) calc(2 * ${squareSize})`,
  }

  const overlayStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    opacity: 0.95,
    backgroundColor,
    zIndex: 0,
  }

  const canvasStyle: React.CSSProperties = {
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'min(75vw, 75vh)',
    height: 'min(75vw, 75vh)',
    border: `1px dashed ${backgroundColor}`,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '0.25rem',
    backdropFilter: `blur(2px) brightness(${darkMode ? '130%' : '103%'})`,
    WebkitBackdropFilter: `blur(2px) brightness(${darkMode ? '130%' : '103%'})`,
    filter: `drop-shadow(0 6px 12px rgba(0, 0, 10, ${darkMode ? 0.5 : 0.4}))`,
    color: foregroundColor,
    transition: 'color 0.2s ease-out',
  }

  const iconStyle: React.CSSProperties = {}

  return (
    <div style={backgroundStyle}>
      <div style={overlayStyle} />
      <div style={canvasStyle}>
        <LazyIcon style={iconStyle} {...props} />
      </div>
    </div>
  )
}

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({})

Default.args = {
  icon: IconType.RatingExcellent,
  size: '100%',
  darkMode: window.matchMedia?.('(prefers-color-scheme: dark)').matches,
  color: '#234',
  background: '#fff',
}
