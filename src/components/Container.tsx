import React, { FC } from 'react'
import { Grid } from '@mui/material';
import styled from '@emotion/styled';
import { ContainerProps, ItemProps } from '../types/app';

const Section = styled.section({
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    aligItems: 'center',

})
const ArticleCustom = styled.article({
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    aligItems: 'center'
})

export const Container: FC<ContainerProps> = ({ children, ...props }) => {

    return (<Grid container {...props}>
        {children}
    </Grid>)
}
export const Item: FC<ItemProps> = ({ children, ...props }) => {
    return (<Grid item {...props}>
        {children}
    </Grid>)
}
export const Wrapper: FC<ContainerProps> = ({ children, ...props }) => {
    return (<Section  {...props}>
        {children}
    </Section >)
}
export const Article: FC<ContainerProps> = ({ children, ...props }) => {
    return (<ArticleCustom  {...props}>
        {children}
    </ArticleCustom>)
}
export const Card: FC<ContainerProps> = ({ children, ...props }) => {
    return (
        <div style={{
            backgroundColor: 'rgb(250,250,255)',
            display: 'flex',
            borderRadius: 6,
            justifyContent: 'center',
            boxShadow: '0 2px 10px 0 rgb(0, 0 ,30 ,0.5)',
            alignItems: 'center',
            padding: '1.5vw'
        }} {...props}>
            {children}
        </div>
    )
}
export const ContainerRowScroll = styled.div({
    width: '100%',
    height: '100%',
    overflow: 'auto',
    padding: 10
})
export const Row: FC<ContainerProps> = ({ children, ...props }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'row' }} {...props}>
            {children}
        </div>
    )
}
export const Column: FC<ContainerProps> = ({ children, ...props }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }} {...props}>
            {children}
        </div>
    )
}