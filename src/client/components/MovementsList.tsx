import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const MovementsList = ({ movements, columns }) => {
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
