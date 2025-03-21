/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getSingleBlog } from '@/services/blogServices';

const BlogDetails = () => {
  const [blog, setBlog] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const params = useParams(); 

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        if (!params?.id) return; 
        const res = await getSingleBlog(params.id as string);
        console.log(res);
        if (res.success) {
          setBlog(res?.data);
        } else {
          console.log(res.message);
        }
      } catch (error) {
        console.error('Error fetching blog:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [params?.id]);

  if (isLoading) {
    return <div className="p-10 text-center text-lg font-semibold">Loading...</div>;
  }

  if (!blog) {
    return <div className="p-10 text-center text-red-500 text-lg font-semibold">Blog not found</div>;
  }

  return (
    <div className="min-h-screen">
      <div className="p-14 max-w-3xl mx-auto rounded-lg">
        <h2 className="text-2xl font-bold">{blog?.title}</h2>
        {blog?.image && (
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-80 object-cover rounded mt-6"
          />
        )}

        <div 
          className="mt-6 text-lg leading-relaxed"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>
    </div>
  );
};

export default BlogDetails;
