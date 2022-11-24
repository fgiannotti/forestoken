import * as React from 'react';
import Link from 'next/link';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { Button } from '@mui/material';
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
  {
    field: 'id',
    headerName: 'Acción',
    minWidth: 100,
    type: 'number',
    flex: 1,
    editable: false,
    renderCell: (params: GridValueGetterParams) => {
      return (
        <Link href={`/accreditation/${params.row?.id}`}>
          <Button variant="outlined" sx={styles.button}>
            <ZoomInIcon />
            Ver
          </Button>
        </Link>
      );
    },
  },
];

const AccreditationRequests = ({ accreditations = [] }) => {
  return (
    <div>
      <MovementsList
        movements={accreditations}
        columns={columns}
        title={'Solicitudes de acreditaciones pendientes de aprobación'}
      />
    </div>
  );
};

export default AccreditationRequests;

const styles = {
  button: {
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
  },
};
