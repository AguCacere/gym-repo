import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Combina clases condicionales (clsx) y resuelve conflictos de Tailwind
// (twMerge) para que un className pasado por prop pueda pisar los
// defaults del componente de forma predecible.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
