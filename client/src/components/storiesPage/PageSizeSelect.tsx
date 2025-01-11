import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface PageSizeSelectProps {
  pageSize: string;
  onPageSizeChange: () => void;
}

const PageSizeSelect: React.FC<PageSizeSelectProps> = ({
  pageSize,
  onPageSizeChange,
}) => {
  return (
    <div className="w-[16rem] max-sm:w-full">
      <Select value={pageSize} onValueChange={onPageSizeChange}>
        <SelectTrigger className="w-full h-[4.8rem] bg-bgSecondary border border-bgTertiary hover:border-inputFocus focus:border-inputFocus text-textPrimary text-xl px-6">
          <SelectValue placeholder="Page size" />
        </SelectTrigger>
        <SelectContent className="bg-bgCard border-borderLight">
          <SelectGroup>
            {['10', '20', '30', '50'].map((size) => (
              <SelectItem
                key={size}
                value={size}
                className="text-textPrimary hover:bg-bgSecondary focus:bg-bgSecondary px-4 py-2 text-xl"
              >
                {size} per page
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default PageSizeSelect;
