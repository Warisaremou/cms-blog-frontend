import { defaultUserData } from "@/data/user";
import { AuthContextType } from "@/types";
import { createContext } from "react";

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  userData: defaultUserData,
  isLoading: true,
});

export { AuthContext };
