import React, { useContext, useEffect, useState, useRef } from "react";
import { Grid } from "@mui/material";
import styled from "@emotion/styled";
import { WorkspaceContext } from "../../../../../../context/WorkspaceContext";
import ApiController from "../../../../../../connection/ApiController";
import { AppContext } from "../../../../../../context/AppContext";
import { useRouter } from "next/router";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import UsersDialog from "../../../../../../components/UsersDialog";
import type { userType } from "../../../../../../types/global";
import Avatar from "../../../../../../components/Avatar";
import Popover from "@mui/material/Popover";
import useSocket from "../../../../../../hooks/useWebSocket";
import DateSelect from "../../../../../../components/DateSelect";
import moment from "moment";
import { PRIMARY_COLOR } from "../../../../../../constants/Color";
import TimeWorked from "../../../../../../components/TimeWorked";
type ComponentType = {
  selectedDate: any;
  setSelectedDate: any;
  selectedUser: any;
  setSelectedUser: any;
  handleSave: any;
};
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
  height: "5.5vh",
  margin: " 0 0.5vw",
  backgroundColor: "rgb(250,250,250)",
});
const FlexContainer = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
  flexDirection: "row",
});
const ContainerUsersSelected = styled.div({
  display: "flex",
  alignItems: "center",
});

const TaskList = styled.div({
  width: "90%",
  fontFamily: "Comfortaa, cursive",
  padding: "0.8vw 1vw",
  backgroundColor: "rgba(5,5,15,0.1)",
  fontSize: "0.8vw",
  cursor: "pointer",
});
const ListItem = styled.div({
  fontFamily: "Comfortaa, cursive",
  padding: "0.8vw 1vw",
  backgroundColor: "rgba(5,5,15,0.1)",
  fontSize: "0.8vw",
  cursor: "pointer",
});
const DateCreatedTitle = styled.p({
  color: "rgb(200,200,200)",
  fontFamily: "Comfortaa, cursive",
  fontSize: "0.9vw",
  marginBottom: "0.5vw",
});
const DateCreated = styled.p({
  color: "rgb(170,170,170)",
  fontFamily: "Comfortaa, cursive",
  fontSize: "0.8vw",
});
const HeaderTaskDetails = ({
  selectedDate,
  setSelectedDate,
  selectedUser,
  setSelectedUser,
  handleSave,
}: ComponentType) => {
  const [openUserDialog, setOpenUserDialog] = useState(false);
  const router = useRouter();
  const { workspace } = router.query;
  const [anchorEl, setAnchorEl] = useState<boolean>(false);
  const { setSelectedTask, selectedTask, lisprojects, taskList } =
    useContext(WorkspaceContext);
  const { staff } = useContext(AppContext);
  const [ListSelected, setListSelected] = useState<any>([]);

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
  };

  const handleCloseUsersDialog = () => {
    setOpenUserDialog(false);
    handleSave();
  };

  const handleClick = () => {
    setAnchorEl(true);
  };

  const handleClose = () => {
    setAnchorEl(false);
  };

  const handleChangeList = (listId: string) => {
    const values = {
      target: listId,
      id: selectedTask._id,
      workspaceID: workspace,
    };
    ApiController.dragTask(values).then((data) => {
      console.log(data);
      handleClose();
    });
  };
  const handleDoneTask = async () => {


    const data = {
      id: selectedTask._id
    }
    const result = await ApiController.doneTask(data)
    console.log(result)
  }
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const Element = useRef(null);
  const handleSocketData = (data: any) => {
    setSelectedTask((prevData: any) => {
      const updatedTask = data.find(
        (newTask: any) => newTask._id === prevData._id
      );
      return updatedTask ? updatedTask : prevData;
    });
  };
  useSocket({
    channel: "task",
    setSocketData: handleSocketData,
    server: "workspace",
  });
  useEffect(() => {
    const selectedList = lisprojects.find(
      (list: any) => list._id === selectedTask.list
    );
    const users = staff ? staff.filter((user) =>
      selectedTask.assigned.includes(user._id)
    ) : [];
    setSelectedUser(users);
    if (selectedList) {
      setListSelected(selectedList);
    } else {
      setListSelected([]);
    }
    setSelectedDate(selectedTask.dateEnd);
  }, [selectedTask, lisprojects, taskList]);

  return (
    <>
      <UsersDialog
        handleClose={handleCloseUsersDialog}
        open={openUserDialog}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />

      <Grid container justifyContent={"space-around"} rowSpacing={1}>
        <Grid item xs={12}>
          <HeaderForm>
            <Grid
              container
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Grid item xs={2}>
                <TaskList
                  onClick={() => handleClick()}
                  ref={Element}
                  style={{
                    borderLeft: `solid 2px ${selectedTask.done ? PRIMARY_COLOR : ListSelected.color}`,
                  }}
                >
                  {selectedTask.done ? "Done" : ListSelected.name}
                </TaskList>
                <Popover
                  id={id}
                  open={open}
                  anchorEl={Element.current}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                >
                  {lisprojects.map((list: any, index: number) => (
                    <ListItem
                      onClick={() => handleChangeList(list._id)}
                      key={index}
                      style={{
                        marginTop: "0.5vw",
                        borderLeft: `solid 3px ${list.color}`,
                        backgroundColor:
                          ListSelected._id === list._id
                            ? "rgba(150,150,150,0.5)"
                            : "rgb(0,0,0,0)",
                      }}
                    >
                      {list.name}
                    </ListItem>
                  ))}
                  <ListItem
                    onClick={() => handleDoneTask()}
                    style={{
                      marginTop: "0.5vw",
                      borderLeft: `solid 3px ${PRIMARY_COLOR}`,
                      backgroundColor: selectedTask.done
                        ? "rgba(150,150,150,0.5)"
                        : "rgb(0,0,0,0)"
                    }}
                  >
                    Done
                  </ListItem>
                </Popover>
              </Grid>
              <Grid item xs={4}>
                <ContainerUsersSelected>
                  <IconAddUser onClick={() => setOpenUserDialog(true)} />
                  {selectedUser.map((e: userType, i: number) => (
                    <Avatar key={i} url={e.avatar} name={e.name} />
                  ))}
                </ContainerUsersSelected>
              </Grid>
              <Grid item xs={2}>
                <FlexContainer>
                  <Divider />
                  <div>
                    <DateCreatedTitle>Fue creado en :</DateCreatedTitle>
                    <DateCreated>
                      {moment(selectedTask.CreatedDate).format(
                        "MMM-DD-YYYY h:mm A"
                      )}
                    </DateCreated>
                  </div>
                </FlexContainer>
              </Grid>
              <Grid item xs={2}>
                <TimeWorked />
              </Grid>
              <Grid item xs={2}>
                <FlexContainer>
                  <Divider />
                  <DateSelect
                    handleSave={handleSave}
                    value={selectedDate}
                    onChange={(date: any) => handleDateChange(date)}
                  />
                </FlexContainer>
              </Grid>
            </Grid>
          </HeaderForm>
        </Grid>
      </Grid>
    </>
  );
};
export default HeaderTaskDetails;
