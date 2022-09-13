import Layout from '../../client/layouts/dashboard';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import FormSolicitud from './form-solicitud';
import Stepper from '../../client/components/Stepper';

const NuevaSolicitud = () => {
  return (
    <Layout>
      <h1>Nueva solicitud</h1>
      <FormSolicitud />
      <Button variant="contained">Confirmar</Button>
    </Layout>
  );
};

export default NuevaSolicitud;
