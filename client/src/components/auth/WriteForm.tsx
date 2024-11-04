import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../Button';
import { buttonStyles } from '@/utils/buttonStyles';
import { CloseDialogType } from '@/types';
import { useState } from 'react';
import { SignupError, SignupFormData } from '@/types/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signup } from '@/api/auth';

function WriteForm({ closeDialog }: CloseDialogType) {
  const queryClient = useQueryClient();

  const [errors, setErrors] = useState<SignupError | null>(null);

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
  });

  const mutation = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authAndUser'] });
      setErrors(null);
      closeDialog();
    },
    onError: (error: SignupError) => {
      setErrors(error);
    },
  });

  const onSubmit = (data: SignupFormData) => {
    mutation.mutate(data);
  };

  return (
    <Form {...form}>
      <div className="w-full flex justify-center">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-center
        min-[900px]:max-w-[40rem] 
        space-y-12 w-full"
        >
          <div className="space-y-8 text-start">
            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter your name" />
                  </FormControl>
                  {errors?.name && <FormMessage>{errors.name}</FormMessage>}
                </FormItem>
              )}
            />

            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Enter your email"
                    />
                  </FormControl>
                  {errors?.email && <FormMessage>{errors.email}</FormMessage>}
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Enter your password"
                    />
                  </FormControl>
                  {errors?.password && (
                    <FormMessage>{errors.password}</FormMessage>
                  )}
                </FormItem>
              )}
            />

            {/* Confirm Password Field */}
            <FormField
              control={form.control}
              name="passwordConfirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Re-enter your password"
                    />
                  </FormControl>
                  {errors?.passwordConfirm && (
                    <FormMessage>{errors.passwordConfirm}</FormMessage>
                  )}
                </FormItem>
              )}
            />
          </div>

          {/* Submit Button */}
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
            Register
          </Button>
        </form>
      </div>
    </Form>
  );
}

export default WriteForm;
