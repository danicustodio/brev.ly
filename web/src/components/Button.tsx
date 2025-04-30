import { forwardRef } from 'react'
import type { FC, ButtonHTMLAttributes, ReactNode } from 'react'
import { tv } from 'tailwind-variants'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  children: ReactNode
}

const buttonVariants = tv({
  base: 'brevly-text-md inline-flex items-center justify-center rounded-lg px-4 py-3 cursor-pointer transition-colors',
  variants: {
    variant: {
      primary:
        'bg-[var(--color-blue-base)] text-[var(--color-white)] hover:bg-[var(--color-blue-dark)] disabled:bg-[var(--color-gray-200)] disabled:text-[var(--color-gray-400)]',
      secondary:
        'bg-[var(--color-gray-100)] text-[var(--color-gray-600)] hover:bg-[var(--color-gray-200)] disabled:bg-[var(--color-gray-200)] disabled:text-[var(--color-gray-400)] border border-transparent hover:border-[var(--color-blue-base)] disabled:border-[var(--color-gray-200)]',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
})

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', children, ...props }, ref) => (
    <button ref={ref} className={buttonVariants({ variant })} {...props}>
      {children}
    </button>
  )
)

export interface ButtonIconProps extends ButtonProps {
  icon: ReactNode
}

export const ButtonIcon: FC<ButtonIconProps> = ({
  icon,
  children,
  ...props
}) => (
  <Button {...props}>
    <span className="mr-2 flex-shrink-0">{icon}</span>
    <span>{children}</span>
  </Button>
)
