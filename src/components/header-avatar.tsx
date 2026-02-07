import { IUser } from "@/types/user";
import { formatDisplayName } from "@/utils/formatters/names/format-display-name";
import { formatNamePart } from "@/utils/formatters/names/format-name-part";
import NextLink from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";

type Props = {
  user: IUser | undefined;
  isLoading?: boolean;
};

export function HeaderAvatar({ user, isLoading }: Props) {
  const userName = user?.displayName
    ? formatDisplayName(user.displayName, { ignoreParticles: true })
    : null;
  const userEmail = user?.email ? user.email : null;
  const userInitials = user?.displayName
    ? formatNamePart("Vitor Ferreira", {
        mode: "initials",
        initialsStrategy: "first_last",
      })
    : null;

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <div className="hidden sm:flex flex-col items-end gap-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-40" />
        </div>

        <Skeleton className="h-9 w-9 rounded" />
      </div>
    );
  }

  return (
    <NextLink href="/profile">
      <div className="flex items-center gap-2 cursor-pointer">
        <div className="hidden sm:flex flex-col">
          {userName && (
            <span className="text-sm text-right">Olá, {userName}</span>
          )}

          {userEmail && (
            <span className="text-xs text-muted-foreground text-right">
              {userEmail}
            </span>
          )}
        </div>

        {userInitials && (
          <Avatar className="h-9 w-9 rounded">
            <AvatarImage src="" className="rounded" />
            <AvatarFallback className="rounded">{userInitials}</AvatarFallback>
          </Avatar>
        )}
      </div>
    </NextLink>
  );
}
