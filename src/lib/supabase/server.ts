import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

// Cliente para usar en Server Components, Server Actions y Route Handlers.
// Lee/escribe la sesión desde las cookies de la request (cookies() es
// async desde Next.js 15/16).
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // setAll fue llamado desde un Server Component, donde no se
            // pueden setear cookies. Se puede ignorar si hay un proxy.ts
            // (Fase 3) que refresca la sesión en cada request.
          }
        },
      },
    }
  );
}
