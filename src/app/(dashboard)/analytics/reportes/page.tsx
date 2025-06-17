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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Users,
  Building2,
  DollarSign,
  Download,
  CalendarIcon,
  PieChartIcon,
  Activity,
} from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

// Datos para gráficos
const userGrowthData = [
  { mes: "Jul", usuarios: 8400, activos: 6200, nuevos: 420 },
  { mes: "Ago", usuarios: 9200, activos: 6800, nuevos: 800 },
  { mes: "Sep", usuarios: 10100, activos: 7400, nuevos: 900 },
  { mes: "Oct", usuarios: 11200, activos: 8100, nuevos: 1100 },
  { mes: "Nov", usuarios: 12100, activos: 8700, nuevos: 900 },
  { mes: "Dic", usuarios: 12847, activos: 9200, nuevos: 747 },
];

const propertyData = [
  { mes: "Jul", publicadas: 180, aprobadas: 145, rechazadas: 35, vendidas: 42 },
  { mes: "Ago", publicadas: 220, aprobadas: 185, rechazadas: 35, vendidas: 48 },
  { mes: "Sep", publicadas: 195, aprobadas: 160, rechazadas: 35, vendidas: 45 },
  { mes: "Oct", publicadas: 240, aprobadas: 200, rechazadas: 40, vendidas: 55 },
  { mes: "Nov", publicadas: 280, aprobadas: 235, rechazadas: 45, vendidas: 62 },
  { mes: "Dic", publicadas: 320, aprobadas: 270, rechazadas: 50, vendidas: 68 },
];

const revenueData = [
  { mes: "Jul", comisiones: 12500, premium: 3200, total: 15700 },
  { mes: "Ago", comisiones: 14200, premium: 3800, total: 18000 },
  { mes: "Sep", comisiones: 13800, premium: 3600, total: 17400 },
  { mes: "Oct", comisiones: 16500, premium: 4200, total: 20700 },
  { mes: "Nov", comisiones: 18200, premium: 4800, total: 23000 },
  { mes: "Dic", comisiones: 21500, premium: 5400, total: 26900 },
];

const cityDistribution = [
  { name: "La Paz", value: 35, color: "#0088FE", properties: 756 },
  { name: "Santa Cruz", value: 28, color: "#00C49F", properties: 604 },
  { name: "Cochabamba", value: 22, color: "#FFBB28", properties: 475 },
  { name: "Sucre", value: 8, color: "#FF8042", properties: 172 },
  { name: "Otros", value: 7, color: "#8884d8", properties: 149 },
];

const systemMetrics = [
  {
    metric: "Tiempo de respuesta promedio",
    value: "245ms",
    status: "good",
    trend: "-12ms",
  },
  {
    metric: "Uptime del sistema",
    value: "99.8%",
    status: "excellent",
    trend: "+0.1%",
  },
  {
    metric: "Usuarios concurrentes pico",
    value: "1,247",
    status: "good",
    trend: "+156",
  },
  {
    metric: "Transacciones por segundo",
    value: "45.2",
    status: "good",
    trend: "+3.1",
  },
  {
    metric: "Uso de almacenamiento",
    value: "67%",
    status: "warning",
    trend: "+5%",
  },
  {
    metric: "Errores por hora",
    value: "2.3",
    status: "good",
    trend: "-0.8",
  },
];

const reportesDisponibles = [
  {
    id: "RPT-001",
    nombre: "Reporte de Usuarios Mensual",
    descripcion: "Estadísticas completas de usuarios, registros y actividad",
    categoria: "Usuarios",
    ultimaGeneracion: "2024-01-15 09:30",
    tamaño: "2.4 MB",
    formato: "PDF/Excel",
  },
  {
    id: "RPT-002",
    nombre: "Análisis de Propiedades",
    descripcion:
      "Métricas de propiedades publicadas, vendidas y tendencias de mercado",
    categoria: "Propiedades",
    ultimaGeneracion: "2024-01-15 08:15",
    tamaño: "3.1 MB",
    formato: "PDF/Excel",
  },
  {
    id: "RPT-003",
    nombre: "Reporte Financiero",
    descripcion: "Ingresos, comisiones, suscripciones y análisis de revenue",
    categoria: "Finanzas",
    ultimaGeneracion: "2024-01-15 07:45",
    tamaño: "1.8 MB",
    formato: "PDF/Excel",
  },
  {
    id: "RPT-004",
    nombre: "Métricas de Sistema",
    descripcion: "Performance, uptime, errores y métricas técnicas",
    categoria: "Sistema",
    ultimaGeneracion: "2024-01-15 10:00",
    tamaño: "956 KB",
    formato: "PDF/Excel",
  },
];

export default function ReportesPage() {
  const [fechaInicio, setFechaInicio] = useState<Date | undefined>(undefined);
  const [fechaFin, setFechaFin] = useState<Date | undefined>(undefined);
  const [tipoReporte, setTipoReporte] = useState("usuarios");
  const [formatoReporte, setFormatoReporte] = useState("pdf");

  const generarReporte = () => {
    console.log("Generando reporte:", {
      tipoReporte,
      formatoReporte,
      fechaInicio,
      fechaFin,
    });
    // Aquí iría la lógica para generar el reporte
  };

  const descargarReporte = (reporteId: string) => {
    console.log("Descargando reporte:", reporteId);
    // Aquí iría la lógica para descargar
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "text-green-600";
      case "good":
        return "text-blue-600";
      case "warning":
        return "text-yellow-600";
      case "critical":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "excellent":
        return <Activity className="h-4 w-4 text-green-500" />;
      case "good":
        return <Activity className="h-4 w-4 text-blue-500" />;
      case "warning":
        return <Activity className="h-4 w-4 text-yellow-500" />;
      case "critical":
        return <Activity className="h-4 w-4 text-red-500" />;
      default:
        return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/analytics">Analytics</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Reportes</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="ml-auto px-4 flex gap-2">
          <Select defaultValue="30d">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Últimos 7 días</SelectItem>
              <SelectItem value="30d">Últimos 30 días</SelectItem>
              <SelectItem value="90d">Últimos 90 días</SelectItem>
              <SelectItem value="1y">Último año</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar Todo
          </Button>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        {/* KPIs principales */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Usuarios Totales
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12,847</div>
              <p className="text-xs text-muted-foreground">
                +12.5% vs mes anterior
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Propiedades Activas
              </CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,156</div>
              <p className="text-xs text-muted-foreground">
                +8.2% vs mes anterior
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Revenue Total
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$26,900</div>
              <p className="text-xs text-muted-foreground">
                +22.1% vs mes anterior
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Tasa de Conversión
              </CardTitle>
              <PieChartIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.2%</div>
              <p className="text-xs text-muted-foreground">
                +0.4% vs mes anterior
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="metricas" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="metricas">Métricas del Sistema</TabsTrigger>
            <TabsTrigger value="usuarios">Análisis de Usuarios</TabsTrigger>
            <TabsTrigger value="propiedades">
              Análisis de Propiedades
            </TabsTrigger>
            <TabsTrigger value="reportes">Generar Reportes</TabsTrigger>
          </TabsList>

          <TabsContent value="metricas" className="space-y-4">
            {/* Métricas del sistema */}
            <Card>
              <CardHeader>
                <CardTitle>Estado del Sistema en Tiempo Real</CardTitle>
                <CardDescription>
                  Métricas técnicas y de rendimiento de la plataforma
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {systemMetrics.map((metric, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(metric.status)}
                        <div>
                          <div className="font-medium">{metric.metric}</div>
                          <div className="text-sm text-muted-foreground">
                            Tendencia: {metric.trend}
                          </div>
                        </div>
                      </div>
                      <div
                        className={`text-lg font-bold ${getStatusColor(
                          metric.status
                        )}`}
                      >
                        {metric.value}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Distribución por ciudades */}
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Distribución Geográfica</CardTitle>
                  <CardDescription>Propiedades por ciudad</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={cityDistribution}
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
                        {cityDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Detalles por Ciudad</CardTitle>
                  <CardDescription>
                    Número de propiedades activas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {cityDistribution.map((city, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: city.color }}
                          />
                          <div>
                            <div className="font-medium">{city.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {city.value}% del total
                            </div>
                          </div>
                        </div>
                        <div className="text-lg font-bold">
                          {city.properties}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="usuarios" className="space-y-4">
            {/* Análisis de usuarios */}
            <Card>
              <CardHeader>
                <CardTitle>Crecimiento de Usuarios - Últimos 6 meses</CardTitle>
                <CardDescription>
                  Evolución de registros y actividad de usuarios
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={userGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="usuarios"
                      stroke="#8884d8"
                      strokeWidth={2}
                      name="Total Usuarios"
                    />
                    <Line
                      type="monotone"
                      dataKey="activos"
                      stroke="#82ca9d"
                      strokeWidth={2}
                      name="Usuarios Activos"
                    />
                    <Line
                      type="monotone"
                      dataKey="nuevos"
                      stroke="#ffc658"
                      strokeWidth={2}
                      name="Nuevos Usuarios"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Métricas de engagement */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    DAU (Usuarios Activos Diarios)
                  </CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3,421</div>
                  <p className="text-xs text-muted-foreground">
                    26.6% del total de usuarios
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Tiempo Promedio de Sesión
                  </CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8.5min</div>
                  <p className="text-xs text-muted-foreground">
                    +2.1min vs mes anterior
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Tasa de Retención 7d
                  </CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">68.2%</div>
                  <p className="text-xs text-muted-foreground">
                    +5.3% vs mes anterior
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="propiedades" className="space-y-4">
            {/* Análisis de propiedades */}
            <Card>
              <CardHeader>
                <CardTitle>
                  Actividad de Propiedades - Últimos 6 meses
                </CardTitle>
                <CardDescription>
                  Propiedades publicadas, aprobadas, rechazadas y vendidas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={propertyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" />
                    <YAxis />
                    <Tooltip />
                    <Bar
                      dataKey="publicadas"
                      fill="#8884d8"
                      name="Publicadas"
                    />
                    <Bar dataKey="aprobadas" fill="#82ca9d" name="Aprobadas" />
                    <Bar
                      dataKey="rechazadas"
                      fill="#ff7c7c"
                      name="Rechazadas"
                    />
                    <Bar dataKey="vendidas" fill="#ffc658" name="Vendidas" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Revenue analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Evolución de Ingresos - Últimos 6 meses</CardTitle>
                <CardDescription>
                  Comisiones y suscripciones premium
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="comisiones"
                      stackId="1"
                      stroke="#8884d8"
                      fill="#8884d8"
                    />
                    <Area
                      type="monotone"
                      dataKey="premium"
                      stackId="1"
                      stroke="#82ca9d"
                      fill="#82ca9d"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reportes" className="space-y-4">
            {/* Generador de reportes */}
            <Card>
              <CardHeader>
                <CardTitle>Generar Nuevo Reporte</CardTitle>
                <CardDescription>
                  Crea reportes personalizados con los datos que necesites
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Tipo de Reporte
                    </label>
                    <Select value={tipoReporte} onValueChange={setTipoReporte}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usuarios">
                          Reporte de Usuarios
                        </SelectItem>
                        <SelectItem value="propiedades">
                          Reporte de Propiedades
                        </SelectItem>
                        <SelectItem value="financiero">
                          Reporte Financiero
                        </SelectItem>
                        <SelectItem value="sistema">
                          Métricas de Sistema
                        </SelectItem>
                        <SelectItem value="completo">
                          Reporte Completo
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Formato</label>
                    <Select
                      value={formatoReporte}
                      onValueChange={setFormatoReporte}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF</SelectItem>
                        <SelectItem value="excel">Excel</SelectItem>
                        <SelectItem value="csv">CSV</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Fecha Inicio</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {fechaInicio
                            ? format(fechaInicio, "PPP", { locale: es })
                            : "Seleccionar fecha"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={fechaInicio}
                          onSelect={setFechaInicio}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Fecha Fin</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {fechaFin
                            ? format(fechaFin, "PPP", { locale: es })
                            : "Seleccionar fecha"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={fechaFin}
                          onSelect={setFechaFin}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div className="mt-4">
                  <Button onClick={generarReporte} className="w-full md:w-auto">
                    <Activity className="mr-2 h-4 w-4" />
                    Generar Reporte
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Reportes disponibles */}
            <Card>
              <CardHeader>
                <CardTitle>Reportes Disponibles</CardTitle>
                <CardDescription>
                  Reportes generados recientemente listos para descargar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Categoría</TableHead>
                      <TableHead>Última Generación</TableHead>
                      <TableHead>Tamaño</TableHead>
                      <TableHead>Formato</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reportesDisponibles.map((reporte) => (
                      <TableRow key={reporte.id}>
                        <TableCell className="font-medium">
                          {reporte.id}
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{reporte.nombre}</div>
                            <div className="text-sm text-muted-foreground">
                              {reporte.descripcion}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{reporte.categoria}</Badge>
                        </TableCell>
                        <TableCell>{reporte.ultimaGeneracion}</TableCell>
                        <TableCell>{reporte.tamaño}</TableCell>
                        <TableCell>{reporte.formato}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => descargarReporte(reporte.id)}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Activity className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SidebarInset>
  );
}
