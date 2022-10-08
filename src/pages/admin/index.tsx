import AdminLayout from '../../client/layouts/dashboard';
import AccreditationRequests from './accreditation-requests';
import { buildServerSideProps } from '../../client/ssr/buildServerSideProps';
import { fetch } from '../../shared/utils/fetch';

const Admin = () => {
  return (
    <div>
      <h1>Admin</h1>
      <AccreditationRequests />
    </div>
  );
};

Admin.layout = AdminLayout;

export const getServerSideProps = buildServerSideProps<any, any>(
  async (ctx) => {
    const id = 1;

    const accreditations = await fetch(`/accreditation/${id}`);

    return { accreditations };
  },
);

export default Admin;
