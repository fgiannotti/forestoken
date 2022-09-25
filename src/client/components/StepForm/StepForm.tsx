import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import SaleContract from './SaleContract';
import DepositCert from './DepositCert';
import Confirm from './Confirm';
import Success from './Success';
import useFormContext from './Context';

// Step titles
const labels = [
  'Contrato de compra venta',
  'Comprobante de deposito',
  'Contrato comercial',
  'Confirmation',
];

type SaleContract = {
  firstName: string;
  lastName: string;
  email: string;
  tipoArbol: string;
  toneladas: string;
};

const StepForm = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [saleContractValue, setSaleContractValue] =
    React.useState<SaleContract>({
      firstName: '',
      lastName: '',
      email: '',
      tipoArbol: '',
      toneladas: '',
    });

  const handleSteps = (step: number) => {
    switch (step) {
      case 0:
        return (
          <SaleContract
            handleNext={handleNext}
            values={saleContractValue}
            setValues={setSaleContractValue}
          />
        );
      case 1:
        return <DepositCert handleNext={handleNext} handleBack={handleBack} />;
      case 2:
        return <Confirm handleBack={handleBack} />;
      default:
        throw new Error('Unknown step');
    }
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <>
      {activeStep === labels.length ? (
        <Success />
      ) : (
        <>
          <Box sx={{ my: 5 }}>
            <Typography variant="h4" align="center">
              Pasos para su solicitud
            </Typography>
            <Typography variant="subtitle2" align="center" sx={{ mt: 2 }}>
              Forestoken le pedira algunos datos para poder realizar su
              solicitud
            </Typography>
          </Box>
          <Stepper activeStep={activeStep} sx={{ py: 3 }} alternativeLabel>
            {labels.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {handleSteps(activeStep)}
        </>
      )}
    </>
  );
};

export default StepForm;
