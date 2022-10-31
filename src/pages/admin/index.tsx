import AdminLayout from '../../client/layouts/dashboard';
import AccreditationRequests from './accreditation-requests';
import { buildServerSideProps } from '../../client/ssr/buildServerSideProps';
import { fetch } from '../../shared/utils/fetch';
import { Toaster } from 'react-hot-toast';

const Admin = ({ accreditations }) => {
  return (
    <div>
      <h1>Admin</h1>
      <Toaster position="bottom-center" />
      <AccreditationRequests accreditations={accreditations} />
    </div>
  );
};

Admin.layout = AdminLayout;

export const getServerSideProps = buildServerSideProps<any, any>(
  async (ctx) => {
    const id = 1; //TODO: get id from session

    const accreditations = await fetch(`/accreditations/${id}`);
    accreditations.map((accreditation) => {
      if (accreditation.state === 'Generated') accreditation.state = 'Generada';
      if (accreditation.state === 'Approved') accreditation.state = 'Aprobada';
      if (accreditation.state === 'Rejected') accreditation.state = 'Rechazada';
      if (accreditation.state === 'Minted') accreditation.state = 'Minteada';
    });
    return { accreditations };
  },
);

export default Admin;
