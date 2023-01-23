import React from "react";
import { Paper, Grid } from "@mui/material";
import { P } from "../../components/BasicComponents";
import GoogleLoginButton from "../../hooks/google/Google";
import styled from "@emotion/styled";
const Container = styled(Paper)({
  minHeight: '12vw',
  alignItems: 'center',
  display:'flex'
})
const Login = () => (
  <Grid style={{minHeight: '80vh'}} container justifyContent={"center"} alignItems={'center'}>
    <Grid item xs={11} md={5}>
      <Container>
        <Grid container justifyContent={"center"}>
          <Grid item xs={12}>
            <P>
              Accede Mediante
          </P>
          </Grid>
          <Grid item xs={2} md={1}>
            <GoogleLoginButton />
          </Grid>
        </Grid>
      </Container>
    </Grid>
  </Grid>
);
export default Login;
