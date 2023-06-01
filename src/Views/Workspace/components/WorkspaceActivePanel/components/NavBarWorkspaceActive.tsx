import React, { useContext } from "react";
import styled from "@emotion/styled";
import { Badge, Grid } from "@mui/material";
import { WorkspaceContext } from "../../../../../context/WorkspaceContext";
import { AppContext } from "../../../../../context/AppContext";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { PAPER, PAPER_DARK } from "../../../../../constants/Color";
import NotificationsIcon from "@mui/icons-material/Notifications";
const light = "../../../../../static/images/logoDark.png";
const dark = "../../../../../static/images/logoLight.png";
const Container = styled.div({
  height: "4vw",
  display: "flex",
  alignItems: "center",
  paddingLeft: "2vw",
  width: "100%",
  boxShadow: "0 5px 5px 0 rgba(0,0,0,0.1)",
});
const Logo = styled.img({
  height: "4vh",
  display: "flex",
  alignSelf: "flex-end",
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
const NavBarWorkspaceActive = () => {
  const { workspaces, workspaceActive } = useContext(WorkspaceContext);
  const { darkMode, user } = useContext(AppContext);

  return (
    <Container>
      <Grid container alignItems={"center"} justifyContent={"space-between"}>
        <Grid item xs={2}>
          {workspaceActive.length != 0 && (
            <Breadcrumbs separator="›" aria-label="breadcrumb">
              <p>{workspaces.name}</p>
              <p>{workspaceActive.name}</p>
            </Breadcrumbs>
          )}
        </Grid>
        <Grid item xs={4}>
          <Grid container alignItems={"center"} justifyContent={"center"}>
            <Grid item xs={6}>
              <Logo src={darkMode ? dark : light} />
            </Grid>
            <Grid item xs={1}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Badge color="primary" variant="dot">
                  <NotificationsIcon
                    style={{ color: darkMode ? PAPER : PAPER_DARK }}
                  />
                </Badge>
              </div>
            </Grid>
            <Grid item xs={2}>
              <ContainerAvatar>
                <Avatar src={user.avatar} />
              </ContainerAvatar>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
export default NavBarWorkspaceActive;
