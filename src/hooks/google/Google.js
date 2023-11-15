import React, { useEffect, useContext, useState } from "react";
import GoogleLogin from "react-google-login";
import styled from "@emotion/styled";
import { IconButton } from "@mui/material";
import { SignIn } from "../../functions/app/ApiFunctions";
import { AppContext } from "../../context/AppContext";
import Router from "next/router";
const GoogleIcon = styled.img({
  width: "100%",
  marginRight: 5,
  objectFit: "cover",
});
const SignInGoogleButton = styled(IconButton)({
  borderRadius: 6,
  padding: 10,
  width: "100%",
  fontSize: 16,
  marginTop: 15,
});
const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

const GoogleLoginButton = () => {
  const [gapiLoaded, setGapiLoaded] = useState(false);
  const { login, setUser, setLoader, user, setSnackbarOpen, setGoogleLoader } =
    useContext(AppContext);
  useEffect(() => {
    // Importa gapi de forma dinámica solo en el lado del cliente
    if (typeof window !== "undefined" && !gapiLoaded) {

      import("gapi-script")
        .then((pack) => {
          const gapi = pack.gapi;
          gapi.load("client:auth2", () => {
            gapi.client
              .init({
                clientId: clientId,
                scope: "https://www.googleapis.com/auth/plus.login",
              })
              .then(() => {
                setGapiLoaded(true);
                setGoogleLoader(true)
                console.log("gapi cargado");
              })
              .catch((error) => {
                console.error("Error al inicializar gapi:", error);
              });
          });
        })
        .catch((error) => {
          console.error("Error al cargar gapi-script:", error);
        });
    }
  }, [gapiLoaded]);
  const UpdateContext = (e, f) => {
    console.log(e);
    setUser(e);
    login();
    setLoader(f);
    const invitated = localStorage.getItem("invitationTo")

    if (!invitated && e.firstTime === true) {
      Router.push("/addCompany");
    } else {
      Router.push("/dashBoard");
    }


  };
  const successGoogle = (response) => {
    const token = response.tokenId;
    setLoader(true);
    localStorage.setItem("token", token);
    const user = response.profileObj;
    console.log(user);
    SignIn(user, UpdateContext);
  };
  const failureGoogle = (response) => {
    console.log(response);
    console.log("error de google");
    setSnackbarOpen({
      message:
        "si no puedes iniciar sesion recarga la pagina, o abrela en una pestañana distinta",
      type: "error",
    });
  };
  return (
    <GoogleLogin
      render={(renderProps) => (
        <SignInGoogleButton
          disabled={!gapiLoaded}
          onClick={renderProps.onClick}
          aria-label="delete"
          size="small"
        >
          <GoogleIcon src="/assets/google.png" style={{ opacity: gapiLoaded ? 1 : 0.1 }} />
        </SignInGoogleButton>
      )}
      clientId={clientId}
      buttonText="Login"
      onSuccess={successGoogle}
      onFailure={failureGoogle}
      cookiePolicy={"single_host_origin"}
      disabled={!gapiLoaded} // Deshabilita el botón mientras se carga gapi
    />
  );
};
export default GoogleLoginButton;
