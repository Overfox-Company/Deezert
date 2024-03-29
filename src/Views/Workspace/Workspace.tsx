import React, { useState, useEffect, useContext } from "react";
import { Grid } from "@mui/material";
import SideMenuWorkspace from "./components/SideMenu";
import CentralPanel from "./components/CentralPanel";
import ApiController from "../../connection/ApiController";
import { WorkspaceContext } from "../../context/WorkspaceContext";
import { AppContext } from "../../context/AppContext";
import { useRouter } from "next/router";
import useSocket from "../../hooks/useWebSocket";
const Workspace = () => {
  const [panel, setPanel] = useState(0);
  const { setWorkspaces, setListWorkspace, setLisprojects } =
    useContext(WorkspaceContext);
  const router = useRouter();
  const { workspace: id } = router.query;
  useEffect(() => {

    const fetchData = async () => {
      try {
        const workspaceDataPromise = ApiController.getCompanyOwner({ id: id });
        const workspaceListPromise = ApiController.getWorkspaceList({ id: id });
        const workspaceListProjectPromise = ApiController.getListProject({
          id: id,
        });
        const [workspaceData, workspaceList, workspaceListProject] =
          await Promise.all([
            workspaceDataPromise,
            workspaceListPromise,
            workspaceListProjectPromise,
          ]);
        setWorkspaces(workspaceData.data);
        setListWorkspace(workspaceList.data);
        setLisprojects(workspaceListProject.data);
      } catch (error) {
        console.error("Error al obtener los datos del workspace:", error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, setWorkspaces, setListWorkspace, setLisprojects]);

  useSocket({
    channel: "listProyects",
    setSocketData: setLisprojects,
    server: "workspace",
    id: id
  });

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
