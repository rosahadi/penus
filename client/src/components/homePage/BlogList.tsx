import { Link } from 'react-router-dom';
import formattedBlogDate from '@/utils/formattedDate';
import shortenContent from '@/utils/shortenContent';
import DOMPurify from 'dompurify';
import profileImage from '@/assets/profile.jpg';
import { BlogDocument } from '@/types';
import { FaHeart, FaComment } from 'react-icons/fa';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { useComments } from '@/hooks/useComments';
import useLikes from '@/hooks/useLikes';

function BlogList({ blogs }: { blogs: BlogDocument[] }) {
  return (
    <div>
      {blogs.map((blog) => (
        <BlogItem blog={blog} key={blog.id} />
      ))}
    </div>
  );
}

export default BlogList;

function getBlogTitle(title: string): string {
  const maxLength = window.innerWidth <= 730 ? 30 : 100;
  if (title.length <= maxLength) return title;
  return `${title.slice(0, maxLength)}...`;
}

function BlogItem({ blog }: { blog: BlogDocument }) {
  const preview = shortenContent(blog.content);
  const title = getBlogTitle(blog.title);
  const formattedDate = formattedBlogDate(blog);
  const { data: comments } = useComments(blog.id);

  const { data: likes } = useLikes(blog.id);

  return (
    <div className="max-w-[100rem] w-[95%] mx-auto border-b border-solid border-borderMedium last:border-b-0">
      <article className="py-12 ">
        <Link
          to={`/blog/${blog.id}`}
          className="flex flex-col gap-5 max-[600px]:gap-8"
        >
          <div className="flex items-center gap-5">
            <Avatar className="w-14 h-14 shadow-sm shadow-shadowDark rounded-full overflow-hidden">
              <AvatarImage src={profileImage} alt={blog.user?.name} />
            </Avatar>

            <p className="text-[1.4rem]">
              {blog.user && blog.user.name ? blog.user.name : 'unknown'}
            </p>
          </div>

          <div className="flex items-start justify-between gap-3">
            <div className="min-[600px]:pt-7 mr-6">
              <h2 className="text-5xl max-[730px]:text-[2.6rem] max-[600px]:text-4xl font-bold max-[500px]:max-w-[200px]">
                {title}
              </h2>

              <p
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(preview),
                }}
                className="text-[1.6rem] mt-5 mb-4 text-textSecondary"
              />

              <div className="min-[600px]:pt-16 pt-6 self-start flex items-center gap-8 text-lg text-textTertiary">
                <span>{formattedDate}</span>

                <div className="flex items-center gap-2 ">
                  <FaHeart />
                  <span>{likes?.length || 0}</span>
                </div>

                <div className="flex items-center gap-2">
                  <FaComment />
                  <span>{comments?.length || 0}</span>
                </div>
              </div>
            </div>

            <div className="relative w-[25%] max-w-[18rem] aspect-[4/3]">
              <img
                src={blog?.image}
                alt={blog.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </Link>
      </article>
    </div>
  );
}
