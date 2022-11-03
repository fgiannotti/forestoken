import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import StoreIcon from '@mui/icons-material/Store';
import HelpIcon from '@mui/icons-material/Help';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import Image from 'next/image';
import MuiDrawer from '@mui/material/Drawer';
import src from '../../assets/Forestoken-logo.png';
import {AppBar, CssBaseline, Drawer} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Copyright from "../copyright";

export default function StepAccount(props: { activeStep: number, render: () => (JSX.Element) }) {
  const { activeStep,render } = props;
  const drawerWidth = 240;

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const STEPS = [
    {
      text: 'DATOS GENERALES',
      icon: <HomeIcon />,
    },
    {
      text: 'DATOS PERSONALES',
      icon: <StoreIcon />,
    },
    {
      text: 'RESUMEN',
      icon: <HelpIcon />,
    },
  ];

  const drawer = (
      <div>
        <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: [1],
            }}
        >
          <>
            <Image src={src} alt="Forestoken" height={40} width={40} />
            <span style={styles.title}>Forestoken</span>
          </>
        </Toolbar>
    <Divider />
        <List component="nav">
          <Box sx={{ ml: 2, maxWidth: 400 }}>
            <Stepper activeStep={activeStep} orientation="vertical">
              {STEPS.map((step, index) => (
                  <Step
                      key={index}
                      sx={{
                        '& .MuiStepLabel-root .Mui-completed': {
                          color: 'secondary.main', // circle color (COMPLETED)
                        },
                        '& .MuiStepLabel-root .Mui-active': {
                          color: 'secondary.main', // circle color (ACTIVE)
                        },
                      }}
                  >
                    <StepLabel
                        optional={
                          index === 4 ? (
                              <Typography variant="caption">Último paso</Typography>
                          ) : null
                        }
                    >
                      {step.text}
                    </StepLabel>
                  </Step>
              ))}
            </Stepper>
          </Box>
        </List>
      </div>
  )

  return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
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
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: 'none' } }}
            >
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
              //container={container}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
              }}
          >
            {drawer}
          </Drawer>
          <Drawer
              variant="permanent"
              sx={{
                display: { xs: 'none', sm: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
              }}
              open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
            component="main"
            sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
          <Toolbar />
            {render()}
            <Copyright sx={{ pt: 4 }} />
        </Box>
      </Box>
  );

}

const styles = {
  title: {
    padding: '20px 10px',
    fontSize: '15px',
    color: 'text',
    fontWeight: '400',
    lineHeight: '1.2',
    display: 'initial',
    margin: '0 auto',
  },
};
