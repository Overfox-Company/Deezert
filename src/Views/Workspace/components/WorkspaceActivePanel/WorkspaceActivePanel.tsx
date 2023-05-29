import React from 'react';
import NavBarWorkspaceActive from './components/NavBarWorkspaceActive';
import { Grid } from '@mui/material';
const WorkspaceActivePanel = () => {
    return (
        <>
            <Grid container>
                <Grid item xs={12}>
<NavBarWorkspaceActive/>
                </Grid>
            </Grid>
        </>
    )
}
export default WorkspaceActivePanel;