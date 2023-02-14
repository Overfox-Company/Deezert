import React from "react";
import styled from "@emotion/styled";
import { Grid, Paper } from "@mui/material";
import { ProyectsContext } from "../../../context/ProyectsContext";
import AddIcon from "@mui/icons-material/Add";
import AddWorkspace from "./components/AddWorkspaces";
const Container = styled.div({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
  padding: 10,
  paddingTop: 20,
  paddingLeft: 20,
  borderRadius: 4,
  border: "solid 1px rgba(100,100,100,0.1)",
});
const CardAdd = styled(Paper)({
  height: "25vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  transition: "0.15s",
  "&: hover": {
    cursor: "pointer",
    opacity: 0.8,
  },
});
const Proyects = () => {
    const { workspaces } = React.useContext(ProyectsContext);
    const [open, setOpen] = React.useState(false);
  return (
    <>
          <Container>
    
        <Grid
          container
          justifyContent={"flex-start"}
          alignItems={"center"}
          rowSpacing={2}
              >
                  <Grid item xs={12}>
                      <AddWorkspace open={open} setOpen={setOpen} />
                  </Grid>
          <Grid item xs={12}>
            <p>Proyectos</p>
                  </Grid>
          <Grid item xs={12} md={3}>
                      <CardAdd onClick={()=>setOpen(true)}>
              <AddIcon style={{ fontSize: 40 }} />
            </CardAdd>
          </Grid>
        </Grid>

        <br />
      </Container>
    </>
  );
};
export default Proyects;
