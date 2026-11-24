import type { ReactNode } from "react";
import { Activity, CalendarDays, Stethoscope, Users } from "lucide-react";

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen p-3">
      <aside className="relative hidden w-[45%] flex-col justify-between overflow-hidden rounded-3xl bg-linear-to-br from-primary to-blue-800 p-10 text-primary-foreground animate-in fade-in slide-in-from-left-4 duration-700 md:flex">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 size-96 rounded-full bg-white/15 blur-3xl motion-safe:animate-drift"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -left-20 size-96 rounded-full bg-sky-300/20 blur-3xl motion-safe:animate-drift-slow"
        />

        <div className="relative flex items-center gap-2 text-xl font-bold">
          <Activity className="size-6" />
          Rehabit
        </div>

        <div className="relative flex flex-col gap-8">
          <p className="max-w-md text-4xl leading-tight font-bold">
            The schedule for your physiotherapy clinic
          </p>

          <div className="w-fit rounded-2xl bg-white/10 p-4 ring-1 ring-white/20 backdrop-blur-sm motion-safe:animate-float">
            <p className="text-sm font-medium">09:00 · New patient</p>
            <p className="text-xs text-primary-foreground/70">
              Initial assessment · session 1 of 10
            </p>
            <p className="mt-2 flex items-center gap-1.5 text-xs">
              <span className="size-2 rounded-full bg-emerald-400" /> Confirmed
            </p>
          </div>
        </div>

        <ul className="relative flex flex-col gap-3 text-primary-foreground/80">
          <li className="flex items-center gap-2">
            <CalendarDays className="size-5" /> Today's appointments
          </li>
          <li className="flex items-center gap-2">
            <Users className="size-5" /> Patients and sessions
          </li>
          <li className="flex items-center gap-2">
            <Stethoscope className="size-5" /> ICD-10 suggestions
          </li>
        </ul>
      </aside>
      <main className="flex flex-1 items-center justify-center">{children}</main>
    </div>
  );
}
