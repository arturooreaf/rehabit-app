import { create } from "zustand";
import { login as loginRequest } from "@/features/auth/auth.service";

interface AuthState {
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
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
}));
