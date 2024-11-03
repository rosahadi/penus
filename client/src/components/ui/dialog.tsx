import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed grid place-items-center overflow-y-auto inset-0 z-50 bg-overlayDark data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      '[&::-webkit-scrollbar]:w-[8px] md:[&::-webkit-scrollbar]:w-[12px]',
      '[&::-webkit-scrollbar-track]:bg-primary',
      '[&::-webkit-scrollbar-thumb]:bg-primaryDark',
      '[&::-webkit-scrollbar-thumb]:rounded-full',
      '[&::-webkit-scrollbar-thumb]:border-2',
      '[&::-webkit-scrollbar-thumb]:border-solid',
      '[&::-webkit-scrollbar-thumb]:border-transparent',
      'scrollbar-thin scrollbar-track-transparent scrollbar-thumb-primaryDark',
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay>
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          'relative z-50 grid bg-bgMain text-center',
          'p-20 max-[730px]:p-16 max-[650px]:p-14 max-[900px]:p-20',
          'shadow-[0_4px_12px_var(--shadow-medium)]',
          'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          'max-[730px]:rounded-none rounded-md',
          // Responsive styles
          'max-[730px]:w-full max-[730px]:h-full',
          'max-[900px]:w-[600px] max-[900px]:h-full',
          'min-[900px]:w-[680px] min-[900px]:h-[700px]',
          className
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="absolute right-8 top-8 text-textPrimary  hover:text-textSecondary transition-opacity">
          <Cross2Icon className="h-[29px] w-[29px] " />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogOverlay>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex flex-col justify-end mb-16', className)}
    {...props}
  />
);
DialogHeader.displayName = 'DialogHeader';

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn(className)} {...props} />
);
DialogFooter.displayName = 'DialogFooter';

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      'font-times text-5xl font-semibold leading-none tracking-tight text-textPrimary',
      className
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-textSecondary mt-2 ', className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
