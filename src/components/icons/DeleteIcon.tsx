import React from 'react';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import styled from '@emotion/styled';
import { type Props } from '../../types/app';
import {ERROR, ERRORHOVER} from '../../constants/Color';
const Icon = styled(DeleteOutlineOutlinedIcon)({
	color: ERROR,
	cursor: 'pointer',
	transition: '0.2s',
	'&: hover': {
		color: ERRORHOVER,
	},
	
});
const DeleteIcons = ({onClick}: Props) => (
	<>
		<div onClick={onClick}>
			<Icon/>
		</div>
	</>
);
export default DeleteIcons;
