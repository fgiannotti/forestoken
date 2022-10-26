import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { FC } from 'react';
import Paper from '@mui/material/Paper';

const AccreditationMovements: FC = ({ rows = [] }) => {
  return (
    <React.Fragment>
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
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.typeOfWood}</TableCell>
                <TableCell>{row.quantity} tn</TableCell>
                <TableCell align="right">{row.state}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Link href="#" style={styles.link}>
          VER MÁS MOVIMIENTOS
        </Link>
      </Paper>
    </React.Fragment>
  );
};

export default AccreditationMovements;

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
