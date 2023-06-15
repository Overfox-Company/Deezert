import React, { useContext, useState } from "react";
import { AppContext } from "../../../../../context/AppContext";
import { WorkspaceContext } from "../../../../../context/WorkspaceContext";
import styled from "@emotion/styled";
import Avatar from "../../../../../components/Avatar";
import { Grid, Tooltip } from "@mui/material";
import moment from "moment";
import { useRouter } from "next/router";
import TaskOptions from "../../../../../components/TaskOptions";
import { TaskType } from "../../../../../types/Proyects";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import ApiController from "../../../../../connection/ApiController";
import TaskDetail from "./TaskDetail";
const Task = styled.div({
  boxShadow: "0 1px 2px 0 rgba(10,10,10,0.5)",
  marginTop: "1vw",
  borderRadius: "5px",
  minHeight: "10vh",
  cursor: "pointer",
  padding: "1vw",
  display: "flex",
  alignItems: "flex-start",
  width: "100%",
  justifyContent: "space-between",
  paddingRight: "2vw",
  "&:hover .ToolBar": {
    opacity: 1,
  },
});
const InputEdit = styled.input({
  border: 0,
  outline: "none",
  backgroundColor: "rgba(0,0,0,0.1)",
  borderRadius: 4,
  padding: "0.5vw",
});
const Title = styled.p({
  fontSize: "1.8vh",
  width: "15vh",
  wordWrap: "break-word",
});
const DateEnd = styled.p({
  fontSize: "1.5vh",
  color: "rgb(160,160,160)",
  marginTop: "2vh",
});
const ToolBar = styled.div({
  height: "2vh",
  marginTop: "1vh",
  opacity: 0,
  color: "rgb(150,150,150)",
  transition: "all 0.2s ease",
  display: "flex",
  justifyContent: "flex-end",
  cursor: "pointer",
  "&:hover": {
    color: "white",
  },
});
const TaskSection = ({ item }: any) => {
  const { staff, setLoader } = useContext(AppContext);
  const [editName, setEdiName] = useState<any>({});
  const { taskList, setSelectedTask } = useContext(WorkspaceContext);
  const router = useRouter();
  const [openTask, setOpenTask] = useState(false);
  const { workspace } = router.query;
  const handleEditName = () => {
    setLoader(true);
    const values = {
      value: editName.title,
      workspaceID: workspace,
      id: editName._id,
    };
    ApiController.editNameTask(values).then((data) => {
      console.log(data);
      setLoader(false);
      setEdiName({});
    });
  };
  const handleChangeEdiName = (event: any) => {
    setEdiName({ ...editName, title: event.target.value });
  };
  const handleTask = (task: TaskType) => {
    setSelectedTask(task);
    setOpenTask(true);
  };
  const handleCloseTask = () => {
    setOpenTask(false)
  }
  return (
    <>
      <TaskDetail handleClose={handleCloseTask} open={openTask} />
      {taskList.length > 0
        ? taskList.map(
            (task: TaskType, index: number) =>
              task.list === item._id && (
                <Task
                  onClick={() => handleTask(task)}
                  draggable
                  key={index}
                  onDragStart={(event) =>
                    event.dataTransfer.setData("text/plain", task._id)
                  }
                >
                  {editName._id !== task._id ? (
                    <Grid container>
                      <Grid item xs={8}>
                      {<Title>
                          {task.title.length <= 20
                            ? task.title
                            : task.title.slice(0, 20) + "..."}
                        </Title>}
                        {task.dateEnd && (
                          <DateEnd>
                            {moment(task.dateEnd).format("DD/MM/YYYY")}
                          </DateEnd>
                        )}
                      </Grid>
                      <Grid item xs={4}>
                        <div>
                          {task.assigned.map(
                            (avatar: string, indexa: number) => {
                              const url = staff.filter((itemFilter) =>
                                itemFilter._id.includes(avatar)
                              );

                              return indexa < 2 ? (
                                <Avatar
                                  url={url[0].avatar}
                                  name={url[0].name}
                                  key={indexa}
                                />
                              ) : null;
                            }
                          )}
                        </div>
                      </Grid>
                      <Grid item xs={12}>
                        <ToolBar className="ToolBar">
                          <TaskOptions task={task} setEdit={setEdiName} />
                        </ToolBar>
                      </Grid>
                    </Grid>
                  ) : (
                    <Grid container alignItems={"center"}>
                      <Grid item xs={10}>
                        <InputEdit
                          value={editName.title}
                          onChange={(e) => handleChangeEdiName(e)}
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <Grid container alignItems={"center"}>
                          <Grid item xs={6}>
                            <ClearIcon
                              onClick={() => setEdiName({})}
                              style={{ fontSize: "2vh", cursor: "pointer" }}
                              color={"error"}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <CheckIcon
                              onClick={() => handleEditName()}
                              style={{ fontSize: "2vh", cursor: "pointer" }}
                              color={"primary"}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  )}
                </Task>
              )
          )
        : null}
    </>
  );
};
export default TaskSection;
