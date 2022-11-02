import React from 'react';
import Typography from '@mui/material/Typography';
import { Box, Button } from '@mui/material';
import Link from 'next/link';

export default function Success() {
  return (
    <>
      <Typography variant="h2" align="center" sx={{ py: 4 }}>
        ¡Muchas gracias!
      </Typography>
      <Typography component="p" align="center">
        Usted recibirá un mail con los detalles de su solicitud de tokenización
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <Link href="/accreditation">
          <Button variant="contained" color="primary" sx={{ mt: 4 }}>
            Volver al inicio
          </Button>
        </Link>
      </Box>
    </>
  );
}
