import React from "react";
import { AppContext } from "../../context/AppContext";
import styled from "@emotion/styled";
import AddIcon from "@mui/icons-material/Add";
import { PRIMARY_COLOR } from "../../constants/Color";
import { Button }from '@mui/material'
const Avatar = styled.img({
  width: "100%",
});
const ContainerAvatar = styled(Button)({
  position: "relative",
  minWidth: "10vw",
  minHeight: "10vw",
  maxWidth: "10vw",
  maxHeight: "10vw",
  margin: "0vw 1vw",
  border:'solid 1px rgba(0,0,0,0)',
  backgroundColor: "rgba(10,10,10,0.1)",
  borderRadius: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
const ContainerIcon = styled.div({
  position: "relative",
  minWidth: "10vw",
  minHeight: "10vw",
  margin: "0vw 1vw",
  backgroundColor: PRIMARY_COLOR,
  borderRadius: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
const Container = styled.div({
  maxWidth: "100%",
  overflowX: "auto",
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "center",
  padding: "1vw 1vw",
  height: "20vw",
  width: "100%",
});

const Companys = () => {
  const { companys, setSelectedCompany,selectedCompany } = React.useContext(AppContext);
  const handleClick = (data:any) => {
  setSelectedCompany(data)
  }
  React.useEffect(() => {
    setSelectedCompany(companys[0])
  },[companys])
  return (
    <Container>
      {companys?.map((Company, index) => {
        return (
          <ContainerAvatar style={{border:`solid 1px ${selectedCompany._id ===Company._id&&PRIMARY_COLOR}`}} key={index} onClick={()=>handleClick(Company)}>
            <Avatar src={Company.avatar} alt={Company.name} />
          </ContainerAvatar>
        );
      })}
      <ContainerIcon>
        <AddIcon style={{ fontSize: 30 }} />
      </ContainerIcon>
    </Container>
  );
};
export default Companys;
