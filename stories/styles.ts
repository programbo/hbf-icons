export const wrapperStyle = (
  alt: boolean = false,
  color: string,
  background: string
) =>
  ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    alignItems: 'center',
    width: '100%',
    minHeight: '100vh',
    padding: '2rem 10%',
    boxSizing: 'border-box',
    backgroundColor: alt ? color : background,
  } as React.CSSProperties)

export const gridStyle = (iconSize: number, minWidth: number) =>
  ({
    display: 'grid',
    gridTemplateColumns: `repeat(auto-fill, minmax(${minWidth}px, 1fr))`,
    alignContent: 'start',
    columnGap: iconSize / 4,
    rowGap: '3rem',
    padding: '2rem',
    width: '100%',
    minHeight: '100vh',
  } as React.CSSProperties)

export const cellStyle = (
  alt: boolean = false,
  color: string,
  background: string,
  match: boolean = false
) =>
  ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: 'sans-serif',
    letterSpacing: '0.05rem',
    fontSize: '0.75rem',
    textAlign: 'center',
    color: alt ? background : color,
    transition: 'all 0.4s ease-in-out',
    cursor: 'pointer',

    opacity: match ? 1 : 0.2,
    transform: `scale(${match ? 1 : 0.9})`,
    filter: match
      ? `drop-shadow(0 2px 4px rgba(0, 0, 10, ${alt ? 0.8 : 0.1})) blur(0)`
      : 'blur(2px)',
    pointerEvents: match ? 'auto' : 'none',
  } as React.CSSProperties)

export const textStyle = {
  whiteSpace: 'normal',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  width: '100%',
  fontFamily: '"Helvetica Neue", sans-serif',
  letterSpacing: '0.05rem',
  fontSize: '0.75rem',
  fontWeight: 600,
  userSelect: 'none',
} as React.CSSProperties

export const prefixStyle = (alt: boolean = false) =>
  ({
    opacity: alt ? 0.5 : 0.75,
    fontWeight: 400,
    letterSpacing: '0.07rem',
    marginRight: 1,
  } as React.CSSProperties)

export const copyNotificationStyle = (
  alt: boolean = false,
  color: string,
  background: string,
  copied: boolean
) =>
  ({
    position: 'absolute',
    color: alt ? background : color,
    backgroundColor: `rgba(${alt ? '34, 51, 68' : '255, 255, 255'}, 0.5)`,
    backdropFilter: `blur(6px) brightness(${alt ? '130%' : '90%'})`,
    WebkitBackdropFilter: `blur(6px) brightness(${alt ? '130%' : '90%'})`,
    filter: `drop-shadow(0 5px 10px rgba(0, 0, 10, ${alt ? 0.95 : 0.5}))`,
    borderRadius: '0.25rem',
    padding: '0.5rem',
    fontWeight: alt ? 400 : 600,
    fontSize: '0.75rem',
    transition: 'all 0.2s ease-in-out',
    pointerEvents: 'none',
    zIndex: 1,
    top: '35%',
    transform: `scale(${copied ? 1 : 1.2})`,
    opacity: copied ? 1 : 0,
  } as React.CSSProperties)

export const searchStyle = (alt: boolean = false) =>
  ({
    position: 'sticky',
    top: '0.5rem',
    zIndex: 1,
    width: '100%',
    border: `1px ${alt ? 'none' : 'solid'} #fafafa`,
    padding: '1rem',
    marginBottom: '1rem',
    fontSize: '1.75rem',
    borderRadius: '0.25rem',
    backgroundColor: `rgba(255, 255, 255, ${alt ? 0.5 : 0.85})`,
    backdropFilter: `blur(6px) brightness(${alt ? '130%' : '90%'})`,
    WebkitBackdropFilter: `blur(6px) brightness(${alt ? '130%' : '90%'})`,
    filter: `drop-shadow(0 8px 16px rgba(0, 0, 10, ${alt ? 0.95 : 0.15}))`,
    color: alt ? '#012' : '#234',
    fontWeight: 700,
    fontFamily: '"Helvetica Neue", sans-serif',
    letterSpacing: '0.05rem',
  } as React.CSSProperties)

export const placeholderStyle = (alt: boolean = false) =>
  [
    '::-webkit-input-placeholder',
    '::-moz-placeholder',
    ':-moz-placeholder',
    ':-ms-input-placeholder',
  ]
    .map(
      selector => `${selector} {
      color: #bbc;
      text-shadow: 0 0 3px rgba(0, 0, 0, ${alt ? 0.5 : 0.1});
    }`
    )
    .join('\n')
