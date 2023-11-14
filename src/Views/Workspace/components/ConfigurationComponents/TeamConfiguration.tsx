import React, { useContext, useState } from 'react';
import { Container, Item } from '../../../../components/Container';
import SelectUser from '../../../../components/Select';
import { AppContext } from '../../../../context/AppContext';
import { useRouter } from 'next/router';
import ApiController from '../../../../connection/ApiController';
import { WorkspaceContext } from '../../../../context/WorkspaceContext';
import styled from '@emotion/styled';
import TeamList from './TeamList';
import { P } from '../../../../components/BasicComponents';
import CircularProgress from '@mui/material/CircularProgress';
import { PAPER_DARK } from '../../../../constants/Color';
const ListAsignedUsers = styled.div({
    height: '50vh',
    overflow: 'auto',
    position: 'relative',
})

const ContainerLoader = styled.div({
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: PAPER_DARK,
    borderRadius: 8

})
const TeamConfiguration = () => {
    const router = useRouter()
    const { workspace: WorkspaceID } = router.query;
    const { setProyectWorkspaces, staff, } = useContext(AppContext)
    const [loadMembers, setLoadMembers] = useState(false)
    const [loadClients, setLoadClients] = useState(false)
    const { staffUnassigned, staffAssigned, clientsAssigned, clientsUnassigned } = useContext(WorkspaceContext)
    const handleSaveStaff = async (value: string) => {
        setLoadMembers(true)
        const data = {
            id: WorkspaceID,
            member: value
        }
        const result = await ApiController.addMemberToWorkspace(data)
        console.log(result)
        setProyectWorkspaces(result.data)
        setLoadMembers(false)
    }
    const handleSaveClients = async (value: string) => {
        setLoadClients(true)
        const data = {
            id: WorkspaceID,
            client: value
        }
        console.log(data)
        const result = await ApiController.addClientToWorkspace(data)
        console.log(result)
        setProyectWorkspaces(result.data)
        setLoadClients(false)
    }
    const handleDeleteMember = async (value: string) => {
        setLoadMembers(true)
        const data = {
            id: WorkspaceID,
            member: value
        }
        console.log(data)
        const result = await ApiController.deleteMemberToWorkspace(data)
        console.log(result)
        setProyectWorkspaces(result.data)
        setLoadMembers(false)
    }
    const handleDeleteClients = async (value: string) => {
        setLoadClients(true)
        const data = {
            id: WorkspaceID,
            client: value
        }
        console.log(data)
        const result = await ApiController.deleteClientToWorkspace(data)
        console.log(result)
        setProyectWorkspaces(result.data)
        setLoadClients(false)
    }

    return (
        <Container justifyContent={"space-between"} columnSpacing={2}>
            <Item xs={6}>
                <br />
                <P style={{ textAlign: 'left' }}>
                    Personal
                </P>
                <Container rowSpacing={2}>
                    <Item xs={12}>
                        <ListAsignedUsers >
                            {staffAssigned.map((user, index) => (
                                <TeamList key={user._id} data={user} onClick={handleDeleteMember} />
                            ))}
                            {loadMembers ? < ContainerLoader>
                                <CircularProgress />
                            </ ContainerLoader> : null}
                        </ListAsignedUsers>
                    </Item>

                    <Item xs={12}>
                        <SelectUser data={staffUnassigned} onClick={handleSaveStaff} />
                    </Item>
                </Container>
            </Item>
            <Item xs={6}>
                <br />
                <P style={{ textAlign: 'left' }}>
                    Supervisores
                </P>
                <Container rowSpacing={2}>
                    <Item xs={12}>
                        <ListAsignedUsers >
                            {clientsAssigned.map((user, index) => (
                                <TeamList key={user._id} data={user} onClick={handleDeleteClients} />
                            ))}
                            {loadClients ? < ContainerLoader>
                                <CircularProgress />
                            </ ContainerLoader> : null}
                        </ListAsignedUsers>
                    </Item>
                    <Item xs={12}>
                        <SelectUser data={clientsUnassigned} onClick={handleSaveClients} />
                    </Item>
                </Container>
            </Item>
        </Container>
    )
}
export default TeamConfiguration