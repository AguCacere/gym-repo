'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui';

// Client component porque necesita el Clipboard API del browser.
export function InviteCodeCopy({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="flex items-center justify-between gap-3 rounded-sm border border-dashed border-line bg-cream px-4 py-3">
      <span className="font-mono text-lg tracking-widest text-charcoal">{code}</span>
      <Button variant="ghost" size="sm" onClick={handleCopy}>
        {copied ? <Check size={16} strokeWidth={1.5} /> : <Copy size={16} strokeWidth={1.5} />}
        {copied ? 'Copiado' : 'Copiar'}
      </Button>
    </div>
  );
}
