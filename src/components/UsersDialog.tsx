import React, { useContext, useState } from "react";
import { Grid } from "@mui/material";
import styled from "@emotion/styled";
import { AppContext } from "../context/AppContext";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import SearchIcon from "@mui/icons-material/Search";
import { PRIMARY_COLOR } from "../constants/Color";
import type { userType } from "../types/global";
import Avatar from "./Avatar";
import { WorkspaceContext } from "../context/WorkspaceContext";
const InputSearch = styled.input({
  width: "100%",
  outline: "none",
  border: 0,
  backgroundColor: "rgb(100,100,150,0)",

  padding: "1vw",
});
const ContainerInput = styled.div({
  display: "flex",
  alignItems: "center",
  borderBottom: "solid 1px rgb(255,255,255)",
});
const ListUsers = styled.div({
  maxHeight: "50vh",
  overflow: "auto",
  marginTop: "2vw",
});

const Name = styled.p({
  color: "white",
  fontFamily: "Comfortaa, cursive",
  fontSize: 12,
});
const ContainerUser = styled.div({
  borderRadius: 5,
  backgroundColor: "rgb(20,20,20,0)",
  transition: "all 0.3s ease",
  padding: "0.5vw",
  cursor: "pointer",
  margin: "0.5vw 0",
  "&:hover": {
    backgroundColor: "rgb(10,10,30,0.2)",
  },
});
const UsersDialog = ({
  open,
  handleClose,
  selectedUser,
  setSelectedUser,
}: any) => {
  const { staff } = useContext(AppContext);
  const { staffAssigned } = useContext(WorkspaceContext)
  const [searchUser, setSearchUser] = useState("");
  const handleUserClick = (item: any) => {
    if (selectedUser.some((user: any) => user._id === item._id)) {
      setSelectedUser(
        selectedUser.filter((user: any) => user._id !== item._id)
      );
    } else {
      setSelectedUser([...selectedUser, item]);
    }
  };
  const handleSearchUser = (event: any) => {
    setSearchUser(event.target.value);
  };
  return (
    <>
      <Dialog onClose={handleClose} open={open}>
        <Grid container justifyContent={"center"} style={{ width: "23vw" }}>
          <Grid item xs={10}>
            <br />
            <ContainerInput>
              <InputSearch
                placeholder="Buscar usuario"
                onChange={handleSearchUser}
                value={searchUser}
              />
              <SearchIcon />
            </ContainerInput>
          </Grid>
          <Grid item xs={10}>
            <ListUsers>
              {staffAssigned ? staffAssigned
                .filter((item) =>
                  item.name.toLowerCase().includes(searchUser.toLowerCase())
                )
                .map((item, index) => (
                  <ContainerUser
                    key={index}
                    onClick={() => handleUserClick(item)}
                  >
                    <Grid
                      container
                      justifyContent={"space-around"}
                      alignItems={"center"}
                    >
                      <Grid item xs={2}>
                        <Avatar
                          url={item.avatar}
                          name={item.name}
                          style={{
                            border: selectedUser ? `solid 2px ${selectedUser.some(
                              (user: any) => user._id === item._id
                            )
                              ? PRIMARY_COLOR
                              : "transparent"
                              }` : null,
                          }}
                        />
                      </Grid>
                      <Grid item xs={10}>
                        <Name>
                          {" "}
                          {item.name.length <= 25
                            ? item.name
                            : item.name.slice(0, 25) + "..."}
                        </Name>
                      </Grid>
                    </Grid>
                  </ContainerUser>
                )) : null}
            </ListUsers>
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
};
export default UsersDialog;
