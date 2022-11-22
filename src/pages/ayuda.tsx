import { Typography } from '@mui/material';
import ControlledAccordions from 'src/client/components/ayuda/accordion';
import Layout from '../client/layouts/dashboard';
import FAQ from '../client/components/ayuda/ayuda.data';

const Ayuda = () => {
  return (
    <Layout>
      <ControlledAccordions title={'Centro de ayuda'} data={FAQ}></ControlledAccordions>
    </Layout>
  );
};

export default Ayuda;


