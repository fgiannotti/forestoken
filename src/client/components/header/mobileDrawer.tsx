import React from 'react';
import { Button, Box } from 'theme-ui';
import { Scrollbars } from 'react-custom-scrollbars-2';
import Drawer from 'src/client/components/header/drawer';
import { IoMdClose, IoMdMenu } from 'react-icons/io';
import { Link as ScrollLink } from 'react-scroll';
import MENU_DATA from './header.data';
import Logo from 'src/client/components/logo';
import logoDark from 'src/client/assets/Forestoken-logo.png';

const MobileDrawer = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  // Toggle drawer
  const toggleHandler = React.useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <Drawer
      width="320px"
      drawerHandler={
        <Box sx={styles.handler}>
          <IoMdMenu size="22px" />
        </Box>
      }
      open={isOpen}
      toggleHandler={toggleHandler}
      closeButton={<IoMdClose size="24px" color="#02073E" />}
      drawerStyle={styles.drawer}
      closeBtnStyle={styles.close}
      className={undefined}
      closeButtonStyle={undefined}
      placement={undefined}
    >
      <Scrollbars autoHide>
        <Box sx={{ ...styles.content }}>
          <Logo {...logoDark} />
          <Box sx={{ ...styles.menu }}>
            {MENU_DATA.map(({ path, label }, i) => (
              <ScrollLink
                activeClass="active"
                to={path}
                spy={true}
                smooth={true}
                offset={10}
                duration={500}
                key={i}
              >
                {label}
              </ScrollLink>
            ))}
          </Box>

          <Box sx={styles.menuFooter}>
            <Button variant="primary" sx={styles.button}>
              Ingresa
            </Button>
          </Box>
        </Box>
      </Scrollbars>
    </Drawer>
  );
};

const styles = {
  handler: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: '0',
    width: '26px',
    cursor: 'pointer',
    '@media screen and (min-width: 1024px)': {
      display: 'none',
    },
  },

  drawer: {
    width: '100%',
    height: '100%',
    background: 'background',
  },

  close: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    cursor: 'pointer',
    top: '36px',
    right: '30px',
    zIndex: '1',
  },

  content: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flex: 'column',
    flexDirection: 'column' as const,
    pt: '30px',
    pb: '40px',
    px: '30px',
  },

  menu: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column' as const,
    marginTop: '30px',

    a: {
      fontSize: '16px',
      fontWeight: '400',
      color: 'black',
      py: 2,
      cursor: 'pointer',
      transition: 'all 0.3s',
      '&:hover, &:focus': {
        color: 'primary',
      },
    },
  },

  menuFooter: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    mt: 'auto',
  },

  button: {
    fontSize: '15px',
    fw: '700',
    height: '48px',
    borderRadius: '3px',
    cursor: 'pointer',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    py: '0',
    backgroundColor: 'primary',
    color: '#fff',
    fontFamily: 'body',
    transition: 'all 0.25s',
    '&:hover': {
      opacity: 0.85,
    },
  },
};

export default MobileDrawer;
