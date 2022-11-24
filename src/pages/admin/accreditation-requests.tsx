import * as React from 'react';
import Link from 'next/link';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { Box, Button, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import SelectEstadoSolicitud from '../../client/components/SelectAccreditationState';
import axios from 'axios';

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
  const [stateFilter, setStateFilter] = React.useState('all'),
    [stateFiltered, setStateFiltered] = React.useState(accreditations);

  console.log(stateFilter != 'all'? `/accreditations/admin/${stateFilter}`: `/accreditations/admin/all`)

  React.useEffect(() => {
    axios
      .get(
        `${stateFilter != 'all'
            ? `/accreditations/admin/${stateFilter}`
            : `/accreditations/admin/all`
        }`,
      )
      .then((res) => {
        setStateFiltered(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [stateFilter]);
  
  return (
    <div>
      <div style={styles.header}>
        <Typography component="h2" variant="h6" sx={styles.title} gutterBottom>
          Solicitudes de acreditaciones pendientes de aprobación
        </Typography>
        <SelectEstadoSolicitud
          stateFilter={stateFilter}
          setStateFilter={setStateFilter}
        />
      </div>
      <Box sx={{ height: 500, backgroundColor: 'white' }}>
        <DataGrid
          rows={stateFiltered}
          columns={columns}
          pageSize={7}
          rowsPerPageOptions={[7]}
          disableSelectionOnClick
        />
      </Box>
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
