/* Eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import styled from '@emotion/styled';
import {Grid} from '@mui/material';
import { type AddFile } from '../../types/app';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import { CONTAINER, CONTAINER_DARK, PAPER_DARK } from '../../constants/Color';
const ContainerRounded= styled.div({
	width: '20vh',
	height: '20vh',
	display: 'flex',
	borderRadius: '100%',
	alignItems: 'center',
	justifyContent: 'center',
	backgroundColor: 'rgba(50,50,50,0)',
	border: `dashed 2px ${CONTAINER}`,
	cursor: 'pointer',
	transition: '0.15s',

	'&: hover': {
		backgroundColor: CONTAINER_DARK,
	},
});
const Container = styled.div({
	width: '96%',
	height: '25vh',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	backgroundColor: 'rgba(50,50,50,0)',
	border: `dashed 2px ${CONTAINER}`,
	cursor: 'pointer',
	transition: '0.15s',

	'&: hover': {
		backgroundColor: PAPER_DARK,
	},
});

const Text = styled.div({
	color: CONTAINER,
	fontFamily: 'verdana',
	textAlign: 'center',
	fontSize: '1.5vh',
});
const TextSmall = styled.div({
	color: 'rgb(200,200,200)',
	fontFamily: 'verdana',
	fontSize: 14,
});
const Icon = styled(AddPhotoAlternateOutlinedIcon)({
	fontSize: '5vh',
	width: '100%',
	color: CONTAINER,
		textAlign: 'center'
});
const IconSmall = styled(AddPhotoAlternateOutlinedIcon)({
	fontSize: 50,
	color: 'rgb(80,80,80)',
});
const Card = styled.div({
	width: '100%',
	height: '11vw',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	backgroundColor: 'rgb(250,50,50)',
	border: `dashed 2px ${CONTAINER}`,
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
						Añadir Imagen
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
export const AddIMageCircle = ({ onClick }: AddFile) => (
		<ContainerRounded
			onClick={onClick}
		>
			<Grid container justifyContent={'center'} alignItems={'center'}>
				<Grid item xs={12}>
					<Icon/>
				</Grid>
				<Grid item xs={12}>
					<Text>
						Añadir Imagen
					</Text>
				</Grid>
			</Grid>
		</ContainerRounded>
)
