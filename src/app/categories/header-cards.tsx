import { Card, CardContent } from "@/components/ui/card";
import { Layers, Receipt, Utensils } from "lucide-react";

export function HeaderCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      <Card className="rounded p-0">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex size-8 items-center justify-center">
              <Layers className="size-8" />
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-2xl font-semibold leading-none">1</span>
              <span className="text-xs text-muted-foreground">
                Total de categorias
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded p-0">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex size-8 items-center justify-center">
              <Receipt className="size-8" />
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-2xl font-semibold leading-none">1</span>
              <span className="text-xs text-muted-foreground">
                Total de transações
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded p-0 sm:col-span-2 md:col-span-1">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex size-8 items-center justify-center">
              <Utensils className="size-8" />
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-2xl font-medium leading-none">
                Alimentação
              </span>
              <span className="text-xs text-muted-foreground">
                Categoria mais utilizada
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
