import React, { useEffect, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import styled from "@emotion/styled";
import ApiController from "../../connection/ApiController";
import Staff from "./staff/Staff";
import { Grid } from "@mui/material";
import { Menu } from "../../components/SideMenu/Menu";
import Proyects from "./proyects/Proyects";
import { WorkspaceContext } from "../../context/WorkspaceContext";
import { Container, Item } from "../../components/Container";
const ContainerDashboard = styled.div({
  minWidth: "100%",
  position: "relative",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
  overflow: "hidden",
});
const DashBoard = () => {
  const { user, setCompanys, panel } = useContext(AppContext);
  const { RestWorkspaces } = useContext(WorkspaceContext)
  useEffect(() => {
    const invitated = localStorage.getItem("invitationTo")
    localStorage.removeItem("invitationTo")
    if (invitated) {
      ApiController.FirstSession({ id: user._id }).then((e) => {
        console.log(e)
      });
    }

    setCompanys([])
  }, [])
  useEffect(() => {
    RestWorkspaces()
    ApiController.getCompanys({ id: localStorage.getItem("id") })
      .then((e) => {
        console.log(e);
        setCompanys(e.data);
      })
      .catch((e) => console.log("error en el dashboard" + e));
  }, [user]);
  return (
    <>
      <ContainerDashboard>
        <Container
          justifyContent={"space-between"}

          sx={{ display: { xs: "none", md: "flex" } }}
        >
          <Item md={2} style={{ position: 'relative', }} sx={{ display: { xs: "none", md: "flex" } }}>
            <Menu />
          </Item>

          <Item md={8}>
            {panel === 0 && <Proyects />}
            {panel === 1 && <Staff />}
            {panel === 2 && <Staff clientsView />}
          </Item>
          <Item xs={1}>

          </Item>
        </Container>
        <Container
          justifyContent={"center"}
          sx={{ display: { xs: "flex", md: "none" } }}
        >
          <Item md={12} sx={{ display: { xs: "none", md: "flex" } }}>
            <Menu />
          </Item>

          <Item xs={11} md={8}>
            {panel === 0 && <Proyects />}
            {panel === 1 && <Staff />}
          </Item>
        </Container>
      </ContainerDashboard>
    </>
  );
};
export default DashBoard;
