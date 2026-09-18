import { NextResponse } from "next/server";
import { getMyProfile, updateMyProfile } from "@/lib/courses";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const profile = await getMyProfile();
    return NextResponse.json({
      profile,
      email: user.email ?? null,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load profile";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = (await request.json()) as {
      full_name?: string;
      phone?: string;
      institution?: string;
      specialty?: string;
      license_number?: string;
      avatar_url?: string;
    };

    const profile = await updateMyProfile(body);
    return NextResponse.json({ profile });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to update profile";
    const status = message === "Not authenticated" ? 401 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
