import mongoose, { Schema, Model, Document } from "mongoose";

export type ProjectCategory = "Full Stack" | "HTML & CSS" | "React";
export type ProjectStatus = "Completed" | "Live" | "In Progress";

export interface IProject extends Document {
  title: string;
  slug: string;

  description: string;
  excerpt: string;
  fullDescription: string;

  image: string;

  category: ProjectCategory;
  status: ProjectStatus;

  year: number;
  role: string;

  featured: boolean;

  githubUrl?: string;
  liveUrl?: string;
  caseStudyUrl?: string;

  technologies: string[];
  tags: string[];
  features: string[];

  problem: string;
  solution: string;

  architecture: string[];
  challenges: string[];
  optimizations: string[];
  lessons: string[];

  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true, trim: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    description: { type: String, required: true, trim: true },
    excerpt: { type: String, default: "", maxlength: 250, trim: true },
    fullDescription: { type: String, default: "", trim: true },

    image: { type: String, required: true },

    category: {
      type: String,
      enum: ["Full Stack", "HTML & CSS", "React"],
      default: "Full Stack",
    },

    status: {
      type: String,
      enum: ["Completed", "Live", "In Progress"],
      default: "Completed",
    },

    year: { type: Number, default: new Date().getFullYear() },
    role: { type: String, default: "", trim: true },
    featured: { type: Boolean, default: false },

    githubUrl: { type: String, default: "" },
    liveUrl: { type: String, default: "" },
    caseStudyUrl: { type: String, default: "" },

    technologies: { type: [String], default: [] },
    tags: { type: [String], default: [] },
    features: { type: [String], default: [] },

    problem: { type: String, default: "" },
    solution: { type: String, default: "" },

    architecture: { type: [String], default: [] },
    challenges: { type: [String], default: [] },
    optimizations: { type: [String], default: [] },
    lessons: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default (mongoose.models.Project as Model<IProject>) ||
  mongoose.model<IProject>("Project", ProjectSchema);