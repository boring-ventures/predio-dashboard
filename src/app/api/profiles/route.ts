import { NextRequest, NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

// GET: Fetch all profiles with optional filtering
export async function GET(req: NextRequest) {
  try {
    // Check authentication
    const supabase = createRouteHandlerClient({ cookies });
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError || !session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Get query parameters for filtering
    const { searchParams } = new URL(req.url);
    const client_type = searchParams.get("client_type");

    // Build the where clause for filtering
    const whereClause: Prisma.ProfileWhereInput = {};

    if (client_type) whereClause.client_type = client_type;

    // Fetch profiles from the database
    const profiles = await prisma.profile.findMany({
      where: whereClause,
      orderBy: {
        created_at: "desc",
      },
    });

    return NextResponse.json({ profiles });
  } catch (error) {
    console.error("Error fetching profiles:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
