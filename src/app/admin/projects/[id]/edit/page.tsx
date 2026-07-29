import { notFound } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";
import { ProjectForm } from "@/components/admin/projects/project-form";
import type { ProjectInput } from "@/lib/validations/project";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({ params }: PageProps) {
  const { id } = await params;

  await connectDB();

  const project = await Project.findById(id).lean();

  if (!project) {
    notFound();
  }

  const initialData: Partial<ProjectInput> = {
    title: project.title,
    slug: project.slug,
    description: project.description,
    excerpt: project.excerpt,
    fullDescription: project.fullDescription,
    image: project.image,
    category: project.category,
    status: project.status,
    year: project.year,
    role: project.role,
    featured: project.featured,
    githubUrl: project.githubUrl,
    liveUrl: project.liveUrl,
    caseStudyUrl: project.caseStudyUrl,
    technologies: project.technologies,
    tags: project.tags,
    features: project.features,
    problem: project.problem,
    solution: project.solution,
    architecture: project.architecture,
    challenges: project.challenges,
    optimizations: project.optimizations,
    lessons: project.lessons,
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Edit Project</h1>
        <p className="text-muted-foreground">
          Update details for &quot;{project.title}&quot;.
        </p>
      </div>

      <ProjectForm projectId={String(project._id)} initialData={initialData} />
    </div>
  );
}
