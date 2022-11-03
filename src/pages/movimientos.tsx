import Layout from '../client/layouts/dashboard';
import { buildServerSideProps } from '../client/ssr/buildServerSideProps';
import { fetch } from '../shared/utils/fetch';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import MovementsList from 'src/client/components/MovementsList';
import { UserDataContext } from 'src/client/ssr/userData';

const Movimientos = ({ movements, userData }) => {
  return (
    <UserDataContext.Provider value={{ user: userData }}>
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
    const movements = await fetch(`/movements?userId=${userId}`);
    return {
      movements,
      userData: {
        user: userId,
        name: userName,
        image: userImage,
      },
    };
  },
);

export default Movimientos;
