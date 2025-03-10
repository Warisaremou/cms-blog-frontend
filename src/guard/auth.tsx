import { useAuth } from "@/contexts/auth/hook";
import { routes } from "@/lib/routes";
import { Loader2 } from "lucide-react";
import { Navigate, Outlet } from "react-router";

export default function AuthGuard() {
  const { isLoading, isAuthenticated } = useAuth();

  if (!isLoading && !isAuthenticated) {
    return <Navigate to={`/${routes.auth.login}`} />;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2
          className="size-5 animate-spin text-primary"
          aria-hidden="true"
        />
      </div>
    );
  }

  return <Outlet />;
}
