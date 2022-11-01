import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
const mdTheme = createTheme();

export default function Copyright(props: any) {
  return (
    <ThemeProvider theme={mdTheme}>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {'Copyright © '}
        <Link color="inherit" href="https://forestoken.com/">
          Forestoken
        </Link>
        {` ${new Date().getFullYear()}.`}
      </Typography>
    </ThemeProvider>
  );
}
