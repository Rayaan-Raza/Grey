import { NextResponse } from "next/server";
import {
  createWorkshop,
  listAllWorkshops,
  listPublishedWorkshops,
  registerForWorkshop,
} from "@/lib/workshops";

export async function GET(request: Request) {
  try {
    const scope = new URL(request.url).searchParams.get("scope");
    if (scope === "admin") {
      const workshops = await listAllWorkshops();
      return NextResponse.json({ workshops });
    }
    const workshops = await listPublishedWorkshops();
    return NextResponse.json({ workshops });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load workshops";
    const status =
      message === "Forbidden" || message === "Not authenticated" ? 403 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      action?: "register" | "create";
      workshopId?: string;
      title?: string;
      slug?: string;
      description?: string;
      starts_at?: string;
      ends_at?: string;
      capacity?: number;
      status?: "draft" | "published" | "archived";
    };

    if (body.action === "register") {
      if (!body.workshopId) {
        return NextResponse.json(
          { error: "workshopId is required" },
          { status: 400 },
        );
      }
      const registration = await registerForWorkshop(body.workshopId);
      return NextResponse.json({ registration }, { status: 201 });
    }

    if (!body.title || !body.slug) {
      return NextResponse.json(
        { error: "title and slug are required" },
        { status: 400 },
      );
    }

    const workshop = await createWorkshop({
      title: body.title,
      slug: body.slug,
      description: body.description,
      starts_at: body.starts_at,
      ends_at: body.ends_at,
      capacity: body.capacity,
      status: body.status,
    });
    return NextResponse.json({ workshop }, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Workshop action failed";
    const status =
      message === "Forbidden" || message === "Not authenticated" ? 403 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
