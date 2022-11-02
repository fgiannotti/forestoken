import Layout from '../../client/layouts/dashboard';
import Grid from '@mui/material/Grid';
import Link from 'next/link';
import Button from '@mui/material/Button';
import React from 'react';
import { buildServerSideProps } from '../../client/ssr/buildServerSideProps';
import { fetch } from '../../shared/utils/fetch';
import AffiliatesList from './components/AffiliatesList';

const Affiliates = ({ affiliates }) => {
  return (
    <Layout>
      <h1>Comercios Adheridos</h1>
      <Link href="/affiliates/new-affiliate">
        <Button variant="contained" color="primary">
          Nuevo comercio adherido
        </Button>
      </Link>
      <Grid item xs={12} key={3}>
        <AffiliatesList affiliates={affiliates} />
      </Grid>
    </Layout>
  );
};

export const getServerSideProps = buildServerSideProps<any, any>(async () => {
  const affiliates = await fetch(`/affiliates/`);
  return { affiliates };
});

export default Affiliates;
