import React, { useState } from "react";
import {
  Box,
  ListItem,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { AppContext } from "../../context/AppContext";
import { Grid } from "@mui/material";
import styled from "@emotion/styled";
import Switch from "../Switch";
import {
  PRIMARY_COLOR,
  CONTAINER,
  CONTAINER_DARK,
} from "../../constants/Color";
import Companys from "./Companys";
const light = "../../../static/images/logoDark.png";
const dark = "../../../static/images/logoLight.png";
const Logo = styled.img({
  width: "100%",
});
const FixedContainer = styled.div({
  left: 0,
  top: 0,
  zIndex: 9999,
  maxWidth: "16vw",
  position: "fixed",
  height: "100vh",
  overflow: "hidden",
  boxShadow: "0 10px 10px 0 rgba(20,20,30,1)",
});
const AdmFunctions = ["Proyectos", "Personal", "Configuracion"];
const UserFunctions = ["Proyectos"];
export const MenuMobile = ({ close }: any) => {
  const { darkMode, user, panel, setPanel, selectedCompany } =
    React.useContext(AppContext);
  const handleClick = (index: number) => {
    setPanel(index);
  };
  const data =
    selectedCompany?.idOwner === user._id ? AdmFunctions : UserFunctions;
  return (
    <>
      <Box
        style={{ position: "relative", zIndex: 99999, paddingTop: 10 }}
        sx={{ width: 250 }}
        role="presentation"
        onKeyDown={close("left", false)}
      >
        <Grid container justifyContent={"space-around"} alignItems={"center"}>
          <Grid item xs={6}>
            <Logo src={darkMode ? dark : light} />
          </Grid>
          <Grid item xs={4}>
            <Switch />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <Companys />
          </Grid>
        </Grid>

        <List>
          {data.map((text, index) => (
            <ListItem key={text} disablePadding onClick={close("left", false)}>
              <ListItemButton
                onClick={() => handleClick(index)}
                style={{
                  borderLeft:
                    panel === index
                      ? `solid 4px ${PRIMARY_COLOR}`
                      : `solid 4px rgba(0,0,0,0)`,
                }}
              >
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
};
export const Menu = () => {
  const { darkMode, user, panel, setPanel, selectedCompany } =
    React.useContext(AppContext);

  const handleClick = (index: number) => {
    setPanel(index);
  };
  const data =
    selectedCompany?.idOwner === user._id ? AdmFunctions : UserFunctions;
  return (
    <FixedContainer
      style={{ backgroundColor: darkMode ? CONTAINER_DARK : CONTAINER }}
    >
      <Grid container>
        <Grid item xs={4}>
          <br />
          <Companys v="V" />
        </Grid>
        <Grid item xs={8}>
          <br />
          <Logo src={darkMode ? dark : light} />
          <List>
            {data.map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton
                  onClick={() => handleClick(index)}
                  style={{
                    borderLeft:
                      panel === index
                        ? `solid 4px ${PRIMARY_COLOR}`
                        : `solid 4px rgba(0,0,0,0)`,
                  }}
                >
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </FixedContainer>
  );
};
