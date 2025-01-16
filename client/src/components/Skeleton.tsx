function SkeletonBlogList({ blogsNum }: { blogsNum: number }) {
  return (
    <div>
      {[...Array(blogsNum)].map((_, index) => (
        <BlogItemSkeleton key={index} />
      ))}
    </div>
  );
}

export default SkeletonBlogList;

function BlogItemSkeleton() {
  return (
    <article className="py-12 border-b border-solid border-borderMedium last:border-b-0 animate-pulse max-w-[100rem] w-[95%] mx-auto">
      <div className="flex items-center gap-5">
        <div className="w-14 h-14 shadow-sm shadow-shadowDark bg-bgTertiary rounded-full overflow-hidden"></div>

        <div className="w-24 h-6 bg-bgTertiary rounded"></div>
      </div>
      <div className="flex items-start justify-between gap-3 mt-5">
        <div className="min-[600px]:pt-7 mr-6">
          <div className="w-3/4 h-10 bg-bgTertiary rounded mb-4"></div>
          <div className="w-full h-24 bg-bgTertiary rounded"></div>
          <div className="min-[600px]:pt-16 pt-6 self-start flex items-center gap-8 text-lg text-textTertiary">
            <div className="w-32 h-6 bg-bgTertiary rounded"></div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-bgTertiary rounded"></div>
              <div className="w-6 h-6 bg-bgTertiary rounded"></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-bgTertiary rounded"></div>
              <div className="w-6 h-6 bg-bgTertiary rounded"></div>
            </div>
          </div>
        </div>
        <div className="relative w-[25%] max-w-[18rem] aspect-[4/3] bg-bgTertiary rounded flex-shrink-0"></div>
      </div>
    </article>
  );
}
