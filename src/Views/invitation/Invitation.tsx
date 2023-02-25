import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import ApiController from "../../connection/ApiController";
import { AppContext } from "../../context/AppContext";
import { Grid, Paper } from "@mui/material";
import styled from "@emotion/styled";
import { PRIMARY_COLOR } from "../../constants/Color";
const Logo = styled.img({
  width: "100%",
});
const Container = styled(Paper)({
  padding: "2vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});
const Link = styled.a({
  textDecoration: "none",
  fontSize: "2vh",
  backgroundColor: PRIMARY_COLOR,
  textAlign: "center",
  padding: ".6vh 1vh",
  borderRadius: "100vh",
  marginLeft: "1vh",
});
const Text = styled.p({
  display: "flex",
  textAlign: "center",
  alignItems: "center",
  justifyContent: "space-around",
});
const dark = "../../../static/images/logoLight.png";
const Invitation = () => {
  const router = useRouter();
  const { invitation } = router.query;
  const [response, setResponse] = useState();
  const { setLoader, setSnackbarOpen } = useContext(AppContext);
  useEffect(() => {
    setLoader(true);
    if (invitation) {
      console.log(invitation);
      ApiController.AceptRoute(invitation).then((e) => {
        setLoader(false);

        if (e.data == 500 || e.data == 501) {
          setSnackbarOpen({
            message: "La direccion a la que estas accediendo no es valida",
            type: "error",
          });
        } else {
          setResponse(e.data);
        }
      });
    }
  }, [invitation]);
  return (
    <>
      <Grid
        style={{ height: "50vh" }}
        container
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Grid item xs={5} md={4}>
          <Logo src={dark} />
        </Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={11} md={5}>
          {response == 200 && (
            <Container>
              <Text>Has aceptado la invitacion, inicia sesion llendo al </Text>
              <br />
              <Link href={"https://deezert.vercel.app/"}>Inicio</Link>
            </Container>
          )}
          {response == 300 && (
            <Container>
              <Text>
                Has aceptado la invitacion, pero aun no tienes cuenta, crea una
                accediend al{" "}
              </Text>
              <br />
              <Link href={"https://deezert.vercel.app/"}>Inicio</Link>
            </Container>
          )}
        </Grid>
      </Grid>
    </>
  );
};
export default Invitation;
