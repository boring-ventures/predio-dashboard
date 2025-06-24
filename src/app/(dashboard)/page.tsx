import { permanentRedirect } from "next/navigation";

export default function RootDashboardPage() {
  permanentRedirect("/dashboard");
}
