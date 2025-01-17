import { Input } from '@/components/ui/input';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { buttonStyles } from '@/utils/buttonStyles';
import { Button } from '../Button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateEmail } from '@/api/user';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';

export function EmailModal() {
  const queryClient = useQueryClient();
  const [error, setError] = useState('');

  const form = useForm({
    defaultValues: {
      email: '',
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: updateEmail,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authAndUser'] });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => {
      setError(err.message);
    },
  });

  const onSubmit = (data: { email: string }) => {
    mutate(data.email);
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Change Email</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your new email"
                    {...field}
                    className="bg-inputBg border-inputBorder focus:border-inputFocus"
                  />
                </FormControl>
                {form.formState.errors.email && (
                  <FormMessage>
                    {form.formState.errors.email.message}
                  </FormMessage>
                )}
              </FormItem>
            )}
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
            {isPending ? 'Changing Email...' : 'Change Email'}
          </Button>
        </form>
      </Form>
    </DialogContent>
  );
}

export default EmailModal;
