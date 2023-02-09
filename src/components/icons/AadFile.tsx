/* Eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import styled from '@emotion/styled';
import {Grid} from '@mui/material';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import {type AddFile } from '../../types/app';
const Container = styled.div({
	width: '96%',
	height: '25vh',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	backgroundColor: 'rgb(50,50,50)',
	border: 'dashed 2px rgb(60,60,60)',
	cursor: 'pointer',
	transition: '0.15s',

	'&: hover': {
		backgroundColor: 'rgb(42,42,42)',
	},
});

const Text = styled.div({
	color: 'rgb(200,200,200)',
	fontFamily: 'verdana',
	textAlign: 'center'
});
const TextSmall = styled.div({
	color: 'rgb(200,200,200)',
	fontFamily: 'verdana',
	fontSize: 14,
});
const Icon = styled(NoteAddIcon)({
	fontSize: 60,
	width: '100%',
	color: 'rgb(80,80,80)',
		textAlign: 'center'
});
const IconSmall = styled(NoteAddIcon)({
	fontSize: 50,
	color: 'rgb(80,80,80)',
});
const Card = styled.div({
	width: '100%',
	height: '11vw',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	backgroundColor: 'rgb(50,50,50)',
	border: 'dashed 2px rgb(60,60,60)',
	cursor: 'pointer',
	transition: '0.15s',

	'&: hover': {
		backgroundColor: 'rgb(42,42,42)',
	},
});
export const AadFilesBig = ({onClick}: AddFile) => (
	<>
		<Container
			onClick={onClick}
		>
			<Grid container justifyContent={'center'} alignItems={'center'}>
				<Grid item xs={12}>
					<Icon/>
				</Grid>
				<Grid item xs={12}>
					<Text>
						Añadir archivos
					</Text>
				</Grid>
			</Grid>
		</Container>
	</>
);
export const AadFilesSmall = ({onClick}: AddFile) => (
	<>
		<Card
			onClick={onClick}
		>
			<Grid container>
				<Grid item xs={12}>
					<IconSmall/>
				</Grid>
				<Grid item xs={12}>
					<TextSmall>
						Añadir archivos
					</TextSmall>
				</Grid>
			</Grid>
		</Card>
	</>
);
