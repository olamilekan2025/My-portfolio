"use client";

import { useMemo, useState } from "react";

import { Project } from "@/types/project";
import {
  filterProjects,
  searchProjects,
} from "@/lib/project-utils";

export function useProjectFilter(
  projects: Project[]
) {
  const [query, setQuery] = useState("");

  const [category, setCategory] =
    useState("All");

  const filteredProjects = useMemo(() => {
    const searched = searchProjects(
      projects,
      query
    );

    return filterProjects(
      searched,
      category
    );
  }, [projects, query, category]);

  return {
    query,

    setQuery,

    category,

    setCategory,

    filteredProjects,
  };
}