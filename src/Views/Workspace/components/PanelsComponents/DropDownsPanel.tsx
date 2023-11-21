import * as React from "react";
import { useEffect, useState, useContext } from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import moment from "moment";
import styledE from "@emotion/styled";
import { Grid, Divider } from "@mui/material";
import { WorkspaceContext } from "../../../../context/WorkspaceContext";
import { TaskType } from "../../../../types/Proyects";
import { AppContext } from "../../../../context/AppContext";
import TaskListView from "./TaskListView";
import useSocket from "../../../../hooks/useWebSocket";
import { useRouter } from "next/router";
import ApiController from "../../../../connection/ApiController";
import TaskDetail from "../WorkspaceActivePanel/components/TaskDetail";
const Categories = [
  "Hoy",
  "Siguiente",
  "Atrasadas",
  "No programadas",
  "Finalizadas",
];
const Container = styledE.div({});
const Title = styledE.p({
  fontSize: "1vw",
  margin: 0,
  fontWeight: 400,
  textAlign: "left",
});
const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  backgroundColor: "rgba(0,0,0,0)",
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={
      <ArrowForwardIosSharpIcon sx={{ color: "white", fontSize: "0.9rem" }} />
    }
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
}));
const initialData: TaskType = {
  _id: "",
  title: "",
  description: "",
  files: "",
  CreatedDate: "",
  dateEnd: "",
  workspaceID: "",
  assigned: "",
  timeWorked: "",
  priority: "",
  list: "",
  done: false
};
const NoTaskMessage = styledE.p({
  color: "rgb(250,250,250)",
  fontFamily: "Comfortaa, cursive",
  fontSize: "1.8vh",
  textAlign: 'center'
})
const DropDownPanels = () => {
  const [todayTask, setTodayTask] = useState([]);
  const [tomorrowTask, setTomorrowTask] = useState([]);
  const [overdueTasks, setOverdueTask] = useState([]);
  const [noDateTask, setNoDateTask] = useState<any>([initialData]);
  const [doneTask, setDoneTask] = useState([])
  const { taskList } = useContext(WorkspaceContext);

  const {
    setTaskList,
    setSelectedTask,
  } = useContext(WorkspaceContext);
  const { setLoader, loader, user, } =
    useContext(AppContext);
  const [openTask, setOpenTask] = useState(false);
  const router = useRouter();
  const { workspace: id } = router.query;
  useEffect(() => {
    const currentTasks = taskList.filter((e: any) => e.workspaceID === id)
    const currentDate = moment().startOf("day");
    const userTasks = currentTasks.filter((task: TaskType) => {
      return task.assigned.includes(user._id);
    });
    const filteredTasks = userTasks.filter((task: TaskType) => {
      const taskDate = moment(task.dateEnd, "YYYY-MM-DD"); // Suponiendo que el formato de la fecha sea 'YYYY-MM-DD'

      if (taskDate.isSame(currentDate, "day")) {
        return true;
      } else if (taskDate.isSame(currentDate.clone().add(1, "day"), "day")) {
        return true;
      } else if (taskDate.isBefore(currentDate)) {
        return true;
      } else if (!task.dateEnd) {
        return true;
      }

      return false;
    });

    const todayTasks = filteredTasks.filter((task: TaskType) => {
      if (!task.done) {
        const taskDate = moment(task.dateEnd, "YYYY-MM-DD");
        return taskDate.isSame(currentDate, "day");
      }

    });
    setTodayTask(todayTasks);

    const tomorrowTasks = filteredTasks.filter((task: TaskType) => {
      if (!task.done) {

        const taskDate = moment(task.dateEnd, "YYYY-MM-DD");
        return taskDate.isSame(currentDate.clone().add(1, "day"), "day");
      }
    });
    setTomorrowTask(tomorrowTasks);

    const overdueTasks = filteredTasks.filter((task: TaskType) => {
      if (!task.done) {

        const taskDate = moment(task.dateEnd, "YYYY-MM-DD");
        return taskDate.isBefore(currentDate);
      }
    });
    setOverdueTask(overdueTasks);

    const noDateTasks = filteredTasks.filter((task: TaskType) => !task.dateEnd);
    setNoDateTask(noDateTasks);
    const DoneTask = filteredTasks.filter((task: TaskType) => task.done);
    setDoneTask(DoneTask)
  }, [taskList, user]);
  useEffect(() => {
    if (loader) {
      const timeout = setTimeout(() => {
        setLoader(false);
      }, 10000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [loader]);

  useSocket({
    channel: "task",
    setSocketData: setTaskList,
    server: "workspace",
    id: id
  });
  useSocket({
    channel: "taskSelected",
    setSocketData: setSelectedTask,
    server: "workspace",
    id: id
  });
  const handleTask = (task: TaskType) => {
    setSelectedTask(task);
    setOpenTask(true);
  };
  const handleCloseTask = () => {
    setOpenTask(false);
  };
  return (
    <>
      <TaskDetail handleClose={handleCloseTask} open={openTask} />
      <Grid container justifyContent={"center"}>
        <Grid item xs={11}>
          <Container>
            <div
              style={{
                maxHeight: "95vh",
                overflow: "auto",
                paddingRight: "2vh",
              }}
            >
              {Categories.map((item, index) => (
                <div
                  key={index}
                  style={{
                    borderRadius: 8,
                    backgroundColor: "rgba(10,0,20,0.3)",
                    marginTop: "1vw",
                  }}
                >
                  <Accordion>
                    <AccordionSummary
                      style={{ backgroundColor: "rgba(0,0,0,0)" }}
                      aria-controls="panel1d-content"
                      id="panel1d-header"
                    >
                      <Title>{item}</Title>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div
                        style={{
                          maxHeight: "30vh",
                          overflow: "auto",
                          borderRadius: 5,
                          backgroundColor: "rgba(10,0,20,0.2)",
                          padding: "2vh 1vh",
                        }}
                      >
                        {item === "Hoy" ? (
                          todayTask.length > 0 ? (
                            todayTask.map((data, index) => (
                              <div key={index} onClick={() => handleTask(data)}>
                                <TaskListView data={data} />
                              </div>
                            ))
                          ) : (
                            < NoTaskMessage>No tienes tareas por entregar hoy</ NoTaskMessage>
                          )
                        ) : null}

                        {item === "Siguiente" ? (
                          tomorrowTask.length > 0 ? (
                            tomorrowTask.map((data, index) => (
                              <div key={index} onClick={() => handleTask(data)}>
                                <TaskListView data={data} />
                              </div>
                            ))
                          ) : (
                            < NoTaskMessage>No tienes tareas pendientes</ NoTaskMessage>
                          )
                        ) : null}
                        {item === "Atrasadas" ? (
                          overdueTasks.length > 0 ? (
                            overdueTasks.map((data, index) => (
                              <div key={index} onClick={() => handleTask(data)}>
                                <TaskListView data={data} />
                              </div>
                            ))
                          ) : (
                            < NoTaskMessage>No tienes tareas atrasadas</ NoTaskMessage>
                          )
                        ) : null}
                        {item === "No programadas" ? (
                          noDateTask.length > 0 ? (
                            noDateTask.map((data: TaskType, index: number) => (
                              <div key={index} onClick={() => handleTask(data)}>
                                <TaskListView data={data} />
                              </div>
                            ))
                          ) : (
                            < NoTaskMessage>No tienes tareas por realizar</ NoTaskMessage>
                          )
                        ) : null}
                        {item === "Finalizadas" ? (
                          doneTask.length > 0 ? (
                            doneTask.map((data, index) => (
                              <div key={index} onClick={() => handleTask(data)}>
                                <TaskListView data={data} />
                              </div>
                            ))
                          ) : (
                            < NoTaskMessage>Aun no tienes ninguna tarea finalizada</ NoTaskMessage>
                          )
                        ) : null}
                      </div>
                    </AccordionDetails>
                  </Accordion>
                </div>
              ))}
            </div>
          </Container>
        </Grid>
      </Grid>
    </>
  );
};
export default DropDownPanels;
