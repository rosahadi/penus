import { useRef, useState } from 'react';
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
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useUser } from '@/context/AuthContext';
import { updateMe } from '@/api/user';

export function ProfileModal() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useUser();

  const queryClient = useQueryClient();
  const [name, setName] = useState(user?.name || '');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [userImage, setUserImage] = useState<File | null>(null);
  const [error, setError] = useState('');

  const { mutate, isPending } = useMutation({
    mutationFn: updateMe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authAndUser'] });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => {
      setError(err.message || 'An error occurred.');
    },
  });

  const handleUpdateAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUserImage(file);

      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim()) {
      setError('Name cannot be empty.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    if (userImage) formData.append('image', userImage);

    mutate(formData);
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Profile</DialogTitle>
      </DialogHeader>

      <form className="space-y-8" onSubmit={handleSubmit}>
        <div className="flex items-center space-x-4">
          <Avatar className="h-24 w-24 mr-5">
            <AvatarImage src={previewImage || user?.image || profileImage} />
          </Avatar>

          <div className="flex justify-center items-center gap-6">
            <div>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                id="profile-image"
                onChange={handleImageChange}
              />
              <Button
                className={buttonStyles('btn-ghost') + ' text-info'}
                type="button"
                onClick={handleUpdateAvatarClick}
              >
                Update
              </Button>
            </div>

            <Button
              className={buttonStyles('btn-ghost') + ' text-error'}
              type="button"
              onClick={() => {
                setUserImage(null);
                setPreviewImage(null);
              }}
            >
              Remove
            </Button>
          </div>
        </div>

        <Input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {error && <p className="text-error">{error}</p>}

        <Button
          className={buttonStyles(
            'btn-solid',
            'btn-w-full',
            'btn-px-lg',
            'btn-py-md',
            'btn-rounded-md'
          )}
          type="submit"
          disabled={isPending}
        >
          {isPending ? 'Saving...' : 'Save changes'}
        </Button>
      </form>
    </DialogContent>
  );
}

export default ProfileModal;
