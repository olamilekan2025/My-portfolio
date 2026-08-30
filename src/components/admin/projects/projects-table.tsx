"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Pencil, Trash2, Star, Loader2, FolderOpen, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";

interface Project {
  _id: string;
  title: string;
  slug: string;
  category: string;
  status: string;
  year: number;
  featured: boolean;
}

export function ProjectsTable() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    setLoading(true);

    try {
      const res = await fetch("/api/admin/projects", { cache: "no-store" });
      const data = await res.json();

      if (!data.success) {
        toast.error("Failed to load projects.");
        return;
      }

      setProjects(data.projects);
    } catch {
      toast.error("Something went wrong loading projects.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    setDeletingId(id);

    try {
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!data.success) {
        toast.error("Failed to delete project.");
        return;
      }

      setProjects((prev) => prev.filter((p) => p._id !== id));
      toast.success("Project deleted.");
    } catch {
      toast.error("Something went wrong deleting the project.");
    } finally {
      setDeletingId(null);
    }
  }

  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 rounded-2xl border border-border/60 bg-gradient-to-br from-card via-card to-card/50 p-4 shadow-sm transition-all hover:shadow-md"
          >
            <Skeleton className="h-12 w-12 rounded-xl" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-48 rounded-lg" />
              <Skeleton className="h-3 w-32 rounded-lg" />
            </div>
            <Skeleton className="h-8 w-20 rounded-lg" />
            <Skeleton className="h-8 w-16 rounded-lg" />
            <Skeleton className="h-8 w-8 rounded-lg" />
            <div className="flex gap-2">
              <Skeleton className="h-9 w-9 rounded-lg" />
              <Skeleton className="h-9 w-9 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 rounded-3xl border-2 border-dashed border-border/60 bg-gradient-to-br from-card via-card to-muted/20 p-12 text-center">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-2xl" />
          <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 ring-1 ring-primary/20">
            <FolderOpen className="h-10 w-10 text-primary" />
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold tracking-tight">No projects yet</h3>
          <p className="text-sm text-muted-foreground max-w-xs mx-auto">
            Create your first project to showcase your amazing work.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {projects.map((project, index) => (
        <div
          key={project._id}
          className="group relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-card via-card to-card/50 p-5 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-primary/30"
          style={{
            animationDelay: `${index * 50}ms`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          
          <div className="relative flex items-center gap-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 ring-1 ring-primary/20 transition-all duration-300 group-hover:scale-105 group-hover:ring-primary/30">
              <span className="text-lg font-bold text-primary">
                {project.title.charAt(0).toUpperCase()}
              </span>
            </div>

            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-base tracking-tight truncate">
                  {project.title}
                </h3>
                {project.featured && (
                  <div className="flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 px-2 py-0.5 ring-1 ring-amber-500/20">
                    <Sparkles className="h-3 w-3 text-amber-500" />
                    <span className="text-xs font-medium text-amber-600 dark:text-amber-400">
                      Featured
                    </span>
                  </div>
                )}
              </div>
              <p className="text-xs text-muted-foreground truncate font-mono">
                {project.slug}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex flex-col items-end gap-1">
                <Badge
                  className={`font-medium ${
                    project.status === "Live"
                      ? "bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 text-emerald-700 dark:text-emerald-400 ring-1 ring-emerald-500/20 border-emerald-500/20"
                      : project.status === "In Progress"
                      ? "bg-gradient-to-r from-blue-500/10 to-blue-500/5 text-blue-700 dark:text-blue-400 ring-1 ring-blue-500/20 border-blue-500/20"
                      : "bg-gradient-to-r from-slate-500/10 to-slate-500/5 text-slate-700 dark:text-slate-400 ring-1 ring-slate-500/20 border-slate-500/20"
                  }`}
                >
                  {project.status}
                </Badge>
                <span className="text-xs text-muted-foreground font-medium">
                  {project.category}
                </span>
              </div>

              <div className="h-8 w-px bg-border/60" />

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-xl transition-all duration-200 hover:bg-primary/10 hover:text-primary"
                  asChild
                >
                  <Link href={`/admin/projects/${project._id}/edit`}>
                    <Pencil className="h-4 w-4" />
                  </Link>
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-xl text-destructive transition-all duration-200 hover:bg-destructive/10 hover:text-destructive"
                      disabled={deletingId === project._id}
                    >
                      {deletingId === project._id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </AlertDialogTrigger>

                  <AlertDialogContent className="rounded-2xl border-border/60 shadow-2xl">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-xl">Delete project?</AlertDialogTitle>
                      <AlertDialogDescription className="text-base">
                        This will permanently delete &quot;{project.title}&quot;. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter className="gap-2">
                      <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(project._id)}
                        className="rounded-xl bg-destructive text-white hover:bg-destructive/90 shadow-lg shadow-destructive/20"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
