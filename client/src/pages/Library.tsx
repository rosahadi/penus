import { useQuery } from '@tanstack/react-query';
import { getSavedBlogs } from '@/api/savedBlog';
import BlogList from '@/components/BlogList';
import SkeletonBlogList from '@/components/Skeleton';
import { BlogDocument } from '@/types';

interface SavedBlogDocument {
  _id: string;
  user: string;
  blog: BlogDocument;
  createdAt: string;
  updatedAt: string;
}

function Library() {
  const { data: savedBlogs, isLoading } = useQuery({
    queryKey: ['savedBlogs'],
    queryFn: getSavedBlogs,
  });

  const blogs: BlogDocument[] =
    savedBlogs?.map((savedBlog: SavedBlogDocument) => savedBlog.blog) || [];

  return (
    <div className="max-w-[100rem] w-[95%] mx-auto mb-28 mt-16">
      <h1 className="text-4xl font-bold my-8">Your Library</h1>
      {isLoading ? (
        <SkeletonBlogList blogsNum={12} />
      ) : blogs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-3xl text-textSecondary">No saved blogs yet</p>
          <p className="text-2xl text-textTertiary mt-2">
            Start saving blogs to build your personal library
          </p>
        </div>
      ) : (
        <BlogList blogs={blogs} />
      )}
    </div>
  );
}

export default Library;
