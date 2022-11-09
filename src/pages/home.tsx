import * as React from 'react';
import Grid from '@mui/material/Grid';
import Dashboard from '../client/layouts/dashboard';
import Balance from '../client/components/sectionsHome/Balance';
import Cotizacion from '../client/components/sectionsHome/Cotizacion';
import Movimientos from '../client/components/sectionsHome/Movements';
import { buildServerSideProps } from '../client/ssr/buildServerSideProps';
import { UserDataContext } from 'src/client/ssr/userData';

const Home = ({ homeData, userData }) => {
  return (
    <UserDataContext.Provider value={{ user: userData }}>
      <Dashboard>
        <Grid container spacing={4}>
          <Grid item lg={8} md={6} xs={12}>
            <Balance money={homeData.money} tokens={homeData.tokens} />
            <Movimientos
              movements={homeData.last_movements}
              userId={userData.user}
            />
          </Grid>
          <Grid item lg={4} md={6} xs={12}>
            <Cotizacion token_price={homeData.token_price} />
          </Grid>
        </Grid>
      </Dashboard>
    </UserDataContext.Provider>
  );
};

export const getServerSideProps = buildServerSideProps<any, any>(
  async (context) => {
    const baseUrl = `http://${context.req.headers.host}`;
    const { userData } = context.req.cookies;
    const [, userId, , userImage, , userName] = userData
      ? userData.split('|')
      : [];
    if (!userId) {
      context.res.writeHead(302, { Location: '/' });
    }

    const home = await fetch(`${baseUrl}/views/home`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        user_id: `${userId}`,
      },
    });
    const homeData = await home.json();

    return {
      homeData,
      userData: {
        user: userId,
        name: userName,
        image: userImage,
      },
    };
  },
);

export default Home;
