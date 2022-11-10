import { makeStyles } from '@mui/styles';
import * as React from 'react';
import StepAccount from '../client/components/account/StepAccount';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from '../client/components/Navbar';
import Container from '@mui/material/Container';
import Copyright from '../client/components/copyright';
import { FC, useEffect, useState } from 'react';
import GeneralData from '../client/components/account/GeneralData';
import PersonalData from '../client/components/account/PersonalData';
import Resumen from '../client/components/account/Resumen';
import { buildServerSideProps } from '../client/ssr/buildServerSideProps';
import theme from '../client/theme/theme';

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
    setForm({ ...form, user: user });
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
        return <GeneralData setActiveStep={setActiveStep} setForm={setForm} />;
      case 1:
        return <PersonalData handleBack={handleBack} setActiveStep={setActiveStep} setForm={setForm} />;
      case 2:
        return <Resumen handleBack={handleBack} setActiveStep={setActiveStep} formulario={form} />;
    }
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Navbar open={open} toggleDrawer={toggleDrawer} />
        <StepAccount activeStep={activeStep} />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100%',
            overflow: 'auto',
          }}
        >
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <div className={classes.main}>
              <div>{renderComponentForm()}</div>
              <Copyright sx={{ pt: 4 }} />
            </div>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export const getServerSideProps = buildServerSideProps<any>(async (ctx) => {
  const userCtx = ctx.req['user'];
  const user = JSON.parse(JSON.stringify(userCtx));
  return { user };
});

export default Account;
