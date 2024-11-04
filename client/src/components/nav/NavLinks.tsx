import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Button } from '../Button';
import { buttonStyles } from '@/utils/buttonStyles';
import { useState } from 'react';
import GetStartedForm from '../auth/GetStartedForm';
import SignInForm from '../auth/SignInForm';
import WriteForm from '../auth/WriteForm';

function NavLinks() {
  const [openDialog, setOpenDialog] = useState<string>('');

  const closeDialog = () => setOpenDialog('');

  return (
    <div className="flex gap-9">
      {/* Write Dialog */}
      <Dialog
        open={openDialog === 'write'}
        onOpenChange={(open) => setOpenDialog(open ? 'write' : '')}
      >
        <DialogTrigger asChild>
          <Button
            className={buttonStyles(
              'btn-ghost',
              'btn-1.7',
              'btn-px-lg',
              'btn-py-md',
              'btn-px-none',
              'hidden-660'
            )}
          >
            Write
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create an account to start writing</DialogTitle>
          </DialogHeader>
          <WriteForm closeDialog={closeDialog} />
          <DialogFooter className="mt-8">
            <p className="text-2xl">
              Already have an account?
              <button
                className="ml-2 text-info underline"
                onClick={() => setOpenDialog('signIn')}
              >
                Sign in
              </button>
            </p>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Sign In Dialog */}
      <Dialog
        open={openDialog === 'signIn'}
        onOpenChange={(open) => setOpenDialog(open ? 'signIn' : '')}
      >
        <DialogTrigger asChild>
          <Button
            className={buttonStyles(
              'btn-ghost',
              'btn-1.7',
              'btn-px-lg',
              'btn-py-md',
              'hidden-510'
            )}
          >
            Sign In
          </Button>
        </DialogTrigger>
        <DialogContent className="mb-0">
          <DialogHeader>
            <DialogTitle>Welcome back</DialogTitle>
          </DialogHeader>
          <SignInForm closeDialog={closeDialog} />
          <DialogFooter>
            <p className="text-2xl">
              No account?
              <button
                className="ml-2 text-info underline"
                onClick={() => setOpenDialog('getStarted')}
              >
                Create one
              </button>
            </p>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Get Started Dialog */}
      <Dialog
        open={openDialog === 'getStarted'}
        onOpenChange={(open) => setOpenDialog(open ? 'getStarted' : '')}
      >
        <DialogTrigger asChild>
          <Button
            className={buttonStyles(
              'btn-solid',
              'btn-1.7',
              'btn-px-lg',
              'btn-py-md',
              'btn-rounded-md'
            )}
          >
            Get Started
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Join Pênûs</DialogTitle>
          </DialogHeader>
          <GetStartedForm closeDialog={closeDialog} />
          <DialogFooter className="mt-8">
            <p className="text-2xl">
              Already have an account?
              <button
                className="ml-2 text-info underline"
                onClick={() => setOpenDialog('signIn')}
              >
                Sign in
              </button>
            </p>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default NavLinks;
