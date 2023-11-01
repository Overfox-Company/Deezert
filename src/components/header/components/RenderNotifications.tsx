import React, { useContext, FC } from 'react';
import { AppContext } from '../../../context/AppContext';
import { Badge } from '@material-ui/core';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { PAPER, PAPER_DARK } from '../../../constants/Color';
import { Item } from '../../Container';
const RenderNotifications: FC<{ version?: number | unknown }> = ({ version }) => {
    const { darkMode, user } = useContext(AppContext);
    if (version === 3) {

        return (
            <Item xs={5} md={4}>
                <Badge color="primary" variant="dot">
                    <NotificationsIcon style={{ color: darkMode ? PAPER : PAPER_DARK }} />
                </Badge>
            </Item>
        );
    }
    return null;
};
export default RenderNotifications;