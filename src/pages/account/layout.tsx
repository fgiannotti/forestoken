import * as React from 'react';
import { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Box from '@mui/material/Box';
import { mainListItems } from './listItems';

const drawerWidth = 240;
const transitionDuration = 1000; //can also use theme.transitions.duration

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    //this will hide the backdrop when varient="temporary"
    '& .MuiBackdrop-root': {
      display: 'none',
    },
    //backgroundColor: "rgba(0,0,0,0.6)" Don't target this
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: 'rgba(120,120,120,0.2)',
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: transitionDuration,
    }),
    marginLeft: 0,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: transitionDuration,
    }),
    marginLeft: drawerWidth,
  },
}));

export default function Layout({ children }) {
  const classes = useStyles();
  const greaterThan375 = useMediaQuery('(min-width:375px)');
  const [open, setOpen] = React.useState(greaterThan375);

  useEffect(() => {
    setOpen(greaterThan375);
  }, [greaterThan375]);

  const handleMenuClick = () => {
    setOpen(!open);
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton //hide on desktop
            color="inherit"
            onClick={handleMenuClick}
            edge="start"
            className={clsx(classes.menuButton, greaterThan375 && classes.hide)}
          ></IconButton>
          <Typography variant="h6" noWrap>
            Responsive Drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="temporary"
        //elevation={3} only works with variant="temporary"
        open={open}
        transitionDuration={{
          enter: transitionDuration,
          exit: transitionDuration,
        }}
        classes={{
          paper: classes.drawerPaper,
        }}
        PaperProps={{ elevation: 9 }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>{mainListItems}</List>
        </div>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <Toolbar />
        <Box
          sx={{
            width: '100vw',
            height: '100vh',
            backgroundColor: 'primary.dark',
          }}
        >
          {children}
        </Box>
      </main>
    </div>
  );
}
