import { useMutation, useQueryClient } from '@tanstack/react-query';
import { saveBlog, deleteSavedBlog } from '@/api/savedBlog';
import { useToast } from '@/hooks/use-toast';

export function useSavedBlogs() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const saveBookMutation = useMutation({
    mutationFn: saveBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savedBlogs'] });
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to save blog',
      });
    },
  });

  const deleteBookMutation = useMutation({
    mutationFn: deleteSavedBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savedBlogs'] });
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to remove blog',
      });
    },
  });

  return {
    saveBlog: saveBookMutation.mutate,
    deleteSavedBlog: deleteBookMutation.mutate,
    isSaving: saveBookMutation.isPending,
    isDeleting: deleteBookMutation.isPending,
  };
}
