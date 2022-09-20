import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';

export default function SecondStep({ handleNext, handleBack }) {
  const [city, setCity] = useState('');
  const [date, setDate] = useState('');
  const [phone, setPhone] = useState('');
  const [agreenemt, setAgreenemt] = useState(false);

  const onClickBack = () => {
    handleBack();
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="City"
            name="city"
            placeholder="Enter your city"
            value={city}
            onChange={({ target }) => setCity(target.value)}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            label="Date of birth"
            name="date"
            type="date"
            defaultValue={date}
            onChange={({ target }) => setDate(target.value)}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Phone number"
            name="phone"
            placeholder="i.e: xxx-xxx-xxxx"
            value={phone}
            onChange={({ target }) => setPhone(target.value)}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={agreenemt}
                onChange={({ target }) => setAgreenemt(target.checked)}
                name="agreenemt"
                color="primary"
                required
              />
            }
            label="Agree to terms and conditions"
          />
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
        <Button sx={{ mr: 1 }} onClick={() => handleBack()}>
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleNext()}
        >
          Next
        </Button>
      </Box>
    </>
  );
}
