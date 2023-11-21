import React, { useState, useContext } from "react";
import styled from "@emotion/styled";
import {
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import useSocket from "../../../../hooks/useWebSocket";
import { WorkspaceContext } from "../../../../context/WorkspaceContext";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ApiController from "../../../../connection/ApiController";
import { useRouter } from "next/router";
import { AppContext } from "../../../../context/AppContext";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import { PRIMARY_COLOR } from "../../../../constants/Color";
const WorkspaceName = styled.input({
  fontSize: 13,
  margin: "0.5vw 0",
  outline: "none",
  border: 0,
  width: "100%",
  cursor: "pointer",
  display: 'flex',
  alignItems: 'center',
  backgroundColor: "rgba(20,20,20,0)",
});
const Icon = styled(ArrowForwardIosIcon)({
  fontSize: 12,
  margin: 0
});
const ContainerButton = styled.div({
  margin: "1vw 0",
  padding: "0.5vw 0.5vw",
  borderRadius: " 0px 5px 5px 0",
  transition: "all 0.3s ease",
  "&:hover": {
    cursor: "pointer",
    backgroundColor: "rgba(100,100,120,0.2)",
  },
});
const Input = styled.input({
  border: 0,
  width: "100%",
  margin: 0,
  textDecoration: "none",
  backgroundColor: "rgba(20,20,20,0)",
  outline: "none",
  padding: "0.5vw",
  borderBottom: "solid 1px rgb(100,100,100)",
});
const DeleteIcon = styled(ClearIcon)({
  color: "rgb(250,250,250)",
  opacity: 0.9,
  fontSize: 14,
  transition: "all 0.2 ease",
  "&:hover": {
    opacity: 1,
    cursor: "pointer",
  },
});
export interface SimpleDialogProps {
  open: boolean;
  onClose: any;
  Delete: any;
  id: any;
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, open, id, Delete } = props;

  const handleClose = () => {
    onClose(true);
  };
  const handleDelete = () => {
    Delete(id);
    onClose(true);
  };
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Eliminar espacio de trabajo</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Si eliminas este espacio de trabajo no podras recuperar los datos
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant={"outlined"} onClick={handleClose}>
          Cancelar
        </Button>
        <Button
          variant={"contained"}
          onClick={handleDelete}
          color={"error"}
          autoFocus
        >
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const ProyecSpaces = () => {
  const {
    listWorkspace,
    setListWorkspace,
    setWorkspaceActive,
    workspaceActive,
    workspaces,
    idProject,
    setIdProject
  } = useContext(WorkspaceContext);
  const { setLoader, user } = useContext(AppContext);
  const [value, setValue] = useState("");
  const [editValue, setEditValue] = useState("");

  const router = useRouter();
  const { workspace: id } = router.query;
  const [open, setOpen] = React.useState(false);
  const [editable, setEditable] = useState(undefined);
  const handleClickOpen = (ID: any) => {
    if (editable) {
      setEditable(undefined);
    } else {
      setOpen(true);
      setIdProject(ID);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setIdProject("");
  };

  const handleDelete = (idProject: any) => {
    setLoader(true);
    ApiController.deleteProject({ id: idProject, workspaceID: id }).then(
      (data) => {
        console.log(data);
        setLoader(false);
      }
    );
  };
  const handleSend = () => {
    setLoader(true);
    ApiController.AddProject({ name: value, workspaceID: id }).then((data) => {
      console.log(data);
      setValue("");
      setLoader(false);
    });
  };

  const toggleEditable = (value: any, name: any) => {
    if (user._id === workspaces.idOwner) {
      setEditable(editable ? undefined : value);
      setEditValue(name);
    }
  };
  const handleInputChange = (event: any) => {
    setValue(event.target.value);
    console.log(value);
  };
  const handleInputChangeEdit = (event: any) => {
    setEditValue(event.target.value);
    console.log(value);
  };
  const handleEdit = (idProject: any) => {
    setLoader(true);
    ApiController.editProject({
      value: editValue,
      id: idProject,
      workspaceID: id,
    }).then((data) => {
      console.log(data);
      setLoader(false);
      setEditable(undefined);
    });
  };
  useSocket({
    channel: "proyects",
    setSocketData: setListWorkspace,
    server: "workspace",
    id: id
  });
  return (
    <>
      <SimpleDialog
        Delete={handleDelete}
        id={idProject}
        open={open}
        onClose={handleClose}
      />
      <Grid container justifyContent={"flex-end"}>
        <Grid item xs={11}>
          <div style={{ maxHeight: "8vw", overflow: "auto" }}>
            {listWorkspace.map((item: any, index: number) => {
              return (
                <ContainerButton
                  onClick={() => { setWorkspaceActive(item); setIdProject(item._id) }}

                  key={index}
                  style={{
                    borderLeft: `solid 2px ${workspaceActive._id === item._id
                      ? PRIMARY_COLOR
                      : "rgba(0,0,0,0)"
                      }`,
                  }}
                >
                  <Grid container alignItems={"center"}>
                    <Grid
                      item
                      xs={3}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      {user._id === workspaces.idOwner && (
                        <DeleteIcon
                          style={{
                            color: editable === item._id ? "red" : "white",
                          }}
                          onClick={() => handleClickOpen(item._id)}
                        />
                      )}
                      {editable === item._id && (
                        <CheckIcon
                          onClick={() => handleEdit(item._id)}
                          style={{ fontSize: 14 }}
                          color={"primary"}
                        />
                      )}
                    </Grid>
                    <Grid item xs={8}>
                      <WorkspaceName

                        readOnly={editable === item._id ? false : true}
                        onDoubleClick={() =>
                          toggleEditable(item._id, item.name)
                        }
                        value={editable === item._id ? editValue : item.name}
                        onChange={handleInputChangeEdit}
                      />
                    </Grid>
                    <Grid item xs={1}>
                      <Icon />
                    </Grid>
                  </Grid>
                </ContainerButton>
              );
            })}
          </div>
        </Grid>
        <Grid item xs={11}>
          {user._id === workspaces.idOwner && (
            <Grid
              container
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Grid item xs={10}>
                <Input
                  placeholder="Agregar nuevo espacio"
                  value={value}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={2}>
                <AddIcon
                  style={{ fontSize: 18, cursor: "pointer" }}
                  onClick={() => handleSend()}
                />
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </>
  );
};
export default ProyecSpaces;
