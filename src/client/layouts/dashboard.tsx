import { ThemeProvider } from '@mui/material/styles';
import { NextPage } from 'next/types';
import { useState } from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Navbar from '../components/Navbar';
import Drawer from '../components/drawer/DrawerMenu';
import theme from '../theme/theme';

const mdTheme = theme;
const Dashboard: NextPage = ({ children }) => {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex', height: '100vh' }}>
        <CssBaseline />
        <Navbar open={open} toggleDrawer={toggleDrawer} isBell={true} />
        <Drawer open={open} toggleDrawer={toggleDrawer} />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            overflowX: 'auto',
            overflowY: 'hide',
          }}
        >
          <Container maxWidth={false} sx={{ mt: 6, mb: 4, pt: ['600px', 0] }}>
            {children}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
