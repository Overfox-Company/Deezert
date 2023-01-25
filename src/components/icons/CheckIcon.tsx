import React from 'react';
import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';
import styled from '@emotion/styled';
import {CORRECT} from '../../constants/Color';
const Icon = styled(CheckTwoToneIcon)({
	background: CORRECT,
	color: 'rgb(10,10,10)',
	padding: 2,
	borderRadius: 20,
	fontSize: 10,
});
const CheckIcon = () => (
	<>
		<Icon />
	</>
);
export default CheckIcon;
