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
import { CommentFormDataType } from '@/types';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import { useComments } from '@/hooks/useComments';

function Comment({ blogId }: { blogId: string | undefined }) {
  const queryClient = useQueryClient();

  const { data: comments, isLoading, error } = useComments(blogId);

  const createCommentMutation = useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comment', blogId] });
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
            className={`${btnVariants['btn-ghost']} flex items-center gap-1`}
          >
            <FaRegComment className="w-8 h-8" />
            <span className="ml-1">{comments?.length || 0}</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="overflow-y-auto p-0 h-full max-w-[50rem] w-full max-[630px]:max-w-full bg-bgMain flex flex-col"
        >
          <div className="p-12 pb-6 ">
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
            <CommentForm
              onSubmit={onSubmit}
              isPending={createCommentMutation.isPending}
              textAreaHeight="h-32"
            />
          </div>
          <div className="flex-1 px-12 pb-12">
            <CommentList
              blogId={blogId}
              comments={comments || []}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default Comment;
