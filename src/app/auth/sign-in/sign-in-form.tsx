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
import { useSignIn } from "@/hooks/auth/use-sign-in";
import { useSignInWithGoogle } from "@/hooks/auth/use-sign-with-google";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SignInFormValues, signInSchema } from "./sign-in-form-schema";

export function SignInForm() {
  const { push } = useRouter();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutateAsync: signIn, isPending: isPendingSignIn } = useSignIn();
  const { mutateAsync: signInWithGoogle, isPending: isPendingSignInWithGoogle } = useSignInWithGoogle();

  const isLoading = isPendingSignIn || isPendingSignInWithGoogle;

  const onSubmit = async (values: SignInFormValues) => {
    await signIn(values);
    push("/");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-sm">
        <Card className="rounded-none sm:rounded">
          <CardHeader>
            <CardTitle>Acessar conta:</CardTitle>
            <CardDescription>
              Entre com suas credenciais para acessar sua conta.
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

            <NextLink
              href="/auth/reset-password"
              className="ml-auto text-sm text-muted-foreground"
            >
              Esqueceu sua senha?
            </NextLink>

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                "Entrar"
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
              onClick={() => signInWithGoogle()}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                "Google"
              )}
            </Button>

            <div className="w-full flex items-center gap-2">
              <Separator className="shrink" />
              <span className="min-w-fit text-xs text-muted-foreground">
                Não tem uma conta?
              </span>
              <Separator className="shrink" />
            </div>

            <Button
              asChild
              variant="outline"
              disabled={isLoading}
              className="w-full"
            >
              <NextLink href="/auth/sign-up">
                {isLoading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  "Criar conta"
                )}
              </NextLink>
            </Button>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
