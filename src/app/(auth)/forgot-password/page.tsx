import type { Metadata } from "next";
import { Card } from "@/components/ui/card";
import AuthLayout from "@/components/auth/auth-layout";
import { ForgotPasswordForm } from "@/components/auth/forgot-password/components/forgot-password-form";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Recuperar Contraseña - PREDIO",
  description: "Recupera tu contraseña",
};

export default function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <Card className="p-6">
        <div className="flex flex-col space-y-2 text-left">
          <h1 className="text-2xl font-semibold tracking-tight">
            Recuperar Contraseña
          </h1>
          <p className="text-sm text-muted-foreground">
            Ingresa tu correo electrónico para recibir un enlace de
            recuperación.{" "}
            <Link
              href="/sign-in"
              className="underline underline-offset-4 hover:text-primary"
            >
              Volver a Iniciar Sesión
            </Link>
          </p>
        </div>
        <ForgotPasswordForm />
      </Card>
    </AuthLayout>
  );
}
