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
import { useConfirmNewPassword } from "@/hooks/auth/use-confirm-new-password";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  ConfirmNewPasswordFormValues,
  confirmNewPasswordSchema,
} from "./confirm-new-password-form-schema";

export function ConfirmNewPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const oobCode = searchParams.get("oobCode");

  const form = useForm<z.infer<typeof confirmNewPasswordSchema>>({
    resolver: zodResolver(confirmNewPasswordSchema),
    defaultValues: {
      password: "",
      passwordConfirm: "",
    },
  });

  const { mutateAsync: confirm, isPending } = useConfirmNewPassword();

  const isLoading = isPending;

  const onSubmit = async (values: ConfirmNewPasswordFormValues) => {
    try {
      await confirm({
        oobCode: oobCode || "",
        newPassword: values.password,
      });
      router.push("/auth/sign-in");
    } catch {}
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-sm">
        <Card className="rounded-none sm:rounded">
          <CardHeader>
            <CardTitle>Nova Senha:</CardTitle>
            <CardDescription>
              Crie uma nova senha para sua conta.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Informe sua senha:"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="passwordConfirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar senha:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Confirme sua senha:"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <p className="text-xs text-muted-foreground">
              Após o envio, você será redirecionado para o login.
            </p>

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                "Atualizar senha"
              )}
            </Button>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
