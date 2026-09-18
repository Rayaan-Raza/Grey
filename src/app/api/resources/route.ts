import { NextResponse } from "next/server";
import {
  createResource,
  listAllResources,
  listVisibleResources,
} from "@/lib/resources";

export async function GET(request: Request) {
  try {
    const scope = new URL(request.url).searchParams.get("scope");
    if (scope === "admin") {
      const resources = await listAllResources();
      return NextResponse.json({ resources });
    }
    const resources = await listVisibleResources();
    return NextResponse.json({ resources });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load resources";
    const status =
      message === "Forbidden" || message === "Not authenticated" ? 403 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      title?: string;
      description?: string;
      file_url?: string;
      resource_type?: "document" | "video" | "link" | "other";
      category?: string;
      is_public?: boolean;
      course_id?: string;
      file_size?: string;
    };

    if (!body.title) {
      return NextResponse.json({ error: "title is required" }, { status: 400 });
    }

    const resource = await createResource({
      title: body.title,
      description: body.description,
      file_url: body.file_url,
      resource_type: body.resource_type,
      category: body.category,
      is_public: body.is_public ?? true,
      course_id: body.course_id,
      file_size: body.file_size,
    });

    return NextResponse.json({ resource }, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create resource";
    const status =
      message === "Forbidden" || message === "Not authenticated" ? 403 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
