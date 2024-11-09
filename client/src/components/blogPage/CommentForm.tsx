import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Button, btnVariants } from '@/components/Button';
import { CommentFormDataType } from '@/types';

interface CommentFormProps {
  onSubmit: (data: CommentFormDataType) => void;
  initialValue?: string;
  isPending?: boolean;
  textAreaHeight?: string;
  submitLabel?: string;
  onCancel?: () => void;
}

const CommentForm = ({
  onSubmit,
  initialValue = '',
  isPending = false,
  textAreaHeight = 'h-32',
  submitLabel = 'Send',
  onCancel,
}: CommentFormProps) => {
  const formData = useForm({
    defaultValues: {
      comment: initialValue,
    },
  });

  const handleSubmit = (data: CommentFormDataType) => {
    onSubmit(data);
    if (!initialValue) {
      formData.reset();
    }
  };

  return (
    <Form {...formData}>
      <form onSubmit={formData.handleSubmit(handleSubmit)}>
        <div className="relative bg-input-bg border border-input-border rounded-md shadow-lg p-4">
          <FormField
            control={formData.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="comment" className="sr-only">
                  Comment
                </FormLabel>
                <FormControl>
                  <textarea
                    id="comment"
                    {...field}
                    className={`w-full ${textAreaHeight} p-3 bg-input-bg border border-input-border rounded-md text-text-primary placeholder-input-placeholder resize-none overflow-y-auto focus:outline-none focus:border-input-focus`}
                    placeholder="Write a comment..."
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-2 mt-4">
            {onCancel && (
              <Button
                type="button"
                onClick={onCancel}
                className={`${btnVariants['btn-primary']} ${btnVariants['btn-rounded-full']} ${btnVariants['btn-px-md']} ${btnVariants['btn-py-md']} flex items-center gap-1 bg-bgSecondary text-textTertiary shadow-md hover:bg-bgTertiary`}
              >
                Cancel
              </Button>
            )}
            <Button
              type="submit"
              disabled={isPending}
              className={`${btnVariants['btn-primary']} ${btnVariants['btn-rounded-full']} ${btnVariants['btn-px-md']} ${btnVariants['btn-py-md']} flex items-center gap-1 bg-info shadow-md hover:bg-blue-300`}
            >
              {submitLabel}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default CommentForm;
