import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

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

const MovementsList = ({ movements }) => {
  return (
    <Box sx={{ height: 500 }}>
      <DataGrid
        rows={movements}
        columns={columns}
        pageSize={7}
        rowsPerPageOptions={[7]}
        disableSelectionOnClick
      />
    </Box>
  );
};

export default MovementsList;
