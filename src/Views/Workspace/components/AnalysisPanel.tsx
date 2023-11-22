import React from 'react'
import { Container, Item } from '../../../components/Container'
import TaskProgress from './AnalysisComponents/TaskProgress'

const Analysis = () => {
    return (
        <Container justifyContent={"center"} alignItems='center' style={{ minHeight: '80vh' }}>
            <Item xs={10} >
                <TaskProgress />
            </Item>
        </Container>
    )
}
export default Analysis