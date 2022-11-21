import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import PDFActions from '../PDF/PDFActions';
import ComercialContractPDF from '../PDF/ComercialContractPDF';
import ReactPDF from '@react-pdf/renderer';

export default function ComercialContract({
  handleNext,
  handleBack,
  values,
  setValues,
}) {
  const [isRendered, setIsRendered] = React.useState(false);
  const handleSubmit = () => {
    handleNext();
  };

  useEffect(() => {
    setIsRendered(true);
  }, []);

  useEffect(() => {
    const script = async () => {
      const blob = await ReactPDF.pdf(
        <ComercialContractPDF values={values} />,
      ).toBlob();
      const file = new File([blob], 'ComercialContract.pdf', {
        type: 'application/pdf',
      });
      setValues({ ...values, pdfRightsContract: file });
    };
    script();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <Box my={3}>
        {isRendered && (
          <PDFActions
            fileName={'Contrato comercial Forestoken.pdf'}
            PDFdoc={<ComercialContractPDF values={values} />}
            initialValue={false}
          />
        )}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button sx={{ mr: 1 }} onClick={() => handleBack()}>
            Anterior
          </Button>
          <Button color="primary" type="submit">
            Siguiente
          </Button>
        </Box>
      </Box>
    </form>
  );
}
