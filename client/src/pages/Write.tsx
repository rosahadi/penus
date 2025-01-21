import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

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
import RichTextEditor from '@/components/writeBlogPage/RichTextEditor';
import { createBlog } from '@/api/blog';
import { BlogDataType } from '@/types';
import { useState } from 'react';

// Zod schema for validation
const blogSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  content: z.string().min(1, { message: 'Content is required' }),
  image: z
    .any()
    .refine((val) => val instanceof File, {
      message: 'Image is required',
    })
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

function Write() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [error, setError] = useState<FormErrors>({});
  const errors: FormErrors = {};

  const form = useForm<BlogDataType>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: '',
      content: '',
      image: null,
    },
  });

  // Mutation for creating blogs
  const createBlogMutation = useMutation({
    mutationFn: createBlog,
    onError: (error: string) => {
      errors.imageError = error || 'An unexpected error occurred';
      setError(errors);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      navigate('/stories');
    },
  });

  const validateContent = (content: string): boolean => {
    // Remove HTML tags and whitespace to check if there's actual content
    const plainText = content.replace(/<[^>]*>/g, '').trim();
    return plainText.length > 0;
  };

  const onSubmit = (values: BlogDataType) => {
    setError({});

    // Validate content
    if (!validateContent(values.content)) {
      errors.content = 'Content cannot be empty';
    }

    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }

    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('content', values.content);

    if (values.image) {
      formData.append('image', values.image);
    }

    createBlogMutation.mutate(formData);
  };

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
                    {value instanceof File ? value.name : 'Choose an image'}
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

              {error ? (
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
          disabled={createBlogMutation.isPending}
        >
          {createBlogMutation.isPending ? 'Submitting...' : 'Post Blog'}
        </Button>
      </form>
    </Form>
  );
}

export default Write;
