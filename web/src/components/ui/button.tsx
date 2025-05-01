import { tv } from 'tailwind-variants'
import type { ButtonHTMLAttributes, FC, ReactNode } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  icon?: ReactNode
  label?: string
}

const buttonVariants = tv({
  base: 'flex items-center justify-center transition-colors font-semibold disabled:opacity-60 disabled:cursor-not-allowed hover:cursor-pointer',
  variants: {
    variant: {
      primary: [
        'text-white bg-[var(--color-blue-base)]',
        'hover:bg-[var(--color-blue-dark)]',
      ],
      secondary: [
        'text-[var(--color-gray-500)] bg-[var(--color-gray-200)] border border-transparent',
        'hover:border-[var(--color-blue-base)]',
        'disabled:bg-[var(--color-gray-200)] disabled:border-0',
      ],
    },
    size: {
      default: 'py-[0.9375rem] px-4 brevly-text-md rounded-lg',
      icon: 'p-[0.4375rem] brevly-text-sm rounded-sm',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'default',
  },
})

export const Button: FC<ButtonProps> = ({
  variant = 'primary',
  icon,
  className,
  label,
  ...props
}) => {
  const hasIcon = icon
  const size = hasIcon ? 'icon' : 'default'

  return (
    <button className={buttonVariants({ variant, size, className })} {...props}>
      {icon && <span className={label ? 'mr-2' : ''}>{icon}</span>}
      {label && <span>{label}</span>}
    </button>
  )
}
