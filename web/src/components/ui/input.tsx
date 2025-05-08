import { Warning } from '@phosphor-icons/react'
import { useEffect, useRef, useState } from 'react'
import type { FC, InputHTMLAttributes, ReactNode } from 'react'
import { tv } from 'tailwind-variants'

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  label: string
  error?: string
  prefix?: ReactNode
}

const labelVariants = tv({
  base: 'brevly-text-xs mb-1 block',
  variants: {
    state: {
      default: 'text-[var(--color-gray-500)]',
      active: 'text-[var(--color-blue-base)] font-bold',
      error: 'text-[var(--color-danger)]',
    },
  },
  defaultVariants: {
    state: 'default',
  },
})

const inputVariants = tv({
  base: 'w-full h-12 rounded-lg outline-none bg-transparent text-sm/4.5 placeholder:text-[var(--color-gray-400)] transition-colors',
  variants: {
    state: {
      default:
        'border border-[var(--color-gray-300)] text-[var(--color-gray-400)]',
      active:
        'border border-[var(--color-blue-base)] text-[var(--color-gray-600)]',
      error: 'border border-[var(--color-danger)] text-[var(--color-gray-600)]',
    },
  },
  defaultVariants: {
    state: 'default',
  },
})

export const Input: FC<InputProps> = ({
  label,
  error,
  prefix,
  id,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const [prefixWidth, setPrefixWidth] = useState(0)
  const prefixRef = useRef<HTMLDivElement>(null)
  const hasError = Boolean(error)
  const state = hasError ? 'error' : isFocused ? 'active' : 'default'
  const inputId = id || label.replace(/\s+/g, '-').toLowerCase()

  useEffect(() => {
    if (prefix && prefixRef.current) {
      const width = prefixRef.current.getBoundingClientRect().width
      setPrefixWidth(width)
    }
  }, [prefix])

  return (
    <div>
      <label htmlFor={inputId} className={labelVariants({ state })}>
        {label}
      </label>
      <div className="relative">
        <input
          id={inputId}
          {...props}
          onFocus={e => {
            setIsFocused(true)
            props.onFocus?.(e)
          }}
          onBlur={e => {
            setIsFocused(false)
            props.onBlur?.(e)
          }}
          className={inputVariants({ state })}
          style={
            prefix
              ? { paddingLeft: `calc(${prefixWidth + 2}px)` }
              : { paddingLeft: '1rem' }
          }
        />
        {prefix && (
          <div
            ref={prefixRef}
            className="absolute left-0 top-0 h-12 pl-4 flex items-center pointer-events-none"
          >
            <span className="text-sm text-[var(--color-gray-400)]">
              {prefix}
            </span>
          </div>
        )}
      </div>
      {hasError && (
        <div className="mt-1 flex items-start brevly-text-sm text-[var(--color-gray-500)]">
          <Warning size={16} className="text-[var(--color-danger)] mr-1" />
          <span>{error}</span>
        </div>
      )}
    </div>
  )
}
