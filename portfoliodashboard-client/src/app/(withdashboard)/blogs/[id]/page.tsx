/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { deleteBlog, getSingleBlog } from "@/services/blogServices";

const BlogDetails = () => {
  const [blog, setBlog] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        if (!params?.id) return;
        const res = await getSingleBlog(params.id as string);
        if (res.success) {
          setBlog(res.data);
        } else {
          console.error(res.message);
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [params?.id]);

  const handleUpdate = () => {
    router.push(`/blogs/updateBlog/${params.id}`);
  };

  const handleDelete = async () => {
    try {
      const res = await deleteBlog(blog._id);
      if (res.success) {
        toast.success("Blog Deleted Successfully");
        router.push("/blogs");
      } else {
        toast.error("Blog not deleted");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  if (isLoading) {
    return <div className="p-10 text-center text-lg font-semibold">Loading...</div>;
  }

  if (!blog) {
    return <div className="p-10 text-center text-red-500 text-lg font-semibold">Blog not found</div>;
  }

  return (
    <div className="p-14 max-w-3xl mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-gray-800">{blog.title}</h1>

      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-auto max-h-80 object-cover rounded mt-4"
        />
      )}

      {/* Render blog content with HTML formatting */}
      <div
        className="mt-4 text-gray-700"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />

      <div className="mt-6 flex gap-2">
        <button
          onClick={handleUpdate}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all"
        >
          Update
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-all"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default BlogDetails;
