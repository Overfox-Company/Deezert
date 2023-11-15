import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import { PRIMARY_COLOR } from "../constants/Color";
import { WorkspaceContext } from "../context/WorkspaceContext";
import { useContext } from "react";
import moment from "moment";
import { MomentTimezone } from "moment-timezone";
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
  fontFamily: "Comfortaa, cursive",
  fontSize: "2vh",
  letterSpacing: "0.1vh",
});
const TimeWorked = () => {
  const { selectedTask } = useContext(WorkspaceContext);
  const { user } = useContext(AppContext);

  const router = useRouter();
  const { workspace } = router.query;
  const handlePlay = async () => {
    const values = {
      workspaceID: workspace,
      user: user._id,
      id: selectedTask._id,

    };
    const result = await ApiController.playTask(values);
    console.log(result);

  };
  const handleStop = () => {
    const values = {
      workspaceID: workspace,
      user: user._id,
      id: selectedTask._id,

    };
    ApiController.stopTask(values).then((data) => console.log(data));
  };
  const [currentTime, setCurrentTime] = useState(moment());
  const [starTime, setStartTime] = useState()
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  const fecha = moment(selectedTask.lastWork).format();
  const diferencia = moment().diff(moment(fecha).format());

  // Formatear la diferencia en términos de días, horas, minutos y segundos
  const duracion = moment.duration(diferencia);


  const totalTime = selectedTask.timeWorked;
  const formatoPersonalizado = `${duracion.hours().toString().padStart(2, '0')}:${duracion.minutes().toString().padStart(2, '0')}:${duracion.seconds().toString().padStart(2, '0')}`;
  const timeElapsed = formatoPersonalizado

  return (
    <>
      <FlexContainer>
        <Divider />
        <Grid container alignItems={"center"}>
          <Grid item xs={4}>
            {!selectedTask.isWorking ? (
              <PlayIcon onClick={() => handlePlay()} />
            ) : (
              <StopIcon onClick={() => handleStop()} />
            )}
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
