import { useQuery } from '@tanstack/react-query';
import { getAllComments } from '@/api/comment';
import { CommentDocument } from '@/types';

export const useComments = (blogId: string | undefined) => {
  return useQuery({
    queryKey: ['comment', blogId],
    queryFn: () => getAllComments(blogId),
    select: (data) =>
      data.sort(
        (a: CommentDocument, b: CommentDocument) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ),
  });
};
