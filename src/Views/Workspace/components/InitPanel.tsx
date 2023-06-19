import React from "react";
import { Grid } from "@mui/material";
import DropDownPanels from "./PanelsComponents/DropDownsPanel";
import styled from "@emotion/styled";
import { AppContext } from "../../../context/AppContext";
import MyCalendar from "./PanelsComponents/CalendarInit";
const light = "../../../../static/images/logoDark.png";
const dark = "../../../../static/images/logoLight.png";

const Container = styled.div({
  display: "flex",
  justifyContent: "center",
});
const Logo = styled.img({
  height: "4vh",
  marginTop: "1vw",
  display: "flex",
  alignSelf: "flex-end",
});
const InitPanel = () => {
  const { darkMode, user } = React.useContext(AppContext);
  return (
    <Container>
      <Grid container>

        <Grid item xs={12} />
        <Grid item xs={7}>
          <DropDownPanels />
        </Grid>
        <Grid item xs={5}>
          <MyCalendar />
          
        </Grid>
      </Grid>
    </Container>
  );
};
export default InitPanel;
