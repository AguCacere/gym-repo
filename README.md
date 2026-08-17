# gym-repo

Sitio web de tracking de gym con componente social, responsive y
mobile-first. Next.js (TypeScript, App Router) en el frontend, Supabase
(Auth + Postgres + Storage + Realtime) en el backend. Deploy en Vercel.

La idea: comunidades de gym donde el dueño define una rutina base, cada
miembro registra sus entrenamientos, ve su progreso, y comparte lo que hizo
en un feed social del grupo (con likes y comentarios).

## Stack

- **Next.js (App Router)** + TypeScript, pensado mobile-first (responsive).
- **Tailwind CSS** para estilos.
- **Supabase** para Auth, base de datos Postgres con Row Level Security,
  Storage (avatares/fotos) y Realtime (feed). Se usa `@supabase/ssr` para
  manejar la sesión con cookies (necesario porque hay Server Components).
- Más adelante se suman **Zustand** (estado), **react-hook-form + zod**
  (formularios) y una librería de charts, a medida que las fases del
  desarrollo los necesiten.

## Setup

1. Instalar dependencias:

   ```bash
   npm install
   ```

2. Copiar `.env.example` a `.env` y completar con los datos de tu proyecto
   de Supabase (Project Settings → API):

   ```bash
   cp .env.example .env
   ```

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-publishable-o-anon-key
   ```

3. Levantar el proyecto:

   ```bash
   npm run dev
   ```

## Estructura de carpetas

```
/src/app          Páginas y rutas (Next.js App Router, file-based)
/src/components   Componentes de UI reutilizables (design system)
/src/lib          Clientes y utilidades (ej: clientes de Supabase)
/src/hooks        Hooks de React reutilizables (ej: hooks de datos)
/src/types        Tipos de TypeScript compartidos (ej: tipos de la DB)
```
