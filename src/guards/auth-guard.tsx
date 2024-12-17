import { useAuth } from "@/contexts/auth/hook";
import { routes } from "@/lib/routes";
import { ReactNode } from "react";
import { Navigate } from "react-router";

export default function AuthGuard({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={`/${routes.auth.login}`} />;
  }

  return children;
}
