import * as React from 'react';
import Grid from '@mui/material/Grid';
import Dashboard from '../client/layouts/dashboard';
import Balance from '../client/components/sectionsHome/Balance';
import Cotizacion from '../client/components/sectionsHome/Cotizacion';
import Movimientos from '../client/components/sectionsHome/Movements';
import { buildServerSideProps } from '../client/ssr/buildServerSideProps';

export const UserContext = React.createContext({
  user: null,
});

const Home = ({ homeData, userData }) => {
  return (
    <UserContext.Provider value={{ user: userData }}>
      <Dashboard>
        <Grid container spacing={4}>
          <Grid item lg={8} md={6} xs={12}>
            <Balance money={homeData.money} tokens={homeData.tokens} />
            <Movimientos movements={homeData.last_movements} />
          </Grid>
          <Grid item lg={4} md={6} xs={12}>
            <Cotizacion token_price={homeData.token_price} />
          </Grid>
        </Grid>
      </Dashboard>
    </UserContext.Provider>
  );
};

export const getServerSideProps = buildServerSideProps<any, any>(
  async (context) => {
    const { res } = context;
    const baseUrl = `http://${context.req.headers.host}`;
    const { userData } = context.req.cookies;
    let [, userId, , userImage, , userName] = userData
      ? userData.split('|')
      : [];
    let cookies = '';
    if (!userId) {
      userId = '1';
      cookies = 'userId|1';
    }

    const home = await fetch(`${baseUrl}/views/home`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        user_id: `${userId}`,
      },
    });
    const homeData = await home.json();

    if (userId && (!userImage || !userName)) {
      const user = await fetch(`${baseUrl}/users/${userId}`);
      const userData = await user.json();
      userImage = userData.photoUrl;
      userName = userData.name;
      cookies += `|userImage|${userImage}|userName|${userName}`;
    }

    if (cookies) {
      res.setHeader('set-cookie', 'userData=' + cookies);
    }

    return {
      homeData,
      userData: {
        name: userName,
        image: userImage,
      },
    };
  },
);

export default Home;
