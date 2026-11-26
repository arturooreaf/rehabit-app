import { env } from "@/shared/config/env";
import { z } from "zod";
const LoginResponseSchema = z.object({
  token: z.string(),
  user: z.object({
    id: z.int(),
    email: z.string(),
    name: z.string(),
  }),
});
export async function login(email: string, password: string) {
  const response = await fetch(`${env.VITE_API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    throw new Error("Email or password incorrect");
  }

  return LoginResponseSchema.parse(await response.json());
}

const RegisterResponseSchema = z.object({
  id: z.int(),
  email: z.string(),
  name: z.string(),
});

export class EmailAlreadyRegisteredError extends Error {}

export async function register(name: string, email: string, password: string) {
  const response = await fetch(`${env.VITE_API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  if (response.status === 409) {
    throw new EmailAlreadyRegisteredError("Email is already registered");
  }
  if (!response.ok) {
    throw new Error("Registration failed");
  }

  return RegisterResponseSchema.parse(await response.json());
}
