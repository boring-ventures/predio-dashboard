"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FacebookIcon, GithubIcon, UploadCloud } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/utils/password-input";
import { PasswordStrengthIndicator } from "@/components/utils/password-strength-indicator";
import type { SignUpFormProps, SignUpFormData } from "@/types/auth/sign-up";
import { signUpFormSchema } from "@/types/auth/sign-up";
import { toast } from "@/components/ui/use-toast";
import Image from "next/image";
import { uploadAvatar } from "@/lib/supabase/upload-avatar";
import { useRouter } from "next/navigation";
import { saltAndHashPassword } from "@/lib/auth/password-crypto";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SignUpForm({ className, ...props }: SignUpFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const router = useRouter();

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      client_type: "Individual",
      password: "",
      confirmPassword: "",
    },
  });

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    form.setValue("password", e.target.value);
  };

  async function onSubmit(data: SignUpFormData) {
    try {
      setIsLoading(true);

      // Hash the password with email as salt before sending to server
      const hashedPassword = await saltAndHashPassword(
        data.password,
        data.email
      );

      const { success, user, session, confirmEmail, error } = await signUp(
        data.email,
        hashedPassword
      );

      if (!success || error) {
        throw error || new Error("Failed to sign up");
      }

      if (user) {
        let profile_image_url = null;
        if (avatarFile) {
          try {
            profile_image_url = await uploadAvatar(avatarFile, user.id);
          } catch (error) {
            console.error("Avatar upload failed:", error);
            toast({
              title: "Warning",
              description:
                "Failed to upload avatar, you can add it later from your profile.",
              variant: "default",
            });
          }
        }

        const response = await fetch("/api/profile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.id,
            firstName: data.firstName,
            lastName: data.lastName,
            profile_image_url,
            client_type: data.client_type,
          }),
        });

        console.log("Profile API response status:", response.status);

        let result: Record<string, unknown>;
        let text = "";

        try {
          text = await response.text();
          console.log("Profile API response text:", text);
          result = text ? JSON.parse(text) : {};

          if (!response.ok) {
            console.error("Profile creation failed:", result);
            throw new Error(
              typeof result.error === "string"
                ? result.error
                : `Server responded with status ${response.status}: ${text}`
            );
          }
        } catch (parseError) {
          console.error(
            "Response parsing error:",
            parseError,
            "Response text:",
            text,
            "Status:",
            response.status
          );
          if (!response.ok) {
            throw new Error(
              `Server error (${response.status}): ${text || "No response body"}`
            );
          }
          throw new Error("Invalid server response");
        }

        toast({
          title: "Success",
          description:
            "Your account has been created! Please verify your email to continue.",
        });

        // Redirect to verification page instead of dashboard if email confirmation is required
        if (confirmEmail) {
          router.push("/verify-email");
        } else if (session) {
          router.push("/dashboard");
        }
      }
    } catch (error) {
      console.error("Sign up error:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.";

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="name@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Avatar Upload */}
            <div className="flex flex-col items-center space-y-2">
              <div className="h-20 w-20 overflow-hidden rounded-full border border-dashed border-gray-300">
                {avatarPreview ? (
                  <Image
                    src={avatarPreview}
                    alt="Avatar preview"
                    width={80}
                    height={80}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gray-50">
                    <UploadCloud className="h-8 w-8 text-gray-400" />
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <label
                  htmlFor="avatar-upload"
                  className="cursor-pointer text-sm text-primary underline hover:text-primary/80"
                >
                  Upload Avatar
                </label>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="client_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select client type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Individual">Individual</SelectItem>
                      <SelectItem value="Business">Business</SelectItem>
                      <SelectItem value="Corporate">Corporate</SelectItem>
                      <SelectItem value="Enterprise">Enterprise</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder="********"
                      {...field}
                      onChange={handlePasswordChange}
                    />
                  </FormControl>
                  <PasswordStrengthIndicator password={password} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="mt-2" disabled={isLoading}>
              Create Account
            </Button>

            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="w-full"
                type="button"
                disabled={isLoading}
              >
                <GithubIcon className="h-4 w-4" /> GitHub
              </Button>
              <Button
                variant="outline"
                className="w-full"
                type="button"
                disabled={isLoading}
              >
                <FacebookIcon className="h-4 w-4" /> Facebook
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
