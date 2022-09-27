import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';

export default function ComercialContract({
  handleNext,
  handleBack,
  values,
  setValues,
}) {
  console.log(values);

  const handleSubmit = () => {
    handleNext();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography color="text.secondary" align="center">
            Ingrese el comprobante de deposito emitido por nuestro Oráculo
          </Typography>
          <TextField
            fullWidth
            name="comprobante"
            type={'file'}
            inputProps={{ accept: 'application/pdf' }}
            onChange={({ target }) =>
              setValues({ ...values, pdf: target.files[0] })
            }
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            label="Fecha de expiración"
            name="date"
            type="date"
            defaultValue={values.date}
            onChange={({ target }) =>
              setValues({ ...values, date: target.value })
            }
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Teléfono de contacto"
            name="phone"
            placeholder="i.e: xxx-xxx-xxxx"
            value={values.phone}
            onChange={({ target }) =>
              setValues({ ...values, phone: target.value })
            }
            required
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={values.agreenment}
                onChange={({ target }) =>
                  setValues({ ...values, agreenment: target.checked })
                }
                name="agreenemt"
                color="primary"
                required
              />
            }
            label="Acepto los terminos y condiciones"
          />
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
        <Button sx={{ mr: 1 }} onClick={() => handleBack()}>
          Anterior
        </Button>
        <Button variant="contained" color="primary" type="submit">
          Siguiente
        </Button>
      </Box>
    </form>
  );
}
