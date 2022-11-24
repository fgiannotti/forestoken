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
import { UserDataContext } from 'src/client/ssr/userData';

const Affiliates = ({ affiliates, userData, isAdmin }) => {
  return (
    <UserDataContext.Provider value={{ user: userData }}>
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
          {isAdmin === 1 && (
            <Link href="/affiliates/new-affiliate">
              <Button
                variant="contained"
                color="primary"
                style={{ marginRight: '4rem' }}
              >
                Nuevo comercio adherido
              </Button>
            </Link>
          )}
        </Box>
        <Grid item xs={12} key={3}>
          <AffiliatesList affiliates={affiliates} />
        </Grid>
      </Layout>
    </UserDataContext.Provider>
  );
};

export const getServerSideProps = buildServerSideProps<any, any>(
  async (ctx) => {
    const { userData } = ctx.req.cookies;
    const [, userId, , userImage, , userName] = userData
      ? userData.split('|')
      : [];
    if (!userId) {
      console.log('no se recibio la cookie');
    }
    const affiliates = await fetch(`/affiliates/all`);
    const isAdmin = await fetch(`/users/isAdmin/${userId}`);
    return {
      affiliates,
      userData: {
        user: userId,
        name: userName,
        image: userImage,
      },
      isAdmin,
    };
  },
);

export default Affiliates;
