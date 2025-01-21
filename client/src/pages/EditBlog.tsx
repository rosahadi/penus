import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect, useState } from 'react';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import RichTextEditor from '@/components/RichTextEditor';
import { updateMyBlog, getBlogById } from '@/api/blog';
import { BlogDataType } from '@/types';

// Zod schema for validation
const blogSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  content: z.string().min(1, { message: 'Content is required' }),
  image: z
    .any()
    .optional()
    .refine(
      (val) => {
        if (val instanceof File) {
          return val.size <= 10 * 1024 * 1024;
        }
        return true;
      },
      {
        message: 'Image size is too large. Maximum size allowed is 10MB.',
      }
    ),
});

interface FormErrors {
  content?: string;
  image?: string;
  imageError?: string;
}

function EditBlog() {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [error, setError] = useState<FormErrors>({});

  const form = useForm<BlogDataType>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: '',
      content: '',
      image: null,
    },
  });

  // Fetch existing blog data
  const { data: blog, isLoading } = useQuery({
    queryKey: ['blog', blogId],
    queryFn: () => getBlogById(blogId as string),
    enabled: !!blogId,
  });

  // Set form values when blog data is loaded
  useEffect(() => {
    if (blog) {
      form.reset({
        title: blog.title,
        content: blog.content,
        image: blog.image,
      });
    }
  }, [blog, form]);

  // Mutation for updating blog
  const updateBlogMutation = useMutation({
    mutationFn: (data: BlogDataType) => updateMyBlog(blogId as string, data),
    onError: (error: string) => {
      setError({ imageError: error || 'An unexpected error occurred' });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs', 'blog'] });
      navigate('/stories');
    },
  });

  const validateContent = (content: string): boolean => {
    const plainText = content.replace(/<[^>]*>/g, '').trim();
    return plainText.length > 0;
  };

  const onSubmit = (values: BlogDataType) => {
    setError({});
    const errors: FormErrors = {};

    if (!validateContent(values.content)) {
      errors.content = 'Content cannot be empty';
    }

    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }

    const blogData: BlogDataType = {
      title: values.title,
      content: values.content,
      image: values.image instanceof File ? values.image : null,
    };

    updateBlogMutation.mutate(blogData);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="my-28 space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-2xl">Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter blog title"
                  className="p-5 text-2xl"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field: { onChange, value, ...field } }) => (
            <FormItem>
              <FormLabel className="text-2xl">Image</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        onChange(file);
                      }
                    }}
                    {...field}
                  />
                  <div
                    className="w-full p-5 border rounded text-2xl cursor-pointer text-gray-500 bg-white"
                    onClick={() => {
                      const fileInput = document.querySelector(
                        'input[type="file"]'
                      ) as HTMLInputElement;
                      fileInput?.click();
                    }}
                  >
                    {value instanceof File ? value.name : 'Choose a new image'}
                  </div>
                </div>
              </FormControl>
              {error?.image || error?.imageError ? (
                <FormMessage>{error.image || error.imageError}</FormMessage>
              ) : (
                <FormMessage />
              )}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-2xl">Content</FormLabel>
              <FormControl>
                <RichTextEditor
                  name="content"
                  value={field.value}
                  onChange={(_name, value) => {
                    field.onChange(value);
                  }}
                />
              </FormControl>
              {error?.content ? (
                <FormMessage>{error.content}</FormMessage>
              ) : (
                <FormMessage />
              )}
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="mt-14 w-80 h-20 text-lg uppercase"
          disabled={updateBlogMutation.isPending}
        >
          {updateBlogMutation.isPending ? 'Updating...' : 'Update Blog'}
        </Button>
      </form>
    </Form>
  );
}

export default EditBlog;
