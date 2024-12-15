import { AuthContext } from "@/contexts/auth/context";
import { defaultUserData } from "@/data/user";
import { useLocalStorage } from "@/hooks/use-localstorage";
import api from "@/lib/axios-instance";
import { User } from "@/types";
import { ReactNode, useEffect, useState } from "react";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userData, setUserData] = useState<User>(defaultUserData);
  const { getItem, removeItem } = useLocalStorage();
  const accessToken = getItem("accessToken");

  useEffect(() => {
    if (accessToken) {
      setIsAuthenticated(true);
      api
        .get("/auth/me")
        .then((response) => {
          setUserData(response.data);
        })
        .catch(() => {
          removeItem("accessToken");
          setIsAuthenticated(false);
        });
    }
  }, [accessToken, removeItem]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        userData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
