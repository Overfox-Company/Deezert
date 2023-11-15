import React, { useContext, useEffect, useState } from "react";
import {
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
} from "@mui/material";
import styled from "@emotion/styled";
import { readFileAsBase64 } from "../../../../../hooks/useFileToB64";
import { WorkspaceContext } from "../../../../../context/WorkspaceContext";
import ApiController from "../../../../../connection/ApiController";
import { AppContext } from "../../../../../context/AppContext";
import { useRouter } from "next/router";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import UsersDialog from "../../../../../components/UsersDialog";
import type { userType } from "../../../../../types/global";
import { PAPER_DARK } from "../../../../../constants/Color";
import { useDropzone } from "react-dropzone";
import Avatar from "../../../../../components/Avatar";
import IconType from "../../../../../components/IconType";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import DateSelect from "../../../../../components/DateSelect";
type TypeAddBoard = {
  handleClose: any;
  open: boolean;
  idList: string;
};
const Input = styled.input({
  color: "rgb(250,250,250)",
  borderRadius: 6,
  fontSize: "1vw",
  outline: "none",

  width: "100%",
  padding: "0.5vw",
  border: "solid 1px rgb(100,100,100)",
  backgroundColor: "rgba(0,0,0,0)",
  "::placeholder": {
    color: "rgb(200,200,200)",
  },
});
const Textarea = styled.textarea({
  color: "rgb(250,250,250)",
  borderRadius: 6,
  fontSize: "1vw",
  outline: "none",
  resize: "none",
  width: "100%",
  padding: "0.5vw",
  border: "solid 1px rgb(100,100,100)",
  backgroundColor: "rgba(0,0,0,0)",
  "::placeholder": {
    color: "rgb(200,200,200)",
  },
});
const HeaderForm = styled.div({
  borderBottom: "solid 1px rgb(200,200,200)",
  paddingBottom: "1vw",
});
const IconAddUser = styled(PersonAddIcon)({
  borderRadius: 50,
  padding: "0.2vw",
  cursor: "pointer",
  fontSize: "2.4vw",
  color: "rgb(200,200,200)",
  border: "dotted 2px rgb(200,200,200)",
  transition: "all 0.5s ease",
  "&:hover": {
    color: "rgb(250,250,250)",
    border: "dotted 2px rgb(250,250,250)",
  },
});
const Divider = styled.div({
  width: "0.1vw",
  height: "4vh",
  backgroundColor: "rgb(250,250,250)",
});

const ContainerUsersSelected = styled.div({
  display: "flex",
  alignItems: "center",
});
const DropZone = styled.div({
  overflow: "auto",
  height: "30vh",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  backgroundColor: "rgba(0,0,10,0.1)",
  borderRadius: 6,
  fontFamily: "Comfortaa, cursive",
  padding: "1vw",
  position: "relative",
  "& #text": {
    position: "absolute",
    textAlign: "center",
    fontSize: 12,
    top: "45%",
  },
});
const ItemDropZone = styled.div({
  borderRadius: 6,
  width: "auto",
  height: "20vh",
  maxWidth: "100%",
  backgroundColor: "rgba(50,50,55,0.4)",
  display: "flex",
  justifyContent: "flex-end",
  flexDirection: "column",
});
const NameItem = styled.p({
  backgroundColor: "rgb(100,100,110)",
  fontSize: 10,
  width: "100%",
  borderRadius: "0 0px 6px 6px",
  padding: "0.5vw 1vw",
  position: "relative",
});
const AddTask = ({ handleClose, open, idList }: TypeAddBoard) => {
  const [selectedUser, setSelectedUser] = useState([]);
  const [nameTask, setNameTask] = useState("");
  const { setLoader, user, setSnackbarOpen } = useContext(AppContext);
  const [openUserDialog, setOpenUserDialog] = useState(false);
  const [description, setDescription] = useState("");
  const router = useRouter();
  const { workspace } = router.query;
  const { idProject } = useContext(WorkspaceContext)
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
  };

  const handleChange = (event: any) => {
    setNameTask(event.target.value);
  };
  const handleChangeDescription = (event: any) => {
    setDescription(event.target.value);
  };
  const handleSave = async () => {
    if (!nameTask) {
      setSnackbarOpen({ message: 'Debes poner asignar un nombre a la tarea', type: 'error' })
    } else {

      const values = {
        area: idProject,
        //  files: convertedFiles,
        name: nameTask,
        description: description,
        list: idList,
        users: selectedUser,
        dateEnd: selectedDate,
        workspaceID: workspace,
        owner: user._id,
      };

      setLoader(true);
      ApiController.addTask(values).then((data) => {
        setLoader(false);
        handleClose();
        setSelectedDate(null)
        setDescription('')
        setSelectedUser([])
        setNameTask('')
        console.log(data);
      });

    }
  };
  const handleCloseUsersDialog = () => {
    setOpenUserDialog(false);
  };


  return (
    <>
      <UsersDialog
        handleClose={handleCloseUsersDialog}
        open={openUserDialog}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />

      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Añadir nueva tarea</DialogTitle>
        <DialogContent
          style={{ width: "25vw", display: "flex", justifyContent: "center" }}
        >
          <Grid container justifyContent={"space-around"} rowSpacing={1}>
            <Grid item xs={12}>
              <HeaderForm>
                <Grid container alignItems={"center"}>
                  <Grid item xs={6}>
                    <ContainerUsersSelected>
                      <IconAddUser onClick={() => setOpenUserDialog(true)} />
                      {selectedUser.map((e: userType, i) => (
                        <Avatar style={{ height: '2.5vw', width: '2.5vw' }} key={i} url={e.avatar} name={e.name} />
                      ))}
                    </ContainerUsersSelected>
                  </Grid>
                  <Grid item xs={1}>
                    <Divider />
                  </Grid>
                  <Grid item xs={5}>
                    <DateSelect
                      addTask
                      value={selectedDate}
                      onChange={(event: any) => {
                        handleDateChange(event);
                      }}
                    />
                  </Grid>
                </Grid>
              </HeaderForm>
            </Grid>
            <Grid item xs={12}>
              <Input
                placeholder="Nombre de la tarea"
                value={nameTask}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Textarea
                rows={4}
                placeholder="Descripcion"
                value={description}
                onChange={handleChangeDescription}
              />
            </Grid>
            {/*<Grid item xs={12}>
              <DropZone {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} />
                <Grid container spacing={5}>
                  {files.map((i: any, index: number) => {
                    return (
                      <Grid item xs={6} key={index}>
                        <ItemDropZone>
                          <IconType file={i} />
                          <NameItem onClick={() => console.log("click")}>
                            {i.path.length > 10
                              ? i.path.slice(0, 10) + "..."
                              : i.path}
                          </NameItem>
                        </ItemDropZone>
                      </Grid>
                    );
                  })}
                </Grid>
                {files.length === 0 && (
                  <p id="text">Arrastra los archivos para añadirlos</p>
                )}
              </DropZone>
              <br />
              <Button
                variant={"outlined"}
                onClick={() => setFiles([])}
                style={{ width: "100%" }}
              >
                Borrar archivos
              </Button>
                </Grid>*/}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant={"outlined"} onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant={"contained"} onClick={() => handleSave()}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default AddTask;
