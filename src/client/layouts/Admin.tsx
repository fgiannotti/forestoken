import React, { FC } from 'react';
import { useRouter } from 'next/router';
// creates a beautiful scrollbar
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
// @material-ui/core components
import { createStyles, makeStyles } from '@mui/styles';
// core components
import Navbar from 'src/client/components/Navbars/Navbar';
import Footer from 'src/client/components/Footers/Footer/Footer';
import Sidebar from 'src/client/components/Sidebar/Sidebar';
import FixedPlugin from 'src/client/components/FixedPlugin/FixedPlugin';

import routes from './routes';

import styles from 'src/client/assets/jss/layouts/adminStyle';

import bgImage from 'src/client/assets/img/sidebar-2.jpg';
import logo from 'src/client/assets/img/forestoken.png';
import {
  container,
  drawerWidth,
  transition,
} from '../assets/jss/forestoken-styles';

let ps;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const Admin: FC = ({ children, ...rest }) => {
  // used for checking current route
  const router = useRouter();
  // styles
  const useStyles = makeStyles((theme) =>
    createStyles({
      wrapper: {
        position: 'relative',
        top: '0',
        height: '100vh',
      },
      mainPanel: {
        overflow: 'auto',
        position: 'relative',
        float: 'right',
        ...transition,
        maxHeight: '100%',
        width: '100%',
        overflowScrolling: 'touch',
      },
      content: {
        marginTop: '70px',
        padding: '30px 15px',
        minHeight: 'calc(100vh - 123px)',
      },
      container,
      map: {
        marginTop: '70px',
      },
    }),
  );
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  const [image, setImage] = React.useState(bgImage);
  const [color, setColor] = React.useState('white');
  const [fixedClasses, setFixedClasses] = React.useState('dropdown');
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleImageClick = (image) => {
    setImage(image);
  };
  const handleColorClick = (color) => {
    setColor(color);
  };
  const handleFixedClick = () => {
    if (fixedClasses === 'dropdown') {
      setFixedClasses('dropdown show');
    } else {
      setFixedClasses('dropdown');
    }
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };
  // initialize and destroy the PerfectScrollbar plugin
  React.useEffect(() => {
    if (navigator.platform.indexOf('Win') > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
      document.body.style.overflow = 'hidden';
    }
    window.addEventListener('resize', resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf('Win') > -1) {
        ps.destroy();
      }
      window.removeEventListener('resize', resizeFunction);
    };
  }, [mainPanel]);
  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={routes}
        logoText={'Forestoken'}
        logo={logo}
        image={image}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={color}
        {...rest}
      />
      <div className={classes.mainPanel} ref={mainPanel}>
        <Navbar
          routes={routes}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />
        <div className={classes.content}>
          <div className={classes.container}>{children}</div>
        </div>
        <Footer />
        <FixedPlugin
          handleImageClick={handleImageClick}
          handleColorClick={handleColorClick}
          bgColor={color}
          bgImage={image}
          handleFixedClick={handleFixedClick}
          fixedClasses={fixedClasses}
        />
      </div>
    </div>
  );
  /*
  <div className={classes.wrapper}>
    <Sidebar
      routes={routes}
      logoText={"Liberes oClock"}
      logo={logo}
      image={image}
      handleDrawerToggle={handleDrawerToggle}
      open={mobileOpen}
      color={color}
      {...rest}
    />
    <div className={classes.mainPanel} ref={mainPanel}>
      <Navbar
        routes={routes}
        handleDrawerToggle={handleDrawerToggle}
        {...rest}
      />
      {getRoute() ? (
        <div className={classes.content}>
          <div className={classes.container}>{children}</div>
        </div>
      ) : (
        <div className={classes.map}>{children}</div>
      )}
      {getRoute() ? <Footer /> : null}
      <FixedPlugin
        handleImageClick={handleImageClick}
        handleColorClick={handleColorClick}
        bgColor={color}
        bgImage={image}
        handleFixedClick={handleFixedClick}
        fixedClasses={fixedClasses}
      />
    </div>
  </div>;
*/
};

export default Admin;
