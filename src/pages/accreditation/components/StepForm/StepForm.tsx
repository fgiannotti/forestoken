import React from 'react';
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

// Step titles
const labels = [
  'Contrato de compraventa',
  'Comprobante de depósito',
  'Contrato comercial',
  'Confirmación',
];

type SaleContract = {
  firstName: string;
  lastName: string;
  email: string;
  typeOfWood: string;
  quantity: string;
  pdf: object;
};

type DepositCert = {
  depositDate: string;
  phone: string;
  agreement: boolean;
  pdf: object;
};

const StepForm = ({ userId }) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [saleContractValue, setSaleContractValue] =
    React.useState<SaleContract>({
      firstName: '',
      lastName: '',
      email: '',
      typeOfWood: '',
      quantity: '',
      pdf: {},
    });

  const [depositCertValue, setDepositCertValue] = React.useState<DepositCert>({
    depositDate: new Date().toLocaleString('es-AR'),
    phone: '',
    agreement: false,
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
            setValues={setSaleContractValue}
          />
        );
      case 3:
        return (
          <Confirm
            handleBack={handleBack}
            handleNext={handleNext}
            valuesContract={saleContractValue}
            valuesDeposit={depositCertValue}
            userId={userId}
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
        <Box mx={'auto'} maxWidth={'lg'} justifyContent={'center'}>
          <Box sx={{ my: 5 }}>
            <Typography variant="h4" align="center">
              Pasos para generar su solicitud
            </Typography>
            <Typography variant="subtitle2" align="center" sx={{ mt: 2 }}>
              Forestoken le pedirá algunos datos para poder procesar su
              solicitud de tokenización de madera.
            </Typography>
          </Box>
          <Stepper activeStep={activeStep} sx={{ py: 3 }} alternativeLabel>
            {labels.map((label) => (
              <Step
                sx={{
                  '& .MuiStepLabel-root .Mui-completed': {
                    color: 'secondary.main',
                  },
                  '& .MuiStepLabel-root .Mui-active': {
                    color: 'secondary.main',
                  },
                }}
                key={label}
              >
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {handleSteps(activeStep)}
        </Box>
      )}
    </>
  );
};

export default StepForm;
