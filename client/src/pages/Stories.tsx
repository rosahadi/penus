import BlogTable from '@/components/storiesPage/BlogTable';

function Stories() {
  return (
    <div className="container mx-auto max-sm:p-2 p-8  bg-background min-h-fit text-2xl my-12">
      <h1 className="text-textPrimary text-4xl font-bold mb-12">
        Your stories
      </h1>

      <BlogTable />
    </div>
  );
}

export default Stories;
