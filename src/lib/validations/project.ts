import { z } from "zod";

export const ProjectSchema = z.object({
  title: z.string().min(3).max(100),

  slug: z
    .string()
    .min(3)
    .regex(/^[a-z0-9-]+$/, "Invalid slug"),

  description: z.string().min(10),

  excerpt: z.string().max(250),

  fullDescription: z.string(),

  image: z.string().min(1, "Image is required"),

  category: z.enum(["Full Stack", "HTML & CSS", "React"]),

  status: z.enum(["Completed", "Live", "In Progress"]),

  year: z.number(),

  role: z.string(),

  featured: z.boolean(),

  githubUrl: z.string().optional(),

  liveUrl: z.string().optional(),

  caseStudyUrl: z.string().optional(),

  technologies: z.array(z.string()),

  tags: z.array(z.string()),

  features: z.array(z.string()),

  problem: z.string(),

  solution: z.string(),

  architecture: z.array(z.string()),

  challenges: z.array(z.string()),

  optimizations: z.array(z.string()),

  lessons: z.array(z.string()),
});

export type ProjectInput = z.infer<typeof ProjectSchema>;
