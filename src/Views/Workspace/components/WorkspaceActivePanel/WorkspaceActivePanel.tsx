import React, { useContext,useState } from "react";
import { Grid } from "@mui/material";
import ToolBar from "./components/ToolBar";
import { WorkspaceContext } from "../../../../context/WorkspaceContext";
import BoardView from "./components/BoardView";
const WorkspaceActivePanel = () => {
  const { viewActive } = useContext(WorkspaceContext)
  const [enableAddInput, setEnableAddInput] = useState(false)
  return (
    <>
      <Grid container alignItems={"flex-start"} justifyContent={"flex-start"}>
        <Grid item xs={12}>
          <ToolBar />
        </Grid>
        <Grid item xs={12}>
          {viewActive === 'Tablero' && <BoardView enableAddInput={enableAddInput} setEnableAddInput={ setEnableAddInput} />}
        </Grid>
      </Grid>
    </>
  );
};
export default WorkspaceActivePanel;
