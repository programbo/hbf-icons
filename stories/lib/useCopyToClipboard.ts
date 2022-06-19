import { useState, useRef } from 'react'

export function useCopyToClipboard() {
  const [copied, setCopied] = useState<string | null>(null)

  const copiedTimeoutRef = useRef<NodeJS.Timeout>()

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget
    const textToCopy = target.dataset.copy as string
    navigator.clipboard.writeText(textToCopy)
    setCopied(textToCopy)

    if (copiedTimeoutRef.current) {
      clearTimeout(copiedTimeoutRef.current)
    }

    copiedTimeoutRef.current = setTimeout(() => {
      setCopied(null)
    }, 2500)
  }

  return [copied, handleClick] as const
}
