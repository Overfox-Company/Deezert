import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import { PRIMARY_COLOR } from "../constants/Color";
import { WorkspaceContext } from "../context/WorkspaceContext";
import { useContext } from "react";
import moment from "moment";
import { useRouter } from "next/router";
import { AppContext } from "../context/AppContext";
import ApiController from "../connection/ApiController";

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
const PlayIcon = styled(PlayCircleIcon)({
  color: PRIMARY_COLOR,
  cursor: "pointer",
});
const StopIcon = styled(StopCircleIcon)({
  color: "rgb(255,80,80)",
  cursor: "pointer",
});
const Divider = styled.div({
  width: "0.1vw",
  height: "5.5vh",
  margin: " 0 0.5vw",
  backgroundColor: "rgb(250,250,250)",
});
const Time = styled.p({
  color: "rgb(240,240,240)",
  fontFamily: "comfortaa",
  fontSize: "2vh",
  letterSpacing: "0.1vh",
});
const TimeWorked = () => {
    const { selectedTask } = useContext(WorkspaceContext);
    const { user } = useContext(AppContext);
    
    const router = useRouter()
    const { workspace } = router.query;
  const handlePlay = () => {
    const values={
        workspaceID:workspace,
        user:user._id,
        id:selectedTask._id
    }
    ApiController.playTask(values).then((data)=>console.log(data))
  };
  const handleStop = () => {
    const values={
        workspaceID:workspace,
        user:user._id,
        id:selectedTask._id
    }
     ApiController.stopTask(values).then((data)=>console.log(data))
  };
  const [currentTime, setCurrentTime] = useState(moment());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  const timeElapsed = moment
    .utc(moment().diff(selectedTask.lastWork))
    .format("HH:mm:ss");
  const totalTime = selectedTask.timeWorked;
  return (
    <>
      <FlexContainer>
        <Divider />
        <Grid container alignItems={"center"}>
          <Grid item xs={4}>
            {!selectedTask.isWorking ? <PlayIcon onClick={()=>handlePlay()} /> : <StopIcon onClick={()=>handleStop()} />}
          </Grid>
          <Grid item xs={8}>
            <Time>
              {!selectedTask.isWorking
                ? !selectedTask.timeWorked
                  ? "00:00:00"
                  : totalTime
                : timeElapsed}
            </Time>
          </Grid>
        </Grid>
      </FlexContainer>
    </>
  );
};
export default TimeWorked;
