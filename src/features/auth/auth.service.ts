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
