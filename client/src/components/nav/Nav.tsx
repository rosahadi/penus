import { Link } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Button } from '../Button';
import { buttonStyles } from '@/utils/buttonStyles';
import { useEffect, useState } from 'react';

function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);

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
            <Dialog>
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
                  <DialogTitle>Write</DialogTitle>
                </DialogHeader>
                <div className="p-4">
                  <p>write</p>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog>
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
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Sign In</DialogTitle>
                </DialogHeader>
                <div className="p-4">
                  <p>Sign in</p>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog>
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
                  <DialogTitle>Get Started</DialogTitle>
                </DialogHeader>
                <div className="p-4">
                  <p>Get started</p>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Nav;
