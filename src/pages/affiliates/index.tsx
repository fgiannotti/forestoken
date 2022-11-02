import Layout from '../../client/layouts/dashboard';
import Grid from '@mui/material/Grid';
import Link from 'next/link';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import React from 'react';
import { buildServerSideProps } from '../../client/ssr/buildServerSideProps';
import { fetch } from '../../shared/utils/fetch';
import AffiliatesList from './components/AffiliatesList';
import Typography from '@mui/material/Typography';

const Affiliates = ({ affiliates }) => {
  return (
    <Layout>
      <Box display={'flex'} width={'100%'} justifyContent={'space-between'}>
        <Typography
          component="h2"
          variant="h6"
          sx={{
            fontWeight: '400',
            fontSize: '1.5rem',
            color: 'gray',
            marginLeft: '5rem',
          }}
          gutterBottom
        >
          Comercios Adheridos
        </Typography>
        <Link href="/affiliates/new-affiliate">
          <Button
            variant="contained"
            color="primary"
            style={{ marginRight: '4rem' }}
          >
            Nuevo comercio adherido
          </Button>
        </Link>
      </Box>
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
