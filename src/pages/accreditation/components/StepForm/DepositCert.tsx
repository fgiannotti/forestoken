import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';

export default function DepositCert({
  handleNext,
  handleBack,
  values,
  setValues,
}) {
  const handleSubmit = () => {
    handleNext();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} my={3}>
        <Grid item xs={12} mb={2}>
          <TextField
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            label="Fecha de emisión"
            name="date"
            type="date"
            defaultValue={values?.date}
            onChange={({ target }) =>
              setValues({ ...values, date: target.value })
            }
            required
          />
        </Grid>
        <Grid item xs={12} mb={2}>
          <TextField
            fullWidth
            label="Teléfono de contacto"
            name="phone"
            value={values?.phone}
            onChange={({ target }) =>
              setValues({ ...values, phone: target.value })
            }
          />
        </Grid>
        <Grid item xs={12} mb={2}>
          <Typography color="text.secondary" align="center">
            Ingrese el comprobante de depósito emitido por nuestro Oráculo:
          </Typography>
          <TextField
            fullWidth
            name="comprobante"
            type="file"
            inputProps={{ accept: 'application/pdf' }}
            onChange={({ target }) =>
              setValues({ ...values, pdf: target?.value[0] })
            }
            required
          />
        </Grid>
        <Grid item xs={12} mb={2}>
          <FormControlLabel
            control={
              <Checkbox
                checked={values?.agreenment}
                onChange={({ target }) =>
                  setValues({ ...values, agreenment: target.checked })
                }
                name="agreenemt"
                color="primary"
                required
              />
            }
            label="Acepto los términos y condiciones"
          />
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Button sx={{ mr: 1 }} onClick={() => handleBack()}>
          Anterior
        </Button>
        <Button color="primary" type="submit">
          Siguiente
        </Button>
      </Box>
    </form>
  );
}
