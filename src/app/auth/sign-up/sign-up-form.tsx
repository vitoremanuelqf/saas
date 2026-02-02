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
import { useSignUp } from "@/hooks/auth/use-sign-up";
import { useSignInWithGoogle } from "@/hooks/auth/use-sign-with-google";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SignUpFormValues, signUpSchema } from "./sign-up-form-schema";

export function SignUpForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      displayName: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const { mutateAsync: signUp, isPending: isPendingSignUp } = useSignUp();
  const {
    mutateAsync: signInWithGoogle,
    isPending: isPendingSignInWithGoogle,
  } = useSignInWithGoogle();

  const isLoading = isPendingSignUp || isPendingSignInWithGoogle;

  const onSubmit = async (values: SignUpFormValues) => {
    try {
      await signUp(values);
      router.push("/");
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
            <CardTitle>Criar conta:</CardTitle>
            <CardDescription>Inscreva-se para começar.</CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Informe seu nome:"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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

            <FormField
              control={form.control}
              name="passwordConfirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha:</FormLabel>
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
                "Criar conta"
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

            <div className="w-full flex items-center gap-2">
              <Separator className="shrink" />
              <span className="min-w-fit text-xs text-muted-foreground">
                Já possui uma conta?
              </span>
              <Separator className="shrink" />
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/auth/sign-in")}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                "Entrar"
              )}
            </Button>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
