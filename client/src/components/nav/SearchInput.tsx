import { Search } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

type SearchFormData = {
  search: string;
};

function SearchInput() {
  const searchForm = useForm<SearchFormData>({
    defaultValues: {
      search: '',
    },
  });

  // Real-time search handler
  const onSearchChange = (value: string) => {
    console.log('Search query:', value);
  };

  return (
    <Form {...searchForm}>
      <form className="relative w-[26rem] bg-bgSecondary border border-solid border-bgTertiary  px-6 flex items-center justify-between gap-3 rounded-full">
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
                    onSearchChange(e.target.value);
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
    </Form>
  );
}

export default SearchInput;
