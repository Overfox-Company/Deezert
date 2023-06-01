import React,{useContext} from "react";
import { Grid } from "@mui/material";
import styled from "@emotion/styled";
import { PRIMARY_COLOR, PRIMARY_COLOR_HOVER } from "../../../../../constants/Color";
import { WorkspaceContext } from "../../../../../context/WorkspaceContext";
const tools = ["List", "Tablero", "Calendario", "Archivos"];
const Button = styled.div({
  fontSize: "1vw",
  backgroundColor: "rgba(0,0,0,0)",
  color: "white",
  cursor: "pointer",
  transition: "all 0.3s ease",
  borderRadius: 5,
  padding: "0.5vw",
  textAlign: "center",
  fontWeight:700,
  width: "100%",
  "&:hover": {
    backgroundColor: PRIMARY_COLOR_HOVER,
  },
});
const ToolBar = () => {
  const {setViewActive,viewActive}=useContext(WorkspaceContext)
  return (
    <>
      <Grid container style={{ marginTop: "1vw" }}>
        <Grid item xs={7}>
          <Grid container justifyContent={"space-around"} columnSpacing={0} alignItems={"center"}>
            {tools.map((item, index) => (
              <Grid item xs={2} key={index}>
                <Button onClick={()=>setViewActive(item)} style={{backgroundColor:viewActive===item?PRIMARY_COLOR:undefined}}>{item}</Button>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
export default ToolBar;
