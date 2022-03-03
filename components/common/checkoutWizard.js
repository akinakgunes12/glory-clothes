import React from 'react';
import Stepper from '@mui/material/Stepper';
import { Step, StepLabel } from '@mui/material';

export const CheckoutWizard = ({ activeStep = 0 }) => {
  return (
    <Stepper
      activeStep={activeStep}
      alternativeLabel
      //   sx={{ '& .MuiStepper-root': { color: 'red' } }}
    >
      {['Login', 'Shipping Address', 'Payment Method', 'Place Order'].map(
        (step) => (
          <Step key={step} style={{ marginTop: '3rem', marginBottom: '-2rem' }}>
            <StepLabel>{step}</StepLabel>
          </Step>
        )
      )}
    </Stepper>
  );
};
