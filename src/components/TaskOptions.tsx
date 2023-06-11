import React, { useRef } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import { Grid } from "@mui/material";
import styled from "@emotion/styled";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
const options = [
  { icon: EditIcon, name: "Editar nombre",color:'white' },
  { icon:DeleteOutlineOutlinedIcon, name: "Eliminar", color:'rgb(255,70,70)'},
];
const Text = styled.p({
  fontSize: "1.8vh",
  fontFamily: "comfortaa",
});

const Container = styled.div({
  width: "14vw",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0.5vw 0.5vw",
  flexDirection:'column'
});
const Button = styled.div({
  width: "100%",
  borderRadius: "0.2vw",
  padding: "0.1vw 1vw",
  margin: "0.15vw 0vw",
  backgroundColor: "rgba(0,0,0,0)",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "rgba(20,20,25,0.1)",
  },
});
const TaskOptions = () => {
  const [anchorEl, setAnchorEl] = React.useState<boolean>(false);

  const handleClick = () => {
    setAnchorEl(true);
  };

  const handleClose = () => {
    setAnchorEl(false);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const Element = useRef(null);
  return (
    <>
      <div>
        <MoreHorizIcon ref={Element} onClick={() => handleClick()} />
        <Popover
          id={id}
          open={open}
          anchorEl={Element.current}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "center",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "center",
            horizontal: "left",
          }}
        >
          <Container>
            {options.map((item, index) => (
              <Button key={index}>
                <Grid container alignItems={"center"}>
                  <Grid item xs={2}>
                    <item.icon style={{marginTop:'0.1vw', fontSize: "2.5vh", color:item.color}} />
                  </Grid>
                  <Grid item xs={10}>
                    <Text style={{color:item.color}}>{item.name}</Text>
                  </Grid>
                </Grid>
              </Button>
            ))}
          </Container>
        </Popover>
      </div>
    </>
  );
};
export default TaskOptions;
