import Layout from '../client/layouts/dashboard';
import { buildServerSideProps } from '../client/ssr/buildServerSideProps';
import { fetch } from '../shared/utils/fetch';
import MovementsList from '../client/components/movementsList';

const Movimientos = ({ movements }) => {
  console.log(movements);
  return (
    <Layout>
      <h1>Movimientos</h1>
      <MovementsList movements={movements} />
    </Layout>
  );
};

export const getServerSideProps = buildServerSideProps<any, any>(async () => {
  const userId = '1';
  const movements = await fetch(`/movements?userId=${userId}`);
  return { movements };
});

export default Movimientos;
