import React, { useState } from "react";
import { AppContext } from "../../context/AppContext";
import styled from "@emotion/styled";
import AddIcon from "@mui/icons-material/Add";
import { PRIMARY_COLOR } from "../../constants/Color";
import { Button } from "@mui/material";
import AddCompany from "./AddCompany";
const Avatar = styled.img({
  width: "100%",
});
const ContainerAvatar = styled(Button)({
  position: "relative",
  minWidth: "2.5vw",
  minHeight: "2.5vw",
  maxWidth: "10vw",
  maxHeight: "10vw",
  margin: "0vw 1vw",
  border: "solid 1px rgba(0,0,0,0)",
  backgroundColor: "rgba(10,10,10,0.1)",
  borderRadius: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
const ContainerIcon = styled.div({
  position: "relative",
  minWidth: "2vw",
  minHeight: "2vw",
  margin: "0vw 1vw",
  backgroundColor: PRIMARY_COLOR,
  borderRadius: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: 'pointer'
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
const ContainerV = styled.div({
  maxWidth: "100%",
  overflowX: "hidden",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  padding: "1vw 1vw",
  height: "80vh",
  width: "100%",
});
const Companys = ({ v = "H" }: any) => {
  const { companys, setSelectedCompany, selectedCompany } =
    React.useContext(AppContext);
  const [open, setOpen] = useState(false)
  const handleClick = (data: any) => {
    setSelectedCompany(data);
    // console.log(selectedCompany)
  };
  React.useEffect(() => {
    if (companys.length > 0) {
      setSelectedCompany(companys[0]);
    }
  }, [companys]);
  return (
    <>
      <AddCompany open={open} setOpen={setOpen} />
      {v === "H" ? (
        <Container>
          {companys.length > 0 &&
            companys.map((Company, index) => {
              return (
                <ContainerAvatar
                  style={{
                    border: `solid 1px ${selectedCompany?._id === Company._id ? PRIMARY_COLOR : "rgba(0,0,0,0)"
                      }`,
                  }}
                  key={index}
                  onClick={() => handleClick(Company)}
                >
                  <Avatar src={Company.avatar} alt={Company.name} />
                </ContainerAvatar>
              );
            })}
          <ContainerIcon onClick={() => setOpen(true)}>
            <AddIcon style={{ fontSize: 30 }} />
          </ContainerIcon>
        </Container>
      ) : (
        <ContainerV>
          {companys.length > 0 &&
            companys.map((Company, index) => {
              return (
                <>
                  <ContainerAvatar
                    style={{
                      border: `solid 1px ${selectedCompany?._id === Company._id ? PRIMARY_COLOR : "rgba(0,0,0,0)"
                        }`,
                    }}
                    key={index}
                    onClick={() => handleClick(Company)}
                  >
                    <Avatar src={Company.avatar} alt={Company.name} />
                  </ContainerAvatar>
                  <br />
                </>
              );
            })}
          <ContainerIcon onClick={() => setOpen(true)}>
            <AddIcon style={{ fontSize: 30 }} />
          </ContainerIcon>
          <br />
        </ContainerV>
      )}
    </>
  );
};
export default Companys;
