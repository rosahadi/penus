import { useCallback, useEffect, useMemo } from 'react';
import { Search } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useQuery } from '@tanstack/react-query';
import { searchBlog } from '@/api/blog';
import { SearchFormData } from '@/types';
import debounce from 'lodash/debounce';
import BlogList from '@/components/BlogList';
import SkeletonBlogList from '@/components/Skeleton';

const MobileSearch = () => {
  const searchForm = useForm<SearchFormData>({
    defaultValues: {
      search: '',
    },
  });

  const searchQuery = searchForm.watch('search');

  const { data: blogResults = [], isLoading } = useQuery({
    queryKey: ['searchBlogs', searchQuery],
    queryFn: () => searchBlog(searchQuery),
    enabled: searchQuery.length > 0,
  });

  const debouncedSetValue = useMemo(
    () =>
      debounce((query: string) => {
        searchForm.setValue('search', query);
      }, 300),
    [searchForm]
  );

  const handleSearch = useCallback(
    (query: string) => {
      debouncedSetValue(query);
    },
    [debouncedSetValue]
  );

  useEffect(() => {
    return () => {
      debouncedSetValue.cancel();
    };
  }, [debouncedSetValue]);

  const showInitialState = !searchQuery;
  const showNoResults =
    !isLoading && blogResults.length === 0 && !showInitialState;
  const showResults = !isLoading && blogResults.length > 0;
  const showLoading = isLoading && searchQuery.length > 0;

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Search Input */}
      <div className="flex items-center gap-2 border-b-2 border-solid border-bgTertiary py-2 mb-4">
        <Search className="w-8 h-8 text-textSecondary" />
        <Form {...searchForm}>
          <FormField
            control={searchForm.control}
            name="search"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="w-full bg-transparent border-none focus-visible:ring-0 text-[1.65rem] text-textSecondary"
                    placeholder="Search for blogs..."
                    onChange={(e) => {
                      field.onChange(e);
                      handleSearch(e.target.value);
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </Form>
      </div>

      {/* Blog Results */}
      <div className="w-full">
        {showLoading && (
          <div className="w-full">
            <SkeletonBlogList blogsNum={6} />
          </div>
        )}

        {showNoResults && (
          <p className="text-center text-3xl text-textSecondary">
            No blogs found.
          </p>
        )}

        {showResults && <BlogList blogs={blogResults} />}
      </div>
    </div>
  );
};

export default MobileSearch;
