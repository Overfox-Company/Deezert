import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { Grid } from '@mui/material';
import { WorkspaceContext } from '../../../../../context/WorkspaceContext';
import { AppContext } from '../../../../../context/AppContext';
import Breadcrumbs from '@mui/material/Breadcrumbs';
const light = "../../../../../static/images/logoDark.png";
const dark = "../../../../../static/images/logoLight.png";
const Container = styled.div({
    height: '4vw',
    display: 'flex',
    alignItems: 'center',
    paddingLeft:'2vw',
    width:'100%',
    boxShadow:'0 5px 5px 0 rgba(0,0,0,0.1)'
})
const Logo = styled.img({
  height: "4vh",
  display: "flex",
  alignSelf: "flex-end",
});
const NavBarWorkspaceActive = () => {
    const { workspaces, workspaceActive } = useContext(WorkspaceContext);
    const {darkMode}=useContext(AppContext)
    return (
        <Container>
            <Grid container alignItems={"center"} justifyContent={"space-between"}>
                <Grid item xs={2}>      <Breadcrumbs separator="›" aria-label="breadcrumb">
                    <p>{workspaces.name }</p>
                    <p>{workspaceActive.name }</p>
            </Breadcrumbs></Grid>
                <Grid item xs={2}>             <Logo src={darkMode ? dark : light} /></Grid>
            </Grid>


        </Container>
    )
}
export default NavBarWorkspaceActive;