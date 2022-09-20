import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import Confirm from './Confirm';
import Success from './Success';
import useFormContext from './Context';

// Step titles
const labels = ['First Step', 'Second Step', 'Confirmation'];

const StepForm = () => {
  const { variableState, setVariableState } = useFormContext();
  const [activeStep, setActiveStep] = React.useState(0);
  const handleSteps = (step: number) => {
    switch (step) {
      case 0:
        return <FirstStep handleNext={handleNext} />;
      case 1:
        return <SecondStep handleNext={handleNext} handleBack={handleBack} />;
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
              Multi Step Form
              {variableState}
              cons
            </Typography>
            <Typography variant="subtitle2" align="center" sx={{ mt: 2 }}>
              React Material UI multi step form with basic form validation
              logic.
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
