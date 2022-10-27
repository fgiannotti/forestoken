import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import SelectMovimientos from './SelectMovementType';

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

const Movements = ({ movements }) => {
  return (
    <React.Fragment>
      <div style={styles.header}>
        <Typography component="h2" variant="h6" sx={styles.title} gutterBottom>
          Movimientos Recientes
        </Typography>
        <SelectMovimientos />
      </div>
      <Paper style={styles.paper}>
        <Table size="medium" sx={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell align="left">
                Fecha
              </TableCell>
              <TableCell align="left">Descripción</TableCell>
              <TableCell align="right">
                Monto
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movements.slice(0, 6).map((row) => (
              <TableRow key={row.id}>
                <TableCell style={{whiteSpace: 'nowrap'}}>{row.date}</TableCell>
                <TableCell>{row.movement}</TableCell>
                <TableCell align="right" style={{fontWeight:!row.burned?'bold':'normal', whiteSpace: 'nowrap'}}>
                  {`${row.burned?'- ':''}$${row.amount}`}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {movements.length > 6 && (
          <Link
            href="src/client/components/Movements#"
            onClick={preventDefault}
            style={styles.link}
          >
            VER MÁS MOVIMIENTOS
          </Link>
        )}
      </Paper>
    </React.Fragment>
  );
};

export default Movements;

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
