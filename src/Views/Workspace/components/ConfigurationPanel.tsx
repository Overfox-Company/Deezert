import React, { useState } from 'react';
import { Container, Item } from '../../../components/Container';
import TopMenu from './ConfigurationComponents/TopMenu';
import TeamConfiguration from './ConfigurationComponents/TeamConfiguration';

const ConfigurationWorkspacePanel = () => {
    const [value, setValue] = useState(0)
    return (
        <Container style={{ padding: '1vw 2vw' }}>
            <Item xs={12}>
                <TopMenu value={value} setValue={setValue} />
            </Item>
            <Item xs={12}>
                <TeamConfiguration />
            </Item>
        </Container>
    )
}
export default ConfigurationWorkspacePanel