import { useRef } from 'react';
import { Input } from '@/components/ui/input';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { buttonStyles } from '@/utils/buttonStyles';
import profileImage from '@/assets/profile.jpg';
import { Button } from '../Button';

export function ProfileModal() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpdateAvatarClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Profile</DialogTitle>
      </DialogHeader>

      <form className="space-y-8">
        <div className="flex items-center space-x-4">
          <Avatar className="h-24 w-24 mr-5">
            <AvatarImage src={profileImage} />
          </Avatar>

          <div className="flex justify-center items-center gap-6">
            <div>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                id="profile-image"
              />
              <Button
                className={buttonStyles('btn-ghost') + 'text-info'}
                type="button"
                onClick={handleUpdateAvatarClick}
              >
                Update
              </Button>
            </div>

            {/* Remove Button */}
            <Button
              className={buttonStyles('btn-ghost') + 'text-error'}
              type="button"
            >
              Remove
            </Button>
          </div>
        </div>

        <Input type="text" placeholder="Your name" />

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
          Save changes
        </Button>
      </form>
    </DialogContent>
  );
}

export default ProfileModal;
