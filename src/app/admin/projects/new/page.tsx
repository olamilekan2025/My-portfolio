import { ProjectForm } from "@/components/admin/projects/project-form";

export default function NewProjectPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">New Project</h1>
        <p className="text-muted-foreground">Add a new portfolio project.</p>
      </div>

      <ProjectForm />
    </div>
  );
}
