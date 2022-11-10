import Layout from '../../client/layouts/dashboard';
import StepForm from './components/StepForm/StepForm';
import { UserDataContext } from 'src/client/ssr/userData';
import { buildServerSideProps } from '../../client/ssr/buildServerSideProps';

const NewRequest = ({ userData }) => {
  return (
    <UserDataContext.Provider value={{ user: userData }}>
      <Layout>
        <StepForm />
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
export default NewRequest;
