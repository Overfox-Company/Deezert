import React,{useEffect} from 'react';
import { AppContext } from '../../context/AppContext';
import styled from '@emotion/styled';
import ApiController from '../../connection/ApiController';
const Container = styled.div({
    minHeight: '100vh'
})
const DashBoard = () => {
    const { user,setCompanys } = React.useContext(AppContext)
    useEffect(() => {
        ApiController.getCompanys({ id: localStorage.getItem('id') })
            .then((e) => {
                console.log(e.data)
                setCompanys(e.data)
            })
            .catch(e => console.log(e))
    },[user])
    return (

        <Container>
            <br/> <br/><br/>
            <p>{user.name}</p>
            <p>{user.avatar}</p>
        </Container>
    )
}
export default DashBoard;