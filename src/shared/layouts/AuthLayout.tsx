import type { ReactNode } from "react";
import { Activity } from "lucide-react";

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-muted/40 px-4 py-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(var(--color-border)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl motion-safe:animate-drift"
      />

      <div className="relative flex w-full max-w-md flex-col items-center gap-6">
        <div className="flex items-center gap-2 text-xl font-bold text-primary animate-in fade-in duration-500">
          <Activity className="size-6" />
          Rehabit
        </div>

        <main className="flex w-full justify-center rounded-2xl border bg-card p-8 shadow-sm animate-in fade-in zoom-in-95 duration-500 sm:p-10">
          {children}
        </main>

        <p className="text-xs text-muted-foreground">The schedule for your physiotherapy clinic</p>
      </div>
    </div>
  );
}
