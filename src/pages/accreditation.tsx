import Layout from '../client/layouts/dashboard';
import AccreditationsMovements from './accreditation/accreditation-movements';
import Grid from '@mui/material/Grid';
import Link from 'next/link';
import Button from '@mui/material/Button';
import React from 'react';
import { buildServerSideProps } from '../client/ssr/buildServerSideProps';
import { fetch } from '../shared/utils/fetch';

const Accreditation = ({ accreditations }) => {
  return (
    <Layout>
      <h1>Acreditación</h1>
      <Link href="/accreditation/new-request">
        <Button variant="contained" color="primary">
          Nueva solicitud
        </Button>
      </Link>
      <Grid item xs={12} key={3} maxHeight={500}>
        <AccreditationsMovements rows={accreditations} />
      </Grid>
    </Layout>
  );
};

export const getServerSideProps = buildServerSideProps<any, any>(
  async (ctx) => {
    const id = 1; //TODO: get id from session

    const accreditations = await fetch(`/accreditations/${id}`);
    return { accreditations };
  },
);
export default Accreditation;
