import React, { useContext, useState } from "react";
import { AppContext } from "../../../../../context/AppContext";
import { WorkspaceContext } from "../../../../../context/WorkspaceContext";
import styled from "@emotion/styled";
import Avatar from "../../../../../components/Avatar";
import { Grid, Tooltip } from "@mui/material";
import moment from "moment";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import TaskOptions from "../../../../../components/TaskOptions";
const Task = styled.div({
  boxShadow: "0 1px 2px 0 rgba(10,10,10,0.5)",
  marginTop: "1vw",
  borderRadius: "5px",
  minHeight: "10vh",
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
  const { staff } = useContext(AppContext);
  const { taskList } = useContext(WorkspaceContext);
  const [open, setOpen] = React.useState(false);
  const [opacity, setOpacity] = useState(0);
  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      {taskList.length>0? taskList.map(
        (task: any, index: number) =>
          task.list === item._id && (
            <Task   draggable key={index}  onDragStart={(event) => event.dataTransfer.setData("text/plain", task._id)}>
              <Grid container>
                <Grid item xs={8}>
                  <Title>
                    {task.title.length <= 20
                      ? task.title
                      : task.title.slice(0, 20) + "..."}
                  </Title>
                  <DateEnd>{moment(task.dateEnd).format("DD/MM/YYYY")}</DateEnd>
                </Grid>
                <Grid item xs={4}>
                  <div>
                    {task.assigned.map((avatar: string, indexa: number) => {
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
                    })}
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <ToolBar
                    className="ToolBar"
                    style={{ opacity: opacity ? opacity : "auto" }}
                  >
                    <TaskOptions />
                  </ToolBar>
                </Grid>
              </Grid>
            </Task>
          )
      ):null}
    </>
  );
};
export default TaskSection;
