import { createTheme, ThemeProvider } from '@mui/material/styles';
import { NextPage } from 'next/types';
import { useState } from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Navbar from '../components/Navbar';
import Drawer from '../components/drawer/Drawer';
import Copyright from '../components/copyright';
import theme from '../theme/theme';

const mdTheme = theme;
const Dashboard: NextPage = ({ children }) => {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Navbar open={open} toggleDrawer={toggleDrawer} />
        <Drawer open={open} toggleDrawer={toggleDrawer} />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Container maxWidth={false} sx={{ mt: 4, mb: 4 }}>
            {children}
            <Copyright />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
