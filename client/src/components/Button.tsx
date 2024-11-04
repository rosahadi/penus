import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';

// Base button styles
const btnBase =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all disabled:pointer-events-none disabled:opacity-50';

// Variant classes
const btnVariants = {
  // Button types
  'btn-solid':
    'bg-textPrimary text-white hover:bg-textSecondary shadow-shadowMedium',
  'btn-primary':
    'bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)]',
  'btn-ghost': '',
  'btn-outline': 'border border-gray-200 hover:bg-gray-50',
  'btn-link': 'underline-offset-4 hover:underline',

  // Sizes
  'btn-sm': 'text-sm',
  'btn-md': 'text-base',
  'btn-lg': 'text-lg',
  'btn-xl': 'text-xl',
  'btn-2xl': 'text-2xl',
  'btn-1.7': 'text-[1.7rem]',

  // Padding X
  'btn-px-none': 'px-0',
  'btn-px-sm': 'px-2',
  'btn-px-md': 'px-4',
  'btn-px-lg': 'px-6',
  'btn-px-xl': 'px-8',

  // Padding Y
  'btn-py-none': 'py-0',
  'btn-py-sm': 'py-1',
  'btn-py-md': 'py-2',
  'btn-py-lg': 'py-3',
  'btn-py-xl': 'py-4',

  // Font weights
  'btn-normal': 'font-normal',
  'btn-medium': 'font-medium',
  'btn-semibold': 'font-semibold',
  'btn-bold': 'font-bold',

  // Rounded
  'btn-rounded-none': 'rounded-none',
  'btn-rounded-sm': 'rounded-sm',
  'btn-rounded-md': 'rounded-md',
  'btn-rounded-lg': 'rounded-lg',
  'btn-rounded-xl': 'rounded-xl',
  'btn-rounded-full': 'rounded-full',

  // Width
  'btn-w-auto': 'w-auto',
  'btn-w-full': 'w-full',

  // hidden
  'hidden-660': 'max-[660px]:hidden',
  'hidden-510': 'max-[510px]:hidden',
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    return <Comp className={cn(btnBase, className)} ref={ref} {...props} />;
  }
);

Button.displayName = 'Button';

export { Button, btnVariants };
