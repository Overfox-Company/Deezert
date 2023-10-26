import React from "react";
import { AppContext } from "../../context/AppContext";
import styled from "@emotion/styled";
import { Grid, Badge } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Switch from "../Switch";
import SideMenu from "../SideMenu/SideMenu";
import Search from "../Search";
import { PAPER, PAPER_DARK, CONTAINER_DARK, CONTAINER } from "../../constants/Color";
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
});
const ContainerAvatar = styled.div({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
const Container = styled.div({
  padding: 15,
  height: '10vh',
  width: "100%",
  position: "fixed",
  top: 0,
  zIndex: 99,
});
type Props = {
  version?: number | unknown;
};
const Header = ({ version = 1 }: Props) => {
  const { darkMode, user } = React.useContext(AppContext);
  return (
    <>
      <Container style={{ backgroundColor: darkMode ? CONTAINER_DARK : CONTAINER }}>
        <Grid
          container
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          {version === 3 ? (
            <Grid item xs={2} md={1} sx={{ display: { xs: "flex", md: "none" } }}>
              <SideMenu />
            </Grid>
          ) : (
            <Grid item xs={5} md={1}>
              <Logo src={darkMode ? dark : light} />
            </Grid>
          )}
          {version === 3 && <Grid item md={1} sx={{ display: { xs: "none", md: "flex" } }}>
            <Logo src={darkMode ? dark : light} />
          </Grid>}
          {version === 3 && <Grid item xs={6} md={3}>
            <Search />
          </Grid>}
          <Grid item xs={3}>
            <Grid container alignItems={"center"} justifyContent={'space-between'}>
              <Grid item md={3} sx={{ display: { xs: "none", md: "flex" } }}>
                {   /*  <Switch />*/}
              </Grid>
              {version === 3 && (
                <Grid item xs={5} md={4}>
                  <Badge color="primary" variant="dot">
                    <NotificationsIcon style={{ color: darkMode ? PAPER : PAPER_DARK }} />
                  </Badge>
                </Grid>
              )}
              {version !== 1 && (
                <Grid item xs={7} md={4}>
                  <ContainerAvatar>
                    <Avatar src={user.avatar} />
                  </ContainerAvatar>
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
