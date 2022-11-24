import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import SelectEstadoSolicitud from '../../client/components/SelectAccreditationState';
import { Box, Typography } from '@mui/material';
import axios from 'axios';
import { buildServerSideProps } from '../../client/ssr/buildServerSideProps';

const columns: GridColDef[] = [
  {
    field: 'date',
    headerName: 'Fecha',
    minWidth: 100,
    flex: 1,
    editable: false,
    valueGetter: (params: GridValueGetterParams) => params.row?.depositDate,
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
    valueGetter: (params: GridValueGetterParams) => `${params.row?.quantity} tn`,
  },
  {
    field: 'state',
    headerName: 'Estado de solicitud',
    minWidth: 100,
    flex: 1,
    editable: false,
  },
];

const AccreditationMovements = ({ rows = [], userId }) => {
  const [stateFilter, setStateFilter] = React.useState('all'),
    [movementsFiltered, setMovementsFiltered] = React.useState(rows);

  React.useEffect(() => {
    var url = `/accreditations/${userId}`;
    if (stateFilter != 'all') {
      url = `/accreditations/filter/userId/${userId}?state=${stateFilter}`;
    }
    axios
      .get(url)
      .then((res) => {
        setMovementsFiltered(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [stateFilter]);

  return (
    <React.Fragment>
      <div style={styles.header}>
        <Typography component="h2" variant="h6" sx={styles.title} gutterBottom>
          Solicitudes de acreditación recientes
        </Typography>
        <SelectEstadoSolicitud stateFilter={stateFilter} setStateFilter={setStateFilter} />
      </div>
      <Box sx={{ height: 500, backgroundColor: 'white' }}>
        <DataGrid
          rows={movementsFiltered}
          columns={columns}
          pageSize={7}
          rowsPerPageOptions={[7]}
          disableSelectionOnClick
        />
      </Box>
    </React.Fragment>
  );
};

export default AccreditationMovements;

const styles = {
  header: {
    display: 'flex',
    flexDirection: 'row' as const,
    justifyContent: 'space-between',
    paddingTop: '5%',
  },
  title: {
    fontWeight: '400',
    fontSize: '1.5rem',
    color: 'gray',
  },
};
