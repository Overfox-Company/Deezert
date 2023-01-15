import React, {useEffect} from "react";
import GoogleLogin from "react-google-login";
import styled from "@emotion/styled";
import { IconButton } from "@mui/material";
const GoogleIcon = styled.img({
  width: "5%",
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
const clientId =
  "16204758163-alpoqht12u045encgb0f5qd6026i7up1.apps.googleusercontent.com";
const GoogleLoginButton = () => {
  useEffect(() => {
    const gapi = import("gapi-script").then((pack) => pack.gapi);
    async function start() {
      await gapi?.client?.init({
        clientId: clientId,
        scope: "",
      });
    }
    gapi.then((d) => d.load("client:auth2", start));
  }, []);
  const successGoogle = (response) => {
    const token = response.tokenId;

    localStorage.setItem("token", token);
  };
  const failureGoogle = (response) => {
    console.log(response);
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
