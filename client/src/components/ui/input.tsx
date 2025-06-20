import * as React from 'react';

import { cn } from '@/lib/utils';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-16 w-full rounded-md border border-solid border-inputBorder ',
          'bg-inputBg px-3 py-1 text-2xl',
          'shadow-shadowLight transition-colors',
          'file:border-0 file:bg-transparent file:text-sm file:font-medium',
          'placeholder:text-inputPlaceholder',
          'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inputFocus',
          'focus:border-inputFocus',
          'disabled:cursor-not-allowed disabled:opacity-50',

          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
