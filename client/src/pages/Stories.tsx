import { deleteMyBlog, getMyBlogs, updateMyBlog } from '@/api/blog';
import BlogTable from '@/components/storiesPage/BlogTable';
import PageSizeSelect from '@/components/storiesPage/PageSizeSelect';
import Pagination from '@/components/storiesPage/Pagination';
import SearchForm from '@/components/storiesPage/SearchForm';
import usePagination from '@/hooks/usePagination';
import { BlogDataType } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ChangeEvent, useCallback, useState } from 'react';

function Stories() {
  const queryClient = useQueryClient();

  const [searchTerm, setSearchTerm] = useState('');

  const { currentPage, pageSize, handlePageChange, handlePageSizeChange } =
    usePagination();

  const blogQuery = useQuery({
    queryKey: ['myBlogs', currentPage, pageSize, searchTerm],
    queryFn: () => getMyBlogs(currentPage, pageSize),
  });

  // Delete blog mutation
  const deleteBlogMutation = useMutation({
    mutationFn: deleteMyBlog,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['myBlogs', currentPage, pageSize, searchTerm],
      }),
  });

  const toggleStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: 'publish' | 'hide' }) =>
      updateMyBlog(id, { status } as BlogDataType),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['myBlogs'],
      }),
  });

  const handleToggleStatus = useCallback(
    (id: string, currentStatus: 'publish' | 'hide') => {
      const newStatus = currentStatus === 'publish' ? 'hide' : 'publish';
      toggleStatusMutation.mutate({ id, status: newStatus });
    },
    [toggleStatusMutation]
  );

  const handleSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  const filteredBlogs =
    blogQuery?.data?.data?.blogs.filter((blog: BlogDataType) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  return (
    <div className="max-w-[98rem] mx-auto max-sm:p-2 p-8  bg-background min-h-fit text-2xl mb-28 mt-16">
      <h1 className="text-textPrimary text-4xl font-bold mb-12">
        Your stories
      </h1>

      <div className="mb-8 flex max-sm:flex-col gap-4 justify-between">
        <SearchForm handleSearch={handleSearch} />
        <PageSizeSelect
          pageSize={pageSize.toString()}
          onPageSizeChange={handlePageSizeChange}
        />
      </div>

      <BlogTable
        blogs={filteredBlogs}
        deleteBlog={(id) => deleteBlogMutation.mutate(id)}
        onToggleStatus={handleToggleStatus}
        disabled={toggleStatusMutation.isPending}
      />

      <Pagination
        currentPage={currentPage}
        pageSize={pageSize}
        totalBlogs={blogQuery.data?.totalBlogs}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}

export default Stories;
