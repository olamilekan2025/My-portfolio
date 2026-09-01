"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  CheckCircle2,
  ImageIcon,
  Loader2,
  Trash2,
  Upload,
  X,
} from "lucide-react";

interface HeroImage {
  id: string;
  title: string;
  alt: string;
  imageUrl: string;
  publicId: string;
}

export default function AdminHeroPage() {
  const [hero, setHero] =
    useState<HeroImage | null>(null);

  const [file, setFile] =
    useState<File | null>(null);

  const [title, setTitle] =
    useState("Portfolio Hero");

  const [alt, setAlt] =
    useState(
      "Oladunjoye Abduljeleel — Full Stack Developer"
    );

  const [preview, setPreview] =
    useState<string | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [uploading, setUploading] =
    useState(false);

  const [deleting, setDeleting] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  /* =======================================================
     LOAD HERO
  ======================================================= */

  async function loadHero() {
    try {
      setLoading(true);

      const response =
        await fetch("/api/hero", {
          cache: "no-store",
        });

      if (!response.ok) {
        throw new Error(
          "Failed to load hero."
        );
      }

      const data =
        await response.json();

      setHero(data.hero ?? null);

      if (data.hero) {
        setTitle(
          data.hero.title ||
            "Portfolio Hero"
        );

        setAlt(
          data.hero.alt ||
            "Oladunjoye Abduljeleel — Full Stack Developer"
        );
      }
    } catch (err) {
      console.error(err);

      setError(
        "Unable to load the current hero image."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadHero();
  }, []);

  /* =======================================================
     FILE CHANGE
  ======================================================= */

  function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const selected =
      event.target.files?.[0];

    if (!selected) {
      return;
    }

    setError("");
    setMessage("");

    if (
      !selected.type.startsWith(
        "image/"
      )
    ) {
      setError(
        "Please select an image file."
      );

      return;
    }

    if (
      selected.size >
      10 * 1024 * 1024
    ) {
      setError(
        "Image must be smaller than 10MB."
      );

      return;
    }

    setFile(selected);

    const objectUrl =
      URL.createObjectURL(selected);

    setPreview(objectUrl);
  }

  /* =======================================================
     UPLOAD
  ======================================================= */

  async function handleUpload(
    event: React.FormEvent
  ) {
    event.preventDefault();

    setError("");
    setMessage("");

    if (!file) {
      setError(
        "Please select an image first."
      );

      return;
    }

    try {
      setUploading(true);

      const formData =
        new FormData();

      formData.append(
        "image",
        file
      );

      formData.append(
        "title",
        title
      );

      formData.append(
        "alt",
        alt
      );

      const response =
        await fetch("/api/hero", {
          method: "POST",
          body: formData,
        });

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Upload failed."
        );
      }

      setHero(data.hero);

      setFile(null);
      setPreview(null);

      setMessage(
        "Hero image updated successfully."
      );

      /*
       * Reset file input
       */

      const input =
        document.getElementById(
          "hero-image"
        ) as HTMLInputElement | null;

      if (input) {
        input.value = "";
      }
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to upload image."
      );
    } finally {
      setUploading(false);
    }
  }

  /* =======================================================
     DELETE
  ======================================================= */

  async function handleDelete() {
    const confirmed =
      window.confirm(
        "Are you sure you want to remove the current hero image?"
      );

    if (!confirmed) {
      return;
    }

    try {
      setDeleting(true);

      setError("");
      setMessage("");

      const response =
        await fetch("/api/hero", {
          method: "DELETE",
        });

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to delete hero."
        );
      }

      setHero(null);

      setMessage(
        "Hero image removed successfully."
      );
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to delete hero image."
      );
    } finally {
      setDeleting(false);
    }
  }

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <Loader2 className="h-7 w-7 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      {/* =================================================
          HEADER
      ================================================= */}

      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <ImageIcon className="h-5 w-5" />
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Hero Manager
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Manage the image displayed in
              the homepage hero section.
            </p>
          </div>
        </div>
      </div>

      {/* =================================================
          SUCCESS / ERROR
      ================================================= */}

      {message && (
        <div className="flex items-center gap-2 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-600">
          <CheckCircle2 className="h-4 w-4" />
          {message}
        </div>
      )}

      {error && (
        <div className="rounded-2xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        {/* =================================================
            CURRENT HERO
        ================================================= */}

        <section className="rounded-3xl border border-border/60 bg-card p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">
                Current Hero
              </h2>

              <p className="mt-1 text-xs text-muted-foreground">
                This image is currently displayed
                on your homepage.
              </p>
            </div>

            {hero && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Active
              </span>
            )}
          </div>

          {hero ? (
            <>
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border/60 bg-muted">
                <Image
                  src={hero.imageUrl}
                  alt={hero.alt}
                  fill
                  sizes="(max-width: 1280px) 100vw, 70vw"
                  className="object-contain"
                  priority
                />
              </div>

              <div className="mt-5 flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="truncate font-semibold">
                    {hero.title}
                  </p>

                  <p className="mt-1 truncate text-xs text-muted-foreground">
                    {hero.alt}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={deleting}
                  className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-destructive/20 px-4 py-2 text-sm font-medium text-destructive transition hover:bg-destructive/10 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {deleting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}

                  Remove
                </button>
              </div>
            </>
          ) : (
            <div className="flex aspect-[4/3] flex-col items-center justify-center rounded-3xl border border-dashed border-border/70 bg-muted/20 text-center">
              <ImageIcon className="h-10 w-10 text-muted-foreground/50" />

              <p className="mt-4 font-medium">
                No hero image
              </p>

              <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                Upload an image to display it
                on your homepage.
              </p>
            </div>
          )}
        </section>

        {/* =================================================
            UPLOAD
        ================================================= */}

        <section className="rounded-3xl border border-border/60 bg-card p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg font-semibold">
              Upload New Hero
            </h2>

            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              Uploading a new image automatically
              replaces the current hero image.
            </p>
          </div>

          <form
            onSubmit={handleUpload}
            className="space-y-5"
          >
            {/* FILE */}

            <div>
              <label
                htmlFor="hero-image"
                className="mb-2 block text-sm font-medium"
              >
                Hero Image
              </label>

              <label
                htmlFor="hero-image"
                className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-border/80 bg-muted/20 px-5 py-8 text-center transition hover:border-primary/50 hover:bg-primary/5"
              >
                <Upload className="h-7 w-7 text-muted-foreground transition group-hover:text-primary" />

                <span className="mt-3 text-sm font-medium">
                  {file
                    ? file.name
                    : "Choose an image"}
                </span>

                <span className="mt-1 text-xs text-muted-foreground">
                  PNG, JPG, WEBP up to 10MB
                </span>

                <input
                  id="hero-image"
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/avif"
                  onChange={
                    handleFileChange
                  }
                  className="sr-only"
                />
              </label>
            </div>

            {/* PREVIEW */}

            {preview && (
              <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-muted">
                <div className="relative aspect-video">
                  <Image
                    src={preview}
                    alt="Selected hero preview"
                    fill
                    sizes="500px"
                    className="object-contain"
                  />

                  <button
                    type="button"
                    onClick={() => {
                      setFile(null);
                      setPreview(null);

                      const input =
                        document.getElementById(
                          "hero-image"
                        ) as HTMLInputElement | null;

                      if (input) {
                        input.value = "";
                      }
                    }}
                    className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-background/90 shadow-sm backdrop-blur"
                    aria-label="Remove selected image"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* TITLE */}

            <div>
              <label
                htmlFor="hero-title"
                className="mb-2 block text-sm font-medium"
              >
                Title
              </label>

              <input
                id="hero-title"
                value={title}
                onChange={(event) =>
                  setTitle(
                    event.target.value
                  )
                }
                placeholder="Portfolio Hero"
                className="h-11 w-full rounded-xl border border-border/70 bg-background px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </div>

            {/* ALT */}

            <div>
              <label
                htmlFor="hero-alt"
                className="mb-2 block text-sm font-medium"
              >
                Alt Text
              </label>

              <input
                id="hero-alt"
                value={alt}
                onChange={(event) =>
                  setAlt(
                    event.target.value
                  )
                }
                placeholder="Describe the hero image"
                className="h-11 w-full rounded-xl border border-border/70 bg-background px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </div>

            {/* SUBMIT */}

            <button
              type="submit"
              disabled={
                uploading || !file
              }
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:-translate-y-0.5 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {uploading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  Upload Hero Image
                </>
              )}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}