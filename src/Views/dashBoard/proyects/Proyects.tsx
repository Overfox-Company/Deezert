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
import { Container, Item } from "../../../components/Container";
const ContainerProyects = styled.div({
  width: "100%",
  display: "flex",
  flexDirection: "column",
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
const ContainertImage = styled.div({
  display: 'flex',
  justifyContent: 'center',
  height: '20vh',
  objectFit: "cover"
})
const ImageProyect = styled.img({
  width: "auto",
  height: "auto",
  maxHeight: '20vh',
  maxWidth: '36vh',
  objectFit: "contain"
});
const Proyects = () => {
  const { user, selectedCompany } = React.useContext(AppContext);
  const { workspaces } = React.useContext(ProyectsContext);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    if (!workspaces) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [workspaces, selectedCompany]);
  return (
    <>
      <ContainerProyects>
        <Container
          justifyContent={"flex-start"}
          rowSpacing={2}
          columnSpacing={2}
        >
          <Item xs={12}>
            <AddWorkspace open={open} setOpen={setOpen} />
          </Item>
          <Item xs={12}>
            <p>Proyectos</p>
          </Item>
          {selectedCompany.idOwner === user._id && (
            <Item xs={12} md={3}>
              <CardAdd onClick={() => setOpen(true)}>
                <AddIcon style={{ fontSize: 40 }} />
              </CardAdd>
            </Item>
          )}

          {loading ?
            <Item xs={12} md={3}>
              <Skeleton variant="rectangular" width="100%">
                <div style={{ paddingTop: "57%" }} />
              </Skeleton>
            </Item>
            : null}
          {workspaces.map((item, index) => {
            return (
              <>
                <Item xs={12} md={3} key={index}>
                  <Card
                    onClick={() => Router.push(`/workspace/${item._id}`)}
                  >
                    <Container>
                      <Item xs={12}>
                        <ContainertImage>

                          <ImageProyect src={item.coverImage} />
                        </ContainertImage>
                      </Item>
                      <Item xs={12}>
                        <P>{item.name}</P>
                      </Item>
                    </Container>
                  </Card>
                </Item>
              </>
            );
          })}
        </Container>

        <br />
      </ContainerProyects>
    </>
  );
};
export default Proyects;
