import React, { useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';

export default function Confirm({ handleBack }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [date, setDate] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = () => {
    // Remove unwanted properties from formValue object
    const form = {};
    // Do whatever with the values
    console.log(form);
    // Show last component or success message
  };

  return (
    <>
      <List disablePadding>
        <ListItem>
          <ListItemText
            primary="First Name"
            secondary={firstName || 'Not Provided'}
          />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText
            primary="Last Name"
            secondary={lastName || 'Not Provided'}
          />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText
            primary="Email Address"
            secondary={email || 'Not Provided'}
          />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText primary="Gender" secondary={gender || 'Not Provided'} />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText
            primary="Date of birth"
            secondary={date || 'Not Provided'}
          />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText primary="City" secondary={city || 'Not Provided'} />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText primary="phone" secondary={phone || 'Not Provided'} />
        </ListItem>
      </List>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
        <Button sx={{ mr: 1 }} onClick={() => handleBack()}>
          Back
        </Button>
        <Button variant="contained" color="success" onClick={handleSubmit}>
          Confirm & Continue
        </Button>
      </Box>
    </>
  );
}
