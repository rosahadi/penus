import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { createLike, deleteLike } from '@/api/like';
import { CurrentUser } from '@/types/auth';
import useLikes from '@/hooks/useLikes';

const LikeButton = ({ blogId }: { blogId: string | undefined }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [likeId, setLikeId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const currentUserString = localStorage.getItem('currentUser');
  const currentUser: CurrentUser | null = currentUserString
    ? JSON.parse(currentUserString)
    : null;

  // Query to fetch likes
  const { data: likes, isLoading, isSuccess } = useLikes(blogId);

  // Update state when query is successful
  useEffect(() => {
    if (isSuccess && likes) {
      setLikeCount(likes.length);
      const userLike = likes.find(
        (like: { _id: string; user: { email: string } }) =>
          like.user?.email === currentUser?.email
      );
      setIsLiked(!!userLike);
      setLikeId(userLike ? userLike._id : null);
    }
  }, [isSuccess, likes, currentUser?.email]);

  // Like mutation
  const { mutate: like } = useMutation({
    mutationFn: () => createLike(blogId),
    onMutate: async () => {
      setIsLiked(true);
      setLikeCount((prev) => prev + 1);
    },
    onError: () => {
      setIsLiked(false);
      setLikeCount((prev) => prev - 1);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['likes', blogId] });
    },
  });

  // Unlike mutation
  const { mutate: unlike } = useMutation({
    mutationFn: () => deleteLike(likeId),
    onMutate: async () => {
      setIsLiked(false);
      setLikeCount((prev) => prev - 1);
    },
    onError: () => {
      setIsLiked(true);
      setLikeCount((prev) => prev + 1);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['likes', blogId] });
    },
  });

  const handleLike = () => {
    if (!blogId || !currentUser) return;

    if (isLiked) {
      unlike();
    } else {
      like();
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 animate-pulse bg-gray-200 rounded-full" />
        <div className="w-4 h-4 animate-pulse bg-gray-200 rounded" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleLike}
        type="button"
        className="btn btn-ghost hover:bg-transparent"
        aria-label={isLiked ? 'Unlike' : 'Like'}
        disabled={!currentUser}
      >
        {isLiked ? (
          <FaHeart className="w-8 h-8 text-error" />
        ) : (
          <FaRegHeart className="w-8 h-8 hover:text-error transition-colors" />
        )}
      </button>
      <div className="text-3xl font-medium">{likeCount}</div>
    </div>
  );
};

export default LikeButton;
