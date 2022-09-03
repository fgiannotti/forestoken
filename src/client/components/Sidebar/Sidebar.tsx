/*eslint-disable*/
import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import Link from "next/link";
import { useRouter } from "next/router";
// @mui/material components
import { makeStyles,createStyles } from '@mui/styles';
import Drawer from "@mui/material/Drawer";
import Hidden from "@mui/material/Hidden";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Icon from "@mui/material/Icon";

// core components
import AdminNavbarLinks from "src/client/components/Navbars/AdminNavbarLinks";


import styles from "src/client/assets/jss/components/sidebarStyle";

const Sidebar= (props) => {
  // used for checking current route
  const router = useRouter();
  // creates styles for this component
  const useStyles = makeStyles(() =>
    createStyles(styles)
  );
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    return router.route.indexOf(routeName) > -1;
  }
  const { color, logo, image, logoText, routes } = props;
  const links = (
      <List className={classes.list}>
        {routes.map((prop, key) => {
          let activePro = " ";
          let listItemClasses;
          if (prop.path === '/logout') {
            activePro = classes.activePro + " ";
            listItemClasses = classNames({
              [" " + classes[color]]: true,
            });
          } else {
            listItemClasses = classNames({
              [" " + classes[color]]: activeRoute(prop.layout + prop.path) ||
              prop.path === '/logout',
            });
          }

          const whiteFontClasses = classNames({
            [" " + classes.whiteFont]:
                activeRoute(prop.layout + prop.path)
          });
          return (
              <Link href={prop.layout + prop.path} key={key}>
                <a className={activePro + classes.item}>
                  <ListItem button className={classes.itemLink + listItemClasses}>
                    {typeof prop.icon === "string" ? (
                        <Icon
                            className={classNames(classes.itemIcon, whiteFontClasses)}
                        >
                          {prop.icon}
                        </Icon>
                    ) : (
                        <prop.icon
                            className={classNames(classes.itemIcon, whiteFontClasses)}
                        />
                    )}
                    <ListItemText
                        primary={prop.name}
                        className={classNames(classes.itemText, whiteFontClasses)}
                        disableTypography={true}
                    />
                  </ListItem>
                </a>
              </Link>
          );
        })}
      </List>
  );
  const brand = (
      <div className={classes.logo}>
        <a
            href="https://forestoken.com"
            className={classNames(classes.logoLink)}
            target="_blank"
        >
          <div className={classes.logoImage}>
            <img src={logo} alt="logo" className={classes.img}/>
          </div>
          {logoText}
        </a>
      </div>
  );
  return (
    <div>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor="right"
          open={props.open}
          classes={{
            paper: classNames(classes.drawerPaper),
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>
            <AdminNavbarLinks />
            {links}
          </div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          anchor="left"
          variant="permanent"
          open
          classes={{
            paper: classNames(classes.drawerPaper),
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>{links}</div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
    </div>
  );
}

Sidebar.propTypes = {
  handleDrawerToggle: PropTypes.func,
  bgColor: PropTypes.oneOf([
    "white",
    "purple",
    "blue",
    "green",
    "orange",
    "red",
  ]),
  logo: PropTypes.string,
  image: PropTypes.string,
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  open: PropTypes.bool,
};

export default Sidebar;