/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getSingleBlog, updateBlog } from "@/services/blogServices";
import RichTextEditor from "@/components/modules/rich-text-editor";

// Validation Schema
const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  content: z.string().min(10, "Content must be at least 10 characters."),
  image: z.any().optional(),
});

export default function UpdateBlog() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState<any>(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "", content: "", image: null },
  });

  // Fetch blog details
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await getSingleBlog(id as string);
        if (res?.success) {
          setBlog(res.data);
          form.reset({
            title: res.data.title,
            content: res.data.content || "", // Ensure content is not null
            image: res.data.image || null,
          });
        } else {
          toast.error("Blog not found");
          router.push("/blogs"); // Redirect if blog doesn't exist
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
        toast.error("Failed to load blog");
      }
    };

    fetchBlog();
  }, [id, form, router]);

  // Upload image to ImageBB
  const uploadImageToImageBB = async (imageFile: File) => {
    const apiKey = "8d2b56eb726d92e77c483dbf69cbd97c";
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      setLoading(true);
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      setLoading(false);

      if (result.success) return result.data.url;
      console.error("Image upload failed:", result.error);
      toast.error("Image upload failed");
      return "";
    } catch (error) {
      setLoading(false);
      console.error("Error uploading image:", error);
      toast.error("Image upload error");
      return "";
    }
  };

  // Handle form submission
  const onSubmit = async (data: any) => {
    try {
      setLoading(true);

      let imageUrl = blog?.image || ""; // Use previous image if unchanged
      if (data.image instanceof File) {
        imageUrl = await uploadImageToImageBB(data.image);
      }

      const res = await updateBlog(blog._id, {
        title: data.title,
        content: data.content,
        image: imageUrl,
      });

      if (res?.success) {
        toast.success("Blog updated successfully!");
        router.push("/blogs");
      } else {
        toast.error(res?.message || "Update failed");
      }
    } catch (error) {
      console.error("Failed to update blog:", error);
      toast.error("An error occurred while updating");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 py-24">
      <h1 className="text-2xl font-bold mb-4 text-center">Update Blog</h1>

      {blog ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Title Field */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} className="w-full p-2 border rounded" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Content Field */}
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <div className="border rounded p-2">
                      <RichTextEditor
                        content={field.value}
                        onChange={(content) => field.onChange(content)}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Image Upload */}
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input type="file" onChange={(e) => field.onChange(e.target.files?.[0])} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Show Previous Image */}
            {blog?.image && (
              <div className="mt-4">
                <p className="text-sm font-semibold">Current Image:</p>
                <img src={blog.image} alt="Blog" className="w-full h-40 object-cover rounded-md" />
              </div>
            )}

            {/* Submit Button */}
            <Button type="submit" className="w-full bg-gray-800 text-white p-2 rounded" disabled={loading}>
              {loading ? "Updating..." : "Update Blog"}
            </Button>
          </form>
        </Form>
      ) : (
        <p className="text-center text-gray-500">Loading blog details...</p>
      )}
    </div>
  );
}
