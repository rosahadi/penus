import { useCallback, useEffect, useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import debounce from 'lodash/debounce';
import { useQuery } from '@tanstack/react-query';
import { searchBlog } from '@/api/blog';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { BlogDocument, SearchFormData } from '@/types';

const SearchInput = () => {
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const searchForm = useForm<SearchFormData>({
    defaultValues: {
      search: '',
    },
  });

  const { data: blogResults = [], isLoading: isBlogLoading } = useQuery({
    queryKey: ['searchBlogs', searchForm.watch('search')],
    queryFn: () => searchBlog(searchForm.watch('search')),
    enabled: showResults && searchForm.watch('search').trim() !== '',
  });

  const debouncedSetValue = useMemo(
    () =>
      debounce((query: string) => {
        searchForm.setValue('search', query);
      }, 300),
    [searchForm]
  );

  // Close results when route changes
  useEffect(() => {
    setShowResults(false);
  }, [location.pathname]);

  // Close results when clicking outside the search container
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const searchContainer = document.querySelector('.search-container');
      if (searchContainer && !searchContainer.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      debouncedSetValue.cancel();
    };
  }, [debouncedSetValue]);

  const handleSearch = useCallback(
    (query: string) => {
      debouncedSetValue(query);
      setShowResults(query.trim() !== '');
    },
    [debouncedSetValue]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const searchValue = searchForm.getValues('search');
    if (searchValue.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchValue.trim())}`);
      setShowResults(false);
    }
  };

  return (
    <div className="relative search-container">
      <Form {...searchForm}>
        <form
          className="relative w-[26rem] bg-bgSecondary border border-solid border-bgTertiary 
        px-6 flex items-center justify-between gap-3 rounded-full"
          onSubmit={handleSubmit}
        >
          <FormField
            control={searchForm.control}
            name="search"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="w-full border-none bg-transparent text-xl shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
                    placeholder="Search..."
                    onChange={(e) => {
                      field.onChange(e);
                      handleSearch(e.target.value);
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <span className="flex items-center pointer-events-none">
            <Search className="w-[1.8rem] h-[1.8rem] text-textSecondary" />
          </span>
        </form>

        {/* Dropdown Results */}
        {showResults && blogResults.length > 0 && (
          <div className="absolute z-50 w-full p-4 bg-bgSecondary border border-bgTertiary rounded-xl shadow-lg overflow-hidden">
            {/* Blogs Section */}
            <div className="p-2">
              <h3 className="text-lg font-semibold text-textTertiary px-2 pb-2">
                Blogs
              </h3>
              <ul className="space-y-1">
                {blogResults.map((blog: BlogDocument) => (
                  <li key={blog._id}>
                    <Link
                      to={`/blog/${blog._id}`}
                      className="block px-2 py-2 hover:bg-bgTertiary rounded-lg transition-colors duration-150"
                      onClick={() => setShowResults(false)}
                    >
                      <p className="text-[1.5rem]">{blog.title}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Loading States */}
            {isBlogLoading && (
              <div className="p-4 text-center text-textSecondary">
                <p>Loading results...</p>
              </div>
            )}
          </div>
        )}
      </Form>
    </div>
  );
};

export default SearchInput;
