import React, { useContext, FC } from 'react';
import { AppContext } from '../../../context/AppContext';
import styled from '@emotion/styled'
import { Item } from '../../Container';
const light = "../../../static/images/logoDark.png";
const dark = "../../../static/images/logoLight.png";
const Logo = styled.img({
    width: "10vw",
});
const RenderLogo: FC<{ version?: number | unknown }> = ({ version }) => {
    const { darkMode } = useContext(AppContext);
    return (
        < Item xs={version === 3 ? 5 : 2} md={2} style={{ display: 'flex', justifyContent: 'center' }}>
            <Logo src={darkMode ? dark : light} />
        </Item>
    );
};
export default RenderLogo;