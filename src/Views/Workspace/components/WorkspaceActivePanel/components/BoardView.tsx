import React, { useState, useContext, useEffect } from "react";
import { Grid } from "@mui/material";
import styled from "@emotion/styled";
import AddIcon from "@mui/icons-material/Add";
import AddBoard from "./AddBoard";
import { WorkspaceContext } from "../../../../../context/WorkspaceContext";
import ApiController from "../../../../../connection/ApiController";
import { useRouter } from "next/router";

import { DeleteDialog } from "./DeleteBoardDialog";
import { AppContext } from "../../../../../context/AppContext";

import AddTask from "./AddTask";
import useSocket from "../../../../../hooks/useWebSocket";
import TaskSection from "./TaskSection";
import BoardSection from "./BoardSection";
type Board = {
  enableAddInput: any;
  setEnableAddInput: any;
};
const Board = styled.input({
  fontSize: "1vw",
  outline: "none",
  border: 0,
  width: "100%",
  backgroundColor: "rgba(0,0,0,0)",
});
const AddBoardButton = styled.input({
  color: "rgb(250,250,250)",
  fontSize: "1vw",
  outline: "none",
  border: 0,
  width: "100%",
  backgroundColor: "rgba(0,0,0,0)",
  "::placeholder": {
    color: "rgb(100,100,100)",
  },
});
const AddTaskText = styled.p({
  color: "rgb(100,100,100)",
  fontSize: "1vw",
  outline: "none",
  border: 0,
  width: "100%",
  marginLeft: "1vw",
  backgroundColor: "rgba(0,0,0,0)",
  transition: "all 0.3s ease",
});
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
const ContainerTask = styled.div({
  marginTop: "2vw",
  display: "flex",
  alignItems: "center",
  maxHeight: "55vh",
  overflow: "auto",
  padding: "1vh",
  width: "100%",
  flexDirection: "column",
  borderRadius: "5px",
});
const ContainerAddTask = styled.div({
  marginTop: "2vw",
  display: "flex",
  alignItems: "center",
  height: "7.5vh",
  opacity: 0,
  borderRadius: "5px",
  cursor: "pointer",
  "&:hover p": {
    color: "rgb(200,200,200)",
  },
});
const Icon = styled(AddIcon)({
  cursor: "pointer",
  color: "rgb(100,100,100)",
  "&:hover": {
    color: "rgb(200,200,200)",
  },
});
const ColumnContainer = styled.div({
  flexDirection: "column",
  margin: "0 2vw",
  "&:hover  .crearTarea": {
    opacity: 1,
  },
});

const BoardView = ({ enableAddInput, setEnableAddInput }: Board) => {
  const { lisprojects, workspaceActive, workspaces, setTaskList,setSelectedTask } =
    useContext(WorkspaceContext);
  const { setLoader, user, setStaff, selectedCompany } = useContext(AppContext);
  const [idDelete, setIdDelete] = useState(undefined);
  const [openDailogDelete, setOpenDialogDelete] = useState(false);
  const [openAddTask, setOpenAddTask] = useState(false);
  const [listSelected, setListSelected] = useState("");
  const router = useRouter();
  const { workspace } = router.query;
  const handleEnable = (value: string) => {
    if (value === "board") {
      setEnableAddInput(true);
    } else {
      setOpenAddTask(true);
    }
  };
  const handleDisabled = () => {
    setEnableAddInput(false);
    setOpenAddTask(false);
  };

  const handleDelete = () => {
    setLoader(true);
    const values = {
      id: idDelete,
      workspaceId: workspace,
    };
    ApiController.deleteListProject(values)
      .then((data) => {
        console.log(data);
        setLoader(false);
      })
      .finally(() => {
        setLoader(false);
      });
    console.log("borrar board");
  };
  useEffect(() => {
    console.log("compañia seleccionada");
    if (workspaces._id) {
      setLoader(true);
      Promise.all([
        ApiController.GetInvitations({ id: workspaces._id }),
        ApiController.getAllTask({ id: workspace }),
      ]).then(([invitationsResponse, taskResponse]) => {
        setStaff(invitationsResponse.data.staff);
        setTaskList(taskResponse.data);
        setLoader(false);
      });
    }
  }, [selectedCompany]);
  useSocket({
    channel: "task",
    setSocketData: setTaskList,
    server: "workspace",
  });
    useSocket({
    channel: "taskSelected",
    setSocketData: setSelectedTask,
    server: "workspace",
  });
  const handleDragOver = (event: any) => {
    event.preventDefault();
  };

  const handleDrop = (event: any) => {
    event.preventDefault();
    const draggedItemId = event.dataTransfer.getData("text/plain");
    const targetDivId = event.target.id;
    if (targetDivId && draggedItemId) {
      const values = {
        target: targetDivId,
        id: draggedItemId,
        workspaceID: workspace,
      };
      ApiController.dragTask(values).then((data) => console.log(data));
      console.log("Elemento arrastrado:", draggedItemId);
      console.log("Elemento de destino", targetDivId);
    }
  };
  return (
    <>
      <DeleteDialog
        open={openDailogDelete}
        onClose={setOpenDialogDelete}
        Delete={handleDelete}
      />
      <AddTask
        open={openAddTask}
        handleClose={handleDisabled}
        idList={listSelected}
      />
      <AddBoard handleClose={handleDisabled} open={enableAddInput} />
      <Grid container style={{ marginTop: "2vw", height: "80vh" }}>
        <Grid
          item
          xs={12}
          style={{
            display: "flex",
            flexDirection: "row",
            overflow: "auto",
            maxWidth: "100vw",
          }}
        >
          {lisprojects.map(
            (item: any, index: number) =>
              workspaceActive._id === item.project && (
                <ColumnContainer
                  id={item._id}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  key={index}
                >
                  <BoardSection
                    item={item}
                    setIdDelete={setIdDelete}
                    setOpenDialogDelete={setOpenDialogDelete}
                  />
                  <ContainerTask>
                    <TaskSection item={item} />
                  </ContainerTask>
                  <ContainerAddTask
                    className="crearTarea"
                    onClick={() => {
                      handleEnable("task");
                      setListSelected(item._id);
                    }}
                  >
                    <Grid container alignItems={"center"}>
                      <Grid item xs={10}>
                        <AddTaskText
                          style={{
                            cursor: enableAddInput ? "text" : "pointer",
                          }}
                        >
                          Añadir nueva tarea
                        </AddTaskText>
                      </Grid>
                      <Grid item xs={2}>
                        <Icon />
                      </Grid>
                    </Grid>
                  </ContainerAddTask>
                </ColumnContainer>
              )
          )}
          {user._id === workspaces.idOwner && (
            <ColumnContainer>
              <ContainerBoards
                onClick={() => handleEnable("board")}
                style={{ cursor: enableAddInput ? "auto" : "pointer" }}
              >
                <Grid container alignItems={"center"}>
                  <Grid item xs={10}>
                    <AddBoardButton
                      disabled={true}
                      placeholder="Añadir Nueva lista"
                      style={{ cursor: enableAddInput ? "text" : "pointer" }}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Icon style={{ color: "rgb(100,100,100)" }} />
                  </Grid>
                </Grid>
              </ContainerBoards>
            </ColumnContainer>
          )}
        </Grid>
      </Grid>
    </>
  );
};
export default BoardView;
