import { Avatar, Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Input } from '@/components/ui';

const swatches = [
  { name: 'cream', className: 'bg-cream', hex: '#F5F1E8' },
  { name: 'bone', className: 'bg-bone', hex: '#EDE6D6' },
  { name: 'bottle', className: 'bg-bottle', hex: '#2C3B2E', dark: true },
  { name: 'bottle-light', className: 'bg-bottle-light', hex: '#3A4A3C', dark: true },
  { name: 'gold', className: 'bg-gold', hex: '#B8955A', dark: true },
  { name: 'gold-dark', className: 'bg-gold-dark', hex: '#A6824A', dark: true },
  { name: 'charcoal', className: 'bg-charcoal', hex: '#1E1E1C', dark: true },
];

// Página de referencia visual del design system. No es parte del producto
// final, sirve para verificar tokens y componentes durante el desarrollo.
export default function DesignSystemPage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-16 px-6 py-16">
      <header className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.2em] text-gold-dark">Design system</p>
        <h1 className="font-serif text-4xl font-medium text-charcoal">Gym Repo</h1>
        <p className="text-charcoal/60">Paleta, tipografía y componentes base.</p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="font-serif text-2xl text-charcoal">Paleta</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {swatches.map((s) => (
            <div key={s.name} className="flex flex-col gap-2">
              <div className={`h-16 rounded-sm border border-line ${s.className}`} />
              <div className="text-xs text-charcoal/70">
                <p className="font-medium">{s.name}</p>
                <p>{s.hex}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-serif text-2xl text-charcoal">Tipografía</h2>
        <div className="flex flex-col gap-3">
          <p className="font-serif text-4xl text-charcoal">Fraunces — títulos</p>
          <p className="font-serif text-2xl text-charcoal">Rutina de fuerza — Semana 3</p>
          <p className="text-base text-charcoal">
            Inter — texto de cuerpo. Este es el tipo de letra que se usa para descripciones,
            labels y contenido general de la app.
          </p>
          <p className="text-sm text-charcoal/60">Texto secundario, más pequeño y suave.</p>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-serif text-2xl text-charcoal">Botones</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary">Crear grupo</Button>
          <Button variant="secondary">Unirse con código</Button>
          <Button variant="ghost">Cancelar</Button>
          <Button variant="primary" size="sm">
            Guardar
          </Button>
          <Button variant="primary" disabled>
            Deshabilitado
          </Button>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-serif text-2xl text-charcoal">Card</h2>
        <Card className="max-w-sm">
          <CardHeader>
            <CardTitle>Push Day</CardTitle>
            <CardDescription>4 ejercicios · 45 min estimados</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-charcoal/70">
              Press banca, press militar, fondos, elevaciones laterales.
            </p>
          </CardContent>
          <CardFooter>
            <Button size="sm">Empezar</Button>
            <Button size="sm" variant="ghost">
              Ver detalle
            </Button>
          </CardFooter>
        </Card>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-serif text-2xl text-charcoal">Inputs</h2>
        <div className="flex max-w-sm flex-col gap-4">
          <Input label="Nombre de usuario" placeholder="agus.cc" />
          <Input label="Contraseña" type="password" error="Mínimo 8 caracteres" />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-serif text-2xl text-charcoal">Avatar</h2>
        <div className="flex items-center gap-4">
          <Avatar name="Agustín Cáceres" size="sm" />
          <Avatar name="Agustín Cáceres" size="md" />
          <Avatar name="Agustín Cáceres" size="lg" />
        </div>
      </section>
    </div>
  );
}
