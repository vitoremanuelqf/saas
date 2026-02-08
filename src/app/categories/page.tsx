import { Header } from "@/components/header";
import { Main } from "@/components/main";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { HeaderCards } from "./header-cards";
import { ListCategories } from "./list-categories";

export default function Categories() {
  return (
    <div>
      <Header />
      <Main>
        <div className="w-full h-auto flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-medium tracking-tight">Categorias:</h1>
            <p className="text-base text-muted-foreground">
              Organize suas transações por categorias
            </p>
          </div>

          <Button>
            <Plus />
            Nova categoria
          </Button>
        </div>

        <HeaderCards />
        <ListCategories />
      </Main>
    </div>
  );
}
