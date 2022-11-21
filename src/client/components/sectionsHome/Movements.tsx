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
import axios from 'axios';

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

const Movements = ({ movements , userId}) => {
  const [movementsFilter, setMovementsFilter] = React.useState('all'),
    [movementsFiltered, setMovementsFiltered] = React.useState(movements);

  React.useEffect(() => {
    axios
      .get(
        `/movements?userId=${userId}${
          movementsFilter != 'all'
            ? `&movementType=${movementsFilter == 'debits' ? 1 : 0}`
            : ''
        }`,
      )
      .then((res) => {
        setMovementsFiltered(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [movementsFilter]);

  return (
    <React.Fragment>
      <div style={styles.header}>
        <Typography component="h2" variant="h6" sx={styles.title} gutterBottom>
          Movimientos Recientes
        </Typography>
        <SelectMovimientos
          movementsFilter={movementsFilter}
          setMovementsFilter={setMovementsFilter}
        />
      </div>
      <Paper sx={styles.paper}>
        <Table size="medium" sx={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell align="left">Fecha</TableCell>
              <TableCell align="left">Descripción</TableCell>
              <TableCell align="right">Monto</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movementsFiltered.length == 0? 
              <TableCell colSpan={3} style={{ textAlign: 'center' }}>No hay movimientos</TableCell> : 
              movementsFiltered?.slice(0, 6).map((row) => (
                <TableRow key={row.id}>
                  <TableCell style={{ whiteSpace: 'nowrap' }}>
                    {new Date(row.date).toLocaleString('es-AR')}
                  </TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell
                    align="right"
                    style={{
                      fontWeight: !row.burned ? 'bold' : 'normal',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {`${row.burned ? '- ' : ''}$${row.amount}`}
                  </TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
        {movements?.length > 6 && (
          <Link
            href="src/client/components/Movements#"
            onClick={preventDefault}
            sx={styles.link}
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
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
    justifyContent: 'space-between',
    paddingTop: '5%',
  },
  paper: {
    padding: 2,
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
