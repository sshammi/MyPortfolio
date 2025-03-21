"use client";

import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createProject } from "@/services/projectServices";
import { toast } from "sonner";

// Form validation schema using Zod
const formSchema = z.object({
  title: z.string().min(4, "Title must be at least 4 characters."),
  description: z.string().min(5, "Description must be at least 5 characters."),
  link: z.string().url("Invalid URL"),
  image: z.any().optional(),
});

export default function CreateProject() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "", description: "", link: "", image: null },
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Function to upload image to ImageBB
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

      // Call createProject service instead of Redux mutation
      const res = await createProject({
        title: data.title,
        description: data.description,
        link: data.link,
        image: data.image || "", // Ensure image is not undefined
      });
      if (res?.success) {
        toast.success(res?.message);
        router.push('/dashboard');
      } else {
        toast.error(res?.message);
      }
      form.reset(); // Reset form after submission
      router.push("/projects"); // Redirect to projects page
    } catch (error) {
      console.error("Failed to create project:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 py-24">
      <h1 className="text-2xl font-bold mb-4 text-center">Create a New Project</h1>

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
                  <Input {...field} className="w-full p-2" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description Field */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} className="w-full p-2 border rounded" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Link Field */}
          <FormField
            control={form.control}
            name="link"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Link</FormLabel>
                <FormControl>
                  <Input {...field} className="w-full p-2 border rounded" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Image Upload Field */}
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <input
                    type="file"
                    onChange={(e) => field.onChange(e.target.files?.[0])}
                    className="p-2 border rounded"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button type="submit" className="w-full bg-gray-800 text-white p-2 rounded" disabled={loading}>
            {loading ? "Uploading..." : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
