import { Link } from 'react-router-dom';
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
import { useEffect, useState } from 'react';
import GetStartedForm from '../auth/GetStartedForm';
import SignInForm from '../auth/SignInForm';
import WriteForm from '../auth/WriteForm';

function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDialog, setOpenDialog] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className="h-[86.2px]" />
      <nav
        className={`fixed top-0 left-0 right-0 w-full bg-[var(--bg-main)] transition-shadow duration-200 z-50 ${
          isScrolled ? 'shadow-lg shadow-[var(--shadow-light)]' : ''
        }`}
      >
        <div className="max-w-[1200px] w-[90%] mx-auto flex justify-between items-center py-7">
          <Link to="/" className="font-times font-bold text-[3.2rem]">
            Pênûs
          </Link>
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
                    'btn-px-none'
                  )}
                >
                  Write
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create an account to start writing</DialogTitle>
                </DialogHeader>
                <WriteForm />
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
                    'btn-py-md'
                  )}
                >
                  Sign In
                </Button>
              </DialogTrigger>
              <DialogContent className="mb-0">
                <DialogHeader>
                  <DialogTitle>Welcome back</DialogTitle>
                </DialogHeader>
                <SignInForm />
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
                <GetStartedForm />
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
        </div>
      </nav>
    </>
  );
}

export default Nav;
