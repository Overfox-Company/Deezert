import React, { useContext, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import styled from '@emotion/styled';
import { P } from './BasicComponents';
import { AppContext } from '../context/AppContext';
import { MicroServiceContext } from '../context/Microservices';
const Container = styled.div
  `
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    position: fixed;
    z-index: 9999999999999;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.9);
  `
const Loader: any = () => {
  const { loader, setLoader } = useContext(AppContext);
  const { microServices } = useContext(MicroServiceContext)
  useEffect(() => {

    if (!microServices) {
      setLoader(true)
    } else {
      setLoader(false)
    }
  }, [microServices])
  return (
    <>

      {loader && <Container >

        <CircularProgress />
        <br />
        <P>Cargando...</P>

      </Container >}
    </>
  );
};

export default Loader;
