export interface Project {
  _id: string;
  title: string;
  slug: string;
  description: string;
  excerpt: string;
  fullDescription: string;
  image: string;
  category: string;
  status: string;
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
}