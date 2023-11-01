import React, { useContext, FC } from 'react';
import { AppContext } from '../../../context/AppContext';
import styled from '@emotion/styled'
import Avatar from '@mui/material/Avatar';
import { Item } from '../../Container';
const ContainerAvatar = styled.div({
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
});
const RenderUserAvatar: FC<{ version?: number | unknown }> = ({ version }) => {
    const { user } = useContext(AppContext);
    if (version !== 1) {
        return (
            <Item xs={7} md={4}>
                <ContainerAvatar>
                    <Avatar src={user.avatar} />
                </ContainerAvatar>
            </Item>
        );
    }
    return null;
};
export default RenderUserAvatar;