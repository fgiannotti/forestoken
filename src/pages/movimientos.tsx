import Layout from '../client/layouts/dashboard';
import { buildServerSideProps } from '../client/ssr/buildServerSideProps';
import { fetch } from '../shared/utils/fetch';
import * as React from 'react';
import MovementsList from 'src/client/components/MovementsList';
import { UserDataContext } from 'src/client/ssr/userData';
import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  {
    field: 'date',
    headerName: 'Fecha',
    minWidth: 250,
    flex: 1,
    editable: false,
    valueGetter: (params: GridValueGetterParams) =>
      params.row.date?.split('T')[0],
  },
  {
    field: 'description',
    headerName: 'Descripción',
    minWidth: 250,
    flex: 1,
    editable: false,
  },
  {
    field: 'amount',
    headerName: 'Monto',
    type: 'number',
    minWidth: 100,
    flex: 1,
    editable: false,
    renderCell: (params: GridValueGetterParams) => {
      return (
        <span
          style={{
            fontWeight: !params.row?.burned ? 'bold' : 'normal',
            whiteSpace: 'nowrap',
          }}
        >
          {params.row?.burned ? '-' : ''}${params.row?.amount}
        </span>
      );
    },
  },
];

const Movimientos = ({ movements, userData }) => {
  return (
    <UserDataContext.Provider value={{ user: userData }}>
      <Layout>
        <MovementsList
          movements={movements}
          columns={columns}
          title={'Movimientos Recientes'}
        />
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
