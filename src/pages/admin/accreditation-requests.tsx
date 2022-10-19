import { FC } from 'react';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Link from 'next/link';

const AccreditationRequests = ({ accreditations = [] }) => {
  return (
    <div>
      <h1>Accreditation Requests</h1>
      <Movements rows={accreditations} />
    </div>
  );
};

export default AccreditationRequests;

const Movements: FC = ({ rows = [] }) => {
  return (
    <>
      <div style={styles.header}>
        <Typography component="h2" variant="h6" sx={styles.title} gutterBottom>
          Movimientos Recientes
        </Typography>
      </div>
      <Paper style={styles.paper}>
        <Table size="medium" responsive sx={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell align="left">Fecha</TableCell>
              <TableCell align="left">Tipo de Arbol</TableCell>
              <TableCell align="left">Cantidad</TableCell>
              <TableCell align="right">Estado</TableCell>
              <TableCell align="right">Acción</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.typeOfWood}</TableCell>
                <TableCell>{row.quantity} tn</TableCell>
                <TableCell align="right">{row.state}</TableCell>
                <TableCell align="right">
                  <Link href={`/acreditacion/${row.id}`}>Ver</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
};

const styles = {
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: '5%',
  },
  paper: {
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
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
  },
};
