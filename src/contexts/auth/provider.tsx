import { AuthContext } from "@/contexts/auth/context";
import { defaultUserData } from "@/data/user";
import { useLocalStorage } from "@/hooks/use-localstorage";
import { getUserData } from "@/services/auth/hooks";
import { User } from "@/types";
import { ReactNode, useEffect, useState } from "react";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userData, setUserData] = useState<User>(defaultUserData);
  const { getItem } = useLocalStorage();
  const accessToken = getItem("accessToken");

  useEffect(() => {
    if (accessToken) {
      setIsAuthenticated(true);
      getUserData()
        .then((response) => {
          setUserData(response);
        })
        .catch(() => {
          // TODO: To be reviewed
          // removeItem("accessToken");
          //  setIsAuthenticated(false);
        });
    }
  }, [accessToken]);

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
