"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Loader2,
  ImagePlus,
  X,
  FileText,
  ImageIcon,
  SlidersHorizontal,
  Link2,
  Star,
} from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import type { ProjectInput } from "@/lib/validations/project";

type FormState = Omit<
  ProjectInput,
  | "technologies"
  | "tags"
  | "features"
  | "problem"
  | "solution"
  | "architecture"
  | "challenges"
  | "optimizations"
  | "lessons"
>;

interface ProjectFormProps {
  projectId?: string;
  initialData?: Partial<ProjectInput>;
}

const EMPTY_FORM: FormState = {
  title: "",
  slug: "",
  description: "",
  excerpt: "",
  fullDescription: "",
  image: "",
  category: "Full Stack",
  status: "In Progress",
  year: new Date().getFullYear(),
  role: "",
  featured: false,
  githubUrl: "",
  liveUrl: "",
  caseStudyUrl: "",
};

function toFormState(data?: Partial<ProjectInput>): FormState {
  if (!data) return EMPTY_FORM;
  return { ...EMPTY_FORM, ...data };
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function ProjectForm({ projectId, initialData }: ProjectFormProps) {
  const router = useRouter();
  const isEditing = Boolean(projectId);

  const [form, setForm] = useState<FormState>(toFormState(initialData));
  const [slugTouched, setSlugTouched] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleTitleChange(value: string) {
    update("title", value);
    if (!slugTouched) update("slug", slugify(value));
  }

  async function handleImageUpload(file: File) {
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!data.success) {
        toast.error(data.message ?? "Failed to upload image.");
        return;
      }

      update("image", data.url);
      toast.success("Image uploaded.");
    } catch {
      toast.error("Something went wrong uploading the image.");
    } finally {
      setUploading(false);
    }
  }

  function handleDrop(e: React.DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleImageUpload(file);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.image) {
      toast.error("Please upload a project image.");
      return;
    }

    setSaving(true);
    setFieldErrors({});

    const payload: ProjectInput = {
      ...form,
      year: Number(form.year),
      technologies: [],
      tags: [],
      features: [],
      problem: "",
      solution: "",
      architecture: [],
      challenges: [],
      optimizations: [],
      lessons: [],
    };

    try {
      const res = await fetch(
        isEditing ? `/api/admin/projects/${projectId}` : "/api/admin/projects",
        {
          method: isEditing ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (!data.success) {
        toast.error(data.message ?? "Something went wrong.");
        if (data.errors) setFieldErrors(data.errors);
        return;
      }

      toast.success(isEditing ? "Project updated." : "Project created.");
      router.push("/admin/projects");
      router.refresh();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="pb-24">
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main column */}
        <div className="space-y-8 lg:col-span-2">
          <Section
            icon={FileText}
            title="Content"
            description="The core details visitors will read."
            gradient="from-violet-500 to-purple-600"
          >
            <Field label="Title" error={fieldErrors.title?.[0]}>
              <Input
                required
                value={form.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="E.g. Portfolio CMS"
              />
            </Field>

            <Field
              label="Slug"
              hint="Used in the project's URL — lowercase, no spaces."
              error={fieldErrors.slug?.[0]}
            >
              <Input
                required
                className="font-mono text-sm"
                value={form.slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  update("slug", e.target.value);
                }}
              />
            </Field>

            <Field
              label="Excerpt"
              hint={`${form.excerpt.length}/250 — shown on project cards.`}
              error={fieldErrors.excerpt?.[0]}
            >
              <Textarea
                value={form.excerpt}
                onChange={(e) => update("excerpt", e.target.value)}
                maxLength={250}
                rows={2}
              />
            </Field>

            <Field label="Description" error={fieldErrors.description?.[0]}>
              <Textarea
                required
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                rows={3}
              />
            </Field>

            <Field
              label="Full Description"
              hint="Longer write-up for a dedicated project page."
            >
              <Textarea
                value={form.fullDescription}
                onChange={(e) => update("fullDescription", e.target.value)}
                rows={5}
              />
            </Field>
          </Section>

          <Section
            icon={Link2}
            title="Links"
            description="Where people can see the project in action."
            gradient="from-orange-400 to-pink-500"
          >
            <div className="grid gap-5 sm:grid-cols-3">
              <Field label="GitHub">
                <Input
                  value={form.githubUrl}
                  onChange={(e) => update("githubUrl", e.target.value)}
                  placeholder="https://github.com/..."
                />
              </Field>

              <Field label="Live Site">
                <Input
                  value={form.liveUrl}
                  onChange={(e) => update("liveUrl", e.target.value)}
                  placeholder="https://..."
                />
              </Field>

              <Field label="Case Study">
                <Input
                  value={form.caseStudyUrl}
                  onChange={(e) => update("caseStudyUrl", e.target.value)}
                  placeholder="https://..."
                />
              </Field>
            </div>
          </Section>
        </div>

        {/* Sidebar column */}
        <div className="space-y-8">
          <Section
            icon={ImageIcon}
            title="Cover Image"
            gradient="from-emerald-400 to-teal-500"
          >
            {form.image ? (
              <div className="group relative overflow-hidden rounded-2xl">
                <Image
                  src={form.image}
                  alt="Project preview"
                  width={480}
                  height={270}
                  className="h-44 w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/20" />
                <button
                  type="button"
                  onClick={() => update("image", "")}
                  className="absolute right-2 top-2 rounded-full bg-black/60 p-1.5 text-white opacity-0 backdrop-blur transition group-hover:opacity-100 hover:bg-black/80"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <label
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragActive(true);
                }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
                className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed p-8 text-center transition-all duration-300 ${
                  dragActive
                    ? "scale-[1.02] border-primary bg-primary/5"
                    : "border-border/60 bg-background/40 hover:border-primary/40 hover:bg-primary/5"
                }`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white shadow-lg shadow-primary/20 transition-transform duration-300 group-hover:scale-105">
                  {uploading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <ImagePlus className="h-5 w-5" />
                  )}
                </div>

                <span className="text-sm font-medium">
                  {uploading ? "Uploading..." : "Drop an image or click"}
                </span>

                <span className="text-xs text-muted-foreground">
                  JPG, PNG, WEBP or GIF · up to 5MB
                </span>

                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  className="hidden"
                  disabled={uploading}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload(file);
                    e.target.value = "";
                  }}
                />
              </label>
            )}
            {fieldErrors.image?.[0] && (
              <p className="mt-2 text-xs text-destructive">
                {fieldErrors.image[0]}
              </p>
            )}
          </Section>

          <Section
            icon={SlidersHorizontal}
            title="Settings"
            gradient="from-fuchsia-500 to-violet-600"
          >
            <Field label="Category">
              <Select
                value={form.category}
                onValueChange={(v) =>
                  update("category", v as FormState["category"])
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full Stack">Full Stack</SelectItem>
                  <SelectItem value="HTML & CSS">HTML & CSS</SelectItem>
                  <SelectItem value="React">React</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            <Field label="Status">
              <Select
                value={form.status}
                onValueChange={(v) =>
                  update("status", v as FormState["status"])
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Live">Live</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Year">
                <Input
                  type="number"
                  value={form.year}
                  onChange={(e) => update("year", Number(e.target.value))}
                />
              </Field>

              <Field label="Role">
                <Input
                  value={form.role}
                  onChange={(e) => update("role", e.target.value)}
                  placeholder="E.g. Solo dev"
                />
              </Field>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-border/60 bg-background/40 p-4">
              <div className="flex items-center gap-2.5">
                <Star className="h-4 w-4 text-amber-500" />
                <div>
                  <p className="text-sm font-medium">Featured</p>
                  <p className="text-xs text-muted-foreground">
                    Show at the top of your work.
                  </p>
                </div>
              </div>

              <Switch
                checked={form.featured}
                onCheckedChange={(checked) => update("featured", checked)}
              />
            </div>
          </Section>
        </div>
      </div>

      {/* Sticky save bar */}
      <div className="sticky bottom-6 z-20 mt-8 flex justify-end">
        <div className="flex items-center gap-3 rounded-2xl border border-border/60 bg-card p-3 shadow-lg">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/projects")}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={saving || uploading}
            className="gap-2 bg-primary text-white shadow-lg shadow-primary/20 hover:opacity-90"
          >
            {saving && <Loader2 className="h-4 w-4 animate-spin" />}
            {isEditing ? "Save Changes" : "Create Project"}
          </Button>
        </div>
      </div>
    </form>
  );
}

function Section({
  icon: Icon,
  title,
  description,
  gradient,
  children,
}: {
  icon: React.ElementType;
  title: string;
  description?: string;
  gradient: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-border/60 bg-card p-7 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-lg ${gradient}`}
        >
          <Icon className="h-4.5 w-4.5" />
        </div>

        <div>
          <h2 className="font-semibold leading-tight tracking-tight">
            {title}
          </h2>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
      </div>

      <div className="space-y-5">{children}</div>
    </div>
  );
}

function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium">{label}</label>
      {children}
      {hint && !error && (
        <p className="mt-1.5 text-xs text-muted-foreground">{hint}</p>
      )}
      {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
    </div>
  );
}
