import { btnVariants } from '@/components/Button';
import { cn } from '@/lib/utils';

export function buttonStyles(...classNames: (keyof typeof btnVariants)[]) {
  return cn(...classNames.map((className) => btnVariants[className]));
}
