import React from "react";
import { Grid } from "@mui/material";
import styled from "@emotion/styled";
const patreonLogo = "../../../static/images/patreon-logo-round.webp";
const overfox = "../../../static/images/LogoT.png";
const Container = styled.div({
  width: "100%",
  height: "5vh",
  position: "fixed",
  bottom: 0,
  zIndex: 99999999999,
  backgroundColor: "rgb(247,102,83)",
});
const Patreon = styled.img({
  width: "auto",
  height: "5vh",
});
const Overfox = styled.img({
  width: "auto",
  height: "3vh",
});
const ContainerOverfox = styled.div({
  width: "8vh",
  padding: "1vh",
  backgroundColor: "rgb(20,20,20)",
    borderRadius: 50,
    display: 'flex',
  justifyContent:'center'
});
const Text = styled.div({
  color: "#001730",
  fontFamily: "comfortaa",
  fontSize: "0.8vw",
});
const TextStrong = styled.div({
  color: "rgb(20,20,20)",
  fontFamily: "comfortaa",
    fontSize: "1vw",
  fontWeight:700
});
const Banner = () => {
  return (
    <Container>
      <Grid container justifyContent={"space-between"} alignItems={"center"}>
        <Grid item xs={6}>
          <Grid container alignItems={"center"}>
            <Grid
              item
              xs={1}
              style={{ justifyContent: "center", display: "flex" }}
            >
              <Patreon src={patreonLogo} />
            </Grid>
            <Grid item xs={8}>
              <Text>
                Si te gusta el proyecto y quieres apoyarlo puede hacerlo aqui
              </Text>
            </Grid>
          </Grid>
        </Grid>
              <Grid item xs={1}>
                  <TextStrong>
                      By Overfox
             </TextStrong>
        </Grid>
      </Grid>
    </Container>
  );
};
export default Banner;
