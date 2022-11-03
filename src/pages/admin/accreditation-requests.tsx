import * as React from 'react';
import Typography from '@mui/material/Typography';
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
      params.row.date?.split('T')[0],
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
      <div style={styles.header}>
        <Typography component="h2" variant="h6" sx={styles.title} gutterBottom>
          Solicitudes de acreditaciones pendientes de aprobación
        </Typography>
      </div>
      <MovementsList movements={accreditations} columns={columns} />
      {/*<TableCell>{row.date}</TableCell>
      <TableCell>{row.typeOfWood}</TableCell>
      <TableCell>{row.quantity} tn</TableCell>
      <TableCell align="right">{row.state}</TableCell>
      <TableCell align="right" sx={{display: "flex", justifyElements: "end"}}>
        <Link href={`/accreditation/${row.id}`}>
          <Button variant="outlined" sx={styles.button}>
            <ZoomInIcon />
            Ver
          </Button>
        </Link>
      </TableCell>*/}
    </div>
  );
};

export default AccreditationRequests;

const styles = {
  header: {
    display: 'flex',
    flexDirection: 'row' as const,
    justifyContent: 'space-between',
    paddingTop: '5%',
  },
  paper: {
    padding: 20,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
  },
  title: {
    fontWeight: '400',
    fontSize: '1.5rem',
    color: 'gray',
  },
  link: {
    marginTop: '10px',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '0.8rem',
    color: 'primary',
  },
  table: {
    fontSize: '2rem',
    maxHeight: '500px',
  },
  button: {
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
  },
};
