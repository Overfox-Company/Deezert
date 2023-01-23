import React, { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { AppContext } from "../context/AppContext";
import { ConnectServer } from "../functions/app/ApiFunctions";
interface Props {
  children: React.ReactNode;
}

const ProtectedRoutes: React.FC<Props> = ({ children }) => {
  const { isAuthenticated } = useContext(AppContext);
  const router = useRouter();
  const { logout, login, setUser } = useContext(AppContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      ConnectServer(logout, login, setUser);
      console.log("verificando token");
    }
    const intervalId = setInterval(() => {
      if (token) {
        ConnectServer(logout, login, setUser);
        console.log("verificando token");
      } else {
        if (!isAuthenticated) {
          router.push("/");
        }
      }
    }, 20000); // Este setInterval se ejecutará cada 5 segundos
    return () => clearInterval(intervalId);
  }, [isAuthenticated]);
  return <>{children}</>;
};

export default ProtectedRoutes;
