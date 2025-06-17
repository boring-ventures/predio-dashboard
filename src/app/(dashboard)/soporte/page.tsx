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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  HeadphonesIcon,
  Send,
  MessageCircle,
  Clock,
  Activity,
  Mail,
} from "lucide-react";
import { useState } from "react";

type ChatMessage = {
  id: number;
  user: string;
  message: string;
  timestamp: string;
  isUser: boolean;
};

type ActiveChat = {
  id: string;
  user: string;
  email: string;
  lastMessage: string;
  timestamp: string;
  status: string;
  priority: string;
  agent: string;
};

const chatMessages: ChatMessage[] = [
  {
    id: 1,
    user: "María González",
    message: "Hola, necesito ayuda con la subida de imágenes",
    timestamp: "14:30",
    isUser: true,
  },
  {
    id: 2,
    user: "Carlos Admin",
    message: "Hola María, ¿podrías decirme qué navegador estás usando?",
    timestamp: "14:32",
    isUser: false,
  },
  {
    id: 3,
    user: "María González",
    message: "Estoy usando Chrome en mi computadora",
    timestamp: "14:33",
    isUser: true,
  },
  {
    id: 4,
    user: "Carlos Admin",
    message: "Perfecto, ¿podrías intentar limpiar el caché del navegador?",
    timestamp: "14:35",
    isUser: false,
  },
  {
    id: 5,
    user: "María González",
    message: "¡Funcionó! Muchas gracias por la ayuda",
    timestamp: "14:38",
    isUser: true,
  },
];

const activeChats: ActiveChat[] = [
  {
    id: "CHAT-001",
    user: "María González",
    email: "maria.gonzalez@email.com",
    lastMessage: "¡Funcionó! Muchas gracias por la ayuda",
    timestamp: "14:38",
    status: "Resuelto",
    priority: "Media",
    agent: "Carlos Admin",
  },
  {
    id: "CHAT-002",
    user: "Roberto Silva",
    email: "roberto.silva@email.com",
    lastMessage: "Tengo problemas para verificar mi cuenta",
    timestamp: "14:45",
    status: "Activo",
    priority: "Alta",
    agent: "Ana Soporte",
  },
  {
    id: "CHAT-003",
    user: "Patricia López",
    email: "patricia.lopez@email.com",
    lastMessage: "¿Cómo puedo cambiar mi plan a premium?",
    timestamp: "14:52",
    status: "En Espera",
    priority: "Baja",
    agent: "No asignado",
  },
  {
    id: "CHAT-004",
    user: "Luis Mendoza",
    email: "luis.mendoza@email.com",
    lastMessage: "Mi propiedad no aparece en los resultados de búsqueda",
    timestamp: "15:01",
    status: "Activo",
    priority: "Media",
    agent: "María Soporte",
  },
];

export default function SoportePage() {
  const [selectedChat, setSelectedChat] = useState<ActiveChat>(activeChats[0]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log("Enviando mensaje:", newMessage);
      setNewMessage("");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Activo":
        return "default";
      case "En Espera":
        return "secondary";
      case "Resuelto":
        return "outline";
      default:
        return "secondary";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
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
              <BreadcrumbItem>
                <BreadcrumbPage>Soporte</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        {/* Estadísticas de Soporte */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Chats Activos
              </CardTitle>
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6</div>
              <p className="text-xs text-muted-foreground">
                +2 desde hace 1 hora
              </p>
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
              <div className="text-2xl font-bold">4.3min</div>
              <p className="text-xs text-muted-foreground">-0.5min vs ayer</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Chats Resueltos Hoy
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">35</div>
              <p className="text-xs text-muted-foreground">+8 vs ayer</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Satisfacción
              </CardTitle>
              <HeadphonesIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.8/5</div>
              <p className="text-xs text-muted-foreground">
                Basado en 156 respuestas
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="chat" className="w-full">
          <TabsList className="grid w-full grid-cols-1">
            <TabsTrigger value="chat">Chat en Vivo</TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              {/* Lista de chats activos */}
              <Card>
                <CardHeader>
                  <CardTitle>Chats Activos</CardTitle>
                  <CardDescription>
                    Conversaciones en tiempo real
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-[600px] overflow-y-auto">
                    {activeChats.map((chat) => (
                      <div
                        key={chat.id}
                        className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-muted transition-colors ${
                          selectedChat.id === chat.id
                            ? "bg-muted border-primary"
                            : ""
                        }`}
                        onClick={() => setSelectedChat(chat)}
                      >
                        <Avatar>
                          <AvatarFallback>
                            {chat.user
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <div className="font-medium truncate">
                              {chat.user}
                            </div>
                            <div className="flex items-center space-x-1">
                              <Badge
                                variant={getStatusColor(chat.status)}
                                className="text-xs"
                              >
                                {chat.status}
                              </Badge>
                              <Badge
                                variant={getPriorityColor(chat.priority)}
                                className="text-xs"
                              >
                                {chat.priority}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground truncate">
                            {chat.lastMessage}
                          </div>
                          <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
                            <span>{chat.timestamp}</span>
                            <span>{chat.agent}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Ventana de chat */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Avatar className="mr-3">
                        <AvatarFallback>
                          {selectedChat.user
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{selectedChat.user}</div>
                        <div className="text-sm text-muted-foreground flex items-center">
                          <Mail className="mr-1 h-3 w-3" />
                          {selectedChat.email}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={getStatusColor(selectedChat.status)}>
                        {selectedChat.status}
                      </Badge>
                      <Badge variant={getPriorityColor(selectedChat.priority)}>
                        {selectedChat.priority}
                      </Badge>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 h-[500px] overflow-y-auto mb-4 p-4 border rounded-lg bg-gray-50">
                    {chatMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.isUser ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[70%] p-3 rounded-lg ${
                            message.isUser
                              ? "bg-primary text-primary-foreground"
                              : "bg-white border"
                          }`}
                        >
                          <div className="text-sm">{message.message}</div>
                          <div
                            className={`text-xs mt-1 ${
                              message.isUser
                                ? "text-primary-foreground/70"
                                : "text-muted-foreground"
                            }`}
                          >
                            {message.timestamp}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Escribe tu mensaje..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleSendMessage()
                      }
                    />
                    <Button onClick={handleSendMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                    <span>Asignado a: {selectedChat.agent}</span>
                    <span>Última actividad: {selectedChat.timestamp}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </SidebarInset>
  );
}
