import * as React from 'react';
import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import MovementsList from '../../client/components/MovementsList';

const columns: GridColDef[] = [
  {
    field: 'date',
    headerName: 'Fecha',
    minWidth: 100,
    flex: 1,
    editable: false,
    valueGetter: (params: GridValueGetterParams) =>
      new Date(params.row.date).toLocaleString('es-AR'),
  },
  {
    field: 'typeOfWood',
    headerName: 'Tipo de árbol',
    minWidth: 100,
    flex: 1,
    editable: false,
  },
  {
    field: 'quantity',
    headerName: 'Cantidad',
    minWidth: 100,
    flex: 1,
    editable: false,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row?.quantity} tn`,
  },
  {
    field: 'state',
    headerName: 'Estado de solicitud',
    minWidth: 100,
    flex: 1,
    editable: false,
  },
];

const AccreditationMovements = ({ rows = [] }) => {
  return (
    <React.Fragment>
      <MovementsList
        movements={rows}
        columns={columns}
        title={'Solicitudes de acreditación recientes'}
      />
    </React.Fragment>
  );
};

export default AccreditationMovements;
