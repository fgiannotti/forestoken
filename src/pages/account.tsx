import { makeStyles } from '@mui/styles';
import * as React from 'react';
import StepAccount from '../client/components/account/StepAccount';
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from '../client/components/Navbar';
import Container from '@mui/material/Container';
import Copyright from '../client/components/copyright';
import { FC, useEffect, useState } from 'react';
import GeneralData from '../client/components/account/GeneralData';
import PersonalData from '../client/components/account/PersonalData';
import Resume from '../client/components/account/Resume';
import { buildServerSideProps } from '../client/ssr/buildServerSideProps';
import theme from '../client/theme/theme';
import Grid from "@mui/material/Grid";

const mdTheme = theme;

const useStyles = makeStyles((theme) => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const Account: FC<any> = (user) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [form, setForm] = useState({});
  const [open, setOpen] = useState(true);

  useEffect(() => {
    setForm({...form, user: user});
  }, []);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const renderComponentForm = () => {
    switch (activeStep) {
      case 0:
        return <GeneralData setActiveStep={setActiveStep} setForm={setForm}/>;
      case 1:
        return <PersonalData handleBack={handleBack} setActiveStep={setActiveStep} setForm={setForm}/>;
      case 2:
        return <Resume handleBack={handleBack} setActiveStep={setActiveStep} formulario={form}/>;
    }
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{display: 'flex'}}>
        <CssBaseline/>
        <Navbar open={open} toggleDrawer={toggleDrawer}/>
        <StepAccount open={open} toggleDrawer={toggleDrawer} activeStep={activeStep}/>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            height: '100%',
            overflow: 'auto',
          }}
        >
          <Container maxWidth={false} sx={{mt: 6, mb: 4}}>
            <Grid container direction="row" justifyContent="center" alignItems="center">
              {renderComponentForm()}
            </Grid>
            <Copyright sx={{pt: 4}}/>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export const getServerSideProps = buildServerSideProps<any>(async (ctx) => {
  const userCtx = ctx.req['user'];
  const user = JSON.parse(JSON.stringify(userCtx));
  return {user};
});

export default Account;
