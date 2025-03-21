/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import RichTextEditor from "@/components/modules/rich-text-editor";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { createBlog } from "@/services/blogServices";
import { z } from "zod";

const formSchema = z.object({
  title: z.string().min(4, "Description must be at least 5 characters."),
  content: z.string().min(5, "Description must be at least 5 characters."),
  image: z.any().optional(),
});
export default function AddBlog() {
  const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: { title: "", content: "", image: null },
  });
  
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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

      if (result.success) {
        return result.data.url;
      } else {
        console.error("Image upload failed:", result.error);
        return "";
      }
    } catch (error) {
      setLoading(false);
      console.error("Error uploading image:", error);
      return "";
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setLoading(true);

      if (data.image instanceof File) {
        const imageURL = await uploadImageToImageBB(data.image);
        data.image = imageURL;
      }

      console.log(data);

      const res = await createBlog({
        title:data.title,
        content:data.content,
        image: data.image || "", // Ensure image is not undefined
      });
      if (res?.success) {
              toast.success(res?.message);
              router.push('/dashboard');
              }
             else {
              toast.error(res?.message);
         }
      form.reset(); // Reset form after submission
      router.push("/blogs"); // Redirect to projects page
    } catch (error) {
      console.error("Failed to create project:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-14">
      <h1 className="text-2xl font-bold mb-4">Add a New Blog</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Title Field */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} className="w-full p-2" />
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

          <FormField
                      control={form.control}
                      name="image"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Image</FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              onChange={(e) => field.onChange(e.target.files?.[0])}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
              
          <Button type="submit" className="w-full">
            Publish Blog
          </Button>
        </form>
      </Form>
    </div>
  );
}