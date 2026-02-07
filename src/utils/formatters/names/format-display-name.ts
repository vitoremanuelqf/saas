const DEFAULT_PARTICLES = ["da", "de", "do", "das", "dos", "e"];

type FormatDisplayNameOptions = {
  ignoreParticles?: boolean;
};

export function formatDisplayName(
  name?: string | null,
  options: FormatDisplayNameOptions = {},
): string {
  if (!name?.trim()) return "";

  const { ignoreParticles = false } = options;

  const parts = name.trim().split(/\s+/).filter(Boolean);

  const filtered = ignoreParticles
    ? parts.filter((p) => !DEFAULT_PARTICLES.includes(p.toLowerCase()))
    : parts;

  if (filtered.length === 0) return "";

  if (filtered.length === 1) {
    return filtered[0];
  }

  const first = filtered[0];
  const last = filtered[filtered.length - 1];

  if (first.toLowerCase() === last.toLowerCase()) {
    return first;
  }

  return `${first} ${last}`;
}

// Uso:
// formatDisplayName("Vitor da Silva", { ignoreParticles: true })
// Vitor Silva
