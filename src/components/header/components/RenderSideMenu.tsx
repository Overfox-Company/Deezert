import React from 'react';
import SideMenu from '../../SideMenu/SideMenu';
import { Item } from '../../Container';
const RenderSideMenu = () => {
    return (
        < Item xs={2} md={1} sx={{ display: { xs: "flex", md: "none" } }}>
            <SideMenu />
        </ Item>
    );
};

export default RenderSideMenu;