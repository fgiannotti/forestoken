import Layout from '../client/layouts/dashboard';
import { buildServerSideProps } from '../client/ssr/buildServerSideProps';
import { fetch } from '../shared/utils/fetch';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import MovementsList from '../client/components/MovementsList';

const Movimientos = ({ movements }) => {
  return (
    <Layout>
      <Typography
        component="h2"
        variant="h6"
        sx={{
          fontWeight: '400',
          fontSize: '1.5rem',
          color: 'gray',
        }}
        gutterBottom
      >
        Movimientos Recientes
      </Typography>
      <MovementsList movements={movements} />
    </Layout>
  );
};

export const getServerSideProps = buildServerSideProps<any, any>(async () => {
  const userId = '1';
  const movements = await fetch(`/movements?userId=${userId}`);
  return { movements };
});

export default Movimientos;
