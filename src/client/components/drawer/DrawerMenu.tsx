import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import List from '@mui/material/List';
import MenuList from './sidebarItems';
import src from 'src/client/assets/Forestoken-logo.png';
import Image from 'next/image';
import Copyright from '../copyright';
import { useState, useEffect } from 'react';
import * as React from 'react';
import StyledDrawer from "../StyledDrawer";

const DrawerMenu = ({ open, toggleDrawer }) => {
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
    <StyledDrawer variant="permanent" open={open} drawerWidth={width}>
      <Toolbar sx={styles.toolbar}>
        <div style={styles.div}>
          <Image
            src={src}
            alt="Forestoken"
            style={styles.logo}
            height={25}
            width={25}
          />
          <span style={styles.title}>Forestoken</span>
        </div>
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <List component="nav" style={{ width: '100%', marginBottom: 'auto' }}>
        <MenuList />
      </List>
      {open && <Copyright />}
    </StyledDrawer>
  );
};

const styles = {
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    px: [1],
  },
  div: {
    padding: '8px 10px',
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    minWidth: 'auto',
  },
  title: {
    padding: '20px 10px',
    fontFamily: 'Abel',
    fontSize: '18px',
    color: 'text',
    fontWeight: '400',
    lineHeight: '1.2',
    justifyContent: 'left',
  },
};

export default DrawerMenu;
