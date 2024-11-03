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

function ForgotPasswordForm({ onSubmit }: { onSubmit: () => void }) {
  const forgotPasswordForm = useForm({
    defaultValues: {
      email: '',
    },
  });
  return (
    <Form {...forgotPasswordForm}>
      <div className="w-full flex justify-center">
        <form
          onSubmit={forgotPasswordForm.handleSubmit(onSubmit)}
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
                  <FormMessage />
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
          >
            Send email
          </Button>
        </form>
      </div>
    </Form>
  );
}

export default ForgotPasswordForm;
