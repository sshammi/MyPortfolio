import { z } from "zod";

const ProjectCreateValidationSchema = z.object({
  body: z.object({
    title:z.string({ required_error: "Title is required."}),
    image: z.string().url("Image must be a valid URL.").optional(),
    description: z.string({ required_error: "Description is required." }),
    link: z.string({ required_error: "Project link is required." }).url("Project link must be a valid URL."),
  }),
});

const ProjectUpdateValidationSchema = z.object({
  body: z.object({
    title:z.string({ required_error: "Title is required."}).optional(),
    image: z.string().url("Image must be a valid URL.").optional(),
    description: z.string().optional(),
    link: z.string().url("Project link must be a valid URL.").optional(),
  }),
});

export const ProjectValidation = {
  ProjectCreateValidationSchema,
  ProjectUpdateValidationSchema,
};
