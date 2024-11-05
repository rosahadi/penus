import { BlogDocument } from '@/types';

function formattedBlogDate(blog: BlogDocument | null): string {
  if (!blog || !blog.createdAt) {
    return 'Unknown date';
  }

  const date = new Date(blog.createdAt);
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  };

  return new Intl.DateTimeFormat('en-US', options).format(date);
}

export default formattedBlogDate;
