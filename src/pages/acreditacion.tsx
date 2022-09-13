import Layout from '../client/layouts/dashboard';
import Paper from '@mui/material/Paper';
import Orders from '../client/components/Movements';
import Grid from '@mui/material/Grid';
import button from '@mui/material/Button';
import Link from 'next/link';

const Acreditacion = () => {
  return (
    <Layout>
      <h1>Acreditacion</h1>
      <Link href="/acreditacion/nueva-solicitud">
        <button>Nueva solicitud</button>
      </Link>
      <Grid item xs={12} key={3}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <Orders />
        </Paper>
      </Grid>
    </Layout>
  );
};

export default Acreditacion;
