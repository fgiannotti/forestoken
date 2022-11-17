import {styled} from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})<{ drawerWidth: number | string }>(({theme, open, drawerWidth}) => ({
  '& .MuiDrawer-paper': {
    display: 'flex',
    flexDirection: 'column',
    overflowX: 'hidden',
    position: 'relative',
    whiteSpace: 'nowrap',
    height: '100vh',
    width: '300px',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(0),
      [theme.breakpoints.up('sm')]: {
        width: '0px',
      },
    }),
  },
}));

export default Drawer;