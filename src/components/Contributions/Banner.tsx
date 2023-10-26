import React from "react";
import { Grid } from "@mui/material";
import styled from "@emotion/styled";
import Image from "next/image";
const patreonLogo = "../../../static/images/patreon-logo-round.webp";
const overfox = "../../../static/images/LogoT.png";
const Container = styled.div({
  width: "100%",
  height: 50,
  position: "fixed",
  padding: 4,
  bottom: 0,
  zIndex: 999,
  backgroundColor: "rgb(247,102,83)",
});
const Patreon = styled.img({
  width: "auto",
  height: "5vh",
});
const Overfox = styled(Image)({
  backgroundColor: 'rgb(0,10,20)',
  padding: 10,
  borderRadius: 200
});

const Text = styled.div({
  color: "#001730",
  fontFamily: "comfortaa",
  fontSize: "0.8vw",
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
          <Overfox
            alt="by overfox"

            src="/assets/overfoxLogo.png"
            width={110}
            height={45}
          />
        </Grid>
      </Grid>
    </Container>
  );
};
export default Banner;
