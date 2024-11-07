import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from '@/components/ui/sheet';
import { FaRegComment } from 'react-icons/fa';
import { X } from 'lucide-react';
import { Button, btnVariants } from '@/components/Button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createComment } from '@/api/comment';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { useForm } from 'react-hook-form';
import { CommentFormDataType } from '@/types';
import CommentList from './CommentList';

function Comment({ blogId }: { blogId: string | undefined }) {
  const queryClient = useQueryClient();

  const formData = useForm({
    defaultValues: {
      comment: '',
    },
  });

  const createCommentMutation = useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comment', blogId] });
      formData.reset();
    },
  });

  const onSubmit = (formData: CommentFormDataType) => {
    createCommentMutation.mutate({ blogId, formData });
  };

  return (
    <div className="flex items-center gap-2">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            className={`${btnVariants['btn-ghost']} flex items-center gap-1 `}
          >
            <FaRegComment className="w-8 h-8" />
            <span className="ml-1">1</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className=" p-12 h-full max-w-[50rem] w-full max-[630px]:max-w-full bg-bgMain"
        >
          <div className="flex justify-between items-center mb-4">
            <SheetHeader>
              <SheetTitle className="text-text-primary text-3xl">
                Comments
              </SheetTitle>
            </SheetHeader>

            <SheetClose asChild>
              <Button className={`${btnVariants['btn-ghost']} text-primary`}>
                <X className="h-8 w-8" />
              </Button>
            </SheetClose>
          </div>

          {/* Form containing the textarea and button */}
          <Form {...formData}>
            <form onSubmit={formData.handleSubmit(onSubmit)}>
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
                          className="w-full h-32 p-3 bg-input-bg border border-input-border rounded-md text-text-primary placeholder-input-placeholder resize-none overflow-y-auto focus:outline-none focus:border-input-focus"
                          placeholder="Write a comment..."
                        ></textarea>
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Send button positioned at the bottom-right of the form */}
                <div className="flex justify-end mt-4">
                  <Button
                    type="submit"
                    disabled={createCommentMutation.isPending}
                    className={`${btnVariants['btn-primary']} ${btnVariants['btn-rounded-full']} ${btnVariants['btn-px-md']} ${btnVariants['btn-py-md']} flex items-center gap-1 bg-info shadow-md`}
                  >
                    Send
                  </Button>
                </div>
              </div>
            </form>
          </Form>

          <CommentList blogId={blogId} />
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default Comment;
