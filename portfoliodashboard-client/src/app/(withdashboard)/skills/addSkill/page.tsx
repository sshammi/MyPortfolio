"use client";

import { useState } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { createSkill } from "@/services/skillServices"; // Your service for creating skills
import { useRouter } from "next/navigation";

// Form validation schema using Zod
const formSchema = z.object({
  skillName: z.string().min(1, "Skill name is required."),
});

export default function AddSkill() {
  const router=useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { skillName: "" },
  });

  const [loading, setLoading] = useState(false);

  // Submit function to handle form submission
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setLoading(true);

      const res = await createSkill({ skillName: data.skillName });

      if (res?.success) {
        toast.success("Skill added successfully!");
        router.push('/skills');
        form.reset(); // Reset form after submission
      } else {
        toast.error(res?.message || "Failed to add skill.");
      }
    } catch (error) {
      console.error("Error adding skill:", error);
      toast.error("An error occurred while adding the skill.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 py-24">
      <h1 className="text-2xl font-bold mb-4 text-center">Add New Skill</h1>

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
            {loading ? "Adding..." : "Add Skill"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
