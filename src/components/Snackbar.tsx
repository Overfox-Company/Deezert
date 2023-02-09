import React, { useContext } from "react";
import Snackbar from "@mui/material/Snackbar";
import Fade from "@mui/material/Fade";
import Slide, { SlideProps } from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { AppContext } from "../context/AppContext";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function SnackbarCustom() {
  const [state, setState] = React.useState<{
    open: boolean;
    Transition: React.ComponentType<
      TransitionProps & {
        children: React.ReactElement<any, any>;
      }
    >;
  }>({
    open: false,
    Transition: Fade,
  });

  const { isSnackbarOpen, setSnackbarOpen } = useContext(AppContext);

  React.useEffect(() => {
    if (isSnackbarOpen.message) {
      setState({
        open: true,
        Transition: SlideTransition,
      });
    }
  }, [isSnackbarOpen]);

  const handleClose = () => {
    setState({
      ...state,
      open: false,
    });
      setSnackbarOpen({
          message: '',
          type:''
    });
  };

  return (
    <Snackbar
      open={state.open}
      onClose={handleClose}
      TransitionComponent={state.Transition}
      message="I love snacks"
      key={state.Transition.name}
    >
      <Alert onClose={handleClose} severity={isSnackbarOpen.type} sx={{ width: "100%" }}>
        {isSnackbarOpen.message}
      </Alert>
    </Snackbar>
  );
}
