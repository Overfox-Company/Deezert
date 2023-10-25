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
  const isInvitationRoute = router.asPath.includes("/invitation/");
  const { logout, login, setUser, user } = useContext(AppContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      ConnectServer(logout, login, setUser, user);
    } else {
      if (!isAuthenticated && !isInvitationRoute) { // solo redirigir si no es la ruta de invitation
        router.push("/");
      }
    }
    const intervalId = setInterval(() => {
      if (token) {
        ConnectServer(logout, login, setUser, user);
        console.log("verificando token");
      } else {
        if (!isAuthenticated && !isInvitationRoute) {
          router.push("/");
        }
      }
    }, 50000); // Este setInterval se ejecutará cada 5 segundos
    return () => clearInterval(intervalId);
  }, [isAuthenticated]);
  return <>{children}</>;
};

export default ProtectedRoutes;
