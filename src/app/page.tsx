import { redirect } from 'next/navigation';

// Placeholder hasta la Fase 3: ahí esto va a chequear la sesión y mandar
// a /login o /feed según corresponda. Por ahora, siempre al feed.
export default function Home() {
  redirect('/feed');
}
