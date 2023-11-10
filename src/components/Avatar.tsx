import React from "react";
import styled from "@emotion/styled";
import Tooltip from "@mui/material/Tooltip";
import AvatarMaterial from "@mui/material/Avatar";
const AvatarImg = styled(AvatarMaterial)({
  width: 30,
  height: 30,
  borderRadius: 200,
  marginRight: "-1vw",
  border: `solid 2px rgba(50,50,55,1)`,
});
const Avatar = ({ url, name, style }: any) => {
  return (
    <>
      <Tooltip title={name?.length <= 10 ? name : name.slice(0, 10) + "..."}>
        {url ? <AvatarImg src={url} style={style} /> : <AvatarImg style={style} >{name.slice(0, 1)}</AvatarImg>}
      </Tooltip>
    </>
  );
};
export default Avatar;
