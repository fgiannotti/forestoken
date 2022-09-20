import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { buildServerSideProps } from '../ssr/buildServerSideProps';
import { fetch } from '../../shared/utils/fetch';
import { BlogPost } from '../../shared/types/blog-post';
import { FC } from 'react';
import Paper from '@mui/material/Paper';
import SelectMovimientos from './dropdown';

// Generate Order Data
function createData(
  id: number,
  date: string,
  name: string,
  shipTo: string,
  paymentMethod: string,
  amount: number,
) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(
    0,
    '16/03/2019',
    'Elvis Presley',
    'Tupelo, MS',
    'VISA ⠀•••• 3719',
    312.44,
  ),
  createData(
    1,
    '23/03/2019',
    'Paul McCartney',
    'London, UK',
    'VISA ⠀•••• 2574',
    866.99,
  ),
  createData(
    2,
    '18/03/2019',
    'Tom Scholz',
    'Boston, MA',
    'MC ⠀•••• 1253',
    100.81,
  ),
  createData(
    3,
    '07/03/2019',
    'Michael Jackson',
    'Gary, IN',
    'AMEX ⠀•••• 2000',
    654.39,
  ),
  createData(
    4,
    '15/03/2019',
    'Bruce Springsteen',
    'Long Branch, NJ',
    'VISA ⠀•••• 5919',
    212.79,
  ),
  createData(
    5,
    '15/03/2019',
    'Bruce Springsteen',
    'Long Branch, NJ',
    'VISA ⠀•••• 5919',
    212.79,
  ),
];

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

type TBlogProps = {
  post: BlogPost;
};

type TBlogQuery = {
  id: string;
};

const Movements: FC<TBlogProps> = () => {
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
          <TableHead >
            <TableRow>
              <TableCell padding = 'checkbox' align="center">Fecha</TableCell>
              <TableCell align="left">Descripción</TableCell>
              <TableCell padding = 'checkbox' align="right">Monto</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id} >
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell align="right">{`$${row.amount}`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Link
          href="src/client/components/Movements#"
          onClick={preventDefault}
          style={styles.link}
        >
          VER MÁS MOVIMIENTOS
        </Link>
      </Paper>
    </React.Fragment>
  );
};

export const getServerSideProps = buildServerSideProps<TBlogProps, TBlogQuery>(
  async (ctx) => {
    const id = ctx.query.id;
    console.log('id', id);

    const post = await fetch(`/api/blog-posts/${id}`);

    return { post };
  },
);

export default Movements;

const styles = {
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: "5%",
  },
  paper: {
    padding: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    fontWeight: '400',
    fontSize: '1.5rem',
    color: 'gray',
  },
  link: {
    marginTop: "10px",
    textDecoration: "none",
    fontWeight: '600',
    fontSize: '0.8rem',
    color:"primary"
  },
  table: {
    fontSize: '2rem'
  }
}
