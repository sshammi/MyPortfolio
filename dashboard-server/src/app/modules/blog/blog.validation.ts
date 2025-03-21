import { z } from "zod";

const BlogCreateValidationSchema = z.object({
  body: z.object({
    title: z.string({ required_error: "Title is required." }),
    image: z.string().optional(),
    content: z.string({ required_error: "Content is required." }),
  }),
});

const BlogUpdateValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    image: z.string().optional(),
    content: z.string().optional(),
  }),
});

export const BlogValidation = {
  BlogCreateValidationSchema,
  BlogUpdateValidationSchema,
};
