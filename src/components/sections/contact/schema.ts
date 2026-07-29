import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters.")
    .max(100),

  email: z
    .string()
    .email("Enter a valid email address."),

  subject: z
    .string()
    .min(5, "Subject is too short.")
    .max(120),

  message: z
    .string()
    .min(20, "Message should be at least 20 characters.")
    .max(1000),
});

export type ContactFormValues = z.infer<
  typeof contactSchema
>;