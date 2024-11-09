import { useState } from 'react';
import { MoreHorizontal, Edit, Trash } from 'lucide-react';
import profileImage from '@/assets/profile.jpg';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteComments, updateComment } from '@/api/comment';
import CommentForm from './CommentForm';
import { CommentFormDataType } from '@/types';
import { CurrentUser } from '@/types/auth';

const CommentItem = ({
  commentId,
  avatar,
  userEmail,
  name,
  date,
  comment,
  blogId,
}: {
  commentId: string;
  avatar: string;
  userEmail: string;
  name: string;
  date: string;
  comment: string;
  blogId: string | undefined;
}) => {
  const currentUserString = localStorage.getItem('currentUser');
  const currentUser: CurrentUser | null = currentUserString
    ? JSON.parse(currentUserString)
    : null;
  const isCommentOwner = currentUser?.email === userEmail;

  console.log(userEmail);

  const [showMenu, setShowMenu] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteComments,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comment', blogId] });
      setIsDeleting(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comment', blogId] });
      setIsEditing(false);
    },
  });

  const handleDeleteConfirm = () => {
    deleteMutation.mutate(commentId);
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setShowMenu(false);
  };

  const handleEditSubmit = (formData: CommentFormDataType) => {
    updateMutation.mutate({ blogId: commentId, formData });
  };

  const handleDeleteClick = () => {
    setIsDeleting(true);
    setShowMenu(false);
  };

  return (
    <div className="grid grid-cols-[1fr_24px] gap-4 border-t last-of-type:border-y border-solid border-borderMedium py-8">
      {/* Container for avatar, name, and date */}
      <div className="flex items-center gap-4">
        <Avatar className="w-14 h-14 shadow-sm shadow-shadowDark rounded-full overflow-hidden">
          <AvatarImage src={avatar || profileImage} alt={name} />
        </Avatar>

        {/* Name and date */}
        <div className="space-y-1">
          <div className="text-3xl">{name}</div>
          <div className="text-textSecondary text-xl">{date}</div>
        </div>
      </div>

      {/* More options button  */}
      <div className="relative">
        {isCommentOwner && (
          <button
            className="text-textSecondary hover:text-textTertiary focus:outline-none"
            onClick={() => setShowMenu(!showMenu)}
          >
            <MoreHorizontal size={20} />
          </button>
        )}
        {showMenu && isCommentOwner && (
          <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md p-2 space-y-2">
            <button
              className="flex items-center space-x-2 text-blue-500 hover:bg-gray-100 p-2 rounded-md w-full"
              onClick={handleEditClick}
            >
              <Edit size={16} />
              <span>Edit</span>
            </button>
            <button
              className="flex items-center space-x-2 text-red-500 hover:bg-gray-100 p-2 rounded-md w-full"
              onClick={handleDeleteClick}
            >
              <Trash size={16} />
              <span>Delete</span>
            </button>
          </div>
        )}
      </div>

      {/* Comment text or edit form */}
      <div className="col-span-2 mt-2">
        {isEditing ? (
          <CommentForm
            onSubmit={handleEditSubmit}
            initialValue={comment}
            isPending={updateMutation.isPending}
            textAreaHeight="h-24"
            submitLabel="Update"
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <p>{comment}</p>
        )}
      </div>

      {/* Delete confirmation dialog */}
      {isDeleting && (
        <div className="absolute top-0 left-0 z-50 h-full max-w-[50rem] w-full max-[630px]:max-w-full bg-bgMain flex flex-col justify-center items-center p-8">
          <div className="max-w-[30rem] text-center">
            <h2 className="text-3xl font-semibold mb-4">Delete Comment</h2>
            <p className="text-textSecondary text-2xl mb-6">
              Are you sure you want to delete this comment? This action cannot
              be undone.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                className="text-textSecondary bg-bgTertiary hover:bg-gray-300 px-4 py-2 rounded-md"
                onClick={() => setIsDeleting(false)}
              >
                Cancel
              </button>
              <button
                className="bg-error hover:bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={handleDeleteConfirm}
                disabled={deleteMutation.isPending}
              >
                {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentItem;
