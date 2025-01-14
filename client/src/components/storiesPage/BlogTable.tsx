import { Link } from 'react-router-dom';
import { BsPencilSquare } from 'react-icons/bs';
import { FaRegTrashCan } from 'react-icons/fa6';
import { UserDocument } from '@/types';
import { format } from 'date-fns';

export interface BlogDocument {
  id: string;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  status: 'publish' | 'hide';
  slug?: string;
  image: string;
  user?: UserDocument;
}

interface BlogTableProps {
  blogs: BlogDocument[];
  deleteBlog: (id: string) => void;
}

interface ToggleSwitchProps {
  isPublished: boolean;
  onChange: () => void;
}

interface TableRowAndCardProps extends BlogDocument {
  index: number;
  isPublished: boolean;
  deleteBlog: (id: string) => void;
}

const BlogTable: React.FC<BlogTableProps> = ({ blogs, deleteBlog }) => {
  return (
    <div className="w-full rounded-lg">
      {/* Table layout for larger screens */}
      <div className="hidden md:block  bg-bgCard">
        <table className="w-full">
          <TableHead />
          <tbody className="divide-y divide-borderLight">
            {blogs.map((blog, index) => (
              <TableRow
                key={blog._id}
                index={index + 1}
                {...blog}
                isPublished={blog.status === 'publish'}
                deleteBlog={deleteBlog}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Card layout for smaller screens */}
      <div className="block md:hidden space-y-4">
        {blogs.map((blog, index) => (
          <Card
            key={blog._id}
            index={index + 1}
            {...blog}
            isPublished={blog.status === 'publish'}
            deleteBlog={deleteBlog}
          />
        ))}
      </div>
    </div>
  );
};

const TableHead = () => {
  return (
    <thead className="bg-bgTertiary">
      <tr className="border-b border-borderMedium">
        <th className="px-4 py-3 text-left text-2xl font-medium text-textTertiary tracking-wider">
          #
        </th>
        <th className="px-4 py-3 text-left text-2xl font-medium text-textTertiary tracking-wider">
          Post
        </th>
        <th className="px-4 py-3 text-left text-2xl font-medium text-textTertiary tracking-wider">
          Date
        </th>
        <th className="px-4 py-3 text-left text-2xl font-medium text-textTertiary tracking-wider">
          Publish/Hide
        </th>
        <th className="px-4 py-3 text-left text-2xl font-medium text-textTertiary tracking-wider">
          Actions
        </th>
      </tr>
    </thead>
  );
};

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  isPublished,
  onChange,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
          isPublished ? 'bg-success' : 'bg-buttonDisabled'
        }`}
      >
        <span className="sr-only">{isPublished ? 'Published' : 'Hidden'}</span>
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out ${
            isPublished ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
      <span className="text-[1.4rem] font-medium text-textSecondary">
        {isPublished ? 'Published' : 'Hidden'}
      </span>
    </div>
  );
};

const TableRow: React.FC<TableRowAndCardProps> = ({
  index,
  id,
  title,
  createdAt,
  image,
  isPublished,
  deleteBlog,
}) => {
  return (
    <tr className="hover:bg-bgSecondary transition-colors duration-150 ease-in-out">
      <td className="px-4 py-6 text-[1.6rem] text-textSecondary">{index}</td>
      <td className="px-4 py-6">
        <div className="flex items-center space-x-3">
          <img src={image} alt={title} className="w-16 h-12 object-cover" />
          <span className="text-[1.65rem] text-textPrimary font-medium">
            {title}
          </span>
        </div>
      </td>
      <td className="px-4 py-6">
        <span className="text-[1.6rem] text-textSecondary">
          {format(new Date(createdAt), 'MMM d, yyyy')}
        </span>
      </td>
      <td className="px-4 py-6">
        <div className="flex items-center space-x-2">
          <ToggleSwitch
            isPublished={isPublished}
            onChange={() => console.log('Toggle publish state')}
          />
        </div>
      </td>
      <td className="px-4 py-6">
        <div className="flex items-center space-x-8">
          <Link to={`/edit-blog/${id}`} className="text-info">
            <BsPencilSquare className="w-[1.6rem] h-[1.6rem]" />
          </Link>
          <button className="text-error" onClick={() => deleteBlog(id)}>
            <FaRegTrashCan className="w-[1.6rem] h-[1.6rem]" />
          </button>
        </div>
      </td>
    </tr>
  );
};

const Card: React.FC<TableRowAndCardProps> = ({
  id,
  title,
  createdAt,
  image,
  isPublished,
  deleteBlog,
}) => {
  return (
    <div className="p-4 bg-bgCard border rounded-md shadow-lg transition-transform hover:scale-[1.02] hover:shadow-xl">
      <div className="flex items-start space-x-4">
        <img
          src={image}
          alt={title}
          className="w-24 h-16 object-cover shadow-sm"
        />
        <div className="flex-1">
          <h3 className="text-[1.6rem] text-textPrimary font-medium">
            {title}
          </h3>
          <p className="text-[1.4rem] text-textSecondary">
            {format(new Date(createdAt), 'MMM d, yyyy')}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between mt-4">
        <ToggleSwitch
          isPublished={isPublished}
          onChange={() => console.log('Toggle publish state')}
        />
        <div className="flex space-x-4">
          <Link to={`/edit-blog/${id}`} className="text-info">
            <BsPencilSquare className="w-[1.6rem] h-[1.6rem]" />
          </Link>
          <button className="text-error" onClick={() => deleteBlog(id)}>
            <FaRegTrashCan className="w-[1.6rem] h-[1.6rem]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogTable;
