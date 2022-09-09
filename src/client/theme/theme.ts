import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#6320EE',
    },
    secondary: {
      main: '#5FA069',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
