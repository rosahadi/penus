import { useForm } from 'react-hook-form';
import { buttonStyles } from '@/utils/buttonStyles';
import { useMutation } from '@tanstack/react-query';
import { resetPassword } from '@/api/auth';
import { useState } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/Button';
import { ResetPasswordError, ResetPasswordFormData } from '@/types/auth';
import { useParams } from 'react-router';

function ResetPassword() {
  const { token } = useParams();
  const resetPasswordFormData = useForm({
    defaultValues: {
      password: '',
      passwordConfirm: '',
    },
  });

  const [errors, setErrors] = useState<ResetPasswordError | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      setSuccessMessage('Your password has been reset successfully.');
      setErrors(null);
    },
    onError: (error: ResetPasswordError) => {
      setErrors(error);
    },
  });

  const handleSubmit = (formData: ResetPasswordFormData) => {
    mutation.mutate({ token, formData });
  };

  return (
    <div className="bg-bgMain my-auto rounded-md  mt-auto">
      <div className="w-full max-w-[60rem]  shadow-lg shadow-shadowLight  mx-auto mt-12 min-[730px]:mt-40">
        <div className="flex flex-col gap-10 bg-bgCard p-14 md:p-28 rounded-md shadow-shadowMedium">
          <div className="text-center">
            <h1 className="text-4xl font-semibold text-textPrimary">
              Reset Password
            </h1>
          </div>
          <Form {...resetPasswordFormData}>
            <div className="w-full flex justify-center">
              <form
                onSubmit={resetPasswordFormData.handleSubmit(handleSubmit)}
                className="flex flex-col justify-center
        min-[700px]:max-w-[40rem] 
        space-y-12 w-full"
              >
                <div className="text-start space-y-8">
                  <FormField
                    control={resetPasswordFormData.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            placeholder="Password"
                          />
                        </FormControl>
                        {errors?.password && (
                          <FormMessage>{errors.password}</FormMessage>
                        )}
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={resetPasswordFormData.control}
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
                        {successMessage && (
                          <FormMessage className="text-success text-2xl pt-4">
                            {successMessage}
                          </FormMessage>
                        )}
                        {errors?.token && (
                          <FormMessage className="pt-4">
                            {errors.token}
                          </FormMessage>
                        )}
                      </FormItem>
                    )}
                  />
                </div>

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
                  Reset Password
                </Button>
              </form>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
