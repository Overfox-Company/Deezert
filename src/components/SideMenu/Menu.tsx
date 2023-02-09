import React from "react";
import {
  Box,
  ListItem,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { AppContext } from "../../context/AppContext";
import { Grid, Divider } from "@mui/material";
import styled from "@emotion/styled";
import Switch from "../Switch";
import { PRIMARY_COLOR } from "../../constants/Color";
import Companys from "./Companys";
const light = "../../../static/images/logoDark.png";
const dark = "../../../static/images/logoLight.png";
const Logo = styled.img({
  width: "100%",
});
const Menu = ({ close }: any) => {
  const { darkMode, user, panel, setPanel } = React.useContext(AppContext);
  const handleClick = (index: number) => {
    setPanel(index);
  };
  return (
    <>
      <Box
        style={{ paddingTop: 10 }}
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
          {["Proyectos", "Personal", "Configuracion"].map((text, index) => (
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
export default Menu;
