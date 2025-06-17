import {
  AlertTriangle,
  BarChart3,
  Building2,
  Clock,
  FileText,
  HelpCircle,
  LayoutDashboard,
  Settings,
  Shield,
  UserCheck,
  UserX,
  Users,
} from "lucide-react";
import type { SidebarData } from "../types";

export const sidebarData: SidebarData = {
  user: {
    name: "Admin",
    email: "admin@predio.com",
    avatar: "/avatars/admin.jpg",
  },
  teams: [
    {
      name: "Predio",
      logo: Building2,
      plan: "Dashboard Admin",
    },
  ],
  navGroups: [
    {
      title: "Navegación Principal",
      items: [
        {
          title: "Vista General",
          url: "/dashboard",
          icon: LayoutDashboard,
        },
        {
          title: "Moderación",
          icon: Shield,
          items: [
            {
              title: "Propiedades Pendientes",
              url: "/moderacion/propiedades",
              icon: Building2,
            },
            {
              title: "Reportes de Usuarios",
              url: "/moderacion/reportes",
              icon: AlertTriangle,
            },
            {
              title: "Historial",
              url: "/moderacion/historial",
              icon: Clock,
            },
          ],
        },
        {
          title: "Usuarios",
          icon: Users,
          items: [
            {
              title: "Lista de Usuarios",
              url: "/usuarios/lista",
              icon: Users,
            },
            {
              title: "Usuarios Verificados",
              url: "/usuarios/verificados",
              icon: UserCheck,
            },
            {
              title: "Usuarios Suspendidos",
              url: "/usuarios/suspendidos",
              icon: UserX,
            },
          ],
        },
        {
          title: "Analytics",
          icon: BarChart3,
          items: [
            {
              title: "Reportes",
              url: "/analytics/reportes",
              icon: FileText,
            },
          ],
        },
        {
          title: "Configuración",
          icon: Settings,
          items: [
            {
              title: "Sistema",
              url: "/configuracion/sistema",
              icon: Settings,
            },
          ],
        },
        {
          title: "Soporte",
          url: "/soporte",
          icon: HelpCircle,
        },
      ],
    },
  ],
};
