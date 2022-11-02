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
      <Link href="/accreditation/new-request">
        <Button variant="contained" color="primary">
          Generar nueva solicitud
        </Button>
      </Link>
      <Grid item xs={12} key={3}>
        <AccreditationsMovements rows={accreditations} />
      </Grid>
    </Layout>
  );
};

export const getServerSideProps = buildServerSideProps<any, any>(
  async (context) => {
    const baseUrl = `http://${context.req.headers.host}`;
    const { userData } = context.req.cookies;
    let [, userId, , userImage, , userName] = userData
      ? userData.split('|')
      : [];
    if (!userId) {
      console.log('no se recibio la cookie');
    }

    const accreditations = await fetch(`${baseUrl}/accreditations/${userId}`);
    accreditations.map((accreditation) => {
      if (accreditation.state === 'Generated') accreditation.state = 'Generada';
      if (accreditation.state === 'Approved') accreditation.state = 'Aprobada';
      if (accreditation.state === 'Rejected') accreditation.state = 'Rechazada';
      if (accreditation.state === 'Minted') accreditation.state = 'Tokens emitidos';
    });

    console.log(accreditations);
    return { accreditations };
  },
);
export default Accreditation;
