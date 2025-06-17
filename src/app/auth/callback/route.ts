import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const redirectTo = requestUrl.searchParams.get("redirectTo") ?? "/dashboard";

  if (code) {
    const supabase = createRouteHandlerClient({ cookies });

    try {
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        console.error("Error exchanging code for session:", error);
        return NextResponse.redirect(
          `${requestUrl.origin}/sign-in?error=auth_error`
        );
      }

      if (data.user) {
        // Check if profile exists for this user
        const existingProfile = await prisma.profile.findUnique({
          where: { user_id: data.user.id },
        });

        // Create profile if it doesn't exist (fallback for sign-up)
        if (!existingProfile) {
          try {
            await prisma.profile.create({
              data: {
                user_id: data.user.id,
                firstName: "",
                lastName: "",
                client_type: "Individual",
              },
            });
          } catch (profileError) {
            console.error("Error creating profile:", profileError);
            // Continue even if profile creation fails - user can create it later
          }
        }
      }

      return NextResponse.redirect(`${requestUrl.origin}${redirectTo}`);
    } catch (error) {
      console.error("Unexpected error in auth callback:", error);
      return NextResponse.redirect(
        `${requestUrl.origin}/sign-in?error=callback_error`
      );
    }
  }

  // No code parameter, redirect to sign-in
  return NextResponse.redirect(`${requestUrl.origin}/sign-in`);
}
