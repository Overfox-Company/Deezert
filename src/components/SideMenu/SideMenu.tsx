import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { MenuMobile } from './Menu';
import { AppContext } from '../../context/AppContext';
import { CONTAINER, CONTAINER_DARK } from '../../constants/Color';
type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function SideMenu() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const { darkMode } = React.useContext(AppContext)
  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }

        setState({ ...state, [anchor]: open });
      };
  return (
    <div>
      {(['left'] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton onClick={toggleDrawer(anchor, true)}>
            <MenuIcon style={{ color: darkMode ? CONTAINER : CONTAINER_DARK }} />
          </IconButton>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <MenuMobile close={toggleDrawer} />
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}