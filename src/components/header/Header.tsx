import React from "react";
import { AppContext } from "../../context/AppContext";
import styled from "@emotion/styled";
import { CONTAINER_DARK, CONTAINER } from "../../constants/Color";
import RenderLogo from "./components/RenderLogo";
import RenderSideMenu from "./components/RenderSideMenu";
import RenderSearch from "./components/RenderSearch";
import RenderNotifications from "./components/RenderNotifications";
import RenderUserAvatar from "./components/RenderAvatar";
import { Item, Container } from '../Container';
const ContainerHeader = styled.div({
  display: 'flex',
  alignItems: 'center',
  padding: 15,
  width: "100%",
  position: "relative",
  top: 0,
  zIndex: 99,
});
type Props = {
  version?: number | unknown;
};
const Header = ({ version = 1 }: Props) => {
  const { darkMode } = React.useContext(AppContext);
  return (
    <ContainerHeader style={{ backgroundColor: darkMode ? CONTAINER_DARK : CONTAINER }}>
      <Container justifyContent="space-between" alignItems="center">
        {version === 3 ? <RenderSideMenu /> : <RenderLogo version={version} />}
        {version === 3 && <RenderLogo version={version} />}
        {version === 3 && <RenderSearch />}
        <Item xs={3}>
          <Container alignItems="center" justifyContent="space-between">
            {version === 3 && <Item md={3} sx={{ display: { xs: "none", md: "flex" } }}>{/* <Switch /> */}</Item>}
            {<RenderNotifications version={version} />}
            {<RenderUserAvatar version={version} />}
          </Container >
        </Item>
      </Container >
    </ContainerHeader>
  );
};
export default Header;
