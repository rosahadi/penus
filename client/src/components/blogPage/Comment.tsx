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
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createComment, getAllComments } from '@/api/comment';
import { CommentFormDataType, CommentDocument } from '@/types';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

function Comment({ blogId }: { blogId: string | undefined }) {
  const queryClient = useQueryClient();

  const getAllCommentsQuery = useQuery({
    queryKey: ['comment', blogId],
    queryFn: () => getAllComments(blogId),
    select: (data) => {
      return data.sort(
        (a: CommentDocument, b: CommentDocument) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    },
  });

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
            <span className="ml-1">
              {getAllCommentsQuery.data?.length || 0}
            </span>
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

          <div className="flex-1  px-12 pb-12">
            <CommentList
              blogId={blogId}
              comments={getAllCommentsQuery.data || []}
              isLoading={getAllCommentsQuery.isLoading}
              error={getAllCommentsQuery.error}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default Comment;
