import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NavLinks from './NavLinks';
import { useAuth } from '@/context/AuthContext';
import NavAuth from './NavAuth';

function Nav() {
  const { isAuthenticated } = useAuth();

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

          {isAuthenticated ? <NavAuth /> : <NavLinks />}
        </div>
      </nav>
    </>
  );
}

export default Nav;
