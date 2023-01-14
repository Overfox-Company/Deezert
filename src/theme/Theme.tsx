import { createTheme } from '@mui/material/styles';
import { PRIMARY_COLOR, PRIMARY_COLOR_HOVER, PAPER_DARK, CONTAINER_DARK,PAPER, CONTAINER,TEXT_DARK,SECONDARY_COLOR,SECONDARY_COLOR_HOVER } from '../constants/Color';
export const ThemeDark= createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main:  PRIMARY_COLOR ,
      light: 'rgb(25,200,250)',
      dark: PRIMARY_COLOR_HOVER,
      contrastText: TEXT_DARK,
    },
    error: {
      main: '#ff0000',
      light: '#ff3333',
      dark: '#bb0000',
      contrastText: '#ffffff',
    },
    warning: {
        main: '#ffa500',
        light: '#ffc266',
        dark: '#ff8c00',
        contrastText: '#ffffff',
    },
    info: {
        main: '#87ceeb',
        light: '#b0e2ff',
        dark: '#6495ed',
        contrastText: '#ffffff',
    },
    success: {
        main: '#32cd32',
        light: '#66ee66',
        dark: '#228b22',
        contrastText: '#ffffff',
    },
    text: {
      primary: 'rgb(255,2,2)',
      secondary: 'rgb(255,255,2)',
      disabled: '#cccccc',
    },
    background: {
      default:  CONTAINER_DARK ,
      paper: PAPER_DARK,
    },
    action: {
      active: '#ff4400',
      hover: '#ff8833',
      selected: '#bb2200',
      disabled: '#cccccc',
      disabledBackground: '#eeeeee',
    },
    divider: '#cccccc',
  },
})
export const ThemeLight= createTheme({
  palette: {
    mode: 'light',
    primary: {
      main:  PRIMARY_COLOR ,
      light: 'rgb(25,200,250)',
      dark: PRIMARY_COLOR_HOVER,
      contrastText: TEXT_DARK,
    },
    error: {
      main: '#ff0000',
      light: '#ff3333',
      dark: '#bb0000',
      contrastText: '#ffffff',
    },
    warning: {
        main: '#ffa500',
        light: '#ffc266',
        dark: '#ff8c00',
        contrastText: '#ffffff',
    },
    info: {
        main: '#87ceeb',
        light: '#b0e2ff',
        dark: '#6495ed',
        contrastText: '#ffffff',
    },
    success: {
        main: '#32cd32',
        light: '#66ee66',
        dark: '#228b22',
        contrastText: '#ffffff',
    },
    text: {
      primary: 'rgb(255,2,2)',
      secondary: 'rgb(255,255,2)',
      disabled: '#cccccc',
    },
    background: {
      default:  CONTAINER,
      paper: PAPER,
    },
    action: {
      active: '#ff4400',
      hover: '#ff8833',
      selected: '#bb2200',
      disabled: '#cccccc',
      disabledBackground: '#eeeeee',
    },
    divider: '#cccccc',
  },
})