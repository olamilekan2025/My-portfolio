import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";
import { ProjectSchema } from "@/lib/validations/project";
import { z } from "zod";

interface Context {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: Context) {
  try {
    await connectDB();

    const { id } = await params;
    const project = await Project.findById(id).lean();

    if (!project) {
      return NextResponse.json(
        { success: false, message: "Project not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, project });
  } catch (error) {
    console.error("GET /api/admin/projects/[id] error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to load project." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest, { params }: Context) {
  try {
    await connectDB();

    const { id } = await params;
    const body = await request.json();
    const data = ProjectSchema.parse(body);

    const existing = await Project.findOne({
      slug: data.slug,
      _id: { $ne: id },
    });

    if (existing) {
      return NextResponse.json(
        { success: false, message: "A project with this slug already exists." },
        { status: 400 }
      );
    }

    const project = await Project.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!project) {
      return NextResponse.json(
        { success: false, message: "Project not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, project });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed.",
          errors: error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    console.error("PATCH /api/admin/projects/[id] error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to update project." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: Context) {
  try {
    await connectDB();

    const { id } = await params;
    const deleted = await Project.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Project not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/admin/projects/[id] error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to delete project." },
      { status: 500 }
    );
  }
}