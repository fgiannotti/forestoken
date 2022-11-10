import Layout from '../../client/layouts/dashboard';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import React from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useRouter } from 'next/router';

const NewAffiliate = () => {
  const [values, setValues] = React.useState({
    name: '',
    location: '',
    link: '',
  });
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    axios
      .post('/affiliates', data)
      .then(() => {
        router.push('/affiliates');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Layout>
      <h1>Nuevo comercio adherido</h1>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} my={3} justifyContent={'center'}>
          <Grid item xs={12} sm={6} mb={2} spacing={2}>
            <TextField
              margin={'normal'}
              fullWidth
              label="Nombre"
              name="name"
              placeholder="Nombre del comercio"
              value={values.name}
              onChange={({ target }) =>
                setValues({ ...values, name: target.value })
              }
              required
            />
            <TextField
              margin={'normal'}
              fullWidth
              label="Dirección"
              name="location"
              placeholder="Dirección del comercio"
              value={values.location}
              onChange={({ target }) =>
                setValues({ ...values, location: target.value })
              }
              required
            />
            <TextField
              margin={'normal'}
              fullWidth
              label="Google Maps"
              name="link"
              placeholder="URL de Google Maps"
              value={values.link}
              onChange={({ target }) =>
                setValues({ ...values, link: target.value })
              }
              required
            />
            <Button
              fullWidth
              variant="outlined"
              sx={{ mt: 3, ml: 1 }}
              color="primary"
              type="submit"
            >
              Guardar
            </Button>
          </Grid>
        </Grid>
      </form>
    </Layout>
  );
};

export default NewAffiliate;
