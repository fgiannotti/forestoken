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
import ComercialContract from './ComercialContract';
import axios from 'axios';

// Step titles
const labels = [
  'Contrato de compra venta',
  'Comprobante de deposito',
  'Contrato comercial',
  'Confirmación',
];

type SaleContract = {
  firstName: string;
  lastName: string;
  email: string;
  tipoArbol: string;
  toneladas: string;
  pdf: object;
};

type DepositCert = {
  date: string;
  phone: string;
  agreenment: boolean;
  pdf: object;
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

  const [depositCertValue, setDepositCertValue] = React.useState<DepositCert>({
    date: '',
    phone: '',
    agreenment: false,
    pdf: {},
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
        return (
          <DepositCert
            handleNext={handleNext}
            handleBack={handleBack}
            values={depositCertValue}
            setValues={setDepositCertValue}
          />
        );
      case 2:
        return (
          <ComercialContract
            handleNext={handleNext}
            handleBack={handleBack}
            values={saleContractValue}
          />
        );
      case 3:
        return (
          <Confirm
            handleBack={handleBack}
            handleNext={handleNext}
            valuesContract={saleContractValue}
            valuesDeposit={depositCertValue}
          />
        );
      case 4:
        return <Success />;
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
