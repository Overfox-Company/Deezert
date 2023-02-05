import React from "react";
import { AppContext } from "../../context/AppContext";
import styled from "@emotion/styled";
import { Grid, Badge } from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import Switch from "../Switch";
import SideMenu from "../SideMenu/SideMenu";
import Search from "../Search";
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
  position: 'fixed',
  top:0,
});
type Props = {
  version?: number | unknown;
}
const Header = ({ version = 1 }: Props) => {
  const { darkMode, user } = React.useContext(AppContext);
  return (
    <>
      <Container>
        <Grid sx={{ display: { xs: 'none', md: 'flex' } }} container justifyContent={"space-between"} alignItems={"center"}>
          <Grid item xs={4} md={1}>
            <Logo src={darkMode ? dark : light} />
          </Grid>
          <Grid item md={6}>
            <Search />
          </Grid>
          <Grid item xs={4} md={2}>
            <Grid container alignItems={"center"}>
              <Grid item xs={6} md={4}>
                <Switch />
              </Grid>
              {version === 3 && (
                <Grid item xs={3} md={4}>
                  <Badge color="primary" variant="dot">
                    <NotificationsIcon />
                  </Badge>
                </Grid>
              )}
              {version !== 1 && (
                <Grid item xs={3} md={4}>
                  <Avatar src={user.avatar} />
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
                <Grid sx={{ display: { xs: 'flex', md: 'none' } }} container justifyContent={"space-between"} alignItems={"center"}>
        {version === 3 ?    <Grid item xs={2} md={1}>
           <SideMenu />
            
          </Grid>: <Grid item xs={4} md={1}>
                      <Logo src={darkMode ? dark : light} />
            
          </Grid>  }
          <Grid item xs={6}>
           {version === 3 &&  <Search />}
          </Grid>
          <Grid item xs={4} md={2}>
            <Grid container alignItems={"center"} justifyContent={'space-around'}>
              {version === 3 && (
                <Grid item xs={3} md={4}>
                  <Badge color="primary" variant="dot">
                    <NotificationsIcon />
                  </Badge>
                </Grid>
              )}
              {version !== 1 && (
                <Grid item xs={3} md={4}>
                  <Avatar src={user.avatar} />
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
export default Header;
