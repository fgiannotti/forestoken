import Grid from '@mui/material/Grid';
import Dashboard from '../client/layouts/dashboard';
import Balance from '../client/components/sectionsHome/Balance';
import Cotizacion from '../client/components/sectionsHome/Cotizacion';
import Movimientos from '../client/components/sectionsHome/Movements';
import { buildServerSideProps } from '../client/ssr/buildServerSideProps';


const Home = ({ homeData }) => {
  console.log(homeData)
  return (
    <Dashboard>
      <Grid container spacing={4}>
        <Grid item lg={8} md={6} xs={12}>
          <Balance money={homeData.money} tokens={homeData.tokens}/>
          <Movimientos movements={homeData.last_movements} />
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <Cotizacion token_price={homeData.token_price}/>
        </Grid>
      </Grid>
    </Dashboard>
  );
};

export const getServerSideProps = buildServerSideProps<any, any>(
  async (context) => {
    const id = 1; //TODO: get id from session
    
    const home = await fetch(`http://localhost:3000/views/home`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'user_id': `${id}`,
      }
    });
    const homeData = await home.json();
    return { homeData };
  },
);

export default Home;
