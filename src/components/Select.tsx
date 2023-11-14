import React, { FC } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { FilledInput, Button } from '@mui/material';
import Avatar from './Avatar';
import { Container, Item } from './Container';
import styled from '@emotion/styled'
const TextName = styled.p({
    width: "90%",/* Establece el ancho máximo del contenedor */
    overflow: "hidden", /* Oculta el texto que se desborda del contenedor */
    whiteSpace: "nowrap", /* Evita que el texto se divida en múltiples líneas */
    textOverflow: "ellipsis", /* Reemplaza el texto que se desborda con puntos suspensivos */
})
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
interface SelectType {
    data: any;
    onClick: any;
}
const initialValue = {
    avatar: 'No selected user', name: 'Ningun usuario seleccionado'
}

const SelectUser: FC<SelectType> = ({ data, onClick }) => {
    const [personName, setPersonName] = React.useState<any | null>(initialValue);;

    const handleChange = (event: any) => {
        const { target: { value } } = event;
        setPersonName(
            value
        );
    };

    return (
        <div>
            <Container justifyContent={"space-between"}>
                <Item xs={7}>
                    <FormControl sx={{ width: '100%' }}>
                        <Select
                            style={{ height: 50, display: 'flex', alignItems: 'center' }}

                            variant='outlined'
                            value={personName}
                            onChange={handleChange}
                            input={<FilledInput />}
                            renderValue={(selected) => <Container alignItems='center'>
                                <Item xs={2} style={{ display: 'flex', alignItems: 'center' }}>
                                    <Avatar url={selected.avatar} name={selected.name} />
                                </Item>
                                <Item xs={10}>

                                    <TextName  >
                                        {selected.name}
                                    </TextName>

                                </Item>
                            </Container>}
                            MenuProps={MenuProps}
                        >
                            {data.length > 0 ? data.map((user: any) => (
                                <MenuItem value={user} key={user._id}>
                                    <Container alignItems='center'>
                                        <Item xs={2} style={{ display: 'flex', alignItems: 'center' }}>
                                            <Avatar url={user.avatar} name={user.name} />
                                        </Item>
                                        <Item xs={10}>
                                            <TextName>
                                                {user.name}
                                            </TextName>
                                        </Item>
                                    </Container>
                                </MenuItem>
                            )) : <div style={{ paddingLeft: 10 }}>

                                <TextName>
                                    No hay mas personas por agregar
                                </TextName>
                            </div>
                            }
                        </Select>
                    </FormControl>
                </Item>
                <Item xs={2}>
                    <Button variant='outlined' style={{ height: '100%', width: '100%' }} onClick={() => { onClick(personName), setPersonName(initialValue) }}>
                        Añadir
                    </Button>
                </Item>
            </Container>

        </div>
    );
}
export default SelectUser;