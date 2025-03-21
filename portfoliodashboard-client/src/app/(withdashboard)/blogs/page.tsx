/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllblogss } from "@/services/blogServices";

const Blogs = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await getAllblogss();
        if (res?.success) {
          setBlogs(res.data);
        } else {
          console.error(res.message);
          setIsError(true);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-14">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">All Blogs</h1>
        <Link href="/blogs/addBlog">
          <button className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-500">
            Add Blog
          </button>
        </Link>
      </div>

      {isLoading && <p className="text-center text-gray-500">Loading...</p>}
      {isError && <p className="text-center text-red-500">Failed to fetch blogs.</p>}

      {blogs.length === 0 && !isLoading && !isError ? (
        <p className="text-center text-gray-500">No blogs available.</p>
      ) : (
        <div className="grid gap-4">
          {blogs.map((blog) => (
            <div key={blog._id} className="p-6 border rounded-lg shadow bg-slate-200">
              {blog.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={blog.image}
                  alt="Blog"
                  className="w-full h-auto max-h-80 object-cover rounded"
                />
              )}
              <h2 className="text-xl font-bold mt-2">{blog.title}</h2>

              {/* Render HTML content safely */}
              <div
                className="mt-2 text-gray-700"
                dangerouslySetInnerHTML={{
                  __html: blog.content.substring(0, 100) + "...",
                }}
              />

              <Link href={`/blogs/${blog._id}`}>
                <button className="mt-2 text-blue-500 hover:underline">Read More</button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blogs;
