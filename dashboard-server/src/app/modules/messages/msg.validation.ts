import { z } from "zod";

const MsgCreateValidationSchema = z.object({
  body: z.object({
    name: z.string().url("Image must be a valid URL.").optional(),
    email: z.string({ required_error: "Gmail is required." }).email('valid email required'),
    message: z.string({ required_error: "Project link is required." }),
  }),
});

export const MessageValidation = {
  MsgCreateValidationSchema
};