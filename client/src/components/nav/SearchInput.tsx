import { useCallback, useEffect, useMemo } from 'react';
import { Search } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import debounce from 'lodash/debounce';
import { useQuery } from '@tanstack/react-query';
import { searchBlog } from '@/api/blog';
import { searchUser } from '@/api/user';
import { Link } from 'react-router-dom';

import { BlogDocument, SearchFormData } from '@/types';

const SearchInput = () => {
  const searchForm = useForm<SearchFormData>({
    defaultValues: {
      search: '',
    },
  });

  const { data: userResults = [], isLoading: isUserLoading } = useQuery({
    queryKey: ['searchUsers', searchForm.watch('search')],
    queryFn: () => searchUser(searchForm.watch('search')),
  });

  const { data: blogResults = [], isLoading: isBlogLoading } = useQuery({
    queryKey: ['searchBlogs', searchForm.watch('search')],
    queryFn: () => searchBlog(searchForm.watch('search')),
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

  return (
    <div className="relative">
      <Form {...searchForm}>
        <form className="relative w-[26rem] bg-bgSecondary border border-solid border-bgTertiary px-6 flex items-center justify-between gap-3 rounded-full">
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
        {(userResults.length > 0 || blogResults.length > 0) && (
          <div className="absolute z-50 w-full p-4 bg-bgSecondary border border-bgTertiary rounded-xl shadow-lg overflow-hidden">
            {/* People Section */}
            {/* {userResults.length > 0 && (
              <div className="p-2">
                <h3 className="text-lg font-semibold text-textTertiary px-2 pb-2">
                  People
                </h3>
                <ul className="space-y-1">
                  {userResults.map((user: UserDocument) => (
                    <li key={user.email}>
                      <Link
                        to={`/users/${user.id}`}
                        className="block px-2 py-2 hover:bg-bgTertiary rounded-lg transition-colors duration-150 text-textPrimary"
                      >
                        <div className="flex items-center gap-2">
                          <Avatar className="w-12 h-12 shadow-sm shadow-shadowDark rounded-full overflow-hidden">
                            <AvatarImage
                              src={user.image || profileImage}
                              alt={user.name}
                            />
                          </Avatar>

                          <div>
                            <p className="text-[1.5rem]">{user.name}</p>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )} */}

            {/* Divider */}
            {/* {userResults.length > 0 && blogResults.length > 0 && (
              <div className="h-px bg-bgTertiary mx-2" />
            )} */}

            {/* Blogs Section */}
            {blogResults.length > 0 && (
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
                      >
                        <p className="text-[1.5rem]">{blog.title}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Loading States */}
            {(isUserLoading || isBlogLoading) && (
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
