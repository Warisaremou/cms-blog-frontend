import { AuthContext } from "@/contexts/auth/context";
import { useContext } from "react";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be wrapped  in a <AuthProvider />");
  }

  return context;
};
