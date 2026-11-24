import type { ReactNode } from "react";
import { Activity, CalendarDays, Stethoscope, Users } from "lucide-react";
interface AuthLayoutProps {
  children: ReactNode;
}
export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen p-3">
      <aside className="hidden w-[45%] flex-col justify-between rounded-3xl bg-primary p-10 text-primary-foreground md:flex">
        <div className="flex items-center gap-2 text-xl font-bold">
          <Activity className="size-6" />
          Rehabit
        </div>
        <p className="max-w-md text-4xl font-bold leading-tight">
          The schedule for your physiotherapy clinic
        </p>

        <ul className="flex flex-col gap-3 text-primary-foreground/80">
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
