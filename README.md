# gym-repo

App mobile de tracking de gym con componente social. React Native + Expo
(TypeScript) en el frontend, Supabase (Auth + Postgres + Storage + Realtime)
en el backend.

La idea: comunidades de gym donde el dueño define una rutina base, cada
miembro registra sus entrenamientos, ve su progreso, y comparte lo que hizo
en un feed social del grupo (con likes y comentarios).

## Stack

- **Expo Router** para navegación (file-based routing).
- **Supabase** para Auth, base de datos Postgres con Row Level Security,
  Storage (avatares/fotos) y Realtime (feed).
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
   EXPO_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
   EXPO_PUBLIC_SUPABASE_ANON_KEY=tu-publishable-o-anon-key
   ```

3. Levantar el proyecto:

   ```bash
   npm run start
   ```

## Estructura de carpetas

```
/app          Pantallas y navegación (Expo Router, file-based)
/components   Componentes de UI reutilizables (design system)
/lib          Clientes y utilidades (ej: cliente de Supabase)
/hooks        Hooks de React reutilizables (ej: hooks de datos)
/types        Tipos de TypeScript compartidos (ej: tipos de la DB)
```
