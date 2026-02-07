type FormatNamePartMode = "initials" | "abbrev";

type FormatNamePartOptions = {
  mode?: FormatNamePartMode;
  ignoreParticles?: boolean;
  initialsStrategy?: "first_last" | "first_only" | "first_two";
  collapseIfSameInitial?: boolean;
  maxLength?: number;
};

const DEFAULT_PARTICLES = ["da", "de", "do", "das", "dos", "e"];

function normalizeParts(name: string, ignoreParticles: boolean) {
  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (!ignoreParticles) return parts;

  return parts.filter((p) => !DEFAULT_PARTICLES.includes(p.toLowerCase()));
}

export function formatNamePart(
  name?: string | null,
  options: FormatNamePartOptions = {},
): string {
  if (!name || !name.trim()) return "";

  const {
    mode = "initials",
    ignoreParticles = true,
    initialsStrategy = "first_last",
    collapseIfSameInitial = true,
    maxLength,
  } = options;

  const parts = normalizeParts(name, ignoreParticles);
  if (parts.length === 0) return "";

  if (mode === "abbrev") {
    const first = parts[0];
    const last = parts.length > 1 ? parts[parts.length - 1] : "";

    const result =
      last && last.toLowerCase() !== first.toLowerCase()
        ? `${first} ${last[0].toUpperCase()}.`
        : first;

    return maxLength ? result.slice(0, maxLength) : result;
  }

  const first = parts[0];
  const last = parts[parts.length - 1];

  let result = "";

  if (initialsStrategy === "first_only") {
    result = first[0].toUpperCase();
  } else if (initialsStrategy === "first_two") {
    result =
      parts.length === 1
        ? first.slice(0, 2).toUpperCase()
        : first[0].toUpperCase();
  } else {
    const firstInitial = first[0].toUpperCase();
    const lastInitial = last[0].toUpperCase();

    result =
      collapseIfSameInitial && firstInitial === lastInitial
        ? firstInitial
        : `${firstInitial}${lastInitial}`;
  }

  result = result.toUpperCase();

  return maxLength ? result.slice(0, maxLength) : result;
}

// Uso:
// formatNamePart("Vitor Viana", { mode: "initials", initialsStrategy: "first_last" })
// "V"
// formatNamePart("Vitor Ferreira", { mode: "initials", initialsStrategy: "first_last" })
// "VF"
// formatNamePart("Vitor", { mode: "initials", initialsStrategy: "first_two" })
// "VI"
// formatNamePart("Vitor Ferreira", { mode: "abbrev" })
// "Vitor F."
// formatNamePart("Vitor da Silva", { ignoreParticles: false })
// "VD"
