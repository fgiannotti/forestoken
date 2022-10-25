import React from 'react';
import Typography from '@mui/material/Typography';

export default function Success() {
  return (
    <>
      <Typography variant="h2" align="center" sx={{ py: 4 }}>
        ¡Muchas gracias!
      </Typography>
      <Typography component="p" align="center">
        Usted recibirá un email con los detalles de su tokenización
      </Typography>
    </>
  );
}
