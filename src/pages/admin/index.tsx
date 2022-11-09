import AdminLayout from '../../client/layouts/dashboard';
import AccreditationRequests from './accreditation-requests';
import { buildServerSideProps } from '../../client/ssr/buildServerSideProps';
import { fetch } from '../../shared/utils/fetch';
import { Toaster } from 'react-hot-toast';
import { UserDataContext } from 'src/client/ssr/userData';
import { Box } from '@mui/material';

const Admin = ({ accreditations, userData }) => {
  return (
    <UserDataContext.Provider value={{ user: userData }}>
      <AdminLayout>
        <Box>
          <AccreditationRequests accreditations={accreditations} />
        </Box>
        <Toaster position="bottom-center" />
      </AdminLayout>
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

    const accreditations = await fetch(`/accreditations/admin/all`);
    return {
      accreditations,
      userData: {
        user: userId,
        name: userName,
        image: userImage,
      },
    };
  },
);

export default Admin;
