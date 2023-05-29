import React, { useState, useEffect, useContext } from "react";
import { Grid } from "@mui/material";
import SideMenuWorkspace from "./components/SideMenu";
import CentralPanel from "./components/CentralPanel";
import ApiController from "../../connection/ApiController";
import { WorkspaceContext } from "../../context/WorkspaceContext";
import { useRouter } from "next/router";
const Workspace = () => {
  const [panel, setPanel] = useState(0);
  const { setWorkspaces,setListWorkspace} = useContext(WorkspaceContext);
  const router = useRouter();
  const { workspace: id } = router.query;
useEffect(() => {
  const fetchData = async () => {
    try {
      const workspaceDataPromise = ApiController.getCompanyOwner({ id: id });
      const workspaceListPromise = ApiController.getWorkspaceList({ id: id });

      const [workspaceData, workspaceList] = await Promise.all([
        workspaceDataPromise,
        workspaceListPromise,
      ]);

      setWorkspaces(workspaceData.data);
      setListWorkspace(workspaceList.data);

      console.log("Se han cargado correctamente los datos del workspace");
    } catch (error) {
      console.error("Error al obtener los datos del workspace:", error);
    }
  };

  if (id) {
    fetchData();
  }
}, [id, setWorkspaces, setListWorkspace]);


  return (
    <>
      <Grid container>
        <Grid item xs={2}>
          <SideMenuWorkspace panel={panel} setPanel={setPanel} />
        </Grid>
        <Grid item xs={10}>
          <CentralPanel panel={panel} />
        </Grid>
      </Grid>
    </>
  );
};
export default Workspace;
