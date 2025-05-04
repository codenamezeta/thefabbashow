import { ButtonHTMLAttributes, ReactNode } from 'react'
import Link from 'next/link'
import styles from './Button.module.css'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  href?: string
  isLoading?: boolean
  className?: string
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  href,
  isLoading = false,
  className = '',
  ...props
}: ButtonProps) {
  // Combine classes
  const buttonClasses = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : '',
    isLoading ? styles.loading : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  // If href is provided, return a link that looks like a button
  if (href && !props.disabled) {
    return (
      <Link href={href} className={buttonClasses}>
        {isLoading && <span className={styles.spinner} aria-hidden='true' />}
        <span className={isLoading ? styles.loadingText : ''}>{children}</span>
      </Link>
    )
  }

  // Otherwise return a button
  return (
    <button
      className={buttonClasses}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && <span className={styles.spinner} aria-hidden='true' />}
      <span className={isLoading ? styles.loadingText : ''}>{children}</span>
    </button>
  )
}
