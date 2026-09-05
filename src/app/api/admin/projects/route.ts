import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";
import { ProjectSchema } from "@/lib/validations/project";
import { z } from "zod";

export async function GET() {
  try {
    await connectDB();
    const projects = await Project.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, projects });
  } catch (error) {
    console.error("GET /api/admin/projects error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to load projects." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();
    const data = ProjectSchema.parse(body);

    const exists = await Project.findOne({ slug: data.slug });

    if (exists) {
      return NextResponse.json(
        { success: false, message: "A project with this slug already exists." },
        { status: 400 }
      );
    }

    const project = await Project.create(data);

    // 🔑 Public page cache was stale until this — force it to refresh
    revalidatePath("/");

    return NextResponse.json({ success: true, project }, { status: 201 });
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

    console.error("POST /api/admin/projects error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create project." },
      { status: 500 }
    );
  }
}