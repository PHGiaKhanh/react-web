import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  cssVariables: true,
  palette: {
    mode: 'dark', // default is light
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },

    text: {
      primary: '#a00f0f',
      secondary: '#5c9c14',
    },
  },
});

export default theme;
