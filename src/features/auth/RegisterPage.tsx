import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/features/auth/auth.store";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { AuthLayout } from "@/shared/layouts/AuthLayout";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const register = useAuthStore((state) => state.register);
  const navigate = useNavigate();

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);
    const outcome = await register(name, email, password);
    setIsSubmitting(false);
    if (outcome === "registered") {
      navigate("/login?registered=1");
    } else if (outcome === "email_taken") {
      setErrorMessage("This email is already registered");
    } else {
      setErrorMessage("Something went wrong. Please try again later");
    }
  }

  return (
    <AuthLayout>
      <title>Create account · Rehabit</title>
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex flex-col gap-1 animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both">
          <h1 className="text-3xl font-bold tracking-tight">Create your account</h1>
          <p className="text-sm text-muted-foreground">Start organizing your clinic</p>
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both delay-100">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              autoComplete="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both delay-150">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both delay-200">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both delay-300"
          >
            {isSubmitting ? "Creating account..." : "Create account"}
          </Button>

          {errorMessage && (
            <p role="alert" className="text-sm text-destructive">
              {errorMessage}
            </p>
          )}
        </form>
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-primary underline-offset-4 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}

export default RegisterPage;
