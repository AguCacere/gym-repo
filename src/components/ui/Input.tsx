import { InputHTMLAttributes, forwardRef, useId } from 'react';
import { clsx } from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

// forwardRef porque react-hook-form (Fase 3) necesita registrar el input
// vía ref para leer/validar su valor.
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, className, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-charcoal">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={clsx(
            'rounded-sm border bg-cream px-3.5 py-2.5 text-sm text-charcoal placeholder:text-charcoal/40',
            'focus:outline-none focus:ring-1 focus:ring-gold',
            error ? 'border-red-700/60' : 'border-line',
            className
          )}
          aria-invalid={!!error}
          {...props}
        />
        {error && <p className="text-xs text-red-800">{error}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';
