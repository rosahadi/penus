import CommentItem from './CommentItem';
import { CommentDocument } from '@/types';

function CommentList({
  comments,
  isLoading,
  error,
  blogId,
}: {
  comments: CommentDocument[];
  isLoading: boolean;
  error: unknown;
  blogId: string | undefined;
}) {
  if (isLoading) return <p>Loading comments...</p>;
  if (error) return <p>Error loading comments</p>;

  return (
    <div className="mt-20">
      {comments.map((comment: CommentDocument) => (
        <CommentItem
          key={comment.id}
          blogId={blogId}
          commentId={comment.id}
          userEmail={comment.user?.email}
          avatar={comment.user?.image}
          name={comment.user.name}
          date={new Date(comment.createdAt).toLocaleDateString()}
          comment={comment.comment}
        />
      ))}
    </div>
  );
}

export default CommentList;
