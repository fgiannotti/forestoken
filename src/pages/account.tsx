import { makeStyles } from '@mui/styles';
import { NextPage } from 'next/types';
import Plantilla from '../client/layouts/plantilla';
import * as React from "react";
import StepAccount from "../client/components/account/StepAccount";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "../client/components/navbar/Navbar";
import DrawerAccount from "../client/components/drawer/DrawerAccount";
import Container from "@mui/material/Container";
import Copyright from "../client/components/copyright";
import {useState} from "react";
import { NextPage } from 'next/types';
import DatosGenerales from "../client/components/account/DatosGenerales";
import Verificacion from "../client/components/account/Verificacion";

const mdTheme = createTheme();

const useStyles = makeStyles((theme) => ({
  main: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const Account: NextPage = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [form, setForm] = useState({});
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
        setOpen(!open);
  };

  const renderComponentForm = () => {
    switch (activeStep) {
        case 0:
            return <DatosGenerales setActiveStep={setActiveStep} form={form} setForm={setForm}/>
        case 1:
            return <Verificacion setActiveStep={setActiveStep} form={form} setForm={setForm}/>
    }
  };



  return (

      <ThemeProvider theme={mdTheme}>
          <Box sx={{ display: 'flex' }}>
              <CssBaseline />
              <Navbar open={open} toggleDrawer={toggleDrawer} />
              <Box
                  component="main"
                  sx={{
                      backgroundColor: (theme) =>
                          theme.palette.mode === 'light'
                              ? theme.palette.grey[100]
                              : theme.palette.grey[900],
                      flexGrow: 1,
                      height: '100vh',
                      overflow: 'auto',
                  }}
              >
                  <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                      <div className={classes.main}>
                          <StepAccount activeStep={activeStep}/>
                          <div>
                              {renderComponentForm()}
                              aca van las paginas como componentes
                              aca va el boton siguiente
                          </div>
                      </div>
                      <Copyright sx={{ pt: 4 }} />
                  </Container>
              </Box>
          </Box>
      </ThemeProvider>
  );
};

export default Account;
