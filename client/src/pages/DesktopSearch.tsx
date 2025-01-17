import { searchBlog } from '@/api/blog';
import BlogList from '@/components/BlogList';
import SkeletonBlogList from '@/components/Skeleton';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

function DesktopSearch() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';

  const { data: blogResults = [], isLoading } = useQuery({
    queryKey: ['searchBlogs', searchQuery],
    queryFn: () => searchBlog(searchQuery),
    enabled: searchQuery.length > 0,
  });

  return (
    <div className="max-w-[98rem] mx-auto max-sm:p-2 p-8 min-h-fit text-2xl  mb-28 mt-16">
      <h1 className="text-4xl font-bold mb-8">Results for "{searchQuery}"</h1>

      <div className="w-full">
        {isLoading && (
          <div className="w-full">
            <SkeletonBlogList blogsNum={6} />
          </div>
        )}

        {!isLoading && blogResults.length === 0 && (
          <p className="text-center text-3xl text-textSecondary">
            No blogs found.
          </p>
        )}

        {!isLoading && blogResults.length > 0 && (
          <BlogList blogs={blogResults} />
        )}
      </div>
    </div>
  );
}

export default DesktopSearch;
