import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { InputAdornment } from '@mui/material';
import Typography from '@mui/material/Typography';

export default function SaleContract({ values, setValues, handleNext }) {
  const handleSubmit = () => {
    handleNext();
  };
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} my={3}>
        <Grid item xs={12} sm={6} mb={2}>
          <TextField
            fullWidth
            label="Nombre"
            name="firstName"
            placeholder="Juan"
            value={values.firstName}
            onChange={({ target }) =>
              setValues({ ...values, firstName: target.value })
            }
            required
          />
        </Grid>
        <Grid item xs={12} sm={6} mb={2}>
          <TextField
            fullWidth
            label="Apellido"
            name="lastName"
            placeholder="Perez"
            value={values.lastName}
            onChange={({ target }) =>
              setValues({ ...values, lastName: target.value })
            }
            required
          />
        </Grid>
        <Grid item xs={12} sm={6} mb={2}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            placeholder="Su email"
            type="email"
            value={values.email}
            onChange={({ target }) =>
              setValues({ ...values, email: target.value })
            }
            required
          />
        </Grid>

        <Grid container item spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              select
              SelectProps={{
                native: true,
              }}
              label="Tipo de arbol"
              name="tipoArbol"
              value={values.tipoArbol}
              onChange={({ target }) =>
                setValues({ ...values, tipoArbol: target.value })
              }
              required
            >
              <option value=""> </option>
              <option value="Pino">Pino</option>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Cantidad de Arboles"
              fullWidth
              name="toneladas"
              placeholder="Toneladas"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">tn</InputAdornment>
                ),
              }}
              value={values.toneladas}
              onChange={({ target }) =>
                setValues({ ...values, toneladas: target.value })
              }
              required
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item pt={3} xs={12}>
        <Typography color="text.secondary" align="center">
          Ingrese el Contrato de Compra Venta emitido por nuestro Oráculo
        </Typography>
        <TextField
          fullWidth
          name="compraVenta"
          type={'file'}
          inputProps={{ accept: 'application/pdf' }}
          onChange={({ target }) =>
            setValues({ ...values, pdf: target.files[0] })
          }
          required
        />
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          sx={{ mt: 3, ml: 1 }}
          color="primary"
          type="submit"
        >
          Siguiente
        </Button>
      </Box>
    </form>
  );
}
