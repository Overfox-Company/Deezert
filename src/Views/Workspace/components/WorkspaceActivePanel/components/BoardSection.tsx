import React, { useState, useContext, useEffect } from "react";
import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { AppContext } from "../../../../../context/AppContext";
import ApiController from "../../../../../connection/ApiController";
import { useRouter } from "next/router";
import { WorkspaceContext } from "../../../../../context/WorkspaceContext";
const ContainerBoards = styled.div({
  minWidth: "15vw",
  padding: "1vw",
  height: "7.5vh",
  borderTop: "2px solid rgb(100,100,100)",
  boxShadow: "0 1px 2px 0 rgba(10,10,10,0.5)",
  borderRadius: "5px",
  fontSize: "1vw",
  "&:hover p": {
    color: "rgb(200,200,200)",
  },
});
const Board = styled.input({
  fontSize: "1vw",
  outline: "none",
  border: 0,
  width: "100%",
  backgroundColor: "rgba(0,0,0,0)",
});
const CountTask = styled.p({
  fontSize: "1vw",
  padding: "0.1vw 0.2vw",
  borderRadius: "100vw",
  textAlign: "right",
});
const BoardSection = ({ item, setIdDelete, setOpenDialogDelete }: any) => {
  const [editable, setEditable] = useState(undefined);
  const [editValue, setEditValue] = useState("");
  const { setLoader, user } = useContext(AppContext);
  const { lisprojects, workspaceActive, workspaces, setTaskList, taskList } =
    useContext(WorkspaceContext);
  const router = useRouter();
  const { workspace } = router.query;
  const handleInputChangeEdit = (event: any) => {
    setEditValue(event.target.value);
  };
  const handleEdit = (idProject: any) => {
    setLoader(true);
    const values = {
      id: idProject,
      workspaceId: workspace,
      value: editValue,
    };
    ApiController.editListProject(values).then((data) => {
      console.log(data);
      setLoader(false);
      setEditable(undefined);
    });
  };
  const toggleEditable = (value: any, name: any) => {
    if (user._id === workspaces.idOwner) {
      setEditable(editable ? undefined : value);
      setEditValue(name);
    }
  };
  const [Task, setTask] = useState([]);
  useEffect(() => {
    if (taskList.length > 0) { setTask(taskList.filter((task: any) => task.list === item._id)); }
    console.log(Task);
  }, [taskList]);

  return (
    <>
      <ContainerBoards style={{ borderTop: `2px solid ${item.color}` }}>
        <Grid container alignItems={"center"}>
          <Grid item xs={7}>
            <Board
              readOnly={editable === item._id ? false : true}
              onChange={handleInputChangeEdit}
              onDoubleClick={() => toggleEditable(item._id, item.name)}
              value={editable === item._id ? editValue : item.name}
            />
          </Grid>
          <Grid item xs={2}>
            <CountTask>{Task.length !== 0 ? Task.length : null}</CountTask>
          </Grid>
          {user._id === workspaces.idOwner || workspaces?.clients?.includes(user._id) ? (
            <Grid item xs={3}>
              {editable != item._id && (
                <div>
                  <EditIcon
                    style={{
                      color: "rgb(150,150,150)",
                      cursor: "pointer",
                      fontSize: 15,
                    }}
                    onClick={() => toggleEditable(item._id, item.name)}
                  />
                  <DeleteIcon
                    onClick={() => {
                      setIdDelete(item._id);
                      setOpenDialogDelete(true);
                    }}
                    style={{
                      color: "rgb(150,150,150)",
                      cursor: "pointer",
                      fontSize: 15,
                    }}
                  />
                </div>
              )}
              {editable === item._id && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <ClearIcon
                    onClick={() => setEditable(undefined)}
                    style={{
                      cursor: "pointer",
                      fontSize: 14,
                      color: "red",
                    }}
                  />

                  <CheckIcon
                    onClick={() => handleEdit(item._id)}
                    style={{ fontSize: 14, cursor: "pointer" }}
                    color={"primary"}
                  />
                </div>
              )}
            </Grid>
          ) : null}
        </Grid>
      </ContainerBoards>
    </>
  );
};
export default BoardSection;
