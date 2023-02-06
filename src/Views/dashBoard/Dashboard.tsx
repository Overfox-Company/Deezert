import React,{useEffect} from 'react';
import { AppContext } from '../../context/AppContext';
import styled from '@emotion/styled';
import ApiController from '../../connection/ApiController';
import Staff from './staff/Staff';
const Container = styled.div({
    marginTop:'15%',
    minHeight: '100vh',
    minWidth: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent:'center'
})
const DashBoard = () => {
    const { user,setCompanys,panel } = React.useContext(AppContext)
    useEffect(() => {
        ApiController.getCompanys({ id: localStorage.getItem('id') })
            .then((e) => {
                console.log(e.data)
                setCompanys(e.data)
            })
            .catch(e => console.log(e))
    },[user])
    return (
        <>
        <Container>
     
            {panel===1&&<Staff/>}
        </Container>
        </>

    )
}
export default DashBoard;