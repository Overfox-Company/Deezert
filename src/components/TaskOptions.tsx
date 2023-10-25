import React, { useRef, useContext, useState } from "react";
import Popover from "@mui/material/Popover";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import { Grid } from "@mui/material";
import styled from "@emotion/styled";
import { AppContext } from "../context/AppContext";
import { useRouter } from "next/router";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ApiController from "../connection/ApiController";
const options = [
  { icon: EditIcon, name: "Editar nombre", color: "white", action: "editName" },
  {
    icon: DeleteOutlineOutlinedIcon,
    name: "Eliminar",
    color: "rgb(255,70,70)",
    action: "delete",
  },
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
  flexDirection: "column",
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
const TaskOptions = ({ task, setEdit }: { setEdit: any, task: any }) => {
  const [anchorEl, setAnchorEl] = useState<boolean>(false);
  const router = useRouter();
  const { setLoader } = useContext(AppContext);
  const { workspace } = router.query;
  const handleClick = (e: any) => {
    e.stopPropagation()
    setAnchorEl(true);
  };

  const handleClose = (e: any) => {
    e.stopPropagation()
    setAnchorEl(false);
  };
  const handleAction = (event: string) => {
    switch (event) {
      case "delete":
        return handleDelete();
      case "editName":
        return handleEditName();
      default:
        return null;
    }
  };
  const handleDelete = () => {
    setLoader(true);
    const values = {
      workspaceID: workspace,
      id: task._id,
    };
    ApiController.deleteTask(values).then((data) => {
      console.log(data);
      setLoader(false);
    });
  };
  const handleEditName = () => {
    setEdit(task)
  }
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const Element = useRef(null);
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <MoreHorizIcon ref={Element} onClick={(e) => handleClick(e)} />
        <Popover
          id={id}
          open={open}
          anchorEl={Element.current}
          onClose={(e) => handleClose(e)}
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
              <Button key={index} onClick={() => handleAction(item.action)}>
                <Grid container alignItems={"center"}>
                  <Grid item xs={2}>
                    <item.icon
                      style={{
                        marginTop: "0.1vw",
                        fontSize: "2.5vh",
                        color: item.color,
                      }}
                    />
                  </Grid>
                  <Grid item xs={10}>
                    <Text style={{ color: item.color }}>{item.name}</Text>
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
