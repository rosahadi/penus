import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { buttonStyles } from '@/utils/buttonStyles';
import { Button } from '../Button';
import { deleteMe } from '@/api/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

export function DeleteAccountButton() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: deleteMeMutate } = useMutation({
    mutationFn: deleteMe,

    onSuccess: () => {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('currentUser');

      queryClient.clear();
      navigate('/', { replace: true });
    },
  });

  // Handlers
  const handleDelete = () => {
    deleteMeMutate();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className={buttonStyles(
            'btn-delete',
            'btn-px-md',
            'btn-py-md',
            'btn-rounded-md',
            'btn-medium'
          )}
          type="submit"
        >
          Delete account
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-bgCard shadow-[var(--shadow)]">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-textPrimary font-semibold mb-4">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-textSecondary pb-4">
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="gap-3">
          <AlertDialogCancel className="text-2xl h-12 w-32 rounded-md bg-[var(--bg-secondary)] text-[var(--text-primary)] border-[var(--border-medium)] hover:bg-[var(--bg-tertiary)] transition-colors">
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
            className="text-2xl h-12 w-32 rounded-md bg-[var(--error)] text-white hover:bg-[var(--error)]/90 transition-colors"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
