// Formatea una fecha ISO a "hace X" en español, sin depender de una
// librería extra (date-fns/dayjs) para algo tan simple.
export function formatRelativeTime(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diffMs / 60_000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 60) return `hace ${Math.max(minutes, 1)} min`;
  if (hours < 24) return `hace ${hours} h`;
  return `hace ${days} d`;
}
