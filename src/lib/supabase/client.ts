import { createBrowserClient } from '@supabase/ssr';

// Cliente para usar en Client Components ('use client'). Guarda la sesión
// en cookies del browser, lo que permite que el server también la lea
// (a diferencia de usar localStorage, que solo existe en el cliente).
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
