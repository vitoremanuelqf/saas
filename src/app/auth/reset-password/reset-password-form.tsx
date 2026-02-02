"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useResetPassword } from "@/hooks/auth/use-reset-password";
import { useSignInWithGoogle } from "@/hooks/auth/use-sign-with-google";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  ResetPasswordFormValues,
  resetPasswordSchema,
} from "./reset-password-form-schema";

export function ResetPasswordForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutateAsync: resetPassword, isPending: isPendingResetPassword } =
    useResetPassword();
  const {
    mutateAsync: signInWithGoogle,
    isPending: isPendingSignInWithGoogle,
  } = useSignInWithGoogle();

  const isLoading = isPendingResetPassword || isPendingSignInWithGoogle;

  const onSubmit = async (values: ResetPasswordFormValues) => {
    try {
      await resetPassword(values);
      router.push("/auth/sign-in");
    } catch {}
  };

  const onGoogle = async () => {
    try {
      await signInWithGoogle();
      router.push("/");
    } catch {}
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-sm">
        <Card className="rounded-none sm:rounded">
          <CardHeader>
            <CardTitle>Recuperar senha:</CardTitle>
            <CardDescription>
              Digite seu e-mail para receber o link de redefinição de senha.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Informe seu email:"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <p className="text-xs text-muted-foreground">
              Um email de redefinição será enviado.
            </p>

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                "Recuperar senha"
              )}
            </Button>

            <div className="w-full flex items-center gap-2">
              <Separator className="shrink" />
              <span className="min-w-fit text-xs text-muted-foreground">
                Outras opções de entrada
              </span>
              <Separator className="shrink" />
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={() => onGoogle()}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                "Google"
              )}
            </Button>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
