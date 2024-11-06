import React, { useState } from 'react';
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

import { buttonStyles } from '@/utils/buttonStyles';
import { FaRegComment, FaRegHeart, FaShareAlt } from 'react-icons/fa';

function Blog() {
  const { blogId } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [likeCount, setLikeCount] = useState(1);
  const [commentCount, setCommentCount] = useState(1);

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

  return (
    <div className="mb-28 mt-16 max-w-[70rem] mx-auto">
      <h2 className="text-7xl max-md:text-6xl font-bold mb-10 mt-14">
        {blog?.title}
      </h2>

      <div className="grid grid-cols-[auto_1fr] gap-4 items-center  mb-4">
        {/* Avatar Column */}
        <Avatar className="w-16 h-16 shadow-sm shadow-shadowDark rounded-full overflow-hidden">
          <AvatarImage src={image} alt={blog?.user?.name} />
        </Avatar>

        {/* Info Column */}
        <div className="flex flex-col justify-center">
          {/* Name and Follow Button Row */}
          <div className="flex items-center gap-4">
            <span className="font-medium text-[1.6rem]">
              {blog?.user?.name || 'unknown'}
            </span>

            <Button
              className={`${buttonStyles(
                'btn-ghost',
                'btn-px-md',
                'btn-py-sm',
                'btn-1.6'
              )} ${isFollowing ? 'text-success' : 'text-textSecondary'}`}
              onClick={handleFollow}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </Button>
          </div>

          {/* Date Row */}
          <span className="text-gray-400 text-xl">
            {formattedBlogDate(blog)}
          </span>
        </div>
      </div>

      <div className="text-textSecondary border-solid border-t border-b border-borderMedium py-4 mt-8 flex justify-between items-center">
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-2">
            <Button className={buttonStyles('btn-ghost')} onClick={handleLike}>
              <FaRegHeart size={20} />
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
                {/* People who liked this post */}
              </DrawerContent>
            </Drawer>
          </div>

          <div className="flex items-center gap-2">
            <Drawer>
              <DrawerTrigger asChild>
                <Button className={buttonStyles('btn-ghost')}>
                  <FaRegComment size={20} />
                  <span className="ml-1">{commentCount}</span>
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Comments</DrawerTitle>
                </DrawerHeader>
                {/* Comments */}
              </DrawerContent>
            </Drawer>
          </div>
        </div>

        <div className="flex items-center gap-10 text-textSecondary">
          <Button className={buttonStyles('btn-ghost')}>
            <FaShareAlt size={20} />
          </Button>

          <Button className={buttonStyles('btn-ghost')} onClick={handleSave}>
            {isSaved ? (
              <MdOutlineBookmark size={25} />
            ) : (
              <MdOutlineBookmarkAdd size={25} />
            )}
          </Button>
        </div>
      </div>

      <img
        src={image}
        alt={blog?.title}
        className="w-full max-h-[40rem]  aspect-[4/3] my-8 rounded-sm object-cover"
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
