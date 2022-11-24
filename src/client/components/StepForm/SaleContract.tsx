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
            value={values?.firstName}
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
            value={values?.lastName}
            onChange={({ target }) =>
              setValues({ ...values, lastName: target.value })
            }
            required
          />
        </Grid>
        <Grid item xs={12} sm={6} mb={2}>
          <TextField
            fullWidth
            label="Mail"
            name="email"
            type="email"
            value={values?.email}
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
              label="Tipo de madera"
              name="typeOfWood"
              value={values?.typeOfWood}
              onChange={({ target }) =>
                setValues({ ...values, typeOfWood: target.value })
              }
              required
            >
              <option value="" selected disabled></option>
              <option value="Pino">Pino</option>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Cantidad de árboles"
              fullWidth
              name="quantity"
              placeholder="Cantidad en toneladas"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">tn</InputAdornment>
                ),
              }}
              value={values?.quantity}
              onChange={({ target }) =>
                setValues({ ...values, quantity: target.value })
              }
              required
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item pt={3} xs={12}>
        <Typography color="text.secondary" align="center">
          Ingrese el contrato de compraventa emitido por nuestro oráculo:
        </Typography>
        <TextField
          fullWidth
          name="compraVenta"
          type={'file'}
          inputProps={{ accept: 'application/pdf' }}
          onChange={({ target }) =>
            setValues({
              ...values,
              pdf: (target as HTMLInputElement)?.files[0],
            })
          }
          required
        />
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button sx={{ mt: 3, ml: 1 }} color="primary" type="submit">
          Siguiente
        </Button>
      </Box>
    </form>
  );
}
