/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getAllblogs } from "@/services/blogServices";
import { motion } from "framer-motion";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const BlogSection = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await getAllblogs();
        console.log(res);
        if (res?.success) {
          setBlogs(res.data);
        } else {
          console.log(res.message);
          setIsError(true);
        }
      } catch (error) {
        console.log("Error fetching blogs:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  console.log(blogs);

  return (
    <div className="min-h-screen">
      <section className="container mx-auto px-4 sm:px-8 lg:px-25 py-16">
        <h2 className="text-4xl font-bold text-center mb-10">My Blogs</h2>
        {isLoading && <p className="text-center">Loading blogs...</p>}
        {isError && (
          <p className="text-center text-red-500">Failed to load blogs.</p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {blogs.map((blog: any) => (
            <motion.div
              key={blog._id}
              className="bg-gray-200 p-6 rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-full h-[200px] overflow-hidden rounded-md mb-4">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">{blog.title}</h3>
              <div
                className="mt-2 text-gray-700"
                dangerouslySetInnerHTML={{
                  __html: blog.content.substring(0, 100) + "...",
                }}
              />
              <Link
                href={`/blogs/${blog._id}`}
                className="text-blue-600 hover:underline mt-4 block"
              >
                View Blog →
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BlogSection;
