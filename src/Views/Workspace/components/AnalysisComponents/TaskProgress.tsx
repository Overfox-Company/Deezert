import React, { useContext } from 'react'
import { Container, Item } from '../../../../components/Container'
import { WorkspaceContext } from '../../../../context/WorkspaceContext'
import styled from '@emotion/styled'
import { PAPER, PAPER_DARK } from '../../../../constants/Color'
import CheckIcon from '../../../../components/icons/CheckIcon'
import ListStaffData from './ListStaffData'
const Card = styled.div({
    backgroundColor: PAPER_DARK,
    borderRadius: 8,
    width: '100%',
    minHeight: 110,
    display: "flex",
    padding: 10,
    paddingTop: 20,
    height: '108%'

})
const TextTask = styled.p({
    fontSize: 35,
    fontWeight: 700,
    fontFamily: 'Roboto, san-serif'
})
const Label = styled.p({
    fontSize: 15,
    fontWeight: 500,
    marginRight: 10
})
const TaskProgress = () => {
    const { taskList, staffAssigned } = useContext(WorkspaceContext)
    const TotalTask = taskList.length
    const TotalDone = taskList.filter((task: any) => task.done).length
    const TotalProgress = (TotalDone / TotalTask) * 100
    return (
        <Container justifyContent={"center"} columnSpacing={2} style={{ position: 'relative' }} >
            <Item xs={6}>
                <Container columnSpacing={2} alignItems='center' justifyContent={"center"} rowSpacing={2}>
                    <Item xs={6}>
                        <Card>
                            <Container rowSpacing={1}>
                                <Item xs={12}>

                                    <Label>
                                        Tareas totales
                                    </Label>
                                </Item>
                                <Item xs={12}>

                                    <TextTask>
                                        {TotalTask}
                                    </TextTask>
                                </Item>
                            </Container>

                        </Card>
                    </Item>
                    <Item xs={6}>
                        <Card>
                            <Container rowSpacing={1}>
                                <Item xs={12} style={{ display: 'flex' }}>

                                    <Label>
                                        Completadas
                                    </Label>
                                    <CheckIcon />
                                </Item>
                                <Item xs={12}>

                                    <TextTask>
                                        {TotalDone}
                                    </TextTask>
                                </Item>
                            </Container>

                        </Card>
                    </Item>
                    <Item xs={12}>
                        <Card>
                            <Container rowSpacing={1}>
                                <Item xs={12} style={{ display: 'flex' }}>

                                    <Label>
                                        Progreso del proyecto
                                    </Label>
                                </Item>
                                <Item xs={12}>

                                    <TextTask>
                                        {TotalProgress.toFixed(2)}%
                                    </TextTask>
                                </Item>
                            </Container>

                        </Card>
                    </Item>
                </Container>
            </Item>
            <Item xs={6} >
                <Container style={{ height: '100%' }} columnSpacing={2} alignItems='center' justifyContent={"center"} rowSpacing={2}>
                    <Item xs={12} style={{ height: '100%' }}>
                        <Card>
                            <Container rowSpacing={1}>
                                <Item xs={12}>

                                    <Label>
                                        Usuarios Asignados
                                    </Label>
                                </Item>
                                <Item xs={12}>

                                    <ListStaffData />
                                </Item>
                            </Container>

                        </Card>

                    </Item>

                </Container>
            </Item>
        </Container>

    )
}
export default TaskProgress