import React from "react";
import styled from "@emotion/styled";
import { Grid, Paper, Skeleton } from "@mui/material";
import { ProyectsContext } from "../../../context/ProyectsContext";
import AddIcon from "@mui/icons-material/Add";
import AddWorkspace from "./components/AddWorkspaces";
import { AppContext } from "../../../context/AppContext";
import { P } from "../../../components/BasicComponents";
import { PAPER_DARK } from "../../../constants/Color";
import Router from "next/router";
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
const Card = styled.div({
  height: "25vh",
  display: "flex",
  borderRadius: 4,
  backgroundColor: PAPER_DARK,
  justifyContent: "center",
  alignItems: "center",
  transition: "0.15s",
  "&: hover": {
    cursor: "pointer",
    opacity: 0.8,
  },
});
const ImageProyect = styled.img({
  width: "100%",
  height: "auto",
});
const Proyects = () => {
  const { user, selectedCompany } = React.useContext(AppContext);
  const { workspaces } = React.useContext(ProyectsContext);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    if (workspaces.length < 1) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [workspaces, selectedCompany]);
  return (
    <>
      <Container>
        <Grid
          container
          justifyContent={"flex-start"}
          alignItems={"center"}
          rowSpacing={2}
          columnSpacing={2}
        >
          <Grid item xs={12}>
            <AddWorkspace open={open} setOpen={setOpen} />
          </Grid>
          <Grid item xs={12}>
            <p>Proyectos</p>
          </Grid>
          {selectedCompany.idOwner === user._id && (
            <Grid item xs={12} md={3}>
              <CardAdd onClick={() => setOpen(true)}>
                <AddIcon style={{ fontSize: 40 }} />
              </CardAdd>
            </Grid>
          )}

          {loading === true && (
            <Grid item xs={12} md={3}>
              <Skeleton variant="rectangular" width="100%">
                <div style={{ paddingTop: "57%" }} />
              </Skeleton>
            </Grid>
          )}
          {workspaces.map((item, index) => {
            return (
              <>
                <Grid item xs={12} md={3} key={index}>
                  <Card
                  onClick={()=>Router.push(`/workspace/${item._id}`)}
                  >
                    <Grid container>
                      <Grid item xs={12}>
                        <ImageProyect src={item.coverImage} />
                      </Grid>
                      <Grid item xs={12}>
                        <P>{item.name}</P>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              </>
            );
          })}
        </Grid>

        <br />
      </Container>
    </>
  );
};
export default Proyects;
