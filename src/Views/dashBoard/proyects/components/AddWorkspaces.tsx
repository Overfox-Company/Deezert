import React, { useContext } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Grid, } from '@mui/material';
import { AppContext } from "../../../../context/AppContext";
import { TransitionProps } from "@mui/material/transitions";
import FormProyects from "./Form";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { PAPER, PAPER_DARK } from "../../../../constants/Color";
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const AddWorkspace = ({ open, setOpen }: any) => {

  const handleClose = () => {
    setOpen(false);
  };
  const { darkMode } = useContext(AppContext);
  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle style={{ backgroundColor: darkMode ? PAPER_DARK : PAPER }}>
          <Grid container justifyContent={"space-between"}>
            <Grid item xs={8}>
              {"Crea un nuevo proyecto"}
            </Grid>
            <Grid item xs={1}>
              <IconButton
                color="primary"
                onClick={handleClose}
                component="label"
              >
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
        </DialogTitle>

        <DialogContent
          style={{ backgroundColor: darkMode ? PAPER_DARK : PAPER }}
        >
          <FormProyects closeForm={setOpen} />
        </DialogContent>
      </Dialog>
    </>
  );
};
export default AddWorkspace;