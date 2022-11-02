import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

const AccreditationMovements = ({ rows = [] }) => {
  return (
    <React.Fragment>
      <div style={styles.header}>
        <Typography component="h2" variant="h6" sx={styles.title} gutterBottom>
          Solicitudes de acreditación recientes
        </Typography>
      </div>
      <Paper style={styles.paper}>
        <Table sx={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell align="left">Fecha</TableCell>
              <TableCell align="left">Tipo de árbol</TableCell>
              <TableCell align="left">Cantidad</TableCell>
              <TableCell align="right">Estado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {rows.length == 0? 
              <TableCell colSpan={4} style={{ textAlign: 'center' }}>No hay solicitudes generadas</TableCell> : 
              rows?.slice(0, 6).map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.typeOfWood}</TableCell>
                  <TableCell>{row.quantity} tn</TableCell>
                  <TableCell align="right">{row.state}</TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
        {rows.length > 6 && (
          <Link href="#" style={styles.link}>
            VER MÁS SOLICITUDES
          </Link>
        )}
      </Paper>
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
  },
};
