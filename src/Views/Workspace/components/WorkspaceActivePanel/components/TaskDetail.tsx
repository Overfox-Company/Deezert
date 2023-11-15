import React, { useContext, useEffect, useState } from "react";
import {
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  CircularProgress,
} from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import styled from "@emotion/styled";
import { readFileAsBase64 } from "../../../../../hooks/useFileToB64";
import { WorkspaceContext } from "../../../../../context/WorkspaceContext";
import ApiController from "../../../../../connection/ApiController";
import { AppContext } from "../../../../../context/AppContext";
import { useRouter } from "next/router";
import UsersDialog from "../../../../../components/UsersDialog";
import { useDropzone } from "react-dropzone";
import IconType from "../../../../../components/IconType";
import HeaderTaskDetails from "./taskDetails/HeaderTaskDetails";
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
type TypeAddBoard = {
  handleClose: any;
  open: boolean;
};
const Input = styled.input({
  color: "rgb(250,250,250)",
  borderRadius: 4,
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

const Title = styled.p({
  fontSize: "1vw",
});
const Textarea = styled.textarea({
  color: "rgb(250,250,250)",
  borderRadius: 4,
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
  borderRadius: 4,
  width: "auto",
  cursor: "pointer",
  height: "20vh",
  maxWidth: "100%",
  backgroundColor: "rgba(50,50,55,0.4)",
  display: "flex",
  justifyContent: "flex-end",
  flexDirection: "column",
  boxShadow: "0 4px 5px 0 rgba(10,10,18,0.2)",
});
const NameItem = styled.p({
  backgroundColor: "rgb(100,100,110)",
  fontSize: 10,
  width: "100%",
  borderRadius: "0 0px 6px 6px",
  padding: "0.5vw 1vw",
  position: "relative",
});
const ContainerTitle = styled.div({
  padding: "0.5vw 1vw",
  borderRadius: 4,
  backgroundColor: "rgba(0,0,0,0.1)",
});
const Label = styled.p({
  fontSize: "3.5vh",
  color: "rgb(250,250,250)",
  margin: "1vw 0",
  fontWeight: 500,
  fontFamily: "roboto",
});
const DeleteIconC = styled(DeleteIcon)({
  color: "rgb(250,80,80)",
  fontSize: "1.5vw",
  marginTop: "-0.2vw",
  cursor: "pointer",
  borderRadius: 4,
  transition: "all 0.2s ease",
  "&:hover": {
    backgroundColor: "rgb(0,0,0,0.1)",
  },
});
const DownLoadIcon = styled(DownloadIcon)({
  color: "rgb(200,200,200)",
  fontSize: "1.5vw",
  marginTop: "-0.2vw",
  cursor: "pointer",
  borderRadius: 4,
  transition: "all 0.2s ease",
  "&:hover": {
    backgroundColor: "rgb(0,0,0,0.1)",
    color: "rgb(250,250,250)",
  },
});
const EditIconCustom = styled(EditIcon)({
  fontSize: "1.5vw",
  marginLeft: "1vw",
  color: "rgb(160,160,160)",
  cursor: "pointer",
  transition: "all 0.3s ease",
  "&:hover": {
    color: "rgb(250,250,250)",
  },
});
const TaskDetail = ({ handleClose, open }: TypeAddBoard) => {
  const maxSize = 10485760
  const { setLoader, user, setSnackbarOpen } = useContext(AppContext);
  const router = useRouter();
  const { workspaceActive, proyectSelected, selectedTask, lisprojects } =
    useContext(WorkspaceContext);
  const [files, setFiles] = useState<any>(selectedTask.files);
  const { workspace } = router.query;
  const [selectedDate, setSelectedDate] = useState(selectedTask.date);
  const [editDescription, setEditDescription] = useState(selectedTask.description);
  const [editTitle, setEditTitle] = useState(selectedTask.title);
  const [editT, setEditT] = useState(false);
  const [editD, setEditD] = useState(false);
  const [loadingFile, setLoadingFile] = useState(false)
  const [selectedUser, setSelectedUser] = useState<any>([]);
  const handleChangeDescription = (text: string) => {
    setEditDescription(text);
  };
  const handleChangeTitle = (text: string) => {
    setEditTitle(text);
  };

  const handleSave = async () => {
    console.log(selectedDate)
    const values = {
      id: selectedTask._id,
      name: editTitle || selectedTask._title,
      description: editDescription,
      dateEnd: selectedDate,
      workspaceID: workspace,
      assigned: selectedUser
    };

    setLoader(true);
    ApiController.editTask(values).then((data) => {
      setLoader(false);
      setEditD(false);
      setEditT(false);
      console.log(data);
    });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles, error) => {
      if (error.length > 0) {
        if (error[0].errors[0].code === 'file-too-large') {
          setSnackbarOpen({ message: 'This file is larger than 10 MB', type: 'error' })
        }
        else if (error[0].errors[0].code === 'too-many-files') {
          setSnackbarOpen({ message: 'Only a maximum of one image is allowed', type: 'error' })
        }
        else if (error[0].errors[0].code === 'file-invalid-type') {
          setSnackbarOpen({ message: `Only image files can be uploaded`, type: 'error' })
        } else {
          setSnackbarOpen({ message: error[0].errors[0].code, type: 'error' })
        }
      } else {
        addFiles(acceptedFiles);
      }

    },
    maxSize: maxSize
    //   disabled: files.length > 0,
  });
  const addFiles = async (files: any) => {
    try {
      setLoadingFile(true)
      const convertedFiles = await Promise.all(files.map(readFileAsBase64));
      if (convertedFiles) {
        const values = {
          files: convertedFiles,
          id: selectedTask._id,
          workspaceID: workspace,
        };
        console.log(values);
        const response = await ApiController.addFilesTask(values)
        console.log(response);
        setFiles(response.data.files);
        setLoadingFile(false)
      }
    } catch (e) {
      console.log(e)
      setSnackbarOpen({ message: 'ocurrio un error subiend el archivo', type: 'error' })
      setLoadingFile(false)
    }
  };
  const deleteFiles = (e: any, file: any) => {
    e.stopPropagation()
    const newFiles = files.filter((item: any) => item.url !== file.url);
    const values = {
      files: newFiles,
      id: selectedTask._id,
    };
    ApiController.deleteFilesTask(values).then((data: any) => console.log(data));
  };
  const downloadFile = (e: any, file: any) => {
    e.stopPropagation()
    // Crear un elemento <a> temporal
    const link = document.createElement("a");
    link.href = file.url;

    // Establecer el nombre del archivo
    const nombreArchivo = file.url.substring(file.url.lastIndexOf("/") + 1);
    link.download = nombreArchivo;

    // Simular el clic en el enlace para iniciar la descarga
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  useEffect(() => {
    setFiles(selectedTask.files);
    setEditTitle(selectedTask.title);
    setEditDescription(selectedTask.description);
  }, [selectedTask]);
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Dialog maxWidth="lg" onClose={handleClose} open={open}>
            <DialogTitle>
              <Grid container>
                <Grid item xs={3}>
                  <ContainerTitle>
                    <Breadcrumbs separator="›">
                      <Title>{proyectSelected?.name}</Title>
                      <Title>{workspaceActive.name}</Title>
                    </Breadcrumbs>
                  </ContainerTitle>
                </Grid>
              </Grid>
            </DialogTitle>
            <DialogContent
              style={{
                width: "65vw",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Grid
                container
                justifyContent={"space-around"}
                rowSpacing={1}
                columnSpacing={4}
              >
                <Grid item xs={12}>
                  <HeaderTaskDetails
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    selectedUser={selectedUser}
                    setSelectedUser={setSelectedUser}
                    handleSave={handleSave}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Grid container alignItems={"center"}>
                    <Grid item xs={12}>
                      <Label>Nombre de la tarea</Label>
                      <Grid container alignItems={"center"}>
                        <Grid item xs={11} onDoubleClick={() => setEditT(true)}>
                          <Input

                            placeholder="Nombre de la tarea"
                            value={editTitle}
                            disabled={!editT}
                            onChange={(event: any) =>
                              handleChangeTitle(event.target.value)
                            }
                          />
                        </Grid>
                        <Grid item xs={1}>
                          {!editT && (
                            <EditIconCustom onClick={() => setEditT(true)} />
                          )}
                          {editT && (
                            <Grid container alignItems={"center"}>
                              <Grid item xs={6}>
                                <DeleteIcon
                                  onClick={() => {
                                    setEditT(false);
                                    setEditTitle(selectedTask.title);
                                  }}
                                  style={{ fontSize: "3vh", cursor: "pointer" }}
                                  color={"error"}
                                />
                              </Grid>
                              <Grid item xs={6}>
                                <CheckCircleIcon
                                  onClick={() => handleSave()}
                                  style={{ fontSize: "3vh", cursor: "pointer" }}
                                  color={"primary"}
                                />
                              </Grid>
                            </Grid>
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Label>Descripcion de la tarea</Label>
                      <Grid container alignItems={"flex-start"}>
                        <Grid item xs={11} onDoubleClick={() => setEditD(true)}>
                          <Textarea
                            rows={5}
                            disabled={!editD}
                            placeholder="Descripcion"
                            value={editDescription}
                            onChange={(event: any) =>
                              handleChangeDescription(event.target.value)
                            }
                          />
                        </Grid>
                        <Grid item xs={1}>
                          {!editD && (
                            <EditIconCustom onClick={() => setEditD(true)} />
                          )}
                          {editD && (
                            <Grid container alignItems={"center"}>
                              <Grid item xs={6}>
                                <DeleteIcon
                                  onClick={() => {
                                    setEditD(false);
                                    setEditDescription(
                                      selectedTask.description
                                    );
                                  }}
                                  style={{ fontSize: "3vh", cursor: "pointer" }}
                                  color={"error"}
                                />
                              </Grid>
                              <Grid item xs={6}>
                                <CheckCircleIcon
                                  onClick={() => handleSave()}
                                  style={{ fontSize: "3vh", cursor: "pointer" }}
                                  color={"primary"}
                                />
                              </Grid>
                            </Grid>
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Label>Archivos abjuntos</Label>
                  <DropZone
                    {...getRootProps({ className: "dropzone" })}
                    style={{ padding: "2vw" }}
                  >
                    <input {...getInputProps()} />
                    {!loadingFile ? <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <Grid container columnSpacing={7} rowSpacing={4}>

                        {files
                          ? files.map((i: any, index: number) => {
                            return (
                              <Grid item xs={6} key={index}>
                                <ItemDropZone>
                                  <IconType file={i} />
                                  <NameItem>
                                    <Grid container>
                                      <Grid item xs={9}>
                                        {i.name.length > 10
                                          ? i.name.slice(0, 10) + "..."
                                          : i.name}
                                      </Grid>
                                      <Grid item xs={3}>
                                        <div
                                          style={{
                                            display: "flex",
                                            alignItems: "center",
                                          }}
                                        >
                                          <DeleteIconC
                                            onClick={(e) => deleteFiles(e, i)}
                                          />
                                          <DownLoadIcon
                                            onClick={(e) => downloadFile(e, i)}
                                          />
                                        </div>
                                      </Grid>
                                    </Grid>
                                  </NameItem>
                                </ItemDropZone>
                              </Grid>
                            );
                          })
                          : null}
                      </Grid>
                      {files && files.length < 1 && (
                        <p id="text">Arrastra los archivos para añadirlos

                          <br />
                          (maximo 10mb)
                        </p>
                      )}
                    </div> : <div style={{ display: 'flex', alignItems: 'center' }}>
                      <CircularProgress />

                    </div>}

                  </DropZone>
                </Grid>
              </Grid>
            </DialogContent>
          </Dialog>
        </Grid>
      </Grid>
    </>
  );
};
export default TaskDetail;
