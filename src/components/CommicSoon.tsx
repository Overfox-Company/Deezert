import React from "react";
import { Grid } from "@mui/material";
import styled from "@emotion/styled";
const Text = styled.p({
  color: "rgb(170,170,170)",
  fontFamily: "comfortaa",
  fontSize: "2vh",
  textAlign: "center",
});

const CommicSoon = () => {
  return (
    <>
      <Grid container alignItems={"center"} style={{ height: "70vh" }}>
        <Grid item xs={12}>
          <Text>Proximamente</Text>
        </Grid>
      </Grid>
    </>
  );
};
export default CommicSoon;
