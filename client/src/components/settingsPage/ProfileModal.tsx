import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { updateNameAndImage } from '@/api/user';
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from '@/components/ui/form';

// Validation schema
const ProfileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  image: z.null(),
});

type ProfileFormValues = z.infer<typeof ProfileSchema>;

export function ProfileModal() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useUser();

  const queryClient = useQueryClient();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [userImage, setUserImage] = useState<File | null>(null);
  const [error, setError] = useState('');

  const { mutate, isPending } = useMutation({
    mutationFn: updateNameAndImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authAndUser'] });
    },
    onError: (error: string) => {
      setError(error || 'An unexpected error occurred');
    },
  });

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: user?.name || '',
      image: null,
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

  const onSubmit = (data: ProfileFormValues) => {
    const formData = new FormData();
    formData.append('name', data.name);
    if (userImage) formData.append('image', userImage);

    mutate(formData);
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Profile</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex items-center space-x-4">
            <Avatar className="h-24 w-24 mr-5">
              <AvatarImage src={previewImage || user?.image || profileImage} />
            </Avatar>

            <div className="flex justify-center items-center gap-6">
              <div>
                <Input
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
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="text" placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage className="text-error mt-1" />
              </FormItem>
            )}
          />

          {error && <p className="text-2xl text-error mt-2">{error}</p>}

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
      </Form>
    </DialogContent>
  );
}

export default ProfileModal;
