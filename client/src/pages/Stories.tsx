import { getMyBlogs } from '@/api/blog';
import BlogTable from '@/components/storiesPage/BlogTable';
import PageSizeSelect from '@/components/storiesPage/PageSizeSelect';
import Pagination from '@/components/storiesPage/Pagination';
import SearchForm from '@/components/storiesPage/SearchForm';
import usePagination from '@/hooks/usePagination';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ChangeEvent, useCallback, useState } from 'react';
import { useNavigate } from 'react-router';

function Stories() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');

  const { currentPage, pageSize, handlePageChange, handlePageSizeChange } =
    usePagination();

  const blogQuery = useQuery({
    queryKey: ['myBlogs', currentPage, pageSize, searchTerm],
    queryFn: () => getMyBlogs(currentPage, pageSize),
  });

  console.log(pageSize, pageSize);
  console.log(blogQuery.data);

  const handleSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  return (
    <div className="container mx-auto max-sm:p-2 p-8  bg-background min-h-fit text-2xl my-12">
      <h1 className="text-textPrimary text-4xl font-bold mb-12">
        Your stories
      </h1>

      <div className="mb-8 flex max-sm:flex-col gap-4 justify-between">
        <SearchForm />
        <PageSizeSelect pageSize="10" onPageSizeChange={() => {}} />
      </div>

      <BlogTable blogs={blogQuery?.data || []} />

      <Pagination />
    </div>
  );
}

export default Stories;
