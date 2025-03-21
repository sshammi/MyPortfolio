/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getSingleProject, updateHouse } from "@/services/projectServices";

// Form validation schema
const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  description: z.string().min(5, "Description must be at least 5 characters."),
  link: z.string().url("Invalid URL"),
  image: z.any().optional(),
});

export default function UpdateProject() {
  const { id } = useParams(); // ✅ Get project ID from URL
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState<any>(null); // Store previous project data

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "", description: "", link: "", image: null },
  });

  // Fetch the existing project details
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await getSingleProject(id as string);
        if (res?.success) {
          setProject(res.data);
          form.reset({
            title: res.data.title, // Reset title
            description: res.data.description, // Reset description
            link: res.data.link, // Reset link
            image: res.data.image || null, // Reset image
          });
        } else {
          toast.error("Project not found");
        }
      } catch (error) {
        console.error("Error fetching project:", error);
        toast.error("Failed to load project");
      }
    };

    fetchProject();
  }, [id, form]);

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

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);

      if (data.image instanceof File) {
        const imageURL = await uploadImageToImageBB(data.image);
        data.image = imageURL;
      }

      const res = await updateHouse(project._id, {
        title: data.title,
        description: data.description,
        link: data.link,
        image: data.image || project?.image || "", // Use previous image if not changed
      });

      if (res?.success) {
        toast.success("Project updated successfully!");
        router.push("/projects");
      } else {
        toast.error(res?.message || "Update failed");
      }
    } catch (error) {
      console.error("Failed to update project:", error);
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 py-24">
      <h1 className="text-2xl font-bold mb-4 text-center">Update Project</h1>

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
                  <Input
                    type="file"
                    onChange={(e) => field.onChange(e.target.files?.[0])}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Show Previous Image */}
          {project?.image && (
            <div className="mt-4">
              <p className="text-sm font-semibold">Current Image:</p>
              <img
                src={project.image}
                alt="Project"
                className="w-full h-40 object-cover rounded-md"
              />
            </div>
          )}

          {/* Submit Button */}
          <Button type="submit" className="w-full bg-gray-800 text-white p-2 rounded" disabled={loading}>
            {loading ? "Updating..." : "Update Project"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
