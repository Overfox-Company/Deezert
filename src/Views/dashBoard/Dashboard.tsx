import React, { useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import styled from "@emotion/styled";
import ApiController from "../../connection/ApiController";
import Staff from "./staff/Staff";
import { Grid } from "@mui/material";
import {Menu }from "../../components/SideMenu/Menu";
import Proyects from "./proyects/Proyects";
const Container = styled.div({
    minWidth: "100%",
    position:'relative',
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
overflow: 'hidden',

});
const DashBoard = () => {
  const { user, setCompanys, panel } = React.useContext(AppContext);
  useEffect(() => {
    ApiController.getCompanys({ id: localStorage.getItem("id") })
      .then((e) => {
        console.log(e);
        setCompanys(e.data);
      })
      .catch((e) => console.log("error en el dashboard" + e));
  }, [user]);
  return (
      <>
          <br/><br/><br/><br/>
      <Container>
        <Grid container justifyContent={'flex-end'}  sx={{ display: { xs: "none", md: "flex" } }}>
                  <Grid item md={12} sx={{ display: { xs: "none", md: "flex" } }}>
                    <Menu/>
                  </Grid>

          <Grid item xs={11} md={9}>
            {panel === 0 && <Proyects/>}
            {panel === 1 && <Staff />}
            
                  </Grid>
                                    <Grid item xs={1}>
                      
                  </Grid>
              </Grid>
                      <Grid container justifyContent={'center'}  sx={{ display: { xs: "flex", md: "none" } }}>
                  <Grid item md={12} sx={{ display: { xs: "none", md: "flex" } }}>
                    <Menu/>
                  </Grid>

          <Grid item xs={11} md={8}>
            {panel === 0 && <Proyects/>}
            {panel === 1 && <Staff />}

                      
                  </Grid>
        </Grid>
      </Container>
    </>
  );
};
export default DashBoard;
