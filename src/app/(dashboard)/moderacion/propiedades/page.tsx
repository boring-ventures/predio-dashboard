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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Building2,
  MapPin,
  DollarSign,
  User,
  Calendar,
  Eye,
  Check,
  X,
  Search,
  Filter,
  ImageIcon,
} from "lucide-react";
import { useState } from "react";

const pendingProperties = [
  {
    id: "PROP-001",
    title: "Casa en Zona Sur - La Paz",
    type: "Venta",
    price: "$120,000",
    location: "Calacoto, La Paz",
    owner: "María González",
    submittedDate: "2024-01-15",
    status: "Pendiente",
    images: 8,
    description: "Hermosa casa de 3 dormitorios con vista panorámica...",
  },
  {
    id: "PROP-002",
    title: "Departamento Amoblado",
    type: "Alquiler",
    price: "$800/mes",
    location: "Equipetrol, Santa Cruz",
    owner: "Carlos Mendoza",
    submittedDate: "2024-01-14",
    status: "En Revisión",
    images: 12,
    description: "Departamento completamente amoblado en zona exclusiva...",
  },
  {
    id: "PROP-003",
    title: "Oficina Comercial",
    type: "Anticretico",
    price: "$25,000",
    location: "Centro, Cochabamba",
    owner: "Ana Rodríguez",
    submittedDate: "2024-01-13",
    status: "Pendiente",
    images: 6,
    description: "Oficina ideal para empresas en crecimiento...",
  },
];

export default function PropiedadesPendientesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterCity, setFilterCity] = useState("all");

  const handleApprove = (propertyId: string) => {
    console.log("Aprobar propiedad:", propertyId);
    // Aquí iría la lógica para aprobar
  };

  const handleReject = (propertyId: string, reason: string) => {
    console.log("Rechazar propiedad:", propertyId, "Razón:", reason);
    // Aquí iría la lógica para rechazar
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
                <BreadcrumbPage>Propiedades Pendientes</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        {/* Header con estadísticas */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Pendientes
              </CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15</div>
              <p className="text-xs text-muted-foreground">+3 desde ayer</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">En Revisión</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">
                Tiempo promedio: 2.5h
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Aprobadas Hoy
              </CardTitle>
              <Check className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">+12% vs ayer</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rechazadas</CardTitle>
              <X className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">
                Tasa de rechazo: 18%
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
                    placeholder="Buscar por título, propietario o ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Tipo de propiedad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los tipos</SelectItem>
                  <SelectItem value="venta">Venta</SelectItem>
                  <SelectItem value="alquiler">Alquiler</SelectItem>
                  <SelectItem value="anticretico">Anticretico</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterCity} onValueChange={setFilterCity}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Ciudad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las ciudades</SelectItem>
                  <SelectItem value="la-paz">La Paz</SelectItem>
                  <SelectItem value="santa-cruz">Santa Cruz</SelectItem>
                  <SelectItem value="cochabamba">Cochabamba</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Más filtros
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabla de propiedades */}
        <Card>
          <CardHeader>
            <CardTitle>Propiedades Pendientes de Moderación</CardTitle>
            <CardDescription>
              Lista de propiedades que requieren aprobación o rechazo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Propiedad</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Precio</TableHead>
                  <TableHead>Propietario</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingProperties.map((property) => (
                  <TableRow key={property.id}>
                    <TableCell className="font-medium">{property.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{property.title}</div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="mr-1 h-3 w-3" />
                          {property.location}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <ImageIcon className="mr-1 h-3 w-3" />
                          {property.images} imágenes
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          property.type === "Venta"
                            ? "default"
                            : property.type === "Alquiler"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {property.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <DollarSign className="mr-1 h-3 w-3" />
                        {property.price}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <User className="mr-1 h-3 w-3" />
                        {property.owner}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="mr-1 h-3 w-3" />
                        {property.submittedDate}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          property.status === "Pendiente"
                            ? "destructive"
                            : "secondary"
                        }
                      >
                        {property.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl">
                            <DialogHeader>
                              <DialogTitle>{property.title}</DialogTitle>
                              <DialogDescription>
                                Revisar detalles de la propiedad antes de
                                aprobar o rechazar
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-semibold mb-2">
                                    Información Básica
                                  </h4>
                                  <div className="space-y-2 text-sm">
                                    <div>
                                      <strong>Tipo:</strong> {property.type}
                                    </div>
                                    <div>
                                      <strong>Precio:</strong> {property.price}
                                    </div>
                                    <div>
                                      <strong>Ubicación:</strong>{" "}
                                      {property.location}
                                    </div>
                                    <div>
                                      <strong>Propietario:</strong>{" "}
                                      {property.owner}
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-semibold mb-2">
                                    Descripción
                                  </h4>
                                  <p className="text-sm text-muted-foreground">
                                    {property.description}
                                  </p>
                                </div>
                              </div>
                              <div>
                                <h4 className="font-semibold mb-2">
                                  Imágenes ({property.images})
                                </h4>
                                <div className="grid grid-cols-4 gap-2">
                                  {Array.from({
                                    length: Math.min(property.images, 8),
                                  }).map((_, i) => (
                                    <div
                                      key={i}
                                      className="aspect-square bg-muted rounded-md flex items-center justify-center"
                                    >
                                      <ImageIcon className="h-8 w-8 text-muted-foreground" />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <DialogFooter className="flex justify-between">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="destructive">
                                    <X className="mr-2 h-4 w-4" />
                                    Rechazar
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>
                                      Rechazar Propiedad
                                    </DialogTitle>
                                    <DialogDescription>
                                      Proporciona una razón para el rechazo que
                                      será enviada al propietario.
                                    </DialogDescription>
                                  </DialogHeader>
                                  <Textarea placeholder="Motivo del rechazo..." />
                                  <DialogFooter>
                                    <Button variant="outline">Cancelar</Button>
                                    <Button
                                      variant="destructive"
                                      onClick={() =>
                                        handleReject(property.id, "Motivo")
                                      }
                                    >
                                      Confirmar Rechazo
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                              <Button
                                onClick={() => handleApprove(property.id)}
                              >
                                <Check className="mr-2 h-4 w-4" />
                                Aprobar
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleApprove(property.id)}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleReject(property.id, "Revisión rápida")
                          }
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
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
