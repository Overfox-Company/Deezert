import React from "react";
import { useContext } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { AppContext } from "../../context/AppContext";
import { TransitionProps } from "@mui/material/transitions";
import FormAddCompany from "../../Views/AddCompany/Form";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { PAPER_DARK, PAPER } from "../../constants/Color";
import { Container, Item } from "../Container";
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const AddCompany = ({ open, setOpen }: any) => {
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
          <Container justifyContent={"space-between"}>
            <Item xs={8}>
              {"Crea una nueva compañia"}
            </Item >
            <Item xs={1}>
              <IconButton
                color="primary"
                onClick={handleClose}
                component="label"
              >
                <CloseIcon />
              </IconButton>
            </Item >
          </Container>
        </DialogTitle>

        <DialogContent
          style={{ backgroundColor: darkMode ? PAPER_DARK : PAPER }}
        >
          <FormAddCompany first={false} />
        </DialogContent>
      </Dialog>
    </>
  );
};
export default AddCompany;
