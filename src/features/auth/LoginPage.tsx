import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useAuthStore } from "@/features/auth/auth.store";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { AuthLayout } from "@/shared/layouts/AuthLayout";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const login = useAuthStore((state) => state.login);
  const [searchParams] = useSearchParams();
  const justRegistered = searchParams.get("registered") === "1";

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);
    const ok = await login(email, password);
    setIsSubmitting(false);
    if (!ok) {
      setErrorMessage("Incorrect email or password");
    }
  }
  return (
    <AuthLayout>
      <title>Log in · Rehabit</title>
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex flex-col gap-1 animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both">
          <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
          <p className="text-sm text-muted-foreground">Log in to your clinic</p>
        </div>
        {justRegistered && (
          <p role="status" className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
            Account created. You can log in now.
          </p>
        )}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both delay-100">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both delay-200">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both delay-300"
          >
            {isSubmitting ? "Logging in..." : "Log in"}
          </Button>

          {errorMessage && (
            <p role="alert" className="text-sm text-destructive">
              {errorMessage}
            </p>
          )}
        </form>
        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Create one
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}

export default LoginPage;
