import Layout from '../client/layouts/dashboard';
import AccreditationsMovements from './accreditation/accreditation-movements';
import Grid from '@mui/material/Grid';
import Link from 'next/link';
import Button from '@mui/material/Button';
import React from 'react';
import { buildServerSideProps } from '../client/ssr/buildServerSideProps';
import { fetch } from '../shared/utils/fetch';
import { UserDataContext } from 'src/client/ssr/userData';

const Accreditation = ({ accreditations, userData }) => {
  return (
    <UserDataContext.Provider value={{ user: userData }}>
      <Layout>
        <Link href={`/accreditations/new-request`}>
          <Button variant="contained" color="primary">
            Nueva solicitud
          </Button>
        </Link>
        <Grid item xs={12} key={3} maxHeight={500}>
          <AccreditationsMovements rows={accreditations} userId={userData.user} />
        </Grid>
      </Layout>
    </UserDataContext.Provider>
  );
};

export const getServerSideProps = buildServerSideProps<any, any>(async (ctx) => {
  const { userData } = ctx.req.cookies;
  const [, userId, , userImage, , userName] = userData ? userData.split('|') : [];
  if (!userId) {
    console.log('no se recibio la cookie');
  }
  const accreditations = await fetch(`/accreditations/${userId}`);
  return {
    accreditations,
    userData: {
      user: userId,
      name: userName,
      image: userImage,
    },
  };
});

export default Accreditation;
