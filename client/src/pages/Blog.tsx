import { useState } from 'react';
import { getPublicBlog } from '@/api/blog';
import formattedBlogDate from '@/utils/formattedDate';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import image from '@/assets/profile.jpg';
import DOMPurify from 'dompurify';
import { Button } from '@/components/Button';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { MdOutlineBookmark, MdOutlineBookmarkAdd } from 'react-icons/md';
import { FaRegHeart } from 'react-icons/fa';
import Share from '@/components/blogPage/Share';
import { buttonStyles } from '@/utils/buttonStyles';
import Comment from '@/components/blogPage/Comment';

function Blog() {
  const { blogId } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [likeCount, setLikeCount] = useState(1);

  const { data: blog } = useQuery({
    queryKey: ['blog', blogId],
    queryFn: () => getPublicBlog(blogId),
  });

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const shareUrl = window.location.href;

  return (
    <div className="mb-28 mt-16 max-w-[70rem] mx-auto">
      <h2 className="text-7xl max-md:text-6xl font-bold mb-10 mt-14">
        {blog?.title}
      </h2>

      <div className="grid grid-cols-[auto_1fr] gap-4 items-center mb-4">
        <Avatar className="w-16 h-16 shadow-sm shadow-shadowDark rounded-full overflow-hidden">
          <AvatarImage src={image} alt={blog?.user?.name} />
        </Avatar>
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-4">
            <span className="font-medium text-[1.6rem]">
              {blog?.user?.name || 'unknown'}
            </span>
            <Button
              className={`btn btn-ghost btn-px-md btn-py-sm btn-1.6 ${
                isFollowing ? 'text-success' : 'text-textSecondary'
              }`}
              onClick={handleFollow}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </Button>
          </div>
          <span className="text-gray-400 text-xl">
            {formattedBlogDate(blog)}
          </span>
        </div>
      </div>

      <div className="text-textTertiary border-solid border-t border-b border-borderMedium py-4 mt-8 flex justify-between items-center">
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-2">
            <Button className="btn btn-ghost" onClick={handleLike}>
              <FaRegHeart className="w-8 h-8" />
            </Button>
            <Drawer>
              <DrawerTrigger asChild>
                <Button className={buttonStyles('btn-ghost')}>
                  {likeCount}
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>People who liked this post</DrawerTitle>
                </DrawerHeader>
              </DrawerContent>
            </Drawer>
          </div>

          {/* Comment Button and Drawer*/}
          <Comment />
        </div>

        <div className="flex items-center gap-10">
          <Share url={shareUrl} />

          <Button className={buttonStyles('btn-ghost')} onClick={handleSave}>
            {isSaved ? (
              <MdOutlineBookmark className="mr-2 w-10 h-10" />
            ) : (
              <MdOutlineBookmarkAdd className="mr-2 w-10 h-10" />
            )}
          </Button>
        </div>
      </div>

      <img
        src={image}
        alt={blog?.title}
        className="w-full max-h-[40rem] aspect-[4/3] my-8 rounded-sm object-cover"
      />

      <article
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(blog?.content),
        }}
        className="mb-4 text-3xl text-gray-light-3 leading-9"
      />
    </div>
  );
}

export default Blog;
