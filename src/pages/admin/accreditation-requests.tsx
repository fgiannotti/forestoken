import * as React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Link from 'next/link';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { Button } from '@mui/material';

const AccreditationRequests = ({ accreditations = [] }) => {
  return (
    <div>
      <div style={styles.header}>
        <Typography component="h2" variant="h6" sx={styles.title} gutterBottom>
          Acreditaciones Pendientes
        </Typography>
      </div>
      <Paper style={styles.paper}>
        <Table sx={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell align="left">Fecha</TableCell>
              <TableCell align="left">Típo de Árbol</TableCell>
              <TableCell align="left">Cantidad</TableCell>
              <TableCell align="right">Estado</TableCell>
              <TableCell align="right">Acción</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accreditations.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.typeOfWood}</TableCell>
                <TableCell>{row.quantity} tn</TableCell>
                <TableCell align="right">{row.state}</TableCell>
                <TableCell align="right">
                  <Link href={`/accreditation/${row.id}`} style={styles.button}>
                    <Button variant="outlined">
                      <ZoomInIcon />
                      Ver
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
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
