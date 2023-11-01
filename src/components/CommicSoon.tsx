import React from "react";
import styled from "@emotion/styled";
import { Container, Item } from "./Container";
const Text = styled.p({
  color: "rgb(170,170,170)",
  fontFamily: "Comfortaa, cursive",
  fontSize: "2vh",
  textAlign: "center",
});

const CommicSoon = () => {
  return (
    <>
      <Container alignItems={"center"} style={{ height: "70vh" }}>
        <Item xs={12}>
          <Text>Proximamente</Text>
        </Item >
      </Container>
    </>
  );
};
export default CommicSoon;
