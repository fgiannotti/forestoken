import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar/AppBar';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import { useState, useEffect } from 'react';

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
  drawerwidth?: number | string;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open, drawerwidth }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerwidth,
    width: `calc(100% - ${drawerwidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Navbar = ({ open, toggleDrawer }) => {
  const [width, setWidth] = useState(0);

  const handleWindowResize = () => {
    setWidth(window.innerWidth < 700 ? window.innerWidth : 300);
  };

  useEffect(() => {
    handleWindowResize();
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  return (
    <AppBar position="absolute" open={open} drawerwidth={width}>
      <Toolbar
        sx={{
          pr: '24px', // keep right padding when drawer closed
          ...(open && { pointerEvents: 'none' }),
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{
            marginRight: '36px',
            ...(open && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
        {/*        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
           Dashboard
        </Typography>
        <IconButton
          color="inherit"
          sx={{
            ...(open && { display: 'none' }),
          }}
        >
          {
            isBell &&
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          }

        </IconButton>*/}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
