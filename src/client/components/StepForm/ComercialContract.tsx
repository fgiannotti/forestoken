import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import PDFactions from '../PDF/PDFactions';
import ComercialContractPDF from '../PDF/ComercialContractPDF';

export default function ComercialContract({ handleNext, handleBack, values }) {
  console.log(values);

  const handleSubmit = () => {
    handleNext();
  };

  return (
    <form onSubmit={handleSubmit}>
      <PDFactions PDFdoc={<ComercialContractPDF values={values} />} />

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
