import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import { NextPage } from 'next/types';
import Dashboard from '../client/layouts/dashboard';

import Balance from '../client/components/Balance';
import Cotizacion from '../client/components/Cotizacion';
import Movimientos from '../client/components/Movements';

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

const Home: NextPage = () => {
  const classes = useStyles();
  return (
    <Dashboard>
      <Grid container spacing={4}>
        <Grid item lg={8} md={6} xs={12}>
          <Balance />
          <Movimientos />
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <Cotizacion />
        </Grid>
      </Grid>
    </Dashboard>
  );
};

export default Home;