import React from 'react'
import { AppContext } from '../../context/AppContext';
const AddCompany = () => {
    const {user}=React.useContext(AppContext)
    return (
        <>
                    <p>añadir compañia</p>
        <p>{user?.name}</p>
        </>

)};
export default AddCompany;