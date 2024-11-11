import { useQuery } from '@tanstack/react-query';
import { getAllLikes } from '@/api/like';

const useLikes = (blogId: string | undefined) => {
  return useQuery({
    queryKey: ['likes', blogId],
    queryFn: () => getAllLikes(blogId),
    enabled: !!blogId,
  });
};

export default useLikes;
