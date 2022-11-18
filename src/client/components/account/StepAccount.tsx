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
import src from '../../assets/Forestoken-logo.png';
import { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import StyledDrawer from "../StyledDrawer";


const STEPS = [
  {
    text: 'DATOS GENERALES',
    icon: <HomeIcon/>,
  },
  {
    text: 'DATOS PERSONALES',
    icon: <StoreIcon/>,
  },
  {
    text: 'RESUMEN',
    icon: <HelpIcon/>,
  },
];

export default function StepAccount(props: { activeStep: number, toggleDrawer: () => void, open: boolean }) {
  const {activeStep, open, toggleDrawer} = props;

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
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: [1],
        }}
      >
        <>
          <Image src={src} alt="Forestoken" height={25} width={25}/>
          <span style={styles.title}>Forestoken</span>
        </>
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon/>
        </IconButton>
      </Toolbar>
      <Divider/>
      <List component="nav">
        <Box sx={{ml: 2, maxWidth: 400}}>
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
    </StyledDrawer>
  );
}

const styles = {
  title: {
    padding: '20px 10px',
    fontSize: '15px',
    color: 'text',
    fontWeight: '400',
    lineHeight: '1.2',
    display: 'table',
    margin: '0 auto',
  },
};
