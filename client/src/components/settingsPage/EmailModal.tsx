import { Input } from '@/components/ui/input';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { buttonStyles } from '@/utils/buttonStyles';
import { Button } from '../Button';

export function EmailModal() {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Change Email</DialogTitle>
      </DialogHeader>
      <form className="space-y-8">
        <Input
          type="email"
          placeholder="email"
          className="bg-inputBg border-inputBorder focus:border-inputFocus"
        />
        <Button
          className={buttonStyles(
            'btn-solid',
            'btn-w-full',
            'btn-px-lg',
            'btn-py-md',
            'btn-rounded-md'
          )}
          type="submit"
        >
          Change Email
        </Button>
      </form>
    </DialogContent>
  );
}
