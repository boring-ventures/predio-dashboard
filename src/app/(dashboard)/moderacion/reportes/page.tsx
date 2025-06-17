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
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertTriangle,
  Search,
  Filter,
  MoreHorizontal,
  User,
  Calendar,
  Flag,
  Shield,
  MessageSquare,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

// Add type definition for reporte
type Reporte = {
  id: string;
  tipo: string;
  descripcion: string;
  reportadoPor: string;
  usuarioReportado: string;
  emailReportado: string;
  fechaReporte: string;
  estado: string;
  prioridad: string;
  categoria: string;
  evidencia: string;
  accionesTomadas: string;
  asignadoA: string;
  propiedadId: string;
  severidad: number;
  frecuencia: number;
};

const reportes: Reporte[] = [
  {
    id: "REP-001",
    tipo: "Spam",
    descripcion: "Usuario publica la misma propiedad múltiples veces",
    reportadoPor: "Carlos Mendoza",
    usuarioReportado: "María González",
    emailReportado: "maria.gonzalez@email.com",
    fechaReporte: "2024-01-15 14:30",
    estado: "Nuevo",
    prioridad: "Media",
    categoria: "Contenido Duplicado",
    evidencia: "Screenshots de propiedades duplicadas",
    accionesTomadas: "",
    asignadoA: "",
    propiedadId: "PROP-001",
    severidad: 3,
    frecuencia: 2,
  },
  {
    id: "REP-002",
    tipo: "Fraude",
    descripcion: "Propiedad inexistente, fotos falsas de internet",
    reportadoPor: "Ana Rodríguez",
    usuarioReportado: "Roberto Silva",
    emailReportado: "roberto.silva@email.com",
    fechaReporte: "2024-01-14 09:15",
    estado: "En Revisión",
    prioridad: "Alta",
    categoria: "Información Falsa",
    evidencia: "Reverse image search, verificación de dirección",
    accionesTomadas: "Propiedad suspendida temporalmente",
    asignadoA: "Admin Carlos",
    propiedadId: "PROP-045",
    severidad: 5,
    frecuencia: 1,
  },
  {
    id: "REP-003",
    tipo: "Contenido Inapropiado",
    descripcion: "Imágenes con contenido no relacionado a la propiedad",
    reportadoPor: "Luis Mendoza",
    usuarioReportado: "Patricia López",
    emailReportado: "patricia.lopez@email.com",
    fechaReporte: "2024-01-13 16:20",
    estado: "Resuelto",
    prioridad: "Baja",
    categoria: "Contenido Inadecuado",
    evidencia: "Capturas de pantalla de las imágenes",
    accionesTomadas: "Imágenes removidas, advertencia enviada",
    asignadoA: "Admin María",
    propiedadId: "PROP-023",
    severidad: 2,
    frecuencia: 1,
  },
  {
    id: "REP-004",
    tipo: "Acoso",
    descripcion: "Usuario envía mensajes inapropiados a otros usuarios",
    reportadoPor: "Carmen Flores",
    usuarioReportado: "Diego Vargas",
    emailReportado: "diego.vargas@email.com",
    fechaReporte: "2024-01-12 11:45",
    estado: "Escalado",
    prioridad: "Alta",
    categoria: "Comportamiento Inadecuado",
    evidencia: "Capturas de conversaciones",
    accionesTomadas: "Cuenta suspendida por 7 días",
    asignadoA: "Supervisor Ana",
    propiedadId: "",
    severidad: 4,
    frecuencia: 3,
  },
];

const templates = [
  {
    id: "spam",
    nombre: "Respuesta Spam",
    contenido:
      "Hemos revisado tu reporte sobre contenido spam. Hemos tomado las medidas apropiadas y removido el contenido duplicado. Gracias por ayudarnos a mantener la calidad de la plataforma.",
  },
  {
    id: "fraude",
    nombre: "Respuesta Fraude",
    contenido:
      "Tu reporte sobre actividad fraudulenta ha sido investigado. Hemos suspendido la cuenta y removido el contenido falso. Continuaremos monitoreando la situación.",
  },
  {
    id: "contenido",
    nombre: "Respuesta Contenido Inapropiado",
    contenido:
      "Gracias por reportar contenido inapropiado. Hemos removido el contenido que viola nuestras políticas y hemos notificado al usuario sobre nuestras normas comunitarias.",
  },
];

export default function ReportesUsuariosPage() {
  const { toast } = useToast();
  const [selectedReporte, setSelectedReporte] = useState<Reporte | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterEstado, setFilterEstado] = useState("all");
  const [filterTipo, setFilterTipo] = useState("all");
  const [filterPrioridad, setFilterPrioridad] = useState("all");
  const [respuestaTemplate, setRespuestaTemplate] = useState("");
  const [respuestaPersonalizada, setRespuestaPersonalizada] = useState("");

  const handleResolverReporte = (reporteId: string, accion: string) => {
    toast({
      title: "Reporte actualizado",
      description: `El reporte ${reporteId} ha sido marcado como ${accion}.`,
    });
    console.log(`Resolviendo reporte ${reporteId} con acción: ${accion}`);
  };

  const handleEscalarReporte = (reporteId: string) => {
    toast({
      title: "Reporte escalado",
      description: `El reporte ${reporteId} ha sido escalado al supervisor.`,
    });
    console.log(`Escalando reporte ${reporteId}`);
  };

  const handleEnviarRespuesta = () => {
    const mensaje = respuestaPersonalizada || respuestaTemplate;
    if (mensaje.trim()) {
      toast({
        title: "Respuesta enviada",
        description: "La respuesta ha sido enviada al usuario que reportó.",
      });
      setRespuestaPersonalizada("");
      setRespuestaTemplate("");
    }
  };

  const getPrioridadColor = (prioridad: string) => {
    switch (prioridad) {
      case "Alta":
        return "destructive";
      case "Media":
        return "default";
      case "Baja":
        return "secondary";
      default:
        return "outline";
    }
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "Nuevo":
        return "destructive";
      case "En Revisión":
        return "default";
      case "Resuelto":
        return "default";
      case "Escalado":
        return "secondary";
      default:
        return "outline";
    }
  };

  const getSeveridadIcon = (severidad: number) => {
    if (severidad >= 4)
      return <AlertTriangle className="h-4 w-4 text-red-500" />;
    if (severidad >= 3)
      return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    return <Flag className="h-4 w-4 text-blue-500" />;
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
                <BreadcrumbPage>Reportes de Usuarios</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        {/* Estadísticas de reportes */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Reportes Nuevos
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">+2 desde ayer</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">En Revisión</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                Tiempo promedio: 3.2h
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Resueltos Hoy
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15</div>
              <p className="text-xs text-muted-foreground">+3 vs ayer</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Escalados</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                Requieren atención
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filtros y búsqueda */}
        <Card>
          <CardHeader>
            <CardTitle>Filtros y Búsqueda</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por ID, usuario reportado o descripción..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              <Select value={filterEstado} onValueChange={setFilterEstado}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="nuevo">Nuevo</SelectItem>
                  <SelectItem value="en-revision">En Revisión</SelectItem>
                  <SelectItem value="resuelto">Resuelto</SelectItem>
                  <SelectItem value="escalado">Escalado</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterTipo} onValueChange={setFilterTipo}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Tipo de reporte" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los tipos</SelectItem>
                  <SelectItem value="spam">Spam</SelectItem>
                  <SelectItem value="fraude">Fraude</SelectItem>
                  <SelectItem value="contenido">
                    Contenido Inapropiado
                  </SelectItem>
                  <SelectItem value="acoso">Acoso</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={filterPrioridad}
                onValueChange={setFilterPrioridad}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Prioridad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las prioridades</SelectItem>
                  <SelectItem value="alta">Alta</SelectItem>
                  <SelectItem value="media">Media</SelectItem>
                  <SelectItem value="baja">Baja</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Más filtros
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabla de reportes */}
        <Card>
          <CardHeader>
            <CardTitle>Reportes de Usuarios</CardTitle>
            <CardDescription>
              Gestiona todos los reportes recibidos de la comunidad
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Usuario Reportado</TableHead>
                  <TableHead>Reportado Por</TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead>Prioridad</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reportes.map((reporte) => (
                  <TableRow key={reporte.id}>
                    <TableCell className="font-medium">{reporte.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {getSeveridadIcon(reporte.severidad)}
                        <Badge variant="outline" className="ml-2">
                          {reporte.tipo}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {reporte.usuarioReportado
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">
                            {reporte.usuarioReportado}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {reporte.emailReportado}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <User className="mr-1 h-3 w-3" />
                        {reporte.reportadoPor}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-[200px]">
                        <div className="truncate">{reporte.descripcion}</div>
                        <div className="text-sm text-muted-foreground">
                          Categoría: {reporte.categoria}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getPrioridadColor(reporte.prioridad)}>
                        {reporte.prioridad}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getEstadoColor(reporte.estado)}>
                        {reporte.estado}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm">
                        <Calendar className="mr-1 h-3 w-3" />
                        {reporte.fechaReporte}
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Abrir menú</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() => setSelectedReporte(reporte)}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            Ver detalles
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleResolverReporte(reporte.id, "resuelto")
                            }
                          >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Marcar como resuelto
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleEscalarReporte(reporte.id)}
                          >
                            <Shield className="mr-2 h-4 w-4" />
                            Escalar a supervisor
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() =>
                              handleResolverReporte(reporte.id, "rechazado")
                            }
                            className="text-red-600"
                          >
                            <XCircle className="mr-2 h-4 w-4" />
                            Rechazar reporte
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Dialog para ver detalles del reporte */}
        {selectedReporte && (
          <Dialog
            open={!!selectedReporte}
            onOpenChange={() => setSelectedReporte(null)}
          >
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>
                  Detalles del Reporte {selectedReporte.id}
                </DialogTitle>
                <DialogDescription>
                  Información completa del reporte y herramientas de moderación
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">
                      Información del Reporte
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <strong>Tipo:</strong> {selectedReporte.tipo}
                      </div>
                      <div>
                        <strong>Categoría:</strong> {selectedReporte.categoria}
                      </div>
                      <div>
                        <strong>Prioridad:</strong> {selectedReporte.prioridad}
                      </div>
                      <div>
                        <strong>Estado:</strong> {selectedReporte.estado}
                      </div>
                      <div>
                        <strong>Severidad:</strong> {selectedReporte.severidad}
                        /5
                      </div>
                      <div>
                        <strong>Frecuencia:</strong>{" "}
                        {selectedReporte.frecuencia} reportes
                      </div>
                      {selectedReporte.asignadoA && (
                        <div>
                          <strong>Asignado a:</strong>{" "}
                          {selectedReporte.asignadoA}
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">
                      Usuarios Involucrados
                    </h4>
                    <div className="space-y-3">
                      <div className="p-3 border rounded-lg">
                        <div className="font-medium text-red-600">
                          Usuario Reportado
                        </div>
                        <div>{selectedReporte.usuarioReportado}</div>
                        <div className="text-sm text-muted-foreground">
                          {selectedReporte.emailReportado}
                        </div>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <div className="font-medium text-green-600">
                          Reportado Por
                        </div>
                        <div>{selectedReporte.reportadoPor}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">
                    Descripción del Problema
                  </h4>
                  <p className="text-sm bg-muted p-3 rounded-lg">
                    {selectedReporte.descripcion}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Evidencia</h4>
                  <p className="text-sm bg-muted p-3 rounded-lg">
                    {selectedReporte.evidencia}
                  </p>
                </div>

                {selectedReporte.accionesTomadas && (
                  <div>
                    <h4 className="font-semibold mb-3">Acciones Tomadas</h4>
                    <p className="text-sm bg-green-50 p-3 rounded-lg border border-green-200">
                      {selectedReporte.accionesTomadas}
                    </p>
                  </div>
                )}

                <div>
                  <h4 className="font-semibold mb-3">
                    Responder al Usuario que Reportó
                  </h4>
                  <div className="space-y-3">
                    <Select
                      value={respuestaTemplate}
                      onValueChange={setRespuestaTemplate}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar template de respuesta" />
                      </SelectTrigger>
                      <SelectContent>
                        {templates.map((template) => (
                          <SelectItem
                            key={template.id}
                            value={template.contenido}
                          >
                            {template.nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Textarea
                      placeholder="O escribe una respuesta personalizada..."
                      value={respuestaPersonalizada}
                      onChange={(e) =>
                        setRespuestaPersonalizada(e.target.value)
                      }
                      rows={4}
                    />
                    {(respuestaTemplate || respuestaPersonalizada) && (
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="font-medium text-sm mb-2">
                          Vista previa del mensaje:
                        </div>
                        <div className="text-sm">
                          {respuestaPersonalizada || respuestaTemplate}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <DialogFooter className="flex justify-between">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => handleEscalarReporte(selectedReporte.id)}
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    Escalar
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() =>
                      handleResolverReporte(selectedReporte.id, "rechazado")
                    }
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    Rechazar
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedReporte(null)}
                  >
                    Cerrar
                  </Button>
                  <Button
                    onClick={handleEnviarRespuesta}
                    disabled={!respuestaTemplate && !respuestaPersonalizada}
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Enviar Respuesta
                  </Button>
                  <Button
                    onClick={() =>
                      handleResolverReporte(selectedReporte.id, "resuelto")
                    }
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Resolver
                  </Button>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </SidebarInset>
  );
}
