import React from 'react';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import styled from '@emotion/styled';
import {CORRECT, CORRECTHOVER} from '../../constants/Color';
import { type Props } from '../../types/app';
const Icon = styled(AutorenewIcon)({
	color: CORRECT,
	cursor: 'pointer',
	transition: '0.2s',
	'&: hover': {
		color: CORRECTHOVER,
	},
});
const ChangeIcon = ({onClick}: Props) => (
	<>
		<div onClick={onClick}>
			<Icon/>
		</div>
	</>
);
export default ChangeIcon;
