import React from "react";
import styled from "@emotion/styled";
import Avatar from "../../../../components/Avatar";
import { Container, Item } from "../../../../components/Container";
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from "@mui/material/IconButton";
const Text = styled.p({
    color: "rgb(250,250,250)",
    fontFamily: "Comfortaa, cursive",
    fontSize: "1.8vh",
    overflow: "hidden", /* Oculta el texto que se desborda del contenedor */
    whiteSpace: "nowrap", /* Evita que el texto se divida en múltiples líneas */
    textOverflow: "ellipsis", /* Reemplaza el texto que se desborda con puntos suspensivos */

});
const Icon = styled(ClearIcon)({
    color: 'rgba(255,255,255,0.5)',
    transition: 'all 0.2s ease-out',
    '&:hover': {
        color: 'rgba(255,255,255,1)',
    }
})
const ContainerList = styled.div({
    width: '100%',
    padding: '1.5vh 2vh',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'rgb(35,35,45)',
    borderRadius: 4,
    cursor: 'pointer',
    transition: 'all 0.2s ease-out',
    margin: '1vh 0',
    "&:hover": {
        backgroundColor: 'rgb(45,45,55)',
    }
})
const TeamList = ({ data, onClick }: any) => {

    return (

        < ContainerList >
            <Container alignItems={"center"} justifyContent={'space-between'}>
                <Item xs={1}>
                    <Avatar url={data.avatar} name={data.name} />
                </Item>
                <Item xs={4}>
                    <Text>
                        {data.name}
                    </Text>
                </Item>
                <Item xs={4}>
                    <Text>
                        Rol: Proximamente
                    </Text>
                </Item>
                <Item xs={1} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <IconButton onClick={() => onClick(data)}>

                        <Icon />
                    </IconButton>
                </Item>
            </Container>
        </ ContainerList >


    );
};
export default TeamList;
