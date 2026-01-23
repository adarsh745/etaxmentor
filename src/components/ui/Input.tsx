import { cn } from '@/lib/utils'
import { InputHTMLAttributes, forwardRef } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, type = 'text', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <input
          type={type}
          ref={ref}
          className={cn(
            'w-full px-4 py-2.5 border border-gray-200 rounded-2xl text-sm transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#1E3A8A]',
            'placeholder:text-gray-400',
            error && 'border-red-500 focus:ring-red-500/20 focus:border-red-500',
            props.disabled && 'bg-gray-50 cursor-not-allowed',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-sm text-red-500">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1.5 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }
