import React from "react";
import {
  Box,
  ListItem,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { AppContext } from "../../context/AppContext";
import styled from "@emotion/styled";
import Switch from "../Switch";
import {
  PRIMARY_COLOR,
  CONTAINER,
  CONTAINER_DARK,
} from "../../constants/Color";
import Companys from "./Companys";
import { Container, Item } from "../Container";
const light = "../../../static/images/logoDark.png";
const dark = "../../../static/images/logoLight.png";
const Logo = styled.img({
  width: "100%",
});
const FixedContainer = styled.div({

  zIndex: 99,
  width: "100%",
  position: "relative",
  overflow: "hidden",
  boxShadow: "0 10px 10px 0 rgba(20,20,30,1)",
});
const AdmFunctions = ["Proyectos", "Personal", "Configuracion"];
const UserFunctions = ["Proyectos"];
const LogoutButton = styled.div({
  width: '100%',
  backgroundColor: 'rgba(255,255,255,0.1)',
  height: 40,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer'
})
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
        style={{ position: "relative", zIndex: 99999, }}
        sx={{ width: 250 }}
        role="presentation"
        onKeyDown={close("left", false)}
      >
        < Container justifyContent={"space-around"} alignItems={"center"}>
          <Item xs={6}>
            <Logo src={darkMode ? dark : light} />
          </Item>
          <Item xs={4}>
            <Switch />
          </Item>
        </ Container>
        < Container>
          <Item xs={12}>
            <Companys />
          </Item>
        </ Container>

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
  const { darkMode, user, panel, setPanel, selectedCompany, logout } =
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
      < Container>
        <Item xs={12}>
          < Container>
            <Item xs={4}>
              <br />
              <Companys v="V" />
            </Item>
            <Item xs={8}>
              <br />
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
            </Item>
          </ Container>
        </Item>
        <Item xs={12}>
          <LogoutButton onClick={() => logout()}>
            Cerrar session
          </LogoutButton>

        </Item>
      </ Container>
    </FixedContainer>
  );
};
