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
import { Input } from "@/components/ui/input";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Search,
  Filter,
  CalendarIcon,
  Download,
  Eye,
  Check,
  X,
  Shield,
  User,
  Building2,
  MessageSquare,
  Clock,
  FileText,
  Activity,
} from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const historialAcciones = [
  {
    id: "ACT-001",
    tipo: "Aprobación",
    accion: "Propiedad Aprobada",
    descripcion: "Casa en Zona Sur - La Paz aprobada para publicación",
    moderador: "Carlos Admin",
    emailModerador: "carlos.admin@predio.com",
    fechaAccion: "2024-01-15 14:30:25",
    objetoAfectado: "Propiedad",
    objetoId: "PROP-001",
    objetoTitulo: "Casa en Zona Sur - La Paz",
    usuarioAfectado: "María González",
    estadoAnterior: "Pendiente",
    estadoNuevo: "Aprobado",
    comentarios:
      "Propiedad cumple con todos los requisitos. Imágenes de buena calidad.",
    tiempoRespuesta: "2h 15min",
    categoria: "Moderación de Contenido",
  },
  {
    id: "ACT-002",
    tipo: "Rechazo",
    accion: "Propiedad Rechazada",
    descripcion: "Departamento con información incompleta rechazado",
    moderador: "Ana Moderadora",
    emailModerador: "ana.moderadora@predio.com",
    fechaAccion: "2024-01-15 13:45:12",
    objetoAfectado: "Propiedad",
    objetoId: "PROP-002",
    objetoTitulo: "Departamento Equipetrol",
    usuarioAfectado: "Roberto Silva",
    estadoAnterior: "Pendiente",
    estadoNuevo: "Rechazado",
    comentarios: "Faltan datos de ubicación específica y precio no está claro.",
    tiempoRespuesta: "45min",
    categoria: "Moderación de Contenido",
  },
  {
    id: "ACT-003",
    tipo: "Suspensión",
    accion: "Usuario Suspendido",
    descripcion: "Usuario suspendido por spam repetitivo",
    moderador: "María Supervisora",
    emailModerador: "maria.supervisora@predio.com",
    fechaAccion: "2024-01-15 12:20:08",
    objetoAfectado: "Usuario",
    objetoId: "USR-045",
    objetoTitulo: "Diego Vargas",
    usuarioAfectado: "Diego Vargas",
    estadoAnterior: "Activo",
    estadoNuevo: "Suspendido",
    comentarios:
      "Múltiples reportes por publicar la misma propiedad. Suspensión de 7 días.",
    tiempoRespuesta: "1h 30min",
    categoria: "Gestión de Usuarios",
  },
  {
    id: "ACT-004",
    tipo: "Resolución",
    accion: "Reporte Resuelto",
    descripcion: "Reporte de contenido inapropiado resuelto",
    moderador: "Carlos Admin",
    emailModerador: "carlos.admin@predio.com",
    fechaAccion: "2024-01-15 11:15:33",
    objetoAfectado: "Reporte",
    objetoId: "REP-003",
    objetoTitulo: "Contenido Inapropiado - Imágenes",
    usuarioAfectado: "Patricia López",
    estadoAnterior: "En Revisión",
    estadoNuevo: "Resuelto",
    comentarios: "Imágenes removidas y usuario notificado sobre políticas.",
    tiempoRespuesta: "3h 45min",
    categoria: "Gestión de Reportes",
  },
  {
    id: "ACT-005",
    tipo: "Verificación",
    accion: "Usuario Verificado",
    descripcion: "Cuenta de usuario verificada exitosamente",
    moderador: "Ana Moderadora",
    emailModerador: "ana.moderadora@predio.com",
    fechaAccion: "2024-01-15 10:30:15",
    objetoAfectado: "Usuario",
    objetoId: "USR-023",
    objetoTitulo: "Carmen Flores",
    usuarioAfectado: "Carmen Flores",
    estadoAnterior: "No Verificado",
    estadoNuevo: "Verificado",
    comentarios: "Documentos de identidad validados correctamente.",
    tiempoRespuesta: "24h 10min",
    categoria: "Verificación",
  },
];

export default function HistorialModeracioPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTipo, setFilterTipo] = useState("all");
  const [filterModerador, setFilterModerador] = useState("all");
  const [filterCategoria, setFilterCategoria] = useState("all");
  const [fechaInicio, setFechaInicio] = useState<Date | undefined>(undefined);
  const [fechaFin, setFechaFin] = useState<Date | undefined>(undefined);

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case "Aprobación":
        return <Check className="h-4 w-4 text-green-500" />;
      case "Rechazo":
        return <X className="h-4 w-4 text-red-500" />;
      case "Suspensión":
        return <Shield className="h-4 w-4 text-orange-500" />;
      case "Resolución":
        return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case "Verificación":
        return <User className="h-4 w-4 text-purple-500" />;
      default:
        return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case "Aprobación":
        return "default";
      case "Rechazo":
        return "destructive";
      case "Suspensión":
        return "secondary";
      case "Resolución":
        return "outline";
      case "Verificación":
        return "default";
      default:
        return "secondary";
    }
  };

  const getObjetoIcon = (objeto: string) => {
    switch (objeto) {
      case "Propiedad":
        return <Building2 className="h-3 w-3" />;
      case "Usuario":
        return <User className="h-3 w-3" />;
      case "Reporte":
        return <MessageSquare className="h-3 w-3" />;
      default:
        return <FileText className="h-3 w-3" />;
    }
  };

  const exportarHistorial = () => {
    console.log("Exportando historial...");
    // Aquí iría la lógica para exportar
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
                <BreadcrumbLink href="/moderacion">Moderación</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Historial</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="ml-auto px-4">
          <Button variant="outline" onClick={exportarHistorial}>
            <Download className="mr-2 h-4 w-4" />
            Exportar Historial
          </Button>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        {/* Estadísticas del historial */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Acciones Hoy
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">47</div>
              <p className="text-xs text-muted-foreground">+8 vs ayer</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Tiempo Promedio
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.3h</div>
              <p className="text-xs text-muted-foreground">-0.5h vs ayer</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Moderadores Activos
              </CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">De 8 total</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Tasa de Aprobación
              </CardTitle>
              <Check className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78%</div>
              <p className="text-xs text-muted-foreground">+2% vs ayer</p>
            </CardContent>
          </Card>
        </div>

        {/* Filtros y búsqueda */}
        <Card>
          <CardHeader>
            <CardTitle>Filtros y Búsqueda</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar por ID, moderador, usuario o descripción..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>
                <Select value={filterTipo} onValueChange={setFilterTipo}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Tipo de acción" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las acciones</SelectItem>
                    <SelectItem value="aprobacion">Aprobación</SelectItem>
                    <SelectItem value="rechazo">Rechazo</SelectItem>
                    <SelectItem value="suspension">Suspensión</SelectItem>
                    <SelectItem value="resolucion">Resolución</SelectItem>
                    <SelectItem value="verificacion">Verificación</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={filterModerador}
                  onValueChange={setFilterModerador}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Moderador" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los moderadores</SelectItem>
                    <SelectItem value="carlos">Carlos Admin</SelectItem>
                    <SelectItem value="ana">Ana Moderadora</SelectItem>
                    <SelectItem value="maria">María Supervisora</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={filterCategoria}
                  onValueChange={setFilterCategoria}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las categorías</SelectItem>
                    <SelectItem value="moderacion">
                      Moderación de Contenido
                    </SelectItem>
                    <SelectItem value="usuarios">
                      Gestión de Usuarios
                    </SelectItem>
                    <SelectItem value="reportes">
                      Gestión de Reportes
                    </SelectItem>
                    <SelectItem value="verificacion">Verificación</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-[200px] justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {fechaInicio
                        ? format(fechaInicio, "PPP", { locale: es })
                        : "Fecha inicio"}
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
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-[200px] justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {fechaFin
                        ? format(fechaFin, "PPP", { locale: es })
                        : "Fecha fin"}
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
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Limpiar Filtros
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabla de historial */}
        <Card>
          <CardHeader>
            <CardTitle>Historial de Moderación</CardTitle>
            <CardDescription>
              Registro completo de todas las acciones de moderación realizadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Acción</TableHead>
                  <TableHead>Moderador</TableHead>
                  <TableHead>Objeto Afectado</TableHead>
                  <TableHead>Usuario</TableHead>
                  <TableHead>Tiempo Respuesta</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {historialAcciones.map((accion) => (
                  <TableRow key={accion.id}>
                    <TableCell className="font-medium">{accion.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {getTipoIcon(accion.tipo)}
                        <Badge
                          variant={getTipoColor(accion.tipo)}
                          className="ml-2"
                        >
                          {accion.tipo}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{accion.accion}</div>
                        <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                          {accion.descripcion}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {accion.moderador
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{accion.moderador}</div>
                          <div className="text-sm text-muted-foreground">
                            {accion.categoria}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {getObjetoIcon(accion.objetoAfectado)}
                        <div className="ml-2">
                          <div className="font-medium">
                            {accion.objetoAfectado}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {accion.objetoId}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <User className="mr-1 h-3 w-3" />
                        {accion.usuarioAfectado}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Clock className="mr-1 h-3 w-3" />
                        {accion.tiempoRespuesta}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{accion.fechaAccion}</div>
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl">
                          <DialogHeader>
                            <DialogTitle>
                              Detalles de la Acción {accion.id}
                            </DialogTitle>
                            <DialogDescription>
                              Información completa de la acción de moderación
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-semibold mb-2">
                                  Información de la Acción
                                </h4>
                                <div className="space-y-2 text-sm">
                                  <div>
                                    <strong>Tipo:</strong> {accion.tipo}
                                  </div>
                                  <div>
                                    <strong>Acción:</strong> {accion.accion}
                                  </div>
                                  <div>
                                    <strong>Categoría:</strong>{" "}
                                    {accion.categoria}
                                  </div>
                                  <div>
                                    <strong>Fecha:</strong> {accion.fechaAccion}
                                  </div>
                                  <div>
                                    <strong>Tiempo de Respuesta:</strong>{" "}
                                    {accion.tiempoRespuesta}
                                  </div>
                                </div>
                              </div>
                              <div>
                                <h4 className="font-semibold mb-2">
                                  Moderador
                                </h4>
                                <div className="space-y-2 text-sm">
                                  <div>
                                    <strong>Nombre:</strong> {accion.moderador}
                                  </div>
                                  <div>
                                    <strong>Email:</strong>{" "}
                                    {accion.emailModerador}
                                  </div>
                                </div>
                                <h4 className="font-semibold mb-2 mt-4">
                                  Usuario Afectado
                                </h4>
                                <div className="space-y-2 text-sm">
                                  <div>
                                    <strong>Usuario:</strong>{" "}
                                    {accion.usuarioAfectado}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2">
                                Objeto Afectado
                              </h4>
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <strong>Tipo:</strong> {accion.objetoAfectado}
                                </div>
                                <div>
                                  <strong>ID:</strong> {accion.objetoId}
                                </div>
                                <div className="col-span-2">
                                  <strong>Título:</strong> {accion.objetoTitulo}
                                </div>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2">
                                Cambio de Estado
                              </h4>
                              <div className="flex items-center space-x-4 text-sm">
                                <Badge variant="outline">
                                  {accion.estadoAnterior}
                                </Badge>
                                <span>→</span>
                                <Badge variant="default">
                                  {accion.estadoNuevo}
                                </Badge>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2">
                                Descripción
                              </h4>
                              <p className="text-sm bg-muted p-3 rounded-lg">
                                {accion.descripcion}
                              </p>
                            </div>
                            {accion.comentarios && (
                              <div>
                                <h4 className="font-semibold mb-2">
                                  Comentarios del Moderador
                                </h4>
                                <p className="text-sm bg-blue-50 p-3 rounded-lg border border-blue-200">
                                  {accion.comentarios}
                                </p>
                              </div>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  );
}
