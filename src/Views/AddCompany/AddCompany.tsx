import React from "react";
import { AppContext } from "../../context/AppContext";
import Header from "../../components/header/Header";
import { P } from "../../components/BasicComponents";
import Paper from "@mui/material/Paper";
import styled from "@emotion/styled";
import FormAddCompany from "./Form";
import { Grid } from "@mui/material";
const Container = styled(Paper)({
  width: "100%",
});
const AddCompany = () => {
  const { user } = React.useContext(AppContext);
  return (
    <>
      <Header version={2} />
      <Grid container justifyContent={"center"}>
              <Grid item xs={11} md={5}>
          <Container>
            <P>Añadir compañia</P>
            <Grid container justifyContent={"center"}>
              <Grid item xs={10}>
                <FormAddCompany />
              </Grid>
            </Grid>
          </Container>
        </Grid>
      </Grid>
    </>
  );
};
export default AddCompany;
