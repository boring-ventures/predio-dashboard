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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Shield,
  Search,
  Filter,
  MoreHorizontal,
  User,
  Calendar,
  Building2,
  Star,
  Mail,
  Phone,
  MapPin,
  FileText,
  CheckCircle,
  XCircle,
  Eye,
  Download,
  UserCheck,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

type VerifiedUser = {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  joinDate: string;
  verificationDate: string;
  verifiedBy: string;
  type: string;
  properties: number;
  rating: number;
  totalTransactions: number;
  revenue: number;
  lastActivity: string;
  avatar: string;
  documents: {
    ci: string;
    selfie: string;
    address: string;
    phone: string;
  };
  verificationLevel: string;
  trustScore: number;
  complaints: number;
  status: string;
};

type VerificationRequest = {
  id: string;
  user: string;
  email: string;
  submitDate: string;
  type: string;
  documents: {
    ci: string;
    selfie: string;
    address: string;
    phone: string;
  };
  status: string;
  priority: string;
};

const usuariosVerificados: VerifiedUser[] = [
  {
    id: "USR-001",
    name: "María González",
    email: "maria.gonzalez@email.com",
    phone: "+591 70123456",
    location: "La Paz",
    joinDate: "2023-08-15",
    verificationDate: "2023-08-20",
    verifiedBy: "Ana Verificadora",
    type: "Vendedor",
    properties: 8,
    rating: 4.8,
    totalTransactions: 12,
    revenue: 45600,
    lastActivity: "Hace 2 horas",
    avatar: "/placeholder.svg?height=40&width=40",
    documents: {
      ci: "Verificado",
      selfie: "Verificado",
      address: "Verificado",
      phone: "Verificado",
    },
    verificationLevel: "Completa",
    trustScore: 95,
    complaints: 0,
    status: "Activo",
  },
  {
    id: "USR-002",
    name: "Carlos Mendoza",
    email: "carlos.mendoza@email.com",
    phone: "+591 75987654",
    location: "Santa Cruz",
    joinDate: "2023-11-22",
    verificationDate: "2023-12-01",
    verifiedBy: "María Verificadora",
    type: "Comprador",
    properties: 0,
    rating: 4.5,
    totalTransactions: 3,
    revenue: 0,
    lastActivity: "Hace 1 día",
    avatar: "/placeholder.svg?height=40&width=40",
    documents: {
      ci: "Verificado",
      selfie: "Verificado",
      address: "Pendiente",
      phone: "Verificado",
    },
    verificationLevel: "Parcial",
    trustScore: 78,
    complaints: 0,
    status: "Activo",
  },
  {
    id: "USR-003",
    name: "Ana Rodríguez",
    email: "ana.rodriguez@email.com",
    phone: "+591 68456789",
    location: "Cochabamba",
    joinDate: "2023-06-10",
    verificationDate: "2023-06-15",
    verifiedBy: "Carlos Verificador",
    type: "Vendedor",
    properties: 15,
    rating: 4.9,
    totalTransactions: 28,
    revenue: 125400,
    lastActivity: "Hace 30 min",
    avatar: "/placeholder.svg?height=40&width=40",
    documents: {
      ci: "Verificado",
      selfie: "Verificado",
      address: "Verificado",
      phone: "Verificado",
    },
    verificationLevel: "Completa",
    trustScore: 98,
    complaints: 1,
    status: "Activo",
  },
];

const solicitudesVerificacion: VerificationRequest[] = [
  {
    id: "VER-001",
    user: "Roberto Silva",
    email: "roberto.silva@email.com",
    submitDate: "2024-01-15",
    type: "Vendedor",
    documents: {
      ci: "Pendiente",
      selfie: "Pendiente",
      address: "Pendiente",
      phone: "Verificado",
    },
    status: "En Revisión",
    priority: "Media",
  },
  {
    id: "VER-002",
    user: "Patricia López",
    email: "patricia.lopez@email.com",
    submitDate: "2024-01-14",
    type: "Comprador",
    documents: {
      ci: "Verificado",
      selfie: "Rechazado",
      address: "Pendiente",
      phone: "Verificado",
    },
    status: "Requiere Acción",
    priority: "Alta",
  },
];

export default function UsuariosVerificadosPage() {
  const { toast } = useToast();
  const [selectedUser, setSelectedUser] = useState<VerifiedUser | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterLevel, setFilterLevel] = useState("all");
  const [activeTab, setActiveTab] = useState("verificados");

  const handleRevokeVerification = (userId: string, reason: string) => {
    toast({
      title: "Verificación revocada",
      description: `La verificación del usuario ${userId} ha sido revocada.`,
    });
    console.log(`Revocando verificación de ${userId} por: ${reason}`);
  };

  const handleApproveVerification = (verificationId: string) => {
    toast({
      title: "Verificación aprobada",
      description: `La solicitud ${verificationId} ha sido aprobada.`,
    });
    console.log(`Aprobando verificación ${verificationId}`);
  };

  const handleRejectVerification = (verificationId: string, reason: string) => {
    toast({
      title: "Verificación rechazada",
      description: `La solicitud ${verificationId} ha sido rechazada.`,
    });
    console.log(`Rechazando verificación ${verificationId} por: ${reason}`);
  };

  const getVerificationLevelColor = (level: string) => {
    switch (level) {
      case "Completa":
        return "default";
      case "Parcial":
        return "secondary";
      default:
        return "outline";
    }
  };

  const getTrustScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getDocumentStatusIcon = (status: string) => {
    switch (status) {
      case "Verificado":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "Pendiente":
        return <Eye className="h-4 w-4 text-yellow-500" />;
      case "Rechazado":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
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
                <BreadcrumbLink href="/usuarios">Usuarios</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Usuarios Verificados</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="ml-auto px-4">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar Lista
          </Button>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        {/* Estadísticas de verificación */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Usuarios Verificados
              </CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8,456</div>
              <p className="text-xs text-muted-foreground">65.8% del total</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Verificación Completa
              </CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6,234</div>
              <p className="text-xs text-muted-foreground">
                73.7% de verificados
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Solicitudes Pendientes
              </CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">
                Tiempo promedio: 2.5 días
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Trust Score Promedio
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87.3</div>
              <p className="text-xs text-muted-foreground">
                +2.1 vs mes anterior
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="verificados">Usuarios Verificados</TabsTrigger>
            <TabsTrigger value="solicitudes">
              Solicitudes Pendientes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="verificados" className="space-y-4">
            {/* Filtros y búsqueda */}
            <Card>
              <CardHeader>
                <CardTitle>Buscar Usuarios Verificados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Buscar por nombre, email o ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8"
                      />
                    </div>
                  </div>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Tipo de usuario" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los tipos</SelectItem>
                      <SelectItem value="vendedor">Vendedor</SelectItem>
                      <SelectItem value="comprador">Comprador</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterLevel} onValueChange={setFilterLevel}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Nivel de verificación" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los niveles</SelectItem>
                      <SelectItem value="completa">Completa</SelectItem>
                      <SelectItem value="parcial">Parcial</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Más filtros
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Tabla de usuarios verificados */}
            <Card>
              <CardHeader>
                <CardTitle>Lista de Usuarios Verificados</CardTitle>
                <CardDescription>
                  Usuarios que han completado el proceso de verificación
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Usuario</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Nivel Verificación</TableHead>
                      <TableHead>Trust Score</TableHead>
                      <TableHead>Propiedades</TableHead>
                      <TableHead>Transacciones</TableHead>
                      <TableHead>Fecha Verificación</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {usuariosVerificados.map((user) => (
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
                                <Shield className="ml-2 h-4 w-4 text-green-500" />
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
                          <Badge
                            variant={
                              user.type === "Vendedor" ? "default" : "secondary"
                            }
                          >
                            {user.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={getVerificationLevelColor(
                              user.verificationLevel
                            )}
                          >
                            {user.verificationLevel}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div
                            className={`font-bold ${getTrustScoreColor(
                              user.trustScore
                            )}`}
                          >
                            {user.trustScore}/100
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Building2 className="mr-1 h-3 w-3" />
                            {user.properties}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {user.totalTransactions}
                            </div>
                            {user.rating > 0 && (
                              <div className="flex items-center text-sm">
                                <Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
                                {user.rating}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center text-sm">
                            <Calendar className="mr-1 h-3 w-3" />
                            {user.verificationDate}
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
                                Ver documentos
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <DropdownMenuItem
                                    onSelect={(e) => e.preventDefault()}
                                  >
                                    <XCircle className="mr-2 h-4 w-4" />
                                    Revocar verificación
                                  </DropdownMenuItem>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      ¿Revocar verificación?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Esta acción removerá la verificación del
                                      usuario {user.name}. El usuario será
                                      notificado y deberá volver a verificar su
                                      cuenta.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>
                                      Cancelar
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() =>
                                        handleRevokeVerification(
                                          user.id,
                                          "Revisión administrativa"
                                        )
                                      }
                                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    >
                                      Revocar Verificación
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="solicitudes" className="space-y-4">
            {/* Tabla de solicitudes pendientes */}
            <Card>
              <CardHeader>
                <CardTitle>Solicitudes de Verificación Pendientes</CardTitle>
                <CardDescription>
                  Usuarios que han solicitado verificación y están en proceso de
                  revisión
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Usuario</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Documentos</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Prioridad</TableHead>
                      <TableHead>Fecha Solicitud</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {solicitudesVerificacion.map((solicitud) => (
                      <TableRow key={solicitud.id}>
                        <TableCell className="font-medium">
                          {solicitud.id}
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{solicitud.user}</div>
                            <div className="text-sm text-muted-foreground">
                              {solicitud.email}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              solicitud.type === "Vendedor"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {solicitud.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            {Object.entries(solicitud.documents).map(
                              ([doc, status]) => (
                                <div
                                  key={doc}
                                  className="flex items-center"
                                  title={`${doc}: ${status}`}
                                >
                                  {getDocumentStatusIcon(status)}
                                </div>
                              )
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              solicitud.status === "En Revisión"
                                ? "default"
                                : solicitud.status === "Requiere Acción"
                                  ? "destructive"
                                  : "secondary"
                            }
                          >
                            {solicitud.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              solicitud.priority === "Alta"
                                ? "destructive"
                                : solicitud.priority === "Media"
                                  ? "default"
                                  : "secondary"
                            }
                          >
                            {solicitud.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center text-sm">
                            <Calendar className="mr-1 h-3 w-3" />
                            {solicitud.submitDate}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleApproveVerification(solicitud.id)
                              }
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleRejectVerification(
                                  solicitud.id,
                                  "Documentos incompletos"
                                )
                              }
                            >
                              <XCircle className="h-4 w-4" />
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

        {/* Dialog para ver detalles del usuario */}
        {selectedUser && (
          <Dialog
            open={!!selectedUser}
            onOpenChange={() => setSelectedUser(null)}
          >
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>
                  Detalles de Verificación - {selectedUser.name}
                </DialogTitle>
                <DialogDescription>
                  Información completa del usuario verificado
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Información Personal</h4>
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
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Estadísticas</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <strong>Trust Score:</strong>{" "}
                        <span
                          className={getTrustScoreColor(
                            selectedUser.trustScore
                          )}
                        >
                          {selectedUser.trustScore}/100
                        </span>
                      </div>
                      <div>
                        <strong>Propiedades:</strong> {selectedUser.properties}
                      </div>
                      <div>
                        <strong>Transacciones:</strong>{" "}
                        {selectedUser.totalTransactions}
                      </div>
                      <div>
                        <strong>Rating:</strong> {selectedUser.rating}/5
                      </div>
                      <div>
                        <strong>Quejas:</strong> {selectedUser.complaints}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Estado de Documentos</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(selectedUser.documents).map(
                      ([doc, status]) => (
                        <div
                          key={doc}
                          className="flex items-center justify-between p-3 border rounded-lg"
                        >
                          <div className="flex items-center">
                            {getDocumentStatusIcon(status)}
                            <span className="ml-2 capitalize">{doc}</span>
                          </div>
                          <Badge
                            variant={
                              status === "Verificado" ? "default" : "secondary"
                            }
                          >
                            {status}
                          </Badge>
                        </div>
                      )
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">
                    Información de Verificación
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>Fecha de Verificación:</strong>{" "}
                      {selectedUser.verificationDate}
                    </div>
                    <div>
                      <strong>Verificado por:</strong> {selectedUser.verifiedBy}
                    </div>
                    <div>
                      <strong>Nivel:</strong> {selectedUser.verificationLevel}
                    </div>
                    <div>
                      <strong>Última Actividad:</strong>{" "}
                      {selectedUser.lastActivity}
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setSelectedUser(null)}>
                  Cerrar
                </Button>
                <Button>Ver Documentos Completos</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </SidebarInset>
  );
}
