/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Container, Flex } from 'theme-ui';
import { Link as ScrollLink } from 'react-scroll';
import Logo from 'src/client/components/logo';
import { DrawerProvider } from 'src/client/contexts/drawer/drawer.provider';
import MobileDrawer from './mobileDrawer';
import MENU_DATA from './header.data';
import logoDark from 'src/client/assets/Forestoken logo.png';

export default function Header({ className }) {
  return (
    <DrawerProvider>
      <header sx={styles.header} className={className}>
        <Container sx={styles.container}>
          <Logo {...logoDark}/>

          <Flex as="nav" sx={styles.nav}>
            {MENU_DATA.map(({ path, label }, i) => (
              <ScrollLink
                activeClass="active"
                sx={styles.nav.navLink}
                to={path}
                spy={true}
                smooth={true}
                offset={-120}
                duration={500}
                key={i}
              >
                {label}
              </ScrollLink>
            ))}
          </Flex>
          <MobileDrawer />
        </Container>
      </header>
    </DrawerProvider>
  );
}

const styles = {
  header: {
    color: 'text_white',
    fontWeight: 'normal',
    py: [2, null, null, '15px'],
    width: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    backgroundColor: 'background',
    opacity: 0.9,
    transition: 'all 0.4s ease',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.06)',

    '&.sticky': {
      backgroundColor: 'background',
      color: 'text',
      py: '15px',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.06)',
    },
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nav: {
    //position: 'absolute',
    ml: '500px',
    display: ['none', null, null, null, 'block'],
    navLink: {
      fontSize: '16px',
      color: '#242424',
      fontWeight: '400',
      cursor: 'pointer',
      lineHeight: '1.2',
      mr: '48px',
      transition: '500ms',
      ':last-child': {
        mr: '0',
      },
      '&:hover, &.active': {
        textShadow: '0 0 1px #242424',
      },
    },
  },
};
