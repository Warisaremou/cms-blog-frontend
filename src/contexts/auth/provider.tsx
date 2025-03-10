import { AuthContext } from "@/contexts/auth/context";
import { defaultUserData } from "@/data/user";
import { useLocalStorage } from "@/hooks/use-localstorage";
import { getUserData } from "@/services/auth";
import { User } from "@/types";
import { ReactNode, useEffect, useState } from "react";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<User>(defaultUserData);
  const { getItem } = useLocalStorage();
  const accessToken = getItem("accessToken");

  useEffect(() => {
    if (accessToken) {
      getUserData()
        .then((response) => {
          setUserData(response);
          setIsAuthenticated(true);
          setIsLoading(false);
        })
        .catch(() => {
          setIsAuthenticated(false);
        });
    } else {
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  }, [accessToken]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        userData,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
