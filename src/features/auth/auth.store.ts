import { create } from "zustand";
import {
  EmailAlreadyRegisteredError,
  login as loginRequest,
  register as registerRequest,
} from "@/features/auth/auth.service";

export type RegisterOutcome = "registered" | "email_taken" | "failed";

interface AuthState {
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<RegisterOutcome>;
}

export const useAuthStore = create<AuthState>()((set) => ({
  token: null,
  login: async (email, password) => {
    try {
      const result = await loginRequest(email, password);
      set({ token: result.token });
      return true;
    } catch {
      return false;
    }
  },
  register: async (name, email, password) => {
    try {
      await registerRequest(name, email, password);
      return "registered";
    } catch (error) {
      if (error instanceof EmailAlreadyRegisteredError) {
        return "email_taken";
      }
      return "failed";
    }
  },
}));
