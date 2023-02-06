import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Grid } from '@mui/material';
import styled from '@emotion/styled'
const Container = styled.div({
    width: '100%',
    backgroundColor: 'rgba(100,100,120,0.1)',
    borderRadius: '20px',
    padding:'2px 10px'
})
const Input = styled.input({
    border: 0,
    backgroundColor: 'rgba(0,0,0,0)',
    outline: 'none'
})
const Search = () => {
    return (<>
        <Container>
<Grid  container justifyContent={'flex-start'} alignItems={'center'}>
                <Grid item xs={2} md={1}>
                    <SearchIcon style={{marginTop:5}} />
                </Grid>
                <Grid item xs={10} md={11}>
                    <Input style={{width: '100%'}} placeholder="Buscar"/>
                </Grid>
</Grid>
        </Container>
    </>)
}
export default Search;