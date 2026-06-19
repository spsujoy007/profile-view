import React from 'react'

const variantStyles = {
  normal: 'border border-transparent bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white',
  bordered: 'border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-750',
  filled: 'border border-gray-900 dark:border-white bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 hover:border-gray-800 dark:hover:border-gray-200',
  ghost: 'border border-transparent bg-transparent text-gray-700 dark:text-gray-300 hover:border-gray-200 dark:hover:border-gray-700 hover:bg-transparent hover:text-gray-900 dark:hover:text-white',
}

const sizeStyles = {
  xs: 'px-5 py-1 text-xs',
  sm: 'px-3 py-2 text-sm',
  md: 'px-5 py-3 text-base',
  lg: 'px-6 py-3.5 text-lg',
}

export default function Button({
  children,
  variant = 'bordered',
  size = 'md',
  className = '',
  fullWidth = false,
  type = 'button',
  disabled = false,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center gap-3 rounded-[20px] font-medium duration-300 transition-colors cursor-pointer'
  const widthStyles = fullWidth ? 'w-full' : ''
  const disabledStyles = disabled ? 'cursor-not-allowed opacity-60 pointer-events-none' : ''
  const variantClassName = variantStyles[variant] ?? variantStyles.bordered
  const sizeClassName = sizeStyles[size] ?? sizeStyles.md

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${baseStyles} ${variantClassName} ${sizeClassName} ${widthStyles} ${disabledStyles} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  )
}
