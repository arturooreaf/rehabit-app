import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginPage from "@/features/auth/LoginPage";
import RegisterPage from "@/features/auth/RegisterPage";
import SchedulePage from "@/features/schedule/SchedulePage";

export const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/schedule", element: <SchedulePage /> },
  { path: "*", element: <Navigate to="/login" replace /> },
]);
