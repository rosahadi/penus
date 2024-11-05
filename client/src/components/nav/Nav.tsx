import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import NavLinks from './NavLinks';
import { useAuth } from '@/context/AuthContext';
import NavAuth from './NavAuth';
import SearchInput from './SearchInput';

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
      <div className="h-[86.2px] max-[730px]:h-[80.16px] max-[600px]:h-[75.84px]" />
      <nav
        className={`fixed top-0 left-0 right-0 w-full bg-[var(--bg-main)] transition-shadow duration-200 z-50 pl-[6px] ${
          isScrolled ? 'shadow-lg shadow-[var(--shadow-light)]' : ''
        }`}
      >
        <div className="max-w-[1200px] w-[90%] mx-auto flex justify-between items-center py-7">
          <div className="flex items-center gap-8 flex-1">
            <Link
              to="/"
              className="font-times font-bold text-[3.2rem] whitespace-nowrap"
            >
              Pênûs
            </Link>

            {/* Search input for larger screens */}
            <div className="hidden min-[600px]:block flex-1 max-w-xl">
              <SearchInput />
            </div>
          </div>

          <div className="flex items-center gap-10">
            {/* Search link for mobile screens */}
            <Link
              to="/search"
              className="min-[600px]:hidden p-2 hover:bg-gray-100 rounded-full"
            >
              <Search className="w-[2.35rem] h-[2.35rem] text-textSecondary hover:text-textTertiary" />
            </Link>

            {isAuthenticated ? <NavAuth /> : <NavLinks />}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Nav;
