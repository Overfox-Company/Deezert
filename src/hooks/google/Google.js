import React, { useEffect, useContext } from "react";
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
  const gapi = import("gapi-script").then((pack) => pack.gapi);
  const { login, setUser } = useContext(AppContext);
  useEffect(() => {
    async function start() {
      await gapi?.client?.init({
        clientId: clientId,
        scope: "https://www.googleapis.com/auth/plus.login",
      });
    }
    gapi.then((d) => d.load("client:auth2", start));
  }, []);
  const UpdateContext = (e) => {
    console.log(e);
    setUser(e);
    login();
    Router.push("/addCompany");
  };
  const successGoogle = (response) => {
    const token = response.tokenId;
    localStorage.setItem("token", token);
    const user = response.profileObj;
    console.log(user);
    SignIn(user, UpdateContext);
  };
  const failureGoogle = (response) => {
    console.log(response);
    console.log("error de google");
  };
  return (
    <GoogleLogin
      render={(renderProps) => (
        <SignInGoogleButton
          onClick={renderProps.onClick}
          aria-label="delete"
          size="small"
        >
          <GoogleIcon
            src={
              "https://rotulosmatesanz.com/wp-content/uploads/2017/09/2000px-Google_G_Logo.svg_.png"
            }
          />
        </SignInGoogleButton>
      )}
      clientId={clientId}
      buttonText="Login"
      onSuccess={successGoogle}
      onFailure={failureGoogle}
      cookiePolicy={"single_host_origin"}
    />
  );
};
export default GoogleLoginButton;
