import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useRef } from 'react';
import { getAllPublicBlogs } from '@/api/blog';
import BlogList from '@/components/BlogList';
import SkeletonBlogList from '@/components/Skeleton';
import { BlogDocument } from '@/types';
import Loader from '@/components/Loader';

function Home() {
  const observerTarget = useRef<HTMLDivElement>(null);

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['allPublicBlogs'],
      queryFn: ({ pageParam = 1 }: { pageParam?: number }) =>
        getAllPublicBlogs(pageParam, 12),

      initialPageParam: 1,

      getNextPageParam: (lastPage, pages) => {
        if (lastPage.length < 12) {
          return undefined;
        }
        return pages.length + 1;
      },

      select: (data) => ({
        pages: data.pages.map((page) =>
          page.sort(
            (a: BlogDocument, b: BlogDocument) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
        ),
        pageParams: data.pageParams,
      }),
    });

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    });
    const currentTarget = observerTarget.current;

    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [handleObserver]);

  const blogs = data?.pages.flat() || [];

  return (
    <div className="max-w-[100rem] w-[95%] mx-auto">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <BlogList blogs={blogs} />
          {isFetchingNextPage && (
            <SkeletonBlogList data-cy="loading-more" blogsNum={12} />
          )}
          <div ref={observerTarget}></div>
        </>
      )}
    </div>
  );
}

export default Home;
