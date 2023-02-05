import React from 'react'
import DashBoard from '../Views/dashBoard/Dashboard';
import Header from '../components/header/Header';
const dashBoard = () => {
    return (<>
        <Header version={3} />
    <DashBoard/>
    </>)
}
export default dashBoard;