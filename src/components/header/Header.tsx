import React from "react";
import { AppContext } from "../../context/AppContext";
import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import Switch from "../Switch";
import { P } from "../BasicComponents";
const light = "../../../static/images/logoDark.png";
const dark = "../../../static/images/logoLight.png";
const Logo = styled.img({
  width: "100%",
});
const Avatar = styled.img({
  width: 30,
  height: 30,
  borderRadius: 200,
  marginTop: 5,
})
const Container = styled.div({
  padding: 15,
  width: "100%",
});
type Props = {
  version?: number | unknown;
}
const Header = ({version =1 }:Props) => {
  const { darkMode,user } = React.useContext(AppContext);
  return (
    <>
        <Container>
      <Grid container justifyContent={'space-between'} alignItems={'center'}>
        <Grid item xs={4} md={1}>
          <Logo src={darkMode ? dark : light} />
          </Grid>
          <Grid item xs={4} md={2}>
            <Grid container alignItems={'center'}>
                <Grid item xs={6} md={6}>
        <Switch/>
              </Grid>
              {version !== 1 &&
                <Grid item xs={3} md={5}>
                  <Avatar src={user.avatar}/>
                  </Grid>
              }
</Grid>
          </Grid>

  
      </Grid>
      </Container> 
    </>

  );
};
export default Header;
