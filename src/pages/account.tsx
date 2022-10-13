import { makeStyles } from '@mui/styles';
import {GetServerSideProps} from 'next';
import * as React from "react";
import StepAccount from "../client/components/account/StepAccount";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "../client/components/Navbar";
import Container from "@mui/material/Container";
import Copyright from "../client/components/copyright";
import {FC, useEffect, useState} from "react";
import DatosGenerales from "../client/components/account/DatosGenerales";
import DatosPersonales from "../client/components/account/DatosPersonales";
import Resumen from "../client/components/account/Resumen";
import {fetch} from 'src/shared/utils/fetch';
import { UserGoogle } from 'src/shared/types/UserGoogle';
import {buildServerSideProps} from "../client/ssr/buildServerSideProps";
import axios from "axios";
import {BlogPost} from "../shared/types/blog-post";

const mdTheme = createTheme();

const useStyles = makeStyles((theme) => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

 type googleType = {
     googleData: UserGoogle
};


const Account: FC<any> = ({ email, picture}) => {
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
            return <DatosGenerales setActiveStep={setActiveStep} setForm={setForm}/>
        case 1:
            return <DatosPersonales setActiveStep={setActiveStep} setForm={setForm}/>
        case 2:
            return <Resumen setActiveStep={setActiveStep} formulario={form} picture={''} email={''}  />
    }
  };

  return (

      <ThemeProvider theme={mdTheme}>
          <Box sx={{ display: 'flex' }}>
              <CssBaseline />
              <Navbar open={open} toggleDrawer={toggleDrawer} />
              <StepAccount activeStep={activeStep}/>
              {console.log(form)}
              <Box
                  component="main"
                  sx={{
                      backgroundColor: (theme) =>
                          theme.palette.mode === 'light'
                              ? theme.palette.grey[100]
                              : theme.palette.grey[900],
                      flexGrow: 1,
                      height: '100%',
                      overflow: 'auto'
                  }}
              >
                  <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                      <div className={classes.main}>
                          <div>
                              {renderComponentForm()}
                          </div>
                          <Copyright sx={{ pt: 4 }} />
                      </div>
                  </Container>
              </Box>
              {console.log(picture,email)}
          </Box>
      </ThemeProvider>
  );
};

export default Account;
