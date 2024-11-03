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
import { useState } from 'react';
import ForgotPasswordForm from './ForgotPasswordForm';
import { CloseDialogType } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { signin } from '@/api/auth';
import { SignInError, SignInFormData } from '@/types/auth';

function SignInForm({ closeDialog }: CloseDialogType) {
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [errors, setErrors] = useState<SignInError | null>(null);

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const mutation = useMutation({
    mutationFn: signin,
    onSuccess: () => {
      closeDialog();
    },
    onError: (error: SignInError) => {
      console.log(error);
      setErrors(error);
    },
  });

  const onSubmit = (data: SignInFormData) => {
    mutation.mutate(data);
  };

  const handleForgotPassword = () => {
    setForgotPasswordOpen(false);
  };

  if (forgotPasswordOpen) {
    return <ForgotPasswordForm onSubmit={handleForgotPassword} />;
  }

  return (
    <Form {...form}>
      <div className="w-full flex justify-center">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-center
        min-[900px]:max-w-[40rem] 
        space-y-12 w-full"
        >
          <div className="text-start">
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
                <FormItem className="mt-8 mb-2">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Enter your password"
                    />
                  </FormControl>
                  {errors?.general && (
                    <FormMessage className="pt-4">{errors.general}</FormMessage>
                  )}
                </FormItem>
              )}
            />
            {/* Forgot Password Button */}
            <button
              type="button"
              className="text-xl text-textTertiary pt-0 m0"
              onClick={() => setForgotPasswordOpen(true)}
            >
              Forgot Password?
            </button>
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
            disabled={mutation.isPending}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Form>
  );
}

export default SignInForm;
