import * as React from 'react';
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
} from '@/components/ui/menubar';
import { Link } from 'react-router-dom';
import { Bell, PenSquare } from 'lucide-react';
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

  return (
    <div className="flex items-center gap-12">
      {/* Write Link */}
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
            <Avatar className="w-14 h-14">
              <AvatarImage src={user?.image || profileImage} alt={user?.name} />
            </Avatar>
          </MenubarTrigger>
          <MenubarContent align="end" className="w-48">
            <MenubarItem>
              <Link to="/profile" className="w-full">
                Profile
              </Link>
            </MenubarItem>
            <MenubarItem>
              <Link to="/settings" className="w-full">
                Settings
              </Link>
            </MenubarItem>
            <MenubarItem>
              <button className="w-full text-left text-red-600">
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
