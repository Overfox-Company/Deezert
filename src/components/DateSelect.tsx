import React, { useState, useRef, useEffect, useContext } from "react";
import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import Popover from "@mui/material/Popover";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { Container, Item } from "./Container";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
type TypeComponent = {
  value: any;
  onChange: any;
  handleSave?: any;
  addTask?: boolean;
};
const DateText = styled.p({
  fontSize: "0.9vw",
  fontFamily: "Comfortaa, cursive",
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
const DateSelect = ({ value, onChange, handleSave, addTask }: TypeComponent) => {
  const [anchorEl, setAnchorEl] = useState<boolean>(false);
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
    if (!anchorEl && !first && !addTask) {
      handleSave();
    }
  }, [anchorEl]);
  return (
    <div>
      <ContainerDate>
        <Container>
          {value && (
            <Item xs={12} >
              <ContainerDate ref={Element} onClick={() => handleClick()}>
                <Container justifyContent={'space-around'} alignItems={"center"}>
                  <Item xs={10}>
                    <DateText>{dayjs(value).format("YYYY/MM/DD")}</DateText>
                  </Item>
                  <Item xs={2}>
                    <DateIcon />
                  </Item>
                </Container>
              </ContainerDate>
            </Item>
          )}
          {!value && (
            <Item xs={12} >
              <AddDateIcon ref={Element} onClick={() => handleClick()} />
            </Item>
          )}
        </Container>
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
