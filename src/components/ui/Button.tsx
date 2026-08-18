import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-bottle text-cream border-bottle hover:bg-bottle-light',
  secondary: 'bg-transparent text-bottle border-line hover:border-bottle',
  ghost: 'bg-transparent text-charcoal border-transparent hover:bg-bone',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
};

// Clases del botón expuestas aparte para poder aplicarlas a elementos que
// no son <button> (ej. next/link) y que necesitan verse igual. No usamos
// el patrón asChild de Radix para evitar la dependencia extra.
export function buttonVariants({
  variant = 'primary',
  size = 'md',
  className,
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
} = {}) {
  return cn(
    'inline-flex items-center justify-center gap-2 rounded-sm border font-medium tracking-wide transition-colors',
    'disabled:cursor-not-allowed disabled:opacity-40',
    'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-cream',
    variantClasses[variant],
    sizeClasses[size],
    className
  );
}

// Botón base del design system. Bordes rectos (rounded-sm), sin sombras
// pesadas ni animaciones llamativas — coherente con la estética sobria.
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, ...props }, ref) => {
    return (
      <button ref={ref} className={buttonVariants({ variant, size, className })} {...props} />
    );
  }
);
Button.displayName = 'Button';
