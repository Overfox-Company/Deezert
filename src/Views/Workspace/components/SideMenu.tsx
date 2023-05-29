import React, { useContext } from "react";
import styled from "@emotion/styled";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { PRIMARY_COLOR } from "../../../constants/Color";
import DropDown from "./MenuComponents/DropDownMenu";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";
import { Grid } from "@mui/material";
import { CONTAINER_DARK } from "../../../constants/Color";
import { WorkspaceContext } from "../../../context/WorkspaceContext";
const ListMenu = ["Inicio", "Actividad", "Resumen", "Configuracion"];
const Container = styled.div({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  boxShadow: "0 10px 10px 0 rgba(20,20,30,1)",
  overflow: "auto",
  position: "relative",
  overflowY: "auto",
});
const ContainerBackButton = styled.div({
  display: "flex",
  backgroundColor: CONTAINER_DARK,
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "row",
  position: "absolute",
  bottom: "0vw",
  left: "0vw",
  right: 0,
  height: "8vh",
  opacity: 1,
  cursor: "pointer",
  trnsition: "all 02s ease",
  "&:hover": {
    opacity: 0.8,
  },
});
type Props = {
  panel: number;
  setPanel: any;
};
const LogoCompanyOwner = styled.img({
  width: "auto",
  height: "4vw",
  borderRadius: 200,
  backgroundColor: "black",
});
const NameCompanyOwner = styled.p({
  color: "white",
});
const SideMenuWorkspace = ({ panel, setPanel }: Props) => {
  const router = useRouter();
  const handleClick = (index: number) => {
    setPanel(index);
    setWorkspaceActive([]);
  };
  const handleClickRedirect = () => {
    router.push("/dashBoard");
  };
  const { workspaces, workspaceActive,setWorkspaceActive } = useContext(WorkspaceContext);
  return (
    <Container>
      <Grid
        container
        alignItems={"center"}
        style={{ backgroundColor: "rgba(10,15,24,0.1)", padding: "0.5vw" }}
      >
        <Grid item xs={4}>
          <LogoCompanyOwner src={workspaces.avatar} />
        </Grid>
        <Grid item xs={8}>
          <NameCompanyOwner>{workspaces.name}</NameCompanyOwner>
        </Grid>
      </Grid>
      <List>
        {ListMenu.map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              onClick={() => handleClick(index)}
              style={{
                borderLeft:
                  workspaceActive.length < 1
                    ? panel === index
                      ? `solid 2px ${PRIMARY_COLOR}`
                      : `solid 2px rgba(0,0,0,0)`
                    : `
                    solid 2px rgba(0,0,0,0)`,
              }}
            >
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <div style={{ marginBottom: "10vh" }}>
        <DropDown />
      </div>
      <ContainerBackButton onClick={() => handleClickRedirect()}>
        <ArrowBackIcon style={{ fontSize: "1vw", marginRight: "1vw" }} />
        <p style={{ fontSize: "1vw" }}>Regresar al inicio</p>
      </ContainerBackButton>
    </Container>
  );
};
export default SideMenuWorkspace;
