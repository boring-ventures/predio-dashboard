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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  UserX,
  Search,
  Filter,
  MoreHorizontal,
  User,
  Calendar,
  Building2,
  Mail,
  Phone,
  MapPin,
  AlertTriangle,
  Eye,
  Download,
  Clock,
  Shield,
  FileText,
  RotateCcw,
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

type SuspendedUser = {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  joinDate: string;
  suspensionDate: string;
  suspendedBy: string;
  type: string;
  properties: number;
  suspensionReason: string;
  suspensionDetails: string;
  suspensionDuration: string;
  suspensionEnd: string;
  status: string;
  avatar: string;
  previousSuspensions: number;
  totalReports: number;
  lastActivity: string;
  appealStatus: string;
  severity: string;
};

type SuspensionHistory = {
  id: string;
  userId: string;
  userName: string;
  reason: string;
  duration: string;
  startDate: string;
  endDate: string;
  suspendedBy: string;
  status: string;
};

const usuariosSuspendidos: SuspendedUser[] = [
  {
    id: "USR-045",
    name: "Diego Vargas",
    email: "diego.vargas@email.com",
    phone: "+591 69876543",
    location: "La Paz",
    joinDate: "2023-09-20",
    suspensionDate: "2024-01-12",
    suspendedBy: "María Supervisora",
    type: "Vendedor",
    properties: 5,
    suspensionReason: "Spam repetitivo",
    suspensionDetails:
      "Usuario publicó la misma propiedad múltiples veces violando las políticas de la plataforma. Múltiples reportes de otros usuarios.",
    suspensionDuration: "7 días",
    suspensionEnd: "2024-01-19",
    status: "Suspendido",
    avatar: "/placeholder.svg?height=40&width=40",
    previousSuspensions: 1,
    totalReports: 8,
    lastActivity: "2024-01-12",
    appealStatus: "Sin apelación",
    severity: "Media",
  },
  {
    id: "USR-067",
    name: "Patricia López",
    email: "patricia.lopez@email.com",
    phone: "+591 78123456",
    location: "Santa Cruz",
    joinDate: "2023-11-05",
    suspensionDate: "2024-01-10",
    suspendedBy: "Carlos Admin",
    type: "Comprador",
    properties: 0,
    suspensionReason: "Contenido inapropiado",
    suspensionDetails:
      "Usuario subió imágenes no relacionadas con propiedades inmobiliarias en múltiples publicaciones.",
    suspensionDuration: "3 días",
    suspensionEnd: "2024-01-13",
    status: "Suspensión Expirada",
    avatar: "/placeholder.svg?height=40&width=40",
    previousSuspensions: 0,
    totalReports: 3,
    lastActivity: "2024-01-13",
    appealStatus: "Apelación aceptada",
    severity: "Baja",
  },
  {
    id: "USR-089",
    name: "Roberto Silva",
    email: "roberto.silva@email.com",
    phone: "+591 75987654",
    location: "Cochabamba",
    joinDate: "2023-07-15",
    suspensionDate: "2024-01-08",
    suspendedBy: "Ana Moderadora",
    type: "Vendedor",
    properties: 12,
    suspensionReason: "Fraude",
    suspensionDetails:
      "Usuario intentó vender propiedades que no le pertenecían usando documentos falsificados.",
    suspensionDuration: "Permanente",
    suspensionEnd: "Permanente",
    status: "Suspendido Permanente",
    avatar: "/placeholder.svg?height=40&width=40",
    previousSuspensions: 2,
    totalReports: 15,
    lastActivity: "2024-01-08",
    appealStatus: "Apelación pendiente",
    severity: "Alta",
  },
];

const historialSuspensiones: SuspensionHistory[] = [
  {
    id: "SUSP-001",
    userId: "USR-045",
    userName: "Diego Vargas",
    reason: "Spam repetitivo",
    duration: "7 días",
    startDate: "2024-01-12",
    endDate: "2024-01-19",
    suspendedBy: "María Supervisora",
    status: "Activa",
  },
  {
    id: "SUSP-002",
    userId: "USR-067",
    userName: "Patricia López",
    reason: "Contenido inapropiado",
    duration: "3 días",
    startDate: "2024-01-10",
    endDate: "2024-01-13",
    suspendedBy: "Carlos Admin",
    status: "Completada",
  },
];

export default function UsuariosSuspendidosPage() {
  const { toast } = useToast();
  const [selectedUser, setSelectedUser] = useState<SuspendedUser | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterSeverity, setFilterSeverity] = useState("all");
  const [reactivationReason, setReactivationReason] = useState("");

  const handleReactivateUser = (userId: string, reason: string) => {
    toast({
      title: "Usuario reactivado",
      description: `El usuario ${userId} ha sido reactivado exitosamente.`,
    });
    console.log(`Reactivando usuario ${userId} por: ${reason}`);
    setReactivationReason("");
  };

  const handleExtendSuspension = (userId: string, additionalDays: number) => {
    toast({
      title: "Suspensión extendida",
      description: `La suspensión del usuario ${userId} ha sido extendida por ${additionalDays} días.`,
    });
    console.log(
      `Extendiendo suspensión de ${userId} por ${additionalDays} días`
    );
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Suspendido":
        return "destructive";
      case "Suspendido Permanente":
        return "destructive";
      case "Suspensión Expirada":
        return "secondary";
      default:
        return "outline";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "Alta":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "Media":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "Baja":
        return <AlertTriangle className="h-4 w-4 text-blue-500" />;
      default:
        return <Shield className="h-4 w-4 text-gray-500" />;
    }
  };

  const isExpired = (endDate: string) => {
    if (endDate === "Permanente") return false;
    return new Date(endDate) < new Date();
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
                <BreadcrumbLink href="/usuarios">Usuarios</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Usuarios Suspendidos</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="ml-auto px-4">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar Reporte
          </Button>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        {/* Estadísticas de suspensiones */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Usuarios Suspendidos
              </CardTitle>
              <UserX className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89</div>
              <p className="text-xs text-muted-foreground">0.7% del total</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Suspensiones Activas
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">34</div>
              <p className="text-xs text-muted-foreground">38% del total</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Reactivados Este Mes
              </CardTitle>
              <RotateCcw className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                +3 vs mes anterior
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Apelaciones Pendientes
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">
                Requieren revisión
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filtros y búsqueda */}
        <Card>
          <CardHeader>
            <CardTitle>Buscar Usuarios Suspendidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por nombre, email o motivo..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="suspendido">Suspendido</SelectItem>
                  <SelectItem value="permanente">
                    Suspendido Permanente
                  </SelectItem>
                  <SelectItem value="expirada">Suspensión Expirada</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterSeverity} onValueChange={setFilterSeverity}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Severidad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las severidades</SelectItem>
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

        {/* Tabla de usuarios suspendidos */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Usuarios Suspendidos</CardTitle>
            <CardDescription>
              Usuarios que han sido suspendidos por violaciones a las políticas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuario</TableHead>
                  <TableHead>Motivo</TableHead>
                  <TableHead>Severidad</TableHead>
                  <TableHead>Duración</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Suspendido Por</TableHead>
                  <TableHead>Fecha Suspensión</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {usuariosSuspendidos.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage
                            src={user.avatar || "/placeholder.svg"}
                          />
                          <AvatarFallback>
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium flex items-center">
                            {user.name}
                            <UserX className="ml-2 h-4 w-4 text-red-500" />
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {user.email}
                          </div>
                          <div className="text-sm text-muted-foreground flex items-center">
                            <MapPin className="mr-1 h-3 w-3" />
                            {user.location}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">
                          {user.suspensionReason}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {user.totalReports} reportes |{" "}
                          {user.previousSuspensions} suspensiones previas
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {getSeverityIcon(user.severity)}
                        <Badge
                          variant={getSeverityColor(user.severity)}
                          className="ml-2"
                        >
                          {user.severity}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">
                          {user.suspensionDuration}
                        </div>
                        {user.suspensionEnd !== "Permanente" && (
                          <div className="text-sm text-muted-foreground">
                            Hasta: {user.suspensionEnd}
                            {isExpired(user.suspensionEnd) && (
                              <Badge variant="secondary" className="ml-1">
                                Expirada
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(user.status)}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <User className="mr-1 h-3 w-3" />
                        {user.suspendedBy}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm">
                        <Calendar className="mr-1 h-3 w-3" />
                        {user.suspensionDate}
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
                            onClick={() => setSelectedUser(user)}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            Ver detalles
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileText className="mr-2 h-4 w-4" />
                            Ver historial
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {user.status !== "Suspendido Permanente" && (
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <DropdownMenuItem
                                  onSelect={(e) => e.preventDefault()}
                                >
                                  <RotateCcw className="mr-2 h-4 w-4" />
                                  Reactivar usuario
                                </DropdownMenuItem>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    ¿Reactivar usuario?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Esta acción reactivará la cuenta de{" "}
                                    {user.name} y le permitirá volver a usar la
                                    plataforma.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="grid gap-2">
                                    <Label htmlFor="reason">
                                      Motivo de reactivación
                                    </Label>
                                    <Textarea
                                      id="reason"
                                      placeholder="Explica por qué se está reactivando este usuario..."
                                      value={reactivationReason}
                                      onChange={(e) =>
                                        setReactivationReason(e.target.value)
                                      }
                                    />
                                  </div>
                                </div>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>
                                    Cancelar
                                  </AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() =>
                                      handleReactivateUser(
                                        user.id,
                                        reactivationReason
                                      )
                                    }
                                    disabled={!reactivationReason.trim()}
                                  >
                                    Reactivar Usuario
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          )}
                          <DropdownMenuItem
                            onClick={() => handleExtendSuspension(user.id, 7)}
                          >
                            <Clock className="mr-2 h-4 w-4" />
                            Extender suspensión
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

        {/* Historial de suspensiones */}
        <Card>
          <CardHeader>
            <CardTitle>Historial Reciente de Suspensiones</CardTitle>
            <CardDescription>
              Últimas suspensiones aplicadas en la plataforma
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Usuario</TableHead>
                  <TableHead>Motivo</TableHead>
                  <TableHead>Duración</TableHead>
                  <TableHead>Período</TableHead>
                  <TableHead>Suspendido Por</TableHead>
                  <TableHead>Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {historialSuspensiones.map((suspension) => (
                  <TableRow key={suspension.id}>
                    <TableCell className="font-medium">
                      {suspension.id}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{suspension.userName}</div>
                        <div className="text-sm text-muted-foreground">
                          {suspension.userId}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{suspension.reason}</TableCell>
                    <TableCell>{suspension.duration}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{suspension.startDate}</div>
                        <div className="text-muted-foreground">
                          hasta {suspension.endDate}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <User className="mr-1 h-3 w-3" />
                        {suspension.suspendedBy}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          suspension.status === "Activa"
                            ? "destructive"
                            : "secondary"
                        }
                      >
                        {suspension.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Dialog para ver detalles del usuario suspendido */}
        {selectedUser && (
          <Dialog
            open={!!selectedUser}
            onOpenChange={() => setSelectedUser(null)}
          >
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>
                  Detalles de Suspensión - {selectedUser.name}
                </DialogTitle>
                <DialogDescription>
                  Información completa del usuario suspendido
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">
                      Información del Usuario
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        {selectedUser.name}
                      </div>
                      <div className="flex items-center">
                        <Mail className="mr-2 h-4 w-4" />
                        {selectedUser.email}
                      </div>
                      <div className="flex items-center">
                        <Phone className="mr-2 h-4 w-4" />
                        {selectedUser.phone}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="mr-2 h-4 w-4" />
                        {selectedUser.location}
                      </div>
                      <div className="flex items-center">
                        <Building2 className="mr-2 h-4 w-4" />
                        {selectedUser.properties} propiedades
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">
                      Detalles de la Suspensión
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <strong>Motivo:</strong> {selectedUser.suspensionReason}
                      </div>
                      <div>
                        <strong>Severidad:</strong>{" "}
                        <Badge
                          variant={getSeverityColor(selectedUser.severity)}
                        >
                          {selectedUser.severity}
                        </Badge>
                      </div>
                      <div>
                        <strong>Duración:</strong>{" "}
                        {selectedUser.suspensionDuration}
                      </div>
                      <div>
                        <strong>Fecha inicio:</strong>{" "}
                        {selectedUser.suspensionDate}
                      </div>
                      <div>
                        <strong>Fecha fin:</strong> {selectedUser.suspensionEnd}
                      </div>
                      <div>
                        <strong>Suspendido por:</strong>{" "}
                        {selectedUser.suspendedBy}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Descripción Detallada</h4>
                  <p className="text-sm bg-muted p-3 rounded-lg">
                    {selectedUser.suspensionDetails}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Historial</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <strong>Suspensiones previas:</strong>{" "}
                        {selectedUser.previousSuspensions}
                      </div>
                      <div>
                        <strong>Total de reportes:</strong>{" "}
                        {selectedUser.totalReports}
                      </div>
                      <div>
                        <strong>Última actividad:</strong>{" "}
                        {selectedUser.lastActivity}
                      </div>
                      <div>
                        <strong>Miembro desde:</strong> {selectedUser.joinDate}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Estado de Apelación</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <strong>Estado:</strong>{" "}
                        <Badge
                          variant={
                            selectedUser.appealStatus === "Apelación pendiente"
                              ? "default"
                              : selectedUser.appealStatus ===
                                  "Apelación aceptada"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {selectedUser.appealStatus}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setSelectedUser(null)}>
                  Cerrar
                </Button>
                {selectedUser.status !== "Suspendido Permanente" && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button>
                        <RotateCcw className="mr-2 h-4 w-4" />
                        Reactivar Usuario
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>¿Reactivar usuario?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Esta acción reactivará la cuenta de{" "}
                          {selectedUser.name}.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="reason">Motivo de reactivación</Label>
                          <Textarea
                            id="reason"
                            placeholder="Explica por qué se está reactivando este usuario..."
                            value={reactivationReason}
                            onChange={(e) =>
                              setReactivationReason(e.target.value)
                            }
                          />
                        </div>
                      </div>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() =>
                            handleReactivateUser(
                              selectedUser.id,
                              reactivationReason
                            )
                          }
                          disabled={!reactivationReason.trim()}
                        >
                          Reactivar Usuario
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </SidebarInset>
  );
}
