import { z } from "zod";

const SkillCreateValidationSchema = z.object({
  body: z.object({
    skillName:z.string({ required_error: "SkillName is required."}),
  }),
});

const SKillUpdateValidationSchema = z.object({
  body: z.object({
    skillName:z.string({ required_error: "SkillName is required."}).optional(),
  }),
});

export const SkillValidation = {
  SkillCreateValidationSchema,
  SKillUpdateValidationSchema,
};