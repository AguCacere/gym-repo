import { createClient } from '@/lib/supabase/server';

// Pantalla temporal de Fase 1: confirma que el cliente de Supabase conecta
// bien desde un Server Component. En la Fase 3 esto se reemplaza por el
// flujo real de auth (o un redirect a /login).
export default async function Home() {
  const supabase = await createClient();
  const { error } = await supabase.auth.getSession();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F5F1E8] p-6">
      <h1 className="text-3xl font-semibold text-[#1E1E1C]">Gym Repo</h1>
      <p className="mt-2 text-sm text-[#3A4A3C]">
        {error ? `Error de conexión: ${error.message}` : 'Conexión con Supabase OK ✓'}
      </p>
    </div>
  );
}
