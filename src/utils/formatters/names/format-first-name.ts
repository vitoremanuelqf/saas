export function getFirstName(name?: string | null) {
  if (!name?.trim()) return "";

  return name.trim().split(/\s+/)[0];
}
