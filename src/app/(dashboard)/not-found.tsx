"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardNotFound() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to dashboard if someone tries to access the root dashboard route
    router.replace("/dashboard");
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-2 text-sm text-gray-600">Redirecting...</p>
      </div>
    </div>
  );
}
