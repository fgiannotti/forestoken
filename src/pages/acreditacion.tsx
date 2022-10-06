import Layout from '../client/layouts/dashboard';
import Paper from '@mui/material/Paper';
import AccreditationsMovements from './acreditacion/accreditation-movements';
import Grid from '@mui/material/Grid';
import Link from 'next/link';
import Button from '@mui/material/Button';
import React from 'react';
import { buildServerSideProps } from '../client/ssr/buildServerSideProps';
import { fetch } from '../shared/utils/fetch';

const Acreditacion = ({ accreditations }) => {
  console.log(accreditations);
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
          <AccreditationsMovements rows={accreditations} />
        </Paper>
      </Grid>
    </Layout>
  );
};

export const getServerSideProps = buildServerSideProps<any, any>(
  async (ctx) => {
    const id = 1;

    const accreditations = await fetch(`/accreditation/${id}`);

    return { accreditations };
  },
);
export default Acreditacion;
