import { Input } from '@/components/ui/input';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { buttonStyles } from '@/utils/buttonStyles';
import { Button } from '../Button';

export function PasswordModal() {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Change Password</DialogTitle>
      </DialogHeader>
      <form className="space-y-8">
        <Input
          type="password"
          placeholder="Current Password"
          className="bg-inputBg border-inputBorder focus:border-inputFocus"
        />

        <Input
          type="password"
          placeholder="New Password"
          className="bg-inputBg border-inputBorder focus:border-inputFocus"
        />

        <Input
          type="password"
          placeholder="Confirm New Password"
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
          Change password
        </Button>
      </form>
    </DialogContent>
  );
}
