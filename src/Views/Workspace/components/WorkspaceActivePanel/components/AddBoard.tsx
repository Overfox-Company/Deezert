import React, { useContext } from "react";
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
import { HexColorPicker } from "react-colorful";
import { WorkspaceContext } from "../../../../../context/WorkspaceContext";
import ApiController from "../../../../../connection/ApiController";
import { AppContext } from "../../../../../context/AppContext";
import { useRouter } from "next/router";
type TypeAddBoard = {
  handleClose: any;
  open: boolean;
};
const Input = styled.input({
  color: "rgb(250,250,250)",
  fontSize: "1vw",
  outline: "none",
  border: 0,
  width: "100%",
  paddingBottom: "0.5vw",
  borderBottom: "solid 1px rgb(200,200,200)",
  backgroundColor: "rgba(0,0,0,0)",
  "::placeholder": {
    color: "rgb(200,200,200)",
  },
});
const Color = styled.input({
  border: 0,
  width: "2vw",
  height: "2vw",
  borderRadius: 2,
});

const AddBoard = ({ handleClose, open }: TypeAddBoard) => {
  const [color, setColor] = React.useState("#aabbcc");
  const [nameList, setNameList] = React.useState("");
  const { workspaceActive } = useContext(WorkspaceContext);
  const { setLoader, setSnackbarOpen } = useContext(AppContext);
  const router = useRouter();
  const { workspace } = router.query;
  const handleChange = (event: any) => {
    setNameList(event.target.value);
  };
  const handleSave = () => {
    if (!nameList) {
      setSnackbarOpen({ message: 'Debes ingresar un nombre', type: 'error' })
    } else {
      setLoader(true);
      const values = {
        workspaceId: workspace,
        projectId: workspaceActive._id,
        name: nameList,
        color: color,
      };
      ApiController.addListProject(values)
        .then((data) => {
          console.log(data);
        })
        .finally(() => {
          setLoader(false);
          handleClose();
        });
    }

  };
  return (
    <>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Añadir nueva lista</DialogTitle>
        <DialogContent
          style={{ width: "25vw", display: "flex", justifyContent: "center" }}
        >
          <Grid container justifyContent={"space-around"} rowSpacing={5}>
            <Grid item xs={10}>
              <Input
                placeholder="Sin Empezar, Desarrollo etc.."
                value={nameList}
                onChange={handleChange}
              />
            </Grid>
            <Grid
              item
              xs={2}
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Color style={{ backgroundColor: color }} />
            </Grid>
            <Grid item xs={12}>
              <HexColorPicker
                color={color}
                onChange={setColor}
                style={{ height: "10vw", width: "100%", borderRadius: "0" }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant={"outlined"} onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant={"contained"} autoFocus onClick={() => handleSave()}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default AddBoard;
