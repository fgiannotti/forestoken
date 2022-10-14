import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { mainListItems } from './listItems';
import Container from '@mui/material/Container';

const drawerWidth = 240;

export default function Layout2({ children }) {
  return (
    <Container>
      <Box sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Responsive drawer
            </Typography>
          </Toolbar>
        </AppBar>
        <Box sx={{ mt: 8, heigth: '100wh' }}>
          <main>{children}</main>
        </Box>
      </Box>
      <Drawer
        anchor="left"
        variant="permanent"
        sx={{
          display: { xs: 'block', sm: 'block' },
        }}
      >
        <div>
          <Toolbar />
          <Divider />
          <List>{mainListItems}</List>
        </div>
      </Drawer>
    </Container>
  );
}
