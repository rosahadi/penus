import { Input } from '@/components/ui/input';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { buttonStyles } from '@/utils/buttonStyles';
import { Button } from '../Button';
import { useMutation } from '@tanstack/react-query';
import { updateCurrentPassword } from '@/api/user';
import { useForm } from 'react-hook-form';
import { UpdatePasswordFormData, UpdatePasswordFormError } from '@/types';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { useState } from 'react';

export function PasswordModal() {
  const [errors, setErrors] = useState<UpdatePasswordFormError | null>(null);

  const form = useForm({
    defaultValues: {
      passwordCurrent: '',
      password: '',
      passwordConfirm: '',
    },
  });

  const mutatePassword = useMutation({
    mutationFn: updateCurrentPassword,
    onSuccess: () => {
      form.reset();
    },
    onError: (error: UpdatePasswordFormError) => {
      setErrors(error);
    },
  });

  const onSubmit = (data: UpdatePasswordFormData) => {
    mutatePassword.mutate({
      passwordCurrent: data.passwordCurrent,
      password: data.password,
      passwordConfirm: data.passwordConfirm,
    });
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Change Password</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            name="passwordCurrent"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter current password"
                    {...field}
                  />
                </FormControl>
                {errors?.passwordCurrent && (
                  <FormMessage>{errors.passwordCurrent}</FormMessage>
                )}
              </FormItem>
            )}
          />

          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter new password"
                    {...field}
                  />
                </FormControl>
                {errors?.password && (
                  <FormMessage>{errors.password}</FormMessage>
                )}
              </FormItem>
            )}
          />

          <FormField
            name="passwordConfirm"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm New Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm new password"
                    {...field}
                  />
                </FormControl>
                {errors?.passwordConfirm && (
                  <FormMessage>{errors.passwordConfirm}</FormMessage>
                )}
              </FormItem>
            )}
          />

          {form.formState.errors.root && (
            <p className="text-error">{form.formState.errors.root.message}</p>
          )}

          <Button
            className={buttonStyles(
              'btn-solid',
              'btn-w-full',
              'btn-px-lg',
              'btn-py-md',
              'btn-rounded-md'
            )}
            type="submit"
            disabled={mutatePassword.isPending}
          >
            {mutatePassword.isPending ? 'Changing...' : 'Change Password'}
          </Button>
        </form>
      </Form>
    </DialogContent>
  );
}
