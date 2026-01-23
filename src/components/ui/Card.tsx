import { cn } from '@/lib/utils'
import { HTMLAttributes, forwardRef } from 'react'

/* ---------------------------------- CARD --------------------------------- */

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'bg-white rounded-2xl border border-slate-200 shadow-sm',
          hover &&
            'transition-all duration-200 hover:shadow-md hover:-translate-y-0.5',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

/* -------------------------------- HEADER -------------------------------- */

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'px-6 sm:px-8 pt-6 pb-4 border-b border-slate-100',
        className
      )}
      {...props}
    />
  )
)

CardHeader.displayName = 'CardHeader'

/* -------------------------------- TITLE --------------------------------- */

const CardTitle = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('text-lg font-semibold text-slate-900', className)}
    {...props}
  />
))

CardTitle.displayName = 'CardTitle'

/* ------------------------------ DESCRIPTION ------------------------------ */

const CardDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('mt-1 text-sm text-slate-500', className)}
    {...props}
  />
))

CardDescription.displayName = 'CardDescription'

/* -------------------------------- CONTENT -------------------------------- */

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('px-6 sm:px-8 py-6', className)}
      {...props}
    />
  )
)

CardContent.displayName = 'CardContent'

/* -------------------------------- FOOTER -------------------------------- */

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'px-6 sm:px-8 pb-6 pt-4 border-t border-slate-100 flex items-center justify-end gap-3',
        className
      )}
      {...props}
    />
  )
)

CardFooter.displayName = 'CardFooter'

/* -------------------------------- EXPORT -------------------------------- */

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
}
