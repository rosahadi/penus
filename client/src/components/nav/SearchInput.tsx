import { Search } from 'lucide-react';
import { useState } from 'react';

function SearchInput() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="relative w-[25rem] bg-bgSecondary border border-solid border-bgTertiary py-4 px-6 flex items-center justify-between gap-2 rounded-full">
      <input
        type="text"
        className="w-full rounded-lg text-xl"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <span className=" flex items-center pointer-events-none">
        <Search className="w-[2rem] h-[2rem] text-textSecondary" />
      </span>
    </div>
  );
}

export default SearchInput;
