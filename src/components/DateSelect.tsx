import React, { useState, useRef, useEffect, useContext } from "react";
import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import Popover from "@mui/material/Popover";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import dayjs, { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { WorkspaceContext } from "../context/WorkspaceContext";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
type TypeComponent = {
  value: any;
  onChange: any;
  handleSave?: any;
};
const DateText = styled.p({
  fontSize: "0.9vw",
  fontFamily: "comfortaa",
  color: "rgb(250,250,250)",
});
const AddDateIcon = styled(CalendarTodayIcon)({
  padding: "0.4vw",
  fontSize: "2.6vw",
  border: "dotted 2px white",
  borderRadius: "20vw",
  cursor: "pointer",
});
const DateIcon = styled(CalendarMonthIcon)({
  fontSize: "1.3vw",
});
const ContainerDate = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  cursor: "pointer",
});
const DateSelect = ({ value, onChange, handleSave }: TypeComponent) => {
  const [anchorEl, setAnchorEl] = useState<boolean>(false);
  const { selectedTask } = useContext(WorkspaceContext);
  const handleClose = () => {
    setAnchorEl(false);
  };
  const handleClick = () => {
    setAnchorEl(true);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const Element = useRef(null);
  const [first, setFirst] = useState(true);
  useEffect(() => {
    setFirst(false);
    if (!anchorEl && !first) {
      handleSave();
    }
  }, [anchorEl]);
  return (
    <div>
      <ContainerDate>
        <Grid container ref={Element}>
          {value && (
            <Grid item xs={12}>
              <ContainerDate onClick={() => handleClick()}>
                <Grid container justifyContent={'space-around'} alignItems={"center"}>
                  <Grid item xs={10}>
                    <DateText>{dayjs(value).format("YYYY/MM/DD")}</DateText>
                  </Grid>
                  <Grid item xs={2}>
                    <DateIcon />
                  </Grid>
                </Grid>
              </ContainerDate>
            </Grid>
          )}
          {!value && (
            <Grid item xs={12}>
              <AddDateIcon onClick={() => handleClick()} />
            </Grid>
          )}
        </Grid>
      </ContainerDate>

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
          horizontal: "center",
        }}
      >
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <StaticDatePicker
            displayStaticWrapperAs="desktop"
            value={value}
            onChange={(event) => {
              onChange(event);
              handleClose();
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Popover>
    </div>
  );
};
export default DateSelect;
