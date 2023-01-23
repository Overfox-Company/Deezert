import React from "react";
import { AppContext } from "../../context/AppContext";
import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import Switch from "../Switch";
const light = "../../../static/images/logoDark.png";
const dark = "../../../static/images/logoLight.png";
const Logo = styled.img({
  width: "100%",
});
const Container = styled.div({
  padding: 15,
  width: "100%",
});
const Header = () => {
  const { darkMode } = React.useContext(AppContext);
  return (
    <Container>
      <Grid container justifyContent={'space-between'} alignItems={'center'}>
        <Grid item xs={4} md={1}>
          <Logo src={darkMode ? dark : light} />
        </Grid>
        <Grid item xs={3} md={1}>
<Switch/>
        </Grid>
      </Grid>
    </Container>
  );
};
export default Header;
