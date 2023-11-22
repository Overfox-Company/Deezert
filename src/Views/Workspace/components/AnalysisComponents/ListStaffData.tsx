import React, { useEffect, useState } from 'react';
import { Container, Item } from '../../../../components/Container';
import { WorkspaceContext } from '../../../../context/WorkspaceContext';
import { useContext } from 'react';
import { AppContext } from '../../../../context/AppContext';
import Avatar from '../../../../components/Avatar';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { TaskType } from '../../../../types/Proyects';
import CheckIcon from '../../../../components/icons/CheckIcon';

const Name = styled.p({
    fontSize: 10,
    whiteSpace: "nowrap",/* Evita que el texto se divida en varias líneas */
    overflow: " hidden;", /* Oculta el texto que se desborda del contenedor */
    textOverflow: "ellipsis;",
    maxWidth: 100
})
const Card = styled.div({
    backgroundColor: "rgba(40,48,60,0.8)",
    borderRadius: 4,
    width: '100%',
    display: "flex",
    alignItems: 'center',
    padding: 10,

})
const Text = styled.p({
    fontSize: 10,
    marginBottom: 4,
    marginRight: 4
})
const ListStaffData = () => {
    const { staffAssigned, taskList } = useContext(WorkspaceContext)
    const [userTasks, setUserTask] = useState([]);
    const [userTasksDone, setUserTaskDone] = useState([]);
    const router = useRouter()
    const { workspace: id } = router.query
    const { user } = useContext(AppContext)
    useEffect(() => {

        const filterByWorkspace = taskList.filter((e: any) => e.workspaceID == id)
        setUserTask(
            filterByWorkspace
        );
        setUserTaskDone(
            filterByWorkspace.filter((e: any) => e.done)
        )
    }, [user]);
    return (
        <div style={{ height: 180, overflow: 'auto' }}>
            <Container rowSpacing={1} >

                {staffAssigned.map((staff: any) => (
                    <Item xs={12} key={staff._id}>
                        <Card>
                            <Container alignItems='center' justifyContent={"space-between"}>
                                <Item xs={2}>

                                    <Avatar url={staff.avatar} name={staff.name} />
                                </Item>
                                <Item xs={3}>
                                    <Name>
                                        {staff.name}
                                    </Name>
                                </Item>
                                <Item xs={2}>
                                    <Text>
                                        Pendientes:
                                    </Text>

                                    <Text>
                                        {userTasksDone.filter((task: TaskType) => {
                                            return task.assigned.includes(staff._id);
                                        }).length}

                                    </Text>
                                </Item>
                                <Item xs={2}>
                                    <Text>
                                        Finalizadas:
                                    </Text>
                                    <Text>
                                        {userTasksDone.filter((task: TaskType) => {
                                            return task.assigned.includes(staff._id);
                                        }).length}
                                    </Text>

                                </Item>
                            </Container>
                        </Card>

                    </Item>
                ))}

            </Container>
        </div>

    )
}
export default ListStaffData;