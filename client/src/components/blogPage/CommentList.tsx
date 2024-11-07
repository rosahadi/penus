import { useQuery } from '@tanstack/react-query';
import CommentItem from './CommentItem';
import { getAllComments } from '@/api/comment';
import { CommentDocument } from '@/types';

function CommentList({ blogId }: { blogId: string | undefined }) {
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

  if (getAllCommentsQuery.isLoading) return <p>Loading comments...</p>;
  if (getAllCommentsQuery.error) return <p>Error loading comments</p>;

  return (
    <div className="mt-20">
      {getAllCommentsQuery.data.map((comment: CommentDocument) => (
        <CommentItem
          key={comment.id}
          avatar={comment?.user?.image}
          name={comment.user.name}
          date={new Date(comment.createdAt).toLocaleDateString()}
          comment={comment?.comment}
        />
      ))}
    </div>
  );
}

export default CommentList;
