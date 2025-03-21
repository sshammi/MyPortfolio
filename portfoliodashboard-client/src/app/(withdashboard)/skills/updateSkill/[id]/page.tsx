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
import { getSingleSkill, updateSkill } from "@/services/skillServices";

// Form validation schema
const formSchema = z.object({
  skillName: z.string().min(3, "Skill name must be at least 3 characters."),
});

export default function UpdateSkill() {
  const { id } = useParams(); // ✅ Get skill ID from URL
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [skill, setSkill] = useState<any>(null); // Store previous skill data

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { skillName: "" },
  });

  // Fetch the existing skill details
  useEffect(() => {
    const fetchSkill = async () => {
      try {
        const res = await getSingleSkill(id as string);
        if (res?.success) {
          setSkill(res.data);
          form.reset({
            skillName: res.data.skillName, // Reset skillName
          });
        } else {
          toast.error("Skill not found");
        }
      } catch (error) {
        console.error("Error fetching skill:", error);
        toast.error("Failed to load skill");
      }
    };

    fetchSkill();
  }, [id, form]);

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);

      const res = await updateSkill(skill._id, {
        skillName: data.skillName,
      });

      if (res?.success) {
        toast.success("Skill updated successfully!");
        router.push("/skills");
      } else {
        toast.error(res?.message || "Update failed");
      }
    } catch (error) {
      console.error("Failed to update skill:", error);
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 py-24">
      <h1 className="text-2xl font-bold mb-4 text-center">Update Skill</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Skill Name Field */}
          <FormField
            control={form.control}
            name="skillName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Skill Name</FormLabel>
                <FormControl>
                  <Input {...field} className="w-full p-2 border rounded" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button type="submit" className="w-full bg-gray-800 text-white p-2 rounded" disabled={loading}>
            {loading ? "Updating..." : "Update Skill"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
