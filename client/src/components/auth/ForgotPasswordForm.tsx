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
import { useMutation } from '@tanstack/react-query';
import { forgotPassword } from '@/api/auth';
import { useState } from 'react';

function ForgotPasswordForm({
  onSubmit,
  closeDialog,
}: {
  onSubmit: () => void;
  closeDialog: () => void;
}) {
  const forgotPasswordForm = useForm({
    defaultValues: {
      email: '',
    },
  });

  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      // Display a success message or close dialog on success
      setSuccessMessage('Check your email for reset instructions.');
      setError(null);
      setTimeout(() => {
        closeDialog();
        onSubmit(); // Call onSubmit to handle further actions if needed
      }, 2000); // Close after 2 seconds to give time to read message
    },
    onError: (error: string) => {
      setError(error);
    },
  });

  const handleSubmit = (data: { email: string }) => {
    mutation.mutate(data);
  };

  return (
    <Form {...forgotPasswordForm}>
      <div className="w-full flex justify-center">
        <form
          onSubmit={forgotPasswordForm.handleSubmit(handleSubmit)}
          className="flex flex-col justify-center
        min-[900px]:max-w-[40rem] 
        space-y-12 w-full"
        >
          <div className="text-start">
            <FormField
              control={forgotPasswordForm.control}
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
                  {error && (
                    <FormMessage className="text-warning">{error}</FormMessage>
                  )}
                  {successMessage && (
                    <FormMessage className="text-success">
                      {successMessage}
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
            Send email
          </Button>
        </form>
      </div>
    </Form>
  );
}

export default ForgotPasswordForm;
