import Layout from '../client/layouts/dashboard';
import Paper from '@mui/material/Paper';
import Movimientos from '../client/components/sectionsHome/Movements';
import Grid from '@mui/material/Grid';
import Link from 'next/link';
import Button from '@mui/material/Button';
import React from 'react';

const Acreditacion = () => {
  return (
    <Layout>
      <h1>Acreditacion</h1>
      <Link href="/acreditacion/nueva-solicitud">
        <Button variant="contained" color="primary">
          Nueva solicitud
        </Button>
      </Link>
      <Grid item xs={12} key={3}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <Movimientos />
        </Paper>
      </Grid>
    </Layout>
  );
};

export default Acreditacion;
