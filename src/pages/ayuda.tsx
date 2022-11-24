import Layout from '../client/layouts/dashboard';
import { buildServerSideProps } from '../client/ssr/buildServerSideProps';
import { UserDataContext } from 'src/client/ssr/userData';

const Ayuda = ({ userData }) => {
  return (
    <UserDataContext.Provider value={{ user: userData }}>
      <Layout>
        <h1>Ayuda</h1>
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
    return {
      userData: {
        user: userId,
        name: userName,
        image: userImage,
      },
    };
  },
);

export default Ayuda;
