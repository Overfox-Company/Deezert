import React from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import styled from '@emotion/styled';
import {ERROR} from '../../constants/Color';
const Icon = styled(ClearIcon)({
	background: ERROR,
	color: 'rgb(10,10,10)',
	padding: 2,
	borderRadius: 20,
	fontSize: 15,
});
const ErrorIcon = () => (
	<Icon/>
);
export default ErrorIcon;
