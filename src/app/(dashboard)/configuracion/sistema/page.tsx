"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
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
  Save,
  RotateCcw,
  AlertTriangle,
  Bell,
  Database,
  Send,
  Users,
  Building2,
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export default function ConfiguracionSistemaPage() {
  const { toast } = useToast();
  const [hasChanges, setHasChanges] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationTarget, setNotificationTarget] = useState("all");
  const [notificationsUsed, setNotificationsUsed] = useState(12);
  const [notificationLimit] = useState(50);

  const handleSave = () => {
    toast({
      title: "Configuración guardada",
      description: "Los cambios han sido aplicados exitosamente.",
    });
    setHasChanges(false);
  };

  const handleReset = () => {
    toast({
      title: "Configuración restablecida",
      description: "Se han restaurado los valores por defecto.",
    });
    setHasChanges(false);
  };

  const handleSendNotification = () => {
    if (!notificationTitle.trim() || !notificationMessage.trim()) {
      toast({
        title: "Error",
        description:
          "Por favor completa el título y mensaje de la notificación.",
        variant: "destructive",
      });
      return;
    }

    if (notificationsUsed >= notificationLimit) {
      toast({
        title: "Límite alcanzado",
        description: "Has alcanzado el límite mensual de notificaciones.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Notificación enviada",
      description: `Notificación enviada a ${
        notificationTarget === "all" ? "todos los usuarios" : "propietarios"
      }.`,
    });

    setNotificationsUsed((prev) => prev + 1);
    setNotificationTitle("");
    setNotificationMessage("");
    setHasChanges(true);
  };

  const getTargetUsers = (target: string) => {
    switch (target) {
      case "all":
        return "12,847 usuarios";
      case "owners":
        return "3,456 propietarios";
      case "buyers":
        return "9,391 compradores";
      default:
        return "0 usuarios";
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
                <BreadcrumbLink href="/configuracion">
                  Configuración
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Sistema</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="ml-auto px-4 flex gap-2">
          {hasChanges && (
            <>
              <Button variant="outline" onClick={handleReset}>
                <RotateCcw className="mr-2 h-4 w-4" />
                Restablecer
              </Button>
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Guardar Cambios
              </Button>
            </>
          )}
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <Tabs defaultValue="notificaciones" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="notificaciones">Notificaciones</TabsTrigger>
            <TabsTrigger value="limites">Límites</TabsTrigger>
          </TabsList>

          <TabsContent value="notificaciones" className="space-y-4">
            {/* Estadísticas de notificaciones */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Notificaciones Enviadas
                  </CardTitle>
                  <Bell className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{notificationsUsed}</div>
                  <p className="text-xs text-muted-foreground">Este mes</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Límite Mensual
                  </CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{notificationLimit}</div>
                  <p className="text-xs text-muted-foreground">
                    Notificaciones máximas
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Disponibles
                  </CardTitle>
                  <Send className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {notificationLimit - notificationsUsed}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Restantes este mes
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Barra de progreso del límite */}
            <Card>
              <CardHeader>
                <CardTitle>Uso del Límite Mensual</CardTitle>
                <CardDescription>
                  Has usado {notificationsUsed} de {notificationLimit}{" "}
                  notificaciones este mes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className={`h-2.5 rounded-full ${
                      (notificationsUsed / notificationLimit) * 100 > 80
                        ? "bg-red-600"
                        : (notificationsUsed / notificationLimit) * 100 > 60
                          ? "bg-yellow-600"
                          : "bg-blue-600"
                    }`}
                    style={{
                      width: `${(notificationsUsed / notificationLimit) * 100}%`,
                    }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                  <span>0</span>
                  <span>
                    {Math.round((notificationsUsed / notificationLimit) * 100)}%
                    usado
                  </span>
                  <span>{notificationLimit}</span>
                </div>
              </CardContent>
            </Card>

            {/* Crear nueva notificación */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="mr-2 h-5 w-5" />
                  Crear Nueva Notificación
                </CardTitle>
                <CardDescription>
                  Envía notificaciones masivas a usuarios de la plataforma
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="notification-target">Destinatarios</Label>
                    <Select
                      value={notificationTarget}
                      onValueChange={setNotificationTarget}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">
                          <div className="flex items-center">
                            <Users className="mr-2 h-4 w-4" />
                            Todos los usuarios
                          </div>
                        </SelectItem>
                        <SelectItem value="owners">
                          <div className="flex items-center">
                            <Building2 className="mr-2 h-4 w-4" />
                            Solo propietarios
                          </div>
                        </SelectItem>
                        <SelectItem value="buyers">
                          <div className="flex items-center">
                            <Users className="mr-2 h-4 w-4" />
                            Solo compradores
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">
                      Se enviará a: {getTargetUsers(notificationTarget)}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notification-title">
                      Título de la Notificación
                    </Label>
                    <Input
                      id="notification-title"
                      placeholder="Ej: Nueva funcionalidad disponible"
                      value={notificationTitle}
                      onChange={(e) => setNotificationTitle(e.target.value)}
                      maxLength={100}
                    />
                    <p className="text-xs text-muted-foreground">
                      {notificationTitle.length}/100 caracteres
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notification-message">Mensaje</Label>
                    <Textarea
                      id="notification-message"
                      placeholder="Escribe el contenido de la notificación..."
                      value={notificationMessage}
                      onChange={(e) => setNotificationMessage(e.target.value)}
                      rows={4}
                      maxLength={500}
                    />
                    <p className="text-xs text-muted-foreground">
                      {notificationMessage.length}/500 caracteres
                    </p>
                  </div>

                  {/* Vista previa */}
                  {(notificationTitle || notificationMessage) && (
                    <div className="p-4 border rounded-lg bg-blue-50 border-blue-200">
                      <h4 className="font-medium text-sm mb-2">
                        Vista Previa:
                      </h4>
                      <div className="bg-white p-3 rounded border shadow-sm">
                        <div className="flex items-center mb-2">
                          <Bell className="h-4 w-4 text-blue-500 mr-2" />
                          <span className="font-medium text-sm">
                            {notificationTitle || "Título de la notificación"}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {notificationMessage || "Contenido del mensaje..."}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4">
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={
                          notificationsUsed >= notificationLimit
                            ? "destructive"
                            : "default"
                        }
                      >
                        {notificationsUsed}/{notificationLimit} usadas
                      </Badge>
                      {notificationsUsed >= notificationLimit && (
                        <span className="text-sm text-red-600">
                          Límite alcanzado
                        </span>
                      )}
                    </div>
                    <Button
                      onClick={handleSendNotification}
                      disabled={
                        !notificationTitle.trim() ||
                        !notificationMessage.trim() ||
                        notificationsUsed >= notificationLimit
                      }
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Enviar Notificación
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Configuraciones de notificaciones automáticas */}
            <Card>
              <CardHeader>
                <CardTitle>Notificaciones Automáticas del Sistema</CardTitle>
                <CardDescription>
                  Configurar notificaciones automáticas que no cuentan para el
                  límite mensual
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Nuevas Propiedades</Label>
                      <p className="text-sm text-muted-foreground">
                        Notificar cuando se publique una nueva propiedad
                      </p>
                    </div>
                    <Switch
                      defaultChecked
                      onCheckedChange={() => setHasChanges(true)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Transacciones Completadas</Label>
                      <p className="text-sm text-muted-foreground">
                        Notificar cuando se complete una transacción
                      </p>
                    </div>
                    <Switch
                      defaultChecked
                      onCheckedChange={() => setHasChanges(true)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Recordatorios de Verificación</Label>
                      <p className="text-sm text-muted-foreground">
                        Recordar a usuarios completar su verificación
                      </p>
                    </div>
                    <Switch
                      defaultChecked
                      onCheckedChange={() => setHasChanges(true)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Alertas de Seguridad</Label>
                      <p className="text-sm text-muted-foreground">
                        Notificaciones críticas de seguridad
                      </p>
                    </div>
                    <Switch
                      defaultChecked
                      onCheckedChange={() => setHasChanges(true)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="limites" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="mr-2 h-5 w-5" />
                  Límites del Sistema
                </CardTitle>
                <CardDescription>
                  Configurar límites de uso y quotas por usuario
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Límites por Usuario</h4>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="max-properties-free">
                        Propiedades Máximas (Usuario Gratuito)
                      </Label>
                      <Input
                        id="max-properties-free"
                        type="number"
                        defaultValue="3"
                        onChange={() => setHasChanges(true)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="max-properties-premium">
                        Propiedades Máximas (Usuario Premium)
                      </Label>
                      <Input
                        id="max-properties-premium"
                        type="number"
                        defaultValue="50"
                        onChange={() => setHasChanges(true)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="max-images">Imágenes por Propiedad</Label>
                      <Input
                        id="max-images"
                        type="number"
                        defaultValue="20"
                        onChange={() => setHasChanges(true)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="max-file-size">
                        Tamaño Máximo de Imagen (MB)
                      </Label>
                      <Input
                        id="max-file-size"
                        type="number"
                        defaultValue="5"
                        onChange={() => setHasChanges(true)}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Rate Limits (API)</h4>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="api-requests-minute">
                        Requests por Minuto
                      </Label>
                      <Input
                        id="api-requests-minute"
                        type="number"
                        defaultValue="100"
                        onChange={() => setHasChanges(true)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="api-requests-hour">
                        Requests por Hora
                      </Label>
                      <Input
                        id="api-requests-hour"
                        type="number"
                        defaultValue="1000"
                        onChange={() => setHasChanges(true)}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Límites de Búsqueda</h4>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="search-results-page">
                        Resultados por Página
                      </Label>
                      <Input
                        id="search-results-page"
                        type="number"
                        defaultValue="20"
                        onChange={() => setHasChanges(true)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="search-radius-max">
                        Radio Máximo de Búsqueda (km)
                      </Label>
                      <Input
                        id="search-radius-max"
                        type="number"
                        defaultValue="50"
                        onChange={() => setHasChanges(true)}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-medium">
                    Límites de Notificaciones
                  </h4>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="notification-limit">
                        Notificaciones Manuales por Mes
                      </Label>
                      <Input
                        id="notification-limit"
                        type="number"
                        defaultValue="50"
                        onChange={() => setHasChanges(true)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="notification-rate">
                        Intervalo Mínimo entre Notificaciones (horas)
                      </Label>
                      <Input
                        id="notification-rate"
                        type="number"
                        defaultValue="2"
                        onChange={() => setHasChanges(true)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Zona de Peligro */}
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="flex items-center text-destructive">
              <AlertTriangle className="mr-2 h-5 w-5" />
              Zona de Peligro
            </CardTitle>
            <CardDescription>
              Acciones irreversibles que afectan todo el sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-destructive rounded-lg">
              <div>
                <h4 className="font-medium">Reiniciar Sistema</h4>
                <p className="text-sm text-muted-foreground">
                  Reinicia todos los servicios de la aplicación
                </p>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Reiniciar</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta acción reiniciará todos los servicios del sistema.
                      Los usuarios experimentarán una interrupción temporal del
                      servicio.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                      Confirmar Reinicio
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  );
}
