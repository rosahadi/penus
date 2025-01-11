import BlogTable from '@/components/storiesPage/BlogTable';
import PageSizeSelect from '@/components/storiesPage/PageSizeSelect';
import SearchForm from '@/components/storiesPage/SearchForm';

function Stories() {
  return (
    <div className="container mx-auto max-sm:p-2 p-8  bg-background min-h-fit text-2xl my-12">
      <h1 className="text-textPrimary text-4xl font-bold mb-12">
        Your stories
      </h1>

      <div className="mb-8 flex max-sm:flex-col gap-4 justify-between">
        <SearchForm />
        <PageSizeSelect pageSize="10" onPageSizeChange={() => {}} />
      </div>

      <BlogTable />
    </div>
  );
}

export default Stories;
