import React, { useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';

export default function Confirm({
  handleBack,
  handleNext,
  valuesDeposit,
  valuesContract,
}) {
  const handleSubmit = () => {
    console.log('submit');
    handleNext();
  };

  return (
    <>
      <List disablePadding>
        <ListItem>
          <ListItemText
            primary="Nombre"
            secondary={valuesContract.firstName || 'Not Provided'}
          />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText
            primary="Apellido"
            secondary={valuesContract.lastName || 'Not Provided'}
          />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText
            primary="Email"
            secondary={valuesContract.email || 'Not Provided'}
          />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText
            primary="Tipo de arbol"
            secondary={valuesContract.tipoArbol || 'Not Provided'}
          />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText
            primary="Cantidad a tokenizar"
            secondary={valuesContract.toneladas + ' tn' || 'Not Provided'}
          />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText
            primary="Dia de expiracion"
            secondary={valuesDeposit.date || 'Not Provided'}
          />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText
            primary="Teléfono de contacto"
            secondary={valuesDeposit.phone || 'Not Provided'}
          />
        </ListItem>
      </List>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
        <Button sx={{ mr: 1 }} onClick={() => handleBack()}>
          Anterior
        </Button>
        <Button variant="contained" color="success" onClick={handleSubmit}>
          Confirmar y Continuar
        </Button>
      </Box>
    </>
  );
}
