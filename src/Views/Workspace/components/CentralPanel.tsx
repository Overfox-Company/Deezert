import React, {useContext} from 'react';
import InitPanel from './InitPanel';
import { WorkspaceContext } from '../../../context/WorkspaceContext';
import WorkspaceActivePanel from './WorkspaceActivePanel/WorkspaceActivePanel';
import NavBarWorkspaceActive from './WorkspaceActivePanel/components/NavBarWorkspaceActive';
type Prop = {
    panel:number
}
const CentralPanel = ({ panel }: Prop) => {
    const {workspaceActive}=useContext(WorkspaceContext)
    return (
        <>
            <NavBarWorkspaceActive />
            {workspaceActive.length < 1 ?
        <>    {panel===0 &&<InitPanel/>}</>
        :<WorkspaceActivePanel/>}
        </>
    )
}
export default CentralPanel;