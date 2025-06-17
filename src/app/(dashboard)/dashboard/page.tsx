"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Users,
  Building2,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Clock,
  Eye,
  Bell,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const kpiData = [
  {
    title: "Usuarios Activos",
    value: "12,847",
    change: "+12.5%",
    trend: "up",
    icon: Users,
    description: "DAU: 3,421 | MAU: 12,847",
  },
  {
    title: "Propiedades Activas",
    value: "2,156",
    change: "+8.2%",
    trend: "up",
    icon: Building2,
    description: "Nuevas hoy: 23",
  },
  {
    title: "Transacciones",
    value: "847",
    change: "+15.3%",
    trend: "up",
    icon: DollarSign,
    description: "Este mes",
  },
  {
    title: "Revenue",
    value: "$45,230",
    change: "+22.1%",
    trend: "up",
    icon: TrendingUp,
    description: "Comisiones del mes",
  },
];

const userGrowthData = [
  { name: "Ene", usuarios: 8400, propiedades: 1200 },
  { name: "Feb", usuarios: 9200, propiedades: 1350 },
  { name: "Mar", usuarios: 10100, propiedades: 1480 },
  { name: "Abr", usuarios: 11200, propiedades: 1650 },
  { name: "May", usuarios: 12100, propiedades: 1890 },
  { name: "Jun", usuarios: 12847, propiedades: 2156 },
];

const cityData = [
  { name: "La Paz", value: 35, color: "#0088FE" },
  { name: "Santa Cruz", value: 28, color: "#00C49F" },
  { name: "Cochabamba", value: 22, color: "#FFBB28" },
  { name: "Sucre", value: 8, color: "#FF8042" },
  { name: "Otros", value: 7, color: "#8884d8" },
];

const alerts = [
  {
    type: "critical",
    message: "Sistema de pagos con latencia alta",
    time: "Hace 5 min",
    icon: AlertTriangle,
  },
  {
    type: "warning",
    message: "15 propiedades pendientes de moderación",
    time: "Hace 15 min",
    icon: Clock,
  },
  {
    type: "info",
    message: "Nuevo reporte de usuario recibido",
    time: "Hace 30 min",
    icon: Bell,
  },
];

export default function DashboardPage() {
  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Overview</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="ml-auto px-4">
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4 mr-2" />
            Notificaciones
          </Button>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        {/* KPI Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {kpiData.map((kpi) => (
            <Card key={kpi.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {kpi.title}
                </CardTitle>
                <kpi.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpi.value}</div>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant={kpi.trend === "up" ? "default" : "destructive"}
                  >
                    {kpi.change}
                  </Badge>
                  <p className="text-xs text-muted-foreground">
                    {kpi.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          {/* Gráfico de Crecimiento */}
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Crecimiento de Usuarios y Propiedades</CardTitle>
              <CardDescription>
                Evolución mensual de la plataforma
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="usuarios"
                    stroke="#8884d8"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="propiedades"
                    stroke="#82ca9d"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Distribución por Ciudades */}
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Distribución por Ciudades</CardTitle>
              <CardDescription>
                Porcentaje de propiedades por ubicación
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={cityData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {cityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Alertas y Notificaciones */}
          <Card>
            <CardHeader>
              <CardTitle>Alertas del Sistema</CardTitle>
              <CardDescription>
                Notificaciones importantes que requieren atención
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.map((alert, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 p-3 border rounded-lg"
                  >
                    <alert.icon
                      className={`h-5 w-5 ${
                        alert.type === "critical"
                          ? "text-red-500"
                          : alert.type === "warning"
                            ? "text-yellow-500"
                            : "text-blue-500"
                      }`}
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{alert.message}</p>
                      <p className="text-xs text-muted-foreground">
                        {alert.time}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Ver
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Acciones Rápidas */}
          <Card>
            <CardHeader>
              <CardTitle>Acciones Rápidas</CardTitle>
              <CardDescription>
                Tareas frecuentes del administrador
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                <Button className="justify-start" variant="outline">
                  <Building2 className="mr-2 h-4 w-4" />
                  Moderar Propiedades (15 pendientes)
                </Button>
                <Button className="justify-start" variant="outline">
                  <Users className="mr-2 h-4 w-4" />
                  Verificar Usuarios (8 solicitudes)
                </Button>
                <Button className="justify-start" variant="outline">
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Revisar Reportes (3 nuevos)
                </Button>
                <Button className="justify-start" variant="outline">
                  <Eye className="mr-2 h-4 w-4" />
                  Generar Reporte Semanal
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarInset>
  );
}
