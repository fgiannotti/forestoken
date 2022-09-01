
/*eslint-disable*/
import React, { FC } from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from '@mui/material';
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
// core components
import styles from "src/client/assets/jss/components/footerStyle";

const Footer: FC = (props) => {
  const useStyles = makeStyles(styles);
  // @ts-ignore
  const classes: any = useStyles();
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a href="#home" className={classes.block}>
                Home
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="#company" className={classes.block}>
                Company
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="#portfolio" className={classes.block}>
                Portfolio
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="#blog" className={classes.block}>
                Blog
              </a>
            </ListItem>
          </List>
        </div>
        <p className={classes.right}>
          <span>
            &copy; {1900 + new Date().getFullYear()}{" "}
            <a
              href="https://liberesoclock.com?from=web_app_liberes"
              target="_blank"
              className={classes.a}
            >
              Liberes oClock
            </a>
          </span>
        </p>
      </div>
    </footer>
  );
}