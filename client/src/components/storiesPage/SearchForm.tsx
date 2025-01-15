import { Search } from 'lucide-react';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { SearchFormData } from '@/types';
import { ChangeEvent } from 'react';

function SearchForm({
  handleSearch,
}: {
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  const searchForm = useForm<SearchFormData>({
    defaultValues: {
      search: '',
    },
  });

  return (
    <Form {...searchForm}>
      <form className="w-[26rem] max-sm:w-full bg-bgSecondary border border-solid border-bgTertiary px-6 flex items-center justify-between gap-3 rounded-md">
        <FormField
          control={searchForm.control}
          name="search"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  className="w-full border-none bg-transparent text-xl shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-[4.8rem]"
                  placeholder="Search..."
                  onChange={(e) => {
                    field.onChange(e);
                    handleSearch(e);
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <button type="submit" className="flex items-center focus:outline-none">
          <Search className="w-[1.8rem] h-[1.8rem] text-textSecondary" />
        </button>
      </form>
    </Form>
  );
}

export default SearchForm;
