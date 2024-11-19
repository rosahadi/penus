import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { EmailModal } from '@/components/settingsPage/EmailModal';
import { ProfileModal } from '@/components/settingsPage/ProfileModal';
import { PasswordModal } from '@/components/settingsPage/PasswordModal';
import { DeleteAccountButton } from '@/components/settingsPage/DeleteAccountButton';
import profileImage from '@/assets/profile.jpg';

export default function Profile() {
  return (
    <div className="max-w-[50rem] mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-8 text-[var(--text-primary)]">
        Profile Settings
      </h1>

      <div className="bg-[var(--bg-card)] rounded-lg shadow-sm border border-[var(--border-light)]">
        {/* Email Section */}
        <Dialog>
          <DialogTrigger asChild>
            <div className="p-6 hover:bg-[var(--overlay-light)] cursor-pointer transition-colors border-b border-[var(--border-light)]">
              <div className="flex items-center justify-between">
                <span className="text-[var(--text-tertiary)]">
                  Email address
                </span>
                <span className="text-[var(--text-primary)]">
                  rosa@gmail.com
                </span>
              </div>
            </div>
          </DialogTrigger>
          <EmailModal />
        </Dialog>

        {/* Profile Section */}
        <Dialog>
          <DialogTrigger asChild>
            <div className="p-6 hover:bg-[var(--overlay-light)] cursor-pointer transition-colors border-b border-[var(--border-light)]">
              <div className="flex items-center justify-between">
                <span className="text-[var(--text-tertiary)]">
                  Profile information
                </span>
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={profileImage} />
                  </Avatar>
                  <span className="text-[var(--text-primary)]">rosa</span>
                </div>
              </div>
            </div>
          </DialogTrigger>
          <ProfileModal />
        </Dialog>

        {/* Password Section */}
        <Dialog>
          <DialogTrigger asChild>
            <div className="p-6 hover:bg-[var(--overlay-light)] cursor-pointer transition-colors border-b border-[var(--border-light)]">
              <span className="text-[var(--text-tertiary)]">
                Change Password
              </span>
            </div>
          </DialogTrigger>
          <PasswordModal />
        </Dialog>

        {/* Delete Account Section */}
        <div className="p-6 mt-4 border-t border solid border-[var(--border-medium)] bg-[var(--overlay-light)]">
          <DeleteAccountButton />
        </div>
      </div>
    </div>
  );
}
