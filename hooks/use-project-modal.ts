"use client";

import { useState } from "react";

import { Project } from "@/types/project";

export function useProjectModal() {
  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null);

  const open = (project: Project) =>
    setSelectedProject(project);

  const close = () =>
    setSelectedProject(null);

  return {
    selectedProject,

    open,

    close,
  };
}