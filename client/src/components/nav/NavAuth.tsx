import * as React from 'react';
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
} from '@/components/ui/menubar';
import { Link } from 'react-router-dom';
import {
  Bell,
  PenSquare,
  User,
  Library,
  BookOpen,
  BarChart2,
  Settings,
} from 'lucide-react';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { useUser } from '@/context/AuthContext';
import profileImage from '@/assets/profile.jpg';

const NavAuth = () => {
  const { user } = useUser();
  const menuRef = React.useRef(null);

  React.useEffect(() => {
    const handleScroll = () => {
      const menu = document.querySelector('[data-state="open"]');
      if (menu) {
        const event = new KeyboardEvent('keydown', { key: 'Escape' });
        menu.dispatchEvent(event);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItemClasses =
    'flex items-center gap-4 px-6 py-4 text-2xl hover:text-textTertiary';

  return (
    <div className="flex items-center gap-12">
      {/* Write Link - Desktop */}
      <Link
        to="/write"
        className="hidden md:flex items-center gap-2 text-textSecondary hover:text-textTertiary transition-colors"
      >
        <PenSquare className="w-[2.35rem] h-[2.35rem]" />
        <span className="text-[1.7rem] pl-1">Write</span>
      </Link>

      {/* Notifications Link */}
      <Link
        to="/notifications"
        className="text-textSecondary hover:text-textTertiary transition-colors relative"
      >
        <Bell className="w-[2.35rem] h-[2.35rem]" />
      </Link>

      {/* User Avatar with Menu */}
      <Menubar
        ref={menuRef}
        className="border-0 bg-transparent p-0 shadow-none"
      >
        <MenubarMenu>
          <MenubarTrigger className="cursor-pointer p-0 focus:bg-transparent hover:bg-transparent data-[state=open]:bg-transparent">
            <Avatar className="w-14 h-14 shadow-md shadow-shadowDark">
              <AvatarImage src={user?.image || profileImage} alt={user?.name} />
            </Avatar>
          </MenubarTrigger>
          <MenubarContent align="end" className="w-[250px] bg-bgCard p-4">
            {/* Mobile Write Link */}
            <MenubarItem className="md:hidden p-0">
              <Link to="/write" className={menuItemClasses}>
                <PenSquare className="w-8 h-8" />
                Write
              </Link>
            </MenubarItem>

            <MenubarItem className="p-0">
              <Link to="/profile" className={menuItemClasses}>
                <User className="w-8 h-8" />
                Profile
              </Link>
            </MenubarItem>

            <MenubarItem className="p-0">
              <Link to="/library" className={menuItemClasses}>
                <Library className="w-8 h-8" />
                Library
              </Link>
            </MenubarItem>

            <MenubarItem className="p-0">
              <Link to="/stories" className={menuItemClasses}>
                <BookOpen className="w-8 h-8" />
                Stories
              </Link>
            </MenubarItem>

            <MenubarItem className="p-0">
              <Link to="/stats" className={menuItemClasses}>
                <BarChart2 className="w-8 h-8" />
                Stats
              </Link>
            </MenubarItem>

            <MenubarItem className="p-0">
              <Link to="/settings" className={menuItemClasses}>
                <Settings className="w-8 h-8" />
                Settings
              </Link>
            </MenubarItem>

            <MenubarItem className="p-0">
              <button
                className={`${menuItemClasses} text-error hover:text-red-600`}
              >
                <svg
                  className="w-8 h-8"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Sign out
              </button>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
};

export default NavAuth;
