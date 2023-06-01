import React, { useState, useContext } from "react";
import { Grid } from "@mui/material";
import styled from "@emotion/styled";
import AddIcon from "@mui/icons-material/Add";
import AddBoard from "./AddBoard";
import { WorkspaceContext } from "../../../../../context/WorkspaceContext";
import ApiController from "../../../../../connection/ApiController";
import { useRouter } from "next/router";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import { DeleteDialog } from "./DeleteBoardDialog";
import { AppContext } from "../../../../../context/AppContext";
import EditIcon from "@mui/icons-material/Edit";
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
const ContainerBoards = styled.div({
  minWidth: "15vw",
  padding: "1vw",
  height: "7.5vh",
  borderTop: "2px solid rgb(100,100,100)",
  margin: "0 2vw",
  boxShadow: "0 1px 2px 0 rgba(10,10,10,0.5)",
  borderRadius: "5px",
  fontSize: "1vw",
});
const Icon = styled(AddIcon)({
  cursor: "poitner",
});
type Board = {
  enableAddInput: any;
  setEnableAddInput: any;
};
const BoardView = ({ enableAddInput, setEnableAddInput }: Board) => {
  const { lisprojects, workspaceActive, workspaces } =
    useContext(WorkspaceContext);
  const { setLoader, user } = useContext(AppContext);
  const [idDelete, setIdDelete] = useState(undefined);
  const [editable, setEditable] = useState(undefined);
  const [editValue, setEditValue] = useState("");
  const [openDailogDelete, setOpenDialogDelete] = useState(false);
  const router = useRouter();
  const { workspace } = router.query;
  const [editColor, setEditColor] = useState({ _id: null, color: null });
  const handleEnable = () => {
    setEnableAddInput(true);
  };
  const handleDisabled = () => {
    setEnableAddInput(false);
  };
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
  const handleEdicolor = (event: any) => {
    setEditColor(event.target.value);
    console.log("cambiando de color");
  };
  return (
    <>
      <DeleteDialog
        open={openDailogDelete}
        onClose={setOpenDialogDelete}
        Delete={handleDelete}
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
                <ContainerBoards
                  key={index}
                  style={{ borderTop: `2px solid ${item.color}` }}
                >
                  <Grid container alignItems={"center"}>
                    <Grid item xs={9}>
                      <Board
                        readOnly={editable === item._id ? false : true}
                        onChange={handleInputChangeEdit}
                        onDoubleClick={() =>
                          toggleEditable(item._id, item.name)
                        }
                        value={editable === item._id ? editValue : item.name}
                      />
                    </Grid>
                    {user._id === workspaces.idOwner && (
                      <Grid item xs={3}>
                        {editable != item._id && (
                          <div>
                            <EditIcon
                              style={{
                                color: "rgb(150,150,150)",
                                cursor: "pointer",
                                fontSize: 15,
                              }}
                              onClick={() =>
                                toggleEditable(item._id, item.name)
                              }
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
                    )}
                  </Grid>
                </ContainerBoards>
              )
          )}
          {user._id === workspaces.idOwner && (
            <ContainerBoards
              onClick={() => handleEnable()}
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
                  <Icon
                    style={{
                      color: enableAddInput ? "white" : "rgb(100,100,100",
                    }}
                  />
                </Grid>
              </Grid>
            </ContainerBoards>
          )}
        </Grid>
      </Grid>
    </>
  );
};
export default BoardView;
