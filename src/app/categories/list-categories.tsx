import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Edit, Layers, Trash } from "lucide-react";

export function ListCategories() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <Card className="rounded p-0 gap-0">
        <CardHeader className="pb-0 pt-6 px-6">
          <div className="w-full h-auto flex items-start justify-between">
            <div className="size-10 flex items-center justify-center border">
              <Layers className="size-4" />
            </div>

            <div className="flex items-center justify-center gap-2">
              <Button size="icon" variant="outline">
                <Trash />
              </Button>
              <Button size="icon" variant="outline">
                <Edit />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="px-6 py-5">
          <div className="w-full h-auto flex flex-col gap-1">
            <span className="text-base font-semibold leading-none">
              Alimentação
            </span>

            <span className="text-sm text-muted-foreground">
              Restaurantes, delivery e refeições
            </span>
          </div>
        </CardContent>

        <CardFooter className="pb-6 pt-0 px-6">
          <div className="w-full h-auto flex items-center justify-between">
            <Badge>Alimentação</Badge>
            <span className="text-sm text-muted-foreground">12 itens</span>
          </div>
        </CardFooter>
      </Card>

      <Card className="rounded p-0 gap-0">
        <CardHeader className="pb-0 pt-6 px-6">
          <div className="w-full h-auto flex items-start justify-between">
            <div className="size-10 flex items-center justify-center border">
              <Layers className="size-4" />
            </div>

            <div className="flex items-center justify-center gap-2">
              <Button size="icon" variant="outline">
                <Trash />
              </Button>
              <Button size="icon" variant="outline">
                <Edit />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="px-6 py-5">
          <div className="w-full h-auto flex flex-col gap-1">
            <span className="text-base font-semibold leading-none">
              Alimentação
            </span>

            <span className="text-sm text-muted-foreground">
              Restaurantes, delivery e refeições
            </span>
          </div>
        </CardContent>

        <CardFooter className="pb-6 pt-0 px-6">
          <div className="w-full h-auto flex items-center justify-between">
            <Badge>Alimentação</Badge>
            <span className="text-sm text-muted-foreground">12 itens</span>
          </div>
        </CardFooter>
      </Card>

      <Card className="rounded p-0 gap-0">
        <CardHeader className="pb-0 pt-6 px-6">
          <div className="w-full h-auto flex items-start justify-between">
            <div className="size-10 flex items-center justify-center border">
              <Layers className="size-4" />
            </div>

            <div className="flex items-center justify-center gap-2">
              <Button size="icon" variant="outline">
                <Trash />
              </Button>
              <Button size="icon" variant="outline">
                <Edit />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="px-6 py-5">
          <div className="w-full h-auto flex flex-col gap-1">
            <span className="text-base font-semibold leading-none">
              Alimentação
            </span>

            <span className="text-sm text-muted-foreground">
              Restaurantes, delivery e refeições
            </span>
          </div>
        </CardContent>

        <CardFooter className="pb-6 pt-0 px-6">
          <div className="w-full h-auto flex items-center justify-between">
            <Badge>Alimentação</Badge>
            <span className="text-sm text-muted-foreground">12 itens</span>
          </div>
        </CardFooter>
      </Card>

      <Card className="rounded p-0 gap-0">
        <CardHeader className="pb-0 pt-6 px-6">
          <div className="w-full h-auto flex items-start justify-between">
            <div className="size-10 flex items-center justify-center border">
              <Layers className="size-4" />
            </div>

            <div className="flex items-center justify-center gap-2">
              <Button size="icon" variant="outline">
                <Trash />
              </Button>
              <Button size="icon" variant="outline">
                <Edit />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="px-6 py-5">
          <div className="w-full h-auto flex flex-col gap-1">
            <span className="text-base font-semibold leading-none">
              Alimentação
            </span>

            <span className="text-sm text-muted-foreground">
              Restaurantes, delivery e refeições
            </span>
          </div>
        </CardContent>

        <CardFooter className="pb-6 pt-0 px-6">
          <div className="w-full h-auto flex items-center justify-between">
            <Badge>Alimentação</Badge>
            <span className="text-sm text-muted-foreground">12 itens</span>
          </div>
        </CardFooter>
      </Card>

      <Card className="rounded p-0 gap-0">
        <CardHeader className="pb-0 pt-6 px-6">
          <div className="w-full h-auto flex items-start justify-between">
            <div className="size-10 flex items-center justify-center border">
              <Layers className="size-4" />
            </div>

            <div className="flex items-center justify-center gap-2">
              <Button size="icon" variant="outline">
                <Trash />
              </Button>
              <Button size="icon" variant="outline">
                <Edit />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="px-6 py-5">
          <div className="w-full h-auto flex flex-col gap-1">
            <span className="text-base font-semibold leading-none">
              Alimentação
            </span>

            <span className="text-sm text-muted-foreground">
              Restaurantes, delivery e refeições
            </span>
          </div>
        </CardContent>

        <CardFooter className="pb-6 pt-0 px-6">
          <div className="w-full h-auto flex items-center justify-between">
            <Badge>Alimentação</Badge>
            <span className="text-sm text-muted-foreground">12 itens</span>
          </div>
        </CardFooter>
      </Card>

      <Card className="rounded p-0 gap-0">
        <CardHeader className="pb-0 pt-6 px-6">
          <div className="w-full h-auto flex items-start justify-between">
            <div className="size-10 flex items-center justify-center border">
              <Layers className="size-4" />
            </div>

            <div className="flex items-center justify-center gap-2">
              <Button size="icon" variant="outline">
                <Trash />
              </Button>
              <Button size="icon" variant="outline">
                <Edit />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="px-6 py-5">
          <div className="w-full h-auto flex flex-col gap-1">
            <span className="text-base font-semibold leading-none">
              Alimentação
            </span>

            <span className="text-sm text-muted-foreground">
              Restaurantes, delivery e refeições
            </span>
          </div>
        </CardContent>

        <CardFooter className="pb-6 pt-0 px-6">
          <div className="w-full h-auto flex items-center justify-between">
            <Badge>Alimentação</Badge>
            <span className="text-sm text-muted-foreground">12 itens</span>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
